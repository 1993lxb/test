var moveId;//移库id
var pn;//pn号
var newWarehouseId;//新库位id
var hasOpr;//是否有更新删除权限
$(function () {
	//赋值
	//alert(moveHistory);
	newWarehouseId=moveHistory.newWarehouse.id;
	hasOpr=moveHistory.oprUnion;
	pn=moveHistory.cxMateriel.pn;
	moveId=moveHistory.id;
//	alert(moveId+pn+newWarehouseId);

    create_moveUnion_dataTable();
   
});


function create_moveUnion_dataTable() {
    var table = base.datatable.table({
        'iDisplayLength' : 10,
        tableid : '#moveUnionList',
        aoColumns : [ {
            "mDataProp" : "id"
        }, {
            "mDataProp" : "materielDisc.upn"
        },{
            "mDataProp" : "materielDisc.currentNum"
        },{
            "mDataProp" : "materielDisc.upn"
        }, {
            "mDataProp" : "oldWarehousePlace.name"
        }, {
            "mDataProp" : "newWarehousePlace.name"
        },{
            "mDataProp" : "addTime"
        }, {
            "mDataProp" : "editTime"
        }, {
            "mDataProp" : "id"
        } ],
        columnDefs : [ {
            targets : 3,
            render : function(a, b, c, d) {
            	var name="不是";
            	var currentNum=c.materielDisc.currentNum;
            	var maxNum=c.materielDisc.maxNum;
            	if(currentNum!=maxNum)name="是";
                return name;
            }
        } ,{
            targets : 4,
            render : function(a, b, c, d) {
            	var name="";
            	if(c.oldWarehousePlace!=null){
            		name=c.oldWarehousePlace.warehouseArea.warehouse.name+c.oldWarehousePlace.name;
            	}
                return name;
            }
        } ,{
            targets : 5,
            render : function(a, b, c, d) {
            	var name="";
            	if(c.newWarehousePlace!=null){
            		name=c.newWarehousePlace.warehouseArea.warehouse.name+c.newWarehousePlace.name;
            	}
                return name;
            }
        } ,{
            targets : 6,
            render : function(a, b, c, d) {
                var dateStr = "";
                if(c.addTime){
                    var date = new Date(c.addTime);
                    dateStr = date.format("yyyy-MM-dd hh:mm:ss");
                    return dateStr;
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
        },{
            targets : 8,
            render : function(a, b, c, d) {
            	var html='';
            	if(hasOpr){
            		var newPlace=c.newWarehousePlace;
            		var newPlaceId=0;
            		if(newPlace!=null)newPlaceId=c.newWarehousePlace.id;
            		html += ' <button type="button" onclick = "turnToUpdateUnion(\''+c.id+'\',\''+c.materielDisc.upn+'\',\''+newPlaceId+'\')" class="btn btn-primary">更新库位</button>';
            		html+='  <button type="button" onclick = "del('+c.id+')"  class="btn btn-danger">删除</button> ';
            	}
                return html;
            }
        } ],
        fnServerParams : function(aoData) {
            aoData.moveId= moveId;
        },
        url : ctx+"/moveUnion/findMoveUnionList?rand=" + Math.random()
    });
    return table;
}

function search() {

    var tab = $('#moveUnionList').dataTable();
    tab.fnDraw(false) ;
}

function del(id) {
    var r = confirm("确认删除？");
    if(r){
        $.ajax({
            type: "POST",
            url: ctx+"/moveUnion/delete",
            data:{"id":id},
            async : false,
            success: function(data){
                if(data.errcode!=0){
                    alert(data.errmsg);
                }else {
                    alert("删除成功.");
                    var dt = $('#moveUnionList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#moveUnionList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }
}
var update_data_from_id = "updateUnionForm";
//打开更新子物料
function turnToUpdateUnion(unionId,upn,wareHousePlaceId){
  base.form.validreset('#'+update_data_from_id);
  $("#"+update_data_from_id+" input[name='upn']").val(upn);
  $("#"+update_data_from_id+" input[name='upn']").attr("readonly", true);
  $("#"+update_data_from_id+" input[name='unionId']").val(unionId);
  $("#"+update_data_from_id+" input[name='selectedWareHousePlaceId']").val(wareHousePlaceId);
  getWarehousePlace(wareHousePlaceId);
  $("#updateUnionModal").modal("show");
}
//获取选择的库位信息
function getWarehousePlace(selectedWareHousePlaceId){
	$.ajax({
		type : "POST",
		url : ctx + "/warehousePlace/getByWarehouseId",
		data : {"warehouseId":newWarehouseId},
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				$("#updateNewWarehousePlace").empty();
				$.each(data.data, function(index, item) {
					$("<option value=" + item.id + ">" + item.name+ "</option>").appendTo("#updateNewWarehousePlace");
					if(selectedWareHousePlaceId==item.id){
						$("#updateNewWarehousePlace option[value="+selectedWareHousePlaceId+"]").attr("selected","selected");
					}
				});
			}
		}
	});
}
//弹出层提交后刷新列表
function refresh() {
	var dt = $('#moveUnionList').dataTable().fnSettings();
	var start = dt._iDisplayStart;
	var total = dt.fnRecordsDisplay();
	if ((total - start) == 1) {
		if (start > 0) {
			$('#moveUnionList').dataTable().fnPageChange('previous', true);
		}
	}
	search();
}
