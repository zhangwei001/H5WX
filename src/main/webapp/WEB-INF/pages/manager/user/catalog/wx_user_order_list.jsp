<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->

<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/yy_orders.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/javascript/mobiscroll/css/mobiscroll-2.5.2.css?v=1" rel="stylesheet" type="text/css" />
<title>消费记录</title>
<style>
	a{text-decoration:none}
	.shopddxq_dat .tatle{margin-bottom:35px;}
</style>
</head>
<script type="text/javascript">
	var webRoot="<%=request.getContextPath()%>";
</script>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">



<div class="shopmanmain wx_guanlian" style="display: none;" id="customView">
	<ul class="wx_nocardmain">
		<li class="a1"><img src="<%=request.getContextPath()%>/resources/images/meirong/shop/nodingdan_r2_c2.png" width="141" height="228">
		<li class="a2">您还没有任何订单，快去主页选购吧</li>
		<li class="a3"><a class="but0 but2" >进入主页</a></li>
	</ul>
</div>



<script type="text/html" id="customOrderListTmpl">
	<div class="shopmanmain wx_guanlian bghui">

{{# for(var i=0;i<d.content.length;i++ ){ }}
	{{# var item=d.content[i];  }}
  <div class="bgbai mb20">
	<ul class="shophyk_dat shopddxq_dat">
	<li class="a1 fl">
			{{# if(item.order_status==0){ }}
				<p class="txt1">进行中 </p>
			{{# }else if(item.order_status==1){ }}
				<p class="txt1">已完成</p>
			{{# }else if(item.order_status==2){ }}
				{{# if((item.order_way==5 || item.order_way==6)){ }}
					{{# if( -1==item.pay_status){ }}
						<p class="txt1">待付款</p>
					{{# }else if(1==item.pay_status){ }}
						<p class="txt1">预约成功</p>
					{{# } }}
				{{# }else if((item.order_way== -1 )){ }}
						<p class="txt1">预约成功</p>
                {{# }else if(item.order_way== 0) { }}
                       {{# if(item.pay_status==-1) { }}
							<p class="txt1">预约成功</p>
                       {{# } }}
				{{# }else{  }}
                        {{# if(item.order_from_flag==1) { }}
						<p class="txt1">已付定金</p>
                        {{# } }}
                 {{# } }}
			{{# }else if(item.order_status==3){ }}
				<p class="txt1">已取消</p>
			{{# }else if(item.order_status==4){ }}
                {{# if((item.order_way==6 || item.order_way==5) && item.pay_status==-1) { }}
					<p class="txt1">待付款</p>
                {{# }else {  }}
					<p class="txt1">预约成功 </p>
                {{# } }}
			{{# }else if(item.order_status==5){ }}
				<p class="txt1">退款中</p>
			{{# }else if(item.order_status==6){ }}
				<p class="txt1">已退款</p>
			{{# }else if(item.order_status==7){ }}
				<p class="txt1">退款失败</p>
			{{# }else if(item.order_status==8){ }}
				<p class="txt1">已结束</p>
			{{# }else{ }}
				<p class="txt1">状态异常</p>
			{{# } }}
		 <p data-click="true"  data-mainOrderId="{{  item.order_id  }}" data-shopId="{{  item.s_id  }}" style="position:relative">
			<a href="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_order_info?commentStatus={{ item.comment_stauts }}&orderId={{ item.order_id }}&shopId={{  item.shop_id  }}&shopSid={{item.s_id }}&orderStatus={{ item.order_status}}">
           	 <img src="{{ item.img_url }}" width="130" height="130"> 
              {{# if(item.order_type == 1 || item.order_type == 2 || item.order_type == 3) { }}
              <span class="kx_icon"></span>
 			  {{# } }}
			</a>
         </p>
		</li>
       
     {{# if( item.order_status==4) { }}

			<a style="text-decoration:none" href="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_order_info?commentStatus={{ item.comment_stauts }}&orderId={{ item.order_id }}&shopId={{  item.shop_id  }}&shopSid={{item.s_id }}&reservedTime={{item.order_time}}&orderStatus={{item.order_status}}">
				<li class="a2 fl" >
					<p class="time">{{ item.order_time }} <span class="fr">
           			     {{# if(item.order_status == 1) { }}
                      		  {{# if(item.comment_stauts  == 1) { }}
 									{{ item.comment_info }}</span></p>
                       		 {{# } }}
               			 {{# } }}
				
					<p class="tatle"><span class="fl">{{ item.info }}</span></p>
                    {{# if(item.pre_time) { }}
          				<p class="info mtm14 reservTime" data-order-id="{{item.order_id }}">预约时间：{{ item.pre_time}}</p>
                    {{# }else {  }}
                 		<p class="info mtm14 reservTime" style="height:29px"></p>
                    {{#  } }}
					<p class="info">总价： 
     	 			  <span class="txtpink">
           				 ¥{{ item.order_money }} <!-- {{ item.money_extra||'' }} -->
         			 </span>      
         			 <span class="ml32">|</span>  数量： <span class="txtpink">{{  item.num }}</span>
       				 </p>
				</li>
  			</a>            
     {{# }else if(item.order_status==5 || item.order_status==6 || item.order_status==7) { }}
			 <a style="text-decoration:none" href="{{ d.webRoot }}//agent/manager-user-info-wx_user_refund_details?orderId={{ item.order_id }}&shopId={{  item.shop_id  }}&shopSid={{item.s_id }}">
				<li class="a2 fl" >
					<p class="time">{{ item.order_time }} <span class="fr">
            			    {{# if(item.order_status == 1) { }}
                        			
 									{{ item.comment_info }}</span></p>
                       			 
               				 {{# } }}
				
					<p class="tatle"><span class="fl">{{ item.info }}</span></p>

       			  {{# if( item.order_status==4) { }}
 
         			     <p class="info mtm14 reservTime" >消费时间：{{ item.order_time}}</p>
        		 {{# } }}
                     {{# if(item.pre_time) { }}
          				<p class="info mtm14 reservTime" data-order-id="{{item.order_id }}">预约时间：{{ item.pre_time}}</p>
                    {{# }else{  }}
						<p class="info mtm14 reservTime" style="height:29px"></p>
                    {{#  }  }}
					<p class="info">总价： 
     	  				 <span class="txtpink">
         		  			 ¥{{ item.order_money }}  <!-- {{ item.money_extra||'' }} -->
        				 </span>      
         				 <span class="ml32">|</span>  数量： <span class="txtpink">{{  item.num }}</span>
        			</p>
				</li>
  			</a>

     {{# }else {  }}
			 <a style="text-decoration:none" href="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_order_info?commentStatus={{ item.comment_stauts }}&orderId={{ item.order_id }}&shopId={{  item.shop_id  }}&shopSid={{item.s_id }}&orderStatus={{ item.order_status}}">
				<li class="a2 fl" >
					<p class="time">{{ item.order_time }} <span class="fr">
            			    {{# if(item.order_status == 1) { }}
                        			
 									{{ item.comment_info }}</span></p>
                       			 
               				 {{# } }}
				
					<p class="tatle"><span class="fl">{{ item.info }}</span></p>

       			  {{# if( item.order_status==4) { }}
 
         			     <p class="info mtm14 reservTime" >消费时间：{{ item.order_time}}</p>
        		  {{# }else {  }}
                         <p class="info mtm14 reservTime" style="height:29px"></p>
                  {{# } }}
					 {{# if((item.order_status!=1) && item.pre_time) { }}
                        {{# if(item.order_status !=3) { }}
          				 <p class="info mtm14 reservTime" data-order-id="{{item.order_id }}">预约时间：{{ item.pre_time}}</p>
                         {{# }else {  }}
							<p class="info mtm14 reservTime" style="height:29px"></p>
                         {{# } }}
                     {{# } }}
					<p class="info">总价： 
     	  				 <span class="txtpink">
         		  			 ¥{{ item.order_money }}
                         <!--     {{ item.money_extra||'' }} -->
        				 </span>      
         				 <span class="ml32">|</span>  数量： <span class="txtpink">{{  item.num }}</span>
        			</p>
				</li>
  			</a>
     {{# } }}
   



  </ul>
    
    	
            {{# if(item.order_status == 1 ) { }}
      			{{# if( item.comment_stauts  == 0 ) { }}
           	  		<div class="shopckdd_yyxfdat_buts">
						<p class="fr mr30 ml20"><a  style="text-decoration:none" class="yyxfdat_but0 yyxfdat_but3" href="{{ d.webRoot }}/agent/manager-user-catalog-wx_user_order_comment?orderId={{ item.order_id }}&shopId={{  item.shop_id  }}&shopSid={{item.s_id }}">去评价</a></p>
					</div>
      			{{# } }}
          
         
            {{# }else if(item.order_status != 3) {  }}
				{{# if((item.order_way==5 || item.order_way==6) && -1==item.pay_status){ }}
					{{# if(item.order_way==6){ }}
					<div class="shopckdd_yyxfdat_buts">
						<p class="fr mr30 ml20"><a data-item-pay="true" data-item-from="orderLis" data-shop-sid="{{item.s_id}}" data-order-id="{{item.order_id}}" data-shop-id="{{item.shop_id}}"  style="text-decoration:none" class="yyxfdat_but0 yyxfdat_but3" >去付款</a></p>
					</div>
					{{# }else if(item.order_way==5){ }}
				<!--	<div class="shopckdd_yyxfdat_buts">
						<p class="fr mr30 ml20"><a   style="text-decoration:none" class="yyxfdat_but0 yyxfdat_but3" >去付款</a></p>
					</div>
                -->
					{{# } }}
				{{# }else if((item.order_way==5 || item.order_way==6) && 1==item.pay_status){  }}
                        {{# if(item.order_status != 5 && item.order_status != 0 && item.order_status != 6 && item.order_status != 7) {}}
						 <div class="shopckdd_yyxfdat_buts">
							
								<div class="orderLisTime"> 
								 	<div class="page page-current page-datetime-picker changePreTime"   data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" >
                       					<input type="text" data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}"  placeholder="修改预约时间" class='datetime-picker' readonly  />
										<a class="yyxfdat_but0 yyxfdat_but2"  id="beginTime" >修改预约时间</a>
         			          		</div>
                                </div>
							
							<p class="fr"><a  data-apply-refund="true" class=" yyxfdat_but0 yyxfdat_but1" data-refund-money="{{item.order_money}}"  data-shop-id="{{item.shop_id}}"  data-order-id="{{ item.order_id }}" data-shop-sid="{{ item.s_id}}" >申请退款</a></p>
						</div>
                       {{# } }}
            {{# }else if(  item.order_status == 4  ){  }}
                   
                   {{# if(item.order_type != 3) { }}
                    <div class="shopckdd_yyxfdat_buts">
						
							<a class="orderLisTime">
								<div class="page page-current page-datetime-picker changePreTime"  data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" >
                       					<input type="text"  data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" placeholder="修改预约时间" class='datetime-picker' readonly  />
										<a class="yyxfdat_but0 yyxfdat_but2"  >修改预约时间</a>
         			          	</div>
							</a>
						
						
                      	<p class="fr"><a class="cancelPre yyxfdat_but0 yyxfdat_but1" data-shop-id="{{item.shop_id}}" data-order-id="{{ item.order_id }}" data-shop-sid="{{ item.s_id}}" >取消预约</a></p>
					</div>
                    <div class="datePlugin" data-shop-id="{{item.order_id}}"></div> 
     
                   {{# } }}  

			{{# }else if(item.order_status == 2) {  }}
                 {{# if(item.pay_status== -1 && ( item.order_way== -1 || item.order_way==0) ) { }}
				    <div class="shopckdd_yyxfdat_buts">
						
							<a class="orderLisTime">
								<div class="page page-current page-datetime-picker changePreTime"  data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" >
                       					<input type="text"  data-order-id="{{ item.order_id}}" data-shop-id="{{item.shop_id}}" placeholder="修改预约时间" class='datetime-picker' readonly  />
										<a class="yyxfdat_but0 yyxfdat_but2"  >修改预约时间</a>
         			          	</div>
							</a>
						
						
                      	<p class="fr"><a class="cancelPre yyxfdat_but0 yyxfdat_but1" data-shop-id="{{item.shop_id}}" data-order-id="{{ item.order_id }}" data-shop-sid="{{ item.s_id}}" >取消预约</a></p>
					</div>
                    <div class="datePlugin" data-shop-id="{{item.order_id}}"></div> 
				 {{# } }}


            {{# } }}
      	{{# } }}
   </div>
{{# } }}


</div>
</script>
 

<!-- 外部js资源文件引入 -->


<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/mobiscroll/js/mobiscroll-2.5.2.js?v=1"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_order_list.js"></script>


<jsp:include  page="../../../layout_app/footer.jsp" /> 