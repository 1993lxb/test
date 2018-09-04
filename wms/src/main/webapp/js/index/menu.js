/**
 * 
 */
$(function () {
	initLeftMenu();
});

function initLeftMenu(){
	$.ajax({
        type: "POST",
        url: ctx+"/menu/leftTree",
        data:{"_search_EQ_deleteState":"0"},
        async : false,
        success: function(data){
        	var html = '<ul class="menu">';
       		for(var i=0;i<data.length;i++){
       			html+='<li>';
       			
       			if(data[i].children&&data[i].children.length>0){
       				html+='<a>';
       				html+=data[i].menu.menuName;
       				html+='</a>';
       				html+= createChildrenHTML(data[i].children);
       			}else{
       				html+='<a href="javascript:void(0);" onclick="javascript:openMenu(this);" id="'+data[i].menu.id+'">';
       				html+=data[i].menu.menuName;
       				html+='</a>';
       			}
       			
       			html+='</li>';
       		}
       		html+='</ul>';
       		$('#initLeftMenu').html(html);
       		
        }
    });
}

function createChildrenHTML(data){
	var html = '<ul class="submenu">';
		for(var i=0;i<data.length;i++){
			html+='<li>';
			
			if(data[i].children&&data[i].children.length>0){
				html+='<a>';
				html+=data[i].menu.menuName;
				html+='</a>';
				html+= createChildrenHTML(data[i].children);
			}else{
				html+='<a href="javascript:void(0);" onclick="javascript:openMenu(this);" id="'+data[i].menu.id+'">';
				html+=data[i].menu.menuName;
				html+='</a>';
			}
			
			html+='</li>';
		}
		html+='</ul>';
		return html;
}

function openMenu(obj){
	var id=$(obj).attr("id");
	$.post("openMenu",{menuId:id},function(data){
		$(".menu li").removeClass('active');
		$(obj).parent("li").addClass('active');
		$("#page-content").html('');
		$("#page-content").html(data);
		var uri=window.location.pathname;
		if(history.pushState){	
			var newTitle=""; // 你自定义的Ajax加载函数，例如它会返回newTitle
			var state=({url: uri, title: newTitle});
			window.history.pushState(state, newTitle, uri);
		}else{ 
			window.location.href="#!"+~fakeURI;        		
		} 
			// 如果不支持，使用旧的解决方案
		return false;
	});
}

function openMenu2(id,params){
	$.post("openMenu",{menuId:id,params:params},function(data){
		$("#page-content").html('');
		$("#page-content").html(data);
		var uri=window.location.pathname;
		if(history.pushState){	
			var newTitle=""; // 你自定义的Ajax加载函数，例如它会返回newTitle
			var state=({url: uri, title: newTitle});
			window.history.pushState(state, newTitle, uri);
		}else{ 
			window.location.href="#!"+~fakeURI;        		
		} 
			// 如果不支持，使用旧的解决方案
		return false;
	});
}