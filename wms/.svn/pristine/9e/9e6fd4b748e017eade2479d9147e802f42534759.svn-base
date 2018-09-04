var _public_priject_msg_list_date_id = "listTable";
var _public_priject_msg_save_date_from_id = "_save_form";
var _public_priject_msg_create_btn_id = "create_btn";
var _public_priject_msg_create_close_btn_id = "close_btn";

$(function() {
	create_list_dataTable();
	checkSaveMsg();
});

$(function(){
	// 上传初始化
	Zepto('#imagePath').resizeAndUploadIMG({
		//bindId: 'fileToUpload',
		resizeCallback: function(src) {
			//选择图片展示，不能用于保存
			// $('#span_file_upload_edit').css({'background-image': 'url('+src+')'});
		},
		uploadCallback: function(file) {
			$("#urlPath").attr("src", file);
			//保存图片地址
			var filePath = file.substring(file.lastIndexOf("/img") + 4, file.length);
			$('#imgUrl').val(filePath);
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
			"mDataProp" : "factory.name"
		}, {
			"mDataProp" : "isMajorWh"
		}, {
			"mDataProp" : "isBondedWh"
		}, {
			"mDataProp" : "address"
		}, {
			"mDataProp" : "tel"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "imagePath"
		} ],
		columnDefs : [
	              {
	  					targets : 3,
	  					render : function(a, b, c, d) {
	  						var isMajorWhStr = "否";
	  						if(c.isMajorWh){
	  							isMajorWhStr = "是";
	  						}
	  						return isMajorWhStr;
	  					}
	              },{
	  					targets : 4,
	  					render : function(a, b, c, d) {
	  						var isBondedWhStr = "否";
	  						if(c.isBondedWh){
	  							isBondedWhStr = "是";
	  						}
	  						return isBondedWhStr;
	  					}
	              },
				{
					targets : 7,
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
					targets : 8,
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
					targets : 9,
					render : function(a, b, c, d) {
						var html = '<button type="button" onclick = "showMap(\'' + c.imagePath + '\')" class="btn btn-primary">查看地图</button> ';
						html += '<button type="button" onclick = "update(' + c.id + ')" class="btn btn-primary">修改</button> ';
						html += '<button type="button" onclick = "del(' + c.id + ')"  class="btn btn-danger">删除</button> ';
						return html;
					}
				} ],
		fnServerParams : function(aoData) {
			aoData['_search_EQ_deleteState'] = 0;
			aoData['_search_LIKE_name'] = $('#wName').val();
			aoData['_search_ORDERDESC_addTime'] = "addTime";
		},
		url : ctx + "/warehouse/data?rand=" + Math.random()
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
			'factory.id' : {
				required : true
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
			'factory.id' : {
				required : "请选择工厂",
			},
			address : {
				required : "请填写仓库地址",
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
			url : ctx + "/warehouse/save/",
			data : $("#" + _public_priject_msg_save_date_from_id).serialize(),
			dataType : "json",
			async : false,
			success : function(data) {
				// $("#" + _public_priject_msg_create_close_btn_id).click();
				$("#wModal").modal("hide");
				writeOne("");
				search();
			}
		});
	}
}

function create() {
	writeOne("");
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	$("#wModal").modal("show");
}
function update(id) {
	base.form.validreset('#' + _public_priject_msg_save_date_from_id);
	searchOne(id);
}

function showMap(imagePath) {
	$.ajax({
		type : "POST",
		url : ctx + "/warehouse/showMap",
		data : {
			"imagePath" : imagePath
		},
		success : function(data) {
			$("#showImagePath").attr("src", data);
			$("#mapModal").modal("show");
		},
		error: function(){
		    alert(arguments[1]);
		}
	});
}

function searchOne(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/warehouse/findOne/",
		data : {
			"id" : id
		},
		dataType : "json",
		success : function(data) {
			if (data.id) {
				writeOne(data);
				$("#wModal").modal("show");
			}
		}
	});
}
function writeOne(data) {
	var id = data.id ? data.id : "";
	var name = data.name ? data.name : "";
	var notes = data.notes ? data.notes : "";
	var factory = data.factory ? data.factory : "";
	var factoryId = factory.id ? factory.id : "";
	var deleteState = data.deleteState ? data.deleteState : "0";
	var isMajorWh = data.isMajorWh ? data.isMajorWh : "0";
	var isBondedWh = data.isBondedWh ? data.isBondedWh : "0";
	var imagePath = data.imagePath ? data.imagePath : "";
	var address = data.address ? data.address : "";
	var tel = data.tel ? data.tel : "";
	var urlPath = data.imagePath ? data.imagePath : "";

	initComboList();
	$("#" + _public_priject_msg_save_date_from_id + " input[name='id']").val(id);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='name']").val(name);
	$("#factory").val(factoryId);
	$("#" + _public_priject_msg_save_date_from_id + " textarea[name='notes']").val(notes);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='deleteState']").val(deleteState);
	$("#isMajorWh").val(isMajorWh);
	$("#isBondedWh").val(isBondedWh);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='imagePath']").val(imagePath);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='address']").val(address);
	$("#" + _public_priject_msg_save_date_from_id + " input[name='tel']").val(tel);
	$("#urlPath").attr("src", urlPath);
	
	$("#imagePathText").text();
}

function initComboList() {
	$.ajax({
		type : "POST",
		url : ctx + "/factory/allData",
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
				$("#factory").html(options);
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
		url : ctx + "/warehouse/update",
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