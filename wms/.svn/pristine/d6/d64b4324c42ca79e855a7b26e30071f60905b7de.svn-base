<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath() + "/";
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <link rel="icon" href="images/sim.ico"/>
    <title>物料单位管理</title>
    <!-- Bootstrap core CSS -->
    <link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/src/main.css" rel="stylesheet"/>
    <link rel="stylesheet"
	href="js/vendor/datatables/dataTables.bootstrap.css"></link>
    <link rel="stylesheet"
	href="js/vendor/datatables/jquery.dataTables.css"></link>
    <link rel="stylesheet"	href="css/src/use_data_table_css.css"></link>
	
   
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>	
    <script src="js/vendor/jquery.min.js"></script>
    <script src="js/common.js"></script>
    
<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
<script src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

<script src="js/vendor/jquery-validation/jquery.validate.min.js"></script>	
	<script src="js/vendor/jquery-validation/messages_zh.js"></script>	
	
<script src="js/base.js"></script>
<!-- <script src="js/unit/unit.js"></script> -->
    <!-- Custom styles for this template -->
    
<script>
    //查找单位
	$(function(){
		$("#search").on("click",function(){
			 var name=$("#serUnitName").val();
			 if(name==""){
				 window.location="unit/findAll";
			 }else{
			 $.ajax({
				 url:'unit/findUnitsByName',
				 async: false,
				 type:'POST',
				 dataType:'json',
				 data:{"name":name},
			     success:function(dt){
			    	  var $u=dt.t;
			    	  $("#remove111").remove();
			    	  $("#unitListDate tr").remove();
			    	  var html="<tr><th>编号</th><th>单位名称</th><th>创建时间</th><th>更新时间</th><th>操作</th></tr>";
			    	 for(var i=0;i<$u.length;i++){
			    		 
			    		
			    		 html+="<tr><td>"
			    		       +$u[i].id
			    		       +"</td><td>"
			    		       +$u[i].name
			    		       +"</td><td>"
			    		       +$u[i].addTime
			    		       +"</td><td>"
			    		       +$u[i].editTime
			    		       +"</td><td>"
			    		       +"<button type='button' value='"+$u[i].id+"' name='buttonDelUnit' data-toggle='modal' data-target='#myModalDel' class='btn btn-danger' onclick='del(this)' >删除</button>"
		                       +"<button type='button' value='"+$u[i].id+"' class='btn btn-primary' data-toggle='modal' data-target='#myModalUpdate' onclick='update(this)'>修改</button>"
			    		       +"</td></tr>"
			    	 }
			    	 
			    	 $("#unitListDate").append(html); 
			     },
			     error:function(dt){
					console.log(dt);
				}
			 
			 });
			 }
		});
	});
    
    //删除单位
    function del(op){
    	var unitId=op.value;
    	$("[name='modelDelUnit']").val(unitId);
    	$("[name='modelDelUnit']").on("click",function(){
 	    	window.location.href="unit/delUnit?unitId="+$(this).val();
 	    });
    	
    }
    
    //修改单位
    function update(op){
    	var id=op.value;
    	$.ajax({
			 url:'unit/findUnitById',
			 async: false,
			 type:'POST',
			 dataType:'json',
			 data:{"id":id},
			 success:function(dt){
				 var $u=dt.t;
				 $("#updateId").val($u.id);
				 $("#updateName").val($u.name);
				 $("#updateNote").val($u.notes);
				 
			 },
			 error:function(dt){
					console.log(dt);
				}
		});
    }
</script>
</head>
<body>

            <div class="search">
                <form class="form-inline">
                    <div class="form-group">
                        <label for="">单位名称：</label>
                        <input type="text" class="form-control" id="serUnitName" name = "serUnitName" ></input>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" id="search">查询</button>
                    </div>
                </form>
            </div>
            <div class="toolbar">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".myModal" id = "create_unit_btn_id" style="display: none;">创建单位</button>
                <button type="button" class="btn btn-primary" id = "create_unit_btn_id_value" data-toggle="modal" data-target="#myModal">创建单位</button>
            </div>
            <div class="main">
                <table id="unitListDate"  class="table table-hover">
                    <thead id="remove111">
                        <tr id="tdAppend">
                            <th>编号</th>
                            <th>单位名称</th>
                            <th>创建时间</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                        <c:forEach items="${units }" var="item"  >
                        <tr >
                        <td>${item.id }</td>
                        <td>${item.name }</td>
                        <td><fmt:formatDate value="${item.addTime }" type="both" /></td>
                        <td><fmt:formatDate value="${item.editTime }" type="both" /></td>
                        <td>
                        <button type="button" name="buttonDelUnit" value="${item.id }" onclick="del(this)" class="btn btn-danger" data-toggle="modal" data-target="#myModalDel">删除</button>
                        <button type="button" name="buttonUpdateUnit" value="${item.id }" onclick='update(this)' class="btn btn-primary" data-toggle="modal" data-target="#myModalUpdate">修改</button>
                        </td>
                        
                        </tr>
                        </c:forEach>
                    </thead>
                    <tbody>
                    	
                    </tbody>
                </table>
               
            </div>
    
        <!-- 模态框（Modal） -->
        <!-- 增加单位 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					添加单位
				</h4>
			</div>
			<form action="unit/insertUnit">
			<div class="modal-body">
			     <table>
			     
			        <tr>
			            <td>添加人：</td>
			            <td><input type="text" id="userId" name="userId" value="${sessionScope.u.id }"></td>
			        </tr>
			       <tr>
			            <td>删除状态：</td>
			            <td><input type="text" id="deleteId" name="deleteId"></td>
			       </tr>
			       <tr>
			            <td>单位名称：</td>
			            <td><input type="text" id="unitName" name="unitName"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" id="note" name="note"></td>
			       </tr>
			     </table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="submit" class="btn btn-primary">
					提交
				</button>
			</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

 <!-- 模态框（Modal） -->
        <!-- 删除单位 -->
<div class="modal fade" id="myModalDel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabelDel">
					添加单位
				</h4>
			</div>
			<div class="modal-body">
			     确定删除吗？
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="button" class="btn btn-primary" name="modelDelUnit">
					删除
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

 <!-- 模态框（Modal） -->
        <!-- 修改单位 -->
<div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabelUpdate">
					添加单位
				</h4>
			</div>
			<form action="unit/updateUnit">
			<div class="modal-body">
			     <table>
			     
			       <tr>
			            <td></td>
			            <td><input type="hidden" id="updateId" name="updateId"></td>
			       </tr>
			       <tr>
			            <td>单位名称：</td>
			            <td><input type="text" id="updateName" name="updateName"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" id="updateNote" name="updateNote"></td>
			       </tr>
			     </table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="submit" class="btn btn-primary">
					提交
				</button>
			</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>

</html>
