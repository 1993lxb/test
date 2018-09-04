package com.xt.service;

import java.util.List;
import java.util.Map;

import com.xt.vo.MaterialGroup;
import com.xt.vo.Materiel;
import com.xt.vo.Param;
import com.xt.vo.Unit;

public interface IMaterielService {

	public List<Materiel> findAllMateriel(Map<String, Object> pm);
	
	public Integer getTotalRows(Param param);
	
	public List<MaterialGroup> findMaterialGroup();
	
	public List<Unit> findUnits();
	
	public void insertMateriel(Materiel materiel);
	
	public Integer delMateriel(String pn);
	
	public Materiel findMaterielByPn(String pn);
	
	public void updateMateriel(Materiel m);
}
