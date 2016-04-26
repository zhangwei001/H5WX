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

<div class="shopmanmain wx_guanlian bghui" id="shopStaffListView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>

<script type="text/html" id="shopStaffTmpl">

    <div class="share_wxtop_main">
<div class="share_wxtop">

<p class="fl">关注我们，享更多低价折扣哦~</p>

<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>

</div>
</div>
<div style="width: 100%;height: 10px; margin-top:-20px" class="bghui"></div>
   <div class="shopmanmain wx_guanlian ">
      {{# for( var i = 0; i<d.content.length;i++){ }}
            {{# var item = d.content[i] }}
	<ul class="staff_list_ul">
		{{# if(item.img_url) { }}
		<li class="staff_list_pic" style="background-image:url({{ item.img_url}})"></li>
		{{# }else { }}
		<li class="staff_list_pic" style="background-image:url({{ d.contextPath}}/resources/images/img/defaults/staffHeadDefault3.png)"></li>
		{{# } }}
		<li>
			<p class="staff_list_txt1 wordsbase fl" style=" max-width: 130px;">{{ item.staff_name }}</p>
			<p class="staff_list_txt_star fr">
                 {{# if(item.staff_comment_num==0 ){ }} 
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
				 {{# }else if(item.staff_comment_num==1){ }} 
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
 				 {{# }else if(item.staff_comment_num==2){ }}
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
 				 {{# }else if(item.staff_comment_num==3){ }}
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 "></i>
						<i class="icon-starbig icon-starbig01 "></i>
 				 {{# }else if(item.staff_comment_num==4){ }}
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 "></i>
  				 {{# }else{ }}
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
						<i class="icon-starbig icon-starbig01 icon-starbig02"></i>
				{{# } }}
				
			</p>
		
		</li>
		<li class="fz24">
			<p class="staff_list_txt2 fl">{{ item.staff_level }}</p>
			<p class="staff_list_txt3 fr">{{ item.staff_service_time }}次护理</p>
		
		</li>

		{{# if( item.staff_mobile ) { }}
			<li class="staff_list_but"><a class="but0 but1" href="tel:{{ item.staff_mobile }}"><i></i>立即咨询</a></li>
        {{# }else { }}
			<li class="staff_list_but"><a class="but0 "><i></i>立即咨询</a></li>

        {{# } }}
		
	
	</ul>
   {{# } }}

  </div>
</script>

<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/share/wx_shop_staff_list_share.js"></script>

<jsp:include  page="../../layout_app/footer.jsp" /> 