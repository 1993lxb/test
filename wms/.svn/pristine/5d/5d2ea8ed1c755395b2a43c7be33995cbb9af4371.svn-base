var add_data_from_id = "addUnionForm";
$(function() {
	
	autoComplete();
});
// 根据pn及条件模糊查询upn
function searchUPN(query, process) {

	$.ajax({
		type : "POST",
		url : ctx + "/materielDisc/search",
		dataType : "json",
		data : {
			"pn" : pn,
			"query" : query
		},
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				var arr = [];
				$.each(data.data, function(index, item) {
					// alert(item.pn);
					arr.push(item.upn);
				});
				process(arr);
			}
		}
	});
}

// 根据仓库id查询库位信息
function initWarehousePlace() {
	$.ajax({
		type : "POST",
		url : ctx + "/warehousePlace/getByWarehouseId",
		data : {
			"warehouseId" : newWarehouseId
		},
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				$("#newWarehousePlace").empty();
				$.each(data.data, function(index, item) {
					$("<option value=" + item.id + ">" + item.name+ "</option>").appendTo("#newWarehousePlace");
				});
			}
		}
	});
}
//自动填充加载
function autoComplete(){
	// AutoComplete
	$.fn.typeahead.Constructor.prototype.blur = function() {
		var that = this;
		setTimeout(function() {
			that.hide()
		}, 250);
	};
	$('#upnSearch').typeahead({
		source : function(query, process) {
			searchUPN(query, process);
		}
	});
}


// 打开新增子物料
function turnToAddUnion() {
	base.form.validreset('#' + add_data_from_id);
	$("#" + add_data_from_id + " input[name='upn']").val('');
	initWarehousePlace();
	$("#addUnionModal").modal("show");
}
// 检查新增移库单的数据输入
function checkSaveMsg() {
	base.form.validation('#' + add_data_from_id, {
		rules : {
			upn : {
				required : true,
				maxlength : 100
			}
		},
		messages : {
			upn : {
				required : "请填写UPN号",
				maxlength : "UPN号不能超过100字符"
			}
		}
	});
}
// 新增子物料
function addUnion() {
	var upn = $("#upnSearch").val();
	var newWarehousePlaceId = $("#newWarehousePlace").val();
	alert(upn + newWarehousePlaceId);
	if ($('#' + add_data_from_id).valid()) {
		$.ajax({
			type : "POST",
			url : ctx + "/moveUnion/add",
			data : {
				"moveId" : moveId,
				"upn" : upn,
				"newWarehousePlaceId" : newWarehousePlaceId
			},
			async : false,
			success : function(data) {
				if (data == '') {
					$("#addUnionClose").click();
					refresh();
				} else {
					alert(data);
				}
			}
		});
	}

}

// 更新子物料库位
function updateUnion() {

	alert($('#' + update_data_from_id).serialize());

	$.ajax({
		type : "POST",
		url : ctx + "/moveUnion/warehousePlace/update",
		data :$('#' + update_data_from_id).serialize(),
		async : false,
		success : function(data) {
			if (data == '') {
				alert("更新成功.");
				$("#updateUnionClose").click();
				refresh();
			} else {
				alert(data);
			}
		}
	});

}
