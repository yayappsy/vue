<template>
  <div class="company_position">
    <div class="main">
      <div class="position_left">
        <div class="position_menu_title">
          <div class="menu_title">
            <span class="position_menu_logo"></span>
            <span class="menu_title_text">职位管理</span>
          </div>

        </div>
        <ul class="position_menu">
          <li>
            <router-link class="router_link" to="/companyposition/companypositionrecruiting">招聘中职位</router-link>
          </li>
          <li><router-link class="router_link" to="/companyposition/companypositiondownline">已下线职位</router-link></li>
          <li><router-link class="router_link" to="/companyposition/companypositionpast">已过期职位</router-link></li>
        </ul>
        <div class="position_post">
          <router-link class="router_link" to="/companyissue">+发布职位</router-link>
        </div>
      </div>
      <div class="position_right">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "company-position",
    data() {
      return {
        recruiting: 6,
      }
    },mounted() {//初始化
      if(window.localStorage.getItem('token')==null) {
        alert("您还没有登录，请先去登录");
        this.$router.push('/companyhome');
      }
    }
  }
</script>

<style scoped>
  .company_position {
    padding: 20px 0;
    background-color: #f0f0f0;
    min-height: 460px;
  }

  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  /*左侧 菜单*/
  .position_left {
    width: 16%;
    height: 450px;
    background-color: #fff;
    float: left;
  }

  /*菜单标题*/
  .position_menu_title {
    width: 100%;
    height: 70px;
    padding-top: 10px;
    font-size: 23px;
    background-color: #8ad0f4;
    color: #fff;
  }

  /*菜单标题 内容*/
  .menu_title {
    width: 70%;
    height: 25px;
    margin: 10px auto;
  }

  /*菜单标题图标*/
  .position_menu_logo {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../assets/CompanyPositionImages/menuLogo.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  /*标题文字*/
  .menu_title_text {
    float: right;
  }

  .position_menu {
    width: 100%;
    height: 55%;
  }

  .position_menu li {
    width: 100%;
    height: 60px;
    text-align: center;
    /*border-bottom: 1px solid #eee;*/
  }
  .router_link{
    width: 100%;
    height: 100%;
    display: inline-block;
    line-height: 50px;
    color: #000;
    text-decoration: none;
  }
  /*发布职位*/
  .position_post{
    margin: 0 auto;
    width: 80%;
    height: 30px;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background-color: #eee;
  }
  .position_post .router_link{
    line-height: 30px;
  }

  /*右侧 子页面 详细内容*/
  .position_right {
    width: 82%;
    /*height: 450px;*/
    background-color: #fff;
    float: right;
  }
  .router-link-active{
    color:#49b4ee;
  }
</style>
