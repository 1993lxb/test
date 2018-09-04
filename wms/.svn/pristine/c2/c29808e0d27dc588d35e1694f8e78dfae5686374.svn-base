(function($){
	function R4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	
	function createId() {
		return (R4() + R4() + "-" + R4() + "-" + R4() + "-" + R4() + "-" + R4() + R4() + R4());
	};
	
	function createUploadIframe(frameId,uri){
		var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';

		
		if(window.ActiveXObject) {
			//修复IE9的BUG
			if(BrowserDetect.version=="9") {
				io = document.createElement('iframe');
				io.id = frameId;
				io.name = frameId;
			}else if(BrowserDetect.version=="6"||BrowserDetect.version=="7"||BrowserDetect.version=="8"){
				var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
				if(typeof uri == 'boolean'){
					io.src = 'javascript:false';
				}else if(typeof uri == 'string'){
					io.src = uri;
				}
			}
		}
		iframeHtml += ' />';
		$(iframeHtml).appendTo(document.body);
		return $('#' + frameId).get(0);
	};
	
	function createUploadForm(formId,files,data) {
		var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
		if (data) {
			for (var i in data) {
				$('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}
		}
		
		for(var i=0;i<files.length;i++){
			var ele = files[i];
			var oldElement = (typeof ele == "string") ? $('#' + ele) : ele;
			var fileId = 'jUploadFile-' + createId();
			var newElement = $(oldElement).clone();
			$(oldElement).attr('id', fileId);
			$(oldElement).before(newElement);
			$(oldElement).appendTo(form);
		}

		//set attributes
		$(form).css('position', 'absolute');
		$(form).css('top', '-1200px');
		$(form).css('left', '-1200px');
		$(form).appendTo('body');
		return form;
	};
	
	//修复Jquery的新版本没有这个方法的问题
	function handleError(s,xhr,status,e) {
		if (s.error){
			s.error.call(s.context || s,xhr,status,e);
		}
		if (s.global){
			(s.context ? $(s.context) : $.event).trigger("ajaxError",[xhr, s, e]);
		}
	};


	function uploadHttpData(r, type) {
		var data = !type;
		data = type == "xml" || data ? r.responseXML : r.responseText;
		
		if (type == "script") $.globalEval(data);
		
		// Get the JavaScript object, if JSON is used.
		if (type == "json") {
			//修复回调JSON的问题
			var data = r.responseText;
			if (data.match(/^<pre/i)) {
				data = data.substring(data.indexOf('>') + 1, data.length - 6);
            }
			eval("data=" + data);
		}
		if (type == "html") $("<div>").html(data).evalScripts();
		return data;
	};
	
	
	$.ajaxFileUpload = function (s){
		s = $.extend({},$.ajaxSettings,s);
		var id = createId();
		
		var frameId = 'jUploadFrame-' + id;
		var formId = 'jUploadForm-' + id;
		
		var form = createUploadForm(formId, s.files,(typeof(s.data) == 'undefined' ? false : s.data));
		var io = createUploadIframe(frameId, s.secureuri);
		// Watch for a new set of requests
		if (s.global && !$.active++) $.event.trigger("ajaxStart");
		
		var requestDone = false;
		// Create the request object
		var xml = {};
		if (s.global) $.event.trigger("ajaxSend", [xml,s]);
		// Wait for a response to come back
		
		
		var uploadCallback = function(isTimeout) {
			var io = document.getElementById(frameId);
			
			try {
				var doc = io.contentWindow ? io.contentWindow.document : io.contentDocument.document;
				xml.responseText = doc.body.innerHTML;
				xml.responseXML = doc.XMLDocument;
			} catch (e) {
				handleError(s, xml, null, e);
			}
			
			if (xml || isTimeout == "timeout") {
				requestDone = true;
				var status;
				try {
					status = (isTimeout != "timeout") ? "success" : "error";
					// Make sure that the request was successful or notmodified
					
					if (status != "error") {
						// process the data (runs the xml through httpData regardless of callback)
						var data = uploadHttpData(xml,s.dataType);
						
						// If a local callback was specified, fire it and pass it the data
						if (s.success) s.success(data, status);
						// Fire the global callback
						if (s.global) $.event.trigger("ajaxSuccess", [xml, s]);
					} else
						handleError(s, xml, status);
				} catch (e) {
					status = "error";
					handleError(s, xml, status, e);
				}

				// The request was completed
				if (s.global) $.event.trigger("ajaxComplete", [xml, s]);

				// Handle the global AJAX counter
				if (s.global && !--$.active) $.event.trigger("ajaxStop");

				// Process result
				if (s.complete) s.complete(xml, status);

				$(io).unbind();

				setTimeout(function () {
					try {
						$(io).remove();
						$(form).remove();
					} catch (e) {
						handleError(s, xml, null, e);
					}
				}, 100);
				xml = null;
			}
		};
		
		
		if (s.timeout > 0) {
			setTimeout(function () {
				// Check to see if the request is still happening
				if (!requestDone) uploadCallback("timeout");
			}, s.timeout);
		};

		try {
			var form = $('#' + formId);
			$(form).attr('action', s.url);
			$(form).attr('method', 'post');
			$(form).attr('target', frameId);

			
			if (form.encoding) {
				$(form).attr('encoding', 'multipart/form-data');
			} else {
				$(form).attr('enctype', 'multipart/form-data');
			}
			$(form).submit();
		} catch (e) {
			handleError(s, xml, null, e);
		}
		$('#' + frameId).load(uploadCallback);
		return {
			abort : function(){}
		};
	};
	
})(jQuery);
/**
 * 判断浏览器类型、版本
 * 用法：	BrowserDetect.browser
 * 			BrowserDetect.version
 */
var BrowserDetect = 
{
    init: function () 
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||  this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) 
    {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" },
    ]

};
BrowserDetect.init();


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
function form2Json(formId){
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
					sb.append("\""+name+"\":\""+element.value.replace(/\r\n/ig,"")+"\"");
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
	  