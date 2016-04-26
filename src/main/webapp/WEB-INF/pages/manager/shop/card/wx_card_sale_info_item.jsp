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

<div class="shopmanmain wx_guanlian bgbai" id="classItemView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>

<!-- flag=1, // 1：表示为护理项目2：表示为产品 3：表示护理项目分类 4：表示产品分类  -->
<script type="text/html" id="classItemTemp">
 {{# if(d.cardType == 1) { }}
         {{# if(d.flag == 3) { }}
           {{# for(var i =0;i<d.content.length;i++) { }}
            {{# var massageItem = d.content[i] }}
			<ul class="shophyk_dat shophyk_xxcard" data-click="true" data-item-id="{{massageItem.massage_id}}" data-item-flag="{{d.flag }}">
				<li class="a1 fl"><img src="{{massageItem.img_url}}" width="130" height="130"></li>
				<li class="a2 fl poi1">
					<p class="tatle">{{massageItem.massage_name}}</p>
					<p class="info mt8">{{ massageItem.massage_time}}分钟  </p>
					<p class="info mt8"><span class="txthui01">{{ massageItem.massage_price }}</span></p>
					<p class="poi2">{{d.discount}}折</p>
				</li>
		    </ul>
           {{# } }}
         {{# }else if(d.flag == 4) { }}
            {{# for(var k=0;k<d.content.length;k++) { }}
			{{# var productItem = d.content[k]}}
			  <ul class="shophyk_dat shophyk_xxcard" data-click="true"  data-item-id="{{productItem.product_id}}" data-item-flag="{{d.flag }}">
				<li class="a1 fl"><img src="{{productItem.img_url }}" width="130" height="130"></li>
		   	 	<li class="a2 fl poi1">
					<p class="tatle">{{ productItem.product_name}}</p>
					<p class="info mt8">{{productItem.product_netcontent}} </p>
					<p class="info mt8"><span class="txthui01">¥{{productItem.product_price }}</span></p>
					<p class="poi2">{{d.discount}}折</p>
				</li>
			 </ul>
            {{# } }}
			


		 {{# } }}
  {{# }else if(d.cardType == 0) { }}
		{{# if(d.flag == 3) { }}
           {{# for(var i =0;i<d.content.length;i++) { }}
            {{# var massageItem = d.content[i] }}
			<ul class="shophyk_dat shophyk_xxcard"  data-click="true" data-item-id="{{massageItem.massage_id}}" data-item-flag="{{d.flag }}">
				<li class="a1 fl"><img src="{{massageItem.img_url}}" width="130" height="130"></li>
				<li class="a2 fl poi1">
					<p class="tatle">{{massageItem.massage_name}}</p>
					<p class="info mt8">{{ massageItem.massage_time}}分钟  </p>
					<p class="info mt8"><span class="txthui01">{{ massageItem.massage_price }}</span></p>
					
				</li>
		    </ul>
           {{# } }}
         {{# }else if(d.flag == 4) { }}
            {{# for(var k=0;k<d.content.length;k++) { }}
			{{# var productItem = d.content[k]}}
			  <ul class="shophyk_dat shophyk_xxcard"  data-click="true" data-item-id="{{productItem.product_id}}" data-item-flag="{{d.flag }}">
				<li class="a1 fl"><img src="{{productItem.img_url }}" width="130" height="130"></li>
		   	 	<li class="a2 fl poi1">
					<p class="tatle">{{ productItem.product_name}}</p>
					<p class="info mt8">{{productItem.product_netcontent}} </p>
					<p class="info mt8"><span class="txthui01">¥{{productItem.product_price }}</span></p>
					
				</li>
			 </ul>
            {{# } }}
			


		 {{# } }}


  {{# } }}
</script>



<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/card/wx_card_sale_info_item.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 