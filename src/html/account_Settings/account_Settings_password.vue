
<template>
	<div id="a_s_password">
		<div class="til">修改密码</div>
		<div class="msg">您现在登录的账号为<span class="num">{{reset.mobile}}</span></div>
		<div class="input-list">
			<div class="list-item">

				<span class="name" id="cur_pass">当前密码</span><input type="password" class="pre" placeholder="请输入当前密码" v-model="reset.password">
			</div>
			<div class="list-item">
				<span class="name" id="new_pass">新密码</span><input type="password" class="now" placeholder="请输入新密码" v-model="account.resetpwd">
			</div>
			<div class="list-item">
				<span class="name">确认密码</span><input type="password" class="r_now" placeholder="请确认密码" v-model="account.affirmpwd">
			</div>
			<div class="list-item">
				<div class="btn" id="change_pass" @click="save()">保存</div>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        account: {
          resetpwd: '',
          affirmpwd: '',
        },
        reset:{
          identityType: "mobile",
          mobile: "",
          newPassword: "",
          password: ""
        },

      }
    },
    mounted() {//初始化
      this.reset.mobile=JSON.parse(window.localStorage.getItem("USER")).identifier;
      this.init();
    },
    methods: {
      init:function () {
        //console.log(this.page);
        this.reset.identityType=this.page.identityType;
        this.reset.mobile=this.page.identifier;
      },
      save:function () {
        let token=JSON.parse(window.localStorage.getItem("S_id")).token;

        if(this.account.resetpwd==this.account.affirmpwd){
          this.reset.newPassword=this.account.resetpwd;
          console.log(this.reset);
          this.modifyPasssword(token,this.reset);
        }else{
          alert("两次输入密码不相同")
        }
      }
    }
  }
</script>
<style lang="scss">
  #a_s_password{
    .til {
      position: relative;
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
    .msg {
      position: relative;
      font-size: 18px;
      color: #666;
      border-bottom: 1px solid #eaeaea;
      padding: 20px 0 30px 0;
    }
    .msg .num {
      color: #333;
      letter-spacing: 1px;
      padding-left: 10px;
    }
    .input-list {
      position: relative;
      padding: 34px 130px 0 50px;
    }
    .input-list .list-item {
      position: relative;
      padding: 0 0 20px 90px;
      line-height: 44px;
      height: 44px;
    }
    .input-list .list-item .name {
      position: absolute;
      left: 0;
      font-size: 18px;
      color: #666;
    }
    .input-list .list-item > input {
      position: relative;
      width: 450px;
      height: 42px;
      line-height: 44px;
      padding: 0 10px;
      border: 1px solid #eaeaea;
      border-radius: 2px;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
    }
    .input-list .list-item .btn {
      position: relative;
      margin-top: 20px;
      width: 120px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      border-radius: 2px;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      background-color: #6aa2e4;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
  }

</style>
