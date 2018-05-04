/**
* Created by dgunzi on 2018/5/2.
 */

<template>
  <div>
    {{ message }}
    <s-button @click="changeAction">添加测试</s-button>
    <s-button @click="changeOneComponents">修改测试</s-button>
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
            let layout = {
              size: [8, 8, 8],
              height: '400',
              content: ['', '', '']
            };
            this.$store.commit('addLayout', layout)
           },
           changeOneComponents() {
             this.$store.commit('changeOnePortlet', {row: 2, index: 2, content: 'test'})
           }
        },
        mounted() {
        }
    }
</script>
