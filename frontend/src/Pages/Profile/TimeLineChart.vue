<template>
  <div class="time-chart-container">
    <line-chart :styles="chartStyles" :chart-data="datacollection" :options="chartOptions"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        height: 200,
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.fillData()
    },
    computed: {
      chartStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      }
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
    .time-chart-container {
        max-width: 600px;
        margin: 150px auto;
    }
</style>