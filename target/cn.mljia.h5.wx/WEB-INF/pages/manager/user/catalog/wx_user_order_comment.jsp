<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<title>优惠促销</title> 
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
 .shophyk_end{display:none;}a{text-decoration:none}
</style>
</head>
<body  data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-access-token="${ accessToken }">





<div class="shopmanmain wx_guanlian bghui">
	<div class="bgbai pingjia_facebg">
		<p class="pj_tatle">总体评价</p>
		<ul class="pingjia_face_main pingjia_face_bg" id="pj_tatle">
			<li>
				<p><a><i class="icon-pjface icon-pjface01   "></i></a></p>
				<p>很好</p>
			</li>
			<li>
				<p><a><i class="icon-pjface icon-pjface02"></i></a></p>
				<p>满意</p>
			</li>
			<li>
				<p><a><i class="icon-pjface icon-pjface03"></i></a></p>
				<p>一般</p>
			</li>
			
			<li>
				<p><a><i class="icon-pjface icon-pjface04"></i></a></p>
				<p>不满意</p>
			</li>
			
			<li>
				<p><a><i class="icon-pjface icon-pjface05"></i></a></p>
				<p>坑爹</p>
			</li>
		
		</ul>
		
		<hr>
		
		<div id="commentItemTemp">
			<div class='loader loader--audioWave'></div>
		</div>
		<script type="text/html" id="commentItemInfo">
			{{# for(var i = 0; i<d.commentItemLen; i++)  { }}
                {{# var item = d.content[i ]}}

                  <div class="pingjia_stars_main" data-par-id="{{item.par_id }}" data-score="5">
                     <p class="a1">{{ item.par_name }}</p>
			         <p class="a2" id="{{ item.par_id }}" data-score="0">
				       <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				       <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				       <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				       <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				       <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
			        </p>
		         </div>

			{{# } }}
        </script>
	
	
	</div>
	
	
	<ul class="pingjia_picupload bgbai" id="picUpload">
		<li id="upImgBtn" >
		  <a href="javascript:void(0);" >
		    <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/uploadpic_r4_c4.gif" width="166" height="166"/>
		           <!-- <input id="fileuploadshopimages" type="file" name="files[]"  data-multiple="multiple"  accept="image/*" style="position:relative;left:0;top:-166px;width:166px;height:166px;z-index:999;opacity:0;filter:alpha(opacity=0);"/> -->
		 </a>
		</li>
		
	</ul>
	
	<div class="pingjia_txtinput bgbai">
		<textarea name="" cols="" rows="" placeholder="分享一下对本次服务的评价吧~效果如何？服务态如何？环境怎么样" id="idealText" maxLength="200"></textarea>
		<p class="pingjia_tctxt">当前已输入<span class="txtpink">0</span>个字</p>
	</div>
	
	
	<div class="pingjia_singbut_but" >
		<a class="pingjia_qdbut " id="commentSubmit">提交</a>
	</div>

</div>









<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_order_comment.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 