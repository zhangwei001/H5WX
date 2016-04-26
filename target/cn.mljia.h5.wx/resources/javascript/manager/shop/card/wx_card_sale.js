$(function(){
    var jQuery = $.noConflict();

    var globalVar = store.get("globalVar")||{};

    var userId =globalVar.userId||'';
    var appId  = globalVar.appId||'';
    var openId = globalVar.openId||'';
    var accessToken =globalVar.accessToken||'';
    //全局变量中获取店铺详情
    var shopInfoData = store.get("shopInfoData");

    var activityId = getUrlParam("activityId");
    var shopId =  getUrlParam("shopId");
    var itemType = getUrlParam("itemType");
    var itemId   = getUrlParam("itemId");
    var from    = getUrlParam("from");

    var currentHref=window.location.href;

    var cardType = getUrlParam("cardType");
    var discountedMoney=0;//活动价格

    var webRoot = GLOBAL.contextPath;

    var phoneNumber,customName;

    var clickFlag=0;
    var orderWay;
    var cardSale={
        init:function(){
        	
            globalUtil.changeTitle('立即预约');
            //关闭分享
            globalUtil.globalShareFun('');

            if(activityId>0){
                clickFlag=1;
            }

            if(shopId && itemId){

                if(activityId>0){
                    //查询活动价格
                    this.getCardEventInfo(shopId);
                    globalUtil.changeTitle('立即购买');
                }
                this.getCardInfo();
            }else{
                //跳转选择店铺页面
                //location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
            }
            cardSale.getShopInfo();
        },
        getShopInfo:function(){
        	
    		//经纬度
 			var localHref=window.location.href.toString(),
			 	locals=localHref.split("#"),
			 	currentUrl=locals[0];
 			//获取经纬度
 			globalUtil.getEchoOrientation({
 				appId:appId,
 				currentUrl:currentUrl,
 				userId:userId
 			}, function(latitude,longitude){
 				//获取店铺信息
 				jQuery.ajax({
		        	 url:request.shop.shopInfo,
		        	 data:{
		        		 shop_id   :  shopId,
		        		 open_id :    openId,
		        		 longitude :  longitude,
		        		 latitude  :  latitude
		        	 },
		        	 type:"get",
		 			 dataType:"json",
		 			 success:function(data){
		 				 if(data.status == 200 && data.content){
		 					 var decodeObj = globalUtil.b64ToUtf8(data.content,"utf8"),
		 					  		shopInfoData =  JSON.parse(decodeObj);
		 					store.remove("shopInfoData");
		 					store.set("shopInfoData",shopInfoData);
		 				 }
		 			 },error:function(){
		 				 
		 			 }
		      });
 			});
       
        },
        getCardEventInfo:function(){

            jQuery.ajax({
                url: request.shop.getEventPriceById,
                data:{
                    shop_id 	:  shopId,
                    item_id     :  itemId,
                    activity_id :  activityId,
                    item_type   :  0 //项目类型（必填）（0：卡项 1：护理 2：产品）
                },
                type:"get",
                dataType: "json",
                async:false,
                success :function(data){
                    if(data.status === 200 && data.content ){
                        var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
                        var eventInfo = JSON.parse(decodeData);

                        discountedMoney=eventInfo.pre_price||0;//项目优惠价

                    }else{
                        alert("获取活动数据失败~");
                    };
                },
                error :function(){
                    alert("网络开了小差，重新试试吧~");
                }
            });

        },getCardInfo:function(){
            var _this=this;


            var userData = globalUtil.getUserData(shopId, userId,openId);
            if(userData){
                userData = globalUtil.b64ToUtf8(userData, "utf8");
                userData=JSON.parse(userData);
                customName=userData.user_name;
                phoneNumber = userData.cell_phone || "";
                if(phoneNumber){
                    var m = phoneNumber.substring(3, phoneNumber.length-4).replace(/./g, "*");
                    var  bindedPhone = phoneNumber.substr(0,3) + m + phoneNumber.substr(phoneNumber.length-4);
                }
            }






            //卡项详情
            jQuery.ajax({
                url:request.shop.getCardDetailsOfShopServe,
                data:{
                    shop_id 		 :  shopId ,
                    cardtype_id      :  itemId,
                    activity_id      :activityId || 0
                },
                type:"get",
                dataType: "json",
                async:false,
                success :function(data){
                    if(data.status === 200 && data.content ){
                        var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
                        var cardInfo = JSON.parse(decodeData);
                    //    console.log("cardInfo",cardInfo);
                        discountedMoney= discountedMoney||cardInfo.massage_price;

                        laytpl(jQuery("#reserveCardTemp").html()).render({
                            content: cardInfo,
                            sortSupportCard: {},
                            cardType:cardType,
                            activityId: activityId,
                            price: discountedMoney,
                            bindedPhone:bindedPhone,
                            from:from,
                            discountedMoney: discountedMoney
                        },function(html){
                            jQuery("#reserveView").html(html);
                            //时间 员工插件
                            _this.chooseTime(cardInfo);
                            _this.getStaffList(shopId);
                            _this.endFun(cardInfo);

                            _this.submitPhoneNum();
                        });

                    }else{
                        alert("获取数据失败~");
                    };
                },
                error :function(){
                    alert("网络开了小差，重新试试吧~");
                }
            });
        },chooseTime:function(cardInfo){
        	 var dateModify={
         			data:function(){
         				//当前日期 5分钟之后
         		        var minDate=new Date((new Date()/1000+(60*5))*1000);
         				 //商家预约天数
         		        var day=shopInfoData.max_days || 0;
         		        //预约截止到当前日期+天数
         		        var currdate=new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate());
	       		        var maxDate=new Date((currdate/1000+(86340*day))*1000);
         				return{
         					minDate:minDate,
         					maxDate:maxDate
         				}
         			},
 					verify:function(val,bussinessTime,activity){
 						//营业时间 09:00-12:00
	 		            var arr=bussinessTime.split('-');
	 		            var startH=arr[0].split(':')[0],
	 		             	startM=arr[0].split(':')[1],
	 		             	endH=arr[1].split(':')[0],
	 		             	endM=arr[1].split(':')[1];
	 		           var isActivity=activityId;
	 		            if(activity===0)isActivity=0;
	 		           
	 		            //ios环境不支持日期yyyy-mm-dd 转换成yyyy/mm/dd
	 		            val=val.replace(/-/g,"/");
						var _date=new Date(val);
						if(isActivity==0){
							//非活动
							if(_date.getHours()==startH && _date.getMinutes()>startM){
								return true;
							}	
							else if(_date.getHours()==endH && _date.getMinutes()<endM){
								return true;
							}
							else if(_date.getHours()>startH && _date.getHours()<endH && _date>new Date()){
								return true;
							}else{
								layer.open({
								    content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;padding:0px;text-align:center;font-size:28px;' >请选择商家营业时间"+bussinessTime+"</span>",
								    time:2
								});
								return false;
							}
						}else if(isActivity>0){
							//活动
							 var nowtime=new Date().getTime();
							 if(!cardInfo) return false;
							 var activLimitMinSec =cardInfo.limit_time*1000+nowtime;
							 //判断活动日期是不是过期
							 if(_date.getTime()>=activLimitMinSec){
								 var activTimeZone =(cardInfo.end_time.split(" ")[0]).replace(new RegExp("-","gm"),".");
								 layer.open({
	                                 content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;padding:0px;text-align:center;font-size:24px;' >时间不能大于"+activTimeZone+"</span>",
	                                 time:3
	                             });
	                             return false;
							 }else{
								 return dateModify.verify(val,bussinessTime,0);
							 }
							 
						}else{
							layer.open({
							    content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;padding:0px;text-align:center;font-size:28px;' >活动过期</span>",
							    time:2
							});
							return false;
						}
 					},
 					confirm:function(val){
 						if(from=="card"){
 		                    clickFlag=1;
 		                    $("#makeOrderBtn").removeClass("wxyy_info_main_but1").addClass("wxyy_info_main_but2");

 		                }else{
	 						if(dateModify.verify(val, shopInfoData.shop_bussiness_time) && phoneNumber){
	 			                clickFlag=1;
	 			                $("#makeOrderBtn").removeClass("wxyy_info_main_but1").addClass("wxyy_info_main_but2");
	 			            }else{
	 			            	 clickFlag=0;
	                             $("#makeOrderBtn").addClass("wxyy_info_main_but1").removeClass("wxyy_info_main_but2");
	 			            }
 		                }
 					},
 					init:function(){
 						 bindDateInput(dateModify.data().minDate,dateModify.data().maxDate,"#datetime-picker",dateModify.confirm);
 					}
         	}
         	dateModify.init();
        },getStaffList: function(shopId){
            //获取店铺员工列表
            var _this = this;
            jQuery.ajax({
                url: request.user.soleShopStaffLis,
                data:{ shop_id : shopId},
                type:"get",
                dataType:"json",
                success : function(data){
                    if(data.status == 200 && data.content){
                        var deCodeContent = globalUtil.b64ToUtf8(data.content,"utf-8");
                        staffLis=JSON.parse(deCodeContent);
                     //   console.log("staffLis",staffLis);
                        //设置默认服务员工
                        jQuery("#picker").attr("data-staff-id",staffLis[0].staff_id);
                        //调用选择员工插件
                        _this.chooseWaiter(staffLis);
                    }
                },
                error: function(data){}
            });

        },chooseWaiter:function(soleShopStaffLis){
            //选择员工插件
            var StaffNameLis=[];
            //获取员工姓名list
            for(var j=0;j<soleShopStaffLis.length;j++){
                var staffObj =soleShopStaffLis[j];
                for(var attr in staffObj){
                    if(attr == "staff_name"){
                        StaffNameLis.push(staffObj["staff_name"]);
                    }
                }
            }
            $("#picker").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
			      <div id="confirmBtn" style="text-align:center"><button class="button button-link  close-picker">\
			      确定\
			      </button></div><h1 class="title">请选择您要预约的技师</h1>\
			      </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: StaffNameLis,
                        cssClass: 'picker-items-col-normal'
                    }
                ],
                onChange :function(p, values, displayValues){
                    //根据员工姓名 获取员工ID
                    // var staffID = getstaffIDfun(values);
                    var staffId;
                    if(soleShopStaffLis){
                        for(var j = 0 ;j< soleShopStaffLis.length;j++){
                            jQuery.each(soleShopStaffLis[j],function(attr,val){
                                if(soleShopStaffLis[j].staff_name == values ){
                                    staffId=  soleShopStaffLis[j].staff_id;
                                }
                            });
                        }
                    }
                    $("#picker").attr("data-staff-id",staffId);
                }

            });
        },submitPhoneNum :function(){
            //完成电话姓名录入
            jQuery("#getPersonInfo").click(function(){
                location.href=webRoot + "/agent/manager-user-wx_user_submit_phone?shopId="+shopId+
                    "&itemId="+itemId+
                    "&activityId="+activityId+
                    "&itemType=card"+
                    "&from="+from+
                    "&cardType="+cardType;
            });
        },collectSubmitData:function(cardInfo){
            var _this = this;

            jQuery("#makeOrderBtn").click(function(){
            	
                if(activityId == 0){

                    if( phoneNumber=="" || clickFlag==0){
                        return
                    }

                    /*  if(from=="shopHome" ){
                     if(phoneNumber){
                     clickFlag=1;
                     }else{
                     return;
                     }
                     }else{
                     if( phoneNumber=="" || clickFlag==0){
                     return
                     }
                     }*/

                }else if(activityId>0) {
                    if(clickFlag==0 || phoneNumber==""){
                        return;
                    }
                }
                //按钮效果
                jQuery("#makeOrderBtn").css({"box-shadow":"0px 10px 14px #888888"});
                setTimeout(function(){
                	jQuery("#makeOrderBtn").css({"box-shadow":""});
                },100);
                
                var opt={};
                opt.itemType="card";
                opt.appId=globalVar.appId;
                opt.openId =globalVar.openId;
                opt.shopId  = shopId;
                opt.cardId = itemId;
                opt.staffId =jQuery("#picker").attr("data-staff-id") || 0;
                opt.yuyueTime =jQuery("#datetime-picker").val() || "";
                opt.orderWay =orderWay;
                //order_pre //0 购买 1预约
                if(activityId >0){
                    opt.orderPre =0;
                }else{
                    opt.orderPre =1;
                }
                opt.orderMoney =Number(cardInfo.price);
                opt.payMoney  =jQuery("#orderMoney").text().substring(1);
                opt.giveMoney  = cardInfo.give_money;
                opt.activityId  = activityId;
                opt.userMobile    =  phoneNumber;
                opt.userName     =    customName;
                opt.contextUrl=GLOBAL.contextPath;
                opt.cardType =cardType;
                opt.from = from;

              //  console.log("预约参数",opt);
                _this.submitDataFun(opt);
            });
        },submitDataFun:function(opt){
            /*
             * app_id  公众号APPID
             * open_id  用户openId
             * shop_id  预约的店铺
             * card_type_id  预约的卡 Id
             * staff_id    预约店铺的员工
             * yuyue_time  预约时间
             * order_way 0:现金；1：信用卡；2：借记卡；3：其他；4 退款记录；5：支付宝支付6 ：微信支付
             * order_pre //0 购买 1预约
             * order_money ,//金额
             * pay_money ,//支付金额
             * give_money//赠送金额
             * activity_id //活动id
             * custom_user_id //顾客userId
             * user_mobile   //号码
             * user_name  //名字
             */
            if(opt.orderWay==6){
            	store.remove("payBackUrl");
            	store.set('payBackUrl',currentHref);
                var encoded_url = request.zhifuUrl;

                encoded_url=encodeURI(encoded_url);
                //添加返回的ulr
                //opt.backUrl = window.location.href.toString();

                opt= JSON.stringify(opt);

                var state =globalUtil.utf8ToB64(opt, 'utf-8');

                /*var state ="";
                 store.remove("opt");
                 store.set("opt",opt);*/

                location.href= "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+GLOBAL.appIdPay+
                    "&redirect_uri=" +encoded_url+
                    "&response_type=code" +
                    "&scope=snsapi_base&state=" + state+ "#wechat_redirect";
                return;
                //其他支付方式
            }else{
                jQuery.ajax({
                    url: request.reserved.reservOrderCard,
                    type:"post",
                    async: false,
                    data:{
                        app_id: 		opt.appId,
                        open_id:		opt.openId,
                        shop_id:		opt.shopId,
                        card_type_id:   opt.cardId,
                        staff_id     :  opt.staffId,
                        yuyue_time    : opt.yuyueTime,
                        order_way    :   opt.orderWay,
                        order_pre    :   opt.orderPre,
                        order_money  :   opt.orderMoney,
                        pay_money    :   opt.payMoney,
                        give_money   :   opt.giveMoney,
                        activity_id  :   opt.activityId || "",
                        //	custom_user_id : opt.customUserId || "",
                        user_mobile    : opt.userMobile,
                        user_name     :  opt.userName


                    },
                    dataType:"json",
                    success: function(data){
                        if(200 == data.status && data.content){
                            //console.log(data);
                            var decodeContent     = globalUtil.b64ToUtf8(data.content, "utf8");
                            contentJSONData   = JSON.parse(decodeContent);
                       //     console.log("预约卡成功返回数据",contentJSONData);
                            if(contentJSONData){
                                store.remove("order_success_data");
                                store.set("order_success_data",contentJSONData);

                                var timestamp = contentJSONData.timeStamp;
                                var nonceStr = contentJSONData.nonceStr;
                                var signature = contentJSONData.nonceStr;
                                var package = contentJSONData.package;
                                var signType = contentJSONData.signType;
                                var paySign = contentJSONData.paySign;

                                location.href= GLOBAL.webRoot + "/agent/manager-pay-wx_pay_success?shopId="+ shopId +"&activityId="+activityId+"&from="+from;
                            }
                        }else {
                            alert(data.errorMessage);
                        }
                    },error:function(e){
                    }
                });
            }

        },endFun:function(cardInfo){
            //支付方式

            orderWay=jQuery("li[data-order-way]").eq(0).attr("data-order-way");
            jQuery(".wx_yhzifu").click(function(){
                orderWay= jQuery(this).attr("data-order-way");

                jQuery(this).find("i").addClass("icon-yhzifu_activ");
                jQuery(this).siblings().find("i").removeClass("icon-yhzifu_activ");

            });
            //完成电话姓名录入
            if(jQuery("#getPersonInfo").length>0){
                jQuery("#getPersonInfo").click(function(){
                    location.href=GLOBAL.webRoot + "/agent/manager-user-wx_user_submit_phone?shopId="+shopId+"&openId="+ openId +"&itemId="+itemId+"&itemType="+itemType+"&cardType="+cardType;
                });
            }
            this.collectSubmitData(cardInfo);
        }
    };

    cardSale.init();
    function bindDateInput(minDate,maxDate,id,callback){
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = { preset : 'datetime', minDate: minDate, maxDate:maxDate, stepMinute: 1  };
        //opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            lang:'zh',
            //startYear:currYear - 10, //开始年份
            //endYear:currYear + 10 //结束年份
        };
        var optDateTime = $.extend(opt['datetime'], opt['default']);
        jQuery(id).mobiscroll(optDateTime).datetime(optDateTime);
        jQuery(id).focus(function(){
        	jQuery('.picker-modal').remove();
        });
        jQuery(id).change(function(){
            callback && callback(jQuery(this).val());
        });
    }

});