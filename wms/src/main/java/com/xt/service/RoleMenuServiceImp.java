package com.xt.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xt.dao.RoleMenuMapper;
import com.xt.vo.RoleMenu;
import com.xt.vo.User;
@Service("roleMenuService")
public class RoleMenuServiceImp implements IRoleMenuService {
	@Autowired
	private RoleMenuMapper roleMenuDao;
	

	@Override
	@Transactional
	public void updateRoleMenu(HttpServletRequest request,Long[] ids,Long roleId) {
		// TODO Auto-generated method stub
		roleMenuDao.deleteRoleMenuByRoleId(roleId);
		User u = (User) request.getSession().getAttribute("u");
		RoleMenu record=new RoleMenu();
		record.setAddUserId(u.getId());
		record.setRoleId(roleId);
		for(int i=0;i<ids.length;i++){
			record.setMenuId(ids[i]);
			roleMenuDao.addRoleMenu(record);
		}
		//return roleMenuDao.addRoleMenu(record);
	}

}
