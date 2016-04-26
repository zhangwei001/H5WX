<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
    <jsp:include  page="../../../layout_app/header.jsp" />
    <!-- 外部CSS资源文件引入 -->
	<link href="<%=request.getContextPath()%>/resources/javascript/library/picker/base.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/resources/javascript/mobiscroll/css/mobiscroll-2.5.2.css?v=1" rel="stylesheet" type="text/css" />
    <style>
    a{text-decoration:none}
.hidden{display:none}
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


    <script type="text/html" id="reserveMassageTemp" title="三期">
    <ul class="wxyy_info_main poi1 fz30">
    <li>
    <p class="a1">项目名称</p>
    <p class="a2 pr30 poi2 wordsbase">{{ d.content.massage_name.substring(0,16)}}</p>
</li>

<li id="reserveTimeLi">
    <p class="a2 pr30">
    <div class="page page-current " id='page-datetime-picker' >
    <div class="content">

    <div class="content-block">
    <div class="list-block">
    <ul>
    <!-- Text inputs -->
<li>
<div class="item-content">
    <div class="item-inner" style="position:relative">
    <div class="item-title label a1">预约时间</div>
    <div class="item-input mr0" style="position:absolute;top:0;right:23px;width:90%;text-align:left;">
    <input type="text" placeholder="请选择时间"   style=" float:right;"  id='datetime-picker' readonly /><i class="icon-yyifarrow_r"  style="position: absolute; top:25px; right:10px"></i>
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
    <div id="page-picker" class="page page-current" >
    <div class="content-block">
    <div class="list-block">
    <ul>
    <li>
    <div class="item-content">
    <div class="item-inner"  style="position:relative">
    <div class="item-title label a1">预约员工</div>
    <div class="item-input" style="margin-right:0;position:absolute;top:0;right:23px;width:90%;text-align:left;">
    <input   class="pickerinput" style="z-index:0"   type="text" data-staff-id=0 placeholder="可选" id="picker" readonly=""><i style="position: absolute; top:25px; right:10px"   class="icon-yyifarrow_r"></i>
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
     <p class="a1"><span class="fl">数</span><span class="ml58 fl">量</span></p>
