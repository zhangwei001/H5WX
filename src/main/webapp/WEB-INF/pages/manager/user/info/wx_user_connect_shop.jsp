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



<div class="shopmanmain wx_guanlian bghui2 lh40" id="shopListView">

</div>
<script type="text/html" id="shopListTemp">
    {{# for(var i = 0; i<d.content.length;i++) { }}
       {{#  var item = d.content[i] }}
            
        <div class="selectshoper contshoper poi1">
		  <ul class="selectzxul">
			<li class="li01 fl"><p class="a1"><span class="wordsbase box480">{{ item.shop_name }}</span></p>
				<p class="a2">{{ item.shop_tel }}</p>
				<p class="a3">{{ item.shop_address}}</p>
			</li>
			<li class="li02 fl"><a  href="tel:{{ item.shop_tel }}" ><img src="{{ d.webRoot }}/resources/images/meirong/shop/shopphone_r2_c2.gif" width="41" height="51"></a></li>
		 </ul>
	   </div>

    {{# } }}
    
</script>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/info/wx_user_connect_shop.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 