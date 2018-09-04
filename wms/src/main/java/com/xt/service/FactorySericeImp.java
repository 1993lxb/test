package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.FactoryMapper;
import com.xt.vo.Factory;

@Service("factorySerice")
public class FactorySericeImp implements IFactorySerice{
	
	@Autowired
	private FactoryMapper factory;

	//查询所有工厂
	@Override
	public List<Factory> findAllFactory(){
		return factory.findAllFactory();
	}

	//通过工厂名称查询工厂，模糊查询
	@Override
	public List<Factory> findFactoryByName(String name) {
		return factory.findFactoryByName(name);
	}

	//增加工厂
	@Override
	public void insertFactory(String name, String address, String tel, String notes, Long addUserId) {
		factory.insertFactory(name, address, tel, notes, addUserId);
		
	}

	//删除工厂:修改删除状态
	@Override
	public void delFactory(Long factoryId) {
		factory.delFactory(factoryId);
	}

	//通过工厂id查询工厂
	@Override
	public Factory findFactoryById(long id) {
		return factory.findFactoryById(id);
	}

	// 修改工厂
	@Override
	public void updateFactory(String name, String address, String tel, String notes, Long addUserId, long factoryId) {
		factory.updateFactory(name, address, tel, notes, addUserId, factoryId);
	}

}
