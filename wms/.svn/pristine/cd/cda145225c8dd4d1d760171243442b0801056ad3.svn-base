package com.xt.service;

import java.util.List;

import com.xt.vo.Factory;

public interface IFactorySerice {

	// 查询所有工厂
	public List<Factory> findAllFactory();

	// 通过工厂名称查询工厂，模糊查询
	public List<Factory> findFactoryByName(String name);

	// 通过工厂id查询工厂
	public Factory findFactoryById(long id);

	// 增加工厂
	public void insertFactory(String name, String address, String tel, String notes, Long addUserId);

	// 修改工厂
	public void updateFactory(String name, String address, String tel, String notes, Long addUserId, long factoryId);

	// 删除工厂:修改删除状态
	public void delFactory(Long factoryId);

}
