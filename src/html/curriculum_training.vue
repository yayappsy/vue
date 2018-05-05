<template>
<div class="curriculum_training">
  <div class="banner"  v-on:mouseenter="stop()" v-on:mouseleave="move()">
    <div class="slider-container" id="slider-container" >
      <div class="slider_wrap" v-bind:style="{left:page.imgLeft+'px'}">
        <a target="_blank" class="" v-for="list in page.imgArray"><img :src="list" alt="2017寒假实习季"></a>
      </div>
      <div class="slider-prev" @click="page.imgLeft+=1080"></div>
      <div class="slider-next" @click="page.imgLeft-=1080"></div>
      <div class="shuffling-external">
        <span v-for="list in page.imgArrayLeft" class="shuffling" :class="{ 'shufflingActive': list==page.imgLeft }" @click="page.imgLeft=list">.</span>
      </div>
    </div>
  </div>
  <div class="subject">
    <div class="nav">
      <ul>
        <li v-for="list in getLabels" @click="ObtainCourseData(list.id)">{{list.name}}</li>
      </ul>
    </div>
    <div class="content">
      <router-link v-for="list in courseList" :to="{ name: 'course_details', params: { lists: JSON.stringify(list)}}" >
        <div class="list">
          <div class="list_img">
            <img :src="list.backImage" style="width: 240px;height: 180px;">
          </div>
          <div class="list_text">
            <p class="text_name">{{list.name}}</p>
            <p><div class="span">授课导师：</div><div class="fl">{{list.teacher}}</div></p>
            <p><div class="span">课程简介：</div><div  class="fl">{{list.intro}}</div></p>
            <p><div  class="span">适合人群：</div><div  class="fl">{{list.fitPeople}}</div></p>
          </div>
          <div class="list_erweima">
            <img :src="list.qrCode" alt="" style="width: 93px;height: 93px;">
            <div style="width: 93px;text-align: center;font-size: 14px;color: #5c5c5c">与我联系</div>
          </div>
        </div>
      </router-link>
    </div>
    <div id="pagebar" class="pagination" v-if="pageable.WhetherNotShown">
      <ul>
        <li :class="{'disabled':pageable.pageNo<=1}" @click="TurnThePage(1)"><a>首页</a></li>
        <li :class="{'disabled':pageable.pageNo<=1}" @click="TurnThePage(pageable.pageNo-1)"><a>上一页</a></li>
        <li v-for="list in pageable.pageNumber" :class="{'active':list.active}" @click="TurnThePage(list.Number)"><a>{{list.Number}}</a></li>
        <li :class="{'disabled':pageable.pageNo>=pageable.maxPage}" @click="TurnThePage(pageable.pageNo+1)"><a>下一页</a></li>
        <li :class="{'disabled':pageable.pageNo>=pageable.maxPage}" @click="TurnThePage(pageable.maxPage)"><a>尾页</a></li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    name: 'app',
    data() {//变量
      return {
        page: {
          routerCntent: " ",
          ifHomeLogin: false,
          imgLeft:0,
          imgArray: [],
          imgArrayLeft:[]
        },
        getLabels:[],
        courseList:[],
        //页数
        pageable:{
          pageNumber:[],
          WhetherNotShown:true,
          pageNo:1,
          maxPage:null
        },
        id:0
      }
    },
    mounted() {//初始化
      this.init();
      this.GetTheCourseLabel();
      this.play();
    },
    methods: {
      //初始化
      init () {
        this.GetTheRotations();
      },
      //获取轮播图数据
      GetTheRotations () {
        let _this=this;
        this.getData("/api/course/rollCourse",{}).then((res)=>{
          if(res.data.code==0){
            let num=0;
            res.data.data.forEach(function (element) {
//              console.log(element.isRoll==1)
              console.log(element);
              _this.page.imgArrayLeft.push(num*(-1080));
              _this.page.imgArray.push(element.backImage);
              num++;
            })
          }else{
            console.log(res.data.message)
          }
          console.log(this.page.imgArray)
        })
      },
      //获取课程标签
      GetTheCourseLabel () {
        this.getData("/api/course/getLabels",{}).then((res)=>{

          if(res.data.code==0){

            this.getLabels=res.data.data;
            console.log(this.getLabels[0].id);
            this.ObtainCourseData(this.getLabels[0].id);

          }else{
            console.log(res.data.message)
          }
        })
      },
      //获取课程数据
      ObtainCourseData(id){
        this.id=id
        this.courseList=[];
        this.getData("/api/course/courseList",{labelId:id,pageNo:this.pageable.pageNo,pageSize:4}).then((res)=>{
          if(res.data.code==0){
            //显示或隐藏页码
            if(res.data.data.courseDtos.length!=0){
              this.courseList=res.data.data.courseDtos;
              this.courseList.push(res.data.data.courseDtos[0]);
              console.log(this.courseList);
            }
            console.log(res.data.data);
            let able=res.data.data.pageable;
            let Number =Math.ceil(able.count/10);
            this.pageable.maxPage=Math.ceil(able.count/10);
            if(Number<=1){
              this.pageable.WhetherNotShown=false;
              console.log(this.pageable.WhetherNotShown);
            }else {
              this.pageable.pageNumber=[];
              this.pageable.WhetherNotShown=true;
              for(let i=1;i<=Number;i++){
                if(i==this.pageable.pageNo){
                  this.pageable.pageNumber.push({
                    Number:i,
                    active:true
                  })
                }else{
                  this.pageable.pageNumber.push({
                    Number:i,
                    active:false
                  })
                }
              }

            }
            //显示或隐藏页码

          }else{
            console.log(res.data.message)
          }
        })
      },
      autoPlay () {
        if(this.page.imgLeft<(this.page.imgArrayLeft.length-1)*(-1080)+100){
          this.page.imgLeft=0;
        }else{
          this.page.imgLeft-=1080;
        }
      },
      play () {
        this.timer = setInterval(this.autoPlay, 5000)
      },
      change (i) {
        this.mark = i
      },
      stop () {
        clearInterval(this.timer)
      },
      move () {
        this.timer = setInterval(this.autoPlay, 5000)
      },
      //翻页
      TurnThePage: function (t) {
        if(t>=1&&t<=this.pageable.maxPage){
          this.pageable.pageNo=t;
          this.ObtainCourseData(this.id);
        }
      },
    }
  }
