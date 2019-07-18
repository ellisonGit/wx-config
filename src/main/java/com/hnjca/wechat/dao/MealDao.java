package com.hnjca.wechat.dao;

import com.hnjca.wechat.pojo.Meal;
import com.hnjca.wechat.pojo.YYTest;

import java.util.List;
import java.util.Map;

/**
 * Description:
 * User: Ellison
 * Date: 2019-07-11
 * Time: 10:49
 * Modified:
 */
public interface MealDao {

    int addMeal(Meal meal);

    String selectMeal(String userid);

    String selectValue(String userid);

    int updateMeal(String userid,String value);
}
