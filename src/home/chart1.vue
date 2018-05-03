<template>
  <s-chart :chart="chart1"></s-chart>
</template>
<script>
  export default {
    data() {
      return {
        chart1: {
          name: 'chart1',
          type: 'gaugeChart',
          width: '100%',
          height: '300px',
          data: 50
        }
      }
    }
  }
</script>

