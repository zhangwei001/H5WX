$(function(){
	
	var shopId   = $("body").attr("data-shop-id");
	    
	var globalVar = store.get("globalVar");
	var appId    =globalVar.appId;
	var userId   =globalVar.userId;
	var openId  = globalVar.openId;
	var accessToken = globalVar.accessToken;
	
	
	//由全局变量中获取店铺信息
	var shopInfoData = store.get("shopInfoData");
	
//	console.log("shopInfoData",shopInfoData);
	//促销活动信息
	//var activityInfo = store.get("promotions_activity_info");
	
	//护理 产品 卡
	var itemType	= 	getUrlParam("itemType");
	var itemId    	=   getUrlParam("itemId");
	var cardType 	= 	getUrlParam("cardType");
	var from        =   getUrlParam("from");
	var activityId  = 	getUrlParam("activityId") || 0;
	
	//二维码过来
	var qrCode     = getUrlParam("qrCode");
	
	
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
			//fastClick 
			FastClick.attach(document.body);
			globalUtil.changeTitle('卡项详情');
			if(shopId && itemId ){
				if(activityId>0){
					//查询活动价格
					this.getEventCardInfo();
					this.getEventInfo();
					
				}
				
				this.getCardInfoData(shopId);
			}else{
 				//跳转选择店铺页面
 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
 			}
			
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
						  //  console.log("活动详情",eventContent);
						    store.remove("promotions_activity_info");
						    store.set("promotions_activity_info",eventContent);
					}
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			 });
			
			
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
						var decodeData =globalUtil.b64ToUtf8(data.content,"utf-8");
						var eventInfo = JSON.parse(decodeData);
						
						discountedMoney=eventInfo.pre_price||0;//项目优惠价
						_this.getCardInfoData(shopId);
						
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
						var decodeData =globalUtil.b64ToUtf8(data.content,"utf-8");
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
						
					 console.log("cardInfo.item_list",cardInfo.item_list);
					   _this.getCardInfoRender(cardInfo,shopId,itemId);
					   

					}else{
						alert("获取数据失败~");
					};
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			});
		
		
		},getCardInfoRender:function(cardDetailsfShopServe,shopId,itemId){
			var _this=this;
			var shopInfoData = store.get("shopInfoData");
			//促销活动信息
			var activityInfo = store.get("promotions_activity_info");
			var activityId = getUrlParam("activityId");
			
			
			
			 laytpl( $("#cardSaleTemp").html() ).render({
					content:cardDetailsfShopServe,
					urlData: urlData,
					webRoot: webRoot,
					shopId: shopId,
					shopInfoData: shopInfoData || {},
					activityId: activityId,
					activityInfo: activityInfo,
					qrCode:qrCode,
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
						var decodeData =globalUtil.b64ToUtf8(data.content,"utf-8");
						var cardComment = JSON.parse(decodeData);
					//	console.log("cardComment",cardComment);
						laytpl($("#cardInfoCommentTemp").html()).render({
							cardComment:cardComment,
							webRoot:GLOBAL.webRoot
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
		},endFun:function(cardInfo){
				  //类 跳转 
				  //flag=1, // 1：表示为护理项目2：表示为产品 3：表示护理项目分类 4：表示产品分类
		          
			
				  $("ul[data-click='true']").click(function(){
					  
					 var flag    = $(this).attr("data-item-flag");
					  if(flag==3 || flag == 4){
						  //护理产品类id
						  var typeId = $(this).attr("data-item-id");
					  }else if(flag==1 || flag == 2){
						  //护理 或者 产品 项目id
						  var itemId =$(this).attr("data-item-id");
					  }else{
						  alert("数据错误");
					  }
					 
					 var discount = $(this).attr("data-item-discount");
					 var cardType  = $(this).attr("data-item-cardtype");
					 
					 
					//护理情详
					 if(flag==1){
					 location.href= GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemId="+itemId +
						 "&shopId="+shopId + 
						 "&activityId=0" +
						 "&discount="+discount+
						 "&from="+from;
					 //产品情详
					 }else if(flag==2){
						// http://192.168.10.12/wx/agent/manager-shop-product-wx_product_sale_info?itemId=104&shopId=2&customId=1&activityId=0&from=item
					 location.href = GLOBAL.webRoot + "/agent/manager-shop-product-wx_product_sale_info?itemId=" +itemId +
						 "&shopId="+shopId+
						 "&activityId=0"+
						 "&discount="+discount+
						 "&from="+from;
					 //护理项目分类 产品分类
					 }else if(flag==3 ||flag==4 ){
					  location.href = GLOBAL.webRoot + "/agent/manager-shop-card-wx_card_sale_info_item?shopId="+shopId+
					  	"&flag="+flag+
					  	"&typeId="+typeId+
					  	"&discount="+discount+
					  	"&cardType="+cardType+
					  	"&from="+from
					 }else {
						 alert("数据错误");
					 }
					 
				  });
				  
				  //立即预约
				  var hrf= webRoot + "/agent/manager-shop-card-wx_card_sale?shopId="+shopId +
				  "&userId="+userId+
				  "&itemId="+ urlData.itemId +
				  "&itemType="+ urlData.itemType +
				  "&cardType="+urlData.cardType+
				  "&activityId="+activityId+
				  "&discountedMoney="+discountedMoney+
				  "&givenMoney="+(cardInfo.give_money ||0)+
				  "&from="+from;
				 // $("#reserveNow").attr("href",hrf);
				  
				  //按钮效果
				  var resereBtn =  $("#reserveNow");
				  resereBtn.click(function(){
					  resereBtn.css({"box-shadow":"0px 10px 14px #888888"});
					  setTimeout(function(){
						  resereBtn.css({"box-shadow":""});
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
						urlSend: GLOBAL.contextPath+"/agent/manager-share-wx_card_sale_info_share?itemType=card&itemId="+itemId +"&shopId="+shopId +"&cardType="+cardType+"&activityId="+activityId+"&from="+from+"&userId="+userId,
						imgUrlSend:cardInfo.img_url,
						//titleSend: cardInfo.cardtype_name + "-" + shopInfoData.shop_other_name
						titleSend:  "欢迎光临" + shopInfoData.shop_name

				  })
		}
	};
	cardSale.init();
	
});