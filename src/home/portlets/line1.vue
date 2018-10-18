<template>
  <s-chart :chart="chart2"></s-chart>
</template>
<script>
  export default {
    data() {
      return {
        chart2: {
          name: 'chart2',
          type: 'lineChart',
          width: '100%',
          height: '485px',
          itemName: '开放数量',
          data: [
            {name: '1:00', value: 1},
            {name: '2:00', value: 555},
            {name: '3:00', value: 278},
            {name: '4:00', value: '-'},
            {name: '5:00', value: 985},
            {name: '6:00', value: 78},
            {name: '7:00', value: 412},
            {name: '8:00', value: 125},
            {name: '9:00', value: 1452},
            {name: '10:00', value: 759},
            {name: '11:00', value: 245},
            {name: '12:00', value: 100}
          ]
        }
      }
    }
  }
</script>
