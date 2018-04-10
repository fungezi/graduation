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
              <mu-raised-button @click="opneAddMovie(cinema._id)" label="添加电影" primary/>
              <mu-raised-button @click="opneAddHall(index)" label="添加大厅" primary/>
              <mu-raised-button @click="goToCinema(index)" label="影院详情" primary/>
            </mu-td> 
          </mu-tr>
        </mu-tbody>
      </mu-table>

      <vodal :show="addMovieModal" animation="slideDown" :width="900" :height="720" :closeButton="false">
        <div class="movieTextField">
          <mu-auto-complete fullWidth v-model="searchMovie" hintText="搜索电影" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
        </div>
        <mu-raised-button @click="closeModal('movie')" label="取消" icon="undo"  />
        <mu-raised-button @click="addMovie" label="确定" icon="check" primary/> 
      </vodal>

      <vodal :show="addHallModal" animation="slideDown" :width="900" :height="720" :closeButton="false">
        <div class="seats">
          <mu-text-field v-model="hallName" hintText="大厅名"/>
          <div class="createSeats">
            <mu-text-field v-model="seatsMes.rows" hintText="行（rows）"/>
            <mu-text-field v-model="seatsMes.cols" hintText="列（cols）"/>
            <mu-raised-button @click="createSeat" label="创建" icon="check" primary/> 
          </div>
          <div class="controlBtn">
            <mu-checkbox v-model="selectAllSeat" label="全选" @change="selectAllSeats" class="demo-checkbox"/>
          </div>
          <img class="loadImg" :width="0" :height="0" :src="seatsMes.seatYes"/>
          <div class="seatRows" v-for="(row,index) in seatsMes.seats" :key="index">
            <div v-for="(seat,i) in row" :key="i" class="seat" @click="setSeat(index,i)">
              <img :src="seat.seatNo?seatsMes.seatNo:seatsMes.seatYes">
            </div>
          </div>
        </div>
        <mu-raised-button @click="closeModal('hall')" label="关闭" icon="undo"  />
        <mu-raised-button @click="addHall" label="确定" icon="check" primary/> 
      </vodal>
   </div>
</template>

<script>
// 明日计划：
// 1. 完成 seat 组件
// 2. 添加电影 -> 展示电影列表 ->
// 3. 添加大厅 -> 设置座位
// 4. 大厅管理 -> 排期、更新大厅设置
// 5. 买票 -> 搜索电影 -> 影院列表 -> 选择时间 -> 选座 -> 提交订单 -> 支付
// 6. 电影排期 -> 大厅列表 -> 自动排期 or 手动排期 -> 手动排期 -> 选择影库 -> 设置时间点 -> 提交
export default {
  created() {
    document.title = this.$route.name
    this.curUser.title = '影院管理页'
    this.getCinemaList()
    // this.createSeat()
  },
  props: ['curUser'],
  data() {
    return {
      addMovieModal: false,
      cinemaList: [],
      dataSource: [],
      searchMovie : 'abc',
      searchMovieList: [],
      selectMovie: {},
      curCinema: '',
      addHallModal: false,
      selectAllSeat: false,
      hallName: '',
      seatsMes: {
        cols: 10,
        rows: 10,
        seatNo: "http://p1.meituan.net/movie/bdb0531259ae1188b9398520f9692cbd1249.png",
        seatYes: "http://p1.meituan.net/movie/9dfff6fd525a7119d44e5734ab0e9fb41244.png",
        hasSale: "http://p0.meituan.net/movie/585588bd86828ed54eed828dcb89bfdd1401.png",
        seats: []
      }
    }
  },
  methods: { 
    goToCinema (index) {
      const {_id: cinemaId} = this.cinemaList[index]
      console.log(`/cinemaDetail/${cinemaId}`)
      this.$router.push(`/cinemaDetail/${cinemaId}`)
    },
    selectAllSeats (value) {
      if(value) {
        for(let i = 0;i<this.seatsMes.rows;i++){
          for(let j = 0;j<this.seatsMes.cols;j++){
            this.seatsMes.seats[i][j].seatNo = true
          } 
        }
      }else{
        for(let i = 0;i<this.seatsMes.rows;i++){
          for(let j = 0;j<this.seatsMes.cols;j++){
            this.seatsMes.seats[i][j].seatNo = false
          } 
        }
      }
    },
    createSeat () {
      const seats = []
      const {rows, cols} = this.seatsMes
      this.selectAllSeat = false
      for(let i = 0;i<rows;i++){
        const rows = []
        for(let i = 0;i<cols;i++){
          rows.push({
            seatNo: false,
            isSale: true
          })
        } 
        seats.push(rows)
      }
      this.seatsMes.seats = seats
    },
    setSeat (x, y) {
      const status  = this.seatsMes.seats[x][y].seatNo
      if(status){
        this.seatsMes.seats[x][y].seatNo = false
      }else{
        this.seatsMes.seats[x][y].seatNo = true
      }
      
    },
    addHall () {
      this.addHallModal = false
      const {rows, cols, seats} = this.seatsMes
      const {name: cinemaName , _id: cinemaId} = this.curCinema
      const hallName = this.hallName
      const hallData = {
        section: {
          rows,
          cols,
          seats
        },
        cinemaName,
        cinemaId,
        hallName
      }
      this.$http.post('/api/hall', hallData)
        .then(res=>{
          const data = res.data
        })
        .catch(err=>{
          console.log(err)
        })
    },
    opneAddHall (index) {
      this.curCinema = this.cinemaList[index]
      this.addHallModal = true
    },
    addMovie () { // 添加电影成功
      this.addMovieModal = false
      this.$http.post('/api/addMovieForCinema',{
        movies: this.selectMovie._id,
        cinemaId: this.curCinema
      })
        .then(res=>{
          const data = res.data
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    handlechange (value) {
      if(value){
        for(const i in this.searchMovieList){
          if(this.searchMovieList[i].nm === value){
            this.selectMovie = this.searchMovieList[i]
          }
        }
      }
    },
    handleInput (value) {
      if(!value) return
      this.$http.get(`/api/getMovieByNameStr/${value}`)
        .then(res=>{
          const data = res.data
          const search = []
          for(const i in data){
            search.push(data[i].nm)
          }
          this.searchMovieList = data
          this.dataSource = search
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    closeModal (type) {
      if(type === "movie"){
        this.addMovieModal = false
        this.searchMovie = ''
        this.searchMovieId = []
      }else if(type === "hall"){
        this.addHallModal = false
      }
      
    },
    opneAddMovie (cinemaId) {
      this.addMovieModal = true
      this.searchMovie = ''
      this.searchMovieId = []
      this.curCinema = cinemaId
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
.seats{
  /* background-color: gray; */
  /* width: 500px; */
}
.createSeats{
  display:flex;
}
.seatRows{
  overflow: hidden;
  /* display: inline-block; */
}
.seats .loadImg{
  display: block;
}
.movieTextField{
  width: 500px;
  margin: 30px auto;
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
</style>
