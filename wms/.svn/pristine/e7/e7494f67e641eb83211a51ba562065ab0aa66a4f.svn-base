var _public_priject_msg_list_date_id = "supplierList";
var _public_priject_msg_save_date_from_id = "_save_supplier_form";
var _public_priject_msg_create_btn_id = "add";
var _public_priject_msg_create_close_btn_id = "saveDateCloss";

$(function () {
	
	create_unit_list_dataTable();
	checkSaveMsg();
});



function create_unit_list_dataTable(){
	
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#'+_public_priject_msg_list_date_id,
		aoColumns : [ {
			"mDataProp" : "id"
		}, {
			"mDataProp" : "name"
		}, {
			"mDataProp" : "isElectronic"
		}, {
			"mDataProp" : "notes"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "id"

		} ],
		columnDefs : [ {
			targets : 2,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.isElectronic==0){
					dateStr = "非电子料"; 
				}else if(c.isElectronic==1){
					dateStr = "电子料";
				}
				return dateStr;
			}
		},{
			targets : 4,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.addTime){
					var date = new Date(c.addTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		} ,{
			targets : 5,
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
			targets : 6,
			render : function(a, b, c, d) {
				 var context = {
					func : [ {
						"name" : "删除",
						"fn" : "del(" + c.id + ",'" + c.name + "')",
						"type" : "default"
					} ]
				};
				//var html = template(context); 
//				 var html = '<a href="javascript:update('+c.id+')" class="op-a" ><i class="fa fa-edit"></i></a>';
//				 html +=' <a href="javascript:del('+c.id+')" class="op-a"><i class="fa fa-trash"></i></a> ';
				
				 var html = '<button type="button" onclick = "update('+c.id+')" class="btn btn-primary">修改</button>';
				 html +=' <button type="button" onclick = "del('+c.id+')"  class="btn btn-danger">删除</button> ';
                 
                 
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData['_search_LIKE_name'] = $('#serMaterialGroupName').val();
			aoData['_search_EQ_deleteState'] = '0';
			//aoData['_search_EQ_projectMsg.id'] = $('#projectMsgId').val();
			//aoData.status = $('#status').val();
		},
		url : ctx+"/materialGroupManager/data?rand=" + Math.random()
	});
return table;
};

function checkSaveMsg(){
	base.form.validation('#'+_public_priject_msg_save_date_from_id, {
			rules : {
				name : {
					required : true,
					maxlength : 100
				},
				notes : {
					required : true,
				}
				
			},
			messages : {
				name : {
					required : "请填写单位名称",
					maxlength : "单位名称不能超过100个字符"
				},
				notes : {
					required : "请填写备注"
				},
			}
	});
}
function saveDateMsg(){
	//debugger;
	if($('#'+_public_priject_msg_save_date_from_id).valid()){
		$.ajax({
	        type: "POST",
	        url: ctx+"/materialGroupManager/save/",
	        data:$("#"+_public_priject_msg_save_date_from_id).serialize(),
	        dataType: "json",
	        async : false,
	        success: function(data){
	        	
	        	$("#"+_public_priject_msg_create_close_btn_id).click();
	//        	alert('发布成功！');
//	        	showMsg({
//	        		msg : "发布成功！",
//	        		type : "success"
//	        	});
	        	writeOne("");
	        	search();
	        	//resinitPorjectMenu();
	        }
	    });
	}
}

function create(){
	writeOne("");
	base.form.validreset('#'+_public_priject_msg_save_date_from_id);
	$("#"+_public_priject_msg_create_btn_id).click();
}
function update(id) {
	base.form.validreset('#'+_public_priject_msg_save_date_from_id);
	searchOne(id);
}
function searchOne(id){
	$.ajax({
        type: "POST",
        url: ctx+"/materialGroupManager/findOne/",
        data:{"id":id},
        dataType: "json",
        success: function(data){
        	if(data.id){
        	   writeOne(data);
        	   $("#"+_public_priject_msg_create_btn_id).click();
        	}
        }
    });
}
function writeOne(data){
	var id = data.id?data.id:"";
	var name = data.name?data.name:"";
	var isElectronic = data.isElectronic?data.isElectronic:"";
	var notes= data.notes?data.notes:"";
	var deleteState = data.deleteState?data.deleteState:"0";
	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='id']").val(id);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='name']").val(name);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='isElectronic']").val(isElectronic);
   	$("#"+_public_priject_msg_save_date_from_id+" textarea[name='notes']").val( notes);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='deleteState']").val( deleteState);
}
function del(id) {
	/*showMsg({
		msg : "是否确认删除？",
		type : "question",
		mode : 1,
		success : function(){*/
			$.ajax({
		        type: "POST",
		        url: ctx+"/materialGroupManager/update",
		        data:{"id":id,"deleteState":"1"},
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
			       	//resinitPorjectMenu();
		        }
		    });
	/*	}
	});*/
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