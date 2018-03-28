<template lang="html">
  <div class='index'>
    <div class="gridlist-demo-container">
       <mu-grid-list :cols="6" cellHeight="auto" class="gridlist-demo">
          <mu-sub-header>热映电影</mu-sub-header>
          <mu-grid-tile :rows="3" v-for="item, index in hotMovieList" :key="index" >
            <img  @click="goToDetail(item._id)" :src="item.posterUrl"/>
            <span slot="title">{{item.nm}}</span>
            <span slot="subTitle">{{item.dra}}</span>
          </mu-grid-tile>
      </mu-grid-list> 
      <mu-grid-list :cols="6" cellHeight="auto" class="gridlist-demo">
          <mu-sub-header>预售电影</mu-sub-header>
          <mu-grid-tile :rows="3" v-for="item, index in noShowMovieList" :key="index" >
            <img @click="goToDetail(item._id)" :src="item.posterUrl"/>
            <span slot="title">{{item._id}}</span>
            <span slot="subTitle">{{item.dra}}</span>
          </mu-grid-tile>
      </mu-grid-list> 
    </div>
  </div>
</template>

<script>
export default {
    created() {
        document.title = this.$route.name
        this.curUser.title = '电影首页'
        console.log(this.curUser)
        this.getHotMovieList()
        this.getNoShowMovieList()
    },
    props: ['curUser'],
    data() {
        return {
          rows: 3,
          cols: 5,
          hotMovieList: [],
          noShowMovieList: []
        }
    },
    methods: {
      goToDetail: function (id) {
        console.log(11111)
        this.$router.push(`/detail/${id}`)
      },
      getHotMovieList: function () {
        this.$http.get('/api/hotMovie')
          .then((res)=>{
            this.hotMovieList = res.data
            console.log(this.movieList)
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      getNoShowMovieList: function () {
        this.$http.get('/api/noShowMovie')
          .then((res)=>{
            this.noShowMovieList = res.data
            console.log(this.movieList)
          })
          .catch((err)=>{
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
.gridlist-demo img{
  width: 100%;
}
.mu-sub-header{
  font-size: 25px;
  color: #333;
  text-align: left;
}
.index{
  width: 100%;
}
</style>
