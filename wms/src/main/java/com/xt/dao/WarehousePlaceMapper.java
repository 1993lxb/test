package com.xt.dao;

import com.xt.vo.WarehousePlace;

public interface WarehousePlaceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(WarehousePlace record);

    int insertSelective(WarehousePlace record);

    WarehousePlace selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(WarehousePlace record);

    int updateByPrimaryKey(WarehousePlace record);
}