<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
    .shophyk_end{display:none;}
    a{text-decoration:none}
</style>
</head>
<body data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken}">

<div class="shopmanmain wx_guanlian lh40 bghui" id="selectShopView">
	<!-- 渲染区域 -->
</div>


<script type="text/html" id="selectShopTemp">
    <div class="shopmanmain wx_guanlian bghui2 lh40" id="wxShopListTmpl">

        {{# for(var i = 0; i< d.content.length; i++) { }}
        {{# var item = d.content[i] }}
            <div class="selectshoper poi1"  data-click="true" data-shop-id="{{ item.shop_id }}" data-shop-name="{{item.shop_name}}">
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
<script src="<%=request.getContextPath()%>/resources/javascript/layer/laytpl/laytpl.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/wx_select_shop_index.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 