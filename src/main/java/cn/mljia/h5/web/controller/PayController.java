 package cn.mljia.h5.web.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cn.mljia.component.util.ConfigUtils;
import cn.mljia.component.util.HttpUtils;
import cn.mljia.component.util.JsonUtils;
import cn.mljia.component.util.RedisUtils;
import cn.mljia.h5.util.SignUtils;
import cn.mljia.h5.util.WebConstat;
import cn.mljia.pay.service.PayOrderService;

import com.alibaba.fastjson.JSONObject;

@Controller
public class PayController {

	private static final Logger log = LoggerFactory.getLogger(PayController.class);

	@Autowired
    private PayOrderService payOrderService;
 
	
	

	@RequestMapping("pay")
	public String pay(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="code",required=false)String code,
	        @RequestParam(value="state",required=false)String state, Model model)throws Exception{
		
		 String appid=ConfigUtils.getValue(WebConstat.conf_h5_appId);
		
		 StringBuffer sbf = new StringBuffer("https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid)
         .append("&secret="+ConfigUtils.getValue(WebConstat.conf_h5_appSecret))
         .append("&code="+code)
         .append("&grant_type=authorization_code");
		 
		 String getUrl=sbf.toString();
		String data = HttpUtils.doGet(getUrl);
		JSONObject jo = JSONObject.parseObject(data);
		String openId = jo.getString("openid");

		String jsTicket=getWeiXinJsTicket();

		log.warn("data={}",data);
		log.warn("sbf-url=",getUrl);
		
		log.warn("openid={}", openId);

		String url=request.getRequestURL().toString();
		if(request.getQueryString() != null){
			url=String.format("%s%s%s", request.getRequestURL().toString(),"?",request.getQueryString().toString().split("#")[0]);
		}

		log.warn("url={}", url);

		model.addAttribute("mljia_appid",appid)
		.addAttribute("mljia_openid", openId)
		.addAttribute("js_ticket", jsTicket)
		.addAttribute("appIdPay", appid)
		.addAttribute("auth_url", url).addAttribute("code", code)
		.addAttribute("state", state);


		return "pay";
 
	}
	
	
	@RequestMapping("paytwo")
	public String paytwo(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="code",required=false)String code,
	        @RequestParam(value="state",required=false)String state, Model model)throws Exception{

		String appid=ConfigUtils.getValue(WebConstat.conf_h5_appId);
		
		 StringBuffer sb = new StringBuffer("https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid)
         .append("&secret="+ConfigUtils.getValue(WebConstat.conf_h5_appSecret))
         .append("&code="+code)
         .append("&grant_type=authorization_code");


		String data = HttpUtils.doGet(sb.toString());
		JSONObject jo = JSONObject.parseObject(data);
		String openId = jo.getString("openid");

		String jsTicket=getWeiXinJsTicket();

		log.warn("data={}",data);
		log.warn("openid={}", openId);

		String url=request.getRequestURL().toString();
		if(request.getQueryString() != null){
			url=String.format("%s%s%s", request.getRequestURL().toString(),"?",request.getQueryString().toString().split("#")[0]);
		}

		log.warn("url={}", url);

		model.addAttribute("mljia_appid",appid)
			.addAttribute("mljia_openid", openId)
			.addAttribute("js_ticket", jsTicket)
			.addAttribute("appIdPay", appid)
			.addAttribute("auth_url", url)
			.addAttribute("code", code)
			.addAttribute("state", state);

		return "paytwo";
	}

	
	
	@RequestMapping("manager/pay/code")
	public String managerPay(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="code",required=false)String code,
	        @RequestParam(value="state",required=false)String state, Model model)throws Exception{
		
		 String appid=ConfigUtils.getValue(WebConstat.conf_h5_appId);
		
		 StringBuffer sbf = new StringBuffer("https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid)
         .append("&secret="+ConfigUtils.getValue(WebConstat.conf_h5_appSecret))
         .append("&code="+code)
         .append("&grant_type=authorization_code");
		 
		 String getUrl=sbf.toString();
		String data = HttpUtils.doGet(getUrl);
		JSONObject jo = JSONObject.parseObject(data);
		String openId = jo.getString("openid");

		String jsTicket=getWeiXinJsTicket();

		log.warn("data={}",data);
		log.warn("sbf-url=",getUrl);
		
		log.warn("openid={}", openId);

		String url=request.getRequestURL().toString();
		if(request.getQueryString() != null){
			url=String.format("%s%s%s", request.getRequestURL().toString(),"?",request.getQueryString().toString().split("#")[0]);
		}

		log.warn("url={}", url);

		model.addAttribute("mljia_appid",appid)
		.addAttribute("mljia_openid", openId)
		.addAttribute("js_ticket", jsTicket)
		.addAttribute("appIdPay", appid)
		.addAttribute("auth_url", url).addAttribute("code", code)
		.addAttribute("state", state);


		return "manager-pay-wx_pay_console";
		       
 
	}
	
	@RequestMapping("get_payconfig_sign")
	public void getConfigSign(@RequestParam String noncestr, @RequestParam String jsapi_ticket,
								@RequestParam String timestamp, @RequestParam String url, HttpServletResponse response) throws  Exception{

		log.warn("get sign: nonces={}, jsapi={}", noncestr, jsapi_ticket);
		log.warn("get sign: times={}, url = {}", timestamp, url);

		Map<String, String> paras = new HashMap<String, String>();
		paras.put("noncestr", noncestr);
		paras.put("jsapi_ticket", jsapi_ticket);
		paras.put("timestamp", timestamp);
		paras.put("url", url);
		String sign = SignUtils.getSign(paras);

		response.getWriter().write(sign);
		response.getWriter().flush();

	}

    public String getWeiXinToken() throws Exception {

		String token= RedisUtils.get(WebConstat.conf_h5_weixin_redis_token);
		if(token==null || token.equals("")){

			String appId= ConfigUtils.getValue(WebConstat.conf_h5_appId);
			String appSecret= ConfigUtils.getValue(WebConstat.conf_h5_appSecret);

			String url = String.format("%s%s%s%s%s", "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential",
					"&appid=",appId,"&secret=",appSecret);

			URL urlSend = URI.create(url).toURL();
			HttpURLConnection conn = (HttpURLConnection) urlSend.openConnection();

			conn.connect();
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			StringBuffer buf = new StringBuffer();
			String lines;
			while ((lines = reader.readLine()) != null) {
				buf.append(lines);
			}
			reader.close();
			conn.disconnect();
			if(buf!=null){
				Map<String, Object> retMap = JsonUtils.toMap4Obj(buf.toString());

				if(retMap.get("access_token")!=null && retMap.get("expires_in")!=null){
					RedisUtils.setex(WebConstat.conf_h5_weixin_redis_token, Integer.valueOf(retMap.get("expires_in").toString()), retMap.get("access_token").toString());
					token= RedisUtils.get(WebConstat.conf_h5_weixin_redis_token);
				}else{
					log.info(buf.toString());
				}
			}
		}

 		return token;
	}

   public String getWeiXinJsTicket() throws Exception {

		String token= getWeiXinToken();

		String jsTicket= RedisUtils.get(WebConstat.conf_h5_weixin_redis_jsapi_ticket);
		if((jsTicket==null || jsTicket.equals(""))&& token!=null){

			String url = String.format("%s%s%s", "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=",token,"&type=jsapi");

			URL urlSend = URI.create(url).toURL();
			HttpURLConnection conn = (HttpURLConnection) urlSend.openConnection();

			conn.connect();
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			StringBuffer buf = new StringBuffer();
			String lines;
			while ((lines = reader.readLine()) != null) {
				buf.append(lines);
			}
			reader.close();
			conn.disconnect();
			if(buf!=null){
				Map<String, Object> retMap = JsonUtils.toMap4Obj(buf.toString());

				if(retMap.get("ticket")!=null && retMap.get("expires_in")!=null){
					RedisUtils.setex(WebConstat.conf_h5_weixin_redis_jsapi_ticket, Integer.valueOf(retMap.get("expires_in").toString()), retMap.get("ticket").toString());

					jsTicket= RedisUtils.get(WebConstat.conf_h5_weixin_redis_jsapi_ticket);
				}else{
					log.info(buf.toString());
				}
			}
		}

		return jsTicket;
	}

}
