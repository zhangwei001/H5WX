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
 			//修改title
 			globalUtil.changeTitle("员工列表");
 			//fastClick 
			FastClick.attach(document.body);
 			
 			if(shopId>0){
 				this.getShopInfo();
 				
 			}else{
 				this.getStaffLisByUserId(userId);
 			}
 			
 		},getShopInfo:function(){
 			var _this = this;
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
	 					  console.log("店铺名",shopInfoData);
	 					 _this.getStaffLisByShopId(shopInfoData);
	 				 }
	 			 },error:function(){
	 				 
	 			 }
	         });
 			
 		},getStaffLisByUserId:function(userId){
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
								webRoot :GLOBAL.webRoot
								}, function(html){
							         $("#shopStaffListView").empty();
							         $("#shopStaffListView").append(html);
							         
							          
									  //分享
									  var opt={};
									 
									  opt.urlSend=  GLOBAL.contextPath+"/agent/manager-share-wx_shop_staff_list_share?userId="+userId;
									  
									  opt.titleSend = "欢迎咨询"+WXpublicName+"员工~";
									  opt.imgUrlSend= GLOBAL.contextPath+"/resources/images/img/defaults/iconShared100x100.png"
									
									  globalUtil.globalShareFun(opt);
									  
							});
							
					}else{
						alert("获取数据失败！");
					}
				}	
					
			});
 			
 			
 			
 		},getStaffLisByShopId:function(shopInfoData){
 			 $.ajax({
 		      	 url:request.user.shopStafflis,
 		      	 data:{
 		      		 shop_id : shopId,
 		      		 app_id:appId,
 		      		 open_id:openId
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
 		   				console.log("员工列表",content);
 			   				var WXpublicName = content[0].pub_name;
 			   				var shopMapNum=content.length;
 			   				laytpl($("#shopStaffTmpl").html()).render({
 								shopMapNum:shopMapNum,
 								content:content,
 								webRoot :GLOBAL.webRoot
 								}, function(html){
 									  $("#shopStaffListView").empty();
 							         $("#shopStaffListView").append(html);
 							         
 							        //分享
									  var opt={};
									 
									  opt.urlSend=  GLOBAL.contextPath+"/agent/manager-share-wx_shop_staff_list_share?shopId="+shopId  ;
									  
									  opt.titleSend = "欢迎咨询"+shopInfoData.shop_name+"员工~";
									  opt.imgUrlSend= GLOBAL.contextPath+"/resources/images/img/defaults/iconShared100x100.png"
									
									  globalUtil.globalShareFun(opt);
 							});
 		   			 
 		   			 }
 		   		 }
 		       });
 		}
 	}
 	staff.init();
	
});