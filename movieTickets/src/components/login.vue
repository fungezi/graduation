<template lang="html">
    <div class='login'>
      <mu-card-header>
        电影会员登录
      </mu-card-header>
      <div class='loginText'>
        <mu-text-field v-model="name" label="用户名" v-on:blur='textFieldBlur("name")' :errorText="nameTip" labelFloat/><br/>
        <mu-text-field v-model="pwd" label="密码" v-on:blur='textFieldBlur("pwd")' :errorText="pwdTip" labelFloat/><br/>
    </div>
      <mu-card-actions class='btnBox'>
        <mu-raised-button v-on:click = "login()" label="登录" class="demo-raised-button" :disabled='showLoginBtn' primary/>
        <mu-raised-button label="注册" class="demo-raised-button" color="rgba(0,0,0,.3)" backgroundColor = "#e6e6e6"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '登录页'
  },
  props: ['curUser'],
  data() {
    return {
      nameTip: '',
      pwdTip: '',
      name: '',
      pwd: '',
      showLoginBtn: false
    }
  },
  methods: {
    login: function () {
      this.$http.post('/api/login',{
        name: this.name,
        pwd: this.pwd
      })
        .then(res => {
          this.toastr.success('登录成功')
          console.dir(res.data)
          const {name, role} = res.data
          this.curUser.name = name
          let roleName = ''
          if(role === 1){
            roleName = '超管'
          }
          if(role === 2){
            roleName = '管理员'
          }
          if(role === 3){
            roleName = '会员'
          }
          this.curUser.role = roleName
          this.$router.push('/index')
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
          console.log(err)
        })
    },
    textFieldBlur: function (key){
      if(key === 'name'){
        if(!this.name){
          this.nameTip = '必填'
        }else{
          this.nameTip = ''
        }
      }else if(key === 'pwd'){
        if(!this.pwd){
          this.pwdTip = '必填'
        }else{
          this.pwdTip = ''
        }
      }
      
    }
  }
}
</script>

<style lang="css" scoped>
a {
  color: #03a9f4;
}
.login{
  position: relative;
  left: 50%;
  top: 150px; 
  width: 450px;
  /* background-color: gray; */
  transform: translate(-50%,0);
}
.btnBox .mu-raised-button{
  margin: 0 40px;
}
.login .mu-card-header{
  font-size: 20px;
  color: #7e57c2;
  font-weight: 300;
  word-spacing: 3px;
}
</style>
