package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.WarehouseAreaMapper;
import com.xt.vo.MaterialGroup;
import com.xt.vo.Param;
import com.xt.vo.WarehouseArea;

@Service("warehouseareaSerice")
public class WarehouseAreaServiceImp implements IWarehouseAreaService{
	@Autowired
	private WarehouseAreaMapper warehouseareaDao;

	@Override
	public List<WarehouseArea> selectByParams(Param<WarehouseArea> p) {
		return warehouseareaDao.selectByParams(p);
	}

	@Override
	public Integer selectCountByParams(Param<WarehouseArea> p) {
		return warehouseareaDao.selectCountByParams(p);
	}

	@Override
	public int addWarehouse(WarehouseArea warehousearea) {
		return warehouseareaDao.addWarehouse(warehousearea);
	}

	@Override
	public int delWarehousearea(long id) {
		return warehouseareaDao.delWarehousearea(id);
	}

	@Override
	public WarehouseArea findWarehouseareaById(long id) {
		return warehouseareaDao.findWarehouseareaById(id);
	}

	@Override
	public int updateByPrimaryKey(WarehouseArea f) {
		// TODO Auto-generated method stub
		return warehouseareaDao.updateByPrimaryKey(f);
	}



	

}
