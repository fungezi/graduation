<template lang="html">
  <div class="list">
    <!-- 电影列表 -->
    <mu-table :fixedHeader="true" :showCheckbox="false" >
        <mu-thead>
          <mu-tr>
            <mu-th>电影海报{{cat}}</mu-th>
            <mu-th>电影名称</mu-th>
            <mu-th>简介</mu-th>
            <!-- <mu-th>评分</mu-th> -->
            <mu-th>操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="movie of movies">
            <mu-td><img class="movie-poster" :src="movie.posterUrl"></mu-td>
            <mu-td><h3>{{ movie.nm }}</h3></mu-td>
            <mu-td>
              <p class="movie-introduction">{{ movie.dra }}</p></mu-td>
            <!-- <mu-td class="movie-rating">{{ movie.rating }}</mu-td> -->
            <mu-td>
              <mu-raised-button @click="showDetail(movie._id)" label="详细" primary/>
              <mu-raised-button @click="openEditMovieModal(movie)" label="修改" primary/>
              <mu-raised-button @click="removeMovie(movie)" label="删除" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
    </mu-table>
    <!-- 添加电影按钮 -->
    <mu-float-button icon="add" class="add-movie-button" backgroundColor @click="openAddMovieModal"/>
    <!-- 添加电影表单 -->
    <vodal :show="addMovieModal" animation="slideDown" :width="900" :height="720" :closeButton="false">
      <div class="movieTextField">
        <mu-text-field v-model="nm"  icon="movie" label="电影名称" labelFloat/>
        <!-- <mu-text-field v-model="cat"  icon="movie" label="电影类型" labelFloat/> -->
        <mu-select-field v-model="cat" icon="movie" label="电影类型" labelFloat>
          <mu-menu-item value="1" title="动作"/>
          <mu-menu-item value="2" title="武侠"/>
          <mu-menu-item value="3" title="科幻"/>
          <mu-menu-item value="4" title="古代"/>
          <mu-menu-item value="5" title="恐怖"/>
          <mu-menu-item value="6" title="情感"/>
        </mu-select-field>
        <mu-text-field v-model="dir" icon="movie" label="导演" labelFloat/>
        <mu-text-field v-model="src"  icon="movie" label="电影来源" labelFloat/>
        <mu-text-field v-model="dur"  icon="movie" label="电影时长" labelFloat/>
        <mu-text-field v-model="pubDesc"  icon="movie" label="上映时间" labelFloat/>
        <mu-text-field v-model="bgimg"  icon="movie" label="背景图" labelFloat/>
        <mu-text-field v-model="posterUrl" icon="picture_in_picture" label="海报地址" labelFloat/>
        <mu-text-field v-model="dra"
        multiLine :rows="1" :rowsMax="6"
      icon="description" label="简介" labelFloat/>
        <!-- <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/> -->
      </div>
      <div class="staff">
        <div class="staffs">
          <mu-chip v-for="staff,index of staffs" :key="index" class="demo-chip" @delete = "removeStaff(staff.name)" showDelete>
            <mu-avatar :size="32" :src="staff.photo"/> {{staff.name}} 饰演 {{staff.role}}
          </mu-chip>
        </div>
        <div class="oneStaff">
          <mu-text-field v-model="staff.name" label="演员名"/>
          <mu-text-field v-model="staff.photo" label="演员图片"/>
          <mu-text-field v-model="staff.role" label="饰演角色"/>
          <mu-raised-button @click="addStaff" label="添加" icon="check" primary/>
        </div>
      </div>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
      <mu-raised-button @click="addMovie" label="确定" icon="check" primary/>
    </vodal>
    <!-- 编辑电影表单 -->
    <vodal :show="editMovieModal" animation="slideDown" :width="900" :height="720" :closeButton="false">
      <div class="movieTextField">
        <mu-text-field v-model="nm" icon="movie" label="电影名称" labelFloat/>
        <!-- <mu-text-field v-model="cat" icon="movie" label="电影类型" labelFloat/> -->
        <mu-select-field v-model="cat" icon="movie" label="电影类型" labelFloat>
          <mu-menu-item value="1" title="动作"/>
          <mu-menu-item value="2" title="武侠"/>
          <mu-menu-item value="3" title="科幻"/>
          <mu-menu-item value="4" title="古代"/>
          <mu-menu-item value="5" title="恐怖"/>
          <mu-menu-item value="6" title="情感"/>
        </mu-select-field>
        <mu-text-field v-model="dir" icon="movie" label="导演" labelFloat/>
        <mu-text-field v-model="src" icon="movie" label="电影来源" labelFloat/>
        <mu-text-field v-model="dur" icon="movie" label="电影时长" labelFloat/>
        <mu-text-field v-model="pubDesc" icon="movie" label="上映时间" labelFloat/>
        <mu-text-field v-model="bgimg" icon="movie" label="背景图" labelFloat/>
        <mu-text-field v-model="posterUrl" icon="picture_in_picture" label="海报地址" labelFloat/>
        <mu-text-field v-model="dra"
        multiLine :rows="2" :rowsMax="6"
        fullWidth icon="description" label="简介" labelFloat/>
        <!-- <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/> -->
        <mu-switch label="电影是否上映" v-model="hasShow" class="demo-switch" />
      </div>
      <div class="staff">
        <div class="staffs">
          <mu-chip v-for="staff,index of staffs" :key="index" class="demo-chip" @delete = "removeStaff(staff.name)" showDelete>
            <mu-avatar :size="32" :src="staff.photo"/> {{staff.name}} 饰演 {{staff.role}}
          </mu-chip>
        </div>
        <div class="oneStaff">
          <mu-text-field v-model="staff.name" label="演员名"/>
          <mu-text-field v-model="staff.photo" label="演员图片"/>
          <mu-text-field v-model="staff.role" label="饰演角色"/>
          <mu-raised-button @click="addStaff" label="添加" icon="check" primary/>
        </div>
      </div>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
      <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
    </vodal>
  </div>
