<template>
  <div class="company-account-verification_1">
    <div class="verification_box">
      <div class="box">
        <div class="box_inner">
          <div class="box_1 blueBox">
            <div class="icon blueIcon"></div>
            <p>邮箱验证</p>
          </div>
        </div>

      </div>
    </div>
    <div class="verification_inputs">
      <input type="text" placeholder="请填写公司法律名称" v-model="companyName" disabled="disabled">
      <input type="text" placeholder="13827681468@163.com" v-model="companyEmail" disabled="disabled">
      <input type="text" placeholder="请填写邮箱验证码" v-model="verificationString">
      <p>没有收到邮件验证码怎么办</p>
      <p>1、邮件有时候会进入垃圾邮件，广告邮件</p>
      <p>2、稍等几分钟，若还未收到，重新发送验证邮件</p>
      <p>3、仍未收到邮件验证码，请联系我们：{{meEmail}}</p>
      <div class="btns">
        <router-link class="router" id="prev" to="/companyaccount/companyaccountverification_1">
          上一步
        </router-link>
        <span class="router" id="next" @click="submit()">
          下一步
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-account-verification_1",
    data() {
      return {
        cid:"",
        companyName: '',
        companyEmail: '',
        verificationString: '',
        meEmail:"未知"
      }
    },
    mounted () {//初始化
      this.cid=window.localStorage.getItem('C_id');
      this.WhetherToEnterValidation();
    },
    methods: {
      //判断是否进入验证
      WhetherToEnterValidation:function () {
        this.postData("/api/homepage/isHaveEmail",{companyId:this.cid},{}).then((res) => {
          if(res.data.code==0){
            if(res.data.data){
              alert("邮箱验证！！！")
            }else{
              this.getCompanyInfo();
            }
          }else{
            console.log(res.data.message)
          }
        });
      },
      //获取信息
      getCompanyInfo:function () {
        this.postData("/api/companyDetail/companyInfo",{companyId:this.cid},{}).then((res) => {
          console.log(res.data.data)
          if(res.data.code==0){
            this.companyEmail=res.data.data.email;
            this.companyName=res.data.data.name;
            if(this.companyName&&this.companyEmail){
              this.GetTheMailboxVerificationCode();
            }
          }else{
            console.log(res.data.message)
          }
        });
      },
      //获取邮箱验证码
      GetTheMailboxVerificationCode:function () {
        this.postData("/api/AccountManage/getEmailCaptcha",{companyId:this.cid},{}).then((res) => {
          //console.log(res.data.data)

          if(res.data.code==0){
            this.SendEmailVerificationCode(res.data.data);
          }else{
            console.log(res.data.message)
          }
        });
      },
      //发送邮箱验证码
      SendEmailVerificationCode:function (code) {
        let c_data=JSON.parse(window.localStorage.getItem("C_DATA"));
        let data={
          "email": this.companyEmail,
          "fromAlias": this.companyName,
          "htmlBody": '<h2>'+code+'</h2>',
          "subject": "验证码:"
        }
        this.postData2("/api/jobInManager/sendEmail",data).then((res) => {
          console.log(res);
          if(res.data.code==0){
            alert("邮箱验证码发送成功！！")
          }
        })
      },
      //提交？下一步
      submit:function () {

        this.postData("/api/AccountManage/commitCaptcha",{companyId:this.cid,legalName:this.companyName,captcha:this.verificationString},{}).then((res) => {
          //console.log(res.data.data)
          if(res.data.code==0){
            this.$router.push('companyaccountverification_2');
          }else{
            console.log(res.data.message)
          }
        });
      }
    }
  }
</script>

<style scoped>
  .verification_box {
    width: 100%;
    height: 120px;
    /*background-color: #add;*/
  }

  .box {
    width: 70%;
    height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
  }

  .box_1, .box_2, .box_3 {
    height: 60px;
    width: 60px;
    text-align: center;
    margin-top: 40px;
    float: left;
    display: inline-block;
    font-size: 0.8em;
    color: #aeaeae;
    /*border: 1px solid #eee;*/
  }

  .box_inner {
    width: 109%;
    margin-left: -30px;
  }

  .box_1 {
    float: left;
  }

  .box_2 {
    margin: 40px 38%;

  }

  .box_3 {
    float: right;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    border-radius: 15px;
    border: 1px solid #eee;
    background-color: #fff;
  }

  .blueIcon {
    background-color: #02a0e9;
    border-color: #02a0e9;
  }

  .blueBox {
    color: #02a0e9;
  }

  .verification_inputs {
    width: 45%;
    margin: 10px auto;
  }

  .verification_inputs input {
    display: block;
    width: 97%;
    height: 30px;
    padding-left: 10px;
    margin: 10px 0;
    border: 1px solid #eee;
    border-radius: 5px;
    outline: none;
  }

  .verification_inputs p {
    color: #b5b5b5;
    font-size: 10px;
  }

  .btns {
    width: 100%;
    height: 30px;
    padding: 30px 0;
  }

  #prev {
    float: left;
    width: 100px;
    height: 30px;
    border: 1px solid #02a0e9;
    border-radius: 5px;
    color: #02a0e9;
  }

  #next {
    float: right;
    width: 100px;
    height: 30px;
    border: 1px solid #02a0e9;
    background-color: #02a0e9;
    border-radius: 5px;
    color: #fff;
  }
  .router{
    text-align: center;
    text-decoration: none;
    line-height: 30px;
  }
</style>
