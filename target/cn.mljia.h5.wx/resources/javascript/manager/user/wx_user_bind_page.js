//用户绑定

$(function(){
	var status=globalUtil.getUrlParam('status'),
		errorMsg=$("body").attr("data-error-msg"),
		
		userId=$("body").attr("data-user-id"),//店主的userID
		appId=$("body").attr("data-app-id"),
		openId =$("body").attr("data-open-id"),
		
	    accessToken =$("body").attr("data-access-token");
	var  message =   globalUtil.getUrlParam('message') ||0;
	
	
	
   //设置全局变量
	var globalVar={};
		globalVar.userId=userId;
		globalVar.appId=appId;
		globalVar.openId=openId;
		globalVar.accessToken =accessToken;
		
	store.remove("globalVar");	
	store.set("globalVar",globalVar);
	
	

     
    var shopId = globalUtil.getUrlParam('shopId') || 0;
	
	var from= getUrlParam("from");
	var telReg       = /^1[3-9]\d{9}$/;
	var wait         = 120;       
	
	var userApp={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				//关闭分享
				globalUtil.globalShareFun('');
				
				globalUtil.changeTitle('加入商家');
				
			/*	if(status == 28 ){
					this.getOtherShopStatue();
				}*/
				//如果是从消息来的，设置全局变量
				if(message==1){
					var globalVar={};
						globalVar.userId=globalUtil.getUrlParam("userId");
						globalVar.appId=globalUtil.getUrlParam("appId");
						globalVar.openId=globalUtil.getUrlParam("openId");
						globalVar.accessToken =globalUtil.getAccessToken(globalVar.appId, globalVar.openId);
					store.remove("globalVar");	
					store.set("globalVar",globalVar);
				}
				
				
				if(status==29){
					//已提交审核，等待
					laytpl($("#submitSuccessTmpl").html()).render({ 
						webRoot:GLOBAL.webRoot,
					}, function(render){
						
						$("body").append(render);
					    $("body").addClass("bgbai");
						
				    });
				}else if(status==200){
					
					laytpl($("#bindSuccessTmpl").html()).render({ 
						webRoot:GLOBAL.webRoot,
					}, function(render){
						$("body").append(render);
					    $("body").addClass("bgbai");
				    });
					
				}else{
					if(shopId){
						$("#pageView").css("display","block");
						this.getSubmitFun();
					}else{
						//跳转选择店铺页面
		 				location.href = GLOBAL.contextPath + "agent/manager-user-wx_select_shop_for_bind?status="+status;
					}
				} 
				
				
			},getOtherShopStatue:function(){
			 	 $.ajax({
						url:request.user.getUserStatus,
						type:"post",
						async:false,
						data :{
							user_id   : userId,
							open_id   : openId,
							app_id	  : appId
						},
						dataType:"json",
						success: function(data){
							if(200 == data.status && data.content){
								 var decodeObj = globalUtil.b64ToUtf8(data.content, "utf8"),
								 content= JSON.parse( decodeObj );
							}else {
							}
						},
				});
			},getSubmitFun:function(){
				//输入手机号 
				$("body").delegate("input[name=phone]","keyup",function(){
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
								open_id       :openId,
								app_id		:appId
							},
							dataType:"json",
							success: function(data){
								if(31 == data.status){
									alert("你的手机号已提交过~");
									$("input[name=phone]").val("");
								}else if(38 == data.status){
									alert("店内员工不可以加入商家哦~");
									$("input[name=phone]").val("");
								}else if(200 == data.status){
								}
							},
					});
			    });
				
			    //控制提交按钮效果
				$("body").delegate("input[name=verify]","keyup",function(){
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
				$("body").delegate("#getVerifyCode","click",function(){	 
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
									open_id       :openId,
									app_id		:appId
								},
								type:"get",
								dataType:"json",
								success: function(data){
									if(200 == data.status){
									}else{
										alert(data.errorMessage);
									}
								}
						});
						 //倒计时
					    _this.attr("data-falg","1");
					    time(_this);
					 }
				 });
				 
				//提交绑定
			     $("body").delegate("#submit_btn","click",function(){	 	 
					 var user_name    = $("input[name=username]").val();
					 var mobile_phone = $("input[name=phone]").val();
					 var verifyNum    = $("input[name=verify]").val();
				
					 if(mobile_phone && user_name && verifyNum && shopId){
						$.ajax({
							url:request.shop.bindUser,
							type:"post",
							data:{
								  shop_id       : shopId,
								  user_name    : user_name,
								  open_id      : openId,
								  app_id		:appId,
								  mobile_phone : mobile_phone,
								  sms_code     : verifyNum
							},
							dataType:"json",
							success: function(data){
								//用户已经绑定成功
								if( 200 == data.status){
									
									laytpl($("#submitSuccessTmpl").html()).render({webRoot:GLOBAL.webRoot}, function(render){
										$("body").find("div").remove();
									    $("body").append(render);
									    $("body").addClass("bgbai");
									});
							    //个人信息提交成功
								}else if(29 == data.status ){
									laytpl($("#submitSuccessTmpl").html()).render({webRoot:GLOBAL.webRoot}, function(render){
										$("body").find("div").remove();
									    $("body").append(render);
									    $("body").addClass("bgbai");
									});
									
							    //输入验证码不正确
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
					//	console.log("请填写完整信息！");
					}
				});
			}
	};
	
	var time = function (o) {
        if (wait == 0) {
        	o.attr("data-falg","0");
            o.text("重新获取");
            o.css("background-color","#fe5ebe");
            wait =120;
        } else {
            //o.attr("value",wait + "秒");
            o.text(wait + "秒");
            o.css("background-color","#BBBBBB");
            wait--;
            setTimeout(function() {
                time(o);
            },
            1000);
        }
    };
    
	window.time=time;
	userApp.init();
	
	
});