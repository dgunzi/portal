<template>
  <div style="height:100%; min-width: 1200px">
    <s-header></s-header>
    <div id="home-content">
      <component v-bind:is="currentView">
      </component>
      <s-button @click="changeView">切换</s-button>
    </div>
    <footer>
      <p class="footer-text">版权所有&copy;2018 www.suninfo.com 上海上讯信息技术股份有限公司</p>
    </footer>
  </div>
</template>

<script type="text/babel">
  import Header from '../components/header/Header';
  import {mapGetters} from 'vuex'
  var Home = {
    template: '<p>Welcome home!</p>'
  };
  var POSTS = {
    template: '<p>Hello World!</p>'
  };
  export default {
    name: 'HomePage',
    data() {
      return {
        currentView: Home
      }
    },
    components: {
      's-header': Header
    },
    computed: {
      ...mapGetters(['menu'])
    },
    methods: {
      goNext(url) {
        this.$router.push(url)
      },
      changeView() {
          this.currentView = POSTS;
      }
    }
  }
</script>
