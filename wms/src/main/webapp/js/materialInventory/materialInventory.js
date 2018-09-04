var isUpdate = false;
var _public_priject_msg_list_date_id = "listTable";
var _public_priject_msg_save_date_from_id = "_save_form_create";
var _public_priject_msg_create_btn_id = "create_btn";
//var _public_priject_msg_create_close_btn_id = "close_btn";

// ///////////////回显开始////////////////////
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val)
			return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
var ids = "";// 数据源
function echoIds(gridInputId) {
	var Array1 = ids.split(",");
	var Array2 = $(gridInputId);
	for (var i = 0; i < Array1.length; i++) {
		for (var j = 0; j < Array2.length; j++) {
			if (Array1[i] == Array2[j].id) {
				Array2[j].checked = true;
			}
		}
	}
}
function changeIds(input) {
	var Array = ids.split(",");
	var flag = false; // true有一样的元素，false没有
	for (var i = 0; i < Array.length; i++) {
		if (Array[i] == input.id) {
			flag = true;
		}
	}
	if (input.checked == true) {
		if (!flag) {
			Array.push(input.id);
		}
	} else {
		if (flag) {
			Array.remove(input.id);
		}
	}
	ids = Array.join(",");
	if (ids.indexOf(',') == 0) {
		ids = ids.substring(1, ids.length);
	}
}
// /////////////////回显结束//////////////////

$(function() {
	$("#warehouse").change(function() {
		$("#selectedIds").val("");
		$("#searchInventoryNum").val("");
		searchMaterielsSelected();
	});
	create_list_dataTable();
	checkSaveMsg();
});

// 盘点列表
function create_list_dataTable() {
	var table = base.datatable
			.table({
				'iDisplayLength' : 10,
				tableid : '#' + _public_priject_msg_list_date_id,
				aoColumns : [ {
					"mDataProp" : "inventoryNum"
				}, {
					"mDataProp" : "warehouse.name"
				}, {
					"mDataProp" : "inventoryDate"
				}, {
					"mDataProp" : "method"
				}, {
					"mDataProp" : "orderNum"
				}, {
					"mDataProp" : "addTime"
				}, {
					"mDataProp" : "editTime"
				}, {
					"mDataProp" : "inventoryNum"
				} ],
				columnDefs : [
						{
							targets : 3,
							render : function(a, b, c, d) {
								var methodStr = "";
								if (c.method == 1) {
									methodStr = "物料盘点";
								} else if (c.method == 2) {
									methodStr = "订单盘点";
								}
								return methodStr;
							}
						},
						{
							targets : 5,
							render : function(a, b, c, d) {
								var dateStr = "";
								if (c.addTime) {
									var date = new Date(c.addTime);
									dateStr = date
											.format("yyyy-MM-dd hh:mm:ss");
								}
								return dateStr;
							}
						},
						{
							targets : 6,
							render : function(a, b, c, d) {
								var dateStr = "";
								if (c.editTime) {
									var date = new Date(c.editTime);
									dateStr = date
											.format("yyyy-MM-dd hh:mm:ss");
								}
								return dateStr;
							}
						},
						{
							targets : 7,
							render : function(a, b, c, d) {
								if (c.addTime) {
									var date = new Date(c.addTime);
									dateStr = date
											.format("yyyy-MM-dd hh:mm:ss");
								}
								var html = '<button type="button" class="btn btn-primary" onclick="createUnions(\'' + c.inventoryNum + '\','
								+ '\'' + c.warehouse.name + '\',\'' + dateStr + '\',\'' + c.addUserId + '\')">查看盘点物料</button> ';
								html += '<button type="button" onclick = "createModifyUnion(\''
										+ c.inventoryNum
										+ '\',\'' + c.warehouse.name + '\',\'' + c.method + '\')" class="btn btn-primary">修改</button>';
								html += ' <button type="button" onclick = "del(\''
										+ c.inventoryNum
										+ '\')"  class="btn btn-danger">删除</button> ';
								return html;
							}
						} ],
				fnServerParams : function(aoData) {
					aoData.inventoryNum = $('#condInventoryNum').val();
				},
				url : ctx + "/inventory/materielInventoryListPage?rand="
						+ Math.random()
			});
	return table;
};

/**
 * 已选择的物料列表
 * 
 * @returns
 */
