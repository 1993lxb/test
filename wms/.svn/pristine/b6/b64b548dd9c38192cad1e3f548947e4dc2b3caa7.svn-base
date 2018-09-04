package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.MaterialGroupMapper;
import com.xt.vo.MaterialGroup;
import com.xt.vo.Param;
@Service("materialGroupService")
public class IMaterialGroupServiceImp implements IMaterialGroupService{

	@Autowired
	private MaterialGroupMapper MaterialGroupDao;

	@Override
	public List<MaterialGroup> findAllMaterialGroup(Param param, String isElectronic, String name) {
		
		return MaterialGroupDao.findAllMaterialGroup(param, isElectronic, name);
	}

	@Override
	public Integer getTotalRows(Param param) {

		return MaterialGroupDao.getTotalRows(param);
	}

	@Override
	public void insertMaterialGroup(MaterialGroup m) {
		
		MaterialGroupDao.insertMaterialGroup(m);
	}

	@Override
	public Integer delMaterialGroup(long id) {
		
		return MaterialGroupDao.delMaterialGroup(id);
	}

	@Override
	public MaterialGroup findMaterialGroupById(long id) {
		
		return MaterialGroupDao.findMaterialGroupById(id);
	}

	@Override
	public void updateMaterialGroup(MaterialGroup m) {
		
		MaterialGroupDao.updateMaterialGroup(m);
	}
	
}
