var _public_priject_msg_list_date_id = "listTable";
var _public_priject_msg_save_date_from_id = "_save_form";
var _public_priject_msg_create_btn_id = "create_btn";
var _public_priject_msg_create_close_btn_id = "close_btn";

$(function() {
	// 查询条件下拉
	initWarehouseComboList("warehouseDropSearch");
	$("#warehouseDropSearch").change(function() {
		if (this.value != '') {
			//$("#areaDropSearch").empty();
			initWarehouseAreaComboList("areaDropSearch", "全部", this.value);
		} else {
			$("#areaDropSearch").html("<option value=''>全部</option>");
		}
	});
	
	create_list_dataTable();
	checkSaveMsg();
	
	initMaterialGroupComboList("materialGroup");

	// 添加下拉
	initWarehouseComboList("warehouse", "请选择");
	$("#warehouse").change(function() {
		if (this.value != '') {
			$("#warehouseArea").empty();
			initWarehouseAreaComboList("warehouseArea", "请选择", this.value);
		} else {
			$("#warehouseArea").html("<option value=''>请选择</option>");
		}
	});
});

function create_list_dataTable() {
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#' + _public_priject_msg_list_date_id,
		aoColumns : [ {
			"mDataProp" : "id"
		}, {
			"mDataProp" : "name"
		}, {
			"mDataProp" : "materialGroup.name"
		}, {
			"mDataProp" : "warehouseArea.warehouse.name"
		}, {
			"mDataProp" : "warehouseArea.name"
		}, {
			"mDataProp" : "positionX"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "id"
		} ],
		columnDefs : [
	              {
	  					targets : 2,
	  					render : function(a, b, c, d) {
	  						var name = "";
	  						if(c.materialGroup){
	  							if(c.materialGroup.name){
	  								name = c.materialGroup.name;
	  							}
	  						}
	  						return name;
	  					}
	              },{
						targets : 5,
						render : function(a, b, c, d) {
							var posStr = "";
							if (c.positionX) {
								posStr = c.positionX + "," + c.positionY;
							}
							return posStr;
						}
					},
				{
					targets : 6,
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
					targets : 7,
					render : function(a, b, c, d) {
						var dateStr = "";
						if (c.addTime) {
							var date = new Date(c.editTime);
							dateStr = date.format("yyyy-MM-dd hh:mm:ss");
						}
						return dateStr;
					}
				},
				{
					targets : 8,
					render : function(a, b, c, d) {
						var html = '<button type="button" onclick = "update('
								+ c.id
								+ ')" class="btn btn-primary">修改</button>';
						html += ' <button type="button" onclick = "del(' + c.id
								+ ')"  class="btn btn-danger">删除</button> ';
						return html;
					}
				} ],
		fnServerParams : function(aoData) {
			aoData['_search_EQ_deleteState'] = 0;
			var warehouseId = $('#warehouseDropSearch').val();
			var areaId = $('#areaDropSearch').val();
			if (warehouseId != null && warehouseId != '') {
				aoData['_search_EQ_warehouseArea.warehouse.id'] = warehouseId;
			}
			if (areaId != null && areaId != '') {
				aoData['_search_EQ_warehouseArea.id'] = areaId;
			}
			aoData['_search_ORDERDESC_addTime'] = "addTime";
		},
		url : ctx + "/warehousePlace/data?rand=" + Math.random()
	});
	return table;
};

function checkSaveMsg() {
	base.form.validation('#' + _public_priject_msg_save_date_from_id, {
		rules : {
			name : {
				required : true,
				maxlength : 100
			}, 'materialGroup.id' : {
				required : true
			}, 'warehouseArea.warehouse.id' : {
				required : true
			}, 'warehouseArea.id' : {
				required : true
			}, positionX : {
				required : true,
				number : true
			}, positionY : {
				required : true,
				number : true
			}, notes : {
				maxlength : 200
			}
		},
		messages : {
			name : {
				required : "请填写名称",
				maxlength : "名称不能超过100个字符"
			}, 'materialGroup.id' : {
				required : "请选择物料组"
			}, 'warehouseArea.warehouse.id' : {
				required : "请选择仓库"
			}, 'warehouseArea.id' : {
				required : "请选择仓库区域"
			}, positionX : {
				required : "请输入横坐标",
				number : "坐标请输入数字"
			}, positionY : {
				required : "请输入纵坐标",
				number : "坐标请输入数字"
			}, notes : {
				maxlength : "说明不能超过200个字符"
			}
		}
	});
}
function saveDateMsg() {
	var rs = $('#' + _public_priject_msg_save_date_from_id).valid();
	if (rs) {
		$.ajax({
			type : "POST",
			url : ctx + "/warehousePlace/save/",
			data : $("#" + _public_priject_msg_save_date_from_id).serialize(),
			dataType : "json",
			async : false,
			success : function(data) {
				// $("#" + _public_priject_msg_create_close_btn_id).click();
				$("#wpModal").modal("hide");
				writeOne("");
				search();
			}
		});
	}
}

