<template>
  <div class="company-hr">
    <div class="hr_1">
      <div class="main">
        <!--待处理简历-->
        <div class="hr_1_div pending">
          <router-link class="router_link" to="/companyemploy/companyemploypending">
            <div class="hr_1_div_logo"></div>
            <p>
              <span><b class="countNum">{{pending_count}}</b>待处理简历</span>
            </p>
            <p>
              <span class="redNum">{{pending_redNum}}</span>
              <span>封未读</span>
            </p>
          </router-link>
        </div>
        <!--在招职位-->
        <div class="hr_1_div position">
          <router-link class="router_link" to="/companyposition/companypositionrecruiting">
            <div class="hr_1_div_logo"></div>
            <p>
              <span><b class="countNum">{{position_count}}</b>在招职位</span>

            </p>
            <p>
              <span class="redNum">{{position_redNum1}}</span>
              <span>个即将过期</span>
              <span>|</span>
              <span class="redNum">{{position_redNum2}}</span>
              <span>个已经过期</span>
            </p>
          </router-link>
        </div>
        <!--学生反馈-->
        <div class="hr_1_div feedback">
          <router-link class="router_link" to="/companyemploy/companyemployundetermined">
          <div class="hr_1_div_logo"></div>
          <p>
            <span><b class="countNum">{{feedback_count}}</b>个已通知面试</span>

          </p>
          <p>
            <span class="redNum">{{feedback_redNum1}}</span>
            <span>个已录用</span>

          </p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="hr_2">
      <div class="main">
        <!--面试安排-->
        <div class="hr_2_left">
          <!--<div class="hr_2_left_title">-->
            <!--<span class="hr_2_dateLogo"></span>-->
            <!--<h3>面试安排</h3>-->
          <!--</div>-->
          <!--&lt;!&ndash;日历模块&ndash;&gt;-->
          <!--<div id="hr_2_left_date" class="hr_2_left_date">-->


          <!--</div>-->
          <!--&lt;!&ndash;面试安排详细内容模块&ndash;&gt;-->
          <!--<div class="hr_2_left_detail">-->
            <!--<p v-if="plan==null|plan==''|plan==undefined">暂时没有符合条件的面试安排</p>-->
            <!--<p v-else>{{plan}}</p>-->
          <!--</div>-->
          <div class="hr_3_title" style="height: 50px;">
            <span class="hr_3_logo"></span>
            <h3>数据统计</h3>
          </div>
          <div class="hr_3_innerBox">
            <div class="hr_3_inner">
              <div class="hr_3_inner_ball">
                <h2>{{grandData.dispose}}%</h2>
              </div>
              <h3>简历处理率</h3>
            </div>
            <div class="hr_3_inner">
              <div class="hr_3_inner_ball">
                <h2>{{grandData.receive}}</h2>
              </div>
              <h3>累计收到的简历</h3>
            </div>
            <div class="hr_3_inner">
              <div class="hr_3_inner_ball">
                <h2>{{grandData.issue}}</h2>
              </div>
              <h3>累计发布的职位</h3>
            </div>
          </div>
        </div>
        <!--联系我们-->
        <div class="hr_2_right">
          <div class="hr_2_right_title">
            <span class="hr_2_contactLogo"></span>
            <h3>联系我们</h3>
          </div>
          <div class="hr_2_contact">
            <p>客服邮箱：{{customer}}</p>
          </div>
        </div>
      </div>
    </div>
    <div style="position: fixed;right: 20px;bottom: 40%;cursor: pointer" v-if="c_id=='177846429040123904'"><router-link to="/companylssueMessage">联系学生</router-link></div>
  </div>
</template>

