<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部css资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
</head>
<body>

<div id="shopDetailInfoTemp">
	<div class='loader loader--audioWave'></div>
</div>


<script type="text/html" id="shopdetailInfo">
	<div class="shopmanmain wx_guanlian bghui lh40">
<ul class="wxshopdata_main">
	<li>
		<p class="a1">店铺全称：</p>
		<p class="a2" id="shopName">{{ d.shopName}}</p>
	</li>

	<li>
		<p class="a1">信用等级：
          {{#  if(d.shop_credit <10 ){ }} 
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10"></p>
          {{# }else if(d.shop_credit >=11 &&  d.shop_credit<30 ){ }}
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45"  class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10" class="mbm10"></p>
			{{# }else if(d.shop_credit >=31 && d.shop_credit < 60){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10"></p>
			{{# }else if(d.shop_credit >=61 && d.shop_credit <100){ }}
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10"></p>
			{{# }else if(d.shop_credit>=101 && d.shop_credit<150 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10" >
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_1.png" width="45" class="mbm10"></p>
            {{# }else if(d.shop_credit >=151 && d.shop_credit <300 ){ }} 
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10" ></p> 
			{{# }else if(d.shop_credit >=301 && d.shop_credit <600 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10" >
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45"  class="mbm10"></p> 
			{{# }else if(d.shop_credit >=601 && d.shop_credit<1000 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45"  class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10" class="mbm10"></p> 
			{{# }else if(d.shop_credit>=1001 && d.shop_credit<1500 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10"></p> 
			{{# }else if(d.shop_credit >=1501 && d.shop_credit <3000 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_2.png" width="45" class="mbm10"></p> 
			{{# }else if(d.shop_credit>=3001 && d.shop_credit<5000 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"></p> 
			{{# }else if(d.shop_credit>= 5001 && d.shop_credit <8000){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"></p> 
			{{# }else if(d.shop_credit >= 8001 && d.shop_credit<15000 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"></p> 
			{{# }else if(d.shop_credit >=15001 && d.shop_credit<30000){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"></p> 
			{{# }else if(d.shop_credit >= 30001 && d.shop_credit <50000 ){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_3.png" width="45" class="mbm10"></p> 
{{# }else if(d.shop_credit>= 50001 && d.shop_credit< 80000){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"></p> 
{{# }else if(d.shop_credit>= 80001 && d.shop_credit <150000){ }} 
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"></p> 
{{# }else if(d.shop_credit>=150001 && d.shop_credit<300000){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"></p> 
{{# }else if(d.shop_credit>=300001 && d.shop_credit<500000){ }} 
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"></p> 
{{# }else if(d.shop_credit>=500000){ }}  
<p class="a2"><img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"> 
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10">
<img src="<%=request.getContextPath()%>/resources/images/img/shop_credit_level/level_4.png" width="45" class="mbm10"></p> 
         {{# }}}
	</li>
	<li>
		<p class="a1">店铺编号：</p>
		<p class="a2" >{{ d.SId}}</p>
	</li>
	<li>
		<p class="a1">保证金：</p>
		<p class="a2">
            {{# if(d.shop_margin_list.length == 0){ }}
                     <span class="fl">暂无</span>
            {{# }else { }}
                 {{# for(var i=0;i<d.shop_margin_list.length;i++){ }}
                          {{#  var item =d.shop_margin_list[i] }}
                                 {{# if(item.margin_type ==1) { }}
                                       <span class="fl"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/baozhang3_r6_c4.gif" width="101" height="28"></span>
                                 {{# } else if(item.margin_type ==2) { }}
                                       <span class="fl"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/baozhang1_r6_c4.gif" width="101" height="28"></span>
 								 {{# } else if(item.margin_type ==3) { }}
                                       <span class="fl"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/baozhang2_r6_c4.gif" width="101" height="28"></span>
                                 {{# }}}

                 {{# } }}
            {{# }}}
       	 	
			
			
       </p>
	</li>
	<li>
		<p class="a1">星级认证：</p>
		<p class="a2">
          {{# if(d.shop_certification_star < 3){ }}
               <span class="fl">暂无</span>
          {{# } else if(d.shop_certification_star==3) { }}
               <span class="fl"><img src="<%=request.getContextPath()%>/resources/images/img/shopCertification/333.png" width="55" height="26"></span>
		  {{# } else if(d.shop_certification_star==4) { }}
               <span class="fl"><img src="<%=request.getContextPath()%>/resources/images/img/shopCertification/444.png" width="55" height="26"></span>
{{# } else if(d.shop_certification_star==5) { }}
               <span class="fl"><img src="<%=request.getContextPath()%>/resources/images/img/shopCertification/555.png" width="55" height="26"></span>
           {{# } else  { }}   
                 <span class="fl"></span>
         {{# } }}
		
</p>
	</li>
	<li>
		<p class="a1">店面环境：</p>
		<p class="a2"><span class="starkai2">{{ d.shop_envri }}</span></p>
	</li>
	<li>
		<p class="a1">性价比：</p>
		<p class="a2"><span class="starkai2" >{{ d.shop_compare }}</span></p>
	</li>
	<li>
		<p class="a1">店铺全称：</p>
		<p class="a2">{{d.shopName}}</p>
	</li>

	<li>
		<p class="a1">工作时间：</p>
		<p class="a2">{{ d.shop_bussiness_time}}</p>
	</li>

	<li>
		<p class="a1">店铺面积：</p>
		<p class="a2">{{ d.shop_area }}</p>
	</li>

	<li>
		<p class="a1">主营业务：</p>
		<p class="a2"><span >{{ d.mainBusiness }}</span></p>
	</li>

	<li>
		<p class="a1">电话：</p>
		<p class="a2">{{ d.phone }}</p>
	</li>

	<li>
		<p class="a1">地址：</p>
		<p class="a3">{{ d.shop_addr }}</p>
	</li>
</ul>


</div>
</script>



<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/info/wx_shop_info.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 