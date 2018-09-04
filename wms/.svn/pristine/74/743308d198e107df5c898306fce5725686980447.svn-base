var ctx = "/wms";
var base = {
	/**
	 * 表单相关
	 */
	form : {

		/**
		 * 初始化validation
		 */
		validation_init : function() {
			$.validator.setDefaults({
				highlight : function(element) {
					$("#contents").addClass('errorHeight');
				},
				success : function(element) {
					var flag = false;
					$("#contents span").each(function(){
						if($(this).html()!=''){
							flag=true;
						}
					})
					if(!flag){
						$("#contents").removeClass('errorHeight');
					}	
				},
			
				errorElement : "span",
			    errorClass:"errores"
			});
		},
		/**
		 * 表单验证
		 * 
		 * @param formid
		 *            表单的select
		 * @param option
		 *            验证参数
		 */
		validation : function(formid, option) {
			if (option == undefined) {
				$(formid).validate();
			} else {
				$(formid).validate(option);
			}
		},
		/**
		 * 重置表单验证
		 * 
		 * @param formid
		 *            表单的id
		 */
		validreset: function(formid){
			var validator = $(formid).validate({
		        submitHandler: function (form) {
		            form.submit();
		        }
		    });

		    validator.resetForm();
		},
		/**
		 * 表单提交，Ajax方式
		 * 
		 * @param formid
		 *            表单的select
		 * @param fn
		 *            自定义表单处理
		 */
		ajaxSubmit : function(option, fn) {
			$(option.formid).on('submit', function(e) {
				e.preventDefault(); // <-- important
				$(this).ajaxSubmit({
					dataType : "json",
					beforeSubmit : function() { // <-- run validate
						return $(option.formid).validate().form();
					},
					success : function(data) {
						if (typeof (fn) == "function") {
							fn(data);
						} else {
							if (data.status == 1) {
								option.cbfun(data);
							} else {
								base.dialog.alert({
									title : '错误',
									msg : data.msg
								});
							}
						}
					}
				});
			});
		}
	},
	/**
	 * 编辑器相关
	 */
	kindeditor : {
		defaultConfig : {
			items : [ 'source', '|', 'fullscreen', 'undo', 'redo', 'cut',
					'copy', 'paste', 'plainpaste', 'wordpaste', '|',
					'justifyleft', 'justifycenter', 'justifyright',
					'justifyfull', 'insertorderedlist', 'insertunorderedlist',
					'indent', 'outdent', 'subscript', 'superscript', '|',
					'selectall', '-', 'title', 'fontname', 'fontsize', '|',
					'textcolor', 'bgcolor', 'bold', 'italic', 'underline',
					'strikethrough', 'removeformat', '|', 'image', 'flash',
					'media', 'advtable', 'hr', 'link', 'unlink', '|', 'about' ]
		},
		init : function(ctx, select, items) {
			var myItems = (items != undefined) ? items
					: this.defaultConfig.items;
			KindEditor
					.ready(function(K) {
						var editor = K
								.create(
										select,
										{
											cssPath : ctx
													+ '/static/plugin/kindeditor/plugins/code/prettify.css',
											uploadJson : ctx
													+ '/adminsoft/upload_json.jsp',
											fileManagerJson : ctx
													+ '/adminsoft/file_manager_json.jsp',
											allowFileManager : true,
											items : myItems,
											afterBlur : function() {
												this.sync();
											}
										});
						prettyPrint();
					});
		},
		mini : function(ctx, select) {
			KindEditor
					.ready(function(K) {
						var editor = K
								.create(
										select,
										{
											cssPath : ctx
													+ '/static/plugin/kindeditor/plugins/code/prettify.css',
											allowPreviewEmoticons : false,
											allowImageUpload : false,
											items : [ 'fontname', 'fontsize',
													'|', 'forecolor',
													'hilitecolor', 'bold',
													'italic', 'underline',
													'removeformat', '|',
													'justifyleft',
													'justifycenter',
													'justifyright',
													'insertorderedlist',
													'insertunorderedlist', '|',
													'emoticons', 'image',
													'link' ],
											afterBlur : function() {
												this.sync();
											}
										});
						prettyPrint();
					});
		},
		imageDialog : function(ctx, buttonId, inputId, Fn) {
			KindEditor
					.ready(function(K) {
						var editor = K
								.editor({
									allowFileManager : true,
									cssPath : ctx
											+ '/static/plugin/kindeditor/plugins/code/prettify.css',
									uploadJson : ctx
											+ '/adminsoft/upload_json.jsp',
									fileManagerJson : ctx
											+ '/adminsoft/file_manager_json.jsp'
								});
						K('#' + buttonId).click(
								function() {
									editor.loadPlugin('image', function() {
										editor.plugin.imageDialog({
											imageUrl : K('#' + inputId).val(),
											clickFn : function(url, title,
													width, height, border,
													align) {
												Fn(url, title, width, height,
														border, align);
												editor.hideDialog();
											}
										});
									});
								});
					});
		}
	},
	/**
	 * 菜单相关
	 */
	menu : {
		active : function(menuid) {
			$('#' + menuid).parents("li").addClass('active');
            $('#' + menuid).addClass('active');
		}
	},
	/**
	 * datatable相关
	 */
	datatable : {
		self : {},
		table : function(option) {
			var tableOption = {
				"oLanguage" : {
					"sProcessing" : "处理中...",
					"sLengthMenu" : "_MENU_ 记录/页",
					"sZeroRecords" : "没有匹配的记录",
					"sInfo" : "",//"显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
					//"sInfoEmpty" : "显示第 0 至 0 项记录，共 0 项",
					"sInfoEmpty" : "",
					"sInfoFiltered" : "",
					"sInfoPostFix" : "",
					"sSearch" : "过滤:",
					"sUrl" : "",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "«",
						"sNext" : "»",
						"sLast" : "末页"
					}
				},
				'iDisplayLength' : 20,
				"iDisplayStart" : 0,
				"bLengthChange" : false,
				'bPaginate' : true,
				"bDestory" : true,
				"bRetrieve" : true,
				"bFilter" : false,
				"bSort" : false,
				"bProcessing" : true,
				"serverSide" : true,
				"ajax" : {
					"url" : option.url,
					"type" : "POST",
					"data" : function(d) {
						d.columns = null;
						d.search = null;
					}
				}
			};
/*			if (option.aoColumns != undefined) {
				tableOption.aoColumns = option.aoColumns;
			}
			if (option.columnDefs != undefined) {
				tableOption.columnDefs = option.columnDefs;
			}
			if (option.fnServerParams != undefined) {
				tableOption.fnServerParams = option.fnServerParams;
			}*/
			tableOption = $.extend(tableOption,option);
			var table = $(option.tableid).dataTable(tableOption);
			this.self = table;
			return table;
		},
		reloadAjax : function(option) {
			var table = (option != undefined && option.table != undefined) ? option.table
					: this.self;
			if (option != undefined && option.url != undefined) {
				table.fnReloadAjax(option.url);
			} else {
				table.fnReloadAjax();
			}
		},
		noPaginate : function(option) {
			var tableOption = {
				"oLanguage" : {
					"sProcessing" : "处理中...",
					"sLengthMenu" : "",//"_MENU_ 记录/页",
					"sZeroRecords" : "没有匹配的记录",
					"sInfo" : "",
					"sInfoEmpty" : "",
					"sInfoFiltered" : "",
					"sInfoPostFix" : "",
					"sUrl" : "",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "«",
						"sNext" : "»",
						"sLast" : "末页"
					}
				},
				"bLengthChange" : false,
				'bPaginate' : false,
				"bDestory" : false,
				"bRetrieve" : false,
				"bFilter" : false,
				"bSort" : false,
				"bProcessing" : false,
				"bScrollInfinite" : true,
				"serverSide" : true,
				"ajax" : {
					"url" : option.url,
					"type" : "POST",
					"data" : function(d) {
						d.columns = null;
						d.search = null;
					}
				}
			};
/*			if (option.aoColumns != undefined) {
				tableOption.aoColumns = option.aoColumns;
			}
			if (option.columnDefs != undefined) {
				tableOption.columnDefs = option.columnDefs;
			}
			if (option.fnServerParams != undefined) {
				tableOption.fnServerParams = option.fnServerParams;
			}*/
			$.extend(tableOption,option);
			var table = $(option.tableid).dataTable(tableOption);
			this.self = table;
			return table;
		}

	},
	datatablemy : {
		self : {},
		table : function(option) {
			var tableOption = {
				"oLanguage" : {
					"sProcessing" : "处理中...",
					"sLengthMenu" : "_MENU_ 记录/页",
					"sZeroRecords" : "没有匹配的记录",
					"sInfo" : "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
					"sInfoEmpty" : "显示第 0 至 0 项记录，共 0 项",
					"sInfoFiltered" : "(由 _MAX_ 项记录过滤)",
					"sInfoPostFix" : "",
					"sSearch" : "过滤:",
					"sUrl" : "",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "上页",
						"sNext" : "下页",
						"sLast" : "末页"
					}
				},
				'iDisplayLength' : 20,
				"iDisplayStart" : 0,
				"bLengthChange" : false,
				'bPaginate' : true,
				"bDestory" : true,
				"bRetrieve" : true,
				"bFilter" : false,
				"bSort" : false,
				"bProcessing" : true,
				"serverSide" : true,
				"ajax" : {
					"url" : option.url,
					"type" : "POST",
					"data" : function(d) {
						d.columns = null;
						d.search = null;
					}
				}
			};
			/*if (option.aoColumns != undefined) {
				tableOption.aoColumns = option.aoColumns;
			}
			if (option.columnDefs != undefined) {
				tableOption.columnDefs = option.columnDefs;
			}
			if (option.fnServerParams != undefined) {
				tableOption.fnServerParams = option.fnServerParams;
			}*/
			$.extend(tableOption,option);
			var table = $(option.tableid).dataTable(tableOption);
			this.self = table;
			return table;
		},
		reloadAjax : function(option) {
			var table = (option != undefined && option.table != undefined) ? option.table
					: this.self;
			if (option != undefined && option.url != undefined) {
				table.fnReloadAjax(option.url);
			} else {
				table.fnReloadAjax();
			}
		},
		noPaginate : function(option) {
			var tableOption = {
				"oLanguage" : {
					"sProcessing" : "处理中...",
					"sLengthMenu" : "_MENU_ 记录/页",
					"sZeroRecords" : "没有匹配的记录",
					"sInfo" : "",
					"sInfoEmpty" : "",
					"sInfoFiltered" : "",
					"sInfoPostFix" : "",
					"sUrl" : "",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "上页",
						"sNext" : "下页",
						"sLast" : "末页"
					}
				},
				"bLengthChange" : false,
				'bPaginate' : false,
				"bDestory" : false,
				"bRetrieve" : false,
				"bFilter" : false,
				"bSort" : false,
				"bProcessing" : false,
				"bScrollInfinite" : true,
				"serverSide" : true,
				"ajax" : {
					"url" : option.url,
					"type" : "POST",
					"data" : function(d) {
						d.columns = null;
						d.search = null;
					}
				}
			};
			/*if (option.aoColumns != undefined) {
				tableOption.aoColumns = option.aoColumns;
			}
			if (option.columnDefs != undefined) {
				tableOption.columnDefs = option.columnDefs;
			}
			if (option.fnServerParams != undefined) {
				tableOption.fnServerParams = option.fnServerParams;
			}*/
			$.extend(tableOption,option);
			var table = $(option.tableid).dataTable(tableOption);
			this.self = table;
			return table;
		}

	},

	ajax : {
		get : function(option) {
			$.ajax({
				url : option.url,
				cache : false,
				dataType : "json",
				type : "GET",
				data : option.data,
				success : function(json) {
					if (json.status == 1) {
						option.success(json);
					} else {
						base.dialog.alert({
							title : '错误',
							msg : json.msg
						});
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if (typeof (option.error) == "function") {
						option.error(XMLHttpRequest, textStatus, errorThrown);
					} else {
						base.dialog.alert({
							title : '错误',
							msg : "系统错误"
						});
					}
				}
			});
		}
	},

	dialog : {
		alert : function(option) {
			var msg = option.title===undefined?'消息':option.title;
			$.MsgBox.Alert(msg, option.msg,option.callback);
//			BootstrapDialog.alert({
//				title : option.title == undefined ? '提示' : '错误',
//				message : option.msg,
//				type : BootstrapDialog.TYPE_WARNING,
//				closable : true,
//				draggable : true,
//				callback : function(result) {
//					if (typeof (option.callback) == "function") {
//						option.callback(result);
//					}
//				}
//			});
		},
		confirm : function(option) {
			var msg = option.title===undefined?'消息':option.title;
			$.MsgBox.Confirm(msg,option.msg,option.callback);
//			BootstrapDialog.confirm(option.msg, function(result) {
//				option.callback(result);
//			});
		}
	},
	// 模版
	Handlebars : {
		source : function(tempId) {
			return $("#" + tempId).html();
		},
		tpl : function(tempId) {
			Handlebars.registerHelper("addOne", function(index) {
				// 在父级循环对象中添加一个_index属性，用来保存父级每次循环的索引
				this._index = index;
				// 返回+1之后的结果
				return this._index;
			});
			return Handlebars.compile(this.source(tempId));
		},
		render : function(tempId, date) {
			var template = this.tpl(tempId);
			return template(date);
		},
		renderSource : function(source, date) {
			var template = this.tpl(source);
			return template(date);
		}
	},

	tools : {

		getByteLen : function(val) {
			var len = 0;
			for (var i = 0; i < val.length; i++) {
				var a = val.charAt(i);
				if (a.match(/[^\x00-\xff]/ig) != null) {
					len += 2;
				} else {
					len += 1;
				}
			}
			return len;
		}
	}

};

