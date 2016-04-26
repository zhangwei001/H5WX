<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../layout_app/header.jsp" /> 
<!-- 外部css资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
</head>
<body data-status="${status}" data-msg="${errorMsg}">


<script type="text/html" id="selectShopTmpl">
<div class="shopmanmain wx_guanlian bghui2 lh40">
	<p class="selects_tatle1">请选择您要加入的商家</p>
	<p class="selects_tatle2">只选择一家您开过卡的即可</p>
	{{# for(var i = 0; i< d.content.length; i++) { }}
       {{# var item = d.content[i] }}
	<div class="selectshoper poi1"  data-click="true" data-shop-id="{{ item.shop_id }}">
		<p class="a1"><span class="fl wordsbase box480">{{ item.shop_name }}</span><a  class="selebut fr "></a></p>
		<p class="a2"><img src="{{ d.webRoot }}/resources/images/meirong/shop/selectshopmen_02.gif" width="24" height="30">{{ item.shop_tel }}</p>
		<p class="a3 poi2">
		<span class="fl wordsbase inf01 "><img src="{{ d.webRoot }}/resources/images/meirong/shop/selectshopmen_03.gif" width="21" height="30">{{ item.shop_address }}</span>
		<span class="fl inf02">{{ (Number(item.distance)/1000).toFixed(1) }}km</span></p>
	</div>
     {{# } }}
</div>
</script>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/wx_select_shop_for_bind.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 