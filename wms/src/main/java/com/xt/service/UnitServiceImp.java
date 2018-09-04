package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.UnitMapper;
import com.xt.vo.Unit;
@Service("unitService")
public class UnitServiceImp implements IUnitService{

	@Autowired
	private UnitMapper unitDao;
	
	@Override
	public List<Unit> findUnits() {
		return unitDao.findUnits();
	}

	@Override
	public List<Unit> findUnits(String name) {
		
		return unitDao.findUnitsByName(name);
	}

	@Override
	public void insertUnit(long userId, int deleteId, String unitName, String note) {
		 unitDao.insertUnit(userId, deleteId, unitName, note);
	}

	@Override
	public void delUnit(long unitId) {
		unitDao.delUnit(unitId);
	}

	@Override
	public Unit findUnitById(long id) {
		
		return unitDao.findUnitById(id);
	}

	@Override
	public void updateUnit(String updateName, String updateNote, long userId, long updateId) {
		unitDao.updateUnit(updateName, updateNote, userId, updateId);
		
	}

	
}
