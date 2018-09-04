var warehouseSelects = "";

$(function () {

    create_out_list_dataTable();
    checkSaveMsg();
    getWarehouseList();

});


function create_out_list_dataTable(){


    var table = base.datatable.table({
        'iDisplayLength' : 10,
        tableid : '#outHistoryList',
        aoColumns : [ {
            "mDataProp" : "id"
        }, {
            "mDataProp" : "orderNum"
        }, {
            "mDataProp" : "materiel.pn"
        }, {
            "mDataProp" : "needsNum"
        }, {
            "mDataProp" : "actualNum"
        }, {
            "mDataProp" : "warehouse.name"
        }, {
            "mDataProp" : "typeName"
        }, {
            "mDataProp" : "statusName"
        }, {
            "mDataProp" : "sendTime"
        }, {
            "mDataProp" : "editTime"
        }, {
            "mDataProp" : "id"
        } ],
        columnDefs : [ {
            targets : 8,
            render : function(a, b, c, d) {
                var dateStr = "";
                if(c.sendTime){
                    var date = new Date(c.sendTime);
                    dateStr = date.format("yyyy-MM-dd hh:mm:ss");
                }
                return dateStr;
            }
        } ,{
            targets : 9,
            render : function(a, b, c, d) {
                var dateStr = "";
                if(c.editTime){
                    var date = new Date(c.editTime);
                    dateStr = date.format("yyyy-MM-dd hh:mm:ss");
                }
                return dateStr;
            }
        } ,{
            targets : 10,
            render : function(a, b, c, d) {
                var html = ' <button type="button" onclick = "querySub(\''+c.id+'\',\''+c.orderNum+'\',\''+c.materiel.pn+'\',\''+c.warehouse.name+'\')" class="btn btn-primary">查看子物料</button>';
                html += ' <button type="button" onclick = "queryDetails(\''+c.id+'\')" class="btn btn-primary">更新</button>';
                html +='  <button type="button" onclick = "del(\''+c.id+'\')"  class="btn btn-danger">删除</button> ';
                return html;
            }
        } ],
        fnServerParams : function(aoData) {
            aoData.orderNum= $('#f_orderNum').val();
            aoData.pn = $('#f_pn').val();
            aoData.type = $('#f_type').val();
            aoData.status = $('#f_status').val();
        },
        url : ctx+"/outHistory/search?rand=" + Math.random()
    });
    return table;
};

function checkSaveMsg(){
    base.form.validation('#detailForm', {
        rules : {
            needsNum : {
                number:true,
                min:0
            },
            actualNum : {
                number:true,
                min:0
            }

        },
        messages : {
            needsNum : {
                number:"请输入有效的数字",
                min:"请输入不小于0的数值"
            },
            actualNum : {
                number:"请输入有效的数字",
                min:"请输入不小于0的数值"
            }
        }
    });
}
function saveDateMsg(){

    if($('#detailForm').valid()){
        $.ajax({
            type: "POST",
            url: ctx+"/outHistory/save",
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

                    var dt = $('#outHistoryList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#outHistoryList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }

}


function del(id) {
    var r = confirm("确认删除？");
    if(r){
        $.ajax({
            type: "POST",
            url: ctx+"/outHistory/deleteOutHistory",
            data:{"id":id},
            async : false,
            success: function(data){
                if(data.errcode!=0){
                    alert(data.errmsg);
                }else {
                    alert(data.errmsg);
                    var dt = $('#outHistoryList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#outHistoryList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }

}
function search() {

    var tab = $('#outHistoryList').dataTable();
    tab.fnDraw(false) ;
}


//子物料
function querySub(id,orderNum,pn,warehouseName){

    var params = id+","+orderNum+","+pn+","+warehouseName;

    openMenu2(103,params);

}

//订单物料详情
function queryDetails(outHistoryId){
    $("#detailFormModal").modal("show");
    $('#detailForm')[0].reset();
    $.ajax({
        cache : false,
        type : "POST",
        url: ctx + "/outHistory/findOne",
        async : false,
        data:{id:outHistoryId},
        error : function(request) {

        },
        success : function(data) {
            var data = data.data;
            $("#id").val(data.id);
            $("#orderNum").val(data.orderNum);
            $("#materiel_pn").val(data.materiel.pn);
            $("#needsNum").val(data.needsNum);
            $("#actualNum").val(data.actualNum);
            $("#type").val(data.type);
            $("#status").val(data.status);
            var time = new Date(data.sendTime);
            var timeStr = time.format("yyyy-MM-dd hh:mm:ss");
            $("#sendTime").val(timeStr);
            time = new Date(data.editTime);
            timeStr = time.format("yyyy-MM-dd hh:mm:ss");
            $("#editTime").val(timeStr);

            $('#id').parents('.form-group').show();
            $('#sendTime').parents('.form-group').show();
            $('#editTime').parents('.form-group').show();
            $('#sendTime').attr("disabled",true);
            $('#editTime').attr("disabled",true);
            $('#id').attr("readonly",true);
            $('#orderNum').attr("readonly",true);
            $('#materiel_pn').attr("readonly",true);
            $('#needsNum').attr("readonly",true);
        }
    });
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

function createOutOrder(){

    //base.form.validreset('#detailForm');
    $('#detailForm')[0].reset();
    $('#editTime').attr("disabled",true);
    $('#id').parents('.form-group').hide();
    $('#editTime').parents('.form-group').hide();
    $('#orderNum').attr("readonly",false);
    $('#materiel_pn').attr("readonly",false);
    $('#totalNum').attr("readonly",false);
    $("#detailFormModal").modal("show");
}

function exportExcel() {
    var orderNum= $('#f_orderNum').val();
    var pn = $('#f_pn').val();
    var auditState = $('#f_auditState').val();
    var status = $('#f_status').val();
    $("#exportFormModal").modal("show");
    $.ajaxFileUpload({
        type: "POST",
        url: ctx+"/storageHistory/findStorageHistoryByParamsAndExport",
        data:{orderNum:orderNum,pn:pn,auditState:auditState,status:status},
        files : [ '' ],
        secureuri : false,
        dataType : 'json',
        success: function(data){


        }
    });
    $("#exportFormModal").modal("hide");
}