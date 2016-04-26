(function(){

	var server = "http://dev.mljia.cn";
	
	var imageRoot  = "http://download.mljia.cn";
	
	
	var zhifuUrl = "http://dev.mljia.cn/wx/pay";		//生产环境 为http://h5.mljia.cn/wx/pay //外网test02测试环境: http://test.mljia.cn/wx/pay  //test环境和dev环境： http://dev.mljia.cn/wx/pay
	
	var zhifuUrlLis ="http://dev.mljia.cn/wx/paytwo";  //生产环境 为 http://h5.mljia.cn/wx/paytwo   //外网test02测试环境: http://test.mljia.cn/wx/pay  //test环境和dev环境：http://dev.mljia.cn/wx/pay
	
	var WXserver    =  "http://dev.mljia.cn/wxpub";           //获取accessToken 上传图片等 //生产环境     "http://wx.mljia.cn";  内网："http://dev.mljia.cn/wxpub"
	
	var request={
			zhifuUrl:zhifuUrl,
			//zhifuTestUrl:zhifuTestUrl,
			zhifuUrlLis:zhifuUrlLis,
			staticImage:{
				url: imageRoot + "/download/image/",
				thumb: imageRoot + "/download/image/thumb/",
			},
			shop:{
				 shopInfo      : server + "/main.shop.action/h5/shop/get/information",
				 //店铺列表
				 shoplist      : server + "/main.shop.action/h5/shop/list",
				 //页面下拉获取店铺列表
				 getShopList    :server + "/weixin.action/h5/shop/list",
				 
				 getVerifyCode : server + "/weixin.action/h5/user/get/smscode/",
				 bindUser      : server + "/weixin.action/h5/user/bind",
			     getShopPicture :  server + "/main.shop.action/h5/shop/get/images",
			    
			     //获取某店铺产品列表,前5个为推荐产品
			     getHotSaleInfo: server + "/main.shop.action/h5/shop/get/product/list",
			     //商家推荐
			     getShopRecommendInfo: server + "/main.shop.action/h5/shop/get/recommend",
			     getCommentInfo : server +  "/meirong.basic.action/h5/comment/get/list",
			     
			     //获取用户拥有的店铺列表
			     getDiffShopConsumeList :server + "/main.shop.action/h5/shop/list",
			     // 获取异店耗卡店铺列表
			     getDiffShopList        :server + "/main.shop.action/h5/shop/other/list",
			     
			     //获取店铺服务卡列表
			     getCardListOfShopServe :server  + "/main.shop.action/h5/shop/cardtype/list",
			     //获取某店铺产品列表
			     getProductListOfShopServe : server + "/main.shop.action/h5/shop/get/product/list",
			     //获取某店铺的护理列表
			     getMassageListOfShopServe : server + "/main.shop.action/h5/shop/massage/list",
			     
			     //获取服务卡详情
			     getCardDetailsOfShopServe  :server + "/meirong.basic.action/h5/card/cardtype/info",
			     //获取护理项目详情
			     getMassageDetailsOfShopServe : server + "/meirong.basic.action/h5/massage/get/detail",
			     //获取店铺产品信息
			     getProductDetailsOfShopServe : server + "/meirong.basic.action/h5/product/get/detail",
			     
			     //获取活动价格信息
			     getEventPriceById : server + "/meirong.basic.action/h5/activity/pre/info",
			     
			     
			     //查询产品类别内容
			     getProductClassItem          : server + "/meirong.basic.action/h5/product/type/info",
			     //查询护理类别内容
			     getMassageClassItem          : server + "/meirong.basic.action/h5/massage/type/info",
			     
			     //查询产品可耗卡
			     getProductAccseeCard         :server +"/meirong.basic.action/h5/card/by/product",
			     //获取店铺已评价的订单
			     getShopOrderComment          : server + "/meirong.order.action/weixin/order/comment/list"
			     
			},
			user:{
				shopStafflis  :server + "/meirong.basic.action/h5/staff/list",
				userList      :  server + "/meirong.basic.action/h5/staff/get/staff/list",
				//某一店铺员工列表  p: shop_id
				soleShopStaffLis : server + "/meirong.basic.action/h5/staff/list",
				getCardList   :  server + "/meirong.basic.action/h5/card/opencard/list",
				getCardInfoDetials : server + "/meirong.basic.action/h5/card/opencard/info",
				userOrderList :  server + "/meirong.order.action/weixin/order/list",
				userOrderItermInfo : server + "/meirong.order.action/weixin/order/info",
				//
				simpleOrderInfo   :server +"/meirong.order.action/weixin/order/simple_info",
				
				//获取用户状态
				getUserStatus      : server + "/weixin.action/h5/user/get/status",
				checkUserPhone     :  server + "/weixin.action/h5/user/phone/check",
				//获取验证码
				getQR               :server + "/weixin.action/h5/app/info",
				//用openId  获取 customId
				getCustomId        : server  + "/meirong.basic.action/h5/wx/info",
				//获取accesstoken
				//http://dev.mljia.cn/wxpub/get/access_token?app_id=wx9f284019acd75b4a&open_id=ox1dUs_mEtwHgXbL1t_87P0CMOpw
				//用户意见反馈
				feekbackSuggest    : server + "/weixin.action/h5/user/comment/add",
				getAccessToken     :  WXserver + "/get/access_token",
				//获取订单状态数量
				getOrderStatueNum  :  server + "/meirong.order.action/weixin/order/count",
				//设置用户选择的店铺
				setPreferShop        :  server + "/weixin.action/h5/shop/change/prefer"
				
			},
			comment:{
				consumeComment :  server + "/meirong.basic.action/h5/comment/index", //提交用户评价
				getCommentItem :   server + "/meirong.basic.action/h5/comment/get/item", // 获取评价细则列表
				
				getcommentInfo :  server + "/meirong.basic.action/h5/comment/get/info",
				getOrderCommentInfo : server + "/meirong.basic.action/h5/comment/get/info/order",
				//获取评论列表
				getCommentList : server + "/meirong.basic.action/h5/comment/get/list",
				// 获取用户信息 {open_id} 
				getWXUserInfo  : server + "/weixin.action/h5/user/info",
				// 获取微信用户 少量
				getWXUserDetailInfo: server + "/weixin.action/h5/user/info/detail/",
				//分享朋友圈补贴美丽币
				shareGetScore : server +"/meirong.basic.action/h5/reward/add/coin"
				
			},
			
			reserved:{
				//获取用户微信相关信息
				getWxUserInfo : server + "/weixin.action/h5/user/info",
				//预约产品 二期 暂时不用
				//reserveProduct  : server + "/meirong.order.action/weixin/card/yuyueProduct",
				//预约护理 二期 暂时不用
				//reserveMassage  : server + "/meirong.order.action/weixin/card/yuyueMassage",
				//预约中的消费记录
				consumeRecored  : server + "/meirong.order.action/weixin/card/records",
				//修改预约时间
				changeReserveTim : server + "/meirong.order.action/weixin/opt/yuyueModify",
				//取消预约
				cancelReserve    : server + "/meirong.order.action/weixin/opt/yuyueCancel",
				//获取护理项目详情
				getMassDetail   : server +"/meirong.basic.action/h5/massage/get/detail",
				//获取店铺详情
				getShopDetail  :  server + "/meirong.basic.action/h5/product/get/detail",
				
				//预约开卡
				reservOrderCard : server + "/meirong.order.action/weixin/card/yuyue",
				//预约护理
				reservOrderMassage : server + "/meirong.order.action/weixin/yuyueMassage ",
				//预约产品
				reservOrederProduct : server + "/meirong.order.action/weixin/yuyueProduct",
				
				//获取某护理用户可耗卡信息
				getMassageIncludeCardInfo    : server+ "/meirong.basic.action/h5/card/by/massage",
				
				//获取某产品用户可耗卡信息
				getProductIncludeCardInfo     : server + "/meirong.basic.action/h5/card/by/product",
				
				//获取微信签名信息
				getWXOrderPayInfo              :server + "/meirong.order.action/weixin/order/wxPayInfo"
				
				
				
			},
			order:{
				//申请退款
				wxApplyRefundMoney : server +"/meirong.order.action/weixin/refund"
				
			},
			event:{
				//优惠促销
				getPromotions :  server + "/meirong.basic.action/h5/activity/search",
				getDetailPromotions : server + "/meirong.basic.action/h5/activity/info",
				getPromotionsDeatils : server + "/meirong.basic.action/h5/activity/info"
			}
			
	};
	window.request=request;
	window.imageRoot = imageRoot;
	
	
	
	var tools ={
			comment:{
				// 外网没有pub.内网有
				upLoadImg    : WXserver + "/upload/image",              //上传图片
			}
	};
	window.tools =tools;
	
	
	
	// 对Date的扩展，将 Date 转化为指定格式的String   
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
	// 例子：   
	// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	 if(!Date.prototype.format){
			Date.prototype.format =function(format){
				var o = {
				"M+" : this.getMonth()+1, //month
				"d+" : this.getDate(), //day
				"h+" : this.getHours(), //hour
				"m+" : this.getMinutes(), //minute
				"s+" : this.getSeconds(), //second
				"q+" : Math.floor((this.getMonth()+3)/3), //quarter
				"S" : this.getMilliseconds() //millisecond
				};
				if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
				(this.getFullYear()+"").substr(4- RegExp.$1.length));
				for(var k in o)if(new RegExp("("+ k +")").test(format))
				format = format.replace(RegExp.$1,
				RegExp.$1.length==1? o[k] :
				("00"+ o[k]).substr((""+ o[k]).length));
				return format;
			};
	 }
	 
	 
	 //获取请求参数值
	 if(!window.getSearchString){
		 window.getSearchString =  function (name){
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var result = window.location.search.substr(1).match(reg);
			    if(result != null){
			        return result[2];
			    }else{
			        return null;
			    }
		};
		 
	 }
	 //获取请求参数值
	 if(!getUrlParam){
		 var getUrlParam =  function (name){
			    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    var result = window.location.search.substr(1).match(reg);
			    if(result != null){
			        return result[2];
			    }else{
			        return null;
			    }
		};
		 window.getUrlParam=getUrlParam;
	 }
	 
	 //格式化输出日期  输出 最大唯一单位
	 if(!arrive_timer_format){
		var  arrive_timer_format=function(s) {
				var t;
				if(s<0){
					return;
				}
				if(s > -1){
				    hour = Math.floor(s/3600);
				    min = Math.floor(s/60) % 60;
				    sec = s % 60;
				    day = parseInt(hour / 24);
				    if (day > 0) {
				        hour = hour - 24 * day;
				        t = day + ":" + hour + ":";
				        }
				    else t = hour + ":";   
				    if(min < 10){t += "0";}
				        t += min + ":";
				    if(sec < 10){t += "0";}
				        t += sec;
				}
				if(  t.split(":").length==4 && Number(t.split(":")[0]) > 0 ){
					
					return Number(t.split(":")[0])+"天";
				}else if(t.split(":").length==3 && Number(t.split(":")[0]) > 0 ){
					return Number(t.split(":")[0])+"小时";
				}else if(t.split(":").length==3 && Number(t.split(":")[0]) == 0   ){
					return Number(t.split(":")[1])+"分钟";
				}
				
			};
		window.arrive_timer_format=arrive_timer_format;
	 }
	
	 
	//+---------------------------------------------------  
	//| 把日期分割成数组  
	//+---------------------------------------------------  
	Date.prototype.toArray = function()  
	{   
	    var myDate = this;  
	    var myArray = Array();  
	    myArray[0] = myDate.getFullYear();  
	    myArray[1] = myDate.getMonth();  
	    myArray[2] = myDate.getDate();  
	    myArray[3] = myDate.getHours();  
	    myArray[4] = myDate.getMinutes();  
	    myArray[5] = myDate.getSeconds();  
	    return myArray;  
	}
	 
	 
})();