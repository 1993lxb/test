var save_data_from_id = "addForm";
$(function() {
	
	// AutoComplete
    $.fn.typeahead.Constructor.prototype.blur = function() {
        var that = this;
        setTimeout(function() {
            that.hide()
        }, 250);
    };
   
    $('#numSearch').typeahead({
        source: function(query, process) {
        	searchPn(query,process);
        	//return arr;
            //return ["Deluxe Bicycle", "Super Deluxe Trampoline", "Super Duper Scooter"];
        }
    });
   
    initWarehouse();
    checkSaveMsg();
});
//pn模糊查询
function searchPn(query,process){
	$.ajax({
		type : "POST",
		url : ctx + "/materiel/search",
		dataType : "json",
		data : {"query" : query},
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				var arr=[];
				$.each(data.data, function(index, item) {
					//alert(item.pn);
					arr.push(item.pn);
				});
				process(arr);
			}
		}
	});
}

//初始化仓库信息
function initWarehouse(){
	$.ajax({
		type : "POST",
		url : ctx + "/warehouse/getAll",
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				$.each(data.data, function(index, item) {
					$("<option value=" + item.id + ">" + item.name+ "</option>").appendTo("#oldWarehouse");
					$("<option value=" + item.id + ">" + item.name+ "</option>").appendTo("#newWarehouse");
				});
			}
		}
	});
}

//打开创建移库
function turnToAdd(){
  base.form.validreset('#'+save_data_from_id);
  $("#"+save_data_from_id+" input[name='orderNum']").val('');
  $("#"+save_data_from_id+" input[name='bomNum']").val('');
  $("#"+save_data_from_id+" input[name='cxMateriel.pn']").val('');
  $("#"+save_data_from_id+" input[name='needsNum']").val('');
  $("#addModal").modal("show");
}
//检查新增移库单的数据输入
function checkSaveMsg() {
	base.form.validation('#'+save_data_from_id, {
		rules : {
			orderNum : {
				required : true,
				maxlength : 100
			},
			bomNum : {
				required : true,
				maxlength : 100
			},
			'cxMateriel.pn': {
				required : true,
				maxlength : 100
			},
			needsNum : {
				number : true,
				min : 1
			}
		},
		messages : {
			orderNum : {
				required : "请填写订单编号",
				maxlength : "订单编号不能超过100字符"
			},
			bomNum : {
				required : "请填写Bom编号",
				maxlength : "Bom编号不能超过100字符"
			},
			'cxMateriel.pn': {
				required : "请填写pn号",
				maxlength : "pn编号不能超过100字符"
			},
			needsNum : {
				number : "请输入有效的数字",
				min : "请输入不小于1的数值"
			}
		}
	});
}
//保存操作，type=1，保存继续，2-保存关闭
function saveDataMsg(type) {
	if ($('#'+save_data_from_id).valid()) {
		$.ajax({
			type : "POST",
			url : ctx + "/moveHistory/save",
			data : $('#'+save_data_from_id).serialize(),
			async : false,
			success : function(data) {
					alert(data);
					//保存继续，重置物料号和数量
					if(type==1){
						$("#"+save_data_from_id+" input[name='cxMateriel.pn']").val('');
						$("#"+save_data_from_id+" input[name='needsNum']").val('');
					}else if(type==2){
						$("#saveDataClose").click();
					}
					refresh();
			}
		});
	}

}
