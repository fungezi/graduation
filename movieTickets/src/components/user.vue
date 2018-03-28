<template lang="html">
  <div class='user'>
      <mu-table :showCheckbox="false" ref="table">
        <mu-thead>
          <mu-tr>
            <mu-th>用户名</mu-th>
            <mu-th>邮箱</mu-th>
            <mu-th>权限</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="user,index in userList" :key="index">
            <mu-td>{{user.name}}</mu-td>
            <mu-td>{{user.email}}</mu-td>
            <!-- <mu-td>{{user.role}}</mu-td> -->
            <mu-select-field @change = "selectRole(index)" v-model="user.role" label="">
              <mu-menu-item :value="1" title="超级管理员"/>
              <mu-menu-item :value="2" title="管理员"/>
              <mu-menu-item :value="3" title="会员"/>
            </mu-select-field>
          </mu-tr>
        </mu-tbody>
      </mu-table>
  </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '用户管理页'
    this.getUserList()
  },
  props: ['curUser'],
  data() {
    return {
      userList: []
    }
  },
  methods: {
    selectRole (index) {
      setTimeout(()=>{
        const data = this.userList[index]
        this.$http.put(`/api/user/${data._id}`,{
          role: data.role
        })
          .then(res=>{
            const data = res.data
            console.log("32",res.data)
            this.getUserList()
          })
          .catch(err=>{
            console.log(err)
          })
        },100)
    },
    getUserList () {
      this.$http.get('/api/user')
        .then(res=>{
          const data = res.data
          this.userList = data
          console.log(data)
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
