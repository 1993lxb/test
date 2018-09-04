package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xt.vo.Unit;

public interface UnitMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Unit record);

    int insertSelective(Unit record);

    Unit selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Unit record);

    int updateByPrimaryKey(Unit record);
    
    //查询所有单位
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
    public List<Unit>findUnits();
    
    //根据条件查询单位
    @Select("select * from cx_unit where name=#{name}")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes")
    })
    public List<Unit>findUnitsByName(String name);
    
    //增加单位
    @Insert("insert into cx_unit values(default,now(),#{0},#{1},null,null,#{2},#{3})")
    public void insertUnit(long userId,int deleteId,String unitName,String note);
    
    //删除单位
    @Update("update cx_unit set delete_state=1 where id=#{unitId}")
    public void delUnit(long unitId);
    
    
    //根据id查找单位
    @Select("select * from cx_unit where id=#{id}")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes")
    })
    public Unit findUnitById(long id);
    
    //更改单位
    @Update("update cx_unit set name=#{0},notes=#{1},edit_id=#{2},edit_time=now() where id=#{3}")
    public void updateUnit(String updateName,String updateNote,long userId,long updateId);
    
}