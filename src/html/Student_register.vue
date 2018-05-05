<template>
  <div class="company_register" :style="{backgroundImage:`url(${bgImage})`}">
    <div class="company_register_box">
      <div class="company_register_logo" :style="{backgroundImage:`url(${registerLogo})`}"></div>
      <h3 class="title">学生注册</h3>
      <div class="phone_register_box">
        <!--手机注册  左侧-->
        <div class="register_box_1">
          <h3>手机注册</h3>
          <input type="text" placeholder="请输入常用手机号码" class="disabled" v-model="phone" v-on:blur="DeterminePhone()"/>
          <input type="password" placeholder="请输入密码" v-model="password"/>
          <!--验证码-->
          <div class="register_box_1_div">
            <input class="box_1_div_left" type="text" v-model="getImgCode" placeholder="请输入验证码">
            <a  @click="imgC(imgCode)"><img class="box_1_div_right" v-bind:src="imgCode" alt="验证码"></a>
          </div>
          <!--验证短信-->
          <div class="register_box_1_div">
            <input class="box_1_div_left" type="text" v-model="captcha" placeholder="请输入短信验证码">
            <input type="button" class="box_1_div_right message" v-on:click="GetTheVerificationCode()" value="获取短信验证码">
          </div>
          <p>
            <input type="checkbox"  v-model="notToApprove" @click="AllFillIn()"><span>我已阅读并同意 <router-link class="protocol" to="/companyregisterprotocol" target="_blank">《用户协议》</router-link></span>
          </p>
          <input type="button" :class="{'company_register_btn':registrationIsAvailable,'company_register_btn2':!registrationIsAvailable}" v-on:click="registered()"  value="注册" >
        </div>
        <!--已有账号  右侧-->
        <div class="register_box_2">
          <p>已有账号？直接 <router-link to="./StudentHome">登录</router-link></p>
          <!--二维码-->
          <div class="erweima" style="backgroundImage:url(http://39.106.117.195/image/mentugongzhonghao.jpg)"></div>
          <p>扫描登录微信公众号</p>
        </div>
      </div>
    </div>
    <div class="cover" v-if="completeTheRegistration">
      <div class="complete_registration">
        <div>
          <img src="http://39.106.117.195/image/logo/logo.png">
        </div>
        <div class="bg_fff">
          <div class="text"><span>恭喜你,完成注册</span></div>
          <div class="but">
            <router-link to="/Perfect_information">
              <button v-on:click="JumpPerfect_information()">完善资料</button>
            </router-link>
            <router-link to="/StudentHome">
              <button v-on:click="Return_to_the_home_page()">返回首页</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {common} from '../js/common.js';
  export default {
    name: 'app',
    data () {//变量
      return {
        page:{},
        password:"",
        captcha:"",
        phone:"",
        imgCode:"http://39.106.117.195:8080/disciple-front/api/imageCaptcha/getImgCaptcha?",
        getImgCode:"",
        completeTheRegistration:false,
        registrationIsAvailable:false,
        notToApprove:false,
        bgImage: 'http://39.106.117.195/image/Snip20171217_19.png',
        registerLogo: 'http://39.106.117.195/image/conpany_register_logo.png',
        erweima: 'http://39.106.117.195/image/mentugongzhonghao.jpg',
      }
    },
    mounted () {//初始化
    },
    methods:{//方法
      //光标离开手机号时进行判断
      DeterminePhone:function () {

        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.phone!=""){
          if (!myreg.test(this.phone)) {
            alert("手机号格式错误")
          } else {
            this.imgCode=this.c_url+"/api/imageCaptcha/getImgCaptcha?"
            //this.GetTheImageVerificationCode();
            this.imgCode=this.imgCode+"captchaId="+this.phone;
          }
        }
      },
      imgC(url){
        this.imgCode="http://39.106.117.195:8080/disciple-front/api/imageCaptcha/getImgCaptcha?captchaId="+this.phone+"&type="+Math.random(2)+"";
      },
      //返回首页
      Return_to_the_home_page: function () {
        let vue = this;
        vue.$router.push('./StudentHome');
      },
      //完善信息
      JumpPerfect_information:function(){
        let vue = this
        vue.$router.push('./Perfect_information');
      },
      //判断手机号是否重复
      PhoneRepetition:function () {
        this.getData('/api/member/checkMobile',{captchaId:this.phone}).then((res) => {
          //this.imgCode=res.data;
        }, (err) => {
          console.log(err);
        });
      },
      //获取短信验证码
      GetTheVerificationCode:function(){
        if(this.getImgCode!=""){
          this.postData('/api/smsCaptcha/add',{},{captchaType: "memberRegister",imageCaptcha: this.getImgCode,mobile:this.phone}).then(   (res) => {
            if(res.data.code==0){
              $(".disabled").attr("disabled","disabled");
              this.AllFillIn();
            }else{
              alert(res.data.message)
            }
            console.log(res.data);
          }, (err) => {
            console.log(err);
          });
        }else{
          alert("请输入图片验证码！！！")
        }


      },
      //判断是否完成所有填写
      AllFillIn:function(){
        if(this.phone!=""&&this.password!=""&&this.captcha!=""&&!this.notToApprove){
          this.registrationIsAvailable=true;
        }else{
          this.registrationIsAvailable=false;
        }
      },
      //注册
      registered:function(){
        if(this.registrationIsAvailable){
          this.postData2('/api/member/add',{captcha: this.captcha,mobile:this.phone,password:this.password,type:"1"}).then((res) => {
            console.log(res.data);
            window.localStorage.setItem("token",res.data.data.token);
            this.postData2("/api/session/add",{identifier: this.phone,identityType: "mobile",password: this.password,type: "1"}).then((res) => {
              if(res.data.code==0){
                window.localStorage.setItem('USER', JSON.stringify(this.user));
                window.localStorage.setItem('S_id', JSON.stringify(res.data.data));
                window.localStorage.setItem("token",res.data.data.token);
                window.localStorage.setItem("type",res.data.data.type);
                this.page.ifHomeLogin = false;
                common.$emit("iflogin", true);
              }else{
                console.log(res.data.message)
              }
            }, (err) => {
              console.log(err);
            });
            if(res.data.code==0){
              this.completeTheRegistration=true;
            }
          });
        }else{
          console.log("请填写所有信息后点击注册！！！")
        }
      }

    }

  }