<script>
  /*  日历插件  对象初始化之后页面消失*/
  // var mySchedule = new Schedule({
  //   el: '#hr_2_left_date', //指定包裹元素（可选）
  //   // date: '2018-9-20', //生成指定日期日历（可选）
  //   clickCb: function(y, m, d) {
  //     //点击日期回调（可选）
  //   },
  //   nextMonthCb: function(y, m, d) {
  //     //点击下个月回调（可选）
  //   },
  //   nextYeayCb: function(y, m, d) {
  //     //点击下一年回调（可选）
  //   },
  //   prevMonthCb: function(y, m, d) {
  //     //点击上个月回调（可选）
  //   },
  //   prevYearCb: function(y, m, d) {
  //     //点击上一年月回调（可选）
  //   }
  // });
  export default {
    name: "company-hr",
    data() {
      return {
        pending_count: 100,
        pending_redNum: 100,
        position_count: 100,
        position_redNum1: 100,
        position_redNum2: 100,
        plan_count: 100,
        plan_redNum: 100,
        feedback_count: 100,
        feedback_redNum1: 100,
        feedback_redNum2: 100,
        plan: "",
        customer: "mentoroffer0@163.com",
        //数据统计
        grandData: {
          //简历处理率
          dispose: 22,
          //累计收到的简历
          receive: 22,
          //累计发布的职位
          issue: 22
        },
        c_id:""
      }
    },
    mounted() {//初始化
      if(window.localStorage.getItem('token')==null) {
        alert("您还没有登录，请先去登录");
        this.$router.push('/companyhome');
      }
      this.c_id=window.localStorage.getItem("C_id");
      this.getHRdata(0);
      this.getHRdata(1);
      this.getHRdata(2);
      this.getHRdata(3);
      this.getHRdata(4);
      this.getHRdata(8);
    },
    methods: {
      //获取Hr数据
      getHRdata:function (num) {
        let user={
          id:window.localStorage.getItem("C_id")
        }
        //职位状态数量
        this.getData("/api/hrCenterController/getJobInNum", {companyId:user.id,status:num}).then((res) => {
          if(res.data.code==0){
            if(num==0){
              this.pending_count=res.data.data;
            }else if(num==1){
              console.log(res.data.data);
              this.feedback_count=res.data.data;
            }else if(num==3){
              console.log(res.data.data);
              this.feedback_redNum1=res.data.data;
            }else if(num==4){
              // console.log(res.data.data);
              // this.position_count=res.data.data;
            }else if(num==8){
              console.log(res.data.data);
              this.pending_redNum=res.data.data;
            }

          }
        }, (err) => {
          console.log(err);
        });
        //获取积累发布职位
        this.getData("/api/hrCenterController/getJobNumTotal", {companyId:user.id}).then((res) => {
          if(res.data.code==0){
            this.grandData.issue=res.data.data;
          }
        }, (err) => {
          console.log(err);
        });
        this.getData("/api/hrCenterController/getJobNumByStatus", {companyId:user.id,status:1}).then((res) => {
          if(res.data.code==0){
            this.position_count=res.data.data;
          }
        }, (err) => {
          console.log(err);
        });
        //职位状态数量
        this.getData("/api/hrCenterController/getJobNumByStatus", {companyId:user.id,status:2}).then((res) => {
          if(res.data.code==0){
            this.position_redNum1=res.data.data;
          }
        }, (err) => {
          console.log(err);
        });
        //职位状态数量
        this.getData("/api/hrCenterController/getJobNumByStatus", {companyId:user.id,status:3}).then((res) => {
          if(res.data.code==0){
            this.position_redNum2=res.data.data;
          }
        }, (err) => {
          console.log(err);
        });
        //获取简历处理率
        this.postData("/api/jobInManager/searchResume",{pageNo:1,pageSize:100},{
            companyId: user.id,
            isLook:"0",
            status: "0"
        }).then((res) => {
          if(res.data.code==0){
            console.log(res.data.data.pageable.count)
            this.pending_redNum=res.data.data.pageable.count;
            if(this.pending_count!=0){
              this.grandData.dispose=((this.pending_count-this.pending_redNum)/this.pending_count).toFixed(2)*100;
            }
          }
        }, (err) => {
          console.log(err);
        });
      }
    }
  };

</script>

