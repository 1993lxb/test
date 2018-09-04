package com.xt.service;

import java.util.List;

import com.xt.vo.Param;
import com.xt.vo.User;

public interface IUserService {
  
	

  public User findUser(String loginId);
   
   
   List<User> findUser(Param param,String realName,Long factoryId);
   
   public Integer getTotalRows(Param param);
   
   
   public User findUserByNameAndFactoryId(User user);
   
   //增加用户
   public int insertUser(User user);
   
   
   User selectByPrimaryKey(Long id);
   
   //修改
   int updateByPrimaryKeySelective(User record);
   
   
   //删除即修改删除状态
   int updateDelState(Long id);

}
