/**
 * 用户 意见反馈
 */

$(function(){
	
	 var globalVar=store.get("globalVar");
		 userId= globalVar.userId;
		 appId=globalVar.appId;
		 openId =globalVar.openId;
		 accessToken = globalVar.accessToken;
	
	var localHref=window.location.href.toString(),
	    locals=localHref.split("#"),
	    currentUrl=locals[0];
	var localImgID = '';
	var submitFlag =0;
	
	var suggestFeedBackApp ={
		
			init:function(){
				FastClick.attach(document.body);
 				globalUtil.changeTitle('意见反馈');
 				//关闭分享
 				globalUtil.globalShareFun('');
 				//输入提示
 				this.writeSuggestInfo();
 				this.handleImg();
 				
				
			},
			writeSuggestInfo:function(){
				
				var submitBtn =$("#suggestSubmit");
			    
			    //textarea 字符统计
				$("#idealText").keyup(function(){
					
					this.value = this.value.substring(0, 200);
					var txtLen = this.value.length;
					if(txtLen>=190){
						$(".feedback_write_s1").html("还可输入<span class='txtpink'>"+(200-txtLen)+"</span>个字");
					}else{
						$(".feedback_write_s1").html("当前已输入<span class='txtpink'>"+txtLen+"</span>个字");
					};
					//控制提交按钮背景色
					if(this.value.length>0){
						submitFlag=1;
						submitBtn.css({"background-color":"#FF5DBD"});
					}else{
						submitFlag =0;
						submitBtn.css({"background-color":"#c1c1c1"});
					}
					
				});
			},
			handleImg:function(){
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
										    //alert("返回选定照片的本地ID列表chooseImage:"+localImgID);
										         
										     	wx.uploadImage({
												    localId: localImgID.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
												    isShowProgressTips: 1, // 默认为1，显示进度提示
												    success: function (res) {
												        serverId = res.serverId; // 返回图片的服务器端ID
												       //alert("返回图片的服务器端serverId:"+serverId);
												        
												        
												         
												     	wx.downloadImage({
														    serverId: serverId.toString(), // 需要下载的图片的服务器端ID，由uploadImage接口获得
														    isShowProgressTips: 1, // 默认为1，显示进度提示
														    success: function (res) {
														        localId = res.localId; // 返回图片下载后的本地ID
														       //alert("返回图片下载后的本地ID,downloadImage:"+localId);
														        
														      //  alert("图片张数"+$(".poi1").length);
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
														        			var imgItem = $("<li class='poi1' ><div style='display:inline-block;' id="+ localImgId+ 
																				          "><img src=' "+data.data.small_url +" ' width='97' height='99' ></div>"+
																				          "<a class='poi2' herf='javascript: ; >"+"<img src= ' " + GLOBAL.webRoot+ 
																				          "/resources/images/meirong/shop/crooss_r2_c2.png" + 
																				          " ' width='44' height='44' class='up_cross'  style='z-index:1' >"+"</a></li>");
														        			
														        			if($("#upImgBtn").length>0){
														    					imgItem.insertBefore($("#upImgBtn"));
														    				}else{
														    					imgItem.insertAfter($(".poi1").last());
														    				}
														        			
														        			
														        			$("#"+localImgId).next("a").attr({"onclick":'delUpImgs(this);',"data-img-id":localImgId});
														        			imgIDs.push(localImgId);
														        			
														   				//  alert("imgsId数组："+imgIDs);
														   				    
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
			    //	alert("上传开始");
			    	getWXImg();
			    });
			    //删除图片id
			    function delUpImgs(obj){ 
					$(obj).parents("li").remove();
					var objImgId = $(obj).attr("data-img-id");
					var imLen    = imgIDs.length;
					//alert("删除的图片Id"+objImgId);
				//	alert("删除的后的图片数组"+JSON.stringify(imgIDs));
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
				window.delUpImgs=delUpImgs;
				
				
				
				

				//提交
				
				$("#suggestSubmit").click(function(){
					//如果点亮按钮 
					if(imgIDs.length==0){
						imgIDs="";
					}else{
						imgIDs = imgIDs.join(",");
					}
					
					//alert("上传图片id数组:"+imgIDs);
					if( submitFlag ==1  ){
						var content = $("#idealText").val();
						$.ajax({
							url:request.user.feekbackSuggest,
							timeout:5000,
							data:{
								comment  		 :  content,
								open_id          : openId,
								app_id           : appId,
								file_ids          :  imgIDs
							},
							type:"post",
							dataType: "json",
							success :function(data){
								if(data.status === 200 ){
								 
								    
								    //提示
									layer.open({
									    content:"感谢你的意见",
									    style:"font-size:24px;"
									  
									});
									//跳转
									setTimeout(function(){
										location.href = GLOBAL.webRoot+"/agent/manager-user-mumber-wx_user_mumber_center?userId="+userId 
										+"&appId="+appId 
										+"&openId="+openId
										+"&accessToken="+ accessToken;
									},2000);
								
									
								    
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
	};
	suggestFeedBackApp.init();
});