$(function(){
	//商家促销脚本
	
	var openId= $("body").attr("data-open-id"),
	    userId = $("body").attr("data-user-id"),
	    appId  = $("body").attr("data-app-id"),
	    shopId = getUrlParam("shopId"),
        accessToken =getUrlParam("accessToken");
	
	
 	//设置全局变量
 	var globalVar={};
 		globalVar.userId=userId;
 		globalVar.appId=appId;
 		globalVar.openId=openId;
 		globalVar.accessToken =accessToken;
 		
 		store.remove("globalVar");	
 		store.set("globalVar",globalVar);
	
 	var event={
 		init: function(){
 			globalUtil.changeTitle("优惠促销");
 			//fastClick 
			FastClick.attach(document.body);
 			if(shopId){
 				this.getEventListData(shopId);
 				this.getShopInfoFun(shopId);
 			}else{
 				//跳转选择店铺页面
 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
 			}
 			
 		},getEventListData: function(shopId){
 			
 			var _this=this;
 			$.ajax({
 				url:request.event.getPromotions,
 				data:{
 					activity_state:2,
 					shop_id :shopId,
 					app_id:appId,
 					open_id :openId,
 					user_id :userId,
 					rows:50,
 					page :1
 				},
 				type:"get",
 				dataType: "json",
 				success :function(data){
 					_this.getEventListDataRender(data,GLOBAL.contextPath);
 				},
 				error :function(){
 					alert("网络开了小差，重新试试吧~");
 				}
 			 });
 		},getEventListDataRender: function(data,webRoot){
 			var _this=this;
 			
				if(data.status == 200 && data.content && data.content !='[]'){
					
					var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8"),
						promotionsList=JSON.parse(decodeData);
				//	  console.log("promotionsList",promotionsList);
					 laytpl( $("#promotionTemp").html() ).render({
							content: promotionsList,
						    globalVar: globalVar,
						    webRoot : webRoot,
							shopId: shopId
						}, function(html){
						  $("#promotionView").empty();
						  $("#promotionView").append(html);
						  
						  Slider.init({dom:$('.pro-list'),width:230});
						  
						  $(".pro-item").click(function(){
							  
							  var activityId=$(this).data("activityId");
				        	  var itemId = $(this).attr("data-item-id");
				        	  var itemType =$(this).attr("data-item-type");
				        	  var cardType =$(this).attr("data-card-type");
				        	  
				        	
				        	  
				        	  if(itemType==0){
				        		  itemType="card";
				        		  window.location.href = webRoot + "agent/manager-shop-card-wx_card_sale_info?itemType="+itemType +"&itemId="+itemId+"&cardType="+cardType+"&shopId="+shopId+"&from=event&activityId="+activityId+"&qrCode=false";
				        	  }else if(itemType==1){
				        		  itemType="massage";
				        		  window.location.href = webRoot + "agent/manager-shop-massage-wx_massage_sale_info?itemType="+itemType +"&itemId="+itemId+"&shopId="+shopId+"&from=event&activityId="+activityId+"&qrCode=false";
				        	  }else if(itemType==2){
				        		  itemType="product";
				        		  window.location.href = webRoot + "agent/manager-shop-product-wx_product_sale_info?itemType="+itemType +"&itemId="+itemId+"&shopId="+shopId+"&from=event&activityId="+activityId+"&qrCode=false";
				        	  };
				        	  
				          });
						  
						  setTimeout(function(){
							  
							  var shopInfoData=store.get("shopInfoData");
							  
							  //分享
							  globalUtil.globalShareFun({
								  titleSend: shopInfoData.shop_name+'店铺做促销啦~精彩不断，折扣连连！美的人已经点进来买了呢~',
								  imgUrlSend: promotionsList[0].img_url,
								  urlSend: GLOBAL.contextPath + "/agent/manager-share-wx_event_list_index_share?userId="+userId +"&appId="+appId+"&shopId="+shopId,
								  descption: '',
							  });
							  
						  },500);
						  
						  _this.endFun();
						  
					    });
				}else{
					
					laytpl( $("#noPromotionTemp").html() ).render(
							 {webRoot:webRoot}, function(html){
						  $("#promotionView").empty();
						  $("#promotionView").append(html);
						  $("body").addClass("bgbai");
						  $("#promotionView").removeClass("bghui").addClass("bgbai");
						  $("#checkAllServe").attr("href",webRoot + "/agent/manager-shop-item-wx_item_list?userId="+userId+"&shopId="+shopId+ "&appId="+appId+"&openId="+openId +"&accessToken="+accessToken);
						  
					    });
				};
				
 		},getShopInfoFun:function(shopId){
 			
 			//经纬度
 			var localHref=window.location.href.toString(),
			 	locals=localHref.split("#"),
			 	currentUrl=locals[0];
 			//获取经纬度
 			globalUtil.getEchoOrientation({
 				appId:appId,
 				currentUrl:currentUrl,
 				userId:userId
 			}, function(latitude,longitude){
 				//获取店铺信息
 			    $.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id :    openId,
		        		 longitude :  longitude,
		        		 latitude  :  latitude
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
		 					  		shopInfoData =  JSON.parse(decodeObj);
		 					store.remove("shopInfoData");
		 					store.set("shopInfoData",shopInfoData);
		 				 }
		 			 },error:function(){
		 				 
		 			 }
		      });
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
		},endFun:function(){
			var _this = this;
 			if(!appId || !accessToken){
 				//都为空表示是 分享出去的链接，不给点击事件
 				$("body a").each(function(){
 					//移除点击
 					$(this).removeAttr("href");
 				});
 				 $(".share_wxtopBut ").click(function(){
					  _this.getQR(userId);
				  });
 				
 			}
 		}
 		
 	};
 	
 	event.init('执行');
	
 	function Slider(opts){
 		this.wrap = opts.dom;
 		this.width=opts.width;
 		this.maxwidth=(opts.width*this.wrap.find("li").length)-640;
 		this.bindDOM();
 		this.startX=0;
 		this.startY=0;
 		this.offsetX=0;
 		this.offsetY=0;
 	}
 	Slider.init=function(opts){
 		var that=this;
 		$.each(opts.dom,function(index,item){
 			if($(this).find('li').length>2){
 				new that({dom:$(this),width:opts.width});
 			}
 		});
 	}
 	Slider.prototype.direction=function(){
 		var diffX = this.startX - this.offsetX,
        diffY = this.startY - this.offsetY,
        absX = Math.abs(diffX),
        absY = Math.abs(diffY),
        swipe;
 		var touch = {
            distance: 30,  //滑动距离，超过该距离触发swipe事件，单位像素。
            duration: 1000 //滑动时长，超过该时间不触发swipe，单位毫秒。
        };
	    if(absX >= absY){
	        if(absX >= touch.distance){
	            swipe = diffX > 0 ? 'left' : 'right';
	        }
	    }else{
	        if(absY >= touch.distance){
	            swipe = diffY > 0 ? 'up' : 'down';
	        }
	    }
	    return swipe;
 	}
	Slider.prototype.bindDOM = function(){
		var self = this;
		var lastdiff=0;
		
		//手指按下的处理事件
		var startHandler = function(evt){
			//记录手指按下的坐标
			self.startX = evt.originalEvent.targetTouches[0].pageX;
			self.startY=evt.originalEvent.targetTouches[0].pageY;
			//清除偏移量
			self.offsetX = 0;
			self.offsetY=0;
		};

		//手指移动的处理事件
		var moveHandler = function(evt){
			//兼容chrome android，阻止浏览器默认行为
			evt.preventDefault();
			
		};

		//手指抬起的处理事件
		var endHandler = function(evt){
			//evt.preventDefault();
			
			//计算手指的偏移量
			self.offsetX = evt.originalEvent.changedTouches[0].pageX;
			self.offsetY = evt.originalEvent.changedTouches[0].pageY;
			
			var diffX = self.offsetX-self.startX ;
	        
			var d=self.direction();
			if(d=='left'){
				lastdiff=lastdiff-self.width;
				self.wrap && (self.wrap.css('transition-duration','1s'));
				self.wrap && (self.wrap.css('transform','translate3d('+ lastdiff+'px, 0, 0)'));
				if(lastdiff<-self.maxwidth){
					lastdiff=-self.maxwidth;
					setTimeout(function(){
						self.wrap && (self.wrap.css('transform','translate3d('+ lastdiff +'px, 0, 0)'));
					},300);
				}
			}else if(d=='right'){
				lastdiff=lastdiff+self.width;
				
				self.wrap && (self.wrap.css('transition-duration','1s'));
				self.wrap && (self.wrap.css('transform','translate3d('+ lastdiff +'px, 0, 0)'));
				if(lastdiff>0){
					lastdiff=0;
					setTimeout(function(){
						self.wrap && (self.wrap.css('transform','translate3d('+ lastdiff +'px, 0, 0)'));
					},300);
				}
				
			}
			
			
		};

		//绑定事件
		self.wrap.on('touchstart', startHandler);
		self.wrap.on('touchmove', moveHandler);
		self.wrap.on('touchend', endHandler);
	};
});

function isDate(date) {
	    var reg = /^(\d{4})([\/,-])(\d{1,2})\2(\d{1,2})$/;
	    var r = date.match(reg);
	    if (r == null) return false;
	    var d = new Date(r[1], r[3] - 1, r[4]);
	    var newStr = d.getFullYear() + r[2] + (d.getMonth() + 1) + r[2] + d.getDate();
	    date = r[1] + r[2] + ((r[3] - 1) + 1) + r[2] + ((r[4] - 1) + 1);
	    return newStr == date;
}	
function toDay(date){
	date=date.replace(/\./g,"/");
	if(isDate(date)){
		var _date=new Date(date);
		var day=Math.floor((_date-new Date())/1000/60/60/24);
		return day;
	}
	return 0;
}	

		