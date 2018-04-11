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
              <mu-raised-button @click="opneHallPlain(index)" label="排期" primary/>
            </mu-td> 
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-drawer :width="500" :open="drawerOpen" :docked="drawerDocked" @close="drawerToggle()">
        <div class="scheduleList">
          <div v-for="schedule,index in curScheduleList" :key="index" class="schedule">

          </div>

        </div>
        <div class="addSchedule">
          <mu-text-field v-model="scheduleData.price" label="价格"/>
          <mu-auto-complete v-model="scheduleData.movieName" hintText="搜索电影" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
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
    this.scheduleData.showTime = new Date().toISOString()
  },
  props: ["curUser"],
  data() {
    return {
      dataSource: [],
      hallList: [],
      drawerOpen: false,
      drawerDocked: false,
      curHall: {},
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
    handlechange (value) {
      console.log(1,value)
      if(value){
        for(const i in this.searchDataByName){
          if(this.searchDataByName[i].nm === value){
            this.scheduleData.movieName= this.searchDataByName[i].nm
            this.scheduleData.movieId= this.searchDataByName[i]._id
          }
        }
      }
      
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
        hallId
      }
      console.log(data)
      // this.$http.post('/api/schedule',{})
    },

    opneHallPlain (index) {
      this.curHall = this.hallList[index]
      this.drawerOpen = true
      this.$http.get('/api/schedule')
        .then(res=>{
          const data = res.data
          this.curScheduleList = data
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    drawerToggle () {
      const open = this.drawerOpen
      if(open){
        this.drawerOpen = false
      }else{
        this.drawerOpen = true
      }
    },
    getCinema(cinemaId) {},
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
</style>
