<template lang="html">
    <div class="detailCon">
      <div class="detailinner">
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
            <div class="cinema" v-for="schedule,index in schedule" :key="index" @click="getHall(schedule.hallId, index)">
              <div class="movieMessage">
                <!-- 上映时间 影院名 影院地址 价格 -->
                <span><label>影院名：</label>{{schedule.cinema.name}}</span> |
                <span><label>详细地址：</label>{{schedule.cinema.address.detailAddress}}</span> |
                <span><label>上映时间：</label>{{new Date(parseInt(schedule.showTime))}}</span> |
                <span><label>价格：</label>￥{{schedule.price}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="movieAddress">
          <p class="movieDateTitle">选座</p>
          <div class="seatRows" v-for="(row,index) in seats" :key="index">
            <div v-for="(seat,i) in row" :key="i" class="seat" @click="setSeat(index,i)">
              <img :src="seat.icon">
            </div>
          </div>
        </div>
        <div>
          <mu-raised-button label="立即购买" @click="createOrder" class="demo-raised-button" primary/>
        </div>
        <div class="commentCon">
            <div class="commentText">
              <mu-text-field v-model="commentContent" hintText="随便说点啥..." multiLine :rows="2" :rowsMax="4"/>
              <mu-raised-button label="确定" @click="addComment" class="demo-raised-button" primary/>
            </div>
            <div v-for=" icomment, index in commentList " :key="index" class="comment">
              <div class="cImg">
                <img src="http://oz57y8791.bkt.clouddn.com/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9.png" />
              </div>
              <div class="commentMes">
                <div class="cmes">
                  <span class="cuserName">{{icomment.userName}}:</span>
                  <span class="ccontent">{{icomment.content}}</span>
                </div>
                <div v-show="icomment.replyTarget ? true : false" class="creply">
                  <!-- <span class="cuserName">@ {{icomment.replyTarget.userName}}:</span>
                  <span class="ccontent">{{icomment.replyComment.content}}</span> -->
                </div>
                <div class="ctime">
                  <span>{{icomment.createdAt}}</span>
                  <span class="coperate">回复</span>
                  <span class="cgoodNum"><img :src="curGoodIcon" /><span>{{icomment.goodNum}}</span></span>
                </div>
              </div>
            </div>
            <div class="comment">
              <div class="cImg">
                <img src="http://oz57y8791.bkt.clouddn.com/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9.png" />
              </div>
              <div class="commentMes">
                <div class="cmes">
                  <span class="cuserName">zzzl大lll:</span>
                  <span class="ccontent">暗恋这种事，就好像下了一场暴雨，我故意站在你门外，几度想要敲你的门，问你是否可以暂时借避，可是又不敢，只好一直站在雨里。</span>
                </div>
                <div class="creply">
                  <span class="cuserName">@ zzzl大lll:</span>
                  <span class="ccontent">暗恋这种事，就好像下了一场暴雨，我故意站在你门外。</span>
                </div>
                <div class="ctime">
                  <span>2014年12月1日3:00</span>
                  <span class="coperate">回复</span>
                  <span class="cgoodNum"><img :src="curGoodIcon" /><span>100</span></span>
                </div>
              </div>
            </div>
        </div>
      </div>
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
    this.getComment(movieId)
  },
  props: ["curUser"],
  data() {
    return {
      commentContent: '' ,
      commentList: [],
      detailAddress: '',
      address: {},
      addressConfig: {},
      movie: {},
      loadingData : true,
      date: [],
      cinema: [],
      schedule: [],
      curDate: '',
      curCinema: '',
      gotDate: false,
      seats: [],
      seatNo: "http://oz57y8791.bkt.clouddn.com/ban.png",
      seatYes: "http://p1.meituan.net/movie/9dfff6fd525a7119d44e5734ab0e9fb41244.png",
      hasSale: "http://p1.meituan.net/movie/bdb0531259ae1188b9398520f9692cbd1249.png",
      hasSelected: "http://p0.meituan.net/movie/585588bd86828ed54eed828dcb89bfdd1401.png",
      curSchedule: '',
      seatsHasSelected: [],
      goodIcon1: "http://oz57y8791.bkt.clouddn.com/%E7%82%B9%E8%B5%9E.png",
      goodIcon2: "http://oz57y8791.bkt.clouddn.com/%E7%82%B9%E8%B5%9E%20%281%29.png",
      curGoodIcon: 'http://oz57y8791.bkt.clouddn.com/%E7%82%B9%E8%B5%9E%20%281%29.png'
    }
  },
  methods: {
    getComment (movieId) {
      this.$http.get(`/api/comment/${movieId}`)
        .then(res=>{
          const data = res.data
          this.commentList = data
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    addComment () {
      // content: String,
      // movieId: String,
      // goodNum: {
      //     type: Number,
      //     default: 0
      // },
      // // type: Number //1：评论 2：回复
      // replyTarget: {
      //     userId: String,
      //     userName: String,
      //     content: String
      // } 
      const content = this.commentContent
      const {_id: movieId} = this.movie
      const data = {
        content,
        movieId
      }
      this.$http.post('/api/comment',data)
        .then(res=>{
          const data = res.data
          this.commentContent = ''
          this.getComment(this.$route.params.id)
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    replyComment (user) {

    },
    createOrder () {
      // 1. 为 hall 添加购买的座位
        //数据准备：更新座位 售票数
      // 2. 生成订单

      // 订单数据

      // price: String,
      // order: {
      //     movieId: String,
      //     cinemaId: String,
      //     cinemaName: String,
      //     showTime: String,
      //     hallName: String,
      //     movieName: String,
      //     seats: [{
      //         row: Number,
      //         col: Number
      //     }],
      // },
      // refund: {
      //     refundable: Boolean,
      //     desc: String
      // }

      const seatHasSale = this.seatsHasSelected
      const scheduleData = {
        seatHasSale
      }
      const {_id: movieId, nm: movieName, posterUrl} = this.movie
      const {
        price,
        showTime,
        hallId,
        hallName,
        _id: scheduleId,
        cinema:{
          name: cinemaName,
          _id: cinemaId
        }
      } = this.schedule[this.curSchedule]
      const orderData = {
          order: {
            scheduleId,
            status: 1,
            movieId,
            cinemaId,
            cinemaName,
            showTime,
            hallName,
            movieName,
            posterUrl,
            seats: seatHasSale,
          },
          refund: {
            refundable: true,
            desc: '允许退票'
          },
          price
      }
      this.$http.post(`/api/order`,orderData)
        .then(res=>{
          const Odata = res.data
          const {_id: orderId} = Odata
          this.$http.put(`/api/scheduleForSeat/${scheduleId}`,seatHasSale)
            .then(res=>{
              const data = res.date
              this.toastr.success("下单成功")
              this.goToOrder(orderId)
            })
            .catch(err=>{
              console.log(err)
            })
          console.log(11, Odata)
        })
        .catch(err=>{
          console.log(err)
        })
      

    },
    goToOrder (orderId) {
      this.$router.push(`/order`)
    },
    setSeat (x ,y) {
      // 座位的状态：损坏、未卖、已卖、当前选择
      // 1. 样式上的改变
      
      if(this.seats[x][y].icon === this.seatNo){
        return
      }
      if(this.seats[x][y].icon === this.hasSale){
        this.seats[x][y].icon = this.seatYes
        const seatsHasSelected = this.seatsHasSelected
        for(let i = 0; i<seatsHasSelected.length; i++){
          const {row, col} = seatsHasSelected[i]
          if(row === x && col === y){
            seatsHasSelected.splice(i,1)
            break
          }
        }
      }else{
        this.seatsHasSelected.push({
          row: x,
          col: y
        })
        this.seats[x][y].icon = this.hasSelected
      }
    
    },
    getHall (hallId, index) {
      this.$http.get(`/api/hallDetail/${hallId}`)
        .then(res=>{
          const data = res.data
          const {seats, rows, cols} = data.section
          const schedule = this.schedule[index]
          for(let i = 0;i<rows;i++){
            for(let j = 0;j<cols;j++){
              if(seats[i][j].seatNo){
                seats[i][j].icon = this.seatNo
              } else {
                seats[i][j].icon = this.seatYes
              }
            }
          }
          const seatHasSale = schedule.seatHasSale
          for(let i = 0;i<seatHasSale.length;i++){
            const {row, col} = seatHasSale[i]
            seats[row][col].icon = this.hasSale
          }
          this.curSchedule = index
          this.seats = seats
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getSchemule () {
      if(this.address.district && this.curDate){
        setTimeout(()=>{
          this.getCinema()
        },300)
      }
    },
    // payIt () {
    //   this.getCinema()
    // },
    getCurDate (e,index) {
      const dateModule = this.date
      this.curDate = dateModule[index].time
      for(const i in dateModule){
        dateModule[i].bgColor = ''
      }
      dateModule[index].bgColor = '#7d56c3'
      this.getSchemule()
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
            const {schedule, cinema} = data
            for(let i = 0;i<schedule.length;i++){
              for(let j = 0;j<cinema.length;j++){
                if(schedule[i].cinemaId === cinema[j]._id){
                  schedule[i].cinema = cinema[j]
                }
              }
            }
            console.log(schedule)
            this.schedule = schedule
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
.commentText{
  background-color: #ffffff;
  padding: 8px;
}
.commentText .mu-text-field{
  width: 100%;
}
.commentCon{
  margin: 0 auto;
}
.comment{
  overflow: hidden;
  /* border-top: 1px solid gray; */
  margin-bottom: 8px;
  padding: 8px;
  background-color: #ffffff;
}
.coperate {
  float: right;
  margin-left: 8px;
  cursor: pointer;
}
.creply{
  border: 1px solid gainsboro;
  padding: 4px 8px;
  display: inline-block;
}
.cgoodNum{
  float: right;
}
.ctime{
  color: #706f6f;
  font-size: 12px;
}
.cgoodNum span{
  display: inline-block;
  vertical-align: top;
}
.cgoodNum {
  vertical-align: middle;
  line-height: 20px;
}
.cgoodNum img{
  cursor: pointer;
  width: 20px;
  display: inline-block;
  font-size: 0;
}
.ccontent{
  text-indent: 1em;
  color: #4b4949;
  font-size: 12px;
}
.cuserName{
  color: #03a9f4;
}
.comment .cImg{
  width: 50px;
  float: left;
}
.cImg img{
  width: 100%;
  display: block;
}
.commentMes{
  margin-left: 60px;
  text-align: left;
}
.seatRows{
  overflow: hidden;
}
.seat{
  width: 30px;
  float: left;
  padding: 4px;
}
.seat img{
  width: 100%;
  display: block;
}
.movieMessage label{
  color: #706f6f;
}
.dateByn{
  height: 100%;
}
.addressPicker{
  margin: 16px;
  float: left;
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
  margin: 8px 0;
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
.detailinner{
  width: 1000px;
  margin: 0 auto;
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
  /* height: 150px;
  line-height: 100px;
  color: #d6d0d0;
  width: 100%;
  font-size: 30px;
  font-weight: 900; */
}
</style>
