<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<link rel="icon" href="images/sim.ico" />
<title>菜单管理</title>
<!-- Bootstrap core CSS -->
<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet" />
<link href="css/src/main.css" rel="stylesheet" />
<link rel="stylesheet"
	href="js/vendor/datatables/dataTables.bootstrap.css"></link>
<link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
<link rel="stylesheet" href="css/src/use_data_table_css.css"></link>
<link href="css/vendor/select2.css" rel="stylesheet" />
<link rel="stylesheet"
	href="js/vendor/JQuery_zTree_v3.4/css/zTreeStyle/zTreeStyle.css"
	type="text/css" />
<link href="css/src/menu/menu.css" rel="stylesheet" />
<!--  <script type="text/javascript">
			var ctx = '${ctx}';
		</script> -->
<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="js/vendor/jquery.min.js"></script>
<script src="js/common.js"></script>

<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
<script src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

<!-- <script src="js/vendor/JQuery_zTree_v3.4/js/jquery-migrate-1.2.1.js"></script> -->

<script
	src="js/vendor/JQuery_zTree_v3.4/js/jquery.ztree.core-3.4.min.js"></script>

<script src="js/vendor/jquery-validation/jquery.validate.min.js"></script>
<script src="js/vendor/jquery-validation/messages_zh.js"></script>
<!-- <script type="text/javascript" src="js/menu/menu.js"></script> -->
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/menu/menu1.js"></script>
<!-- <script src="js/base.js"></script>
<script src="js/select2.js"></script>
 -->
<!-- <script src="js/menu/menu.js"></script> -->
<!-- Custom styles for this template -->
</head>
<title>菜单管理</title>
</head>
<body>
	<div class="search">
		<form class="form-inline">
			<div class="form-group">
				<label for="">菜单名称：</label> <input type="text" class="form-control"
					id="serUnitName" name="serUnitName" placeholder=""></input>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary" onclick="search()">查询</button>
			</div>
		</form>
	</div>
	<div class="toolbar">
		<button type="button" class="btn btn-primary" data-toggle="modal"
			data-target=".myModal" id="create_menu_btn_id" style="display: none;">创建单位</button>
		<button type="button" class="btn btn-primary"
			id="create_menu_btn_id_value" onclick="create()">创建菜单</button>
	</div>
	<div class="main">
		<table id="menuListDate"
			class="table table-responsive table-bordered table-striped table-hover table-condensed">
			<tr>
				<th>编号</th>
				<th>菜单名称</th>
				<th>父菜单</th>
				<th>url</th>
				<th>备注说明</th>
				<th>排序</th>
				<th>创建时间</th>
				<th>更新时间</th>
				<th>操作</th>
			</tr>
			<c:forEach items="${menu }" var="item">
				<tr>
					<td>${item.id }</td>
					<td>${item.menuName }</td>
					<td>${item.parentMenuName }</td>
					<td>${item.menuUrl }</td>
					<td>${item.notes }</td>
					<td>${item.sort }</td>
					<td>${item.addTime.toLocaleString() }</td>
					<td>${item.editTime.toLocaleString() }</td>
					<td>
						<button type="button" class="btn btn-primary"
							onclick="updateModel(this)" value="${item.id }">修改</button>
						<button type="button" class="btn btn-danger" value="${item.id }"
							onclick="deleteModel(this)">删除</button>
					</td>
				</tr>
			</c:forEach>

		</table>
		<!-- <nav class="text-r">
                    <ul class="pagination">
                        <li>
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li>
                            <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav> -->
	</div>

	<!-- 增加的模态框 -->
	<div class="modal fade myModal" role="dialog" name="addModel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">创建菜单</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="_save_menu_form"
						action="menu/insertMenu" method="post">
						<input type="hidden" name="id" id="id" value="" /> <input
							type="hidden" name="deleteState" id="deleteState" value="0" />
						<div class="form-group">
							<label class="col-sm-2 control-label">菜单名称：</label>
							<div class="col-sm-10">

								<input type="text" class="form-control" id="menuName"
									name="menuName" placeholder="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">url：</label>
							<div class="col-sm-10">

								<input type="text" class="form-control" id="menuUrl"
									name="menuUrl" placeholder="" />

							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">父类菜单：</label>
							<div class="col-sm-10">
								<select id="select2">
									<option value="-1">请选择</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">排序：</label>
							<div class="col-sm-10">

								<input type="text" class="form-control" id="sort" name="sort"
									placeholder="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">备注：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="note" name="notes"
									placeholder="" />
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-info" data-dismiss="modal"
						id="saveDateCloss">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="saveDateMsg()">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal</div> -->

	<!-- 修改 -->
	<div class="modal fade myModal" role="dialog" name="updateModel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改菜单</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="_update_menu_form"
						action="menu/updateMenu" method="post">
						<div class="form-group">
							<label class="col-sm-2 control-label">菜单编号：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="id1" name="id1"
									placeholder="" readonly="readonly" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">菜单名称：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="menuName1"
									name="menuName1" placeholder="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">url：</label>
							<div class="col-sm-10">

								<input type="text" class="form-control" id="menuUrl1"
									name="menuUrl1" placeholder="" />

							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">父类菜单：</label>
							<div class="col-sm-10">
								<select id="select1" name="parentId1">
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">排序：</label>
							<div class="col-sm-10">

								<input type="text" class="form-control" id="sort1" name="sort1"
									placeholder="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">备注：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="notes1"
									name="notes1" placeholder="" />
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-info" data-dismiss="modal"
						id="saveDateCloss">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="saveUpdateMsg()">保存</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>



	<!-- 删除 -->
	<div class="modal fade myModal" role="dialog" name="deleteModel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">删除菜单</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<h2 class="modal-title" align="center">确认删除吗？</h2>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-info" data-dismiss="modal"
						id="saveDateCloss">关闭</button>
					<button type="button" class="btn btn-primary" id="saveDeleteMsg">确认</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</body>

</html>