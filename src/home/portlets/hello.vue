/**
* Created by dgunzi on 2018/5/2.
 */

<template>
  <div style="height: 400px">
    <div>{{ message }}</div>
    <s-button @click="changeAction">添加</s-button>
    <s-button @click="changeOneComponents">修改内容</s-button>
    <s-button @click="deleteAction">删除新加列</s-button>
    <s-button @click="changeChildComponments">修改子布局内容</s-button>
    <s-button @click="addChildLayout">添加子布局</s-button>
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
          },
          deleteAction() {
            this.$store.commit('removeLayout', {row: 2})
          },
          changeChildComponments() {
            this.$store.commit('changeChildPortlet', {row: 0, index: 0, cIndex: 1, content: 'test'})
          },
          addChildLayout() {
            let child = {
              id: 'l_8',
              size: [10, 14],
              height: '400'
            };
            this.$store.commit('changeOnePortlet', {row: 1, index: 2, content: child})
          }
        },
        mounted() {
        }
    }
</script>
