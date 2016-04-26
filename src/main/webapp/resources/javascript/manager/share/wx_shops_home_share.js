/**
 * 分享出现 店铺主页
 */

/**
 * 店铺主页
 */

$(function(){
	var jQuery = $.noConflict();
	var userId=jQuery("body").attr("data-user-id"),//店主的userID
	appId=jQuery("body").attr("data-app-id"),
	openId=jQuery("body").attr("data-open-id").split("#")[0];//当前用户的openId

	var accessToken =getUrlParam("accessToken");

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
			var _this = this;
			globalUtil.changeTitle("商家主页");
			this.handleShopLis();
			
		
			//关注二维码
			  $(".share_wxtopBut").click(function(){
				  _this.getQR(userId)
			  });
	
		},handleShopLis:function(){
			var _this = this;
			 jQuery.ajax({
			 		url : request.shop.getShopList,
			 		type : "get",
			 		data:{
			 			user_id :userId,
			 			app_id:  appId,
			 			open_id: openId,
			 		
			 		},
			 		dataType : "json",
			 		success:function(data){
			 			if(data.status==200 && data.content){
			 				var content = globalUtil.b64ToUtf8(data.content,"utf8");
			 				var shopList = JSON.parse(content);
			 				console.log("shopLis:",shopList);
			 				
			 				
			 				//渲染模板
		 					laytpl(jQuery("#chooseShopTemp").html()).render({
		 						content:shopList
		 					},function(html){
		 						    jQuery("#chooseShopView").empty();
		 					        jQuery("#chooseShopView").append(html);
		 					        if(shopList.shop_list.length==1){
		 					        	jQuery("#chooseShopView").css("height",0);
		 					        }
		 					        //设置选择框 宽度
		 					        var fontNum =shopList.prefer_name.length;
		 					        var inputUnit =40;
		 					        var divUnit =50;
		 					        jQuery(".index_top_choose_shop").css({"width":divUnit*fontNum+"px"});
		 					       jQuery(".pickerinput").css({"width":inputUnit*fontNum+"px"});
		 					       jQuery(".yyifarrow_s").css({"left":41*fontNum+"px"});
		 					        
		 					});
			 				
			 				  //设置默认店铺
	                        jQuery("#picker").attr("data-shop-id",shopList.prefer_id);
	                        jQuery("#picker").attr("data-shop-sid",shopList.prefer_sid);
	                        
	                        var prefShopName="";
	                        for(var k=0;k<shopList.shop_list.length;k++){
	                        	var shopObj =shopList.shop_list[k];
	                        	for(var att in shopObj){
	                        		if(att == "shop_id"){
	                        			if(shopObj["shop_id"] == shopList.prefer_id){
	                        				prefShopName=shopObj["shop_name"];
	                        			}
	                        		}
	                        	}
	                        }

	                        console.log("preferShopName:",prefShopName);
	                        
	                        //修改title
	                        globalUtil.changeTitle(prefShopName);
	                        jQuery("#picker").val(prefShopName);
	                        //调用选择员工插件
	                        _this.chooseShop(shopList.shop_list);
			 				_this.rendShopInfo(shopList.prefer_id ,shopList.prefer_sid)
	 					    
			 			}
			 		},error:function(){
			 			alert('服务错误');
			 		}
			 	});
			
			
			
		},chooseShop:function(shopList){
			var _this =this;
            //选择员工插件
            var shopNameLis=[];
            //获取员工姓名list
            for(var j=0;j<shopList.length;j++){
                var shopObj =shopList[j];
                for(var attr in shopObj){
                    if(attr == "shop_name"){
                    	shopNameLis.push(shopObj["shop_name"]);
                    }
                }
            }
            $("#picker").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
		      <div id="confirmBtn"  style="text-align:center"><button class="button button-link  close-picker">\
                		确定\
		      </button></div><h1 class="title">请选择你要消费的分店</h1>\
		      </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: shopNameLis,
                        cssClass: 'picker-items-col-normal'
                    }
                ],
                onOpen:function(){
                	jQuery(".shopmanmain").css({"position":"fixed","max-height":document.documentElement.clientHeight,"height":document.documentElement.clientHeight});
                	
                	
                },
                onChange :function(p, values, displayValues){
                    //调整显示框
                	var fontNum =values[0].length;
			        var inputUnit =40;
			        var divUnit =50;
			        jQuery(".index_top_choose_shop").css({"width":divUnit*fontNum+"px"});
			        jQuery(".pickerinput").css({"width":inputUnit*fontNum+"px"});
			        jQuery(".yyifarrow_s").css({"left":41*fontNum+"px"});
                	
			        //查shopSid
                    var shopId;
                    var shopSid;
                    if(shopList){
                        for(var j = 0 ;j< shopList.length;j++){
                            jQuery.each(shopList[j],function(attr,val){
                                if(shopList[j].shop_name== values ){
                                    shopId =  shopList[j].shop_id;
                                    shopSid  = shopList[j].shop_sid;
                                }
                            });
                        }
                    }
                    $("#picker").attr("data-shop-id",shopId);
                    $("#picker").attr("data-shop-sid",shopSid);
                    globalUtil.changeTitle(values);
               
                    
                },
                onClose :function(){
                	var shopId =  $("#picker").attr("data-shop-id");
                	var shopSid =  $("#picker").attr("data-shop-sid");
                	_this.rendShopInfo(shopId,shopSid);
                	
                	jQuery(".shopmanmain").attr({"style":""});
                	//设置用户选择的店铺
                	//_this.setUserPreferShop(shopId);
                }

            });
        },rendShopInfo:function(shopId,shopSid){
                 
			if(shopId){
				this.getShopInfo(shopId);
				this.getShopRecommendInfo(shopId);
				
				
				this.getShopHotSaleInfo(shopId);
				this._endFun(shopId,shopSid);
				var customContent= globalUtil.getCustomerId(openId,shopId);
				customContent=globalUtil.b64ToUtf8(customContent);
				if(customContent){
					customId = JSON.parse(customContent).custom_id;
				}
				
			}else{
				alert("获取店铺id失败");
			}
		
		},getShopInfo:function(shopId){
 			
			//获取店铺信息
			
			
			//获取店铺信息
			var localHref=window.location.href.toString(),
		 	locals=localHref.split("#"),
		 	currentUrl=locals[0];
 			
 			//1获取经纬度
 			globalUtil.getEchoOrientation({
 				appId: appId,
 				currentUrl: currentUrl,
 				userId: userId
 			}, function(latitude,longitude){

			    jQuery.ajax({
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
	 					
	 					//分享
	 					 globalUtil.globalShareFun({
					        	titleSend:"欢迎光临"+shopInfoData.shop_name,
					        	urlSend:window.location.href.toString().split("#"),
					        	imgUrlSend:shopInfoData.shop_img_url
					      });
	 				
	 					
	 					laytpl(jQuery("#shopInfoTmpl").html()).render({
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
	 						
	 					},function(html){
	 						    jQuery("#shopInfoView").empty();
	 					         jQuery("#shopInfoView").append(html);
	 					});
	 				 }else{
	 					     jQuery("#shopInfoView").empty();
					        
					       
	 				 }
	 			 },error:function(){
	 				 
	 			 }
	      });
 				
 			})
 			
 		},getQR:function(userId){
 			jQuery.ajax({
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
		},getShopRecommendInfo:function(shopId){
			 //获取 商家推荐
			 jQuery.ajax({
			   	 url:request.shop.getShopRecommendInfo,
			   	 data:{ shop_id : shopId },
			   	 type:"get",
				 dataType:"json",
				 success:function(data){
					 if(data.status == 200 && data.content){
						 
						 var decodeObj = globalUtil.b64ToUtf8(data.content),
						 	 content= JSON.parse( decodeObj );
						 
						var RecommendListNum=content.length;
					
						laytpl(jQuery("#recommendProListTmpl").html()).render({
							RecommendListNum:RecommendListNum,
							content:content
							}, function(html){
								jQuery("#recommendView").empty();
						        jQuery("#recommendView").append(html);
						         
						         //点击 进入卡项，护理，产品 详情
								  jQuery("li[data-click='true']").on("click",function(){
									    var itemId = jQuery(this).attr("data-item-id");
									    var cardType =jQuery(this).attr("data-card-type");
			 							var itemType =jQuery(this).attr("data-item-type");
			 							
				 							if(itemType==0){
				 								itemType="card";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_card_sale_info_share',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									activityId:0,
				 									customId:customId,
				 									cardType:cardType,
				 									userId:userId,
				 									from:'shopHome'
				 								});
				 							}else if(itemType==1){
				 								itemType="massage";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_massage_sale_info_share',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									customId:customId,
				 									activityId:0,
				 									userId:userId,
				 									from:'shopHome'
				 								});
				 							}else if(itemType==2){
				 								itemType="product";
				 								window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_product_sale_info_share',{
				 									shopId:shopId,
				 									itemType:itemType,
				 									itemId:itemId,
				 									customId:customId,
				 									activityId:0,
				 									userId:userId,
				 									from:'shopHome'
				 								});
				 							}
			 						});
								  
								  jQuery("ul.morereco").click(function(){
									  jQuery("ul[date-hidden='true']").css({"display":"block"});
									  jQuery(this).remove();
								  });
						         
						    });
					 }else{
						 jQuery("#recommendView").empty();
					 }
				 }
		    });
				
		},getShopHotSaleInfo:function(shopId){
			 //获取推荐 热销产品
			 jQuery.ajax({
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
					
						laytpl(jQuery("#hotProListTmpl").html()).render({
							hotSaleListNum:hotSaleListNum,
							content:content
							}, function(html){
								 jQuery("#hotProView").empty();
						         jQuery("#hotProView").append(html);
						         //热销产品 进入详情
								  jQuery("li[data-hot-sale='true']").on("click",function(){
									  var itemId = jQuery(this).attr("data-item-id");
									  window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_product_sale_info_share',{
										    itemType:"product",
										    shopId:shopId,
										    itemId:itemId,
										    customId:customId,
						        			activityId:0,
						        			userId:userId,
		 									from:'shopHome'
		 								});
								  });
						    });
					 }else{
						 jQuery("#hotProView").empty();
					 }
				 }
		    });
		},
		_endFun:function(shopId,shopSid){
			//更多
			jQuery("body").delegate(".btn_more","click",function(){
				 window.location.href=globalUtil.packParam(GLOBAL.contextPath  + 'agent/manager-share-wx_item_list_share',{
					 	userId:userId,
					    shopId:shopId,
					    appId:appId,
					    openId:openId,
					    accessToken:accessToken
						
					});
			});
			//item 导航
			jQuery(".serverItemUrl").on("click",function(){
				var item = jQuery(this).attr("data-item");
				
				window.location.href= GLOBAL.webRoot+"/agent/manager-share-wx_item_list_share?userId="+userId
				+"&shopId="+shopId
				+"&appId="+ appId
				+"&openId="+openId
				+"&accessToken="+accessToken
				+"#"+item;
				
				
			});
			//技师
			jQuery("#staffLis").on("click",function(){
				window.location.href= GLOBAL.webRoot+"/agent/manager-share-wx_shop_staff_list_share?userId="+userId
				+"&shopId="+shopId
				+"&appId="+ appId
				+"&openId="+openId
				+"&accessToken="+accessToken;
				
				
			});
			//全部店铺已评价订单
			jQuery("#orderCommentLis").on("click",function(){
				window.location.href= GLOBAL.webRoot+"/agent/manager-shop-info-wx_shop_order_comLis?userId="+userId
				+"&shopId="+shopSid
				+"&appId="+ appId
				+"&openId="+openId
				+"&accessToken="+accessToken;
			});
	         
	         //优惠处销
	         jQuery("#envetUrl").on("click",function(){
	        	 window.location.href= GLOBAL.webRoot+"/agent/manager-share-wx_event_list_index_share?userId="+userId
					+"&shopId="+shopId
					+"&appId="+ appId
					+"&openId="+openId
					+"&accessToken="+accessToken;
	         });
			
	         //我的
	        /* jQuery("#userCenter").on("click",function(){
	        	 window.location.href= GLOBAL.webRoot+"/agent/manager-user-mumber-wx_user_mumber_center?userId="+userId
					+"&shopId="+shopId
					+"&appId="+ appId
					+"&openId="+openId
					+"&accessToken="+accessToken;
	         });
*/	         
	         //店铺环境
	         jQuery("#shopPics").on("click",function(){
	        	
	        	 window.location.href = GLOBAL.webRoot +"/agent/manager-shop-info-wx_shop_environment?shopId="+shopId
	         });
			
			
			
			
		}
			
	};
	
	shopInfo.init();
	
	
	
});