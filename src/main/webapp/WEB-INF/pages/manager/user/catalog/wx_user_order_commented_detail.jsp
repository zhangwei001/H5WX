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

<div class="shopmanmain wx_guanlian bgbai lh40" id="commentView">
	<div class='loader loader--audioWave'></div>
	
</div>


<script type="text/html" id="lookInCommentTemp">
     <div class="bgbai pingjia_facebg mb20">
		<p class="pjed_tatle">总体评价:</p>
		<div class="pingjia_face_main pingjiaed_face">
            {{# if(d.content){ }} 
				{{# if(d.content.comment_score== 1) { }}
                 	 <p><a><i class="icon-pjface fl icon-pjface05 icon-pjface05a"></i></a> <span class="fl ml20">坑爹</span></p>
          			  {{# }else if(d.content.comment_score== 2) { }}
                 	 <p><a><i class="icon-pjface fl icon-pjface04 icon-pjface04a"></i></a> <span class="fl ml20">不满意</span></p>
 					{{# }else if(d.content.comment_score== 3) { }}
                		  <p><a><i class="icon-pjface fl icon-pjface03 icon-pjface03a"></i></a> <span class="fl ml20">一般</span></p>
 						{{# }else if(d.content.comment_score== 4) { }}
               	   <p><a><i class="icon-pjface fl icon-pjface02 icon-pjface02a"></i></a> <span class="fl ml20">满意</span></p>
 						{{# }else  { }}
                   <p><a><i class="icon-pjface fl icon-pjface01 icon-pjface01a"></i></a> <span class="fl ml20">很好</span></p>
           		 {{# } }}

            {{# } }}
            
		</div>
	</div>


    <div class="bgbai pingjia_facebg">
           {{# if(d.evaluateList && d.evaluateList.length>0) { }}
          {{# for(var i= 0;i<d.evaluateList.length;i++) { }}
                 {{# var item = d.evaluateList[i] }}
                    

                    <div class="pingjia_stars_main pingjiaed_stars">
                        {{# if(item.par_id== 2) { }}
                                   <p class="a1">店铺环境：</p>
                                    {{# if( item.score == 0 ) { }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                         
                                    {{# }else if(  item.score == 1 ){ }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                       
                                               
									{{# }else if(   item.score == 2 ){ }}
                                          <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                        
									{{# }else if( item.score == 3 ){ }}
                                           <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                        
									{{# }else if( item.score == 4 ){ }}
                                            <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01"></i></a>
				                            </p>
				                         
									{{# }else { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                          
                                    {{# } }}
                                    
                                    
                         	{{# }else if(item.par_id== 4) {  }}
                                   <p class="a1">性&nbsp;<span class="ml5">价</span>&nbsp;<span class="ml5">比：</span></p>
                                    {{# if( item.score == 0 ) { }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                        
                                    {{# }else if(  item.score == 1 ){ }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                       
                                               
									{{# }else if(   item.score == 2 ){ }}
                                          <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                        
									{{# }else if( item.score == 3 ){ }}
                                           <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                         
									{{# }else if( item.score == 4 ){ }}
                                            <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01"></i></a>
				                            </p>
				                         
									{{# }else { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                       
                                    {{# } }}

							{{# }else if(item.par_id== 5) {   }}
                                   <p class="a1">效&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="ml5">果：</span></p>
                                   {{# if( item.score == 0 ) { }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                      
                                    {{# }else if(  item.score == 1 ){ }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                       
                                               
									{{# }else if(   item.score == 2 ){ }}
                                          <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                       
									{{# }else if( item.score == 3 ){ }}
                                           <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                        
									{{# }else if( item.score == 4 ){ }}
                                            <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01"></i></a>
				                            </p>
				                           
									{{# }else { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                           
                                    {{# } }}
						 	{{# }else if(item.par_id== 1) {  }}
                                   <p class="a1">手法技术：</p>
                                   {{# if( item.score == 0 ) { }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                        
                                    {{# }else if(  item.score == 1 ){ }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                        
                                               
									{{# }else if(   item.score == 2 ){ }}
                                          <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                        
									{{# }else if( item.score == 3 ){ }}
                                           <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                        
									{{# }else if( item.score == 4 ){ }}
                                            <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01"></i></a>
				                            </p>
				                           
									{{# }else { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                        
                                    {{# } }}
						 	{{# }else if(item.par_id== 3) {  }}
                                   <p class="a1">服务态度：</p>
                                   {{# if( item.score == 0 ) { }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                       
                                    {{# }else if(  item.score == 1 ){ }}
                                         <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                         </p>
				                       
                                               
									{{# }else if(   item.score == 2 ){ }}
                                          <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                         
									{{# }else if( item.score == 3 ){ }}
                                           <p class="a2">
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                         <a><i class="icon-starbig icon-starbig01 "></i></a>
					                         <a><i class="icon-starbig icon-starbig01"></i></a>
				                          </p>
				                         
									{{# }else if( item.score == 4 ){ }}
                                            <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01"></i></a>
				                            </p>
				                           
									{{# }else { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                            
                                    {{# } }}

                        {{# } }}

				       
			       </div>

             {{# } }}
             {{# }}}
           <hr>
		
		<p class="fz24 mt20">
             {{# if( d.content){ }}
				 {{# if( d.content.comment_message && d.content.comment_message != null &&  d.content.comment_message !="") { }}
					 {{ decodeURI(d.content.comment_message)}}
                 {{# } }}
             {{# } }}
            
            
        </p>
		
		<ul class="pingjia_picupload pjed_picupload bgbai">
            {{# if(d.content) {　}}
					{{# for(var i = 0;i<d.content.img_urls.length;i++) { }}
                 <li class="poi1"><a><img src="{{ d.content.img_urls[i].img_urls1 }}" width="97" height="99"></a></li>
            {{# } }}
　　　　　　　　　{{# } }}
            
			
		</ul>

    </div>

</script>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_order_commented_detail.js"></script>
<jsp:include  page="../../../layout_app/footer.jsp" /> 