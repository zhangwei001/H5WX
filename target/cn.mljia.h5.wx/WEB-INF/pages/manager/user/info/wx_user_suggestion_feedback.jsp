<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/meirong/user/info/yy_feedback.css">
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
.lightBtn{background-color:#FF5DBD}

</style>
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">

 <!--内容区域 S-->
    <div class="shopmanmain wx_guanlian bghui">
        <div class="feedback_box">
            <div class="feedback_write_box">
                <textarea name="" class="feedback_write" placeholder="请写下您对我们的意见吧" id="idealText" maxLength="200"></textarea>
                
                <span class="feedback_write_s1">还可输入<font>0</font>个字</span>  
            </div>
            <div class="choose_pic_box">
                <ul class="choose_pic_list pingjia_picupload">
                 
                    <li id="upImgBtn">
                        <a  class="btn_choose_pic" id="picUpload">
                            <img src="<%=request.getContextPath()%>/resources/images/meirong/shop/btn_choose_pic.jpg" alt="" width="166" height="166">
                        </a>
                    </li>
                </ul>
            </div>
            <a href="javascript:;" class="feedback_btn_sure" id="suggestSubmit">确&nbsp;认</a>
            <!-- 按钮灰色效果 class为：feedback_btn_sure -->
            <!-- 按钮红色效果 class为：feedback_btn_sure_h -->
            
            
        </div>
    </div>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
 <script src="<%=request.getContextPath()%>/resources/javascript/library/jquery.base64.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/info/wx_user_suggestion_feedback.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 

