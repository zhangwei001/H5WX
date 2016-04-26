$(document).ready(function(){
	//获取全局变量
	var shopId = getUrlParam("shopId");
	var orderId = getUrlParam("orderId");
	var shopSid = getUrlParam("shopSid");
	var message  = getUrlParam("massage") || 0;
	
	var userId;
	var appId;
	var openId ;
	var accessToken;
	
	
	//fastClick 
	FastClick.attach(document.body);
	//如果从cylider消息过来，公共参数重新赋值
	if(message==1){
		
		var globalVar={};
		 appId = getUrlParam("appId");
		 userId = getUrlParam("userId");
		 openId = getUrlParam("openId");
		 accessToken = getUrlParam("accessToken");
		
		globalVar.appId=appId,
		globalVar.userId=userId,
		globalVar.openId=openId,
		globalVar.accessToken=accessToken;
		
		
		store.remove("globalVar");
		store.set("globalVar",globalVar);
	}else{
		var globalVar=store.get("globalVar");
		 userId= globalVar.userId;
		 appId=globalVar.appId;
		 openId =globalVar.openId;
		 accessToken = globalVar.accessToken;
	}
	
	var tim ;
	globalUtil.changeTitle('评价详情');
	//获取评价细则
	
	var commentDetailApp={
			init:function(){
				if(message==1){
					store.remove("globalVar");
					var globalVar={};
					globalVar.userId=getUrlParam("userId");
					globalVar.appId=getUrlParam("appId");
					globalVar.openId=getUrlParam("openId");
					globalVar.accessToken=this.getAccessToken();
					store.remove("globalVar");
					store.set("globalVar",globalVar);
				}
				this.getOrderCommentInfo();
			},getAccessToken:function(){
				var massageAccessToken ;
				$.ajax({
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
			},getOrderCommentInfo:function(){
				$.ajax({
					
					url :request.comment.getOrderCommentInfo,
					data :{ order_id:orderId ,shop_id:shopId,app_id:appId,open_id:openId,user_id:userId},
					type:"get",
					dataType: "json",
					success : function(data){
						
						if(data.status === 200 ){
							if(data.content){
								var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
								var content = JSON.parse(decodeData);
								console.log("commentcontent",content);
								var evaluateList = content.evaluate_list;
								console.log("evaluateList",evaluateList);
							}
							
							
							//定时器控制图片样式
							tim =setInterval(function(){
								if( $("ul") ){
									clearInterval(tim);
									if(content.img_urls.length == 0){
										$("ul").css("display","none");
									}
								}
							},300);
							
							
							  laytpl($("#lookInCommentTemp").html()).render({
								evaluateList  : evaluateList,
								content       : content
								},function(html){
									$("#commentView").empty();
								  $("#commentView").html(html);
							 });
						}
					},
					error :function(data){
						alert("获取数据错误！");
					}
					
				});
			}
	};
	commentDetailApp.init();
	

	
	
});