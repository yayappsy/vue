<template>
  <div id="home">
    <div class="top_header bgs" v-if="!page.ifHomeLogin" style="background-image: url(http://39.106.117.195/image/home/main_bg.png);">
      <div class="container">
        <div class="top_content">
          <img src="http://39.106.117.195/image/home/main_phone.png" alt="" class="top_phone">
          <div class="top_center">
            <div class="name bgs"
                 style="color: #6597d0;font-size: 25px;"><span>门徒求职</span></div>
            <div class="msg bgs"
                 style="color: #6597d0;font-size: 20px;"><span>让一部分人更早进入职场</span></div>
            <!--<a class="btn" href="/app/download" target="_blank">下载APP</a>-->
          </div>
          <div class="top_right fr">
            <div class="item"><input type="text" class="name" placeholder="请输入账号" v-model="user.identifier"></div>
            <div class="item"><input v-bind:type="isShow" class="password" placeholder="请输入密码" v-model="user.password"><span
              class="eye" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/main_eye.png?v=d165d5731fc4766eca419a3f7fbb367b)" @click="isShowAndHoid()"></span>
            </div>
            <div class="item">
              <span class="btn btn_hover fl" id="index_login_btn" v-on:click="login()">登录</span>
              <router-link class="btn fr" to="/Student_register">学生注册</router-link>
              <div class="clear"></div>
            </div>
            <div class="item cmb">
              <router-link class="forget" to="/findpwd">忘记密码</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-bar">
      <div class="container">
        <div class="user-count">
          <div class="user-count-num">
            <span v-for="Num in getHitNum" v-bind:style="{backgroundPositionX:0+'px',backgroundPositionY:Num.i+'px'}"></span>
          </div>
          <span style="display: block;">共计{{getHitNumSum}}个热门职位等着你</span>
        </div>
        <div class="search-bar">
          <div class="search-container">
            <form action="/interns" method="get">
              <input type="button" value="搜索职位" class="form--button" @click="Jsearch()">
              <input type="text" name="k" placeholder="请输入期望的 实习岗位 或 公司名 或 城市" v-model="page.routerCntent">
              <input type="hidden" name="p" value="1">
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="mid-bar">
      <div class="container">
        <div class="intern-type">
          <div class="type-head">全部分类</div>
          <div class="type-item" v-for="lists in industryTags" v-on:mouseenter="lists.sh=true" v-on:mouseleave="lists.sh=false">
            <div style="height: 40px;overflow: hidden;">
              <router-link :to="{ name: 'search', params: { searchName: JSON.stringify({id:2,routerCntent:lists.id})}}">{{lists.name}}</router-link>
              <router-link  v-for="list in lists.industryTwoDtos" :to="{ name: 'search', params: { searchName: JSON.stringify({id:2,routerCntent:list.id})}}">{{list.name}}</router-link>
            </div>
            <div class="type-list"  :class="{ 'display_b':lists.sh&&lists.industryTwoDtos.length!=0 }">
              <div v-for="list in lists.industryTwoDtos">
                <router-link :to="{ name: 'search', params: { searchName: JSON.stringify({id:2,routerCntent:list.id})}}">{{list.name}}</router-link>
                <router-link v-for="li in list.industryThreeDtos" :to="{ name: 'search', params: { searchName: JSON.stringify({id:2,routerCntent:li.id})}}">{{li.name}}</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="banner"  v-on:mouseenter="stop()" v-on:mouseleave="move()">
          <div class="slider-container" id="slider-container" >
            <div class="slider_wrap" v-bind:style="{left:page.imgLeft+'px'}">
              <a target="_blank" class="com-con"  v-for="list in page.imgArray"><img :src="list" alt=""></a>
            </div>
            <div class="slider-prev" @click="onP()" style="z-index: 99;position: absolute;right: 0;top: 40%;color: #fff;font-size: 40px;">》</div>
            <div class="slider-next" @click="unP()" style="z-index: 99;position: absolute;left: 0;top: 40%;color: #fff;font-size: 40px;">《</div>
            <div class="shuffling-external">
              <span v-for="list in page.imgArrayLeft" class="shuffling" :class="{ 'shufflingActive': list==page.imgLeft }" style="font-size: 80px" @click="page.imgLeft=list">.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="company-list">
      <div class="container">
        <router-link target="_blank" class="company-item" v-for="list in CompanyInfoByHomeShow"  :style="{backgroundImage: `url(${list.logo})`}" :to="{ name: 'company_home', params: { CompanyData: JSON.stringify(list)}}">
          <div class="company-t">{{list.name}}</div>
          <div class="company-d">{{list.introduce}}</div>
        </router-link>
      </div>
    </div>
    <div class="intern-list">
      <div class="container">
        <div class="intern-nav">
          <div class="intern-nav-item" :class="{active:active.r}" @click="rzt('1')">热门职位</div>
          <div class="intern-nav-item" :class="{active:active.z}" @click="rzt('2')">急招职位</div>
          <div class="intern-nav-item" v-if="page.ifHomeLogin" :class="{active:active.t}"  @click="rzt('3')">推荐职位</div>
          <a class="intern-nav-more" target="_blank" @click="Jsearch()">查看更多职位 &gt;</a>
        </div>
        <div class="intern-content" style="">
          <div class="intern-content-container"
               style="-webkit-transform: translate3D(0px, 0, 0);-moz-transform: translate3D(0px, 0, 0);-ms-transform: translate3D(0px, 0, 0);-o-transform: translate3D(0px, 0, 0);transform: translate3D(0px, 0, 0);">
            <!-- 热门职位 -->
            <div class="intern-content-item" data-iid="1">
              <div class="intern-content-href" v-for="list in JobDto">
                <router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}" class="intern-logo"><img :src="list.companyDto.logo" class="intern-logo-img bgs"></router-link>
                <div class="intern-title"><router-link :to="{ name: 'recruitDetails', params: { searchData: JSON.stringify(list)}}">{{list.name}}</router-link></div>
                <div class="intern-sub"><router-link :to="{ name: 'company_home', params: { searchData: JSON.stringify(list.companyDto)}}">{{list.companyDto.name}}</router-link>
                  - <span>{{list.companyDto.mainBusinessDescription}}</span></div>
                <div class="intern-info">
                  <span>{{list.dayNumber}}天/周</span><span>{{list.lowest}}-{{list.highest}}/天</span>
                  <span>{{list.area.name}}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <a target="_blank" class="intern-more" @click="Jsearch()">更多职位&nbsp;&nbsp;<span style="float: right;"> 》</span></a>
      </div>
    </div>
  </div>

