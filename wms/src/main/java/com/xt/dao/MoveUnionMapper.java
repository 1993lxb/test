package com.xt.dao;

import com.xt.vo.MoveUnion;

public interface MoveUnionMapper {
    int deleteByPrimaryKey(Long id);

    int insert(MoveUnion record);

    int insertSelective(MoveUnion record);

    MoveUnion selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(MoveUnion record);

    int updateByPrimaryKey(MoveUnion record);
}