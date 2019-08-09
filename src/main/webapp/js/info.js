var sdate;
var edate;
var va = [];
$(function () {
    var dtime;
    var userid = "1000001";
    $.ajax({
        type: "post",
        url: "/api/meal/orderInfo",
        data: userid,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data == null) {
                var strVlue = "暂无数据哦!";
                $("#di").append("<h3 style='text-align: center;padding-top: -50rem;'>" + strVlue + "</h3>");
            } else {
               /* var lovalue = data[0];
                var losub = lovalue.split("=");
                var lo = losub[1].substring(0,1);
                alert("lo:"+lo)
                var loa=lo%4;
                alert("%"+loa);*/
                console.log(data);
                var svl = data[0];//日期
                var ssub = svl.split("=");
                sdate=ssub[0];//获取数组开始日期
                /* alert("riqi:"+sdate);
                 if(loa>1&&sdate>getNowFormatDate){
                     console.log(jianDate(sdate,loa));
                     sdate=jianDate(sdate,loa);
                 }*/

                edate=data[data.length-1];//获取数组最后一个值
                var z=edate.substring(0,10);
                var k= DateMinus(sdate,z)+1;
                console.log("K:"+k);
                for (var i = 0; i < k; i++) {
                   // console.log(data[i]);
                    var value = data[i];
                   if( value!=undefined){
                    var sub = value.split("=");
                    if(i>=1){
                        dtime = sub[0];
                        sdate= addDate(sdate);
                    }
                    //console.log("shuchu:" + sub[1]);
                    var s = sub[1].split("-");
                    //console.log("建号：" + s);
                    var len = sub[1];
                    obj = len.replace(/(.)(?=[^$])/g, "$1,").split(",").toString();//字符加逗号
                    //obj=len.replace(/(\d)(\d{2}(\.|,))/, "$1,$2").split(",").toString();//字符加逗号
                    va = s;
                    //console.log("格式化:" + va);
                   // console.log(sub[1].length);
                    $("#tableFor").append("<tr><td width=\"25%\"><input  class=\"inp\"  readonly=\"readonly\" id=\"datetime\" value=" + sdate + "></td>" +
                        "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(1 + i * 4) + "></td>" +
                        "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(2 + i * 4) + "></td>" +
                        "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(3 + i * 4) + "></td>" +
                        "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(4 + i * 4) + "></td>" +
                        "</tr>");
                    var nowDate=getNowFormatDate();
                  if(sdate<nowDate){
                     $("#tableFor").find("tr td").remove();
                    }
                    /*for (var f = 0; f < va.length; f++) {
                        $("input[Value=" + va[f] + "]").attr("checked", "checked");
                    }*/
                }else {
                       sdate= addDate(sdate);
                       $("#tableFor").append("<tr><td width=\"25%\"><input  class=\"inp\"  readonly=\"readonly\" id=\"datetime\" value=" + sdate + "></td>" +
                           "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(1 + i * 4) + "></td>" +
                           "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(2 + i * 4) + "></td>" +
                           "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(3 + i * 4) + "></td>" +
                           "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value=" + parseInt(4 + i * 4) + "></td>" +
                           "</tr>");
                       var nowDate=getNowFormatDate();
                       if(dtime<nowDate){
                           $("#tableFor").find("tr td").remove();
                       }
                      /* for (var f = 0; f < va.length; f++) {
                           $("input[Value=" + va[f] + "]").attr("checked", "checked");
                       }*/
                   }
                }
                //遍历勾选的复选值
                for (var i = 0; i < k; i++) {
                   // console.log(data[i]);
                    var value = data[i];
                    if( value!=undefined){
                        var sub = value.split("=");
                        if(i>=1){
                            dtime = sub[0];
                            sdate= addDate(sdate);
                        }
                       // console.log("shuchu:" + sub[1]);
                        var s = sub[1].split("-");
                        //console.log("建号：" + s);
                        var len = sub[1];
                        obj = len.replace(/(.)(?=[^$])/g, "$1,").split(",").toString();//字符加逗号
                        //obj=len.replace(/(\d)(\d{2}(\.|,))/, "$1,$2").split(",").toString();//字符加逗号
                        va = s;
                       // console.log("格式化:" + va);
                        //console.log(sub[1].length);
                        for (var f = 0; f < va.length; f++) {
                            $("input[Value=" + va[f] + "]").attr("checked", "checked");
                        }
                    }
                }
            }
        }
    });
});

function jqchk() { //jquery获取复选框值
    var chk_value = [];
    var jffs = [];
    $(' input[name="can"]:checked').each(function () {
        var tr = $(this).closest("tr");
        jffs = $(tr).find("td").eq(0).children().val();
        chk_value.push({riqi: jffs, value: $(this).val()});
    });
    var strify = JSON.stringify(chk_value);
    console.log(strify);
    $.ajax({
        type: "post",
        url: "/api/meal/UpdateOrderInfo",
        data: strify,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data == 1) {
                alert("更新成功！");
            }
            if (data == -1) {
                alert("提交失败！");
            }
            if (data == 0) {
                alert("您已有订餐，请查看订单信息！");
            }
        }
    });
}
//获取今天日期yymmdd
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function DateMinus(date1,date2){//date1:小日期   date2:大日期
    var sdate = new Date(date1);
    var now = new Date(date2);
    var days = now.getTime() - sdate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}

function addDate(time) {
    //加一天
    var timestamp = Date.parse(new Date(time));
    timestamp = timestamp /1000;
    timestamp += 86400;//加一天
    var newTime =new Date(timestamp * 1000).format('yyyy-MM-dd');
    return newTime;
}
Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

//减日期
function jianDate(time,days) {
    //加一天
    var timestamp = Date.parse(new Date(time));
    timestamp = timestamp /1000;
    timestamp -= 86400*days;//减一天
    var newTime =new Date(timestamp * 1000).format('yyyy-MM-dd');
    return newTime;
}


