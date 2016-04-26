<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="renderer" content="webkit"> 
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
<meta name="viewport" content="width=640,user-scalable=no">
<title>美丽加 - 微信</title>
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="format-detection" content="telephone=no">   
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
 
<link rel="shortcut icon" href="${contextPath}/resources/images/default/favicon.ico" type="image/x-icon" />
<script type="text/javascript">
var GLOBAL={
		 contextPath: "${contextPath}",
		 download_url: "${file_download_url}",
		 appIdPay: "${appIdPay}",
		 download_url: "${file_download_url}",
		 fileVersion: "${fileVersion}",
		 webRoot :"<%=request.getContextPath()%>"
};

if(window.parent!=window){
	top.location.reload();
}

window.mobileUtil = (function(win, doc) {
    var UA = navigator.userAgent,
    	isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid // 据说某些国产机的UA会同时包含 android iphone 字符

    return {
        isIos: isIos,
        /**
         * 缩放页面
         */
        fixScreen: function() {
            var metaEl = doc.querySelector('meta[name="viewport"]'),
                metaCtt = metaEl ? metaEl.content : '',
                matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
                matchWidth = metaCtt.match(/width=([^,\s]+)/);

            if ( !metaEl ) { // REM
                var docEl = doc.documentElement,
                    maxwidth = docEl.dataset.mw || 750, // 每 dpr 最大页面宽度
                    dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
                    scale = 1 / dpr,
                    tid;

                docEl.removeAttribute('data-mw');
                docEl.dataset.dpr = dpr;
                metaEl = doc.createElement('meta');
                metaEl.name = 'viewport';
                metaEl.content = fillScale(scale);
                docEl.firstElementChild.appendChild(metaEl);

                var refreshRem = function() {
                    var width = docEl.getBoundingClientRect().width;
                    if (width / dpr > maxwidth) {
                        width = maxwidth * dpr;
                    }
                    var rem = width / 16;
                    docEl.style.fontSize = rem + 'px';
                };

                win.addEventListener('resize', function() {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }, false);
                win.addEventListener('pageshow', function(e) {
                    if (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }
                }, false);

                refreshRem();
            } else if (!matchScale && ( matchWidth && matchWidth[1] != 'device-width' ) ) { // 定宽
                var    width = parseInt(matchWidth[1]),
                    iw = win.innerWidth || width,
                    ow = win.outerWidth || iw,
                    sw = win.screen.width || iw,
                    saw = win.screen.availWidth || iw,
                    ih = win.innerHeight || width,
                    oh = win.outerHeight || ih,
                    ish = win.screen.height || ih,
                    sah = win.screen.availHeight || ih,
                    w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
                    scale = w / width;

                if ( scale < 1 ) {
                    metaEl.content = metaCtt + ',' + fillScale(scale);
                }
            }

            function fillScale(scale) {
                return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';
            }
        }
    };
})(window, document);

// 默认直接适配页面
mobileUtil.fixScreen();
</script>

<script src="<%=request.getContextPath()%>/resources/javascript/library/timePlugIn/zepto.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/library/jquery-2.1.4.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/library/fastclick.js"></script>
<%-- <script src="<%=request.getContextPath()%>/resources/javascript/library/jquery.base64.js"></script> --%>
<script src="<%=request.getContextPath()%>/resources/javascript/library/store.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" ></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/base/wx_global_util.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/base/request.js"></script>


