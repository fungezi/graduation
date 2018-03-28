<template lang="html">
   <div class="applyList">
      <mu-list>
        <mu-list-item v-for="apply,index in applyList" :key="index">
          <div class="applyItem" >{申请人}：{{apply.userId}} {影院名}：{{apply.name}} {地址}：{{apply.address}}</div>
          <mu-raised-button v-if="apply.apply" disabled label="已审核" class="demo-raised-button" primary/>
          <mu-raised-button @click="applyOK(apply._id)" v-else label="通过" class="demo-raised-button" primary/>
        </mu-list-item>
      </mu-list>
   </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '权限申请列表页'
    this.getApplyList()
  },
  props: ['curUser'],
  data() {
    return {
      applyList: []
    }
  },
  methods: {
    applyOK (id) {
      this.$http.put(`/api/apply/${id}`)
        .then(res=>{
          const data = res.data
          console.log(data)
          this.getApplyList()
        })
        .catch(err=>{
          console.log("哒哒",err)
        })
    },
    getApplyList () {
      this.$http.get('/api/applyList')
        .then(res => {
          const data = res.data
          this.applyList = data
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
.applyList{
  width: 90%;
  margin: 20px auto;
  padding: 4px;
}
.applyItem{
  /* height: 80px; */
  /* width:800px; */
  text-align: left;
}
.demo-raised-button{
  float: right;
}
</style>
