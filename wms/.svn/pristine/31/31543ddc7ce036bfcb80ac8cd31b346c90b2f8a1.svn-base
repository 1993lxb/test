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
<title>仓库管理</title>
<!-- Bootstrap core CSS -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
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
	//下拉框赋值
	$(function() {
		$.ajax({
			type : "POST",
			url : "factory/findfactory",
			dataType : "json",
			//成功后执行
			success : function(dt) {
				var factory = dt.t;
				var selector = $("#new_warehouse_factoryId");
				$("#new_warehouse_factoryId option:not(:first)").remove();
				for (var i = 0; i < factory.length; i++) {
					selector.append('<option value="'+factory[i].id+'">'
							+ factory[i].name + '</option>');
				}
				 var select=$("#edit_warehouse_factoryId");  
				$("#edit_warehouse_factoryId option:not(:first)").remove();
				for(var i=0;i<dt.length;i++){  
				  select.append('<option value="'+dt[i].id+'">'+dt[i].name+'</option>');   
				}  
			},
			error : function(dt) {
				console.log(dt);
			}
		});
	});
	$(function() {
		$('#warehouseList').bootstrapTable({
			contentType : "application/x-www-form-urlencoded",//必须要有！！！！
			url : "warehouse/findWarehouseByParam",//要请求数据的文件路径
			/* height:tableHeight(),//高度调整 */
			/* toolbar: '#toolbar',//指定工具栏 */
			striped : true, //是否显示行间隔色
			dataField : "res",//bootstrap table 可以前端分页也可以后端分页，这里
			//我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的  
			//rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
			pageNumber : 1, //初始化加载第一页，默认第一页
			pagination : true,//是否分页
			queryParamsType : 'limit',//查询参数组织方式
			queryParams : queryParams, //请求服务器时所传的参数
			sidePagination : 'server',//指定服务器端分页
			pageSize : 5,//单页记录数
			// pageList:[1,2,3,4],//分页步进值
			showRefresh : true,//刷新按钮 
			showToggle : true,
			detailView : false,
			idField : "id",
			clickToSelect : true,//是否启用点击选中行
			toolbarAlign : 'left',//工具栏对齐方式
			buttonsAlign : 'right',//按钮对齐方式
			/* toolbar:'#toolbar',//指定工作栏 */
			columns : [ {
				title : '编号',
				field : 'id',
				align : 'center',
				width : '50',
			}, {
				title : '仓库名称',
				field : 'name',
				align : 'center',
				width : '50',
			}, {
				title : '所属工厂',
				field : 'factoryName',
				align : 'center',
				width : '50',
			}, {
				title : '总仓',
				field : 'isMajorwh',
				align : 'center',
				width : '70',
				formatter : function(value, row, index) {
					if (value == 1) {
						var a = "是";
					} else {
						var a = "否";
					}
					return a;
				},
			}, {
				title : '保税仓',
				field : 'isBondedwh',
				align : 'center',
				width : '30',
				formatter : function(value, row, index) {
					if (value == 1) {
						var a = "是";
					} else {
						var a = "否";
					}
					return a;
				},
			}, {
				title : '仓库地址',
				field : 'address',
				align : 'center',
				width : '30',
			}, {
				title : '联系方式',
				field : 'tel',
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
				title : '仓库图片',
				field : 'imagePath',
				align : 'center',
				width : '70',
			}, {
				title : '操作',
				field : '',
				formatter : operateFormatter,
				events : operateEvents,
				align : 'center',
				width : '140',
			} ],
			locale : 'zh-CN',//中文支持,
			responseHandler : function(res) {
				//在ajax获取到数据，渲染表格之前，修改数据源
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
				warehousename : $("#serSupplierName").val(),
			//reqInfos:searchObj,
			//operate:"searchList",
			}
		}
	});
	$(function() {
		$("#addwarehouse").bind("click", function() {
			$("#addModal").modal("show");
		});
	})

	$(function() {
		//新增信息gjo
		//新增modal框提交事件
		$("#btn_add_sub").bind("click", function() {
			$("#addModal").modal("hide");
			$.ajax({
				type : "POST",
				url : "warehouse/addWarehouse",
				data : $("#addTab").serialize(),
				dataType : "json",
				//成功后执行
				success : function(dt) {
					$('#warehouseList').bootstrapTable('refresh', {
						url : 'warehouse/findWarehouseByParam'
					});
				},

			});

		});
	});

	//条件查询方法
	function searchByName() {
		$('#warehouseList').bootstrapTable('refresh', {
			url : 'warehouse/findWarehouseByParam'
		});
	}
	//表格中增加按钮
	function operateFormatter(value, row, index) {
		return [
				'<button type="button" onclick="show(this)" value="'
						+ row.imagePath
						+ '" class="btn btn-danger  btn-sm">展示图片</button>&nbsp;&nbsp;',
				'<button type="button" class="update btn btn-warning  btn-sm" name="updatewarehouse">修改</button>&nbsp;&nbsp;',
				'<button type="button" class="del btn btn-danger  btn-sm" name="delwarehouse">删除</button>', ]
				.join('');
	};
	//注册按钮的点击事件
	window.operateEvents = {
		'click .update' : function(e, value, row, index) {

			$.ajax({
				type : "POST",
				url : "warehouse/findWarehouseById?id=" + row.id,
				dataType : "json",
				success : function(dt) {
					console.log(dt);
					var $s = dt.t;
					$("#supplierIdUp").val($s.id);
					$("#supplierAddressUp").val($s.address);
					$("#supplierNameUp").val($s.name);
					$("#supplierNotesUp").val($s.notes);
					$("#supplierTelUp").val($s.tel);
					$("#myModalUpdate").modal("show");
				}
			});
		},
		'click .del' : function(e, value, row, index) {
			layer
					.msg(
							'确定要删除仓库信息吗？',
							{
								time : 0, //不自动关闭
								btn : [ '确定删除', '取消' ],
								yes : function(index) {
									layer.close(index);
									$
											.ajax({
												type : "POST",
												url : "warehouse/delWarehouseById?id="
														+ row.id,
												dataType : "json",
												success : function(result) {
													if (result == 1) {
														layer
																.msg(
																		'<span style="font-size: 25px;">成功删除仓库</span>',
																		{
																			area : [
																					'300px',
																					'60px' ]
																		});
													}
													$('#warehouseList')
															.bootstrapTable(
																	'refresh',
																	{
																		url : 'warehouse/findWarehouseByParam'
																	});
												}
											});
								}
							})
		},
	};

	//上传回填地址
	function addImagePath(dt) {
		$("#imagePath").val(dt);
		$("#edit_warehouse_imagePath").val(dt);
		$("#imagePath1").attr('src', dt);
		$("#imagePath2").attr('src', dt);
	}

	//展示地图
	function show(obj) {
		alert(12);
		$image = $(obj).val();
		$("#showImage").attr('src', $image);
		$("#showModal").modal("show");
	}
</script>

</head>

<body>
	<div class="search">
		<form class="form-inline" id="searchForm">
			<div class="form-group">
				<label for="">仓库名称：</label> <input type="text" class="form-control"
					id="serSupplierName" name="serSupplierName" placeholder=""></input>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary"
					onclick="searchByName()">查询</button>
			</div>

		</form>
	</div>
	<br>
	<div class="toolbar">
		<button type="button" class="btn btn-primary" id="addwarehouse">创建仓库</button>
	</div>

	<div class="main">

		<table id="warehouseList">
		</table>
	</div>
	
	<!-- 模态框（Modal） -->
	<!-- 增加仓库 -->
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h3 class="modal-title">新增仓库</h3>
				</div>
				<form action="#" id="addTab">
					<div class="modal-body" style="padding-top: 30px">
						<table class="table table-bordered"
							style="margin: 0px; font-size: 16px">
							<tr>
								<td>仓库名称 :</td>
								<td><input id="new_warehouse_name" name="name" type="text"
									value=""></td>
							</tr>
							<tr>
								<td>所属工厂:</td>
								<td><select id="new_warehouse_factoryId" name="factoryId">
										<option value="-1" name="factoryName">---请选择---</option>
								</select></td>
							</tr>
							<tr>
								<td>是否总仓:</td>
								<td><input type="radio" value="1" name="isMajorwh"
									checked="checked" />是 <input type="radio" name="isMajorwh"
									value="0" />否</td>
							</tr>
							<tr>
								<td>是否保税仓:</td>
								<td><input type="radio" name="isBondedwh" value="1"
									checked="checked" />是 <input type="radio" name="isBondedwh"
									value="0" />否</td>
							</tr>
							<tr>
								<td>仓库地址:</td>
								<td><input id="new_warehouse_address" name="address"
									type="text" value=""></td>
							</tr>
							<tr>
								<td>联系方式:</td>
								<td><input id="new_warehouse_tel" name="tel" type="text"
									value=""></td>
							</tr>
							<tr>
								<td>缩略图:</td>
								<td><img src="" id="imagePath1" width="80" height="60" /></td>
							</tr>

							<tr>
								<td>上传地图：<input type="hidden" id="imagePath"
									name="imagePath" value=""></td>
								<td><iframe runat="server" src="fileUpload.jsp" id="iframe"
										width="100%" height="30" frameborder="no" border="0"
										marginwidth="0" marginheight="0" scrolling="no"
										allowtransparency="yes"></iframe></td>
							</tr>
							<tr>
								<td>备注:</td>
								<td><input id="new_warehouse_notes" name="notes"
									type="text" value=""></td>
							</tr>
						</table>
					</div>
				</form>
				<div class="modal-footer">
					<button id="closeModal" type="button" class="btn btn-default"
						data-dismiss="modal">关闭</button>
					<button id="btn_add_sub" type="button" class="btn btn-primary">添加信息</button>
				</div>
			</div>
		</div>
	</div>

<!-- 模态框（Modal） -->
	<!-- 展示图片 -->
	<div class="modal modal_wapper fade" id="showModal" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<table>
					<tr>
						<td><img src="" id="showImage" width="400" height="250"></td>
					</tr>
				</table>
			</div>
			<div class="modal-footer">
				<button id="closeModal" type="button" class="btn btn-default"
					data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>

<!-- 模态框（Modal） -->
	<!-- 修改仓库 -->
 	<div class="modal modal_wapper fade" id="editModal" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h3 class="modal-title">修改仓库</h3>
				</div>
				<form action="" id="editTab">
					<div class="modal-body" style="padding-top: 30px">
						<table class="table table-bordered"
							style="margin: 0px; font-size: 16px">
							<tr>
								<td>仓库名称 :</td>
								<td><input id="edit_warehouse_id" name="id" type="hidden"
									value=""> <input id="edit_warehouse_name" name="name"
									type="text" value=""></td>
							</tr>
							<tr>
								<td>所属工厂:</td>
								<td><select id="edit_warehouse_factoryId"
									name="factoryId">
										<option value="-1" name="factoryName">---请选择---</option>
								</select></td>
							</tr>
							<tr>
								<td>是否总仓:</td>
								<td><input type="radio" name="isMajorwh" value="1"
									id="isMajorwh1" />是 <input type="radio" name="isMajorwh"
									value="0" id="isMajorwh2" />否</td>
							</tr>
							<tr>
								<td>是否保税仓:</td>
								<td><input type="radio" name="isBondedwh" value="1" />是 <input
									type="radio" name="isBondedwh" value="0" />否</td>
							</tr>
							<tr>
								<td>仓库地址:</td>
								<td><input id="edit_warehouse_address" name="address"
									type="text" value=""></td>
							</tr>
							<tr>
								<td>联系方式:</td>
								<td><input id="edit_warehouse_tel" name="tel" type="text"
									value=""></td>
							</tr>
							<tr>
								<td>缩略图:</td>
								<td><img src="" id="imagePath2" width="80" height="60" /></td>
							</tr>
							<tr>
								<td>上传地图：<input type="hidden" id="edit_warehouse_imagePath"
									name="imagePath"></td>
								<td><iframe runat="server" src="fileUpload.jsp"
										id="edit_iframe" width="100%" height="30" frameborder="no"
										border="0" marginwidth="0" marginheight="0" scrolling="no"
										allowtransparency="yes"></iframe></td>
							</tr>
							<tr>
								<td>备注:</td>
								<td><input id="edit_warehouse_notes" name="notes" type="text" value="">
								    <input id="edit_warehouse_editTime" name="editTime" type="hidden" />	
								</td>
							</tr>
						</table>
					</div>
				</form>
				<div class="modal-footer">
					<button id="closeModal1" type="button" class="btn btn-default"
						data-dismiss="modal">关闭</button>
					<button id="btn_edit_sub" type="button" class="btn btn-primary">修改信息</button>
				</div>
			</div>
		</div>
	</div> 
</body>

</html>