$(function(){
	
	//全局变量
	var globalVar = store.get("globalVar");
	var openId= globalVar.openId;
	var appId  = globalVar.appId;
	
	
	//路由参数
	var orderId = window.getSearchString("orderId");
	var shopId = window.getSearchString("shopId");
	var shopSid = window.getSearchString("shopSid");
	var orderMoney = window.getSearchString("orderMoney");
	
	var applyRefundApp ={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle("申请退款");
				this.rendRefundTemp();
			},rendRefundTemp:function(){
				var _this =this;
				laytpl($("#refundMoneyTemp").html()).render({ 
					orderMoney:orderMoney || 500
					}, function(html){
						$("body").append(html);
						_this.submitRefundInfo();
				    });
			},submitRefundInfo:function(){
				var refundWhy;
				var clickFlag = 0;
				$("li.wx_tkly").click(function(){
					$(this).addClass("wx_tkly_a").siblings().removeClass("wx_tkly_a");
					refundWhy = $(this).children("p.a1").text();
					$("#applyRefundBtn").addClass("wxyy_info_main_but2");
					clickFlag=1;
				});
				
				$("#applyRefundBtn").on("click",function(){
					if(clickFlag==0){
						return;
					}
					 $.ajax({
						  url:request.order.wxApplyRefundMoney,
						  data:{
							  shop_id : shopSid,
							  app_id  :appId,
							  open_id :openId,
							  order_id : orderId,
							  refund_why : refundWhy
						  },
						  type:"post",
						  dataType :"json",
						  success :function(data){
							 
							  if(data.status == 200 ){
								 location.href=GLOBAL.webRoot +"/agent/manager-user-info-wx_user_refund_details?orderId="+orderId+"&shopId="+shopId+"&shopSid="+shopSid;
								  
							  } else{
								alert(data.errorMessage);
							  }
						  },
						  error: function(){
							  alert("数据错误");
						  }
					  });
					
					
				});
				
			}
	}
	applyRefundApp.init();
	
});