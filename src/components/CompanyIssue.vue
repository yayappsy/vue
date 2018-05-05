<template>
  <div class="company-issue">
    <div class="main">
      <div class="company_issue_left">
        <div class="company_issue_title">
          <div class="issue_title">
            <span class="issue_title_logo"></span>
            <span class="issue_title_text">发布职位</span>
          </div>
        </div>
        <ul class="issue_menu_list">
          <li><router-link to="/companyissue/companyissuerelease"></router-link>职位介绍</li>
          <li>职位要求</li>
          <li>职位类型</li>
          <li>投递位置</li>
        </ul>
      </div>
      <div class="company_issue_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-issue",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .company-issue {
    background-color: #f0f0f0;
    min-height: 460px;
  }

  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 20px 0;
  }
  /*左侧*/
  .company_issue_left {
    display: inline-block;
    width: 15%;
    height: 300px;
    background-color: #fff;
    float: left;
  }
  /*菜单标题*/
  .company_issue_title {
    width: 78%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #8ad0f4;
    padding: 20px;
  }

  .issue_title {
    width: 70%;
    height: 30px;
    margin: 0 auto;
  }
  /*菜单标题logo*/
  .issue_title_logo {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../assets/CompanyIssueImages/issueMenuLogo.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    border-radius: 15px;
    float: left;
  }
  /*菜单标题文字*/
  .issue_title_text {
    display: inline-block;
    float: right;
  }
  /*菜单列表*/
  .issue_menu_list {
    width: 100%;
    list-style: none;
  }

  .issue_menu_list li {
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    background: url("../assets/CompanyIssueImages/issuebg.png");
    -webkit-background-size: 100% 101%;
    background-size: 103% 100%;
    background-position: center center;
  }

  /*右侧*/
  .company_issue_right {
    display: inline-block;
    width: 83%;
    background-color: #fff;
    float: right;
  }
</style>
