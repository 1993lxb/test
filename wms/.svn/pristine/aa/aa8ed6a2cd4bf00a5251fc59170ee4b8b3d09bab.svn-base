package com.xt.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.sun.org.glassfish.external.statistics.annotations.Reset;
import com.xt.vo.Factory;

public interface FactoryMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Factory record);

    int insertSelective(Factory record);

    Factory selectByPrimaryKey(Long id);
    
    int updateByPrimaryKeySelective(Factory record);

    int updateByPrimaryKey(Factory record);
    
    /**
     * 查询所有工厂
     * @return
     */
    @Select("select * from cx_factory where delete_state=0")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
			@Result(column="add_time",property="addTime"),
			@Result(column="edit_time",property="editTime"),
			@Result(column="address",property="address"),
			@Result(column="name",property="name"),
			@Result(column="notes",property="notes"),
			@Result(column="tel",property="tel")
    })
    public List<Factory> findAllFactory();
    
    
    /**
     * 通过工厂名称查询工厂，模糊查询
     * @param name
     * @return
     */
    @Select("select * from cx_factory where name like concat('%',#{name},'%') and delete_state=0")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
			@Result(column="add_time",property="addTime"),
			@Result(column="edit_time",property="editTime"),
			@Result(column="address",property="address"),
			@Result(column="name",property="name"),
			@Result(column="notes",property="notes"),
			@Result(column="tel",property="tel")
    })
    public List<Factory> findFactoryByName(String name);
    
    /**
     * 通过工厂id查询工厂
     * @param id
     * @return
     */
    @Select("select * from cx_factory where id=#{id} and delete_state=0")
    @Results(value={
    		@Result(id=true,column="id",property="id"),
			@Result(column="add_time",property="addTime"),
			@Result(column="edit_time",property="editTime"),
			@Result(column="address",property="address"),
			@Result(column="name",property="name"),
			@Result(column="notes",property="notes"),
			@Result(column="tel",property="tel")
    })
    public Factory findFactoryById(@Param("id") long id);
    
    /**
     * 增加工厂
     * @param name
     * @param address
     * @param tel
     * @param notes
     * @param addUserId
     */
    @Insert("insert into cx_factory values(default,now(),#{addUserId},0,null,null,#{address},#{name},#{notes},#{tel})")
    public void insertFactory(@Param("name") String name,@Param("address") String address,@Param("tel") String tel,@Param("notes") String notes,@Param("addUserId") Long addUserId);
    
    /**
     * 修改工厂
     * @param name
     * @param address
     * @param tel
     * @param notes
     * @param addUserId
     * @param factoryId
     */
    @Update("update cx_factory set name=#{name},address=#{address},tel=#{tel},notes=#{notes},edit_id=#{addUserId},edit_time=now()  where id=#{factoryId}")
    public void updateFactory(@Param("name") String name,@Param("address") String address,@Param("tel") String tel,@Param("notes") String notes,@Param("addUserId") Long addUserId,@Param("factoryId") long factoryId);
    
    /**
     * 删除工厂:修改删除状态
     * @param factoryId
     */
    @Update("update cx_factory set delete_state=1 where id=#{factoryId}")
    public void delFactory(@Param("factoryId") long factoryId);
}