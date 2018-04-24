<template>
  <section id="login-page">
    <div class="all_bg">
      <div class="login_wrapper">
        <div class="left_con">
          <div class="logo"></div>
          <div class="notice_con">
            <h4>— 系统公告 —</h4>
            <s-carousel ref="noticeCarousel" class="notice_con_inner"
                        :initial-index="0"
                        :autoplay="false"
                        arrow="never"
                        indicator-position="none"
                        @change="carouselChange">
              <s-carousel-item v-for="(notice,index) in notices" :key="index">
                <s-scrollbar wrap-class="dialogScrollHeight">
                  <p>{{ notice.content }}</p>
                </s-scrollbar>
              </s-carousel-item>
            </s-carousel>
            <div class="page">
              <span>{{ currentNotice }}/{{ notices.length }}</span>
              <div class="page_turn">
                <a class="page_left" @click="noticePrev" href="javascript:;"></a>
                <a class="page_right" @click="noticeNext" href="javascript:;"></a>
              </div>
              <div class="clr"></div>
            </div>
          </div>
        </div>
        <div class="right_con">
          <p class="wel_word">欢迎登录:</p>
          <s-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" labs-position="left" labs-width="0px"
                  class="demo-ruleForm login-container light-login-form">
            <s-form-item prop="userLoginName" class="inp_group username">
              <label></label>
              <s-input @keyup.enter.native="handleSubmit" id="username" type="text" v-model="ruleForm2.userLoginName"
                       @blur="getLoginType" auto-complete="off" placeholder="账号" autofocus></s-input>
            </s-form-item>
            <s-form-item prop="userPasswd" class="inp_group password">
              <label></label>
              <s-input @keyup.enter.native="handleSubmit" id="password" type="password" v-model="ruleForm2.userPasswd"
                       auto-complete="off" :placeholder="pwdName" :readonly="pwdNameReadonly"></s-input>
            </s-form-item>
            <s-form-item v-if="pwdNameTwoShow" prop="userPasswdTwo" class="inp_group password">
              <label></label>
              <s-input @keyup.enter.native="handleSubmit" id="password" type="password"
                       v-model="ruleForm2.userPasswdTwo" auto-complete="off" :placeholder="pwdNameTwo" :readonly="pwdNameTwoReadonly"></s-input>
            </s-form-item>
            <s-form-item class="inp_group method">
              <label style="margin-right: 5px"></label>
              <div id="login-div">{{loginTypeName}}</div>
            </s-form-item>
            <s-row style="height: 20px">
              <s-button :style="btnStyle" :disabled="sendDisable" v-if="securityCode" style="margin-top: 3px" @click.native.prevent="sendMsg">{{sendMsgBtnContent}}</s-button>
              <!--<s-button @click.native.prevent="handleReset2">重置</s-button>-->
            </s-row>
            <s-form-item>
              <s-button class="login_btn" @click.native.prevent="handleSubmit"
                        :loading="logining">登 录
              </s-button>
              <!--<s-button @click.native.prevent="handleReset2">重置</s-button>-->
            </s-form-item>
          </s-form>
        </div>
        <div class="clr"></div>
      </div>
      <footer>
        <p>版权所有&copy;2018 上海上讯信息技术股份有限公司</p>
        <p>Copyright&copy;2018 Shanghai Suninfo Information Technology Co., Ltd. All rights reserved</p>
      </footer>

      <s-dialog
        title="手机口令牌设置"
        width="850px"
        v-model="phoneTokenSetDialog"
        v-if="phoneTokenSetDialog">
        <phone-token-set
          :userData="userData"
          @closePhoneTokenSet="_closePhoneTokenSet">
        </phone-token-set>
      </s-dialog>
    </div>
  </section>
</template>

