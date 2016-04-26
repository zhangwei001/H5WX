$(function(){
	
	var openId = $("body").attr("data-open-id");
	var userId = $("body").attr("data-user-id");
	var appId  = $("body").attr("data-app-id");
	var accessToken = $("body").attr("data-access-token") ;
	
	//设置全局变量
 	var globalVar={};
 		globalVar.userId=userId;
 		globalVar.appId=appId;
 		globalVar.openId=openId;
 		globalVar.accessToken =accessToken;
 	store.remove("globalVar");	
 	store.set("globalVar",globalVar);
 	
 	 var shopId = getUrlParam("shopId") || 0;
 	
 	 var shopInfoData;
 	var staff={
 		init:function(){
 			//fastClick 
			FastClick.attach(document.body);
 			
 			globalUtil.changeTitle("员工列表");
 			if(shopId>0){
 				this.getShopInfo();
 				this.getStaffLisByShopId(shopId);
 			}else{
 				this.getStaffLisByUserId(userId);
 			}
 			
 		},getShopInfo:function(){
 			//获取店铺信息
			 $.ajax({
	        	 url:request.shop.shopInfo,
	        	 data:{
	        		 shop_id   :  shopId,
	        		 open_id :    openId
	        	 },
	        	 type:"get",
	 			 dataType:"json",
	 			 async:false,
	 			 success:function(data){
	 				 if(data.status == 200 && data.content){
	 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
	 					  		shopInfoData =  JSON.parse(decodeObj);
	 					  store.remove("shopInfoData");
	 					  store.set("shopInfoData",shopInfoData);
	 				 }
	 			 },error:function(){
	 				 
	 			 }
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
		},getStaffLisByUserId:function(userId){
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
					//	console.log("员工列表信息",data);
						var content = globalUtil.b64ToUtf8(data.content,"utf8");
						  
						    content = JSON.parse(content);
						   console.log("员工列表",content);
						var WXpublicName = content[0].pub_name;
						var shopMapNum=content.length;
					//	console.log(shopMapNum);
							laytpl($("#shopStaffTmpl").html()).render({
								shopMapNum:shopMapNum,
								content:content,
								contextPath :GLOBAL.contextPath
								}, function(html){
							         $("#shopStaffListView").empty();
							         $("#shopStaffListView").append(html);
									  //分享
									  var opt={};
									  opt.urlSend= window.location.href.toString();
									  opt.titleSend = "欢迎咨询"+WXpublicName+"员工~";
									  opt.imgUrlSend= GLOBAL.contextPath+"/resources/images/img/defaults/iconShared100x100.png"
									
									  globalUtil.globalShareFun(opt);
									  
									  
										//关注二维码
										  $(".share_wxtopBut").click(function(){
											 
											  _this.getQR(userId)
											  
										  });
									  
							});
							
					}else{
						alert("获取数据失败！");
					}
				}	
					
			});
 			
 			
 			
 		},getStaffLisByShopId:function(shopId){
 			var _this =this;
 			 $.ajax({
 		      	 url:request.user.shopStafflis,
 		      	 data:{
 		      		 shop_id : shopId
 		      	 },
 		      	 type:"get",
 		   		 dataType:"json",
 		   		 success:function(data){
 		   			 if(data.status == 200){
 		   				if(!data.content){
 		   					return;
 		   				}
 		   				 var content = globalUtil.b64ToUtf8(data.content, "utf8"),
 			   				 content= JSON.parse( content );
 			   				var WXpublicName = content[0].pub_name;
 			   				var shopMapNum=content.length;
 			   				laytpl($("#shopStaffTmpl").html()).render({
 								shopMapNum:shopMapNum,
 								content:content,
 								contextPath :GLOBAL.contextPath
 								}, function(html){
 									  $("#shopStaffListView").empty();
 							         $("#shopStaffListView").append(html);
 							         
 							    	//关注二维码
									  $(".share_wxtopBut").click(function(){
										 
										  _this.getQR(userId)
										  
									  });
 							});
 			   				
 			   			     //分享
 			   				var shopInfoData = store.get("shopInfoData");
							  var opt={};
							  opt.urlSend= window.location.href.toString();
							  opt.titleSend = "欢迎咨询"+shopInfoData.shop_name+"员工~";
							  opt.imgUrlSend= GLOBAL.contextPath+"/resources/images/img/defaults/iconShared100x100.png"
							
							  globalUtil.globalShareFun(opt);
 		   			 
 		   			 }
 		   		 }
 		       });
 		}
 	}
 	staff.init();
	
});