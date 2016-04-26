<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/meirong/user/yy_vip_center.css">
<script type="text/javascript">
		/* var phoneWidth =  parseInt(window.screen.width);
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
 <div class="shopmanmain wx_guanlian bghui lh40">
 
       <div class="vip_top_box"></div>
       
       <div class="jy_anarchy" id="orderStatueNumView"></div>
       
       <script type="text/html" id="userWXInfoTemp">
		
            <div class="vip_pic">
                <img src="{{ d.content.head_img_url}}" alt="" class="vip_pic_img">
            </div>
            <div class="vip_inf_box">
                <p class="vip_user_name">{{ d.content.nick_name}}</p>
          <!--      <p class="vip_user_number">会员号：1125467</p> -->
            </div>
       
       </script>
       
       
      
        <script type="text/html" id="orderStatueNumTemp">
        
		 {{# var  dataArra = d.content.length>0 ?  d.content.split(",")  : []}}
        
            <ul class="jy_anarchy_list">
                <li id="yuyueLink" data-number="{{ dataArra[0] || 0 }}">
                    <a href="javascript:;">
                        <span class="jy_anarchy_s1">待消费</span>
                        <span class="jy_anarchy_s2">{{ dataArra[0] || 0}}</span>
                    </a>
                </li>
                <li id="commentUrl" data-number="{{ dataArra[1] || 0}}">
                    <a href="javascript:;">
                        <span class="jy_anarchy_s1">待评价</span>
                        <span class="jy_anarchy_s2">{{ dataArra[1] || 0}}</span>
                    </a>
                </li>
                <li class="jy_anarchy_li2" id="refundUrl" data-number="{{ dataArra[2]|| 0 }}">
                    <a href="javascript:;">
                        <span class="jy_anarchy_s1">退款</span>
                        <span class="jy_anarchy_s2">{{dataArra[2] || 0}}</span>
                    </a>
                </li>
            </ul>
    
      
       </script>
      
        
       
        
        <!--关于自己 S-->
        <div class="vip_myself_box">
            <ul class="vip_myself_list">
                <li id="orderLisUrl" >
                    <a href="javascript:;">
                        <span class="vip_myself_icon1 sp"></span>
                        <span class="vip_myself_s2">全部订单</span>
                        <span class="vip_myself_s3">></span>
                    </a>
                </li>
                <li id="cardLisUrl" >
                    <a href="javascript:;">
                        <span class="vip_myself_icon2 sp"></span>
                        <span class="vip_myself_s2">我的消费卡</span>
                        <span class="vip_myself_s3">></span>
                    </a>
                </li>
                <li id="redPacketUrl" >
                    <a href="javascript:;">
                        <span class="vip_myself_icon3 sp"></span>
                        <span class="vip_myself_s2">我的红包</span>
                        <span class="vip_myself_s3">></span>
                    </a>
                </li>
            </ul>
            
        </div>
        <!--关于自己 E-->
        <!--意见反馈 S-->
        <div class="feedback_box">
            <div class="feedback_event">
                <a href="javascript:;">
                    <span class="vip_myself_icon4 sp"></span>
                    <span class="vip_myself_s2">意见反馈</span>
                    <span class="vip_myself_s3">></span>
                </a>
            </div>
        </div>
        <!--意见反馈 E-->
        
        
        
        
        
        
        
        <!--下方浮动导航 S-->
        <div class="bot_nav_float">
            <ul class="nav_float_list">
                <li id="shopHomUrl">
                    <a href="javascript:;" class="nav_float_btn1" id="shopHomeUrl">
                       <span  class="nav_float_s1 sp"></span>
                       <span  class="nav_float_text">首页</span>
                    </a>
                </li>
                <li id="envetUrl">
                    <a href="javascript:;" class="nav_float_btn2" id="shopEventUrl">
                        <span  class="nav_float_s2 sp"></span>
                        <span  class="nav_float_text">优惠促销</span>
                    </a>
                </li>
                <li id="userCenter">
                    <a href="javascript:;" class="nav_float_btn3_h">
                        <span  class="nav_float_s3 sp"></span>
                        <span  class="nav_float_text">我的</span>
                    </a>
                </li>
            </ul>
        </div>
       

        
        
    </div>











<!-- 外部js资源文件引入 -->
 <script src="<%=request.getContextPath()%>/resources/javascript/library/jquery.base64.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/mumber/wx_user_mumber_center.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 

