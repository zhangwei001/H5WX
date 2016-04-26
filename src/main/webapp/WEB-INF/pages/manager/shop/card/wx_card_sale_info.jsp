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

<div class="shopmanmain wx_guanlian bghui" id="itemDetailsOfServeView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>

<script type="text/html" id="cardSaleTemp">
	   <div class="wx_products_main">
		 <div class="wx_products_windows poi1" style="background-image:url({{ d.content.img_url}})">
              {{# if(d.activityId>0) { }}
					<p class="poi2 wx_top_shenyu"><i class="icon-topshenyu"></i>仅剩{{d.limitTime}}</p>
              {{# } }}
			<p class="poi2 wx_products_wtxt"><span class="fl fz30 wordsbase" style="max-width:13em">{{ d.content.cardtype_name}}</span> 
            <span class="fr fz24"><a class="wxtx_products_but1">已售{{ d.content.cardtype_num }}</a></span></p>
		 </div>
		
		 <div class="wx_products_wtxt2 mt30">
            {{# if(d.activityId>0){ }}
				<p class="a1 fl "><span class="fz30">¥</span><span class="fz40">{{d.discountedMoney}}</span><del class="fz14 txthui01 ml10">¥{{d.content.price}}</del></p>
            {{# }else { }}
				<p class="a1 fl "><span class="fz30">¥</span><span class="fz40">{{d.content.price}}</span></p>
            {{# } }}

			
             
               
				 {{# if(d.activityId>0 && d.qrCode=="false") { }}
						<p class="a2 fr"><a class="wxtx_products_but2 fz30"  id="reserveNow">立即购买</a></p>
             	 {{# }else if(d.activityId==0 && d.qrCode!=="false") { }}
						<p class="a2 fr"><a class="wxtx_products_but2 fz30" id="reserveNow">立即预约</a></p>
             	 {{# }else if(d.activityId>0 && d.qrCode=="true") {  }}
						<p class="a2 fr"><a class="wxtx_products_but2 fz30" >立即购买</a></p>
                 {{# }else{  }}
						<p class="a2 fr"><a class="wxtx_products_but2 fz30" id="reserveNow">立即预约</a></p>
                 {{# } }}

            
		 </div>
	   </div>
          
        {{# if(d.urlData.cardType==1) { }}
		<div class="wx_products_tise2">
			<p><i class="icon-products_pas2">赠</i>赠送金额：¥{{( d.content.give_money).toFixed(2)}}</p>
		</div>
        {{# }else if(d.urlData.cardType==0) { }}
			<div class="wx_products_tise2"><p>项目次数：{{(d.content.massage_num== -1)? "无限" : d.content.massage_num}}次</p></div>
        {{# } }}

        <div class="wx_products_tise">
			<p><i class="icon-products_pas"></i>支持随时退款</p>
			<p><i class="icon-products_pas"></i>支持过期退款</p>
	   </div>



       {{# if(d.activityId >0){ }}
			<div class="shopckdd_dat shopckdd_datmun mb20">
				<p class="tatle">优惠描述</p>
				<p style="position: relative; top: 9px;">{{d.activityInfo.describe}}</p>
			</div>
   	   {{# } }}



	<div class="wx_products_item bgbai">
	    <p class="shop_infotatle">适用项目</p>
		{{# var times=0;}}
		{{# for(var i=0;i<d.content.item_list.length;i++) { }}
			{{#var classItem=d.content.item_list[i];}}
			{{#times++;}}
			  <ul class="shophyk_dat shophyk_xmtxt"  {{ (i<3) ?'':'style="display:none;"'}}    data-item-id="{{classItem.item_id}}"  data-click="true" data-item-flag="{{classItem.flag}}"  data-item-discount="{{classItem.item_num }}" data-item-cardType="{{d.urlData.cardType}}">
					<li class="a2 fl poi1">
						{{# if(classItem.flag==1 || classItem.flag==2){ }}
						<p class="tatle">{{classItem.item_name.substring(0,6)}}</p>
						{{# }else{ }}
						<p class="tatle">{{classItem.item_name.substring(0,6)}}【类】</p>			
						{{# } }}
						<p class="info">&nbsp;</p>
						<p class="info mt8">
                         {{# if(classItem.item_valid==-1) { }}
							<span class="txthui01">有效期：永久</span>
                         {{# }else { }}
                        	<span class="txthui01">有效期： {{classItem.item_valid}}   个月</span>
                         {{# } }}
                         </p>                                            
					</li>
					<li class="a3 fl">
					{{# if(d.urlData.cardType==0) { }}
                           {{(classItem.item_num==-1)? "无限" : classItem.item_num}}次
                     {{# }else if(d.urlData.cardType==1) { }}
                           {{classItem.item_num}}折
                     {{# } }}
                  {{# if(classItem.flag==4 || classItem.flag==3) { }}
                 	 <a><img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/arrow_r4_c4.gif" width="20" height="34"></a>
				  {{# } }} 
                    </li>
		   </ul>
		{{# } }}

	{{# if(times>3){ }}
	<ul class="morereco morereco_bortop">
		<li  onclick="$('ul').show();$(this).hide();"><a>查看全部适用项目<i class="icon-shoppdown"></i></a></li>
	</ul>
	{{# } }}

  </div>


<!-- ******* -->

	<div class="shopckdd_dat shopckdd_shopinfo poi1">
		<p class="shop_infotatle">商家信息</p>
		<ul class="shopckdd_infotab01">
			<li class="fl" id="shopHomeInfo">
				<p class="td1"><span class="tatle">{{d.shopInfoData.shop_name}}</span></p>
				<p class="td1 td1b">
					<span class="pic">
						{{# for(var i=0;i<d.shopInfoData.shop_stars;i++){ }}
							<img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
						{{# } }}
					</span>
				</p>
			</li>
			<li class="fr"><a href="tel:{{ d.shopInfoData.shop_tel }}" style="display:inline-block;height:50px"><img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/cibangphone_r2_c2.gif" width="41" height="51"></a></li>
		</ul>
		
		<div class="shopckdd_infotab02">
			<div class="td2">
				<span class="a1"><img src="{{ d.urlData.webRoot}}/resources/images/meirong/shop/dbponit_r3_c2.gif" width="29" height="41"></span>
				<div class="a2 poi1">{{d.shopInfoData.shop_addr}}</div>
				<span class="poi2 txtview_km">{{ (parseFloat(d.shopInfoData.distance/1000)).toFixed(2) }}km</span>


			</div>
		</div>
	</div>

<!-- ******* -->


</script>

<script type="text/html" id="cardInfoCommentTemp">
 
            {{# if(d.cardComment) { }}
			  <div class="bgbai pingjia_facebg mt20">
						<p class="cpyy_tatle">用户评价</p>
                     {{# for(var j=0;j<d.cardComment.length;j++){ }}
					   {{# var cardItem = d.cardComment[j] }}
                        <div class="pjed_shertop_main">
						<div class="pjed_shertop">
							 {{# if( cardItem.custom_img) { }}
									<p><img src="{{cardItem.custom_img}}" width="130" height="130"></p>
                             {{# }else { }}
									<p><img src="{{ d.webRoot}}/resources/images/img/defaults/staffHeadDefault3.png" width="130" height="130"></p>
                             {{# } }}

							<p class="fz26">{{cardItem.custom_name}}</p>
                            <p class="a2 mt15">
                             	{{#if(cardItem.comment_score==0) { }}
                             	{{# }else if(cardItem.comment_score==0) { }}
									<a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a>
 							 	{{# }else if(cardItem.comment_score==1) { }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a>
								{{# }else if(cardItem.comment_score==2) { }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a>
								{{# }else if(cardItem.comment_score==3) { }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01"></i></a><a><i class="icon-starbig icon-starbig01"></i></a>
 								{{# }else if(cardItem.comment_score==4) { }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01"></i></a>
								{{# }else if(cardItem.comment_score==5) { }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a><a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
								{{# } }}
							</p>
							<p class="fr fz22">{{ cardItem.comm_date.split(" ")[0]}}</p>
						</div>
						<p class="fz24 mt20">{{ cardItem.comm_text}}</p>
                      	  	{{# if(cardItem.img_urls.length>0) { }}
							<ul class="pingjia_picupload pjed_picupload bgbai"  >
                          	  {{# for(var k=0;k<cardItem.img_urls.length;k++) { }}
                          	       <li class="poi1"><a><img src="{{cardItem.img_urls[k].img_urls1}}" width="97" height="99"></a></li>
                         	   {{# } }}
							</ul>
                       		{{# } }}
                           </div>
                    {{# } }}
				</div>	
            {{# }else { }}
	 			<div class="bgbai pingjia_facebg mt20">
					<p class="cpyy_tatle">用户评价</p>
		        	<div class="pingjia_nopj">暂无用户评价</div>
			   </div>
            {{# } }}
</script>

 

<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/card/wx_card_sale_info.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 