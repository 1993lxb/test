$(function(){
	
 	$('#supplierList').bootstrapTable({
		contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:"userController/findUserByParam",//要请求数据的文件路径
        /* height:tableHeight(),//高度调整 */
        /* toolbar: '#toolbar',//指定工具栏 */
        striped: true, //是否显示行间隔色
        dataField: "res",//bootstrap table 可以前端分页也可以后端分页，这里
        //我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的  
        //rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
        pageNumber: 1, //初始化加载第一页，默认第一页
        pagination:true,//是否分页
       // queryParamsType:'limit',//查询参数组织方式
        queryParams:queryParams, //请求服务器时所传的参数
        sidePagination:'server',//指定服务器端分页
        pageSize:3,//单页记录数
        pageList:[5,10,20],//分页步进值
        showRefresh:true,//刷新按钮 
        showToggle:true,  
        detailView: false, 
        idField: "proNo",
        clickToSelect: true,//是否启用点击选中行
        toolbarAlign:'left',//工具栏对齐方式
        buttonsAlign:'right',//按钮对齐方式
        undefinedText : "-",
        /* toolbar:'#toolbar',//指定工作栏 */
        columns:[
             	
                 {
                     title:'编号',
                     field:'id',
                 },
                 {
                     title:'用户姓名',
                     field:'userName',
                 },
                 {
                     title:'真实姓名',
                     field:'realName',
                 },
                  {
                     title:'所属工厂',
                     field:'factoryName',
                 }, 
                 {
                     title:'角色名字',
                     field:'roleName',
                 },
                 {
                 	title:'添加人',
                 	field:'addUserId',
                 },
                 {
                  	title:'添加时间',
                  	field:'addTime',
                  },
                 {
                     title:'编辑人',
                     field:'editId'
                 },
                 {
                     title:'编辑时间',
                     field:'editTime'
                 },
                 {
                     title:'操作',
                     field:'',
                     formatter:operateFormatter,
                     events : operateEvents
                 }
             ],
        locale:'zh-CN',//中文支持,
        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            console.log(res);
            return res;
        }
    });
 	//请求服务数据时所传参数
    function queryParams(params){
    	var searchObj=$('#searchForm').serialize();
		/* var searchstr=JSON.stringify(searchObj); */
        return{
            //每页多少条数据
            pageSize: params.limit,
            //请求第几页
            pageIndex:params.offset,
            //reqInfos:searchObj,
            //operate:"searchList",
            realName:$("#serUserName").val(),
            factoryId:$("#serFactoryName").val()
        }
    }
});	

//条件查询方法
function search(){
	 
	 $('#supplierList').bootstrapTable('refresh',{
		 
	    url:'userController/findUserByParam'
		 
	 });
}
 
//表格中增加按钮
function operateFormatter(value, row, index) {
	return [
			'<button type="button" class="update btn btn-warning  btn-sm" name="updateuser">修改</button>&nbsp;&nbsp;',
			'<button type="button" class="del btn btn-danger  btn-sm" name="deluser">删除</button>', 
			]
			.join('');
};
//注册按钮的点击事件
 window.operateEvents = {
		'click .update' : function(e, value, row, index) {
			//console.log(row);
			$.ajax({type: "POST",
				   url: "userController/findUserByPrimaryKey?id="+row.id,
				   dataType: "json",
				   success: function(dt){
					  console.log(dt);
					   var projectInfo=dt.t;
					  // console.log(projectInfo.projectName);
					   $("#id1").val(projectInfo.id);
					   $("#email1").val(projectInfo.email);
					   $("#userName1").val(projectInfo.userName);
					   //$("#loginPwd1").val(projectInfo.loginPwd);
					   $("#realName1").val(projectInfo.realName);
					   $("#notes1").val(projectInfo.notes);
					  if(projectInfo.sex==0){
						  $("#sex1").attr("checked",true);
					  }
					  if(projectInfo.sex==1){
						  $("#sex2").attr("checked",true);
					  }
					   $("#tel1").val(projectInfo.tel);
					   $("#notes1").val(projectInfo.notes);
					   $("#factoryId1").val(projectInfo.factoryId);
					   $("#myModal2").modal("show");
				   }
			});
		},
		'click .del' : function(e, value, row, index) {
			layer.msg('确定要删除客户信息吗？', {
				 time: 0, //不自动关闭
   			     btn: ['确定删除', '取消'],
   			     yes: function(index){
   			    	layer.close(index);
   			        $.ajax({type: "POST",
  				         url: "userController/updateDelState?id="+row.id,
  				         dataType: "json",
  				         success: function(result){
  				        	 if(result==1){layer.msg('<span style="font-size: 25px;">成功删除客户</span>',
  				        	 {area:['300px','60px']});
  				             }
  				        	$('#supplierList').bootstrapTable('refresh', {
    							url : 'userController/findUserByParam'
    						});
  				         }
   			        }); 
			     }
			})
	    },
	}; 
//页面加载完给工厂下拉框赋值
$(function(){
	$.ajax({
		url : 'factory/findfactory',
		type : 'POST',
		async : false,
		dataType : 'json',
		success : function(dt) {
			if (dt.erroCode == 0) {
				var $json = dt.t;
				var html = "<option value='0'>请选择</option>";
				$("#serFactoryName option").remove();
				for (var i = 0; i < $json.length; i++) {
						html += '<option value="'+$json[i].id+'">'
								+ $json[i].name + '</option>';
				}
				$("#serFactoryName").append(html);
				$("#factoryId").append(html);
				$("#factoryId1").append(html);
			}
		}
	});
});

function create(){
	$("#myModal1").modal("show");
}
