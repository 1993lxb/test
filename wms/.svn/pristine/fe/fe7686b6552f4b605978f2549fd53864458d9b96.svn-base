var _public_priject_msg_list_date_id = "roleListDate";
var _public_priject_msg_save_date_from_id = "_save_role_form";
var _public_priject_msg_create_btn_id = "create_role_btn_id";
var _public_priject_msg_create_close_btn_id = "saveDateCloss";
var roleIds;
$(function () {
	
	create_project_list_dataTable();
	checkSaveMsg();
});



function create_project_list_dataTable(){
	
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#'+_public_priject_msg_list_date_id,
		aoColumns : [ {
			"mDataProp" : "id"
		}, {
			"mDataProp" : "roleName"
		}, {
			"mDataProp" : "roleMenuView"
		}, {
			"mDataProp" : "notes"
		}, {
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "id"

		} ],
		columnDefs : [ /*{
			targets : 2,
			render : function(a, b, c, d) {
				// TODO 获得权限
				var dateStr = "";
				var sp = "";
//				if(c.roleMenu){
//					for (var i = 0; i < c.roleMenu; i++) { 
//						dateStr+=c.roleMenu[i].cxMenuByMenuId.menuName;
//			        }; 
//				}
				
				$.ajax({
			        type: "POST",
			        url: ctx+"/roleMenu/searchByRoleId/", 
			        data:{"roleId":c.id},
			        dataType: "json",
			        async : false,
			        success: function(data){
			        	
			        	if(data){
			        		for(var i=0;i<data.length;i++){
			        			console.log(data[i]);
			        			if(data[i]&&data[i].cxMenuByMenuId){
			        				
			        				dateStr += sp + data[i].cxMenuByMenuId.menuName;
				        			sp = ',';
			        			}
			        			
			        		}
			        	}
			        }
			    });
				return dateStr;
			}
		} ,*/{
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
				
				 var html = '<button type="button" onclick = "update('+c.id+')" class="btn btn-primary">修改</button>';
				 html +=' <button type="button" onclick = "del('+c.id+')"  class="btn btn-danger">删除</button> ';
                 
                 
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData['_search_LIKE_roleName'] = $('#serUnitName').val();
			aoData['_search_EQ_deleteState'] = '0';
			//aoData['_search_EQ_projectMsg.id'] = $('#projectMsgId').val();
			//aoData.status = $('#status').val();
		},
		url : ctx+"/role/dataAmdMenuMsg?rand=" + Math.random()
	});
return table;
};

function checkSaveMsg(){
	base.form.validation('#'+_public_priject_msg_save_date_from_id, {
			rules : {
				roleName : {
					required : true,
					maxlength : 100
				},
				notes : {
					required : true,
				}
				
			},
			messages : {
				roleName : {
					required : "请填写菜单名称",
					maxlength : "菜单名称不能超过100个字符"
				},
				notes : {
					required : "请填写备注"
				},
			}
	});
}
function saveDateMsg(){
	//debugger;
	var data = {'roleName':$("roleName").val()}
	if($('#'+_public_priject_msg_save_date_from_id).valid()){
		$.ajax({
	        type: "POST",
	        url: ctx+"/role/saveAndMenuMsg/",
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
	        	//resinitPorjectrole();
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
        url: ctx+"/role/findOne/", 
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
	roleIds = data.id;
	var roleMenu = '';
	if(data&&data.id){
		
		$.ajax({
	        type: "POST",
	        url: ctx+"/roleMenu/searchByRoleId/", 
	        data:{"roleId":data.id},
	        dataType: "json",
	        async : false,
	        success: function(data){
	        	
	        	roleMenu = data;
	        	/*if(data){
	        		for(var i=0;i<data.length;i++){
	        			console.log(data[i]);
	        			if(data[j].cxMenuByMenuId.id==data[i].id){
	        				str+=' checked="checked" ';
	        				continue;
	        			}
	        			
	        		}
	        	}*/
	        }
	    });
	}
	
	
	initRoleMenu(roleMenu);
	var id = data.id?data.id:"";
	var roleName = data.roleName?data.roleName:"";
	var notes= data.notes?data.notes:"";
	var deleteState = data.deleteState?data.deleteState:"0";
	
	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='id']").val(id);
  	$("#"+_public_priject_msg_save_date_from_id+" input[name='roleName']").val(roleName);
  	$("#"+_public_priject_msg_save_date_from_id+" textarea[name='notes']").val( notes);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='deleteState']").val( deleteState);
   	
}

function initRoleMenu(roleMenu){
	$.ajax({
        type: "POST",
        url: ctx+"/menu/allData",
        data:{"_search_EQ_deleteState":"0"},
        async : false,
        success: function(data){
        	var setting = {
        			check: {
        				enable: true
        			},
        			data: {
        				simpleData: {
        					enable: true
        				}
        			},
        			callback: {
        				onCheck: onCheck
        			}
        		};
        	function onCheck(e, treeId, treeNode) {
        		var names;
        		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        		var nodes = zTree.getCheckedNodes(true);
        		for(var i = 0; i < data.length; i++){
        			if($("#"+i).length>0){
        				$("#"+i).remove();
        			}
        			
        		}
        		if(nodes.length!=0){
        			for(i=0;i<nodes.length;i++){
        				var index=nodes[i].tId.split("_")[1];
        				index=index-1;
        				$("#_save_role_form").append(' <input type="hidden" id='+index+' class="hideBean" name="roleMenu['+index+'].cxMenuByMenuId.id" value=""/>');
        				$("#"+index).val(nodes[i].id);
        			}
        		}
        		
    		}
        	var zNodes=[];
        	
        	for (var i = 0; i < data.length; i++) { 
        		if($("#"+i).length>0){
    				$("#"+i).remove();
    			}
        		if(data[i].id==roleIds){
        			$("#_save_role_form").append(' <input type="hidden" id='+i+' class="hideBean" name="roleMenu['+i+'].cxMenuByMenuId.id" value=""/>');
        			$("#"+i).val(data[i].id);
        			var htmlStr = {id:data[i].id,pId:data[i].pId,name:data[i].name,open:true,checked:true};
            		zNodes[i] = htmlStr;
        		}else{
        			var htmlStr = {id:data[i].id,pId:data[i].pId,name:data[i].name,open:true};
            		zNodes[i] = htmlStr;
        		}
        		
        	}		
        	
 			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
    });
}
function del(id) {
	/*showMsg({
		msg : "是否确认删除？",
		type : "question",
		mode : 1,
		success : function(){*/
			$.ajax({
		        type: "POST",
		        url: ctx+"/role/update",
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
			       	//resinitPorjectrole();
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

