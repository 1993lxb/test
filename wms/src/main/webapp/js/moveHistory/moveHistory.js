$(function () {
	create_unit_list_dataTable();
});



function create_unit_list_dataTable(){
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#materielMoveHistoryList',
		aoColumns : [  {
			"mDataProp" : "cxMateriel.pn"
		}, {
			"mDataProp" : "actualNum"
		}, {
			"mDataProp" : "moveType.name"
		}, {
			"mDataProp" : "oldWarehouse.name"
		}, {
			"mDataProp" : "newWarehouse.name"
		}, {
			"mDataProp" : "sendTime"
		}],
		columnDefs : [ {
			targets : 5,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.sendTime){
					var date = new Date(c.sendTime); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		}   ],
		fnServerParams : function(aoData) {
			aoData.pn = $('#serMaterielName').val();
		},
		url : ctx+"/moveHistory/findMaterialMoveHistoryList?rand=" + Math.random()
	});
return table;
};
function search() {
	var tab = $('#materielMoveHistoryList').dataTable();
	tab.fnDraw(false) ;
}

function initPrintDiv() {
	 var pn= $('#serMaterielName').val();
	$.ajax({
		type : "POST",
		url : ctx + "/moveHistory/findMoveHistoryPrint?rand=" + Math.random(),
		data : {
			pn : pn
		},
		dataType : "json",
		async : false,
		success : function(data) {
			var html = "";
			$.each(data, function(index, value) {
				var recDate = new Date(value.receivedTime);
				var recDateStr = recDate.format("yyyy-MM-dd hh:mm:ss");
				if (recDateStr == undefined || recDateStr == "undefined") {
					recDateStr = "";
				}
				var sendDate = new Date(value.sendTime);
				var sendDateStr = sendDate.format("yyyy-MM-dd hh:mm:ss");
				if (sendDateStr == undefined || sendDateStr == "undefined") {
					sendDateStr = "";
				}
				html += '<tr class="odd" role="row"><td>' + value.orderNum + '</td><td>' + value.bomNum + '</td><td>' + value.moveType.name + '</td><td>' + value.oldWarehouse.name + '</td><td>' + value.newWarehouse.name + '</td><td>'  + value.cxMateriel.pn + '</td><td>'+ value.needsNum + '</td><td>'+ value.actualNum + '</td><td>' + sendDateStr + '</td><td>' + recDateStr + '</td></tr>';
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
        url: ctx+"/moveHistory/findMoveHistoryByParamsAndExport",
        data:{pn:pn},
        files : [ '' ],
        secureuri : false,
        dataType : 'json',
        success: function(data){


        }
    });
    $("#exportFormModal").modal("hide");
}
