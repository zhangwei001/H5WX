<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>优惠促销</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
 .shophyk_end{display:none;}
  a{text-decoration:none}
 .activity-list{margin-top:0;}
  .activity-list>li{margin-bottom:40px;background:white;}
 .activity-list li .act-main{position:relative;margin:0;}
 .act-pic{width:640px;height:300px;overflow:hidden;display:block;}
 .act-pic img{width:640px;height:300px;}
  .act-pic:before{
	content: '';
	display: inline-block;
	border-left: 14px solid transparent;
	border-right: 14px solid transparent;
	border-bottom: 18px solid white;
	position: absolute;
	bottom: 0px;
	right: 50px;
	z-index: 10;
	}
 .act-title{color:#424242;font-size:26px;position:absolute;left:20px; bottom:0px;z-index:9;}
 
 .pro-list{width:920px;height:273px; background:white; overflow:hidden;margin-top:20px;}
 .pro-list li.pro-item{width:198px; float:left;margin-left:30px;}
 .item-img{width:198px;height:170px;float:left;}
 .item-title{float:left;color:#000;font-size:24px;width:95%;height:35px;overflow:hidden;}
 .item-pic{float:left;}
 .ft-1{color:#FF5DBD;font-size:24px;margin-right:5px;}
</style>
</head>
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bghui lh40" id="promotionView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>

<script type="text/html" id="promotionTemp">
<ul class="activity-list">
 {{# for(var i = 0;i<d.content.length;i++) { }}
	<li>
   	{{# var promotionItem = d.content[i] }}
		<div class="act-main">
			<p class="poi2 wx_top_shenyu"><i class="icon-topshenyu"></i>仅剩{{arrive_timer_format(promotionItem.limit_time)}}</p>
			<a class="act-pic" href="{{d.webRoot}}/agent/manager-shop-event-wx_event_info?activityId={{ promotionItem.activity_id}}&shopId={{d.shopId }}&from=event">
 				<img src="{{promotionItem.img_url}}"/>
			</a>
			<p class="act-title">{{ promotionItem.activity_name}}</p>
		</div>
		<ul class="pro-list">
		{{# for(var j = 0;j<promotionItem.items.length;j++) { }}
       	 	{{# var promoDetailsItem =promotionItem.items[j]}}
				<li class="pro-item"  data-activity-id="{{promotionItem.activity_id}}"  data-item-id="{{ promoDetailsItem.item_id }}" data-card-type="{{ promoDetailsItem.card_type }}"  data-item-type="{{promoDetailsItem.item_type }}">
					<img  class="item-img" src="{{promoDetailsItem.item_img_url}}"/>
					<p class="item-title">{{ promoDetailsItem.item_name}}</p>
					<p class="item-pic">
						<span class="ft-1">¥{{ promoDetailsItem.pre_price}}</span>
						<del class="ft-2">¥{{promoDetailsItem.item_price }}</del>
					</p>
				</li>
        	{{# } }}
		</ul>
	</li>
 {{# } }}
</ul>
</script>

<script type="text/html" id="noPromotionTemp">
	<div class="shopmanmain wx_guanlian">
		<ul class="wx_nocardmain wx_noyouhui">
			<li class="a1 "><img src="{{ d.webRoot}}/resources/images/meirong/shop/noyouhui_mm.gif" width="125" height="285"></li>
			<li class="a2">诶？商家暂无促销活动呢<br>去看看其它服务吧~</li>
			<li class="a3"><a class="but0 but2" id="checkAllServe">查看所有服务</a></li>
		</ul>
   </div>
</script>

<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/event/wx_event_list_index.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 