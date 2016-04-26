// 服务项目  卡 护理 产品   

$(document).ready(function(){
 
	var globalVar = store.get("globalVar")||{};
	var openId = globalVar.openId || globalUtil.getUrlParam("openId");
	var userId = globalVar.userId|| globalUtil.getUrlParam("userId");
	var appId  = globalVar.appId|| globalUtil.getUrlParam("appId");
	var accessToken = globalVar.accessToken || globalUtil.getUrlParam("accessToken");
	
	
	//设置全局变量
 	var globalVar={};
 		globalVar.userId=userId;
 		globalVar.appId=appId;
 		globalVar.openId=openId;
 		globalVar.accessToken =accessToken;
 		
 	store.remove("globalVar");	
 	store.set("globalVar",globalVar);
	
	var customId;
	var shopId   =globalUtil.getUrlParam("shopId");
	var cardId = $("body").attr("data-card-id");
	var cardType = $("body").attr("data-card-type");
	
	
	
	sessionStorage.setItem("card_server_tips_jump_others", 1);
	
	
	var urlData = {
					"cardId":cardId,
					"openId":openId,
					"cardType":cardType,
					"shopId":shopId,
					"userId":userId,
					"appId":appId,
					"webRoot":GLOBAL.webRoot
	};
	

	
	
	var services={
			init:function(){
				 globalUtil.changeTitle("服务分类");
				//fastClick 
					FastClick.attach(document.body);
				 //关闭分享
	 				globalUtil.globalShareFun('');
	 				/*window.onhashchange= function(){
	 					location.reload("true");
	 				}	*/
				 if(shopId){
					 
					 var hsh=location.hash;
					 if(hsh.indexOf("product")>-1){
						 this.getProductList();
					 }else if(hsh.indexOf("massage")>-1){
						 this.getMassageList();
					 }else{
						 //默认卡项
						 this.getCardList();
					 }
					 this.getShopInfo();
				
				//获取顾客id
					 var customInfo= globalUtil.getCustomerId(openId,shopId)
					 	if(customInfo){
					 		customInfo= globalUtil.b64ToUtf8(customInfo,"utf-8");
							customInfo = JSON.parse(customInfo);
						    customId= customInfo.custom_id
					 	}
				 }else{
					 location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=itemAll";
				 }
				 
			},getShopInfo:function(){
				
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
			},getCardList : function(){
				var _this=this;
				//获取店铺服务卡列表
				$.ajax({
					url:request.shop.getCardListOfShopServe,
					data:{
						shop_id :  shopId,
						page:  1,
						rows:50,
						access_token: accessToken
					},
					type:"get",
					dataType: "json",
					success :function(data){
						if(data.status === 200 && data.content){
							
							var decodeData =globalUtil.b64ToUtf8(data.content,"utf-8");
								var cardListOfShopServe = JSON.parse(decodeData);
							if(cardListOfShopServe){
								laytpl( $("#cardListTemp").html() ).render({
									content:cardListOfShopServe,
									urlData:urlData,
									webRoot:GLOBAL.webRoot
								}, function(html){
								  $("#shopServeView").empty();
								
								  $("#shopServeView").append(html);
								  _this.toBindTabEvent();
								  _this.endFun();
								
								  //分享
								  setTimeout(function(){
									  var shopInfoData = store.get("shopInfoData");
									  globalUtil.globalShareFun({
					 						 titleSend : '欢迎光临'+shopInfoData.shop_name,
					 						 urlSend : GLOBAL.contextPath + "/agent/manager-share-wx_item_list_share?userId="+userId+"&openId="+openId +"&appId="+appId+"&shopId="+shopId,
					 						imgUrlSend: cardListOfShopServe[0].cardtype_img_url
					 				  });
								  },500);
							    });
							}	
							  
						}else{
							laytpl( $("#noCardListTemp").html() ).render({
								//content:cardListOfShopServe,
								urlData:urlData,
								webRoot:GLOBAL.webRoot
							}, function(html){
							  $("#shopServeView").empty();
							
							  $("#shopServeView").append(html);
							  _this.toBindTabEvent();
							   
						    });
						};
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				});
			},getProductList : function(){
				var _this = this;
				//获取某店铺产品列表
				var productListOfShopServe;
				$.ajax({
					url:request.shop.getProductListOfShopServe,
					data:{
						shop_id 		 :  shopId,
						page:  1,
						rows:50,
						access_token: accessToken
					},
					type:"get",
					dataType: "json",
					success :function(data){
						if(data.status === 200 && data.content){
							
							var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
								productListOfShopServe = JSON.parse(decodeData);
							    
								 laytpl( $("#productListTemp").html() ).render({
										content:productListOfShopServe,
										urlData:urlData,
										webRoot:GLOBAL.webRoot
									}, function(html){
									  $("#shopServeView").empty();
									
									  $("#shopServeView").append(html);
									  _this.toBindTabEvent();
									  _this.endFun();
								    });
								
							  
						}else{
							laytpl( $("#noProcudtListTemp").html() ).render({
								//content:cardListOfShopServe,
								urlData:urlData,
								webRoot:GLOBAL.webRoot
							}, function(html){
							  $("#shopServeView").empty();
							
							  $("#shopServeView").append(html);
							  _this.toBindTabEvent();
							   
						    });
						};
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				});
			}, getMassageList : function(){ 
				var _this = this;
				//获取某店铺的护理列表
				var massageListOfShopServe;
				$.ajax({
					url:request.shop.getMassageListOfShopServe,
					data:{
						shop_id :  shopId ,
						page:  1,
						rows:50,
						access_token: accessToken
					},
					type:"get",
					dataType: "json",
					success :function(data){
						if(data.status === 200 && data.content){
							
							var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
								massageListOfShopServe = JSON.parse(decodeData);
								
								 laytpl( $("#massageListTemp").html() ).render({
										content:massageListOfShopServe,
										urlData:urlData,
										webRoot:GLOBAL.webRoot
									}, function(html){
									  $("#shopServeView").empty();
									
									  $("#shopServeView").append(html);
									  _this.toBindTabEvent();
									  _this.endFun();
								 });
								
							 
						}else{
							laytpl( $("#noMassageListTemp").html() ).render({
								//content:cardListOfShopServe,
								urlData:urlData,
								webRoot:GLOBAL.webRoot
							}, function(html){
							  $("#shopServeView").empty();
							
							  $("#shopServeView").append(html);
							  _this.toBindTabEvent();
							   
						    });
						};
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				});
			},toBindTabEvent :function(){
				//每次渲染后，绑定的点击事件失效，因此，在每次渲染后从新绑定
				var _this =this;
					 
					 $("#tabs").find("li[data-item-nav='true']").click(function(event){
						
						 var $this = $(this);
						 $this.toggleClass("activ").siblings("li").removeClass("activ");
						 $this.addClass("activ");
						 
						 if(event.target.innerText =="卡项"){
							 _this.getCardList();
							 _this.endFun();
							// location.href= location.href.split("#")[0]+"#"+"card";
							 
						 }else if (event.target.innerText =="护理"){
							 _this.getMassageList();
							 _this.endFun();
							// location.href= location.href.split("#")[0]+"#"+"massage";
							 
						 }else if(event.target.innerText == "产品"){
							 _this.getProductList();
							_this.endFun();
							// location.href= location.href.split("#")[0]+"#"+"product";
						 }
						 
					 });
			    
		},endFun:function(){
			
			
			if(!userId || !accessToken){
				//如果打开该页面时候，没有userId或者accessToken参数表示是分享出去的链接，不允许点击去预约
				return;
			}
			
			
			$("ul[data-click='true']").click(function(){
				var massageId =  $(this).attr("data-massage-id");
				var productId =  $(this).attr("data-product-id");
				var cardId    = $(this).attr("data-card-id");
				var cardType  = $(this).attr("data-card-type");
				var shopId    =$(this).attr("data-shop-id");
				
				if(massageId){
					location.href= GLOBAL.webRoot + "/agent/manager-shop-massage-wx_massage_sale_info?itemId="+massageId+"&shopId="+shopId+"&activityId=0&from=item";
				}else if(productId){
					location.href= GLOBAL.webRoot + "/agent/manager-shop-product-wx_product_sale_info?itemId="+productId+"&shopId="+shopId+"&activityId=0&from=item";
				}else if(cardId){
					location.href= GLOBAL.webRoot+ "/agent/manager-shop-card-wx_card_sale_info?itemId="+cardId+"&cardType="+cardType+"&shopId="+shopId+"&activityId=0&from=item";
				}
			});
			
			 //分享
			var shopInfoData=store.get("shopInfoData");
			
			
					
		}
	};
	
	
	services.init('执行');
	
	
});
