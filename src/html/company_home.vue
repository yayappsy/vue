<template>
  <div class="company_home">
    <div class="com-header bgs" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/com_icon_bg.png)">
      <img :src="CompanyData.logo"  class="com_icon bgs">
      <div class="com_name">{{CompanyData.name}}</div>
      <div class="com_introduce">{{CompanyData.mainBusinessDescription}}</div>
      <div class="com_msg">
        <span class="com_position">{{CompanyData.area.name}}</span>
        <span class="com_num">{{CompanyData.size}}</span>
        <span class="com_class">{{CompanyData.mainBusinessDescription }}</span>
      </div>
    </div>

    <div class="com-nav">
      <div class="com-nav_item" style="width: 540px;" :class="{nav_item_active:nav_item_active0}" @click="nav_item_active0=true;l_letf=0;div1=true;">公司主页</div>
      <div class="com-nav_item" style="width: 540px;" :class="{nav_item_active:!nav_item_active0}"  @click="nav_item_active0=false;l_letf=540;div1=false;">在招职位</div>
      <div class="blue_line" :style="{left:l_letf+'px',width: 540+'px',opacity: 1}"></div>
    </div>
    <div class="com-content">
      <div class="content_left">
        <div class="content_com " v-if="div1">
          <div class="com_item">
            <div class="com_til">企业介绍</div>
            <div class="com_detail"><p>{{CompanyData.introduce}}</p></div>
          </div>
          <div class="com_item">
            <div class="com_til">热招职位<span class="job_search"  @click="nav_item_active0=false;l_letf=540;div1=false;">查看更多</span></div>
            <div class="job_list" v-for="list in positionData">
              <router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}" class="job_item">
                <div class="job_name cutom_font">{{list.name}}</div>
                <div class="job_time cutom_font">
                  <span data-sa="click">{{list.updateTime}}</span>
                  <span class="paddinglr">刷新</span></div>
                <div class="job_msg">
                  <img src="/static/img/img_10.d48ec07.png">
                  <span class="job_position">{{list.area.name}}</span>
                  <span class="line">|</span>
                  <img src="/static/img/img_17.fac8e68.png">
                  <span class="job_money cutom_font">{{list.lowest}}-{{list.highest}}/天</span>
                  <span class="line">|</span>
                  <img src="/static/img/img_19.2f3bd39.png">
                  <span class="job_week cutom_font">{{list.dayNumber}}天以上</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="content_com " v-if="!div1">
          <div class="job_nav">
            <span class="job_nav_item" :class="{job_nav_item_active:currentActive}" @click="current()">全部</span>
            <span class="job_nav_item"  v-for="(list,index) in getLabels" :class="{job_nav_item_active:currentIndex==index}" @click="xuanzehangye(index,list)">{{list}}</span>
          </div>
          <div class="all_job" v-for="list in positionData2">
            <router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}" class="job_item" >
              <div class="job_name cutom_font">{{list.name}}</div>
              <div class="job_time cutom_font">
                <span data-sa="click">{{list.updateTime}}</span>
                <span class="paddinglr">刷新</span></div>
              <div class="job_msg">
                <img src="/static/img/img_10.d48ec07.png">
                <span class="job_position">{{list.city}}</span>
                <span class="line">|</span>
                <img src="/static/img/img_17.fac8e68.png">
                <span class="job_money cutom_font">{{list.lowest}}-{{list.highest}}/天</span>
                <span class="line">|</span>
                <img src="/static/img/img_19.2f3bd39.png">
                <span class="job_week cutom_font">{{list.dayNumber}}天以上</span>
              </div>
            </router-link>
            <div class="block"></div>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="com_item">
          <div class="com_til">企业资料</div>
          <div class="com_detail">{{CompanyData.name}}</div>
          <a class="com_link" target="_blank" :href="CompanyData.site" rel="nofollow">{{CompanyData.site}}</a>
        </div>
        <!--<div class="com_item">-->
          <!--<div class="com_til">工商信息</div>-->
          <!--<div class="com_detail" title="有限责任公司">公司类型：有限责任公司</div>-->
          <!--<div class="com_detail">注册号：320192000021658</div>-->
          <!--<div class="com_detail">成立日期：2014-09-16</div>-->
          <!--<div class="com_detail">注册资本：133万元人民币</div>-->
        <!--</div>-->
        <div class="com_item">
          <div class="com_til">企业福利</div>
          <div class="com_detail"> <span v-for="list in CompanyWeal">{{list}}</span></div>
        </div>
      </div>
      <div class="block"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {//变量
      return {
        currentIndex:"",
        nav_item_active0:true,
        l_letf:0,
        div1:true,
        currentActive:true,//判断是否选中全部
        CompanyData:{},
        positionData:[],
        positionData2:[],
        searchCriteria:{
          areaId: "",
          companyId: "",
          homeShow:"",
          industryId: "",
          isPush: '',
          isWorker: "",
          maxDayMoney: null,
          minDayMoney: null,
          mixEducational: null,
          practiceDay: null,
          minPracticeMonth:null,
          maxPracticeMonth:null,
          searchName: "",
          sortWay: null,
          state: ""
        },
        CompanyWeal:[],
        getLabels:[],
      }
    },
    mounted () {//初始化
      this.CompanyData=JSON.parse(this.$route.params.CompanyData);//获取传过来的值
      console.log(this.CompanyData);
      this.searchCriteria.companyId=this.CompanyData.id
      this.getEnterpriseJobLabel();
      this.getPosition();
      this.getPosition2();
      this.getCompanyWeal();
    },
    methods:{//方法
      //选择行业
      xuanzehangye(index,name){
        this.currentActive=false;
        this.currentIndex=index;
        this.searchCriteria.industryId=name;
        this.getPosition2();
      },
      //显示举报
      reportShow:function () {
        $(".jb-box").css("display","block");
        $("#shade").css("display","block");
      },
      //隐藏举报
      reportHide:function () {
        $(".jb-box").css("display","none");
        $("#shade").css("display","none");
      },
      //获取热招
      getPosition:function () {
        this.searchCriteria.homeShow='1';
        this.postData("/api/homepage/jobSearch",{pageNo:1,pageSize:3},this.searchCriteria).then((res) => {
          //向页面输出数据
          console.log(res.data.data.jobDtos)
          this.positionData=res.data.data.jobDtos;
          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      },
      //获取该公司所有职业
      getPosition2:function () {
        this.searchCriteria.homeShow='';
        this.postData("/api/homepage/jobSearch",{pageNo:1,pageSize:100},this.searchCriteria).then((res) => {
          //向页面输出数据
          console.log()
          this.positionData2=res.data.data.jobDtos;
          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      },
      //选择职位“全部”
      current(){
        this.currentActive=true;
        this.currentIndex=null;
        this.searchCriteria.industryId=null;
        this.getPosition2();
      },
      //获取企业职位标签
      getEnterpriseJobLabel(){
        this.postData("/api/companyDetail/getLabels",{companyId:this.CompanyData.id}).then((res) => {
          //向页面输出数据
          console.log(res.data.data)
          this.getLabels=res.data.data;
          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      },
      //获取企业福利
      getCompanyWeal(){
        this.postData("/api/companyDetail/getCompanyWeal",{companyId:this.CompanyData.id}).then((res) => {
          //向页面输出数据
          this.CompanyWeal=res.data.data;
          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      }
    }
  }
</script>
<style>
  .company_home{}
  .company_home {
    position: relative;
    max-width: 1080px;
    width: 100%;
    height: 100%;
    margin: 35px auto 20px;
    color: #333;
  }
  .com-header {
    position: relative;
    height: 118px;
    padding: 38px 0 40px 160px;
  }
  .bgs {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .com-header .com_icon {
    position: absolute;
    width: 120px;
    height: 120px;
    top: 38px;
    left: 0;
  }
  .com-header .com_name {
    position: relative;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .com_introduce {
    position: relative;
    max-height: 350px;
    overflow: hidden;
    -webkit-transition: all .8s;
    -moz-transition: all .8s;
    -o-transition: all .8s;
    transition: all .8s;
  }
  .com-header .com_introduce, .com-header .com_msg {
    position: relative;
    font-size: 14px;
    padding-top: 16px;
  }
  .com-header .com_msg > span:first-child {
    padding-left: 0;
  }

  .com-header .com_msg > span:before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 1px;
    height: 13px;
    background-color: #333;
    left: 0;
    top: 3px;
  }
  .com-header .com_msg >  .com_position:before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 0px;
    height: 13px;
    background-color: #333;
    left: 0;
    top: 3px;
  }
  .com-header .com_msg > span {
    position: relative;
    padding: 0 20px;
  }
  .com-nav {
    position: relative;
    height: 60px;
    width: 100%;
    font-size: 0;
    letter-spacing: 0;
  }
  .com-nav .com-nav_item {
    position: relative;
    display: inline-block;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #fafafa;
    color: #949698;
    font-size: 18px;
    cursor: pointer;
  }
  .com-nav .nav_item_active {
    color: #6aa2e4;
    background-color: #fff;
  }
  .com-nav .blue_line {
    display: inline-block;
    left: 0;
    height: 2px;
    background-color: #6aa2e4;
    position: absolute;
    bottom: 0;
    -webkit-transition: all .25s ease-out;
    -moz-transition: all .25s ease-out;
    -o-transition: all .25s ease-out;
    transition: all .25s ease-out;
  }
  .com-content {
    padding-top: 30px;
  }
  .com-content, .content_com {
    position: relative;
    width: 100%;
    color: #333;
  }
  .com_item {
    position: relative;
    width: 100%;
    padding-top: 30px;
  }
  .content_left {
    position: relative;
    width: 700px;
    padding: 0 20px;
    min-height: 500px;
    background-color: #fbfbfb;
  }
  .content_com {
    /*display: none;*/
  }
  .content_com_show {
    display: block;
  }
  .com_item .com_til {
    position: relative;
    font-size: 20px;
    padding-bottom: 16px;
  }
  .com_item .com_detail, .com_item .com_link {
    position: relative;
    font-size: 14px;
    line-height: 26px;
    word-break: break-all;
  }
  .com_detail * {
    line-height: 21px!important;
    font-size: 14px!important;
    color: #333!important;
  }
  .com_item .com_til > span {
    margin-top: 10px;
  }
  .com_item .com_til > span, .com_item .com_til > a {
    position: relative;
    font-size: 14px;
    color: #6aa2e4;
    float: right;
    cursor: pointer;
    margin-top: 4px;
  }
  .content_com .job_list, .content_com .all_job {
    position: relative;
    font-size: 0;
    letter-spacing: 0;
  }
  .content_com .job_item {
    position: relative;
    width: 700px;
    border-bottom: 1px solid #f5f5f5;
    padding-top: 16px;
    padding-bottom: 7px;
    display: inline-block;
    background-color: #fbfbfb;
  }
  .content_com .job_list .job_item > div {
    margin-bottom: 16px;
  }
  .content_com .job_item .job_name {
    position: relative;
    font-size: 16px;
  }
  .cutom_font {
    font-family: myFont,PingFang SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }

  .content_com .job_item .job_time {
    position: relative;
    font-size: 14px;
    color: #b5b5b5;
    letter-spacing: 2px;
    float: right;
    right: 0;
    margin-bottom: 10px;
  }
  .content_com .job_item .job_msg {
    position: relative;
    font-size: 14px;
    letter-spacing: 2px;
    color: #666;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  .job_nav {
    position: relative;
    padding: 20px 0;
  }
  .job_nav .job_nav_item_active {
    background-color: #6aa2e4;
    border-color: #6aa2e4;
    color: #fff;
  }
  .job_nav .job_nav_item {
    position: relative;
    display: inline-block;
    height: 34px;
    line-height: 36px;
    border: 1px solid #6aa2e4;
    color: #6aa2e4;
    font-size: 14px;
    letter-spacing: 1px;
    background-color: #fff;
    padding: 0 34px;
    border-radius: 18px;
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    margin-right: 20px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .content_com .all_job {
    height: 136px;
  }
  .content_com .all_job .job_item .job_name {
    margin-bottom: 18px;
  }
  .job_nav .job_nav_item_active {
    background-color: #6aa2e4;
    border-color: #6aa2e4;
    color: #fff;
  }
  .content_right {
    position: absolute;
    right: 0px;
    top:30px;
    width: 270px;
    padding: 0 20px 20px;
    background-color: #fbfbfb;
  }
  .com_item .com_link {
    color: #6aa2e4;
    text-decoration: none;
  }
  .com_item .com_detail > span {
    margin-right: 16px;
  }
</style>
