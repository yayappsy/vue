<template>
  <div class="company-account-verification">
    <div class="photo"></div>
    <div class="verification_box">
      <div class="box">
        <div class="box_inner">
          <div class="box_1 blueBox">
            <div class="icon finishIcon"></div>
            <p>信息验证</p>
            <p>通过</p>
            <p class="remark">备注(公共邮箱验证)</p>
          </div>
        </div>
      </div>
    </div>
    <div style="padding-top: 50px;">
     <h2 style="text-align: center">已完成审核</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-account-verification"
  }
</script>

<style scoped>
  .verification_box {
    width: 100%;
    height: 120px;
    /*background-color: #add;*/
  }

  .box {
    width: 66%;
    height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
  }

  .box_1, .box_2, .box_3 {
    height: 60px;
    width: 120px;
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
    margin-left: -60px;
  }

  .box_1 {
    float: left;
  }

  .box_2 {
    margin: 40px 29%;

  }

  .box_3 {
    float: right;
    margin-right: -60px;
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
  .photo{
    width: 100px;
    height: 70px;
    margin: 30px auto;
    background: url("../../assets/CompanyAccount/finishPhoto.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .remark{
    color: #b8b8b8;
    font-size: 10px;
  }
</style>