function create() {
	writeOne("");
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	$("#wpModal").modal("show");
	// $("#" + _public_priject_msg_create_btn_id).click();
}
function update(id) {
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	searchOne(id);
}
function searchOne(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/warehousePlace/findOne/",
		data : {
			"id" : id
		},
		dataType : "json",
		success : function(data) {
			if (data.id) {
				writeOne(data);
				// $("#" + _public_priject_msg_create_btn_id).click();
				$("#wpModal").modal("show");
			}
		}
	});
}
function writeOne(data) {
	var id = data.id ? data.id : "";
	var name = data.name ? data.name : "";
	var notes = data.notes ? data.notes : "";
	var warehouseArea = data.warehouseArea ? data.warehouseArea : "";
	var warehouse = warehouseArea.warehouse ? warehouseArea.warehouse : "";
	var warehouseId = warehouse.id ? warehouse.id : "";
	
	var warehouseAreaId = warehouseArea.id ? warehouseArea.id : "";
	
	var deleteState = data.deleteState ? data.deleteState : "0";
	var materialGroup = data.materialGroup ? data.materialGroup : "";
	var materialGroupId = materialGroup.id ? materialGroup.id : "";
	
	var positionX = data.positionX ? data.positionX : "";
	var positionY = data.positionY ? data.positionY : "";
	
	$("#" + _public_priject_msg_save_date_from_id + " input[name='id']").val(id);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='name']").val(name);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='deleteState']").val(deleteState);
	$("#materialGroup").val(materialGroupId);
	$("#warehouse").val(warehouseId);
	
	if (warehouseId != '') {
		initWarehouseAreaComboList("warehouseArea", "请选择", warehouseId);
		$("#warehouseArea").val(warehouseAreaId)
	} else {
		$("#warehouseArea").empty();
		$("#warehouseArea").html("<option value=''>请选择</option>");
	}
	
	$("#" + _public_priject_msg_save_date_from_id + " input[name='positionX']").val(positionX);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='positionY']").val(positionY);
	$("#" + _public_priject_msg_save_date_from_id + " textarea[name='notes']").val(notes);
}

function initWarehouseComboList(id, optionStr) {
	$.ajax({
		type : "POST",
		url : ctx + "/warehouse/allData",
		data : {
			"_search_EQ_deleteState" : 0
		},
		async : false,
		success : function(data) {
			if (optionStr == undefined || optionStr == '') {
				optionStr = "全部";
			}
			if (data.length > 0) {
				var options = "<option value=''>" + optionStr + "</option>";
				for (var index = 0; index < data.length; index++) {
					var entity = data[index];
					options += "<option value=" + entity.id + ">" + entity.name + "</option>";
				}
				$("#" + id).html(options);
			} else {
				$("#" + id).html("<option value=''>" + optionStr + "</option>");
			}
		}
	});
}

function initWarehouseAreaComboList(id, optionStr, warehouseId) {
	$.ajax({
		type : "POST",
		url : ctx + "/warehouseArea/allData",
		data : {
			"_search_EQ_deleteState" : 0,
			"_search_EQ_warehouse.id" : warehouseId
		},
		async : false,
		success : function(data) {
			if (optionStr == undefined || optionStr == '') {
				optionStr = "全部";
			}
			if (data.length > 0) {
				var options = "<option value=''>" + optionStr + "</option>";
				for (var index = 0; index < data.length; index++) {
					var entity = data[index];
					options += "<option value=" + entity.id + ">" + entity.name + "</option>";
				}
				$("#" + id).html(options);
			} else {
				$("#" + id).html("<option value=''>" + optionStr + "</option>");
			}
		}
	});
}

function initMaterialGroupComboList(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/materialGroupManager/allData",
		data : {
			"_search_EQ_deleteState" : 0
		},
		async : false,
		success : function(data) {
			if (data.length > 0) {
				var options = "<option value=''>请选择</option>";
				for (var index = 0; index < data.length; index++) {
					var entity = data[index];
					options += "<option value=" + entity.id + ">" + entity.name + "</option>";
				}
				$("#" + id).html(options);
			} else {
				$("#" + id).html("<option value=''>请选择</option>");
			}
		}
	});
}

function del(id) {
	/*
	 * showMsg({ msg : "是否确认删除？", type : "question", mode : 1, success :
	 * function(){
	 */
	$.ajax({
		type : "POST",
		url : ctx + "/warehousePlace/update",
		data : {
			"id" : id,
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
function searchMsg() {
	$('#' + _public_priject_msg_list_date_id).dataTable().fnSettings()._iDisplayStart = 1;
	search();
}

function createReport(id) {
	$("#" + _public_priject_msg_create_btn_id).click();
}