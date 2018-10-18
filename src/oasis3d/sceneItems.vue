/**
* Created by dgunzi on 2018/8/24.
 */

<template>
  <div class="sceneItemList">
    <div class="sceneItem" v-if="items.length > 0">
      有数据
    </div>
    <div v-if="items.length == 0">
      暂无数据
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        items: []
      }
    },
    components: {},
    methods: {},
    mounted() {
    }
  }
</script>
