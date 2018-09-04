<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<base href="<%=basePath%>">
<meta charset="utf-8" />

<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<link rel="icon" href="images/sim.ico" />
<title>角色管理</title>
<!-- Bootstrap core CSS -->
<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet" />
<link href="css/src/main.css" rel="stylesheet" />
<link rel="stylesheet"
	href="js/vendor/datatables/dataTables.bootstrap.css"></link>
<link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
<link rel="stylesheet" href="css/src/use_data_table_css.css"></link>
<link href="bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
<link rel="stylesheet"
	href="plugins/ztree/css/zTreeStyle/zTreeStyle.css" />
<!-- <script src="https://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js"></script> -->
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
<!-- <script type="text/javascript"
	src="plugins/ztree/js/jquery-1.4.4.min.js"></script> -->
<script type="text/javascript"
	src="plugins/ztree/js/jquery.ztree.core.min.js"></script>
<script type="text/javascript"
	src="plugins/ztree/js/jquery.ztree.excheck.min.js"></script>
<script type="text/javascript" src="plugins/ztree/js/json2.js"></script>


<script type="text/javascript">
	$(function() {

		$('#roleList').bootstrapTable({
			contentType : "application/x-www-form-urlencoded",//必须要有！！！！
			url : "role/findRoleByParam",//要请求数据的文件路径
			/* height:tableHeight(),//高度调整 */
			/* toolbar: '#toolbar',//指定工具栏 */
			striped : true, //是否显示行间隔色
			dataField : "res",//bootstrap table 可以前端分页也可以后端分页，这里
			//我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的  
			//rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
			pageNumber : 1, //初始化加载第一页，默认第一页
			pagination : false,//是否分页
			// queryParamsType:'limit',//查询参数组织方式
			queryParams : queryParams, //请求服务器时所传的参数
			sidePagination : 'server',//指定服务器端分页
			pageSize : 3,//单页记录数
			pageList : [ 5, 10, 20 ],//分页步进值
			showRefresh : true,//刷新按钮 
			showToggle : true,
			detailView : false,
			idField : "proNo",
			clickToSelect : true,//是否启用点击选中行
			toolbarAlign : 'left',//工具栏对齐方式
			buttonsAlign : 'right',//按钮对齐方式
			undefinedText : "-",
			/* toolbar:'#toolbar',//指定工作栏 */
			columns : [

			{
				title : '编号',
				field : 'id',
			}, {
				title : '角色名',
				field : 'roleName',
			}, {
				title : '添加人',
				field : 'addUserId',
			}, {
				title : '添加时间',
				field : 'addTime',
			}, {
				title : '编辑人',
				field : 'editId'
			}, {
				title : '编辑时间',
				field : 'editTime'
			}, {
				title : '备注',
				field : 'notes'
			}, {
				title : '操作',
				field : '',
				formatter : operateFormatter,
				events : operateEvents
			} ],
			locale : 'zh-CN',//中文支持,
			responseHandler : function(res) {
				//在ajax获取到数据，渲染表格之前，修改数据源
				console.log(res);
				return res;
			}
		});
		//请求服务数据时所传参数
		function queryParams(params) {
			var searchObj = $('#searchForm').serialize();
			/* var searchstr=JSON.stringify(searchObj); */
			return {
				//每页多少条数据
				pageSize : params.limit,
				//请求第几页
				pageIndex : params.offset,
				//reqInfos:searchObj,
				//operate:"searchList",
				roleName : $("#serRoleName").val(),
			// factoryId:$("#serFactoryName").val()
			}
		}
	});

	//条件查询方法
	function search() {

		$('#roleList').bootstrapTable('refresh', {

			url : 'role/findRoleByParam'

		});
	}

	//表格中增加按钮
	function operateFormatter(value, row, index) {
		return [
				'<button type="button" class="update btn btn-warning  btn-sm" name="updateuser">修改</button>&nbsp;&nbsp;',
				'<button type="button" class="del btn btn-danger  btn-sm" name="deluser">删除</button>',
				'<button type="button" class="addMenu btn btn-primary  btn-sm" name="addMenu">权限管理</button>', ]
				.join('');
	};
	//注册按钮的点击事件
	window.operateEvents = {
		'click .update' : function(e, value, row, index) {
			//console.log(row);
			$.ajax({
				type : "POST",
				url : "role/findRoleByPrimaryKey?id=" + row.id,
				dataType : "json",
				success : function(dt) {
					console.log(dt);
					var projectInfo = dt.t;
					// console.log(projectInfo.projectName);
					$("#id1").val(projectInfo.id);
					$("#roleName1").val(projectInfo.roleName);
					$("#notes1").val(projectInfo.notes);
					$("#editTime1").val(projectInfo.editTime);
					$("#myModal2").modal("show");
				}
			});
		},
		'click .del' : function(e, value, row, index) {
			layer
					.msg(
							'确定要删除客户信息吗？',
							{
								time : 0, //不自动关闭
								btn : [ '确定删除', '取消' ],
								yes : function(index) {
									layer.close(index);
									$
											.ajax({
												type : "POST",
												url : "role/updateDelState?id="
														+ row.id,
												dataType : "json",
												success : function(result) {
													if (result == 1) {
														layer
																.msg(
																		'<span style="font-size: 25px;">成功删除客户</span>',
																		{
																			area : [
																					'300px',
																					'60px' ]
																		});
													}
													$('#roleList')
															.bootstrapTable(
																	'refresh',
																	{
																		url : 'role/findRoleByParam'
																	});
												}
											});
								}
							})
		},

		'click .addMenu' : function(e, value, row, index) {
			
			var setting = {
					check : {
						enable : true
					},
					data : {
						simpleData : {
							enable : true
						}
					}
				};
				var zNodes;
				$(function() {
					$.ajax({
						type : "POST",
						url : "role/findMenu?roleId="+row.id,
						dataType : "json",
						async : false,
						success : function(dt) {
							zNodes = dt.t;
							console.log(zNodes);
						}
					});
				});
				$(document).ready(function() {
					$.fn.zTree.init($("#menuTree"), setting, zNodes);
				});
			//$("#myModal1").modal("show");
			$("#myModal3").modal("show");
			
			$("#btnSavaRoles").click(function(){
				var ids = '';
				var zTree = $.fn.zTree.getZTreeObj("menuTree");
				//[{},{}]
				var ns = zTree.getCheckedNodes(true)
				console.log(ns);
				for(var i=0;i<ns.length;i++){
					if(i==ns.length-1){
					ids += ns[i].id;}
					else{
						ids += ns[i].id+",";
					}
				}
				//var ids=ids.split(',');
				// for(var i=0;i<ids.length;i++){
					//var id=ids[i];
					//alert(id+"<<<<<<<<<  i");
					//alert(row.id+">>>>>>>>>>>>>>>>>>>");
					$.ajax({
						type : "POST",
						url : "role/addMenuForRole?ids="+ids,
						data : {
							"roleId" : row.id
						},
						dataType : "json",
						async : false,
						success : function(dt) {
							/* zNodes = dt.t;
							console.log(zNodes); */
							$("#myModal3").modal("hide");
						}
					});
				//}
				 
			}); 
		}
	};

