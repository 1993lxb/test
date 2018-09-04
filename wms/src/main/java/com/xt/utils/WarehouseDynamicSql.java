package com.xt.utils;

import org.apache.ibatis.jdbc.SQL;

import com.xt.vo.Param;
import com.xt.vo.Warehouse;

public class WarehouseDynamicSql {
	// 查询仓库:动态查询
	public String findWarehouseByParam(final Param param,final String name) {
		SQL sql = new SQL().SELECT("a.*,b.name as factoryname")
				.FROM("cx_warehouse as a inner join cx_factory as b on a.factory_id=b.id where a.delete_state=0");
		String sql1 = sql.toString();
		if(name!=null && name!=""){
			sql1+=" and a.name like concat('%',#{1},'%')";
		}
		if(param !=null){
			if(param.getPageIndex() !=null && param.getPageSize() !=null){
				sql1=sql1+" limit "+param.getPageIndex()+" , "+param.getPageSize();
			}
		}
		System.out.println(sql1);
		return sql1;

	}

	// 查询表的总条数
	public String getTotalRows(final Param param,final String name) {
		SQL sql = new SQL().SELECT("count(*)")
				.FROM("cx_warehouse as a inner join cx_factory as b on a.factory_id=b.id where a.delete_state=0");
		String sql1 = sql.toString();
		if(name!=null && name!=""){
			sql1+=" and a.name like concat('%',#{1},'%')";
		}
		System.out.println(sql1);
		return sql1;
	}
}
