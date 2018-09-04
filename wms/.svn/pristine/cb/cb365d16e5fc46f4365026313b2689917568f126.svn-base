package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.RoleMapper;
import com.xt.vo.Param;
import com.xt.vo.Role;
@Service("roleService")
public class RoleServiceImp implements IRoleService{
	
	@Autowired
	private RoleMapper roleDao;

	@Override
	public List<Role> findRole(Param param, String roleName) {
		// TODO Auto-generated method stub
		return roleDao.findRole(param, roleName);
	}

	@Override
	public Integer getTotalRows(Param param) {
		// TODO Auto-generated method stub
		return roleDao.getTotalRows(param);
	}

	@Override
	public int insertRole(Role role) {
		// TODO Auto-generated method stub
		return roleDao.insertRole(role);
	}

	@Override
	public Role selectByPrimaryKey(Long id) {
		// TODO Auto-generated method stub
		return roleDao.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Role record) {
		// TODO Auto-generated method stub
		return roleDao.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateDelState(Long id) {
		// TODO Auto-generated method stub
		return roleDao.updateDelState(id);
	}

}