function showMsg(info){
	info.msg = info.msg || '';
 info.type = info.type || '';
 info.btnType = info.btnType || '';
 //info.success = callback;
 
 if(info.type == "question"){
 	BootstrapDialog.show({
         title: "提示",
         message: info.msg,
         buttons: [{
             label: '确定',
             cssClass: 'btn-primary', 
             action: function(dialog) {
                 info.success();
                 dialog.close();
             }
         }, {
             label: '取消',
             action: function(dialog) {
             	//info.error();
             	dialog.close();
             }
         }]
     });
	}else{
		info.btnType = "btn-outline";
		if(info.type == "info"){
	    	info.type = BootstrapDialog.TYPE_INFO;
	    }else if(info.type == "warning"){
	    	info.type = BootstrapDialog.TYPE_WARNING;
	    }else if(info.type == "error"){
	    	info.type = BootstrapDialog.TYPE_DANGER;
	    }else if(info.type == "success"){
	    	info.type = BootstrapDialog.TYPE_SUCCESS;
	    }else if(info.type == "danger"){
	    	info.type = BootstrapDialog.TYPE_DANGER;
	    }else{
	    	info.btnType = "btn-primary";
	    }
		BootstrapDialog.show({
	        title: "提示",
	        message: info.msg,
	        type: info.type,
	        buttons: [{
	        	 label: '关闭',
	        	 cssClass: info.btnType, 
	             action: function(dialog) {
	                 dialog.close();
	             }
	        }]
	    });
	}
}
