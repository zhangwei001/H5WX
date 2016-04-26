//我的消费卡

$(function(){
	
	var openId = $("body").attr("data-open-id");
	var userId = $("body").attr("data-user-id");
	var appId  = $("body").attr("data-app-id");
	var accessToken = $("body").attr("data-access-token") ;
	//$("#customView").show();
	$("#orderListView").hide();
	//设置全局变量
 	var globalVar={};
 		globalVar.userId=userId;
 		globalVar.appId=appId;
 		globalVar.openId=openId;
 		globalVar.accessToken =accessToken;
 	store.remove("globalVar");	
 	store.set("globalVar",globalVar);
 	var page =1;
 	var pageTimes;
 	var soleServerParameter;
 	var cardList ={
 			init: function(){
 				//soleServerParameter  正在进行中的订单详情
 				//fastClick 
 				FastClick.attach(document.body);
 				globalUtil.changeTitle('我的消费卡');
 				//关闭分享
 				globalUtil.globalShareFun('');
 				this.checkUnderwayOrder(openId,appId);
 				
 			},checkUnderwayOrder:function(openId,appId){
 			   var _this = this;
 				var 	hasServerNum=0;
 				
 				$.ajax({
 				url: request.user.userOrderList,
 				type:"get",
 				async:false,
 				data:{
 						open_id:openId,
 						app_id :appId,
 						rows:50,
 						page :1
 					},
 				dataType:"json",
 				success: function(data){
 						if(200 == data.status  ){
 							if(data.content){
 								var content =globalUtil.b64ToUtf8(data.content,"utf8");
 	 						    content = JSON.parse(content);
 	 						   console.log("订单列表",content);
 	 						    
 	 						    //查订单列表
 	 						    for(var i= 0;i<content.length;i++){
 	 						    	var soleOrder = content[i];
 	 						    	for(var attr in soleOrder){
 	 						    		if(attr=="order_status"){
 	 						    			if(soleOrder[attr] ==0){
 	 						    				hasServerNum++;
 	 						    				//如果只有一个进行中的订单，获取该订单的订单详情参数
 	 						    				if(hasServerNum==1){
 	 						    					soleServerParameter=soleOrder;
 	 						    				}else{
 	 						    					soleServerParameter="";
 	 						    				}
 	 						    			}
 	 						    		}
 	 						    	}
 	 						    	
 	 						    }
 	 						    console.log("hasServerNum",hasServerNum);
 	 						   _this.rendCardListTemp(soleServerParameter,hasServerNum);
 	 						    console.log("hasServerNum:",hasServerNum,"soleServerParameter:",soleServerParameter);
 	 						    sessionStorage.setItem("formCardList", 1);
 	 						    if(   sessionStorage.getItem("card_server_tips_jump_others") != 1 ){
 	 						    	  // hasServerTips(hasServer,hasServerNum,soleServerParameter);
 	 						    }
 							}else{
 								 _this.rendCardListTemp(soleServerParameter,hasServerNum);
 							}
 						   
 						}
 					},
 					
 				});
 				
 			},rendCardListTemp:function(soleServerParameter,hasServerNum){
 				var _this = this
 				$.ajax({
 		    		url: request.user.getCardList,
 		    		type:"get",
 		    		data:{
 		    				flag:0,//0,全部，1：护理次卡，2：储值卡
 		    				type:0,//0:未过期的卡 1 已经过期的卡 2 全部
 		    				open_id : openId,
 		    				app_id  :appId,
 		    				user_id:userId,
 		    				rows:5,
 		    				page :page
 		    			},
 		    		dataType:"json",
 		    		success: function(data){
 		    			customCardAccessNumSendFlag=1;
 		    			if(200 == data.status){
 		    				console.log("初始化",data);
 		    				if(data.content){
 		    					
	    					var content =globalUtil.b64ToUtf8(data.content,"utf8");
	    				    	content = JSON.parse(content);
	    				    	customCardAccessNum=content.length;
	    				    	
	    				    	if(content.length>0){
	    				    		//有卡
	    				    		console.log("卡列表",content);
		    				    	accessTotalCardNum =data.total_count;
		    				    	//如果没有查到可用卡项
		    				    	if(accessTotalCardNum<=0){
		    				    		$("#customView").show();
		    				    	}
	 		    				        
	 		    				    pageTimes = Math.ceil(accessTotalCardNum/5)-1;
	 		    				    
	 		    					laytpl($("#userCardInfo").html()).render({
	 		    						shopName:"",
	 		    						shopLogName:request.staticImage.thumb+"",
	 		    						customCardNum:0,
	 		    						customCardAccessNum:customCardAccessNum,
	 		    						accessTotalCardNum :accessTotalCardNum,
	 		    						content:content,
	 		    						webRoot :GLOBAL.webRoot,
	 		    						openId  :openId,
	 		    						userId  :userId,
	 		    						appId   :appId,
	 		    						pageTimes:pageTimes,
	 		    						accessToken:accessToken
	 		    						
	 		    					}, function(render){
	 		    						$("#customView").remove();
	 		    					    $("#bgbai").append(render);
	 		    					    if(soleServerParameter){
	 		    					    	_this.hasServerTips(soleServerParameter,hasServerNum);
	 		    					    }
	 		    					    //点击 更多可用卡项
	 		    					   $("body").delegate("#accessPageBtn","click",function(){
	 		    						  _this.getMoreCardItem();
	 		    							pageTimes--;
	 		    						    console.log('pageTimes',pageTimes);
	 		    						});
	 		    					   //历史卡项
	 		    					  // _this.getHistoryCardLis();
	 		    					   //修改title
	 		    					  globalUtil.changeTitle("我的消费卡")
	 		    					   
	 		    					  
	 		    				    });
	    				    	}else{
	    				    		//没有开过的卡
	    				    		_this.initSelectShop();
	    				    		customCardAccessNum=0;
	    				    	}
 		    					
 		    				}else{
 		    					_this.initSelectShop();
 		    					customCardAccessNum=0;
 		    				}
 		    			
 		    			}else{
 		    				_this.initSelectShop()
 		    				customCardAccessNum=0;
 		    			}
 		    		},error:function(e){
 		    			
 		    		}	
 		    			
 		    	});
 				
 			},initSelectShop:function(){
 				laytpl($("#customViewTemp").html()).render({}, function(render){
 					$("body").append(render);
 					globalUtil.changeTitle("我的消费卡");
 	 				$("body").addClass("bgbai");
 	 				$(".wx_guanlian").eq(0).removeClass("bghui");
 	 				
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
 	 			 					    content = JSON.parse(content);
 	 			 					var shoplistNum = content.length;
 	 			 					//如果为单店铺,返回该店铺shopid
 	 			 					if(shoplistNum == 1){
 	 			 						sigalShopID=content[0].shop_id;
 	 			 						
 	 			 						$("#customView a").attr("href",GLOBAL.webRoot+"/agent/manager-shop-info-wx_shops_home?appId="+appId+"&openId="+openId+"&userId="+userId+"&shopId="+sigalShopID);
 	 			 					}else{
 	 			 						$("#customView a").on("click",function(){
 	 			 							location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=shopHome";
 	 			 						});
 	 					 				
 	 			 					}
 	 					 			}
 	 					 		},error:function(){
 	 					 			alert('服务错误');
 	 					 		}
 	 					 	});
 	 	  			});
 					
 					
				    });
 				
 				
 				
 			},hasServerTips:function(soleServerParameter,hasServerNum){
 				
					layer.open({
					    content:"<div class='cardtishi_w542 poi1' style='margin-top:-221px;margin-left:-200px'>"+
					    		"<div class='cardtishi_op poi2'>"+	
					    		"<p class='a1'><img src=' "+ GLOBAL.webRoot +"/resources/images/meirong/shop/cardtise_cancel0.gif' width='65' height='65'/></p>"+
								 "<p class='a2'>您当前有正在进行中的服务，是否进入？</p>"+
								 "<p class='a3'>"+
								 "<a class='but1' id='cancelTips'>取消</a>"+
								 " <a class='but2' id='confirmTips'>进入</a>"+
								 " </p></div></div>"
					});
					$("body").delegate("#cancelTips","click",function(e){
						layer.closeAll();
					});
					$("body").delegate("#confirmTips","click",function(e){
						if(hasServerNum>1){
							layer.closeAll();
							//window.location.href = GLOBAL.webRoot +"/agent/meirong-user-customer_order?userId="+userId+"&appId="+appId+"&openId="+openId+"&accessToken="+accessToken;
						}else if(hasServerNum==1){
							window.location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_info?orderId="+soleServerParameter.order_id+"&shopId="+soleServerParameter.shop_id+"&shopSid="+soleServerParameter.s_id;
						//	window.location.href=  GLOBAL.webRoot +"/agent/meirong-shop-order_item_details_info?attr="+soleServerParameter.order_id+"&orderId="+soleServerParameter.order_id+"&userId="+userId+"&appId="+appId+"&openId="+openId+"&shopId="+soleServerParameter.shop_id+"&shopSid="+soleServerParameter.s_id+"&accessToken="+accessToken;
						}
						
					});
			},getMoreCardItem:function(){
				page += 1 ;
				$.ajax({
					url: request.user.getCardList,
					type:"get",
					data:{
							flag:0,//0,全部，1：护理次卡，2：储值卡
							type:0,//0:未过期的卡 1 已经过期的卡 2 全部
							open_id : openId,
							app_id  :appId,
							user_id:userId,
							rows:5,
							page :page
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status){
							if(data.content){
								var content = globalUtil.b64ToUtf8(data.content,"utf8");
							    content = JSON.parse(content);
								customCardAccessNum=content.length;
								laytpl($("#getMoreAccessCardInfo").html()).render({
									shopName:"",
									shopLogName:request.staticImage.thumb+"",
									customCardNum:0,
									accessTotalCardNum:accessTotalCardNum,
									content:content,
									webRoot :GLOBAL.webRoot,
									openId  :openId,
									userId  :userId,
									appId   :appId,
									pageTimes:pageTimes,
									accessToken:accessToken
								}, function(html){
									 $(".shophyk_dat_more").remove();
									 $("#bgbai").children("div").last().after(html);
								   
							    });
							}else{
								customCardAccessNum=0;
							}
						
						}else{
							customCardAccessNum=0;
						}
					},error:function(e){
						
					}	
						
				});
			},getHistoryCardLis :function(){
				//获取用户的历史卡项
				$.ajax({
					url: request.user.getCardList,
					type:"get",
					data:{
						//shop_id : shopId,
						flag:0,//0,全部，1：护理次卡，2：储值卡
						rows:100,
						page :1,
						type:1,//過期的卡
						open_id : openId,
						app_id :appId,
						user_id:userId,
					},
					dataType:"json",
					success: function(data){
						customCardHistoryNumSendFlag=1;
						if(200 == data.status){
							if(data.content){
								var content = globalUtil.b64ToUtf8(data.content,"utf8");
							    content = JSON.parse(content);
								customCardHistoryNum=content.length;
								laytpl($("#userCardHistoryInfo").html()).render({
									webRoot:GLOBAL.webRoot,
									customCardHistoryNum:customCardHistoryNum,
									content:content
									}, function(render){
										$("#history").append(render);
										//历史卡项显示隐藏
									    $("#historyPageBtn").click(function(){
											$(".shophyk_end").toggle("fast",function(){
												 if($(this).css("display")=="block"){
													 $("#historyPageBtn > img").attr("src",GLOBAL.webRoot+"/resources/images/meirong/shop/wancheng_arrow.png");
													 
												 }else{
													 $("#historyPageBtn > img").attr("src",GLOBAL.webRoot+"/resources/images/meirong/shop/downarrow_r22_c15.gif");
												 }
												
											},false);
										});
									    
									    $("#customCardNum").text(customCardHistoryNum+customCardAccessNum);
									    
								    });
							}else{
								customCardHistoryNum=0;
							}
						}else{
							customCardHistoryNum=0;
						}
					}	
						
				});
				
			}
 	};
 	
 	cardList.init();
 	
	
});