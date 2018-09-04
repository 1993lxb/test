package com.xt.service;

import java.util.List;

import com.xt.vo.Unit;

public interface IUnitService {

	public List<Unit>findUnits();
	
	public List<Unit>findUnits(String name);
	
	public void insertUnit(long userId,int deleteId,String unitName,String note);
	
	public void delUnit(long unitId);
	
	public Unit findUnitById(long id);
	
	public void updateUnit(String updateName,String updateNote,long userId,long updateId);
}
