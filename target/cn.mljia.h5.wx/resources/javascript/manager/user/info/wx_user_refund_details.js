$(function(){
	
	//localstorage获取全局变量
	var globalVar = store.get("globalVar");
	if(globalVar){
		var appId     = globalVar.appId;
		var openId   = globalVar.openId;
		var userId     = globalVar.userId;
		var accessToken = globalVar.accessToken;
	}   
	
	var message =getUrlParam("message") || 0;
	//localstorage获取店铺信息
	var shopInfoData = store.get("shopInfoData");
	
	//路由参数
	var orderId = getUrlParam("orderId");
	var shopId   = getUrlParam("shopId");
	//订单详情
	if(shopInfoData){
		var shopSid = shopInfoData.s_id || getUrlParam("shopSid");
	}
	
	
	var refundDetalis ={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle("消费详情");
				  //关闭分享
				  globalUtil.globalShareFun();
				this.getShopInfoFun(shopId);
				if(message==1){
					//如果从消息过来的，从新赋全局变量等
					appId=getUrlParam("appId");
					openId=getUrlParam("openId");
					userId=getUrlParam("userId");
					accessToken= this.getAccessToken() || getUrlParam("accessToken")  ;
					shopSid= getUrlParam("shopSid");
				    shopId  = getUrlParam("shopId");
				
				}else{
					this.getRefundDetailsData();
				}
				
				
			},getShopInfoFun:function(shopId){
	 			var _this = this;
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
			 					if(message==1){
			 						_this.getRefundDetailsData();
			 					}
			 				 }
			 			 }
			      });
	 			});
	 		},getAccessToken:function(){
				var massageAccessToken ;
				$.ajax({
					url:request.user.getAccessToken,
					data:{app_id:appId,open_id:openId},
					type:'get',
					dataType:'json',
					async:false,
					success:function(data){
						if(data.status == 200 && data.content){
							massageAccessToken=data.content;
						}
					}
				});
				return massageAccessToken;
			},getRefundDetailsData:function(){
				var _this = this;
				$.ajax({
					//TODO
					url: request.user.userOrderItermInfo,
					type:"get",
					data:{
							shop_id : shopSid,
							order_id : orderId,
							app_id :appId,
							open_id :openId
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content = globalUtil.b64ToUtf8(data.content,"utf8");
							    content=JSON.parse(content);
							  // console.log("订单详情",content);
							   
							   _this.rendRefundDetailsTemp(content);
							
						}else{
							alert("获取数据失败");
						}
					},error:function(e){
						
					}	
						
				});
			},rendRefundDetailsTemp:function(content){
				laytpl($("#refundDetailsTemp").html()).render({ 
					content:content,
					globalVar:globalVar,
					jing:"#",
					webRoot:GLOBAL.webRoot,
					shopInfoObj : shopInfoData || store.get("shopInfoData")
				}, function(html){
					$("body").find("div").remove();
				    $("body").append(html);
				    if(message==1){
				    	globalUtil.changeTitle("消费详情");
				    }
				    
			    });
			}
	};
	refundDetalis.init();

	
});