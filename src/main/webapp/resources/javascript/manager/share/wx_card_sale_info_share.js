$(function(){
	
	var shopId   = $("body").attr("data-shop-id");
	
	var appId =getUrlParam("appId");
	var userId =getUrlParam("userId")
	var openId =getUrlParam("openId");

	
	//护理 产品 卡
	var itemType	= 	getUrlParam("itemType");
	var itemId    	=   getUrlParam("itemId");
	var cardType 	= 	getUrlParam("cardType");
	var from        =   getUrlParam("from");
	var activityId  = 	getUrlParam("activityId") || 0;
	
	//活动详情
	var activityInfo;
    
	var discountedMoney=0;
	var webRoot = GLOBAL.contextPath;
	//卡详情
	var cardInfo;
	//url数据
	var urlData = {
			itemType:itemType,
			cardType:cardType,
			webRoot: GLOBAL.webRoot,
			itemId:itemId};
	
	
	var cardSale={
		init: function(){
			$("title").html("卡项详情");
			//fastClick 
			FastClick.attach(document.body);
			if(shopId && itemId ){
				if(activityId>0){
					//查活动详情
					this.getActivityInfo();
					//查询活动价格
					this.getEventCardInfo();
					globalUtil.changeTitle('立即购买');
				}
				this.getShopInfoFun();
				this.getCardInfoData(shopId);
			}
			
		},getEventCardInfo:function(){
			var _this=this;
			$.ajax({
				url: request.shop.getEventPriceById,
				data:{
					shop_id 	:  shopId,
					item_id     :  itemId,
					activity_id :  activityId,
					item_type   :  0 //项目类型（必填）（0：卡项 1：护理 2：产品）
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
		},getCardInfoData: function(shopId){

			var _this=this;
			//卡项详情
			$.ajax({
				url:request.shop.getCardDetailsOfShopServe,
				data:{
					shop_id 		 :  shopId ,
					cardtype_id      :  itemId,
					activity_id      :  activityId || 0
				},
				type:"get",
				dataType: "json", 
				success :function(data){
					if(data.status === 200 && data.content ){
						var decodeData =  globalUtil.b64ToUtf8(data.content);
						 cardInfo = JSON.parse(decodeData);
						 console.log("cardInfo:",cardInfo);
						    //计算倒计时     传入秒
						    if(cardInfo.limit_time){
						    	var limitTime = arrive_timer_format(cardInfo.limit_time); 
						    	cardInfo.limitTime=limitTime;
						    }
						    
						    
						//从卡详情里分离出 产品类list 产品单项list  护理类list  护理单项list
						//flag=1, // 1：表示为护理项目2：表示为产品 3：表示护理项目分类 4：表示产品分类
					   
					   cardInfo.item_list.sort(function(a,b){
						   if(a.flag && (a.flag==1 || a.flag==2)){
							   return 1;   
						   }
						   if(b.flag && (b.flag==3 || b.flag==4)){
							   return -1;  
						   }
					   });
						
					   _this.getCardInfoRender(cardInfo,shopId,itemId);
					   

					}else{
						alert("获取数据失败~");
					};
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			});
		
		
		},getActivityInfo:function(){
			//活动详情
			$.ajax({
				url:request.event.getPromotionsDeatils,
				data:{
					activity_id:activityId,
					shop_id:  shopId
				},
				type:"get",
				dataType: "json",
				success :function(data){
					if(data.status === 200 && data.content && data.content!='[]'){
						var content =  globalUtil.b64ToUtf8(data.content);
						activityInfo = JSON.parse(content);
							
					}
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			 });
			
		},getCardInfoRender:function(cardDetailsfShopServe,shopId,itemId){
			var _this=this;
			var shopInfoData =store.get("sharedShopInfoData");
			 laytpl( $("#cardSaleTemp").html() ).render({
					content:cardDetailsfShopServe,
					urlData: urlData,
					webRoot: webRoot,
					shopId: shopId,
					shopInfoData: shopInfoData || {},
					activityId: activityId,
					activityInfo: activityInfo,
					discountedMoney: discountedMoney,
					limitTime: cardDetailsfShopServe.limitTime || ""
				}, function(html){
				  $("#itemDetailsOfServeView").html(html);
				  _this.endFun(cardDetailsfShopServe);
				  
				  if(activityId==0){
					  _this.getDetailsComment(shopId,itemId);
				  }
				  
			    });
			
		},getDetailsComment:function(shopId,itemId){
			//type 0：员工的评论 1 店铺的评论 2 服务卡的评论 3 服务的评论 4 产品的评论 5 订单的评论（必填
			$.ajax({
				url:request.shop.getCommentInfo,
				data:{
					shop_id: shopId,
					flag  :  2,
					id  : itemId
				},
				type:"get",
				dataType:"json",
				success: function(data){
					if(data.status === 200 && data.content){
						var decodeData = globalUtil.b64ToUtf8(data.content);
						var cardComment = JSON.parse(decodeData);
						console.log("cardComment",cardComment);
						laytpl($("#cardInfoCommentTemp").html()).render({
							cardComment:cardComment 
						},function(html){
							$("#itemDetailsOfServeView").append(html);
							
						});
					}else if(data.status === 200 && !data.content){
						var cardComment="";
						laytpl($("#cardInfoCommentTemp").html()).render({
							cardComment:cardComment 
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
		        		
		        		 longitude :  longitude,
		        		 latitude  :  latitude
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 async:false,
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj =  globalUtil.b64ToUtf8(data.content);
			 				 var shopInfoData =  JSON.parse(decodeObj);
		 					 
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
 		},endFun:function(cardInfo){
 			var _this = this;
				//分享
 			    var  shopInfoData = store.get("sharedShopInfoData");
				  globalUtil.globalShareFun({
						urlSend: location.href.toString().split("#")[0],
						imgUrlSend:cardInfo.img_url,
						//titleSend: cardInfo.cardtype_name + "-" + shopInfoData.shop_other_name
						titleSend:  "欢迎光临" + shopInfoData.shop_name
				  });
				  
				  $(".wxtx_products_but2,.share_wxtopBut").click(function(){
					  _this.getQR(userId);
				  });
		}
	};
	cardSale.init();
	
});