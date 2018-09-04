$(function () {
	buildChart1();
		                    
});

function buildChart1() {
	var fontColor = '#fff'; 
    //var fontColor = '#555';
	$.ajax({
        type: "POST",
        url: ctx+"/inventoryStatistics/searchDate",
        data:{},
        async : false,
        success: function(data){
        	
        	var legend_data = [];
        	var toolbox_data = [];
        	if(data){
        		legend_data = data.name;
        		toolbox_data = data.data;
        	}
        	var series_data = [];
        	
        	option = {
        		    title : {
        		        text: '库存统计',
        		        subtext: '',
        		        x:'center'
        		    },
        		    tooltip : {
        		        trigger: 'item',
        		        formatter: "{a} <br/>{b} : {c} ({d}%)"
        		    },
        		    legend: {
        		        orient : 'vertical',
        		        x : 'left',
        		        data:legend_data//['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        		    },
        		    toolbox: {
        		        show : true,
        		        feature : {
        		            mark : {show: true},
        		            dataView : {show: true, readOnly: false},
        		            magicType : {
        		                show: true, 
        		                type: ['pie', 'funnel'],
        		                option: {
        		                    funnel: {
        		                        x: '25%',
        		                        width: '50%',
        		                        funnelAlign: 'left'
        		                       // max: 1548
        		                    }
        		                }
        		            },
        		            restore : {show: true},
        		            saveAsImage : {show: true}
        		        }
        		    },
        		    calculable : true,
        		    series : [
        		        {
        		            name:'物料名称',
        		            type:'pie',
        		            radius : '55%',
        		            center: ['50%', '60%'],
        		            data:toolbox_data
//        		            [
//        		                {value:335, name:'直接访问'},
//        		                {value:310, name:'邮件营销'},
//        		                {value:234, name:'联盟广告'},
//        		                {value:135, name:'视频广告'},
//        		                {value:1548, name:'搜索引擎'}
//        		            ]
        		        }
        		    ]
        		};
        		                    
        	
        	var myChart = echarts.init(document.getElementById('chart_1'));
        	// 为echarts对象加载数据 
        	myChart.setOption(option);
        }
    });
	
	
}