package com.xt.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IUnitService;
import com.xt.utils.JsonResult;
import com.xt.vo.Unit;
import com.xt.vo.User;
@Controller
@RequestMapping("/unit")
public class UnitController {

	@Autowired
	private IUnitService unitService;
	
	@RequestMapping("/findAll")
	public String findUnits(HttpServletRequest request){
		request.setAttribute("units", unitService.findUnits());
		return "unit";
	}
	
	@RequestMapping("/findUnitsByName")
	@ResponseBody
	public JsonResult<List<Unit>> findUnitsByName(HttpServletRequest request ,String name){
		JsonResult<List<Unit>> jr=new JsonResult<List<Unit>>();
		try {
			List<Unit> unit=unitService.findUnits(name);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(unit);
		} catch (Exception e) {
			jr=new JsonResult<List<Unit>>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	
	//增加单位
	@RequestMapping("/insertUnit")
	public String insertUnit(long userId, int deleteId, String unitName, String note){
		
		unitService.insertUnit(userId, deleteId, unitName, note);
		return "redirect:findAll";
	}
	
	//删除单位
	@RequestMapping("/delUnit")
	public String delUnit(String unitId){
		unitService.delUnit(Long.parseLong(unitId));
		return "redirect:findAll";
	}
	
	//根据id查单位
	@RequestMapping("/findUnitById")
	@ResponseBody
	public JsonResult<Unit> findUnitById(HttpServletRequest request ,long id){
		JsonResult<Unit> jr=new JsonResult<Unit>();
		try {
			Unit unit=unitService.findUnitById(id);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(unit);
		} catch (Exception e) {
			jr=new JsonResult<Unit>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	
	//更改单位
	@RequestMapping("/updateUnit")
	public String updateUnit(HttpServletRequest request,String updateName,String updateNote,Long updateId){
		User u=(User) request.getSession().getAttribute("u");
		long userId=u.getId();
		unitService.updateUnit(updateName, updateNote, userId, updateId);
		return "redirect:findAll";
	}
}
