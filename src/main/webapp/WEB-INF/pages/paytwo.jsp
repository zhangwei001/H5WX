<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<jsp:include  page="layout_app/header.jsp" />
<script src="<%=request.getContextPath()%>/resources/javascript/library/jquery-2.1.4.min.js"></script>
 <script src="<%=request.getContextPath()%>/resources/javascript/library/jquery.base64.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/library/store.min.js"></script>
<script  src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" ></script>
</head>
<body>

</body>
<script type="text/javascript">
    
	$(function(){
     
    var globalVar = store.get("globalVar");
    var url=document.referrer;
    // 支付参数
    var mljia_appid= "${mljia_appid}";

    var mljia_openid = "${mljia_openid}";
    var js_ticket = "${js_ticket}";
    var auth_url = "${auth_url}";
    
	var state = "${state}";
	var opt = $.base64.decode(state,'utf-8');
	//var opt = store.get("opt");
	//alert("payTwoOpt"+JSON.stringify(opt));
	
	
	 
	 if(typeof opt == 'string'){
		opt = JSON.parse(opt);
		//alert("opt.contextUrl" + opt.contextUrl);
	} 
	 
	var from = window.getSearchString("from") || opt.from;////orderLis  or  orderdetail
	
	var orderListPayApp={
			init:function(){
				globalUtil.changeTitle("顾客支付");
				this.getWXOrderPayInfo();
			},getWXOrderPayInfo:function(){
				var _this= this;
				$.ajax({
					url: request.reserved.getWXOrderPayInfo,
					type:"get",
					async: false,
					data:{
							app_id: opt.appId,
							open_id :opt.openId,
							pay_open_id:mljia_openid,
							order_id: opt.orderId,
							shop_id:opt.shopId
						 },
					dataType:"json",
					success: function(data){
						//alert("data:"+JSON.stringify(data));
							if(200 == data.status && data.content){
								var content =globalUtil.b64ToUtf8(data.content,"utf8");
								    content = JSON.parse(content);
								    _this.wxOrderPay(content);
							}else{
								alert('失败');
							}
					},
					error:function(e){}	
					
				});
				
			},wxOrderPay:function(content){
				var timestamp = content.timeStamp;
   				var nonceStr  = content.nonceStr;
   				var signature  = content.nonceStr;
   				var packages  = content.package;
   				var signType  = content.signType;
   				var paySign  = content.paySign;
			   
					$.get(GLOBAL.webRoot + "/get_payconfig_sign",{
						noncestr: nonceStr,
						jsapi_ticket : js_ticket,
						timestamp : timestamp,
						url: auth_url
					}, function (res) {	
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: mljia_appid, // 必填，公众号的唯一标识
							timestamp: timestamp, // 必填，生成签名的时间戳
							nonceStr: nonceStr, // 必填，生成签名的随机串
							signature: res,// 必填，签名，见附录1
							jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});

						wx.ready(function () {

							wx.chooseWXPay({

								'timestamp': timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								'nonceStr': nonceStr, // 支付签名随机串，不长于 32 位
								'package': packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
								'signType': signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								'paySign': paySign, // 支付签名
								'success': function (res) {
									// 支付成功后的回调函数
									
									/* alert("opt.contextUrl:" + opt.contextUrl);
									alert("opt.shopId:" + opt.shopId);
									alert("opt.activityId:" + opt.activityId);
									alert("from" + from); */
									
									var url=store.get("payBackUrl");
									//alert(url);
									if(url && url!=''){
										history.pushState({}, "立即预约", url);
									}
									setTimeout(function(){
									var realShopId =opt.realShopId || "";
								
									 window.location.href = opt.contextUrl+"/agent/manager-pay-wx_pay_success?shopId="+  opt.shopId +"&realShopId="+ realShopId + "&activityId="+opt.activityId+"&from="+from+"&wxPay=1";
									},500);

								},
								"cancel": function(){
									history.go(-1);
									/* if(opt.form=="orderLis"){
										location.href= opt.contextUrl+"/agent/meirong-user-customer_order?userId="+globalVar.userId +"&appId="+globalVar.appId +"&openId="+ globalVar.openId + "&accessToken="+globalVar.accessToken;
									}else if(opt.from=="orderdetail"){
										location.href= opt.contextUrl+"/agent/meirong-shop-order_item_details_info?orderId="+ opt.orderId + "&userId="+globalVar.userId + "&appId="+globalVar.appId + "&openId="+ globalVar.openId +"&shopId="+opt.shopId+"&shopSid="+opt.shopSid;
									} */
									
								}
							});

						});

					});
				
				
				
			}
	}
	orderListPayApp.init();

});

</script>
<jsp:include  page="layout_app/footer.jsp" /> 