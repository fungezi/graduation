<template lang="html">
   <div class="orderContain">
      <!-- 订单详情的开发 订单列表 退款 -->
      <div class="order">
        <div class="orderHeader">
          <span class="img">图片</span>
          <span class="movieName">电影名</span>
          <span class="length">票数</span>
          <span class="seat">
            座位
          </span>
          <span class="price">单价</span>
          <span class="total">共计</span>
        </div>
        <div class="oDetail" v-for=" order, index in orderList " :key="index">
          <div class="oMask">
            <div class="oiMask"></div>
            <div v-show="order.order.status===1?true:false" class="payItBtn">
              <mu-raised-button label="订单过期" class="demo-raised-button"/>
            </div>
            <div v-show="order.order.status===2?true:false" class="payItBtn">
              <mu-raised-button label="付款" class="demo-raised-button" secondary/>
              <mu-raised-button label="取消订单" class="demo-raised-button"/>
            </div>
          </div>
          <div class="cinemaName">影院：{{order.order.cinemaName}}</div>
          <div class="ticket">
            <span class="img"><img class="imgCon" :src="order.order.posterUrl"></span>
            <span class="movieName">{{order.order.movieName}}</span>
            <span class="length">{{order.order.seats.length}}</span>
            <span class="seat">
              座位详情
              <div class="seatShow">
                <div class="seatShowItem" v-for=" seat, index in order.order.seats " :key="index">
                  {{seat.row + 1}} 排 - {{seat.col + 1}} 列
                </div>
              </div>
            </span>
            <span class="price">￥ {{order.price}}</span>
            <span class="total">￥ {{order.price * order.order.seats.length}}</span>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
export default {
  created() {
    document.title = this.$route.name;
    this.curUser.title = "订单详情";
    const { id: orderId } = this.$route.params;
    // this.getOrderDetail(orderId);
    this.getOrderList()
  },
  mounted () {
    this.triggerSeats = this.$refs.button.$el
  },
  props: ["curUser"],
  data() {
    return {
      seatValue: "座位详情",
      order: {},
      orderList: []
    };
  },
  
  methods: {
    handleSeatsClose (value) {
      this.value = value
    },
    getOrderList () {
      this.$http.get(`/api/order`)
        .then(res=>{
          const data = res.data
          for(let i = 0;i<data.length;i++){
            if(parseInt(data[i].order.showTime) <= new Date().getTime() ) {
              //订单状态 1：过期 2：可付款 3：无此票
              data[i].order.status = 1
            }else {
              data[i].order.status = 2
            }
          }
          this.orderList = data
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getOrderDetail(orderId) {
      this.$http
        .get(`/api/order/${orderId}`)
        .then(res => {
          const data = res.data;
          this.order = data
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="css" scoped>
.oMask{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 3;
}
.payItBtn{
  display:inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.oDetail:hover .oMask{
  display: block;
}
.seatShowItem{
  display: inline-block;
  background-color: #f2f2f2;
  padding: 3px;
  margin: 2px;
  border-radius: 4px;
  font-size: 12px;
  color: #6b6868;
}
.cinemaName{
  text-align: left;
  background-color: #01130b0f;
  padding: 4px;
  margin-bottom: 8px;
}
.oMask{
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.58);
}
.orderContain{
  background-color: #f2f2f2 !important;
  width: 100%;
  height: 100%;
}
a {
  color: #03a9f4;
}
.oDetail{
  margin: 8px 0px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
}
.orderContain{
  width: 100%;
}
.order{
  display: inline-block;
  margin: 16px auto;
  
}
.orderHeader span{
  display: inline-block;
}
.ticket{
  display: table;
}
.ticket span{
  display: table-cell;
  height: 100%;
  vertical-align: middle;
}
.img{
  width: 100px;
}
.ticket .img{
  width: 100px;
}
.ticket .img .imgCon{
  width: 100px;
}
.img img{
  width: 100%;
  display: block;
}
.movieName{
  width: 150px;
}
.length{
  width: 50px;
}
.seat{
  width: 100px;
}
.price{
  width: 80px;
}
.total{
  width: 100px;
}
</style>
