//卡内包含的适用护理 或者产品类 展开
$(function(){
	
	var shopId = getUrlParam("shopId");
	//flag=1, // 1：表示为护理项目2：表示为产品 3：表示护理项目分类 4：表示产品分类
	var flag   = getUrlParam("flag");
	//产品或者护理类的id
	var typeId =getUrlParam("typeId");
	
	var discount =getUrlParam("discount");
	
	var cardType =getUrlParam("cardType");
	
	var from =   getUrlParam("from");
	
	var globalVar = store.get("globalVar");
	
	var openId=globalVar.openId,
		appId = globalVar.appId,
		accessToken = globalVar.accessToken;

	
	var cardIncludeItemApp ={
			init:function(){
				//fastClick 
				FastClick.attach(document.body);
				if(flag== 3){
					this.rendMassageTemp();
				}else if(flag== 4){
					this.rendProductTemp();
				}else{
					alert("数据错误");
				}
			},rendMassageTemp:function(){
				
				globalUtil.changeTitle("全部护理项目");
				$.ajax({
					url: request.shop.getMassageClassItem,
					type:"get",
					data:{
						shop_id :	shopId,
				    massage_type_id : typeId,
				    open_id:openId,
					app_id:appId
					},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							//console.log(data);
							var content     =globalUtil.b64ToUtf8(data.content, "utf8");
								content   = JSON.parse(content);
								
								//console.log("类包含的：",content);
							    laytpl( $("#classItemTemp").html() ).render({
									content:content,
									flag   :flag,
									discount:discount,
									cardType:cardType
								}, function(html){
								  $("#classItemView").empty();
								  $("#classItemView").append(html);
								  
								  
								  $("ul[data-click='true']").click(function(){
									//flag=1, // 1：表示为护理项目2：表示为产品 3：表示护理项目分类 4：表示产品分类
									var flag =$(this).attr("data-item-flag");
									//护理 或者 产品 Id
									var itemId =$(this).attr("data-item-id");
									//var discount = $(this).attr("data-item-discount");
									
									location.href= GLOBAL.webRoot +"/agent/manager-shop-massage-wx_massage_sale_info?itemId="+itemId+
									"&shopId="+shopId+
									"&activityId=0"+
									"&discount="+discount+
									"&from="+from
									  
								  });
								  
							    });
								
						}else {
							alert("获取数据失败");
						}
					},error:function(e){
					}	
				});
				
			},rendProductTemp:function(){
				globalUtil.changeTitle("全部护理项目");
				$.ajax({
					url: request.shop.getProductClassItem,
					type:"get",
					data:{
						shop_id :shopId,
						product_type_id: typeId,
						open_id:openId,
						app_id:appId
					},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
							var content     =globalUtil.b64ToUtf8(data.content, "utf8");
							    content   = JSON.parse(content);
							  //  console.log("产品",content);
							    laytpl( $("#classItemTemp").html() ).render({
									content:content,
									flag:flag,
									discount:discount,
									cardType:cardType
								}, function(html){
								  $("#classItemView").empty();
								  $("#classItemView").append(html);
								  
								  
								  $("ul[data-click='true']").click(function(){
										//flag=1, // 1：表示为护理项目2：表示为产品 3：表示护理项目分类 4：表示产品分类
										var flag =$(this).attr("data-item-flag");
										//护理 或者 产品 Id
										var itemId =$(this).attr("data-item-id");
										
										location.href= GLOBAL.webRoot +"/agent/manager-shop-product-wx_product_sale_info?itemId="+itemId+
										"&shopId="+shopId+
										"&activityId=0"+
										"&discount="+discount+
										"&from="+from
										  
									  });
								  
							    });
								
						}else {
							alert("获取数据失败");
						}
					},error:function(e){
					}	
				});
			}
	}
	cardIncludeItemApp.init();
});