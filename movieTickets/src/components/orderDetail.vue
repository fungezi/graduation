<template lang="html">
   <div class="applyList">
      订单详情页
      <!-- 订单详情的开发 订单列表 退款 -->
   </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '订单详情'
  },
  props: ['curUser'],
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="css" scoped>
a {
  color: #03a9f4;
}
</style>
