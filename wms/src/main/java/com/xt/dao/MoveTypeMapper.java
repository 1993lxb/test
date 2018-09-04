package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xt.vo.MoveType;

public interface MoveTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(MoveType record);

    int insertSelective(MoveType record);

    MoveType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(MoveType record);

    int updateByPrimaryKey(MoveType record);
    
    //查询移动类型
    public List<MoveType> findAllMoveType(MoveType moverType);
    
    //增加移动类型
    @Insert("insert into cx_move_type values(default,now(),#{addUserId},0,null,null,'${name}','${notes}')")
    public void insertMoveType(MoveType mt);
    
    //删除移动类型
    @Update("update cx_move_type set delete_state=1 where id=#{id}")
    public void delMoveType(long id);
    
    //根据id查移动类型
    @Select("select * from cx_move_type where delete_state=0 and id=#{id}")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
    		@Result(column="add_time",property="addTime"),
    		@Result(column="add_user_id",property="addUserId"),
    		@Result(column="delete_state",property="deleteState"),
    		@Result(column="edit_id",property="editId"),
    		@Result(column="edit_time",property="editTime"),
    		@Result(column="name",property="name"),
    		@Result(column="notes",property="notes"),
    })
    public MoveType findMoveTypeById(long id);
    
    //修改移动类型
    public void updateMoveTypeById(MoveType mt);
}