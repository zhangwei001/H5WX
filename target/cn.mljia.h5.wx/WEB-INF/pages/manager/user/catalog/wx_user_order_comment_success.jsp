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
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }" class="bgbai">

 
 
<div class="shopmanmain wx_guanlian wx_share_main ">

	<ul class="wx_share_ul">
		<li class="a1">Hi~评价成功啦!</li>
		<li class="a2">
			<p>您已获得<span id="commentGetCoin"></span>个美丽币,点击下方按钮</p>
			<p>分享到朋友圈可再得<span class="txtpink"><span id="sharedGetCoin"></span>个美丽币</span></p>
		</li>
		<li class="a3"><a class="wx_share_but" id="wxpjwcfx_but">分享即得美丽币</a></li>
	
	</ul>

</div>
 
 
<%-- <div class="shopmanmain wx_guanlian bghui">
	<ul class="wx_cgtsmain wxpjwc_tcmain">
		<li class="a3"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/pjed_icnon2.gif" width="59" height="59">评价成功,已经获得<span id="commentGetCoin"></span>个美丽币！</li>
		<li class="a4">
			<p>感谢您的评价！</p>
			<p class="txtred">分享到朋友圈，可再获得<span id="sharedGetCoin"></span>个美丽币哦~</p>
		</li>
	</ul>
	
	
	<p class=" wxpjwcfx_main">
		<a class="wxpjwcfx_but" id="wxpjwcfx_but">
		<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/wxsher_r4_c2.png" width="44" height="45">点击分享给朋友圈的小伙伴们吧~</a>
	</p>

</div> --%>


<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>

<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_order_comment_success.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 