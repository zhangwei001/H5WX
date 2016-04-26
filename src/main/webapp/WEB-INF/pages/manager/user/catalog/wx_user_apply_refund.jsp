<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<jsp:include  page="../../../layout_app/header.jsp" /> 
<title>申请退款</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />

<style>
.layermbox0 .layermchild {
max-width: none;
min-width: none;
width: 100%;
height: 100%;
background: none;
}
</style>
</head>
<body data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}"  data-shop-sid="${shop_sid}">



<script type="text/html" id="refundMoneyTemp">
	<div class="shopmanmain wx_guanlian bghui lh40">
	<ul class="wxyy_info_main poi1 fz30">
		<li>
			<p class="a1">退款金额</p>
			<p class="a2 pr77 txtpink">¥{{d.orderMoney}}</p>
		</li>
		<li>
			<p class="a1">退返方式</p>
			<p class="a2 pr77">返还微信钱包</p>
		</li>
	</ul>
	
	<ul class="wxyy_info_main fz30 pb10">
		<li class="tuikuang_tatle">
			<p class="a1">退款原因:</p>
			<p class="a2 pr77"></p>
		</li>
		<li class="wx_tkly ">
			<p class="a1">买多了/买错了</p>
			<p class="a2 pr77"><a><i class="icon-yhzifu"></i></a></p>
		</li>
		<li class="wx_tkly">
			<p class="a1">商家无时间，协商时间不合适</p>
			<p class="a2 pr77"><a><i class="icon-yhzifu"></i></a></p>
		</li>
		<li class="wx_tkly">
			<p class="a1">计划有变，没时间消费</p>
			<p class="a2 pr77"><a><i class="icon-yhzifu"></i></a></p>
		</li>
		<li class="wx_tkly">
			<p class="a1">后悔了，不想要了</p>
			<p class="a2 pr77"><a><i class="icon-yhzifu"></i></a></p>
		</li>
		<li class="wx_tkly">
			<p class="a1">其他原因</p>
			<p class="a2 pr77"><a><i class="icon-yhzifu"></i></a></p>
		</li>
	</ul>
	<div class="tuikung_txt_tise">注：请确认该消费码尚未被消费，再申请退款</div>
	<div class="zfsing_but">
		<a class="but0 wxyy_info_main_but1" id="applyRefundBtn">申请退款</a>
	</div>


</div>

</script>


<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_apply_refund.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 
