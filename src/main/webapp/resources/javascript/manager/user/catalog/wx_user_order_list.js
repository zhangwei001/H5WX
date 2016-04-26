//消费查询  

$(function(){
	var jQuery=$.noConflict() ;
	
	var openId = jQuery("body").attr("data-open-id") || globalUtil.getUrlParam('openId');
	var userId = jQuery("body").attr("data-user-id") || globalUtil.getUrlParam('userId');
	var appId  = jQuery("body").attr("data-app-id") || globalUtil.getUrlParam('appId');
	var accessToken = jQuery("body").attr("data-access-token") ||globalUtil.getUrlParam('accessToken');
	 var currentHref=window.location.href;
	//设置全局变量
 	var globalVar={};
 		globalVar.userId=userId;
 		globalVar.appId=appId;
 		globalVar.openId=openId;
 		globalVar.accessToken =accessToken;
 		
 	store.remove("globalVar");	
 	store.set("globalVar",globalVar);
 	
 	
 	var hasServer = false;  
	var hasServerNum=0;
	var soleServerParameter ;
	
	//订单状态类型
	var orderStatus =globalUtil.getUrlParam('orderStatus') || "";
 	var shopInfoData;
 
 	var orderList={
 			init:function(){
 				//设置title 
 				if(orderStatus==1){
 					globalUtil.changeTitle("预约订单");
 				}else if(orderStatus==2){
 					globalUtil.changeTitle("待评价订单");
 				}else if(orderStatus==3){
 					globalUtil.changeTitle("退款订单");
 				}else{
 					globalUtil.changeTitle("消费记录");
 				}
 			   //关闭分享
 				globalUtil.globalShareFun('');
 				this.getOrderListData();
 				
 				//fastClick 
 				FastClick.attach(document.body);
 			},getOrderListData :function(){
 				var _this= this;
 				//获取订单列表
 				jQuery.ajax({
 				url: request.user.userOrderList,
 				type:"get",
 				data:{
 						open_id:openId,
 						app_id :appId,
 						rows:50,
 						page :1,
 						type: orderStatus //订单状态 type=1只查询预约中的订单，type=2待评价，type=3退款中， 空 全部订单
 					},
 				dataType:"json",
 				success: function(data){
 						if(200 == data.status && data.content){
 							var content = globalUtil.b64ToUtf8(data.content,"utf8");
 						    content = JSON.parse(content);
 						    console.log("订单列表",content);
 						    
 						  
 						    //设置history 锚点
 						  /*  if( location.hash() && location.hash() !="shared"){
 						    	history.back();
 						    }*/
 							  
 						    //查订单列表
 						    for(var i= 0;i<content.length;i++){
 						    	var soleOrder = content[i];
 						    	for(var attr in soleOrder){
 						    		if(attr=="order_status"){
 						    			if(soleOrder[attr] ==0){
 						    				hasServer=true;
 						    				hasServerNum++;
 						    			}
 						    		}
 						    		
 						    	}
 						    	
 						    }
 						  //如果只有一个进行中的订单，组装该订单的订单详情参数
 						   var  hasfound =false;
 					    	if( hasServerNum ==1){
 					    		for(var j= 0;j<content.length;j++){
 					    			var itemOrd =content[j];
 					    			for(var arg in itemOrd){
 					    				if(arg== "order_status"){
 					    					if(itemOrd[arg] ==0){
 					    						hasfound=true;
 					    						soleServerParameter=itemOrd;
 					    					}
 					    				}
 					    			}
 					    		}
 			    			}
 						   
 						    
 							if(content.length>0){
 								laytpl(jQuery("#customOrderListTmpl").html()).render({
 									webRoot:GLOBAL.webRoot,
 									staticImage:request.staticImage.thumb,
 									content:content,
 									userId:userId,
 									appId:appId,
 									openId:openId
 								}, function(render){
 									jQuery("body").find("div").remove();
 								    jQuery("body").append(render);
 								    //修改title
 								 
 								    
 								    
 								    //弹出提示层
 								    if(   sessionStorage.getItem("order_server_tips_jump_others") != 1 && sessionStorage.getItem("formCardList") != 1){
 								    	_this.hasServerTips(hasServer,hasServerNum,soleServerParameter);
 								     }
 								    
 								    
 								  //微信支付
 									jQuery("a[data-item-pay]").click(function(){
 										store.remove("payBackUrl");
 						            	store.set('payBackUrl',currentHref);
 										var encode_url = request.zhifuUrlLis;
 										encoded_url=encodeURI(encode_url);
 								        
 										//包装数据
 										var opt={};
 											opt.appId=appId;
 											opt.openId= openId;
 											opt.orderId = jQuery(this).attr("data-order-id");
 											opt.shopId = jQuery(this).attr("data-shop-sid");
 											opt.realShopId =jQuery(this).attr("data-shop-id");
 											opt.from = jQuery(this).attr("data-item-from");//orderLis  or  orderdetail
 											opt.contextUrl =GLOBAL.contextPath;
 										
 										opt= JSON.stringify(opt);
 										
 										//alert('opt='+opt);
 										
 										var state =globalUtil.utf8ToB64(opt, 'utf-8');
 											
 										//store.remove("opt");
 										//store.set("opt",opt);
 	                                   // var state="";
                                                        
 										location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+GLOBAL.appIdPay+
 											"&redirect_uri=" +encoded_url+
 											"&response_type=code" +
 											"&scope=snsapi_base&state=" + state+ "#wechat_redirect";
 										return;
 										
 									});
 									//申请退款
 									jQuery("a[data-apply-refund='true']").click(function(){
 										var orderMoney = jQuery(this).attr("data-refund-money");
 										var shopId = jQuery(this).attr("data-shop-id");
 										var shopSid = jQuery(this).attr("data-shop-sid");
 										var orderId = jQuery(this).attr("data-order-id");
 										
 										window.location.href= GLOBAL.webRoot + "/agent/manager-user-catalog-wx_user_apply_refund?shopId="+shopId+"&orderMoney="+orderMoney+"&orderId="+orderId+"&shopSid="+shopSid;
 										
 										
 									});
 									
 									//取消预约
 									_this.cancelYuyue();
 									
 									//修改预约时间
 									_this.chooseTime();
 								    
 							    });
 								
 							}else{
 								_this.initSelectShop()
 								
 							}
 				
 						}else{
 							_this.initSelectShop()
 							
 						}
 					},error:function(e){
 					
 					}	
 					
 				});
 				
 				
 				
 				
 			},initSelectShop:function(){
 				jQuery("#customView").show();
 				globalUtil.changeTitle("消费记录");
 				jQuery("body").addClass("bgbai");
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
 	  				 jQuery.ajax({
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
 			 						
 			 						jQuery("#customView a").attr("href",GLOBAL.webRoot+"/agent/manager-shop-info-wx_shops_home?appId="+appId+"&openId="+openId+"&userId="+userId+"&shopId="+sigalShopID);
 			 					}else{
 			 						jQuery("#customView a").on("click",function(){
 			 							location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=shopHome";
 			 						});
 					 				
 			 					}
 					 			}
 					 		},error:function(){
 					 			alert('服务错误');
 					 		}
 					 	});
 	  			});
 				
 				
 				
 				
 			},cancelYuyue:function(){
 				//取消预约
 				var itemShopId;
 				var itemOrderId;
 				var itemCustomId;
 				
 				var OrderStatusNodeText;
 				var selfTowBtnDOMNode;
 				var orderTimeDom;
 				
 				jQuery("body").delegate(".cancelPre","click",function(e){
 					 itemShopId = jQuery(this).attr("data-shop-id");
 					 itemOrderId = jQuery(this).attr("data-order-id");
 					 OrderStatusNodeText =jQuery(this).parent("p").parent("div").prev("ul").children("li").children("p").first();
 					 selfTowBtnDOMNode  =jQuery(this).parent("p").parent("div");
 					 orderTimeDom      =jQuery(this).parent("p").parent("div").prev("ul").children("a").children("li").children("p.reservTime");
 					 
 					 
 				//	 console.log("orderTimeDom",orderTimeDom);
 					layer.open({
 					    content:"<div class='cardtishi_w542 poi1'>"+
 					    		"<div class='cardtishi_op poi2' style='margin-left:-212px;margin-top:-188px;'>"+	
 					    		"<p class='a1'><img src=' "+ webRoot +"/resources/images/meirong/shop/cardtise_cancel0.gif' width='65' height='65'/></p>"+
 								 "<p class='a2'>确定要取消预约吗？</p>"+
 								 "<p class='a3'>"+
 								 "<a class='but1' id='cancel'>取消</a>"+
 								 " <a class='but2' id='confirmCancel'>确定</a>"+
 								 " </p></div></div>"
 					});
 					$(".layermchild").attr("style","  box-shadow: none");
 				});	
 				//取消
 				jQuery("body").delegate("#cancel","click",function(e){
 					layer.closeAll();
 				});
 			  
 				jQuery("body").delegate("#confirmCancel","click",function(e){
 					
 					    layer.closeAll();
 						OrderStatusNodeText.text("已取消");
 						selfTowBtnDOMNode.remove();
 						orderTimeDom.remove();
 						
 						  jQuery.ajax({
 							  url:request.reserved.cancelReserve,
 							  data:{
 								  shop_id : itemShopId,
 								  app_id  :appId,
 								  open_id :openId,
 								  order_id : itemOrderId,
 								  optType : 1
 							  },
 							  type:"post",
 							  dataType :"json",
 							  success :function(data){
 								  console.log("取消预约,！200",data);
 								  if(data.status == 200 ){
 									//  console.log("成功取消预约",data);
 									// location.reload(true); 
 								  }
 							  },
 							  error: function(){
 								  
 							  }
 						  });
 						
 						
 					
 					
 				});
 				
 				
 			},hasServerTips:function(hasServer,hasServerNum,soleServerParameter){
 				
 				if(hasServer){
 					layer.open({
 					    content:"<div class='cardtishi_op poi2' style='margin-left:-205px;margin-top:-150px;'>"+	
 					    		"<p class='a1'><img src=' "+ GLOBAL.webRoot +"/resources/images/meirong/shop/cardtise_cancel0.gif' width='65' height='65'/></p>"+
 								 "<p class='a2'>您当前有正在进行中的服务，是否进入？</p>"+
 								 "<p class='a3'>"+
 								 "<a class='but1' id='cancelTips'>取消</a>"+
 								 " <a class='but2' id='confirmTips'>进入</a>"+
 								 " </p></div>"
 					});
 					jQuery(".layermchild").attr("style","  box-shadow: none");
 					jQuery("body").delegate("#cancelTips","click",function(e){
 						layer.closeAll();
 					});   
 					jQuery("body").delegate("#confirmTips","click",function(e){
 						if(hasServerNum>1){
 							layer.closeAll();
 						}else if(hasServerNum==1){
 							window.location.href=  GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_info?orderId="+soleServerParameter.order_id+"&shopId="+soleServerParameter.shop_id+"&shopSid="+soleServerParameter.s_id;
 						}
 					});
 					
 				}
 				
 			},chooseTime:function(){
 				//获取店铺信息
 				var getShopInfoDate=function(shopId,callback){
 					jQuery.ajax({
			        	 url:request.shop.shopInfo,
			        	 data:{
			        		 shop_id   :  shopId,
			        		 open_id   :  openId
			        	 },
			        	 type:"get",
			 			 dataType:"json",
			 			 success:function(data){
			 				 if(data.status == 200 && data.content){
			 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
			 					  		shopInfoData =  JSON.parse(decodeObj);
			 					callback && callback(shopInfoData);
			 				 }
			 			 }
					});
 				}

 				var dateModify={
 						verify:function(val,bussinessTime){
 							//营业时间 09:00-12:00
 		 		            var arr=bussinessTime.split('-');
 		 		            var startH=arr[0].split(':')[0],
 		 		             	startM=arr[0].split(':')[1],
 		 		             	endH=arr[1].split(':')[0],
 		 		             	endM=arr[1].split(':')[1];
 		 		            val=val.replace(/-/g,"/");
 							var _date=new Date(val);
 							if(_date.getHours()==startH && _date.getMinutes()>startM){
 								return true;
							}	
 							else if(_date.getHours()==endH && _date.getMinutes()<endM){
								return true;
							}
 							else if(_date.getHours()>startH && _date.getHours()<endH && _date>new Date()){
 								return true;
 							}else{
	 							layer.open({
								    content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;padding:0px;text-align:center;font-size:28px;' >请选择商家营业时间"+bussinessTime+"</span>",
								    time:2
								});
								return false;
 							}
 							
 						},
 						submit:function(reservedChangedTime,shopId,itemOrderId){
 							 //获取 itemCustomId
 	                        jQuery.ajax({
 	                            url :request.user.getCustomId,
 	                            data :{
 	                                open_id :openId,
 	                                shop_id :shopId
 	                            },
 	                            type : "get",
 	                            dataType :"json",
 	                            success :function(data){
 	                                if(data.status == 200){
 	                                    if(data.content){
 	                                        var decodeContent = globalUtil.b64ToUtf8(data.content,"utf8");
 	                                        var jsonContent   = JSON.parse(decodeContent);
 	                                        console.log("jsonContent",jsonContent);
 	                                        var itemCustomId =jsonContent.custom_id;
 	                                        if(itemCustomId && reservedChangedTime ){
 	                                            //修改预约时间
 	                                            jQuery.ajax({
 	                                                url:request.reserved.changeReserveTim,
 	                                                data:{
 	                                                    shop_id : shopId,
 	                                                    open_id : openId,
 	                                                    app_id  :appId,
 	                                                    yuyue_time : reservedChangedTime,
 	                                                    order_id : itemOrderId,
 	                                                    custom_id :itemCustomId
 	                                                },
 	                                                type:"post",
 	                                                dataType :"json",
 	                                                success :function(data){
 	                                                    if(data.status == 200 ){
 	                                                        console.log("修改预约时间成功");
 	                                                        location.reload();
 	                                                    }else{
 	                                                        layer.open({
 	                                                            content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;padding:0px;text-align:center;font-size:28px;' >"+data.errorMessage +"</span>",
 	                                                            time:2
 	                                                        });
 	                                                    }
 	                                                },
 	                                                error: function(e){

 	                                                }
 	                                            });

 	                                        }

 	                                    }
 	                                }
 	                            }

 	                        });
 						}
 				};
 				
 				var callback=function(that,bussinessTime){
 					if(!dateModify.verify(that.val(),bussinessTime)) return false;
 					dateModify.submit(that.val(),that.data('shopId'),that.data('orderId'));
 				}
 				
 				//绑定修改日期弹出日期
 				jQuery(".datetime-picker").click(function(){
 					var _this=this;
 					var shopId=$(this).data('shopId');
 					var setDate=function(shopDate){
 	 					if(!shopDate ||shopDate==null || shopDate=='') return;
 	 					//当前日期 5分钟之后
 	     		        var minDate=new Date((new Date()/1000+(60*5))*1000);
 	 		            //商家预约天数
 	 		            var day=shopDate.max_days || 0;
 	 		            //预约截止到当前日期+天数
 	 		            var currdate=new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate());
 	      		        var maxDate=new Date((currdate/1000+(86340*day))*1000);
 	 					bindDateInput(shopDate.shop_bussiness_time,minDate,maxDate,_this,callback);
 					};
 					getShopInfoDate(shopId,setDate);
 				});
 				//-------------------------------------------------------------------------
 		
 			}
 	};

 	orderList.init();
	
 	  function bindDateInput(bussinessTime,minDate,maxDate,id,callback){
 	        var currYear = (new Date()).getFullYear();
 	        var opt={};
 	        opt.date = {preset : 'date'};
 	        opt.datetime = { preset : 'datetime', minDate: minDate, maxDate:maxDate, stepMinute: 1  };
 	        //opt.datetime = {preset : 'datetime'};
 	        opt.time = {preset : 'time'};
 	        opt.default = {
 	            theme: 'android-ics light', //皮肤样式
 	            display: 'modal', //显示方式
 	            mode: 'scroller', //日期选择模式
 	            lang:'zh',
 	            //startYear:currYear - 10, //开始年份
 	            //endYear:currYear + 10 //结束年份
 	        };
 	        var optDateTime = $.extend(opt['datetime'], opt['default']);
 	        jQuery(id).mobiscroll(optDateTime).datetime(optDateTime);
 	        jQuery(id).change(function(){
 	            callback && callback(jQuery(this),bussinessTime);
 	        });
 	       jQuery(id).focus();
 	    }
});