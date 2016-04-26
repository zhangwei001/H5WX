<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/meirong/shop/yy_my_red_env.css">
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
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bghui">
       <!-- 我的红包 没红包 S -->
       <div class="my_red_env_no" style="display:block">
           <div class="my_red_env_no_pic"></div>
           <p class="my_red_env_no_text">店主正在努力封红包ing</p>
       </div>
       <!-- 我的红包 没红包 E -->
       <!-- 我的红包 有红包 S -->
      <!--  <div class="my_red_evn_have">
           <div class="my_red_evn_box">
               <div class="my_red_evn_box_left_orange"><font>￥</font>15</div>
               <div class="my_red_evn_box_right">
                   <p class="my_red_evn_title">十一店庆红包</p>
                   <ul class="my_red_evn_inf">
                       <li class="hid_slh1">该红包只有在消费满40元才可使用</li>
                       <li class="hid_slh1">红包限该账号预约选择在线支付时使用</li>
                       <li class="hid_slh1">2015.2.20至2015.3.20</li>
                   </ul>
               </div>
           </div>
           
           <div class="my_red_evn_box">
               <div class="my_red_evn_box_left_red"><font>￥</font>115</div>
               <div class="my_red_evn_box_right">
                   <p class="my_red_evn_title">十一店庆红包</p>
                   <ul class="my_red_evn_inf">
                       <li class="hid_slh1">该红包只有在消费满400元才可使用</li>
                       <li class="hid_slh1">红包限该账号预约选择在线支付时使用</li>
                       <li class="hid_slh1">2015.2.20至2015.3.20</li>
                   </ul>
               </div>
           </div>
           
           <div class="my_red_evn_box">
               <div class="my_red_evn_box_left_gray"><font>￥</font>30</div>
               <div class="my_red_evn_box_gray_right">
                   <p class="my_red_evn_gray_title">十一店庆红包</p>
                   <ul class="my_red_evn_gray_inf">
                       <li class="hid_slh1">该红包只有在消费满400元才可使用</li>
                       <li class="hid_slh1">红包限该账号预约选择在线支付时使用</li>
                       <li class="hid_slh1">2015.2.20至2015.3.20</li>
                   </ul>
               </div>
           </div>
       </div> -->
       <!-- 我的红包 有红包 E -->
   
        
    </div>




<!-- 外部js资源文件引入 -->
 <script src="<%=request.getContextPath()%>/resources/javascript/library/jquery.base64.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/shop/redpacket/wx_shop_redpackt.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 




