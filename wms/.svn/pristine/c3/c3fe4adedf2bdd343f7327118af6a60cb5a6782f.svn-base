package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;

import com.xt.utils.WarehouseareaDynamicSql;
import com.xt.vo.Param;
import com.xt.vo.WarehouseArea;

public interface WarehouseAreaMapper {
	int deleteByPrimaryKey(Long id);

	int insert(WarehouseArea record);

	int insertSelective(WarehouseArea record);

	WarehouseArea selectByPrimaryKey(Long id);

	int updateByPrimaryKeySelective(WarehouseArea record);

	@SelectProvider(type = WarehouseareaDynamicSql.class, method = "selectByParams")
	@Results({ @Result(id = true, column = "id", property = "id"), @Result(column = "add_time", property = "addTime"),
			@Result(column = "edit_id", property = "editId"), @Result(column = "edit_time", property = "editTime"),
			@Result(column = "name", property = "name"), @Result(column = "factoryName", property = "factoryName"),
			@Result(column = "warehosueName", property = "warehosueName") })
	public List<WarehouseArea> selectByParams(Param<WarehouseArea> p);

	@SelectProvider(type = WarehouseareaDynamicSql.class, method = "selectCountByParams")
	public Integer selectCountByParams(Param<WarehouseArea> p);

	@Insert("insert into cx_warehouse_area values(default,now(),#{addUserId},0,null,null,#{name},#{notes},#{warehouseId})")
	public int addWarehouse(WarehouseArea warehousearea);

	@Update("update cx_warehouse_area set delete_state=1 where id=#{id}")
	public int delWarehousearea(long id);

	// 根据ID查区域
	@Select("select * from cx_warehouse_area where id=#{id} and delete_state=0")
	@Results({ @Result(id = true, column = "id", property = "id"), @Result(column = "add_time", property = "addTime"),
			@Result(column = "edit_id", property = "editId"), @Result(column = "edit_time", property = "editTime"),
			@Result(column = "name", property = "name"), @Result(column = "warehouse_id", property = "warehouseId") })
	public WarehouseArea findWarehouseareaById(long id);
	
	@UpdateProvider(type = WarehouseareaDynamicSql.class, method = "updateByPrimaryKey")
	public int updateByPrimaryKey(WarehouseArea f);
}