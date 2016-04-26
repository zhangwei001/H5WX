package cn.mljia.h5.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cn.mljia.common.CodeType;
import cn.mljia.common.TResult;
import cn.mljia.component.util.ConfigUtils;
import cn.mljia.component.util.EncryptUtils;
import cn.mljia.component.util.HttpUtils;
import cn.mljia.component.util.JsonUtils;
import cn.mljia.component.web.def.RenderFormatDef;
import cn.mljia.h5.util.SignUtils;
import cn.mljia.h5.util.WebConstat;
import cn.mljia.h5.util.upLoadImgUtil;


@Controller
public class AgentController {

	private static final Logger log = LoggerFactory.getLogger(AgentController.class);
	/**
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @param route
	 * @param shopId 店铺主键
	 * @param appId  
	 * @param userId
	 * @param openId
	 * @param shopSid 
	 * @param attr
	 * @return
	 * @throws Exception
	 */
	//route jsp路由从page下开始，不包括page eg: http://192.168.10.93:8080/wx/agent/4545/meirong-shop-shop_info
	@RequestMapping("/agent/{route}")
	public String agent(HttpServletRequest request,HttpServletResponse response,
			Model model,
			@PathVariable String route,
			@RequestParam(value="shopId",required=false)Integer shopId,
			@RequestParam(value="appId",required=false)String appId,
			@RequestParam(value="userId",required=false)Integer userId,
			@RequestParam(value="cardId",required=false)Integer cardId,
			@RequestParam(value="openId",required=false)String openId,
			@RequestParam(value="accessToken",required=false)String accessToken,
			@RequestParam(value="cardType",required=false)String cardType, 
			@RequestParam(value="shopSid",required=false)String shopSid,
			@RequestParam(value="message",required=false)Integer message,
			@RequestParam(value="attr",required=false)String attr)throws Exception{
		
		
		String destination = route.replace("-", "/");
		model.addAttribute("shopId", shopId);
		model.addAttribute("shopSid", shopSid);
		model.addAttribute("attr", attr);
		model.addAttribute("openId", openId);
		model.addAttribute("appId",appId);
		model.addAttribute("userId", userId);
		model.addAttribute("cardId", cardId);
		model.addAttribute("cardType", cardType);
		model.addAttribute("accessToken", accessToken);
		model.addAttribute("message", message);
		model.addAttribute("upload_url", ConfigUtils.getValue(WebConstat.conf_h5_wx_upload_img) );
		
		model.addAttribute("appIdPay", ConfigUtils.getValue(WebConstat.conf_h5_appId));
		
		StringBuffer  path = request.getRequestURL();
		String contextUrl = path.delete(path.length() - request.getRequestURI().length(), path.length()).append(request.getServletContext().getContextPath()).append("/").toString();  
		model.addAttribute("contextPath", contextUrl);
		/*
		 * meirong/user/user_bind    :绑定 路由
		 * meirong/user/customer_card ：我的消费卡 路由
		 * meirong/user/customer_order  ：消费查询  路由
		 *  对这个三个路由检查是否绑定。如果没有绑定【  if(tResult.getStatus() !=CodeType.V_200)  】 ,进入绑定页面
		 */
		// destination.equals("meirong/user/user_bind") || destination.equals("meirong/user/customer_card") || destination.equals("meirong/user/customer_order") ||  destination.equals("meirong/shop/shop_bind_success") || destination.equals("meirong/card/customer_card_details")
		
		if(checkUrl(destination)){
			
			String str=HttpUtils.doGet(String.format("%s/h5/user/get/status?user_id=%s&open_id=%s&app_id=%s&access_token=%s",ConfigUtils.getValue(WebConstat.WEIXIN_ACTION_URL),userId,openId,appId,accessToken));
			
			
			if(str!=null && str.length()>1){
				if(str.indexOf("404") >-1){
					return destination;
				}
				log.info( "str:======================"+str );
				TResult tResult=JsonUtils.toBean(str, TResult.class);
				
				if(tResult.getStatus() == CodeType.V_200){
					//如果绑定 获取shopId customeId
					model.addAttribute("tContent",tResult.getContent() );
					model.addAttribute("status", tResult.getStatus());
					log.info( tResult.getContent() );
					//未绑定 去绑定
				}else if(tResult.getStatus() !=CodeType.V_200){
					model.addAttribute("status", tResult.getStatus());
					//model.addAttribute("errorMsg", tResult.getErrorMessage());
					
					return "redirect:manager-user-wx_user_bind_page?status="+tResult.getStatus();
				}
				
			}else{
				model.addAttribute("error", "请求超时");
				 
				return "redirect:error/errorPage";
				
			}
		
		}
		//检验是否是meirong路由过来的
		if(destination.contentEquals("meirong/order/wx_refund_details") ){
			return "redirect:manager-user-info-wx_user_refund_details";
		}
		
		
		
		
		return destination;
	}
	

	
	private boolean checkUrl(String str) {
		boolean bool=false;
		List<String> arrs=new ArrayList<String>();
		
		arrs.add("manager/user/duplicate/wx_user_bind_page");//消息副本用户状态监测
		arrs.add("manager/user/catalog/wx_user_card_list");   //用户可用卡列表  用户状态监测
		arrs.add("manager/user/catalog/wx_user_order_list");
		//arrs.add("manager/user/catalog/wx_user_order_list");
		

		
		if(str!=null){
			for (int i = 0; i < arrs.size(); i++) {
				if(arrs.get(i).equals(str)){
					bool=true;
					break;
				}
			}
		}
		
		return bool;
	}
	
	
	@RequestMapping("/menu/{route}")
	public String menu(HttpServletRequest request,HttpServletResponse response,
			Model model,
			@RequestParam(value="shopId",required=true)Integer shopId,
			@RequestParam(value="appId",required=true)String appId,
			@RequestParam(value="openId",required=true)String openId,
			@RequestParam(value="accessToken",required=false)String accessToken,
			@PathVariable String route){
		String destination = route.replace("-", "/");
		model.addAttribute("shopId", shopId);
		model.addAttribute("appId", appId);
		model.addAttribute("openId", openId);
	    model.addAttribute("accessToken", accessToken);
	    model.addAttribute("appIdPay", ConfigUtils.getValue(WebConstat.conf_h5_appId));
		return destination;
	}
	
	
	@RequestMapping("uploadImage")
	public void uploadImage(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="upload_url",required=true)String upload_url,
			@RequestParam(value="image_url",required=true)String image_url,
			@RequestParam(value="src_name",required=false)String src_name
			)throws Exception {
		
		String imgId=new upLoadImgUtil().uploadImage(upload_url, image_url, src_name);
		
		Map<String, Object> mapEnd=new HashMap<String, Object>();
		mapEnd.put("status", 400);
		 
		log.info("imgId"+imgId);
		 if( imgId == null || imgId.equals("")){
			 
		 }else {
			 mapEnd.put("status", 200);
			 mapEnd.put("data", imgId);
		 }
	
		
		response.setContentType(RenderFormatDef.JSON);
		response.getWriter().write(JsonUtils.toStr(mapEnd));
		response.getWriter().close();
		
	}
	

	
	@RequestMapping("getJsTicket")
	public void getJsTicket(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="appId",required=true)String appId,
			@RequestParam(value="currentUrl",required=false)String currentUrl,
			@RequestParam(value="user_id",required=true)String user_id)throws Exception {
		
		
		String wechatUrl = ConfigUtils.getValue(WebConstat.conf_h5_wx_wechatUrl);
		
		String accessToken = EncryptUtils.encrypt(String.valueOf(user_id));
		
		wechatUrl += "/getTicket?user_id="+user_id+"&access_token="+accessToken+"&shop_id="+user_id;
		String data = HttpUtils.doGet(wechatUrl);
		
		Map<String, Object> mapEnd=new HashMap<String, Object>();
		mapEnd.put("status", 400);
		log.info("data="+data);
		if("error".equals(data)){
			mapEnd.put("msg", "获取JSTicket信息失败");	
			response.setContentType(RenderFormatDef.JSON);
			response.getWriter().write(JsonUtils.toStr(mapEnd));
			response.getWriter().close();
			return;
		}
		
		TResult result = JsonUtils.toBean(data, TResult.class);
		if(result.getStatus() == CodeType.V_200){
			String jsTicket = result.getContent();
		    Map<String, String> mapSin = SignUtils.sign(jsTicket, currentUrl);
		    log.info("<<<<<<<<<<<<mapSin>>>>>>>>>>>>"+mapSin+"<<<<<<<<<<<<<<<<currentUrl>>>>>>>>>"+currentUrl);
		    mapEnd.put("status", 200);
		    mapEnd.put("data", mapSin);
		   
		 
		}else{
			mapEnd.put("msg", result.getErrorMessage());	
			if(result.getErrorMessage() == null){
				mapEnd.put("msg", data);
			}
		}
		 
		response.setContentType(RenderFormatDef.JSON);
		response.getWriter().write(JsonUtils.toStr(mapEnd));
		response.getWriter().close();
	}


	/**
	 * 测试页
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/")
	protected String index(HttpServletRequest request, HttpServletResponse response,Model model) throws Exception {

		StringBuffer  path = request.getRequestURL();
		String contextUrl = path.delete(path.length() - request.getRequestURI().length(), path.length()).append(request.getServletContext().getContextPath()).append("/").toString();  
		model.addAttribute("contextPath", contextUrl);
		
		
		return "index";
	}
	
	
}
