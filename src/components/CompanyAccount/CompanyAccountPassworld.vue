<template>
  <div class="company-account-passworld">
    <div class="passworld_div" style="padding-top: 100px">
      <div class="account_input_box">
        <span style="margin-right: 2%">当前账号</span>
        <span style="display: block;width: 70%;float: right;text-align: left;">{{reset.mobile}}</span>
      </div>
      <div class="account_input_box">
        <span>当前密码</span>
        <input type="password" placeholder="请输入当前密码" v-model="reset.password">
      </div>
      <div class="account_input_box">
        <span>重置密码</span>
        <input type="password" placeholder="请输入新密码" v-model="account.resetpwd">
      </div>
      <div class="account_input_box">
        <span>确认密码</span>
        <input type="password" placeholder="请确认密码" v-model="account.affirmpwd">
      </div>
      <div class="account_input_box">
        <button id="save_btn" @click="save()">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-account-passworld",
    data() {
      return {
        account: {
          resetpwd: '',
          affirmpwd: '',
        },
        reset:{
          identityType: "mobile",
          mobile: "",
          newPassword: "",
          password: ""
        },
        page: {
          identifier: "18143148888",
          identityType: "mobile",
          password: "123456",
          type: "2"
        }
      }
    },
    mounted() {//初始化
      this.page=JSON.parse(window.localStorage.getItem("C_USER"));
      this.init();
    },
    methods: {
      init:function () {
        //console.log(this.page);
        this.reset.identityType=this.page.identityType;
        this.reset.mobile=this.page.identifier;
      },
      save:function () {
        let token=JSON.parse(window.localStorage.getItem("C_DATA")).token;
        console.log(this.reset)
        if(this.account.resetpwd==this.account.affirmpwd){
          this.reset.newPassword=this.account.resetpwd;
          this.modifyPasssword(token,this.reset);
        }else{
          alert("两次输入密码不相同")
        }
      }
    }
  }
</script>

<style scoped>
  .company-account-passworld {

  }

  .passworld_div {
    margin-top: 30px;
    /*height: 250px;*/
  }

  #save_btn {
    width: 100px;
    height: 30px;
    background-color: #02a0e9;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin: 10px auto;
    display: inline-block;
  }

  .account_input_box {
    height: 40px;
    width: 45%;
    margin: 20px auto;
    text-align: center;

  }

  .account_input_box span {
    width: 15%;
    margin-right: 5%;
    line-height: 35px;
    font-size: 1em;
    padding-left: 10px;
  }

  .account_input_box input {
    width: 70%;
    height: 35px;
    font-size: 1em;
    padding-left: 10px;
  }

  .accountname {
    border: none;
  }
</style>