function create_list_dataTableMateriels() {
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#listTableMaterielsRs',
		aoColumns : [ {
			"mDataProp" : "pn"
		}, {
			"mDataProp" : "name"
		}, {
			"mDataProp" : "specification"
		}, {
			"mDataProp" : "totalNum"
		}, {
			"mDataProp" : "pn"
		} ],
		columnDefs : [ {
			targets : 4,
			render : function(a, b, c, d) {
				var html = '<button type="button" onclick = "removeSelectedMateriels(\'' + c.pn
						+ '\')"  class="btn btn-danger">删除</button>';
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData.deleteState = 0;
			aoData.pn = $("#selectedIds").val();
		},
		url : ctx + "/materiel/findMaterielListPageByPns?rand=" + Math.random()
	});
	return table;
};

/**
 * 弹出的物料选择查询列表
 * 
 * @returns
 */
function create_list_dataTableMaterielsSearch() {
	var table = base.datatable
			.table({
				'iDisplayLength' : 5,
				tableid : '#listTableMaterielsSearch',
				aoColumns : [
						{
							"mRender" : function(data, type, full) {
								return "<input id='" + full.pn
										+ "' type='checkbox' value='" + full.pn
										+ "'>";
							}
						}, {
							"mDataProp" : "pn"
						}, {
							"mDataProp" : "name"
						}, {
							"mDataProp" : "specification"
						} ],
				fnServerParams : function(aoData) {
					aoData['deleteState'] = 0;
					aoData['warehouseId'] = $("#warehouse").val();
					aoData['pn'] = $("#lblMaterielPn").val();
				},
				fnDrawCallback : function(oSettings) {
					echoIds("#datagrid_tbody input");
					$("#datagrid_tbody input").click(function() {
						changeIds(this);
					});
				},
				url : ctx + "/materiel/findMaterielListByWarehousePn?rand=" + Math.random()
			});
	return table;
}

/**
 * 弹出的订单选择查询列表
 * 
 * @returns
 */
function create_list_dataTableOrderMaterielsSearch() {
	var table = base.datatable
			.table({
				'iDisplayLength' : 5,
				tableid : '#listTableOrders',
				aoColumns : [
						{
							"mRender" : function(data, type, full) {
								return "<input id='" + full.order_num
										+ "' type='checkbox' value='" + full.order_num
										+ "'>";
							}
						}, {
							"mDataProp" : "order_num"
				} ],
				fnServerParams : function(aoData) {
					aoData['orderNum'] = $("#condOrderNum").val();
					aoData['warehouseId'] = $("#warehouse").val();
				},
				fnDrawCallback : function(oSettings) {
					echoIds("#datagrid_tbody_order input");
					$("#datagrid_tbody_order input").click(function() {
						changeIds(this);
					});
				},
				url : ctx + "/storageHistory/findDistinctOrderNumList?rand=" + Math.random()
			});
	return table;
}

function create_list_dataTableUnions(inventoryNum) {
	$("#searchInventoryNum").val(inventoryNum);
	var table = base.datatable.table({
				'iDisplayLength' : 10,
				tableid : '#listTableUnions',
				aoColumns : [ {
					"mDataProp" : "id"
				}, {
					"mDataProp" : "materiel.pn"
				}, {
					"mDataProp" : "currentNum"
				}, {
					"mDataProp" : "actualNum"
				}, {
					"mDataProp" : "profitLossNum"
				}, {
					"mDataProp" : "addTime"
				}, {
					"mDataProp" : "editTime"
				}, {
					"mDataProp" : "id"
				}],
				columnDefs : [
								{
									targets : 5,
									render : function(a, b, c, d) {
										var dateStr = "";
										if (c.addTime) {
											var date = new Date(c.addTime);
											dateStr = date.format("yyyy-MM-dd hh:mm:ss");
										}
										return dateStr;
									}
								},
								{
									targets : 6,
									render : function(a, b, c, d) {
										var dateStr = "";
										if (c.editTime) {
											var date = new Date(c.editTime);
											dateStr = date.format("yyyy-MM-dd hh:mm:ss");
										}
										return dateStr;
									}
								},
								{
									targets : 7,
									render : function(a, b, c, d) {
										var html = '<button type="button" onclick = "createDetails(' + c.id + ')" class="btn btn-primary">查看料盘信息</button>';
										return html;
									}
								} ],
				fnServerParams : function(aoData) {
					aoData['_search_EQ_deleteState'] = 0;
					aoData['_search_EQ_materielInventory.inventoryNum'] = $("#searchInventoryNum").val();
				},
				url : ctx + "/inventoryUnion/data?rand=" + Math.random()
			});
	return table;
};


