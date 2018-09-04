var _public_priject_msg_list_date_id = "userListDate";
var _public_priject_msg_save_date_from_id = "_save_user_form";
var _public_priject_msg_create_btn_id = "create_user_btn_id";
var _public_priject_msg_create_close_btn_id = "saveDateCloss";

$(function () {
	
	create_project_list_dataTable();
	checkSaveMsg();
	initFactory(undefined,"serFactoryName");
	initUserRole();
});



function create_project_list_dataTable(){
	
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#'+_public_priject_msg_list_date_id,
		aoColumns : [ {
			"mDataProp" : "id"
		}, {
			"mDataProp" : "userName"
		}, {
			"mDataProp" : "realName"
		}, {
			"mDataProp" : "factory"
		}, {
			"mDataProp" : "userRoleView"
		}, {
			"mDataProp" : "sex"
		}, {
			"mDataProp" : "tel"
		}, {
			"mDataProp" : "email"
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
			targets : 3,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.factory&&c.factory.name){
					dateStr = c.factory.name;
				}
				return dateStr;
			}
		} ,{
			targets : 5,
			render : function(a, b, c, d) {
				var dateStr = "";
					if(0 == c.sex){
						return "男";
					}else if(1==c.sex){
						return "女";
					}
				return dateStr;
			}
		} ,{
			targets : 9,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.addTime){
					var date = new Date(c.addTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		} ,{
			targets : 10,
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
			targets : 11,
			render : function(a, b, c, d) {
				
				 var html = '<button type="button" onclick = "update('+c.id+')" class="btn btn-primary">重置密码</button>';
				 html +=' <button type="button" onclick = "update('+c.id+')" class="btn btn-primary">修改</button>';
				 html +=' <button type="button" onclick = "del('+c.id+')"  class="btn btn-danger">删除</button> ';
                 
                 
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData['_search_LIKE_userName'] = $('#serUserName').val();
			if($('#serFactoryName').val()){
				aoData['_search_EQ_factory.id'] = $('#serFactoryName').val();
			}
			aoData['_search_EQ_deleteState'] = '0';
		},
		url : ctx+"/user/dataAndUserRole?rand=" + Math.random()
	});
	return table;
};

function checkSaveMsg(){
	base.form.validation('#'+_public_priject_msg_save_date_from_id, {
			rules : {
				userName : {
					required : true,
					maxlength : 100
				},
				realName : {
					required : true,
					maxlength : 100
				},
				'factory.id' : {
					required : true,
				},
				sex : {
					required : true,
				},
				tel : {
					required : true,
				},
				email : {
					required : true,
					maxlength : 100
				}
				
			},
			messages : {
				userName : {
					required : "请填写菜单名称",
					maxlength : "菜单名称不能超过100个字符"
				},
				realName : {
					required : "请填写真实姓名",
					maxlength : "真实姓名不能超过100个字符"
				},
				'factory.id' : {
					required : "请选择工厂"
				},
				sex : {
					required : "请选择性别"
				},
				tel : {
					required : "请填写联系方式"
				},
				email : {
					required : "请填写email",
					maxlength : "请填写email"
				}
			}
	});
}
function saveDateMsg(){
	
	//debugger;
	if($('#'+_public_priject_msg_save_date_from_id).valid()){
		$.ajax({
	        type: "POST",
	        url: ctx+"/user/saveAndRoleMsg",
	        data:$("#"+_public_priject_msg_save_date_from_id).serialize(),
	        dataType: "json",
	        async : false,
	        success: function(data){
	        	
	        	$("#"+_public_priject_msg_create_close_btn_id).click();
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
function update(id) {
	base.form.validreset('#'+_public_priject_msg_save_date_from_id);
	searchOne(id);
}
function searchOne(id){
	$.ajax({
        type: "POST",
        url: ctx+"/user/findOne/",
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
	//debugger;
	var userRole = '';
	if(data&&data.id){
		$.ajax({
	        type: "POST",
	        url: ctx+"/userRole/searchByUserId/", 
	        data:{"userId":data.id},
	        dataType: "json",
	        async : false,
	        success: function(data){
	        	
	        	userRole = data;
	        }
	    });
	}
	
	var id = data.id?data.id:"";
	var userName = data.userName?data.userName:"";
	var realName = data.realName?data.realName:"";
	var notes= data.notes?data.notes:"";
	var deleteState = data.deleteState?data.deleteState:"0";
	var sex = data.sex?data.sex:"0";
	var tel = data.tel?data.tel:"";
	var email = data.email?data.email:"";
	//debugger;
	var factory = data.factory?data.factory.id:"";
	
	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='id']").val(id);
  	$("#"+_public_priject_msg_save_date_from_id+" input[name='userName']").val(userName);
  	$("#"+_public_priject_msg_save_date_from_id+" input[name='realName']").val(realName);
  	$("#"+_public_priject_msg_save_date_from_id+" textarea[name='notes']").val( notes);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='deleteState']").val( deleteState);
   	
  	$('#'+_public_priject_msg_save_date_from_id+' select[name="sex"] option:eq('+sex+')').attr('selected','selected');
   	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='tel']").val( tel);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='email']").val( email);
   	//var f = $('#'+_public_priject_msg_save_date_from_id+' select option:eq('+factory+')');//.attr('selected','selected');
   	
   	
   	initFactory(factory,"saveFactoryId");
   	
   	initUserRole(userRole);
   	
}
function del(id) {
	/*showMsg({
		msg : "是否确认删除？",
		type : "question",
		mode : 1,
		success : function(){*/
			$.ajax({
		        type: "POST",
		        url: ctx+"/user/update",
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
			       	//resinitPorjectuser();
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
;



function initFactory(factoryId,selectId){
	$.ajax({
        type: "POST",
        url: ctx+"/factory/allData",
        data:{"_search_EQ_deleteState":"0"},
        async : false,
        success: function(data){
        	var selected = false;
        	var htmlHead = ' <option value = "" ';
        	var html ='>请选择</option>';
        	
        	if(data){
        		for(var i=0;i<data.length;i++){
        			html+=' <option value = "'+data[i].id+'" ';
        			if(factoryId==data[i].id){
        				html+=' selected="selected" ';
        				selected = true;
        			}
        			html+=' >'+data[i].name+'</option>';
        		}
        	}
        	if(!selected){
        		htmlHead+=' selected="selected" ';
        	}
        	$('#'+selectId).html(htmlHead+html);
        	
        }
    });
}
function initUserRole(userRole){
	$.ajax({
        type: "POST",
        url: ctx+"/role/allData",
        data:{"_search_EQ_deleteState":"0"},
        async : false,
        success: function(data){
        	var str = "";
        	for (var i = 0; i < data.length; i++) { 
        		str+='<div >';
        		str+='<input type="checkbox" name="userRole['+i+'].cxRoleByRoleId.id" placeholder="" value="'+data[i].id+'" ';
        		if(userRole){
        			for(var j = 0;j<userRole.length;j++){
            			if(userRole[j].cxRoleByRoleId&&userRole[j].cxRoleByRoleId.id==data[i].id){
            				str+=' checked="checked" ';
            				continue;
            			}
            		}
        		}
        		
        		str+='/>'+data[i].roleName;
        		str+='</div>';
        		
	        }; 
	        $("#userRoleVew").html(str);
        }
    });
}
