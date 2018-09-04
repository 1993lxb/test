package com.xt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IMaterialGroupService;
import com.xt.utils.JsonResult;
import com.xt.vo.MaterialGroup;
import com.xt.vo.Param;
import com.xt.vo.User;

@Controller
@RequestMapping("/materialGroup")
public class MaterialGroupController {

	@Autowired
	private IMaterialGroupService materialGroupService;
	
	@RequestMapping("/findMaterialGroupByParam")
	@ResponseBody
	public Map<String,Object> findAllMaterialGroup(Param param,String isElectronic, String name){
		List<MaterialGroup> materialGroup=materialGroupService.findAllMaterialGroup(param, isElectronic, name);
		int cnt=materialGroupService.getTotalRows(param);
		Map<String,Object> map = new HashMap<>();
		map.put("res", materialGroup);
		map.put("total", cnt);
		return map;
	}
	
	@RequestMapping("/insertMaterialGroup")
	public String insertMaterialGroup(HttpServletRequest request,MaterialGroup m){
		User u=(User) request.getSession().getAttribute("u");
		long userId=u.getId();
		m.setAddUserId(userId);
		materialGroupService.insertMaterialGroup(m);
		return "materialGroup";
	}
	
	@RequestMapping("/delMaterialGroup")
	@ResponseBody
	public Integer delMaterialGroup(long id){
		return materialGroupService.delMaterialGroup(id);
	}
	
	@RequestMapping("/findMaterialGroupById")
	@ResponseBody
	public JsonResult<MaterialGroup> findMaterialGroupById(long id){
		JsonResult<MaterialGroup> jr=new JsonResult<MaterialGroup>();
		try {
			MaterialGroup mg=materialGroupService.findMaterialGroupById(id);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(mg);
		} catch (Exception e) {
			jr=new JsonResult<MaterialGroup>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
	
	@RequestMapping("/updateMaterialGroupById")
	public String updateMaterialGroup(MaterialGroup m,HttpServletRequest request){
		User u=(User) request.getSession().getAttribute("u");
		long userId=u.getId();
		m.setEditId(userId);
		materialGroupService.updateMaterialGroup(m);
		return "materialGroup";
	}
}
