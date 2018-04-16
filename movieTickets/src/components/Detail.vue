<template lang="html">
    <div class="detailCon">
      <mu-circular-progress class="loading" v-if="loadingData" :size="80"/>
      <div :style="{'background-image':'url(' + movie.bgimg+ ')'}" class="detail" v-else>
        
        <div class="detail-left">
          <img :src="movie.posterUrl" class="movie-poster"/>
        </div>
        <div class="detail-right">
            <p class="movie-title">{{ movie.nm }}</p>
            <p class="movie-akas">导演:<span class="movie-aka">{{movie.dir}}</span></p>
            <p class="movie-akas">类型:<span class="movie-aka">{{movie.cat}}</span></p>
            <p class="movie-akas">来自:<span class="movie-aka">{{movie.src}}</span></p>
            <p class="movie-akas">上映时间:<span class="movie-aka">{{movie.pubDesc}}</span></p>
            <p class="movie-akas">简介:<span class="movie-aka">{{movie.dra}}</span></p>
            <p class="movie-actors">
              演员: 
              <mu-chip backgroundColor="#fff" v-for="actor of movie.staff" class="movie-actor">
                <mu-avatar :size="32" :src="actor.photo"/>  {{actor.role}} / {{actor.name}}
              </mu-chip>
            </p> 
            <mu-raised-button @click="payIt" primary>{{movie.hasShow?"购买":"预购"}}</mu-raised-button> 
        </div>
        <div class="detailMask"></div>
      </div>
      <div class="movieDate">
        <p class="movieDateTitle">选择购票地点</p>
        <div class="addressPicker">
          <address-picker :opts="addressConfig" v-model="address"></address-picker>
          <mu-text-field v-model="detailAddress" label="详细地址" labelFloat/>
        </div>
      </div>
      <div class="movieDate">
        <p class="movieDateTitle">选择购票时间</p>
        <mu-paper v-for="item,index in date" :key="index" class="demo-paper" :zDepth="1" >
          <div class="dateByn" :style="{'background-color':item.bgColor }" @click="getCurDate($event,index)">
            <span class="week">{{item.week}}</span>
            <span class="date">{{item.date.month}}月<br>{{item.date.day}}日</span>
          </div>
        </mu-paper>
      </div>
      <div class="movieAddress">
        <p class="movieDateTitle">选择电影院</p>
        <div class="cinemas">
          <div class="cinema" v-for="cinema,index in cinema" :key="index" @click="getCurCinema(cinema._id)">
            {{cinema.name}}({{cinema.address}}) 距离：{{cinema.distance}}
          </div>
        </div>
      </div>
      <div class="comment">
          暂无评论
      </div>
  </div>
</template>

