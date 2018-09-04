package com.xt.dao;

import com.xt.vo.RoleMenu;

public interface RoleMenuMapper {
    int deleteByPrimaryKey(Long id);

    int insert(RoleMenu record);

    int insertSelective(RoleMenu record);

    RoleMenu selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RoleMenu record);

    int updateByPrimaryKey(RoleMenu record);
    //删除
    int deleteRoleMenuByRoleId(Long roleId);
    //增加
    int addRoleMenu(RoleMenu record);
}