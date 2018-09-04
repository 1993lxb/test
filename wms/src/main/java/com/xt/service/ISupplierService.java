package com.xt.service;

import java.util.List;

import com.xt.vo.Param;
import com.xt.vo.Supplier;

public interface ISupplierService {

	public List<Supplier> findAllSupplier(Param param,String name,String address);
	
	public Integer getTotalRows(Param param);
	
	public void insertSupplier(Supplier s);
	
	public Integer delSupplier(Long id);
	
	public void updateSupplier(Supplier s);
	
	public Supplier findSupplierById(long id);
}
