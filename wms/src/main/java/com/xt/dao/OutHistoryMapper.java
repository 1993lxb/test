package com.xt.dao;

import com.xt.vo.OutHistory;

public interface OutHistoryMapper {
    int deleteByPrimaryKey(Long id);

    int insert(OutHistory record);

    int insertSelective(OutHistory record);

    OutHistory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OutHistory record);

    int updateByPrimaryKey(OutHistory record);
}