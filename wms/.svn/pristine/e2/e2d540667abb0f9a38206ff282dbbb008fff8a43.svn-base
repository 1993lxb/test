<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
<title>Insert title here</title>
</head>

<body>
	<form id="Form1" action="fileUpload/upload" method="post"
		enctype="multipart/form-data">
		<input type="file" name="file" id="file"> <input type="button"
			value="upload" onclick="upload()" />
	</form>
</body>

<script type="text/javascript">
	function upload(){
		var fd = new FormData(document.querySelector("#Form1"));
		console.log(fd);
		$.ajax({
		  url: "fileUpload/upload",
		  type: "POST",
		  data: fd, 
		  cache:false,
		  processData: false,  // 不处理数据
		  contentType: false,  // 不设置内容类型
		  
		  success:function(dt){
			  parent.addImagePath(dt);
			  
		  }
		});
	}
	</script>
</html>