<template>
  <div class="company_account">
    <div class="main">
      <div class="account_left">
        <div class="account_menu_title">
          <span class="account_menu_logo"></span>
          <span>账号管理</span>
        </div>
        <ul class="account_menu">
          <li class="account_menu_list"><router-link class="router_link" to="/companyaccount/companyaccountinformation">公司信息</router-link></li>
          <li class="account_menu_list"><router-link class="router_link" to="/companyaccount/companyaccountpassworld">修改密码</router-link></li>
        </ul>
      </div>
      <div class="account_right">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "company-account"
    ,mounted() {//初始化
      if(window.localStorage.getItem('token')==null) {
        alert("您还没有登录，请先去登录");
        this.$router.push('/companyhome');
      }
    }
  }
</script>

<style scoped>
  .company_account {
    background-color: #f0f0f0;
    min-height: 460px;
  }

  .main {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    position: relative;
    overflow: hidden;
  }
  /*左侧菜单*/
  .account_left{
    width: 13%;
    height: 180px;
    float: left;
    background-color: #fff;
  }
  /*右侧内容*/
  .account_right{
    width: 85%;
    min-height: 630px;
    float: right;
    background-color: #fff;
    /*padding: 20px 0;*/
    /*height: 500px;*/
    display: inline-block;
    margin-bottom: 20px;
  }
  /*菜单标题*/
.account_menu_title{
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #8ad0f4;
}
  .account_menu_title span{
    float: left;
    margin-left: 5px;
    color: #fff;
  }
  .account_menu_title .account_menu_logo{
    display: inline-block;
    width: 35px;
    height: 35px;
    margin-top: 10px;
    margin-left: 25px;
    background: url("../assets/CompanyAccount/accountMenuLogo.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .account_menu{
    list-style: none;
  }
  .account_menu_list{
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .router_link{
    width: 100%;
    height: 100%;
    display: inline-block;
    text-decoration: none;
    color: #000;
  }
  .router-link-active{
    color:#49b4ee;
  }
</style>
