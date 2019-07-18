package com.hnjca.wechat.controller;


import net.sf.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Description:
 * User: YangYong
 * Date: 2019-04-23
 * Time: 14:33
 * Modified:
 */
public class Test {
    public static void main(String[] args) throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        long to = df.parse("2019-7-16").getTime();
        long from = df.parse("2019-8-02").getTime();
        System.out.println((from - to) / (1000 * 60 * 60 * 24));

    }
}







    

