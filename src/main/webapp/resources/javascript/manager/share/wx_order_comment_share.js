/*
 * 分享 分享出去的评价
 */

$(document).ready(function(){
	

	var commentId = getUrlParam("commentId");
	var shopId 	= getUrlParam("shopId");
	var appId   = getUrlParam("appId");
	var openId  = getUrlParam("openId");
	var userId  = getUrlParam("userId");
	
	var orderCommentSharedApp={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				this.getShopInfo();
				this.getWXUserInfo();
				this._endFun();
			},getWXUserInfo:function(){
				var _this =this;
				 //获取wx用户头像和
				   var wxUserInfo ;
					$.ajax({
						
						url :request.reserved.getWxUserInfo+"/"+openId,
						data:{
							shop_id:shopId,
							user_id :userId,
							open_id: openId,
							app_id : appId
							
						},
						type:"get",
						dataType: "json",
						success : function(data){
							
							if(data.status === 200 ){
								var decodeData =  globalUtil.b64ToUtf8(data.content);
								 wxUserInfo = JSON.parse(decodeData);
								console.log("用户图像名字信息",wxUserInfo);
								_this.getCommentItem(wxUserInfo);
							}
						},
						error :function(data){
							console.log("用户图像名字信息失败",wxUserInfo);
						}
						
					});
				
			},getQR:function(userId){
	 			$.ajax({
		        	 url:request.user.getQR,
		        	 data:{
		        		user_id:userId
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 async:false,
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj =  globalUtil.b64ToUtf8(data.content);
		 					 var content = JSON.parse(decodeObj);
		 					layer.open({
		 						type: 1,
							    content:"<div class='openShopBcode' style=''>"+
							    "<p class='ShopBcodeimg'><img src='"+content.qr_file_url+
							    "'width='83' height='82'></p>"+
							    "<a class='ShopBcodebut'>长按识别二维码并关注，立即购买</a></div>"
							   
							});
		 				 }
		 			 }
		      });
			},getShopInfo:function(){
				//店铺详情
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
	 				$.ajax({
			        	 url:request.shop.shopInfo,
			        	 data:{
			        		 shop_id   :  shopId,
			        		 open_id: openId,
							 app_id : appId,
			        		 longitude :  longitude,
			        		 latitude  :  latitude
			        	 },
			        	 type:"get",
			 			 dataType:"json",
			 			 async:false,
			 			 success:function(data){
			 				 if(data.status == 200 && data.content){
			 					 var decodeObj =  globalUtil.b64ToUtf8(data.content);
				 				 var shopInfoData =  JSON.parse(decodeObj);
			 					 
				 					 store.remove("sharedShopInfoData");
				 					 store.set("sharedShopInfoData",shopInfoData);
			 				 }
			 			 }
			      });
	 			});
			},getCommentItem:function(wxUserInfo){
				var _this =this;
				//评价细则
				$.ajax({
					url :request.comment.getcommentInfo,
					data :{comment_id :commentId ,shop_id:shopId,app_id:appId,user_id:userId,open_id:openId},
					type:"get",
					dataType: "json",
					success : function(data){
						
						if(data.status === 200 ){
							var decodeData = globalUtil.b64ToUtf8(data.content);
							var content = JSON.parse(decodeData);
							console.log("评价细则",content);
							var evaluateList = content.evaluate_list;
							console.log("evaluateList",evaluateList);
							
							laytpl($("#commentsItem").html()).render({
								evaluateList  : evaluateList,
								content       : content,
								wxUserInfo :wxUserInfo || {}
							
								},function(html){ 
									$("body").find(".loader").remove();
								  $("#sharedCommentItemTemp").html(html);
									//关注二维码
			    				  $(".share_wxtopBut").click(function(){
			    					 
			    					  _this.getQR(userId)
			    					  
			    				  });
							    });
						}
					},
					error :function(data){
						alert("获取数据错误！");
					}
					
				});
				
				
			},_endFun:function(){
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
		    				var decodeData =  globalUtil.b64ToUtf8(data.content);
		    				var commentContent = JSON.parse(decodeData);
		    				 
		    			
		    				/*  layer.open({
								    type: 1,
								    shadeClose: false, 
								    content: '<div class="weixinright"><img src="'+GLOBAL.contextPath+'/resources/images/meirong/shop/pingjiashoer_r2_c2.png"></div>',
								    style: 'width:100%;background-color:rgba(0,0,0,0.8);border:none;border:0;margin-left: 0px; height:1137px;padding-left:0px;padding-top:127px' 
							  });*/
		    				 
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
							 globalUtil.globalShareFun(opt)
		    			}
		    		},
		    		error :function(data){
		    			alert("获取数据错误！");
		    		}
		    		
		    	});
			}
	};
	orderCommentSharedApp.init();
	
    
	
});




