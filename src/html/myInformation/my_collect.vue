<template>
  <div class="collect-content">
    <div class="content-title">
      <a><span class="title" :class="{active:qiehaun}" @click="ClickQieHuan(1)">职位收藏</span></a>
      <!--<a><span class="title " :class="{active:!qiehaun}"  @click="ClickQieHuan(2)">公司收藏</span></a>-->
      <!--<a class="link refresh-btn" id="remove_offline_btn">下线职位一键移除</a>-->
    </div>
    <ul>
      <li class="info-list" v-for="list in myCollectJob">
        <div class="left-content">
          <div class="intern-name"><router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}" target="_blank">{{list.name}}</router-link></div>
          <div><a class="cutom_font link">{{list.companyDto.shortName}}</a> - <span>{{list.jobLabel}}</span></div>
        </div>
        <div class="center-content">
          <div class="addr">
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_10.png?v=d48ec07cec9ddecce51147cecd216171">
            <span class="addr_city">{{list.area.name}}</span>
          </div>
          <div class="xz">
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_17.png?v=fac8e686636c06166246f62531a07b56">
            <span class="cutom_font">
              <i class="money"></i>{{list.lowest}}-{{list.highest}}/天
            </span>
            <span class="line">|</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_19.png?v=2f3bd39eae1f92a6852388ff53e2f5e7">
            <span class="cutom_font">{{list.dayNumber}}天/周</span>
            <span class="line">|</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/new_main/img/img_21.png?v=c6726c9ad768ef881bb73ec1dba5e120">
            <span class="cutom_font">{{list.practiceMonth}}个月</span>
          </div>
        </div>
        <div class="right-content">
          <router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}" target="_blank">
            <div class="like-btn interest-btn">了解一下</div>
          </router-link>
          <span class="not-collect-btn" @click="cancelJobCollect(list.id)">取消收藏</span>
        </div>
      </li>
    </ul>
    <ul>
      <li class="com-info-list" v-for="list in myCollectCompany">
        <div class="left-content-2">
          <img class="company-logo" :src="list.logo" alt="" width="80">
        </div>
        <div class="center-content-2">
          <div class="company-name"><router-link target="_blank" class="com-con" :to="{ name: 'company_home', params: { CompanyData: JSON.stringify(list)}}">{{list.shortName}}</router-link></div>
          <span>{{list.mainBusinessDescription}}</span>
        </div>
        <div class="right-content">
          <router-link :to="{ name: 'company_home', params: { searchData: JSON.stringify(list)}}" target="_blank">
            <div class="like-btn interest-btn">了解一下</div>
          </router-link>
          <span class="not-collect-btn" @click="Deldata2(list.id)">取消收藏</span>
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
        qiehaun:true,
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
        myCollectJob:[],
        myCollectCompany:[],
        num:0,
      }
    },
    mounted() {
      this.id = JSON.parse(window.localStorage.getItem('S_id')).id;
      this.init();
      this.getdata2();
    },
    methods: {
      init(){
        this.postData("/api/userInfo/myResumeList", {memberId:this.id.toString()}).then((res) => {
          if (res.data.code == 0) {
            if(res.data.data[0].resumeId==''){
              if(res.data.data[1].resumeId==''){
                this.data.resumeId="";
              }else{
                this.data.resumeId=res.data.data[1].resumeId;
              }
            }else{
              this.data.resumeId=res.data.data[0].resumeId;
            }
          }else{
            console.log(res.data.message)
          }
        })

        //期望实习
        if(this.data.resumeId!=""){
          this.getData("/api/resume/getHopePractice", {id: this.data.resumeId}).then((res) => {
            console.log(res.data.data)
            if (res.data.code == 0) {
              if(res.data.data){
                this.data.getHopePractice = res.data.data;
                this.searchCriteria.areaId = res.data.data.city.id;
                this.searchCriteria.searchName=res.data.data.position;
                this.searchCriteria.maxPracticeMonth=res.data.data.months;
                this.searchCriteria.minPracticeMonth =res.data.data.months;
                this.searchCriteria.practiceDay =res.data.data.days;
              }
              this.getdata2();
            } else {
              console.log(res.data.message);
            }
          });
        }
      },
      ClickQieHuan(num){
        this.num=num;
        if(num==1){
          this.qiehaun=true;
          this.getdata2();
        }else if(num==2){
          this.qiehaun=false;
          this.getdata3();
        }
      },
      //翻页
      TurnThePage:function (t) {
        if(t>=1&&t<=this.pageable.maxPage){
          this.pageable.pageNo=t;
          if(this.num==1){
            this.getdata2();
          }else if(this.num==2){
            this.getdata3();
          }
        }
      },
      //取消收藏职位
      cancelJobCollect(jobId){
        this.postData("/api/userInfo/cancelJobCollect",{numberId:this.id,jobId:jobId}).then((res) => {
          if(res.data.code==0){
            this.getdata2();
          }else{
            console.log(res.data)
          }
        })
      },

      //获取收藏的职位
      getdata2(){
        this.myCollectCompany=[];
        this.postData("/api/userInfo/myCollectJob",{mumberId:this.id,pageNo:this.pageable.pageNo,pageSize:5}).then((res) => {
          //显示或隐藏页码
          let able=res.data.data.pageable;
          let Number =Math.ceil(able.count/5);
          this.pageable.maxPage=Math.ceil(able.count/5);
          console.log(this.myCollectJob)
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

          this.myCollectJob=res.data.data.jobDtos;

          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      },
      //获取藏的公司
      getdata3(){
        this.myCollectJob=[];
        this.postData("/api/userInfo/myCollectCompany",{memberId:this.id,pageNo:this.pageable.pageNo,pageSize:5}).then((res) => {
          //显示或隐藏页码
          console.log(res)
          let able=res.data.data.pageable;
          let Number =Math.ceil(able.count/5);
          this.pageable.maxPage=Math.ceil(able.count/5);
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

          this.myCollectCompany=res.data.data.companyDtos;
            //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      },
      //取消抽藏公司
      Deldata2(Cid){
        this.postData("/api/userInfo/cancelCompanyCollect",{numberId:this.id,companyId:Cid}).then((res) => {
          this.getdata3()
        }, (err) => {
          console.log(err)
        });
      },
    }
  }
</script>

<style lang="scss">
  .collect-content{
    .refresh-btn {
      float: right;
      margin-right: 20px;
    }
    .com-info-list {
      height: 116px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
    }
    .left-content-2 {
      width: 100px;
      float: left;
    }
    .company-logo {
      margin-top: 18px;
      width: 82px;
      height: 82px;
      background-color: #f8f8f8;
      border-radius: 5px;
      border: 1px solid #eee;
    }
    .center-content-2 {
      width: 420px;
      float: left;
      margin-left: 20px;
    }
    .company-name {
      margin-top: 0px;
    }
    .company-name a {
      display: inline-block;
      font-size: 20px;
      /* font-weight: bolder; */
      color: #000;
      margin: 20px 0;
    }
    .center-content-2 span {
      color: #b4b4b4;
    }
    .right-content-2 {
      float: right;
    }
    .right-content-2 .not-collect-btn {
      display: inline-block;
      width: 95px;
      text-align: center;
      line-height: 110px;
      margin-top:0px;
      color: #999;
      cursor: pointer;
      font-size: 14px;
    }
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
