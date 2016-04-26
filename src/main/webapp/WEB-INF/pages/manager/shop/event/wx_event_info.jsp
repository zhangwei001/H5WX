<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>优惠促销</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/event/swiper.min.css" rel="stylesheet" type="text/css" />
<style>
	html, body {
		position: relative;
		height: 100%;
	}
	body {
		background: #eee;
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		font-size: 14px;
		color:#000;
		margin: 0;
		padding: 0;
	}
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
</style>

<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />

<style>
.shophyk_end{display:none;}a{text-decoration:none}
</style>

</head>
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }" data-shop-id="${shopId}">


<div class="shopmanmain wx_guanlian bghui lh40" id="promotionDetailsView">
		<!-- 渲染区域 -->
		<div class='loader loader--audioWave'></div>
</div>

<script type="text/html" id="promotionDetailsTemp">
   
	<div class="Discount_main mb10 ">
             <div class="content Discount_banner">
 					 <!-- Slider -->
  				<div class="swiper-container" data-space-between='10'>
   					 <div class="swiper-wrapper">
                          {{# for(var i=0;i<d.content.img_urls.length;i++ ) { }}
								 <div class="swiper-slide" style=" background-image:url({{ d.content.img_urls[i]}})"></div>
                           {{# } }}
   					 </div>
  				     <div class="swiper-pagination"></div>
 			    </div>
			</div>
		<div class="Discount_txt_main2">{{ d.content.describe}}</div>
	
	</div>
	
	<div class="Discount_sale_main">
     {{# if(d.content.items.length==1) { }}   
        {{# var promoDetailsItem =d.content.items[0]}}
		<ul class="shophyk_dat bgbai shophyk_Discount"  data-limit-time="{{d.content.limit_time }}" data-click="true" data-item-discounted-money="{{ promoDetailsItem.pre_price }}" data-item-id="{{ promoDetailsItem.item_id }}" data-card-type="{{ promoDetailsItem.card_type }}"  data-item-type="{{promoDetailsItem.item_type }}">
			<li class="a1 fl ">
				<a class="poi1 card_pic"><img src="{{ promoDetailsItem.item_img_url }}" width="130" height="130"></a>
			</li>
	
			<li class="a2 fl poi1">
				<p class="tatle">{{ promoDetailsItem.item_name}}</p>
				<p class="info mt10 txthui01">&nbsp;</p>
				<li class="Discount_sale_txt2"><p class="fl">¥{{ promoDetailsItem.pre_price}} </p><del class="fl">¥{{promoDetailsItem.item_price }}</del></li>
			</li>

		</ul>
    
     {{# }else {  }}

		{{# for(var i = 0;i<d.content.items.length;i++) { }}
        {{# var promoDetailsItem =d.content.items[i]}}
		  <ul class="Discount_sale_ul" data-click="true" data-limit-time="{{promoDetailsItem.limit_time }}"  data-item-discounted-money="{{ promoDetailsItem.pre_price }}"  data-item-id="{{ promoDetailsItem.item_id }}" data-card-type="{{ promoDetailsItem.card_type }}"  data-item-type="{{promoDetailsItem.item_type }}" >
			<li><a class="Discount_sale_img" style="background-image:url({{promoDetailsItem.item_img_url}})"></a></li>
			<li class="Discount_sale_txt1">{{ promoDetailsItem.item_name}}</li>
			<li class="Discount_sale_txt2"><p class="fl">¥{{ promoDetailsItem.pre_price}} </p><del class="fl">¥{{promoDetailsItem.item_price }}</del></li>
		  </ul>


        {{# } }}
	  {{# } }}
	</div>

</script>




<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/library/swiper.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/event/wx_event_info.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 