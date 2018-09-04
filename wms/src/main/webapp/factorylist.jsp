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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>首页</title>
<!-- Bootstrap core CSS -->
<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet" />
<link href="css/src/main.css" rel="stylesheet" />
<link rel="stylesheet"
	href="js/vendor/datatables/dataTables.bootstrap.css"></link>
<link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
<link rel="stylesheet" href="css/src/use_data_table_css.css"></link>
<script src="js/vendor/jquery.min.js"></script>
<script src="js/common.js"></script>
<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
<script src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>
<script src="js/vendor/jquery-validation/jquery.validate.min.js"></script>
<script src="js/vendor/jquery-validation/messages_zh.js"></script>
<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- <script src="js/base.js"></script> -->
<!-- <script src="js/factory/factory.js"></script> -->
</head>
<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script>
	//通过工厂名称查询工厂
	function searchfactory(op) {
		//取得用户输入的工厂名
		var name = $("#fName").val();
		$
				.ajax({
					//请求地址
					url : 'factory/findFactoryByName',
					//请求方式
					type : 'POST',
					//返回格式
					dataType : 'json',
					//请求参数
					data : {
						"name" : name
					},
					success : function(dt) {
						//取得json对象
						var $factory = dt.t;
						//移除tbody里面的tr
						$("tbody tr").remove();
						var html = "";
						for (var i = 0; i < $factory.length; i++) {
							if ($factory[i].addTime == null) {
								$factory[i].addTime = "";
							}
							if ($factory[i].editTime == null) {
								$factory[i].editTime = "";
							}
							html += "<tr><td>"
									+ $factory[i].id
									+ "</td><td>"
									+ $factory[i].name
									+ "</td><td>"
									+ $factory[i].address
									+ "</td><td>"
									+ $factory[i].tel
									+ "</td><td>"
									+ $factory[i].notes
									+ "</td><td>"
									+ $factory[i].addTime
									+ "</td><td>"
									+ $factory[i].editTime
									+ "</td><td><button type='button' value='"
									+ $factory[i].id
									+ "' class='btn btn-danger' name='del' onclick='del(this)' class='btn btn-danger' data-toggle='modal' data-target='#delfactory'>删除</button> <button type='button' name='update' value='"
									+ $factory[i].id
									+ "' onclick='update(this)' class='btn btn-primary' data-toggle='modal' data-target='#updatefactory'>修改</button></td><tr>"
						}
						;
						$("tbody").append(html);
					},
					error : function(dt) {
						console.log(dt);
					}
				})
	}

	//删除工厂：修改删除状态
	function del(op) {
		var factoryId = op.value;
		$("[name='del']").val(factoryId);
		$("[name='del']").on(
				"click",
				function() {
					window.location.href = "factory/delfactory?factoryId="
							+ $(this).val();
				});
	}

	//修改工厂
	function update(op) {
		var id = op.value;
		console.log(id);
		$.ajax({
			url : 'factory/findfactorybyid',
			//async. 默认是true，即为异步方式，$.ajax执行后，会继续执行ajax后面的脚本，直到服务器端返回数据后，触发$.ajax里的success方法，这时候执行的是两个线程。若要将其设置为false
			//，则所有的请求均为同步请求，在没有返回值之前，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
			async : false,
			type : 'POST',
			dataType : 'json',
			data : {
				"id" : id
			},
			success : function(dt) {
				var $factory = dt.t;
				$("#updateId").val(id);
				$("#updatename").val($factory.name);
				$("#updatenotes").val($factory.notes);
				$("#updatetel").val($factory.tel);
				$("#updateaddress").val($factory.address);

			},
			error : function(dt) {
				console.log(dt);
			}
		});
	}
</script>
<body>
	<div class="search">
		<form class="form-inline">
			<div class="form-group">
				<label for="">工厂名称：</label> <input type="text" class="form-control"
					id="fName" placeholder="工厂名称" />
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary"
					onclick="searchfactory(this)" id="search">查询</button>
			</div>
		</form>
	</div>
	<div class="toolbar">
		<button type="button" class="btn btn-primary" data-toggle="modal"
			data-target="#addfactory" id="create_btn">创建工厂</button>
	</div>
	<div class="main">
		<table class="table table-hover" id="listTable">
			<thead>
				<tr>
					<th>编号</th>
					<th>工厂名称</th>
					<th>工厂地址</th>
					<th>联系方式</th>
					<th>备注说明</th>
					<th>创建时间</th>
					<th>更新时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${factorys }" var="item">
					<tr>
						<td>${item.id }</td>
						<td>${item.name }</td>
						<td>${item.address}</td>
						<td>${item.tel }</td>
						<td>${item.notes }</td>
						<td>${item.addTime.toLocaleString() }</td>
						<td>${item.editTime.toLocaleString() }</td>
						<td>
							<button type="button" value="${item.id }" class="btn btn-danger"
								name="del" onclick="del(this)" class="btn btn-danger"
								data-toggle="modal" data-target="#delfactory">删除</button>
							<button type="button" name="update" value="${item.id }"
								onclick="update(this)" class="btn btn-primary"
								data-toggle="modal" data-target="#updatefactory">修改</button>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>

	<!-- 模态框（Modal） -->
	<!-- 创建工厂 -->
	<div class="modal fade" role="dialog" id="addfactory">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">创建工厂</h4>
				</div>
				<div class="modal-body">
					<form action="factory/insertFactory" method="post">
						<div class="form-group">
							<label class="col-sm-2 control-label">工厂名称：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="name" name="name"
									placeholder="工厂名称" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">工厂地址：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="address"
									name="address" placeholder="工厂地址" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">联系电话：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="tel" name="tel"
									placeholder="联系电话" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">备注：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="notes" name="notes"
									placeholder="备注">
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-info" data-dismiss="modal"
								id="close_btn">关闭</button>
							<button type="submit" class="btn btn-primary">提交</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


	<!-- 模态框（Modal） -->
	<!-- 删除工厂 -->
	<div class="modal fade" id="delfactory" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabelDel">删除工厂</h4>
				</div>
				<div class="modal-body">确定删除吗？</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" name="del">删除</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 模态框（Modal） -->
	<!-- 修改工厂-->
	<div class="modal fade" role="dialog" id="updatefactory">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改工厂</h4>
				</div>
				<div class="modal-body">
					<form action="factory/updateFactory" method="post">
						<div class="form-group">
							<label class="col-sm-2 control-label">工厂名称：</label>
							<div class="col-sm-10">
								<input type="hidden" id="updateId" name="updateId"> <input
									type="text" class="form-control" id="updatename" name="name" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">工厂地址：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="updateaddress"
									name="address" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">联系电话：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="updatetel"
									name="tel" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">备注：</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="updatenotes"
									name="notes" />
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-info" data-dismiss="modal"
								id="close_btn">关闭</button>
							<button type="submit" class="btn btn-primary">提交</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>