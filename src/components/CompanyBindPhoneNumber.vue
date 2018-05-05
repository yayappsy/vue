<template>
  <div class="company_register" :style="{backgroundImage:`url(${bgImage})`}">
    <div class="company_register_box">
      <div class="company_register_logo" :style="{backgroundImage:`url(${registerLogo})`}"></div>
      <h3 class="title">找回密码</h3>
      <div class="phone_register_box">
        <!--手机注册  左侧-->
        <div class="register_box_1">
          <input type="text" placeholder="请输入账号" class="disabled" v-model="page.phone" v-on:blur="DeterminePhone()"/>
          <!--验证码-->
          <div class="register_box_1_div">
            <input class="box_1_div_left" type="text" v-model="getImgCode" placeholder="请输入验证码">
            <a  @click="imgC(imgCode)"><img class="box_1_div_right" v-bind:src="imgCode" alt="验证码"></a>
          </div>
          <!--验证短信-->
          <div class="register_box_1_div">
            <input class="box_1_div_left" type="text" v-model="page.captcha" placeholder="请输入短信验证码">
            <input type="button" class="box_1_div_right message" v-on:click="GetTheVerificationCode()" value="获取短信验证码">
          </div>
          <input type="password" placeholder="请输入新密码" v-model="page.password"/>
          <input type="button" class="queren" v-on:click="registered()"  value="确认" >
        </div>
      </div>
    </div>
    <div class="cover" v-if="completeTheRegistration">
      <div class="complete_registration">
        <div>
          <img src="http://39.106.117.195/image/logo/logo.png">
        </div>
        <div class="bg_fff">
          <div class="text"><span>恭喜你！密码找回成功</span></div>
          <div class="but">
            <router-link to="/StudentHome">
              <button>返回首页</button>
            </router-link>
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
        page:{},
        imgCode:"http://39.106.117.195:8080/disciple-front/api/imageCaptcha/getImgCaptcha?",
        getImgCode:"",
        completeTheRegistration:false,
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
        if(this.page.phone!=""){
          if (!myreg.test(this.page.phone)) {
            alert("手机号格式错误")
          } else {
            this.imgCode=this.c_url+"/api/imageCaptcha/getImgCaptcha?"
            //this.GetTheImageVerificationCode();
            this.imgCode=this.imgCode+"captchaId="+this.page.phone;
          }
        }
      },
      //点击验证码更换
      imgC(url){
        this.imgCode="http://39.106.117.195:8080/disciple-front/api/imageCaptcha/getImgCaptcha?captchaId="+this.page.phone+"&type="+Math.random(2)+"";
      },

      //获取短信验证码
      GetTheVerificationCode:function(){
        if(this.getImgCode!=""){
          console.log(this.page.phone+this.getImgCode);
          this.postData('/api/smsCaptcha/add',{},{captchaType: "findPassword",imageCaptcha: this.getImgCode,mobile:this.page.phone}).then((res) => {
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
        console.log(this.page.phone)
        if(this.page.phone!=undefined&&this.page.password!=undefined&&this.page.captcha!=undefined&&this.page.phone!=""&&this.page.password!=""&&this.page.captcha!=""){
          return true;
        }else{
          return false;
        }
      },

      //找回密码
      registered:function(){
        console.log(this.AllFillIn())
        if(this.AllFillIn()){
          this.postData2('/api/password/find',{captcha: this.page.captcha,mobile:this.page.phone,password:this.page.password,type:"2"}).then((res) => {
            window.localStorage.setItem("token",res.data.data.token);
            if(res.data.code==0){
              this.completeTheRegistration=true;
            }
          });
        }else{
          alert("有输入框为空!!!")
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
  .queren{
    background: #69a2e5;
    width: 100%;
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
    background-color: rgba(255,255,255,0.5);
    margin-top: 65px;
    padding: 31px;
  }

  .register_box_1 {

    width: 80%;
    margin: 50px auto 0;
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
