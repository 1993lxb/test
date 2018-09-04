var _public_priject_msg_list_date_id = "hum_materielList";
//var _public_priject_msg_save_date_from_id = "_save_mainMateriel_form";
//var _public_priject_msg_create_btn_id = "add";
//var _public_priject_msg_create_close_btn_id = "saveDateCloss";


$(function () {
	create_unit_list_dataTable();
});



function create_unit_list_dataTable(){
	var table = base.datatable.table({
		'iDisplayLength' : 10,
		tableid : '#hum_materielList',
		aoColumns : [  {
			"mDataProp" : "upn"
		}, {
			"mDataProp" : "humidityExpireDate"
		}, {
			"mDataProp" : "warehousePlace.warehouseArea.warehouse.name"
		}, {
			"mDataProp" : "warehousePlace.warehouseArea.name"
		}, {
			"mDataProp" : "warehousePlace.name"
		}, {
			"mDataProp" : "warehousePlace.positionX"
		}, {
			"mDataProp" : "upn"
				
		} ],
		columnDefs : [{
			targets : 1,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.humidityExpireDate){
					var date = new Date(c.humidityExpireDate); 
					dateStr = date.format("yyyy-MM-dd hh:mm:ss"); 
				}
				return dateStr;
			}
		},{
			targets : 5,
			render : function(a, b, c, d) {
				var dateStr = "";
				if(c.upn){
					dateStr =c.warehousePlace.positionX+","+c.warehousePlace.positionY;
				}
				return dateStr;
			}
		}  ,{
			targets : 6,
			render : function(a, b, c, d) {
				var html = '<button type="button" onclick = "look(\''+c.upn+'\')" class="btn btn-primary">查看可视化地图</button>';
				return html;
			}
		} ],
		fnServerParams : function(aoData) {
			aoData.upn = $('#serHumMaterier').val();
		},
		url : ctx+"/materielDisc/findHumidity?rand=" + Math.random()
	});
return table;
};
function search() {
	var tab = $('#hum_materielList').dataTable();
	tab.fnDraw(false) ;
}

