package com.xt.service;

import java.util.List;

import com.xt.vo.Param;
import com.xt.vo.Role;

public interface IRoleService {
	//查询角色
	List<Role> findRole(Param param,String roleName);
	public Integer getTotalRows(Param param);
	
	
	//增加角色
	 public int insertRole(Role role);
	 
	 
	 Role selectByPrimaryKey(Long id);
	 
	 
	 
	 int updateByPrimaryKeySelective(Role record);
	 
	//删除即修改删除状态
	    int updateDelState(Long id);

}