function create_list_dataTableModifyUnion(inventoryNum) {
	$("#searchInventoryNum").val(inventoryNum);
	var table = base.datatable.table({
				'iDisplayLength' : 10,
				tableid : '#listTableModifyUnion',
				aoColumns : [ {
					"mDataProp" : "id"
				}, {
					"mDataProp" : "materiel.pn"
				}, {
					"mDataProp" : "materiel.name"
				}, {
					"mDataProp" : "materiel.specification"
				}, {
					"mDataProp" : "currentNum"
				}, {
					"mDataProp" : "actualNum"
				}, {
					"mDataProp" : "profitLossNum"
				}, {
					"mDataProp" : "id"
				}],
				columnDefs : [
								{
									targets : 7,
									render : function(a, b, c, d) {
										var html = '<button type="button" onclick = "createVerifyNumber(' + c.id + ', \'' + c.materielInventory.inventoryNum + '\', \'' + c.materiel.pn + '\')" class="btn btn-primary">核对实盘数量</button>';
										return html;
									}
								} ],
				fnServerParams : function(aoData) {
					aoData['_search_EQ_deleteState'] = 0;
					aoData['_search_EQ_materielInventory.inventoryNum'] = $("#searchInventoryNum").val();
				},
				fnDrawCallback : function(oSettings) {
					
				},
				url : ctx + "/inventoryUnion/data?rand=" + Math.random()
			});
	return table;
};

function create_list_dataTableDetails(unionId) {
	$("#searchUnionId").val(unionId);
	var table = base.datatable.table({
				'iDisplayLength' : 10,
				tableid : '#listTableDetails',
				aoColumns : [ {
					"mDataProp" : "id"
				}, {
					"mDataProp" : "materielDisc.upn"
				}, {
					"mDataProp" : "currentNum"
				}, {
					"mDataProp" : "actualNum"
				}, {
					"mDataProp" : "profitLossNum"
				}],
				fnServerParams : function(aoData) {
					aoData['_search_EQ_deleteState'] = 0;
					aoData['_search_EQ_inventoryUnion.id'] = $("#searchUnionId").val();
				},
				url : ctx + "/inventoryDetail/data?rand=" + Math.random()
			});
	return table;
};

function create_list_dataTableVerifyNumber(unionId) {
	$("#searchUnionId").val(unionId);
	var table = base.datatable.table({
				'iDisplayLength' : 10,
				tableid : '#listTableVerifyNumber',
				aoColumns : [ {
					"mDataProp" : "id"
				}, {
					"mDataProp" : "materielDisc.upn"
				}, {
					"mDataProp" : "currentNum"
				}, {
					"mDataProp" : "actualNum"
				}, {
					"mDataProp" : "profitLossNum"
				}],
				columnDefs : [
				{
					targets : 5,
					render : function(a, b, c, d) {
						var html = '<button type="button" onclick = "createModifyActualNum(' + c.id + ')" class="btn btn-primary">修改实盘数量</button>';
						return html;
					}
				} ],
				fnServerParams : function(aoData) {
					aoData['_search_EQ_deleteState'] = 0;
					aoData['_search_EQ_inventoryUnion.id'] = $("#searchUnionId").val();
				},
				url : ctx + "/inventoryDetail/data?rand=" + Math.random()
			});
	return table;
};

function checkSaveMsg() {
	base.form.validation('#' + _public_priject_msg_save_date_from_id, {
		rules : {
			'warehouse.id' : {
				required : true
			},
			method : {
				required : true
			}
		},
		messages : {
			'warehouse.id' : {
				required : "请选择仓库"
			},
			address : {
				required : "请选择盘点方式"
			}
		}
	});
}
function saveDateMsg() {
	var rs = $('#' + _public_priject_msg_save_date_from_id).valid();
	if (rs) {
		$.ajax({
			type : "POST",
			url : ctx + "/inventory/insert",
			data : {
				inventoryNum : $("#inventoryNum").val(),
				orderNum : $("#orderNum").val(),
				deleteState : $("#deleteState").val(),
				'warehouse.id' : $("#warehouse").val(),
				method : $("#methodSel").val(),
				pns : $("#selectedIds").val()
			},
			dataType : "json",
			async : false,
			success : function(data) {
				$("#close_id").click();
				$("#close_id").click();
				writeOne("");
				search();
				isUpdate = false;
			}
		});
	}
}

