package com.hnjca.wechat.dao;

import com.hnjca.wechat.pojo.Meal;
import com.hnjca.wechat.pojo.YYTest;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
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

    int updateMeal(@Param("userid") String userid, @Param("value")String value, @Param("updatetime")Date updatetime);
}
