$(function(){
	
	var globalVar = store.get("globalVar");
	
	var openId= globalVar.openId;
	var userId = globalVar.userId;
	var appId  = globalVar.appId;
	
	var activityId = getUrlParam("activityId");
	var shopId     =getUrlParam("shopId");
	var from       = getUrlParam("from");
	var qrCode     = getUrlParam("qrCode") || false;//判断是否是从o2o扫码过来 true 是； false 否
	var shopInfoData;//店铺信息
	var eventContent;//活动详情
	var eventInfo={
			init: function(){
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle("优惠促销");
				if(shopId){
					this.getShopInfo();
						
				}else{
					//跳转选择店铺页面
	 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
	 			}
				
			},getShopInfo:function(){
				var _this = this;
				$.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id   :  openId
		        	 },
		        	 type:"get",
		        	 async:false,
		 			 dataType:"json",
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
		 					  		shopInfoData =  JSON.parse(decodeObj);
		 					 	  // console.log("shopInfoData",shopInfoData);
		 					 	 _this.getEventInfo(shopInfoData);
		 				 }
		 			 }
		      });
				
			},getEventInfo: function(shopInfoData){
				var _this=this;
				$.ajax({
					url:request.event.getPromotionsDeatils,
					data:{
						activity_id:activityId,
						shop_id:  shopId
					},
					type:"post",
					dataType: "json",
					success :function(data){
						_this.getEventInfoRender(GLOBAL.contextPath,data,shopInfoData);
					
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				 });
				
				
			},getEventInfoRender :function(webRoot,data,shopInfoData){
				//活动详情信息
				
				if(data.status === 200 && data.content && data.content!='[]'){
					var content = globalUtil.b64ToUtf8(data.content,"utf8");
					eventContent = JSON.parse(content);
					 //   console.log("活动详情",eventContent);
					    store.remove("promotions_activity_info");
					    store.set("promotions_activity_info",eventContent);
					    
					 laytpl( $("#promotionDetailsTemp").html() ).render({
								webRoot:webRoot,
						 		globalVar:globalVar,
								content:eventContent
						     }, function(html){
						      $("#promotionDetailsView").html(html);
						      
					          $("ul[data-click='true']").on("click",function(){
					        	  var itemId = $(this).attr("data-item-id");
					        	  var itemType =$(this).attr("data-item-type");
					        	  var cardType =$(this).attr("data-card-type");
					        	  var discountedMoney=$(this).attr("data-item-discounted-money");
					        	  
					        	  if(itemType==0){
					        		  itemType="card";
					        		  window.location.href = webRoot + "agent/manager-shop-card-wx_card_sale_info?itemType="+itemType +"&itemId="+itemId+"&cardType="+cardType+"&shopId="+shopId+"&from="+from +"&activityId="+activityId+"&qrCode="+qrCode;
					        	  }else if(itemType==1){
					        		  itemType="massage";
					        		  window.location.href = webRoot + "agent/manager-shop-massage-wx_massage_sale_info?itemType="+itemType +"&itemId="+itemId+"&shopId="+shopId+"&from="+from +"&activityId="+activityId+"&qrCode="+qrCode;
					        	  }else if(itemType==2){
					        		  itemType="product";
					        		  window.location.href = webRoot + "agent/manager-shop-product-wx_product_sale_info?itemType="+itemType +"&itemId="+itemId+"&shopId="+shopId+"&from="+from +"&activityId="+activityId+"&qrCode="+qrCode;
					        	  };
					        	  
					          });
					          
					          //滑动效果	
							 new Swiper('.swiper-container', {
								 pagination: '.swiper-pagination',
								 paginationClickable: true,
								 lazyLoading:true
							 });
							 //分享
							  globalUtil.globalShareFun({
									urlSend: GLOBAL.contextPath+"/agent/manager-share-wx_event_info_share?activityId="+activityId +"&shopId="+shopId +"&from="+from+"&userId="+userId,
									imgUrlSend:eventContent.img_urls[0],
									titleSend: "推荐"+shopInfoData.shop_name+"店铺"+eventContent.activity_name+",美的人已经点进来买了呢~"
							  })

					    });

					
				}else{
					alert("数据出现异常，请稍后再试！");
				};
				
			}
			
	};
	
	
	eventInfo.init();
	
	
});