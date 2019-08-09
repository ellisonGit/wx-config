package com.hnjca.wechat.controller;


import com.hnjca.wechat.pojo.Meal;
import com.hnjca.wechat.service.MealService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.text.ParseException;
import java.util.*;

/**
 * Description:
 * User: Ellison
 * Date: 2019-07-10
 * Time: 11:30
 * Modified:
 */
@RestController
@RequestMapping(value = "/meal",produces = "application/json;charset=utf-8",method = RequestMethod.POST)
public class mealController {
    @Autowired
    private MealService mealService;

    /**
     * 订餐
     * @param
     * @return
     */
    @GetMapping(value = "/order")
    public String Order(  @RequestBody  String paraData)  {
        JSONArray json = JSONArray.fromObject(paraData);//将字符串转成json数组
        Map<String,String> map = new LinkedHashMap<String, String>();//定义map接收处理的数据
        for (Object object : json) {
            JSONObject jsonObject = (JSONObject) object;
            String riqi = (String)jsonObject.get("riqi");
            String num = String.valueOf(jsonObject.get("value"));
            if (map.containsKey(riqi)) {
                String integer = map.get(riqi);
                map.put(riqi, integer+"-"+num);
            }else{
                map.put(riqi, num);
            }
        }
        String value = map.toString().replaceAll("\\{|\\}", "");
        System.out.println("map"+map);
        String userid="1000001";
        String resutl= mealService.selectMeal(userid);
        if(resutl!=null){
            return "0";
        }
        Meal meal=new Meal();
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        meal.setId(uuid);
        meal.setUserid("1000001");//todo 动态userid
        meal.setName("张三");//todo 动态name
        meal.setCreatime(new Date());
        meal.setValue(value);
        int res= mealService.addMeal(meal);
       if(res>0){
           return "1";
       }
        return "-1";
    }

    /**
     * 查询订单信息
     * @param
     * @return
     */
    @GetMapping(value = "/orderInfo")
    public ArrayList<String> OrderInfo(String userid) throws ParseException {
        ArrayList<String>  strArray = new ArrayList<String>();
       userid="1000001";//todo 动态userid

        String value=mealService.selectValue(userid);
        if(value==null){
            return null;
        }
        String[]  strs=value.split(",");
       // String res = null;

        for(int i=0,len=strs.length;i<len;i++){
            String val=strs[i].toString().trim();
            /*String str1=val.substring(0, val.indexOf("="));//截取@之前的字符串
           // System.out.println(str1);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(str1);
            Date dates= sdf.parse(sdf.format(new Date()));
             if(date.getTime()<dates.getTime()){
                // System.out.println("日期过期： "+str1);
            }else {
                 //System.out.println("输出：" + str1);*/
                 strArray.add(val);
             }
        /*}*/
        System.out.println(strArray.size());
        if(value!=null){
            return strArray;
        }
        return null;
    }

    /**
     * 更新订单信息
     * @param
     * @return
     */
    @GetMapping(value = "/UpdateOrderInfo")
    public String UpdateOrderInfo(  @RequestBody  String paraData)  {
        JSONArray json = JSONArray.fromObject(paraData);
        Map<String,String> map = new LinkedHashMap<String, String>();
        for (Object object : json) {
            JSONObject jsonObject = (JSONObject) object;
            String riqi = (String)jsonObject.get("riqi");
            String num = String.valueOf(jsonObject.get("value"));
            if (map.containsKey(riqi)) {
                String integer = map.get(riqi);
                map.put(riqi, integer+"-"+num);
            }else{
                map.put(riqi, num);
            }
        }
        String value = map.toString().replaceAll("\\{|\\}", "");
        String userid="1000001";//todo 动态userid
        int resutl= mealService.updateMeal( userid,value,new Date());
        if(resutl>0){
            return "1";
        }
        return "-1";
    }
}
