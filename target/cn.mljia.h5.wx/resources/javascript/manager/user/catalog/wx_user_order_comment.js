//订单评价

$(function(){
	var message = getUrlParam("message") || 0 ;//1表示从消息过来 0 表示不是 
	var userId;
	var appId;
	var openId ;
	var accessToken;
	
	var shopId = getUrlParam("shopId");
	var shopSid = getUrlParam("shopSid");
	var orderId =getUrlParam("orderId");

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
	
	
    //String	评论内容（必填）,必须初始化为空字符串。否则传到后台为: "null";
	var evaluate_content=[],                       //评价细则 数组
	    evaluate_contentEncode =[];              // base64加密后的评价	
	 

	var  localHref=window.location.href.toString(),
	     locals=localHref.split("#"),
	     currentUrl=locals[0];
	var  localImgID = '';
    //调用接口，把调用微信接口获得的图片传给后端，后端返回图片Id
	
	var  orderComment ={
			//首先判断是否评论过，如果没有评论过，展示输入评论信息的页面，否则回退到订单列表，为了解决评价过的订单 分享之后， 返回后， 到了评价页面
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				globalUtil.changeTitle("评价");
				//如果是护理修改公共参数
				if(message==1){
					store.remove("globalVar");
					var globalVar={};
					globalVar.userId=getUrlParam("userId");
					globalVar.appId=getUrlParam("appId");
					globalVar.openId=getUrlParam("openId");
					globalVar.accessToken=this.getAccessToken();
					store.set("globalVar",globalVar);
				}
				
				var bool=this.getPreConditionFun(orderId,shopId);
				if(bool){
					//没有评论过
					// 获取评价细则项目
					this.getCommentDataFun();
				}else{
					//评论过
					if(message==1){
						 location.href =GLOBAL.webRoot + "/agent/manager-user-catalog-wx_user_order_commented_detail?orderId="+orderId 
			               + "&shopId="+shopId +"&shopSid="+shopSid+"&appId="+appId+"&userId="+userId+"&openId="+openId+"&accessToken="+accessToken+"&massage=1";
					}else{
					    //查到订单已近被评论过，返回点单列表，
						var url =GLOBAL.contextPath+'/agent/manager-user-catalog-wx_user_order_list';
						var opt={userId:userId,appId:appId,openId:openId,accessToken:accessToken};
						var packOrderLisUrl = globalUtil.packParam(url,opt);
					    window.location.href=packOrderLisUrl;
					}
				
				}
				
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
			},getPreConditionFun:function(orderId,shopId){
				var bool=true;
				$.ajax({
					url:request.user.simpleOrderInfo,
					data:{order_id:orderId,shop_id:shopSid,app_id:appId,open_id:openId},
					type:'get',
					dataType:'json',
					async:false,
					success:function(data){
						if(data.status == 200 && data.content){
							var deCodeContent =  globalUtil.b64ToUtf8(data.content, "utf8");
							var content = JSON.parse(deCodeContent);
							if(content.order_status==1 && content.comment_status==1){
								bool= false;
							}
						}
					}
				});
				return bool;
			},getCommentDataFun:function(){
				// 获取评价细则项目
				$.ajax({
					url      : request.comment.getCommentItem,
					type     : "get",
					data:{
						app_id:appId,
						open_id:openId
					},
					dataType : "JSON",
					success  : function(data){
						if(data.status == 200){
							var deCodeContent =  globalUtil.b64ToUtf8(data.content, "utf8");
							var content = JSON.parse(deCodeContent);
							var commentItemLen = content.length;
							laytpl($("#commentItemInfo").html()).render({
								commentItemLen:commentItemLen,
								content       : content
								},function(html){
									$("#commentItemTemp").empty();
									$("#commentItemTemp").html(html);
									//执行后续操作
									ImplementDefaultFun();
								});
							
						}
					}
				});
			}
	};
	
	orderComment.init();
	
	function ImplementDefaultFun(){
		
		//总体评价         值为 0 1 2 3 4
		var commentDOMList =$("#pj_tatle").find("i");
	    $.each(commentDOMList,function(item, dom){
	    	
	    	$(this).click(function(){
	    		//去掉全部DOM "高亮"
	    		
	        	commentDOMList.each(function(){
	        		$(this).removeClass("icon-pjface01a ");
	        		$(this).removeClass("icon-pjface02a ");
	        		$(this).removeClass("icon-pjface03a ");
	        		$(this).removeClass("icon-pjface04a ");
	        		$(this).removeClass("icon-pjface05a ");
	        	
	        	});
	        	 //给点击的DOM添加 “高亮”
	        	if(item == 0){
	        		 $(this).toggleClass("icon-pjface01a");
	        	}
	        	else if(item == 1){
	        		 $(this).toggleClass("icon-pjface02a");
	        	}
	        	else if(item == 2){
	        		 $(this).toggleClass("icon-pjface03a");
	        	}
	        	else if(item == 3){
	        		$(this).toggleClass("icon-pjface04a");
	        	}
	        	else {
	        		$(this).toggleClass("icon-pjface05a");
	        	}
	    	   
	    	    totalScore =5 - item;
	    	     //如果点评，提交按钮点亮
	    	    $("#commentSubmit").addClass("pingjia_qdbuta");
	    	    console.log("totalScore:"+totalScore);
	    	    
	    	});
	    });
	    /*
	     * 评价项目点击效果&获取评价score，获取数据后放入对象中
	     * 定时器，控制当所有评价项目都被渲染到DOM中后，绑定事件
	     */
		var tim = setInterval(function(){
			if( $(".pingjia_stars_main").length >4   ){
				clearInterval(tim);
				
				
				$(".pingjia_stars_main").each(function(){
					
					var dataParId  = $(this).attr("data-par-id");
					var dataScore = $(this).attr("data-score");
					var commList  = $(this).find("i");
					var commListLen = commList.length;
					var sec,listEnd;
					//初始化评价id 和  score
					evaluate_content.push( {"par_id":dataParId,"score":dataScore} );
					evaluate_contentEncode =  globalUtil.utf8ToB64(JSON.stringify(evaluate_content),"utf-8");
					$.each( commList , function(item ,dom ){
						
						$(this).click(function(){
							sec = $(this).parents("p").find("i").slice(0,item+1);
							listEnd = $(this).parents("p").find("i").slice(item+1,commListLen);
							listEnd.each(function(){
				        		$(this).removeClass("icon-starbig02 ");
				        	});
							sec.each(function(){
				        		$(this).addClass("icon-starbig02 ");
				        	});
							dataScore =item+1;
							
							//打包评价细则
							for(var i= 0 ; i<evaluate_content.length;i++){
								if(evaluate_content[i].par_id ==  dataParId){
									evaluate_content.splice(i, 1);
									break;
								}
							}
							evaluate_content.push( {"par_id":dataParId,"score":dataScore} );
						
							evaluate_contentEncode = globalUtil.utf8ToB64(JSON.stringify(evaluate_content),"utf-8");
							
						});
						
					});
				});
			}
			
		},300);
		
		
	 
	    
	  //textarea 字符统计
		$("#idealText").keyup(function(){
			
			this.value = this.value.substring(0, 200);
			var txtLen = this.value.length;
			if(txtLen>=190){
				$(".pingjia_tctxt").html("还可输入<span class='txtpink'>"+(200-txtLen)+"</span>个字");
			}else{
				$(".pingjia_tctxt").html("当前已输入<span class='txtpink'>"+txtLen+"</span>个字");
			};
			
		});
		
		
		/*  *******************************上传照片*********************************************************  */
		
		var serverId ;
		var localId ;
		var  imgIDs=[];
	    var getWXImg = function(){
	    	$.ajax({
				 url:GLOBAL.webRoot+"/getJsTicket",
				 type:"get",
				 dataType:"json",
				 data:{
					 appId:appId,
					 open_id          : openId,
					 currentUrl:currentUrl,
					 user_id:userId
				 },
				 success:function(data){
					 if(data.status === 200){
						 if(!data.content){
							 data.content ={};
						 }
						 
						 var oData = data.data;
						 console.log(oData.url);
						 wx.config({
							 
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId: appId, // 必填，公众号的唯一标识
							    timestamp: oData.timestamp, // 必填，生成签名的时间戳
							    nonceStr: oData.nonceStr, // 必填，生成签名的随机串
							    signature: oData.signature,// 必填，签名，见附录1
							    jsApiList: ['chooseImage','uploadImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						 });
						 
						 //通过配置-》调用	chooseImage
						 wx.ready(function(){
							 wx.chooseImage({
								    count: 1, // 默认9
								    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
								    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
								    success: function (res) {
								    	
								        localImgID = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
								      //  alert("返回选定照片的本地ID列表chooseImage:"+localImgID);
								         
								     	wx.uploadImage({
										    localId: localImgID.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
										    isShowProgressTips: 1, // 默认为1，显示进度提示
										    success: function (res) {
										        serverId = res.serverId; // 返回图片的服务器端ID
										     //   alert("返回图片的服务器端serverId:"+serverId);
										        
										        
										         
										     	wx.downloadImage({
												    serverId: serverId.toString(), // 需要下载的图片的服务器端ID，由uploadImage接口获得
												    isShowProgressTips: 1, // 默认为1，显示进度提示
												    success: function (res) {
												        localId = res.localId; // 返回图片下载后的本地ID
												     //   alert("返回图片下载后的本地ID,downloadImage:"+localId);
												        
												    //    alert("图片张数"+$(".poi1").length);
									        			if($(".poi1").length >= 8 ){
									        				rmUpImgBtn = $("#upImgBtn").detach();
									        			}
												        
												        $.ajax({
												        	url: tools.comment.upLoadImg,
												        	data: {
												        		user_id  : userId,
												        		media_id : serverId,
												        		open_id          : openId,
																app_id           : appId
												        	},
												        	type: "get",
												        	dataType :"json",
												        	success :function(data){
												        		if(data.status == 200){
												        		
												        			var localImgId =data.data.id;
												        		//	alert("保存到mljia服务器的localImgId："+localImgId);
												        			var imgItem = $("<li class='poi1'><div style='display:inline-block' id="+ localImgId+ 
																		          "><img src=' "+data.data.small_url +" ' width='97' height='99' ></div>"+
																		          "<a class='poi2' herf='javascript: ;' >"+"<img src= ' " + GLOBAL.webRoot+ 
																		          "/resources/images/meirong/shop/crooss_r2_c2.png" + 
																		          " ' width='44' height='44' class='up_cross' >"+"</a></li>");
												        			
												        			if($("#upImgBtn").length>0){
												    					imgItem.insertBefore($("#upImgBtn"));
												    				}else{
												    					imgItem.insertAfter($(".poi1").last());
												    				}
												        			
												        			
												        			$("#"+localImgId).next("a").attr({"onclick":'delUpImg(this);',"data-img-id":localImgId});
												        			imgIDs.push(localImgId);
												        			
												   				 //   alert("imgsId数组："+imgIDs);
												   				    
												        		}else{
												        			 alert("获取数据失败！");
												        		}
												        	},
												        	error : function(data){
												        		alert("上传失败"+JSON.stringify(data));
												        	}
												        });
												        
												    }
												});
										    }
									});
								         
								 }
							});
						 });
					 }else{
						 console.log("错误信息：",data);
					 }
				 }
				
		   });
	    };
		
	    
	    //点击按钮调微信上传图片
	    $('#upImgBtn').click(function(){
	    	//alert("上传开始");
	    	getWXImg();
	    });
	    //删除图片id
	    function delUpImg(obj){ 
			$(obj).parents("li").remove();
			var objImgId = $(obj).attr("data-img-id");
			var imLen    = imgIDs.length;
			//alert("删除的图片Id"+objImgId);
			//alert("删除的后的图片数组"+JSON.stringify(imgIDs));
			for(var i =0 ;i<imLen ;i++){
				if( imgIDs[i]==objImgId ){
					imgIDs.splice(i,1);
					
				}
			}
			//alert("删除图片imLen："+imLen);
			if(imLen <= 9){
				if(rmUpImgBtn){
					rmUpImgBtn.insertAfter($(".poi1").last());
				}
			}
		}
		window.delUpImg=delUpImg;
		
		
		/*  *******************************上传照片 end*********************************************************  */
		
		
		//提交
		
		$("#commentSubmit").click(function(){
		
			if(imgIDs<=0){
				imgIDs="";
			}else{
				imgIDs = JSON.stringify(imgIDs);
			}
			
		//	alert("上传图片id数组:"+imgIDs);
			//如果点亮按钮 
			if( totalScore != 0  ){
				var content = $("#idealText").val();
				$.ajax({
					url:request.comment.consumeComment,
					timeout:5000,
					data:{
						num      		 :  totalScore,
						order_id 		 :  orderId ,
						content  		 :  content || "",
						open_id          : openId,
						app_id           : appId,
						evaluate_content :  evaluate_contentEncode,
						img_ids          :  imgIDs,
						flag             :  1,
						theme_id         :  0
						
					},
					type:"post",
					dataType: "json",
					success :function(data){
						if(data.status === 200 && data.content){
							var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
							var oComment = JSON.parse(decodeData);
							if(oComment){
								var commentId = oComment.comment_id;
								if(message==1){
									location.href = GLOBAL.webRoot+"/agent/manager-user-catalog-wx_user_order_comment_success?&orderId="+orderId +"&sharedGetCoin="+oComment.share_reward_coin +"&commentGetCoin="+oComment.comment_reward_coin + "&commentId="+ commentId+"&shopId="+shopId+"&message=1";
								}else{
									location.href = GLOBAL.webRoot+"/agent/manager-user-catalog-wx_user_order_comment_success?&orderId="+orderId +"&sharedGetCoin="+oComment.share_reward_coin +"&commentGetCoin="+oComment.comment_reward_coin + "&commentId="+ commentId+"&shopId="+shopId;
								}
								
							}
						    
						}else{
							alert(data.errorMessage);
						}
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				});
			}else{
				console.log("按钮没有点亮");
			}

			
		});
		
		
	}
	
	
	
	
	
});