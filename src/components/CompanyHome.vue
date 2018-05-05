<template>
  <div class="company-home">
    <!--登录框-->
    <div class="home_1" :style="{backgroundImage:`url(${home_1})`}">
      <div class="main">
        <!--登录框-->
        <div class="loginBox">
          <h3>登 录</h3>
          <input v-model="user.identifier" type="text" placeholder="请输入邮箱/手机号">
          <input v-model="user.password" type="password" placeholder="请输入密码">
          <input id="login" type="button" v-on:click="login()" value="立即登录">
          <div>
            <router-link id="forgetpwd" to="/companybindphonenumber">忘记密码？</router-link>
            <router-link id="companyfreeregist" to="/companyregister">企业免费注册</router-link>
          </div>
        </div>
      </div>
    </div>
    <!--4个图标-->
    <div class="home_2">
      <div class="home_2_iconBox">
        <div class="home_2_icon" :style="{backgroundImage:`url(${icon_1})`}"></div>
        <h2>精准高效</h2>
        <p>
          精准匹配，1分钟收简历
        </p>
      </div>
      <div class="home_2_iconBox">
        <div class="home_2_icon" :style="{backgroundImage:`url(${icon_2})`}"></div>
        <h2>人才优质</h2>
        <p>
          重点高校园精英一网打尽
        </p>
      </div>
      <div class="home_2_iconBox">
        <div class="home_2_icon" :style="{backgroundImage:`url(${icon_3})`}"></div>
        <h2>完全免费</h2>
        <p>
          0成本0费用随心招聘
        </p>
      </div>
      <div class="home_2_iconBox">
        <div class="home_2_icon" :style="{backgroundImage:`url(${icon_4})`}"></div>
        <h2>专属服务</h2>
        <p>
          VIP定制招聘服务"量体裁衣"
        </p>
      </div>
    </div>
    <!--海量优质人才-->
    <div class="home_3">
        <h2>海量优质人才随你选</h2>
        <div class="school">
          <div id="school_scroll" style="margin: 0 auto;">
            <div class="school_icon " :style="{backgroundImage:`url(${school_icon_1})`}"></div>
            <div class="school_icon " :style="{backgroundImage:`url(${school_icon_2})`}"></div>
            <div class="school_icon " :style="{backgroundImage:`url(${school_icon_3})`}"></div>
            <div class="school_icon " :style="{backgroundImage:`url(${school_icon_4})`}"></div>
            <div class="school_icon " :style="{backgroundImage:`url(${school_icon_5})`}"></div>
          </div>
      </div>

    </div>
    <!--与门徒求职同行-->
    <div class="home_4">

        <h2>与门徒求职同行</h2>
          <div class="" style="background: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/com-si-logos.png) no-repeat center  0; height: 200px;text-align: center;margin-top: 20px;"></div>
    </div>
  </div>
</template>

