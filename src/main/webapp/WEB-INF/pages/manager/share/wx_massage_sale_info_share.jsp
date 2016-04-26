<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../layout_app/header.jsp" /> 
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
	<div class='loader loader--audioWave'></div>
</div>

<script type="text/html" id="massageSaleTemp">
<div class="share_wxtop_main">
<div class="share_wxtop">

<p class="fl">关注我们，享更多低价折扣哦~</p>

<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>

</div>
</div>
<div style="width: 100%;height: 10px; margin-top:-20px" class="bghui"></div>
		 <div class="wx_products_windows poi1" style="background-image:url({{d.content.massage_img_url}})">
			  {{# if(d.activityId>0) { }}
					<p class="poi2 wx_top_shenyu"><i class="icon-topshenyu"></i>仅剩{{d.limitTime}}</p>
              {{# } }}
			<p class="poi2 wx_products_wtxt"><span class="fl fz30">{{d.content.massage_name}}</span> 
            <span class="fr fz24"><a class="wxtx_products_but1">已售{{ d.content.massage_sales_num}}</a></span></p>
		 </div>
		
		 <div class="wx_share_Price mt30">
				<p class="fl"><span class="fz30">原价:¥</span><span class="fz40">{{d.content.massage_price.toString().split(".")[0]}}.</span><span class="fz24">{{d.content.massage_price.toString().split(".")[1]}}</span></p>

				<p class="fr"><a class="wxtx_products_but2 fz30">立即关注</a></p>

				<p class=" fr"><a class="wx_share_PriceBut fz30">关注立减</a></p>

		 </div>

	   </div>
	<div class="wx_products_tise">
		<p><i class="icon-products_pas"></i>支持随时退款</p>
		<p><i class="icon-products_pas"></i>支持过期退款</p>
	</div>
	
   {{# if(d.activityId && d.activityId>0 ){ }}
		<div class="shopckdd_dat shopckdd_datmun">
			<p class="tatle">优惠描述</p>
			<p>{{d.activityInfo.describe}}</p>
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

<script type="text/html" id="massageCommentTemp">
		<div class="shopckdd_dat shopckdd_datmun">
				<p class="tatle">护理详情</p>
				<p>{{ d.massageInfo.massage_introduction}}</p>
	    </div>
            {{# if( d.content) { }}
				<div class="bgbai pingjia_facebg mt20">
						<p class="cpyy_tatle">用户评价</p>
                         {{# for(var i=0;i<d.content.length;i++) { }}
                           {{# var massageItem = d.content[i]}}
								<div class="pjed_shertop">
									<p><img src="{{ massageItem.custom_img }}" width="130" height="130"></p>
									<p class="fz26">{{ massageItem.custom_name }}</p>
									<p class="a2 mt15">

								{{# for(var m=0;m<massageItem.comment_score;m++){ }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
								{{# } }}
								{{# for(var n=0;n<(5-massageItem.comment_score);n++){ }}
									<a><i class="icon-starbig icon-starbig01"></i></a>
								{{# } }}
  
									</p>
									<p class="fr fz22">{{massageItem.comm_date.split(" ")[0]}}</p>
								</div>
								<p class="fz24 mt20">{{ massageItem.comm_text}}</p>
                               {{# if(massageItem.img_urls.length>0) { }}
								<ul class="pingjia_picupload pjed_picupload bgbai">
									 {{# for(var k=0;k<massageItem.img_urls.length;k++) { }}
                               		   <li class="poi1"><a><img src="{{massageItem.img_urls[k].img_urls1}}" width="97" height="99"></a></li>
                            		{{# } }}
								</ul>
                               {{# } }}
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
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/share/wx_massage_sale_info_share.js"></script>

<jsp:include  page="../../layout_app/footer.jsp" /> 