function create(){
	$("#myModal1").modal("show");
}
		
</script>

</head>

<body>
	<div class="search">
		<form class="form-inline" id="searchForm">
			<div class="form-group">
				<label for="">角色名称：</label> <input type="text" class="form-control"
					id="serRoleName" name="serRoleName" placeholder=""></input>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary" onclick="search()">查询</button>
			</div>
		</form>
	</div>
	<div class="toolbar">
		<button type="button" class="btn btn-primary" data-toggle="modal"
			data-target=".myModal" id="create_user_btn_id" style="display: none;">创建单位</button>
		<button type="button" class="btn btn-primary"
			id="create_user_btn_id_value" onclick="create()">创建角色</button>
	</div>

	<div class="main">

		<table id="roleList">

		</table>
	</div>

	<!-- 模态框（Modal） -->
	<!-- 增加用户 -->
	<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">添加角色</h4>
				</div>
				<form action="role/insertRole" method="post">
					<div class="modal-body">
						<table class="table">

							<tr>
								<td>角色名：</td>
								<td><input type="text" id="roleName" name="roleName"
									class="form-control"></td>
							</tr>
							<tr>
								<td>备注：</td>
								<td><input type="text" id="notes" name="notes"
									class="form-control"></td>
							</tr>
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="submit" class="btn btn-primary">提交</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>



	<!-- 修改-->
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">修改用户</h4>
				</div>
				<form action="role/updateRole" method="post">
					<div class="modal-body">
						<table class="table">
							<tr>
								<td>编号：</td>
								<td><input type="text" id="id1" name="id"
									readonly="readonly" class="form-control"></td>
							</tr>

							<tr>
								<td>角色名：</td>
								<td><input type="text" id="roleName1" name="roleName"
									class="form-control"></td>
							</tr>
							<tr>
								<td>备注：</td>
								<td><input type="text" id="notes1" name="notes"
									class="form-control"></td>
							</tr>
							<tr>
								<td>更新时间：</td>
								<td><input type="text" id="editTime1" name="editTime"
									class="form-control" readonly="readonly"></td>
							</tr>
						</table>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="submit" class="btn btn-primary">提交</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>


	<!-- 菜单管理-->
	<div class="modal fade" id="myModal3" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">修改用户</h4>
				</div>
				<!-- <form action="role/addMenuForRole" method="post"> -->
				
					<div id="menuTree" class="ztree" >
					<input type="text" name="id" >
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" id="btnSavaRoles" class="btn btn-primary">提交</button>
					</div>
				
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</body>
<script>
/* $(function(){
		  $("#btnSavaRoles").click(function(){
			 $(this)
			var ids = '';
			var zTree = $.fn.zTree.getZTreeObj("menuTree");
			//[{},{}]
			var ns = zTree.getCheckedNodes(true)
			console.log(ns);
			for(var i=0;i<ns.length;i++){
				if(i==ns.length-1){
				ids += ns[i].id;}
				else{
					ids += ns[i].id+",";
				}
			}
			var ids=ids.split(',');
			 for(var i=0;i<ids.length;i++){
				var id=ids[i];
				alert(row.id+">>>>>>>>>>>>>>>>>>>");
				$.ajax({
					type : "POST",
					url : "role/updateRoleMenu?roleId="+row.id,
					dataType : "json",
					async : false,
					success : function(dt) {
						zNodes = dt.t;
						console.log(zNodes);
					}
				}); 
			}
		}); 
	}) */
</script>
</html>
