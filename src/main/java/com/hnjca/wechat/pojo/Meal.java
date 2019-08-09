package com.hnjca.wechat.pojo;

import lombok.Data;

import java.util.Date;

/**
 * Description:
 * User: Ellison
 * Date: 2019-07-10
 * Time: 11:40
 * Modified:
 */
@Data
public class Meal {
    private String id;
    private String userid;
    private String name;
    private String value;
    private Date creatime;
    private Date updatetime;
}
