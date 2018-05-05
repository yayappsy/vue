<template>
	<div class="a_s_binding">
		<div class="til">账号绑定</div>
		<div class="msg">
			<div class="text">您现在登录的账号为<span class="num">18143148442</span></div>
			<div class="text">绑定后，可以使用下面的账号直接登录</div>
		</div>
		<div class="input-list">
			<div class="list-item">
				<span class="icon i4" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/user_bind.png)"></span><a class="name blue" href="/user/sso/wechat/bind">绑定微信 账号</a>
			</div>
		</div>
	</div>
</template>
<style>
  .a_s_binding .til {
    position: relative;
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
  .a_s_binding .msg {
    position: relative;
    font-size: 18px;
    color: #666;
    border-bottom: 1px solid #eaeaea;
    padding: 14px 0 26px 0;
    line-height: 30px;
  }
  .a_s_binding .msg .num {
    color: #333;
    letter-spacing: 1px;
    padding-left: 10px;
  }
  .a_s_binding .input-list {
    position: relative;
    padding: 34px 36px 0 176px;
  }
  .a_s_binding .input-list .list-item {
    position: relative;
    padding: 0 0 20px 64px;
    line-height: 48px;
    height: 48px;
    font-size: 18px;
    color: #666;
  }
  .a_s_binding .input-list .list-item .icon {
    position: absolute;
    width: 48px;
    height: 48px;
    display: inline-block;
    left: 0;
    top: 0;
  }
  .a_s_binding .input-list .list-item .i2 {
    background-position: -16px -64px;
  }
  .a_s_binding .input-list .list-item .i3 {
    background-position: -16px -125px;
  }
  .a_s_binding .input-list .list-item .i4 {
    background-position: -16px -186px;
  }
  .a_s_binding .input-list .list-item .blue {
    color: #6aa2e4;
    cursor: pointer;
    text-decoration: none;
  }
</style>
