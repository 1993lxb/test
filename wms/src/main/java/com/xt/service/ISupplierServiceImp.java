package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.SupplierMapper;
import com.xt.vo.Param;
import com.xt.vo.Supplier;
@Service("supplierService")
public class ISupplierServiceImp implements ISupplierService{

	@Autowired
	private SupplierMapper supplierDao;
	@Override
	public List<Supplier> findAllSupplier(Param param,String name,String address) {
		
		return supplierDao.findAllSupplier(param,name,address);
	}

	@Override
	public Integer getTotalRows(Param param) {
		
		return supplierDao.getTotalRows(param);
	}

	@Override
	public void insertSupplier(Supplier s) {
		
		supplierDao.insertSupplier(s);
	}

	@Override
	public Integer delSupplier(Long id) {
		return supplierDao.delSupplier(id);
	}

	@Override
	public void updateSupplier(Supplier s) {
		
		supplierDao.updateSupplier(s);
	}

	@Override
	public Supplier findSupplierById(long id) {
		
		return supplierDao.findSupplierById(id);
	}

	
}
