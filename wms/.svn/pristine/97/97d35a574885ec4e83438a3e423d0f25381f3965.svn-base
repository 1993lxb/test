<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="plugins/ztree/css/zTreeStyle/zTreeStyle.css" />

<script type="text/javascript"
	src="plugins/ztree/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript"
	src="plugins/ztree/js/jquery.ztree.core.min.js"></script>
<script type="text/javascript"
	src="plugins/ztree/js/jquery.ztree.excheck.min.js"></script>
<script type="text/javascript" src="plugins/ztree/js/json2.js"></script>
</head>
<body>
	<div id="menuTree" class="ztree"></div>
</body>
<script type="text/javascript">
	var setting = {
		check : {
			enable : true
		},
		data : {
			simpleData : {
				enable : true
			}
		}
	};
	var zNodes;
	$(function() {
		$.ajax({
			type : "POST",
			url : "role/findMenu",
			dataType : "json",
			async : false,
			success : function(dt) {
				zNodes = dt.t;
				console.log(zNodes);

			}
		

		});
	});
	$(document).ready(function() {
		$.fn.zTree.init($("#menuTree"), setting, zNodes);
	});
</script>
</html>