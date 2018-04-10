<template lang="html">
   <div class="cinemaDetail">
       <div class="hallsList">
           <div></div>
       </div>
   </div>
</template>

<script>
// 明日计划 4.11
// element UI 已经安装
// 使用 table 组件完成 halls 列表及相关操作 包括 排期 等
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '影院详情页'
    const {cinemaId} = this.$route.params
    this.getHall(cinemaId)
  },
  props: ['curUser'],
  data() {
    return {
        hallList: []
    }
  },
  methods: {
      getCinema (cinemaId) {

      },
      getHall (cinemaId) {
          this.$http.get(`/api/hall/${cinemaId}`)
            .then(res=>{
                const data = res.data
                this.hallList = data
            })
            .catch(err=>{
                console.log(err)
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
