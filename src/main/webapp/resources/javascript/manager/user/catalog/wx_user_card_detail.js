//顾客耗卡详情


$(function(){
	
	//获取全局变量
	var globalVar=store.get("globalVar");
	var userId= globalVar.userId;
	var appId=globalVar.appId;
	var openId =globalVar.openId;
	var accessToken = globalVar.accessToken;
	
	//url 参数
	var cardId = getUrlParam("cardId");
	var shopId = getUrlParam("shopId");
	var cardType =getUrlParam("cardType");
	
	//卡详情 
	var content;
	
	
    var massagelist;   
    var massagelistTrue = [];
    var productList ;
	var productListTrue =[];
	
	var cardInwardItems =[] ;
	var givenItem = [];
	
	//赠送类 单项
	var givenClass = [];
	var givenSingle =[];
	
	//卡内类 单项
	var cardClass = [];
	var cardSingle = [];
	
	//顾客Id
	var customId;
	
	var userCardDetail = {
			
			init: function(){
				//fastClick 
				FastClick.attach(document.body);
				//关闭分享
 				globalUtil.globalShareFun('');
				sessionStorage.setItem("card_server_tips_jump_others", 1);
				  var	customInfo= globalUtil.getCustomerId(openId,shopId);
			  			if(customInfo){
			  				customInfo = globalUtil.b64ToUtf8(customInfo, "utf8");
				  			customInfo=JSON.parse(customInfo);
				  			customId=customInfo.custom_id;
			  			}
				  this.getUserCardDetail(cardId,shopId,customId);
				  this.getShopInfoFun(shopId);
				  globalUtil.changeTitle("我的消费卡")
			},getUserCardDetail :function(cardId,shopId,customId){
				var _this= this;
				//获取用户 卡内项目 包括赠送 详情
				$.ajax({
					url:request.user.getCardInfoDetials,
					data:{
						card_id     	 :  cardId,
						shop_id 		 :  shopId,
						custom_id  		 :  customId,
						app_id           :  appId,
						open_id         :   openId
					},
					type:"get",
					dataType: "json",
					success :function(data){
						if(data.status === 200 ){
							var decodeData =globalUtil.b64ToUtf8(data.content,"utf-8");
							    content = JSON.parse(decodeData);
							    console.log("content",content);
							  
							    //耗卡预约的某个卡详情放到本地
							    store.remove("wx_user_card_detail");
							    store.set("wx_user_card_detail",content);
							    
							   if(content.now_time){
								   nowServerTimes= (content.now_time).replace(new RegExp("-","gm"),"/") ;
							    	 nowServerTimes= (new Date(nowServerTimes ) ).getTime();
							    	
							    }
						
							    massagelist =  content.massage_tree;
							    massagelistTrue = [];
							
							    productList =  content.product_tree;
							    productListTrue =[];
							
							    cardInwardItems =[] ;
							    givenItem = [];
							    
				//* **********************  循环护理  修改key值    ********************* */		    
						 //循环护理  修改key值为     ： item_name  "mass_"+ attr
						   console.log('修改前的护理',massagelist);
							for(var i = 0;i<massagelist.length;i++){
								var item = massagelist[i];
								var mass_massageObj={};
								for (var attr in item){
									if(attr == "item_name" ){
										mass_massageObj[attr] = "mass_"+item[attr];
									}else{
										mass_massageObj[attr] = item[attr];
									}
									
								}
								//护理 类的子项添加mass
								if(item.item_child){
									for(var k =0;k<item.item_child.length;k++){
										var itemChild =item.item_child[k];
										for(var ar in itemChild){
											if( ar == "item_name"){
												itemChild["item_name"]= "mass_"+itemChild["item_name"];
											}
										}
									}
								}
								
								
								massagelistTrue.push(mass_massageObj);
							}; 
							
							console.log("修改后的护理",massagelistTrue);
							//从          护理    中分离出 是赠送还是卡内，分别推到对应的数组内
							//是否为赠送(0:卡内；   1: 赠送),
							for(var i= 0 ;i<massagelistTrue.length;i++){
								var item = massagelistTrue[i];
								$.each(item ,function(attr,val ){
									if(attr =="if_preferential"){
										if(val == 0){
											cardInwardItems.push(item);
										}else if(val== 1){
											givenItem.push(item);
										}
									}
								});
							}
							
							
				//* *****************  循环产品   修改key值    **************************** */			
							//循环产品 修改key 
							for(var i = 0;i<productList.length;i++){
								var item = productList[i];
								var prod_productObj ={};
								
								for(var attr in  item){
									if(attr == "item_name"){
										prod_productObj[attr] = "pro_"+item[attr];
									}else{
										prod_productObj[attr] = item[attr];
									}
									
								}
								
								//护理 类的子项添加 pro_
								if(item.item_child){
									for(var g =0;g<item.item_child.length;g++){
										var itemChild =item.item_child[g];
										for(var arr in itemChild){
											if( arr == "item_name"){
												itemChild["item_name"]= "pro_"+itemChild["item_name"];
											}
										}
									}
								}
								
								
								productListTrue.push(prod_productObj);
								
							}; 
						console.log("修改前的产品：",productList);
						console.log("修改后的产品：",productListTrue);
							
							
							
							//从        产品tree      中分离出 是赠送还是卡内，分别推到对应的数组内
							for(var i = 0;i<productListTrue.length;i++){
								var item = productListTrue[i];
								$.each(item,function(attr,val){
									if(attr == "if_preferential"){
										if(val == 0){
											cardInwardItems.push(item);
										}else if(val == 1){
											givenItem.push(item);
										}
									}
								});
							};
							console.log("卡内",cardInwardItems);
							console.log("赠送",givenItem);
							
							//type: Integer  0: 类     1 单项
							//**********在卡内中，判断是类还是单项
							
						
						    for(var i= 0; i<cardInwardItems.length;i++){
						    	var item = cardInwardItems[i];
						    	$.each(item,function(attr, val ){
						    		if(attr == "type"){
						    			if(val == 0 ){
						    				cardClass.push(item);
						    			}else if(val == 1) {
						    				cardSingle.push(item);
						    			}
						    		}
						    	});
						    }
						    //localStorage
						   store.set('cardClass'+ cardId, cardClass);
						 
						   
						   console.log("卡内类",cardClass);
						    console.log("卡内单项",cardSingle);
						  //赠送项目： type: Integer  0: 类     1 单项
						  //**********在卡内中，判断是类还是单项
						    
						    
			    			 for(var i= 0; i<givenItem.length;i++){
			 			    	var item = givenItem[i];
			 			    	$.each(item,function(attr, val ){
			 			    		if(attr == "type"){
			 			    			if(val == 0 ){
			 			    				 givenClass.push(item);
			 			    			}else if(val == 1) {
			 			    				givenSingle.push(item);
			 			    			}
			 			    		}
			 			    	});
			 			    }
			    			
			    			
			    		
						    console.log("赠送卡内类",givenClass);
						    console.log("赠送单项",givenSingle);
						    
						    //localStore 把赠送类 和卡内类 放到本地
						    store.remove("wx_user_card_detail_given_class");
						    store.set("wx_user_card_detail_given_class",givenClass);
						    
						    store.remove("wx_user_card_detail_card_class");
						    store.set("wx_user_card_detail_card_class",cardClass);
						    
						    
						    _this.renderCardItem(cardClass,cardSingle,givenClass,givenSingle);
						   
						    
						}else{
							alert(data.errorMessage);
						};
					},
					error :function(){
						alert("网络开了小差，重新试试吧~");
					}
				});
				
			},renderCardItem: function(cardClass,cardSingle,givenClass,givenSingle){
				//渲染卡内项目
				/*
				 * cardClass :卡内类别
				 * givenClass ：赠送类
				 * givenSingle ：赠送单项
				 * cardSingle : 卡内非类别
				 */
				
				var _this = this;
				if( cardClass.length>0 || cardSingle.length>0 ){
					
					laytpl( $("#cardInfoTemp").html() ).render({
						content :content,
						nowServerTimes :nowServerTimes,
						shopId:shopId,
						cardId :cardId,
						webRoot :GLOBAL.webRoot,
						cardClass:cardClass,
						cardSingle : cardSingle,
						cardType :cardType
					}, function(html){
						  $("#cardInfoView").empty();
						
						  $("#cardInfoView").append(html);
						  _this.toBindTabEvent(cardClass,cardSingle,givenClass,givenSingle);
							  /*
							   * 展开开内类
							   */
						  $("ul[data-click-incard='true']").click(function(){
							  var dataIndex =  $(this).attr("data-child");
							  //类Id
							  var itemTypeId = $(this).attr("data-type-id");
								location.href= GLOBAL.webRoot + "/agent/manager-user-catalog-wx_user_card_item_type_list?cardId="+cardId+"&shopId="+shopId+"&cardType="+cardType+"&dataIndex="+dataIndex+"&classFlag=1"+"&customId="+customId+"&itemTypeId="+itemTypeId;
						   });
						  
						     /*
							 * 卡内项目 单个
							 */
						  $("ul[data-click='true']").on("click",function(){
							  
							    //护理或者产品id
								var itemId = $(this).attr("data-item-id");
								var itemName = $(this).attr("data-item-name");
								
								//是否为赠送
								var isGiven = $(this).attr("data-is-given");
							
								//次卡时，表示最大可预约个数； 储值卡 时表示折扣
								var maxTimesORdiscount = $(this).attr("data-item-num");
								
							    if(itemName.split("_")[0]=="mass"){
							    	//护理详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=card";
							    }else if(itemName.split("_")[0]=="pro"){
							    	//产品详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=card";
							    }
						  });
						  //no enough money .click to pay by weixin or shop
						  $("ul[data-no-money='1']").on("click",function(){
							  
							   //护理或者产品id
								var itemId = $(this).attr("data-item-id");
								var itemName = $(this).attr("data-item-name");
								
								//是否为赠送
								var isGiven = $(this).attr("data-is-given");
							
								//次卡时，表示最大可预约个数； 储值卡 时表示折扣
								var maxTimesORdiscount = $(this).attr("data-item-num");
								
							    if(itemName.split("_")[0]=="mass"){
							    	//护理详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=item";
							    }else if(itemName.split("_")[0]=="pro"){
							    	//产品详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=item";
							    }
							  
							  
							  
							  
						  });
						  
						 
					   
				    });
				}else{
					laytpl( $("#hasNoContentTemp").html() ).render({
						content :content,
						
						webRoot :GLOBAL.webRoot,
						cardType :cardType
					}, function(html){
					  $("#cardInfoView").empty();
					  $("#cardInfoView").append(html);
					  _this.toBindTabEvent(cardClass,cardSingle,givenClass,givenSingle);
				    });
				}
				
			},rendGivenItem :function(cardClass,cardSingle,givenClass,givenSingle){
				/*
				 * 渲染赠送项目
				 * givenClass赠送类；givenSingle 赠送非类
				 */
				var _this =this;
				if(givenClass.length>0 || givenSingle.length>0 ){
					laytpl( $("#givenItemTemp").html() ).render({
						content :content,
						webRoot :GLOBAL.webRoot,
						nowServerTimes :nowServerTimes,
						
						givenClass :givenClass,
						givenSingle :givenSingle,
						
						cardType :cardType
					}, function(html){
						$("#cardInfoView").empty();
					    $("#cardInfoView").append(html);
					    _this.toBindTabEvent(cardClass,cardSingle,givenClass,givenSingle);
					    
					    
					    $("ul[data-click-given='true']").click(function(){
							//修改事件
							var dataIndex =  $(this).attr("data-child");
							//类Id
							var itemTypeId = $(this).attr("data-type-id");
							location.href=GLOBAL.webRoot + "/agent/manager-user-catalog-wx_user_card_item_type_list?cardId="+cardId+"&shopId="+shopId+"&cardType="+cardType+"&dataIndex="+dataIndex+"&classFlag=0"+"&customId="+customId+"&itemTypeId="+itemTypeId;
						});
					    
					    /*
						 * 卡内项目 单个
						 */
					  $("ul[data-click='true']").on("click",function(){
						  
						    //护理或者产品id
							var itemId = $(this).attr("data-item-id");
							var itemName = $(this).attr("data-item-name");
							
							//次卡时，或者赠送时，表示最大可预约个数； 储值卡 时表示折扣
							var maxTimesORdiscount = $(this).attr("data-item-num");
							var cardType = $(this).attr("data-card-type");
							//是否为赠送
							var isGiven = $(this).attr("data-is-given");
							
						    if(itemName.split("_")[0]=="mass"){
						    	//护理详情
						    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&customId="+customId+"&isGiven="+isGiven+"&cardType="+cardType+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=card";
						    }else if(itemName.split("_")[0]=="pro"){
						    	//产品详情
						    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&customId="+customId+"&isGiven="+isGiven+"&cardType="+cardType+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=card";
						    }
						
					  });
					  
					 
					  $("ul[data-no-money='1']").on("click",function(){
						  
						    //护理或者产品id
							var itemId = $(this).attr("data-item-id");
							var itemName = $(this).attr("data-item-name");
							
							//次卡时，或者赠送时，表示最大可预约个数； 储值卡 时表示折扣
							var maxTimesORdiscount = $(this).attr("data-item-num");
							var cardType = $(this).attr("data-card-type");
							//是否为赠送
							var isGiven = $(this).attr("data-is-given");
							
						    if(itemName.split("_")[0]=="mass"){
						    	//护理详情
						    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&customId="+customId+"&isGiven="+isGiven+"&cardType="+cardType+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=item";
						    }else if(itemName.split("_")[0]=="pro"){
						    	//产品详情
						    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&customId="+customId+"&isGiven="+isGiven+"&cardType="+cardType+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=item";
						    }
						
					  });
					    
					   
				    });
				}else {
					laytpl( $("#hasNoGivenContentTemp").html() ).render({
						content :content,
						webRoot :GLOBAL.webRoot,
						cardType :cardType,
						shopId :shopId
					}, function(html){
					  $("#cardInfoView").empty();
					  $("#cardInfoView").append(html);
					  _this.toBindTabEvent(cardClass,cardSingle,givenClass,givenSingle);
				    });
				}
				
			},getConsumeRecordData:function(){
				/*
				 * 获取消费记录数据 
				 */
				var _this = this;
				var itemSeached =[];
				$.ajax({
					url:request.reserved.consumeRecored,
					data:{
						shop_id :shopId,
						card_id :cardId,
						open_id :openId,
						app_id  :appId
					},
					type:"get",
					dataType:"json",
					success :function(data){
						if(data.status == 200){
							_this.renderConsumeRecord(data.content);
						}else{
							alert(data.errorMessage);
						}
					},
					error :function(data){
						alert("获取数据失败："+JSON.stringify(data));
					}
				});
			},renderConsumeRecord:function(consumeContent){
				/*
				 * 渲染消费记录
				 */
				var _this = this;
				var itemSeached =[];
				if(consumeContent){
					var decodeContent = globalUtil.b64ToUtf8(consumeContent, "utf-8");
					var contents       =JSON.parse(decodeContent);
					console.log("contents消费记录",contents);
					//判断是 护理还是 产品
				  for(var t=0;t<contents.length;t++){
						for(var att in contents[t]){
							if(att=="item_type"){
								 if( contents[t].item_type == "0"){
										contents[t].info ="mass_"+contents[t].info;
								 }else if(contents[t].item_type == "1"){
									 contents[t].info ="pro_"+contents[t].info;
								 }
								
							}
						}
					}
					
					//消费记录 搜索
					for(var k=0;k<contents.length;k++){
					    for(var attr in contents[k]){
					    	if(attr=="order_flag"){
					    		var consuemIntemId = contents[k].item_id;
					    		if(contents[k].order_flag == 2){
					    			//搜索赠送树 order_flag=2 是 赠送
					    			var searchedGivItem = _this.searchGivnConsumeItem(consuemIntemId);
					    			searchedGivItem["type_id"]=contents[k].massage_type_id;
					    			itemSeached.push(searchedGivItem);
					    			console.log("收索到的项目",searchedGivItem);
					    			
					    		}else{
					    			//搜索卡内项目树
					    			var searchedCardItem =_this.searchCardConsuemItem(consuemIntemId);

					    	   	console.log("收索到的项目",searchedCardItem);

					    			searchedCardItem["type_id"]=contents[k].massage_type_id;
					    			console.log("收索到的项目",searchedCardItem);

					    			itemSeached.push(searchedCardItem);
					    			
					    		}
					    	}
					    }
					}
					
					laytpl( $("#consumeRecordTemp" ).html() ).render({
						
						content  :contents,
						allcontent : content,
						itemSeached:itemSeached,
						cardType :cardType,
						webRoot:GLOBAL.webRoot,
						shopId:shopId
					}, function(html){
						$("#tabs").nextAll().remove();
						$("#tabs").parent("div").next("p").remove();
					    $("#tabs ").after(html);
					    _this.toBindTabEvent(cardClass,cardSingle,givenClass,givenSingle);
					    
					    
					     
						  $("li[data-record-click='true']").on("click",function(){
							  
							    //护理或者产品id
								var itemId = $(this).attr("data-item-id");
								var itemTypeId;
								//用itemId 去找 类 itemTypeId
								for(var k =0;k<contents.length;k++){
									var item = contents[k];
									for(var attr in item){
										if(attr=="item_id"){
											if(item[attr]==itemId){
												itemTypeId= item.massage_type_id;
											}
										}
									}
								}
								
								
								var itemName = $(this).attr("data-item-name");
								
								//是否为赠送
								var isGiven = $(this).attr("data-if-preferential");
							
								//次卡时，表示最大可预约个数； 储值卡 时表示折扣
								var maxTimesORdiscount = $(this).attr("data-item-num");
								
							    if(itemName.split("_")[0]=="mass"){
							    	//护理详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&itemTypeId="+itemTypeId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=card";
							    }else if(itemName.split("_")[0]=="pro"){
							    	//产品详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=card";
							    }
						  });
						  
						  //consumer reconed to pay by weixin or shop
						  $("li[data-no-money='true']").on("click",function(){
							  
							    //护理或者产品id
								var itemId = $(this).attr("data-item-id");
								var itemTypeId;
								//用itemId 去找 类 itemTypeId
								for(var k =0;k<contents.length;k++){
									var item = contents[k];
									for(var attr in item){
										if(attr=="item_id"){
											if(item[attr]==itemId){
												itemTypeId= item.massage_type_id;
											}
										}
									}
								}
								
								
								var itemName = $(this).attr("data-item-name");
								
								//是否为赠送
								var isGiven = $(this).attr("data-if-preferential");
							
								//次卡时，表示最大可预约个数； 储值卡 时表示折扣
								var maxTimesORdiscount = $(this).attr("data-item-num");
								
							    if(itemName.split("_")[0]=="mass"){
							    	//护理详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemType=massage&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&itemTypeId="+itemTypeId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=item";
							    }else if(itemName.split("_")[0]=="pro"){
							    	//产品详情
							    	location.href = GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemType=product&itemId="+itemId+"&shopId="+shopId+"&isGiven="+isGiven+"&customId="+customId+"&maxTimesORdiscount="+maxTimesORdiscount+"&activityId=0&from=item";
							    }
						  });
					    
					    
					   
				    });
				}else{
					laytpl( $("#hasNoConsuTemp").html() ).render({
						content :content,
						webRoot :GLOBAL.webRoot,
						cardType :cardType,
						shopId:shopId
					}, function(html){
					  $("#cardInfoView").empty();
					  $("#cardInfoView").append(html);
					  _this.toBindTabEvent(cardClass,cardSingle,givenClass,givenSingle);
				    });
				}
				
			},toBindTabEvent:function(cardClass,cardSingle,givenClass,givenSingle){
				/*
				 * 切换选项卡后，渲染某个项目
				 */
				var _this =this;
				 $("#tabs").find("li[data-item-navi='true']").click(function(event){
						 var $this = $(this);
						 $this.toggleClass("activ").siblings("li").removeClass("activ");
						 $this.addClass("activ");
						 
						 if(event.target.innerText =="卡内项目"){
						
							 _this.renderCardItem(cardClass,cardSingle,givenClass,givenSingle);
							// openCardClass();
							 
						 }else if (event.target.innerText =="赠送项目"){
							
							 _this.rendGivenItem(cardClass,cardSingle,givenClass,givenSingle);
							 //openGivenClass();
							 
						 }else if(event.target.innerText == "消费记录"){
							 
							_this.getConsumeRecordData();
						 }
						 
					 });
				
				
			},searchGivnConsumeItem :function(itemId){
				/*
				 * 由消费记录的某个项目Id,在赠送项目中查找具体的某个项目详情
				 */
				
				for(var jj= 0;jj<givenItem.length;jj++){
					for(var attr in givenItem[jj] ){
						if(attr =="item_child"){
							for(var m=0;m<givenItem[jj].item_child.length;m++){
								for(var arg in givenItem[jj].item_child[m]){
									if(arg =="item_id"){
										if(itemId==givenItem[jj].item_child[m].item_id && givenItem[jj].item_child[m].type==1){
											return  givenItem[jj].item_child[m];
										}
									}
								}
							}
						}else {
							if(attr=="item_id"){
								if(itemId ==givenItem[jj].item_id  && givenItem[jj].type==1){
									return givenItem[jj];
								}
							}
						}
					}
				}
				
			},searchCardConsuemItem: function(itemId){
				/*
				 * 由消费记录的某个项目Id,在卡内项目中查找具体的某个项目详情
				 */
				for(var ii= 0;ii<cardInwardItems.length;ii++){
					for(var attr in cardInwardItems[ii] ){
						if(attr =="item_child"){
							for(var h=0;h<cardInwardItems[ii].item_child.length;h++){
								for(var arg in cardInwardItems[ii].item_child[h]){
									if(arg =="item_id" ){
										if(itemId==cardInwardItems[ii].item_child[h].item_id  && cardInwardItems[ii].item_child[h].type==1){
											return  cardInwardItems[ii].item_child[h];
										}
									}
								}
							}
						}else {
							if(attr=="item_id"){
								if(itemId ==cardInwardItems[ii].item_id && cardInwardItems[ii].type==1){
									return cardInwardItems[ii];
								}
							}
						}
					}
				}
				
				
			},getShopInfoFun:function(shopId){
	 			
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
			        		 open_id   :  openId,
			        		 longitude :  longitude,
			        		 latitude  :  latitude
			        	 },
			        	 type:"get",
			 			 dataType:"json",
			 			 success:function(data){
			 				 if(data.status == 200 && data.content){
			 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
			 					  		shopInfoData =  JSON.parse(decodeObj);
			 					 console.log("shopInfoData",shopInfoData);
			 					store.remove("shopInfoData");
			 					store.set("shopInfoData",shopInfoData);
			 				 }
			 			 }
			      });
	 			});
	 		}
			
	};
	userCardDetail.init();
	
	
});