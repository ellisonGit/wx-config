package com.hnjca.wechat.controller;
import java.math.BigDecimal;


/**
 * Description:
 * User: ellison
 * Date: 2019-05-23
 * Time: 14:33
 * Modified:
 */
public class Test {
    public static void main(String[] args){
        test1();
    }
    public static void test1(){
        //String.valueOf()
        BigDecimal c = new BigDecimal(651000);
        BigDecimal d = new BigDecimal(312);
        BigDecimal num3 = c.divide(d,10,BigDecimal.ROUND_HALF_DOWN);
        System.out.println(num3);
        BigDecimal b = (new BigDecimal(651000).divide(new BigDecimal(312)).setScale(1, BigDecimal.ROUND_HALF_UP));
        System.out.println(b);
    }

}







    

