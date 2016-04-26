$(function(){
    var globalVar = store.get("globalVar")||{};
    var userId = globalVar.userId || globalUtil.getUrlParam('userId');
    var openId = globalVar.openId;
    var appId  =  globalVar.appId;
    var accessToken =  globalVar.accessToken;
    
    //耗卡预约，产品 护理
    var itemType = globalUtil.getUrlParam("itemType");
    var from = globalUtil.getUrlParam("from");//来源 event 促销活动，recommend 推荐，shop 商家主页。
    globalUtil.globalShareFun('');
    var selectShop={
    		init: function(){
    			//fastClick 
    			FastClick.attach(document.body);
    			globalUtil.globalShareFun();
    			
    			if(userId){
    				this.getShopList();
    			}else{
    				alert('userId参数错误');	
    			}
    			
    		},getShopList:function(){
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
 				 			longitude:longitude,
 				 			latitude:latitude
 				 		},
 				 		dataType : "json",
 				 		success:function(data){
 				 			if(data.status==200 && data.content){
 				 				var content =globalUtil.b64ToUtf8(data.content,"utf8");
 				 				var shopList = JSON.parse(content);
 		 					    
 				 				 console.log("shopList",shopList);
 		 					    var shoplistNum = shopList.length;
 		 					    if(shoplistNum==1){
 		 					    	 _this.endFun(from||'shopHome',shopList[0].shop_id);//默认店铺主页
 		 					    }else{
 		 					    	 _this.getShopListRender(GLOBAL.contextPath, shopList, shoplistNum);
 		 					    }
 				 			}
 				 		},error:function(){
 				 			alert('服务错误');
 				 		}
 				    });
     			});
    			
    		},getShopListRender:function(webRoot,shopList,shoplistNum){
    			var _this=this;
    			
    		    laytpl($("#selectShopTemp").html()).render({
    		        webRoot:webRoot,
    		        content:shopList,
    		        shoplistNum:shoplistNum

    		    }, function(render){
    		    	
    		    	globalUtil.changeTitle('选择商家');
    		        $("#selectShopView").html(render);
    		        
    		        $("body").addClass("bghui");
    		        $("#wxShopListTmpl").children("div").css({"margin-top":"40px"});
    		        
    		        $("div[data-click='true']").on("click",function(){
    		           
    		            $(this).find("a").addClass("activ");
    		        	
    		            var shopId=$(this).attr("data-shop-id");
    		            otherShopName =$(this).attr("data-shop-name");
	                    $("body").attr("data-shop-id",shopId);
	                   // $("#wxShopListTmpl").remove();
	                   //设置用户选择的店铺
	                    _this.setUserPreferShop(shopId);
	                    
	                    //延时
	                    setTimeout(function(){
	                    	_this.endFun(from,shopId);
	                    },500);
	                    

    		        });

    		    });
    		},setUserPreferShop:function(shopId){
            	//获取店铺信息
    		    $.ajax({
            	 url:request.user.setPreferShop,
            	 data:{
            		 shop_id   :  shopId,
            		 app_id:      appId,
            		 open_id :    openId
            		
            	 },
            	 type:"get",
     			 dataType:"json",
     			 success:function(data){
     				 if(data.status == 200 && data.content){
     					
     				 }else{
    				       
     				 }
     			 },error:function(){
     				 
     			 }
    		    });
            	
            },endFun:function(from,shopId){
    			
    		     if(from=="advice"){
                 	//advice 商家推挤
                 	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-advice-wx_shop_advice', {
                 		userId:userId,
                 		appId:appId,
                 		openId:openId,
                 		accessToken:accessToken,
                 		shopId:shopId,
                 	});
                 	
                 }else if(from=="event"){
                 	//活动促销
                 	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-event-wx_event_list_index', {
                 		userId:userId,
                 		appId:appId,
                 		openId:openId,
                 		accessToken:accessToken,
                 		shopId:shopId,
                 	});
                 	
                 }else if(from=="shopHome"){
                 	//商家主页
                 	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-info-wx_shops_home', {
                 		userId:userId,
                 		appId:appId,
                 		openId:openId,
                 		accessToken:accessToken,
                 		shopId:shopId,
                 	});
                 	
                 }else if(from=="shopInfo"){
                 	//商家详情
                 	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-info-wx_shop_info', {
                 		userId:userId,
                 		appId:appId,
                 		openId:openId,
                 		accessToken:accessToken,
                 		shopId:shopId,
                 	});
                 }else if(from=="itemAll"){
                 	//店铺全部服务
                 	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-item-wx_item_list', {
                 		userId:userId,
                 		appId:appId,
                 		openId:openId,
                 		accessToken:accessToken,
                 		shopId:shopId
                 	});
                 }else if(from=="card"){
                  	//耗卡预约
                	/*  packProductUrl 预约耗卡 传过来的参数
                	 * */
                	 if(itemType=="massage"){
                		 var packProductUrl = store.get("yuyue_card_massage_url_para");
                		 window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-massage-wx_massage_sale', {
                        		otherShopName:otherShopName,
                        		otherShopId:shopId,
                        		itemTypeId:packProductUrl.itemTypeId,
                        		shopId:packProductUrl.shopId,
                        		isGiven:packProductUrl.isGiven,
                        		itemId:packProductUrl.itemId,
                        		activityId:packProductUrl.activityId,
                        		maxTimesORdiscount:packProductUrl.maxTimesORdiscount,
                        		discountedMoney:packProductUrl.discountedMoney,
                        		givenMoney:packProductUrl.givenMoney,
                        		from:packProductUrl.from,
                        		customId:packProductUrl.customId
                        	});
                		 
                	 }else if(itemType=="product"){
                		 var packProductUrl = store.get("yuyue_card_product_url_para");
                       	window.location.href= globalUtil.packParam(GLOBAL.contextPath+'agent/manager-shop-product-wx_product_sale', {
                       		otherShopName:otherShopName,
                       		otherShopId:shopId,
                       		shopId:packProductUrl.shopId,
                       		isGiven:packProductUrl.isGiven,
                       		itemId:packProductUrl.itemId,
                       		activityId:packProductUrl.activityId,
                       		maxTimesORdiscount:packProductUrl.maxTimesORdiscount,
                       		discountedMoney:packProductUrl.discountedMoney,
                       		givenMoney:packProductUrl.givenMoney,
                       		from:packProductUrl.from,
                       		customId:packProductUrl.customId
                       	});
                	 }
                
                  }else{
                 	alert('来源错误');
                 }
    		    
    		}
    };
    
    selectShop.init();


});