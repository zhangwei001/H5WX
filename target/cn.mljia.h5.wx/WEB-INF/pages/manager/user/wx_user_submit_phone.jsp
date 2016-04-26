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



<div class="shopmanmain wx_guanlian bghui">
	<div class="wxyhyy_addudata bgbai mb40">
		<p><input name="username" type="text"  placeholder="请输入姓名" autocomplete="off" maxlength="10"></p>
		<p class="poi1"><input name="phone" type="text" placeholder="请输入手机号码" autocomplete="off"  maxlength="11"><a class="but0 but1  poi2" id="getVerifyCode" data-falg="0">获取验证码</a></p>
		<p><input name="verify" type="text" placeholder="请输入验证码" maxlength="6"></p>
	</div>
	
	<div class="zfsing_but">
		<a class="but0 wxyy_info_main_but1" id="submit_btn">提交</a>
	</div>
</div>



 

<!-- 外部js资源文件引入 -->

<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/wx_user_submit_phone.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 