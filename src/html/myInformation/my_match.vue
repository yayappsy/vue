<template>
  <div class="guess-content">
    <div class="content-title">
      <span class="title active">推荐职位</span>
    </div>
    <ul>
      <li class="info-list"  v-for="list in JobDto">
        <div class="left-content">
          <a class="intern-name">
            <div class="intern-name-btn interest-btn">{{list.name}}</div>
          </a>
          <div><a class="cutom_font link">{{list.companyDto.shortName}}</a> - <span>{{list.jobLabel}}</span>
          </div>
        </div>
        <div class="center-content">
          <div class="addr">
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_10.png?v=d48ec07cec9ddecce51147cecd216171">
            <span class="addr_city">{{list.area.name}}</span></div>
          <div class="xz">
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_17.png?v=fac8e686636c06166246f62531a07b56">
            <span class="cutom_font">
              <i class="money"></i>{{list.lowest}}-{{list.highest}}/天
            </span>
            <span class="line">|</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_19.png?v=2f3bd39eae1f92a6852388ff53e2f5e7">
            <span class="cutom_font">{{list.dayNumber}}天/周</span><span class="line">|</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_21.png?v=c6726c9ad768ef881bb73ec1dba5e120">
            <span class="cutom_font">{{list.practiceMonth}}个月</span>
          </div>
        </div>
        <div class="right-content">
          <router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}" target="_blank">
            <div class="like-btn interest-btn">了解一下</div>
          </router-link>
          <!--<span class="not-like-btn">不感兴趣</span>-->
        </div>
      </li>
    </ul>
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
</template>
<script>
  export default {
    name: 'app',
    data() {//变量
      return {
        JobDto:[],
        //页数
        pageable:{
          pageNumber:[],
          WhetherNotShown:true,
          pageNo:1,
          maxPage:null
        },
        ChooseToCreate: false,
        id: "",
        resumeData: {
          num0: {},
          num1: {}
        },
        reJobIn:[],
        lis:3,
        left:0,
        data:{
          resumeId:'',
          getHopePractice:{},
        },
        searchCriteria:{
          areaId: "",
          companyId: "",
          homeShow:"3",
          industryId: "",
          isPush: '1',
          isWorker: "",
          maxDayMoney: null,
          minDayMoney: null,
          mixEducational: null,
          practiceDay: null,
          minPracticeMonth:null,
          maxPracticeMonth:null,
          searchName: "",
          sortWay: null,
          state: "1"

        },
      }
    },
    mounted() {
      this.id = JSON.parse(window.localStorage.getItem('S_id')).id;
      //this.init();
      this.getdata2();
    },
    methods: {
      // init(){
      //   this.postData("/api/userInfo/myResumeList", {memberId:this.id.toString()}).then((res) => {
      //     if (res.data.code == 0) {
      //       res.data.data.forEach()
      //       if(res.data.data[0].resumeId==''){
      //         if(res.data.data[1].resumeId==''){
      //           this.data.resumeId="";
      //         }else{
      //           this.data.resumeId=res.data.data[1].resumeId;
      //         }
      //       }else{
      //         this.data.resumeId=res.data.data[0].resumeId;
      //       }
      //     }else{
      //       console.log(res.data.message)
      //     }
      //   })
      //   //期望实习
      //   if(this.data.resumeId!=""){
      //     this.getData("/api/resume/getHopePractice", {id: this.data.resumeId}).then((res) => {
      //       console.log(res.data.data)
      //       if (res.data.code == 0) {
      //         if(res.data.data){
      //           this.data.getHopePractice = res.data.data;
      //           this.searchCriteria.areaId = res.data.data.city.id;
      //           this.searchCriteria.searchName=res.data.data.position;
      //           this.searchCriteria.maxPracticeMonth=res.data.data.months;
      //           this.searchCriteria.minPracticeMonth =res.data.data.months;
      //           this.searchCriteria.practiceDay =res.data.data.days;
      //         }
      //
      //         this.getdata2();
      //       } else {
      //         console.log(res.data.message);
      //       }
      //     });
      //   }
      // },
      //获取期望实习
      // getHopePractice(id){
      //   this.getData("/api/resume/getHopePractice", {id: id}).then((res) => {
      //     console.log(res.data.data)
      //     if (res.data.code == 0) {
      //       if(res.data.data){
      //         this.data.getHopePractice = res.data.data;
      //         this.searchCriteria.areaId = res.data.data.city.id;
      //         this.searchCriteria.searchName=res.data.data.position;
      //         this.searchCriteria.maxPracticeMonth=res.data.data.months;
      //         this.searchCriteria.minPracticeMonth =res.data.data.months;
      //         this.searchCriteria.practiceDay =res.data.data.days;
      //       }
      //       this.getdata2();
      //     } else {
      //       console.log(res.data.message);
      //     }
      //   });
      // },
      //翻页
      TurnThePage:function (t) {
        if(t>=1&&t<=this.pageable.maxPage){
          this.pageable.pageNo=t;
          this.getdata2();
        }
      },
    //获取推荐职位
      getdata2(){
        this.postData("/api/jobManager/jobRecommend",{userId:this.id,pageNo:this.pageable.pageNo,pageSize:5}).then((res) => {
          //显示或隐藏页码
          let able=res.data.data.pageable;
          let Number =Math.ceil(able.count/5);
          this.pageable.maxPage=Math.ceil(able.count/5);
          //console.log(Number)
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
          //向页面输出数据

          this.JobDto=res.data.data.jobDtos;
          console.log(this.JobDto);

          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      }
    }
  }
</script>
<style lang="scss">
  .guess-content{
    .title {
      display: inline-block;
      text-align: center;
      font-size: 18px;
      height: 60px;
      width: 120px;
      line-height: 60px;
      color: #cbcbcb;
      cursor: pointer;
    }
    .title.active {
      color: #333;
      /* font-weight: bolder; */
      height: 58px;
      border-bottom: 2px solid #333;
    }
    .content-title {
      height: 59px;
      border-bottom: solid 1px #f5f5f5;
      line-height: 60px;
    }
    .info-list {
      position: relative;
      height: 105px;
      padding: 5px 20px 5px 20px;
      border-bottom: 1px solid #f5f5f5;
    }
    .left-content {
      width: 240px;
      float: left;
      /* padding-left: 20px; */
    }
    .intern-name {
      display: block;
    }
    .left-content .intern-name-btn {
      font-size: 16px;
      max-width: 220px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #000;
      line-height: 70px;
      display: inline-block;
    }
    .link {
      color: #6aa2e4;
    }
    .center-content {
      width: 340px;
      float: left;
    }
    .intern-name a, .addr {
      color: #000;
      line-height: 70px;
      font-size: 16px;
      max-width: 300px;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .center-content span:nth-child(2) {
      display: inline-block;
      width: 92px;
    }
    .addr .addr_city {
      width: 200px!important;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: top;
    }
    .center-content span {
      display: inline-block;
      padding: 0 4px;
    }
    .right-content {
      float: right;
    }
    .right-content .not-like-btn, .not-collect-btn {
      display: inline-block;
      width: 95px;
      text-align: center;
      margin-top: 8px;
      padding: 1px 0;
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
    .like-btn {
      width: 94px;
      text-align: center;
      margin-top: 40px;
      /* background-color: #6aa2e4; */
      padding: 2px 0;
      color: #6aa2e4;
      border: 1px solid #6aa2e4;
      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>
