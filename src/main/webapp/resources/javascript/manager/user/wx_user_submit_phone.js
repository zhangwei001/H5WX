$(function(){
	var telReg       = /^1[3-9]\d{9}$/;
	var wait         = 120;   
	
	var globalVar = store.get("globalVar");
	var openId =  globalVar.openId;
	var appId   = globalVar.appId;
	var accessToken = globalVar.accessToken;
	var userId = globalVar.userId;
	
   //url参数
	var shopId =  getUrlParam("shopId");
	var itemId = getUrlParam("itemId");
	var from   = getUrlParam("from");
	var activityId =  getUrlParam("activityId");
	
	var itemType = getUrlParam("itemType");
	
	//fastClick 
	FastClick.attach(document.body);
	globalUtil.changeTitle("信息完善");
	globalUtil.globalShareFun('');
	  $("input[name=phone]").keyup(function(){
	    	var PhoneNum = $(this).val();
	    	
	    	//设置获取验证码按钮效果
	    	if(PhoneNum.toString().length == 11){
	    		$("#getVerifyCode").css({"background-color":"#fe5ebe","color":"#fff"});
	    	}else{
	    		$("#getVerifyCode").css({"background-color":"#BBBBBB","color":"#fff"});
	    	}
	    	
	    	//首先，正则判断
	    	if(!telReg.test(PhoneNum)){
	    		return;
	    	}
	    	//然后，调用接口检测手机号码是否存在
	    	 $.ajax({
					url:request.user.checkUserPhone,
					type:"post",
					data :{
						mobile_phone :PhoneNum,
						shop_id       :shopId,
						app_id       :appId,
						open_id       :openId
					},
					dataType:"json",
					
					success: function(data){
						if(31 == data.status){
							alert("你的手机号已提交过~");
							$("input[name=phone]").val("");
							 $("#getVerifyCode").css("background-color","#BBBBBB");
						}else if(38 == data.status){
							alert("店内员工不可以加入商家哦~");
							$("input[name=phone]").val("");
						}else if(200 == data.status){}
					},
					
			});
  	
	    });
	  
	  
	  //控制提交按钮效果
	    $("input[name=verify]").keyup(function(){
	    	 var _this       = $(this),
	    	   user_name     = $("input[name=username]").val(),
			 mobile_phone    = $("input[name=phone]").val();
			 verifyLenBoolen = (_this.val().toString().length == 6) ? true : false; 
			 
	    	 if(user_name && mobile_phone && verifyLenBoolen){
	    		 $("#submit_btn").css({"background-color":"#fe5ebe","color":"#fff"});
	    	 }else if(!verifyLenBoolen){
	    		 $("#submit_btn").css({"background-color":"#BBBBBB","color":"#fff"});
	    	 }
	    });
	    
	    
	  //获取验证
		 $("#getVerifyCode").click(function(){
			 var user_name    = $("input[name=username]").val();
			 var mobile_phone = $("input[name=phone]").val();
			 var telBoolen =  telReg.test(mobile_phone);
			 var _this = $(this);
			 /*
			  * 通过给元素添加属性值来控制   用户 多次点击 获得验证码按钮 重复获取验证码。
			  *  思路：  当获取成功之后，设置属性值1，然后在点击事件里检测改值，如果是1，则返回点击事件函数，否则继续下面的获取验证码流程。
			  */
			 var falg=_this.attr("data-falg");
			 if(falg==1){
				 return;
			 }
			 if(telBoolen && user_name){
				 //获取验证码
				 $.ajax({
						url:request.shop.getVerifyCode+mobile_phone,
						data:{
							app_id       :appId,
							open_id:    openId
						},
						type:"get",
						dataType:"json",
						
						success: function(data){
							if(200 == data.status){
							}
						}
				});
				 //倒计时
			    _this.attr("data-falg","1");
			    time(_this);
			 }
		 });
		 
		 
		 //定时器 处理 输入 名字 手机号 验证码 效果
		  setInterval(function(){
			    	if($("input[name=username]").val() && $("input[name=phone]").val() && ( $("input[name=verify]").val().toString().length == 6 ) ){
			    		 $("#submit_btn").css({"background-color":"#fe5ebe","color":"#fff"});
			    		
			    	}else{
			    		 $("#submit_btn").css({"background-color":"#BBBBBB","color":"#fff"});
			    		
			    	}
		  },300);
		    
		 
		 
		 
			//提交绑定
		 $("#submit_btn").click(function(){
			 
			 
			 var user_name    = $("input[name=username]").val();
			 var mobile_phone = $("input[name=phone]").val();
			 var verifyNum    = $("input[name=verify]").val();
			 
			 if(!user_name || !mobile_phone || !verifyNum  ){
				 return;
			 }
		
			 if(mobile_phone && user_name && verifyNum && shopId){
				$.ajax({
					url:request.shop.bindUser,
					type:"post",
					data:{
						  shop_id       : shopId,
						  app_id       :appId,
						  user_name    : user_name,
						  open_id      : openId,
						  mobile_phone : mobile_phone,
						  sms_code     : verifyNum
					},
					dataType:"json",
					
					success: function(data){
						
						if( 200 == data.status){
							if(itemType=="card"){
								location.href= GLOBAL.webRoot +"/agent/manager-shop-card-wx_card_sale?shopId="+shopId + 
								"&itemId="+itemId +
								"&itemType="+itemType+
								"&activityId="+activityId+
								"&from="+from;	
								
							}else if(itemType=="massage") {
								location.href= GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale?shopId="+shopId + 
								"&itemId="+itemId +
								"&itemType="+itemType+
								"&activityId="+activityId +
								"&from="+from;			
								
							}else if(itemType=="product"){
								location.href= GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale?shopId="+shopId + 
								"&itemId="+itemId +
								"&itemType="+itemType+
								"&activityId="+activityId +
								"&from="+from;	
							}else{
								alert("来源出错");
							}
					   
						}else if(29 == data.status ){
							if(itemType=="card"){
								location.href= GLOBAL.webRoot +"/agent/manager-shop-card-wx_card_sale?shopId="+shopId + 
								"&itemId="+itemId +
								"&itemType="+itemType+
								"&activityId="+activityId+
								"&from="+from;	
								
							}else if(itemType=="massage") {
								location.href= GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale?shopId="+shopId + 
								"&itemId="+itemId +
								"&itemType="+itemType+
								"&activityId="+activityId +
								"&from="+from;			
								
							}else if(itemType=="product"){
								location.href= GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale?shopId="+shopId + 
								"&itemId="+itemId +
								"&itemType="+itemType+
								"&activityId="+activityId +
								"&from="+from;	
							}else{
								alert("来源出错");
							}
					   
						}else if(23 == data.status ){
							layer.open({
							    type: 1,
							    title: false,
							    area: ['420px', '240px'], //宽高
							    closeBtn: true,
							    shadeClose: false,
							    skin: 'yourclass',
							    content: '<div class="yzmerrormain">'+
						    	'<div class="yzmerrorbghei"></div>'+
						    	'  <div class="yzm_inputerror" style="position: relative; top: 0px;left: 0px; ">'+
						    	'  <i class="icon-yzminputerror"  ></i>您输入的验证码有误'+
						    	'</div></div>',
						       time:1	
							    	
							});
							//关闭验证码提示框
							$("#closebtn").click(function(){
								layer.closeAll();
							});
							$("#getAgain").click(function(){
								layer.closeAll();
							});
						}else{
							alert(data.errorMessage);
						}
					}
			  });
				
			}else{
			/*	layer.open({
				    type: 1,
				    title: false,
				    area: ['420px', '240px'], //宽高
				    closeBtn: true,
				    shadeClose: false,
				    skin: 'yourclass',
				    content: '<div class="yzmerrormain">'+
				    	'<div class="yzmerrorbghei"></div>'+
				    	'<div class="yzmerror" id="popWindow" style="margin-left:-295px;margin-top:-650px;height:245px">'+
				    	'<p class="a1 mt10 "><a class="mr15" id="closebtn"><img src=" '+webRoot+'/resources/images/meirong/shop/cross_r2_c4.png" width="31" height="31"></a></p>'+
				    	'<p class="a2"><img src="'+webRoot+'/resources/images/meirong/shop/errorgantan_r2_c2.png" width="106" height="106"></p>'+
				    	'<p class="a3">您尚未输入验证码</p>'+
				    	'</div></div>'
				    	
				});
				//关闭验证码提示框
				$("#closebtn").click(function(){
					layer.closeAll();
				});*/
			}
			
			 
		});
		 
		 
			//倒计时函数
			var time = function (o) {
		        if (wait == 0) {
		        	o.attr("data-falg","0");
		            o.text("重新获取");
		            o.css("background-color","#fe5ebe");
		            wait =120;
		        } else {
		            //o.attr("value",wait + "秒");
		            o.text(wait + "s");
		            o.css("background-color","#BBBBBB");
		            wait--;
		            setTimeout(function() {
		                time(o);
		            },
		            1000);
		        }
		    };
	
});