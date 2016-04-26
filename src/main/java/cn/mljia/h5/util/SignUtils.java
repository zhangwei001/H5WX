package cn.mljia.h5.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import cn.mljia.component.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.mljia.component.util.ConfigUtils;
import cn.mljia.component.util.JsonUtils;
import cn.mljia.component.util.RedisUtils;

public class SignUtils {

	private static final Logger log = LoggerFactory.getLogger(SignUtils.class);

	public static String getWeiXinToken() throws Exception {

		String token = RedisUtils.get(WebConstat.conf_h5_weixin_redis_token);
		if (token == null || token.equals("")) {

			String appId = ConfigUtils.getValue(WebConstat.MLJIA_APPID);
			String appSecret = ConfigUtils
					.getValue(WebConstat.CN_MLJIA_APPSECRET);

			String url = String
					.format("%s%s%s%s%s",
							"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential",
							"&appid=", appId, "&secret=", appSecret);

			URL urlSend = URI.create(url).toURL();
			HttpURLConnection conn = (HttpURLConnection) urlSend
					.openConnection();

			conn.connect();
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					conn.getInputStream()));
			StringBuffer buf = new StringBuffer();
			String lines;
			while ((lines = reader.readLine()) != null) {
				buf.append(lines);
			}
			reader.close();
			conn.disconnect();
			if (buf != null) {
				Map<String, Object> retMap = JsonUtils
						.toMap4Obj(buf.toString());

				if (retMap.get("access_token") != null
						&& retMap.get("expires_in") != null) {
					RedisUtils
							.setex(WebConstat.conf_h5_weixin_redis_token,
									Integer.valueOf(retMap.get("expires_in")
											.toString()),
									retMap.get("access_token").toString());
					token = RedisUtils
							.get(WebConstat.conf_h5_weixin_redis_token);
				} else {
					// log.info(buf.toString());
				}
			}
		}

		return token;
	}

	public static String getWeiXinJsTicket() throws Exception {

		String token = getWeiXinToken();

		String jsTicket = RedisUtils
				.get(WebConstat.conf_h5_weixin_redis_jsapi_ticket);
		if ((jsTicket == null || jsTicket.equals("")) && token != null) {

			String url = String
					.format("%s%s%s",
							"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=",
							token, "&type=jsapi");

			URL urlSend = URI.create(url).toURL();
			HttpURLConnection conn = (HttpURLConnection) urlSend
					.openConnection();

			conn.connect();
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					conn.getInputStream()));
			StringBuffer buf = new StringBuffer();
			String lines;
			while ((lines = reader.readLine()) != null) {
				buf.append(lines);
			}
			reader.close();
			conn.disconnect();
			if (buf != null) {
				log.info("get jsapi ticket:" + buf.toString());
				Map<String, Object> retMap = JsonUtils
						.toMap4Obj(buf.toString());

				if (retMap.get("ticket") != null
						&& retMap.get("expires_in") != null) {
					RedisUtils
							.setex(WebConstat.conf_h5_weixin_redis_jsapi_ticket,
									Integer.valueOf(retMap.get("expires_in")
											.toString()), retMap.get("ticket")
											.toString());

					jsTicket = RedisUtils
							.get(WebConstat.conf_h5_weixin_redis_jsapi_ticket);
				} else {
					// log.info(buf.toString());
				}
			}
		}

		return jsTicket;
	}

	public static Map<String, String> sign(String jsapi_ticket, String url) {
		Map<String, String> ret = new HashMap<String, String>();
		String nonce_str = create_nonce_str();
		String timestamp = create_timestamp();
		String string1;
		String signature = "";

		// 注意这里参数名必须全部小写，且必须有序
		string1 = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce_str
				+ "&timestamp=" + timestamp + "&url=" + url;
		try {
			MessageDigest crypt = MessageDigest.getInstance("SHA-1");
			crypt.reset();
			crypt.update(string1.getBytes("UTF-8"));
			signature = byteToHex(crypt.digest());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		ret.put("url", url);
		ret.put("jsapi_ticket", jsapi_ticket);
		ret.put("nonceStr", nonce_str);
		ret.put("timestamp", timestamp);
		ret.put("signature", signature);

		return ret;
	}

	private static String byteToHex(final byte[] hash) {
		Formatter formatter = new Formatter();
		for (byte b : hash) {
			formatter.format("%02x", b);
		}
		String result = formatter.toString();
		formatter.close();
		return result;
	}

	private static String create_nonce_str() {
		return UUID.randomUUID().toString();
	}

	private static String create_timestamp() {
		return Long.toString(System.currentTimeMillis() / 1000);
	}

	// rainqin weixinPayTest
	public static String getSign(Map<String, String> paras) throws Exception {
		String noncestr = paras.get("noncestr");
		String jsapi_ticket = paras.get("jsapi_ticket");
		String timestamp = paras.get("timestamp");
		String url = paras.get("url");

		String str = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + noncestr
				+ "&timestamp=" + timestamp + "&url=" + url;

		MessageDigest crypt = MessageDigest.getInstance("SHA-1");
		crypt.reset();
		crypt.update(str.getBytes("UTF-8"));
		return byteToHex(crypt.digest());

	}



}
