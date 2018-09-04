<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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
<title>入库管理</title>
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
		$('#storageHistorylist').bootstrapTable({
			method : 'post',
			contentType : "application/x-www-form-urlencoded",//必须要有！！！！
			url : "storageHistory/findstorageHistoryByParam",//要请求数据的文件路径
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
		$('#storageHistorylist').bootstrapTable('refresh', {
			url : "storageHistory/findstorageHistoryByParam"
		});
	}
	//表格中增加按钮
	function operateFormatter(value, row, index) {
		return [
				'<button type="button" class="update btn btn-warning  btn-sm" name="updatewarehousearea">修改</button>&nbsp;&nbsp;',
				'<button type="button" class="del btn btn-danger  btn-sm" name="delwarehousearea">删除</button>', ]
				.join('');
	};
</script>
</head>
<body>
	<div class="search">
		<form class="form-inline">
			<div class="form-group">
				<label for="f_orderNum">订单编号：</label> <input type="text"
					class="form-control" id="f_orderNum" name="f_orderNum"
					placeholder="" />
			</div>
			<div class="form-group">
				<label for="f_pn">物料号：</label> <input type="text"
					class="form-control" id="f_pn" name="f_pn" placeholder="" />
			</div>
			<div class="form-group">
				<label for="f_auditState">质检状态：</label> <select class="form-control"
					id="f_auditState" name="f_auditState">
					<option value="">全部</option>
					<option value="1">待检</option>
					<option value="2">不合格</option>
					<option value="3">全部合格</option>
					<option value="4">部分合格</option>
				</select>
			</div>
			<div class="form-group">
				<label for="f_status">订单状态：</label> <select class="form-control"
					id="f_status" name="f_status">
					<option value="">全部</option>
					<option value="1">未完成</option>
					<option value="2">已完成</option>
				</select>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary" onclick="search()">查询</button>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary"
					onclick="createOrder()">新建订单</button>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary"
					onclick="exportExcel()">导出</button>
			</div>
		</form>
	</div>
	<div>
		<table id='storageHistorylist' style="height: 100px; width: 100%">
		</table>
	</div>
</body>
</html>