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
 <a href="#" onclick="WeiXinAddContact('gh_8933fdfd6a3b')">关注</a>
</div>







<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/info/wx_user_contact_wxpub.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 