//支付成功页面
$(function(){
	//全局变量
	var globalVar = store.get("globalVar");
	var appId = globalVar.appId;
	var openId = globalVar.openId;
	var userId = globalVar.userId;
	var accessToken = globalVar.accessToken;
	
	var shopInfoData  = store.get("shopInfoData");
	  //  console.log("店铺信息",shopInfoData);
	
	var orderSuccessData = store.get("order_success_data");
	//console.log("订单信息",orderSuccessData);
	
	
	//url参数
	var shopId = getUrlParam("shopId");
	//订单列表 详情
	var wxPayshopId = getUrlParam("realShopId") || "";
	var activityId =getUrlParam("activityId");
	var from     =getUrlParam("from");// wx支付成功 还是 其他item 支付成功
	
	var wxPay = getUrlParam("wxPay") || 0;// 1表示是微信支付 ；0表示不是微信支付
	
	
	var paySuccessApp ={
			init:function(){
				var _this = this;
				//fastClick 
				FastClick.attach(document.body);
				
				if(wxPay==1){
					globalUtil.changeTitle("支付成功");
				}else{
					globalUtil.changeTitle("预约成功");
				}
				
				if(from =="wx"){
					this.getSimpleOrderInfo();
				}else if(from =="item" || from =="advice" ){
					this.getUserOrderItermInfo();
				}else{
					this.getUserOrderItermInfo();
				}
				window.onbeforeunload =function(){
					_this.goBack();
				}
			},goBack:function(){
				history.go(-2);
			},getUserOrderItermInfo:function(){
				var _this = this;
				$.ajax({
					url: request.user.userOrderItermInfo,
					type:"get",
					data:{
							shop_id : shopInfoData.s_id ,
							order_id : orderSuccessData.order_id,
							app_id :appId,
							open_id :openId,
							access_token:accessToken
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content =  globalUtil.b64ToUtf8(data.content);
							    content=JSON.parse(content);
							 //  console.log("订单详情",content);
							laytpl($("#paySuccessTmpl").html()).render({ 
								content:content,
								orderSuccessData:orderSuccessData,
								globalVar:globalVar,
								webRoot :GLOBAL.webRoot,
								activityId:activityId,
								shopInfoData:shopInfoData,
								from:from,
								wxPay:wxPay,
								jing: "#"
								
							}, function(render){
							    $("body").append(render);
							    _this.selectFromPath();
						    });
						}else{
						}
					},error:function(e){
					}	
						
				});
				
			},getSimpleOrderInfo:function(){
				var _this = this;
				$.ajax({
					url: request.user.simpleOrderInfo,
					type:"get",
					data:{
						shop_id : shopInfoData.s_id ,
						order_id : orderSuccessData.order_id,
						app_id :appId,
						open_id :openId,
						access_token:accessToken
						
					},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content =  globalUtil.b64ToUtf8(data.content);
							content=JSON.parse(content);
							laytpl($("#reservSuccess").html()).render({
								content:content,
								orderSuccessData:orderSuccessData,
								globalVar:globalVar,
								webRoot :GLOBAL.webRoot,
								activityId:activityId,
								shopInfoData:shopInfoData,
								from:from,
								jing:"#"

							}, function(render){
								$("body").find("div").remove();
								$("body").append(render);
								//继续逛逛
								_this.selectFromPath();
								

							});
						}else{
							//console.log(data.msg);
						}
					},error:function(e){
						//console.log("请求异常");
					}

				});
				
			},selectFromPath:function(){
				//选择继续逛逛
				var hrf;
				if(from == "advice"){
					hrf = GLOBAL.webRoot +"/agent/manager-shop-advice-wx_shop_advice?userId="+ userId + 
							"&appId="+ appId +
							"&openId="+ openId + 
							"&accessToken="+accessToken +
							"&shopId="+ shopId;
				}else if(from == "shopHome"){
					hrf = GLOBAL.webRoot +"/agent/manager-shop-info-wx_shops_home?userId="+ userId + 
							"&appId="+ appId +
							"&openId="+ openId + 
							"&accessToken="+accessToken +"&shopId="+ shopId;
				}else if(from == "item"){
					hrf = GLOBAL.webRoot +"/agent/manager-shop-item-wx_item_list?userId="+ userId + 
							"&appId="+ appId +
							"&openId="+ openId + 
							"&accessToken="+accessToken+
							"&shopId="+ shopId;
				}else if(from == "event"){
					hrf =  GLOBAL.webRoot +"/agent/manager-shop-event-wx_event_info?activityId="+activityId + 
							"&shopId="+shopId +
							"&from="+from;
				}else if(from == "orderLis" || from == "orderdetail"){
					hrf=GLOBAL.webRoot+"/agent/manager-shop-item-wx_item_list?userId="+userId+
							"&openId="+openId +
							"&appId="+ appId+
							"&accessToken="+accessToken+
							"&shopId="+wxPayshopId;
						
				}
				$("#formPath").attr("href",hrf);
			}
	};
	paySuccessApp.init("入口");
	
	
});