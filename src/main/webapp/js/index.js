var currentDateEnd;
var monthDate;
var currentDateStart;
var subcurrentDateEnd;//截取最后日期
var subcurrentDateStart;//截取开始日期
var subSum;
$(function () {


    $("#riqitwo,#z").hide();

    $("#sure").click(function () {
        alert("提交成功！");
    });

    //按天
    $("#daymeal").click(function () {
        riqi.onclick = function() {
            fPopCalendar(event,this,this);
        };
        $("#riqitwo,#z").hide();
        riqi.value = getNowFormatDate();
        $("#datetime").html(riqi.value);
        $("#tableFor").find("tr").remove();
        riqitwo.value="";
        tbday();

    });
    //按周
    $("#weekmeal").click(function () {
        riqi.onclick = function() {
            fPopCalendar(event,this,this);
        };
        riqitwo.onclick = function() {
            fPopCalendar(event,this,this);
        };
        $("#riqitwo,#z").show();
        $("#tableFor").find("tr").remove();
        riqitwo.value="";
        riqi.value=getNowFormatDate();
        currentDateEnd = riqitwo.value = getLastSevenDays(riqi.value);
        subcurrentDateStart = currentDateStart.substring(8, 10);
        subcurrentDateEnd = currentDateEnd.substring(8, 10);
        subSum = subcurrentDateEnd - subcurrentDateStart + 1;
        if (subSum < 0) {
            subSum = 7;
        }

        tb();
    });
    //按月
    $("#monthmeal").click(function () {
        $("#riqi,#riqitwo").prop("onclick",null);//使用jq的方法移除点击事件
        $("#riqitwo,#z").show();
        $("#tableFor").find("tr").remove();

        riqitwo.value="";
        riqitwo.value = monthDate;
        subcurrentDateStart = currentDateStart.substring(8, 10);
        subcurrentDateEnd = monthDate.substring(8, 10);
        subSum = subcurrentDateEnd - subcurrentDateStart + 1;
        tb();
    });
//默认加载当天日期yymmdd
    currentDateStart = riqi.value = getNowFormatDate();
    $("#datetime").val(riqi.value);

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

    //获取当前日期至7天
    function getLastSevenDays(date) {
        var date = date || new Date(), timestamp, newDate;
        if (!(date instanceof Date)) {
            date = new Date(date.replace(/-/g, '/'));
        }
        timestamp = date.getTime();
        newDate = new Date(timestamp + 6 * 24 * 3600 * 1000);
        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        currentDateEnd = [newDate.getFullYear(), month, day].join('-');
        return [newDate.getFullYear(), month, day].join('-');
    }

    // 获取当前日期至月尾
    var oneDayLong = 24 * 60 * 60 * 1000;
    //每天的总毫秒书
    var now = new Date();
    //当前时间
    var sign1 = "-";
    var sign2 = ":";
    var year = now.getFullYear();
    //当前年份
    var monthStartDate = new Date(year, now.getMonth() + 1, 1);
    //当前月1号
    var nextMonthStartDate = new Date(year, now.getMonth() + 2, 1);
    //下个月1号
    var days = (nextMonthStartDate.getTime() - monthStartDate.getTime()) / oneDayLong;
    //计算当前月份的天数
    var monthEndDate = new Date(year, now.getMonth() + 1, days);
    var monthRange = [monthStartDate, monthEndDate];

    monthDate = monthRange[1].getFullYear() + '-' + (monthRange[1].getMonth() < 10 ? "0" + monthRange[1].getMonth() : monthRange[1].getMonth()) + '-' + (monthRange[1].getDate() < 10 ? "0" + monthRange[1].getDate() : monthRange[1].getDate());
    //end
    //根据时间段来选择订餐
    //console.log($("#zaocan").prop("checked"))  //打印出false

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
        url: "/api/meal/order",
        data: strify,
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data == 1) {
                alert("提交成功！");
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
function tb() {
   /* $("#tableFor").append("<tr>\n" +
        "<th>日期</th>\n" +
        "<th>早餐</th>\n" +
        "<th>中餐</th>\n" +
        "<th>晚餐</th>\n" +
        "<th>宵夜</th>\n" +
        "</tr>");*/
    //alert(subSum);
    for(var i=0;i < subSum;i++) {
        var date;

        date = new Date(currentDateStart.replace(/-/g, '/'));
        var timestamp = date.getTime();
        newDate = new Date(timestamp + i* 24 * 3600 * 1000);

        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        current=[newDate.getFullYear(), month, day].join('-');

        $("#tableFor").append("<tr><td width=\"25%\"><input  class=\"inp\"  readonly=\"readonly\" id=\"datetime\" value="+ current+"></td>"+
            /* "<td><input type=\"checkbox\" name=\"can\" value="+1+"></td>"+
             "<td><input type=\"checkbox\" name=\"can\" value="+2+"></td>"+
             "<td><input type=\"checkbox\" name=\"can\" value="+3+"></td>"+
             "<td><input type=\"checkbox\" name=\"can\" value="+4+"></td>"+*/
             "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+parseInt(1+i*4)+"></td>"+
             "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+parseInt(2+i*4)+"></td>"+
             "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+parseInt(3+i*4)+"></td>"+
             "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+parseInt(4+i*4)+"></td>"+
            "</tr>");

    }


}
function tbday() {

    for(var i=0;i < 1;i++) {
        var date;

        date = new Date(currentDateStart.replace(/-/g, '/'));
        var timestamp = date.getTime();
        newDate = new Date(timestamp + i* 24 * 3600 * 1000);

        var month = newDate.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month;
        var day = newDate.getDate().toString().length == 1 ? '0' + newDate.getDate() : newDate.getDate();
        current=[newDate.getFullYear(), month, day].join('-');

        $("#tableFor").append("<tr><td width=\"25%\"><input  class=\"inp\"  readonly=\"readonly\" id=\"datetime\" value="+ current+"></td>"+
            "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+1+"></td>"+
            "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+2+"></td>"+
            "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+3+"></td>"+
            "<td width=\"15%\"><input type=\"checkbox\" name=\"can\" value="+4+"></td>"+
            "</tr>");
    }


}

