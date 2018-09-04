package com.xt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xt.dao.MoveTypeMapper;
import com.xt.vo.MoveType;

@Service("moveTypeService")
public class IMoveTypeServiceImp implements IMoveTypeService{

	@Autowired
	private MoveTypeMapper moveTypeDao;

	@Override
	public List<MoveType> findAllMoveType(MoveType mt) {
		return moveTypeDao.findAllMoveType(mt);
	}

	@Override
	public void insertMoveType(MoveType mt) {
		
		moveTypeDao.insertMoveType(mt);
	}

	@Override
	public void delMoveType(long id) {
		
		moveTypeDao.delMoveType(id);
	}

	@Override
	public MoveType findMoveTypeById(long id) {
	
		return moveTypeDao.findMoveTypeById(id);
	}

	@Override
	public void updateMoveTypeById(MoveType mt) {
		
		moveTypeDao.updateMoveTypeById(mt);
	}

	
}
