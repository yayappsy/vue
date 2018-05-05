<template>
  <div class="company-account-verification_3">
    <div class="verification_box">
      <div class="box">
        <div class="box_inner">
          <div class="box_1 blueBox">
            <div class="icon finishIcon"></div>
            <p>信息验证</p>
          </div>
          <div class="box_2 blueBox">
            <div class="icon finishIcon"></div>
            <p>证件验证</p>
          </div>
          <div class="box_3 blueBox">
            <div class="icon blueIcon"></div>
            <p>证件成功</p>
          </div>
        </div>
      </div>
    </div>
    <div class="inner_box">
      <div class="finishPhoto">
        <div class="photo"></div>
        <h3>验证资料提交成功</h3>
      </div>
      <p>
        请耐心等待人工审核，温馨提示：企业注册后可进入职位发布状态，
        但所有职位必须由人工审核，未通过人工审核，则职位发布失败
      </p>
      <div class="btns">
        <router-link class="router" id="prev" to="/companyaccount/companyaccountverification_3">
          已完善资料
        </router-link>
        <router-link class="router" id="next" to="/companyaccount/companyaccountverification">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-account-verification_3",
    data() {
      return {}
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

  /*蓝色标签*/
  .blueIcon {
    background-color: #02a0e9;
    border-color: #02a0e9;
  }

  /*蓝色*/
  .blueBox {
    color: #02a0e9;
  }

  .finishIcon {
    background: url("../../assets/CompanyAccount/finishLogo.png");
    background-position: center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .inner_box {
    width: 36%;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .finishPhoto{
    width: 200px;
    height: 100px;
    margin: 0 auto;
  }
  .finishPhoto h3{
    text-align: center;
    color: #02a0e9;
  }
  .inner_box p{
    font-size: 0.7em;
    color: #b8b8b8;
    margin-top: 20px;
  }
.photo{
  width: 80px;
  height: 60px;
  margin: 0 auto;
  background: url("../../assets/CompanyAccount/finishPhoto3.png");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
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

  .router {
    text-align: center;
    text-decoration: none;
    line-height: 30px;
  }
  .btns {
    width: 100%;
    height: 30px;
    padding: 30px 0;
  }
  /*验证成功提示图片*/
  .finishPhoto {

  }
</style>
