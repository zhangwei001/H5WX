/**
 * 会员中心
 * 
 */
$(function(){
	var userId = getUrlParam("userId");
	var appId =getUrlParam("appId");
	var openId =getUrlParam("openId");
	var accessToken =getUrlParam("accessToken");

	//设置全局变量
	var globalVar={
			userId:userId,
			appId:appId,
			openId:openId,
			accessToken:accessToken
	};
	
	store.remove("globalVar");	
	store.set("globalVar",globalVar);	
	
	var mumberCenterAPP ={
			
			init:function(){
				
				globalUtil.changeTitle("会员中心");	
			 this.getUserWXInfo();
			
			 this.getOrderStatusNum();
			 this._endFun();
			},
			getUserWXInfo:function(){
				$.ajax({
					
					url :request.comment.getWXUserDetailInfo+"/"+openId,
					data:{
						
						user_id :userId,
						open_id :openId,
						app_id : appId
						
					},
					type:"get",
					dataType: "json",
					success : function(data){
						
						if(data.status === 200 ){
							var decodeData =  $.base64.decode(data.content, "utf-8");
							 wxUserInfo = JSON.parse(decodeData);
							console.log("用户图像名字信息",wxUserInfo);
							
							
							laytpl($("#userWXInfoTemp").html()).render({
								content       : wxUserInfo,
								},function(html){ 
								 $(".vip_top_box").append(html);
							    });
							
						}else{
							alert(data.errorMessage);
						}
					},
					error :function(data){
						//console.log("用户图像名字信息失败",wxUserInfo);
					}
					
				});
			},
			getOrderStatusNum :function(){
				//获取订单信息
 				$.ajax({
	 				url: request.user.getOrderStatueNum,
	 				type:"get",
	 				data:{
	 						open_id:openId,
	 						app_id :appId
	 					},
	 				dataType:"json",
	 				success: function(data){
	 						if(200 == data.status){
	 							/*var content =  $.base64.decode(data.content, "utf8");
	 						    content = JSON.parse(content);*/
	 					         console.log("getOrderStatueNum:",data.content);
	 					        laytpl($("#orderStatueNumTemp").html()).render({
									content       : data.content || [],
									},function(html){ 
									 $("#orderStatueNumView").append(html);
									 
									 //预约中
									 $("#yuyueLink").on("click",function(){
									
										 location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_list?userId=" +userId 
										  +"&appId="+appId
										  +"&openId="+openId
										  +"&accessToken="+accessToken
										  +"&orderStatus=1"
										
									 });
									 
									 //待评价
									 $("#commentUrl").on("click",function(){
										
											 location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_list?userId=" +userId 
											  +"&appId="+appId
											  +"&openId="+openId
											  +"&accessToken="+accessToken
											  +"&orderStatus=2"
										 
										 
										 
									 });
									 
									 //退款中
									 $("#refundUrl").on("click",function(){
									
										 location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_list?userId=" +userId 
										  +"&appId="+appId
										  +"&openId="+openId
										  +"&accessToken="+accessToken
										  +"&orderStatus=3"
										
									 });
									 
									 
								    });
	 				
	 						}else{
	 						
	 							alert(data.errorMessage);
	 						}
					},
					error:function(e){}	
 					
 				});
			},
			_endFun:function(){
				//店铺主页
				var shopId = store.get("user_picked_shop_id") || "";
				  $("#shopHomeUrl").on("click",function(){
					  location.href=  GLOBAL.webRoot +"/agent/manager-shop-info-wx_shops_home?userId=" +userId 
					  +"&appId="+appId
					  +"&openId="+openId
					  +"&accessToken="+accessToken
					 
				  });
				  //店铺优惠促销
				  $("#shopEventUrl").on("click",function(){
					  http://dev.mljia.cn/wx/agent/manager-shop-event-wx_event_list_index?userId=6&appId=wx900f1b23c9998636&openId=o_u2Dv6dbjuTW18s-fDVXjM1iYe0&accessToken=MTQ1ODg3MTc2MTg4MW9fdTJEdjZkYmp1VFcxOHMtZkRWWGpNMWlZZTB3eDkwMGYxYjIzYzk5OTg2MzYjKmg1YXV0aCoj&shopId=3					  
					  
					  location.href=  GLOBAL.webRoot +"/agent/manager-shop-event-wx_event_list_index?userId="+userId
					  +"&appId="+appId
					  +"&openId="+openId
					  +"&accessToken="+accessToken
					
				  });
				  //订单列表
				  $("#orderLisUrl").on("click",function(){
					  
					  location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_list?userId="+userId
					  +"&appId="+appId
					  +"&openId="+openId
					  +"&accessToken="+accessToken
				  });
				  //卡列表
				  $("#cardLisUrl").on("click",function(){
					  
				      location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_card_list?userId="+userId
				      +"&appId="+appId
				      +"&openId="+openId
				      +"&accessToken="+accessToken
				  });
				  //红包
				  $("#redPacketUrl").on("click",function(){
					  location.href=  GLOBAL.webRoot +"/agent/manager-shop-redpacket-wx_shop_redpackt?userId="+userId
					  +"&openId="+openId
					  +"&appId="+appId
					  +"&accessToken="+accessToken;
				  });
				  //意见反馈
				  $(".feedback_box").on("click",function(){
					  
					  location.href=  GLOBAL.webRoot +"/agent/manager-user-info-wx_user_suggestion_feedback?userId="+userId
					  +"&openId="+openId
					  +"&appId="+appId
					  +"&accessToken="+accessToken;
					  
				  });
				  
				  
		         //优惠处销
		         $("#envetUrl").on("click",function(){
		        	 window.location.href= GLOBAL.webRoot+"/agent/manager-shop-event-wx_event_list_index?userId="+userId
						+"&shopId="+shopId
						+"&appId="+ appId
						+"&openId="+openId
						+"&accessToken="+accessToken;
		         });
					
				  
				  
				  
			}
	};
	mumberCenterAPP.init();
});