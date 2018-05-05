<template>
  <div class="company_account_bind">
    <div class="account">
      <p>
        登录账户：{{account}}
      </p>
    </div>
    <div class="btn_box">
      <!--<div class="btn">-->
        <!--<a href="javascript:;">-->
          <!--<span class="bind_icon" :style="{backgroundImage::style}" style="border-color:#f75762 "></span>-->
          <!--<span class="bind_text">绑定微博账号</span>-->
        <!--</a>-->
      <!--</div>-->
      <!--<div class="btn">-->
        <!--<a href="javascript:;">-->
          <!--<span class="bind_icon" :style="{backgroundImage:`url(${QQLogo})`}" style="border-color:#18bdfb "></span>-->
          <!--<span class="bind_text">绑定QQ账号</span>-->
        <!--</a>-->
      <!--</div>-->
      <div class="btn">
        <a href="javascript:;">
          <span class="bind_icon" :style="{backgroundImage:`url(${weixinLogo})`}" style="border-color:#45c14f "></span>
          <span class="bind_text">绑定微信账号</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-account-bind",
    data() {
      return {
        account: 'mentoroffer@163.com',
        weiboLogo: 'http://39.106.117.195/image/CompanyAccount/weiboLogo.png',
        QQLogo: 'http://39.106.117.195/image/CompanyAccount/QQLogo.png',
        weixinLogo: 'http://39.106.117.195/image/CompanyAccount/weixinLogo.png',
      }
    },
    mounted() {//初始化
      this.page=JSON.parse(window.localStorage.getItem("C_USER"));
      this.account=this.page.identifier;
    },
    methods: {

    }
  }
</script>

<style scoped>
  .account {
    height: 100px;
    text-align: center;
    line-height: 100px;
  }

  .btn_box {
    height: 100px;
    display: flex;
    justify-content: center;
  }
  .btn_box a{
    width: 100%;
    height: 100%;
    display: inline-block;
    color: #000;
    text-decoration: none;
  }

  .btn {
    height: 30px;
    width: 200px;
    border: 1px solid #eee;
    float: left;
    margin: 0 30px;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .bind_icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid;
    border-radius: 15px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin-left: 20px;
  }

  .bind_text {
    display: inline-block;
    float: left;
    line-height: 30px;
    margin-left: 20px;
  }
</style>
