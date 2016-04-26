//订单详情

$(function(){
	var jQuery = $.noConflict();
	//获取全局变量
	var globalVar=store.get("globalVar");
	var userId= globalVar.userId;
	var appId=globalVar.appId;
	var openId =globalVar.openId;
	var accessToken = globalVar.accessToken;
	  //全局变量中获取店铺详情
    var shopInfoData = store.get("shopInfoData");
    var currentHref=window.location.href;
	
	//url参数
	var shopId = getUrlParam("shopId");
	var shopSid = getUrlParam("shopSid");
	var orderId  = getUrlParam("orderId");
	var commentStatus = getUrlParam("commentStatus");
	//微信推送消息过来的
	var message   = getUrlParam("message") || 0;//1表示是 0 表示否
	
	
	var orderDetails ={
		
			init:function(){
				  //关闭分享
 				globalUtil.globalShareFun('');
				globalUtil.changeTitle("消费详情");
				//fastClick 
				//FastClick.attach(document.body);
				
				if(message==1){
					userId=getUrlParam("userId");
					appId =getUrlParam("appId");
					openId =getUrlParam("openId");
					accessToken =this.getAccessToken();
				}
				this.getShopInfo();
			
			},getAccessToken:function(){
				var massageAccessToken ;
				jQuery.ajax({
					url:request.user.getAccessToken,
					data:{app_id:globalVar.appId,open_id:globalVar.openId},
					type:'get',
					dataType:'json',
					async:false,
					success:function(data){
						if(data.status == 200 && data.content){
							massageAccessToken=data.content;
						}
					}
				});
				return massageAccessToken;
			},getShopInfo: function(){
				var _this = this;
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
	 				jQuery.ajax({
			        	 url:request.shop.shopInfo,
			        	 data:{
			        		 shop_id   :  shopId,
			        		 open_id   :  openId,
			        		 longitude :  longitude,
			        		 latitude  :  latitude
			        	 },
			        	 type:"get",
			 			 dataType:"json",
			 			 success:function(data){
			 				 if(data.status == 200 && data.content){
			 					var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
			 					  	shopInfoData =  JSON.parse(decodeObj);
			 					
			 					   _this.getOrderDetails(shopInfoData);
			 					 
			 					   store.remove("shopInfoData");
			 					   store.set("shopInfoData",shopInfoData);
			 				 }
			 			 }
			      });
	 			});
			},getOrderDetails : function(shopInfoData){
				/*
				 * 获取订单详情
				 */
				var _this = this;
				jQuery.ajax({
					url: request.user.userOrderItermInfo,
					type:"get",
					data:{
							shop_id : shopSid,
							order_id : orderId,
							app_id :appId,
							open_id :openId
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content = globalUtil.b64ToUtf8(data.content,"utf8");
								content=JSON.parse(content);
							
							   console.log("订单详情",content);
							laytpl(jQuery("#orderInfotemp").html()).render({ 
								content:content,
								webRoot:GLOBAL.webRoot,
								shopId:shopId,
								shopSid:shopSid,
								commentStatus:commentStatus,
								globalVar:globalVar,
								jing:"#",
								shopInfoData : shopInfoData 
							}, function(render){
								jQuery("#orderInfoView").empty();
							    jQuery("#orderInfoView").append(render);
							    
							    //订单评论详情
							    _this.goToOrderCommentDetail();
							    
							  //申请退款
								jQuery("a[data-apply-refund='true']").click(function(){
									var orderMoney = jQuery(this).attr("data-refund-money");
									var shopId = jQuery(this).attr("data-shop-id");
									var shopSid = jQuery(this).attr("data-shop-sid");
									var orderId = jQuery(this).attr("data-order-id");
									
									window.location.href= GLOBAL.webRoot + "/agent/manager-user-catalog-wx_user_apply_refund?shopId="+shopId+"&orderMoney="+orderMoney+"&orderId="+orderId+"&shopSid="+shopSid;
								});
							    
							   
							  //微信支付
								jQuery("a[data-item-pay='true']").click(function(){
									store.remove("payBackUrl");
					            	store.set('payBackUrl',currentHref);
									var encode_url = request.zhifuUrlLis;
										encoded_url=encodeURI(encode_url);
									//包装数据
									var opt={};
									
									    opt.appId=appId;
										opt.openId= openId;
										opt.orderId = jQuery(this).attr("data-order-id");
										opt.realShopId =jQuery(this).attr("data-shop-id");
										opt.shopId =jQuery(this).attr("data-shop-sid");
										opt.from = jQuery(this).attr("data-item-from");
										opt.contextUrl =GLOBAL.contextPath;
									
									
									opt= JSON.stringify(opt);
									
									//alert('opt='+opt);
									
									var state = globalUtil.utf8ToB64(opt, 'utf-8');
									//store.remove("opt");
									//store.set("opt",opt);
                                   // var state="";
                                    
									location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+GLOBAL.appIdPay+
										"&redirect_uri=" +encoded_url+
										"&response_type=code" +
										"&scope=snsapi_base&state=" + state+ "#wechat_redirect";
									return;
									
								});
							   //进入店铺主页
								$("#shopHomeInfo").click(function(){
									location.href = GLOBAL.webRoot + "/agent/manager-shop-info-wx_shops_home?userId="+userId+
													"&appId="+ appId+
													"&openId="+ openId+
													"&accessToken="+accessToken+
													"&shopId="+shopId;
									
								});
								
							  //修改预约时间
								_this.chooseTime();
								
								//取消预约
								_this.cancelYuyue();
							    
						    });
						}else{
							//console.log(data.msg);
						}
					},error:function(e){
						//console.log("请求异常");
					}	
						
				});
				
			},changeReservTime: function(openId,shopId){
				/*
				 * 修改预约时间，先同步获取顾客Id
				 */
				var customerId = globalUtil.getCustomerId(openId, shopId);
				
				 //修改预约时间
				  jQuery.ajax({
					  url:request.reserved.changeReserveTim,
					  data:{
						  app_id  :appId,
						  open_id :openId,
						  shop_id : shopId,
						  yuyue_time : reservedChangedTime,
						  order_id : orderId,
						  custom_id :customerId
					  },
					  type:"post",
					  dataType :"json",
					  success :function(data){
						  if(data.status == 200 ){
							  location.reload();
						  } else{
							
						  }
					  },
					  error: function(){}
				  });
				
			},goToOrderCommentDetail:function(){
				jQuery("#infomore_pj").click(function(){
					 location.href =GLOBAL.webRoot + "/agent/manager-user-catalog-wx_user_order_commented_detail?orderId="+orderId 
		               + "&shopId="+shopId +"&shopSid="+shopSid;
				 });
				
			},cancelYuyue:function(){
 				//取消预约
				jQuery("body").delegate("#cancelPre","click",function(e){
					
					layer.open({
					    content:"<div class='cardtishi_w542 poi1' style='margin-left:-209px;margin-top:-274px'>"+
					    		"<div class='cardtishi_op poi2'>"+	
					    		"<p class='a1'><img src=' "+ GLOBAL.webRoot +"/resources/images/meirong/shop/cardtise_cancel0.gif' width='65' height='65'/></p>"+
								 "<p class='a2'>确定要取消预约吗？</p>"+
								 "<p class='a3'>"+
								 "<a class='but1' id='cancel'>取消</a>"+
								 " <a class='but2' id='confirmCancel'>确定</a>"+
								 " </p></div></div>"
					});
					jQuery(".layermchild").attr("style","  box-shadow: none");
				});	
				//取消
				jQuery("body").delegate("#cancel","click",function(e){
					layer.closeAll();
				});
			    //确认
				var itemCustomId  ;
				jQuery("body").delegate("#confirmCancel","click",function(e){
					
					 layer.closeAll();
					  jQuery.ajax({
						  url:request.reserved.cancelReserve,
						  data:{
							  shop_id : shopId,
							  open_id :openId,
							  app_id  :appId,
							  order_id : orderId,
							  optType : 1
						  },
						  type:"post",
						  dataType :"json",
						  success :function(data){
							//  console.log("取消预约,！200",data);
							  if(data.status == 200 ){
								 // $("#cancelPre").parent("p").parent("div").remove();
								location.href= location.href;
							  } else{
								//  console.log("取消预约",data.errrMeg);
								  location.href= location.href;
							  }
						  },
						  error: function(re){
							  
						  }
					  });
					
				});
 				
 				
 			},chooseTime:function(){
 				var dateModify={
 						data:function(){
 							//营业时间 09:00-12:00
 							var arr=shopInfoData.shop_bussiness_time.split('-');
 							//当前日期 5分钟之后
 	         		        var minDate=new Date((new Date()/1000+(60*5))*1000);
 			 	            //商家预约天数
 			 	            var day=shopInfoData.max_days || 0;
 			 	            //预约截止到当前日期+天数
 			 	            var currdate=new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate());
 		       		        var maxDate=new Date((currdate/1000+(86340*day))*1000);
 							return {
 								minDate:minDate,
 								maxDate:maxDate,
 								startH:arr[0].split(':')[0],
 								startM:arr[0].split(':')[1],
 								endH:arr[1].split(':')[0],
 								endM:arr[1].split(':')[1]
 							};
 						},
 						init:function(){
 							 bindDateInput(dateModify.data().minDate,dateModify.data().maxDate,"#datetime-picker",dateModify.submit);
 						},
 						verify:function(val){
 							val=val.replace(/-/g,"/");
 							var _date=new Date(val);
 							if(_date.getHours()==dateModify.data().startH && _date.getMinutes()>dateModify.data().startM){
 								return true;
							}	
 							else if(_date.getHours()==dateModify.data().endH && _date.getMinutes()<dateModify.data().endM){
								return true;
							}
 							else if(_date.getHours()>dateModify.data().startH && _date.getHours()<dateModify.data().endH && _date>new Date()){
 								return true;
 							}else{
	 							layer.open({
								    content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;padding:0px;text-align:center;font-size:28px;' >请选择商家营业时间"+shopInfoData.shop_bussiness_time+"</span>",
								    time:2
								});
								return false;
 							}
 							
 						},
 						submit:function(val){
 							 if(!dateModify.verify(val)) return false;
 							//获取customId;
 							  var	customInfo= globalUtil.getCustomerId(openId,shopId);
 							  		customInfo = globalUtil.b64ToUtf8(customInfo, "utf8");
 							  		customInfo=JSON.parse(customInfo);
 							  var 	itemCustomId=customInfo.custom_id;
							 //修改预约时间
							 jQuery.ajax({
								  url:request.reserved.changeReserveTim,
								  data:{
									  app_id  :appId,
									  open_id :openId,
									  shop_id : shopId,
									  yuyue_time : val,
									  order_id : orderId,
									  custom_id :itemCustomId
								  },
								  type:"post",
								  dataType :"json",
								  success :function(data){
									  if(data.status == 200 ){
										 console.log("修改预约时间成功");
										 window.location = location.href.toString();
										  
									  } else{
										//  console.log("修改预约时间",data.errrMeg);
									  }
								  },
								  error: function(){}
							  });
 						}
 				}
 				dateModify.init();
 				
			}
			
	};
	
	orderDetails.init();
    function bindDateInput(minDate,maxDate,id,callback){
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
            callback && callback(jQuery(this).val());
        });
    }
});