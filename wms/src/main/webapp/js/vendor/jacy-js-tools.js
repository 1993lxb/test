
/*
 * json变量，方便所有函数的调用
 * */
var jsFunc = new Object();

 
/*
 * 获取项目路径
 * */
jsFunc.getRootPath = function (){
	
	//获取当前网址，如： http://localhost:8083/ProjectA/share/meun.jsp
	var url = window.document.location.href;
	
	//获取主机地址之后的目录，如： ProjectA/share/meun.jsp
	var pathName = window.document.location.pathname;
	
	var pos = url.indexOf(pathName);
	
	//获取主机地址，如： http://localhost:8083
	var localhostPath = url.substring(0,pos);
	
	//获取带"/"的项目名，如：/ProjectA
	var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	
	//返回项目根路径，如：http://localhost:8083/ProjectA/
	return(localhostPath + projectName + "/");
}

/*
 * 验证表单的 图片提示
 * */
jsFunc.str_wait = function() {
	return "<img src='"+jsFunc.getRootPath()+"page/proscenium_page/resources/images/wait.gif' width='16' height='16'></img>&nbsp";
}
jsFunc.str_right = function() {
	return "<img src='"+jsFunc.getRootPath()+"page/proscenium_page/resources/images/right.gif' width='16' height='16'></img>&nbsp";
}
jsFunc.str_wrong = function() {
	return "<img src='"+jsFunc.getRootPath()+"page/proscenium_page/resources/images/wrong.gif' width='16' height='16'></img>&nbsp";
}

/*
 * 统计字符串长度（单个双字节字符长度将被统计成2个，比如中文字符）
 * */
jsFunc.totalStringLength = function(str) {
	//将str中的双字节字符（包括汉字）替换成字符串"aa",再返回str的长度
	return str.replace(/[^\x00-\xff]/g,"aa").length; 
};

/*
 *	将表单中的各表单项参数  先转换成json字符串，如{"name" : "tom","age" : "19"},再转换成Json对象
 * 	参数：form的id 
 *	返回值：Json Object
 *	提示：不支持数组 
 */
jsFunc.form2JsonObject1 = function (id) {
	 
    var arr = $("#" + id).serializeArray();
    var jsonStr = "";
 
    jsonStr += "{";
    for (var i = 0; i < arr.length; i++) {
        jsonStr += '"' + arr[i].name + '":"' + arr[i].value + '",'
    }
    jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
    jsonStr += "}"
    //alert(jsonStr);
    jsonObj = JSON.parse(jsonStr);
    return jsonObj;
}
/*
 * 上传图片后缀校验
 * 参数：file的id
 * 返回值：符合规则true、不符合规则false 
 * */
jsFunc.checkImg = function (target) {
	if(!/^.+\.(jpg|jpeg|gif|bmp|png){1,1}$/ig.test(target.value)){
		return false;
	}
	return true;
}

/*
 * 上传文件大小
 * 参数：file的id
 * 返回值：文件大小（单位：字节）
 * */
jsFunc.countFileSize = function (target) {
	var fileSize = 0;
	var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
	var isIE6 = false;
	//document.write("<!--[iflte IE6]><script>isIE6=true;</scr"+"ipt><![endif]-->");
	if(isIE6){
		alert("浏览器是IE6");
		 var filePath = target.value;
         var image=new Image();  
         image.dynsrc=filePath;  
         fileSize=image.fileSize;
         return fileSize;
	}
	if (isIE && !target.files) {
		var filePath = target.value;      
		var fileSystem = new ActiveXObject("Scripting.FileSystemObject");         
		var file = fileSystem.GetFile (filePath);      
		fileSize = file.Size;     
	} else {     
		fileSize = target.files[0].size;      
	}    
	return fileSize;

}

var isIE = /msie/i.test(navigator.userAgent) && !window.opera;      
jsFunc.countFileSize11 = function (target) {
 
  var fileSize = 0;       
  if (isIE && !target.files) {   
    var filePath = target.value;   
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");      
    var file = fileSystem.GetFile (filePath);   
    fileSize = file.Size;  
  } else {  
   fileSize = target.files[0].size;   
   } 
   /*var size = fileSize / 1024;  
   if(size>10000){
    alert("附件不能大于10M");*/
  return fileSize;
}


/**
 * 为form2Json提供调用
 * @returns 
 */
function StringBuilder(){
	this._element_ = new Array();
	this.append = function(item) {
		this._element_.push(item);
	}
	this.toString = function() {
		return this._element_.join("");
	}
	this.toJsonString = function() {
		return this._element_.join(",");
	}
	this.join = function(separator) {
		return this._element_.join(separator);
	}
	this.length = function() {
		return this._element_.length;
	}	
}

