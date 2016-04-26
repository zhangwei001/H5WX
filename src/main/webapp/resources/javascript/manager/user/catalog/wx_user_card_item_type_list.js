//顾客 耗卡预约 里的 卡详情下的 类包含的具体 护理 或者 产品 列表

$(function(){
	
	//获取全局变量
	var globalVar=store.get("globalVar");
	var userId= globalVar.userId;
	var appId=globalVar.appId;
	var openId =globalVar.openId;
	var accessToken = globalVar.accessToken;
    

   
	var cardClass = store.get("wx_user_card_detail_card_class");
	var givenClass = store.get("wx_user_card_detail_given_class");
	
	//获取 顾客 耗卡预约 里的 卡详情
	var content = store.get("wx_user_card_detail");
	
	console.log("cardClass",cardClass);
	console.log("givenClass",givenClass);
	/*Id=0&ClassType=1*/
	//url 参数
	var cardId = getUrlParam("cardId");
	var shopId = getUrlParam("shopId");
	var cardType =getUrlParam("cardType");
	var customId = getUrlParam("customId");
	
	// itemTypeId  类Id
	var itemTypeId = getUrlParam("itemTypeId");
	
	//类别标志，1表示卡内类  ，0表示赠送类
	var classFlag =getUrlParam("classFlag");
	
	//卡内类 或者 赠送类数组的第几个
	var dataIndex = getUrlParam("dataIndex");
	
	var cardItem ={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				if( classFlag == 1 ){
					this.rendCardItem();
				}else if( classFlag == 0){
					this.rendGivenItem();
				}
			},rendCardItem: function(){
				var _this = this;
					laytpl( $("#inClassItemTemp").html() ).render({
						content:content,
						customId:customId,
						dataIndex:dataIndex,
						cardId:cardId,
						shopId:shopId,
						cardType:cardType,
						webRoot : GLOBAL.webRoot,
						cardClass: cardClass,
						classFlag:classFlag
					}, function(html){
						$("#cardInfoView").empty();
					 $("#cardInfoView").append(html);
					 _this.addClickEve();
					 
				    });
			},rendGivenItem :function(){
				var _this =this;
				 laytpl( $("#inClassItemTemp").html() ).render({
					   content:content,
					    cardId:cardId,
					    customId:customId,
						shopId:shopId,
						cardType:cardType,
						webRoot :GLOBAL.webRoot,
						dataIndex:dataIndex,
						cardClass: givenClass,
						classFlag:classFlag
					}, function(html){
						$("#cardInfoView").empty();
					 $("#cardInfoView").append(html);
					 _this.addClickEve();
				    });
				
			},addClickEve:function(){
				$("body").delegate("ul[data-click='true']","click",function(e){
					  
					
					  
				    //护理或者产品id
					var itemId = $(this).attr("data-item-id");
					var itemName = $(this).attr("data-item-name");
					
					var isGiven = $(this).attr("data-is-given");
					//次卡时，表示最大可预约个数； 储值卡 时表示折扣
					var maxTimesORdiscount = $(this).attr("data-item-num");
					
				    if(itemName.split("_")[0]=="mass"){
				    	//护理详情
				    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&itemTypeId="+itemTypeId+"&activityId=0&from=card";
				    }else if(itemName.split("_")[0]=="pro"){
				    	//产品详情
				    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&itemTypeId="+itemTypeId+"&activityId=0&from=card";
				    }
				
				});	
				
				$("body").delegate("ul[data-no-money='true']","click",function(e){
					  
					
					  
				    //护理或者产品id
					var itemId = $(this).attr("data-item-id");
					var itemName = $(this).attr("data-item-name");
					
					var isGiven = $(this).attr("data-is-given");
					//次卡时，表示最大可预约个数； 储值卡 时表示折扣
					var maxTimesORdiscount = $(this).attr("data-item-num");
					
				    if(itemName.split("_")[0]=="mass"){
				    	//护理详情
				    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&itemTypeId="+itemTypeId+"&activityId=0&from=item";
				    }else if(itemName.split("_")[0]=="pro"){
				    	//产品详情
				    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&itemTypeId="+itemTypeId+"&activityId=0&from=item";
				    }
				
				});	
				
			}
	};
	cardItem.init();
	
	
});