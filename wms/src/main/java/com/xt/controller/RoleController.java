package com.xt.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IMenuSerice;
import com.xt.service.IRoleMenuService;
import com.xt.service.IRoleService;
import com.xt.utils.JsonResult;
import com.xt.utils.Tree;
import com.xt.vo.Menu;
import com.xt.vo.Param;
import com.xt.vo.Role;
import com.xt.vo.RoleMenu;
import com.xt.vo.User;

@Controller
@RequestMapping("/role")
public class RoleController {
	@Autowired
	private IRoleService roleService;

	@Autowired
	private IMenuSerice menuSerice;

	@Autowired
	private IRoleMenuService roleMenuService;

	@RequestMapping("/findRoleByParam")
	@ResponseBody
	public Map<String, Object> findRole(HttpServletRequest request, Param param, String roleName) {
		List<Role> role = roleService.findRole(param, roleName);
		int cnt = roleService.getTotalRows(param);
		Map<String, Object> map = new HashMap<>();
		map.put("res", role);
		map.put("total", cnt);
		return map;
	}

	// 增加
	@RequestMapping("/insertRole")
	public String insertMenu(HttpServletRequest request, Role role) {
		User u = (User) request.getSession().getAttribute("u");
		role.setAddUserId(u.getId());
		role.setDeleteState(0);
		roleService.insertRole(role);
		return "showRole";

	}

	/**
	 * 按主键查询用户用作修改
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/findRoleByPrimaryKey")
	@ResponseBody
	public JsonResult<Role> selectByPrimaryKey(HttpServletRequest request, Long id) {
		JsonResult<Role> js = new JsonResult<Role>();
		try {
			Role role = roleService.selectByPrimaryKey(id);
			js = new JsonResult<Role>("成功", "0");
			js.setT(role);
		} catch (Exception e) {
			// TODO: handle exception
			js = new JsonResult<Role>("失败", "1");
		}
		return js;
	}

	@RequestMapping("/updateRole")
	public String updateByPrimaryKeySelective(HttpServletRequest request, Role role) {
		System.out.println(role.getEditTime());
		User u = (User) request.getSession().getAttribute("u");
		role.setEditId(u.getId());
		roleService.updateByPrimaryKeySelective(role);
		return "showRole";

	}

	/**
	 * 删除即修改删除状态
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/updateDelState")
	@ResponseBody
	public int updateDelState(HttpServletRequest request, Long id) {
		return roleService.updateDelState(id);

	}

	@RequestMapping("/findMenu")
	@ResponseBody
	public JsonResult<List<Tree>> findAllMenu(HttpServletRequest request, Long roleId) {
		JsonResult<List<Tree>> js = new JsonResult<>();
		List<Tree> menu = menuSerice.findAllMenu(roleId);
		js = new JsonResult<List<Tree>>("成功", "0");
		js.setT(menu);
		return js;
	}

	@RequestMapping("/addMenuForRole")
	@ResponseBody
	public String addMenuForRole(HttpServletRequest request, Long[] ids, Long roleId) {
		roleMenuService.updateRoleMenu(request, ids, roleId);
		return "showRole";

	}

}
