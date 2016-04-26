//商家推荐 分享

$(function(){
	//商家推荐
	
	var openId= $("body").attr("data-open-id"),
	    userId = $("body").attr("data-user-id"),
	    appId  = $("body").attr("data-app-id"),
	    shopId = getUrlParam("shopId");
	
	var form = getUrlParam("from");
 
	
 	var event={
 		init: function(){
 				
 				globalUtil.changeTitle('商家推荐');
 				//fastClick 
 				FastClick.attach(document.body);
 				
 				this.getAdviceListData(shopId);
 				this.getShopInfoFun(shopId);
 			
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
						  var shopInfoData=store.get("sharedShopInfoData");
					  
						  globalUtil.globalShareFun({
							  titleSend:"让自己变得更美，快来看看"+shopInfoData.shop_name+"的吐血推荐吧~" ,
							  imgUrlSend: recommendationList[0].img_url,
							  urlSend: window.location.href.toString(),
							  descption: '',
						  });
					  },500);
					//关注二维码
					  $(".share_wxtopBut").click(function(){
						 
						  _this.getQR(userId)
						  
					  });
					  
					  _this.endFun();
					  
				    });
				
				//没有商家推荐
					 
				}else{
				/*	laytpl( $("#noRecommendationTemp").html() ).render(
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
						  
						  
					    });*/
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
		 					  //分享
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
	 				 }else{
	 					 alert(data.errorMessage);
	 				 }
	 			 }
	      });
		},endFun:function(){
			var _this = this;
 		/*	if(!appId || !accessToken){
 				
 				return;
 			}
 			*/
 			$("#checkAllServe").on("click",function(){
				//更多
				location.href=GLOBAL.webRoot + "/agent/manager-share-wx_item_list_share?userId="+userId+"&shopId="+shopId+ "&appId="+appId+"&openId="+openId ;
			});
		
 			
		  //点击 进入0卡项，1护理，2产品 详情
		  $("ul[data-click='true']").on("click",function(){
			    var itemId = $(this).attr("data-item-id");
			    var cardType =$(this).attr("data-card-type");
				
					var itemType =$(this).attr("data-item-type");
						if(itemType==0){
							window.location.href= GLOBAL.webRoot + "/agent/manager-share-wx_card_sale_info_share?shopId="+shopId +"&itemType=card" +"&itemId="+ itemId+"&cardType="+cardType+"&form="+form+"&userId="+userId;
						}else if(itemType==1){
							window.location.href= GLOBAL.webRoot + "/agent/manager-share-wx_massage_sale_info_share?shopId="+shopId +"&itemType=massage" +"&itemId="+ itemId+"&activityId=0"+"&form="+form+"&userId="+userId;
						}else if(itemType==2){
							window.location.href= GLOBAL.webRoot + "/agent/manager-share-wx_product_sale_info_share?shopId="+shopId +"&itemType=product" +"&itemId="+ itemId+"&activityId=0"+"&form="+form+"&userId="+userId;
						}
		  });
		  
		
 		}
 		
 	};
 	
 	event.init('执行');
	
});