/**
 * 保存选择的物料id
 */
function saveSelectedMateriels() {
	$("#selectedIds").val("'" + ids.replace(/\,/g, "','") + "'");
	// $("#btnMethod").click();
	$("#modalMateriels").modal('hide')
	searchMaterielsSelected();
}

/**
 * 保存选择的物料id
 */
function saveSelectedOrderMateriels() {
	$("#selectedIds").val("'" + ids.replace(/\,/g, "','") + "'");
	$.ajax({
		type : "POST",
		url : ctx + "/storageHistory/findStorageHisListPageByOrderNum",
		data : {
			"orderNums" : $("#selectedIds").val()
		},
		async : false,
		success : function(data) {
			var selectedIds = "";
			
			$.each(data,function(index, value) {
				if (selectedIds.indexOf("'" + value.materiel.pn + "'") <0) {
					selectedIds += "'" + value.materiel.pn + "'";
				}
				if (index + 1 != data.length && selectedIds.trim().length > 0) {
					selectedIds += ",";
				}
			});
			if (selectedIds.lastIndexOf(',') == selectedIds.length - 1) {
				selectedIds = selectedIds.substring(0, selectedIds.length - 1);
			}
			
			$("#selectedIds").val(selectedIds);
			$("#orderNum").val(ids);
			$("#btnMethod").click();
			$("#close_btn_order").click();
			searchOrderMaterielsSelected();
		}
	});
}

/**
 * 创建盘点
 */