</script>
<style>

  .banner{
    position: relative;
    overflow: hidden;
  }
  .slider_wrap{
    width: 3240px;
    position: absolute;
    top:0px;
    margin: 0;
    padding: 0;
  }
  .slider_wrap a{
    width: 1080px;
    height: 300px;
    float: left;
    margin: 0;
    padding: 0;
  }
  .slider_wrap img{
    width: 1080px;
    height: 300px;
    float: left;
    margin: 0;
    padding: 0;
  }
  .slider_wrap {
    -webkit-transition: all ease-out 0.5s;
    -moz-transition: all ease-out 0.5s;
    -ms-transition: all ease-out 0.5s;
    -o-transition: all ease-out 0.5s ;
    transition: all ease-out 0.5s;
  }
  .shuffling-external{
    position: absolute;
    bottom: 20px;
    left:444px;
    z-index: 999;
    font-size: 80px;
  }
  .shuffling{
    color: #fff;
    margin: 0 20px;
    cursor: pointer;
  }
  .banner{
    height: 300px;
  }
  .shufflingActive{
    color: #6aa2e4;
  }
  .curriculum_training{
    width: 1080px;
    margin: 0 auto;
  }
  .curriculum_training .nav{
    border-bottom: 1px solid #eee;
  }
  .curriculum_training .nav ul{
    width: 850px;
    height: 60px;
    margin: 0 auto;

  }
  .curriculum_training .nav li{
    float: left;
    line-height: 60px;
    font-size: 17px;
    text-align: center;
    margin: 0 auto;
    padding: 0 40px;
  }
  .curriculum_training .subject{

  }
  .curriculum_training .list{
    height: 180px;
    padding: 45px 0 35px 0;
    border-bottom: 1px solid #eee;
  }
  .curriculum_training .list>div{
    float: left;
  }
  .curriculum_training .list_img{
    width: 240px;
  }
  .curriculum_training .list_text{
    width: 670px;
    padding-left: 25px;
  }
  .curriculum_training .list_erweima{
    padding-top: 25px;
    width: 145px;
  }
  .curriculum_training .text_name{
    color: #1c1c1c;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 5px;
  }
  .curriculum_training  .list_text>p{
    margin-top: 1px;
  }
  .curriculum_training  .span{
    margin-top: 7px;
    background: #f5f5f5;
    border-radius: 5px;
    padding-left: 5px;
    color:#5c5c5c;
    float: left;
    width: 85px;
    font-size: 15px;
  }
  .curriculum_training  .fl{
    margin-top: 7px;
    width: 565px;
    padding-left: 10px;
    font-size: 15px;
    color: #5c5c5c
  }
  #pagebar {
    text-align: center;
    margin: 35px 0 30px 0;
    font-size: 14px;
  }
  li {
    list-style: none;
    cursor: pointer;
  }
  #pagebar li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    line-height: 30px;
    margin: 0 10px 10px 0;
    background: #b5d5e8;
    -webkit-transition: .2s;
    -moz-transition: .2s;
    transition: .2s;
    border-radius: 6px;
  }
  #pagebar li:hover {
    background: #6aa2e4;
  }
  #pagebar li a {
    display: block;
    text-align: center;
    min-width: 10px;
    padding: 0 10px;
    color: #fff;
    text-decoration: none;
  }
  #pagebar .active {
    background: #6aa2e4;
  }
  #pagebar .disabled {
    padding: 0 10px;
    cursor: default;
    color: #999;
    background-color: #f5f5f5;
  }
  #pagebar .disabled:hover {
    background: #b5d5e8;
    color: #fff;
  }
</style>
