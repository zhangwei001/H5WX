<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="renderer" content="webkit"> 
<title>深圳市美丽加互联网有限公司</title>

<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi"/>
<meta name="format-detection" content="telephone=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<link rel="shortcut icon" href="${staticImage_Url}/favicon.ico" type="image/x-icon" />
<script>
var contextPath="${contextPath}";
if(window.parent!=window){
	top.location.reload();
}
</script>
<script src="<%=request.getContextPath()%>/resources/javascript/library/jquery-2.1.4.min.js"></script>
</head>

<body>
<div align="center">
 <h1>项目已启动</h1>
 <!-- <input type="text" id="appid" placeholder="appid">&nbsp;
 <input type="text" id="userid" placeholder="userid">&nbsp;
 <input type="text" id="access_token" placeholder="access_token">&nbsp;
 <input type="button" id="submit" value="参数确认"> -->
</div>
<script>
/* $(function(){
	$("#submit").on("click",function(){
		var appId=$("#appid").val(),
			userId=$("#userid").val(),
			accessToken=$("#access_token").val();
		if(!appId || !userId || !accessToken){
			alert('不能为空');
			return;
		}
		$("ul li>a").each(function(){
			var href=$(this).attr("href");
				href=href+'?userId='+userId+'&appId='+appId+'&accessToken='+accessToken;
			console.log(href);
		});
	});
	
	
}); */
</script>
<%-- 
<ul>
	<li><a href="${contextPath}agent/manager-user-wx_user_bind_page" target="_blank">绑定页面</a></li>
	<li><a href="${contextPath}agent/manager-user-wx_user_bind_success" target="_blank">绑定成功页面</a></li>
	<li>&nbsp;</li>
	<li><a href="${contextPath}agent/manager-user-catalog-wx_user_order_list" target="_blank">我的消费列表</a></li>
	<li><a href="${contextPath}agent/manager-user-catalog-wx_user_order_info" target="_blank">消费详情</a></li>
	<li><a href="${contextPath}agent/manager-user-catalog-wx_user_order_comment" target="_blank">评论</a></li>
	<li><a href="${contextPath}agent/manager-user-catalog-wx_user_card_list" target="_blank">我的卡项列表</a></li>
	<li>&nbsp;</li>
	<li><a href="${contextPath}agent/manager-shop-event-wx_event_list_index" target="_blank">促销活动列表</a></li>
	<li><a href="${contextPath}agent/manager-shop-event-wx_event_info" target="_blank">促销活动详情</a></li>
	<li>&nbsp;</li>
	<li><a href="${contextPath}agent/manager-shop-advice-wx_shop_advice" target="_blank">商家推荐</a></li>
	<li><a href="${contextPath}agent/manager-shop-item-wx_item_list" target="_blank">服务项目分类</a></li>
	<li>&nbsp;</li>
	<li><a href="${contextPath}agent/manager-shop-card-wx_card_sale_info" target="_blank">卡详情</a></li>
	<li><a href="${contextPath}agent/manager-shop-massage-wx_massage_sale_info" target="_blank">护理详情</a></li>
	<li><a href="${contextPath}agent/manager-shop-product-wx_product_sale_info" target="_blank">产品详情</a></li>
	<li>&nbsp;</li>
	<li><a href="${contextPath}agent/manager-shop-card-wx_card_sale" target="_blank">卡预约（购买）</a></li>
	<li><a href="${contextPath}agent/manager-shop-massage-wx_massage_sale" target="_blank">护理预约（购买）</a></li>
	<li><a href="${contextPath}agent/manager-shop-product-wx_product_sale" target="_blank">产品预约（购买）</a></li>
	<li>&nbsp;</li>
	<li><a href="${contextPath}agent/manager-shop-info-wx_shop_home" target="_blank">店铺主页</a></li>
	<li><a href="${contextPath}agent/manager-shop-info-wx_shop_info" target="_blank">店铺详情</a></li>
	<li><a href="${contextPath}agent/manager-shop-info-wx_shop_staff_list" target="_blank">员工列表</a></li>
	<li><a href="${contextPath}agent/manager-shop-info-wx_shop_environment" target="_blank">店铺环境</a></li>
	
</ul> --%>

 
</body>
</html>