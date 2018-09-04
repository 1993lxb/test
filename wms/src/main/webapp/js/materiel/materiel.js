$(function () {
	create_unit_list_dataTable();
});



function create_unit_list_dataTable(){
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#materielList',
		aoColumns : [  {
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
			"mDataProp" : "addTime"
		}, {
			"mDataProp" : "editTime"
		}, {
			"mDataProp" : "pn"

		} ],
		columnDefs : [ {
			targets : 5,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.addTime){
					var date = new Date(c.addTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		} ,{
			targets : 6,
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
			targets : 7,
			render : function(a, b, c, d) {
				 var html = '<button type="button" onclick = "queryDetails(\''+c.pn+'\')" class="btn btn-primary">查询详情</button>';
				 html +=' <button type="button" onclick = "querySub(\''+c.pn+'\')"  class="btn btn-primary">查看子物料</button> ';
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData.pn = $('#serMaterielName').val();
		},
		url : ctx+"/materiel/findMaterielList?rand=" + Math.random()
	});
return table;
};
function search() {
	var tab = $('#materielList').dataTable();
	tab.fnDraw(false) ;
}

//无聊详情
function queryDetails(materielPn){
	$("#detailFormModal").modal("show");
	$.ajax({
		cache : false,
		type : "POST",
        url: ctx + "/materiel/detail",
		async : false,
		data:{pn:materielPn},
		error : function(request) {
			
		},
		success : function(data) {
			var data = data.data;
			$("#pn").val(data.pn);
			$("#name").val(data.name);
			$("#specification").val(data.specification);
			$("#materialGroup").val(data.materialGroup.name);
			var str =""
			if(data.isHumidity==0){
				str="不是";
			}else if(data.isHumidity==1){
				str="是";
			}
			$("#isHumidity").val(str);
			$("#barcode").val(data.barcode);
			$("#totalNum").val(data.totalNum);
			$("#repairNum").val(data.repairNum);
			$("#depletionNum").val(data.depletionNum);
			$("#notes").val(data.notes);
			$("#addTime").val(data.addTime);
			$("#editTime").val(data.editTime);
		}
	});
}
//子物料
function querySub(materielPn){
	$("#sub_detailFormModal").modal("show");
	$.ajax({
		cache : false,
		type : "POST",
        url: ctx + "/materiel/querySub",
		async : false,
		data:{pn:materielPn},
		error : function(request) {
			
		},
		success : function(data) {
			var materiel_sub = data.data.content;//响应数据中的记录数据
			var materielSubHtml = [];
			if(materiel_sub.length > 0 && materiel_sub!=null){
				materielSubHtml.push('<table class="table">'); 
				materielSubHtml.push('<col style="width:40%"/>');
				materielSubHtml.push('<col style="width:30%"/>'); 
				materielSubHtml.push('<col style="width:30%"/>');
				materielSubHtml.push('<tr>'); 
				materielSubHtml.push('<td>子物料号</td>'); 
				materielSubHtml.push('<td>数量</td>'); 
				materielSubHtml.push('<td>条码</td>'); 
				materielSubHtml.push('</tr>'); 
				$.each(materiel_sub,function(index,value){
					materielSubHtml.push('<tr>');
					materielSubHtml.push('<td class="padding-tb-40"><span>'+value.upn+'</span></td>');
					materielSubHtml.push('<td class="padding-tb-40"><span>'+value.currentNum+'</span></td>');
					materielSubHtml.push('<td class="padding-tb-40"><span>'+value.barcode+'</span></td>');
					materielSubHtml.push('</tr>');
				});
				materielSubHtml.push('</table>'); 
			}else{
				currentPageNum = 0;
				materielSubHtml.push('<div class="col-xs-12 text-center" style="padding: 10px;">');
				materielSubHtml.push("未查询出符合条件的数据！");
				materielSubHtml.push('</div>');
			}
			$("#order-item").html(materielSubHtml.join(""));
			
		}
	});
}






function initPrintDiv() {
	 var pn= $('#serMaterielName').val();
	$.ajax({
		type : "POST",
		url : ctx + "/materiel/findMaterielByParams?rand=" + Math.random(),
		data : {
			pn : pn
		},
		dataType : "json",
		async : false,
		success : function(data) {
			var html = "";
			$.each(data, function(index, value) {
				var addDate = new Date(value.addTime);
				var addDateStr = addDate.format("yyyy-MM-dd hh:mm:ss");
				if (addDateStr == undefined || addDateStr == "undefined") {
					addDateStr = "";
				}
				var editDate = new Date(value.editTime);
				var editDateStr = editDate.format("yyyy-MM-dd hh:mm:ss");
				if (editDateStr == undefined || editDateStr == "undefined") {
					editDateStr = "";
				}
				var isHumidity = value.isHumidity;
				var isHumidityStr = "";
				if(isHumidity == 0){
					isHumidityStr ="不是";
				}else if(isHumidity == 1){
					isHumidityStr ="是";
				}else{
					isHumidityStr =" -- ";
				}
				html += '<tr class="odd" role="row"><td>' + value.pn + '</td><td>' + value.materialGroup.name + '</td><td>' + value.unit.name + '</td><td>' + value.name + '</td><td>' + value.specification + '</td><td>'  + isHumidityStr + '</td><td>'+ value.humidityDay + '</td><td>'+ value.barcode + '</td><td>'+ value.totalNum + '</td><td>'+ value.limitNum + '</td><td>'+ value.repairNum + '</td><td>'+ value.depletionNum + '</td><td>' + addDateStr + '</td><td>' + editDateStr + '</td></tr>';
			});
			$("#printBody").html(html);
		}
	});
}


function printData() {
	initPrintDiv();
	$("div.PrintArea").printArea( [{mode: "popup", popClose: false}] );
}

function exportData() {
   var pn= $('#serMaterielName').val();
   $("#exportFormModal").modal("show");
   $.ajaxFileUpload({
       type: "POST",
       url: ctx+"/materiel/findMaterielByParamsAndExport",
       data:{pn:pn},
       files : [ '' ],
       secureuri : false,
       dataType : 'json',
       success: function(data){


       }
   });
   $("#exportFormModal").modal("hide");
}
