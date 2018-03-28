<template lang="html">
   <div class="applyForm">
       <mu-text-field v-model="name" label="影院名" labelFloat/>
       <mu-text-field v-model="address" label="影院地址" labelFloat/>
       <mu-raised-button label="申请" @click = "applyCinema()" class="demo-raised-button" primary/>
   </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '权限申请页'
  },
  props: ['curUser'],
  data() {
    return {
      name: '',
      address: ''
    }
  },
  methods: {
    applyCinema() {
      console.log(this.curUser)
      this.$http.post('/api/apply', {
        name: this.name,
        address: this.address,
        apply: false,
        userId: this.curUser.id
      })
        .then(res => {
          const data = res.data
          this.name = ''
          this.address = ''
          console.log(data)
        })
        .catch(err => {
          console.log("di", err)
        })
    }
  }
}
</script>

<style lang="css" scoped>
a {
  color: #03a9f4;
}
</style>