<script>
export default {
  created() {
    const movieId = this.$route.params.id
    this.getMovie(movieId)
    document.title = this.$route.name
    this.curUser.title = "电影详情页"
    const dateModule = this.getTime()
    for(const i in dateModule){
      dateModule[i].bgColor = ''
    }
    this.date = dateModule
    // this.getCinema(movieId)
  },
  props: ["curUser"],
  data() {
    return {
      detailAddress: '',
      address: {},
      addressConfig: {

      },
      movie: {},
      loadingData : true,
      date: [],
      cinema: [],
      curDate: '',
      curCinema: '',
      gotDate: false
    }
  },
  methods: {
    payIt () {
      this.getCinema()
    },
    getCurDate (e,index) {
      const dateModule = this.date
      this.curDate = dateModule[index].time
      for(const i in dateModule){
        dateModule[i].bgColor = ''
      }
      dateModule[index].bgColor = '#7d56c3'
    },
    getCinema (movieId) {
      if(!movieId){
        movieId = this.$route.params.id
      }
      this.$http.get(`/api/movieToCinema/${movieId}`,{
        params: {
          date: this.curDate,
          address: this.address,
          detailAddress: this.detailAddress
        }
      })
        .then(res=>{
          const data = res.data
          if(!!data){
            console.log(this.cinema)
            this.cinema = data
          }
        })
        .catch(err=>{
          console.log("失败了，滴 滴滴",err)
        })
    },
    // 地点先查询电影院ID，时间 + 电影院ID 查询排期 
    getTime () { // 此处创建的时间都是 当天凌晨整点的时间也就是 24:00:00
      const d = []
      const weeks = ['日','一','二','三','四','五','六']
      const dates = ['今天','明天','后天']
      const oneDay = 86400000
      const now = new Date()
      let time = now.getTime()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const allS = hours * 60 * 60 + minutes * 60 + seconds
      time = (parseInt(time/1000) - allS) * 1000
      for(let i = 0;i < 14;i++){
        const curTime = time + oneDay * i
        const date = new Date(curTime)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const week = weeks[date.getDay()]
        const ddate = {
              month: month,
              day: day,
              time: curTime
            }
        if(i < 3){
          d.push({
            week: dates[i],
            date: ddate,
            time: curTime
          })
        }else{
          d.push({
            week: '星期'+week,
            date: ddate,
            time: curTime
          })
        }
      }
      console.log(d)
      return d;
    },
    goBack() {
      this.$router.go(-1)
    },
    getMovie(id) {
      this.$http.get(`/api/movie/${id}`)
        .then(res => {
          console.log(res.data)
            let movie = res.data
            if(!!movie){
              this.movie = movie
            }
            this.loadingData = false
        })
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="css" scoped>
.dateByn{
  height: 100%;
}
.addressPicker{
  margin: 16px;
  display: inline-block;
}
.cinemas{
  overflow: hidden;
  padding: 8px;
  margin: 8px;
}
.dateActive{
  background-color: #7d56c3;
}
.cinema{
  background-color: #f2f2f2;
  padding: 4px;
  float: left;
  border-radius: 2px;
}
.movieAddress{
  background-color: #fff;
  padding: 16px;
}
.movieDateTitle{
  border-left: 4px solid #7e57c2;
  background-color: #e3e1e63d;
  text-align: left;
  padding: 5px 10px;
  margin: 0px;
}

.date{
  line-height: 30px;
  width: 50px;
  display: block;
  background-color: #b0afb4;
  float: left;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
}
.week{ 
  width: 100px;
  display: block;
  float: left;
  line-height: 60px;
  font-size: 20px;
  font-weight: 500;
}
.movieDate{
  overflow: hidden;
  padding: 16px;
  background-color: #fff;
}
.demo-paper{
  width: 150px;
  height: 60px;
  float: left;
  margin: 12px;
  margin-bottom: 0;
  text-align: center;
  background-color: #f2f2f2;
}
.movie-actor{
  margin-left: 4px;
}
.movie-aka,.movie-title{
  color: #333;
  margin-left: 4px;
  font-weight: 500;
}
.detail-right{
  color: #706f6f;
  position: relative;
  z-index: 2;
}
.detailCon{
  width: 100%;
  background-color: #f2f2f2;
  padding: 12px;
  min-height: 100%;
}
.detail{
  width: 100%;
  margin: 0px auto;
  background-color:#fff;
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
}
.detailMask{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background: -webkit-linear-gradient(#f0eff3d4, #f2f2f2); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#f0eff3d4, #f2f2f2); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#f0eff3d4, #f2f2f2); /* Firefox 3.6 - 15 */
  background: linear-gradient(#f0eff3d4, #f2f2f2); /* 标准的语法 */
}
a{
  color: #03a9f4;
}
.loading{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.detail{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.detail-left{
  padding: 16px;
  z-index: 2;
  position: relative;
}
.detail-right{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.movie-title{
  width: 100%;
  font-size: 24px;
}
.movie-actors{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.movie-actor{
  margin-right: 12px;
}
.movie-genres{
  width: 100%;
}
.movie-genre{
  margin-right: 12px;
}
.movie-poster{
  width: 300px;
  height: 450px;
}
.movie-directors{
  width: 100%;
}
.movie-summary{
  letter-spacing: 1px;
  text-indent: 2em;
  line-height: 1.4;
  font-size: 16px;
}
.movie-akas{
  width: 100%;
}
.movie-aka{
  margin-right: 12px;
}
.comment{
  height: 150px;
  line-height: 100px;
  color: #d6d0d0;
  width: 100%;
  font-size: 30px;
  font-weight: 900;
}
</style>
