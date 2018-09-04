package com.xt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.ISupplierService;
import com.xt.utils.JsonResult;
import com.xt.vo.Param;
import com.xt.vo.Supplier;
import com.xt.vo.User;


@Controller
@RequestMapping("/supplier")
public class SupplierController {

	@Autowired
	private ISupplierService supplierService;
	
	@RequestMapping("/findSupplierByParam")
	@ResponseBody
	public Map<String,Object> findAllSupplier(HttpServletRequest request,Param param,String name,String address){
		
			List<Supplier> supplier=supplierService.findAllSupplier(param,name,address);
			int cnt=supplierService.getTotalRows(param);
			Map<String,Object> map = new HashMap<>();
			map.put("res", supplier);
			map.put("total", cnt);
			return map;
	}
	
	@RequestMapping("/insertSupplier")
	public String insertSupplier(Supplier s,HttpServletRequest request){
		User u=(User) request.getSession().getAttribute("u");
		long id=u.getId();
		s.setAddUserId(id);
		
		supplierService.insertSupplier(s);
		return "supplier";
	}
	
	@RequestMapping("/delSupplierById")
	@ResponseBody
	public Integer delSupplier(Long id){
		
		return supplierService.delSupplier(id);
	}
	
	@RequestMapping("/updateSupplierById")
	public String updateSupplier(Supplier s,HttpServletRequest request){
		
		User u=(User) request.getSession().getAttribute("u");
		long userId=u.getId();
		s.setEditId(userId);
		
		supplierService.updateSupplier(s);
		return "supplier";
	}
	
	@RequestMapping("/findSupplierById")
	@ResponseBody
	public JsonResult<Supplier> findSupplier(long id){
		JsonResult<Supplier> jr=new JsonResult<Supplier>();
		try {
			Supplier supplier=supplierService.findSupplierById(id);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(supplier);
		} catch (Exception e) {
			jr=new JsonResult<Supplier>("失败"+e.getMessage(), "1");
		}
		return jr;
	}
}
