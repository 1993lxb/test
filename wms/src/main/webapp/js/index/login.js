
function login(){
	$.ajax({
        type: "POST",
        url: "user/login",
        data:{"userName":$('#userName').val(),"userPwd":$('#userPwd').val()},
        async : false,
        success: function(data){
        	if(data==true){
//        		alert($("#rememberMe").is(":checked"));
	   			 var d= new Date();
				 d.setHours(d.getHours() + (24 * 30)); //保存一个月
        		if($("#rememberMe").is(":checked") == true){

        			 document.cookie="rememberMe=true;expires=" + d.toGMTString();
        			 document.cookie="userName="+$('#userName').val()+";expires=" + d.toGMTString();
        			 document.cookie="userPassward="+$('#userPwd').val()+";expires=" + d.toGMTString();
        			  
				}else{
					 document.cookie="rememberMe=false;expires=" + d.toGMTString();
        			 document.cookie="userName="+";expires=" + d.toGMTString();
        			 document.cookie="userPassward="+";expires=" + d.toGMTString();
				}
        		location.href = ctx+"/";
        	}else{
        		alert("用户名密码错误！");
        	}
       		
        }
    });
}

$(function () {
	if(getCookie("rememberMe") == "true"){
		if(getCookie("userName") != null){
	 		$("#userName").val(getCookie("userName"));
	 	}
	 	if(getCookie("userPassward") != null){
	 		$("#userPwd").val(getCookie("userPassward"));
	 	}
	 	$("#rememberMe").attr("checked","checked");
	 	
	 	
	}else{
		
		$("#rememberMe").attr("checked",false);
	}
	
	if ($("#rememberMe").prop('checked')) {
        $("#rememberMeDiv").addClass('checked');
    } else {
        $("#rememberMeDiv").removeClass('checked');
    }
 	
 });

 function getCookie(name){
	 
     var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null){
    	 return unescape(arr[2]); 
     }else{
    	 return null;
     }
 } 