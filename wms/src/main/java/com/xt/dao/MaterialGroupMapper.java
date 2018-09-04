package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;

import com.xt.utils.MaterialGroupDynamicSql;
import com.xt.vo.MaterialGroup;
import com.xt.vo.Param;

public interface MaterialGroupMapper {
    int deleteByPrimaryKey(Long id);

    int insert(MaterialGroup record);

    int insertSelective(MaterialGroup record);

    MaterialGroup selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(MaterialGroup record);

    int updateByPrimaryKey(MaterialGroup record);
    
    //查询所有物料组
    @SelectProvider(method="findMaterialGroupByParam" ,type=MaterialGroupDynamicSql.class)
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="delete_state",property="deleteState"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="is_electronic",property="isElectronic"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes")
    })
    public List<MaterialGroup>findAllMaterialGroup(Param param,String isElectronic, String name);
    
  //查询表中总条数
    @SelectProvider(method="getTotalRows",type=MaterialGroupDynamicSql.class)
    public Integer getTotalRows(Param param);
    
    //增加物料组
    @Insert("insert into cx_material_group values(default,now(),${addUserId},0,null,null,${isElectronic},'${name}','${notes}')")
    public void insertMaterialGroup(MaterialGroup m);
    
    //根据ID删除物料组
    @Update("update cx_material_group set delete_state=1 where id=#{id}")
    public Integer delMaterialGroup(long id);
    
    //根据ID查物料组
    @Select("select * from cx_material_group where id=#{id}")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="delete_state",property="deleteState"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="is_electronic",property="isElectronic"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes")
    })
    public MaterialGroup findMaterialGroupById(long id);
    
    //修改物料组
    @Update("update cx_material_group set edit_id=#{editId},edit_time=now(),is_electronic=#{isElectronic},name=#{name},notes=#{notes} where id=#{id}")
    public void updateMaterialGroup(MaterialGroup m);
}