<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
 
 <script  src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" ></script>
 
<script>
$(function(){
	
	var webRoot="<%=request.getContextPath()%>";
	var shopId=${shopId};
	console.log(shopId);
	
	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: '${appId}', // 必填，公众号的唯一标识
	    timestamp: '${timestamp}', // 必填，生成签名的时间戳
	    nonceStr: '${nonceStr}', // 必填，生成签名的随机串
	    signature: '${signature}',// 必填，签名，见附录1
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function(){
		wx.showOptionMenu();
		
		var urlSend="http://h5.mljia.cn/event/beautyCompetition",
		    titleSend  ="美丽加美业大赛周排行榜更新啦~~",
		    imgUrlSend = "http://h5.mljia.cn/resources/event/beautyCompetition/images/wxShareLog.jpg";
		wx.onMenuShareTimeline({
		    title: titleSend,  
		    link: urlSend, // 分享链接
		    imgUrl: imgUrlSend,
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		        (new Image()).src=encodeURI(webRoot+"/reservation/saveShareData/"+shopId);
		        wx.closeWindow();
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    	
		    }
		});
		
		wx.onMenuShareAppMessage({
		    title: titleSend, // 分享标题
		    desc: '', // 分享描述
		    link: urlSend, // 分享链接
		    imgUrl: imgUrlSend, // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});

	});
	

	
});
</script>

 
hello, world shopId=${shopId},appId=${appId}

 

	
 