<p class="a2 pr30">
    <span class="fr"><a  id="addNumBtn"><i class="icon-yyifplus " ></i></a></span>
    <span class="fr change_number_txt" id="reservNums">1</span>
    <span class="fr"><a id="subNumBtn"><i class="icon-yyifminus icon-yyifminus_a" ></i></a></span>
    </p>
    </li>

    <li class="change_number">
     <p class="a1"><span class="fl">共</span><span class="ml58 fl">计</span></p>
{{# if(d.activityId && d.activityId >0) { }}
<p class="a2 pr30 txtpink" id="orderMoney" data-item-money="{{ d.discountedMoney}}" >¥{{ d.discountedMoney}}</p>
{{# }else { }}
<p class="a2 pr30 txtpink" id="orderMoney" data-item-money="{{ d.content.massage_price}}" >¥{{ d.content.massage_price}}</p>
{{# } }}
</li>


</ul>


<ul class="wxyy_info_main fz30">
  {{# if(!(d.activityId && d.activityId>0) && d.sortSupportCard.length>0){ }}
    <li>
    <p class="a1">支付方式</p>
    <p class="a2 pr77"></p>
    </li>

   
<!-- 来源优惠活动则隐藏耗卡支付 -->

<li class="wx_yhzifu">
    <p class="a1">耗卡支付</p>
    <p class="a3"></p>
    <p class="a2 pr77"><a id="flodBtn"><i class="icon-useup_down"></i></a></p>
    </li>

    <li class="wx_card_useup_main" >
    {{# for(var i=0;i<d.sortSupportCard.length;i++) { }}
{{# var cardItem =d.sortSupportCard[i] }}
<ul class="wx_card_useup" data-card-id="{{cardItem.card_id}}" data-type-id="{{cardItem.key_id}}" data-is-pre="{{cardItem.is_pre}}" data-card-type="{{cardItem.card_type}}">
    <li class="td1">
    <p class="tatle01">{{ cardItem.card_name}}</p>
{{# if(cardItem.card_type==1) { }}
<p class="tatle02 clear">卡内余额:{{cardItem.card_money}}（该护理享{{cardItem.card_off}}折）</p>
{{# }else if(cardItem.card_type==0) { }}
<p class="tatle02 clear">卡内包含:{{d.content.massage_name}}X{{cardItem.num}}</p>
{{# } }}
</li>
<li class="td2"><a class="selectBtn"  data-item-discount="{{cardItem.card_off}}" data-total-num="{{cardItem.num}}" data-card-money="{{ cardItem.card_money}}" data-is-pre="{{cardItem.is_pre}}" data-card-type="{{cardItem.card_type}}"   data-type-id="{{cardItem.key_id}}" data-card-id="{{cardItem.card_id}}"><i class="icon-yhzifu "></i></a></li>
    </ul>
    {{# } }}
</li>
{{# } }}

{{# if(d.activityId && d.activityId>0 && d.from!='card'){ }}
    <!-- 来源优惠活动并且不是来源耗卡 -->
<li class="wx_yhzifu" data-order-way="6">
    <p class="a1">微信支付</p>
    <p class="a3">{{(d.activityId && d.activityId>0)?'优惠中的项目仅支持在线购买':''}}</p>
<p class="a2 pr77"><a ><i class="icon-yhzifu "></i></a></p>
    </li>
    {{# } }}

{{# if(!(d.activityId && d.activityId>0)&& d.from!='card'){ }}
    <!-- 来源优惠活动则隐藏线下支付 -->
<li class="wx_yhzifu" data-order-way="6">
    <p class="a1">微信支付</p>
    <p class="a3">{{(d.activityId && d.activityId>0)?'优惠中的项目仅支持在线购买':''}}</p>
<p class="a2 pr77"><a ><i class="icon-yhzifu "></i></a></p>
    </li>

    <li class="wx_yhzifu" data-order-way="0">
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
    <a class="but0 wxyy_info_main_but1" id="makeOrderBtn">确认</a>
    </div>


    </script>


    <script type="text/html" id="makeCardOrderTemp" title="二期">
    <ul class="wxyy_info_main poi1 fz30">
        <li>
          <p class="a1">项目名称</p>
          <p class="a2 pr30 poi2 wordsbase" style="max-width:270px">{{d.massageInfo.massage_name}}</p>
        </li>
<!--	
		<li class="change_number">
			 <p class="a1"><span class="fl">数</span><span class="ml58 fl">量</span></p>
			<p class="a2 pr30"><span class="fr"><a id="addNumBtn"><i class="icon-yyifplus "></i></a></span>
			<span class="fr change_number_txt" id="reservNums">1</span>
			<span class="fr"><a id="subNumBtn"><i class="icon-yyifminus icon-yyifminus_a"></i></a></span></p>
			
		</li>
-->		
		
		{{# if(d.shopLisNum>=2){ }}
		 <li>
			<p class="a1" style="width: 120px;">预约商家</p>
			<p class="a2 pr30" style="width: 400px;">
				<span class="fr shopname00">
				<i class="icon-yyifarrow_r"></i>  
				</span>
                <a href id="yuyueShopLink" style="width:250px">
					<span class="wordsbase fr shopname00 shopname01">{{ d.shopInfoData.shop_name}}</span>
                </a>
			</p>
		 </li>	
        {{# } }}
		

<li id="reserveTimeLi">


    <p class="a2 pr30">
    <div class="page page-current " id='page-datetime-picker' >
    <div class="content">

    <div class="content-block">
    <div class="list-block">
    <ul>
    <!-- Text inputs -->
<li>
<div class="item-content">
    <div class="item-inner"  style="position:relative">
    <div class="item-title label a1">预约时间</div>
    <div class="item-input mr0" style="position:absolute;top:0;right:0;width:90%;text-align:left;">
    <input type="text" placeholder="请选择时间"   style=" float:right;right:70px;"  id='datetime-picker' readonly /><i class="icon-yyifarrow_r"  style="position: absolute; top:25px; right:30px"></i>
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


    <div id="page-picker" class="page page-current" >
    <div class="content-block">
    <div class="list-block">
    <ul>
    <li>
    <div class="item-content">
    <div class="item-inner"  style="position:relative">
    <div class="item-title label a1">预约员工</div>
    <div class="item-input" style="margin-right:0;position:absolute;top:0;right:0;width:90%;text-align:left;">
    <input  class="pickerinput" style='right:70px;z-index:0'  type="text" data-staff-id=0 placeholder="可选" id="picker" readonly=""><i style="position: absolute; top:25px; right:30px"   class="icon-yyifarrow_r"></i>
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
			 <p class="a1"><span class="fl">数</span><span class="ml58 fl">量</span></p>
			<p class="a2 pr30"><span class="fr"><a id="addNumBtn"><i class="icon-yyifplus "></i></a></span>
			<span class="fr change_number_txt" id="reservNums">1</span>
			<span class="fr"><a id="subNumBtn"><i class="icon-yyifminus icon-yyifminus_a"></i></a></span></p>
			
	</li>
<!--
    <li>
    	<p class="a1">护理时长</p>
  		  <p class="a2 pr30">{{d.massageInfo.massage_time}}分钟</p>
	</li>
-->
<!--
{{# if(d.cardDetailsInfo.cardType == 1 ){ }}
{{# if(d.isGiven != 1) { }}
<li>
<p class="a1">折扣</p>
    <p class="a2 pr77">{{d.itemDiscount}}折</p>
</li>
{{# } }}



{{# } }}
-->




</ul>

<ul class="wxyy_info_main fz30">

    <li>
    <p class="a1">支付方式</p>

    <p class="a2 pr30">耗卡</p>

    </li>
<!--
    <li>
   	     <p class="a1">消耗卡项</p>
   		 <p class="a2 pr30">{{d.cardDetailsInfo.card_name}}</p>
    </li>
-->

{{# if(d.isGiven ==1) { }}
<li>
<p class="a1">消耗次数</p>
    <p class="a2 pr30 txtpink" id="costNum">1次</p>
</li>
{{# }else if(d.isGiven ==0) { }}

{{# if(d.cardDetailsInfo.card_type == 1 ) { }}
<li>
<p class="a1" >消耗金额</p>
    <p class="a2 pr30 txtpink" id="costMoney" data-pay-money="{{  (d.massageInfo.massage_price)*(d.maxTimesORdiscount/10).toFixed(2)  }} ">¥{{  ((d.massageInfo.massage_price)*(d.maxTimesORdiscount/10)).toFixed(2)  }}</p>
</li>
{{# }else if(d.cardDetailsInfo.card_type == 0){  }}
<li>
<p class="a1">消耗次数</p>
    <p class="a2 pr30 txtpink" id="costNum">1次</p>
</li>
{{# } }}
{{# } }}


</ul>


<ul class="wxyy_info_main fz30">
    <li class="wxyy_info_phone">
    <p class="a1">已绑定手机号</p>
    <p class="a2 pr30">{{ d.bindedPhone }}</p>
</li>
</ul>

	<div>
		<a class="but0 wxyy_info_main_but1" id="makeOrderBtn">立即预约</a>
    </div>
    </script>

    <!-- 外部js资源文件引入 -->
    <script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
    <script src="<%=request.getContextPath()%>/resources/javascript/mobiscroll/js/mobiscroll-2.5.2.js?v=1"></script>
    <script src="<%=request.getContextPath()%>/resources/javascript/library/picker/picker.js"></script>
    <script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/massage/wx_massage_sale.js"></script>

    <jsp:include  page="../../../layout_app/footer.jsp" />