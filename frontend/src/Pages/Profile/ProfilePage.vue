<template>
    <div>
        <hr>
        <h1>Profile page</h1>
        <p>{{getProfile}}</p>
        <br>
        <percent-tcc :historyArr='[{id:3, tcc:23,ccc:5}, {id:2, tcc:305,ccc:5}, {id:1, tcc:40,ccc:5}]' />
        
        <g-time-line-chart :chartdata="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PercentTcc from './PercentTcc';

import TimeLineChart from './TimeLineChart';

export default {
    data: () => ({
      chartdata: {
        datacollection: {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20]
            }
          ]
        }
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }),

    created() {
        this.$store.dispatch('actionGetProfile');
    },
    computed: {
        ...mapGetters([
            'getProfile'
        ])
    },
    components: {
        'percent-tcc': PercentTcc,
        'g-time-line-chart': TimeLineChart
    }
}
</script>