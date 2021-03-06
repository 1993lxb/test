package com.xt.service;

import java.util.List;

import com.xt.vo.Param;
import com.xt.vo.Warehouse;

public interface IWarehouseService {
	
	/*public List<Warehouse> findAllWarehouse(Param<Warehouse> obj);
	
	 public Integer getTotalRows(Param<Warehouse> obj);*/
	
	public List<Warehouse> findWarehouseByParam(Param param,String name);
	
	public Integer getTotalRows(Param param,String name);
	
	public int insertWarehouse(Warehouse warehouse);
	
	public int delWarehouse(long id);
	
	 public List<Warehouse> findWarehouse(); 
	 
	 

}
