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
    <title>供应商管理</title>
    <!-- Bootstrap core CSS -->
   	<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/src/main.css" rel="stylesheet"/>
    <link rel="stylesheet" href="js/vendor/datatables/dataTables.bootstrap.css"></link>
    <link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
    <link rel="stylesheet"	href="css/src/use_data_table_css.css"></link>
    <link href="bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
    
    
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/vendor/jquery.min.js"></script>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/common.js"></script>
    
	<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
	<script src="js/vendor/bootstrap/bootstrap.min.js"></script>
	<script src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

	<script src="js/vendor/jquery-validation/jquery.validate.min.js"></script>	
	<script src="js/vendor/jquery-validation/messages_zh.js"></script>	
	<script src="bootstrap/js/bootstrap-table.min.js"></script>
    <script src="bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	 <script src="layer/layer.js"></script>
	<script src="js/base.js"></script>
	
    
    
<script type="text/javascript" src="js/user/user1.js">

</script>
    
</head>

<body>
             <div class="search">
                <form class="form-inline" id="searchForm">
                    <div class="form-group">
                        <label for="">用户名称：</label>
                        <input type="text" class="form-control" id="serUserName" name = "serUserName" placeholder=""></input>
                    </div>
                    <div class="form-group">
                        <label for="">所属工厂：</label>
                        <!-- <input type="text" class="form-control" id="serFactoryName" name = "serFactoryName" placeholder=""></input> -->
                        
                        <select class="form-control" id="serFactoryName" name = "serFactoryName">
                        </select>
                        
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" onclick="search()">查询</button>
                    </div>
                </form>
            </div>
            <div class="toolbar">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".myModal" id = "create_user_btn_id" style="display: none;">创建单位</button>
                <button type="button" class="btn btn-primary" id = "create_user_btn_id_value" onclick="create()">创建用户</button>
            </div> 
            
            <div class="main">
                
                <table id="supplierList">
                    
                </table>
            </div>
            
               <!-- 模态框（Modal） -->
     <!-- 增加用户 -->
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					添加用户
				</h4>
			</div>
			<form action="userController/insertUser" method="post">
			<div class="modal-body">
			     <table class="table">
			     
			        <tr>
			            <td>邮箱：</td>
			            <td><input type="text" id="email" name="email" class="form-control"></td>
			        </tr>
			         <tr>
			            <td>用户名：</td>
			            <td><input type="text" id="userName" name="userName" class="form-control"></td>
			       </tr>
			        <tr>
			            <td>密码：</td>
			            <td><input type="text" id="loginPwd" name="loginPwd" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>真实名字：</td>
			            <td><input type="text" id="realName" name="realName" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" id="notes" name="notes" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>性别：</td>
			            <td>
			               <input type="radio" name="sex" value="0" >男
			               <input type="radio" name="sex" value="1" >女
			            </td>
			       </tr>
			       <tr>
			            <td>电话：</td>
			            <td><input type="text" id="tel" name="tel" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>所属工厂：</td>
			            <td>
			               <select class="form-control" id="factoryId" name = "factoryId" class="form-control">
			               
			               </select>
			            </td>
			       </tr>
			     </table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="submit" class="btn btn-primary" >
					提交
				</button>
			</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>



    <!-- 修改-->
<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					修改用户
				</h4>
			</div>
			<form action="userController/updateUser" method="post">
			<div class="modal-body">
			     <table class="table">
			     <tr>
			            <td>编号：</td>
			            <td><input type="text" id="id1" name="id" readonly="readonly" class="form-control"></td>
			        </tr>
			        <tr>
			            <td>邮箱：</td>
			            <td><input type="text" id="email1" name="email" class="form-control"></td>
			        </tr>
			         <tr>
			            <td>用户名：</td>
			            <td><input type="text" id="userName1" name="userName" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>真实名字：</td>
			            <td><input type="text" id="realName1" name="realName" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" id="notes1" name="notes" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>性别：</td>
			            <td class="form-control">
			               <input type="radio" id="sex1" name="sex" value="0">男
			               <input type="radio"  id="sex2" name="sex" value="1">女
			            </td>
			       </tr>
			       <tr>
			            <td>电话：</td>
			            <td><input type="text" id="tel1" name="tel" class="form-control"></td>
			       </tr>
			       <tr>
			            <td>所属工厂：</td>
			            <td>
			               <select class="form-control" id="factoryId1" name = "factoryId" class="form-control">
			               
			               </select>
			            </td>
			       </tr>
			     </table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="submit" class="btn btn-primary" >
					提交
				</button>
			</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
        
</body>

</html>