</template>

<script>
export default {
  created() {
    this.getMovies()
    this.curUser.title = "电影列表"
    document.title = this.$route.name
  },
  props: ["curUser"],
  components: {},
  data() {
    return {
      dir: '',
      nm: '',
      cat: 1,
      src: '',
      dur: '',
      pubDesc: '',
      dra: '',
      bgimg: '',
      posterUrl: '',
      hasShow: true,
      rating: null,
      movie_id: '',
      movies: [],
      addMovieModal: false,
      editMovieModal: false,
      staffs:[],
      staff:{
        name:'',
        role:'',
        photo:''
      }
    }
  },
  methods: {
    //添加演员
    addStaff () {
      const {name,role,photo} = this.staff
      if(name && role && photo){
        this.staffs.push({
          name: name,
          role: role,
          photo: photo
        })
      }
      this.staff = {
        name:'',
        role: '',
        photo: ''
      }
    },
    removeStaff (name) {
      const staffs = this.staffs
      const s = []
      for(const i in staffs){
        if(staffs[i].name !== name){
          s.push({
            name: staffs[i].name,
            role: staffs[i].role,
            photo: staffs[i].photo
          })
        }
      }
      this.staffs = s
    },
    // 获取所有电影的方法

    getMovies() {
      this.$http.get('/api/movie')
        .then(res => {
          console.dir(res.data)
          this.movies = res.data
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, 'ERROR!')
          console.log(err)
        })
    },
    // 打开添加电影modal的方法
    openAddMovieModal() {
      this.addMovieModal = true
    },
    // 打开编辑电影modal的方法
    openEditMovieModal(movie) {
      this.editMovieModal = true
      this.movie_id = movie._id
      this.dir = movie.dir
      this.nm = movie.nm
      this.cat = movie.cat
      this.src = movie.src
      this.dur = movie.dur
      this.pubDesc = movie.pubDesc
      this.dra = movie.dra
      this.bgimg = movie.bgimg
      this.posterUrl = movie.posterUrl
      this.staffs = movie.staff
      this.hasShow = movie.hasShow
    },
    // 关闭modal的方法
    closeModal() {
      this.addMovieModal = false
      this.editMovieModal = false
      this.movie_id = ''
      this.dir = ''
      this.nm = ''
      this.cat = ''
      this.src = ''
      this.dur = ''
      this.pubDesc = ''
      this.dra = ''
      this.bgimg = ''
      this.posterUrl = ''
      this.staffs = []
      this.hasShow = true
    },
    // 访问后端添加电影的方法
    addMovie() {
      const staff = []
      const staffs = this.staffs
      for(const i in staffs){
        staff.push({
          name: staffs[i].name,
          role: staffs[i].role,
          photo: staffs[i].photo
        })
      }
      const data = {
        dir: this.dir,
        nm: this.nm,
        cat: this.cat,
        src: this.src,
        dur: this.dur,
        pubDesc: this.pubDesc,
        dra: this.dra,
        bgimg: this.bgimg,
        posterUrl: this.posterUrl,
        staffs : staff,
        hasShow: this.hasShow
      }
      
      this.$http.post('/api/movie', data)
        .then(res => {
          this.toastr.success('添加电影成功')
          this.addMovieModal = false
          this.movie_id = ''
          this.dir = ''
          this.nm = ''
          this.cat = ''
          this.src = ''
          this.dur = ''
          this.pubDesc = ''
          this.dra = ''
          this.bgimg = ''
          this.posterUrl = ''
          this.hasShow = true
        })
        .catch(e => {
          this.toastr.warn('保存失败!')
          console.log(e)
        })
    },
    // 取消添加电影的方法
    cancelAddMovie() {
      this.addMovieModal = false
      this.movie_id = ''
      this.dir = ''
      this.nm = ''
      this.cat = ''
      this.src = ''
      this.dur = ''
      this.pubDesc = ''
      this.dra = ''
      this.bgimg = ''
      this.posterUrl = ''
      this.hasShow = true
    },
    // 访问后端编辑电影的方法
    editMovie() {
      let id = this.movie_id
      const staff = []
      const staffs = this.staffs
      for(const i in staffs){
        staff.push({
          name: staffs[i].name,
          role: staffs[i].role,
          photo: staffs[i].photo
        })
      }
      const data = {
        dir: this.dir,
        nm: this.nm,
        cat: this.cat,
        src: this.src,
        dur: this.dur,
        pubDesc: this.pubDesc,
        dra: this.dra,
        bgimg: this.bgimg,
        posterUrl: this.posterUrl,
        staff: staff,
        hasShow: this.hasShow
      }
      console.log(data)
      this.$http.put(`/api/movie/${id}`, data)
        .then(res => {
          this.toastr.success("更新电影成功!")
          this.closeModal()
          this.getMovies()
          this.movie_id = ''
          this.dir = ''
          this.nm = ''
          this.cat = ''
          this.src = ''
          this.dur = ''
          this.pubDesc = ''
          this.dra = ''
          this.bgimg = ''
          this.posterUrl = ''
          this.hasShow = true
        })
        .catch(err => console.log(err))
    },
    // 删除电影的方法
    removeMovie(movie) {
      let id = movie._id
      this.$http.delete(`/api/movie/${id}`)
        .then(res => {
          this.toastr.success("删除成功.")
          console.log(res.data)
          this.getMovies()
        })
        .catch(e => console.log(e))
    },
    // 跳转到电影详情页的方法
    showDetail(id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="css">
.mu-th {
  text-align: center !important;
}

.mu-td {
  text-align: center !important;
}

.movie-poster {
  width: 80px;
  padding: 4px 0;
}

.movie-introduction {
  white-space: normal;
  padding: 4px 4px;
  letter-spacing: 1px;
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
}

.vodal-dialog .mu-text-field{
  width: 50%;
  float: left;
  box-sizing: border-box;
}
.movieTextField{
  overflow: hidden;
}
.staff{
  padding: 20px;
}
.oneStaff{
  overflow: hidden;
}
.oneStaff .mu-text-field{
  width: 28%;
  float: left;
}
.oneStaff .mu-raised-button{
  width: 16%;
  float: left;
}
.add-movie-button{
  top: 100px;
}
</style>
