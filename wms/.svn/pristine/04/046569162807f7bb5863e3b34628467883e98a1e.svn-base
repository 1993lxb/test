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
    <title>主物料管理</title>
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
	
 	$('#materielList').bootstrapTable({
		contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url:"materiel/findMaterielByParam",//要请求数据的文件路径
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
        idField: "pn",
        clickToSelect: true,//是否启用点击选中行
        toolbarAlign:'left',//工具栏对齐方式
        buttonsAlign:'right',//按钮对齐方式
        /* toolbar:'#toolbar',//指定工作栏 */
        columns:[
             	
                 {
                     title:'物料号',
                     field:'pn',
                 },
                 {
                 	title:'物料名称',
                 	field:'name',
                 },
                 {
                     title:'物料规格',
                     field:'specification',
                 },
                 {
                     title:'物料组',
                     field:'mGroupName'
                 },
                 {
                     title:'湿敏材料',
                     field:'isHumidity',
                     formatter: function(value,row,index){
                    		 if(row.isHumidity==0)
                    			 return "否";
                    		 if(row.isHumidity==1)
                    			 return "是";
                    }
                 },
                 {
                     title:'单位',
                     field:'unitName'
                 },
                 {
                     title:'创建时间',
                     field:'addTime'
                 },
                 {
                     title:'更改时间',
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
            pn:$("#serMaterielPn").val(),
            mGroupId:$("#selectMg").val()
           
            //reqInfos:searchObj,
            //operate:"searchList",
        }
    }
});	
 //条件查询方法
 function searchByNamePn(){
	 
	 $('#materielList').bootstrapTable('refresh',{
		 
	    url:'materiel/findMaterielByParam'
		 
	 });
 }
//表格中增加按钮
function operateFormatter(value, row, index) {
	return [
			'<button type="button" class="update btn btn-warning  btn-sm" name="updateMateriel">修改</button>&nbsp;&nbsp;',
			'<button type="button" class="del btn btn-danger  btn-sm" name="delMateriel">删除</button>', 
			]
			.join('');
};
//注册按钮的点击事件
 window.operateEvents = {
		'click .update' : function(e, value, row, index) {
			
			$.ajax({type: "POST",
				   url: "materiel/findMaterielByPn?pn="+row.pn,
				   dataType: "json",
				   success: function(dt){
					   console.log(dt);
					   var $s=dt.t;
					   $("#insertMaterielPn").val($s.pn);
					   $("#insertMaterielEditTime").val($s.editTime);
					   $("#insertMaterielbad").val($s.depletionNum);
					   $("#insertMaterielHumidityDay").val($s.humidityDay);
					   $("#isHumidity").val($s.isHumidity);
					   
					   $("#insertMaterielName").val($s.name);
					   $("#insertMaterielSpecification").val($s.specification);
					   $("#insertMaterielTitalNum").val($s.totalNum);
					   $("#insertMaterielLimitNum").val($s.limitNum);
					   
					   $("#insertMaterielSelect").val($s.mGroupId);
					   $("#insertUnitSelect").val($s.unitId);
					   $("#insertMaterielNotes").val($s.notes);
					   $("#myModalUpdate").modal("show"); 
				   }
			});
		},
		'click .del' : function(e, value, row, index) {
			
			layer.msg('确定要删除主物料信息吗？', {
				 time: 0, //不自动关闭
   			     btn: ['确定删除', '取消'],
   			     yes: function(index){
   			    	layer.close(index);
   			        $.ajax({type: "POST",
  				         url: "materiel/delMateriel?pn="+row.pn,
  				         dataType: "json",
  				         success: function(result){
  				        	 if(result==1){layer.msg('<span style="font-size: 25px;">成功删除主物料</span>',
  				        	 {area:['300px','60px']});
  				             }
  				        	$('#materielList').bootstrapTable('refresh',{
  				     		 
  				      	    url:'materiel/findMaterielByParam'
  				      		 
  				      	 });
  				         }
   			        }); 
			     }
			})
	    },
	}  
//查询物料组
$(function(){
	$.ajax({
		url:"materiel/findMaterialGroup",
		type:'POST',
		dataType:'json',
		success:function(dt){
			var $m=dt.t;
			var html1='<option value=""> '+"--请选择--"+'</option>';
			
			for(var i=0;i<$m.length;i++){
				html1+='<option value="'+$m[i].id+'"> '+$m[i].name+'</option>'
				
			}
			$("[name=mGroupId]").append(html1);
			
		},
		error:function(dt){
		    console.log(dt);
	     }
	});
});
//查询物料单位
$(function(){
	$.ajax({
		url:"materiel/findUnit",
		type:'POST',
		dataType:'json',
		success:function(dt){
			var $m=dt.t;
			var html1='<option value=""> '+"--请选择--"+'</option>';
			for(var i=0;i<$m.length;i++){
				html1+='<option value="'+$m[i].id+'"> '+$m[i].name+'</option>'
			}
			$("[name=unitId]").append(html1);
		},
		error:function(dt){
		    console.log(dt);
	     }
	});
});

