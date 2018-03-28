<template lang="html">
   <div class="applyList">
      大厅
   </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '影院管理页'
    this.getCinemaList()
  },
  props: ['curUser'],
  data() {
    return {
    }
  },
  methods: {
    getCinemaList () {
      const userId = this.curUser.userId
      console.log(userId)
      this.$http.get(`/api/cinema/${userId}`)
        .then(res => {
          const data = res.data
          console.log(data)
        })
        .catch(err => {
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
