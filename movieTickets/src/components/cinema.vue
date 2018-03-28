<template lang="html">
   <div class="applyList">
      <mu-table :showCheckbox="false" ref="table">
        <mu-thead>
          <mu-tr>
            <mu-th>影院名</mu-th>
            <mu-th>影院地址</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="cinema,index in cinemaList" :key="index">
            <mu-td>{{cinema.name}}</mu-td>
            <mu-td>{{cinema.address}}</mu-td>
            <mu-td>
              <mu-raised-button @click="opneAddMovie()" label="添加电影" primary/>
            </mu-td> 
          </mu-tr>
        </mu-tbody>
      </mu-table>

      <vodal :show="addMovieModal" animation="slideDown" :width="900" :height="720" :closeButton="false">
      <div class="movieTextField">
        <mu-auto-complete v-model="searchMovie" hintText="搜索电影" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
      </div>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
      <!-- <mu-raised-button @click="editMovie" label="确定" icon="check" primary/> -->
    </vodal>
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
      addMovieModal: false,
      cinemaList: [],
      dataSource: [],
      searchMovie : 'abc',
      searchMovieId: []
    }
  },
  methods: {
    handlechange () {

    },
    handleInput (value) {
      console.log(value)
      this.$http.get(`/api/getMovieByNameStr/${value}`)
        .then(res=>{
          const data = res.data
          const search = []
          for(const i in data){
            search.push(data[i].nm)
          }
          this.dataSource = search
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    closeModal () {
      this.addMovieModal = false
      this.searchMovie = ''
      this.searchMovieId = []
    },
    opneAddMovie () {
      this.addMovieModal = true
      this.searchMovie = ''
      this.searchMovieId = []
    },
    getCinemaList () {
      const userId = this.curUser.userId
      console.log(this.curUser)
      this.$http.get(`/api/cinema`)
        .then(res => {
          const data = res.data
          this.cinemaList = data
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
