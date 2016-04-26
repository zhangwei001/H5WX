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

<div class="shopmanmain wx_guanlian bghui" id="shopStaffListView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>



<script type="text/html" id="refundDetailsTemp">
	
<div class="shopmanmain wx_guanlian bghui">

    {{# if(d.content.order_status==5) { }}
		<div class="Refund_main">
			<p class="tatle">退款已申请，正在处理中<br>预计3~10个工作日退款原路返回</p>

				<ul class="Refund_main_ul">
					<li class="Refund_0 Refund_01 pt54 Refund_a">申请退款</li>
					<li class="line txtpink">.....</li>
					<li class="Refund_0 Refund_02 pt40 Refund_a">后台系统<br>处理中</li>
					<li class="line">.....</li>
					<li class="Refund_0 Refund_03 pt54">退款成功</li>

				</ul>
		</div>
        {{# var orderSms = d.content.order_sms}}
		<div class="shopckdd_dat shopckdd_yyxfinfo shopckdd_btop">
			<p>消  费  码：{{orderSms.substring(0,3)}} {{orderSms.substring(3,6)}} {{orderSms.substring(6)}}（已作废）</p>
		</div>
    {{# }else if(d.content.order_status==6) { }}
	 	<div class="Refund_main">
			<p class="tatle"><i class="icon-comped_tisr"></i>退款成功</p>
			<ul class="Refund_main_ul">
				<li class="Refund_0 Refund_01 pt54 Refund_a">申请退款</li>
				<li class="line txtpink">.....</li>
				<li class="Refund_0 Refund_02 pt40 Refund_a">后台系统<br>处理中</li>
				<li class="line txtpink">.....</li>
				<li class="Refund_0 Refund_03 pt54 Refund_a">退款成功</li>
			</ul>
		</div>
		{{# var orderSms = d.content.order_sms}}
		<div class="shopckdd_dat shopckdd_yyxfinfo shopckdd_btop">
			<p>消  费  码：{{orderSms.substring(0,3)}} {{orderSms.substring(3,6)}} {{orderSms.substring(6)}}（已作废）</p>
		</div>
    {{# }else if(d.content.order_status==7) {  }}
			<div class="Refund_main">
				<p class="tatle">退款处理失败<br>请拨打客服400-788-9166</p>

				<ul class="Refund_main_ul">
					<li class="Refund_0 Refund_01 pt54 Refund_a">申请退款</li>
					<li class="line txtpink">.....</li>
					<li class="Refund_0 Refund_02 pt40 Refund_a">后台系统<br>处理中</li>
					<li class="line txtpink">.....</li>
					<li class="Refund_0 Refund_03 pt54 Refund_a">退款失败</li>
				</ul>

			</div>
		{{# var orderSms = d.content.order_sms}}
		<div class="shopckdd_dat shopckdd_yyxfinfo shopckdd_btop">
			<p>消  费  码：{{orderSms.substring(0,3)}} {{orderSms.substring(3,6)}} {{orderSms.substring(6)}}（已作废）</p>
		</div>
	{{# } }}

	<div class="bgbai">
		<ul class="shophyk_dat shopckdd_dat">
			<li class="a1 fl"><p><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/kaxiangtmp_r4_c2.png" width="130" height="130"></p></li>
			<li class="a2 fl">
				<p class="tatle"><span class="fl">{{ d.content.info }}</span></p>
				<p class="info">总价： <span class="txtpink">¥{{ d.content.order_pre_money }}
	   				  {{# if((d.content.card_type==2 || d.content.card_type==1) &&  d.content.type!=0 &&  d.content.type!=1) { }}
            			  (耗卡)
						{{# } }}
						{{# if(d.content.order_status==2){ }}
			 			 (定金)
					{{# } }}
    			</span></p>
				<p class="info">数量：{{ d.content.num }}</p>
  			 		{{# if(d.content.staff_names){ }}
						<p class="info">服务员工：
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
					{{# }  }}
		 </li>
	 </ul>
  </div>













<div class="shopckdd_dat shopckdd_shopinfo">
	<p class="shop_infotatle">商家信息</p>
	<ul class="shopckdd_infotab">
    	<a href="{{d.webRoot}}/agent/manager-shop-info-wx_shops_home?userId={{d.globalVar.userId}}&appId={{ d.globalVar.appId}}&openId={{d.globalVar.openId}}&shopId={{d.shopInfoObj.shop_id}}">
		<li class="fl">
			<p class="td1">
			<span class="tatle">{{ d.shopInfoObj.shop_name }}</span>
            <span class="pic">
             {{# if(d.shopInfoObj.shop_stars ==1) { }}
                   <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
             {{# } else if(d.shopInfoObj.shop_stars ==2){  }}
                    <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			{{# } else if(d.shopInfoObj.shop_stars ==3){  }}
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			{{# } else if(d.shopInfoObj.shop_stars ==4){  }}
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			{{# } else if(d.shopInfoObj.shop_stars ==5){  }}
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			
             {{# } }}
            </span>
			</p>
			<p class="td2">
				<span class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/dbponit_r3_c2.gif" width="29" height="41"></span>
				<span class="a2 poi1">{{ d.shopInfoObj.shop_addr }}<span class="poi2">{{ (Number(d.shopInfoObj.distance)/1000).toFixed(1) }}km</span></span>
			</p>
		</li>
   	 </a>
	 <li class="fr"><a   href="tel:{{ d.shopInfoObj.shop_tel }}" ><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/cibangphone_r2_c2.gif" width="41" height="51"></a></li>
  </ul>
</div>





	
<div class="shopckdd_dat shopckdd_datmun">
    <p class="tatle">订单信息</p>
    {{# if( d.content.order_status == 2 || d.content.order_status == 4 || d.content.order_status == 0 ||  d.content.order_status == 3 ) { }}
	<p>订单编号：{{d.content.order_no }}</p>
	<p>生成时间：{{d.content.order_time }}</p>
    {{# }else {  }}
	<p>订单编号：{{d.content.order_no }}</p>
	<p>生成时间：{{d.content.order_time }}</p>
     {{# } }}
</div>


</div>




</script>








<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/info/wx_user_refund_details.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 