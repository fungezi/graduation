<template lang="html">
  <div class='index'>
    <div class="slidersContainer">
      <Slider :sliders="sliders"  />
    </div>
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
        console.log("首页",this.curUser)
        this.getHotMovieList()
        this.getNoShowMovieList()
    },
    props: ['curUser'],
    data() {
      return {
        rows: 3,
        cols: 5,
        hotMovieList: [],
        noShowMovieList: [],
        sliders: {
          data: [
            {
              src: 'http://p0.meituan.net/mmc/310f9db7b4b193d5ed49d8ee3b29434d178539.jpg', //图片地址
              url: 'https://www.shixiseng.com/mx2018' //链接跳转地址
            },
            {
              src: 'http://p0.meituan.net/mmc/ce724f4a95af6ae4a6bd12391492511d140247.jpg', //图片地址
              url: 'https://www.shixiseng.com/mx2018' //链接跳转地址
            }
          ],//传入图片地址和链接跳转地址，必选
          interval: 3000, //轮播动画时间，可选（默认3000ms）
          target: '_blank', //跳转方式，可选（默认_self）
          width:"1075px",//图片宽度，可选（默认800px）
          height:"333px",//图片高度，可选（默认400px）
          name: 'move' //轮播图动画方式，可选（默认move）
        }
      }
    },
    methods: {
      goToDetail: function (id) {
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
.slidersContainer{
  display: inline-block;
  margin: 16px auto;
}
.gridlist-demo-container{
  width: 1075px;
  margin: 0px auto;
  background-color: #ffffff;
  padding: 16px;
}
.index{
  background-color: #f2f2f2;
}
</style>
