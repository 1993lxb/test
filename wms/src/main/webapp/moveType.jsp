<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<base href="<%=basePath%>">
<meta charset="utf-8"/>

    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <link rel="icon" href="images/sim.ico" />
    <title>移库类型</title>
    <!-- Bootstrap core CSS -->
   	<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/src/main.css" rel="stylesheet"/>
    <link rel="stylesheet" href="js/vendor/datatables/dataTables.bootstrap.css"></link>
    <link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
    <link rel="stylesheet"	href="css/src/use_data_table_css.css"></link>
   
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
    <!-- <script src="js/vendor/jquery.min.js"></script> -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/common.js"></script>
    
	<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
	<script src="js/vendor/bootstrap/bootstrap.min.js"></script>
	<script src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

	<script src="js/vendor/jquery-validation/jquery.validate.min.js"></script>	
	<script src="js/vendor/jquery-validation/messages_zh.js"></script>
   
	
	<script src="js/base.js"></script>
    
    
<script type="text/javascript">
function myfun(){
	var name=$("#serMoveTypeName").val();
	$.ajax({
		 url:'moveType/findAllMoveType',
		 async: false,
		 type:'POST',
		 dataType:'json',
		 data:{"name":name},
	     success:function(dt){
	    	  var $m=dt.t;
	    	  $("#moveTypeList tr").remove();
	    	  var html="<tr><th>编号</th><th>创建时间</th><th>创建人</th><th>更新人</th><th>更新时间</th><th>名称</th><th>备注</th><th>操作</th></tr>";
	    	   for(var i=0;i<$m.length;i++){
	    		   if($m[i].editId==null || $m[i].editId==""){
	    			   $m[i].editId="";
	    		   }
	    		   if($m[i].editTime==null || $m[i].editTime==""){
	    			   $m[i].editTime="";
	    		   }
	    		  html+="<tr><td>"
	    		       +$m[i].id
	    		       +"</td><td>"
	    		       +$m[i].addTime
	    		       +"</td><td>"
	    		       +$m[i].addUserId
	    		       +"</td><td>"
	    		       +$m[i].editId
	    		       +"</td><td>"
	    		       +$m[i].editTime
	    		       +"</td><td>"
	    		       +$m[i].name
	    		       +"</td><td>"
	    		       +$m[i].notes
	    		       +"</td><td>"
	    		       +"<button type='button' value='"+$m[i].id+"' name='buttonDelUnit' class='btn btn-danger' onclick='del(this)' >删除</button>"
                       +"&nbsp<button type='button' value='"+$m[i].id+"' class='btn btn-primary' onclick='update(this)'>修改</button>"
	    		       +"</td></tr>"
	    	  } 
	    	  $("#moveTypeList").append(html);
	     },
	     error:function(dt){
		    console.log(dt);
	     }
	});
}

window.onload=myfun;

//插入移动类型
$(function(){
	$("#add").on("click",function(){
		$("#myModal").modal("show");
	});
});

//删除移动类型
function del(op){
	$("#myModalDel").modal("show");
	var mid=op.value;
	$("[name=modelDelMoveType]").val(mid);
	$("[name=modelDelMoveType]").on("click",function(){
		window.location="moveType/delMoveType?id="+$(this).val();
	});
}
//修改移动类型
function update(op){
    	var id=op.value;
    	$.ajax({
			 url:'moveType/findMoveTypeById',
			 async: false,
			 type:'POST',
			 dataType:'json',
			 data:{"id":id},
			 success:function(dt){
				 console.log(dt);
				 var $m=dt.t;
				 $("#updateId").val($m.id);
				 $("#updateEditTime").val($m.editTime);
				 $("#updateName").val($m.name);
				 $("#updateNotes").val($m.notes);
				 $("#myModalUpdate").modal("show");
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
                <form class="form-inline" id="searchForm">
                    
                    <div class="form-group">
                        <label for="">移库名称：</label>
                        <input type="text" class="form-control" id="serMoveTypeName" name = "serMoveTypeName" ></input>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" id="searchByName" onclick="myfun()">查询</button>
                    </div>
                    
                </form>
            </div>
            </br>
            <div class="toolbar">
                <button type="button" class="btn btn-primary" id = "add" >创建移库类型</button>
            </div> 
            
            <div class="main">
                
                <table id="moveTypeList" class="table table-hover">
                    
                </table>
            </div>
   <!-- 模态框（Modal） -->
     <!-- 增加移库类型 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					增加移库类型
				</h4>
			</div>
			<form action="moveType/insertMoveType">
			<div class="modal-body">
			     <table class="table">
			       <tr>
			            <td>名字：</td>
			            <td><input type="text" class="form-control" id="moveTypeName" name="name"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" class="form-control" id="moveTypeNotes" name="notes"></td>
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

 <!-- 修改-->
<div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					修改移动类型
				</h4>
			</div>
			<form action="moveType/updateMoveTypeById">
			<div class="modal-body">
			     <table class="table">
			       
			       <tr>
			            <td>名字：</td>
			            <td><input type="text" class="form-control" id="updateName" name="name"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" class="form-control" id="updateNotes" name="notes">
			            <input type="hidden" id="updateId" name="id">
			            <input type="hidden" id="updateEditTime" name="editTime">
			            </td>
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
				<button type="button" class="btn btn-primary" name="modelDelMoveType">
					删除
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>

</html>