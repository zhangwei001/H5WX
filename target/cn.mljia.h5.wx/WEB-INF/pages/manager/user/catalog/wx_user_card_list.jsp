<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/user/info/yy_my_xfk.css" rel="stylesheet" type="text/css" />

<style>
	a{text-decoration:none}
</style>
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">

<!-- <div class="shopmanmain wx_guanlian bghui" id="itemDetailsOfServeView">
	渲染区域
	<div class='loader loader--audioWave'></div>
</div>
 -->

<script type="text/html"  id="customViewTemp">
	<div class="shopmanmain wx_guanlian" id="customView" >
       
	<ul class="wx_nocardmain">
	<li class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/nocardicon_r2_c2.png" width="192" height="203">
	<li class="a2">暂无消费卡信息，快去主页选购吧</li>
	<%-- <li class="a3"><a class="but0 but2" href="<%=request.getContextPath()%>/agent/${shopId}/meirong-shop-shop_info" id="login_shop">进入店铺</a></li> --%>
	<li class="a3"><a class="but0 but2" >进入主页</a></li>
	</ul>
	</div>
</script>



<div class="shopmanmain wx_guanlian bghui">
	
	<div class="my_kx_have" id="bgbai"></div>
	
</div>

<script type="text/html" id="userCardInfo"> 




