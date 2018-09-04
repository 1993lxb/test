$(function() {
	//状态改变时候触发
	$('#uMoveState').change(function(){ 
		var state=$(this).children('option:selected').val();//这就是selected的值 
		if(state==5){//审核不通过
			$('#notes').parents('.form-group').show();
		}else{
			$('#notes').val('');
			$('#notes').parents('.form-group').hide();
		}
	}) 
});

//跳转到修改订单编号
function turnToUpdateState(moveId) {
	$("#updateStateForm").modal("show");
	
	$.ajax({
		cache : false,
		type : "POST",
		url : ctx + "/moveHistory/findOne",
		async : false,
		data : {
			moveId : moveId
		},
		error : function(request) {

		},
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				var data = data.data;
				// $("#id").val(data.id);
				
				getStateSelect(data.status);
				$("#uOrderNum").val(data.orderNum);
				$('#uOrderNum').attr("readonly", true);
				$('#notes').parents('.form-group').hide();
			}
		}
	});
}
//获取选择的状态
function getStateSelect(status) {
	$.ajax({
		type : "POST",
		url : ctx + "/moveHistory/state/get",
		dataType : "json",
		async : false,
		success : function(data) {
			if (data.errcode != 0) {
				alert(data.errmsg);
			} else {
				$("#uMoveState").html("");
				$.each(data.data, function(index, item) {
					$("<option value=" + item.id + ">" + item.name+ "</option>").appendTo("#uMoveState");
					if(status==item.id){
						$("#uMoveState option[value="+status+"]").attr("selected","selected");
					}
				});
			}
		}
	});
}
//提交修改订单状态
function saveState() {
		var orderNum=$("#uOrderNum").val();
		var state=$("#uMoveState").val();
		var notes=$('#notes').val();
		$.ajax({
			type : "POST",
			url : ctx + "/moveHistory/saveState",
			data : {
				orderNum : orderNum,
				state:state,
				notes:notes
			},
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.errcode != 0) {
					alert(data.errmsg);
				} else {
					alert("修改订单状态成功.");
					$("#saveClose").click();
					var dt = $('#moveList').dataTable().fnSettings();
					var start = dt._iDisplayStart;
					var total = dt.fnRecordsDisplay();
					if ((total - start) == 1) {
						if (start > 0) {
							$('#moveList').dataTable().fnPageChange(
								'previous', true);
						}
					}
					search();
				}

			}
		});
}