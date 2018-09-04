//页面加载完给所有下拉框赋值
	$(function() {
		$.ajax({
			url : 'menu/menuByParentId',
			type : 'POST',
			async : false,
			dataType : 'json',
			success : function(dt) {
				if (dt.erroCode == 0) {
					var $json = dt.t;
					var html = "";
					$("#select1 option").remove();
					for (var i = 0; i < $json.length; i++) {
							html += '<option value="'+$json[i].id+'">'
									+ $json[i].menuName + '</option>';
					}
					$("#select1").append(html);
					$("#select2").append(html);
				}
			}
		});
	});
	//搜索框查询
	function search() {
		var name = $("#serUnitName").val();
		$
				.ajax({
					url : 'menu/menuByName?name=' + name,
					type : 'POST',
					async : false,
					dataType : 'json',
					success : function(dt) {
						if (dt.erroCode == 0) {
							var $json = dt.t;
							console.log($json)
							$(".table thead").remove();//重复点击的时候删除之前存在的即覆盖
							$(".table tr").remove();
							var html = "<tr><th>编号</th><th>菜单名称</th><th>父菜单</th><th>url</th><th>备注说明</th><th>排序</th><th>创建时间</th><th>更新时间</th><th>操作</th></tr>";
							for (var i = 0; i < $json.length; i++) {
								if ($json[i].parentMenuName == null) {
									$json[i].parentMenuName = "";
								}
								if ($json[i].addTime == null) {
									$json[i].addTime = "";
								}
								if ($json[i].editTime == null) {
									$json[i].editTime = "";
								}
								html += '<tr>' + '<td>'
										+ $json[i].id
										+ '</td>'
										+ '<td>'
										+ $json[i].menuName
										+ '</td>'
										+ '<td>'
										+ $json[i].parentMenuName
										+ '</td>'
										+ '<td>'
										+ $json[i].menuUrl
										+ '</td>'
										+ '<td>'
										+ $json[i].notes
										+ '</td>'
										+ '<td>'
										+ $json[i].sort
										+ '</td>'
										+ '<td>'
										+ $json[i].addTime
										+ '</td>'
										+ '<td>'
										+ $json[i].editTime
										+ '</td>'
										+ '<td>'
										+ '<button type="button" class="btn btn-primary" onclick="updateModel(this)" value="'
										+ $json[i].id
										+ '">修改</button>'
										+ '<button type="button" class="btn btn-danger" value="'
										+ $json[i].id
										+ '" onclick="deleteModel(this)">删除</button>'
										+ '</td>' + '</tr>'
							}
							$("#menuListDate").append(html);
						}
					}

				});

	}

	function create() {
		//显示模态框
		$("[name=addModel]").modal("show");

	}
	//提交增加的模态框
	function saveDateMsg() {
		$("#_save_menu_form").submit();
	}

	function updateModel(op) {
		$("[name=updateModel]").modal("show");
		var id = $(op).val();
		//给模态框赋值
		$.ajax({
			url : 'menu/menuByPrimaryId?id=' + id,
			type : 'POST',
			async : false,
			dataType : 'json',
			success : function(dt) {

				if (dt.erroCode == 0) {

					var $json = dt.t;
					console.log($json);
					var html = "";
					//$("#select option").remove();
					$("#menuName1").val($json.menuName);
					$("#notes1").val($json.notes);
					$("#menuUrl1").val($json.menuUrl);
					$("#sort1").val($json.sort);
					$("#select1").val($json.parentId);
					$("#id1").val($json.id);
				}
			}
		});

	}
	//提交修改后的模态框
	function saveUpdateMsg() {
		/* var note=$("#notes1").val();
		var 
		var id=$("#id1").val();
		alert(id); */
		$("#_update_menu_form").submit();

	}

	function deleteModel(op) {
		alert($(op).val());
		$("[name=deleteModel]").modal("show");
		$("#saveDeleteMsg").click(function() {
			window.location.href = "menu/deleteMenu?id=" + $(op).val();
		});
	}