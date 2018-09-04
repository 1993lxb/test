package com.xt.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.xt.utils.JsonResult;
import com.xt.utils.MD5;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xt.service.IMenuSerice;
import com.xt.service.IUserService;
import com.xt.vo.Menu;
import com.xt.vo.Param;
import com.xt.vo.User;

@Controller
@RequestMapping("/userController")
public class UserController {
	@Autowired
	private IUserService userService;

	@Autowired
	private IMenuSerice menuSerice;
	

	/**
	 *验证登录表单
	 * 
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/find")
	public String findUserBy(HttpServletRequest request,HttpServletResponse response, String loginId, String loginPwd) {
		com.xt.vo.User u = userService.findUser(loginId);
		try{
		if (u != null) {
			if (MD5.string2MD5(loginPwd).toUpperCase().equals(u.getLoginPwd())) {
				request.getSession().setAttribute("u", u);
				List<Menu> menu = menuSerice.findMenuByUserId(u.getId());
				request.setAttribute("menu", menu);
				return "mainfrm";
				// ��ת��
				//response.sendRedirect("LoadAuthsSvt");
			} else {
				request.setAttribute("msg", "密码错误");
				return "login";
				/*request.getRequestDispatcher("login.jsp").forward(request, response);*/
			}
		} else {
			request.setAttribute("msg", "帐号不存在");
			return "login";
		}}
		catch (Exception e) {
			// TODO: handle exception
			request.setAttribute("msg", "系统错误");
			return "error";
		}
	}
	
	
	
	@RequestMapping("/findUserByParam")
	@ResponseBody
	public Map<String,Object> findAllUser(HttpServletRequest request,Param param,String realName,Long factoryId){
			List<User> user=userService.findUser(param,realName,factoryId);
			int cnt=userService.getTotalRows(param);
			Map<String,Object> map = new HashMap<>();
			map.put("res", user);
			map.put("total", cnt);
			return map;
	}
	
	
	
	/**
	 * 提交模态框的值并插入数据库
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insertUser")
	public String insertMenu(HttpServletRequest request,User user) {
		User u=(User) request.getSession().getAttribute("u");
		user.setAddTime(new Date());
		user.setAddUserId(u.getId());
		user.setDeleteState(0);
		userService.insertUser(user);
		return "ShowUser";

	}
	
	
	
	/**
	 * 按主键查询用户用作修改
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/findUserByPrimaryKey")
	@ResponseBody
	public JsonResult<User> selectByPrimaryKey(HttpServletRequest request,Long id) {
		JsonResult<User> js = new JsonResult<User>();
		try {
			User user=userService.selectByPrimaryKey(id);
			js = new JsonResult<User>("成功", "0");
			js.setT(user);
		} catch (Exception e) {
			// TODO: handle exception
			js = new JsonResult<User>("失败", "1");
		}
		return js;
	}
	
	
	
	
	
	/**
	 * 提交模态框的值并修改插入数据库
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/updateUser")
	public String updateByPrimaryKeySelective(HttpServletRequest request,User user) {
		User u=(User) request.getSession().getAttribute("u");
		user.setEditTime(new Date());
		user.setEditId(u.getId());
		userService.updateByPrimaryKeySelective(user);
		return "ShowUser";

	}
	
	
	
	
	/**
	 * 删除即修改删除状态
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/updateDelState")
	@ResponseBody
	public int updateDelState(HttpServletRequest request,Long id) {
		return userService.updateDelState(id);

	}
}
