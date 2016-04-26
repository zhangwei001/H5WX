$(function(){
	var globalVar = store.get("globalVar");
	var appId    =globalVar.appId;
	var userId   =globalVar.userId;
	var openId  = globalVar.openId;
	var accessToken = globalVar.accessToken;
	
	/* **********************放到本地的信息**************************************** */
	
	//店铺信息
	var shopInfoData = store.get("shopInfoData");
	
	
	/* **********************URL参数**************************************** */
	var from  = getUrlParam("from");
	var customId = getUrlParam("customId");
	var activityId = getUrlParam("activityId");//活动编号
	var discountedMoney ;//活动价格
	//护理 或者产品 
	var itemType = getUrlParam("itemType");
	//卡 护理 产品 Id
	var itemId =   getUrlParam("itemId");
	
	var maxTimesORdiscount = getUrlParam("maxTimesORdiscount");
	var isGiven = getUrlParam("isGiven");
	
	
	//二维码过来
	var qrCode     = getUrlParam("qrCode");
	
	//从二期耗卡预约过来的 “类Id”
	var itemTypeId = getUrlParam("itemTypeId") || "";
	
	var discount = getUrlParam("discount") || 10;//折扣
	
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
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle('产品详情');
				if(shopId && itemId){
					this.getProductInfoData(shopId);
				}else{
	 				//跳转选择店铺页面
	 				//location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
	 			}
				if(activityId>0){
					this.getEventProductInfo();
					this.getEventInfo();
				}
				
			},getEventProductInfo:function(){
				var _this=this;
				$.ajax({
					url: request.shop.getEventPriceById,
					data:{
						shop_id 	:  shopId,
						item_id     :  itemId,
						activity_id :  activityId,
						item_type   :  2 //项目类型（必填）（0：卡项 1：护理 2：产品）
					},
					type:"get",
					dataType: "json", 
					async:false,
					success :function(data){
						if(data.status === 200 && data.content ){
							var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
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
			},getEventInfo: function(){
				
				$.ajax({
					url:request.event.getPromotionsDeatils,
					data:{
						activity_id:activityId,
						shop_id:  shopId
					},
					type:"post",
					dataType: "json",
					success :function(data){
						if(data.status === 200 && data.content && data.content!='[]'){
							var content = globalUtil.b64ToUtf8(data.content,"utf8");
							eventContent = JSON.parse(content);
							    console.log("活动详情",eventContent);
							    store.remove("promotions_activity_info");
							    store.set("promotions_activity_info",eventContent);
						}
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				 });
				
				
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
							var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
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
				//活动详情，活动介绍
				var activityInfo = store.get("promotions_activity_info");
				laytpl($("#productSaleTemp").html()).render({
					content: productInfo,
					urlData: urlData,
					from:from,
					customId:customId,
					activityId: activityId || 0,
					activityInfo: activityInfo,
					qrCode:qrCode,
					limitTime : productInfo.limitTime,
					discountedMoney: discountedMoney,
					shopInfoData: shopInfoData,
					discount:discount
				},function(html){
					$("#itemDetailsOfServeView").html(html);
					
					if(activityId==0){
						//非活动页面出现评论
						_this.getProductComment(productInfo,shopId,itemId);
					}
					
					_this.endFun(productInfo);
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
								var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
								var decodeData=JSON.parse(decodeData);
								if(decodeData.length>0){
									massageCommentInfo=decodeData;
									console.log("massageCommentInfo",massageCommentInfo);
									
								}else{
									massageCommentInfo="";
								}
							}else{
								massageCommentInfo="";
							}
							
							laytpl($("#productCommentTemp").html()).render({
								content:massageCommentInfo,
								productInfo:productInfo,
								webRoot:GLOBAL.webRoot
							},function(html){
								$("#itemDetailsOfServeView").append(html);
							});
						}else{
							alert("获取评论数据失败");
						} 
					}
				}); 
				
				
			},endFun:function(productInfo){
				 //立即预约
				 if(from=="card"){
					 var hrf = webRoot + "agent/manager-shop-product-wx_product_sale?shopId="+shopId +"&isGiven="+isGiven+"&customId="+customId+"&itemId="+ urlData.itemId +"&itemType="+ urlData.itemType+"&activityId="+activityId+"&maxTimesORdiscount="+maxTimesORdiscount+"&discountedMoney="+discountedMoney+"&givenMoney="+productInfo.give_money+"&itemTypeId="+itemTypeId+"&from="+from;
				 }else if(from=="item" || from =="event" ) {
					 var hrf = webRoot + "agent/manager-shop-product-wx_product_sale?shopId="+shopId +"&itemId="+ urlData.itemId+"&customId="+customId +"&itemType="+ urlData.itemType+"&activityId="+activityId+"&discountedMoney="+discountedMoney+"&givenMoney="+productInfo.give_money+"&from="+from;
				 }else if(from=="shopHome" || from =="advice"){
					 var hrf = webRoot + "agent/manager-shop-product-wx_product_sale?shopId="+shopId +"&itemId="+ urlData.itemId+"&customId="+customId +"&itemType="+ urlData.itemType+"&activityId="+activityId+"&discountedMoney="+discountedMoney+"&givenMoney="+productInfo.give_money+"&from="+from;
				 }
				// $("#reserveNow").attr("href",hrf);
				 var reservBtn = $("#reserveNow");
				 reservBtn.click(function(){
					 reservBtn.css({"box-shadow":"0px 10px 14px #888888"});
					 setTimeout(function(){
						 reservBtn.css({"box-shadow":""});
						 window.location.href =hrf
					 },100);
				 });
				 //点击 进入店铺主页
				  $("#shopHomeInfo").click(function(){
					  location.href= GLOBAL.webRoot +"/agent/manager-shop-info-wx_shops_home?userId="+userId+
					  				"&appId="+appId+
					  				"&openId="+openId+
					  				"&accessToken="+accessToken+
					  				"&shopId="+shopId;
				  });
				 
				  //分享
				  globalUtil.globalShareFun({
						urlSend: GLOBAL.contextPath+"/agent/manager-share-wx_product_sale_info_share?itemType=product&&itemId="+itemId +"&&shopId="+shopId +"&activityId="+activityId+"&from="+from+"&userId="+userId,
						imgUrlSend:productInfo.product_img_url,
						//titleSend: productInfo.product_name + "-" + shopInfoData.shop_other_name
						titleSend:  "欢迎光临" + shopInfoData.shop_name
				  })
				
			}
			
	};
	
	
	
	productSale.init();
	
	
	
});