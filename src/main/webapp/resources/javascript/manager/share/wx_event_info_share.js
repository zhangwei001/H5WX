$(function(){
	
	var activityId = getUrlParam("activityId");
	var shopId     =getUrlParam("shopId");
	var from       = getUrlParam("from");
	var userId       = getUrlParam("userId");
	var shopInfoData;//店铺信息
	var eventContent;//活动详情
	var eventInfo={
			init: function(){
				//fastClick 
				FastClick.attach(document.body);
				if(shopId){
					this.getShopInfo();
						
				}else{
					//跳转选择店铺页面
	 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
	 			}
				
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
			},getShopInfo:function(){
				var _this = this;
				$.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId
		        		
		        	 },
		        	 type:"get",
		        	 async:false,
		 			 dataType:"json",
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj =  globalUtil.b64ToUtf8(data.content),
		 					  		shopInfoData =  JSON.parse(decodeObj);
		 					 	   console.log("shopInfoData",shopInfoData);
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
				var _this = this;
				if(data.status === 200 && data.content && data.content!='[]'){
					var content = globalUtil.b64ToUtf8(data.content);
					eventContent = JSON.parse(content);
					    console.log("活动详情",eventContent);
					    store.remove("promotions_activity_info");
					    store.set("promotions_activity_info",eventContent);
					    
					 laytpl( $("#promotionDetailsTemp").html() ).render({
								webRoot:GLOBAL.webRoot,
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
					        		  window.location.href = webRoot + "agent/manager-share-wx_card_sale_info_share?itemType="+itemType +"&itemId="+itemId+"&cardType="+cardType+"&shopId="+shopId+"&from="+from +"&activityId="+activityId+"&userId="+userId;
					        	  }else if(itemType==1){
					        		  itemType="massage";
					        		  window.location.href = webRoot + "agent/manager-share-wx_massage_sale_info_share?itemType="+itemType +"&itemId="+itemId+"&shopId="+shopId+"&from="+from +"&activityId="+activityId+"&userId="+userId;
					        	  }else if(itemType==2){
					        		  itemType="product";
					        		  window.location.href = webRoot + "agent/manager-share-wx_product_sale_info_share?itemType="+itemType +"&itemId="+itemId+"&shopId="+shopId+"&from="+from +"&activityId="+activityId+"&userId="+userId;
					        	  };
					        	  
					          });
					       //关注二维码
							  $(".share_wxtopBut").click(function(){
								 
								  _this.getQR(userId)
								  
							  });
					          
					          //滑动效果	
							 new Swiper('.swiper-container', {
								 pagination: '.swiper-pagination',
								 paginationClickable: true,
								 lazyLoading:true
							 });
							 //分享
							  globalUtil.globalShareFun({
									urlSend: location.href.toString().split("#")[0],
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