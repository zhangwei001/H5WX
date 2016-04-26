//联系商家
$(function(){
	var userId =$("body").attr("data-user-id"); 
	var latitude = 0;
	var longitude = 0;
	
	var contextParth =$("body").attr("data-context-parth");
	var userId =window.getSearchString("userId");
	var appId = window.getSearchString("appId");
	var openId = window.getSearchString("openId");
	var accessToken =window.getSearchString("accessToken"); 
	
	// 连锁店 店铺list
	
	var connectShopApp ={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle("联系商家")
				this.rendShopLis();
			},rendShopLis:function(){
				var _this =this;
				
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
					 		url : request.shop.shoplist,
					 		type : "post",
					 		data:{
					 			user_id :userId,
					 			app_id: appId,
					 			
					 			latitude:latitude,
					 			longitude:longitude
					 		},
					 		dataType : "JSON",
					 		success:function(data){
					 			if(data.status == 200){
					 				if(data.content){
					 					var content = globalUtil.b64ToUtf8(data.content,"utf8");
					 					    content = JSON.parse(content);
					 					  //  console.log(content);
					 					var shoplistNum = content.length;
					 					
					 					laytpl($("#shopListTemp").html()).render({ 
						 					webRoot:GLOBAL.webRoot,
						 					content:content,
						 					shoplistNum:shoplistNum
						 				}, function(html){
				                            $("#shopListView").html(html);
				                            _this.getWXUserInfo();
				                            
						 			    });
					 				
					 				}
					 			
					 			}
					 		}
					 	});
	 			});
				
			},getWXUserInfo:function(){
				var _this = this;
				$.ajax({
					url:request.user.userList,
					type:"get",
					data:{
						user_id:userId,
						rows:100,
						page :1
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content = globalUtil.b64ToUtf8(data.content,"utf8");
							    content = JSON.parse(content);
							var WXpublicName = content[0].pub_name;
							  _this.toShare(WXpublicName);
								
						}else{
							alert("获取数据失败！");
						}
					}	
						
				});
			},toShare:function(WXpublicName){
				  //分享
				  globalUtil.globalShareFun({
					  titleSend:"欢迎光临"+WXpublicName ,
					  imgUrlSend: GLOBAL.contextPath+"/resources/images/img/defaults/iconShared100x100.png",
					  urlSend: window.location.href.toString().split("#")[0]
				  });
			   
			}
	};
	connectShopApp.init();

	 
});