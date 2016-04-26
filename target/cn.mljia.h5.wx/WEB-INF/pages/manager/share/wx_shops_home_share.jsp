<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../layout_app/header.jsp" /> 
<!-- 外部css资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/javascript/library/picker/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css"  rel="stylesheet" type="text/css"/>
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/shop_info.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
    <link href="<%=request.getContextPath()%>/resources/javascript/mobiscroll/css/mobiscroll-2.5.2.css?v=1" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/meirong/shop/yy_index.css">
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
.item-input{}
.pickerinput {background: none;font-size: 24px; z-index: 10;cursor: pointer; border: 1px solid #ff5ebd; color: #ff5ebd; border-radius: 10px; margin-top:15px;}

	input:focus{border:none;}
	.picker-items-col.picker-items-col-center{width:100%}
</style>
</head>
<body   data-user-id="${userId}" data-open-id="${openId}" data-app-id="${appId}" data-context-parth="${contextPath}">
<div class="share_wxtop_main">
	<div class="share_wxtop">
	<p class="fl">关注我们，享更多低价折扣哦~</p>
	<a class="share_wxtopBut fr"><i class="icon-wxtopplus">+</i>关注</a>
	</div>
</div>


<div class="shopmanmain wx_guanlian bghui lh40">
        <!--头部选择店铺 S-->
        <div class="yy_index_top"  id="chooseShopView"></div>
        
          <script type="text/html" id="chooseShopTemp">
           {{# if(d.content.shop_list.length>1) { }}
			<div class="index_top_choose_shop">
                <input type="button"  class="pickerinput pickerinput_pos"  data-shop-id=0 placeholder="" id="picker" readonly="" value="" />
                <font class="yyifarrow_s"></font>
            </div>
           {{# } }}
			
		</script>
        <!--头部选择店铺 E-->
        
        <div class="shop_add" id="shopInfoView" title="店铺信息"> </div>
        <script type="text/html" id="shopInfoTmpl">
			<a href="javascript:;" class="shop_target">
                <img src="{{d.shop_img_url}}" alt="" class="shop_logo" width="120" height="90" >
                <p class="shop_add_text">
                  {{# if(d.shop_addr.length<=12) { }}
                  	<span class="shop_add_text_icon sp"></span><span class="shop_add_text_s hid_slh2">{{d.shop_addr}}</span>
                  {{# }else { }}
					<span class="shop_add_text_icon_2 sp"></span><span class="shop_add_text_s_2 hid_slh2">{{d.shop_addr}}</span>
                  {{# } }}
                </p>
            </a>
            <font class="fg_xian"></font>

            <a class="btn_iphone" href="tel:{{ d.shopPhone }}"></a>
       </script>
       
            
       
    
        
        <!--店铺导航 S-->
        <div class="shop_nav_box">
            <ul class="shop_nav_list">
                <li class="serverItemUrl" data-item="card">
                    <a href="javascript:;" class="nav_a1 sp"></a>
                    <span>消费卡项</span>
                </li>
                <li class="serverItemUrl" data-item="massage">
                    <a href="javascript:;" class="nav_a2 sp"></a>
                    <span>护理项目</span>
                </li>
                <li class="serverItemUrl" data-item="product">
                    <a href="javascript:;" class="nav_a3 sp"></a>
                    <span>产品项目</span>
                </li>
                <li class="serverItemUrl" data-item="all">
                    <a href="javascript:;" class="nav_a4 sp"></a>
                    <span>全部项目</span>
                </li>
                <li id="shopPics"> 
                    <a href="javascript:;" class="nav_a5 sp"></a>
                    <span>商家环境</span>
                </li>
                <li id="staffLis">
                    <a href="javascript:;" class="nav_a6 sp"></a>
                    <span>全部技师</span>
                </li>
                <li id="orderCommentLis">
                    <a href="javascript:;" class="nav_a7 sp"></a>
                    <span>全部评价</span>
                </li>
            </ul>
        </div>
      
        <!--店铺导航 E-->
       
        <!--店长推荐 S-->
        <div class="supervisor_tj" id="recommendView"  title="店铺推荐"></div>
         <!--店长推荐 E-->
         
       
        <script type="text/html" id="recommendProListTmpl"  title="店铺推荐模板">
			<div class="supervisor_tj_title">
                <p class="supervisor_tj_title_p1">
                    <span class="supervisor_tj_title_s1"></span>
                    <span class="supervisor_tj_title_s2">店长推荐</span>
                </p>
                <a href="javascript:;" class="btn_more">
					<span>更多&nbsp;</span>
					<font style="margin-top:9px;"></font>
				</a>
            </div>
            <ul class="supervisor_tj_list">
                {{# var flag=0}}
                {{# for(var i=0;i<d.content.length;i++ ){ }}
				{{#  flag++ }}
          			{{# var item=d.content[i];  }}
                 {{# if(flag<5) { }}
				<li  data-click="true"  data-card-type="{{item.card_type}}" data-item-type="{{item.flag}}" data-item-id="{{ item.id}}">
                    <img src="{{ item.img_url }}" alt="" class="shop_pic"  />
                    <p class="shop_inf hid_slh2">{{ item.item_name }}</p>
                    <div class="shop_yy_box">
                        <p class="shop_yy_price"><font>¥</font>{{ item.price||0}}</p>
                        <a href="javascript:;" class="btn_ljyy">立即预约</a>
                    </div>
                </li>
                 {{# }}}
                {{# } }}
               
            </ul>
        </script>
        
         <div class="supervisor_tj" id="hotProView"  title="热销产品"></div>
         
          <script type="text/html" id="hotProListTmpl"  title="热销产品">
			<div class="supervisor_tj_title">
                <p class="supervisor_tj_title_p1">
                    <span class="supervisor_tj_title_s1"></span>
                    <span class="supervisor_tj_title_s2">热销产品</span>
                </p>
                <a href="javascript:;" class="btn_more">
					<span>更多&nbsp;</span>
					<font style="margin-top:9px;"></font>
				</a>
            </div>
            <ul class="supervisor_tj_list">

                {{# for(var m=0;m<d.content.length;m++ ){ }}
          			{{# var item=d.content[m];  }}
				<li  data-hot-sale='true'   data-item-id="{{ item.product_id}}">
                    <img src="{{ item.product_img_url }}" alt="" class="shop_pic"  />
                    <p class="shop_inf hid_slh2">{{ item.product_name  }}</p>
                    <div class="shop_yy_box">
                        <p class="shop_yy_price"><font>¥</font>{{ item.product_price ||0}}</p>
                        <a href="javascript:;" class="btn_ljyy">立即预约</a>
                    </div>
                </li>

                {{# } }}

               
            </ul>
        </script>
        
        <!--下方浮动导航 S-->
        <!-- <div class="bot_nav_float">
            <ul class="nav_float_list">
                <li id="shopHomUrl">
                    <a href="javascript:;" class="nav_float_btn1_h">
                       <span  class="nav_float_s1 sp"></span>
                       <span  class="nav_float_text">首页</span>
                    </a>
                </li>
                <li id="envetUrl">
                    <a href="javascript:;" class="nav_float_btn2">
                        <span  class="nav_float_s2 sp"></span>
                        <span  class="nav_float_text">优惠促销</span>
                    </a>
                </li>
                <li id="userCenter">
                    <a href="javascript:;" class="nav_float_btn3">
                        <span  class="nav_float_s3 sp"></span>
                        <span  class="nav_float_text">我的</span>
                    </a>
                </li>
            </ul>
        </div> -->
        <!--下方浮动导航 E-->

        
        
    </div>













<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/layer/layer.m/layer.m.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/share/wx_shops_home_share.js"></script>
 <script src="<%=request.getContextPath()%>/resources/javascript/mobiscroll/js/mobiscroll-2.5.2.js?v=1"></script>
 <script src="<%=request.getContextPath()%>/resources/javascript/library/picker/picker.js"></script>
<jsp:include  page="../../layout_app/footer.jsp" /> 