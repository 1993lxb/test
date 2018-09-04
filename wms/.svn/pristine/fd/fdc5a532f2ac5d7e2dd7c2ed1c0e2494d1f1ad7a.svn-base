package com.xt.dao;

import java.util.List;

import com.xt.vo.Menu;

public interface MenuMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(Long id);
    
    List<Menu> findMenuByUserId(Long userId);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);
    
    
    
    List<Menu> findMenu();
    
    
    List<Menu> findMenuByName(String name);
    
    
    
    
    List<Menu> findMenuByParentId();
    
    public void  insertMenu(Menu record);
    //删除即修改删除状态
    public void updateMenuState(Menu record);
    
    
    
    
    List<Menu> findAllMenu();
    List<Menu> findMenuByRoleId(Long roleId);
    
}