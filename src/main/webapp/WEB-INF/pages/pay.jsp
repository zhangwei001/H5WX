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
    // 支付参数
    var mljia_appid= "${mljia_appid}";
    
   // alert("mljia_appid"+mljia_appid);
    var mljia_openid = "${mljia_openid}";
    var js_ticket = "${js_ticket}";
    var auth_url = "${auth_url}";

	var state = "${state}";
   
	var opt = $.base64.decode(state,"utf-8");
	
	//var opt = globalUtil.b64ToUtf8(state);
	
	
	
	if(typeof opt == 'string'){
		opt = JSON.parse(opt);
	}
	
	//alert("opt:"+JSON.stringify(opt));
	
	//alert("opt.orderWay:<<"+opt.orderWay);
	 var from = opt.from;
	if(!mljia_openid){
		alert('获取openid失败，请稍后再试！');
		return;
	}
	
	var cardInfoObj=store.get("cardInfoObj");
	

	
	var WxPayApp = {
			init:function(){
				globalUtil.changeTitle("顾客支付");
				//如果支付金额为0 返回上个页面
				
				 if(opt.itemType=="card"){
					 this.ImplementCard();
					 
				 }else if(opt.itemType=="massage"){
					 this.ImplementMassage();
					 
				 }else if(opt.itemType=="product"){
					 this.ImplementProduct();
				 }else{
					 alert("消费类型错误");
				 }
			},ImplementCard:function(){
				var _this = this;
		    	 $.ajax({
		    	    	url: request.reserved.reservOrderCard,
		    	    	type:"post",
		    	    	async: false,
		    	    	data:{
		    	    		app_id: 		opt.appId,
							open_id:		opt.openId,
							shop_id:		opt.shopId,
							pay_open_id   :  mljia_openid,
							card_type_id:   opt.cardId,
							staff_id     :  opt.staffId,
							yuyue_time    : opt.yuyueTime,
							order_way    :   opt.orderWay,
							order_pre    :   opt.orderPre,
							order_money  :   opt.orderMoney,
							pay_money    :   opt.payMoney,
							give_money   :   opt.giveMoney,
							activity_id  :   opt.activityId || "",
						//	custom_user_id : opt.customUserId || "",
							user_mobile    : opt.userMobile,
							user_name     :  opt.userName
		    	    	},
		    	    	dataType:"json",
		    			error: function(XMLHttpRequest,textStatus, errorThrown){
		    					console.log("错误状态码：status:"+XMLHttpRequest.status+" readyState:"+XMLHttpRequest.readyState+" textStatus:"+textStatus);
		    					
		    					if(XMLHttpRequest.readyState==0){
		    						alert('链接超时，请刷新页面！');
		    					}else{
		    						alert('错误信息errorThrown:'+errorThrown+" ;textStatus:"+textStatus);
		    						alert('错误信息responseText:'+XMLHttpRequest.responseText);
		    					}
		    			},
		    	    	success: function(data){
		    	    		
		    	    		if(200 == data.status && data.content){
		    	    			var decodeContent     = globalUtil.b64ToUtf8(data.content, "utf8");
		    	    			    contentJSONData   = JSON.parse(decodeContent);
		    	    			    
		    	    			    store.remove("order_success_data");
									store.set("order_success_data",contentJSONData);
									 //唤起微信支付
				 					_this.chooseWXPay(contentJSONData);

		    	    		}else {
		    	    			alert(data.errorMessage);
		    	    			//_this.payErrorBackUrl();
		    	    			history.go(-1);
		    	    		}
		    	    	}
		    	    });
			},ImplementMassage:function(){
				var _this = this;
			 	var massageInfo = store.get("massageInfo");
		    	//alert("opt:"+JSON.stringify(opt));
		    	 $.ajax({
		    	    	url: request.reserved.reservOrderMassage,
		    	    	type:"post",
		    	    	async: false,
		    	    	data:{
		    	    		app_id			: 	opt.appId,
		    	    		open_id			:	opt.openId,
		    	    		shop_id			:	opt.shopId,
		    				pay_open_id     :   mljia_openid,
		    	    		is_other_shop	: 	0,
		    	    		other_shop_id	: 	opt.otherShopId ,
		    	    		card_id			: 	opt.cardId,
		    	    		staff_id	: 		opt.staffId,
		    	    		parent_id	: 	    opt.parentId,
		    	    		massage_id      :   opt.massageId,
		    	    		num				:	opt.num,
		    	    		yuyue_time		:	opt.yuyueTime,
		    	    		order_way		:   opt.orderWay,
		    	    	    isPreferential	:	opt.isPre,
		    	    		order_money		:	opt.orderMoney,
		    	    		pay_money		:	opt.payMoney,
		    	    		activity_id		: 	opt.activityId ,
		    	    		user_mobile		:	opt.userMobile,
		    	    		user_name		: 	opt.userName 
		    	    	},
		    	    	dataType:"json",
		    			error: function(res){
		    				alert(JSON.stringify(res));
		    			},
		    	    	success: function(data){
		    	    		if(200 == data.status && data.content){
		    	    			var decodeContent     = globalUtil.b64ToUtf8(data.content, "utf8");
		    	    			    contentJSONData   = JSON.parse(decodeContent);
		    	    			  // alert("contentJSONData"+JSON.stringify(contentJSONData));
		    	    			     store.remove("order_success_data");
									  store.set("order_success_data",contentJSONData);

									   //唤起微信支付
				 					   _this.chooseWXPay(contentJSONData);


		    	    		}else {
		    	    			alert(data.errorMessage);
		    	    			//_this.payErrorBackUrl();
		    	    			history.go(-1);
		    	    			//location.href= opt.contextUrl+"agent/meirong-order-reserve_order?shopId="+ opt.shopId +"&userId="+globalVar.userId +"&itemId="+opt.massageId +"&itemType="+opt.itemType+"&activityId="+opt.activityId+"&discountedMoney="+ opt.originalPrice;
		    	    		}
		    	    	},error:function(e){
		    	    	}
		    	    });
		    	
			},ImplementProduct:function(){
				
				var _this = this;
		    	 $.ajax({
		  	    	url: request.reserved.reservOrederProduct,
		  	    	type:"post",
		  	    	async: false,
		  	    	data:{
		  	    		app_id			: 	opt.appId,
		 				open_id			:	opt.openId,
		 				shop_id			:	opt.shopId,
		 				pay_open_id     :   mljia_openid,
		 				is_other_shop	: 	0,
		 				other_shop_id	: 	opt.otherShopId,
		 				card_id			: 	opt.cardId,

		 				staff_id	: 		opt.staffId,
		 				parent_id	: 	    opt.parentId,
		 				num            :    opt.num,
		 				product_id      :   opt.productId,
		 				yuyue_time		:	opt.yuyueTime,
		 				order_way		:   opt.orderWay,
		 				isPreferential	:	opt.isPre,

		 				order_money		:	opt.orderMoney,
		 				pay_money		:	opt.payMoney,
		 				activity_id		: 	opt.activityId ,
		 				//	custom_user_id	:	opt.customUserId,
		 				user_mobile		:	opt.userMobile,
		 				user_name		: 	opt.userName
		  	    	},
		  	    	dataType:"json",
		  			error: function(res){
		  				alert(JSON.stringify(res));
		  			},
		  	    	success: function(data){
		  	    		if(200 == data.status && data.content){
		  	    			
		  	    			//console.log(data);
		  	    			var decodeContent     = globalUtil.b64ToUtf8(data.content, "utf8");
		  	    			    contentJSONData   = JSON.parse(decodeContent);
		  	    			    
		  	    			   store.remove("order_success_data");
		 					   store.set("order_success_data",contentJSONData);
		 					   
		 					   //唤起微信支付
		 					   _this.chooseWXPay(contentJSONData);

		  	    		}else {
		  	    			alert(data.errorMessage);
		  	    			//_this.payErrorBackUrl();
		  	    			history.go(-1);
		  	    			//location.href= opt.contextUrl+"agent/meirong-order-reserve_order?shopId="+ opt.shopId +"&userId="+globalVar.userId +"&itemId="+opt.productId +"&itemType="+opt.itemType+"&activityId="+opt.activityId+"&discountedMoney="+ opt.originalPrice;
		  	    			
		  	    		}
		  	    	},error:function(e){
		  	    		alert(JSON.stringify(e));
		  	    	}
		  	    });
		     	
		     	
			},chooseWXPay:function(contentJSONData){
				var _this=this;
				var timestamp = contentJSONData.timeStamp;
  				var nonceStr = contentJSONData.nonceStr;
  				var signature = contentJSONData.nonceStr;
  				var packages = contentJSONData.package;
  				var signType = contentJSONData.signType;
  				var paySign = contentJSONData.paySign;

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
									var url=store.get("payBackUrl");
								//	alert(url);
									if(url && url!=''){
										history.pushState({}, "立即预约", url);
									}
									
									//alert("调用微信支付成功");
									//store.remove("opt");
									// 支付成功后的回调函数
									setTimeout(function(){
										window.location.href=opt.contextUrl+"agent/manager-pay-wx_pay_success?shopId="+ opt.shopId +"&activityId="+opt.activityId+"&from="+from+"&wxPay=1";
									},500);
									 
								},
								"cancel": function(){
									//store.remove("opt");
									/* if(opt.activityId && opt.activityId >0){
										location.href= opt.contextUrl+"agent/meirong-order-reserve_order?shopId="+ opt.shopId +"&userId="+globalVar.userId +"&itemId="+opt.productId +"&itemType="+opt.itemType+"&activityId="+opt.activityId+"&discountedMoney="+ opt.originalPrice;
									}else{
										location.href= opt.contextUrl+"agent/meirong-order-reserve_order?shopId="+ opt.shopId +"&userId="+globalVar.userId +"&itemId="+opt.productId +"&itemType="+opt.itemType;
									} */
									history.go(-1);
									//_this.payErrorBackUrl();
									
								}
							});

						});

					});
			},payErrorBackUrl:function(){
				//alert("payErrorBackUrl:"+opt.backUrl);
				//支付错误 或者取消支付 返回原页面
				location.href = opt.backUrl;
			}
	};
	WxPayApp.init();


});

</script>

<jsp:include  page="layout_app/footer.jsp" /> 
