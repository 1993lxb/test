var _public_priject_msg_list_date_id = "listTable";
var _public_priject_msg_save_date_from_id = "_save_form";
var _public_priject_msg_create_btn_id = "create_btn";
var _public_priject_msg_create_close_btn_id = "close_btn";

$(function() {
	initComboList();
	create_list_dataTable();
});

function create_list_dataTable() {
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#' + _public_priject_msg_list_date_id,
		aoColumns : [ 
		{
			"mDataProp" : "pn"
		}, {
			"mDataProp" : "name"
		}, {
			"mDataProp" : "specification"
		}, {
			"mDataProp" : "materialGroup.name"
		}, {
			"mDataProp" : "totalNum"
		}, {
			"mDataProp" : "unit.name"
		} ],
		fnServerParams : function(aoData) {
			aoData['warehouseId'] = $("#warehouse").val();
			aoData['pn'] = $("#pn").val();
		},
		url : ctx + "/materiel/findMaterielListByWarehousePn?rand=" + Math.random()
	});
	return table;
};

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
				var options = "<option value='0'>请选择</option>";
				for (var index = 0; index < data.length; index++) {
					var entity = data[index];
					options += "<option value=" + entity.id + ">" + entity.name + "</option>";
				}
				$("#warehouse").html(options);
			}
		}
	});
}
function search() {
	var tab = $('#' + _public_priject_msg_list_date_id).dataTable();
	tab.fnDraw(false);
}

