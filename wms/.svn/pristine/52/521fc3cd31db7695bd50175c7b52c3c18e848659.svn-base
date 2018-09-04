$(function () {
	buildChart();
		                    
});

function buildChart() {
	var fontColor = '#fff'; 
	var date = new Date(); 
	var endTime = date.getFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
		
	var startTime = endTime;
		
    //var fontColor = '#555';
	$.ajax({
        type: "POST",
        url: ctx+"/materielStatistics/findMaterielByParams",
        data:{'endTime':endTime,'startTime':startTime},
        async : false,
        success: function(data){
        	
        	var legend_data = [];
        	var series_data = [];
        	if(data){
        		legend_data = data.name;
        		series_data = data.data;
        	}
        	
        	option = initChart(legend_data,series_data);
        		                    
        	
        	var myChart = echarts.init(document.getElementById('chart_1'));
        	// 为echarts对象加载数据 
        	myChart.setOption(option);
        }
    });
	
	
}

function initChart(legend_data,series_data){
	//app.title = '堆叠柱状图';

	option = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:legend_data //['2016','2015','2014','2013']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['1','2','3','4','5','6','7','8','9','10','11','12']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : series_data
	    /*[
	        {
	            name:'2016',
	            type:'bar',
	            data:[320, 332, 301, 334, 390, 330, 320,21,014,254,205,141]
	        },
	        {
	            name:'2015',
	            type:'bar',
	            data:[120, 132, 101, 134, 90, 230, 210,21,014,254,205,141]
	        },
	        {
	            name:'2014',
	            type:'bar',
	            data:[220, 182, 191, 234, 290, 330, 310,21,014,254,205,141]
	        },
	        {
	            name:'2013',
	            type:'bar',
	            data:[150, 232, 201, 154, 190, 330, 410,21,014,254,205,141]
	        }
	    ]*/
	};
	return option;
}