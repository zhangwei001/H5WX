<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部css资源文件引入 -->
<title>商家环境</title>


 <link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/shop_info.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" /> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/simplelightbox.min.css" rel="stylesheet" type="text/css" /> 

</head>
<body  data-shop-id="${shopId}" class="bgbai">
<div class="container"  id="photosView"></div>

<script type="text/html" id="shopImgTmpl">

<div class="gallery">
<ul class="shopic_box">
  	{{# for(var i= 0; i<d.content.length;i++){ }}
	{{# var item = d.content[i]}}
   		<li><a href="{{item.img_url}}"><img src="{{ item.img_url2}}" alt="" title=""  width="130" height="130"/></a></li>
    {{# } }}
</ul>
<div>

</script>


<script type="text/html" id="shopImgEmptyTmpl">
<div class="shopmanmain wx_guanlian"  >
<ul class="wx_nocardmain">
	<li class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/nopotonr2_c2.png" width="217" height="219">
	<li class="a2">该商家暂时还未上传环境照片，敬请期待!</li>
</ul>
	<div class="footer">
	<ul class="bottomain" >
		<li class="a0"><a class="crossbottom"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/bottom_crossr2_c1.png" width="40" height="44"></a></li>
		<li class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/bbsapplogo_r2_c2.png" width="69" height="69"></li>
		<li class="a2"><a >更多商家尽在美丽加......</a></li>
		<li class="a3"><a class="but0 list02but" id="tojump">点击下载</a></li>
	</ul>
	</div>
</div>
</script>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/library/simple-lightbox.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/info/wx_shop_environment.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 