</script>
<style scoped>
  .company_register {
    overflow: hidden;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    padding: 30px 0;
  }
  .title{
    line-height: 60px;
  }
  .company_register_box {
    width: 700px;
    height: 550px;
    margin: 50px auto;
    overflow: hidden;
  }

  .phone_register_box > div {
    float: left;
  }

  .company_register_logo {
    width: 150px;
    height: 50px;
    background-repeat: no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  .company_register_box > h3 {
    float: left;
    color: #e9f0fa;
    margin-left: 30px;
  }

  .phone_register_box {
    width: 91%;
    height: 80%;
    background-color: #fff;
    margin-top: 65px;
    padding: 31px;
  }

  .register_box_1 {
    width: 58%;
  }

  .register_box_1 > input {
    width: 86%;
    height: 40px;
    outline: none;
    padding: 0 10px;

  }

  .register_box_1 > * {
    margin-bottom: 20px;
  }

  .register_box_1 input, img {
    border-radius: 5px;
    border: 1px solid #eee;
  }
  .register_box_1 input{
    padding: 0 10px;
  }
  .register_box_1_div {
    width: 92%;
    height: 40px;
  }

  .box_1_div_left {
    width: 53%;
    height: 100%;
    float: left;
  }

  .box_1_div_right {
    width: 38%;
    height: 100%;
    float: right;
    border: none;
  }

  .message {
    background-color: #69a2e5;
    color: #fff;
    border: none;
    outline: none;
    text-align: center;
    font-size: 1em;
  }

  .protocol {
    text-decoration: none;
    color: #8eb8eb;
  }
  .company_register_btn2 {
    background-color: #ddd;
    text-align: center;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1.5em;
  }
  .company_register_btn {
    background-color: #69a2e5;
    text-align: center;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1.5em;
  }

  /*已有账号  微信  二维码*/
  .register_box_2 {
    color: #b9b9b9;
    text-align: center;
    width: 41%;
    border-left: 1px dashed #d9d9d9;
    padding-top: 30px;
  }

  .register_box_2 p {
    width: 100%;

  }

  .register_box_2 a {
    color: #8eb8eb;
    text-decoration: none;
  }

  .register_box_2 div {
    margin: 20px auto;
  }

  .weixin_logo {
    width: 40px;
    height: 40px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .register_box_2 .erweima {
    width: 130px;
    height: 130px;
    margin-top: 50px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }
  .cover{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0px;
    left: 0px;
    padding-top: 10px;
  }
  .complete_registration{
    background: #efefef;
    height: 290px;
    width: 400px;
    margin: 200px auto 0;
    padding: 3px ;
  }
  .bg_fff{
    background: #fff;
    border-radius: 5px;
    height: 250px;

  }
  .cover .text{
    padding-top: 20px;
    line-height: 150px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }
  .cover .but{
    padding-top: 20px;
    text-align: center;
  }
  .cover .but button{
    border: none;
    background: #84b0e5;
    color: #fff;
    width: 120px;
    height: 40px;
    border-radius: 5px;
  }
</style>
