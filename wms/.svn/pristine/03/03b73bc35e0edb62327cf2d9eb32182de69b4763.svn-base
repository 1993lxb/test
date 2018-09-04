package com.xt.utils;

import org.apache.ibatis.jdbc.SQL;

import com.xt.vo.Param;
import com.xt.vo.WarehouseArea;



public class WarehouseareaDynamicSql {
	        // 根据条件查询仓库
			public String selectByParams(final Param<WarehouseArea> p) {
				return new SQL() {
					{
						SELECT("a.*,b.name as warehouseName,c.name as factoryName");
						FROM("cx_warehouse_area as a inner join cx_warehouse as b on a.warehouse_id=b.id inner join cx_factory as c on b.factory_id=c.id");
						WHERE("a.delete_state=0");
						if (p.getObj().getName() != null && !"".equals(p.getObj().getName())) {
							WHERE("a.name like concat('%',#{obj.name},'%')");
						}
					}
				}.toString()+" limit  "+p.getPageIndex()+","+p.getPageSize();
			}

			//根据条件查询仓库数量
			public String selectCountByParams(final Param<WarehouseArea> p) {
				return new SQL() {
					{
						SELECT("count(*)");
						FROM("cx_warehouse_area as a inner join cx_warehouse as b on a.warehouse_id=b.id inner join cx_factory as c on b.factory_id=c.id");
						WHERE("a.delete_state=0");
						if (p.getObj().getName() != null && !"".equals(p.getObj().getName())) {
							WHERE("a.name like concat('%',#{obj.name},'%')");
						}
					}
				}.toString();
			}
			
			public String updateByPrimaryKey(WarehouseArea f){
				String sql="update cx_warehouse_area set edit_id=#{editId},edit_time=now(),name=#{name},notes=#{notes},warehouse_id=#{warehouseId} where id=#{id} and delete_state=0 ";
				if (f.getEditTime() == null) {
					sql += " and edit_time is null";
				} else {
					sql += " and edit_time ='" + f.getEditTime().toLocaleString()+"'";
				}
				return sql;
			}
}
