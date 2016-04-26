$(function(){
	var userId=$("body").attr("data-user-id"),//店主的userID
	appId=$("body").attr("data-app-id"),
	openId=$("body").attr("data-open-id").split("#")[0];//当前用户的openId

	var accessToken =getUrlParam("accessToken");
	var shopId =getUrlParam("shopId");//店铺主键
	//设置全局变量
	var globalVar={
			userId:userId,
			appId:appId,
			openId:openId,
			accessToken:accessToken
	};
	
	store.remove("globalVar");	
	store.set("globalVar",globalVar);	
	
	
	var  customId;
	var shopInfoData;
	var shopInfo={
		init:function(){
			//fastClick 
			FastClick.attach(document.body);
			if(shopId){
				this.getShopInfo();
				this.getShopRecommendInfo();
				this.getShopStaffList();
				this.getShopCommentList();
				this.getShopHotSaleInfo();
				var customContent= globalUtil.getCustomerId(openId,shopId);
				customContent=globalUtil.b64ToUtf8(customContent);
				if(customContent){
					customId = JSON.parse(customContent).custom_id;
				}
				
			}else{
				//跳转选择店铺页面
 				location.href = GLOBAL.contextPath + "agent/manager-shop-wx_select_shop_index?from=shopHome";
			}
		},getShopInfo:function(){
 			
 			//经纬度
 			var localHref=window.location.href.toString(),
			 	locals=localHref.split("#"),
			 	currentUrl=locals[0];
 			//获取经纬度
 			globalUtil.getEchoOrientation({
 				appId:appId,
 				currentUrl:currentUrl,
 				userId:userId
 			}, function(latitude,longitude){
 				//获取店铺信息
 			    $.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id :    openId,
		        		 longitude :  longitude,
		        		 latitude  :  latitude
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj = globalUtil.b64ToUtf8(data.content), 
		 					  		shopInfoData =  JSON.parse(decodeObj);
		 					store.remove("shopInfoData");
		 					store.set("shopInfoData",shopInfoData);
		 					//修改title
		 					globalUtil.changeTitle("商家主页");
		 					console.log("shopInfoData",shopInfoData);
		 					//距离单位换算
		 					 var distancKM =0;
		 					 if($.isNumeric(shopInfoData.distance)){
		 						 distancKM =(Number(shopInfoData.distance)/1000).toFixed(1);
		 					 }
		 					laytpl($("#shopInfoTmpl").html()).render({
		 						userId      :userId,
		 						appId       :appId,
		 						openId      :openId,
		 						accessToken :accessToken,
		 						customStatus :shopInfoData.custom_status,
		 						isBindotherShop:shopInfoData.bind_status,
		 						shop_img_url:shopInfoData.shop_img_url,
		 						shopName    :shopInfoData.shop_name,
		 						SId         : shopInfoData.s_id,
		 						shopId         : shopInfoData.shop_id,
		 						shopPhone  : shopInfoData.shop_tel,
		 						shopCustomTotal :shopInfoData.shop_custom_num,
		 						shop_follow_num : shopInfoData.shop_follow_num,
		 						shop_addr       : shopInfoData.shop_addr,
		 						shop_distance   : distancKM+"km"
		 					},function(html){
		 					         $("#shopInfoView").html(html);
		 					        
		 					         //分享
		 					         globalUtil.globalShareFun({
		 					        	titleSend:"欢迎光临"+shopInfoData.shop_name,
		 					        	urlSend:GLOBAL.contextPath +"/agent/manager-share-wx_shop_home_share?appId="+appId +"&openId="+openId+ "&userId="+userId+"&shopId="+shopId,
		 					        	imgUrlSend:shopInfoData.shop_img_url
		 					         });
		 					         
		 					         //如果没有加入商家 点击加入商家
		 					         $("#hasBindOtherShop").click(function(){
		 					        	var shopId = $(this).attr("data-shop-id");
		 								var openId = $(this).attr("data-open-id");
		 								$.ajax({
		 									url:request.shop.bindUser,
		 									type:"post",
		 									data:{
		 										  shop_id      : shopId,
		 										  open_id      : openId,
		 										  app_id:    appId
		 									},
		 									dataType:"json",
		 									success: function(data){
		 										//用户已经绑定成功
		 										location.reload(true); 
		 									},
		 								
		 							  });
		 					        	 
		 					         });
		 					});
		 				 }
		 			 },error:function(){
		 				 
		 			 }
		      });
 			});
 			
 		},getShopRecommendInfo:function(){
			 //获取 商家推荐
			 $.ajax({
			   	 url:request.shop.getShopRecommendInfo,
			   	 data:{ shop_id : shopId },
			   	 type:"get",
				 dataType:"json",
				 success:function(data){
					 if(data.status == 200 && data.content){
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content),
						 	 content= JSON.parse( decodeObj );
						 
						var RecommendListNum=content.length;
					
						laytpl($("#recommendProListTmpl").html()).render({
							RecommendListNum:RecommendListNum,
							content:content
							}, function(html){
						         $("#recommendView").html(html);
						         
						         //点击 进入卡项，护理，产品 详情
								  $("ul[data-click='true']").on("click",function(){
									    var itemId = $(this).attr("data-item-id");
									    var cardType =$(this).attr("data-card-type");
			 							var itemType =$(this).attr("data-item-type");
			 							
				 							if(itemType==0){
				 								itemType="card";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-shop-card-wx_card_sale_info',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									activityId:0,
				 									customId:customId,
				 									cardType:cardType,
				 									from:'shopHome'
				 								});
				 							}else if(itemType==1){
				 								itemType="massage";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-shop-massage-wx_massage_sale_info',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									customId:customId,
				 									activityId:0,
				 									from:'shopHome'
				 								});
				 							}else if(itemType==2){
				 								itemType="product";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-shop-product-wx_product_sale_info',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									customId:customId,
				 									activityId:0,
				 									from:'shopHome'
				 								});
				 							}
			 						});
								  
								  $("ul.morereco").click(function(){
									  $("ul[date-hidden='true']").css({"display":"block"});
									  $(this).remove();
								  });
						         
						    });
					 }
				 }
		    });
				
		},getShopStaffList:function(){
			 //获取员工列表
			 $.ajax({
			   	 url:request.user.shopStafflis,
			   	 data:{ shop_id : shopId },
			   	 type:"get",
				 dataType:"json",
				 success:function(data){
					 if(data.status == 200 && data.content){
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content),
						 		content= JSON.parse( decodeObj );
						 
						var StaffListNum=content.length;
						laytpl($("#shopStaffTmpl").html()).render({
							StaffListNum:StaffListNum,
							content:content
							}, function(html){
						         $("#staffView").html(html);
						         
						         $("#staffList").on("click",function(){
						        		window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-shop-info-wx_shop_staff_list',{
						        			userId:userId,
						        			shopId:shopId,
						        			appId:appId,
						        			openId:openId,
		 									accessToken:accessToken
		 								});
								 });
						         $('.ygalllist li').on('click',function(){
						        	 window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-shop-info-wx_shop_staff_list',{
						        			userId:userId,
						        			shopId:shopId,
						        			appId:appId,
						        			openId:openId,
		 									accessToken:accessToken
		 								});
						         });
						    });
					 }
				 }
		    });
		},getShopCommentList:function(){
			//获取店铺评价列表
			 $.ajax({
			  	 url:request.shop.getCommentInfo,
			  	 data:{
			  		 shop_id : shopId,
			  		 flag:1,
			  		 id:1
			  	 },
			  	 type:"get",
				 dataType:"json",
				 success:function(data){
					 if(data.status == 200 && data.content){
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content),
						   content= JSON.parse( decodeObj );
						  console.log("店铺评价列表",content);
						var commentListNum=content.length;
					  
						laytpl($("#commentListTmpl").html()).render({
							webRoot : GLOBAL.contextPath,
							commentListNum: commentListNum,
							content:content
							}, function(html){
						         $("#commentView").html(html);
						         $(".pjed_shertop_main").eq(0).css({"position":"relative","top":"-10px"});
						    });
						
					 
					 }
				 }
		   });
		},getShopHotSaleInfo:function(){
			 //获取推荐 热销产品
			 $.ajax({
			   	 url:request.shop.getHotSaleInfo,
			   	 data:{
			   		 shop_id : shopId
			   	 },
			   	 type:"get",
				 dataType:"json",
				 success:function(data){
					 if(data.status == 200 && data.content){
						
						var decodeObj =  globalUtil.b64ToUtf8(data.content),
						 content= JSON.parse(decodeObj);
						
						var hotSaleListNum=content.length;
					
						laytpl($("#hotProListTmpl").html()).render({
							hotSaleListNum:hotSaleListNum,
							content:content
							}, function(html){
						         $("#hotProView").html(html);
						         //热销产品 进入详情
								  $("ul[data-hot-sale='true']").on("click",function(){
									  var itemId = $(this).attr("data-item-id");
									  window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-shop-product-wx_product_sale_info',{
										    itemType:"product",
										    shopId:shopId,
										    itemId:itemId,
										    customId:customId,
						        			activityId:0,
		 									from:'shopHome'
		 								});
								  });
						    });
					 }
				 }
		    });
		}
			
	};
	
	shopInfo.init();
	
	
	
});