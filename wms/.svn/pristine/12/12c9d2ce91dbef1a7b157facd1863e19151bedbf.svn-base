$(function() {
	initStateSelect();
	initMoveType();
	create_move_list_dataTable();
	// checkSaveMsg();

});
// 初始化状态选择框
function initStateSelect() {
	$.ajax({
		type : "POST",
		url : ctx + "/moveHistory/state/getByCurrentState",
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				$.each(data.data, function(index, item) {
					$(
							"<option value=" + item.id + ">" + item.name
									+ "</option>").appendTo("#moveStatus");
				});
			}
		}
	});
}
// 初始化移库类型
function initMoveType() {
	$.ajax({
		type : "POST",
		url : ctx + "/moveType/findAll",
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				$.each(data.data, function(index, item) {
					// 查询中的移库类型
					$(
							"<option value=" + item.id + ">" + item.name
									+ "</option>").appendTo("#moveType");
					// 新增移库中的移库类型
					$(
							"<option value=" + item.id + ">" + item.name
									+ "</option>").appendTo("#addMoveType");
				});
			}
		}
	});
}

/*******************************************************************************
 * 移库历史记录列表数据
 * 
 * @returns
 */
function create_move_list_dataTable() {

	var table = base.datatable
			.table({
				'iDisplayLength' : 10,
				tableid : '#moveList',
				aoColumns : [ {
					"mDataProp" : "id"
				}, {
					"mDataProp" : "orderNum"
				}, {
					"mDataProp" : "bomNum"
				}, {
					"mDataProp" : "cxMateriel.pn"
				}, {
					"mDataProp" : "needsNum"
				}, {
					"mDataProp" : "actualNum"
				}, {
					"mDataProp" : "moveType.name"
				}, {
					"mDataProp" : "oldWarehouse.name"
				}, {
					"mDataProp" : "newWarehouse.name"
				}, {
					"mDataProp" : "statusName"
				}, {
					"mDataProp" : "sendTime"
				}, {
					"mDataProp" : "id"
				} ],
				columnDefs : [
						{
							targets : 10,
							render : function(a, b, c, d) {
								var dateStr = "";
								if (c.sendTime) {
									var date = new Date(c.sendTime);
									dateStr = date
											.format("yyyy-MM-dd hh:mm:ss");
								}
								return dateStr;
							}
						},
						{
							targets : 11,
							render : function(a, b, c, d) {

								var html = ' <button type="button" onclick = "querySub('+ c.id+ ')" class="btn btn-primary">查看子物料</button>';
								// html += ' <button type="button" onclick =
								// "turnToUpdate(\''+ c.id+ '\')" class="btn
								// btn-primary">修改</button>';
								if (c.updateOpr) {
									html += ' <button type="button" onclick = "turnToUpdateState(\''
											+ c.id
											+ '\')" class="btn btn-primary">修改订单状态</button>';
								}
								if(c.deleteOpr){
								html += '  <button type="button" onclick = "del('
										+ c.id
										+ ')"  class="btn btn-danger">删除</button> ';
								}
								return html;
							}
						} ],
				fnServerParams : function(aoData) {
					aoData.orderNum = $('#orderNum').val();
					aoData.pn = $('#pn').val();
					aoData.moveType = $('#moveType').val();
					aoData.status = $('#moveStatus').val();
					aoData.bomNum = $('#bomNum').val();
				},
				url : ctx + "/moveHistory/findMoveHistoryList?rand="
						+ Math.random()
			});
	return table;
};

// 删除
function del(id) {
	var r = confirm("确认删除？");
	if (r) {
		$.ajax({
			type : "POST",
			url : ctx + "/moveHistory/delete",
			data : {
				"id" : id
			},
			async : false,
			success : function(data) {
				if (data.errcode != 0) {
					alert(data.errmsg);
				} else {
					alert("删除成功.");
					var dt = $('#moveList').dataTable().fnSettings();
					var start = dt._iDisplayStart;
					var total = dt.fnRecordsDisplay();
					if ((total - start) == 1) {
						if (start > 0) {
							$('#moveList').dataTable().fnPageChange('previous',
									true);
						}
					}
					search();
				}

			}
		});
	}

}

// 查询子物料
function querySub(id) {
	var params = id;
	openMenu2(102, params);
}

// 查询
function search() {
	var tab = $('#moveList').dataTable();
	tab.fnDraw(false);
}
// 弹出层提交后刷新列表
function refresh() {
	var dt = $('#moveList').dataTable().fnSettings();
	var start = dt._iDisplayStart;
	var total = dt.fnRecordsDisplay();
	if ((total - start) == 1) {
		if (start > 0) {
			$('#moveList').dataTable().fnPageChange('previous', true);
		}
	}
	search();
}
