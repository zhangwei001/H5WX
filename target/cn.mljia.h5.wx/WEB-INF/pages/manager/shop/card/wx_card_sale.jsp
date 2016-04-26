<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/javascript/library/picker/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/javascript/mobiscroll/css/mobiscroll-2.5.2.css?v=1" rel="stylesheet" type="text/css" />

<style>
	a{text-decoration:none}
	.pickerinput{
		height: 89px;
		background: none;
		font-size: 30px;
		padding-right: 34px;
		margin-right: -34px;
		position: absolute;
		top: 0;
		right: 45px;
		z-index: 10;
		cursor: pointer;
	}
	input:focus{border:none;}
	.picker-items-col.picker-items-col-center{width:100%}
</style>
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">


<div class="shopmanmain wx_guanlian bghui lh40" id="reserveView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>

<script type="text/html" id="reserveCardTemp">
	<ul class="wxyy_info_main poi1 fz30">
		<li>
			<p class="a1">项目名称</p>
			<p class="a2 pr30 poi2 wordsbase">{{d.content.cardtype_name}}</p>
		</li>
		{{# if(d.cardType == 1) { }}
		<li>
			<p class="a1">赠送金额</p>
			<p class="a2 pr30" id="giveMoney" data-item-money="{{d.content.give_money}}">¥{{d.content.give_money.toFixed(2)}}</p>
		</li>
		{{# } }}
          <li id="reserveTimeLi">
			
			<p class="a2 pr30">
					  <div class="page page-current " id='page-datetime-picker' >
        				<div class="content" >
          					
         						 <div class="content-block ">
          							  <div class="list-block ">
          							    <ul>
             							   <!-- Text inputs -->
             							   <li>
                						   		<div class="item-content">
                    					  	 		<div class="item-inner" style="position:relative">
                      									<div class="item-title label fz30 ">预约时间</div>
                     					 				<div class="item-input mr0" style="position:absolute;top:0;right:0;width:90%;text-align:left;">
                                                            {{# if(d.activityId && d.activityId !="null" && d.activityId>0 ) { }}
                       					 					<input type="text"  style=" right:45px;" id='datetime-picker' readonly placeholder="可选"/><i class="icon-yyifarrow_r"  style="position: absolute;right: 10px;top: 22px;"></i>
                      						 			    {{# }else { }}
															<input   id='datetime-picker' style=" right:45px;" readonly placeholder="请选择时间"/><i class="icon-yyifarrow_r"  style="position: absolute;right: 10px;top: 22px;"></i>
 															{{# } }}
														</div>
                    					  			</div>
                 							 	</div>
                							</li>
              							</ul>
           							 </div>
         						 </div>
       						 </div>
    					</div>
			</p>
		
		</li>

     

	   <li>
             
       		<div id="page-picker" class="page page-current" style="position:relative;top:-5px;">
       			<div class="content-block">
        			 <div class="list-block staff_change">
        				 <ul>
            				 <li>
               					<div class="item-content">
                 					<div class="item-inner"  style="position:relative">
                 						<div class="item-title label fz30 " >预约员工</div>
                   						<div class="item-input" style="margin-right:0px;position:absolute;top:0;right:0;width:90%;text-align:left;">
                     						<input class="pickerinput" style="z-index:0" type="text" data-staff-id placeholder="可选" id="picker" readonly><i style="position: absolute; top:25px; right:10px" class="icon-yyifarrow_r"></i>
                   						</div>
                 					</div>
               					</div>
            				 </li>
          				 </ul>
       				  </div>
      			</div>
    		</div>

		
		</li>


		
		<li class="change_number">
			<p class="a1"><span class="fl">共</span><span class="ml58 fl">计</span></p>
            {{# if(d.activityId && d.activityId >0 ) { }}
				<p class="a2 pr30 txtpink" id="orderMoney" data-item-money="{{ d.discountedMoney}}" >¥{{ d.discountedMoney}}</p>
            {{# }else { }}
				<p class="a2 pr30 txtpink" id="orderMoney" data-item-money="{{ d.content.price}}" >¥{{ d.content.price}}</p>
            {{# } }}
			
		</li>
	
	
	</ul>
	
	<ul class="wxyy_info_main fz30">
	<!--
		<li>
			<p class="a1">支付方式</p>
			<p class="a2 pr77"></p>

		</li>
    -->
		<li class="wx_yhzifu" data-order-way="6" >
			<p class="a1">微信支付</p>
			<p class="a3">{{(d.activityId && d.activityId>0)?'优惠中的项目仅支持在线购买':''}}</p>
			<p class="a2 pr77"><a><i class="icon-yhzifu icon-yhzifu_activ"></i></a></p>

		</li>
		{{# if(!(d.activityId && d.activityId>0)){ }}
		<li class="wx_yhzifu" data-order-way ="0">
			<p class="a1">到店支付</p>
			<p class="a3"></p>
			<p class="a2 pr77"><a><i class="icon-yhzifu"></i></a></p>
		</li>
		{{# } }}
		<li class="wx_products_li">
			<div class="wx_products_tise">
				<span class="mr50"><i class="icon-products_pas"></i>支持随时退款</span>
				<span><i class="icon-products_pas"></i>支持过期退款</span>
			</div>
		</li>
	
	</ul>
	
	
	<ul class="wxyy_info_main fz30">
        {{# if(d.bindedPhone) { }}
		<li class="wxyy_info_phone">
			<p class="a1">已绑定手机号</p>
			<p class="a2 pr30" >{{d.bindedPhone}}</p>
		</li>
        {{# }else { }}
		<li class="poi1" id="getPersonInfo">
			<p class="a1 poi2 no_phone_number"><i class="icon-no_phone"></i>为了更好的服务，请完善个人信息</p>
			<p class="a2 pr30"><a class=" txthui01"><i class="icon-yyifarrow_r"></i></a></p>
		</li>
        {{# } }}
	</ul>
	

	<div class="zfsing_but">
	    {{# if(d.activityId && d.activityId>0 ) { }}
            {{# if(d.bindedPhone) { }}
				<a class="but0 wxyy_info_main_but2" id="makeOrderBtn">确认</a>
            {{# }else { }}
				<a class="but0 wxyy_info_main_but1" id="makeOrderBtn">确认</a>
            {{# } }}
        {{# }else { }}
			<a class="but0 wxyy_info_main_but1" id="makeOrderBtn">确认</a>
        {{# } }}

	</div>


</script>

 

<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/mobiscroll/js/mobiscroll-2.5.2.js?v=1"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/library/picker/picker.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/card/wx_card_sale.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 