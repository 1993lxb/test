package com.xt.utils;

import org.apache.ibatis.jdbc.SQL;

import com.xt.vo.Param;

public class SupplierDynamicSql {

	//查询所有供应商
	public String findSupplierByParam(Param param, String name,String address){
		
		
		SQL sql=new SQL().SELECT("id,add_time,add_user_id,delete_state,edit_id,edit_time,address,name,notes,tel").FROM("cx_supplier where delete_state=0");
		
		String sql1=sql.toString();
        if(name !=null && name !=""){
			sql1=sql1+" and name like concat('%',#{1},'%')";
		}
        if(address !=null && address !=""){
        	sql1+=" and  address like concat('%',#{2},'%')";
        }
		
			
		if(param !=null){
			if(param.getPageIndex() !=null && param.getPageSize() !=null){
				sql1+=" limit "+param.getPageIndex()+" , "+param.getPageSize();
			}
		}
		
		return sql1;
		
	}
	
	//查询表的总条数
	public String getTotalRows(Param param){
		SQL sql=new SQL().SELECT("count(*)").FROM("cx_supplier where delete_state=0");
		
		return sql.toString();
	}
}