</script>
    
</head>

<body>
            <div class="search">
                <form class="form-inline" id="searchForm">
                    <div class="form-group">
                        <label for="">物料号：</label>
                        <input type="text" class="form-control" id="serMaterielPn" name = "pn" ></input>
                    </div>
                    <div class="form-group">
                        <label for="">物料组：</label>
                           <select class="form-control" id="selectMg" name="mGroupId">
                              
                           </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" onclick="searchByNamePn()">查询</button>
                    </div>
                    
                </form>
            </div>
            </br>
            <div class="toolbar">
                <button type="button" class="btn btn-primary" id = "add" data-toggle="modal" data-target="#insertModal" >创建主物料</button>
            </div> 
            
            <div class="main">
                
                <table id="materielList">
                    
                </table>
            </div>
   <!-- 模态框（Modal） -->
     <!-- 增加主物料 -->
<div class="modal fade" id="insertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					增加主物料
				</h4>
			</div>
			<form action="materiel/insertMateriel">
			<div class="modal-body">
			     <table>
			       <tr>
			            <td>物料号：</td>
			            <td><input type="text"  class="form-control" name="pn"></td>
			       </tr>
			       <tr>
			            <td>条形码：</td>
			            <td><input type="text" class="form-control" name="barcode"></td>
			       </tr>
			       <tr>
			            <td>损坏数：</td>
			            <td><input type="text"  class="form-control" name="depletionNum"></td>
			       </tr>
			       <tr>
			            <td>多少天烘烤：</td>
			            <td><input type="text"  class="form-control" name="humidityDay"></td>
			       </tr>
			       <tr>
			            <td>是否为湿敏材料：</td>
			            <td>
			               <select name="isHumidity"  class="form-control">
                              <option value="">--请选择--</option>
                              <option value="0">否</option>
                              <option value="1">是</option>
                           </select>
			            </td>
			       </tr>
			       <tr>
			            <td>名称：</td>
			            <td><input type="text"  class="form-control" name="name"></td>
			       </tr>
			       <tr>
			            <td>规格：</td>
			            <td><input type="text"  class="form-control" name="specification"></td>
			       </tr>
			       <tr>
			            <td>数量：</td>
			            <td><input type="text"  class="form-control" name="totalNum"></td>
			       </tr>
			       <tr>
			            <td>物料组：</td>
			            <td>
			                <select  class="form-control" name="mGroupId">
			                </select>
			            </td>
			       </tr>
			       <tr>
			            <td>单位：</td>
			            <td>
			                <select class="form-control" name="unitId">
			                </select>
			            </td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" class="form-control" name="notes"></td>
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

 <!-- 修改主物料 -->
<div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					修改主物料
				</h4>
			</div>
			<form action="materiel/updateMateriel">
			<div class="modal-body">
			     <table>
			       <tr>
			            <td>物料号：</td>
			            <td><input type="text" id="insertMaterielPn" class="form-control" name="pn" ReadOnly="true">
			                <input type="hidden" id="insertMaterielEditTime" class="form-control" name="editTime">
			            </td>
			       </tr>
			       
			       <tr>
			            <td>损坏数：</td>
			            <td><input type="text" id="insertMaterielbad" class="form-control" name="depletionNum"></td>
			       </tr>
			       <tr>
			            <td>多少天烘烤：</td>
			            <td><input type="text" id="insertMaterielHumidityDay" class="form-control" name="humidityDay"></td>
			       </tr>
			       <tr>
			            <td>是否为湿敏材料：</td>
			            <td>
			               <select name="isHumidity" id="isHumidity" class="form-control">
                              <option value="">--请选择--</option>
                              <option value="0">否</option>
                              <option value="1">是</option>
                           </select>
			            </td>
			       </tr>
			       <tr>
			            <td>名称：</td>
			            <td><input type="text" id="insertMaterielName" class="form-control" name="name"></td>
			       </tr>
			       <tr>
			            <td>规格：</td>
			            <td><input type="text" id="insertMaterielSpecification" class="form-control" name="specification"></td>
			       </tr>
			       <tr>
			            <td>数量：</td>
			            <td><input type="text" id="insertMaterielTitalNum" class="form-control" name="totalNum"></td>
			       </tr>
			       <tr>
			            <td>受限数：</td>
			            <td><input type="text" id="insertMaterielLimitNum" class="form-control" name="limitNum"></td>
			       </tr>
			       <tr>
			            <td>物料组：</td>
			            <td>
			                <select id="insertMaterielSelect" class="form-control" name="mGroupId">
			                </select>
			            </td>
			       </tr>
			       <tr>
			            <td>单位：</td>
			            <td>
			                <select id="insertUnitSelect" class="form-control" name="unitId">
			                </select>
			            </td>
			       </tr>
			       <tr>
			            <td>备注：</td>
			            <td><input type="text" id="insertMaterielNotes" class="form-control" name="notes"></td>
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