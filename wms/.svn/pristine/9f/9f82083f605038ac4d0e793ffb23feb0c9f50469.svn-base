/**
* resize and upload
* author jinan
*/

;
(function($) {
	$.extend($.fn, {
		resizeAndUploadIMG : function(options) {
			var defaults = {
				bindId: undefined,
				fileSize: 5,          // 上传文件大小，单位MB
				exts: ['jpeg', 'png'], // 允许上传的图片格式
				width: 640,	           // 图片最大宽度
				height: 440,           // 图片最大高度
				quality: 0.8           // 压缩质量
			};
			var opts = $.extend(defaults, options);
			var lrzOpts = {
				width: opts.width,	           // 图片最大宽度
				height: opts.height,           // 图片最大高度
				quality: opts.quality          // 压缩质量
			};
			var selections = $(this);
			// 判断虚拟dom是否存在，存在则绑定触发事件
			if (opts.bindId && $('#' + opts.bindId).length > 0) {
				$('#' + opts.bindId).tap(function() {
					$(selections).click();
				});
			}
			$(selections).change(function() {
				var loading = null;
				var file = $(this).prop('files')[0];
				if (file) {
    		    	// 验证图片格式
    		        if (!isAllowType(opts.exts, file.type)) {
    		        	msg.info('图片格式不正确，支持jpg和png格式');
    		        	return;
    		        }
    		        // 验证图片大小
    		        if (file.size > opts.fileSize * 1024 * 1024) {
    		        	msg.info('请选择小于' + opts.fileSize + 'M的图片');
    		        	return;
    		        }
    		        // 图片选择正确，调用压缩和上传
    		        //loading = $.loading({content: '上传中...'});
    		        lrz(file, lrzOpts).then(function (rst) {
        	            // 把处理的好的图片给用户看看呗
        	            var img = new Image();
        	            img.src = rst.base64;

        	            img.onload = function () {
        	                if (opts.resizeCallback) {
        	                	opts.resizeCallback(img.src);
        	                }
        	            };
        	            return rst;
        	        }).then(function (rst) {
        	            // 这里该上传给后端啦
        	            $.ajax({
        	    	        type: "POST",
        	    	        url: ctx + '/uploadFileMsg/base64',
        	    	        data:{base64: rst.base64, fileName: rst.origin.name},
        	    	        dataType: "json",
        	    	        async : false,
        	    	        success: function(data){
        	    	        	if(data.success){
        	    	        		opts.uploadCallback(data.filePath);
        	    	        	}else{
        	    	        		alert("上传失败");
        	    	        	}
        	    	        	
        	    	        }
        	    	    });
        	            
        	         /*   ajax(url, {base64: rst.base64, fileName: rst.origin.name}, function(data){
        	            	loading.loading('hide');
        	            	if (opts.uploadCallback) {
        	                	opts.uploadCallback(data);
        	                }
        	            });*/
        	            
        	            return rst;
        	        }).always(function () {
        	            // 不管是成功失败，这里都会执行
        	        	loading.loading('hide');
        	        });
    		    }
			});
			
			function isAllowType(types, type) {
				var ext = type.split('/')[1];
				var flag = false;
				for (var i=0; i<types.length; i++) {
					if (ext == types[i]) {
						flag = true;
					}
				}
				return flag;
			}
		}
	});
})(Zepto);
