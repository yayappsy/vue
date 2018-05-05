<template>
  <div class="course_details">
    <div class="course_logo_top">
      <div class="course_logo">
        <img :src='lists.backImage' alt="">
      </div>
      <div class="mask"></div>
      <div class="text">
        <span class="industry">{{lists.industryName}}</span>
        <div class="career_name">
          <div class="name">{{lists.name}}</div>
          <div class="daxiao" v-if="lists.size==1">小班</div>
          <div class="daxiao" v-if="lists.size==2">中班</div>
          <div class="daxiao" v-if="lists.size==3">大班</div>
        </div>
      </div>
      <div class="kapian data">
        <span class="n">时间</span>
        <img src="../img/curriculum_training/date.png" alt="">
        <p>{{day}}天（{{lists.startDate}}-{{lists.endDate}}）</p>
      </div>

      <div  class="kapian mo">
        <span>价格</span>
        <img src="../img/curriculum_training/mo.png" alt="">
        <p>￥{{lists.price}}</p>
      </div>
      <div  class="kapian add">
        <span>地点</span>
        <img src="../img/curriculum_training/add.png" alt="">
        <p>{{lists.address}}</p>
      </div>
    </div>
    <div class="content">
      <div class="content_left">
        <div>
          <span class="name">{{lists.name}}</span>
          <div class="name_content" v-html="lists.content">
          </div>
        </div>
        <div class="xue">
          <span>你能学到什么：</span>
          <div v-html="lists.learn">
          </div>
        </div>
      </div>
      <div class="content_right">
        <div style="padding-top: 100px;text-align: center;padding-bottom: 10px;">
          <img src="http://39.106.117.195/image/658351592518957314.png" alt="" style="width: 135px;height: 135px;">
        </div>
        <p style="font-size: 12px;color:#999;text-align: center">扫码二维码咨询详情</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {//变量
      return {
        lists:{},
        day:0,
      }
    },
    mounted() {//初始化
      this.lists=JSON.parse(this.$route.params.lists);
      console.log(this.lists)
      this.CalculationDifferenceDays();
    },
    methods: {
      //计算相差天数
      CalculationDifferenceDays(){
        let d1=new Date(this.lists.startDate);
        let d2=new Date(this.lists.endDate);
        let d3=parseInt(d2 - d1);
        this.day=d3 / 1000 / 60 / 60 / 24;
      }
    }
  }
</script>
<style>
  .job_collect{
    border: 1px solid #fbda77;

    border-radius: 3px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: #fbda77;
    margin: 30px 20px 0px;
  }
  .job_star{
    margin-right: 20px;
  }
  .course_details{
    width: 1080px;
    margin: 0 auto;
  }
  .course_logo_top{
    width: 1080px;
    height: 300px;
    /*overflow: hidden;*/
    position: relative;
  }
  .course_details .course_logo{
    width: 1080px;
    height: 300px;
    overflow: hidden;
  }
  .course_details .mask{
    width: 1080px;
    height: 300px;
    opacity:0.6;
    background: #000;
    position: absolute;
    top:0px;
    left: 0px;
    z-index: 9;
  }
  .course_logo_top .text{
    position: absolute;
    top:75px;
    left: 0px;
    z-index: 19;
    color: #fff;
  }
  .course_logo_top .industry{
    color: #a6a5a4;
    font-size: 14px;
    padding-bottom: 10px;
  }
  .course_logo_top  .career_name>div{
    float: left;
  }
  .course_logo_top .name{
    font-size: 30px;
    color:#f4f4f4;
  }
  .course_logo_top .daxiao{
    color: #fbda77;
    line-height: 24px;
    margin-top: 8px;
    border: 1px solid #fbda77;
    padding: 0 15px 0 15px;
  }
  .course_logo_top .kapian{
    padding: 10px 15px 0 20px;
    position: absolute;
    bottom: 0px;
    width: 135px;
    height: 77px;
    background: rgba(255,255,255,0.3);
    z-index: 99;
    border-radius: 5px 5px 0 0 ;
  }
  .course_logo_top  .data{
    left: 0px;
  }
  .course_logo_top  .mo{
    left: 180px;
  }
  .course_logo_top  .add{
    left: 360px;
  }
  .course_logo_top  .kapian>span{
    font-size: 25px;
    color: #fff;
  }
  .course_logo_top .kapian>img{
    float: right;
  }
  .course_logo_top .kapian>p{
    font-size: 12px;
    color: #fff;
    padding-top: 10px;
  }
  .course_details .content{
    padding-top: 30px;
    position: relative;
    min-height: 500px;
  }
  .course_details .content_right{
    width: 250px;
    position: absolute;
    right: 0px;
    top:0px;
    background: #fff;
  }
  .course_details .content_left{
    background: #fff;
    width: 750px;
    padding-left: 0px;
    margin-bottom: 30px;
  }
  .course_details .content_left .name {
    font-size: 18px;
    font-weight: bold;
    line-height: 45px;
    color:#333;
  }
  .course_details .content_left  .xijie{
    font-size: 14px;
    color: #666;padding-left: 80px;
  }
  .course_details .content_left  .xijie>p{
    line-height: 27px;
  }
  .course_details .content_left .sanjibiaoti{
    color:#333;
  }
  .course_details .content_left .name_content{
    position: relative;
    padding-top: 10px;
  }
  .course_details .content_left .zhankai{
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-size: 18px;
    color:#69a2e5;
  }
  .course_details .content_left .xue{
    padding-top: 40px;
  }
  .course_details .content_left .xue>span{
    color:#69a2e5;
  }
  .course_details .content_left .xue>div{
    padding-top: 20px;
    font-size: 14px;
    color: #666;padding-left: 80px;
    line-height: 25px;
  }

</style>
