package com.xt.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xt.vo.MaterialGroup;
import com.xt.vo.Materiel;
import com.xt.vo.Param;
import com.xt.vo.Unit;

public interface MaterielMapper {
    int deleteByPrimaryKey(String pn);

    int insert(Materiel record);

    int insertSelective(Materiel record);

    Materiel selectByPrimaryKey(String pn);

    int updateByPrimaryKeySelective(Materiel record);

    int updateByPrimaryKey(Materiel record);
    
    //查询所有主物料
    public List<Materiel> findAllMateriel(Map<String, Object> pm);
    	
    //查询表中总条数
    @Select("select count(*) from cx_materiel where delete_state=0")
    public Integer getTotalRows(Param param);
    
    //查询物料组
    @Select("select * from cx_material_group where delete_state=0")
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
    public List<MaterialGroup> findMaterialGroup();
    
    //查询物料单位
    @Select("select * from cx_unit where delete_state=0")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes")
    })
    public List<Unit> findUnits();
    
    //增加主物料
    @Insert("insert into cx_materiel values(#{pn},now(),#{addUserId},#{barcode},0,#{depletionNum},null,null,#{humidityDay},#{isHumidity},null,#{name},#{notes},null,#{specification},#{totalNum},#{mGroupId},#{unitId},null)")
    public void insertMateriel(Materiel materiel);
    
    //删除主物料
    @Update("update cx_materiel set delete_state=1 where pn=#{pn}")
    public Integer delMateriel(String pn);
    
    //根据物料号查主物料
    public Materiel findMaterielByPn(String pn);
    
    //更改主物料
    public void updateMateriel(Materiel m);
}