<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>优惠促销</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
 .shophyk_end{display:none;}a{text-decoration:none}
</style>
</head>
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bgbai lh40" id="shopServeView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
	
</div>


<script type="text/html" id="noCardListTemp">
<div class="bgbai">
	<ul class="shophyk_xfkinl shophyk_lookcp" id="tabs">
			<li data-item-nav="true" class="activ">卡项</li>
			<li class="line"></li>
			<li data-item-nav="true" >护理</li>
			<li class="line"></li>
			<li data-item-nav="true">产品</li>
	 </ul>
	
</div>
<p class="fz30 txtcenter" style="margin-top:150px">该商家暂无卡项呢~</p>
</script>
<script type="text/html" id="noMassageListTemp">
<div class="bgbai">
	<ul class="shophyk_xfkinl shophyk_lookcp" id="tabs">
			<li data-item-nav="true">卡项</li>
			<li class="line"></li>
			<li data-item-nav="true" class="activ">护理</li>
			<li class="line"></li>
			<li data-item-nav="true">产品</li>
		</ul>
	
</div>
<p class="fz30 txtcenter" style="margin-top:150px">该商家暂无护理呢~</p>
</script>
<script type="text/html" id="noProcudtListTemp">
<div class="bgbai">
		<ul class="shophyk_xfkinl shophyk_lookcp" id="tabs">
			<li data-item-nav="true">卡项</li>
			<li class="line"></li>
			<li data-item-nav="true">护理</li>
			<li class="line"></li>
			<li data-item-nav="true" class="activ">产品</li>
		</ul>
	
</div>
<p class="fz30 txtcenter" style="margin-top:150px">该商家暂无产品呢~</p>
</script>
<script type="text/html" id="cardListTemp">
<div class="share_wxtop_main">
<div class="share_wxtop">

<p class="fl">关注我们，享更多低价折扣哦~</p>

<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>

</div>
</div>
<div style="width: 100%;height: 10px; margin-top:-20px" class="bghui"></div>
      <div class="bgbai">
		<ul class="shophyk_xfkinl shophyk_lookcp" id="tabs">
			<li data-item-nav="true" class="activ">卡项</li>
			<li class="line"></li>
			<li data-item-nav="true" >护理</li>
			<li class="line"></li>
			<li data-item-nav="true">产品</li>
		</ul>
	    
	    {{# for(var i=0;i<d.content.length;i++) { }}
			{{#  var cardItem =   d.content[i] }}
			<ul class="shophyk_dat shophyk_xxxjtj" data-click="true" data-card-id="{{ cardItem.cardtype_id}}" data-item-id="{{ cardItem.cardtype_id }}" data-card-type="{{cardItem.card_type}}" data-shop-id="{{ d.urlData.shopId}}">
				<li class="a1 fl ">
					<a class="poi1 card_pic"><img src="{{ cardItem.cardtype_img_url }}" width="130" height="130">
						{{# if( cardItem.card_type ==0 ) { }}
							<p class="poi2 card_txt">次卡</p>
                    	{{# }else if(cardItem.card_type ==1) {  }}
							<p class="poi2 card_txt">储值卡</p>
                    	{{# } }}
					</a>
				</li>
			
				<li class="a2 fl poi1">
					<p class="tatle">{{ cardItem.cardtype_name }}</p>
                    {{# if(cardItem.card_type ==0) { }}
					<p class="info mt10 txthui01">次数：{{  (cardItem.massage_times==-1)? "无限次" : cardItem.massage_times }}</p>
                    {{# }else if(cardItem.card_type ==1) { }}
						<p class="info mt10 txthui01">价值：{{cardItem.card_store_money}}
							{{cardItem.card_store_money==cardItem.cardtype_price ? "":"(含赠送)"}}
						</p>
                    {{# } }}
					<p class="info mt20"><span class=" txtpink fz30">¥{{cardItem.cardtype_price }}</span><span class="fr txthui03 fz20">已售 {{cardItem.cardtype_num}}</span></p>
					<p class="poi2"><a><img src="{{ d.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34"></a></p>
				</li>
		
			</ul>
            

        {{# } }}
		
	</div>
		


</script>

<script type="text/html" id="massageListTemp">
<div class="share_wxtop_main">
<div class="share_wxtop">

<p class="fl">关注我们，享更多低价折扣哦~</p>

<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>

</div>
</div>
<div style="width: 100%;height: 10px; margin-top:-20px" class="bghui"></div>
<div class="bgbai">

	<ul class="shophyk_xfkinl shophyk_lookcp" id="tabs">
		<li data-item-nav="true">卡项</li>
		<li  class="line"></li>
		<li  data-item-nav="true" class="activ">护理</li>
		<li class="line"></li>
		<li  data-item-nav="true"  >产品</li>
	</ul>
	
	{{# for(var i=0;i<d.content.length;i++) { }}
      {{# var massageItem = d.content[i]}}
		<ul class="shophyk_dat shophyk_xxxjtj" data-click="true" data-massage-id="{{ massageItem.massage_id}}" data-item-id="{{ massageItem.massage_id }}" data-shop-id="{{ d.urlData.shopId}}">
			<li class="a1 fl ">
				<a class="poi1 card_pic"><img src="{{ massageItem.massage_img_url }}" width="130" height="130"></a>
			</li>
		
			<li class="a2 fl poi1" >
				<p class="tatle">{{massageItem.massage_name}}</p>
				<p class="info mt10 txthui01">耗时：{{massageItem.massage_time}}分钟</p>
				<p class="info mt20"><span class=" txtpink fz30">￥{{massageItem.massage_price}}</span><span class="fr txthui03 fz20">已售 {{massageItem.massage_sales_num}}</span></p>
				<p class="poi2"><a><img src="{{ d.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34"></a></p>
			</li>
		</ul>
    {{# } }}
	
</div>

</script>


<script type="text/html" id="productListTemp">
<div class="share_wxtop_main">
<div class="share_wxtop">

<p class="fl">关注我们，享更多低价折扣哦~</p>

<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>

</div>
</div>
<div style="width: 100%;height: 10px; margin-top:-20px" class="bghui"></div>
<div class="bgbai">

	<ul class="shophyk_xfkinl shophyk_lookcp" id="tabs">
		<li data-item-nav="true">卡项</li>
		<li class="line"></li>
		<li data-item-nav="true">护理</li>
		<li class="line"></li>
		<li data-item-nav="true" class="activ">产品</li>
	</ul>
	
	{{# for(var i=0;i<d.content.length;i++) { }}
      {{# var productItem = d.content[i]}}
          <ul class="shophyk_dat shophyk_xxxjtj" data-click="true" data-product-id="{{ productItem.product_id}}"  data-item-id="{{ productItem.product_id }}" data-shop-id="{{ d.urlData.shopId}}">
			<li class="a1 fl ">
				<a class="poi1 card_pic"><img src="{{productItem.product_img_url}}" width="130" height="130"></a>
			</li>
			<li class="a2 fl poi1">
				<p class="tatle">{{productItem.product_name.substring(0,9)}}</p>
				<p class="info mt10 txthui01">规格:{{productItem.product_capacity}}</p>
				<p class="info mt20"><span class=" txtpink fz30">￥{{productItem.product_price}}</span><span class="fr txthui03 fz20">已售 {{productItem.product_sales_num}}</span></p>
				<p class="poi2"><a><img src="{{ d.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34"></a></p>
			</li>
		</ul>
	{{# } }}

</div>


</script>



<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/share/wx_item_list_share.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 