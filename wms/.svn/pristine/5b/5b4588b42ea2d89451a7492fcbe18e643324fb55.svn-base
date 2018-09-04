<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<base href="<%=basePath%>">
<meta charset="utf-8"/>

    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <link rel="icon" href="images/sim.ico" />
    <title>物料组维护</title>
    <!-- Bootstrap core CSS -->
   	<link href="css/vendor/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/src/main.css" rel="stylesheet"/>
    <link rel="stylesheet" href="js/vendor/datatables/dataTables.bootstrap.css"></link>
    <link rel="stylesheet" href="js/vendor/datatables/jquery.dataTables.css"></link>
    <link rel="stylesheet"	href="css/src/use_data_table_css.css"></link>
    <link href="bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
    
    
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/vendor/jquery.min.js"></script>
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/common.js"></script>
    
	<script src="js/vendor/datatables/jquery.dataTables.min.js"></script>
	<script src="js/vendor/bootstrap/bootstrap.min.js"></script>
	<script src="js/vendor/datatables/dataTables.bootstrap.min.js"></script>

	<script src="js/vendor/jquery-validation/jquery.validate.min.js"></script>	
	<script src="js/vendor/jquery-validation/messages_zh.js"></script>	
	<script src="bootstrap/js/bootstrap-table.min.js"></script>
    <script src="bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
    <script src="layer/layer.js"></script>
	
	<script src="js/base.js"></script>
    
    
