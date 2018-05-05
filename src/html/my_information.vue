<template>
  <div class="my_information">
    <div class="left-box">
      <div class="user-info">
        <img :src="data.avatar" alt="" class="head-box">
        <span class="user-name">{{data.name}}</span>
        <router-link class="back link" to="/Personal_Center">返回个人中心</router-link>
      </div>
      <ul class="left-nav">
        <router-link to="/my_information/my_match">
          <li>
            <h2><span
              style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/intern_text_p1.png?v=639a6f549f0246474a923692764cd515)"></span>推荐职位<span></span>
            </h2>
            <span class="nav_msg">大数据小哥哥为你量身定制</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/img/right-jt.png?v=63f90b3e21404408f8518757accdb3b6" alt=""
                 width="20">
          </li>
        </router-link>
        <router-link to="/my_information/my_collect">
          <li class="active">
            <h2 class="nav-name"><span
              style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/intern_text_p2.png?v=819886b223f6d17cc6933ec861d978b5)"></span>我的收藏<span></span>
            </h2>
            <span class="nav_msg">把喜欢的放在这里</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/img/right-jt.png?v=63f90b3e21404408f8518757accdb3b6" alt=""
                 width="20">
          </li>
        </router-link>
        <!--<router-link class="" to="/my_information/my_invite">-->
          <!--<li>-->
            <!--<h2 class="nav-name"><span-->
              <!--style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/intern_text_p3.png?v=2f777f12c12cf5fd60893f30e3305ee7)"></span>职位邀请<span>(0)</span>-->
            <!--</h2>-->
            <!--<span class="nav_msg invite_msg">立即开启，让职位主动来找你</span>-->
            <!--<img src="https://sxsimg.xiaoyuanzhao.com/static/img/right-jt.png?v=63f90b3e21404408f8518757accdb3b6" alt=""-->
                 <!--width="20">-->
          <!--</li>-->
        <!--</router-link>-->
        <router-link class="" to="/my_information/my_message">
          <li>
            <h2 class="nav-name"><span
              style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/intern_text_p3.png?v=2f777f12c12cf5fd60893f30e3305ee7)"></span>我的私信<span></span>
            </h2>
            <span class="nav_msg invite_msg">立即开启，让职位主动来找你</span>
            <img src="https://sxsimg.xiaoyuanzhao.com/static/img/right-jt.png?v=63f90b3e21404408f8518757accdb3b6" alt=""
                 width="20">
          </li>
        </router-link>
      </ul>
    </div>
    <div class="right-box">
      <router-view class="router_link"></router-view>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        userImg:'img/home/default_headpic.png',
        data:{},
      }
    },
    mounted() {
      // console.log(this.c_url);
      // this.c_url="111";
      // console.log(this.c_url);
      this.getUserData();
    },
    methods:{
      //获取个人信息
      getUserData(){
        //个人信息
        this.postData("/api/resume/getUser", {userId: JSON.parse(window.localStorage.getItem("S_id")).id}).then((res) => {
          if (res.data.code == 0) {
            this.data= res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
      },
    }
  }
</script>
<style>

  my_information * {
    margin: 0;
    padding: 0;
    list-style-type: none;
    outline: none;
    text-decoration: none;
    font-size: 14px;
    border-style: none;
    font-family: PingFang SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }

  .my_information {
    width: 1080px;
    margin: auto;
    min-height: 800px;
  }

  .user-info {
    padding: 38px 20px 36px 20px;
    position: relative;
  }

  .head-box {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }

  img {
    border: 0;
  }

  ::selection {
    background: #02a0e9;
    color: white;
  }
  .right-box {
    width: 742px;
    float: right;
    min-height: 700px;
    position: relative;
  }
  .left-box {
    width: 280px;
    margin-top: 20px;
    float: left;
    background-color: #f9f9f9;
  }

  .user-name {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    left: 120px;
    top: 50px;
    color: #333;
  }

  .link {
    color: #6aa2e4;
  }

  .back {
    position: absolute;
    left: 120px;
    top: 82px;
  }

  .left-nav li {
    height: 59px;
    padding: 30px 20px;
    border-top: 1px solid #e5edf2;
    cursor: pointer;
    position: relative;
  }

  .left-nav {
    width: 100%;
  }

  .left-nav li {
    height: 59px;
    padding: 30px 20px;
    border-top: 1px solid #e5edf2;
    cursor: pointer;
    position: relative;
  }

  a {
    color: #999;
    text-decoration: none;
  }

  h2 {
    font-size: 18px;
    /* font-weight: normal; */
    margin: 8px 0 6px 0;
    cursor: pointer;
    color: #3a3a3a;
    letter-spacing: 1px;
    /* margin-left: 50px; */
  }

  h2 span, .info-list span {
    color: #999;
    font-weight: 500;
    letter-spacing: 0;
  }

  h2 > span {
    vertical-align: top;
    font-size: 18px;
  }

  .left-nav li .nav_msg {
    font-size: 14px;
    color: #999;
  }

  .left-nav li img {
    position: absolute;
    top: 50px;
    right: 20px;
  }
</style>
