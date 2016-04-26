<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>支付成功</title>
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
 
 <style>
 a{text-decoration:none}
 </style>
 
</head>
<body data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken}">

<script type="text/html" id="paySuccessTmpl">
   
   
<div class="shopmanmain wx_guanlian bghui">
	{{#  if(d.wxPay ==1) {  }}
        <div class="wxyhyy_zfcgtise bgbai">
			<p><i class="icon-comped_zfcgtisr "></i>恭喜您支付成功</p>
		</div>

		<div class="wxyhyy_xfmtise bgbai">
			<p>您的消费码为：</p>
             {{# var smsString = d.content.order_sms }}
			<p class="xfm">{{smsString.substring(0,3)}}&nbsp;{{smsString.substring(3,6)}}&nbsp;{{ smsString.substring(6)}}</p>
		</div>

    {{# }else {  }}
		<div class="wxyhyy_cgtise bgbai">
			<p><i class="icon-comped_tisr_big"></i></p>
			<p>恭喜您预约成功</p>
		</div>
    {{# } }}
	<div class="wxyhyy_cgtise_but bgbai mb20">
         <a class="yyxfdat_but0 yyxfdat_but1 fl ml30" href=""  id="formPath">继续逛逛</a>

        <a class="yyxfdat_but0 yyxfdat_but2 fr mr30" href="{{d.webRoot}}/agent/manager-user-catalog-wx_user_order_info?commentStatus={{d.content.commentStatus}}&orderId={{d.orderSuccessData.order_id}}&shopId={{d.shopInfoData.shop_id}}&shopSid={{d.shopInfoData.s_id}}&orderStatus={{d.content.order_status}}">查看详情</a>
	</div>
	
	<div class="wxyhyy_cginfo bgbai">
		<p>预约时间：{{(d.content.pre_time)? d.content.pre_time : "无"}}</p>
		<p>预约员工：
					{{# for(var i=0;i<d.content.staff_names.length; i++){ }}
							{{# if(i<4){ }}	
									{{ d.content.staff_names[i] }}
									{{# if(!(i==(d.content.staff_names.length-1))){ }}
										;
									{{# } }}
							{{# } }}
							{{# }  }}
							{{# if(d.content.staff_names.length>3){ }}
								等 {{d.content.staff_names.length }}人
						{{# } }}

		</p>


		<p>订单编号：{{ d.content.order_no}}</p>
	</div>
</div>

</script>





<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/pay/wx_pay_success.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 