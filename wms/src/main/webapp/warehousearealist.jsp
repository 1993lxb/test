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
<meta charset="utf-8" />

<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<link rel="icon" href="images/sim.ico" />
<title>区域管理</title>
<!-- Bootstrap core CSS -->
<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet" />
<link href="css/src/main.css" rel="stylesheet" />
<link rel="stylesheet"
	href="js/vendor/datatables/dataTables.bootstrap.css"></link>
<link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
<link rel="stylesheet" href="css/src/use_data_table_css.css"></link>
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


<script type="text/javascript">
	//生成用户数据
	$(function() {
		$('#warehousearealist').bootstrapTable({
			method : 'post',
			contentType : "application/x-www-form-urlencoded",//必须要有！！！！
			url : "warehousearea/findWarehouseareaByParam",//要请求数据的文件路径
			toolbar : '#toolbar',//指定工作栏
			height : 360,
			cache : false,
			search : false,
			undefinedText : "-",
			striped : true, //是否显示行间隔色
			dataField : "whs",//bootstrap table 可以前端分页也可以后端分页，这里
			//我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的  
			//rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
			pagination : true,//是否分页
			queryParamsType : 'limit',//查询参数组织方式
			queryParams : queryParams,//请求服务器时所传的参数
			sidePagination : 'server',//指定服务器端分页
			pageNumber : 1,
			pageSize : 2,//单页记录数
			pageList : [ 1, 2 ],//分页步进值
			showRefresh : true,//刷新按钮
			showColumns : false,
			showToggle : true,
			clickToSelect : true,//是否启用点击选中行
			cardView : false, //是否显示详细视图
			detailView : false, //是否显示父子表
			sortable : true, //是否启用排序
			toolbarAlign : 'left',//工具栏对齐方式
			buttonsAlign : 'right',//按钮对齐方式
			idField : "id",
			columns : [ {
				title : '编号',
				field : 'id',
				align : 'center',
				width : '50',
			}, {
				title : '区域名称',
				field : 'name',
				align : 'center',
				width : '50',
			}, {
				title : '所属工厂',
				field : 'factoryName',
				align : 'center',
				width : '50',
			}, {
				title : '所属仓库',
				field : 'warehouseName',
				align : 'center',
				width : '70',
			}, {
				title : '创建时间',
				field : 'addTime',
				align : 'center',
				width : '70',
			}, {
				title : '更新时间',
				field : 'editTime',
				align : 'center',
				width : '70',
			}, {
				title : '操作',
				field : '',
				width : '70',
				formatter : operateFormatter,
			  events : operateEvents  
			} ],
			locale : 'zh-CN',//中文支持,
			responseHandler : function(res) {
				console.log(res);
				return res;
			}
		})
		//三个参数，value代表该列的值
		/* 	function operateFormatter(value, row, index) {
				if (value == 2) {
					return '<i class="fa fa-lock" style="color:red"></i>'
				} else if (value == 1) {
					return '<i class="fa fa-unlock" style="color:green"></i>'
				} else {
					return '数据错误'
				}
			} */

		//请求服务数据时所传参数
		function queryParams(params) {
			return {
				//每页多少条数据
				pageSize : params.limit,
				//请求第几页
				pageNumber : params.offset,

				name : $("#search_warehouseareaName").val(),

			}
		}

	});
	//查询按钮事件
	function searchwarehousearea() {
		$('#warehousearealist').bootstrapTable('refresh', {
			url : 'warehousearea/findWarehouseareaByParam'
		});
	}
	//表格中增加按钮
	function operateFormatter(value, row, index) {
		return [
				'<button type="button" class="update btn btn-warning  btn-sm" name="updatewarehousearea">修改</button>&nbsp;&nbsp;',
				'<button type="button" class="del btn btn-danger  btn-sm" name="delwarehousearea">删除</button>', ]
				.join('');
	};

	//下拉框赋值
	$(function() {
		$.ajax({
			type : "POST",
			url : "warehouse/findwarehouse",
			dataType : "json",
			//成功后执行
			success : function(dt) {
				var warehouse = dt.t;
				var addselector = $("#addwarehouse");
				$("#addwarehouse option:not(:first)").remove();
				for (var i = 0; i < warehouse.length; i++) {
					addselector.append('<option value="'+warehouse[i].id+'">'
							+ warehouse[i].name + '</option>');
				}
				var updateselector = $("#updatewarehouse");
				$("#updatewarehouse option:not(:first)").remove();
				for (var i = 0; i < warehouse.length; i++) {
					updateselector.append('<option value="'+warehouse[i].id+'">'
							+ warehouse[i].name + '</option>');
				}
			},
		});
	});

	$(function() {
		$("#btn_add_warehousearea").click(function() {
			$("#addwarehousearea").modal("show");
		})

		$("#btn_add_submit")
				.bind(
						"click",
						function() {
							$("#addwarehousearea").modal("hide");
							$
									.ajax({
										type : "POST",
										url : "warehousearea/addWarehousearea",
										data : $("#addform").serialize(),
										dataType : "json",
										//成功后执行
										success : function(dt) {
											if (dt == 1) {
												layer
														.msg(
																'<span style="font-size: 25px;">成功添加区域</span>',
																{
																	area : [
																			'300px',
																			'50px' ]
																}, {
																	time : 1000
																});
											} else {
												layer
														.msg(
																'<span style="font-size: 25px;">添加失败</span>',
																{
																	area : [
																			'300px',
																			'50px' ]
																}, {
																	time : 1000
																});
											}
											$('#warehousearealist')
													.bootstrapTable(
															'refresh',
															{
																url : 'warehousearea/findWarehouseareaByParam'
															});
										},
									});
						});
	})

	//注册按钮的点击事件
	window.operateEvents = {
		 'click .update' : function(e, value, row, index) {
			$.ajax({
				type : "POST",
				url : "warehousearea/findwarehouseareaById?id=" + row.id,
				dataType : "json",
				success : function(dt) {
					console.log(dt);
					$("#updateid").val(dt.id);
					$("#updatename").val(dt.name);
					$("#updatewarehouse").val(dt.warehouseId);
					$("#updatenotes").val(dt.notes);
					$("#updatetime").val(dt.editTime);
					console.log(dt.editTime);
					$("#updatewarehousearea").modal("show"); 
				},
			
			});
		}, 
		'click .del' : function(e, value, row, index) {
			layer
					.msg(
							'确定要区域信息吗？',
							{
								time : 0, //不自动关闭
								btn : [ '确定删除', '取消' ],
								yes : function(index) {
									layer.close(index);
									$
											.ajax({
												type : "POST",
												url : "warehousearea/delwarehousearea?id="
														+ row.id,
												dataType : "json",
												success : function(result) {
													if (result == 1) {
														layer
																.msg(
																		'<span style="font-size: 25px;">成功删除区域</span>',
																		{
																			area : [
																					'300px',
																					'60px' ]
																		});
													}
													$('#warehousearealist')
													.bootstrapTable(
															'refresh',
															{
																url : 'warehousearea/findWarehouseareaByParam'
															});
												}
											});
								}
							})
		},
	};
	
	$(function() {
		$("#btn_update_submit")
				.bind(
						"click",
						function() {
							$("#updatewarehousearea").modal("hide");
							$.ajax({
										type : "POST",
										url : "warehousearea/updateWarehousearea",
										data : $("#updateform").serialize(),
										dataType : "json",
										//成功后执行
										success : function(dt) {
											if (dt == 1) {
												layer
														.msg(
																'<span style="font-size: 25px;">成功修改区域</span>',
																{
																	area : [
																			'300px',
																			'50px' ]
																}, {
																	time : 1000
																});
											} else {
												layer
														.msg(
																'<span style="font-size: 25px;">修改失败</span>',
																{
																	area : [
																			'300px',
																			'50px' ]
																}, {
																	time : 1000
																});
											}
											$('#warehousearealist')
													.bootstrapTable(
															'refresh',
															{
																url : 'warehousearea/findWarehouseareaByParam'
															});
										},
									});
						});
	})
