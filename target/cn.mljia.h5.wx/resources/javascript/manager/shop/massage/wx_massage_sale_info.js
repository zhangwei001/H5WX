$(function(){
	
	
	//由全局变量中获取店铺信息
	var shopInfoData = store.get("shopInfoData");
	
	var globalVar = store.get("globalVar");
	var appId    =globalVar.appId;
	var userId   =globalVar.userId;
	var openId  = globalVar.openId;
	var accessToken = globalVar.accessToken;
	
	
	
	//耗卡预约 顾客选中的 卡详情
	var userCardDetail = store.get("wx_user_card_detail");
	
	//二维码过来
	var qrCode     = getUrlParam("qrCode");
	
	//url数据
	var shared  =getUrlParam("shared");
	var activityId = getUrlParam("activityId");
	var shopId   =  getUrlParam("shopId");
	var itemType = getUrlParam("itemType");
	var itemId =   getUrlParam("itemId");
	var from = getUrlParam("from");
	var isGiven = getUrlParam("isGiven");
	var maxTimesORdiscount = getUrlParam("maxTimesORdiscount");
	//从二期耗卡预约过来的 “类Id”
	var itemTypeId = getUrlParam("itemTypeId") || 0;
	
	var discount = getUrlParam("discount") || 10; //折扣
	
	var discountedMoney ;
	var webRoot = GLOBAL.contextPath;
	//url数据
	var urlData = {
			itemType:itemType,
			shared:shared,
			webRoot: webRoot,
			itemId:itemId
			};
 
 	
	var massageSale={
		init: function(){
			//fastClick 
			FastClick.attach(document.body);
			globalUtil.changeTitle('护理详情');
			if(shopId&& itemId){
				
				this.getMassageInfoData(shopId);
				
			}else{
 				//跳转选择店铺页面
 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
 			}
			if(activityId>0){
				this.getEventCardInfo();
				this.getEventInfo();
			}
		},getEventCardInfo:function(){
			var _this=this;
			$.ajax({
				url: request.shop.getEventPriceById,
				data:{
					shop_id 	:  shopId,
					item_id     :  itemId,
					activity_id :  activityId,
					item_type   :  1 //项目类型（必填）（0：卡项 1：护理 2：产品）
				},
				type:"get",
				dataType: "json", 
				async:false,
				success :function(data){
					if(data.status === 200 && data.content ){
						var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
						var eventInfo = JSON.parse(decodeData);
						
						discountedMoney=eventInfo.pre_price||0;//项目优惠价
						
					}else{
						alert("获取活动数据失败~");
					};
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			});
		},getEventInfo: function(){
			
			$.ajax({
				url:request.event.getPromotionsDeatils,
				data:{
					activity_id:activityId,
					shop_id:  shopId
				},
				type:"post",
				dataType: "json",
				success :function(data){
					if(data.status === 200 && data.content && data.content!='[]'){
						var content = globalUtil.b64ToUtf8(data.content,"utf8");
						eventContent = JSON.parse(content);
						    console.log("活动详情",eventContent);
						    store.remove("promotions_activity_info");
						    store.set("promotions_activity_info",eventContent);
					}
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			 });
			
			
		},getMassageInfoData: function(shopId){

			var _this=this;
			
			//护理详情
			$.ajax({
				url:request.shop.getMassageDetailsOfShopServe,
				data:{
					shop_id 	   :  shopId ,
					massage_id     :  itemId,
					activity_id    :  activityId || 0
				},
				type:"get",
				dataType: "json", 
				success :function(data){
					if(data.status === 200 && data.content ){
						var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
						var massageInfo = JSON.parse(decodeData);
						    console.log("护理详情：",massageInfo);
						    
						    //计算倒计时     传入秒
						    if(massageInfo.limit_time>0){
						    	var limitTime = arrive_timer_format(massageInfo.limit_time);
						    	massageInfo.limitTime=limitTime;
						    }else{
						    	massageInfo.limitTime='已过期';
						    }
						    _this.getMassageInfoRender(massageInfo);
					}else{
						alert("获取数据失败~");
					};
				},
				error :function(){
					alert("网络开了小差，重新试试吧~");
				}
			});
		
		
		},getMassageInfoRender : function(massageInfo){
			//促销活动信息
			var activityInfo = store.get("promotions_activity_info");
			var _this=this;
			laytpl($("#massageSaleTemp").html()).render({
				content: massageInfo,
				urlData: urlData,
				activityId: activityId || 0,
				activityInfo: activityInfo,
				qrCode:qrCode,
				limitTime : massageInfo.limitTime,
				discountedMoney: discountedMoney,
				shopInfoData: shopInfoData,
				discount:discount
			},function(html){
				$("#itemDetailsOfServeView").html(html);
				
				if(activityId==0){
					//非活动页面出现评论
					_this.getMassageComment(massageInfo,shopId,itemId);
				}
				
				
				_this.endFun(massageInfo);
			});
			
		},getMassageComment:function(massageInfo,shopId,itemId){
			
			//type 0：员工的评论 1 店铺的评论 2 服务卡的评论 3 服务的评论 4 产品的评论 5 订单的评论（必填
			$.ajax({
				url:request.shop.getCommentInfo,
				data:{
					shop_id: shopId,
					flag  :  3,
					id  : itemId
				},
				type:"get",
				dataType:"json",
				success: function(data){
					if(data.status == 200 ){
						var massageCommentInfo;
						if(data.content ){
							var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
								decodeData=JSON.parse(decodeData);
								  console.log("护理评价列表",decodeData);
							if(decodeData.length>0){
								massageCommentInfo=decodeData;
							}else{
								massageCommentInfo="";
							}
						}else{
							massageCommentInfo="";
						}
						
						console.log("评论",massageCommentInfo);
						laytpl($("#massageCommentTemp").html()).render({
							content:massageCommentInfo,
							massageInfo:massageInfo,
							webRoot:GLOBAL.webRoot
						},function(html){
							$("#itemDetailsOfServeView").append(html);
						});
						
					}
				}
			});   
		},endFun:function(massageInfo){
			 //立即预约
			  if(from=="advice" || from == "item" || from =="shopHome" || from=="event"){
				  var hrf = webRoot + "agent/manager-shop-massage-wx_massage_sale?shopId="+shopId +"&itemId="+ urlData.itemId +"&activityId="+activityId+"&discountedMoney="+discountedMoney+"&givenMoney="+massageInfo.give_money+"&from="+from;
			  }else if(from=="card") {
				  var hrf = webRoot + "agent/manager-shop-massage-wx_massage_sale?shopId="+shopId +"&itemId="+ urlData.itemId +"&itemType="+ urlData.itemType+"&activityId="+activityId+"&maxTimesORdiscount="+maxTimesORdiscount+"&isGiven="+isGiven+"&discountedMoney="+discountedMoney+"&itemTypeId="+itemTypeId+"&givenMoney="+massageInfo.give_money+"&from="+from;
			  }
			  //按钮效果
			  var reserveBtn =  $("#reserveNow");
		  	  reserveBtn.click(function(){
			  reserveBtn.css({"box-shadow":"0px 10px 14px #888888"});
			  
			  setTimeout(function(){
				  reserveBtn.css({"box-shadow":""});
				  window.location.href =hrf
			  },100);
			  });
			  //$("#reserveNow").attr("href",hrf);
			  
			  //分享
			  globalUtil.globalShareFun({
					urlSend: GLOBAL.contextPath+"/agent/manager-share-wx_massage_sale_info_share?itemType=massage&&itemId="+itemId +"&&shopId="+shopId +"&activityId="+activityId+"&from="+from+"&userId="+userId,
					imgUrlSend:massageInfo.massage_img_url,
					//titleSend: massageInfo.massage_name + "-" + shopInfoData.shop_other_name
					titleSend:  "欢迎光临" + shopInfoData.shop_name
			  })
			  
			  //点击 进入店铺主页
			  $("#shopHomeInfo").click(function(){
				  location.href= GLOBAL.webRoot +"/agent/manager-shop-info-wx_shops_home?userId="+userId+
				  				"&appId="+appId+
				  				"&openId="+openId+
				  				"&accessToken="+accessToken+
				  				"&shopId="+shopId;
			  });
		}
	};
	
	massageSale.init();
	
	
	
});