/**
* Created by dgunzi on 2018/5/2.
 */

<template>
  <div>
    {{ message }}
    <s-button @click="changeAction">普通按钮</s-button>
  </div>
</template>
<script type="text/babel">
    export default {
        name: 'hello',
        componentName: 'world',
        data () {
            return {
                message: '你好！！'
            }
        },
        components: {},
        methods: {
          changeAction() {
              alert('123')
          }
        },
        mounted() {
        }
    }
</script>
