<template lang="html">
  <div class="cinemaDetail">
    <div class="hallsList">
      <mu-table :showCheckbox="false" ref="table">
        <mu-thead>
          <mu-tr>
            <mu-th>大厅名</mu-th>
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="hall,index in hallList" :key="index">
            <mu-td>{{hall.hallName}}</mu-td>
            <mu-td>
              <mu-raised-button @click="opneHallPlain(index)" label="手动排期" primary/>
              <mu-raised-button @click="opneHallPlain(index)" label="智能排期" primary/>
            </mu-td> 
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-drawer :width="700" :open="drawerOpen" :docked="drawerDocked" @close="drawerToggle()">
        <div class="scheduleList">
          <div v-for="schedule,index in curScheduleList" :key="index" class="schedule">
            <mu-text-field :width="100" v-model="schedule.price" label="价格"/>
            <mu-auto-complete label="电影名" v-model="schedule.movieName" hintText="搜索电影" @input="handleInput" :dataSource="dataSource" @change="uHandlechange(index,arguments)" />
            <datetime zone="Asia/Shanghai" type="datetime" v-model="schedule.showTime"></datetime>
            <div class="scheduleOperate">
              <mu-raised-button @click="updateSchedule(index)" label="更新" primary/>
              <mu-raised-button @click="deleteSchedule(index)" label="删除" Secondary/>
            </div>
          </div>

        </div>
        <div class="addSchedule">
          <mu-text-field v-model="scheduleData.price" label="价格"/>
          <mu-auto-complete label="电影名" v-model="scheduleData.movieName"  @input="handleInput" :dataSource="dataSource" @change="handlechange" />
          <datetime zone="Asia/Shanghai" type="datetime" v-model="scheduleData.showTime"></datetime>
          <mu-raised-button @click="addSchedule" label="添加" primary/>
        </div>
      </mu-drawer>
    </div>
  </div>
</template>

<script>
// 明日计划 4.11
// element UI 已经安装
// 使用 table 组件完成 halls 列表及相关操作 包括 排期 等
// import { table as Etable } from 'element-ui'

// 明日计划 4.12
// 继续完成排期  数据已经准备好了。下一步是提交数据

export default {
  created() {
    document.title = this.$route.name;
    this.curUser.title = "影院详情页";
    const { cinemaId } = this.$route.params;
    this.getHall(cinemaId);
    // this.scheduleData.showTime = new Date().toISOString()
  },
  props: ["curUser"],
  data() {
    return {
      dataSource: [],
      hallList: [],
      drawerOpen: false,
      drawerDocked: false,
      curHall: {},
      curScheduleIndex: '',
      curScheduleList: [],
      searchDataByName: [],
      scheduleData: {
        movieName: '',
        movieId: '',
        showTime: '',
        price: ''
      }
    }
  },
  methods: {
    updateSchedule (index) {
      let {movieId, movieName, price, showTime, _id: scheduleId} = this.curScheduleList[index]
      showTime = Date.parse(new Date(showTime))
      const data = {
        movieId,
        movieName,
        price,
        showTime
      }
      this.$http.put(`/api/schedule/${scheduleId}`,data)
        .then(res=>{
          const data = res.data
          this.getSchedule()
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteSchedule (index) {

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
          this.searchDataByName = data
          this.dataSource = search
        })
        .catch(err=>{
          console.log(err)
        })
    },
    uHandlechange (index,arg) {
      const value = arg[0]
      if(value){
        for(const i in this.searchDataByName){
          if(this.searchDataByName[i].nm === value){
            this.curScheduleList[index].movieName= this.searchDataByName[i].nm
            this.curScheduleList[index].movieId= this.searchDataByName[i]._id
          }
        }
      }
    },
    handlechange (value) {
      if(value){
        for(const i in this.searchDataByName){
          if(this.searchDataByName[i].nm === value){
            this.scheduleData.movieName= this.searchDataByName[i].nm
            this.scheduleData.movieId= this.searchDataByName[i]._id
          }
        }
      }
      
    },
    getSchedule (ihallId) {
      let {_id: hallId} = this.curHall
      if(ihallId){
        hallId = ihallId
      }
      this.$http.get(`/api/schedule/${hallId}`)
        .then(res=>{
          const data = res.data
          console.log(data)
          for(const i in data){
            data[i].showTime = new Date(parseInt(data[i].showTime)).toISOString()
          }
          this.curScheduleList = data
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })

    },
    addSchedule () {
      const {hallName, _id: hallId, section: {seats, rows, cols}} = this.curHall
      let { movieName, movieId, showTime, price } = this.scheduleData
      showTime = Date.parse(new Date(showTime))
      let seatsLimit = 0
      let seatsNum = 0
      for(let i = 0; i < rows; i++){
        for(let j = 0;j< cols; j++){
          if(!seats[i][j].seatNo){
            seatsLimit++
          }
        }
      }

      const data = {
        movieName,
        movieId,
        showTime,
        seatsLimit,
        seatsNum,
        hallName,
        hallId,
        price
      }
      this.$http.post('/api/schedule',data)
        .then(res=>{
          const data = res.data
          this.getSchedule()
          const scheduleData = {
            movieName: '',
            movieId: '',
            showTime: '',
            price: ''
          }
          this.scheduleData = scheduleData
        })
        .catch(err=>{
          console.log(err)
        })
    },

    opneHallPlain (index) {
      this.curHall = this.hallList[index]
      this.drawerOpen = true
      this.getSchedule(this.hallList[index]._id)
    },
    drawerToggle () {
      const open = this.drawerOpen
      if(open){
        this.drawerOpen = false
      }else{
        this.drawerOpen = true
      }
    },
    getHall(cinemaId) {
      this.$http
        .get(`/api/hall/${cinemaId}`)
        .then(res => {
          const data = res.data;
          this.hallList = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="css" scoped>
a {
  color: #03a9f4;
}
.addScheduleBtn{
  display: flex;
}
.scheduleList .mu-text-field{
  width: 25%;
}
.vdatetime{
  display: inline;
}
.scheduleOperate .mu-raised-button{
  min-width: 40px;
  line-height: 30px;
  height: 30px;
}
.schedule{
   padding: 5px;
   border-bottom: 2px solid #7d56c3;
}
</style>
