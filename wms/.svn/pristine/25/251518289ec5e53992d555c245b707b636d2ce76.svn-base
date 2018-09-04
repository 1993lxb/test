package com.xt.utils;

import org.apache.ibatis.jdbc.SQL;

import com.xt.vo.Param;

public class UserDynamicSql {
	
	public String findUserByParam(Param param,String realName,Long factoryId){
		String sql1="";
		SQL sql=new SQL().SELECT("a.* ,b.name as name,d.role_name as roleName").FROM(" cx_user a INNER JOIN cx_factory b on a.factory_id=b.id LEFT JOIN cx_user_role c on c.user_id=a.id LEFT JOIN cx_role d on d.id=c.role_id where a.delete_state=0");
		sql1=sql.toString();
		if(realName!=null&&realName!=""){
			sql1=sql1+"  and a.real_name like concat('%',#{1},'%')";
		}
		
		if(factoryId!=null&&factoryId!=0){
			sql1+=" and a.factory_id =(#{2})";
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
			SQL sql=new SQL().SELECT("count(*)").FROM("cx_user where delete_state=0");
			
			return sql.toString();
		}

}
