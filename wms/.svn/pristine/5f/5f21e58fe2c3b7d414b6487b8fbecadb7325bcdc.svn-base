var _public_priject_msg_list_date_id = "sub_materielList";
var _public_priject_msg_save_date_from_id = "_save_mainMateriel_form";
var _public_priject_msg_create_btn_id = "add";
var _public_priject_msg_create_close_btn_id = "saveDateCloss";


$(function () {
	create_unit_list_dataTable();
	checkSaveMsg();
	initMaterialComboList("materiel");
	initMaterialSupplierComboList("supplier");
	initWarehouseComboList("warehouse");
	$("#warehouse").change(function() {
		if (this.value != '') {
			$("#warehouseArea").empty();
			$("#warehousePlace").empty();
			initWarehouseAreaComboList("warehouseArea", "请选择", this.value);
			$("#warehousePlace").html("<option value=''>请选择</option>");
		} else {
			$("#warehouseArea").html("<option value=''>请选择</option>");
			$("#warehousePlace").html("<option value=''>请选择</option>");
		}
	});
	$("#warehouseArea").change(function() {
		if (this.value != '') {
			$("#warehousePlace").empty();
			initWarehousePlaceComboList("warehousePlace", "请选择", this.value);
		} else {
			$("#warehousePlace").html("<option value=''>请选择</option>");
		}
	});
	
});



function create_unit_list_dataTable(){
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#sub_materielList',
		aoColumns : [  {
			"mDataProp" : "upn"
		}, {
			"mDataProp" : "materiel.name"
		}, {
			"mDataProp" : "productionDate"
		}, {
			"mDataProp" : "expireDate"
		}, {
			"mDataProp" : "supplier.name"
		}, {
			"mDataProp" : "barcode"
		}, {
			"mDataProp" : "currentNum"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "caption"
		}, {
			"mDataProp" : "upn"
				
		} ],
		columnDefs : [{
			targets : 2,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.productionDate){
					var date = new Date(c.productionDate); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		} ,{
			targets : 3,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.expireDate){
					var date = new Date(c.expireDate); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
					return dateStr;
				}
				return dateStr;
			}
		},{
			targets : 7,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.addTime){
					var date = new Date(c.addTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
					return dateStr;
				}
				return dateStr;
			}
		},{
			targets : 8,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.editTime){
					var date = new Date(c.editTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
					return dateStr;
				}
				return dateStr;
			}
		} ,{
			targets : 10,
			render : function(a, b, c, d) {
				 var html = '<button type="button" onclick = "update(\''+c.upn+'\')" class="btn btn-primary">修改</button>';
				 html +=' <button type="button" onclick = "del(\''+c.upn+'\')"  class="btn btn-primary">删除</button> ';
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData.upn = $('#serSubMaterier').val();
		},
		url : ctx+"/materielDisc/findSubMaterielList?rand=" + Math.random()
	});
return table;
};
function search() {
	var tab = $('#sub_materielList').dataTable();
	tab.fnDraw(false) ;
}

function initMaterialComboList(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/materiel/allData",
		data : {
			"deleteState" : 0
		},
		async : false,
		success : function(data) {
			if (data.length > 0) {
				var options = "<option value=''>请选择</option>";
				for (var index = 0; index < data.length; index++) {
					var entity = data[index];
					options += "<option value='" + entity.pn + "'>" + entity.pn + "</option>";
				}
				$("#" + id).html(options);
			} else {
				$("#" + id).html("<option value=''>请选择</option>");
			}
		}
	});
}

function initMaterialSupplierComboList(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/supplierManager/allData",
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

//仓库
function initWarehouseComboList(id) {
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
					options += "<option value=" + entity.id + ">" + entity.name + "</option>";
				}
				$("#" + id).html(options);
			} else {
				$("#" + id).html("<option value=''>请选择</option>");
			}
		}
	});
}

//区域
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

