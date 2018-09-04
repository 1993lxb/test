package com.xt.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xt.dao.MenuMapper;
import com.xt.dao.RoleMenuMapper;
import com.xt.dao.UserRoleMapper;
import com.xt.utils.Tree;
import com.xt.vo.Menu;
import com.xt.vo.RoleMenu;
import com.xt.vo.UserRole;

@Service("menuSerice")
public class MenuSericeImp implements IMenuSerice {

	@Autowired
	private MenuMapper menuDao;
	@Autowired
	private RoleMenuMapper roleMenuDao;
	@Autowired
	private UserRoleMapper userRoleDao;

	@Override
	// @Cacheable(value = "xtkj", key = "'MenuSericeImp_findMenuByUserId'")
	public List<Menu> findMenuByUserId(Long userId) {

		return menuDao.findMenuByUserId(userId);
	}

	@Override
	public List<Menu> findMenu() {
		return menuDao.findMenu();
	}

	@Override
	public List<Menu> findMenuByName(String name) {
		return menuDao.findMenuByName(name);
	}

	@Override
	public List<Menu> findMenuByParentId() {
		return menuDao.findMenuByParentId();
	}

	@Override
	@Transactional
	public int insertMenu(Menu record, RoleMenu roleMenu) {
		menuDao.insertMenu(record);
		roleMenu.setMenuId(record.getId());
		// userRoleDao.selectByUserId(id);
		return roleMenuDao.insert(roleMenu);

	}

	@Override
	public UserRole findByUserId(Long id) {
		return userRoleDao.selectByUserId(id);
	}

	public Menu selectByPrimaryKey(Long id) {
		return menuDao.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKey(Menu record) {
		return menuDao.updateByPrimaryKey(record);

	}

	@Override
	public void updateMenuState(Menu record) {
		menuDao.updateMenuState(record);

	}

	@Override
	public List<Tree> findAllMenu(Long roleId) {
		// 所有权限
		List<Menu> menus = menuDao.findAllMenu();
		List<Tree> trees = new ArrayList<>();
		// 角色权限
		List<Menu> menus1 = menuDao.findMenuByRoleId(roleId);
		for (Menu m : menus) {
			trees.add(new Tree(m.getId(), m.getParentId(), m.getMenuName(), false));
		}
		for (Tree t : trees) {
			for (Menu menu : menus1) {
				if (menu.getId() == t.getId()) {
					t.setChecked(true);
				}
			}
		}
		return trees;
	}
}
