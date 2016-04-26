<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>优惠促销</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
 .shophyk_end{display:none;}a{text-decoration:none}
</style>
</head>
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bgbai lh40" id="recommendationView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
	
</div>




<script type="text/html" id="recommendationTemp">
    {{# for(var i = 0;i<d.content.length;i++) { }}
    {{# var recommendationItem =d.content[i] }}
        {{# if(recommendationItem.flag==0) { }}
			    <ul class="shophyk_dat shophyk_xxxjtj" data-click="true" data-card-type="{{recommendationItem.card_type}}" data-item-type="{{recommendationItem.flag}}" data-item-id="{{recommendationItem.id}}">
					<li class="a1 fl ">
						<a class="poi1 card_pic"><img src="{{ recommendationItem.img_url}}" width="130" height="130"><p class="poi2 card_txt">卡项</p></a>
					</li>
					<li class="a2 fl poi1">
						<p class="tatle">{{recommendationItem.item_name}}</p>
						{{# if(recommendationItem.card_type==0){ }}
							<p class="info mt10 txthui01">次数：{{recommendationItem.total_count||0}}</p>
						{{# }else{ }}
								{{# if((Number(recommendationItem.price)-Number(recommendationItem.card_store_money))==0){ }}
										<p class="info mt10 txthui01">价值：{{recommendationItem.card_store_money}}</p>
								{{# }else{ }}
										<p class="info mt10 txthui01">价值：{{recommendationItem.card_store_money}}(含赠送)</p>
								{{# } }}			
						{{# } }}
						<p class="info mt20"><span class=" txtpink fz30">¥{{recommendationItem.price}}</span></p>
						<p class="poi2"><a><img src="{{ d.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34"></a></p>
					</li>
		 		</ul>
        {{# }else if(recommendationItem.flag==1) { }}
				<ul class="shophyk_dat shophyk_xxxjtj" data-click="true" data-item-type="{{recommendationItem.flag}}" data-item-id="{{recommendationItem.id}}">
					<li class="a1 fl ">
						<a class="poi1 card_pic"><img src="{{recommendationItem.img_url}}" width="130" height="130"></a>
					</li>
					<li class="a2 fl poi1">
						<p class="tatle">{{ recommendationItem.item_name }}</p>
						<p class="info mt10 txthui01">耗时：{{recommendationItem.massage_time}}分钟</p>
						<p class="info mt20"><span class=" txtpink fz30">¥{{recommendationItem.price}}</span></p>
						<p class="poi2"><a><img src="{{ d.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34"></a></p>
					</li>
		        </ul>
        {{# }else if(recommendationItem.flag==2){ }}
				<ul class="shophyk_dat shophyk_xxxjtj" data-click="true" data-item-type="{{recommendationItem.flag}}" data-item-id="{{recommendationItem.id}}">
					<li class="a1 fl ">
						<a class="poi1 card_pic"><img src="{{recommendationItem.img_url}}" width="130" height="130"></a>
					</li>
					<li class="a2 fl poi1">
						<p class="tatle">{{ recommendationItem.item_name }}</p>
						<p class="info mt10 txthui01">规格：{{recommendationItem.product_capacity}}</p>
						<p class="info mt20"><span class=" txtpink fz30">¥{{recommendationItem.price}}</span></p>
						<p class="poi2"><a><img src="{{ d.webRoot}}/resources/images/meirong/shop//arrow_r4_c4.gif" width="20" height="34"></a></p>
					</li>
				</ul>
        {{# } }}
	  
    {{# } }}
    <ul class="morereco morereco_bortop" id="checkAllServe">
			<li><a >查看全部服务分类<i class="icon-shoppdown"></i></a></li>
    </ul>
</script>

<script type="text/html" id="noRecommendationTemp">
	<div class="shopmanmain wx_guanlian">
		<ul class="wx_nocardmain wx_notuijian">
			<li class="a1 "><img src="{{ d.webRoot}}/resources/images/meirong/shop/noyouhui_mm.gif" width="125" height="285"></li>
			<li class="a2">诶？商家暂无推荐，去看看其它服务吧~</li>
	 		<li class="a3"><a class="but0 but2" id="checkAllServe">查看所有服务</a></li>
	 	</ul>
   </div>
</script>




<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/advice/wx_shop_advice.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 