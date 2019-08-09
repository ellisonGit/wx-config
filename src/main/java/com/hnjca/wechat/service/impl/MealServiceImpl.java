package com.hnjca.wechat.service.impl;

import com.hnjca.wechat.dao.MealDao;
import com.hnjca.wechat.dao.TestDao;
import com.hnjca.wechat.pojo.Meal;
import com.hnjca.wechat.pojo.YYTest;
import com.hnjca.wechat.service.MealService;
import com.hnjca.wechat.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Description:
 * User: Ellison
 * Date: 2019-07-11
 * Time: 10:14
 * Modified:
 */
@Service
public class MealServiceImpl implements MealService {

    @Autowired
    private MealDao mealDao;

    @Override
    public int addMeal(Meal meal) {
        return mealDao.addMeal(meal);
    }

    @Override
    public String selectMeal(String userid) {
        return mealDao.selectMeal(userid);
    }

    @Override
    public String selectValue(String userid) {
        return mealDao.selectValue(userid);
    }

    @Override
    public int updateMeal(String userid, String value, Date updatetime) {
        return mealDao.updateMeal(userid,value,updatetime);
    }


}
