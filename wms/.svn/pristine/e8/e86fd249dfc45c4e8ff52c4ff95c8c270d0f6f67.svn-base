var _public_priject_msg_list_date_id = "listTable";
var _public_priject_msg_save_date_from_id = "_save_form";
var _public_priject_msg_create_btn_id = "create_btn";
var _public_priject_msg_create_close_btn_id = "close_btn";

$(function() {
	create_list_dataTable();
	checkSaveMsg();
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
			"mDataProp" : "address"
		}, {
			"mDataProp" : "tel"
		}, {
			"mDataProp" : "notes"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "id"
		} ],
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
			aoData['_search_LIKE_name'] = $('#fName').val();
			aoData['_search_ORDERDESC_addTime'] = "addTime";
		},
		url : ctx + "/factory/data?rand=" + Math.random()
	});
	return table;
};

function checkSaveMsg() {
	base.form.validation('#' + _public_priject_msg_save_date_from_id, {
		rules : {
			name : {
				required : true,
				maxlength : 100
			},
			address : {
				required : true,
				maxlength : 200
			},
			tel : {
				required : true,
				maxlength : 12
			},
			notes : {
				maxlength : 200
			}
		},
		messages : {
			name : {
				required : "请填写名称",
				maxlength : "名称不能超过100个字符"
			},
			address : {
				required : "请填写工厂地址",
				maxlength : "地址不能超过200个字符"
			},
			tel : {
				required : "请填写联系电话",
				maxlength : "电话不能超过12个字符"
			},
			notes : {
				maxlength : "备注不能超过200个字符"
			}
		}
	});
}
function saveDateMsg() {
	var rs = $('#' + _public_priject_msg_save_date_from_id).valid();
	if (rs) {
		$.ajax({
			type : "POST",
			url : ctx + "/factory/save/",
			data : $("#" + _public_priject_msg_save_date_from_id).serialize(),
			dataType : "json",
			async : false,
			success : function(data) {
				// $("#" + _public_priject_msg_create_close_btn_id).click();
				$("#facModal").modal("hide");
				writeOne("");
				search();
			}
		});
	}
}

function create() {
	writeOne("");
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	// $("#" + _public_priject_msg_create_btn_id).click();
	$("#facModal").modal("show");
}
function update(id) {
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	searchOne(id);
}
function searchOne(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/factory/findOne/",
		data : {
			"id" : id
		},
		dataType : "json",
		success : function(data) {
			if (data.id) {
				writeOne(data);
				// $("#" + _public_priject_msg_create_btn_id).click();
				$("#facModal").modal("show");
			}
		}
	});
}
function writeOne(data) {
	var id = data.id ? data.id : "";
	var name = data.name ? data.name : "";
	var notes = data.notes ? data.notes : "";
	var deleteState = data.deleteState ? data.deleteState : "0";
	var address = data.address ? data.address : "";
	var tel = data.tel ? data.tel : "";

	$("#" + _public_priject_msg_save_date_from_id + " input[name='id']").val(id);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='name']").val(name);
	$("#" + _public_priject_msg_save_date_from_id + " textarea[name='notes']").val(notes);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='deleteState']").val(deleteState);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='address']").val(address);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='tel']").val(tel);
}

function del(id) {
	/*
	 * showMsg({ msg : "是否确认删除？", type : "question", mode : 1, success :
	 * function(){
	 */
	$.ajax({
		type : "POST",
		url : ctx + "/factory/update",
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