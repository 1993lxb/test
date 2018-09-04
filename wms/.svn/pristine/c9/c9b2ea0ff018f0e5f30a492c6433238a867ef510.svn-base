package com.xt.utils;

import org.apache.ibatis.jdbc.SQL;

import com.xt.vo.Param;

public class MaterialGroupDynamicSql {

	//查询所有物料组
	public String findMaterialGroupByParam(Param param,String isElectronic, String name){
		SQL sql=new SQL().SELECT("*").FROM("cx_material_group where delete_state=0");
		String sql1=sql.toString();
		if(name !=null && name !=""){
			sql1=sql1+" and name like concat('%',#{2},'%')";
		}
        if(isElectronic !=""){
        	sql1+=" and  is_electronic=#{1}";
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
			SQL sql=new SQL().SELECT("count(*)").FROM("cx_material_group where delete_state=0");
			
			return sql.toString();
		}
}
