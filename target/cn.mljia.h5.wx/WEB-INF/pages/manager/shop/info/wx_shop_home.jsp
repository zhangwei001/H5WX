<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部css资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css"  rel="stylesheet" type="text/css"/>
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/shop_info.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
	a{ text-decoration:none}
</style>

</head>
<body   data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-context-parth="${contextPath}">

<div class="shopmanmain" id="container">

<div id="shopInfoView" title="店铺信息"></div>
<div id="recommendView"  title="店铺推荐"></div>
<div id="staffView"  title="员工信息"></div>
<div id="commentView"  title="店铺评论"></div>
<div id="hotProView"  title="热销产品"></div>

	<div class="footer">
		<ul class="bottomain" >
			<li class="a0"><a class="crossbottom"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/bottom_crossr2_c1.png" width="40" height="44"></a></li>
			<li class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/bbsapplogo_r2_c2.png" width="69" height="69"></li>
			<li class="a2"><a >更多商家尽在美丽加......</a></li>
			<li class="a3"><a class="but0 list02but" id="tojump">点击下载</a></li>
		</ul>
	</div>
</div>


<!-- 商家推荐 --> 
<script type="text/html" id="recommendProListTmpl">
   <ul class="bxtatle">
		<li id="">商家推荐（{{ d.RecommendListNum }}）</li>
   </ul>
     {{# var flag=0}}
     {{# for(var i=0;i<d.content.length;i++ ){ }}
          {{# var item=d.content[i];  }}
         {{#  flag++ }}
         {{# if(flag<6) { }}
          	<ul class="roco01" data-click="true"  data-card-type="{{item.card_type}}" data-item-type="{{item.flag}}" data-item-id="{{ item.id}}">
					<li class="list01"><img src="{{ item.img_url }}" width="186" height="141"></li>
					<li class="list02"><a>
						<p class="tatle">{{ item.item_name }}</p>
						<p>
							<span class="txtpink02">¥{{ item.price||0}}</span>
                          
							<span class="fr"> 已售:{{ item.sale_num||0}}</span>
						</p></a>
					</li>
			</ul>
         {{# }else { }}
			<ul class="roco01" date-hidden="true" data-click="true" style="display:none" data-card-type="{{item.card_type}}" data-item-type="{{item.flag}}" data-item-id="{{ item.id}}">
					<li class="list01"><img src="{{ item.img_url }}" width="186" height="141"></li>
					<li class="list02"><a>
						<p class="tatle">{{ item.item_name }}</p>
						<p>
							<span class="txtpink02">¥{{ item.price||0}}</span>
                          
							<span class="fr"> 已售:{{ item.sale_num||0}}</span>
						</p></a>
					</li>
			</ul>

         {{# } }}

     {{# }}}
     {{# if(d.RecommendListNum>4){ }}
			<ul class="morereco">
				<li><a >更多推荐<i class="icon-shoppdown"></i></a></li>
			</ul>
     {{# } }}

</script>




<script type="text/html" id="shopInfoTmpl">
	<ul class="userdatas01">
		<li class="list01"><img src="{{ d.shop_img_url }}" width="130" height="130" ></li>
		<li class="list02">
			<p class="tatle wordsbase" >{{ d.shopName}}</p>
			<p class="fz22">
				店铺编号：<span class="txtpink02" >{{ d.SId }}</span>
			</p>
			<p class="mb0" ></p>
			<p class="fz22">
				顾客：<span >{{ d.shopCustomTotal }}</span><span class="ml20">粉丝：{{ d.shop_follow_num }}</span>
			</p>
		</li>
     {{# if(d.isBindotherShop == 0) {}}
        {{# if(d.customStatus==0) { }}
            <li class="list03">
				<p class="mt92">
					<a class="abutbese "  >审核中</a>
				</p>
            </li>

     {{# }else if(d.customStatus==1){ }}
            <li class="list03">
				<p class="mt92">
					<a class=" abutbese ">已加入</a>
				</p>
       		</li>
        {{# }else if(d.customStatus==2) { }}
			<li class="list03">
			  <p class="mt92">
				<a class="abutbese abut_pink"  href="<%=request.getContextPath()%>/agent/manager-user-duplicate-wx_user_bind_page?userId={{ d.userId}}&appId={{ d.appId }}&openId={{ d.openId}}&shopId={{ d.shopId}}&accessToken={{d.accessToken}}">加入商家</a>
			  </p>
            </li>
        {{# } }}
  {{#}else if(d.isBindotherShop == 1) { }}
			 {{# if(d.customStatus==0) { }}
            <li class="list03">
				<p class="mt92">
					<a class="abutbese "  >审核中</a>
				</p>
            </li>

        {{# }else if(d.customStatus==1){ }}
            <li class="list03">
				<p class="mt92">
					<a class=" abutbese ">已加入</a>
				</p>
       		</li>
        {{# }else if(d.customStatus==2) { }}
			<li class="list03">
			  <p class="mt92">
				<a class="abutbese abut_pink"  data-shop-id ="{{ d.shopId }}" data-open-id="{{ d.openId }}" id="hasBindOtherShop">加入商家</a>
			  </p>
            </li>
        {{# } }}

   {{# } }}

       
	
	</ul>
	<ul class="userdatas02">
			<li class="list01"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/comPic.gif" ></li>
			<li class="list02"><p class="wordsbase fl" style="max-width: 541px;">{{ d.shop_addr }}</p><span class="fr" >{{ d.shop_distance}}</span></li>
	</ul>
	
	<ul class="userdatas03">
		<li class="list01"><a href="<%=request.getContextPath()%>/agent/manager-shop-info-wx_shop_environment?shopId={{ d.shopId }}">
		<span><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/comPic.gif"></span>商家环境</a></li>

		<li class="list02"><a  href="<%=request.getContextPath()%>/agent/manager-shop-info-wx_shop_info?shopId={{ d.shopId }}&openId={{ d.openId}}">
		<span><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/comPic.gif"></span>商家信息</a></li>
		<li class="list03"><a href="tel:{{ d.shopPhone }}" >
		<span><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/comPic.gif"></span>电&nbsp;话</a></li>
	</ul>
</script>

 
<script type="text/html" id="shopStaffTmpl">
	    <ul class="bxtatle" id="staffList">
		<li class="fl">员工({{d.StaffListNum}})</li>
		<li class="fr"><a><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/comPic.gif" ></a></li>
	    </ul>

        <ul class="ygalllist">

      {{# for(var i=0;i<d.content.length;i++ ){ }}
          {{# var item=d.content[i];  }}

          <li>
			<p class="list01 ">
				<img src="{{ item.img_url   }}" width="97" height="99">
			</p>
			<p class="list02">
				<c:if test="${staff.staffIsDaren==1}">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/staffcrow_r8_c5.png" width="33" height="33">
				</c:if>
			</p>
			<p class="list03 wordsbase">{{ item.staff_name}}</p>
			<p>{{ item.staff_service_time }}护理</p>
			<c:if test="${staff.tbStaffLevel!=null}">
				<p>${staff.tbStaffLevel.staffLevelName}</p>
			</c:if>
		</li>
        {{# }}}
	</ul> 
</script>


  <!-- 店铺评价列表  模板-->
<script type="test/html" id="commentListTmpl">
<ul class="bxtatle">
		<li class="fl">评价（<span>{{ d.commentListNum }}</span>）</li>
		<li class="fr"><span class="ml10"><span id="shop_star_num"></span></span></li>
		<li class="fr02" id ="certification_star_list"></li>
</ul>
        {{# if(d.commentListNum) { }}
            <div class="comemain">
		    	<div class="bgbai pingjia_facebg" style="padding-top:0px;padding-bottom:0px;">
                         {{# for(var i=0;i<d.content.length;i++) { }}
                           {{# var massageItem = d.content[i]}}
                                <div class="pjed_shertop_main">
								<div class="pjed_shertop">
                                    {{# if( massageItem.custom_img) { }}
									<p><img src="{{ massageItem.custom_img }}" width="130" height="130"></p>
                                    {{# }else { }}
									<p><img src="{{ d.webRoot}}/resources/images/img/defaults/staffHeadDefault3.png" width="130" height="130"></p>
                                    {{# } }}
									<p class="fz26">{{ massageItem.custom_name }}</p>
									<p class="a2 mt15">

								{{# for(var m=0;m<massageItem.comment_score;m++){ }}
									<a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
								{{# } }}
								{{# for(var n=0;n<(5-massageItem.comment_score);n++){ }}
									<a><i class="icon-starbig icon-starbig01"></i></a>
								{{# } }}
  
									</p>
									<p class="fr fz22">{{massageItem.comm_date.split(" ")[0]}}</p>
								</div>
								<p class="fz24 mt20">{{ massageItem.comm_text}}</p>
                               {{# if(massageItem.img_urls.length>0) { }}
								<ul class="pingjia_picupload pjed_picupload bgbai">
									 {{# for(var k=0;k<massageItem.img_urls.length;k++) { }}
                               		   <li class="poi1"><a><img src="{{massageItem.img_urls[k].img_urls1}}" width="97" height="99"></a></li>
                            		{{# } }}
								</ul>
                               {{# } }}
                             </div>
						 {{# } }}
						
				</div>
            </div>
       {{# }else{  }}
           <div class="comemain">
            <ul class="nocome">
              <li>
			    <p>
				 <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/nocomesmlier4_c4.gif" width="100" height="100">
			    </p>
			    <p>没有查询到评价记录！</p>
		    </li>
	       </ul>
       {{# } }}
	</div>
</script>
<script type="text/html" id="hotProListTmpl">
      <ul class="bxtatle">
		<li>热销产品（{{ d.hotSaleListNum }}）</li>
	 </ul>
     {{# for(var i=0;i<d.content.length;i++ ){ }}
          {{# var item=d.content[i];  }}

          <ul  data-hot-sale='true'   data-item-id="{{ item.product_id}}" class="roco01 rocohot"  >
			<li class="list01"><img src="{{ item.product_img_url }}" width="186" height="141"></li>
			<li class="list02">
				<a><p class="tatle">{{ item.product_name }}</p>
				<p>
					<span class="txtpink02">￥{{ item.product_price ||0 }}</span>
					<span class="fr">已售:{{item.product_sales_num ||0}}</span><span class="fr ml40">${produce.produceNetcontent}${produce.produceNetcontentUnit}</span>
				</p></a>
			</li>
		  </ul>

     {{# }}}
</script>



<script type="text/html" id="product">
<h3>{{ d.title }}</h3>
<p class="intro">{{ d.intro }}</p>
<ul>
{{# for(var i = 0, len = d.list.length; i < len; i++){ }}
    <li>
        <span>{{ d.list[i].name }}</span>
        <span>所在城市：{{ d.list[i].city }}</span>
    </li>
{{# } }}
</ul>
</script>


<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/info/wx_shop_home.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 