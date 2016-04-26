//评价成功后页面


$(function(){
	
	//获取全局变量
	var globalVar=store.get("globalVar");
	var userId= globalVar.userId;
	var appId=globalVar.appId;
	var openId =globalVar.openId;
	var accessToken = globalVar.accessToken;
	
	//是否从消息来 1：是  0 ：否
	var message= getUrlParam("message") || 0;
	
	
 	//url参数
	var commentId =getUrlParam("commentId");
	var orderId =getUrlParam("orderId");
	var shopId = getUrlParam("shopId");
	
	//分享 评价 获得的美丽币
	var sharedGetCoin = getUrlParam("sharedGetCoin");
	var commentGetCoin = getUrlParam("commentGetCoin");
	
	var commentSuccess={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle("评价成功");
				$("#commentGetCoin").text(commentGetCoin);
				$("#sharedGetCoin").text(sharedGetCoin);
				
				if(sharedGetCoin==0 || commentGetCoin== 0){
					$(".a2").hide();
					$("#wxpjwcfx_but").text("立即分享");
				}
				
				this.closeShare();
				//返回订单列表
				// window.onbeforeunload= this.backOrderlis;
				 
			},backOrderlis:function(){
				location.href = GLOBAL.webRoot +"/agent/manager-user-catalog-wx_user_order_list?userId="+userId+
	    		"&appId="+appId+
	    		"&openId="+ openId +
	    		"&accessToken="+accessToken;
				 // history.go(-2);
			},closeShare:function(){
				//关闭分享
				globalUtil.globalShareFun();
				this.guideToShare();
			},shareToGetCoin : function(){
				$.ajax({
					url :request.user.getCustomId,
					data :{
						open_id :openId,
						shop_id :shopId,
						app_id :appId
					},
					type : "get",
					dataType :"json",
					success :function(data){
						if(data.status == 200){
							 if(data.content && data.content ){
								 var decodeContent =globalUtil.b64ToUtf8(data.content,"utf8");
								 var jsonContent   = JSON.parse(decodeContent);
								 var customId = jsonContent.custom_id;
									$.ajax({
							    		
							    		url :request.comment.shareGetScore,
							    		data :{
							    			custom_id : customId,
							    			shop_id    : shopId,
							    			order_id   : orderId,
							    			app_id:     appId,
							    			open_id:openId
							    		},
							    		type:"get",
							    		dataType: "json",
							    		async:false,
							    		success : function(data){
							    			if(data.status == 200 ){
							    				window.location.href =GLOBAL.webRoot+"/agent/manager-user-catalog-wx_user_order_list?userId="+userId+"&openId="+openId +"&appId="+ appId+"&accessToken="+accessToken;
							    			}
							    		},
							    		error :function(data){
							    			
							    		}
							    		
							    	});
								 
							 }
							
						}else{
							
						};
					}
					
				});
			},guideToShare:function(){
				
				var _this = this;
				//点击分享提示按钮
				$("#wxpjwcfx_but").click(function(){
				
					  //获取评价等级
			    	$.ajax({
			    		
			    		url :request.comment.getcommentInfo,
			    		data :{
			    			comment_id :	commentId,
			    			   shop_id :	shopId,
			    			   app_id  :	appId,
			    			   open_id : 	openId
			    		},
			    		type:"get",
			    		dataType: "json",
			    		async:false,
			    		success : function(data){
			    			if(data.status == 200 && data.content ){
			    				var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
			    				var commentContent = JSON.parse(decodeData);
			    				 
			    				  
			    				  layer.open({
									    type: 1,
									    shadeClose: false, 
									    content: '<div class="weixinright"><img src="'+GLOBAL.contextPath+'/resources/images/meirong/shop/pingjiashoer_r2_c2.png"></div>',
									    style: 'width:100%;background-color:rgba(0,0,0,0.8);border:none;border:0;margin-left: 0px; height:1137px;padding-left:0px;padding-top:127px' 
								  });
			    				 
			    				  var titleSend;
			    				  if(commentContent){
			    		    	    	switch(commentContent.comment_score){
			    		    	    	case 1:
			    		    	    		titleSend ="我刚刚给"+ commentContent.shop_name +"店铺打了差评，差评预警，建议大家不要去~";
			    		    	    	  break;
			    		    	    	case 2:
			    		    	    		titleSend ="我刚刚给"+ commentContent.shop_name +"店铺打了差评，感觉略差，可参考我的吐槽~";
			    		    	    	  break;
			    		    	    	case 3:
			    		    	    		titleSend ="我刚刚给"+ commentContent.shop_name +"店铺打了中评，感觉一般，有兴趣可以去体验一下~";
			    		    	    		break;
			    		    	    	case 4:
			    		    	    		titleSend ="我刚刚给"+ commentContent.shop_name +"店铺打了好评，整体满意，推荐大家去感受下~";
			    		    	    		break;
			    		    	    	case 5:
			    		    	    		titleSend ="我刚刚给"+ commentContent.shop_name +"店铺打了好评，强烈推荐，下次还选这家~";
			    		    	    		break;
			    		    	    	default:
			    		    	    	    
			    		    	        };
			    		    	   }
			    				
			    				  
			    				 //分享
			    				  
			    				var url =GLOBAL.contextPath+'/agent/manager-share-wx_order_comment_share';
			  					var argOpt={commentId:commentId,shopId:shopId,appId:appId,openId:openId,userId:userId};
			    				var urlSend =globalUtil.packParam(url,argOpt);
			    				
			    				var imgUrlSend =GLOBAL.contextPath+"/resources/images/img/defaults/iconShared100x100.png";
			    				
								var opt ={urlSend:urlSend,titleSend:titleSend,imgUrlSend:imgUrlSend};
								
								var fun = _this.shareToGetCoin;
								// _this.shareToGetCoin();
								
								var cancelShare = _this.cancelShare;
								 globalUtil.globalShareFun(opt,function(){
									 fun();
								 },function(){
									 cancelShare();
								 })
			    			}
			    		},
			    		error :function(data){
			    			alert("获取数据错误！");
			    		}
			    		
			    	});
					
					 
					 
						
				});
				
			},cancelShare:function(){
				history.go(-2);
			}
	};
	commentSuccess.init();
	
});