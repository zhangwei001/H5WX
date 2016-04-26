$(function(){
	//商家推荐
	
	var openId= $("body").attr("data-open-id") || getUrlParam("openId"),
	    userId = $("body").attr("data-user-id") || getUrlParam("userId"),
	    appId  = $("body").attr("data-app-id") || getUrlParam("appId"),
	    shopId = getUrlParam("shopId") ,
        accessToken =getUrlParam("accessToken") || getUrlParam("accessToken");
	
	
 	//设置全局变量
 	var globalVar={};
 		globalVar.userId=userId;
 		globalVar.appId=appId;
 		globalVar.openId=openId;
 		globalVar.accessToken =accessToken;
 		
 		store.remove("globalVar");	
 		store.set("globalVar",globalVar);
	
    var customId;
 	var event={
 		init: function(){
 			if(shopId){
 				//fastClick 
 				FastClick.attach(document.body);
 				globalUtil.changeTitle('商家推荐');
 				
 				this.getAdviceListData(shopId);
 				this.getShopInfoFun(shopId);
 				customId= globalUtil.getCustomerId(openId,shopId);
 				customId=  globalUtil.b64ToUtf8(customId);
 				customId=JSON.parse(customId).custom_id;
 				
 				
 			}else{
 				//跳转选择店铺页面
 				location.href = GLOBAL.contextPath + "agent/manager-shop-wx_select_shop_index?from=advice";
 			}
 			
 		},getAdviceListData: function(shopId){
 			
 			var _this=this;
 			$.ajax({
 				url:request.shop.getShopRecommendInfo,
 				data:{
 					shop_id:shopId,
 					app_id  :appId,
 					user_id :userId,
 					open_id :openId
 				},
 				type:"get",
 				dataType: "json",
 				success :function(data){
 					_this.getAdviceListDataRender(data,GLOBAL.webRoot);
 				},
 				error :function(){
 					alert("网络开了小差，重新试试吧~");
 				}
 			 });
 		},getAdviceListDataRender: function(data,webRoot){
 			var _this=this;
				if(data.status == 200 && data.content && data.content !='[]'){
					var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
					var recommendationList = JSON.parse(decodeData);
					//console.log("recommendationList",recommendationList);
				    var recommentListLen =recommendationList.length;
				    laytpl( $("#recommendationTemp").html() ).render({
						content:recommendationList,
						webRoot :webRoot
					}, function(html){
					  $("#recommendationView").empty();
					  $("#recommendationView").append(html);
					  
					  //修改title
					  globalUtil.changeTitle("商家推荐");
					  
					  setTimeout(function(){
						  var shopInfoData=store.get("shopInfoData");
						  
						  //分享
						  globalUtil.globalShareFun({
							  titleSend:"让自己变得更美，快来看看"+shopInfoData.shop_name+"的吐血推荐吧~" ,
							  imgUrlSend: recommendationList[0].img_url,
							  urlSend: GLOBAL.contextPath+"/agent/manager-share-wx_shop_advice_share?userId="+userId+"&openId="+openId +"&appId="+appId+"&shopId="+shopId,
							  descption: '',
						  });
						  
					  },500);
					 
					  
					  _this.endFun();
					  
				    });
				
				//没有商家推荐
					 
				}else{
					laytpl( $("#noRecommendationTemp").html() ).render(
							 {webRoot:GLOBAL.webRoot}, function(html){
						  $("#recommendationView").empty();
						  $("#recommendationView").append(html);
						  
						 //修改title
						  globalUtil.changeTitle("商家推荐");
						  
						  $("body").addClass("bgbai"); 
						  $("#recommendationView").parent("div").removeClass("bghui").addClass("bgbai");

							$("#checkAllServe").on("click",function(){
								location.href=GLOBAL.webRoot + "/agent/manager-shop-item-wx_item_list?userId="+userId+"&shopId="+shopId+ "&appId="+appId+"&openId="+openId +"&accessToken="+accessToken;
							});
							
							globalUtil.globalShareFun('关闭分享');
						  
						  
					    });
				};
				
 		},getShopInfoFun:function(shopId){
 			
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
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
		 					  		shopInfoData =  JSON.parse(decodeObj);
		 					store.remove("shopInfoData");
		 					store.set("shopInfoData",shopInfoData);
		 				 }
		 			 }
		      });
 			});
 		},endFun:function(){
 			if(!appId || !accessToken){
 				
 				return;
 			}
 			
 			$("#checkAllServe").on("click",function(){
				//更多
				location.href=GLOBAL.webRoot + "/agent/manager-shop-item-wx_item_list?userId="+userId+"&shopId="+shopId+ "&appId="+appId+"&openId="+openId +"&accessToken="+accessToken;
			});
		 
		  //点击 进入0卡项，1护理，2产品 详情
		  $("ul[data-click='true']").on("click",function(){
			    var itemId = $(this).attr("data-item-id");
			    var cardType =$(this).attr("data-card-type");
				
					var itemType =$(this).attr("data-item-type");
						if(itemType==0){
							window.location.href= GLOBAL.webRoot + "/agent/manager-shop-card-wx_card_sale_info?shopId="+shopId +"&itemType=card" +"&itemId="+ itemId+"&cardType="+cardType+"&from=advice"+"&activityId=0";
						}else if(itemType==1){
							window.location.href= GLOBAL.webRoot + "/agent/manager-shop-massage-wx_massage_sale_info?shopId="+shopId +"&itemType=massage" +"&itemId="+ itemId+"&customId="+customId+"&activityId=0"+"&from=advice";
						}else if(itemType==2){
							window.location.href= GLOBAL.webRoot + "/agent/manager-shop-product-wx_product_sale_info?shopId="+shopId +"&itemType=product" +"&itemId="+ itemId+"&customId="+customId+"&activityId=0"+"&from=advice";
						}
				});
 		}
 		
 	};
 	
 	event.init('执行');
	
});