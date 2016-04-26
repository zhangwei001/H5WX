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



<script type="text/html" id ="inClassItemTemp">
   <div class="bgbai">
{{# if(d.cardClass[d.dataIndex].item_child.length>0){ }}

   {{# for(var i= 0; i<d.cardClass[d.dataIndex].item_child.length; i++) { }}
            {{# var item =d.cardClass[d.dataIndex].item_child[i]; }}
			{{# var ite =d.cardClass[d.dataIndex]; }}
			{{# if(d.cardClass[d.dataIndex].item_name.split("_")[0] == "mass") { }}
                 {{# if(d.cardType ==1) { }}
                           
                  


                    {{# if(d.classFlag ==1 ) { }}
						{{# if(item.item_price < d.content.card_money) { }}
 <ul class="shophyk_dat shophyk_xxcard"  data-click='true'  data-is-given="{{item.if_preferential}}" 
								data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-item-name="{{item.item_name}}"
 								 data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                         
						<li class="a2 fl poi1">
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
</ul>
                         {{# }else { }}

 <ul class="shophyk_dat shophyk_xxcard"  data-no-money='true'  data-is-given="{{item.if_preferential}}" 
								data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-item-name="{{item.item_name}}"
 								 data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                         
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
          </ul>
                          {{# } }}
				{{# }else if(d.classFlag ==0) { }}	

 <ul class="shophyk_dat shophyk_xxcard"  data-click='true'  data-is-given="{{item.if_preferential}}" 
								data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-item-name="{{item.item_name}}"
 								 data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
                         
						<li class="a2 fl poi1">
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
   </ul>
               {{# } }}
			     
               
                 {{# }else if(d.cardType ==0) {  }}
						
                  
						
						{{# if(item.item_num>0) { }}
 <ul class="shophyk_dat shophyk_xxcard" data-click='true' data-is-given="{{item.if_preferential}}"   data-item-name="{{item.item_name}}" data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}"  data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
					    <li class="a2 fl poi1" >
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
</ul>
                        {{#}else { }}
 <ul class="shophyk_dat shophyk_xxcard"  data-no-money='true' data-is-given="{{item.if_preferential}}"   data-item-name="{{item.item_name}}" data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}"  data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
						<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
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
 </ul>
                        {{# } }}

                  {{# } }}

            
            {{# }else if(d.cardClass[d.dataIndex].item_name.split("_")[0] == "pro") { }}
                   
				{{# if(d.cardType==1 ) { }}
                      

                       

                         {{# if( item.item_price <= d.content.card_money) { }}
 <ul class="shophyk_dat shophyk_xxcard"  data-click='true'  data-is-given="{{item.if_preferential}}"   data-item-name="{{item.item_name}}"  data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}"  data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
							<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
							<li class="a2 fl poi1">
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
                           </ul>
                         {{#}else { }}
 <ul class="shophyk_dat shophyk_xxcard"   data-no-money='true'  data-is-given="{{item.if_preferential}}"   data-item-name="{{item.item_name}}"  data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}"  data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
							<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
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
						</ul>
                         {{# } }}
			             
            {{# }else if(d.cardType==0) { }}
						

                         {{# if( item.item_num >0) { }}
 <ul class="shophyk_dat shophyk_xxcard" data-click='true' data-is-given="{{item.if_preferential}}"   data-item-name="{{item.item_name}}" data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
							<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
							<li class="a2 fl poi1" >
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
                            </ul>
                         {{#}else { }}
 					<ul class="shophyk_dat shophyk_xxcard"  data-no-money='true' data-is-given="{{item.if_preferential}}"   data-item-name="{{item.item_name}}" data-type-id="{{ ite.type==0 ? ite.item_id  : 0}}" data-total-money="{{ d.content.card_money}}" data-if-preferential="{{ item.if_preferential}}" data-massage-time="{{ item.massage_time}}" data-item-price="{{ item.item_price}}"  data-item-id="{{ item.item_id}}"  data-item-num="{{ item.item_num}}">
							<li class="a1 fl"><img src="{{ item.item_url }}" width="130" height="130"></li>
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
					</ul>  

                         {{# } }}

			           

            {{# } }}
           {{# }}}
   {{# } }}
{{# } }}
</div>
</script>






<!-- 外部js资源文件引入 -->
<script src="<%=request.getContextPath()%>/resources/javascript/manager/user/catalog/wx_user_card_item_type_list.js"></script>

<jsp:include  page="../../../layout_app/footer.jsp" /> 