/**
 * 为form2Json提供调用
 * @returns 
 */
function Map() {
	this.elements = new Array();
	// 获取MAP元素个数
	this.size = function() {
		return this.elements.length;
	}
	// 判断MAP是否为空
	this.isEmpty = function() {
		return (this.elements.length < 1);
	}
	// 删除MAP所有元素
	this.clear = function() {
		this.elements = new Array();
	}
	// 向MAP中增加元素（key, value)
	this.put = function(_key, _value) {
		this.elements.push({key : _key,value : _value});
	}	
	//增加元素并覆盖
	this.putOverride = function(_key,_value){
		this.remove(_key);
		this.put(_key,_value);
	}
	// 删除指定KEY的元素，成功返回True，失败返回False
	this.remove = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					this.elements.splice(i, 1);
					return true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}

	// 获取指定KEY的元素值VALUE，失败返回NULL
	this.get = function(_key) {
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					return this.elements[i].value;
				}
			}
		} catch (e) {
			return null;
		}
	}
	// 获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
	this.element = function(_index) {
		if (_index < 0 || _index >= this.elements.length) {
			return null;
		}
		return this.elements[_index];
	}
	// 判断MAP中是否含有指定KEY的元素
	this.containsKey = function(_key) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].key == _key) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}
	// 判断MAP中是否含有指定VALUE的元素
	this.containsValue = function(_value) {
		var bln = false;
		try {
			for (i = 0; i < this.elements.length; i++) {
				if (this.elements[i].value == _value) {
					bln = true;
				}
			}
		} catch (e) {
			bln = false;
		}
		return bln;
	}
	// 获取MAP中所有VALUE的数组（ARRAY）
	this.values = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].value);
		}
		return arr;
	}
	// 获取MAP中所有KEY的数组（ARRAY）
	this.keys = function() {
		var arr = new Array();
		for (i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].key);
		}
		return arr;
	}
}

/**
 * 将表单序列化成json字符串，形如：'{"te01":"11","sel01":"sy","rad01":"22","chk01":"aa,bb,cc"}'
 * @param formId
 * @returns {String}
 */
jsFunc.form2Json = function(formId){
	var form=document.getElementById(formId);
	var sb=new StringBuilder();var rcs=new Map();
		for ( var i = 0; i < form.elements.length; i++){
			var element = form.elements[i];	var name = element.name;
			if (typeof (name) === "undefined" || (name === null) || (name.length === 0)){continue;}
			var tagName = element.tagName;		
			if(tagName ==='INPUT'||tagName === 'TEXTAREA'){var type = element.type;
				if ((type === 'text')||(type === 'password') || (type === 'hidden') || (tagName === 'TEXTAREA')){
					//此处使用encodeURIComponent()中文会乱码
//					sb.append("\""+name+"\":\""+encodeURIComponent(element.value.replace(/\r\n/ig,""))+"\"");
					sb.append("\""+name+"\":\""+element.value.replace(/\n/ig," ")+"\"");
				}else if((type === 'checkbox') || (type === 'radio')){
					rcs.putOverride(name,type);
				}else{continue;}
			}else if (tagName === 'SELECT'){var oc = element.options.length;
				for ( var j = 0; j <oc; j++){
					if (element.options[j].selected){sb.append("\""+name+"\":\""+(element.value)+"\"");}
				}
			}
		}	
		if(rcs.size()>0){
			for(var i=0;i<rcs.size();i++){
			var r=rcs.element(i);var radio="";
				var d=document.getElementsByName(r.key);
				if(r.value==="radio"){
					for(j=0;j<d.length;j++){
						if(d[j].checked){radio=d[j].value;}
					}				
				}else{
					for(j=0;j<d.length;j++){
						if(d[j].checked){radio+=","+d[j].value;}
					}
					radio = radio.substr(1);
				}
				sb.append("\""+r.key+"\":\""+radio+"\"");
			}
		}
		return "{"+sb.toJsonString()+"}";
	}

/**
 * 将表单参数转换为json对象：{"title":["1","11"],"author":["2","22"]}
 */
jsFunc.form2JsonValueArray = function(formId) {
	var sArr = $("#" + formId).serializeArray()
	console.log("sArr:" + JSON.stringify(sArr));
	var o = {};
	$.each(sArr, function(){
		if(o[this.name]) {
			if(!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || "");
		}else {
			o[this.name] = this.value || "";
		}
	});
	return o;
}

/**
 * 验证手机号
 */
jsFunc.isMobile = function(s) {
	var patrn=/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
	if (!patrn.exec(s)) return false
	return true
}

