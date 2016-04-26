/**
 * 店铺已评价订列表
 */
$(function(){
	
	
	var  appId = getUrlParam("appId");
	var  userId = getUrlParam("userId");
	var  openId = getUrlParam("openId");
	var  accessToken = getUrlParam("accessToken");
	var  shopId      =getUrlParam("shopId");
	
	//分页参数
 	var pageTimes;
 	var page =1;
 	
	var  commentOrderLis ={
			init:function(){
				FastClick.attach(document.body);
				this.getOrderLisData();
				this._endFun();
				//关闭分享
				globalUtil.globalShareFun();
			         
			},
			getOrderLisData:function(){
				var _this =this;
				$.ajax({
					url      : request.shop.getShopOrderComment,
					type     : "get",
					data:{
						shop_id:shopId,
						user_id:userId,
						open_id:openId,
						app_id :appId,
						rows:5,
						page :page
						
					},
					dataType : "JSON",
					success  : function(data){
						if(data.status == 200 && data.content){
							var deCodeContent =  globalUtil.b64ToUtf8(data.content, "utf8");
							var content = JSON.parse(deCodeContent);
							//分页 总页数
							pageTimes = Math.ceil(data.totalCount/6)-1;
							
							console.log("content",content);
							var commentItemLen = content.length;
							laytpl($("#shopOrderCommentTemp").html()).render({
								commentItemLen:commentItemLen,
								content       : content,
								pageTimes:pageTimes,
								webRoot:GLOBAL.webRoot
								},function(html){
									$("body").append(html);
									if(content.length<5){
										 $("#accessPageBtn").remove();
									}
									
							      //点击 更多评价
 		    					   $("body").delegate("#accessPageBtn","click",function(){
 		    						  _this.getMoreCommentItem();
 		    							pageTimes--;
 		    						    console.log('pageTimes：',pageTimes);
 		    						});
								
								});
							
						}else{
							laytpl($("#hasNoCommTemp").html()).render({
								
								},function(html){
									$("body").append(html);
									
								});
							
						}
					}
				});
			},
			getMoreCommentItem:function(){
				page += 1 ;
				$.ajax({
					url: request.shop.getShopOrderComment,
					type:"get",
					data:{
							shop_id:shopId,
							user_id:userId,
							open_id:openId,
							app_id :appId,
							rows:5,
							page :page
						},
					dataType:"json",
					success: function(data){
						if(200 == data.status){
							var deCodeContent =  globalUtil.b64ToUtf8(data.content, "utf8");
							var content = JSON.parse(deCodeContent);
							//分页 总页数
							//pageTimes = Math.ceil(data.totalCount/5)-1;
							
							console.log("content",content);
							var commentItemLen = content.length;
							laytpl($("#getMoreOrderCommentTemp").html()).render({
								commentItemLen:commentItemLen,
								content       : content,
								pageTimes:pageTimes,
								webRoot:GLOBAL.webRoot
								},function(html){
									
									 $(".shop_rated_cent_list").append(html);
									 if(pageTimes<=0){
										 $("#accessPageBtn").remove();
									 }
								
								});
						
						}else{
							customCardAccessNum=0;
						}
					},error:function(e){
						
					}	
						
				});
			},
			_endFun:function(){
				 //关闭分享
 				globalUtil.globalShareFun('');
			}
	};
	
	commentOrderLis.init();
});