<script>
  import $axios from '@/plugins/ajax'
  import phoneTokenSet from './PhoneTokenSet.vue'
  import base64 from '@/common/utils/base64'
  import { cloneDeep } from 'lodash'
  export default {
    data () {
      let checkUserPasswd = (rule, value, callback) => {
        if (!this.pwdNameReadonly) {
          if (!value) callback(new Error('请输入口令'))
          else callback()
        } else {
          callback()
        }
      }

      let checkUserPasswdTwo = (rule, value, callback) => {
        if (!this.pwdNameTwoReadonly) {
          if (!value) callback(new Error('请输入口令'))
          else callback()
        } else {
          callback()
        }
      }
      return {
        logining: false,
        ruleForm2: {
          userLoginName: '',
          userPasswd: '',
          userPasswdTwo: '',
          loginTypeUuid: ''
        },
        loginTypeName: '--',
        rules2: {
          userLoginName: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          userPasswd: [
            {validator: checkUserPasswd, trigger: 'blur'}
          ],
          userPasswdTwo: [
            {validator: checkUserPasswdTwo, trigger: 'blur'}
          ]
        },
        checked: true,
        pwdNameTwoShow: false,
        pwdName: '口令',
        pwdNameTwo: '',
        pwdNameReadonly: false,
        pwdNameTwoReadonly: false,
        notices: [],
        currentNotice: 0,
        phoneTokenSetDialog: false,          // 手机口令牌设置弹框
        userData: {},
        securityCode: false,
        cellPhone: '',
        sendDisable: false,
        sendMsgBtnContent: '获取验证码'
      };
    },
    components: {
      phoneTokenSet
    },
    computed: {
      btnStyle() {
        if (this.sendDisable) {
          return 'color:#ff4949;'
        }
      }
    },
    created () {
      let _self = this
      $axios.post('/systemmanager/otherConfig/sysAnnouncement/getOutAnnounce').then(function ({data}) {
        _self.notices = data
      })
    },
    methods: {
      sendContent() {
        let vm = this
        for (let i = 0; i <= 60; i++) {
          window.setTimeout(function () {
            vm.sendMsgBtnContent = (60 - i) + '秒后重新发送'
            if (i === 60) {
              vm.sendDisable = false
              vm.sendMsgBtnContent = '再次发送'
            }
          }, i * 1000);
        }
      },
      sendMsg() {
        $axios.get(`/login/sendMessageAuthCode/${this.cellPhone}`).then(res => {
          this.$message({
            message: res.data.error_reason || res.data.success
          })
          this.sendDisable = true
          this.sendContent()
        })
      },
      getLoginType() {
        this.ruleForm2.userPasswd = ''
        this.ruleForm2.userPasswdTwo = ''
        if (this.ruleForm2.userLoginName === '') {
          return false
        }
        $axios.get(`/login/checkLoginType/${this.ruleForm2.userLoginName}`).then(res => {
          this.pwdName = '口令'
          this.pwdNameTwoShow = false
          this.securityCode = false
          this.loginTypeName = res.data.loginType
          this.ruleForm2.loginTypeUuid = res.data.loginTypeUuid
          if (res.data.userStatus === '5' && res.data.loginType === '手机口令牌认证') {
            this.pwdName = '管理口令'
          }
          // 判断双因素认证
          if (res.data.hasOwnProperty('firstLoginType')) {
            this.pwdNameTwoShow = true
            this.pwdName = res.data.firstLoginType
            this.pwdNameTwo = res.data.secondLoginType
            // 双因素认证 禁用设置
            if (res.data.firstLoginTypeUuid === 'tsyslogininit0000000000000000012') {
              this.pwdNameReadonly = true
            }
            if (res.data.secondLoginTypeUuid === 'tsyslogininit0000000000000000012') {
              this.pwdNameTwoReadonly = true
            }
          }
          if (res.data.loginTypeUuid === 'tsyslogininit0000000000000000008') {
            this.securityCode = true
            this.cellPhone = res.data.userCellphone
          } else if (res.data.loginTypeUuid === 'tsyslogininit0000000000000000012') {
            // 证书认证 禁用设置
            this.pwdName = res.data.certResult
            this.pwdNameReadonly = true
          } else {
            this.pwdNameReadonly = false
          }
        })
      },
      handleReset2 () {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit (ev) {
        let _self = this
        let encrypt = new base64()
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            const ruleForm2 = _self.ruleForm2
            let loginForm = cloneDeep(ruleForm2)
            loginForm.userPasswd === '' ? loginForm.userPasswd = '' : loginForm.userPasswd = encrypt.encode(loginForm.userPasswd)
            loginForm.userPasswdTwo === '' ? loginForm.userPasswdTwo = '' : loginForm.userPasswdTwo = encrypt.encode(loginForm.userPasswdTwo)
            _self.logining = true
            _self.$store.dispatch('login', loginForm).then(function (data) {
              if (_self.$store.state.phoneTokenData) {
                _self.userData = data
                _self.phoneTokenSetDialog = true
              } else {
                _self.$router.push('/');
              }
            }).catch(function (data) {
              if (data.hasOwnProperty('jinproxy')) {
                $axios.post('/login/restartJniproxy').then(res => {
                  console.log(res)
                })
              }
              _self.$message({
                message: data.error_reason,
                type: 'error'
              });
            })
          } else {
            _self.$message({
              type: 'warning',
              message: '请完善登录信息！'
            })
            return false;
          }
        });
      },
      noticePrev () {
        this.$refs.noticeCarousel.prev()
      },
      noticeNext () {
        this.$refs.noticeCarousel.next()
      },
      carouselChange (index) {
        if (this.notices.length > 0) {
          this.currentNotice = index + 1
        }
      },
      // 手机口令牌设置成功
      _closePhoneTokenSet(data) {
        if (data.reGet) {
          this.getLoginType()
        } else {
          this.pwdName = '手机口令'
          this.ruleForm2.userPasswd = ''
          this.phoneTokenSetDialog = false
        }
      }
    }
  }
</script>
