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
			}else{
				//跳转选择店铺页面
 				//location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?form=shopHome";
			}
			var _this = this;
			//关注二维码
			  $(".share_wxtopBut").click(function(){
				 
				  _this.getQR(userId)
				  
			  });
			
		},getShopInfo:function(){
			$.ajax({
	        	 url:request.shop.shopInfo,
	        	 data:{
	        		 shop_id   :  shopId,
	        		 open_id :    openId
	        	 },
	        	 type:"get",
	 			 dataType:"json",
	 			 success:function(data){
	 				 if(data.status == 200 && data.content){
	 					 
	 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8");
	 					 	shopInfoData =  JSON.parse(decodeObj);
	 					 	console.log("shopInfoData",shopInfoData);
	 					 	store.remove("shopInfoData");
	 					 	store.set("shopInfoData",shopInfoData);
	 					//距离单位换算
	 					 var distancKM =0;
	 					 if($.isNumeric(shopInfoData.distance)){
	 						 distancKM =(Number(shopInfoData.distance)/1000).toFixed(1);
	 					 }
	 					laytpl($("#shopInfoTmpl").html()).render({
	 						userId      :userId,
	 						appId       :appId,
	 						openId      :openId,
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
	 					        globalUtil.globalShareFun({
	 					        	titleSend:"欢迎光临"+shopInfoData.shop_name,
	 					        	urlSend:window.location.href.toString().split("#"),
	 					        	imgUrlSend:shopInfoData.shop_img_url
	 					         });
	 					        
	 					});
	 					 
	 				 }
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
		},getShopRecommendInfo:function(){
			 //获取 商家推荐
			 $.ajax({
			   	 url:request.shop.getShopRecommendInfo,
			   	 data:{ shop_id : shopId },
			   	 type:"get",
				 dataType:"json",
				 success:function(data){
					 if(data.status == 200 && data.content){
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content, "utf8"),
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
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_card_sale_info_share',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									activityId:0,
				 									cardType:cardType,
				 									userId  :userId,
				 									from:'shopHome'
				 								});
				 							}else if(itemType==1){
				 								itemType="massage";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_massage_sale_info_share',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									activityId:0,
				 									userId  :userId,
				 									from:'shopHome'
				 								});
				 							}else if(itemType==2){
				 								itemType="product";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_product_sale_info_share',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									activityId:0,
				 									userId  :userId,
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
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content, "utf8"),
						 		content= JSON.parse( decodeObj );
						 
						var StaffListNum=content.length;
						laytpl($("#shopStaffTmpl").html()).render({
							StaffListNum:StaffListNum,
							content:content
							}, function(html){
						         $("#staffView").html(html);
						         
						         $("#staffList").on("click",function(){
						        		window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_shop_staff_list_share',{
						        			userId:userId,
						        			shopId:shopId,
						        			appId:appId,
						        			openId:openId,
		 									accessToken:accessToken
		 								});
								 });
						         $('.ygalllist li').on('click',function(){
						        	 window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_shop_staff_list_share',{
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
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content, "utf8"),
						 content= JSON.parse( decodeObj );
						  
						var commentListNum=content.length;
					  
						laytpl($("#commentListTmpl").html()).render({
							webRoot : GLOBAL.contextPath,
							commentListNum: commentListNum,
							content:content
							}, function(html){
						         $("#commentView").html(html);
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
						
						var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
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
									  window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_product_sale_info_share',{
										    shopId:shopId,
										    itemId:itemId,
						        			appId:appId,
						        			userId  :userId,
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