package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;

import com.xt.utils.SupplierDynamicSql;
import com.xt.vo.Param;
import com.xt.vo.Supplier;

public interface SupplierMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Supplier record);

    int insertSelective(Supplier record);

    Supplier selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Supplier record);

    int updateByPrimaryKey(Supplier record);
 
    //查询所有供应商
    /*@Select("select * from cx_supplier limit #{parem.pageIndex}+','+ #{param.pageSize} where delete_state=0")*/
    @SelectProvider(method="findSupplierByParam",type=SupplierDynamicSql.class)
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="delete_state",property="deleteState"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="address",property="address"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes"),
    		@Result(column="tel",property="tel")
    })
    public List<Supplier> findAllSupplier(Param param,String name,String address);
    
    //查询表中总条数
    /*@Select("select count(*) as total from cx_supplier where delete_state=0")*/
    @SelectProvider(method="getTotalRows",type=SupplierDynamicSql.class)
    public Integer getTotalRows(Param param);
    
    //增加供应商
    @Insert("insert into cx_supplier values(default,now(),#{addUserId},0,null,null,#{address},#{name},#{notes},#{tel})")
    public void insertSupplier(Supplier s);
    
    //根据ID删除供应商
    @Update("update cx_supplier set delete_state=1 where id=#{id}")
    public Integer delSupplier(Long id);
    
    //根据ID查找供应商
    @Select("select * from cx_supplier where id=#{id}")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="delete_state",property="deleteState"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="address",property="address"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes"),
    		@Result(column="tel",property="tel")
    })
    public Supplier findSupplierById(long id);
    
    //更改供应商
    @Update("update cx_supplier set edit_id=#{editId}, edit_time=now(), address=#{address},name=#{name},notes=#{notes},tel=#{tel} where id=#{id}")
    public void updateSupplier(Supplier s);
}