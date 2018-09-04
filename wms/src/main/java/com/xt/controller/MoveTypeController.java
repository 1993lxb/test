package com.xt.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IMoveTypeService;
import com.xt.utils.JsonResult;
import com.xt.vo.MoveType;
import com.xt.vo.User;

@Controller
@RequestMapping("/moveType")
public class MoveTypeController {

	@Autowired
	private IMoveTypeService moveTypeService;
	
	@RequestMapping("/findAllMoveType")
	@ResponseBody
	public JsonResult<List<MoveType>>findAllMoveType(MoveType mt){
		JsonResult<List<MoveType>> jr=new JsonResult<List<MoveType>>();
		try {
			
			List<MoveType> moveType=moveTypeService.findAllMoveType(mt);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(moveType);
		} catch (Exception e) {
			jr=new JsonResult<List<MoveType>>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	
	@RequestMapping("/insertMoveType")
	public String insertMoveType(MoveType mt,HttpServletRequest request){
		User u=(User) request.getSession().getAttribute("u");
		long uid=u.getId();
		mt.setAddUserId(uid);
		moveTypeService.insertMoveType(mt);
		return "moveType";
	}
	
	@RequestMapping("/delMoveType")
	public String delMoveType(long id){
		moveTypeService.delMoveType(id);
		return "moveType";
	}
	
	@RequestMapping("/findMoveTypeById")
	@ResponseBody
	public JsonResult<MoveType> findAllMoveType(long id){
		JsonResult<MoveType> jr=new JsonResult<MoveType>();
		try {
			MoveType mt=moveTypeService.findMoveTypeById(id);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(mt);
		} catch (Exception e) {
			jr=new JsonResult<MoveType>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	@RequestMapping("/updateMoveTypeById")
	public String updateMoveTypeById(MoveType mt,HttpServletRequest request){
		User u=(User) request.getSession().getAttribute("u");
		long uid=u.getId();
		mt.setEditId(uid);
		moveTypeService.updateMoveTypeById(mt);
		return "moveType";
	}
}
