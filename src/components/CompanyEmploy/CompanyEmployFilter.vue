<template>
  <div class="company_employ_filter">
    <!--子页顶部标题栏-->
    <div class="employ_filter_title">
      <div class="filter_title_left">
        <select name="position" id="filter_title_position">
          <option value="全部职位">全部职位</option>
          <option value="产品实习经理">产品实习经理</option>
        </select>
      </div>
      <div class="filter_title_middle">
        <h3><span class="redText">{{filter_peoples.length}}</span>被过滤</h3>
      </div>
      <div class="filter_title_right">
        <div>
          <input id="filter_title_right_input" placeholder="姓名或学校" type="text">
          <input id="filter_title_right_btn" type="button">
        </div>
      </div>
    </div>
    <!--子页内容-->
    <div class="employ_filter_inner">
      <!--选项栏-->
      <div class="employ_filter_inner_options">
        <select name="" id="filter_inner_option_1" class="filter_inner_option">
          <option value="现居城市" selected>现居城市</option>
        </select>
        <select name="" id="filter_inner_option_2" class="filter_inner_option">
          <option value="每周天数" selected>每周天数</option>
        </select>
        <select name="" id="filter_inner_option_3" class="filter_inner_option">
          <option value="实习时长" selected>实习时长</option>
        </select>
        <select name="" id="filter_inner_option_4" class="filter_inner_option">
          <option value="最晚入职时间" selected>最晚入职时间</option>
        </select>
        <select name="" id="filter_inner_option_5" class="filter_inner_option">
          <option value="学历" selected>学历</option>
          <option value="博士以上">博士以上</option>
          <option value="博士">博士</option>
          <option value="硕士">硕士</option>
          <option value="本科">本科</option>
          <option value="专科">专科</option>
          <option value="高中">高中</option>
          <option value="中专">中专</option>
          <option value="初中">初中</option>
          <option value="小学">小学</option>
        </select>
        <select name="" id="filter_inner_option_6" class="filter_inner_option">
          <option value="毕业时间" selected>毕业时间</option>
        </select>
        <select name="" id="filter_inner_option_7" class="filter_inner_option">
          <option value="性别" selected>性别</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <select name="" id="filter_inner_option_8" class="filter_inner_option">
          <option value="学校类型" selected>学校类型</option>
        </select>
      </div>
      <!--个人信息展示-->
      <div class="employ_filter_inner_peoples">
        <ul class="employ_filter_inner_people_list">
          <li class="people_inner" v-for="filter_people in filter_peoples">
            <div class="people_inner_checkbox">
              <input type="checkbox">
            </div>
            <img class="people_photo" v-bind:src="filter_people.photoUrl" alt="">
            <div class="people_information">
              <!--职位-->
              <div class="people_post">
                <h4 class="penging_people_post">{{filter_people.post}}</h4>
                <router-link :to="{ name: 'LookResume', params: { ids:JSON.stringify({sid:list.userId,rid:list.resumeId})}}" class="pending_people_resume" ><span class="eye"></span><span
                  class="resume">查看简历</span></router-link>
                <span class="filter_people_dleiver">投递时间：{{filter_people.deliver}}</span>
              </div>
              <!--基本信息-->
              <div class="people_base_information">
                <div class="information">
                  <p>
                    <span class="people_name">{{filter_people.name}}</span>
                    <span class="people_sex">{{filter_people.sex}}</span>
                    <span class="people_city">现居{{filter_people.city}}</span>
                    <span class="people_daysAWeek">{{filter_people.daysAWeek}}天/周</span>
                    <span class="people_month">{{filter_people.month}}个月</span>
                    <span class="people_date">{{filter_people.date}}后可入职</span>
                  </p>
                  <p>
                    {{filter_people.school}}-{{filter_people.major}}专业-{{filter_people.educationBackground}}&nbsp;{{filter_people.graduation}}年毕业
                  </p>
                </div>
                <div class="type">
                  <span>{{filter_people.type}}</span>
                </div>
                <div class="options">
                  <a href="javascript:;">下载</a>
                  <a href="javascript:;">待定</a>
                  <a href="javascript:;">不合适</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="employ_filter_inner_bottom">
        <div class="inner_bottom_left">
          <input type="checkbox">全选
          <a href="javascript:;">下线</a>
          <a href="javascript:location.reload(true);">刷新</a>
        </div>
        <div class="inner_bottom_right">
          <a href="javascript:;">尾页</a>
          <a href="javascript:;">上一页</a>
          <a href="javascript:;" class="current">1</a>
          <a href="javascript:;">下一页</a>
          <a href="javascript:;">首页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "company-employ-filter",
      data() {
        return {
          filter_title: "2",
          filter_peoples: [
            {
              //职位
              post: "产品经理实习",
              //照片地址
              photoUrl: "http://39.106.117.195/image/CompanyEmploy/employUserPhoto.png",
              // 姓名
              name: "夏雨",
              //性别
              sex: "女",
              //现居城市
              city: '北京',
              //每周天数
              daysAWeek: '5',
              //多少个月
              month: "7",
              //入职时间
              date: "2017-09-30",
              //学校
              school: "北京航空航天大学",
              //专业
              major: "计算机",
              //学历
              educationBackground: "硕士",
              //毕业时间
              graduation: "2018",
              //投递时间
              deliver: "2017-09-19 20:07:20",
              //状态
              type: "被过滤",
            },
            {
              //职位
              post: "产品经理实习",
              //照片地址
              photoUrl: "http://39.106.117.195/image/CompanyEmploy/employUserPhoto.png",
              // 姓名
              name: "夏雨",
              //性别
              sex: "女",
              //现居城市
              city: '北京',
              //每周天数
              daysAWeek: '5',
              //多少个月
              month: "7",
              //入职时间
              date: "2017-09-30",
              //学校
              school: "北京航空航天大学",
              //专业
              major: "计算机",
              //学历
              educationBackground: "硕士",
              //毕业时间
              graduation: "2018",
              //投递时间
              deliver: "2017-09-19 20:07:20",
              //状态
              type: "被过滤",
            },

          ]
        }
      }
    }
