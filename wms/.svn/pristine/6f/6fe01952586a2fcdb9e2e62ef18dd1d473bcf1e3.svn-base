var _public_priject_msg_list_date_id = "menuListDate";
var _public_priject_msg_save_date_from_id = "_save_menu_form";
var _public_priject_msg_create_btn_id = "create_menu_btn_id";
var _public_priject_msg_create_close_btn_id = "saveDateCloss";

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
			"mDataProp" : "menuName"
		}, {
			"mDataProp" : "menu"
		}, {
			"mDataProp" : "menuUrl"
		}, {
			"mDataProp" : "notes"
		}, {
			"mDataProp" : "sort"
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
				if(c.menu){
					if(c.menu.menuName){
						dateStr = c.menu.menuName;
					}
				}
				return dateStr;
			}
		} ,{
			targets : 6,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.addTime){
					var date = new Date(c.addTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		} ,{
			targets : 7,
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
			targets : 8,
			render : function(a, b, c, d) {
				
				 var html = '<button type="button" onclick = "update('+c.id+')" class="btn btn-primary">修改</button>';
				 html +=' <button type="button" onclick = "del('+c.id+')"  class="btn btn-danger">删除</button> ';
                 
                 
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData['_search_LIKE_menuName'] = $('#serUnitName').val();
			aoData['_search_EQ_deleteState'] = '0';
			//aoData['_search_EQ_projectMsg.id'] = $('#projectMsgId').val();
			//aoData.status = $('#status').val();
		},
		url : ctx+"/menu/data?rand=" + Math.random()
	});
	return table;
};

function checkSaveMsg(){
	base.form.validation('#'+_public_priject_msg_save_date_from_id, {
			rules : {
				menuName : {
					required : true,
					maxlength : 100
				},
				menuUrl : {
					required : true,
					maxlength : 100
				},
				'menu.id' : {
					required : true,
				}
				
			},
			messages : {
				menuName : {
					required : "请填写菜单名称",
					maxlength : "菜单名称不能超过100个字符"
				},
				menuUrl : {
					required : "请填写菜单URL",
					maxlength : "菜单URL不能超过100个字符"
				},
				'menu.id' : {
					required : "请填选择上一级菜单",
				},
			}
	});
}
function saveDateMsg(){
	var formName = _public_priject_msg_save_date_from_id;
	var data ={"id":$("#"+formName+" #id").val()
			,"menuName":$("#"+formName+" #menuName").val()
			,"menuUrl":$("#"+formName+" #menuUrl").val()
			,"sort":$("#"+formName+" #sort").val()
			,"notes":$("#"+formName+" #notes").val()
			,"deleteState":0
	};
	
//	debugger;
	
	if($("#supermenu").val()&&$("#supermenu").val().length>0){
		data["menu.menuName"] = $("#supermenu").val();
		data["menu.id"] = $("#supermenuid").val();
	}else{
		data["menu"] ='';
	}
	
	
	//debugger;
	if($('#'+_public_priject_msg_save_date_from_id).valid()){
		$.ajax({
	        type: "POST",
	        url: ctx+"/menu/saveMenu/",
	        data:data,
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
        url: ctx+"/menu/findOne/",
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
	var menuName = data.menuName?data.menuName:"";
	var menuUrl = data.menuUrl?data.menuUrl:"";
	var notes= data.notes?data.notes:"";
	var deleteState = data.deleteState?data.deleteState:"0";
	var sort = data.sort?data.sort:"0";
	
	if(data.menu){
		var supermenuid = data.menu.id?data.menu.id:"";
		var supermenuName = data.menu.menuName?data.menu.menuName:""
			
		$("#"+_public_priject_msg_save_date_from_id+" input[id='supermenuid']").val(supermenuid);
		$("#"+_public_priject_msg_save_date_from_id+" input[id='supermenu']").val(supermenuName);
	}
	
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='id']").val(id);
  	$("#"+_public_priject_msg_save_date_from_id+" input[name='menuName']").val(menuName);
  	$("#"+_public_priject_msg_save_date_from_id+" input[name='menuUrl']").val(menuUrl);
  	$("#"+_public_priject_msg_save_date_from_id+" textarea[name='notes']").val( notes);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='deleteState']").val( deleteState);
   	$("#"+_public_priject_msg_save_date_from_id+" input[name='sort']").val( sort);
   	initSuperMenu();
}
function del(id) {
	/*showMsg({
		msg : "是否确认删除？",
		type : "question",
		mode : 1,
		success : function(){*/
			$.ajax({
		        type: "POST",
		        url: ctx+"/menu/update",
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
;


var zNodes =[
     /*		{id:1, pId:0, name:"[core] 基本功能 演示", open:true},
     		{id:101, pId:1, name:"最简单的树 --  标准 JSON 数据", file:"core/standardData"},
     		{id:102, pId:1, name:"最简单的树 --  简单 JSON 数据", file:"core/simpleData"},
     		{id:103, pId:1, name:"不显示 连接线", file:"core/noline"},
     		{id:104, pId:1, name:"不显示 节点 图标", file:"core/noicon"},
     		{id:105, pId:1, name:"自定义图标 --  icon 属性", file:"core/custom_icon"},
     		{id:106, pId:1, name:"自定义图标 --  iconSkin 属性", file:"core/custom_iconSkin"},
     		{id:107, pId:1, name:"自定义字体", file:"core/custom_font"},
     		{id:115, pId:1, name:"超链接演示", file:"core/url"},
     		{id:108, pId:1, name:"异步加载 节点数据", file:"core/async"},
     		{id:109, pId:1, name:"用 zTree 方法 异步加载 节点数据", file:"core/async_fun"},
     		{id:110, pId:1, name:"用 zTree 方法 更新 节点数据", file:"core/update_fun"},
     		{id:111, pId:1, name:"单击 节点 控制", file:"core/click"},
     		{id:112, pId:1, name:"展开 / 折叠 父节点 控制", file:"core/expand"},
     		{id:113, pId:1, name:"根据 参数 查找 节点", file:"core/searchNodes"},
     		{id:114, pId:1, name:"其他 鼠标 事件监听", file:"core/otherMouse"},*/

     	];

var setting = {
		view: {
			showLine: false,
			showIcon: false
		},
		data: {
			key: {
				title:"t"
			},
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey:"pId",
				rootPId:null
					
			}
		},
		callback: {
			onClick: onClick
		}
	};

function initSuperMenu(){
	zNodes = getMenuZTreeMsg();	
	$("#createMenuTree").removeClass("show");
	$("#createMenuTree").removeClass("hid");
	$("#createMenuTree").addClass("hid");
	$.fn.zTree.init($("#createMenuTree"), setting, zNodes);
	$("#supermenu").click(function(){
		$("#createMenuTree").removeClass("hid");
		$("#createMenuTree").addClass("show");
	});
}

function onClick(event, treeId, treeNode, clickFlag) {
	$("#createMenuTree").removeClass("show");
	$("#createMenuTree").addClass("hid");
	changeMenu(treeNode.id, treeNode.name );

}		
function changeMenu(id,name) {
	$("#supermenuid").val(id);
	$("#supermenu").val(name);
	
}
function getMenuZTreeMsg(){
	var res = [];
	$.ajax({
        type: "POST",
        url: ctx+"/menu/allMenuTree",
        data:{"_search_EQ_deleteState":"0"},
        async : false,
        success: function(data){
        	res = data;
        }
    });
	
	console.log("获得所有菜单");
	console.log(res);
	return res;
}
function supermenuChange(){
	if(!$('#supermenu').val()){
		$('#supermenuid').val('');
	}
}
