$(function(){
	/*
	 * 选择了simple-lightbox.js 并修改了原码
	 *  http://www.dowebok.com/186.html
	 */
	//获取店铺图片
	var shopId = $("body").attr("data-shop-id") || globalUtil.getUrlParam('shopId');
	
	var shopEnvironment={
			init:function(){
				globalUtil.changeTitle('商家环境');
				//fastClick 
				//FastClick.attach(document.body);
				if(shopId){
					//关闭分享
	 				globalUtil.globalShareFun('');
					this.getShopEnvironment();
				}else{
					//跳转选择店铺页面
	 				location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=shopHome";
				}
			},getShopEnvironment:function(){
				var _this = this;
				$.ajax({
					url:request.shop.getShopPicture,
					type:"get",
					data:{shop_id:shopId},
					dataType:"json",
					success: function(data){
						if(200 == data.status && data.content){
								var content = globalUtil.b64ToUtf8(data.content,"utf8");
							    	content = JSON.parse(content);
							    var shopMapNum=content.length;
							    console.log("content",content);
								laytpl($("#shopImgTmpl").html()).render({
									shopMapNum:shopMapNum,
									content:content
									}, function(html){
								         $("#photosView").append(html);
								        
								      _this._endFun();
									});
								
						}else{
							 $("body").append($("#shopImgEmptyTmpl").html());
							
						}
					}
				});
			},_endFun :function(){
				 var $gallery = $('.gallery a').simpleLightbox({
					 close:false,
					 fileExt:"" //所有格式
					 });
				 
				 //Lightbox 开启后的事件 ,修复手机端点击空白区无法关闭bug
				 $gallery.on("shown.simplelightbox",function(){
					 $(".sl-overlay").on("click",function(){
						 $gallery.close();
					 });
					// $(".sl-counter").hide();
				 });
				 
				 alert(window.navigator.maxTouchPoints);
				
		       
				
			}
	};
	
	shopEnvironment.init();
	
	
	
});