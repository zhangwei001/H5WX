$(function(){
	//获取店铺详细信息
	 var  shopId = $("body").attr("data-shop-id")||globalUtil.getUrlParam('shopId');
	 var openId =$("body").attr("data-open-id")||globalUtil.getUrlParam('openId');
	 
	 
	 var shopInfo={
			 init:function(){
				//fastClick 
					FastClick.attach(document.body);
					if(shopId){
						this.getShopInfo();
						globalUtil.changeTitle('商家信息');
						//关闭分享
		 				globalUtil.globalShareFun('');
					}else{
						//跳转选择店铺页面
		 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=shopInfo";
					}
			 },getShopInfo :function(){
				 $.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id :  openId
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					var oData = globalUtil.b64ToUtf8(data.content,"utf8");
		 						oData = JSON.parse(oData);
		 						laytpl($("#shopdetailInfo").html()).render({
		 	 						shop_img_url:oData.shop_img_url,
		 	 						shopName    :oData.shop_name,
		 	 						SId         : oData.s_id,
		 	 						shop_certification_star: oData.shop_certification_star,
		 	 						id         : oData.shop_id,
		 	 						shop_compare:oData.shop_compare,
		 	 						shop_envri:    oData.shop_environment,
		 	 						phone      :oData.shop_tel,
		 	 						mainBusiness: oData.shop_bustiness,
		 	 						shop_addr       : oData.shop_addr,
		 	 						shop_bussiness_time: oData.shop_bussiness_time,
		 	 						shop_area    :oData.shop_area+"㎡",
		 	 						shop_margin_list  :oData.margin_list,
		 	 						shop_credit       :oData.shop_credit
		 	 					},function(html){
		 	 					         $("#shopDetailInfoTemp").html(html);
		 	 					});
		 				
		 		
		 				 }else{
		 					// console.log("获取数据失败");
		 				 }
		 			 }
		         });
			 }
	 };
	 
	 
	 
	 shopInfo.init();
	 
	
	
	
	
	
});