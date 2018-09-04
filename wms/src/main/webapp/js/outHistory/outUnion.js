var paramsArr;
var outHistoryId;
var orderNum;
var pn;
var warehouseName;

$(function () {
    paramsArr = params.split(",");
    outHistoryId = paramsArr[0];
    orderNum = paramsArr[1];
    pn = paramsArr[2];
    warehouseName = paramsArr[3];
    $("#f_pn").text(pn);
    $("#f_orderNum").text(orderNum);
    $("#f_warehouse_name").text(warehouseName);
    create_outUnion_dataTable();
    checkSaveMsg();
});


function checkSaveMsg(){
    base.form.validation('#detailForm', {

    });
}
function updateStatus(id){

        $.ajax({
            type: "POST",
            url: ctx+"/outUnion/updateStatus",
            data:{"id":id},
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

                    var dt = $('#outUnionList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#outUnionList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });

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
            url: ctx+"/outUnion/delete",
            data:{"id":id},
            async : false,
            success: function(data){
                if(data.errcode!=0){
                    alert(data.errmsg);
                }else {
                    alert(data.errmsg);
                    var dt = $('#outUnionList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#outUnionList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }

}

function create_outUnion_dataTable() {
    var table = base.datatable.table({
        'iDisplayLength' : 10,
        tableid : '#outUnionList',
        aoColumns : [ {
            "mDataProp" : "id"
        }, {
            "mDataProp" : "materielDisc.upn"
        }, {
            "mDataProp" : "materielDisc.currentNum"
        }, {
            "mDataProp" : "materielDisc.warehousePlace.name"
        }, {
            "mDataProp" : "isOldMoveName"
        }, {
            "mDataProp" : "addTime"
        }, {
            "mDataProp" : "editTime"
        }, {
            "mDataProp" : "id"
        } ],
        columnDefs : [
            {
            targets : 3,
            render : function(a, b, c, d) {
                return c.materielDisc.warehousePlace==null?"":c.materielDisc.warehousePlace.name;
            }
        } ,{
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
                var html = ' <button type="button" onclick = "updateStatus(\''+c.id+'\')" class="btn btn-primary">更新状态</button>';
                html +='  <button type="button" onclick = "del(\''+c.id+'\')"  class="btn btn-danger">删除</button> ';
                return html;
            }
        } ],
        fnServerParams : function(aoData) {
            aoData.outHistoryId= outHistoryId;
        },
        url : ctx+"/outUnion/findByOutHistoryId?rand=" + Math.random()
    });
    return table;
}



function createOutUnion(){
    var upn = $("#f_upn").val();
    $.ajax({
        type: "POST",
        url: ctx+"/outUnion/upn/union",
        data:{"outHistoryId":outHistoryId,"upn":upn},
        async : false,
        success: function(data){
            if(data.errcode!=0){
                alert(data.errmsg);
            }else {
                alert(data.errmsg);
                var tab = $("#outUnionList").dataTable();
                tab.fnDraw(false);
            }

        }
    });
}

/*
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
}*/
