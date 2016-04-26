<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<script>
	 var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?afaf2960ca5e48dd5e51476997d3250f";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})(); 
</script>




<script>
//footer  下载按钮
$(function(){
	var tim = setInterval(function(){
		if($(".footer").length >0 ){
			clearInterval(tim);
		}
		//点击关掉 footer DIV
		$(".crossbottom").click(function(){
				$(".bottomain").hide();
		});
		
		//点击下载按钮 
		$("#tojump").click(function(){
			
			var browser = {
					versions: function() {
						var u = navigator.userAgent, app = navigator.appVersion;
						return {//移动终端浏览器版本信息 
							trident: u.indexOf('Trident') > -1, //IE内核
							presto: u.indexOf('Presto') > -1, //opera内核
							webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
							gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
							mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
							ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
							android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
							iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
							iPad: u.indexOf('iPad') > -1, //是否iPad
							webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
						};
					}(),
					language: (navigator.browserLanguage || navigator.language).toLowerCase()
		  	};
	        //iPhone
			if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
			       window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.mljia.o2o";
			    
			}
		    //android
			else if (browser.versions.android) {
				window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.mljia.o2o";
			}else{
				window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.mljia.o2o";
			}
		});	
		
		
		
	},300);

});

</script>

















<style>
.loader {
  margin: 4em auto;
}
.loader--audioWave {
  width: 4em;
  height: 3em;
  background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
  background-repeat: no-repeat;
  background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em;
  animation: audioWave 1.5s linear infinite;
}
@keyframes audioWave {
  25% {
    background: linear-gradient(#3498db, #3498db) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
    background-repeat: no-repeat;
    background-size: 0.5em 2em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em;
  }
  37.5% {
    background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#3498db, #3498db) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
    background-repeat: no-repeat;
    background-size: 0.5em 0.25em, 0.5em 2em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em;
  }
  50% {
    background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#3498db, #3498db) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
    background-repeat: no-repeat;
    background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 2em, 0.5em 0.25em, 0.5em 0.25em;
  }
  62.5% {
    background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#3498db, #3498db) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%;
    background-repeat: no-repeat;
    background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 2em, 0.5em 0.25em;
  }
  75% {
    background: linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#3498db, #3498db) 2.5em 50%;
    background-repeat: no-repeat;
    background-size: 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 2em;
  }
}
</style>
</body>
</html>

 
