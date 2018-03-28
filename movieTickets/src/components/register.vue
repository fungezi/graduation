<template lang="html">
    <div class='login'>
      <mu-card-header>
        电影会员注册
      </mu-card-header>
      <div class='loginText'>
        <mu-text-field v-model="name" label="用户名" v-on:blur='textFieldBlur("name")' :errorText="nameTip" labelFloat/><br/>
        <mu-text-field v-model="email" label="邮箱" v-on:blur='textFieldBlur("email")' :errorText="emailTip" labelFloat/><br/>
        <mu-text-field v-model="pwd" label="密码" v-on:blur='textFieldBlur("pwd")' :errorText="pwdTip" labelFloat/><br/>
    </div>
      <mu-card-actions class='btnBox'>
        <mu-raised-button v-on:click = "register()" label="注册" class="demo-raised-button" primary />
        <mu-raised-button label="登录" color="rgba(0,0,0,.3)" class="demo-raised-button" backgroundColor = "#e6e6e6" :disabled='showLoginBtn' />
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '注册页'
  },
  props: ['curUser'],
  data() {
    return {
      nameTip: '',
      pwdTip: '',
      emailTip: '',
      name: '',
      pwd: '',
      showLoginBtn: false
    }
  },
  methods: {
    register: function () {
      this.$http.post('/api/register',{
        name: this.name,
        pwd: this.pwd,
        email: this.email
      })
        .then(res => {
          this.toastr.success('注册成功')
          console.log(res.data)
          const {name, role, _id} = res.data
          this.$router.push('/login')
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
      }else if(key === 'email'){
        if(!this.email){
          this.emailTip = '必填'
        }else{
          this.emailTip = ''
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
