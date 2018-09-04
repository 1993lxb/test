package com.xt.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.MaterielMapper;
import com.xt.vo.MaterialGroup;
import com.xt.vo.Materiel;
import com.xt.vo.Param;
import com.xt.vo.Unit;
@Service("materielService")
public class IMaterielServiceImp implements IMaterielService{

	@Autowired
	private MaterielMapper materielDao;
	@Override
	public List<Materiel> findAllMateriel(Map<String, Object> pm) {
		
		return materielDao.findAllMateriel(pm);
	}
	@Override
	public Integer getTotalRows(Param param) {
		
		return materielDao.getTotalRows(param);
	}
	@Override
	public List<MaterialGroup> findMaterialGroup() {
		
		return materielDao.findMaterialGroup();
	}
	@Override
	public List<Unit> findUnits() {
		
		return materielDao.findUnits();
	}
	@Override
	public void insertMateriel(Materiel materiel) {
		materielDao.insertMateriel(materiel);
		
	}
	@Override
	public Integer delMateriel(String pn) {
		
		return materielDao.delMateriel(pn);
	}
	@Override
	public Materiel findMaterielByPn(String pn) {
		
		return materielDao.findMaterielByPn(pn);
	}
	@Override
	public void updateMateriel(Materiel m) {
		materielDao.updateMateriel(m);
		
	}
	

}
