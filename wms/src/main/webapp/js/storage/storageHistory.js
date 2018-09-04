
$(function () {

    create_storage_list_dataTable();
    checkSaveMsg();


/*    var table = $('#storageHistoryList').DataTable({
        "columnDefs": [{
            "visible": false,
            "targets": 1
        }],
        "order": [[1, 'asc']],
        "drawCallback": function(settings) {
            var api = this.api();
            var rows = api.rows({
                page: 'current'
            }).nodes();
            var last = null;

            api.column(1, {
                page: 'current'
            }).data().each(function(group, i) {
                if (last !== group) {
                    $(rows).eq(i).before('<tr class="group"><td colspan="5">' + group + '</td></tr>');

                    last = group;
                }
            });
        }
    });


    // 根据组排序
    $('#storageHistoryList tbody').on('click', 'tr.group',
        function() {
            var currentOrder = table.order()[0];
            if (currentOrder[0] === 1 && currentOrder[1] === 'asc') {
                table.order([1, 'desc']).draw();
            } else {
                table.order([1, 'asc']).draw();
            }
        });*/
});



function create_storage_list_dataTable(){

    var table = base.datatable.table({
        'iDisplayLength' : 10,
        tableid : '#storageHistoryList',
        aoColumns : [ {
            "mDataProp" : "id"
        }, {
            "mDataProp" : "orderNum"
        }, {
            "mDataProp" : "materiel.pn"
        }, {
            "mDataProp" : "totalNum"
        }, {
            "mDataProp" : "actualNum"
        }, {
            "mDataProp" : "failedNum"
        }, {
            "mDataProp" : "auditStateName"
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
            targets : 8,
            render : function(a, b, c, d) {
                var dateStr = "";
                if(c.addTime){
                    var date = new Date(c.addTime);
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
                    return dateStr;
                }
                return dateStr;
            }
        } ,{
            targets : 10,
            render : function(a, b, c, d) {
                var html = ' <button type="button" onclick = "querySub(\''+c.id+'\',\''+c.orderNum+'\',\''+c.materiel.pn+'\')" class="btn btn-primary">查看子物料</button>';
                html += ' <button type="button" onclick = "queryDetails(\''+c.id+'\')" class="btn btn-primary">更新</button>';
                html +='  <button type="button" onclick = "del(\''+c.id+'\')"  class="btn btn-danger">删除</button> ';
                return html;
            }
        } ],
        fnServerParams : function(aoData) {
            aoData.orderNum= $('#f_orderNum').val();
            aoData.pn = $('#f_pn').val();
            aoData.auditState = $('#f_auditState').val();
            aoData.status = $('#f_status').val();
        },
        url : ctx+"/storageHistory/search?rand=" + Math.random()
    });
    return table;
};

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

    if($('#detailForm').valid()){
        $.ajax({
            type: "POST",
            url: ctx+"/storageHistory/save",
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

                    var dt = $('#storageHistoryList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#storageHistoryList').dataTable().fnPageChange( 'previous', true );
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
            url: ctx+"/storageHistory/deleteStorageHistory",
            data:{"id":id},
            async : false,
            success: function(data){
                if(data.errcode!=0){
                    alert(data.errmsg);
                }else {
                    alert(data.errmsg);
                    var dt = $('#storageHistoryList').dataTable().fnSettings();
                    var start = dt._iDisplayStart;
                    var total = dt.fnRecordsDisplay();
                    if((total-start)==1){
                        if (start > 0) {
                            $('#storageHistoryList').dataTable().fnPageChange( 'previous', true );
                        }
                    }
                    search();
                }

            }
        });
    }

}
function search() {

    var tab = $('#storageHistoryList').dataTable();
    tab.fnDraw(false) ;
}


//子物料
function querySub(id,orderNum,pn){

    var params = id+","+orderNum+","+pn;

    openMenu2(101,params);

}

//订单物料详情
function queryDetails(storageHistoryId){
    $("#detailFormModal").modal("show");
    $('#detailForm')[0].reset();
    $.ajax({
        cache : false,
        type : "POST",
        url: ctx + "/storageHistory/findOne",
        async : false,
        data:{id:storageHistoryId},
        error : function(request) {

        },
        success : function(data) {
            var data = data.data;
            $("#id").val(data.id);
            $("#orderNum").val(data.orderNum);
            $("#materiel_pn").val(data.materiel.pn);
            $("#totalNum").val(data.totalNum);
            $("#actualNum").val(data.actualNum);
            $("#failedNum").val(data.failedNum);
            $("#auditState").val(data.auditState);
            $("#status").val(data.status);
            var time = new Date(data.addTime);
            var timeStr = time.format("yyyy-MM-dd hh:mm:ss");
            $("#addTime").val(timeStr);
            time = new Date(data.editTime);
            timeStr = time.format("yyyy-MM-dd hh:mm:ss");
            $("#editTime").val(timeStr);

            $('#id').parents('.form-group').show();
            $('#addTime').parents('.form-group').show();
            $('#editTime').parents('.form-group').show();
            $('#addTime').attr("disabled",true);
            $('#editTime').attr("disabled",true);
            $('#id').attr("readonly",true);
            $('#orderNum').attr("readonly",true);
            $('#materiel_pn').attr("readonly",true);
            $('#totalNum').attr("readonly",true);
        }
    });
}

function createOrder(){

    //base.form.validreset('#detailForm');
    $('#detailForm')[0].reset();
    $('#addTime').attr("disabled",true);
    $('#editTime').attr("disabled",true);
    $('#id').parents('.form-group').hide();
    $('#addTime').parents('.form-group').hide();
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