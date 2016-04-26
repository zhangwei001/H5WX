$(function(){
	
	//获取店铺图片
	var shopId = $("body").attr("data-shop-id") || globalUtil.getUrlParam('shopId');
	
	var shopEnvironment={
			init:function(){
				globalUtil.changeTitle('商家环境');
				//fastClick 
				FastClick.attach(document.body);
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
								         $("body").append(html);
								         _this._endFun();
									});
								
						}else{
							 $("body").append($("#shopImgEmptyTmpl").html());
							
						}
					}
				});
			},_endFun :function(){
				 //获取url的数组
		         var urlList  = [];
		         var img_src ;
		         $("ul li").each(function(){
		        	 var _this = $(this);
		        	  urlList.push(_this.attr("data-src"));
		        	
		         });
		         
		         layer.ready(function(){ 
		        	    //官网欢迎页
		        	   
		        	    
		        	    //layer.msg('欢迎使用layer');
		        	    
		        	    //使用相册
		        	    layer.photos({
		        	        photos: '#photos'
		        	    });
		        	});
		         //console.log(urlList);
		         
		/*        //每个图片的点击事件
		         $("ul li").on("click",function(){
		        	   var _this = $(this);
		        	   img_src = _this.attr("data-src");
		            
		        	   //创建原点dot
		        	   var dotHTML='';
		        	   var spanArray =[];
		        	   for(var i = 0 ;i<urlList.length;i++){
		        		   spanArray[i]="<span></span>";
		        	   };
		        	   dotHTML = spanArray.join("");
		        	 //图片弹层
		        	  layer.open({
						    type: 1,
						    title: false,
						    area: ['420px', '240px'], //宽高
						    closeBtn: true,
						    shadeClose: true,
						    skin: 'yourclass',
						    content:'<div class="openpic" style="position:relative">' +
					        '<p class="pic poi1" style="margin-top:0px"><img  id ="imgSrc" src=" '+img_src+'" width="600" height="670"><a class="poi2 oppiccross"><img src=" '+GLOBAL.webRoot+'/resources/images/meirong/shop/shoppicopcross_r4_c6.png" width="47" height="47"></a>'+ 
					         '<a class="poi2 oppic_l_but" id="leftBtn"><img src=" '+GLOBAL.webRoot+'/resources/images/meirong/shop/pic_right_but.png" width="44" height="69"></a><a class="poi2 oppic_r_but" id="rightBtn"><img src=" '+GLOBAL.webRoot+'/resources/images/meirong/shop/pic_left_but.png" width="44" height="69"></a>'+
					         '</p>'+
					         ' <p class="navbut" id="spans">'+dotHTML+'</p>'+
					        ' </div>'
		        	  });
		        	  var spans =$("#spans").children();
		        	  var urlLen = urlList.length;
		        	
		        	  for(var i = 0 ;i<spans.length;i++){
       					spans[i].className ="";
       				  }
	       			  for(var i = 0;i<urlLen;i++){
	       					if( img_src == urlList[i] ){
	       						spans[i].className="activ";
				        		}
	       			  }
			         //点击隐藏
			         $(".oppiccross").click(
		        		 function(){
		        			 layer.closeAll();
		        		 }
			         );
			        
			       
	        	     //右导航
			         $("#rightBtn").click(function(){
			        	 
			        	
			        	 for(var i =0 ; i < urlLen ;i++){
			        		if( img_src == urlList[i] ){
			        			var item = i;
			        			if( item < urlList.length-1){
			        				img_src = urlList[item+1];
			        				$("#imgSrc").attr("src",img_src);
			        				//dot loop clear
			        				for(var i = 0 ;i<spans.length;i++){
			        					spans[i].className =""
			        				}
			        				spans[item+1].className="activ";
			        			
			        			}else{
			        				img_src = urlList[0];
			        				$("#imgSrc").attr("src",img_src);
			        				//dot loop clear 
			        				for(var i = 0 ;i<spans.length;i++){
			        					spans[i].className ="";
			        				}
			        				spans[0].className="activ";
			        			}
			        			return;
			        			
			        		}
			        	 }
			         });
			         
			         //左导航
					 $("#leftBtn").click(function(){
						 
						 var urlLen = urlList.length;
			        	 for(var i =0 ; i < urlLen ;i++){
			        		if( img_src == urlList[i] ){
			        			var item = i;
			        			if( item > 0 ){
			        				img_src = urlList[item-1];
			        				$("#imgSrc").attr("src",img_src);
			        				//dot loop clear
			        				for(var i = 0 ;i<spans.length;i++){
			        					spans[i].className =""
			        				}
			        				spans[item-1].className="activ";
			        				
			        			}else{
			        				img_src = urlList[ urlList.length-1];
			        				$("#imgSrc").attr("src",img_src);
			        				//dot loop clear
			        				for(var i = 0 ;i<spans.length;i++){
			        					spans[i].className ="";
			        				}
			        				spans[spans.length-1].className="activ";
			        				
			        			}
			        			return;
			        			
			        		}
			        	 }
											        	 
				     });
			       
			         
		         });
				*/
				
			}
	};
	
	shopEnvironment.init();
	
	
	
});