<script type="text/javascript">
$(function(){
	
 	$('#materialGroupList').bootstrapTable({
		contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:"materialGroup/findMaterialGroupByParam",//要请求数据的文件路径
        /* height:tableHeight(),//高度调整 */
        /* toolbar: '#toolbar',//指定工具栏 */
        striped: true, //是否显示行间隔色
        dataField: "res",//bootstrap table 可以前端分页也可以后端分页，这里
        //我们使用的是后端分页，后端分页时需返回含有total：总记录数,这个键值好像是固定的  
        //rows： 记录集合 键值可以修改  dataField 自己定义成自己想要的就好
        pageNumber: 1, //初始化加载第一页，默认第一页
        pagination:true,//是否分页
        queryParamsType:'limit',//查询参数组织方式
        queryParams:queryParams, //请求服务器时所传的参数
        sidePagination:'server',//指定服务器端分页
        pageSize:5,//单页记录数
        pageList:[5,10,20,30,40],//分页步进值
        showRefresh:true,//刷新按钮 
        showToggle:true,  
        detailView: false, 
        idField: "id",
        clickToSelect: true,//是否启用点击选中行
        toolbarAlign:'left',//工具栏对齐方式
        buttonsAlign:'right',//按钮对齐方式
        /* toolbar:'#toolbar',//指定工作栏 */
        columns:[
             	
                 {
                     title:'编号',
                     field:'id',
                 },
                 {
                 	title:'添加时间',
                 	field:'addTime',
                 },
                 {
                     title:'删除状态',
                     field:'deleteState',
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
                     title:'是否电子元件',
                     field:'isElectronic',
                     formatter: function(value,row,index){
                    		 if(row.isElectronic==0)
                    			 return "否";
                    		 if(row.isElectronic==1)
                    			 return "是";
                    	 }
                 },
                 {
                     title:'名称',
                     field:'name'
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
            isElectronic:$("#isElectronic").val(),
            name:$("#serMaterialGroupName").val()
           
            //reqInfos:searchObj,
            //operate:"searchList",
        }
    }
});	
 //条件查询方法
 function searchByNameAddress(){
	 
	 $('#materialGroupList').bootstrapTable('refresh',{
		 
	    url:'materialGroup/findMaterialGroupByParam'
		 
	 });
 }
//表格中增加按钮
function operateFormatter(value, row, index) {
	return [
			'<button type="button" class="update btn btn-warning  btn-sm" name="updateSupplier">修改</button>&nbsp;&nbsp;',
			'<button type="button" class="del btn btn-danger  btn-sm" name="delSupplier">删除</button>', 
			]
			.join('');
};
//注册按钮的点击事件
 window.operateEvents = {
		'click .update' : function(e, value, row, index) {
			
			$.ajax({type: "POST",
				   url: "materialGroup/findMaterialGroupById?id="+row.id,
				   dataType: "json",
				   success: function(dt){
					   console.log(dt);
					   var $m=dt.t;
					   $("#materialGroupIdUp").val($m.id);
					   $("#materialGroupIsElecUp").val($m.isElectronic);
					   $("#materialGroupNameUp").val($m.name);
					   $("#materialGroupNotesUp").val($m.notes);
					   $("#myModalUpdate").modal("show");
				   }
			});
		},
		'click .del' : function(e, value, row, index) {
			layer.msg('确定要删除物料组信息吗？', {
				 time: 0, //不自动关闭
   			     btn: ['确定删除', '取消'],
   			     yes: function(index){
   			    	layer.close(index);
   			        $.ajax({type: "POST",
  				         url: "materialGroup/delMaterialGroup?id="+row.id,
  				         dataType: "json",
  				         success: function(result){
  				        	 if(result==1){layer.msg('<span style="font-size: 25px;">成功删除物料组</span>',
  				        	 {area:['300px','60px']});
  				             }
  				        	$('#materialGroupList').bootstrapTable('refresh',{
  				     		 
  				      	    url:'materialGroup/findMaterialGroupByParam'
  				      		 
  				      	 });
  				         }
   			        }); 
			     }
			})
	    },
	};  

</script>
    
</head>

<body>
            <div class="search">
                <form class="form-inline" id="searchForm">
                    <div class="form-group">
                        <label for="">是否是电子元件：</label>
                        <select name="isElectronic" id="isElectronic" class="form-control">
                              <option value="">--请选择--</option>
                              <option value="0">否</option>
                              <option value="1">是</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">名称：</label>
                        <input type="text" class="form-control" id="serMaterialGroupName" name = "serMaterialGroupName" ></input>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" onclick="searchByNameAddress()">查询</button>
                    </div>
                    
                </form>
            </div>
            </br>
            <div class="toolbar">
                <button type="button" class="btn btn-primary" id = "add" data-toggle="modal" data-target="#myModal" onclick="create()">创建物料组</button>
            </div> 
            
            <div class="main">
                
                <table id="materialGroupList">
                    
                </table>
            </div>
   <!-- 模态框（Modal） -->
     <!-- 增加物料组 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					增加物料组
				</h4>
			</div>
			<form action="materialGroup/insertMaterialGroup">
			<div class="modal-body">
			     <table class="table">
			     
			        <tr>
			            <td>是否电子元件：</td>
			            <td>
			                <select class="form-control"  name="isElectronic">
			                   <option value="0">否</option>
			                   <option value="1">是</option>
			                </select>
			            </td>
			        </tr>
			       <tr>
			            <td>名字：</td>
			            <td><input type="text" class="form-control" id="materialGroupName" name="name"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" class="form-control" id="materialGroupNotes" name="notes"></td>
			       </tr>
			     </table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="submit" class="btn btn-primary">
					提交
				</button>
			</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

 <!-- 修改物料组 -->
<div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					修改物料组
				</h4>
			</div>
			<form action="materialGroup/updateMaterialGroupById">
			<div class="modal-body">
			     <table class="table">
			       
			        <tr>
			            <td>是否电子元件：</td>
			            <td>
			                <select class="form-control" id="materialGroupIsElecUp"  name="isElectronic">
			                   <option value="0">否</option>
			                   <option value="1">是</option>
			                </select>
			            </td>
			        </tr>
			       <tr>
			            <td>名字：</td>
			            <td><input type="text" class="form-control" id="materialGroupNameUp" name="name"></td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" class="form-control" id="materialGroupNotesUp" name="notes">
			            <input type="hidden" id="materialGroupIdUp" name="id">
			            </td>
			       </tr>
			     </table>
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="submit" class="btn btn-primary">
					提交
				</button>
			</div>
			</form>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>

</html>