function create() {
	// 初始化选中的id
	ids = $("#selectedIds").val().replace(/\'/g, "");
	create_list_dataTableMateriels();
    
	writeOne("");
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	$("#" + _public_priject_msg_create_btn_id).click();

	$("#methodSel").change(function() {
		var method = $("#methodSel").val();
		if (method == 1) {
			$("#btnMethod").html("添加物料");
			$("#btnMethod").attr("data-target", "#modalMateriels");
			$("#btnMethod1").html("添加物料");
			$("#btnMethod1").attr("data-target", "#modalMateriels");
		} else if (method == 2) {
			$("#btnMethod").html("选择订单");
			$("#btnMethod").attr("data-target", "#modalOrders");
			$("#btnMethod1").html("选择订单");
			$("#btnMethod1").attr("data-target", "#modalOrders");
		}
		$("#selectedIds").val("");
		$("#searchInventoryNum").val("");
		searchMaterielsSelected();
	});
	
	searchMaterielsSelected();
}

function createMateriels() {
	if ($("#warehouse").val() == "") {
		alert("请选择仓库！");
		return;
	}
	isUpdate = true;
	ids = $("#selectedIds").val().replace(/\'/g, "");
	writeOne("");
	if ($("#btnMethod").attr("data-target") == "#modalOrders") {
		base.form.validreset('#_save_form_order');
	} else {
		base.form.validreset('#_save_form_materiel');
	}
	
	// 打开物料选择界面
	//$("#btnMethod").click();
	$("#modalMateriels").modal('show');
	$("#datagrid_tbody input").attr("checked",false);
	
	if ($("#btnMethod").attr("data-target") == "#modalOrders") {
		create_list_dataTableOrderMaterielsSearch();
	} else {
		create_list_dataTableMaterielsSearch();
	}
	echoIds("#datagrid_tbody input");
}

function createUnions(inventoryNum, warehouseName, addTime, addUserId) {
	// 显示抬头
	$("#ck_pddh").html("盘点单号：" + inventoryNum);
	$("#ck_pdck").html("盘点仓库：" + warehouseName);
	$("#ck_pdrq").html("盘点日期：" + addTime);
	$("#ck_pdr").html("盘点人：" + addUserId);
	
	$("#pt_ck_pddh").html("盘点单号：" + inventoryNum);
	$("#pt_ck_pdck").html("盘点仓库：" + warehouseName);
	$("#pt_ck_pdrq").html("盘点日期：" + addTime);
	$("#pt_ck_pdr").html("盘点人：" + addUserId);
	
	// 显示盘点人
	$.ajax({
		type : "POST",
		url : ctx + "/user/findOne",
		data : {
			"id" : addUserId
		},
		async : false,
		success : function(data) {
			$("#ck_pdr").html("盘点人：" + data.realName);
			$("#pt_ck_pdr").html("盘点人：" + data.realName);
		}
	});
	
	create_list_dataTableUnions(inventoryNum);
	initPrintDiv(inventoryNum);
	$("#btnUnions").click();
}

function createModifyUnion(inventoryNum, warehouseName, method) {
	$("#pddh").html("盘点单号：" + inventoryNum);
	$("#pdck").html("盘点仓库：" + warehouseName);
	$("#pdfs").html("盘点方式：" + (method == 1 ? "物料盘点" : "订单盘点"));
	var table = create_list_dataTableModifyUnion(inventoryNum);
	$("#btnModifyUnion").click();
	table.fnDraw(false);
}

function createDetails(unionId) {
	var table = create_list_dataTableDetails(unionId);
	$("#btnDetails").click();
	table.fnDraw(false);
}

function createVerifyNumber(unionId, inventoryNum, pn) {
	$("#hd_pddh").html("盘点单号：" + inventoryNum);
	$("#hd_pdck").html("料盘号：" + pn);
	var table = create_list_dataTableVerifyNumber(unionId);
	$("#btnVerifyNum").click();
	table.fnDraw(false);
}

function createModifyActualNum(detailId) {
	// $("#btnActualNum").click();
	$("#modalActualNum").modal("show");
	$.ajax({
		type : "POST",
		url : ctx + "/inventoryDetail/findOne",
		data : {
			"id" : detailId
		},
		async : false,
		success : function(data) {
			$("#lblInventoryNum").html(data.inventoryUnion.materielInventory.inventoryNum);
			$("#lblPn").html(data.materielDisc.materiel.pn);
			$("#lblUpn").html(data.materielDisc.upn);
			$("#lblCurrentNum").html(data.currentNum);
			$("#actualNum").val(data.actualNum);
			$("#detailId").val(data.id);
			$("#upn").val(data.materielDisc.upn);
			$("#unionId").val(data.inventoryUnion.id);
			$("#pn").val(data.materielDisc.materiel.pn);
			$("#currentNum").val(data.currentNum);
		}
	});
}

function writeOne(data) {
	if (!isUpdate) {
		initComboList();
	}

	var orderNum = data.orderNum ? data.orderNum : "";
	var deleteState = data.deleteState ? data.deleteState : "0";
	var warehouse = data.warehouse ? data.warehouse : "";
	var warehouseId = warehouse.id ? warehouse.id : "";
	var methodSel = data.method ? data.method : "1";
	var inventoryNum = data.inventoryNum ? data.inventoryNum : "";
	if (data != "") {
		getMaterielsUnionByInventoryNum(inventoryNum);
	}

	$("#orderNum").val(orderNum);
	$("#deleteState").val(deleteState);
	if (data != "") {
		$("#inventoryNum").val(inventoryNum);
		$("#warehouse").val(warehouseId);
		$("#methodSel").val(methodSel);
	}
}

function del(id) {
	/*
	 * showMsg({ msg : "是否确认删除？", type : "question", mode : 1, success :
	 * function(){
	 */
	$.ajax({
		type : "POST",
		url : ctx + "/inventory/save",
		data : {
			"inventoryNum" : id,
			"deleteState" : "1"
		},
		async : false,
		success : function() {
			writeOne("");
			var dt = $('#' + _public_priject_msg_list_date_id).dataTable()
					.fnSettings();
			var start = dt._iDisplayStart;
			var total = dt.fnRecordsDisplay();
			if ((total - start) == 1) {
				if (start > 0) {
					$('#' + _public_priject_msg_list_date_id).dataTable()
							.fnPageChange('previous', true);
				}
			}
			search();
		}
	});
	/*
	 * } });
	 */
}
function search() {
	var tab = $('#' + _public_priject_msg_list_date_id).dataTable();
	tab.fnDraw(false);
}

function searchMaterielsSelect() {
	var tab = $('#listTableMaterielsSearch').dataTable();
	tab.fnDraw(false);
}

function searchMaterielsSelected() {
	var tab = $('#listTableMaterielsRs').dataTable();
	tab.fnDraw(false);
}

function searchOrderMaterielsSelected() {
	var tab = $('#listTableOrders').dataTable();
	tab.fnDraw(false);
}

/**
 * 仓库下拉列表
 */
function initComboList() {
	$.ajax({
		type : "POST",
		url : ctx + "/warehouse/allData",
		data : {
			"_search_EQ_deleteState" : 0
		},
		async : false,
		success : function(data) {
			if (data.length > 0) {
				var options = "<option value=''>请选择</option>";
				for (var index = 0; index < data.length; index++) {
					var entity = data[index];
					options += "<option value=" + entity.id + ">" + entity.name
							+ "</option>";
				}
				$("#warehouse").html(options);
			}
		}
	});
}

/**
 * 删除选中的物料
 * @param pn
 */
function removeSelectedMateriels(pn) {
	var selIds = $("#selectedIds").val() + ",";
	selIds = selIds.replace(/\'/g, "");
	selIds = selIds.replace(pn + ",", "");
	if (selIds.trim().length == 0) {
		ids = "";
		$("#selectedIds").val('');
		searchMaterielsSelected();
		return;
	}
	
	selIds = selIds.substring(0, selIds.length - 1);
	ids = selIds;
	
	selIds = "'" + selIds.replace(/\,/g, "','") + "'";
	$("#selectedIds").val(selIds);
	searchMaterielsSelected();
}

/**
 * 取消选择的内容
 */
function cancelSelected() {
	$("#selectedIds").val("");
	ids = "";
	isUpdate = false;
}

/**
 * 编辑时回显示保存的物料号
 * @param inventoryNum
 */
function getMaterielsUnionByInventoryNum(inventoryNum) {
	$.ajax({
		type : "POST",
		url : ctx + "/inventoryUnion/allData",
		data : {
			"_search_EQ_deleteState" : 0,
			"_search_EQ_materielInventory.inventoryNum" : inventoryNum
		},
		async : false,
		success : function(data) {
			var selectedIds = "";
			for (var index = 0; index < data.length; index++) {
				selectedIds += "'" + data[index].materiel.pn + "'";
				if (index + 1 < data.length) {
					selectedIds += ",";
				}
			}
			$("#selectedIds").val(selectedIds);
			create_list_dataTableMateriels();
		}
	});
}

function saveActualNum() {
	var rs = $('#_save_form_modifyNum').valid();
	if (rs) {
		$("#profitLossNum").val(parseFloat($("#actualNum").val()) - parseFloat($("#lblCurrentNum").html()));
		$.ajax({
			type : "POST",
			url : ctx + "/inventoryDetail/updateInventoryNum",
			data : $("#_save_form_modifyNum").serialize(),
			dataType : "json",
			async : false,
			success : function(data) {
				// $("#close_btn_actualNum").click();
				$("#modalActualNum").modal("hide");
				var table = create_list_dataTableVerifyNumber($("#unionId").val());
				table.fnDraw(false);
			}
		});
	}
}

function initPrintDiv(inventoryNum) {
	$.ajax({
		type : "POST",
		url : ctx + "/inventoryUnion/allData?rand=" + Math.random(),
		data : {
			"_search_EQ_deleteState" : 0,
			"_search_EQ_materielInventory.inventoryNum" : inventoryNum
		},
		dataType : "json",
		async : false,
		success : function(data) {
			var html = "";
			$.each(data, function(index, value) {
				var addDate = new Date(value.addTime);
				var addDateStr = addDate.format("yyyy-MM-dd hh:mm:ss");
				if (addDateStr == undefined || addDateStr == "undefined") {
					addDateStr = "";
				}
				var editDate = new Date(value.editTime);
				var editDateStr = editDate.format("yyyy-MM-dd hh:mm:ss");
				if (editDateStr == undefined || editDateStr == "undefined") {
					editDateStr = "";
				}
				html += '<tr class="odd" role="row"><td>' + value.id + '</td><td>' + value.materiel.pn + '</td><td>' + value.currentNum + '</td><td>' + value.actualNum + '</td><td>' + value.profitLossNum + '</td><td>' + addDateStr + '</td><td>' + editDateStr + '</td></tr>';
			});
			$("#printBody").html(html);
		}
	});
}

function printData() {
	$("div.PrintArea").printArea( [{mode: "popup", popClose: false, strict: false}] );
}