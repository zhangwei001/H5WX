<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
	a{text-decoration:none}
</style>
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bghui" id="itemDetailsOfServeView">
	<!-- 渲染区域 -->
</div>


<script type="text/html" id="productSaleTemp">
	   <div class="wx_products_main">
		 <div class="wx_products_windows poi1" style="background-image:url({{ d.content.product_img_url }})">
              {{# if(d.activityId>0) { }}
					<p class="poi2 wx_top_shenyu"><i class="icon-topshenyu"></i>仅剩{{d.limitTime}}</p>
              {{# } }}
			<p class="poi2 wx_products_wtxt"><span class="fl fz30">{{d.content.product_name.substring(0,16)}}</span> 
            <span class="fr fz24"><a class="wxtx_products_but1 ">已售{{d.content.product_num}}</a></span></p>
		 </div>
		
		 <div class="wx_products_wtxt2 mt30">
		    {{# if(d.activityId>0){ }}
				<p class="a1 fl "><span class="fz30">¥</span><span class="fz40">{{d.discountedMoney}}</span><del class="fz14 txthui01 ml10">¥{{d.content.product_price}}</del></p>
				
            {{# }else { }}
				<p class="a1 fl "><span class="fz30">¥</span><span class="fz40">{{ (Number(d.content.product_price)* Number(d.discount)/10).toFixed(2) }}</span></p>
            {{# } }}

			
			  

			{{# if(d.activityId >0 && d.qrCode=="false") { }}
					<p class="a2 fr"><a class="wxtx_products_but2 fz30" id="reserveNow">立即购买</a></p>
             {{# }else if(d.activityId ==0 && d.qrCode=="false")  {  }}
					<p class="a2 fr"><a class="wxtx_products_but2 fz30" id="reserveNow">立即预约</a></p>
             {{# }else if(d.activityId >0 && d.qrCode=="true") {  }}
					<p class="a2 fr"><a class="wxtx_products_but2 fz30" >立即购买</a></p>
			 {{# }else{  }}
						<p class="a2 fr"><a class="wxtx_products_but2 fz30" id="reserveNow">立即预约</a></p>
             {{# } }}
		 </div>
	   </div>

	<div class="wx_products_tise">
		<p><i class="icon-products_pas"></i>支持随时退款</p>
		<p><i class="icon-products_pas"></i>支持过期退款</p>
	</div>
	
   {{# if(d.activityId && d.activityId>0 ){ }}
		<div class="shopckdd_dat shopckdd_datmun">
			<p class="tatle">优惠描述</p>
			<p style=" position: relative;top: 9px;">{{d.activityInfo.describe}}</p>
		</div>
   {{# } }}

<!-- ******* -->

	<div class="shopckdd_dat shopckdd_shopinfo poi1">
		<p class="shop_infotatle">商家信息</p>
		<ul class="shopckdd_infotab01">
			<li class="fl" id="shopHomeInfo">
				<p class="td1"><span class="tatle">{{d.shopInfoData.shop_name}}</span></p>
				<p class="td1 td1b">
					<span class="pic">
						{{# for(var i=0;i<d.shopInfoData.shop_stars;i++){ }}
							<img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
						{{# } }}
					</span>
				</p>
			</li>
			<li class="fr"><a href="tel:{{ d.shopInfoData.shop_tel }}" style="display:inline-block;height:50px"><img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/cibangphone_r2_c2.gif" width="41" height="51"></a></li>
		</ul>
		
		<div class="shopckdd_infotab02">
			<div class="td2">
				<span class="a1"><img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/dbponit_r3_c2.gif" width="29" height="41"></span>
				<div class="a2 poi1">{{d.shopInfoData.shop_addr}}</div>
				<span class="poi2 txtview_km">{{ (parseFloat(d.shopInfoData.distance/1000)).toFixed(2) }}km</span>
			</div>
		</div>
	</div>

<!-- ******* -->


</script>
<script type="text/html" id="productCommentTemp">

		<div class="shopckdd_dat shopckdd_datmun">
				<p class="tatle">产品详情</p>
				<p class="mb0">{{d.productInfo.product_content}}</p>
	        </div>
			{{# if(d.content) { }}
			  		<div class="bgbai pingjia_facebg mt20">
						<p class="cpyy_tatle">用户评价</p>
                         {{# for(var k= 0;k<d.content.length;k++) { }}
							{{# var productItem =d.content[k] }}
							<div class="pjed_shertop_main">
								<div class="pjed_shertop">

									{{# if( productItem.custom_img) { }}
									<p><img src="{{productItem.custom_img}}" width="130" height="130"></p>
                                    {{# }else { }}
									<p><img src="{{ d.webRoot}}/resources/images/img/defaults/staffHeadDefault3.png" width="130" height="130"></p>
                                    {{# } }}

									<p class="fz26">{{productItem.custom_name}}</p>
									<p class="a2 mt15">

								{{# for(var m=0;m<productItem.comment_score;m++){ }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
								{{# } }}
								{{# for(var n=0;n<(5-productItem.comment_score);n++){ }}
									<a><i class="icon-starbig icon-starbig01"></i></a>
								{{# } }}
 
									</p>
									<p class="fr fz22">{{productItem.comm_date.split(" ")[0]}}</p>
								</div>
								<p class="fz24 mt20">{{productItem.comm_text}}</p>
								{{# if(productItem.img_urls.length>0) { }}
								<ul class="pingjia_picupload pjed_picupload bgbai">
									{{# for(var j=0;j<productItem.img_urls.length;j++) { }}
                              			<li class="poi1"><a><img src="{{productItem.img_urls[j].img_urls1}}" width="97" height="99"></a></li>
                            		{{# } }}
								</ul>
                                 {{# } }}
								</div>
						 {{# } }}
				</div>
            {{# }else { }}
						
				 <div class="bgbai pingjia_facebg mt20">
					<p class="cpyy_tatle">用户评价</p>
		        	<div class="pingjia_nopj">暂无用户评价</div>
			   </div>
            {{# } }}
</script> 
 
 
<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/product/wx_product_sale_info.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 