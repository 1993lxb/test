package com.xt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IWarehouseService;
import com.xt.utils.JsonResult;
import com.xt.vo.Factory;
import com.xt.vo.Param;
import com.xt.vo.User;
import com.xt.vo.Warehouse;

@Controller
@RequestMapping("/warehouse")
public class WarehouseController {

	@Autowired
	private IWarehouseService warehouseService;

	// 查询仓库：动态查询
	@RequestMapping("/findWarehouseareaByParam")
	@ResponseBody
	public Map<String, Object> findWarehouseByParam(HttpServletRequest request, Param param, String warehousename) {
		System.out.println(warehousename);
		List<Warehouse> warehouse = warehouseService.findWarehouseByParam(param, warehousename);
		int cnt = warehouseService.getTotalRows(param, warehousename);
		Map<String, Object> map = new HashMap<>();
		map.put("res", warehouse);
		map.put("total", cnt);
		return map;
	}

	// 增加仓库
	@RequestMapping("/addWarehouse")
	@ResponseBody
	public int addWarehouse(HttpServletRequest request, Warehouse warehouse) {
		User u = (User) request.getSession().getAttribute("u");
		long addUserId = u.getId();
		warehouse.setAddUserId(addUserId);
		int num = warehouseService.insertWarehouse(warehouse);
		return num;
	}

	// 删除仓库：修改仓库状态
	@RequestMapping("/delWarehouseById")
	@ResponseBody
	public Integer delWarehouse(Long id) {
		return warehouseService.delWarehouse(id);
	}

	// 查询所有仓库并以json返回
	@RequestMapping("/findwarehouse")
	@ResponseBody
	public JsonResult<List<Warehouse>> findWarehouse(HttpServletRequest request) {
		JsonResult<List<Warehouse>> jr = new JsonResult<List<Warehouse>>();
		try {
			List<Warehouse> warehouse = warehouseService.findWarehouse();
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(warehouse);
		} catch (Exception e) {
			jr = new JsonResult<List<Warehouse>>("失败" + e.getMessage(), "1");
		}
		return jr;
	}
}
