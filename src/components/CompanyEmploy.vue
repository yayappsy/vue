<template>
  <!--应聘管理页面-->
  <div class="company_employ">
    <div class="main">
      <div class="employ_menu">
        <div class="employ_menu_title">
          <div class="employ_menu_logo"></div>
          <h2>应聘管理</h2>
        </div>
        <ul class="employ_menu_box">
          <li class="menu_option">
            <!--路由-->
            <router-link class="router_link" to='/companyemploy/companyEmployPending'>待处理简历 ({{pending}})
            </router-link>
          </li>
          <li class="menu_option option_2">
            <a style="color: #666;cursor: pointer" @click="chakan(0)">未查看</a> <br>
            <a style="color: #666;cursor: pointer" @click="chakan(1)">已查看</a> <br>
          </li>
          <li class="menu_option"><router-link class="router_link" to="/companyemploy/companyemploypass">已通知面试</router-link></li>
          <li class="menu_option"><router-link class="router_link" to="/companyemploy/companyemployinappropriate">不合适 </router-link></li>
          <li class="menu_option"><router-link class="router_link" to="/companyemploy/companyemployaccepted">已录用 </router-link></li>
          <li class="menu_option"><router-link class="router_link" to="/companyemploy/companyemployundetermined">待定 </router-link></li>
        </ul>
      </div>
      <router-view class="employ_detail"></router-view>
    </div>
  </div>
</template>

<script>
  import {common} from '../js/common.js';
  export default {
    name: "company-employ",
    data() {
      return {
          // 待处理数量
          pending: 0,
      }
    },
    mounted() {//初始化
      if(window.localStorage.getItem('token')==null) {
        alert("您还没有登录，请先去登录");
        this.$router.push('/companyhome');
      }
      this.initdata();
    },
    methods: {
      chakan:function (num) {
        common.$emit("num", num);
      },
      initdata:function () {
        let user=JSON.parse(window.localStorage.getItem("C_DATA"))
        this.getData("/api/jobInManager/handleNum", {companyId:'152518874250747904'}).then((res) => {
          if(res.data.code==0){
            console.log(res.data.data)
            this.pending=res.data.data;
          }
        }, (err) => {
          console.log(err);
        });
      }
    }
  }
</script>

<style scoped>
  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .company_employ {
    background-color: #f0f0f0;
    min-height: 460px;
  }

  /*菜单模块*/
  .employ_menu {
    width: 15%;
    height: 600px;
    background-color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    float: left;
  }

  /*菜单标题*/
  .employ_menu_title {
    width: 100%;
    height: 73px;
    line-height: 73px;
    text-align: center;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #8ad0f4;
  }

  .employ_menu_title h2 {
    margin-left: 10px;
    float: left;
  }

  .employ_menu_logo {
    width: 40px;
    height: 40px;
    float: left;
    background: url("../assets/CompanyEmploy/employLogo.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .employ_menu_box {
    width: 100%;
    height: 525px;
    margin-bottom: 50px;
  }

  .menu_option {
    width: 100%;
    height: 74px;
    border-top: 1px solid #eee;
    text-align: center;
    line-height: 74px;
    font-size: 1em;
  }

  .employ_menu_box .option_2 {
    line-height: 37px;
    font-size: 0.8em;
  }

  .orangeText {
    color: orange;
  }

  .router_link {
    text-decoration: none;
    color: #000;
    width: 100%;
    height: 100%;
    display: block;
  }

  /*应聘管理详细模块*/
  .employ_detail {
    width: 83%;
    /*height: 900px;*/
    background-color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    float: right;
  }
  .router-link-active{
    color:#49b4ee;
  }
</style>
