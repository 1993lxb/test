package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.SelectProvider;

import com.xt.utils.RoleDynamicSql;
import com.xt.utils.UserDynamicSql;
import com.xt.vo.Param;
import com.xt.vo.Role;

public interface RoleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
    
    
    
    //查询所有角色
    @SelectProvider(method="findRoleByParam",type=RoleDynamicSql.class)
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="delete_state",property="deleteState"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="email",property="email"),
    		@Result(column="login_pwd",property="loginPwd"),
    		@Result(column="notes",property="notes"),
    		@Result(column="role_name",property="roleName")
    })
    List<Role> findRole(Param param,String roleName);
    
    //查询表中总条数
    @SelectProvider(method="getTotalRows",type=RoleDynamicSql.class)
    public Integer getTotalRows(Param param);
    
    
    
    //增加角色
    public int insertRole(Role role);
    
  //删除即修改删除状态
    int updateDelState(Long id);
}