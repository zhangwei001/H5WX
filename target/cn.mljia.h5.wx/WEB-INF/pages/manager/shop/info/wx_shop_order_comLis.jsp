<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部css资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css"  rel="stylesheet" type="text/css"/>
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/shop_info.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/meirong/shop/yy_shop_rated.css">
<script type="text/javascript">
	/* 	var phoneWidth =  parseInt(window.screen.width);
		var phoneScale = phoneWidth/640;
		var ua = navigator.userAgent;
		if (/Android (\d+\.\d+)/.test(ua)){
			var version = parseFloat(RegExp.$1);
			if(version>2.3){
				document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
			}else{
				document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
			}
		} else {
			document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
		} */
</script>
<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">

<style>
.my_red_env_no_text{
	width: 640px;
height: 100px;
color: #7c7c7c;
font-size: 30px;
text-align: center;
line-height: 480px;
}
.shop_rated_top_mark{
margin-left:200px;
text-align:right;
}

</style>

</head>
<body   data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-context-parth="${contextPath}">





<script type="text/html" id="shopOrderCommentTemp">

<div class="shopmanmain wx_guanlian bghui">
       <div class="shop_rated_box">
           <div class="shop_rated_top">
               <div class="shop_rated_top_center">
                   <p class="shop_rated_top_p1">用户评价</p>
                  
                   <div class="shop_rated_top_mark">{{d.content[d.content.length-1].order_scores}}分</div>
               </div>
           </div>
           <div class="shop_rated_cent">
               <ul class="shop_rated_cent_list">
                   {{# for(var k =0;k<d.content.length-1;k++) {}}
                      {{#  var commentObj =d.content[k]  }}
					  <li class="shop_rated_cent_list_li">
                       <div class="shop_rated_cent_list_top">
                           <div class="shop_rated_cent_list_pic">
                                 {{# if(commentObj.user_img_url) { }}
										<img src="{{ commentObj.user_img_url }}" width="60" height="60" alt="">
 								 {{# }else {  }}
											<img src="{{  d.webRoot}}/resources/images/img/defaults/staffHeadDefault3.png " width="60" height="60" alt="">				
                                 {{# } }}
                               
                           </div>
                           <div class="shop_rated_cent_list_name">{{commentObj.nick_name}}</div>
                            
                           <ul class="shop_rated_cent_list_xing">
									{{# for(var n =0;n<commentObj.comment_score;n++) { }}
												  <li class="xing_shi xing_sp"></li>
                           			{{# } }}

									{{# for(var n =0;n<5-commentObj.comment_score;n++) { }}
												   <li class="xing_kong xing_sp"></li>
                           			{{# } }}
                              
                           </ul>
                           <div class="shop_rated_cent_list_time">{{ commentObj.comment_time}}</div>
                       </div>
                       <p class="rated_event">{{ commentObj.comment_message }}</p>
                       <ul class="rated_pic_list">
                                 {{# if( commentObj.img_urls && commentObj.img_urls.length >0) { }}
									{{# for(var m =0;m<commentObj.img_urls.length;m++) { }}
                                         {{# var commentImg =commentObj.img_urls[m] }}
										<li><img src="{{ commentImg.img_urls_small }}" width="100" height="100" alt=""></li>
                           			{{# } }}
                                 {{# }}}
                          
                       </ul>
                   </li>


                   {{# } }}
                   
                  
               </ul>
		
               <a href="javascript:;" class="btn_load_more" id="accessPageBtn">加载更多</a>
       
           </div>
           
       </div>
        
    </div>


</script>
<script type="text/html" id="hasNoCommTemp">
		<div class="my_red_env_no" style="display:block">
         
           <p class="my_red_env_no_text">该商家还没收到任何评价</p>
       </div>
</script>


<script type="text/html" id="getMoreOrderCommentTemp">
{{# for(var k =0;k<d.content.length-1;k++) {}}
                      {{#  var commentObj =d.content[k]  }}
					  <li class="shop_rated_cent_list_li">
                       <div class="shop_rated_cent_list_top">
                           <div class="shop_rated_cent_list_pic">
                                {{# if(commentObj.user_img_url) { }}
										<img src="{{ commentObj.user_img_url }}" width="60" height="60" alt="">
 								 {{# }else {  }}
											<img src="{{  d.webRoot}}/resources/images/img/defaults/staffHeadDefault3.png " width="60" height="60" alt="">				
                                 {{# } }}
                           </div>
                           <div class="shop_rated_cent_list_name">{{commentObj.nick_name}}</div>
                            
                           <ul class="shop_rated_cent_list_xing">
									{{# for(var n =0;n<commentObj.comment_score;n++) { }}
												  <li class="xing_shi xing_sp"></li>
                           			{{# } }}

									{{# for(var n =0;n<5-commentObj.comment_score;n++) { }}
												   <li class="xing_kong xing_sp"></li>
                           			{{# } }}
                              
                           </ul>
                           <div class="shop_rated_cent_list_time">{{ commentObj.comment_time}}</div>
                       </div>
                       <p class="rated_event">{{ commentObj.comment_message }}</p>
                       <ul class="rated_pic_list">
                                 {{# if( commentObj.img_urls && commentObj.img_urls.length >0) { }}
									{{# for(var m =0;m<commentObj.img_urls.length;m++) { }}
                                         {{# var commentImg =commentObj.img_urls[m] }}
										<li><img src="{{ commentImg.img_urls_small }}" width="100" height="100" alt=""></li>
                           			{{# } }}
                                 {{# }}}
                          
                       </ul>
                   </li>


                   {{# } }}


</script>




<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/info/wx_shop_order_comLis.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 