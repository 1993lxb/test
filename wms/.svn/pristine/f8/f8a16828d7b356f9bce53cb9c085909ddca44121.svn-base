package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.SelectProvider;

import com.xt.utils.SupplierDynamicSql;
import com.xt.utils.UserDynamicSql;
import com.xt.vo.Param;
import com.xt.vo.User;

public interface UserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long id);
    
    User selectByLoginId(String loginId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    
    //查询所有用户
    @SelectProvider(method="findUserByParam",type=UserDynamicSql.class)
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
    		@Result(column="real_name",property="realName"),
    		@Result(column="sex",property="sex"),
    		@Result(column="tel",property="tel"),
    		@Result(column="user_name",property="userName"),
    		@Result(column="factory_id",property="factoryId"),
    		@Result(column="name",property="factoryName"),
    		@Result(column="roleName",property="roleName")
    })
    List<User> findUser(Param param,String realName,Long factoryId);
    
    
    
    //查询表中总条数
    @SelectProvider(method="getTotalRows",type=UserDynamicSql.class)
    public Integer getTotalRows(Param param);
    
    
    
    public User findUserByNameAndFactoryId(User user);
    
    
    //增加用户
    public int insertUser(User user);
    
    
    
    //删除即修改删除状态
    int updateDelState(Long id);
    
    
}