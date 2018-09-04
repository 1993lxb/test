package com.xt.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IMenuSerice;
import com.xt.utils.JsonResult;
import com.xt.vo.Menu;
import com.xt.vo.RoleMenu;
import com.xt.vo.User;
import com.xt.vo.UserRole;

@Controller
@RequestMapping("/menu")
public class MenuController {

	@Autowired
	private IMenuSerice menuSerice;

	/**
	 * 查询所有菜单
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/menuList")
	public String findMenu(HttpServletRequest request) {
		List<Menu> menu = menuSerice.findMenu();
		request.setAttribute("menu", menu);
		return "showMenu";
	}

	/**
	 * 搜索框查询结果，按名字查
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/menuByName")
	@ResponseBody
	public JsonResult<List<Menu>> findPro(HttpServletRequest request, String name) {
		System.out.println(name);
		JsonResult<List<Menu>> js = new JsonResult<List<Menu>>();
		try {
			List<Menu> menuList = menuSerice.findMenuByName(name);
			System.out.println(menuList + ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			js = new JsonResult<List<Menu>>("成功", "0");
			js.setT(menuList);
		} catch (Exception e) {
			// TODO: handle exception
			js = new JsonResult<List<Menu>>("失败", "1");
		}
		return js;
	}

	/**
	 * 给模态框的父类菜单赋值
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/menuByParentId")
	@ResponseBody
	public JsonResult<List<Menu>> findMenuByParentId(HttpServletRequest request) {
		JsonResult<List<Menu>> js = new JsonResult<List<Menu>>();
		try {
			List<Menu> menuList = menuSerice.findMenuByParentId();
			System.out.println(menuList + ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			js = new JsonResult<List<Menu>>("成功", "0");
			js.setT(menuList);
		} catch (Exception e) {
			// TODO: handle exception
			js = new JsonResult<List<Menu>>("失败", "1");
		}
		return js;
	}

	/**
	 * 提交模态框的值并插入数据库
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insertMenu")
	public String insertMenu(HttpServletRequest request,Menu record,RoleMenu roleMenu) {
		User u=(User) request.getSession().getAttribute("u");
		UserRole userRole=menuSerice.findByUserId(u.getId());
		record.setAddUserId(u.getId());
		record.setAddTime(new Date());
		record.setDeleteState(0);
		roleMenu.setAddTime(new Date());
		roleMenu.setAddUserId(u.getId());
		roleMenu.setRoleId(userRole.getRoleId());
		menuSerice.insertMenu(record,roleMenu);
		return "redirect:/menu/menuList";

	}
	
	
	
	/**
	 * 按主键查询菜单用作修改
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/menuByPrimaryId")
	@ResponseBody
	public JsonResult<Menu> selectByPrimaryKey(HttpServletRequest request,String id) {
		System.out.println(id);
		JsonResult<Menu> js = new JsonResult<Menu>();
		try {
			Menu menu = menuSerice.selectByPrimaryKey(Long.parseLong(id));
			System.out.println(menu+">>>>>>>>>>>>>");
			js = new JsonResult<Menu>("成功", "0");
			js.setT(menu);
		} catch (Exception e) {
			// TODO: handle exception
			js = new JsonResult<Menu>("失败", "1");
		}
		return js;
	}
	
	
	
	
	/**
	 * 提交修改的模态框的值并插入数据库
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/updateMenu")
	public String updateByPrimaryKey(HttpServletRequest request,Menu record) {
		User u=(User) request.getSession().getAttribute("u");
		record.setEditId(u.getId());
		record.setEditTime(new Date());
		record.setMenuName(request.getParameter("menuName1"));
		record.setMenuUrl(request.getParameter("menuUrl1"));
		record.setNotes(request.getParameter("notes1"));
		record.setParentId(Long.parseLong(request.getParameter("parentId1")));
		record.setSort(Long.parseLong(request.getParameter("sort1")));
		record.setId(Long.parseLong(request.getParameter("id1")));
		menuSerice.updateByPrimaryKey(record);
		return "redirect:/menu/menuList";
	}
	
	
	
	
	/**
	 * 删除即修改删除状态
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/deleteMenu")
	public String updateMenuState(HttpServletRequest request,Menu record) {
		record.setDeleteState(1);
		record.setId(Long.parseLong(request.getParameter("id")));
		menuSerice.updateMenuState(record);
		return "redirect:/menu/menuList";
	}

}
