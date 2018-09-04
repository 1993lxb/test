package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.xt.dao.UserMapper;
import com.xt.vo.Param;
import com.xt.vo.User;

@Service("userService")
public class UserSericeImp implements IUserService{
	
	@Autowired
	private UserMapper userDao;
    
	
	//@Cacheable(value = "xtkj", key = "'UserSericeImp_findUser'")
	public User findUser(String loginId) {
		return userDao.selectByLoginId(loginId);
	}


	@Override
	public List<User> findUser(Param param,String realName,Long factoryId) {
		return userDao.findUser(param,realName,factoryId);
	}


	@Override
	public Integer getTotalRows(Param param) {
		// TODO Auto-generated method stub
		return userDao.getTotalRows(param);
	}


	@Override
	public User findUserByNameAndFactoryId(User user) {
		return userDao.findUserByNameAndFactoryId(user);
	}


	@Override
	public int insertUser(User user) {
		return userDao.insertUser(user);
	}


	@Override
	public User selectByPrimaryKey(Long id) {
		return userDao.selectByPrimaryKey(id);
	}


	@Override
	public int updateByPrimaryKeySelective(User record) {
		// TODO Auto-generated method stub
		return userDao.updateByPrimaryKeySelective(record);
	}


	@Override
	public int updateDelState(Long id) {
		// TODO Auto-generated method stub
		return userDao.updateDelState(id);
	}




	
	

}
