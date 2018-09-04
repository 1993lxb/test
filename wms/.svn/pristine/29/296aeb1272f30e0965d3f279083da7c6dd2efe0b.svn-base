package com.xt.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IFactorySerice;
import com.xt.utils.JsonResult;
import com.xt.vo.Factory;
import com.xt.vo.User;

@Controller
@RequestMapping("/factory")
public class FactoryController {

	@Autowired
	private IFactorySerice factorySerice;

	// 查询所有工厂
	@RequestMapping("/findAllFactorys")
	public String findAllFactory(HttpServletRequest request) {
		request.setAttribute("factorys", factorySerice.findAllFactory());
		return "factorylist";
	}

	// 增加工厂
	@RequestMapping("/insertFactory")
	public String insertFactory(HttpServletRequest request, String name, String address, String tel, String notes) {
		User user = (User) request.getSession().getAttribute("u");
		Long addUserId = user.getAddUserId();
		factorySerice.insertFactory(name, address, tel, notes, addUserId);
		request.setAttribute("factorys", factorySerice.findAllFactory());
		return "factorylist";
	}

	// 修改工厂
	@RequestMapping("/updateFactory")
	public String updateFactory(HttpServletRequest request, long updateId, String name, String address, String tel,
			String notes) {
		User user = (User) request.getSession().getAttribute("u");
		Long addUserId = user.getAddUserId();
		factorySerice.updateFactory(name, address, tel, notes, addUserId, updateId);
		return "redirect:findAllFactorys";
	}

	// 删除工厂:修改删除状态
	@RequestMapping("/delfactory")
	public String delFactory(String factoryId) {
		factorySerice.delFactory(Long.parseLong(factoryId));
		return "redirect:findAllFactorys";
	}

	// 通过工厂名称查询工厂
	@RequestMapping("/findFactoryByName")
	@ResponseBody
	public JsonResult<List<Factory>> findFactoryByName(HttpServletRequest request, String name) {
		JsonResult<List<Factory>> jr = new JsonResult<List<Factory>>();
		try {
			List<Factory> factory = factorySerice.findFactoryByName(name);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(factory);
		} catch (Exception e) {
			jr = new JsonResult<List<Factory>>("失败" + e.getMessage(), "1");
		}
		return jr;
	}

	// 通过工厂id查询工厂
	@RequestMapping("/findfactorybyid")
	@ResponseBody
	public JsonResult<Factory> findFactoryById(HttpServletRequest request, long id) {
		JsonResult<Factory> jr = new JsonResult<Factory>();
		try {
			Factory factory = factorySerice.findFactoryById(id);
			jr.setMsg("成功");
			jr.setErroCode("0");
			jr.setT(factory);
		} catch (Exception e) {
			jr = new JsonResult<Factory>("失败" + e.getMessage(), "1");
		}
		return jr;
	}
	
	
	
	// 查询所有工厂并以json返回
		@RequestMapping("/findfactory")
		@ResponseBody
		public JsonResult<List<Factory>> findFactory(HttpServletRequest request) {
			JsonResult<List<Factory>> jr = new JsonResult<List<Factory>>();
			try {
				List<Factory> factory = factorySerice.findAllFactory();
				jr.setMsg("成功");
				jr.setErroCode("0");
				jr.setT(factory);
			} catch (Exception e) {
				jr = new JsonResult<List<Factory>>("失败" + e.getMessage(), "1");
			}
			return jr;
		}

}
