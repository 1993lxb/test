package com.xt.dao;

import com.xt.vo.MoveHistory;

public interface MoveHistoryMapper {
    int deleteByPrimaryKey(Long id);

    int insert(MoveHistory record);

    int insertSelective(MoveHistory record);

    MoveHistory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(MoveHistory record);

    int updateByPrimaryKey(MoveHistory record);
}