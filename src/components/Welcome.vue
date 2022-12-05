<template>
  <div>
    <el-row :gutter="12" class="box">
      <el-col :span="6">
        <el-card shadow="always" class="header">
          <el-row>
            <span style="color: #949494">总销售额</span>
          </el-row>
          <el-row class="digital">
            <span style="font-size: 26px">¥ 126,560</span>
            <div style="height: 15px"></div>
          </el-row>
          <el-row>
            <el-col :span="8" class="ratio">
              <span style="font-size: 12px"> 周同比 12%<img src="../assets/imgs/up.png" alt="" /> </span>
            </el-col>
            <el-col :span="8" class="ratio">
              <span style="font-size: 12px"> 日同比 11%<img src="../assets/imgs/down.png" alt="" /> </span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <span style="font-size: 14px">日销售额：￥12,423</span>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="header">
          <el-row>
            <span style="color: #949494">访问量</span>
          </el-row>
          <el-row class="digital">
            <span style="font-size: 26px">8,846</span>
            <div id="main1" style="width: 250px; height: 25px"></div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <span style="font-size: 14px">日访问量：1,234</span>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="header">
          <el-row>
            <span style="color: #949494">支付笔数</span>
            <div id="main2" style="width: 250px; height: 80px"></div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <span style="font-size: 14px">转化率60%</span>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="header">
          <el-row>
            <span style="color: #949494">运营活动效果</span>
          </el-row>
          <el-row class="digital">
            <span style="font-size: 26px">78%</span>
            <div id="main3" style="width: 250px; height: 25px"></div>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="8" class="ratio">
              <span style="font-size: 12px"> 周同比 12%<img src="../assets/imgs/up.png" alt="" /> </span>
            </el-col>
            <el-col :span="8" class="ratio">
              <span style="font-size: 12px"> 日同比 11%<img src="../assets/imgs/down.png" alt="" /> </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="gap">
      <el-card>
        <div id="main4" style="width: 1000px; height: 400px; margin: 0 auto"></div>
      </el-card>
    </el-row>
    <el-row class="gap" :gutter="12">
      <el-col :span="8">
        <el-card>
          <div id="main5" style="width: 350px; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :span="6">
          <div id="main6" style="width: 350px; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :span="6">
          <div id="main7" style="width: 350px; height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="gap" :gutter="12">
      <el-col :span="16">
        <el-calendar v-model="value"> </el-calendar>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-row>Recently Added Products</el-row>
          <el-divider></el-divider>
          <el-row v-for="(item, index) in shopList" :key="item.id" class="gap">
            <el-col :span="4">
              <div class="productImg"></div>
            </el-col>
            <el-col :span="20">
              <el-row>
                <span style="font-weight: 700">{{ item.title }}</span>
              </el-row>
              <el-row class="def2">
                <span style="font-size: 12px">{{ item.text }}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Welcome',
  created () {

  },
  data () {
    return {
      shopList: [
        {
          id: '1',
          title: 'Samsung TV',
          text: 'Samsung 32" 1080p 60Hz LED Smart HDTV.'
        },
        {
          id: '2',
          title: 'Bicycle',
          text: `26" Mongoose Dolomite Men's 7-speed, Navy Blue.`
        },
        {
          id: '3',
          title: 'Xbox One',
          text: 'Xbox One Console Bundle with Halo Master Chief College Student.'
        },
        {
          id: '4',
          title: 'PlayStation 4',
          text: 'PlayStation 4 500GB Console (PS4).'
        },
      ],
      option1: {
        xAxis: {
          show: false,
          type: 'category',
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        grid: {
          x: 20,
          y: 10,
          x2: 5,
          y2: 60,
          borderWidth: 1,
          bottom: 10
        },
        color: '#caaef0',
        series: [
          {
            data: [6, 20, 2, 8, 0],
            type: 'line',
            smooth: true
          }
        ]
      },
      option2: {
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        grid: {
          x: 25,
          y: 18,
          x2: 5,
          y2: 60,
          borderWidth: 1,
          bottom: 10,
        },
        series: [
          {
            data: [10, 20, 15, 8, 7, 11, 13],
            type: 'bar'
          }
        ]
      },
      option3: {
        grid: {
          left: "10",
          top: "20",
          right: "0",
          bottom: "10",
          containLabel: true
        },

        xAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              color: "black",
              fontSize: 14,
              textStyle: {
                color: '#fff'
              }
            },
            max: 10, // 关键：设置y刻度最大值，相当于设置总体行高
            inverse: true
          },
          {
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              color: "black",
              fontSize: 14,
              textStyle: {
                color: '#fff'
              }
            },
            max: 10, // 关键：设置y刻度最大值，相当于设置总体行高
            inverse: true
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            barWidth: 19,
            data: [80],
            barCategoryGap: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#22b6ed'
                }, {
                  offset: 1,
                  color: '#3fE279'
                }]),
              }
            },
            zlevel: 1

          }, {
            name: "进度条背景",
            type: "bar",
            barGap: "-100%",
            barWidth: 19,
            data: [100],
            color: "#2e5384",
            itemStyle: {
              normal: {
                barBorderRadius: 10
              }
            },
          }
        ]
      },
      option4: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Profit', 'Expenses', 'Income']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        series: [
          {
            name: 'Profit',
            type: 'bar',
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: 'Income',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: 'Expenses',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left'
            },
            emphasis: {
              focus: 'series'
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      },
      option5: {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [10, 50],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 4
            },
            data: [
              { value: 10, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
            ]
          }
        ]
      },
      option6: {
        grid: { // 控制图的大小，调整下面这些值就可以，
          x: 40,
          x2: 100,
          y2: 10// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
        },
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      },
      option7: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Rainfall', 'Evaporation']
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Rainfall',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: 'Evaporation',
            type: 'bar',
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ],
            markPoint: {
              data: [
                { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      },
    }
  },
  mounted () {
    var myChart1 = echarts.init(document.getElementById('main1'));
    var myChart2 = echarts.init(document.getElementById('main2'));
    var myChart3 = echarts.init(document.getElementById('main3'));
    var myChart4 = echarts.init(document.getElementById('main4'));
    var myChart5 = echarts.init(document.getElementById('main5'));
    var myChart6 = echarts.init(document.getElementById('main6'));
    var myChart7 = echarts.init(document.getElementById('main7'));
    myChart1.setOption(this.option1);
    myChart2.setOption(this.option2);
    myChart3.setOption(this.option3);
    myChart4.setOption(this.option4);
    myChart5.setOption(this.option5);
    myChart6.setOption(this.option6);
    myChart7.setOption(this.option7);
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 180px;
}
.digital {
  margin-top: 20px;
}
.ratio {
  height: 12px;
  display: flex;
  img {
    width: 10px;
    height: 10px;
    align-items: baseline;
    margin-left: 3px;
  }
}

.el-divider--horizontal {
  margin: 10px 0;
}

.gap {
  margin-top: 30px;
}
.def1 {
  margin: 15px 0 !important;
}

.def2 {
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.productImg {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  background-color: #d2d6de;
}
</style>