</template>
<script>
  import {common} from '../js/common.js';
  export default {
    name: 'app',
    data() {//变量
      return {
        isShow:'password',
        page: {
          routerCntent: "",
          ifHomeLogin: false,
          imgLeft:0,
          imgArray: [
            'http://39.106.117.195/image/home/carousel1.png',
            'http://39.106.117.195/image/home/carousel2.png',
            'http://39.106.117.195/image/home/carousel3.png',
            'http://39.106.117.195/image/home/carousel4.png',
            'http://39.106.117.195/image/home/carousel5.png',
            'http://39.106.117.195/image/home/carousel6.png'
          ],
          imgArrayLeft:[
            0,
            -800,
            -1600,
            -2400,
            -3200,
            -4000
          ]
        },
        user:{
          identifier: "",
          identityType: "mobile",
          password: "",
          type:"1"
        },
        getHitNumSum: '',
        searchCriteria:{
          areaId: "",
          companyId: "",
          industryId: "",
          isPush: '1',
          homeShow:"",
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
        active:{
          r:true,
          z:false,
          t:false,
        },
        getHitNum: [
          {
            i: -270
          }, {
            i: -270
          }, {
            i: -270
          }, {
            i: -270
          }, {
            i: -270
          }, {
            i: -270
          }, {
            i: -270
          }, {
            i: -270
          }
        ],
        JobDto:[],
        industryTags: {},//热招职位
        CompanyInfoByHomeShow:[],
      }
    },
    mounted() {//初始化
      let _this=this;
      this.play();
      this.initData();
      this.getCompanyInfoByHomeShow();
      this.rzt('1');
      this.monitorIfExitLogin();
      this.user={
        identifier: "",
          identityType: "username",
          password: "",
          type:"1"
      }
      common.$on("HitCityId",function (id) {
        _this.searchCriteria.areaId = id;
        _this.rzt(_this.searchCriteria.homeShow);
      });
      this.localStorageUser();
    },
    methods: {
      //获取数据
      initData: function () {
        //获取热招数量
        let _this=this;
        this.getData("/api/homepage/getHitNum", {}).then((res) => {
          let str = res.data.data.toString();
          this.getHitNumSum = str;
          let data = [
            {
              i: -270
            }, {
              i: -570
            }, {
              i: -870
            }, {
              i: -1170
            }, {
              i: -1470
            }, {
              i: -1770
            }, {
              i: -2070
            }, {
              i: -2370
            }
          ];
          let z = 0;
          data.forEach(function (element, index) {
            if (index == data.length - str.length + z) {
              element.i = element.i + parseInt(str.substr(z, 1)) * (-30);
              z++;
            } else {
              element.i = element.i;
            }

          })
          this.getHitNum = data;
        }, (err) => {
          console.log(err)
        });
        //判断是否已经登陆
        this.getData("/api/session/check", {}).then((res) => {
          console.log(res);
          if(res.data.code==0){
            this.page.ifHomeLogin = true;
          }else{
            this.page.ifHomeLogin = false;
          }
        }, (err) => {
          console.log(err)
        });
        //获取职业分类
        this.getData("/api/homepage/industryTags", {}).then((res) => {

          this.industryTags = res.data.data;
          this.industryTags.forEach(function (element) {
            _this.$set(element,'sh',false);
          })
          console.log(this.industryTags);
          console.log(res);
        }, (err) => {
          console.log(err);
        });
      },
      //显示隐藏密码
      isShowAndHoid(){
        if(this.isShow=="password"){
          this.isShow="text";
        }else{
          this.isShow="password";
        }
      },
      //跳转搜索页面
      Jsearch () {
        console.log(this.page.routerCntent)
        let data={
          id:0,
          routerCntent:""
        }
        if(this.page.routerCntent!=""){
          data={
            id:1,
            routerCntent:this.page.routerCntent
          }
        }
        this.$router.push({name:'search',params: {searchName:JSON.stringify(data)}});
      },
      //获取推荐公司
      getCompanyInfoByHomeShow(){
        this.postData("/api/homepage/getCompanyInfoByHomeShow",{},{}).then((res) => {
          let _this=this;
          res.data.data.forEach(function (element,index) {
            if(index<10){
              _this.CompanyInfoByHomeShow.push(element);
            }
          })
          console.log( this.CompanyInfoByHomeShow)
        }, (err) => {
          console.log(err)
        });
      },
      //选择首页工作类型
      rzt (num) {
        this.num=num;
        if(num=='1'){
          this.active={
            r:true,
              z:false,
              t:false,
          };
        }else if(num=='2'){
          this.active={
            r:false,
            z:true,
            t:false,
          };
        }else if(num=='3'){
          this.active={
            r:false,
            z:false,
            t:true,
          };
        }
        //this.searchCriteria.homeShow=num;

        this.searchCriteria.sortWay=num-1;
        this.postData("/api/homepage/jobSearch",{pageNo:1,pageSize:16},this.searchCriteria).then((res) => {
          this.JobDto=res.data.data.jobDtos;
          console.log(this.JobDto)
        }, (err) => {
          console.log(err)
        });
      },
      //登录
      login: function () {
        if (this.user.identityType != "") {
          if (this.user.password != "") {
            this.postData2("/api/session/add",this.user).then((res) => {
              if(res.data.code==0){
                window.localStorage.setItem('USER', JSON.stringify(this.user));
                window.localStorage.setItem('S_id', JSON.stringify(res.data.data));
                window.localStorage.setItem("token",res.data.data.token);
                window.localStorage.setItem("type",res.data.data.type);
                this.page.ifHomeLogin = false;
                common.$emit("iflogin", true);
              }else{
               alert(res.data.message)
              }
            }, (err) => {
              console.log(err);
            });
          } else {
            alert("密码不许为空！！！")
          }
        } else {
          alert("手机号不许为空！！！")
        }

      },
      //获取本地存储账号
      localStorageUser: function () {
        // body...
        if (window.localStorage.getItem('USER')) {
          //登录代码
          this.user =JSON.parse(window.localStorage.getItem('USER'));
        } else {
          common.$emit("iflogin", false);
        }
      },
      //监听是否退出登录
      monitorIfExitLogin: function () {
        let _this = this;
        common.$on("iflogin", function (iflogin) {
          _this.page.ifHomeLogin = iflogin;
        });
      },
      autoPlay () {
        if(this.page.imgLeft<-3900){
          this.page.imgLeft=0;
        }else{
          this.page.imgLeft-=800;
        }
      },
      play () {
        this.timer = setInterval(this.autoPlay, 5000)
      },
      change (i) {
        this.mark = i
      },
      onP(){
        if(this.page.imgLeft<-3900){
          this.page.imgLeft=0;
        }else{
          this.page.imgLeft-=800;
        }
      },
      unP(){
        if(this.page.imgLeft>-100){
          this.page.imgLeft=-4000;
        }else{
          this.page.imgLeft+=800;
        }
      },
      stop () {
        clearInterval(this.timer)
      },
      move () {
        this.timer = setInterval(this.autoPlay, 5000)
      }
    }

  }
</script>
<style lang="scss">
#home{
  .slider-prev{
    z-index: 99;
    position: absolute;
    right: 0;
    top: 40%;
    color: #fff;
    cursor: pointer;
    font-size: 40px;
    opacity: 0.2;
    transition: opacity 1s;
    -moz-transition: opacity 1s;	/* Firefox 4 */
    -webkit-transition: opacity 1s;	/* Safari 和 Chrome */
    -o-transition: opacity 1s;	/* Opera */
  }
  .slider-prev:hover{
    opacity: 1;
  }
  .slider-next{
    z-index: 99;
    position: absolute;
    left: 0;
    top: 40%;
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    opacity: 0.2;
    transition: opacity 1s;
    -moz-transition: opacity 1s;	/* Firefox 4 */
    -webkit-transition: opacity 1s;	/* Safari 和 Chrome */
    -o-transition: opacity 1s;	/* Opera */
  }
  .slider-next:hover{
    opacity: 1;
  }
  a{
    cursor: pointer;
  }
  .mid-bar .intern-type>div.type-item:hover {
    background: #fff;
    border: solid 1px #D1D4DB;
    border-right: none;
  }
  .display_b{
    display: block !important;
  }
  .mid-bar .intern-type>div.type-item:hover::after {
    content: '';
    display: block;
    height: 38px;
    width: 4px;
    background: #fff;
    position: absolute;
    top: 0;
    right: -2px;
    z-index: 10;
  }
  .top-bar > .container > .user-count > .user-count-num > span {
    background: url(http://39.106.117.195/image/home/index_count.png) repeat-y center 30px/28px 300px;
  }
  .mid-bar .intern-type>div.type-head {
    background: url(http://39.106.117.195/image/home/icon_index_type.png) no-repeat 230px center;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-title > a.winter {
    /*background: url(../img/home/winter_icon.png) no-repeat center/contain;*/
  }


  /*轮播样式*/
  .slider_wrap{
    width: 4800px;
    position: absolute;
    top:0px;
    margin: 0;
    padding: 0;
  }
  .slider_wrap a{
    width: 800px;
    height: 408px;
    float: left;
    margin: 0;
    padding: 0;
  }
  .slider_wrap img{
    width: 800px;
    height: 408px;
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
    left:250px;
    z-index: 99;
    opacity: 0.5;
    font-size: 40px;
  }
  .shuffling{
    color: #fff;
    margin: 0 20px;
    cursor: pointer;
  }
  .shufflingActive{
    color: #6aa2e4;
  }
  /*轮播样式*/

  .top_header {
    position: relative;
    width: 100%;
    height: 178px;
    overflow: hidden;
  }
  .bgs {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .container {
    width: 100%;
    height: 100%;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
  }
  .top_header .top_content {
    position: relative;
    padding: 30px 0 0 268px;
    height: 148px;
  }
  .top_header .top_content .top_phone {
    position: absolute;
    width: 380px;
    height: 178px;
    left: -62px;
    bottom: 0;
  }
  .top_header .top_content .top_center {
    position: relative;
    color: #4c84c6;
    display: inline-block;
  }
  .top_header .top_content .top_center .name {
    position: relative;
    width: 170px;
    height: 29px;
    display: inline-block;
    margin-top: 8px;
  }
  .top_header .top_content .top_center .msg {
    position: relative;
    width: 245px;
    height: 20px;
    margin: 8px 0 15px 0;
  }
  .top_header .top_content .top_center .btn {
    position: relative;
    width: 130px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    font-size: 18px;
    color: #fff;
    background-color: #4c84c6;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
  }
  .top_header .top_content .top_right {
    z-index: 1;
  }
  .top_header .top_content .top_right {
    position: relative;
    font-size: 14px;
  }
  .fr {
    float: right;
  }
  .fl {
    float: left;
  }
  .top_header .top_content .top_right .item {
    position: relative;
    width: 265px;
    height: 30px;
    margin-bottom: 8px;
  }
  .top_header .top_content .top_right .item > input {
    position: relative;
    width: 239px;
    height: 28px;
    border: none;
    outline: none;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    padding: 0 12px;
    line-height: 30px;
    background-color: #fff;
    color: #333;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border: 1px solid #CCC!important;
  }
  .top_header .top_content .top_right .item .password {
    padding-right: 40px;
    width: 211px;
  }
  .top_header .top_content .top_right .item .btn_hover {
    background-color: #6aa2e4;
    color: #fff;
  }
  .top_header .top_content .top_right .item .btn {
    position: relative;
    display: inline-block;
    width: 127px;
    height: 28px;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    text-align: center;
    background-color: #fff;
    color: #999999;
    line-height: 30px;
    cursor: pointer;
    text-decoration: none;
  }
  .top_header .top_content .top_right .item .btn {
    position: relative;
    display: inline-block;
    width: 127px;
    height: 28px;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    text-align: center;
    background-color: #fff;
    color: #999999;
    line-height: 30px;
    cursor: pointer;
    text-decoration: none;
  }
  .top_header .top_content .top_right .item .clear {
    clear: both;
    display: block;
  }
  .top_header .top_content .top_right .cmb .third {
    position: relative;
    display: inline-block;
    vertical-align: top;
    color: #6aa2e4;
    cursor: pointer;
    padding-right: 12px;
  }
  .top_header .top_content .top_right .cmb .third_list {
    position: relative;
    left: -75px;
    opacity: 0;
    z-index: -1;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
  }
  .top_header .top_content .top_right .item .forget {
    position: relative;
    display: inline-block;
    float: right;
    color: #6aa2e4;
    cursor: pointer;
    text-decoration: none;
  }
  .top_header .top_content .top_right .item .eye {
    position: absolute;
    width: 28px;
    height: 30px;
    right: 0;
    top: 0;
    background-position: 2px 8px;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .top_header .top_content .top_right .item .btn_hover:hover {
    background-color: #4f8ed8;
    color: #fff;
  }
  .top-bar {
    padding: 20px 0;
  }
  .top-bar > .container {
    height: 100px;
  }
  .top-bar > .container > .user-count {
    width: 260px;
    height: 80px;
    padding-top: 20px;
    float: left;
    background: #fafafa;
  }
  .top-bar > .container > .user-count > .user-count-num {
    background: #fff;
    width: 234px;
    height: 30px;
    padding: 10px 0;
    margin: 0 auto;
    font-size: 0;
    text-align: center;
  }
  .container {
    width: 100%;
    height: 100%;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
  }
  .top-bar > .container > .user-count > .user-count-num > span {
    display: inline-block;
    width: 28px;
    height: 30px;

  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(1) {
    -webkit-transition: all ease-out 1s;
    -moz-transition: all ease-out 1s;
    -ms-transition: all ease-out 1s;
    -o-transition: all ease-out 1s ;
    transition: all ease-out 1s 5s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(2) {
    -webkit-transition: all ease-out 1.3s;
    -moz-transition: all ease-out 1.3s;
    -ms-transition: all ease-out 1.3s;
    -o-transition: all ease-out 1.3s;
    transition: all ease-out 1.3s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(3) {
    -webkit-transition: all ease-out 1.6s;
    -moz-transition: all ease-out 1.6s;
    -ms-transition: all ease-out 1.6s;
    -o-transition: all ease-out 1.6s;
    transition: all ease-out 1.6s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(4) {
    -webkit-transition: all ease-out 1.9s;
    -moz-transition: all ease-out 1.9s;
    -ms-transition: all ease-out 1.9s;
    -o-transition: all ease-out 1.9s;
    transition: all ease-out 1.9s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(5) {
    -webkit-transition: all ease-out 2.2s;
    -moz-transition: all ease-out 2.2s;
    -ms-transition: all ease-out 2.2s;
    -o-transition: all ease-out 2.2s;
    transition: all ease-out 2.2s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(6) {
    -webkit-transition: all ease-out 2.5s;
    -moz-transition: all ease-out 2.5s;
    -ms-transition: all ease-out 2.5s;
    -o-transition: all ease-out 2.5s;
    transition: all ease-out 2.5s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(7) {
    -webkit-transition: all ease-out 2.8s;
    -moz-transition: all ease-out 2.8s;
    -ms-transition: all ease-out 2.8s;
    -o-transition: all ease-out 2.8s;
    transition: all ease-out 2.8s;
  }
  .top-bar > .container > .user-count > .user-count-num > span:nth-child(8) {
    -webkit-transition: all ease-out 3.1s;
    -moz-transition: all ease-out 3.1s;
    -ms-transition: all ease-out 3.1s;
    -o-transition: all ease-out 3.1s;
    transition: all ease-out 3.1s;
  }
  .top-bar > .container > .user-count > span {
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    display: block;
    height: 24px;
    color: #333;
  }
  .top-bar > .container > .search-bar {
    width: 800px;
    float: right;
    height: 80px;
    padding-top: 20px;
  }
  .top-bar > .container > .search-bar > .search-container {
    width: 800px;
    height: 46px;
    position: relative;
  }
  .top-bar > .container > .search-bar > span, .top-bar > .container > .search-bar > span > a {
    color: #6aa2e4;
    text-decoration: none;
    line-height: 28px;
    font-size: 14px;
  }
  .top-bar > .container > .search-bar > .search-container > form {
    display: block;
    height: 100%;
    width: 100%;
  }
  .top-bar > .container > .search-bar > .search-container * {
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
    outline: none;
  }
  .top-bar > .container > .search-bar > .search-container > form > input {
    display: block;
    width: 644px;
    padding: 0 16px;
    line-height: 46px;
    font-size: 16px;
    height: 100%;
    border: solid 2px #6aa2e4;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .top-bar > .container > .search-bar > .search-container > form  .form--button {
    display: block;
    width: 156px;
    background: #6aa2e4;
    height: 100%;
    position: absolute;
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #fff;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .top-bar > .container > .search-bar > span > a {
    display: inline-block;
    padding: 0 3px;
  }
  .top-bar > .container > .search-bar > span, .top-bar > .container > .search-bar > span > a {
    color: #6aa2e4;
    text-decoration: none;
    line-height: 28px;
    font-size: 14px;
  }
  .mid-bar {
    padding-bottom: 24px;
  }
  .mid-bar .intern-type {
    height: 408px;
    width: 260px;
    background: #fafafa;
    font-size: 14px;
    position: relative;
  }
  .mid-bar .intern-type>div.type-head, .mid-bar .intern-type>div.type-item a, .mid-bar .intern-type>div>.type-list a {
    font-size: 14px;
    color: #666;
    text-decoration: none;
    line-height: 38px;
  }
  .banner-sub > a:first-child {
    margin-left: 0;
  }
  .banner-sub > a {
    display: block;
    height: 96px;
    width: 191px;
    float: left;
    margin-left: 12px;
    color: #fff;
    position: relative;
    overflow: hidden;
    text-decoration: none;
  }
  .mid-bar .intern-type>div {
    height: 40px;
    line-height: 40px;
    /* overflow: hidden; */
    padding: 0 15px;
    font-size: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: solid 1px transparent;
    border-bottom: solid 1px #f5f5f5;
    position: relative;
  }
  .mid-bar .intern-type>div.type-item {
    background: #fafafa;
  }
  .mid-bar .intern-type>div.type-item a:first-child, .mid-bar .intern-type>div.type-list a:first-child {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  .mid-bar .intern-type>div.type-item a, .mid-bar .intern-type>div>.type-list a {
    display: inline-block;
    padding-right: 12px;
  }
  .mid-bar .intern-type>div.type-head, .mid-bar .intern-type>div.type-item a, .mid-bar .intern-type>div>.type-list a {
    font-size: 14px;
    color: #666;
    text-decoration: none;
    line-height: 38px;
  }
  .mid-bar .intern-type>div>.type-list {
    position: absolute;
    left: 259px;
    width: 600px;
    padding: 6px 12px 0 16px;
    border: solid 1px #D1D4DB;
    background: #fff;
    top: 0;
    z-index: 999;
    display: none;
    margin-top: -12px;
  }
  .mid-bar .banner {
    height: 408px;
    width: 800px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .slider-container {
    width: 800px;
    height: 408px;
    position: relative;
    overflow: hidden;
  }
  .slider-container > .slider-nav > div, .slider-container > .prev, .slider-container > .next, .slider-container > .slider-wrap {
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }
  .banner-sub > a:nth-child(2) {
    background: #50cf8e;
  }
  .company-list>.container {
    height: 90px;
    padding-bottom: 20px;
  }
  .company-item {
    height: 90px;
    width: 90px;
    display: block;
    float: left;
    margin-right: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: solid 1px #eee;
    text-align: center;
    padding-top: 12px;
    text-decoration: none;
    position: relative;
    background: no-repeat center/cover;
  }
  .company-item>div {
    opacity: 0;
    position: relative;
    z-index: 3;
    padding: 0 8px;
    word-break: break-all;
  }
  .company-item>.company-t {
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 4px;
    color: #fff;
  }

  .company-item>.company-d {
    font-size: 12px;
    line-height: 16px;
    color: #eee;
  }
  .company-item:last-child {
    margin-right: 0;
  }
  .intern-list .container {
    padding-bottom: 128px;
  }
  .intern-nav {
    height: 40px;
    width: 100%;
    background: #fafafa;
    font-size: 0;
  }
  .intern-nav > .intern-nav-item.active {
    background: #fff;
    color: #6aa2e4;
  }
  .intern-nav > .intern-nav-item {
    display: inline-block;
    font-size: 14px;
    padding: 0 18px;
    color: #333;
    line-height: 40px;
    cursor: pointer;
    position: relative;
  }
  .intern-nav > a {
    color: #999;
    line-height: 40px;
    display: inline-block;
    font-size: 12px;
    padding: 0 12px;
    text-decoration: none;
    float: right;
  }
  .intern-content {
    width: 1080px;
    overflow: hidden;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }
  .intern-content>.intern-content-container {
    width: 300%;
    position: relative;
    overflow: hidden;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
    -webkit-transform: translate3D(0px, 0, 0);
    -moz-transform: translate3D(0px, 0, 0);
    -ms-transform: translate3D(0px, 0, 0);
    -o-transform: translate3D(0px, 0, 0);
    transform: translate3D(0px, 0, 0);
  }
  .intern-content>.intern-content-container>.intern-content-item {
    float: left;
    width: 1080px;
    min-height: 110px;
    cursor: default;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href {
    float: left;
    height: 110px;
    width: 525px;
    border-bottom: dashed 1px #eaeaea;
    padding-right: 30px;
    position: relative;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href span, .intern-content>.intern-content-container>.intern-content-item>.intern-content-href a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href a {
    text-decoration: none;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href >.intern-logo .intern-logo-img {
    position: absolute;
    top: 22px;
    left: 452px;
    width: 70px;
    height: 70px;
    border: solid 1px #eaeaea;
    background: no-repeat center/cover;
  }
  .intern-list .intern-more {
    position: relative;
    margin-top: 22px;
    background: #6aa2e4;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    float: right;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding: 0 12px 0 18px;
    text-decoration: none;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-title, .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-title a {
    padding-top: 12px;
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-title a {
    max-width: 360px;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-title a {
    display: inline-block;
    padding-top: 0;
    line-height: 32px;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-title > a.winter {
    cursor: pointer;
    /*background: url(../img/home/winter_icon.png) no-repeat center/contain;*/
    width: 18px;
    height: 18px;
    margin: 7px 0 0 10px;
    vertical-align: top;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-sub, .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-sub a {
    line-height: 28px;
    font-size: 14px;
    color: #666;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .link {
    color: #6aa2e4 !important;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-info > span {
    display: inline-block;
    vertical-align: top;
    padding-right: 24px;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href:after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 111px;
    width: 1px;
    border-right: 1px dashed #eaeaea;
    right: 14px;
    top: 0;
    background-color: #fff;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-info, .intern-content>.intern-content-container>.intern-content-item>.intern-content-href .intern-info a {
    line-height: 28px;
    font-size: 14px;
    color: #666;
  }
  .intern-content>.intern-content-container>.intern-content-item>.intern-content-href:nth-child(2n) {
    padding-right: 0;
  }
}

</style>

