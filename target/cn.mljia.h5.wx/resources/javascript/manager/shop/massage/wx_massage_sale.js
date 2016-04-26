
$(function(){
    var jQuery = $.noConflict();
    //由localStore 获取全局变量
    var globalVar = store.get("globalVar")||{};
    var userId =globalVar.userId||'';
    var appId  = globalVar.appId||'';
    var openId = globalVar.openId||'';
    var accessToken =globalVar.accessToken||'';

    var currentHref=window.location.href;
    //全局变量中获取店铺详情
    var shopInfoData = store.get("shopInfoData");
    console.log("shopInfoData",shopInfoData);

    //由全局变量中获的卡详情
    var cardDetailsInfo = store.get("wx_user_card_detail");
    console.log("卡详情",cardDetailsInfo);
    //url参数
    var activityId = globalUtil.getUrlParam("activityId");
    var shopId =  globalUtil.getUrlParam("shopId");
    var itemType = globalUtil.getUrlParam("itemType");
    var itemId   = globalUtil.getUrlParam("itemId");
    var from     = globalUtil.getUrlParam("from");
    var isGiven   = globalUtil.getUrlParam("isGiven");

    //耗卡预约，耗赠送类Id
    var itemTypeId = getUrlParam("itemTypeId");

    //如果是次卡 表示最大可用次数，如果是储值卡 表示 折扣
    var maxTimesORdiscount = globalUtil.getUrlParam("maxTimesORdiscount");

    var discountedMoney = globalUtil.getUrlParam("discountedMoney");
    var givenMoney = globalUtil.getUrlParam("givenMoney");

    var otherShopId = globalUtil.getUrlParam("otherShopId") || "";
    var otherShopName = globalUtil.getUrlParam("otherShopName") || "";

    var cardType = globalUtil.getUrlParam("cardType");
    var discountedMoney=0;//活动价格

    var webRoot = GLOBAL.contextPath;
    var phoneNumber;
    var customName;

    //护理详情
    var massageInfo;
    var customId;
    //url数据
    var urlData = {
        itemType: itemType,
        cardType: cardType,
//			shared: shared,
        webRoot: webRoot,
        itemId: itemId};

    //globalUtil.changeTitle('');
    //如果是从item,advice来的，表示排序后的 可耗卡
    var sortedCard=[];

    var clickFlag=0;
    var massageReserve={
        init: function(){
            globalUtil.changeTitle('立即预约');
            //关闭分享
            globalUtil.globalShareFun('');
            if(shopId && itemId){
                if(activityId>0){
                    //查询活动价格
                    this.getMassageEventInfo(shopId);
                    globalUtil.changeTitle('立即购买');
                }
                //获取customId;
                var	customInfo= globalUtil.getCustomerId(openId,shopId);
                if(customInfo){
                    customInfo = globalUtil.b64ToUtf8(customInfo, "utf8");
                    customInfo=JSON.parse(customInfo);
                    customId=customInfo.custom_id;
                }

                //如果来源是非优惠活动进来的
                if(from != "event" && customId>0){
                    //获取可用卡项列表
                    this.getMassageAccessCard(customId);
                }
                this.getMassageInfo();

            }else{
                //跳转选择店铺页面
                //location.href = GLOBAL.contextPath + "/agent/manager-shop-wx_select_shop_index?from=event";
            }


        },getMassageAccessCard:function(){
            var sortValueCard =[];
            var sortTimesCard=[];

            //获取某护理用户可耗卡信息
            jQuery.ajax({
                url: request.reserved.getMassageIncludeCardInfo,
                data:{
                    shop_id :shopId,
                    custom_id :customId,
                    massage_id: itemId,
                    open_id :openId,
                    app_id :appId,
                    access_token:accessToken
                },
                type:"get",
                dataType:"json",
                async:false,
                success: function(data){
                    if(200 == data.status && data.content){

                        var decodeContent = globalUtil.b64ToUtf8(data.content, "utf8");
                        decodeContent = JSON.parse(decodeContent);

                        var startime = new Date().getTime();
                        console.log("startime",startime);
                        for(var i = 0 ;i<decodeContent.length;i++){
                            var itemCard =decodeContent[i];
                            for(var attr in itemCard){
                                if(attr == "card_type"){
                                    if(itemCard[attr] == 1){
                                        sortValueCard.push(itemCard);

                                    }else if(itemCard[attr] == 0){
                                        sortTimesCard.push(itemCard);
                                    }
                                }
                            }
                        }

                        var endtime = new Date().getTime();
                        console.log("endtime",endtime);
                        console.log("排序耗时",endtime-startime);
                        console.log("排序后的可用储值卡项",sortValueCard);

                        sortedCard=sortValueCard.concat(sortTimesCard);

                        console.log("最后处理后的可耗卡",sortedCard);
                        //没有卡项支持耗
                    }
                },error:function(e){
                }
            });


        },getMassageEventInfo:function(){

            jQuery.ajax({
                url: request.shop.getEventPriceById,
                data:{
                    shop_id 	:  shopId,
                    item_id     :  itemId,
                    activity_id :  activityId,
                    item_type   :  1 //项目类型（必填）（0：卡项 1：护理 2：产品）
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

        },getMassageInfo:function(){
            var _this=this;
            //护理详情
            jQuery.ajax({
                url:request.shop.getMassageDetailsOfShopServe,
                data:{
                    shop_id 	   :  shopId ,
                    massage_id     :  itemId,
                    activity_id    :  activityId || 0
                },
                type:"get",
                dataType: "json",
                async:false,
                success :function(data){
                    if(data.status === 200 && data.content ){
                        var decodeData = globalUtil.b64ToUtf8(data.content,"utf-8");
                        massageInfo = JSON.parse(decodeData);

                        console.log("护理详情massageInfo",massageInfo);
                        discountedMoney= discountedMoney||massageInfo.massage_price;
                        //从“二期”耗卡预约过来的，渲染rendDataFromCard，
                        if(from =="card"){
                            //从我的卡项进来 支付方式只有卡
                            _this.rendDataFromCard(massageInfo);

                        }else if( from =="event"){
                            //从活动页面进来支付方式只有线上
                            _this.rendDataFromItem(massageInfo);
                        }else{
                            //正常做服务，支付方式有卡项，线上，线下
                            //从服务项目 item  、商家推荐advice 、 店铺主页shopHome 过来的 渲染rendDataFromItem
                            _this.rendDataFromItem(massageInfo);
                        }

                    }else{
                        alert("获取数据失败~");
                    };
                },
                error :function(){
                    alert("网络开了小差，重新试试吧~");
                }
            });


        },chooseTime:function(){
        	var dateModify={
        			data:function(){
        				//当前日期 5分钟之后
         		        var minDate=new Date((new Date()/1000+(60*5))*1000),
        				 	//商家预约天数
        		           day=shopInfoData.max_days || 0,
        		           //预约截止到当前日期+天数
        		           currdate=new Date(minDate.getFullYear(),minDate.getMonth(),minDate.getDate());
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
							 if(!massageInfo) return false;
							 var activLimitMinSec =massageInfo.limit_time*1000+nowtime;
							 //判断活动日期是不是过期
							 if(_date.getTime()>=activLimitMinSec){
								//活动过期日期
								 var activTimeZone =(massageInfo.end_time.split(" ")[0]).replace(new RegExp("-","gm"),".");
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
						if(dateModify.verify(val, shopInfoData.shop_bussiness_time) && phoneNumber){
			                clickFlag=1;
			                $("#makeOrderBtn").removeClass("wxyy_info_main_but1").addClass("wxyy_info_main_but2");
			            }else{
			            	 clickFlag=0;
                             $("#makeOrderBtn").addClass("wxyy_info_main_but1").removeClass("wxyy_info_main_but2");
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
                        console.log("staffLis",staffLis);
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
		      <div id="confirmBtn"  style="text-align:center"><button class="button button-link  close-picker">\
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
        },getCustomPhone:function(){
            //用户填写手机号码
            var getPhoneDom=jQuery("#getPersonInfo");
            if(getPhoneDom.length>0){
                getPhoneDom.click(function(){
                    location.href= GLOBAL.webRoot +"/agent/manager-user-wx_user_submit_phone?shopId="+shopId +
                        "&itemId="+itemId+
                        "&activityId="+activityId+
                        "&from="+from+
                        "&itemType=massage";
                });
            }

        },rendDataFromCard:function(massageInfo){
            //渲染从耗卡预约来的护理（二期） makeCardOrderTemp
            //1.来源用户的卡详情， 支付方式只显示可用耗卡--- 渲染从耗卡预约来的护理（二期） makeCardOrderTemp

            var _this = this;

            var userData = globalUtil.getUserData(shopId, userId,openId);
            if(userData){
                var userDataDecode = globalUtil.b64ToUtf8(userData, "utf8");
                var	userDataInfo=JSON.parse(userDataDecode);

                phoneNumber= userDataInfo.cell_phone;

                var m = phoneNumber.substring(3, phoneNumber.length-4).replace(/./g, "*");
                var bindedPhone = phoneNumber.substr(0,3) + m + phoneNumber.substr(phoneNumber.length-4);
            }
            
            var shopLisNum = globalUtil.getShopLis(userId);


            laytpl( jQuery("#makeCardOrderTemp").html() ).render({
                isGiven:isGiven,
                shopLisNum:shopLisNum,
                massageInfo:massageInfo,
                maxTimesORdiscount:maxTimesORdiscount,
                cardDetailsInfo:cardDetailsInfo,
                shopInfoData :shopInfoData,
                bindedPhone :bindedPhone
            }, function(html){
                jQuery("#reserveView").empty();
                jQuery("#reserveView").append(html);

                _this.chooseTime();

                if(otherShopId){
                    _this.getStaffList(otherShopId);
                }else{
                    _this.getStaffList(shopId);
                }


                //未绑定用户，跳转页面填写手机号
                _this.getCustomPhone();
                var i =0;
                var j=0;
                var shouldMaxNum;
                var hasOverflow =false;
                //二期耗卡预约护理
                var fromCardMassageApp = {
                    init:function(){
                        var _this = this;
                        jQuery("#addNumBtn").click(function(){
                            _this.addBtnfun();
                        });

                        jQuery("#subNumBtn").click(function(){
                            _this.subBtnfun();
                        });

                        //异店耗卡 选择店铺
                        this.addMutiShopAddress();
                        //如果异店Id存在，则修改dom
                        if(otherShopId){
                            jQuery("#yuyueShopLink").find("span").text(decodeURI(otherShopName));
                        }
                        this.collectSubmitData();
                    },addBtnfun:function(){

                        var subNumBtnChild = jQuery("#subNumBtn").children("i");
                        var numNode=Number(jQuery("#reservNums").text());
                        if(i == 0 ){
                            i=1;
                            numNode  += 1;
                            jQuery("#reservNums").text(numNode);
                            //修改减按钮的样式
                            this.changeBtnStyle(numNode,subNumBtnChild);
                            this.compareShouldNum(numNode);
                            //刷新花费的DOM节点
                            this.refreshCoatDom();
                        }else{
                            numNode  += 1;
                            jQuery("#reservNums").text(numNode);
                            //修改减按钮的样式
                            this.changeBtnStyle(numNode,subNumBtnChild);
                            this.compareShouldNum(numNode);
                            //刷新花费的DOM节点
                            this.refreshCoatDom();
                        }
                    },subBtnfun : function(){
                        var subNumBtnChild = jQuery("#subNumBtn").children("i");
                        var initNum =Number(jQuery("#reservNums").text());
                        if(j == 0 ){
                            j=1;
                            if(initNum<=1 ){
                                return;
                            }
                            initNum  -= 1;
                            jQuery("#reservNums").text(initNum);
                            this.changeBtnStyle(initNum,subNumBtnChild);
                            //刷新花费的DOM节点
                            this.refreshCoatDom();
                        }else{
                            if(initNum<=1 ){
                                return;
                            }
                            initNum  -= 1;
                            jQuery("#reservNums").text(initNum)
                            this.changeBtnStyle(initNum,subNumBtnChild);
                            this.refreshCoatDom();
                        }
                    },changeBtnStyle :function(num,$obj){
                        if(num>=2){
                            if( $obj.hasClass("icon-yyifminus_a") ){
                                $obj.removeClass("icon-yyifminus_a");
                            }
                        }else{
                            if( !$obj.hasClass("icon-yyifminus_a")){
                                $obj.addClass("icon-yyifminus_a");
                            }
                        }
                    },compareShouldNum: function(Num){
                        var costNum = jQuery("#costNum");
                        //如果不是赠送
                        if(isGiven == 0){
                            //如果是储值卡
                            if(cardDetailsInfo.card_type ==1){
                                shouldMaxNum = Math.floor(Number(cardDetailsInfo.card_money)/(Number(massageInfo.massage_price)*Number(maxTimesORdiscount)/10));
                                if( Num>shouldMaxNum ){
                                    layer.open({
                                        content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;line-height:150px;padding:0px;text-align:center;font-size:28px;' >卡内金额不足</span>",
                                        time:1
                                    });
                                    hasOverflow= true;
                                    costNum.text(shouldMaxNum);
                                }else{
                                    costNum.text(Num);
                                }
                                //如果是次卡，初始化
                            }else if(cardDetailsInfo.card_type == 0){
                                //shouldMaxNum = Math.floor(totalMoney/(price*itemDiscount/10));
                                //判断是否是无限次 urlData.itemAllNum=-1 是无限次
                                if(maxTimesORdiscount>0){
                                    if( Num > maxTimesORdiscount ){
                                        layer.open({
                                            content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;line-height:150px;padding:0px;text-align:center;font-size:28px;' >卡内次数不足</span>",
                                            time:1
                                        });
                                        hasOverflow= true;
                                        costNum.text(maxTimesORdiscount);
                                    }else{
                                        costNum.text(Num);
                                    }
                                }else {
                                    costNum.text(Num);
                                }
                            }
                            //赠送
                        }else if(isGiven == 1){
                            //判断是否是无限次 urlData.itemAllNum=-1 是无限次
                            if(cardDetailsInfo.card_type == 1){
                                if(maxTimesORdiscount>0){
                                    if( Num > maxTimesORdiscount ){
                                        layer.open({
                                            content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;line-height:150px;padding:0px;text-align:center;font-size:28px;' >卡内次数不足</span>",
                                            time:1

                                        });
                                        hasOverflow= true;
                                        costNum.text(maxTimesORdiscount);
                                    }else{
                                        costNum.text(Num);
                                    }
                                }
                            }else if(cardDetailsInfo.card_type == 0){
                                if(maxTimesORdiscount>0){
                                    if( Num > maxTimesORdiscount ){
                                        layer.open({
                                            content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;line-height:150px;padding:0px;text-align:center;font-size:28px;' >卡内次数不足</span>",
                                            time:1
                                        });
                                        hasOverflow= true;
                                        costNum.text(maxTimesORdiscount);
                                    }else{
                                        costNum.text(Num);
                                    }
                                }
                            }

                        }
                    },refreshCoatDom: function(){
                        /*根据参数 计算 消耗金额 或者消耗次数
                         * 储值卡 次卡
                         */
                        //储值卡
                        var costNum = jQuery("#costNum");
                        if(hasOverflow){
                            var num = Number(jQuery("#reservNums").text());
                            jQuery("#reservNums").text(num-1);
                        }
                        //如果不是赠送
                        if(isGiven == 0){
                            if(cardDetailsInfo.card_type == 1){

                                var costMoney = ((massageInfo.massage_price)* (Number(jQuery("#reservNums").text()))* (maxTimesORdiscount/10)).toFixed(2);
                                jQuery("#costMoney").text("¥"+costMoney);
                                hasOverflow=false;
                                //次卡
                            }else if(cardDetailsInfo.card_type == 0){

                                var num= Number(jQuery("#reservNums").text());
                                jQuery("#costNum").text(num+"次");
                                hasOverflow=false;
                            }
                        }else if(isGiven == 1){
                            var num= Number(jQuery("#reservNums").text());
                            jQuery("#costNum").text(num+"次");
                            hasOverflow=false;
                        }
                    },addMutiShopAddress:function(){
                        //修改预约店铺 把url参数 通过localStore 保存 并传输  maxTimesORdiscount=10&discountedMoney=null&givenMoney=undefined&from=card
                        var yuyue_card_massage_url_para={
                            shopId:shopId,
                            isGiven:isGiven,
                            itemId:itemId,
                            itemTypeId:itemTypeId,
                            itemType:itemType,
                            activityId:activityId,
                            maxTimesORdiscount:maxTimesORdiscount,
                            discountedMoney:discountedMoney,
                            givenMoney:givenMoney,
                            from:from,
                            customId:customId
                        };
                        store.remove("yuyue_card_massage_url_para");
                        store.set("yuyue_card_massage_url_para",yuyue_card_massage_url_para);
                        var  packUrl = globalUtil.packParam(GLOBAL.contextPath+'/agent/manager-shop-wx_select_shop_index', {
                            from:"card",
                            itemType:"massage"
                        });
                        jQuery("#yuyueShopLink").attr("href",packUrl);

                    },collectSubmitData: function(){
                        var _this = this;
                        //收集预约参数
                        jQuery("#makeOrderBtn").click(function(){
                            if(!jQuery("#datetime-picker").val() || clickFlag==0){
                                return;
                            }
                            /*		app_id        :     opt.appId,
                             open_id       :     opt.openId,
                             shop_id       :	    opt.shopId,                 //预约的店铺
                             is_other_shop : 	opt.isOtherShop,                  //是否异店耗卡 0不是，1是
                             other_shop_id :  	opt.otherShopId,                  //如果是异店，则是本店店铺         (进来时候shopId)
                             custom_id     :	    opt.customId,      		    //非异店则是本店顾客，异店则是异店顾客     进来时候
                             card_id       :	    opt.cardId,                 //非异店则是本店卡，异店则是异店卡             进来时候
                             staff_id      :     opt.StaffId,                //预约店铺的店员工   选择店铺 员工
                             product_id    :     opt.productId,               //非异店则是本店产品，异店则是异店产品     进来时候
                             num           :     opt.num,
                             yuyue_time    :     opt.reservedTiem,             //预约时间
                             order_way     :    -1   */
                            
                            //按钮效果
                            jQuery("#makeOrderBtn").css({"box-shadow":"0px 10px 14px #888888"});
                            setTimeout(function(){
                            	jQuery("#makeOrderBtn").css({"box-shadow":""});
                            },100);
                            var opt={
                                appId:appId,
                                openId:openId,
                                shopId:shopId,
                                otherShopId:shopId,
                                isOtherShop:0,
                                customId:customId,
                                cardId:cardDetailsInfo.card_id,
                                StaffId:jQuery("#picker").attr("data-staff-id"),
                                massageId :itemId,
                                num:Number(jQuery("#reservNums").text()),
                                isPreferential: isGiven,
                                reservedTiem:jQuery("#datetime-picker").val(),
                                orderWay:-1
                            }
                            //如果有异店店铺Id 则为异店耗卡
                            if(otherShopId && otherShopId != shopId){
                                opt.shopId=otherShopId;
                                opt.otherShopId=shopId;
                                opt.isOtherShop=1;
                            }else{
                                opt.shopId=shopId;
                                opt.otherShopId=shopId;
                                opt.isOtherShop=0;
                            }
                            //耗卡预约护理，类Id
                            opt.massageTypeId=itemTypeId || "";
                            opt.phoneNum = phoneNumber,
                                opt.customName =userDataInfo.customer_name,
                                opt.orderMoney=Number(massageInfo.massage_price)*Number($("#reservNums").text());

                            if(isGiven==1){
                                //如果是赠送
                                opt.payMoney=Number(massageInfo.massage_price)*Number($("#costNum").text().substring(0,1));
                            }else{
                                if(cardDetailsInfo.card_type ==1){
                                    opt.payMoney=Number($("#costMoney").text().substring(1));
                                }else if(cardDetailsInfo.card_type ==0){
                                    opt.payMoney=Number(massageInfo.massage_price)*Number($("#costNum").text().substring(0,1));
                                }
                            }


                            _this.submitDataFun(opt);
                        });

                    },submitDataFun:function(opt){
                        //提交预约参数,二期的耗卡预约
                        console.log("预约参数",opt);
                        jQuery.ajax({
                            url: request.reserved.reservOrderMassage,
                            type:"post",
                            dataType :"json",
                            data :{
                                open_id       :	    opt.openId,
                                app_id        :     opt.appId,
                                shop_id       :	    opt.shopId,                    //预约的店铺
                                is_other_shop : 	opt.isOtherShop,                  //是否异店耗卡
                                other_shop_id :  	opt.otherShopId,                  //本店
                                custom_id     :	    opt.customId,      		    //非异店则是本店顾客，异店则是异店顾客
                                card_id       :	    opt.cardId,                  //非异店则是本店卡，异店则是异店卡
                                staff_id      :     opt.StaffId,                //预约店铺的店员工
                                card_id    :        opt.cardId,               //非异店则是本店产品，异店则是异店产品
                                num           :     opt.num,
                                yuyue_time    :     opt.reservedTiem,             //预约时间
                                order_way     :     opt.orderWay,                                    //支付方式  -1
                                isPreferential :    opt.isPreferential,         //是否是赠送：0不是 1是
                                 
                                parent_id     :    opt.massageTypeId  || 0,  //非异店则是本店护理。  异店 则是 异店护理 （ 进来时候    类 护理ID) 非类里的 传 null 或者0
                                massage_id    :     opt.massageId,
                                user_mobile 	:   opt.phoneNum,
                                user_name		:	opt.customName,

                                order_money		:	opt.orderMoney,
                                pay_money		:	opt.payMoney,
                                activity_id		: 	0 ,
                            },
                            success :function(data){
                                if(data.status == 200 ){
                                    //console.log("预约护理",data);
                                    layer.open({
                                        content:"<div class='cardtishi_main'>"+
                                        "<div class='fixblackbg'></div>"+
                                        "<div class='cardtishi_w542 poi1'>"+
                                        "<div class='yycomp_op'>"+
                                        "<p class='a2'><img src=' "+ urlData.webRoot+"/resources/images/meirong/shop/yuyue_comp.gif ' width='65' height='65' ><span class='jiji'>预约成功</span></p></div></div></div>"

                                    });

                                    //点击3S后，自动跳转至 消费记录 列表界面
                                    setTimeout(function(){
                                        window.location.href = urlData.webRoot + "/agent/manager-user-catalog-wx_user_order_list?userId="+ userId +"&appId=" + appId + "&openId=" + openId +"&accessToken="+accessToken;
                                    },2000);


                                }else{
                                    //	console.log(data.errorMessage);
                                    if(cardType == 0){
                                        layer.open({
                                            content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;line-height:150px;padding:0px;text-align:center;font-size:28px;' >"+ data.errorMessage +"</span>"
                                        });
                                    }else if(cardType == 1){
                                        layer.open({
                                            content:"<span style='backgroud-color:#fff;color:#000;width:350px;height:150px;line-height:150px;padding:0px;text-align:center;font-size:28px;' >"+  data.errorMessage +"</span>"
                                        });
                                    }else{
                                    	alert(data.errorMessage);
                                    }

                                }
                            },
                            error : function(data){
                                console.log("调用预约护理接口失败",data);
                                //layer.msg(data);
                            }


                        });
                    }
                };
                fromCardMassageApp.init();
            });
        },rendDataFromItem:function(massageInfo){
            var _this = this;
            var userData = globalUtil.getUserData(shopId, userId,openId);
            if(userData){
                var userDataDecode = globalUtil.b64ToUtf8(userData, "utf8");
                var	userDataInfo=JSON.parse(userDataDecode);

                phoneNumber = userDataInfo.cell_phone || "";
                customName = userDataInfo.user_name;

                if(phoneNumber){
                    var m = phoneNumber.substring(3, phoneNumber.length-4).replace(/./g, "*");
                    var bindedPhone = phoneNumber.substr(0,3) + m + phoneNumber.substr(phoneNumber.length-4)
                }
            }


            //渲染从服务项目来的护理
            laytpl(jQuery("#reserveMassageTemp").html()).render({
                content: massageInfo,
                sortSupportCard: sortedCard,
                activityId: activityId,
                bindedPhone :bindedPhone,
                price: discountedMoney,
                discountedMoney: discountedMoney
            },function(html){
                jQuery("#reserveView").empty();
                jQuery("#reserveView").html(html);

                //时间 店铺员工插件
                _this.chooseTime();
                _this.getStaffList(shopId);

                //未绑定用户，跳转页面填写手机号
                _this.getCustomPhone();

                //支付方式
                var orderWay;
                var costCardInfo={};

                var originalPrice;
                if( activityId >0){
                    originalPrice=discountedMoney;
                }else{
                    originalPrice = massageInfo.massage_price;
                }

                //顾客 是否选择了卡 0 未选择
                var selectCardFlag =0;
                var fromItemMassageApp={
                    //从服务项目过来的产品预约
                    init:function(){
                        //初始化
                        if( jQuery(".selectBtn").length>0){
                            var initCostCard=jQuery(".selectBtn");
                            initCostCard.eq(0).find("i").addClass("icon-yhzifu_activ");
                            costCardInfo.totalNum = initCostCard.attr("data-total-num");
                            costCardInfo.cardMoney =initCostCard.attr("data-card-money");
                            costCardInfo.ispre     =initCostCard.attr("data-is-pre");
                            costCardInfo.cardType = initCostCard.attr("data-card-type");
                            costCardInfo.typeId =   initCostCard.attr("data-type-id");
                            costCardInfo.cardId  =  initCostCard.attr("data-card-id");
                            costCardInfo.discount = jQuery(this).attr("data-item-discount");
                            orderWay=-1;
                        }else{
                            jQuery("li[data-order-way]").eq(0).find("i").addClass("icon-yhzifu_activ");
                            orderWay=jQuery("li[data-order-way]").eq(0).attr("data-order-way");
                        }

                        //页面初始加载时 选择渲染那个 刷新函数
                        if(jQuery("ul.wx_card_useup").length>0){
                            this.refreshCoatDom(originalPrice,1);
                            this.addCostNumBtn();
                            this.subCostNumBtn();
                            this.selectCardItem();
                            this._endFun();

                        }else{
                            this.WXrefreshCoatDom(originalPrice,1);
                            this.addCostNumBtn();
                            this.subCostNumBtn();
                            this._endFun();
                        }

                        console.log("初始化耗卡参数",costCardInfo);
                        console.log("初始化支付方式",orderWay);
                    },submitPhoneNum :function(){
                        //完成电话姓名录入
                        location.href=webRoot + "/agent/meirong-reserve-getCustomerInfo?shopId="+shopId+"&openId="+ openId +"&itemId="+itemId+"&itemType="+itemType+"&cardType="+cardType;
                    },operateAccessCardDomLis: function(sortedCard,nowNumber,dispalyedCardDomLis){
                        //操作可用卡列表 显示或者隐藏
                        var cardList =[];
                        console.log("dispalyedCardDomLis",dispalyedCardDomLis)
                        for(var k=0;k<dispalyedCardDomLis.length;k++){
                            cardList.push(dispalyedCardDomLis.eq(k).attr("data-card-id"));
                        }
                        console.log("cardList",cardList);
                        var timesadd=0;
                        var timessub=0;
                        for(var i = 0;i<sortedCard.length;i++){
                            var cardItem = sortedCard[i];
                            console.log("sortedCardID",cardItem.card_id);
                            for(var attr in cardItem){
                                if(attr=="num"){
                                    var maxNum =cardItem[attr];
                                    if(nowNumber>maxNum  ){
                                        var hiddenCardId = cardItem["card_id"];

                                        for(var j=0;j<dispalyedCardDomLis.length;j++){
                                            if(dispalyedCardDomLis.length>=1){
                                                if( hiddenCardId == (dispalyedCardDomLis.eq(j).attr("data-card-id")) ){
                                                    dispalyedCardDomLis.eq(j).addClass("hidden");
                                                    timesadd++;
                                                    //dispalyedCardDomLis.eq(0).find("i").addClass("icon-yhzifu_activ");
                                                    for(var t=0 ;t<jQuery(".wx_card_useup").length;t++){
                                                        var itemUl= jQuery(".wx_card_useup").eq(t);

                                                        if(timesadd==jQuery(".wx_card_useup").length){
                                                            if(selectCardFlag==0){
                                                                jQuery(".wx_yhzifu").eq(1).find("i").addClass("icon-yhzifu_activ");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }else{
                                        var displayCardId = cardItem["card_id"];
                                        for(var j=0;j<dispalyedCardDomLis.length;j++){
                                            if( displayCardId == (dispalyedCardDomLis.eq(j).attr("data-card-id")) ){
                                                dispalyedCardDomLis.eq(j).removeClass("hidden");
                                                timessub++;
                                                //dispalyedCardDomLis.eq(0).find("i").addClass("icon-yhzifu_activ");
                                                for(var t=0 ;t<jQuery(".wx_card_useup").length;t++){
                                                    var itemUl= jQuery(".wx_card_useup").eq(t);

                                                    if(timessub>=1){
                                                        if(selectCardFlag==0){
                                                            jQuery(".wx_yhzifu").eq(1).find("i").removeClass("icon-yhzifu_activ");
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                    }

                                }
                            }
                        }

                        //如果选择了卡 则不初始化第一个卡 否则 选择用户选择的卡  0 表示用户未手动选择卡
                        if(selectCardFlag==0 ){
                            if(jQuery("ul.wx_card_useup").length>0){
                                jQuery("ul.wx_card_useup").each(function(){
                                    jQuery(this).children("li").eq(1).find("i").removeClass("icon-yhzifu_activ");
                                });
                                jQuery("ul.wx_card_useup:not('.hidden')").eq(0).children("li").eq(1).find("i").addClass("icon-yhzifu_activ");
                            }
                        }else if(selectCardFlag==1){
                            if(jQuery("ul.wx_card_useup").length>0){
                                var hasSelect=0;

                                //检测是否选择了非卡类的支付
                                jQuery("li.wx_yhzifu").each(function(){
                                    if(jQuery(this).find("i").hasClass("icon-yhzifu_activ")){
                                        hasSelect=1;
                                    }
                                });
                                //检测是否选择了卡类支付
                                jQuery("ul.wx_card_useup:not('.hidden')").each(function(){
                                    if( jQuery(this).children("li").eq(1).find("i").hasClass("icon-yhzifu_activ")){
                                        hasSelect=1;
                                        return;
                                    }
                                });
                                if(hasSelect==0){
                                    jQuery("ul.wx_card_useup:not('.hidden')").eq(0).children("li").eq(1).find("i").addClass("icon-yhzifu_activ");
                                }
                            }
                        }

                    },addCostNumBtn :function(){
                        var _this= this;
                        //预约数量按钮  加  ,同时，更新urlData中的initNum
                        var i;
                        jQuery("body").delegate("#addNumBtn","click",function(e){
                            var dispalyedCardDomLis = jQuery("ul.wx_card_useup");
                            var subNumBtnChild = jQuery("#subNumBtn").children("i");
                            var nowNumber = Number(jQuery("#reservNums").text());
                            if(i == 0 ){
                                i=1;
                                nowNumber  += 1;
                                jQuery("#reservNums").text(nowNumber);
                                //修改加减按钮的样式
                                _this.changeSubBtnStyle(nowNumber,subNumBtnChild);
                                _this.operateAccessCardDomLis(sortedCard,nowNumber,dispalyedCardDomLis);

                                //刷新花费的DOM节点
                                //	var originalPrice =Number(jQuery("#orderMoney").text());
                                _this.refreshCoatDom(originalPrice,initNum);

                            }else{

                                nowNumber  += 1;
                                jQuery("#reservNums").text(nowNumber);
                                //修改减按钮的样式
                                _this.changeSubBtnStyle(nowNumber,subNumBtnChild);
                                _this.operateAccessCardDomLis(sortedCard,nowNumber,dispalyedCardDomLis);
                                //刷新花费的DOM节点
                                _this.refreshCoatDom(originalPrice,nowNumber);
                            }
                        });

                    },subCostNumBtn : function(){
                        var _this = this;
                        //预约数量按钮  减
                        //根据预约数量 显示 减按钮样式,
                        var j =0;
                        jQuery("body").delegate("#subNumBtn","click",function(e){
                            var nowNumber = Number(jQuery("#reservNums").text());

                            var dispalyedCardDomLis = jQuery("ul.wx_card_useup");
                            var subNumBtnChild = jQuery("#subNumBtn").children("i");

                            if(j == 0 ){
                                j=1;

                                if(nowNumber<=1 ){
                                    return;
                                }
                                nowNumber  -= 1;
                                //修改加减按钮的样式
                                _this.changeSubBtnStyle(nowNumber,subNumBtnChild);
                                _this.operateAccessCardDomLis(sortedCard,nowNumber,dispalyedCardDomLis);
                                //刷新花费的DOM节点
                                _this.refreshCoatDom(originalPrice,nowNumber);
                            }else{

                                if(nowNumber<=1 ){
                                    return;
                                }
                                nowNumber  -= 1;
                                //修改减按钮的样式
                                _this.changeSubBtnStyle(nowNumber,subNumBtnChild);
                                _this.operateAccessCardDomLis(sortedCard,nowNumber,dispalyedCardDomLis);
                                //刷新花费的DOM节点
                                _this.refreshCoatDom(originalPrice,nowNumber);
                            }
                        });
                    },selectCardItem:function(){
                        //用户选择耗卡
                        var _this = this;
                        //产品
                        jQuery(".selectBtn").click(function(){
                            originalPrice = massageInfo.massage_price;
                            selectCardFlag=1;
                            jQuery(this).find("i").addClass("icon-yhzifu_activ");
                            jQuery(this).parent().parent().siblings().find("i").removeClass("icon-yhzifu_activ");
                            jQuery("li[data-order-way]").eq(0).find("i").removeClass("icon-yhzifu_activ");
                            jQuery("li[data-order-way]").eq(1).find("i").removeClass("icon-yhzifu_activ");

                            costCardInfo.totalNum = jQuery(this).attr("data-total-num");
                            costCardInfo.cardMoney =jQuery(this).attr("data-card-money");
                            costCardInfo.ispre     =jQuery(this).attr("data-is-pre");
                            costCardInfo.cardType = jQuery(this).attr("data-card-type");
                            costCardInfo.typeId =   jQuery(this).attr("data-type-id");
                            costCardInfo.cardId  =  jQuery(this).attr("data-card-id");
                            costCardInfo.discount = jQuery(this).attr("data-item-discount");

                            orderWay=-1;
                            console.log("耗卡参数",costCardInfo);

                            //显示隐藏的
                            /*	jQuery(".wx_card_useup").each(function(){
                             if( jQuery(this).hasClass("hidden") ){
                             jQuery(this).removeClass("hidden");
                             }

                             });*/

                            /*_this.refreshCostOfSelectCard(originalPrice,1,costCardInfo.cardType,costCardInfo.discount);*/

                            //修改为 切换支付卡项后，预约数量不变
                            _this.refreshCostOfSelectCard(originalPrice,$("#reservNums").text(),costCardInfo.cardType,costCardInfo.discount);

                        });

                    },changeSubBtnStyle:function(num,$obj){
                        //修改样式
                        if(num>=2){
                            if( $obj.hasClass("icon-yyifminus_a") ){
                                $obj.removeClass("icon-yyifminus_a");
                            }
                        }else{
                            if( !$obj.hasClass("icon-yyifminus_a")){
                                $obj.addClass("icon-yyifminus_a");
                            }
                        }
                    },refreshCoatDom: function(originalPrice,initNum){
                        //刷新显示个个数Number
                        jQuery("#reservNums").text(initNum);
                        var flag=0;
                        orderWay=-1;
                        for(var k=0;k<jQuery("ul.wx_card_useup").length;k++){
                            if( jQuery("ul.wx_card_useup").eq(k).find("i").hasClass("icon-yhzifu_activ") ){
                                flag=1;
                            }
                        }
                        //产品
                        //刷新显示的总记话费金额
                        if(jQuery("ul.wx_card_useup").length>0 &&  flag==1){
                            jQuery("#orderMoney").attr("data-order-money",(parseInt(initNum)*originalPrice).toFixed(2));
                            var discount = (Number(jQuery("ul.wx_card_useup").eq(0).find("a").attr("data-item-discount")))/10;

                            jQuery("#orderMoney").text("¥"+(parseInt(initNum)*originalPrice*discount).toFixed(2));
                        }else{
                            jQuery("#orderMoney").text("¥"+(parseInt(initNum)*originalPrice).toFixed(2));
                            jQuery("#orderMoney").attr("data-order-money",(parseInt(initNum)*originalPrice).toFixed(2));
                        }


                    },WXrefreshCoatDom :function(originalPrice,num){
                        //刷新显示个个数Number
                        jQuery("#reservNums").text(num);
                        //刷新显示的总记话费金额
                        jQuery("#orderMoney").text("¥"+(parseInt(num)*originalPrice).toFixed(2));
                        jQuery("#orderMoney").attr("data-order-money",(parseInt(num)*originalPrice).toFixed(2));

                    },refreshCostOfSelectCard:function(Price,num,cardType,discount){
                        jQuery("#reservNums").text(num);

                        if(cardType==0){
                            jQuery("p#orderMoney").attr("data-order-money",Number(Price)*num);
                            jQuery("#orderMoney").text("¥"+(Number(Price)*num).toFixed(2));
                        }else if(cardType==1) {
                            jQuery("p#orderMoney").attr("data-order-money",Number(Price)*num);
                            jQuery("#orderMoney").text("¥"+((discount/10)*Number(Price)*num).toFixed(2));
                            //originalPrice=(discount/10)*Number(Price);
                        }

                    },collectSubmitData:function(){
                        //收集用于预约的参数
                        var _this=this;
                        jQuery("#makeOrderBtn").click(function(){
                            if(activityId == 0){
                                if( bindedPhone=="" || clickFlag==0){
                                    return
                                }
                            }else if(activityId>0) {
                                if( bindedPhone=="" || !jQuery("#datetime-picker").val()  || clickFlag==0){ return};
                            }
                          
                            //按钮效果
                            jQuery("#makeOrderBtn").css({"box-shadow":"0px 10px 14px #888888"});
                            setTimeout(function(){
                            	jQuery("#makeOrderBtn").css({"box-shadow":""});
                            },100);

                            //支付方式
                            if(activityId>0){
                                orderWay=6
                            }else{

                                //获取支付方式
                                //检测是否选择了非卡类的支付
                                jQuery("li.wx_yhzifu").each(function(){
                                    if(jQuery(this).find("i").hasClass("icon-yhzifu_activ")){
                                        orderWay=jQuery(this).attr("data-order-way");
                                    }
                                });
                                //检测是否选择了卡类支付
                                if(jQuery("ul.wx_card_useup").length>0){

                                    jQuery("ul.wx_card_useup:not('.hidden')").each(function(){
                                        if( jQuery(this).children("li").eq(1).find("i").hasClass("icon-yhzifu_activ")){
                                            orderWay=-1;
                                        }
                                    });
                                }


                            }

                            var opt={};
                            opt.itemType="massage";
                            opt.appId=globalVar.appId;
                            opt.openId =globalVar.openId;
                            opt.shopId  = shopId;
                            opt.massageId = itemId;
                            opt.staffId = jQuery("#picker").attr("data-staff-id") || 0;;

                            opt.yuyueTime =jQuery("#datetime-picker").val() || "";
                            opt.orderWay =orderWay;

                            if(orderWay==-1){
                                if(jQuery("ul.wx_card_useup").length>0){
                                    jQuery("ul.wx_card_useup").each(function(){
                                        var iDom =jQuery(this).children("li").eq(1).find("i");
                                        if(iDom.hasClass("icon-yhzifu_activ")){
                                            var dataDom =iDom.parent("a");
                                            opt.cardId = dataDom.attr("data-card-id");
                                            opt.isPre =  (dataDom.attr("data-is-pre")=="undefined")?  "" : dataDom.attr("data-is-pre");
                                            opt.parentId= dataDom.attr("data-type-id");
                                            opt.cardType =  dataDom.attr("data-card-type");
                                            return;
                                        }

                                    });

                                }
                            }
                            if(orderWay==6){
                                opt.cardId=0;
                            }
                            opt.num =Number(jQuery("#reservNums").text());
                            if(activityId){
                                opt.orderPre =0;
                            }else{
                                opt.orderPre =1;
                            }

                            if(activityId == 0){
                                opt.activityId  = "";
                            }else{
                                opt.activityId  = activityId;
                            }

                            opt.contextUrl=GLOBAL.contextPath;

                            opt.orderMoney= jQuery("#orderMoney").attr("data-order-money");
                            opt.payMoney  =jQuery("#orderMoney").text().substring(1);
                            opt.userMobile    =  phoneNumber;
                            opt.userName     =    customName;
                            opt.from = from;

                            console.log("预约参数：",opt);

                            _this.submitData(opt);

                        });

                    },_endFun :function(){
                        var _this = this;
                        //折叠耗卡列表
                        jQuery("#flodBtn").click(function(){
                            jQuery(".wx_card_useup_main").toggle();
                        });

                        jQuery("li[data-order-way]").click(function(){
                            //标记已近选择支付方式
                            selectCardFlag=1;

                            jQuery(this).find("i").addClass("icon-yhzifu_activ");
                            jQuery(this).siblings().find("i").removeClass("icon-yhzifu_activ");
                            orderWay= jQuery(this).attr("data-order-way");
                            console.log("支付方式",orderWay);
                            var num =Number( jQuery("#reservNums").text());
                            _this.WXrefreshCoatDom(originalPrice,Number($("#reservNums").text()))
                        });
                        _this.collectSubmitData();
                    },submitData: function(opt){
                        //微信支付
                        if(opt.orderWay==6){
                        	store.remove("payBackUrl");
                        	store.set('payBackUrl',currentHref);
                            var encoded_url = request.zhifuUrl;
                            encoded_url=encodeURI(encoded_url);

                            //添加返回的ulr
                            //opt.backUrl = window.location.href.toString();
                            /* store.remove("opt");
                             store.set("opt",opt);
                             var state ='';*/

                            opt= JSON.stringify(opt);
                            
                            var state = globalUtil.utf8ToB64(opt, 'utf-8');

                            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+GLOBAL.appIdPay+
                                "&redirect_uri=" +encoded_url+
                                "&response_type=code" +
                                "&scope=snsapi_base&state=" + state+ "#wechat_redirect";

                            return;
                            //其他支付方式
                        }else{

                            jQuery.ajax({
                                url: request.reserved.reservOrderMassage,
                                type:"post",
                                async: false,
                                data:{
                                    app_id			: 	opt.appId,
                                    open_id			:	opt.openId,
                                    shop_id			:	opt.shopId,
                                    is_other_shop	: 	0,
                                    other_shop_id	: 	opt.otherShopId,
                                    //	custom_id		:	opt.customUserId ,
                                    card_id			: 	opt.cardId,
                                    staff_id	: 		opt.staffId,
                                    parent_id	: 	    opt.parentId,
                                    massage_id      :   opt.massageId,
                                    num				:	opt.num,
                                    yuyue_time		:	opt.yuyueTime,
                                    order_way		:   opt.orderWay,
                                    isPreferential	:	opt.isPre,
                                    order_money		:	opt.orderMoney,
                                    pay_money		:	opt.payMoney,
                                    activity_id		: 	opt.activityId ,
                                    //	custom_user_id	:	opt.customUserId,
                                    user_mobile		:	opt.userMobile,
                                    user_name		: 	opt.userName
                                },
                                dataType:"json",
                                success: function(data){
                                    if(200 == data.status && data.content){
                                        var decodeContent     = globalUtil.b64ToUtf8(data.content, "utf8");
                                        contentJSONData   = JSON.parse(decodeContent);

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
                    }
                }
                fromItemMassageApp.init();
            });
        },endFun:function(){
            jQuery("#changeNum span").on("click",function(){
                var index=jQuery(this).attr("data-index");
                var num=jQuery(this).parent().find("span").eq(1).text();
                if(index>0){
                    num++;
                }else{
                    num--;
                }
                if(num<2){
                    num=1;
                }
                jQuery("#orderMoney").text('¥'+Number(discountedMoney*num).toFixed(2));
                jQuery(this).parent().find("span").eq(1).text(num);
            });

            var _this=this;
            jQuery("#makeOrderBtn").on("click",function(){
                _this.submitDataFun(opt);
            });
        },submitDataFun:function(opt){
            if(opt.orderWay==6){
                //alert("zhifuTestUrl"+zhifuTestUrl);
                //微信支付 跳转支付页面
                var encoded_url = request.zhifuTestUrl;
                encoded_url=encodeURI(encoded_url);
                opt= JSON.stringify(opt);
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +GLOBAL.appIdPay+
                    "&redirect_uri=" +encoded_url+
                    "&response_type=code" +
                    "&scope=snsapi_base" + state+ "#wechat_redirect";
                return;
            }else{
                //其他支付方式
                jQuery.ajax({
                    url: request.reserved.reservOrderMassage,
                    type:"post",
                    async: false,
                    data:{
                        app_id			: 	opt.appId,
                        open_id			:	opt.openId,
                        shop_id			:	opt.shopId,
                        is_other_shop	: 	0,
                        other_shop_id	: 	opt.otherShopId,
                        //	custom_id		:	opt.customUserId ,
                        card_id			: 	opt.cardId,
                        staff_id	: 		opt.staffId,
                        parent_id	: 	    opt.parentId,
                        massage_id      :   opt.massageId,
                        num				:	opt.num,
                        yuyue_time		:	opt.yuyueTime,
                        order_way		:   opt.orderWay,
                        isPreferential	:	opt.isPre,
                        order_money		:	opt.orderMoney,
                        pay_money		:	opt.payMoney,
                        activity_id		: 	opt.activityId ,
                        //	custom_user_id	:	opt.customUserId,
                        user_mobile		:	opt.userMobile,
                        user_name		: 	opt.userName
                    },
                    dataType:"json",
                    success: function(data){
                        if(200 == data.status && data.content){
                            var decodeContent     = globalUtil.b64ToUtf8(data.content, "utf8");
                            contentJSONData   = JSON.parse(decodeContent);

                            if(contentJSONData){
                                store.remove("order_success_data");
                                store.set("order_success_data",contentJSONData);

                                location.href= webRoot + "/agent/meirong-paysuccess-pay_success?shopId="+ shopId +"&activityId="+activityId+"&from="+from;

                            }
                        }else {
                            alert(data.errorMessage);
                        }
                    },error:function(e){
                        alert(e);
                    }
                });

            }
        }
    };
    massageReserve.init();

    function bindDateInput(minDate,maxDate,id,callback){
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = { preset : 'datetime', minDate: minDate, maxDate:maxDate, stepMinute:1};
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