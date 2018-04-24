/*
create by YOU
*/
<template>
  <footer class="s-footer noPrint">
    <div class="s-footer-wrapper">
      <div class="s-footer-breadcrumb">
        <div class="s-footer-breadcrumb-des"><i class="iconfont icon-home"></i></div>
        <s-breadcrumb separator=">">
          <s-breadcrumb-item v-for="(item, index) in bread" :to="item.to" :key="index">{{item.title}}
          </s-breadcrumb-item>
          <!--<s-breadcrumb-item>事件中心</s-breadcrumb-item>-->
        </s-breadcrumb>
      </div>
      <div class="s-footer-nav">
        <ul>
          <li v-for="(item, index) in nav">
            <router-link :to="item.to">
              <s-tooltip placement="top">
                <div slot="content">{{ item.title }}</div>
                <i :class="`iconfont ${item.class}`"></i>
              </s-tooltip>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="s-footer-time">
        <div><i class="iconfont icon-clock"></i> {{ time }}</div>
      </div>
    </div>
    <div class="copyright">
      版权所有&copy;2018&nbsp;www.suninfo.com&nbsp;上海上讯信息技术股份有限公司
    </div>
  </footer>
</template>

<script type="text/babel">
  import getTime from '../../common/utils/getTime'
  export default {
    name: 'sFooter',
    components: {
    },
    data () {
      return {
        time: getTime()
      }
    },
    mounted () {
      let _self = this
      setInterval(function () {
        _self.time = getTime()
      }, 1000)
    },
    computed: {
      nav: function () {
        return this.$store.getters.menu
      },
      bread: function () {
        return this.$store.getters.bread
      }
    },
    methods: {}
  }
</script>
