var _public_priject_msg_list_date_id = "main_materielList";
var _public_priject_msg_save_date_from_id = "_save_mainMateriel_form";
var _public_priject_msg_create_btn_id = "add";
var _public_priject_msg_create_close_btn_id = "saveDateCloss";


$(function () {
	create_unit_list_dataTable();
	checkSaveMsg();
	initMaterialGroupComboList("groupName");
	initMaterialGroupComboList("materialGroup");
	initMaterialUnitComboList("unit");
});



function create_unit_list_dataTable(){
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#main_materielList',
		aoColumns : [  {
			"mDataProp" : "pn"
		}, {
			"mDataProp" : "name"
		}, {
			"mDataProp" : "specification"
		}, {
			"mDataProp" : "materialGroup.name"
		}, {
			"mDataProp" : "isHumidity"
		}, {
			"mDataProp" : "barcode"
		}, {
			"mDataProp" : "unit.name"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "pn"

		} ],
		columnDefs : [ {
			targets : 4,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.isHumidity==0){
					dateStr = "不是";
				}else if(c.isHumidity==1){
					dateStr = "是";
				}
				return dateStr;
			}
		} ,{
			targets : 7,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.addTime){
					var date = new Date(c.addTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		} ,{
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
			targets : 9,
			render : function(a, b, c, d) {
				 var html = '<button type="button" onclick = "update(\''+c.pn+'\')" class="btn btn-primary">修改</button>';
				 html +=' <button type="button" onclick = "del(\''+c.pn+'\')"  class="btn btn-primary">删除</button> ';
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData.pn = $('#serMainMaterier').val();
			aoData.groupName = $('#groupName').val();
		},
		url : ctx+"/materiel/findMainMaterielList?rand=" + Math.random()
	});
return table;
};
function search() {
	var tab = $('#main_materielList').dataTable();
	tab.fnDraw(false) ;
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

function initMaterialUnitComboList(id) {
	$.ajax({
		type : "POST",
		url : ctx + "/unit/allData",
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

function checkSaveMsg(){
	base.form.validation('#' + _public_priject_msg_save_date_from_id, {
		rules : {
			pn : {
				required : true,
				maxlength : 100
			}, name : {
				required : true,
				maxlength : 100
			}, specification : {
				required : true
			}, 'materialGroup.id' : {
				required : true
			}, isHumidity : {
				required : true,
			}, barcode : {
				required : true,
			}, "unit.id" : {
				required : true,
			}, notes : {
				maxlength : 200
			}
		},
		messages : {
			pn : {
				required : "请填写Pn",
				maxlength : "pn不能超过100个字符"
			}, name : {
				required : "请填写名字",
				maxlength : "名称不能超过100个字符"
			}, specification : {
				required : "请填写物料规格"
			}, 'materialGroup.id' : {
				required : "请选择物料组"
			}, isHumidity : {
				required : "请选择湿敏材料种类"
			}, barcode : {
				required : "请填写条形码",
				maxlength : "条形码不能超过100个字符"
			}, 'unit.id' : {
				required : "请选择物料单位"
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
	        url: ctx+"/materiel/saveOrUpdateMateriel/",
	        data:$("#"+_public_priject_msg_save_date_from_id).serialize(),
	        dataType: "json",
	        async : false,
	        success: function(data){
	        	//$("#"+_public_priject_msg_create_close_btn_id).click();
	        	//$("#"+_public_priject_msg_create_close_btn_id)..modal('hide');
	        	$("#editModal").modal('hide');
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
        url: ctx+"/materiel/findOne/",
        data:{"pn":pn},
        dataType: "json",
        success: function(data){
        	if(data.pn){
        	   writeOne(data);
        	   $("#editModal").modal('show');
        	   //$("#"+_public_priject_msg_create_btn_id).click();
        	}
        }
    });
}
function writeOne(data){
	var pn = data.pn?data.pn:"";
	var name = data.name?data.name:"";
	var specification = data.specification?data.specification:"";
	var barcode = data.barcode?data.barcode:"";
	var notes = data.notes?data.notes:"";
	
	var unit = data.unit.id?data.unit.id:"";
	if(unit ==''){
		$("#unit").val("");
	}else{
		$("#unit").val(unit);
	}
	var isHumidity= data.isHumidity;
	$("#isHumidity").val(isHumidity);
	var materialGroup = data.materialGroup.id?data.materialGroup.id:"";
	if(materialGroup ==''){
		$("#materialGroup").val("");
	}else{
		$("#materialGroup").val(materialGroup);
	}
	
	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='pn']").val(pn);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='name']").val(name);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='specification']").val(specification);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='barcode']").val( barcode);
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
		        url: ctx+"/materiel/del",
		        data:{"pn":pn,"deleteState":1},
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