//库位
function initWarehousePlaceComboList(id, optionStr, warehouseAreaId) {
	$.ajax({
		type : "POST",
		url : ctx + "/warehousePlace/allData",
		data : {
			"_search_EQ_deleteState" : 0,
			"_search_EQ_warehouseArea.id" : warehouseAreaId
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
function checkSaveMsg(){
	base.form.validation('#' + _public_priject_msg_save_date_from_id, {
		rules : {
			upn : {
				required : true,
				maxlength : 100
			}, 'materiel.id' : {
				required : true,
			}, productionDate : {
				required : true
			}, expireDate : {
				required : true
			}, warehousePlace : {
				required : true,
			}, 'supplier.id' : {
				required : true,
			}, barcode : {
				required : true,
			}, maxNum : {
				required : true,
			}, currentNum : {
				required : true,
			}, notes : {
				maxlength : 200
			}
		},
		messages : {
			upn : {
				required : "请填写upn",
				maxlength : "upn不能超过100个字符"
			}, 'materiel.id' : {
				required : "请选择所属主材料",
			}, productionDate : {
				required : "请填写生产日期"
			}, expireDate : {
				required : "请填写保质日期"
			}, warehousePlace : {
				required : "请选择所属库位"
			}, 'supplier.id' : {
				required : "请选择供应商"
			}, barcode : {
				required : "请填写条形码",
				maxlength : "条形码不能超过100个字符"
			}, maxNum : {
				required : "请填写料盘最大数量"
			}, currentNum : {
				required : "请填写料盘当前数量"
			}, notes : {
				maxlength : "说明不能超过200个字符"
			}
		}
	});
}
function saveDateMsg(){
	if($('#'+_public_priject_msg_save_date_from_id).valid()){
		$.ajax({
	        type: "POST",
	        url: ctx+"/materielDisc/saveOrUpdateMaterielDisc/",
	        data:$("#"+_public_priject_msg_save_date_from_id).serialize(),
	        dataType: "json",
	        async : false,
	        success: function(data){
	        	
//	        	$("#"+_public_priject_msg_create_close_btn_id).click();
	        	$("#myModal").modal('hide');
	        	writeOne("");
	        	search();
	        }
	    });
	}
}

function create(){
	writeOne("");
	base.form.validreset('#'+_public_priject_msg_save_date_from_id);
	$("#"+_public_priject_msg_create_btn_id).click();
}
function update(pn) {
	base.form.validreset('#'+_public_priject_msg_save_date_from_id);
	searchOne(pn);
}
function searchOne(pn){
	
	$.ajax({
        type: "POST",
        url: ctx+"/materielDisc/findOne/",
        data:{"upn":pn},
        dataType: "json",
        success: function(data){
        	if(data.upn){
        	   writeOne(data);
        	   $("#myModal").modal('show');
//        	   $("#"+_public_priject_msg_create_btn_id).click();
        	}
        }
    });
}
function writeOne(data){
	var upn = data.upn?data.upn:"";
	var materiel = data.materiel?data.materiel:"";
	var pn = materiel ? materiel.pn : "";
	var productionDate = data.productionDate?data.productionDate:"";
	var expireDate = data.expireDate?data.expireDate:"";
	var supplier= data.supplier?data.supplier:"";
	var barcode = data.barcode?data.barcode:"";
	var maxNum = data.maxNum?data.maxNum:"";
	var currentNum = data.currentNum?data.currentNum:"";
	var notes = data.notes?data.notes:"";
	
	if(materiel ==''){
		$("#materiel").val("");
	}else{
		$("#materiel").val(pn);
	}
	if(supplier ==''){
		$("#supplier").val("");
	}else{
		$("#supplier").val(supplier.id);
	}
	var warehouse= data.warehousePlace.warehouseArea.warehouse.id?data.warehousePlace.warehouseArea.warehouse.id:"";
	var warehouseArea= data.warehousePlace.warehouseArea.id?data.warehousePlace.warehouseArea.id:"";
	var warehousePlace= data.warehousePlace.id?data.warehousePlace.id:"";
	if (warehouse != '') {
		$("#warehouse").val(warehouse);
		initWarehouseAreaComboList("warehouseArea", "请选择", warehouse);
		$("#warehouseArea").val(warehouseArea);
	} else {
		$("#warehouse").val("");
		$("#warehouseArea").empty();
		$("#warehouseArea").html("<option value=''>请选择</option>");
	}
	if (warehouseArea != '') {
		$("#warehouseArea").val(warehouseArea);
		initWarehousePlaceComboList("warehousePlace", "请选择", warehouseArea);
		$("#warehousePlace").val(warehousePlace)
	} else {
		$("#warehousePlace").empty();
		$("#warehousePlace").html("<option value=''>请选择</option>");
	}
	if(warehousePlace !=''){
		$("#warehousePlace").val(warehousePlace);
	}else{
		$("#warehousePlace").val('');
	}
	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='upn']").val(upn);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='productionDate']").val(productionDate);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='expireDate']").val(expireDate);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='barcode']").val( barcode);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='maxNum']").val( maxNum);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='currentNum']").val( currentNum);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='notes']").val( notes);
}
function del(pn) {
//	showMsg({
//		msg : "是否确认删除？",
//		type : "question",
//		mode : 1,
//		success : function(){
			$.ajax({
		        type: "POST",
		        url: ctx+"/materielDisc/del",
		        data:{"upn":pn,"deleteState":1},
		        async : false,
		        success: function(){
		       	   writeOne("");
		       	   var dt = $('#'+_public_priject_msg_list_date_id).dataTable().fnSettings();
			       	var start = dt._iDisplayStart; 
			       	var total = dt.fnRecordsDisplay(); 
			       	if((total-start)==1){ 
			       		if (start > 0) { 
			       		$('#'+_public_priject_msg_list_date_id).dataTable().fnPageChange( 'previous', true ); 
			       		} 
			       	} 
			       	search();
			       	// resinitPorjectMenu();
		        }
		    });
//		}
//	});
}
function search() {
	var tab = $('#'+_public_priject_msg_list_date_id).dataTable();
	tab.fnDraw(false) ;
}
function searchMsg(){
	$('#'+_public_priject_msg_list_date_id).dataTable().fnSettings()._iDisplayStart = 1; 
	search();
}

function createReport(id){
	$("#"+_public_priject_msg_create_btn_id).click();
}