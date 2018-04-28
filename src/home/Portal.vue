<template>
  <div class="portalContent" style="overflow-x: hidden;color:#fff;">
    <component v-bind:is="portalComponents[0]"></component>
    <component v-bind:is="portalComponents[1]"></component>
    <s-button @click="changeView">切换</s-button>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  // import $axios from '@/plugins/ajax'
  var HOME = {
    name: 'home',
    template: '<p>载入中...</p>'
  };
  var POSTS = {
    template: '<span @click="testClick">{{ message }}</span>'
  };
  var TESTA = {
    template: '<p>123123123</p>'
  };
  export default {
    data () {
        return {
          portalComponents: [HOME, HOME],
          layoutData: [
            {
              type: 'layout',
              size: '12,12',
              height: '885',
              data1: 1111,
              content: [
                {
                  type: 'layout',
                  size: '12,12',
                  height: '400',
                  content: [
                    {
                        type: 'componment',
                        name: POSTS
                    }
                  ]
                },
                {
                  type: 'component',
                  name: HOME
                }
              ]
            },
            {
              type: 'layout',
              size: '8,8,8',
              content: [
                {
                  type: 'compoment',
                  name: TESTA
                }
              ]
            }
          ]
        }
    },
    components: {

    },
    methods: {
      getComponment() {
        /* $axios.get('./getPortalCompnments').then((res) => {
          this.portalComponents = res.data
        }); */
      },
      changeView() {
        this.$set(this.portalComponents, 0, 'test')
        this.$set(this.portalComponents, 1, 'info')
      }
    },
    mounted() {
      let componentsAry = ['test', 'info'];
      for (let i = 0; i < componentsAry.length; i++) {
        Vue.component(
          componentsAry[i],
          () => import('./' + componentsAry[i])
        )
      }
      this.changeView();
    }
  }
</script>
