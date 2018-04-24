/**
* Created by alex on 2017/5/6.
 */

<template>
  <div>
    <s-header></s-header>
    <div class="index-body" id="index-body">
      <main v-if="homePageScroll">
        <slot></slot>
      </main>
      <main v-else>
        <s-scrollbar wrap-class="sysScrollHeight">
          <slot></slot>
        </s-scrollbar>
      </main>
    </div>
    <s-footer></s-footer>
  </div>
</template>

<script type="text/babel">
  import Header from '../header/Header'
  import Footer from '../footer/footer'
  import {homePageRouterNameList} from '@/common/utils/global';
  export default {
    name: 'sGrail',
    data() {
      return {
        originHeight: 0,
        homePageScroll: true
      }
    },
    components: {
      's-header': Header,
      's-footer': Footer
    },
    created() {
      this.openSelfScrollBar(this.$route.name)
    },
    methods: {
      openSelfScrollBar(name) {
        if (homePageRouterNameList.toString().indexOf(name) > -1) {
          this.homePageScroll = true
        } else {
          this.homePageScroll = false
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.openSelfScrollBar(to.name)
      }
    }
  }
</script>