<script>
  import {common} from '../js/common.js';
  export default {
    name: "company-home",
    data() {
      return {
        user:{
          identifier: "",
          identityType: "mobile",
          password: "",
          type:"2"
        },
        icon_1: 'http://39.106.117.195/image/companyHomeImages/company_login_1.png',
        icon_2: 'http://39.106.117.195/image/companyHomeImages/company_login_2.png',
        icon_3: 'http://39.106.117.195/image/companyHomeImages/company_login_3.png',
        icon_4: 'http://39.106.117.195/image/companyHomeImages/company_login_4.png',
        home_1: 'http://39.106.117.195/image/companyHomeImages/home_1.png',
        school_icon_1: 'http://39.106.117.195/image/companyHomeImages/school_1.png',
        school_icon_2: 'http://39.106.117.195/image/companyHomeImages/school_2.png',
        school_icon_3: 'http://39.106.117.195/image/companyHomeImages/school_3.png',
        school_icon_4: 'http://39.106.117.195/image/companyHomeImages/school_4.png',
        school_icon_5: 'http://39.106.117.195/image/companyHomeImages/school_5.png',

      }
    },
    mounted() {//初始化

      this.user={
        identifier: "",
        identityType: "mobile",
        password: "",
        type:"2"
      }
      this.localStorageUser();
    },
    methods: {
      //登录
      login: function () {
        if (this.user.identifier != "") {
          if (this.user.password != "") {
            this.postData2("/api/session/add",this.user).then((res) => {
              if (res.data.code == 0) {
                window.localStorage.setItem('C_USER', JSON.stringify(this.user));
                window.localStorage.setItem('C_DATA', JSON.stringify(res.data.data));
                window.localStorage.setItem("token",res.data.data.token);
                window.localStorage.setItem("type",res.data.data.type);
                common.$emit("iflogin", true);
                this.postData("/api/companyDetail/getCompanyId", {id: res.data.data.id}).then((res) => {
                  if (res.data.code == 0) {
                    if (res.data.data == ""||res.data.data==[]) {
                      this.$router.push('/companybaseinformation');
                    } else {
                      window.localStorage.setItem('C_id', res.data.data);
                      this.$router.push('/companyhr');
                    }
                  } else {
                    console.log(res.data.message == 0);
                  }
                });
              } else {
                console.log(res.data.message);
              }
            })
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
        if (window.localStorage.getItem('C_USER')) {
          //登录代码
          this.user=JSON.parse(window.localStorage.getItem('C_USER'));
        }
      },
    }
  }
</script>

<style scoped>
  /*登录框所在背景*/

  .company-home .home_1 {
    width: 100%;
    height: 400px;
    background-color: #afd;
    /*background-image: url('../assets/companyHomeImages/home_1.png');*/
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    border-top: 2px solid #ececec;
  }

  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .loginBox {
    width: 224px;
    height: 264px;
    background-color: #fff;
    float: right;
    position: absolute;
    top: 50px;
    right: 75px;
    /*margin: 50px 65px;*/
    padding: 16px;
    box-shadow: 0px 1px 2px 2px #4191bc;
  }

  .loginBox h3 {
    text-align: center;
  }

  .loginBox input {
    margin-top: 1em;
    margin-bottom: 1.5em;
    display: block;
    width: 85%;
    height: 13%;
    padding: 0 1em;
    font-size: 1em;
    outline: none;
    /*color: #eee;*/
  }

  /*登录按钮*/
  .loginBox #login {
    color: #fff;
    border: none;
    outline: none;
    width: 225px;
    height: 15%;
    margin-top: 2em;
    background-color: #02a0e9;
    margin-bottom: 0.8em;
    cursor: pointer;

  }

  /*忘记密码*/
  #forgetpwd {
    color: #000;
    text-decoration: none;
    font-size: 0.8em;
    float: left;
  }

  /*企业免费注册*/
  #companyfreeregist {
    text-decoration: none;
    font-size: 0.8em;
    float: right;
  }

  /*4个图标*/
  .company-home .home_2 {
    width: 100%;
    height: 300px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .company-home .home_2 .home_2_iconBox {
    height: 170px;
    width: 180px;
    margin: 30px;
    float: left;
    font-size: 0.8em;
    text-align: center;
  }

  .company-home .home_2 .home_2_icon {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  /*第三块 海量人才*/
  .company-home .home_3 {
    width: 100%;
    height: 250px;
    background-color: #02a0e9;
    color: #fff;
    padding: 3em 0;
  }

  .company-home .home_3 h2 {
    text-align: center;
  }

  .company-home .home_3 .school {
    width: 900px;
    height: 110px;
    margin: 3em auto;

    display: flex;
    align-items: center;
  }

  /*右箭头*/
  #school_right {
    background-image: url('../assets/companyHomeImages/right.png');
  }

  /*左右箭头 相同样式*/
  #school_left, #school_right {
    width: 100px;
    height: 100px;
    float: left;
    background-color: #add;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  /*各校校徽*/
  #school_scroll {
    width: 700px;
    height: 100px;
    float: left;
    /*background-color: #fff;*/
  }

  /*校徽相同样式*/
  #school_scroll .school_icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 0 20px;
  }

  /*第四块 与门徒同行*/
  .home_4 {
    width: 100%;
    height: 250px;
    padding: 3em 0;
    background-color: #f4f5f7;
  }

  .home_4 h2 {
    text-align: center;
  }

  .h_4_ionicBox {
    width: 1000px;
    height: 200px;
    margin: 40px auto;
    list-style: none;
    column-count: 6;
  }

  .h_4_icon {
    display: inline-block;
    margin-bottom: 40px;
    margin-left: 10px;
  }

  .h_4_icon div {
    text-align: center;
    width: 120px;
    height: 40px;
    background-color: #fff;
    /*background-image: url("../assets/companyHomeImages/allibaba.png");*/
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }
</style>