<style scoped>
  .company-hr {
    background-color: #f0f0f0;
    min-height: 460px;
    padding-bottom: 20px;
  }

  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    /*background-color: #abd;*/
  }

  /*第一部分*/
  .hr_1 {
    width: 100%;
    height: 250px;
    /*渐变色*/
    background: linear-gradient(to right, #87c7e8, #02a0e9);
  }

  /*第一部分 div*/
  .hr_1_div {
    float: left;
    width: 23.5%;
    height: 130px;
    background-color: #fff;
    margin: 50px 66px;
    padding: 15px;
    border-radius: 5px;
  }

  /**/
  .pending {
    margin-left: 0;
  }

  .feedback {
    margin-right: 0;
  }

  /*第一部分各个div中左上角的logo*/
  .hr_1_div_logo {
    width: 80%;
    height: 30px;
    background-repeat: no-repeat;
    -webkit-background-size: 30px 30px;
    background-size: 30px 30px;
  }

  .pending .hr_1_div_logo {
    background-image: url('../assets/companyHRImages/pendingLogo.png');
  }

  .position .hr_1_div_logo {
    background-image: url('../assets/companyHRImages/positionLogo.png');
  }

  .plan .hr_1_div_logo {
    background-image: url('../assets/companyHRImages/planLogo.png');
  }

  .feedback .hr_1_div_logo {
    background-image: url('../assets/companyHRImages/feedbackLogo.png');
  }

  .hr_1_div p {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  /*大数字*/
  .countNum {
    font-size: 2em;
  }

  /*红色数字*/
  .redNum {
    color: #ff686a;
  }

  /*第二部分*/
  .hr_2 {
    width: 100%;
    height: 400px;
    margin-top: 20px;
  }

  .hr_2_left {
    width: 70%;
    height: 400px;
    background-color: #fff;
    float: left;
  }

  /*左侧标题*/
  .hr_2_left .hr_2_left_title {
    float: none;
    width: 50%;
    height: 30px;
    background-color: #fff;
    margin-bottom: 0;
  }

  .hr_2_left .hr_2_left_title * {
    float: left;
    line-height: 30px;
    margin-right: 5px;
  }

  /*左侧图标*/
  .hr_2_dateLogo {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../assets/companyHRImages/dateLogo.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .hr_2_left > div {
    float: left;
    margin: 20px;
    /*height: 80%;*/

  }

  /*左侧日历*/
  .hr_2_left_date {
    width: 35%;
  }

  /*左侧详细*/
  .hr_2_left_detail {
    width: 55%;
  }

  .hr_2_left_detail p {
    color: #9f9f9f;
    font-size: 0.8em;
  }

  /*第二部分右侧*/
  .hr_2_right {
    width: 26%;
    height: 365px;
    background-color: #fff;
    float: right;
    padding: 1em;
  }

  /*联系我们 图标*/
  .hr_2_contactLogo {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url("../assets/companyHRImages/messageLogo.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  /*右侧标题*/
  .hr_2_right_title {
    float: none;
    width: 50%;
    height: 30px;
    background-color: #fff;
    margin-bottom: 0;
  }

  .hr_2_right_title * {
    float: left;
    line-height: 30px;
    margin-right: 5px;
  }

  /*联系方式*/
  .hr_2_contact {
    color: #aeaeae;
    margin-top: 20px;
  }

  .hr_2_contact p {
    margin-bottom: 10px;
  }

  /*第三部分*/
  .hr_3 {
    width: 100%;
    height: 300px;
  }

  .hr_3 .main {
    width: 1174px;
    background-color: #fff;
    height: 90%;
    margin: 20px auto;
    padding: 1em;
  }

  .hr_3_title {
    float: none;
    width: 50%;
    height: 30px;
    background-color: #fff;
    margin-bottom: 0;
  }

  .hr_3_logo {
    background: url("../assets/companyHRImages/dataLogo.png");
    width: 30px;
    height: 30px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .hr_3_title * {
    float: left;
    line-height: 30px;
    margin-right: 5px;
  }

  .hr_3_innerBox {
    width: 95%;
    height: 80%;
    margin: 20px auto;
  }

  .hr_3_inner {
    width: 138px;
    height: 90%;
    float: left;
    margin: 10px 60px;
    text-align: center;
  }

  .hr_3_inner_ball {
    width: 110px;
    height: 110px;
    background: url("../assets/companyHRImages/ball.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto 20px;
    line-height: 110px;
    text-align: center;
  }

  .router_link {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: #000;
  }
</style>
