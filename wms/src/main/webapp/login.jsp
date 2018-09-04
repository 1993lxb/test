<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>仓库管理系统-登录</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="dist/css/AdminLTE.min.css">
<!-- iCheck -->
<link rel="stylesheet" href="plugins/iCheck/square/blue.css">

<!-- Validate -->
<link rel="stylesheet" href="bootstrap/css/bootstrapValidator.min.css">
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-logo">
			<a href="#">仓库管理系统</a>
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">
				<font color='red'>${msg}</font>
			</p>

			<form id="loginFrm" action="userController/find" method="post">
				<div class="form-group has-feedback">
					<input type="text"  value="admin" class="form-control" name="loginId"
						placeholder="帐号">
				</div>
				<div class="form-group has-feedback">
					<input type="password" value="123456" class="form-control" name="loginPwd"
						placeholder="密码">
				</div>
			<%-- 	<div class="form-group has-feedback">
					<input type="text" class="form-control" name="validateNum"
						maxlength="4" size="4" placeholder="验证码"><img
						src="randomImg?time=<%=new Date().toLocaleString()%>" />
				</div> --%>
				<div>
					<!-- /.col -->
					<div class="col-xs-4">
						<button type="submit" id="btnSubmit"
							class="btn btn-primary btn-block btn-flat">登录</button>
					</div>
					<!-- /.col -->
				</div>
			</form>
			<a href="#">忘记密码</a><br>
		</div>
		<!-- /.login-box-body -->
	</div>
	<!-- /.login-box -->

	<!-- jQuery 2.2.3 -->
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<!-- Validate -->
	<script type="text/javascript"
		src="bootstrap/js/bootstrapValidator.min.js"></script>
	<script>
		$(function() {
			$("#btnSubmit").on(
					"click",
					function() {
						var bootstrapValidator = $("#loginFrm").data(
								'bootstrapValidator');
						bootstrapValidator.validate();

						if (bootstrapValidator.isValid()) {
							document.getElementById("loginFrm").submit();
							console.log("ok");
						} else {
							return;
						}
					});
		});

		//验证
		$(function() {

			$("#loginFrm").bootstrapValidator({
				message : '信息填写不正确',
				//container: 'tooltip',
				feedbackIcons : {
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				fields : {
					loginId : {
						validators : {
							notEmpty : {
								message : '帐号必须填写'
							},
							stringLength : {
								min : 3,
								max : 16,
								message : '帐号长度需要在3-16位'
							}
						}
					},
					loginPwd : {
						validators : {
							notEmpty : {
								message : '密码必须填写'
							},
							stringLength : {
								min : 3,
								max : 16,
								message : '密码长度需要在3-16位'
							}
						}
					},
					validateNum : {
						validators : {
							notEmpty : {
								message : '验证码必须填写'
							},
							stringLength : {
								min : 4,
								max : 4,
								message : '验证码必须是4位'
							}
						}
					}

				}
			});
		});
	</script>
</body>
</html>
