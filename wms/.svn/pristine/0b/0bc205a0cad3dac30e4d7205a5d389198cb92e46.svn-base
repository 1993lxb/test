package com.xt.service;

import java.util.List;

import com.xt.utils.Tree;
import com.xt.vo.Menu;
import com.xt.vo.RoleMenu;
import com.xt.vo.UserRole;

public interface IMenuSerice {

	List<Menu> findMenuByUserId(Long userId);

	List<Menu> findMenu();

	List<Menu> findMenuByName(String name);

	// 查父类
	List<Menu> findMenuByParentId();

	// 增加菜单
	int insertMenu(Menu record, RoleMenu roleMenu);

	// 通过用户Id查出roleId插入userRole赋值
	public UserRole findByUserId(Long id);

	Menu selectByPrimaryKey(Long id);

	int updateByPrimaryKey(Menu record);

	void updateMenuState(Menu record);

	List<Tree> findAllMenu(Long roleId);

}
