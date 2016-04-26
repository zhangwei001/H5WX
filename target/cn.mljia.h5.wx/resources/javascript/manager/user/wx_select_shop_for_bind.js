$(function(){
	//未绑定顾客加入商家（userId下只有一个店铺直接去绑定，如果有N个店铺则列出）
	  var status=$('body').attr("data-status") || globalUtil.getUrlParam('status');//获取用户状态
	  
	  var globalVar=store.get("globalVar");
	  if(globalVar){
		  var userId =	globalVar.userId;
		  var appId=	globalVar.appId;
		  var openId=	globalVar.openId;
		  var accessToken = globalVar.accessToken;
	  }
	  
 var selectShop={
		 init:function(){
			//fastClick 
				FastClick.attach(document.body);
			 //关闭分享
			 globalUtil.globalShareFun('');
			 if(userId){
				 globalUtil.changeTitle('选择加入商家');
				 
				 this.getShopInfo();
			 }else{
				 alert('店主userID参数错误');
			 }
		 },getShopInfo:function(){
			 var _this=this;
			 
 			
 			 var localHref=window.location.href.toString(),
	 		 	 locals=localHref.split("#"),
	 		 	 currentUrl=locals[0];
			 
 			//获取经纬度
 			globalUtil.getEchoOrientation({
  				appId: appId,
  				currentUrl: currentUrl,
  				userId: userId
  			}, function(latitude,longitude){
  			//2获取店铺信息
  				 $.ajax({
				 		url : request.shop.shoplist,
				 		type : "get",
				 		data:{
 				 			user_id :userId,
 				 			app_id:  appId,
 				 			open_id: openId,
 				 			longitude:longitude,
 				 			latitude:latitude
 				 		},
				 		dataType : "json",
				 		success:function(data){
				 			if(data.status==200 && data.content){
				 				var content = globalUtil.b64ToUtf8(data.content,"utf8");
				 				var shopList = JSON.parse(content);
		 					    
		 					    var shoplistNum = shopList.length;
		 					    if(shoplistNum==1){
		 					    	
		 					   	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-user-wx_user_bind_page', {
			                 		userId:userId,
			                 		openId:openId,
			                 		status:status,
			                 		appId:appId,
			                 		accessToken:accessToken,
			                 		shopId:shopList[0].shop_id||0,
			                 	});
		 					    	 
		 					    }else{
		 					    	laytpl($("#selectShopTmpl").html()).render({
		 					    		webRoot: GLOBAL.contextPath,
		 					    		content: shopList
		 					    	},function(html){
		 					    		$("body").find("div").remove();
		 					    		$('body').append(html);
		 					    		
		 					    		_this.endFun();
		 					    	});
		 					    	
		 					    }
				 			}
				 		},error:function(){
				 			alert('服务错误');
				 		}
				 	});
  			});
 			 
   			
		 },endFun:function(){
			 $("div[data-click='true']").on("click",function(){
					var shopId=$(this).attr("data-shop-id");
							$("body").attr("data-shop-id",shopId);
							$("#wxShopListTmpl").remove();
						  	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-user-wx_user_bind_page', {
		                 		userId:userId,
		                 		status:status,
		                 		openId:openId,
		                 		accessToken:accessToken,
		                 		appId:appId||'',
		                 		shopId:shopId,
		                 	});
						  	
				});
		 }
 }; 
	
 
 
 
 selectShop.init();
	
	
	
	
	
	
	
	
});