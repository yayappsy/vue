
<template>
	<div id="Account_Settings">
		<div class="con_left fl">
			<div class="item nav">账号设置</div>
      <router-link to="/Account_Settings/account_Settings_password"><div class="item" :class="{'active':active,'normal':!active}" @click="active=true">修改密码</div></router-link>
      <router-link to="/Account_Settings/account_Settings_binding"><div class="item" :class="{'active':!active,'normal':active}" @click="active=false">账号绑定</div></router-link>
		</div>
		<div class="con_right fr">
			<router-view class="router_link"></router-view>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
		    return {
          active:true,
		      msg: 'Welcome to Your Vue.js App',
		      userImg:'img/home/default_headpic.png'
		    }
		},
		methods:{
		    //打开密码修改

	  	}
	}
</script>
<style lang="scss">
  #Account_Settings{
    width: 100%;
    min-height: 900px;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    .con_left{
      position: relative;
      width: 260px;
      margin-top: 44px;
      background-color: #fafafa;
      letter-spacing: 1px;
    }
    .fl{
      float: left;
    }
    .con_left .item {
      position: relative;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      text-align: center;
    }
    .con_left .nav {
      font-size: 18px;
      color: #999;
      height: 56px;
      line-height: 56px;
    }
    .con_left .active {
      font-size: 16px;
      color: #6aa2e4;
      background-color: #f1f1f1;
      cursor: pointer;
    }
    .con_left .normal {
      font-size: 16px;
      color: #333333;
      cursor: pointer;
      display: inline-block;
      width: 260px;
      text-decoration: none;
    }
    .fr{
      float: right;
    }
    .con_right {
      position: relative;
      width: 740px;
      margin-top: 44px;
      background-color: #fafafa;
      padding: 25px 36px 55px 24px;
      letter-spacing: 2px;
    }
    .clear{
      width: 100%;
      height: 30px;
      float: left;
    }
  }
</style>
