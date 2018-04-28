<template>
  <div class="portalContent" style="overflow-x: hidden;color:#fff;">
    <component v-bind:is="currentView"></component>
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
    template: '<span @click="testClick">{{ message }}</span>',
    data: function () {
      return {
        message: 1231239
      }
    },
    methods: {
      testClick() {
        alert('123123');
      }
    }
  };
  var TESTA = {
    template: '<p>123123123</p>'
  };
  export default {
    data () {
        return {
          portalComponents: [POSTS],
          currentView: HOME,
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
          this.currentView = 'test';
      }
    },
    mounted() {
      Vue.component(
        'test',
        () => import('./test')
      )
    }
  }
</script>
