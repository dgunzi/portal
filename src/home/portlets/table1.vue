<template>
  <s-table
    :data="tableDataA"
    style="width: 100%">
    <s-table-column
      prop="date"
      label="日期"
      width="180">
    </s-table-column>
    <s-table-column
      prop="name"
      label="姓名"
      width="180">
    </s-table-column>
    <s-table-column
      prop="address"
      label="地址">
    </s-table-column>
  </s-table>
</template>
<script>
  export default {
    data() {
      return {
        tableDataA: [{
          date: '2017-01-01',
          name: '傻妞',
          address: '上海市普陀区金沙江路 1666 弄'
        }, {
          date: '2017-01-01',
          name: '傻妞',
          address: '上海市普陀区金沙江路 1666 弄'
        }, {
          date: '2017-01-01',
          name: '傻妞',
          address: '上海市普陀区金沙江路 1666 弄'
        }]
      }
    }
  }
</script>
