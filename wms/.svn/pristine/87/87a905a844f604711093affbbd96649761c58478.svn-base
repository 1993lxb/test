$(function() {
    $(".checkbox input[type=checkbox]").on('click', function(event) {
        if ($(this).prop('checked')) {
            $(this).parent().parent().addClass('checked');
        } else {
            $(this).parent().parent().removeClass('checked');
        }

    });

    loadMenu();

    $(".sidebar .menu>li").on('click', function(event) { 
        loadMenu($(this));
    })
})

function loadMenu(ele) {
    var submenuLen = $(".sidebar .menu>li").find('.submenu').length;
    $(".sidebar .menu>li>a").prepend('<b class="menuicon glyphicon glyphicon-plus-sign"></b>');
    if (submenuLen > 0) {
        $(".sidebar .menu>li").find('.submenu').prev('a').append('<b class="arrow glyphicon glyphicon-chevron-right"></b>');
    }
    if ($(".sidebar .menu>li").hasClass('open')) {
        $(".sidebar .menu>.open").find('.menuicon').addClass('glyphicon-minus-sign');
        $(".sidebar .menu>.open").find('.arrow').addClass('glyphicon-chevron-down');
        $(".sidebar .menu>.open").find('.submenu').show();
    }
    if (ele != null) {
        $(ele).addClass('open').siblings().removeClass('open');
        $(ele).find('.menuicon').addClass('glyphicon-minus-sign');
        $(ele).find('.arrow').addClass('glyphicon-chevron-down');
        $(ele).find('.submenu').slideDown();

        $(ele).siblings().find('.submenu').slideUp();
        $(ele).siblings().find('.menuicon').removeClass('glyphicon-minus-sign');
        $(ele).siblings().find('.arrow').removeClass('glyphicon-chevron-down');
    }
}

Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	} 
	} 
	return format; 
	} 