{{# for(var i=0;i<d.content.length;i++){  }}
	{{# var item=d.content[i];  }}
		{{# if(i<100){ }}
			{{# if(item.card_type==0){  }}
  			<div class="my_kx_ck">
  			<a    href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title"> - {{ item.card_name }} -</p>
			   <span class="yy_xhx"></span>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">剩余次数：</span> 
                   <font class="my_kx_num">{{  ( (item.mas_left_num || 0) == -1)? '无限' : (item.mas_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
				<div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   <font class="my_kx_num">{{  ( (item.item.pre_left_num ) == -1)? '无限' : (item.pre_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
               <div class="my_kx_bottom">
					{{# if(item.card_date == -1){ }}
							<span class="my_kx_bottom_s1">永久有效期</span>
                    {{# }else {  }}
  							 <span class="my_kx_bottom_s1">有效期至{{  item.card_date }}</span>
                    {{# } }}
                   <a href="javascript:;" class="btn_used_this">
						<span>使用此卡</span>
						<font></font>
				   </a>
               </div>
               
           </a>
           </div>



			{{# } else {  }}


			 <div class="my_kx_czk">
 			<a href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title">- {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_balance">
                   <span class="my_kx_balance_text">剩余金额：</span>
                   <font class="my_kx_num"><c>¥</c> {{  item.card_price }}</font>
               </div>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   {{# if(item.pre_left_num == -1 || item.pre_left_num>0){ }}
                   		<font class="my_kx_num">{{  -1==item.pre_left_num?'无限次':(item.pre_left_num ) }}</font>
                   		<span class="my_kx_give_case_text2">次</span> 
				   {{# }else { }}
						<font class="my_kx_num">0</font>
                   		<span class="my_kx_give_case_text2">次</span> 

                   {{# }}}

               </div>
               <div class="my_kx_bottom">
                      {{# if(item.card_date == -1){ }}
							 <span class="my_kx_bottom_s1">永久有效期</span>
                     {{# }else {  }}
							 <span class="my_kx_bottom_s1">有效期{{  item.card_date }}</span>
                           
                     {{# } }}
                  
                   <a href="javascript:;" class="btn_used_this">
						<span>使用此卡</span>
						<font></font>
					</a>
               </div>
			</a>
           </div>

			{{# } }}

		{{# }else{ }}

			{{# if(item.card_type==0){  }}
             <div class="my_kx_ck" style="display:none;"  data-none="true">
  			<a    href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title"> - {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">剩余次数：</span> 
                   <font class="my_kx_num">{{  ( (item.mas_left_num || 0) == -1)? '无限' : (item.mas_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
				<div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   <font class="my_kx_num">{{  ( (item.item.pre_left_num ) == -1)? '无限' : (item.pre_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
               <div class="my_kx_bottom">
					{{# if(item.card_date == -1){ }}
							<span class="my_kx_bottom_s1">永久有效期</span>
                    {{# }else {  }}
  							 <span class="my_kx_bottom_s1">有效期至{{  item.card_date }}</span>
                    {{# } }}
                   <a href="javascript:;" class="btn_used_this">
						<span>使用此卡</span>
						<font></font>
					</a>
               </div>
               
           </a>
           </div>
		
			{{# } else {  }}

         <div class="my_kx_czk" style="display:none;"  data-none="true">
 			<a href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title">- {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_balance">
                   <span class="my_kx_balance_text">剩余金额：</span>
                   <font class="my_kx_num"><c>¥</c> {{  item.card_price }}</font>
               </div>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   {{# if(item.pre_left_num == -1 || item.pre_left_num>0){ }}
                   		<font class="my_kx_num">{{  -1==item.pre_left_num?'无限次':(item.pre_left_num ) }}</font>
                   		<span class="my_kx_give_case_text2">次</span> 
				   {{# }else { }}
						<font class="my_kx_num">0</font>
                   		<span class="my_kx_give_case_text2">次</span> 

                   {{# }}}

               </div>
               <div class="my_kx_bottom">
                      {{# if(item.card_date == -1){ }}
							 <span class="my_kx_bottom_s1">永久有效期</span>
                     {{# }else {  }}
							 <span class="my_kx_bottom_s1">有效期{{  item.card_date }}</span>
                           
                     {{# } }}
                  
                   <a href="javascript:;" class="btn_used_this">
						<span>使用此卡</span>
						<font></font>
					</a>
               </div>
			</a>
           </div>
		
			{{# } }}
	{{# } }}


{{# } }}
{{# if( d.accessTotalCardNum >5  ) { }}
	<a class="shophyk_dat_more" id="accessPageBtn">更多可用卡项<i class="icon-morearrow_d"></i></a>
{{# } }}
</script>


<script type="text/html" id="getMoreAccessCardInfo">

{{# for(var i=0;i<d.content.length;i++){  }}
	{{# var item=d.content[i];  }}
		{{# if(i<100){ }}
			{{# if(item.card_type==0){  }}
		
		<div class="my_kx_ck">
  			<a    href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title"> - {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">剩余次数：</span> 
                   <font class="my_kx_num">{{  ( (item.mas_left_num || 0) == -1)? '无限' : (item.mas_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
				<div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   <font class="my_kx_num">{{  ( (item.item.pre_left_num ) == -1)? '无限' : (item.pre_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
               <div class="my_kx_bottom">
					{{# if(item.card_date == -1){ }}
							<span class="my_kx_bottom_s1">永久有效期</span>
                    {{# }else {  }}
  							 <span class="my_kx_bottom_s1">有效期至{{  item.card_date }}</span>
                    {{# } }}
                   <a href="javascript:;" class="btn_used_this">使用此卡<font>></font></a>
               </div>
               
           </a>
        </div>

			{{# } else {  }}
		<div class="my_kx_czk">
 			<a href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title">- {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_balance">
                   <span class="my_kx_balance_text">剩余金额：</span>
                   <font class="my_kx_num"><c>¥</c> {{  item.card_price }}</font>
               </div>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   {{# if(item.pre_left_num == -1 || item.pre_left_num>0){ }}
                   		<font class="my_kx_num">{{  -1==item.pre_left_num?'无限次':(item.pre_left_num ) }}</font>
                   		<span class="my_kx_give_case_text2">次</span> 
				   {{# }else { }}
						<font class="my_kx_num">0</font>
                   		<span class="my_kx_give_case_text2">次</span> 

                   {{# }}}

               </div>
               <div class="my_kx_bottom">
                      {{# if(item.card_date == -1){ }}
							 <span class="my_kx_bottom_s1">永久有效期</span>
                     {{# }else {  }}
							 <span class="my_kx_bottom_s1">有效期{{  item.card_date }}</span>
                           
                     {{# } }}
                  
                   <a href="javascript:;" class="btn_used_this">使用此卡<font>></font></a>
               </div>
			</a>
           </div>
			{{# } }}

		{{# }else{ }}

			{{# if(item.card_type==0){  }}
		<div class="my_kx_ck" style="display:none;"  data-none="true">
  			<a    href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title"> - {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">剩余次数：</span> 
                   <font class="my_kx_num">{{  ( (item.mas_left_num || 0) == -1)? '无限' : (item.mas_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
				<div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   <font class="my_kx_num">{{  ( (item.item.pre_left_num ) == -1)? '无限' : (item.pre_left_num || 0) }}</font>
                   <span class="my_kx_give_case_text2">次</span> 
               </div>
               <div class="my_kx_bottom">
					{{# if(item.card_date == -1){ }}
							<span class="my_kx_bottom_s1">永久有效期</span>
                    {{# }else {  }}
  							 <span class="my_kx_bottom_s1">有效期至{{  item.card_date }}</span>
                    {{# } }}
                   <a href="javascript:;" class="btn_used_this">使用此卡<font>></font></a>
               </div>
               
           </a>
           </div>
		
			{{# } else {  }}
 		<div class="my_kx_czk" style="display:none;"  data-none="true">
 			<a href ="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_card_detail?&cardId={{ item.card_id }}&shopId={{  item.shop_id  }}&cardType={{ item.card_type}}">
               <p class="my_kx_title">- {{ item.card_name }} -</p>
				<span class="yy_xhx"></span>
               <div class="my_kx_balance">
                   <span class="my_kx_balance_text">剩余金额：</span>
                   <font class="my_kx_num"><c>¥</c> {{  item.card_price }}</font>
               </div>
               <div class="my_kx_give_case">
                   <span class="my_kx_give_case_text">赠送项目：</span> 
                   {{# if(item.pre_left_num == -1 || item.pre_left_num>0){ }}
                   		<font class="my_kx_num">{{  -1==item.pre_left_num?'无限次':(item.pre_left_num ) }}</font>
                   		<span class="my_kx_give_case_text2">次</span> 
				   {{# }else { }}
						<font class="my_kx_num">0</font>
                   		<span class="my_kx_give_case_text2">次</span> 

                   {{# }}}

               </div>
               <div class="my_kx_bottom">
                      {{# if(item.card_date == -1){ }}
							 <span class="my_kx_bottom_s1">永久有效期</span>
                     {{# }else {  }}
							 <span class="my_kx_bottom_s1">有效期{{  item.card_date }}</span>
                           
                     {{# } }}
                  
                   <a href="javascript:;" class="btn_used_this">使用此卡<font>></font></a>
               </div>
			</a>
           </div>
		
			{{# } }}
	{{# } }}


{{# } }}
{{# if( d.pageTimes >0 ) { }}
	<a class="shophyk_dat_more" id="accessPageBtn">更多可用卡项<i class="icon-morearrow_d"></i></a>
{{# } }}
</script>


<script type="text/html" id="userCardHistoryInfo">

<p class="shophyk_txt01">历史卡项（{{ d.customCardHistoryNum }}）<span class="fr mr30" id="historyPageBtn"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/downarrow_r22_c15.gif" width="22" height="13"></span></p>
{{# for(var j= 0;j<d.content.length;j++){  }}
     {{# var item=d.content[j]; }}
		{{# if(j<100){ }}
	     <ul class="shophyk_dat shophyk_end" style="display:none;"  data-none="true">
	<li class="a1 fl poi1"><img src="{{ item.card_img  }}" width="130" height="130"><p class="poi2">已完结</p></li>
	<li class="a2 fl poi1">
	<p class="tatle">{{ item.card_name  }}</p>
	<p class="info">¥{{ item.card_price  }}</p>
	<p class="info">已完结</p>
	<p class="poi2"><img src="{{ d.webRoot  }}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
	</li>
	</ul>
	{{# }else{  }}
		 <ul class="shophyk_dat shophyk_end" style="display:none;"  data-none="true">
	<li class="a1 fl poi1"><img src="{{ item.card_img  }}" width="130" height="130"><p class="poi2">已完结</p></li>
	<li class="a2 fl poi1">
	<p class="tatle">{{ item.card_name  }}</p>
	<p class="info">¥{{ item.card_price  }}</p>
	<p class="info">已完结</p>
	<p class="poi2"><img src="{{ d.webRoot  }}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
	</li>
		</ul>

	{{# }  }}

{{# }  }}

</script>









 

<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_card_list.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 