</script>

</head>

<body>
	<div class="panel-body" style="padding-bottom: 0px;">
		<div class="panel panel-default">
			<div class="panel-heading">查询条件</div>
			<div class="panel-body">
				<form id="formSearch" class="form-horizontal">
					<div class="form-group" style="margin-top: 15px">
						<label class="control-label col-sm-1" for="txt_search_name">区域名称</label>
						<div class="col-sm-3">
							<input type="text" class="form-control"
								id="search_warehouseareaName">
						</div>
						<div class="col-sm-4" style="text-align: left;">
							<button type="button" style="margin-left: 50px" id="btn_query"
								onclick="searchwarehousearea()" class="btn btn-primary">查询</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<br>
		<div class="toolbar">
			<button type="button" class="btn btn-primary"
				id="btn_add_warehousearea">新建区域</button>
		</div>
		<div>
			<table id='warehousearealist' style="height: 100px; width: 100%">
			</table>
		</div>

	</div>

	<!-- 模态框（Modal） -->
	<!-- 创建区域 -->
	<div class="modal fade" role="dialog" id="addwarehousearea">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">创建区域</h4>
				</div>
				<div class="modal-body">
					<form action="" method="post" id="addform">
						<div class="form-group">
							<label class="col-sm-2 control-label">区域名称：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="addname" name="name"
									placeholder="区域名称" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">所属仓库：</label>
							<div class="col-sm-10">
								<select id="addwarehouse" name="warehouseId"
									class="form-control">
									<option value="-1" name="warehouseName">---请选择---</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">备注：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="addnotes"
									name="notes" placeholder="备注">
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-info" data-dismiss="modal"
								id="close_btn">关闭</button>
							<button id="btn_add_submit" type="button" class="btn btn-primary">提交</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- 模态框（Modal） -->
	<!-- 修改区域 -->
	<div class="modal fade" role="dialog" id="updatewarehousearea">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改区域</h4>
				</div>
				<div class="modal-body">
					<form action="" method="post" id="updateform">
						<div class="form-group">
							<label class="col-sm-2 control-label">区域名称：</label>
							<div class="col-sm-10">
								<input type="hidden" class="form-control" id="updateid"
									name="id" /> <input type="text"
									class="form-control" id="updatename" name="name"
									placeholder="区域名称" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">所属仓库：</label>
							<div class="col-sm-10">
								<select id="updatewarehouse" name="warehouseId"
									class="form-control">
									<option value="-1" name="warehouseName">---请选择---</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">备注：</label>
							<div class="col-sm-10">
						 	 <input type="hidden" class="form-control"
									id="updatetime" name="editTime" />  
								<input type="text" class="form-control" id="updatenotes"
									name="notes" placeholder="备注">
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-info" data-dismiss="modal"
								id="close_btn">关闭</button>
							<button id="btn_update_submit" type="button"
								class="btn btn-primary">提交</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


</body>

</html>