package com.xt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IMaterielService;
import com.xt.utils.JsonResult;
import com.xt.vo.MaterialGroup;
import com.xt.vo.Materiel;
import com.xt.vo.Param;
import com.xt.vo.Unit;
import com.xt.vo.User;
@Controller
@RequestMapping("/materiel")
public class MaterielController {

	@Autowired
	private IMaterielService materielService;
	
	@RequestMapping("/findMaterielByParam")
	@ResponseBody
	public Map<String, Object> findAllMateriel(Param param,Materiel ma){
		    Map<String, Object> pm=new HashMap<String, Object>();
		    pm.put("param", param);
		    pm.put("ma", ma);
		    List<Materiel>materiel=materielService.findAllMateriel(pm);
			int cnt=materielService.getTotalRows(param);
			Map<String, Object> map=new HashMap<>();
			map.put("res", materiel);
			map.put("total", cnt);
			return map;
	}
	@RequestMapping("/findMaterialGroup")
	@ResponseBody
	public JsonResult<List<MaterialGroup>> findMaterialGroup(){
		JsonResult<List<MaterialGroup>> jr=new JsonResult<List<MaterialGroup>>();
		try {
			List<MaterialGroup> mg=materielService.findMaterialGroup();
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(mg);
		} catch (Exception e) {
			jr=new JsonResult<List<MaterialGroup>>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	
	@RequestMapping("/findUnit")
	@ResponseBody
	public JsonResult<List<Unit>> findUnits(){
		JsonResult<List<Unit>> jr=new JsonResult<List<Unit>>();
		try {
			List<Unit> unit=materielService.findUnits();
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(unit);
		} catch (Exception e) {
			jr=new JsonResult<List<Unit>>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	@RequestMapping("/insertMateriel")
	public String InsertMateriel(Materiel materiel,HttpServletRequest request){
		User u=(User) request.getSession().getAttribute("u");
		long uid=u.getId();
		materiel.setAddUserId(uid);
		materielService.insertMateriel(materiel);
		return "materiel";
	}
	
	@RequestMapping("/delMateriel")
	@ResponseBody
	public Integer delMateriel(String pn){
		return materielService.delMateriel(pn);
	}
	
	@RequestMapping("/findMaterielByPn")
	@ResponseBody
	public JsonResult<Materiel>findMaterielByPn(String pn){
		JsonResult<Materiel> jr=new JsonResult<Materiel>();
		try {
			Materiel materiel=materielService.findMaterielByPn(pn);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(materiel);
		} catch (Exception e) {
			jr=new JsonResult<Materiel>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	@RequestMapping("/updateMateriel")
	public String updateMaterirl(Materiel m,HttpServletRequest request){
		User u=(User) request.getSession().getAttribute("u");
		Long eId=u.getId();
		m.setEditId(eId);
		materielService.updateMateriel(m);
		return "materiel";
	}
}
