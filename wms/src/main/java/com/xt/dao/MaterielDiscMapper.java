package com.xt.dao;

import com.xt.vo.MaterielDisc;

public interface MaterielDiscMapper {
    int deleteByPrimaryKey(String upn);

    int insert(MaterielDisc record);

    int insertSelective(MaterielDisc record);

    MaterielDisc selectByPrimaryKey(String upn);

    int updateByPrimaryKeySelective(MaterielDisc record);

    int updateByPrimaryKey(MaterielDisc record);
}