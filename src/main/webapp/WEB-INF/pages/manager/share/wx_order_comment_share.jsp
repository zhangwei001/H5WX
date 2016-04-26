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

<div class="shopmanmain wx_guanlian bghui" id="itemDetailsOfServeView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'>
		
	</div>
	<div id="sharedCommentItemTemp"></div>
    <div class="shopckdd_dat shopckdd_shopinfo" id="shopInfoTemp"></div>
</div>



 <script type="text/html" id="commentsItem">

<div class="share_wxtop_main">
<div class="share_wxtop">

<p class="fl">关注我们，享更多低价折扣哦~</p>

<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>

</div>
</div>
<div style="width: 100%;height: 10px; margin-top:-20px" class="bghui"></div>
    <ul class="shophyk_dat shopckdd_dat ">
           {{# if(d.content.item_type ==2 ) { }}
				<li class="a1 fl"><p><img src="{{ d.content.img_url }}" width="130" height="130"></p></li>
				<li class="a2 fl">
					<p class="tatle"><span class="fl">{{ d.content.item_name}}</span></p>
				</li>
           {{#}else if(d.content.item_type ==1) { }}
				<li class="a1 fl"><p><img src="{{ d.content.img_url }}" width="130" height="130"></p></li>
				<li class="a2 fl">
					<p class="tatle"><span class="fl">{{ d.content.item_name}}</span></p>
					<p class="info"> <span class="txtpink">{{ d.content.item_info }}</span></p>
				</li>

           {{# }else if(d.content.item_type ==0) { }}
                <li class="a1 fl"><p><img src="{{ d.content.img_url }}" width="130" height="130"></p></li>
				<li class="a2 fl">
					<p class="tatle"><span class="fl">{{ d.content.item_name}}</span></p>
					<p class="info">时长： <span class="txtpink">{{ d.content.item_info }}</span></p>
				</li>
           {{# } }}
			
	        
    </ul>
	
	<div class="bgbai pingjia_facebg mt20">
		   
              <div class="pjed_shertop">
				<p><img src="{{ d.wxUserInfo.head_img_url  }}" width="130" height="130"></p>
				<p class="fz26">{{ d.wxUserInfo.nick_name  }}</p>
				<p class="fr fz22">{{ d.content.comment_time }}</p>
			  </div>
			   <hr>
			
			  <div class="pingjia_stars_main pingjiaed_stars">
				 <p class="a1">总体评价：</p>
				 <p class="a2">
                      {{# if(d.content.comment_score== 1 ) { }}
                         <span class="fl mr10">坑爹</span><a><i class="icon-pjface fl icon-pjface05 icon-pjface05a"></i></a>
                      {{#}else if(d.content.comment_score== 2){ }}
						<span class="fl mr10">不满意</span><a><i class="icon-pjface fl icon-pjface04 icon-pjface04a"></i></a>
                      {{#}else if(d.content.comment_score== 3){ }}
                         <span class="fl mr10">一般</span><a><i class="icon-pjface fl icon-pjface03 icon-pjface03a"></i></a>
                      {{#}else if(d.content.comment_score== 4){ }}
                         <span class="fl mr10">满意</span><a><i class="icon-pjface fl icon-pjface02 icon-pjface02a"></i></a>
                      {{#}else{ }}
                         <span class="fl mr10">很好</span><a><i class="icon-pjface fl icon-pjface01 icon-pjface01a"></i></a>
                      {{# } }}
				 </p>
			  </div>

           {{# if(d.evaluateList) { }}
             {{# for(var i= 0;i<d.evaluateList.length;i++) { }}
                 {{# var item = d.evaluateList[i] }}
                    

                    <div class="pingjia_stars_main pingjiaed_stars">
                        {{# if(item.par_id== 2) { }}
                            
                                   {{# if(item.score > 0) {}}
                                  	 <p class="a1">店铺环境：</p>
                                   {{# } }}

                                    {{# if( item.score == 0 ) { }}
                                        
				                         
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
				                         
									{{# }else if( item.score == 5 ){  }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                          
                                    {{# } }}
                                    
                                    
                         	{{# }else if(item.par_id== 3) {  }}

								  {{# if(item.score > 0) {}}
                                   <p class="a1">性&nbsp;<span class="ml5">价</span>&nbsp;<span class="ml5">比：</span></p>
                                   {{# } }}

                                  
                                    {{# if( item.score == 0 ) { }}
                                        
				                  
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
				                         
									{{# }else if( item.score == 5) { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                       
                                    {{# } }}

							{{# }else if(item.par_id== 4) {   }}

                                   {{# if(item.score> 0) {}}
                                    <p class="a1">效&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="ml5">果：</span></p>
                                   {{# } }}
                                 
                                   {{# if( item.score == 0 ) { }}
                                        
				                      
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
				                           
									{{# }else if( item.score == 5 ){ }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                           
                                    {{# } }}
						 	{{# }else if(item.par_id== 5) {  }}
                                    
								   {{# if(item.score > 0) {}}
                                 	 <p class="a1">手法技术：</p>
                                   {{# } }}
     
                                   
                                   {{# if( item.score == 0 ) { }}
                                       
				                        
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
				                           
									{{# }else if( item.score == 5 ) { }}
                                              <p class="a2">
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
					                          <a><i class="icon-starbig icon-starbig01 icon-starbig02"></i></a>
				                            </p>
				                        
                                    {{# } }}
						 	{{# }else if(item.par_id==1) {  }}
									{{# if( item.score > 0 ) { }}
											<p class="a1">服务态度：</p>
									{{# } }}
                                   
                                   {{# if( item.score == 0 ) { }}
                                        
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
				                           
									{{# }else if( item.score == 5){ }}
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
             {{# } }}

            <hr>
		
			<p class="fz24 mt20">
                    {{# if(d.content.comment_message && d.content.comment_message != null && d.content.comment_message != '') { }}
                    		{{ decodeURI(d.content.comment_message) }}
                    {{# }else {  }}
                                                                                  该用户没有写具体评价呢~
                    {{# } }}
            		
            </p>
			<ul class="pingjia_picupload pjed_picupload bgbai">
                {{# for(var j = 0;j < d.content.img_urls.length;j++) { }}
                     <li class="poi1"><a><img src="{{ d.content.img_urls[j].img_urls1 }}" width="97" height="99"></a></li>
                {{# } }}
				
			</ul>
		
	    </div>
    </script>
<script type="text/html" id="shopInfoSection">

<p class="shop_infotatle">商家信息</p>
<ul class="shopckdd_infotab">
	<li class="fl">
		<p class="td1">
		 <span class="tatle">{{ d.shopInfoObj.shop_name }}</span>
            <span class="pic">
             {{# if(d.shopInfoObj.shop_stars ==1) { }}
                   <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
             {{# } else if(d.shopInfoObj.shop_stars ==2){  }}
                    <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			{{# } else if(d.shopInfoObj.shop_stars ==3){  }}
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			{{# } else if(d.shopInfoObj.shop_stars ==4){  }}
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			{{# } else if(d.shopInfoObj.shop_stars ==5){  }}
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
					<img src="<%=request.getContextPath()%>/resources/images/meirong/shop/tmpdaiya_r3_c4.gif" width="24" height="21">
			
             {{# } }}
            </span>
		</p>
		<p class="td2">
			<span class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/dbponit_r3_c2.gif" width="29" height="41"></span>
			<span class="a2 poi1">{{ d.shopInfoObj.shop_addr }}<span class="poi2">{{ (Number(d.shopInfoObj.distance)/1000).toFixed(1) }}km</span></span>
		</p>
	</li>
	<li class="fr"><a   href="tel:{{ d.shopInfoObj.shop_tel }}" ><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/cibangphone_r2_c2.gif" width="41" height="51"></a></li>
</ul>
</script>
 
 
<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/share/wx_order_comment_share.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 