</script>

<style scoped>
  .company_employ_filter {
    /*background-color: #add;*/
  }

  /*标题*/
  .employ_filter_title {
    width: 96%;
    height: 30px;
    border-bottom: 1px solid #eee;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /*标题左侧*/
  .filter_title_left {
    display: inline-block;
    width: 20%;
    height: 30px;
    float: left;
  }

  /*下拉菜单全部职位*/
  #filter_title_position {
    width: 150px;
    height: 30px;
    outline: none;
    background-color: #fff;
    border-color: #eee;
  }

  /*标题中部*/
  .filter_title_middle {
    display: inline-block;
    margin: 0 auto;
    width: 58%;
    height: 30px;

    text-align: center;
  }

  /*标题右部*/
  .filter_title_right {
    display: inline-block;
    float: right;
    width: 21%;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    overflow: hidden;
  }

  /*标题右部输入框*/
  #filter_title_right_input {
    border: none;
    background-color: initial;
    float: left;
    width: 78%;
    height: 30px;
    outline: none;
    padding-left: 10px;
  }

  /*标题右部按钮*/
  #filter_title_right_btn {
    width: 16%;
    height: 30px;
    border: none;
    background-image: url("../../assets/CompanyEmploy/serach.png");
    background-position: center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    outline: none;
  }

  /*红色字体*/
  .redText {
    color: #ff5252;
  }

  /*信息展示*/
  .employ_filter_inner {
    padding: 20px 0;
  }

  /*下拉菜单栏*/
  .employ_filter_inner_options {
    margin-left: 20px;
    margin-bottom: 10px;
  }

  /*各个下拉菜单*/
  .filter_inner_option {
    width: 11%;
    height: 30px;
    background-color: #fff;
    border-color: #eee;
    outline: none;
  }

  /*个人信息*/
  .employ_filter_inner_peoples {
    width: 100%;
    /*height: 69%;*/
    /*background-color: #add;*/
  }

  /*个人信息列表*/
  .employ_filter_inner_people_list {
    list-style: none;
    width: 100%;
    height: 100%;
  }

  /*个人信息*/
  .people_inner {
    width: 100%;
    height: 100px;
    /*background-color: #abc;*/
    padding: 10px;
    border-bottom: 1px solid #eee;

  }

  /*复选框*/
  .people_inner_checkbox {
    width: 12px;
    height: 30px;
    padding: 35px 20px;
    float: left;
  }

  /*照片*/
  .people_photo {
    width: 80px;
    height: 100%;
    float: left;
  }

  /*个人信息*/
  .people_information {
    float: left;
    width: 80%;
    height: 100%;
    margin-left: 20px;
  }

  /*职位栏*/
  .people_post {
    border-bottom: 1px solid #eee;
    height: 25px;
  }

  /*职位*/
  .penging_people_post {
    color: #859aab;
    float: left;
  }

  /*查看简历*/
  .filter_people_resume {
    float: right;
    text-decoration: none;
    margin-left: 70px;
  }

  /*眼睛图标*/
  .filter_people_resume .eye {
    width: 1.5em;
    height: 1em;
    margin-top: 3px;
    display: inline-block;
    background-image: url("../../assets/CompanyEmploy/eye.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  /*简历文字*/
  .filter_people_resume .resume {
    float: right;
    color: #02a0e9;
  }

  /*投递日期*/
  .filter_people_dleiver {
    color: #c1c1c1;
    float: right;
  }

  .people_base_information {
    width: 100%;
    height: 60%;
    padding: 10px 0;
  }

  .people_base_information > div {
    float: left;
    height: 100%;
  }

  /*个人信息展示*/
  .people_base_information .information {
    width: 60%;
  }
  .people_base_information .information p:nth-child(2){
    margin-top: 10px;
    font-size: 0.8em;
  }
  .people_base_information .information .people_name{
    display: inline-block;
    width: 6em;
    font-size: 1em;
    color: #9a9c9c;
  }
  .information .people_sex{
    width: 2em;
    display: inline-block;
    font-size: 0.8em;
  }
  .information .people_city{
    width: 6em;
    display: inline-block;
    font-size: 0.8em;
  }
  .information .people_daysAWeek{
    width: 5em;
    display: inline-block;
    font-size: 0.8em;

  }
  .information .people_month{
    font-size: 0.8em;
    width: 4em;
    display: inline-block;

  }
  .information .people_date{
    font-size: 0.8em;
    width: 10.5em;
    display: inline-block;

  }

  /*状态 面试邀请*/
  .people_base_information .type {
    width: 15%;
    margin-left: 20px;
    text-align: center;
    line-height: 50px;
    color: #fe6f6f;
  }

  /*选项*/
  .people_base_information .options {
    width: 19%;
    margin-left: 20px;
    line-height: 50px;
  }

  .people_base_information .options a {
    margin-left: 5px;
    text-decoration: none;
    color: #02a0e9;
  }

  .employ_filter_inner_bottom{
    width: 100%;
    height: 40px;
    margin-top: 50px;
    padding-top: 10px;
  }
  .inner_bottom_left{
    float: left;
    width: 15%;
    height: 30px;
    padding: 0 30px;
    line-height: 30px;
  }
  .inner_bottom_left input{
    margin-right: 10px;
  }
  .inner_bottom_left a{
    text-decoration:none;
    color: #000;
    margin: 0 5px;
  }
  .inner_bottom_right{
    float: right;
    width: 70%;
    height: 30px;
    margin-right: 20px;
  }
  .inner_bottom_right a{
    float: right;
    height: 80%;
    display: inline-block;
    background-color: #f5f5f5;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 0.5em;
    color: #adadad;
    text-decoration: none;
    margin: 3px;
  }
  .inner_bottom_right .current{
    background-color: #02a0e9;
    color: #fff;
  }
</style>
