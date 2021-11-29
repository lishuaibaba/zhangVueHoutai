<template>
  <div>
    <div id="myChart" style="width: 96%; height: 500px"></div>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表

      myChart.setOption({
        title: {
          text: "近一周订单数量",
          textStyle:{
            color:"#000"
          }
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["近一周订单数量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
        },
        type: "value",
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
          max: 1000,
          min: 0,
        },
        series: [
          {
            name: "近一周订单数量",
            stack: "Total",
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            itemStyle:{
              normal:{
                color:"#BE2D28"
              }
            }
          },
        ],
      });
    },
  },
};
</script>
<style>
</style>