<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<jsp:include  page="../../../layout_app/header.jsp" /> 
<!-- 外部CSS资源文件引入 -->
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/base.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/resources/css/meirong/shop/wxshopmanh5.css" rel="stylesheet" type="text/css" />
<style>
	a{text-decoration:none}
</style>
</head>
<body data-user-id="${userId}"  data-open-id="${openId}"  data-app-id="${appId}"  data-shop-id="${shopId}" data-card-id="${cardId}" data-card-type="${cardType}" data-access-token="${ accessToken }">

<div class="shopmanmain wx_guanlian bghui" id="cardInfoView">
	<!-- 渲染区域 -->
	<div class='loader loader--audioWave'></div>
</div>



<script type="text/html" id="hasNoContentTemp">
        <div class="bgbai">
		<ul class="shophyk_top shophyk_xmtop">
			<li class="a1 fl"><img src="{{ d.content.card_img }}" width="90" height="90"></li>
			<li class="a2 fl"><p class="tatle">{{d.content.card_name}}</p>
				<p class="info">&nbsp;</p>
                 {{# if(d.cardType == 0 ) { }}
						<p class="info">剩余： <span class="txtpink"> 
                         {{# if(d.content.left_num == -1) { }}
                           		无限次
                         {{# } else {  }}
                                {{ d.content.left_num }}次
                         {{# } }}
                        </span>      <span class="ml32 mr1">|</span>   赠送项目：
                        <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                        </span>
                        </p>
                 {{# }else if(d.cardType == 1) {  }}
                         <p class="info">剩余：
                          <span class="txtpink">
                               {{# if(d.content.card_money == 0 ) { }}
                                   ¥0.00
                               {{# }else if(d.content.card_money >0 ){  }}
                                   ¥{{d.content.card_money}}
                               {{# } }}
                          </span>      
                          <span class="ml32 mr1">|</span> 赠送项目： 
                          <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                          </span>
                     </p>
                 {{# } }}
				
			</li>
		
		</ul>
		
		<ul class="shophyk_xfkinl" id="tabs">
			<li data-item-navi="true" class="activ">卡内项目</li>
			<li class="line"></li>
			<li data-item-navi="true" >赠送项目</li>
			<li class="line"></li>
			<li data-item-navi="true" >消费记录</li>
		</ul>
	</div> 
    <p class="nocard_enftxt">卡内项目已经用完了哟~</p>
</script>


<script type="text/html" id="hasNoConsuTemp">
        <div class="bgbai">
		<ul class="shophyk_top shophyk_xmtop">
			<li class="a1 fl"><img src="{{ d.content.card_img }}" width="90" height="90"></li>
			<li class="a2 fl"><p class="tatle">{{d.content.card_name}}</p>
				<p class="info">&nbsp;</p>
                 {{# if(d.cardType == 0 ) { }}
						<p class="info">剩余： <span class="txtpink"> 
                         {{# if(d.content.left_num == -1) { }}
                           		无限次
                         {{# } else {  }}
                                {{ d.content.left_num }}次
                         {{# } }}
                        </span>      <span class="ml32 mr1">|</span>   赠送项目：
                        <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                        </span>
                        </p>
                 {{# }else if(d.cardType == 1) {  }}
                         <p class="info">剩余：
                          <span class="txtpink">
                               {{# if(d.content.card_money == 0 ) { }}
                                   ¥0.00
                               {{# }else if(d.content.card_money >0 ){  }}
                                   ¥{{d.content.card_money}}
                               {{# } }}
                          </span>      
                          <span class="ml32 mr1">|</span> 赠送项目： 
                          <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                          </span>
                     </p>
                 {{# } }}
				
			</li>
		
		</ul>
		
		<ul class="shophyk_xfkinl" id="tabs">
			<li data-item-navi="true" >卡内项目</li>
			<li class="line"></li>
			<li data-item-navi="true">赠送项目</li>
			<li class="line"></li>
			<li data-item-navi="true" class="activ">消费记录</li>
		</ul>
	</div> 
    <p class="nocard_enftxt">暂无消费记录~</p>
</script>
<script type="text/html" id="hasNoGivenContentTemp">
        <div class="bgbai">
		<ul class="shophyk_top shophyk_xmtop">
			<li class="a1 fl"><img src="{{ d.content.card_img }}" width="90" height="90"></li>
			<li class="a2 fl"><p class="tatle">{{d.content.card_name}}</p>
				<p class="info">&nbsp;</p>
                 {{# if(d.cardType == 0 ) { }}
						<p class="info">剩余： <span class="txtpink"> 
                         {{# if(d.content.left_num == -1) { }}
                           		无限次
                         {{# } else {  }}
                                {{ d.content.left_num }}次
                         {{# } }}
                        </span>      <span class="ml32 mr1">|</span>   赠送项目：
                        <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                        </span>
                        </p>
                 {{# }else if(d.cardType == 1) {  }}
                         <p class="info">剩余：
                          <span class="txtpink">
                               {{# if(d.content.card_money == 0 ) { }}
                                   ¥0.00
                               {{# }else if(d.content.card_money >0 ){  }}
                                   ¥{{d.content.card_money}}
                               {{# } }}
                          </span>      
                          <span class="ml32 mr1">|</span> 赠送项目： 
                          <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                          </span>
                     </p>
                 {{# } }}
				
			</li>
		
		</ul>
		
		<ul class="shophyk_xfkinl" id="tabs">
			<li data-item-navi="true" >卡内项目</li>
			<li class="line"></li>
			<li data-item-navi="true" class="activ">赠送项目</li>
			<li class="line"></li>
			<li data-item-navi="true" >消费记录</li>
		</ul>
	</div> 
    <p class="nocard_enftxt">赠送项目已经用完了呢~</p>
</script>


<script type="text/html"  id="givenItemTemp">
       <div class="bgbai">
		<ul class="shophyk_top shophyk_xmtop">
			<li class="a1 fl"><img src="{{ d.content.card_img }}" width="90" height="90"></li>
			<li class="a2 fl"><p class="tatle">{{d.content.card_name}}</p>
				<p class="info">&nbsp;</p>
                 {{# if(d.cardType == 0 ) { }}
						<p class="info">剩余： <span class="txtpink"> 
                         {{# if(d.content.left_num == -1) { }}
                           		无限次
                         {{# } else {  }}
                                {{ d.content.left_num }}次
                         {{# } }}
                        </span>      <span class="ml32 mr1">|</span>   赠送项目：
                        <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                        </span>
                        </p>
                 {{# }else if(d.cardType == 1) {  }}
                         <p class="info">剩余：
                          <span class="txtpink">
                               {{# if(d.content.card_money == 0 ) { }}
                                   ¥0.00
                               {{# }else if(d.content.card_money >0 ){  }}
                                   ¥{{d.content.card_money}}
                               {{# } }}
                          </span>      
                          <span class="ml32 mr1">|</span> 赠送项目： 
                          <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                          </span>
                     </p>
                 {{# } }}
				
			</li>
		
		</ul>
		
		<ul class="shophyk_xfkinl" id="tabs">
			<li data-item-navi="true">卡内项目</li>
			<li class="line"></li>
			<li data-item-navi="true" class="activ">赠送项目</li>
			<li class="line"></li>
			<li  data-item-navi="true" >消费记录</li>
		</ul>
	
		{{# for(var i = 0; i<d.givenClass.length; i++ ) { }}
               {{# var item = d.givenClass[i]; }}
                <ul class="shophyk_dat shophyk_xmtxt" data-child="{{ i }}" data-click-given="true" data-type-id="{{item.item_id}}">
			       <li class="a2 fl poi1">
				    <p class="tatle wordsbase " style="max-width:300px">{{ (item.item_name.split("_")[1]).substring(0,6) }}【类】</p>
				    <p class="info">&nbsp;</p>
				    <p class="info mt8"><span class="txthui01">
                            {{# if(  item.item_data  == -1 ) { }}
                                                                                                                     永久
                            {{# }else{  }}
                                      {{ item.item_data.split(" ")[0] }}到期
                            {{# } }}
                          
                    </span></p>
			      </li>
			      <li class="a3 fl" >
                              {{ item.item_num }}次
                             
                  <a  data-child="{{ i }}" data-click-given="true" ><img src="<%=request.getContextPath()%>/resources/images/meirong/card/arrow_r4_c4.gif" width="20" height="34"></a>
                  </li>
		       </ul>
        {{# } }}
	
		
		
         {{# for(var i = 0; i<d.givenSingle.length;i++ ){ }}
               {{# var item = d.givenSingle[i] }}
                  {{# if(d.cardType == 1) { }}
					

                    {{# if( d.content.card_money > (item.item_price * ( parseFloat( item.item_num )/10 )) ) { }}
                      {{# if( item.item_data != -1 ) { }}
                          
                          	{{# var itemMillisecond3 =(item.item_data).replace(new RegExp("-","gm"),"/"); }}

                          	  {{# if( (new Date( itemMillisecond3)).getTime() > d.nowServerTimes ) { }}

                              
								

                            {{# if(item.item_num == 0) { }}
 <ul class="shophyk_dat shophyk_xxcard"  data-no-money="1"  data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>

								  <li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"   data-is-given="{{item.if_preferential}}"   data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{item.item_num}}" >
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			  {{ item.massage_time }}分钟
                        			 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                           {{item.item_num}}次
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 {{ item.item_data.split(" ")[0] }}到期
                                  		</span>
                        			</p>
									<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
					   			</li>
					</ul>
                            {{# }else {  }}
						 <ul class="shophyk_dat shophyk_xxcard"    data-click="true"  data-shop-id="{{ d.shopId}}"   data-is-given="{{item.if_preferential}}"   data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{item.item_num}}" >
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                            

                               <li class="a2 fl poi1" data-click='true' data-type-id="0"  data-is-given="{{item.if_preferential}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			  {{ item.massage_time }}分钟
                        			 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                               {{# if(item.item_num == -1) { }}
															无限次
                                               {{# }else {  }}
                                                    {{ item.item_num}}次
                                                {{#  } }}
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 {{ item.item_data.split(" ")[0] }}到期
                                  		</span>
                        			</p>
									<p class="poi2"><a>立即预约</a></p>
					   			</li>
                            </ul>
                            {{# } }}

			        		

                         {{# }else {  }}    
                              <ul class="shophyk_dat shophyk_xxcard shophyk_xxcard_comp"   data-no-money="1"  data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
								
                               
								<li class="a2 fl poi1">
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
									<p class="info">&nbsp;</p>
									<p class="info mt8">
                                       <span>
                                        {{# if(item.item_name.split("_")[0] == "mass") { }}
                                            {{ item.massage_time }}分钟
                                        {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                                            {{ item.produce_netcontent }}
                                        {{# } }}
                                       </span>
                                    </p>
									<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
								</li>

						    </ul>
                         {{# } }}
                                

                    {{# }else if( item.item_data == -1)  { }}
                             
								
                          {{# if(item.item_num == 0) { }}
                                <ul class="shophyk_dat shophyk_xxcard"     data-no-money="1"  data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                                 <li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"  data-is-given="{{item.if_preferential}}"   data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			  {{ item.massage_time }}分钟
                        			 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                          	 {{# if(item.item_num == -1) { }}
															无限次
                                              {{# }else {  }}
                                                    {{ item.item_num}}次
                                              {{#  } }}
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 永久
                                  		</span>
                        			</p>
									<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
					   			</li>
							</ul>
                          {{# }else{ }}
                               <ul class="shophyk_dat shophyk_xxcard" data-click='true'  data-is-given="{{item.if_preferential}}"   data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
								 <li class="a2 fl poi1" data-click='true'  data-is-given="{{item.if_preferential}}"   data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			  {{ item.massage_time }}分钟
                        			 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                          	 {{# if(item.item_num == -1) { }}
															无限次
                                              {{# }else {  }}
                                                    {{ item.item_num}}次
                                              {{#  } }}
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 永久
                                  		</span>
                        			</p>
									<p class="poi2"><a >立即预约</a></p>
					   			</li>
                              </ul>
                          {{# } }}

			        		

                    {{# } }}
                 {{# }else {  }}
                         <ul class="shophyk_dat shophyk_xxcard shophyk_xxcard_comp"  data-no-money="1"  data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
								
								<li class="a2 fl poi1">
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
									<p class="info">&nbsp;</p>
									<p class="info mt8">
                                       <span>
                                        {{# if(item.item_name.split("_")[0] == "mass") { }}
                                            {{ item.massage_time }}分钟
                                        {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                                            {{ item.produce_netcontent }}
                                        {{# } }}
                                       </span>
                                    </p>
									<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
								</li>
                           



						  </ul>


                 {{# } }}
              {{# }else if(d.cardType ==0 ){  }}
                     {{# if( item.item_data != -1 ) { }}

                         {{# var itemMillisecond4 =(item.item_data).replace(new RegExp("-","gm"),"/"); }}

                           {{# if( (new Date(itemMillisecond4)).getTime() > d.nowServerTimes ) { }} 
                              

                           {{# if(item.item_num == 0) { }}
								<ul class="shophyk_dat shophyk_xxcard"   data-no-money="1"  data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
									<li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			  {{ item.massage_time }}分钟
                        			 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                              {{# if(item.item_num == -1) { }}
															无限次
                                              {{# }else {  }}
                                                    {{ item.item_num}}次
                                              {{#  } }}
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 {{ item.item_data.split(" ")[0] }}到期
                                  		</span>
                        			</p>
									<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
					   			</li>				
								</ul>


                           {{# }else { }}
								<ul class="shophyk_dat shophyk_xxcard"  data-click='true' data-type-id="0" data-is-given="{{item.if_preferential}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>

								<li class="a2 fl poi1" data-click='true' data-type-id="0" data-is-given="{{item.if_preferential}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
									<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			  {{ item.massage_time }}分钟
                        			 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                              {{# if(item.item_num == -1) { }}
															无限次
                                              {{# }else {  }}
                                                    {{ item.item_num}}次
                                              {{#  } }}
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 {{ item.item_data.split(" ")[0] }}到期
                                  		</span>
                        			</p>
									<p class="poi2"><a >立即预约</a></p>
					   			</li>
								</ul>
                              {{# } }}
			        		
            
                           {{# }}}
                        {{# }else if( item.item_data ==-1 ) {  }}
                               
									

                                    {{# if(item.item_num == 0) { }}
								 <ul class="shophyk_dat shophyk_xxcard" data-no-money="1" data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
									<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                                   <li class="a2 fl poi1" data-click='true' data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
										<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
										<p class="info mt8">
                        					 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			 		 {{ item.massage_time }}分钟
                        					 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  					{{ item.produce_netcontent }}
                        					 {{# } }}
                       						 <span class="ml10 mr10 centerline">|</span>   
                                   			  <span class="txtpink">
                                                 		 {{item.item_num }}次
                                     		</span> 
                       					</p>

                       					<p class="info mt8">
                        		  			<span class="txthui01">
                                  	    		 永久
                                  			</span>
                        				</p>
										<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
					   				</li>
                                    </ul>
									{{#}else {}}
                                      <ul class="shophyk_dat shophyk_xxcard" data-click='true' data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
										<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
									   <li class="a2 fl poi1" data-click='true' data-is-given="{{item.if_preferential}}"  data-type-id="0" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}" >
										<p class="tatle wordsbase" style="max-width:230px">{{ item.item_name.split("_")[1] }}</p>
						
										<p class="info mt8">
                        					 {{# if(item.item_name.split("_")[0] == "mass") { }}
                            			 		 {{ item.massage_time }}分钟
                        					 {{# }else if(item.item_name.split("_")[0] == "pro") {  }}
                            	  					{{ item.produce_netcontent }}
                        					 {{# } }}
                       						 <span class="ml10 mr10 centerline">|</span>   
                                   			  <span class="txtpink">
                                                 		 {{# if(item.item_num == -1) { }}
															无限次
                                                         {{# }else {  }}
                                                            {{ item.item_num}}次
                                                         {{#  } }}
                                     		</span> 
                       					</p>

                       					<p class="info mt8">
                        		  			<span class="txthui01">
                                  	    		 永久
                                  			</span>
                        				</p>
										<p class="poi2"><a  >立即预约</a></p>
					   				</li>
									</ul>
                                  {{# }}}

			        			
                        {{# } }}

              {{# } }}
                
         {{# } }}
	
	</div> 
 </script>

 
<script type="text/html"  id="cardInfoTemp">
       <div class="bgbai">
		<ul class="shophyk_top shophyk_xmtop">
			<li class="a1 fl"><img src="{{ d.content.card_img }}" width="90" height="90"></li>
			<li class="a2 fl"><p class="tatle">{{d.content.card_name}}</p>
				<p class="info">&nbsp;</p>
                 {{# if(d.cardType == 0 ) { }}
						<p class="info">剩余： <span class="txtpink"> 
                         {{# if(d.content.left_num == -1) { }}
                           		无限次
                         {{# } else {  }}
                                {{ d.content.left_num }}次
                         {{# } }}
                        </span>      <span class="ml32 mr1">|</span>   赠送项目：
                        <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                        </span>
                        </p>
                 {{# }else if(d.cardType == 1) {  }}
                         <p class="info">剩余：
                          <span class="txtpink">
                               {{# if(d.content.card_money == 0 ) { }}
                                   ¥0.00
                               {{# }else if(d.content.card_money >0 ){  }}
                                   ¥{{d.content.card_money}}
                               {{# } }}
                          </span>      
                          <span class="ml32 mr1">|</span> 赠送项目： 
                          <span class="txtpink">
                            {{# if(d.content.pre_left_num == -1) { }}
                                                                                                    无限次
                            {{# }else  { }}
                            	{{d.content.pre_left_num}}次
                            {{# } }}
                          </span>
                     </p>
                 {{# } }}
				
			</li>
		
		</ul>
		
		<ul class="shophyk_xfkinl" id="tabs">
			<li data-item-navi="true" class="activ">卡内项目</li>
			<li class="line"></li>
			<li data-item-navi="true">赠送项目</li>
			<li class="line"></li>
			<li data-item-navi="true">消费记录</li>
		</ul>
		<div>
		{{# for(var i = 0; i<d.cardClass.length; i++ ) { }}
               {{# var item = d.cardClass[i]; }}
                <ul class="incardClass shophyk_dat shophyk_xmtxt"  data-child="{{ i }}" data-click-incard='true' data-type-id="{{item.item_id}}">
			       <li class="a2 fl poi1" >
				    <p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1].substring(0,6) }}【类】</p>
				    <p class="info">&nbsp;</p>
				    <p class="info mt8"><span class="txthui01">
                            {{# if(  item.item_data  == -1 ) { }}
                                                                                                                     永久
                            {{# }else{  }}
                                      
                                      {{ item.item_data.split(" ")[0] }}到期
                            {{# } }}
                          
                    </span></p>
			      </li>
			      <li class="a3 fl" >
                              {{# if(d.cardType == 1) { }}
                                      {{ item.item_num }}折
                              {{# } else if(d.cardType == 0){  }}
                                      {{# if(item.item_num == -1){ }}
                                              		 无限次
                                      {{# } else{  }}
                                      {{ item.item_num }}次
                                      {{# }}}
                              {{# } }}
                           
                	  <a >
                  	 	 <img src="<%=request.getContextPath()%>/resources/images/meirong/card/arrow_r4_c4.gif" width="20" height="34">
              		  </a>
                 </li>
		       </ul>
        {{# } }}
		</div>
		
		<div>
         {{# for(var j = 0; j<d.cardSingle.length;j++ ){ }}
               {{# var item2 = d.cardSingle[j] }}
                 {{# if(d.cardType == 1) { }}
                   {{# if( d.content.card_money >= (item2.item_price* ( parseFloat( item2.item_num )/10 )) ) { }}
                      {{# if( item2.item_data != -1 ) { }}

							{{# var itemMillisecond =(item2.item_data).replace(new RegExp("-","gm"),"/"); }}
                          {{# if( (new Date( itemMillisecond )).getTime() > d.nowServerTimes ) { }}

                               <ul class="shophyk_dat shophyk_xxcard" data-click="true" data-item-name="{{item2.item_name}}"  data-is-given="{{item2.if_preferential}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
								<li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
								<li class=" cardInSole a2 fl poi1" style="z-index:1;position:relative;"  data-click="true1"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
									<p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
						
									<p class="info mt8">
                        			 {{# if(item2.item_name.split("_")[0] == "mass") { }}
                            			  {{ item2.massage_time }}分钟
                        			 {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item2.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                             {{item2.item_num }}折
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 {{ item2.item_data.split(" ")[0] }}到期
                                  		</span>
                        			</p>
									<p class="poi2"><a   >立即预约</a></p>
					   			</li>
			        		</ul>

                         {{# }else {  }}
                            
                                    <ul class="shophyk_dat shophyk_xxcard shophyk_xxcard_comp">
										<li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
										<li class="   a2 fl poi1"    data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{ item2.item_name}}" data-item-num="{{ item2.item_num}}">
											<p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
											<p class="info">&nbsp;</p>
											<p class="info mt8">
                                   		    <span>
                                      		  {{# if(item2.item_name.split("_")[0] == "mass") { }}
                                          		  {{ item2.massage_time }}分钟
                                       		 {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                                        		    {{ item2.produce_netcontent }}
                                       		 {{# } }}
                                       		</span>
                                    		</p>
											<p class="poi2">已过期</p>
										</li>
						   			 </ul>
                             
                             
                         {{# } }}
                                

                    {{# }else if( item2.item_data == -1)  { }}
                             <ul class="shophyk_dat shophyk_xxcard"  data-click="true"  data-item-name="{{item2.item_name}}"   data-is-given="{{item2.if_preferential}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
								<li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
								<li class=" cardInSole a2 fl poi1"  style="z-index:1;position:relative;"  data-click="true1" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
									<p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
						
									<p class="info mt8" >
                        			 {{# if(item2.item_name.split("_")[0] == "mass") { }}
                            			  {{ item2.massage_time }}分钟
                        			 {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                            	  			{{ item2.produce_netcontent }}
                        			 {{# } }}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                     <span class="txtpink">
                                            {{# if(d.cardType == 0){ }}
                                                  {{item2.item_num }}次
                                            {{# }else if(d.cardType == 1){  }}
												  {{item2.item_num }}折
                                            {{# } }}
                                     </span> 
                       				</p>

                       				<p class="info mt8">
                        		  		<span class="txthui01">
                                  	    	 永久
                                  		</span>
                        			</p>
									<p class="poi2"><a  >立即预约</a></p>
					   			</li>
			        		</ul>

                     {{# } }}
                  {{# }else {  }}
                         
                               <ul class="shophyk_dat shophyk_xxcard shophyk_xxcard_comp" data-no-money="1"  data-item-name="{{item2.item_name}}"   data-is-given="{{item2.if_preferential}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
									<li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
									<li class="a2 fl poi1">
										<p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
										<p class="info">&nbsp;</p>
										<p class="info mt8">
                                     	  <span>
                                      	  {{# if(item2.item_name.split("_")[0] == "mass") { }}
                                         	   {{ item2.massage_time }}分钟
                                       	  {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                                            	{{ item2.produce_netcontent }}
                                       		 {{# } }}
                                       	  </span>
                                    	</p>
									   <p class="poi2">余额不足</p>
								</li>
						      </ul>
             
                 {{# } }}
              {{# }else if(d.cardType == 0){ }} 
                       
                       {{# if( item2.item_data == -1 ) { }}
                                  
                                             
								 {{# if(item2.item_num == 0) { }}
 <ul class="shophyk_dat shophyk_xxcard"  data-no-money="1"  data-is-given="{{item2.if_preferential}}"  data-item-name="{{item2.item_name}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
                                    <li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
                                    <li class=" a2 fl poi1" style="z-index:1;position:relative;"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
                                              <p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
                                      
                                              <p class="info mt8">
                                                     {{# if(item2.item_name.split("_")[0] == "mass") { }}
                                                       {{ item2.massage_time }}分钟
                                                   {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                                                          {{ item2.produce_netcontent }}
                                                   {{# } }}
                                                   <span class="ml10 mr10 centerline">|</span>   
                                                          <span class="txtpink">
                                                                       {{# if(item2.item_num==-1) { }}
																				无限次
                                                                       {{# }else { }}
                                                                          {{item2.item_num }}次
                                                                       {{# } }}
                                                        </span> 
                                                </p>

                                                <p class="info mt8">
                                                    <span class="txthui01">
                                                       			      永久
                                                        </span>
                                                </p>
                                                <p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
                                  </li>
                                  </ul>
                                
                                          {{# }else {  }}
 <ul class="shophyk_dat shophyk_xxcard" data-click="true"  data-is-given="{{item2.if_preferential}}"  data-item-name="{{item2.item_name}}"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
                                    <li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
                                        <li class="  cardInSole a2 fl poi1" style="z-index:1;position:relative;"  >
                                          <p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
                                  
                                          <p class="info mt8">
                                                         {{# if(item2.item_name.split("_")[0] == "mass") { }}
                                                             {{ item2.massage_time }}分钟
                                                         {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                                                                {{ item2.produce_netcontent }}
                                                         {{# } }}
                                                         <span class="ml10 mr10 centerline">|</span>   
                                                                <span class="txtpink">
                                                                            {{# if(item2.item_num==-1) { }}
																				无限次
                                                                      		 {{# }else { }}
                                                                         		 {{item2.item_num }}次
                                                                       		{{# } }}
                                                              </span> 
                                                      </p>

                                                      <p class="info mt8">
                                                          <span class="txthui01">
                                                           				        永久
                                                              </span>
                                                      </p>
                                                               <p class="poi2"><a  >立即预约</a></p>
                                      </li>
</ul>
                                           {{# } }}
                                 



                        {{# }else { }}
                               {{# var itemMilliseconds =(item2.item_data).replace(new RegExp("-","gm"),"/"); }}
                               {{# if( (new Date( itemMilliseconds )).getTime() > d.nowServerTimes ) { }} 
                            
                                      {{# if(item2.item_num == 0) { }}
  <ul class="shophyk_dat shophyk_xxcard"  data-no-money="1"  data-is-given="{{item2.if_preferential}}"  data-item-name="{{item2.item_name}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
                                      <li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>
                                     <li class="   a2 fl poi1" style="z-index:1;position:relative;"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}" >
                                                    <p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
                                              
                                                    <p class="info mt8">
                                                     {{# if(item2.item_name.split("_")[0] == "mass") { }}
                                                          {{ item2.massage_time }}分钟
                                                     {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                                                            {{ item2.produce_netcontent }}
                                                     {{# } }}
                                                     <span class="ml10 mr10 centerline">|</span>   
                                                           <span class="txtpink">
                                                                        {{# if(item2.item_num==-1) { }}
																				无限次
                                                                       {{# }else { }}
                                                                          {{item2.item_num }}次
                                                                       {{# } }}
                                                           </span> 
                                                    </p>

                                                    <p class="info mt8">
                                                        <span class="txthui01">
                                                                 {{ item2.item_data.split(" ")[0] }}到期
                                                            </span>
                                                    </p>
                                                        
                                                    <p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
                                                   
                                        
                                        </li>
</ul>
                                      {{# }else {  }}
  <ul class="shophyk_dat shophyk_xxcard"  data-click="true"  data-is-given="{{item2.if_preferential}}"  data-item-name="{{item2.item_name}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item2.if_preferential}}" data-massage-time="{{ item2.massage_time}}" data-item-price="{{ item2.item_price}}"  data-item-id="{{ item2.item_id}}" data-item-name="{{item2.item_name}}" data-item-num="{{ item2.item_num}}">
                                      <li class="a1 fl"><img src="{{ item2.item_url }}" width="130" height="130"></li>

										<li class="   a2 fl poi1" style="z-index:1;position:relative;" >
                                                    <p class="tatle wordsbase" style="max-width:230px">{{ item2.item_name.split("_")[1] }}</p>
                                              
                                                    <p class="info mt8">
                                                     {{# if(item2.item_name.split("_")[0] == "mass") { }}
                                                          {{ item2.massage_time }}分钟
                                                     {{# }else if(item2.item_name.split("_")[0] == "pro") {  }}
                                                            {{ item2.produce_netcontent }}
                                                     {{# } }}
                                                     <span class="ml10 mr10 centerline">|</span>   
                                                           <span class="txtpink">
                                                                        {{# if(item2.item_num==-1) { }}
																				无限次
                                                                       {{# }else { }}
                                                                          {{item2.item_num }}次
                                                                       {{# } }}
                                                           </span> 
                                                    </p>

                                                    <p class="info mt8">
                                                        <span class="txthui01">
                                                                 {{ item2.item_data.split(" ")[0] }}到期
                                                            </span>
                                                    </p>
                                                        
                                                    <p class="poi2"><a  >立即预约</a></p>
                                                        
                                        
                                        </li>
</ul>
                                       {{# } }}
                              
            

                           {{# } }}

                    {{# }}}
                               
              {{# } }}
         {{# } }}
	</div>
	</div> 
 </script>




<script type="text/html" id ="inClassItemTemp">
   <div class="bgbai">
{{# if(d.cardClass[d.ID].item_child){ }}

   {{# for(var i= 0; i<d.cardClass[d.ID].item_child.length; i++) { }}
            {{# var item =d.cardClass[d.ID].item_child[i]; }}
			{{# var ite =d.cardClass[d.ID]; }}
			{{# if(d.cardClass[d.ID].item_name.split("_")[0] == "mass") { }}
                 {{# if(d.cardType ==1) { }}
                           
                   <ul class="shophyk_dat shophyk_xxcard">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                         {{# if(item.item_price < d.content.card_money) { }}
								<li class="a2 fl poi1" data-click='true'
								data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}"
 								data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
							<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1]}}</p>
						
							<p class="info mt8 txtpink">
                        			{{ item.massage_time }}分钟
                       			<!--	 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}次 </span> 
                                 -->
                       		</p>
                        
                       		<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        	</p>
						    <p class="poi2"><a >立即预约</a></p>
					   	</li>

                         {{# }else { }}
						  <li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
							<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1]}}</p>
						
							<p class="info mt8 txtpink">
                        			{{ item.massage_time }}分钟
                       			<!--	 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}次 </span> 
                                 -->
                       		</p>
                        
                       		<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        	</p>
						    <p class="poi2">余额不足</p>
					     	</li>

                          {{# } }}
						
			        </ul>
               
                 {{# }else if(d.cardType ==0) {  }}
						
                   <ul class="shophyk_dat shophyk_xxcard">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
						
						{{# if(item.item_num>0) { }}
					    <li class="a2 fl poi1" data-click='true' data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
							<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1]}}</p>
						
							<p class="info mt8 txtpink">
                        			{{ item.massage_time }}分钟
                       			<!--	 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}次 </span> 
                                 -->
                       		</p>
                        
                       		<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        	</p>
						    <p class="poi2"><a >立即预约</a></p>
					   	</li>
                        {{#}else { }}
							    <li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
							<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1]}}</p>
						
							<p class="info mt8 txtpink">
                        			{{ item.massage_time }}分钟
                       			<!--	 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}次 </span> 
                                 -->
                       		</p>
                        
                       		<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        	</p>
						    <p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
					   	</li>



                        {{# } }}

			        </ul>



                  {{# } }}




            
            {{# }else if(d.cardClass[d.ID].item_name.split("_")[0] == "pro") { }}
                   
				{{# if(d.cardType==1 ) { }}
                      

                        <ul class="shophyk_dat shophyk_xxcard">
							<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>

                         {{# if( item.item_price <= d.content.card_money) { }}
							<li class="a2 fl poi1" data-click='true' data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1] }}</p>
						
								<p class="info mt8">
                        			{{ item.produce_netcontent}}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}折 </span> 
                       			</p>

                       			<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        		</p>
						    	<p class="poi2"><a >立即预约</a></p>
				        	</li>
                         {{#}else { }}
							<li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1] }}</p>
						
								<p class="info mt8">
                        			{{ item.produce_netcontent}}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}折 </span> 
                       			</p>

                       			<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        		</p>

                                {{# if(item.if_preferential==0) { }}
										<p class="poi2 comped">余额不足</p>
                                {{# }else if(item.if_preferential==1){ }}
						    			<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
                                {{# } }}
				        	</li>
                         {{# } }}
			           </ul>  
            {{# }else if(d.cardType==0) { }}
						 <ul class="shophyk_dat shophyk_xxcard">
							<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>

                         {{# if( item.item_num >0) { }}
							<li class="a2 fl poi1" data-click='true' data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1] }}</p>
						
								<p class="info mt8">
                        			{{ item.produce_netcontent}}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}折 </span> 
                       			</p>

                       			<p class="info mt8">
                        		  	<span class="txthui01">
                                  	</span>
                        		</p>
						    	<p class="poi2"><a >立即预约</a></p>
				        	</li>
                         {{#}else { }}
							<li class="a2 fl poi1"  data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.content.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}" data-item-name="{{item.item_name}}" data-item-num="{{ item.item_num}}">
								<p class="tatle wordsbase" style="max-width:300px">{{ item.item_name.split("_")[1] }}</p>
						
								<p class="info mt8">
                        			{{ item.produce_netcontent}}
                       				 <span class="ml10 mr10 centerline">|</span>   
                                   	 <span class="txtpink"> {{ item.item_num }}折 </span> 
                       			</p>

                       			<p class="info mt8">
                        		  	<span class="txthui01">
                                    
                                  	</span>
                        		</p>
						    	<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
				        	</li>


                         {{# } }}

			           </ul>  

            {{# } }}
           {{# }}}
   {{# } }}
{{# } }}
</div>
</script>



<script type="text/html" id="consumeRecordTemp">
  {{# for(var i = 0; i<d.itemSeached.length;i++){ }}
           {{# var item3 =d.itemSeached[i] }}
           {{# if(d.cardType ==1) { }} 

				<ul class="shophyk_dat shophyk_xxcard">
						<li class="a1 fl"><img src="{{ item3.item_url}}" width="130" height="130"></li>
            {{# if(item3.if_preferential==0 ) {}}
                     {{# if( item3.item_price<= d.allcontent.card_money) { }}
                         
						<li  class=" consumRecords a2 fl poi1" data-record-click='true' data-type-id="{{item3.type_id}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.allcontent.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.allcontent.card_money}}" data-if-preferential="{{ item3.if_preferential}}" data-massage-time="{{ item3.massage_time}}" data-item-price="{{ item3.item_price}}"  data-item-id="{{item3.item_id}}" data-item-name="{{item3.item_name}}" data-item-num="{{ item3.item_num}}" data-if-preferential ="{{item3.if_preferential}}">
							<p class="tatle">{{ item3.item_name.split("_")[1]}}<span class="ml10 shophyk_xxcard_comp">{{ d.content[i].num}}</span></p>
							<p class="info mt8">服务员工 :   
                                  <span class="">
                                     {{# for(var j = 0;j<d.content[i].staff_names.length;j++) { }}
 											{{ d.content[i].staff_names[j] }}
                                     {{# } }}
                                  </span> 
                       	 	</p>
							<p class="info mt8">消费时间：<span class="txthui01">{{ d.content[i].order_time }}</span></p>
							<p class="poi2"><a >再次消费</a></p>
						</li>
                     {{# }else { }}
                          <li  class=" consumRecords a2 fl poi1" data-no-money='true' data-type-id="{{item3.type_id}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.allcontent.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.allcontent.card_money}}" data-if-preferential="{{ item3.if_preferential}}" data-massage-time="{{ item3.massage_time}}" data-item-price="{{ item3.item_price}}"  data-item-id="{{item3.item_id}}" data-item-name="{{item3.item_name}}" data-item-num="{{ item3.item_num}}" data-if-preferential ="{{item3.if_preferential}}" >
							<p class="tatle">{{ item3.item_name.split("_")[1]}}<span class="ml10 shophyk_xxcard_comp">{{ d.content[i].num}}</span></p>
							<p class="info mt8">服务员工 :   
                                  <span class="">
                                     {{# for(var j = 0;j<d.content[i].staff_names.length;j++) { }}
 											{{ d.content[i].staff_names[j] }}
                                     {{# } }}
                                  </span> 
                       	 	</p>
							<p class="info mt8">消费时间：<span class="txthui01">{{ d.content[i].order_time }}</span></p>
							<p class="poi2 comped">余额不足</p>
						</li>
                     {{# } }}
            {{# }else if(item3.if_preferential==1) { }}  
				  {{# if( item3.item_num > 0) { }}
                         
						<li  class=" consumRecords a2 fl poi1" data-record-click='true'  data-type-id="{{item3.type_id}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.allcontent.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.allcontent.card_money}}" data-if-preferential="{{ item3.if_preferential}}" data-massage-time="{{ item3.massage_time}}" data-item-price="{{ item3.item_price}}"  data-item-id="{{item3.item_id}}" data-item-name="{{item3.item_name}}" data-item-num="{{ item3.item_num}}" data-if-preferential ="{{item3.if_preferential}}">
							<p class="tatle">{{ item3.item_name.split("_")[1]}}<span class="ml10 shophyk_xxcard_comp">{{ d.content[i].num}}</span></p>
							<p class="info mt8">服务员工 :   
                                  <span class="">
                                     {{# for(var j = 0;j<d.content[i].staff_names.length;j++) { }}
 											{{ d.content[i].staff_names[j] }}
                                     {{# } }}
                                  </span> 
                       	 	</p>
							<p class="info mt8">消费时间：<span class="txthui01">{{ d.content[i].order_time }}</span></p>
							<p class="poi2"><a >再次消费</a></p>
						</li>
                     {{# }else { }}
                          <li  class=" consumRecords a2 fl poi1" data-no-money='true' data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.allcontent.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.allcontent.card_money}}" data-if-preferential="{{ item3.if_preferential}}" data-massage-time="{{ item3.massage_time}}" data-item-price="{{ item3.item_price}}"  data-item-id="{{item3.item_id}}" data-item-name="{{item3.item_name}}" data-item-num="{{ item3.item_num}}" data-if-preferential ="{{item3.if_preferential}}">
							<p class="tatle">{{ item3.item_name.split("_")[1]}}<span class="ml10 shophyk_xxcard_comp">{{ d.content[i].num}}</span></p>
							<p class="info mt8">服务员工 :   
                                  <span class="">
                                     {{# for(var j = 0;j<d.content[i].staff_names.length;j++) { }}
 											{{ d.content[i].staff_names[j] }}
                                     {{# } }}
                                  </span> 
                       	 	</p>
							<p class="info mt8">消费时间：<span class="txthui01">{{ d.content[i].order_time }}</span></p>
							<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
						</li>
                     {{# } }}

            {{# } }}
			  </ul>

           {{# }else if(d.cardType ==0) { }}
						 <ul class="shophyk_dat shophyk_xxcard">
						<li class="a1 fl"><img src="{{ item3.item_url}}" width="130" height="130"></li>
            
                     {{# if( item3.item_num>0) { }}
                         
						<li  class=" consumRecords a2 fl poi1" data-record-click='true'  data-type-id="{{item3.type_id}}" data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.allcontent.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.allcontent.card_money}}" data-if-preferential="{{ item3.if_preferential}}" data-massage-time="{{ item3.massage_time}}" data-item-price="{{ item3.item_price}}"  data-item-id="{{item3.item_id}}" data-item-name="{{item3.item_name}}" data-item-num="{{ item3.item_num}}" data-if-preferential ="{{item3.if_preferential}}">
							<p class="tatle">{{ item3.item_name.split("_")[1]}}<span class="ml10 shophyk_xxcard_comp">{{ d.content[i].num}}</span></p>
							<p class="info mt8">服务员工 :   
                                  <span class="">
                                     {{# for(var j = 0;j<d.content[i].staff_names.length;j++) { }}
 											{{ d.content[i].staff_names[j] }}
                                     {{# } }}
                                  </span> 
                       	 	</p>
							<p class="info mt8">消费时间：<span class="txthui01">{{ d.content[i].order_time }}</span></p>
							<p class="poi2"><a >再次消费</a></p>
						</li>
                     {{# }else { }}
                          <li  class=" consumRecords a2 fl poi1"  data-no-money='true' data-shop-id="{{ d.shopId}}"  data-card-type="{{d.cardType}}" data-card-name="{{d.allcontent.card_name}}" data-custom-id="{{ d.customId}}" data-total-money="{{ d.allcontent.card_money}}" data-if-preferential="{{ item3.if_preferential}}" data-massage-time="{{ item3.massage_time}}" data-item-price="{{ item3.item_price}}"  data-item-id="{{item3.item_id}}" data-item-name="{{item3.item_name}}" data-item-num="{{ item3.item_num}}" data-if-preferential ="{{item3.if_preferential}}">
							<p class="tatle">{{ item3.item_name.split("_")[1]}}<span class="ml10 shophyk_xxcard_comp">{{ d.content[i].num}}</span></p>
							<p class="info mt8">服务员工 :   
                                  <span class="">
                                     {{# for(var j = 0;j<d.content[i].staff_names.length;j++) { }}
 											{{ d.content[i].staff_names[j] }}
                                     {{# } }}
                                  </span> 
                       	 	</p>
							<p class="info mt8">消费时间：<span class="txthui01">{{ d.content[i].order_time }}</span></p>
							<p class="poi2 comped"><img src="{{ d.webRoot}}/resources/images/meirong/shop/complete.png" width="158" height="80"></p>
						</li>
                     {{# } }}
          
			    </ul>
 
           {{# } }}  
             
  {{# } }}   

</script>





<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/library/store.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_card_detail.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 