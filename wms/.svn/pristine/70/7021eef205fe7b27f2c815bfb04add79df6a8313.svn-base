package com.xt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IWarehouseAreaService;
import com.xt.vo.Param;
import com.xt.vo.User;
import com.xt.vo.WarehouseArea;

@Controller
@RequestMapping("/warehousearea")
public class WarehouseAreaController {

	@Autowired
	private IWarehouseAreaService warehouseareaService;

	// 按条件查询
	@RequestMapping("/findWarehouseareaByParam")
	@ResponseBody
	public Map selectByParams(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<>();
		String name = request.getParameter("name");
		System.out.println(name);
		WarehouseArea warehouse = new WarehouseArea();
		warehouse.setName(name);
		Param<WarehouseArea> p = new Param(Integer.parseInt(request.getParameter("pageSize")),
				Integer.parseInt(request.getParameter("pageNumber")), warehouse);
		List<WarehouseArea> whs = warehouseareaService.selectByParams(p);
		Integer total = warehouseareaService.selectCountByParams(p);
		map.put("total", total);
		map.put("whs", whs);
		return map;
	}

	// 增加区域
	@RequestMapping("/addWarehousearea")
	@ResponseBody
	public int addWarehousearea(HttpServletRequest request, WarehouseArea warehousearea) {
		User u = (User) request.getSession().getAttribute("u");
		long addUserId = u.getId();
		warehousearea.setAddUserId(addUserId);
		int num = warehouseareaService.addWarehouse(warehousearea);
		return num;
	}

	@RequestMapping("/delwarehousearea")
	@ResponseBody
	public Integer delwarehousearea(long id) {
		return warehouseareaService.delWarehousearea(id);
	}

	// 修改前根据id查区域
	@RequestMapping("/findwarehouseareaById")
	@ResponseBody
	public WarehouseArea findWarehouseareaById(long id) {
		WarehouseArea w = warehouseareaService.findWarehouseareaById(id);
		return w;
	}

	@RequestMapping("/updateWarehousearea")
	@ResponseBody
	public Integer updateByPrimaryKey(HttpServletRequest request, WarehouseArea warehousearea) {
		User u = (User) request.getSession().getAttribute("u");
		long addUserId = u.getId();
		warehousearea.setEditId(addUserId);;
		Integer num = warehouseareaService.updateByPrimaryKey(warehousearea);
		return num;
	}

}
