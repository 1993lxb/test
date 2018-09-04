var paramsArr;
var storageHistoryId;
var orderNum;
var pn;
var warehouseSelects = "";

$(function () {
    paramsArr = params.split(",");
    storageHistoryId = paramsArr[0];
    orderNum = paramsArr[1];
    pn = paramsArr[2];
    $("#f_pn").text(pn);
    $("#f_orderNum").text(orderNum);
    create_storageUnion_dataTable();
    checkSaveMsg();
    getWarehouseList();
});


function checkSaveMsg(){
    base.form.validation('#detailForm', {
        rules : {
            actualNum : {
                number:true,
                min:0
            },
            failedNum : {
                number:true,
                min:0
            }

        },
        messages : {
            actualNum : {
                number:"请输入有效的数字",
                min:"请输入不小于0的数值"
            },
            failedNum : {
                number:"请输入有效的数字",
                min:"请输入不小于0的数值"
            }
        }
    });
}
function saveDateMsg(){

    $("#warehouse_id").attr("disabled",false);

    if($('#detailForm').valid()){
        $.ajax({
            type: "POST",
            url: ctx+"/storageUnion/update",
            data:$("#detailForm").serialize(),
            dataType: "json",
            async : false,
            success: function(data){
                if(data.errcode!=0){
                    // showMsg({
                    //  msg : data.errmsg,
                    //  type : "error"});
                    alert(data.errmsg);
                }else {
                    alert(data.errmsg);
                    $("#saveDateClose").click();

                    var dt = $('#storageUnionList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#storageUnionList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }

}
function search() {

    var tab = $('#storageUnionList').dataTable();
    tab.fnDraw(false) ;
}

function del(id) {
    var r = confirm("确认删除？");

    if(r){
        $.ajax({
            type: "POST",
            url: ctx+"/storageUnion/delete",
            data:{"id":id},
            async : false,
            success: function(data){
                if(data.errcode!=0){
                    alert(data.errmsg);
                }else {
                    alert(data.errmsg);
                    var dt = $('#storageUnionList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#storageUnionList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }

}

function getWarehouseList() {
    $.ajax({
        type: "POST",
        url: ctx+"/warehouse/allData?rand=" + Math.random(),
        data:{"_search_EQ_deleteState":0},
        async : false,
        success: function(data){
            $.each(data,function (index,item) {
                warehouseSelects+='<option value="'+item.id+'">'+item.name+'</option>';
            });
            $("#warehouse_id").html(warehouseSelects);
        }
    });

}

function create_storageUnion_dataTable() {
    var table = base.datatable.table({
        'iDisplayLength' : 10,
        tableid : '#storageUnionList',
        aoColumns : [ {
            "mDataProp" : "id"
        }, {
            "mDataProp" : "materielDisc.upn"
        }, {
            "mDataProp" : "materielDisc.maxNum"
        }, {
            "mDataProp" : "warehouse.name"
        }, {
            "mDataProp" : "materielDisc.warehousePlace.name"
        }, {
            "mDataProp" : "isPassName"
        }, {
            "mDataProp" : "statusName"
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
                return c.warehouse==null?"":c.warehouse.name;
            }
        }, {
            targets : 4,
            render : function(a, b, c, d) {
                return c.materielDisc.warehousePlace==null?"":c.materielDisc.warehousePlace.name;
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
                var html = ' <button type="button" onclick = "queryDetails(\''+c.id+'\')" class="btn btn-primary">更新</button>';
                html +='  <button type="button" onclick = "del(\''+c.id+'\')"  class="btn btn-danger">删除</button> ';
                return html;

            }
        } ],
        fnServerParams : function(aoData) {
            aoData.storageHistoryId= storageHistoryId;
        },
        url : ctx+"/storageUnion/findByStorageHistoryId?rand=" + Math.random()
    });
    return table;
}

//料盘入库详情
function queryDetails(storageUnionId){
    $("#detailFormModal").modal("show");
    $('#detailForm')[0].reset();
    $.ajax({
        cache : false,
        type : "POST",
        url: ctx + "/storageUnion/findOne",
        async : false,
        data:{id:storageUnionId},
        error : function(request) {

        },
        success : function(data) {
            var data = data.data;
            $("#id").val(data.id);
            $("#materielDisc_upn").val(data.materielDisc.upn);
            $("#materielDisc_maxNum").val(data.materielDisc.maxNum);
            $("#warehouse_id").val(data.warehouse==null?"":data.warehouse.id);

            $("#isPass").val(data.isPass);
            $("#status").val(data.status);
            var time = new Date(data.addTime);
            var timeStr = time.format("yyyy-MM-dd hh:mm:ss");
            $("#addTime").val(timeStr);
            time = new Date(data.editTime);
            timeStr = time.format("yyyy-MM-dd hh:mm:ss");
            $("#editTime").val(timeStr);

            $('#addTime').attr("disabled",true);
            $('#editTime').attr("disabled",true);
            $('#id').attr("readonly",true);
            $('#materielDisc_upn').attr("readonly",true);
            $('#materielDisc_maxNum').attr("readonly",true);

            var warehousePlaceName = data.materielDisc.warehousePlace==null?"":data.materielDisc.warehousePlace.name;
            $("#warehouseplace_name").val(warehousePlaceName);
            if(warehousePlaceName != ""){
                $("#warehouse_id").attr("disabled",true);
                $("#warehouseplace_name").attr("readonly",true);
            }else{
                $("#warehouse_id").attr("disabled",false);
                $("#warehouseplace_name").attr("readonly",false);
            }
        }
    });
}

function createStorageUnion(){
    var upn = $("#f_upn").val();
    $.ajax({
        type: "POST",
        url: ctx+"/storageUnion/upn/union",
        data:{"storageId":storageHistoryId,"upn":upn},
        async : false,
        success: function(data){
            if(data.errcode!=0){
                alert(data.errmsg);
            }else {
                alert(data.errmsg);
                var tab = $("#storageUnionList").dataTable();
                tab.fnDraw(false);
            }

        }
    });
}

function exportExcel() {
    $("#exportFormModal").modal("show");
    $.ajaxFileUpload({
        type: "POST",
        url: ctx+"/storageUnion/findByStorageHistoryIdAndExport",
        data:{"storageHistoryId":storageHistoryId},
        files : [ '' ],
        secureuri : false,
        dataType : 'json',
        success: function(data){


        }
    });
    $("#exportFormModal").modal("hide");
}