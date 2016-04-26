//分享出去的护理详情

$(function(){
	
	var appId =getUrlParam("appId");
	var userId =getUrlParam("userId")
	var openId =getUrlParam("openId")

	//耗卡预约 顾客选中的 卡详情
	var userCardDetail = store.get("wx_user_card_detail");
	
	//url数据
	var activityId = getUrlParam("activityId");
	var shopId   =  getUrlParam("shopId");
	var itemType = getUrlParam("itemType");
	var itemId =   getUrlParam("itemId");

	var webRoot = GLOBAL.contextPath;
	//url数据
	var urlData = {
			itemType:itemType,
			webRoot: GLOBAL.webRoot,
			itemId:itemId
			};
 
 	var massageInfo;//护理详情
 	var activityInfo;//活动详情
 	var shopInfoData;//店铺详情
 	var discountedMoney;//项目优惠价
	var massageSaleShare={
		init: function(){
			//两条逻辑 1.活动 2.非活动
			$("title").html("护理详情");
			//fastClick 
			FastClick.attach(document.body);
			
			this.getShopInfoFun();
			//非活动
			if(activityId==0){
				if(shopId&& itemId){
					
					this.getMassageInfoData();
	 			}
			//活动
			}else if(activityId>0){
				this.getEventMassageInfo();
				this.getActivityInfo();
			}
		},getEventMassageInfo:function(){
			var _this=this;
			$.ajax({
				url: request.shop.getEventPriceById,
				data:{
					shop_id 	:  shopId,
					item_id     :  itemId,
					activity_id :  activityId,
					item_type   :  1 //项目类型（必填）（0：卡项 1：护理 2：产品）
				},
				type:"get",
				dataType: "json", 
				async:false,
				success :function(data){
					if(data.status === 200 && data.content ){
						var decodeData =  globalUtil.b64ToUtf8(data.content);
						var eventInfo = JSON.parse(decodeData);
						
						discountedMoney=eventInfo.pre_price||0;//项目优惠价
						
					}else{
						alert("获取活动数据失败~");
					};
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			});
		},getMassageInfoData: function(){
			var _this=this;
			//护理详情
			$.ajax({
				url:request.shop.getMassageDetailsOfShopServe,
				data:{
					shop_id 	   :  shopId ,
					massage_id     :  itemId,
					activity_id    :  activityId || 0
				},
				type:"get",
				dataType: "json", 
				success :function(data){
					if(data.status === 200 && data.content ){
						var decodeData = globalUtil.b64ToUtf8(data.content);
						var massageInfo = JSON.parse(decodeData);
						    console.log("护理详情：",massageInfo);
						    //计算倒计时     传入秒
						    if(massageInfo.limit_time>0){
						    	var limitTime = arrive_timer_format(massageInfo.limit_time);
						    	massageInfo.limitTime=limitTime;
						    }else{
						    	massageInfo.limitTime='已过期';
						    }
						    _this.getMassageInfoRender(massageInfo);
						    
					}else{
						alert("获取数据失败~");
					};
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			});
		
		
		},getActivityInfo:function(){
			var _this=this;
			$.ajax({
				url:request.event.getPromotionsDeatils,
				data:{
					activity_id:activityId,
					shop_id:  shopId
				},
				type:"post",
				async:false,
				dataType: "json",
				success :function(data){
					if(data.status === 200 && data.content && data.content!='[]'){
						var content =  globalUtil.b64ToUtf8(data.content);
						  activityInfo = JSON.parse(content);
						  _this.getMassageInfoData()
					}
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			 });
			
		},getMassageInfoRender : function(massageInfo){
			var shopInfoData =store.get("sharedShopInfoData");
			var _this=this;
			laytpl($("#massageSaleTemp").html()).render({
				content: massageInfo,
				urlData: urlData,
				activityId: activityId || 0,
				activityInfo: activityInfo,
				discountedMoney:discountedMoney,
				limitTime : massageInfo.limitTime,
				shopInfoData: shopInfoData
			},function(html){
				$("#itemDetailsOfServeView").html(html);
				if(activityId==0){
					_this.getMassageComment(massageInfo)
				}
				_this.endFun(massageInfo);
			});
			
		},getMassageComment:function(massageInfo){
			
			//type 0：员工的评论 1 店铺的评论 2 服务卡的评论 3 服务的评论 4 产品的评论 5 订单的评论（必填
			$.ajax({
				url:request.shop.getCommentInfo,
				data:{
					shop_id: shopId,
					flag  :  3,
					id  : itemId
				},
				type:"get",
				dataType:"json",
				success: function(data){
					if(data.status == 200 ){
						var massageCommentInfo;
						if(data.content ){
							var decodeData =  globalUtil.b64ToUtf8(data.content);
								decodeData=JSON.parse(decodeData);
							if(decodeData.length>0){
								massageCommentInfo=decodeData;
							}else{
								massageCommentInfo="";
							}
						}else{
							massageCommentInfo="";
						}
						console.log("评论",massageCommentInfo);
						laytpl($("#massageCommentTemp").html()).render({
							content:massageCommentInfo,
							massageInfo:massageInfo
						},function(html){
							$("#itemDetailsOfServeView").append(html);
						});
						
					}
				}
			});   
		},getShopInfoFun:function(){
 			
 			var localHref=window.location.href.toString(),
		 	locals=localHref.split("#"),
		 	currentUrl=locals[0];
 			
 			//1获取经纬度
 			globalUtil.getEchoOrientation({
 				appId: appId,
 				currentUrl: currentUrl,
 				userId: userId
 			}, function(latitude,longitude){
 			//2获取店铺信息
 				$.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id   :  openId,
		        		 longitude :  longitude,
		        		 latitude  :  latitude
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 async:false,
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj =  globalUtil.b64ToUtf8(data.content),
			 					 shopInfoData =  JSON.parse(decodeObj);
		 					 
			 					 store.remove("sharedShopInfoData");
			 					 store.set("sharedShopInfoData",shopInfoData);
		 				 }
		 			 }
		      });
 			});
 		},getQR:function(userId){
 			$.ajax({
	        	 url:request.user.getQR,
	        	 data:{
	        		user_id:userId
	        	 },
	        	 type:"get",
	 			 dataType:"json",
	 			 async:false,
	 			 success:function(data){
	 				 if(data.status == 200 && data.content){
	 					 var decodeObj =  globalUtil.b64ToUtf8(data.content);
	 					 var content = JSON.parse(decodeObj);
	 					layer.open({
	 						 type: 1,
						    content:"<div class='openShopBcode' style=''>"+
						    "<p class='ShopBcodeimg'><img src='"+content.qr_file_url+
						    "'width='83' height='82'></p>"+
						    "<a class='ShopBcodebut'>长按识别二维码并关注，立即购买</a></div>"
						   
						});
	 				 }
	 			 }
	      });
		},endFun:function(massageInfo){
			var _this = this;
 			var shopInfoData =store.get("sharedShopInfoData");
			globalUtil.globalShareFun({
				urlSend: location.href.toString().split("#")[0],
				imgUrlSend:massageInfo.massage_img_url,
				//titleSend: massageInfo.massage_name + "-" + shopInfoData.shop_other_name
				titleSend:  "欢迎光临" + shopInfoData.shop_name
			});
			//关注二维码
			  $(".wxtx_products_but2,.share_wxtopBut").click(function(){
				  _this.getQR(userId);
			  });
			 //点击 进入店铺主页
			  $("#shopHomeInfo1").click(function(){
				  location.href= GLOBAL.webRoot +"/agent/manager-share-wx_shop_home_share?userId="+userId+
				  				"&appId="+appId+
				  				"&openId="+openId+
				  				"&shopId="+shopId;
			  });
		}
	};
	massageSaleShare.init();
});