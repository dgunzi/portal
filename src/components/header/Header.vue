/**
* Created by alex on 2017/4/26.
*/

<template>
  <header id="headBar" class="noPrint">
    <s-row type="flex" justify="between" align="middle" class="header-bg">
      <s-col :span="6" class="left-info">
        <div class="logo-icon" title="InforCube智能运维安全管理平台（SiCAP）" @click="goHome"></div>
      </s-col>
      <s-col :span="8" class="right-info">
        <s-row type="flex" justify="center" align="middle" :gutter="16">
          <s-col class="user-info">
            <s-popover
              ref="popover"
              placement="bottom"
              width="50"
              trigger="click">
              <s-row>
                <s-col @click.native="setTheme('dark')" class="selectBlock" style="background:#02325e">
                  <i v-if="blackShow" class="icon iconfont icon-correct-bold"></i>
                </s-col>
                <s-col @click.native="setTheme('chalk')" class="selectBlock top" style="background:#2095fe">
                  <i v-if="blueShow" class="icon iconfont icon-correct-bold"></i>
                </s-col>
              </s-row>
            </s-popover>
            <s-col v-popover:popover>
              选择主题<i class="icon iconfont icon-bottom" style="font-size: 14px;margin-left: 2px"></i>
            </s-col>
          </s-col>
          <s-col class="user-info-icon" @click.native="showDialog">
            <i class="iconfont icon-user"></i>
          </s-col>
          <s-col class="user-info" @click.native="showDialog">
            您好：{{userName}}
          </s-col>
          <s-col class="head-handler-btns">
            <!--<span><a><i class="iconfont icon-help"></i></a></span>
            <span><a><i class="iconfont icon-set"></i></a></span>-->
            <span><a><i @click="logoutDialog = true" class="iconfont icon-quit-s" title="退出登录"></i></a></span>
          </s-col>
        </s-row>
      </s-col>
    </s-row>
    <s-dialog
      v-model="userInfoModal"
      v-if="userInfoModal"
      title="用户信息"
      top="55px"
      width="750px"
      ref="infoDialog">
      <s-scrollbar wrap-class="scrollheight">
        <s-tab :animated="false" ref="infoTabs">
          <s-tab-pane label="个人信息">
          </s-tab-pane>
          <s-tab-pane :vif="isShow" label="修改密码">
          </s-tab-pane>
          <s-tab-pane label="修改个人信息">
          </s-tab-pane>
        </s-tab>
      </s-scrollbar>
    </s-dialog>
    <s-dialog
      v-model="logoutDialog"
      width="400px"
      title="退出登录">
      确定退出当前用户？
      <template slot="footer" class="dialog-footer">
      <s-button @click="logout">确定</s-button>
      <s-button @click="logoutDialog = false">取消</s-button>
    </template>
    </s-dialog>

  </header>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'
  import {mapGetters} from 'vuex'

  export default {
    name: 'HeaderBar',
    components: {
    },
    data () {
      return {
        userInfoArr: [],
        userInfoModal: false,
        logoutDialog: false,
        isShow: false,
        blackShow: false,
        blueShow: false
      }
    },
    computed: {
      ...mapGetters(['userName'])
    },
    mounted() {
      this.$nextTick(() => {
        let mainTheme = localStorage.getItem('theme') || 'dark'
        mainTheme === 'dark' ? this.blackShow = true : this.blueShow = true
      })
    },
    methods: {
      showDialog () {
        $axios.post(`/iamUserInfo/getUserInfoDetail/${this.userName}`).then((res) => {
          this.userInfoArr = res.data
          this.userInfoModal = true
          this.$nextTick(() => {

          })
        }).then(() => {
          $axios.get('/iamUserInfo/isPwdOrGoogleAuthLoginType').then(response => {
            this.isShow = response.data;
          });
        })
      },
      logout () {
        let _self = this
        this.$store.dispatch('logout').then(function (data) {
          if (data) {
            _self.$message('退出成功')
            _self.$nextTick(function () {
              location.reload(location.origin + '/#/login')
            })
          } else {
            _self.$message('退出失败')
          }
        })
      },
      setTheme(val) {
        this.blueShow = false
        this.blackShow = false
        val === 'chalk' ? this.blueShow = true : this.blackShow = true
        this.$nextTick(() => {
          let mainTheme = val
          this.changePath(mainTheme, 'sunflower-theme')
          this.changePath(mainTheme, 'user-theme')
          localStorage.setItem('theme', mainTheme);
          if (typeof window.TopologyGraph !== 'undefined' && typeof window.TopologyGraph.getGraph !== 'undefined') {
            let labelColor = mainTheme === 'dark' ? 'ffffff' : '667480';
            var sheet = window.TopologyGraph.getGraph().getStylesheet();
            sheet.styles.flowrate.fontColor = '#' + labelColor;
            sheet.styles.image.fontColor = '#' + labelColor;
            window.TopologyGraph.getGraph().refresh();
          }
          window.location.reload();
        })
      },
      goHome() {
        location.reload(location.origin + '/#/HomePage')
      },
      changePath(str, name) {
        let selector = `#${name}`
        let themeLink = document.querySelector(selector);
        let path = themeLink.getAttribute('href');
        let targetStr = path.substring(path.lastIndexOf('\-') + 1, path.lastIndexOf('\.'));
        let newStr = path.replace(targetStr, str)
        themeLink.setAttribute('href', newStr);
      }
    }
  }
</script>
