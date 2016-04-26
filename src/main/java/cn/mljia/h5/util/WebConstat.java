package cn.mljia.h5.util;

import java.util.HashMap;
import java.util.Map;


/**
 * @author wangyz
 * @version 1.0.0
 * @since 2013-8-8 下午6:47:29
 */
public abstract class WebConstat {

	public static Integer system_id = 8;

	public static String system_name = "MEIRONG_FORUM";

	public static Integer meirong_id = 3;

	public static String dict_group = "SYS";

	public static String dict_group_right = "GROUP_TYPE";

	public static String system_label = null;
	
	public static String system_notify_all = "cn.mljia.notify.all";

	public static final String user_session_key = "user_session_key";
	
	public static final String cache_shop_list = "cn.mljia.meirong.shopList";// 店铺信息

	public static Map<String, String> function_name_maps = new HashMap<String, String>();

	public static final String session_params_function_id = "fid";
	public static final String session_params_ctl_id = "cid";

	public static final String application_params_functions = "functions";
	public static final String application_params_ctls = "ctls";
	public static final String application_params_ctl = "ctl";

	public static final String local_base="base";

	public static final String conf_login_user = "cn.mljia.forum.web.login.user";
	public static final String conf_login_passwd = "cn.mljia.forum.web.login.passwd";
	
	public static final String conf_upload_url = "cn.mljia.forum.web.upload.url";
	public static final String conf_download_url = "cn.mljia.forum.web.download.url";
	
	
	public static final String conf_h5_weixin_redis_user_list= "cn.mljia.h5.weixin.redis.user.list";
	public static final String conf_h5_weixin_redis_user_list_long= "cn.mljia.h5.weixin.redis.user.list.long";
	public static final String conf_h5_weixin_redis_user_openid= "cn.mljia.h5.weixin.redis.user.openid";
	
	public static final String conf_h5_weixin_redis_token= "cn.mljia.h5.weixin.redis.token";
	public static final String conf_h5_weixin_redis_jsapi_ticket= "cn.mljia.h5.weixin.redis.jsapi.ticket";
	
	public static final String conf_h5_appId = "cn.mljia.h5.weixin.appId";
	public static final String conf_h5_appSecret = "cn.mljia.h5.weixin.appSecret";
	
	
    public static final String MLJIA_APPID = "cn.mljia.weixin.appid";
	
	public static final String MLJIA_APP_SECRET = "cn.mljia.weixin.app.secret";
	
	public static final String MLJIA_PAY_URL = "cn.mljia.pay.url";
	
	public static final String MLJIA_H5_URL = "cn.mljia.h5.url";
	
	public static final String conf_h5_wx_wechatUrl ="cn.mljia.h5.wx.wechat.url";
	
	public static final String conf_h5_wx_upload_img = "cn.mljia.h5.weixin.upload.url";
	
	//静态图片文件下载地址
	public static final String conf_download_static_image_url = "cn.mljia.meirong.static.image.download.url";
		
	public static final String message_s_100 = "远程调用：";
	public static final String message_s_101 = "远程调用总耗时：";
	public static final String message_s_102 = "(毫秒)";
	public static final String message_s_103 = "返回：";

	public static final String error_message_x_400 = "获取远程调用失败，请检查网络连接或联系维护人员";
	public static final String error_message_x_401 = "";

	public static final String CN_MLJIA_APPSECRET ="cn.mljia.appsecret";
	
	public static final String WEIXIN_ACTION_URL ="cn.mljia.weixin.action.url";
	
}
