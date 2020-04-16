<template>
  <div class="login position_fixed max_width_height" :style="backgroundStyle">
    <transition name="el-zoom-in-center">
      <el-form
        class="login_form position_absolute transform_center"
        :model="userInfo"
        :rules="regObj"
        ref="userInfo"
      >
        <el-form-item class="form_name margin_auto" prop="username">
          <i
            class="iconfont icon-USER-NAME display_inline_block text_white"
          ></i>
          <el-input
            type="text"
            name="username"
            v-model.trim="userInfo.username"
            placeholder="请输入用户名"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="form_pwd margin_auto" prop="userpwd">
          <i class="iconfont icon-USER-PWD display_inline_block text_white"></i>
          <el-input
            type="password"
            name="userpwd"
            v-model="userInfo.userpwd"
            placeholder="请输入密码"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="form_submit margin_auto">
          <el-button type="primary" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </transition>
  </div>
</template>

<script>
let that

export default {
  name: 'Login',
  data () {
    // 检查用户名
    var regName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        if (this.userInfo.username !== '') {
          this.$refs.userInfo.validateField('regName')
        }
        callback()
      }
    }
    // 检查密码
    var regPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (this.userInfo.userpwd !== '') {
          this.$refs.userInfo.validateField('regPwd')
        }
        callback()
      }
    }

    return {
      backgroundStyle: {
        backgroundImage: `url("${require('../assets/imgs/login_bg.png')}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      transition: false,
      userInfo: {
        username: '',
        userpwd: ''
      },
      regObj: {
        username: [
          {
            validator: regName,
            trigger: 'blur'
          }
        ],
        userpwd: [
          {
            validator: regPwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    that = this
    that.transition = true
  },
  methods: {
    // 登陆
    login () {
      let data = {}

      Object.assign(data, that.userInfo, {
        token: that.$config.token
      })

      // 用户名不存在
      if (!data.username) {
        that.$message({
          showClose: true,
          message: '请填写用户名',
          type: 'error'
        })
        // 密码不存在
      } else if (!data.userpwd) {
        that.$message({
          showClose: true,
          message: '请填写密码',
          type: 'error'
        })
      } else {
        that.$http._post(
          that.$api.Login.login,
          that.$qs.stringify(data),
          resData => {
            let obj = {
              icon_class: 'icon-SHUJU2',
              text: '数据总览',
              modules: 0
            }

            if (resData.code === 0) {
              // 设置登陆账号的信息
              localStorage.setItem('userInfo', JSON.stringify({
                username: resData.username,
                imgurl: resData.imgurl
              }))
              // 设置选中过的模块
              that.$store.commit('set_histroy', obj)
              // 跳转到后台页面
              that.$router.push('/index')
            }
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.login {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.login_form {
  top: 50%;
  left: 50%;
  width: 538px;
  height: 500px;
  background-image: linear-gradient(
    180deg,
    rgba(46, 208, 255, 0.8) 0%,
    rgba(46, 208, 255, 0.4) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 3px 3px 0px 0px;
}
.login_form .el-form-item {
  width: 420px;
}

.form_name {
  margin-top: 100px;
  border-bottom: 1px solid #fff;
}
.form_pwd {
  margin-top: 32px;
  border-bottom: 1px solid #fff;
}
.form_name i,
.form_pwd i {
  padding: 0 10px;
  font-size: 22px;
}
.form_name .el-input,
.form_pwd .el-input {
  width: 372px;
  height: 40px;
  line-height: 40px;
  outline: none;
}
.form_name >>> .el-form-item__error,
.form_pwd >>> .el-form-item__error {
  left: 50%;
  font-size: 14px;
  color: #fff;
  transform: translateX(-50%);
}
.login_form >>> .el-input__inner {
  background: rgba(0, 0, 0, 0);
  border: none;
  color: #fff;
}

.form_submit >>> .el-input__inner {
  width: 360px;
  height: 60px;
  margin-top: 90px;
  background: #36bcd1;
  border-radius: 30px;
  border: 0;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
.form_submit >>> .el-button--primary {
  width: 360px;
  height: 60px;
  margin-top: 90px;
  background: #36bcd1;
  border-radius: 30px;
  border: 0;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}

.login_form >>> .el-input__inner::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 1);
}
</style>
