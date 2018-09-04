package com.xt.utils;

import org.apache.ibatis.jdbc.SQL;

import com.xt.vo.Param;

public class RoleDynamicSql {
	
	public String findRoleByParam(Param param,String roleName){
		String sql1="";
		SQL sql=new SQL().SELECT("*").FROM(" cx_role  where delete_state=0");
		sql1=sql.toString();
		if(roleName!=null&&roleName!=""){
			sql1=sql1+"  and role_name like concat('%',#{1},'%')";
		}
		if(param !=null){
			if(param.getPageIndex() !=null && param.getPageSize() !=null){
				sql1+="  limit "+param.getPageIndex()+" , "+param.getPageSize();
			}
		}
		System.out.println(">>>>>>>>>>>>>>>>>"+sql1);
		return sql1;
	}
	
	
	//查询表的总条数
		public String getTotalRows(Param param){
			SQL sql=new SQL().SELECT("count(*)").FROM("cx_role where delete_state=0");
			
			return sql.toString();
		}

}
