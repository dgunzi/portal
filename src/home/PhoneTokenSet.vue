<template>
  <section id="phoneTokenSet">
    <s-row>
      <s-col span="15" style="padding-right:25px">
        <s-row>
          <s-col span="6">
            <s-row class="title">
              <span>扫码获取</span>
            </s-row>
            <s-row>
              <img id="scan2dCode" :src="_2dCodePath" alt="二维码生成失败，请退出重试！"/>
            </s-row>
          </s-col>
          <s-col span="18">
            <s-row class="title">
              <span>注意</span>
            </s-row>
            <s-row>
              <p>1.请调节资产与系统时间一致，并确保下载客户端。</p>
              <p>2.使用资产扫描左侧二维码，自动生成身份验证信息。</p>
              <p>3.若资产无法扫描，可以手动向资产输入左下侧信息来生成身份验证信息。</p>
            </s-row>
          </s-col>
        </s-row>
        <s-row class="title">
          <span>手机信息获取</span>
        </s-row>
        <s-row>
          <s-col span="6" class="grid-content bg-purple">用户名称：</s-col>
          <s-col span="18" class="grid-content bg-purple-light" v-text="$store.state.userName"></s-col>
        </s-row>
        <s-row>
          <s-col span="6" class="grid-content bg-purple">秘钥：</s-col>
          <s-col span="18" class="grid-content bg-purple-light" v-text="userData.googleKeyDe"></s-col>
        </s-row>
      </s-col>
      <s-col span="9">
        <s-row class="title">
          <span>请连续输入获取的两组安全码：</span>
        </s-row>
        <s-form
          ref="phoneTokenSetForm"
          label-position="top"
          label-width="120px"
          :model="phoneTokenSetForm"
          :rules="phoneTokenSetFormRules">
          <s-form-item label="第一组安全码：" prop="nPswdPre">
            <s-input v-model="phoneTokenSetForm.nPswdPre"></s-input>
          </s-form-item>
          <s-form-item label="第二组安全码：" prop="nPswdNow">
            <s-input v-model="phoneTokenSetForm.nPswdNow"></s-input>
          </s-form-item>
        </s-form>
        <s-row class="footerRow">
          <s-button @click="cfmStartUse">确定启用</s-button>
        </s-row>
      </s-col>
    </s-row>
  </section>
</template>

<script type="text/babel">
  import $axios from '@/plugins/ajax'

  export default{
    data() {
      return {
        phoneTokenSetForm: {
          nPswdPre: '',
          nPswdNow: '',
          strUserUuid: this.userData.userUuid
        },
        phoneTokenSetFormRules: {
          nPswdPre: [{required: true, message: '不能为空', triger: blur}],
          nPswdNow: [{required: true, message: '不能为空', triger: blur}]
        }
      }
    },
    props: {
      userData: {
        type: Object,
        required: true
      }
    },
    computed: {
      _2dCodePath() {
        let baseURL = $axios.basePath()
        return `${baseURL.substr(0, baseURL.length - 1)}${this.userData.picPath}`
      }
    },
    methods: {
      cfmStartUse() {
        this.$refs['phoneTokenSetForm'].validate(valid => {
          if (valid) {
            $axios.post('/login/firstBindPhoneCard', this.phoneTokenSetForm).then(res => {
              let resData = res.data
              if (resData && resData.status === 'true') {
                if (resData.reGet) {
                  this.$emit('closePhoneTokenSet', {reGet: true})
                }
                this.$emit('closePhoneTokenSet', {reGet: false})
              } else if (resData && resData.status === 'false') {
                this.$message({
                  type: 'error',
                  message: resData.error_reason
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '设置失败，请重试！'
                })
              }
            })
          } else {
            return false
          }
        })
      }
    },
    created() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #scan2dCode
    vertical-align middle
    width 85%
  #phoneTokenSet
    .title
      margin-bottom 20px
      span
        font-size 14px
        color #2db0fb
    .s-input-inner
      border 1px solid #344458
    .s-form-item.is-error .s-input-inner, .s-form-item.is-error .s-textarea-inner
      border-color #ff4949
    .s-form-item-label
      padding 11px 12px 11px 10px
    .footerRow
      text-align right
      .s-button
        margin-top 7px
    .s-input
      width 100%
</style>
