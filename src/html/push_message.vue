<template>
  <div class="push_message search">
    <div class="conditions">
      <div class="con-box">
        <!--更多筛选条件展开按钮-->
        <div class="drop-down">
          <div class="drop-box">
            <span class="con-label" v-if="condition" v-on:click="condition_show_hide()">更多筛选条件</span>
            <span class="hide_text" v-if="!condition"  v-on:click="condition_show_hide()">收起筛选内容</span>
            <img src="../img/search/img_03.png" alt="展开">
          </div>
        </div>
        <!--搜索输入框-->
        <div class="input-box">
          <div>
            <input class="in" type="text" placeholder="请输入期望的 实习岗位 或 公司名 或 城市" name="keyword" value="" v-model="searchInput">
          </div><button v-on:click="searchClick(0,searchInput,index)">搜索职位</button>
        </div>
      </div>
      <!--条件列表-->
      <div class="cont-detail" style="display: none">
        <div class="line"></div>
        <div class="work-space">
          <dl>
            <dt>工作地点：</dt>
            <dd class="sx-btn " :class="{'dd-active':national}" v-on:click="searchClick(1,'100000')">全国</dd>
            <dd class="sx-btn" v-for="list in HitCity" :class="{'dd-active':list.IfSelected}" v-on:click="searchClick(1,list.id)">{{list.shortName}}</dd>
            <dd class="sx-btn dd-active"  v-if="selectAnother.showHidden">{{selectAnother.name}}</dd>
            <dd class="sx-btn" v-on:click="addressSelection=true">其他</dd>
          </dl>
        </div>
        <div class="daily-wage sx_btns">
          <dl>
            <dt>{{pageSearch.newRange.name}}：</dt>
            <dd v-for="list in pageSearch.newRange.WorkingPlace" :class="{'dd-active':list.IfSelected }" v-on:click="searchClick(2,list.name)">{{list.name}}</dd>
          </dl>
        </div>
        <div class="daily-wage sx_btns">
          <dl>
            <dt>{{pageSearch.InternshipDays.name}}：</dt>
            <dd v-for="list in pageSearch.InternshipDays.WorkingPlace" :class="{'dd-active':list.IfSelected }" v-on:click="searchClick(3,list.name)">{{list.name}}</dd>
          </dl>
        </div>
        <div class="daily-wage sx_btns">
          <dl>
            <dt>{{pageSearch.InternshipMonths.name}}：</dt>
            <dd v-for="list in pageSearch.InternshipMonths.WorkingPlace" :class="{'dd-active':list.IfSelected }" v-on:click="searchClick(4,list.name)">{{list.name}}</dd>
          </dl>
        </div>
        <div class="daily-wage sx_btns">
          <dl>
            <dt>{{pageSearch.minimumDegree.name}}：</dt>
            <dd v-for="list in pageSearch.minimumDegree.WorkingPlace" :class="{'dd-active':list.IfSelected }" v-on:click="searchClick(5,list.name)">{{list.name}}</dd>
          </dl>
        </div>
        <div class="daily-wage sx_btns">
          <dl>
            <dt>{{pageSearch.PositiveOpportunities.name}}：</dt>
            <dd v-for="list in pageSearch.PositiveOpportunities.WorkingPlace" :class="{'dd-active':list.IfSelected }" v-on:click="searchClick(6,list.name)">{{list.name}}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="enterprise_information">
      <div class="enterprise_list" v-for="list in JobDto">
        <router-link class="router_link" :to="{ name: 'push_details', params: { pushData: JSON.stringify(list)}}">
          <div class="information">
            <div class="enterprise_img">
              <img :src="list.companyDto.logo" alt="">
            </div>
            <div class="enterprise_text">
              <p class="enterprise_name">{{list.companyDto.shortName}}</p>
              <p class="color_959595">{{list.companyDto.mainBusinessDescription}}</p>
              <p class="color_959595">
                <img src="../img/search/img_10.png" alt="">
                <span>{{list.companyDto.area.name}}</span>
              </p>
              <p class="color_959595">
                <img src="../img/search/img_21.png" alt="">
                <span>{{list.updateTime}}</span>
              </p>
              <div class="nietui">内推</div>
            </div>
          </div>
          <div>
            <p class="color_959595 suo" style="height: 50px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">
              <span>门徒内推:</span><span>{{list.companyDto.introduce}}</span>
            </p>
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
    <div class="sxs--modal" v-if="addressSelection"  @click="addressSelection=false;">
      <div class="sxs--modal--bg" style="height: 484px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div id="job_addr">
            <div>
              <p>省</p>
              <span v-for="list in pita"  @click="pita2=list.child">{{list.name}}</span>
            </div>
            <div>
              <p>市</p>
              <span v-for="list in pita2"  @click="areaClick(list)">{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {//变量
      return {
        searchInput:"",
        condition:true,
        addressSelection:false,
        pita:{},
        pita2:{},
        pita3:{},
        national:"true",
        searchCriteria:{
          areaId: "",
          companyId: "",
          industryId: "",
          isPush: '0',
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
        //条件显示
        pageSearch:{
          preview:{},
          pita:{},
          newRange:{},
          InternshipDays:{},
          InternshipMonths:{},
          minimumDegree:{},
          PositiveOpportunities:{},
          TheSortingWay:{}
        },
        selectAnother:{
          showHidden:false,
          name:''
        },
        //页数
        pageable:{
          pageNumber:[],
          WhetherNotShown:true,
          pageNo:1,
          maxPage:null
        },
        //数据
        JobDto:[],
        //数据
        HitCity:[]
      }
    },
    mounted () {//初始化
//      this  Input=this.$route.params  Name;
      this.GetSearchCriteria();//获取搜索条件
      this.postJobSearch();///获取数据
      this.getHitCity();
      this.getAreaData();
    },
    methods:{//方法
      searchClick :function (i,str) {
        if(i==0){
          this.searchCriteria.searchName=str;
        };
        if(i==1){
          if(str=="100000"){
            this.national=true;
            this.ConditionalCheckState(this.HitCity,'100000',0);
          }else{
            this.national=false;
            this.searchCriteria.areaId=str;
            this.selectAnother.showHidden=false;
            this.ConditionalCheckState(this.HitCity,str,0);
          }
        }else if(i==2){
          if(str=="50以下"){
            this.searchCriteria.maxDayMoney=50;
            this.searchCriteria.minDayMoney=0;
          }else if(str=="50-100"){
            this.searchCriteria.maxDayMoney=100;
            this.searchCriteria.minDayMoney=50;
          }else if(str=="100-150"){
            this.searchCriteria.maxDayMoney=150;
            this.searchCriteria.minDayMoney=100;
          }else if(str=="150-200"){
            this.searchCriteria.maxDayMoney=200;
            this.searchCriteria.minDayMoney=150;
          }else if(str=="200-300"){
            this.searchCriteria.maxDayMoney=300;
            this.searchCriteria.minDayMoney=200;
          }else if(str=="300以上"){
            this.searchCriteria.minDayMoney=300;
            this.searchCriteria.maxDayMoney=null;
          }else{
            this.searchCriteria.minDayMoney=null;
          }
          this.ConditionalCheckState(this.pageSearch.newRange.WorkingPlace,str,1);
        }else if(i==3){
          if(str=="一天"){
            this.searchCriteria.practiceDay =1;
          }else if(str=="二天"){
            this.searchCriteria.practiceDay =2;
          }else if(str=="三天"){
            this.searchCriteria.practiceDay =3;
          }else if(str=="四天"){
            this.searchCriteria.practiceDay =4;
          }else if(str=="五天"){
            this.searchCriteria.practiceDay =5;
          }else if(str=="六天"){
            this.searchCriteria.practiceDay =6;
          }else if(str=="七天"){
            this.searchCriteria.practiceDay =7;
          }else{
            this.searchCriteria.practiceDay =null;
          }
          this.ConditionalCheckState(this.pageSearch.InternshipDays.WorkingPlace,str,1);
        }else if(i==4){
          //实习月数
          if(str=="一月"){
            this.searchCriteria.minPracticeMonth =1;
            this.searchCriteria.maxPracticeMonth =1;
          }else if(str=="二月"){
            this.searchCriteria.minPracticeMonth =2;
            this.searchCriteria.maxPracticeMonth =2;
          }else if(str=="三月"){
            this.searchCriteria.minPracticeMonth =3;
            this.searchCriteria.maxPracticeMonth =3;
          }else if(str=="四月"){
            this.searchCriteria.minPracticeMonth =4;
            this.searchCriteria.maxPracticeMonth =4;
          }else if(str=="五月以上"){
            this.searchCriteria.minPracticeMonth =5;
            this.searchCriteria.maxPracticeMonth =null;
          }else{
            this.searchCriteria.minPracticeMonth =null;
          }
          //this.searchCriteria.minPracticeMonth =str;
          this.ConditionalCheckState(this.pageSearch.InternshipMonths.WorkingPlace,str,1);
        }else if(i==5){
          if(str=="专科"){
            this.searchCriteria.mixEducational ="专科";
          }else if(str=="本科"){
            this.searchCriteria.mixEducational ="本科";
          }else if(str=="硕士"){
            this.searchCriteria.mixEducational ="硕士";
          }else if(str=="博士"){
            this.searchCriteria.mixEducational ="博士";
          }else{
            this.searchCriteria.mixEducational =null;
          }
          this.ConditionalCheckState(this.pageSearch.minimumDegree.WorkingPlace,str,1);
        }else if(i==6){
          if(str=="提供转正"){
            this.searchCriteria.isWorker ='yes';
          }else if(str=="不提供转正"){
            this.searchCriteria.isWorker ='no';
          }else if(str=="面议"){
            this.searchCriteria.isWorker ='negotiate';
          }else{
            this.searchCriteria.isWorker ='';
          }
          this.ConditionalCheckState(this.pageSearch.PositiveOpportunities.WorkingPlace,str,1);
        }else if(i==7){
          if(str=="综合排序"){
            this.searchCriteria.sortWay =0;
          }else if(str=="最新发布"){
            this.searchCriteria.sortWay =1;
          }
          this.ConditionalCheckState(this.pageSearch.TheSortingWay,str,1);
        }
        this.postJobSearch();
      },
      //条件选中状态
      ConditionalCheckState:function(lists,name,num){
        console.log(lists);
        if(num){
          lists.forEach(function (element) {
            if(element.name==name){
              element.IfSelected=true;
            }else{
              element.IfSelected=false;
            }
          })
        }else{
          lists.forEach(function (element) {
            if(element.id==name){
              element.IfSelected=true;
            }else{
              element.IfSelected=false;
            }
          })
        }
      },
      //查询数据库并返回值
      postJobSearch:function () {
        this.postData("/api/homepage/jobSearch",{pageNo:this.pageable.pageNo,pageSize:8},this.searchCriteria).then((res) => {
          //显示或隐藏页码
          let able=res.data.data.pageable;
          let Number =Math.ceil(able.count/10);
          this.pageable.maxPage=Math.ceil(able.count/10);
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
          console.log(res.data);
          //向页面输出数据
        }, (err) => {
          console.log(err)
        });
      },
      //获取搜索条件
      GetSearchCriteria:function () {
        this.getData2("src/js/searchCriteria.json",{}).then((res) => {
          this.pageSearch={
            preview:res.data.data.preview,
            pita:res.data.data.pita,
            newRange:res.data.data.newRange,
            InternshipDays:res.data.data.InternshipDays,
            InternshipMonths:res.data.data.InternshipMonths,
            minimumDegree:res.data.data.minimumDegree,
            PositiveOpportunities:res.data.data.PositiveOpportunities,
            TheSortingWay:res.data.data.TheSortingWay
          };
          console.log(this.pageSearch)
        }, (err) => {
          console.log(err)
        });
      },
      //翻页
      TurnThePage:function (t) {
        if(t>=1&&t<=this.pageable.maxPage){
          this.pageable.pageNo=t;
          this.postJobSearch();
        }
      },
      //搜索条件显示隐藏
      condition_show_hide:function () {
        if(this.condition){
          $(".cont-detail").stop().slideDown(500);
        }else{
          $(".cont-detail").stop().slideUp(500);
        }
        this.condition=!this.condition
      },
      //获取热门城市
      getHitCity(){
        this.postData("/api/homepage/getHitCity",{},{}).then((res) => {
          if(res.data.code==0){
            let _this=this;
            this.HitCity=res.data.data;
            this.HitCity.forEach(function (element) {
              _this.$set(element,"IfSelected",false)
            })
          }else{
            console.log(res.data.methods);
          }
        });
      },
      //获取地区城市
      getAreaData:function(){
        this.getData("/api/basic/region/listTree",{parentId:110000,type:3}).then((res) => {
          this.pita=res.data.data[0].child;
        }, (err) => {
          console.log(err)
        });
      },
      //选择地区
      areaClick:function (list) {
        this.selectAnother.name=list.name;
        this.searchCriteria.areaId=list.id;
        this.addressSelection=false;
        this.selectAnother.showHidden=true;
        this.ConditionalCheckState(this.HitCity,'100000',0);
        this.postJobSearch();
      },
      //显示其他地区
      show_other_region:function () {
        this.addressSelection=true;
      },
      //隐藏其他地区
      hide_other_region:function () {
        $('#job_addr').css("display","none");
      }
    }
  }
</script>
<style>
  #job_addr p{
    padding: 10px 0;
  }
  #job_addr span {
    margin: 3px 5px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
  .push_message {
    width: 100%;
    height: 100%;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    margin: auto;
  }
    .conditions {
    width: 100%;
    position: relative;
  }
      .conditions > .con-box {
    width: 100%;
    height: 65px;
    /*position: absolute;*/
    display: inline-block;
    margin-top: 30px;
    z-index: 2;
  }
  .cont-detail div  dl  .dd-active, .cont-detail div  dl  dd:hover {
    background-color: #ffffff;
    border: 1px solid #f5f5f5;
    color: #6aa2e4;
    border-radius: 6px;
  }
      .con-box > .drop-down    ,.con-box > .input-box {
    display: inline-block;
    vertical-align: top;
  }
      .con-box > .drop-down {
    display: inline-block;
    width: 262px;
    height: 65px;
    cursor: hand;
    cursor: pointer;
    background-color: #ffffff;
  }
      .con-box > .current {
    width: 260px;
    border: 1px solid #f5f5f5;
    border-bottom: 0;
    background-color: #fafafa;
  }
      .drop-down > .drop-box {
    position: relative;
    width: 260px;
    height: 47px;
    line-height: 47px;
    text-align: center;
    border-radius: 4px;
    background-color: #fafafa;
    border: 1px solid #f5f5f5;
  }
      .drop-box > span {
    color: #6aa2e4;
  }
      .drop-box > .con-label {
    text-align: center;
  }
      .con-label > label {
    display: inline-block;
    height: 27px;
    line-height: 27px;
    background-color: #ffffff;
    color: #6aa2e4;
    font-size: 16px;
    padding: 0 5px;
    border: 1px solid #f5f5f5;
  }
      .current > .drop-box {
    text-align: center;
    width: 260px;
    border: 0;
  }
  /*.current > .drop-box > span {*/
  /*!*padding-left: 20px;*!*/
  /*}*/
      .drop-box > img {
    position: absolute;
    right: 20px;
    top: 20px;
  }
      .con-box > .input-box {
    margin-left: 15px;
    height: 45px;
  }
      .input-box > div {
    display: inline-block;
    width: 642px;
    height: 44px;
    border: 1px solid #f5f5f5;
    border-right: 0;
    border-radius: 4px;
    background-color: #fafafa;
  }
      .input-box > div > input {
    height: 25px;
    width: 620px;
    margin: 8px 0 0 10px;
    border: 0;
    outline: none;
    background-color: rgba(0,0,0,0);
  }
      .input-box > .active,
      .input-box > div:hover {
    border: 1px solid #6aa2e4;
    background-color: #ffffff;
    border-right: 0;
    box-shadow: 0 0 6px #6aa2e4;
    transition:all .5s;
  }
      .input-box > .active > input{
    background-color: #ffffff;
  }
      .input-box > button {
    display: inline-block;
    vertical-align: top;
    width: 157px;
    height: 46px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-left: -4px;
    background-color: #6aa2e4;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    line-height: 46px;
    text-decoration: none;
    border:0;
    cursor: pointer;
  }
     .input-box > button:hover {
    background-color: #4f8ed8;
    transition:all .5s;
  }
  /*æ¡ä»¶åˆ—è¡¨*/
     .conditions > .cont-detail {
    display: inline-block;
    position: relative;
    z-index: 1;
    width: 1076px;
    background-color: #fafafa;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
  }
     .cont-detail > .line {
    position: absolute;
    height: 1px;
    width: 262px;
    top: -1px;
    z-index: 2;
    background-color: #fafafa;
  }
     .cont-detail div > dl {
    width: 1050px;
    height: 56px;
    margin: 0 25px 0 15px;
    border-bottom: 1px solid #f5f5f5;
  }
     dl,   dd,   dt {
    -webkit-margin-start: 0;
  }
     .cont-detail div > dl > dt,
     .cont-detail div > dl > dd {
    display: inline-block;
    border: 1px solid #fafafa;
    font-size: 14px;
    line-height: 28px;
    margin: 15px 0;
  }
     .cont-detail div > dl > dt {
    color: #000000;
    margin-right: 20px;
  }
     .cont-detail div > dl > dd {
    padding: 0 13px;
    margin-left: 6px;
    cursor: pointer;
    cursor: hand;
    color: #666666;
  }
     .cont-detail div  dl  .dd-active,
     .cont-detail div  dl   dd:hover{
    background-color: #ffffff;
    border: 1px solid #f5f5f5;
    color: #6aa2e4;
    border-radius: 6px;
  }

     .cont-detail div > dl  .other {
    position: relative;
    line-height: 38px;
    margin: 10px 0 10px 6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition: none;
  }
     .other > .line {
    display: none;
    position: absolute;
    top: 38px;
    height: 1px;
    z-index: 5;
    width: 58px;
    left: 0;
    background-color: #ffffff;
  }
     .other > #job_addr {
    width: 400px;
    position: absolute;
    top: 38px;
    left: -363px;
    padding: 10px;
    border: 1px solid #f5f5f5;
    margin: 0;
    z-index: 4;
    /*opacity: 0;*/
    display: none;
    /*filter: alpha(opacity=0);*/
    background: rgb(255, 255, 255);
  }
     #job_addr dd:after{
    content: '';
  }
     #job_addr dd {
    float: none;
    display: inline-block;
    cursor: pointer;
    margin: 0 0 6px 5px;
    line-height: 28px;
  }
     #job_addr dd :hover{
    text-decoration: underline;
  }
     #job_addr dt {
    width: 70px;
    font-size: 14px;
    color: #333;
    float: left;
  }
     #job_addr a {
    color: #555;
    text-decoration: none;
  }
     #job_addr a:hover {
    color: #02a0e9;
    text-decoration: none;
  }
     #job_addr .active {
    color: #02a0e9;
  }
     #job_addr .full {
    float: left;
    height: 45px;
    width: 1px;
  }

     .posi-style > dl {
    margin: 0;
    line-height: 44px;
    color: #8b8b8b;
  }
     .posi-style > dl > dt,
     .posi-style > dl > dd {
    display: inline-block;
    vertical-align: top;
    padding: 0 12px;
    border-top:3px solid #fafafa;
    font-size: 14px;
  }
     .posi-style > dl > dd {
    cursor: hand;
    cursor: pointer;
  }
     .posi-style  dl  dd:hover,
     .posi-style  dl  .dd-active {
    color: #6aa2e4;
    background-color: #ffffff;
    border-top:3px solid #6aa2e4;
    transition: all .5s;
  }

     .list > div {
    display: inline-block;
  }

     .po-name .names > a {
    float: left;
    text-decoration: none;
    font-size: 18px;
    line-height: 1.4285;
    color: #000000;
    max-width: 220px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

     .part > a {
    color: #6aa2e4;
    text-decoration: none;
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
  }

     .xz > img {
    margin: 0 10px 0 0;
  }
     .xz > .line {
    margin: 0 10px;
    color: #ddd;
  }
     .addr > span {
    margin-left: 10px;
  }
     .com-logo > a {
    display: inline-block;
    width: 60px;
    height: 60px;
    border: 1px solid #f5f5f5;
    background-color: #ffffff;
  }
     .com-logo > a > img {
    width: 100%;
    height: 100%;
  }
     .adver > a {
    display: inline-block;
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
     .adver > a > img{
    float: right;
    width: 260px;
    display: inline-block;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
  }

     #pagebar > ul{
    padding: 0;
  }
     .kuai{
    cursor: pointer;
    display: inline-block;
    margin-top: 4px;
    margin-left: 12px;
    height: 17px;
    width: 17px;
    vertical-align: top;
  }
     #pagebar {
    text-align: center;
    margin: 35px 0 30px 0;
    font-size: 14px;
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
  .enterprise_information{
    width: 100%;
    height: 100px;
    border-top: 1px dashed #e9e9e9;
    height: 920px;
    padding-bottom: 20px;
  }
  .enterprise_list{
    border-bottom: 1px dashed #e9e9e9;
    width: 500px;
    float: left;
    height: 180px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .enterprise_list:nth-child(odd)
  {
    padding-right: 78px;
  }
  .enterprise_list:nth-child(even)
  {
    margin-left: 2px;
  }
  .information{
    padding-bottom: 15px;
    height: 115px;
  }
  .enterprise_img>img{
    width: 72px;
    height: 72px;
  }
  .enterprise_img{
    padding:21px 22px 0 0;
    width: 72px;
    float: left;
  }
  .enterprise_text{
    border-left: 1px solid #e9e9e9;
    height: 115px;
    width: 385px;
    float: left;
    padding-left: 20px;
    position: relative;
  }
  .color_959595{
    color: #959595;
    font-size: 14px;
    padding-bottom: 7px;
  }
  .enterprise_name{
    line-height: 30px;
    padding-bottom: 10px;
  }
  .nietui{
    position: absolute;
    bottom: 30px;
    right: 0px;
    font-size: 13px;
    width: 42px;
    height: 24px;
    background: red;
    text-align: center;
    line-height: 24px;
    color: #fff;
    border-radius: 5px;
  }
  .nianyue{
    position: absolute;
    bottom: 0px;
    right: 0px;
    font-size: 12px;
    width: 110px;
    height: 24px;
    background: #69a2e5;
    text-align: center;
    line-height: 24px;
    color: #fff;
    border-radius: 5px;
  }
  .suo{
    line-height: 27px;
  }
  .pagination{
    float: left;
    width: 100%;
    padding-top: 15px;
  }

</style>
