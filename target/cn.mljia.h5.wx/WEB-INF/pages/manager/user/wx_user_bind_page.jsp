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


<div class="shopmanmain wx_guanlian bghui" id="pageView" style="display:none">
	<!-- 渲染区域 -->
	<div class="shopmanmain wx_guanlian wxgl_input_plus">
		<div class="wxgl_txt01">
			<p class="tatle"><span class="txtpink">加入商家享受更多服务</span></p>
			<p>请提供以下信息，以便与商家进行匹配</p>
		</div>
		<ul class="wxgl_input wxgl_input_box ">
			<li  class=" txtcenter"><input name="username" type="text" placeholder="请您的姓名" autocomplete="off" maxlength="10"></li>
			<li class=" txtcenter"><input name="phone" type="text" placeholder="手机号码" autocomplete="off"  maxlength="11"></li>
			<li><span class="fl"><input name="verify" type="text" class="input2" placeholder="验证码" maxlength="6"></span><span class="fr  mr10 mt11" ><a type="button" class="but0 but1 butp" id="getVerifyCode" data-falg="0" value="获取验证码">获取验证码</a></span></li>
		</ul>
	    <ul class="wxgl_input ">
			<li class="clear mt50"><a class="but0 but2" id="submit_btn">提交</a></li>
		</ul>
	</div>

</div>






<script type="text/html" id="bindSuccessTmpl" title="用户信息已提交，且用户已关联  状态值200">
<div class="shopmanmain wx_guanlian">
<ul class="wx_cgtsmain">
<li class="a1"><img src="{{ d.webRoot }}/resources/images/meirong/shop/tjcj_r2_c2.png" width="244" height="244"></li>
<li class="a2">恭喜您加入成功</li>
<li class="a3">点击左上角按钮，前往查看前往<br>查看【我的】详情吧</li>
</ul></div>
</script>

<script type="text/html" id="submitSuccessTmpl" title="用户信息已提交，但是未关联  状态值29">
<div class="shopmanmain wx_guanlian">
<ul class="wx_cgtsmain">
<li class="a1"><img src="{{ d.webRoot }}/resources/images/meirong/shop/tjcj_r2_c2.png" width="244" height="244"></li>
<li class="a2">加入商家审核中</li>
<li class="a3">加入商家审核通过后即可查看该信息，请耐心等待<br/>联系商家，可加快审核速度哦~</li>
</ul></div>
</script>



 

<!-- 外部js资源文件引入 -->

<%-- <script src="<%=request.getContextPath()%>/resources/javascript/library/timePlugIn/sm.js"></script> --%>
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>


<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/wx_user_bind_page.js"></script>


<jsp:include  page="../../layout_app/footer.jsp" /> 