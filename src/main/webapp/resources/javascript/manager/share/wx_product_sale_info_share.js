//分享产品详情

$(function(){
	var appId =getUrlParam("appId");
	var userId =getUrlParam("userId")
	var openId =getUrlParam("openId")
	
	/* **********************放到本地的信息**************************************** */
	//活动详情，活动介绍
	var activityInfo = store.get("promotions_activity_info");
	//店铺信息
	var shopInfoData = store.get("shopInfoData");
	
	
	/* **********************URL参数**************************************** */
	var from  = getUrlParam("from");
	var customId = getUrlParam("customId");
	var activityId = getUrlParam("activityId");//活动编号
	var discountedMoney = getUrlParam("discountedMoney");//活动价格
	//护理 或者产品 
	var itemType = getUrlParam("itemType");
	//卡 护理 产品 Id
	var itemId =   getUrlParam("itemId");
	
	var maxTimesORdiscount = getUrlParam("maxTimesORdiscount");
	var isGiven = getUrlParam("isGiven");
	
	//从二期耗卡预约过来的 “类Id”
	var itemTypeId = getUrlParam("itemTypeId") || "";
	
	
	var shopId   = $("body").attr("data-shop-id");
	var webRoot = GLOBAL.contextPath;
	//url数据
	var urlData = {
			itemType:itemType,
			webRoot: webRoot,
			itemId:itemId
			};
	
	var productSale={
			init:function(){
				$("title").html("产品详情");
				//fastClick 
				FastClick.attach(document.body);
				if(shopId && itemId){
					this.getShopInfoFun();
					this.getProductInfoData(shopId);
				}else{
	 				//跳转选择店铺页面
	 				//location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
	 			}
				if(activityId>0){
					this.getEventCardInfo();
				}
				
			},getProductInfoData:function(shopId){
				var _this=this;
				$.ajax({
					url:request.shop.getProductDetailsOfShopServe,
					data:{
						shop_id 		:  shopId,
						product_id      :  itemId,
						activity_id     :  activityId || 0
					},
					type:"get",
					dataType: "json", 
					success :function(data){
						if(data.status === 200 && data.content ){
							var decodeData =  globalUtil.b64ToUtf8(data.content);
								var productInfo = JSON.parse(decodeData);
								console.log("productInfo",productInfo);
							    //计算倒计时     传入秒
							    if(productInfo.limit_time){
							    	var limitTime = arrive_timer_format(productInfo.limit_time);
							    	productInfo.limitTime=limitTime;
							    }
							    _this.getProductInfoRender(productInfo,shopId,itemId);
						}else{
							alert("获取数据失败~");
						};
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				});
				
				
			},getProductInfoRender:function(productInfo,shopId,itemId){
				var _this=this;
				var shopInfoData = store.get("sharedShopInfoData");
				laytpl($("#productSaleTemp").html()).render({
					content: productInfo,
					urlData: urlData,
					from:from,
					customId:customId,
					activityId: activityId || 0,
					activityInfo: activityInfo,
					limitTime : productInfo.limitTime,
					discountedMoney: discountedMoney,
					shopInfoData: shopInfoData
				},function(html){
					$("#itemDetailsOfServeView").html(html);
					
					if(activityId==0){
						//非活动页面出现评论
						_this.getProductComment(productInfo,shopId,itemId);
					}
					
					_this.endFun(productInfo);
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
			 					    console.log("分享出去 获得的店铺信息",shopInfoData);
				 					 store.remove("sharedShopInfoData");
				 					 store.set("sharedShopInfoData",shopInfoData);
			 				 }
			 			 }
			      });
	 			});
	 		},getEventCardInfo:function(){
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
			},getProductComment:function(productInfo,shopId,itemId){
				
				//type 0：员工的评论 1 店铺的评论 2 服务卡的评论 3 服务的评论 4 产品的评论 5 订单的评论（必填
				$.ajax({
					url:request.shop.getCommentInfo,
					data:{
						shop_id: shopId,
						flag  :  4,
						id  : itemId
					},
					type:"get",
					dataType:"json",
					success: function(data){
						if(data.status == 200  ){
							var massageCommentInfo;
							if(data.content){
								var decodeData = globalUtil.b64ToUtf8(data.content);
								var decodeData=JSON.parse(decodeData);
								if(decodeData.length>0){
									massageCommentInfo=decodeData;
									
								}else{
									massageCommentInfo="";
								}
							}else{
								massageCommentInfo="";
							}
							
							laytpl($("#productCommentTemp").html()).render({
								content:massageCommentInfo,
								productInfo:productInfo
							},function(html){
								$("#itemDetailsOfServeView").append(html);
							});
						}else{
							alert("获取评论数据失败");
						} 
					}
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
			},endFun:function(productInfo){
				var _this = this;
			    //分享
				globalUtil.globalShareFun({
					urlSend: location.href.toString().split("#")[0],
					imgUrlSend:productInfo.product_img_url,
				//	titleSend: productInfo.product_name + "-" + shopInfoData.shop_other_name
					titleSend:  "欢迎光临" + shopInfoData.shop_name
				
				});
				//关注二维码
				  $(".wxtx_products_but2,.share_wxtopBut").click(function(){
					  _this.getQR(userId);
				  });
				
			}
			
	};
	
	
	
	productSale.init();
	
	
	
});