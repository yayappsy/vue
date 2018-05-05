<template>
  <div class="companyhead">
    <div class="Hmain" :style="{width:x_width+'px'}">
      <div class="logo"  :style="{backgroundImage:`url(${logo})`}"></div>
      <div class="men_box" v-show="type>1">
        <ul class="menu">
          <li><router-link class="routerLink" to="/companyhr">HR中心</router-link></li>
          <li><router-link class="routerLink" to="/companyissue">发布职位</router-link></li>
          <li><router-link class="routerLink" to="/companyemploy">应聘管理</router-link></li>
          <li><router-link class="routerLink" to="/companyposition">职位管理</router-link></li>
          <li><router-link class="routerLink" to="/companyaccount">账号管理</router-link>
          </li>
        </ul>
      </div>
      <div class="men_box" v-show="type < 2">
        <ul class="menu">
          <li class="city-address" @click="addressSelection=!addressSelection"><span>{{area}}</span></li>
          <li><router-link class="routerLink" to="/StudentHome">首页</router-link></li>
          <li><router-link class="routerLink" to="/Personal_Center" >个人中心</router-link></li>
          <li><router-link class="routerLink" to="/push_message">内推信息</router-link></li>
          <li><router-link class="routerLink" to="/curriculum_training">课程培训</router-link></li>
        </ul>
      </div>
      <div class="student_enter">
        <a  v-if="type==0" @click="ClickEntrance(4)">企业入口</a>
        <a  v-if="type==4" @click="ClickEntrance(0)">学生入口</a>
        <div style="position: relative;height: 56px;width: 150px;" v-if="type==1" >
          <div class="geren_caidan">
            <img v-bind:src="data.avatar!=''?data.avatar:userImg" style="width: 30px;height: 30px;margin-left: 30px;">
            <div>
              <ul>
                <li><router-link to="/Personal_Center">个人中心</router-link></li>
                <li><router-link to="/Help_center">帮助中心</router-link></li>
                <li><router-link to="/Account_Settings">账号设置</router-link></li>
                <li v-on:click='ExitLogons()'>退出</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="hr_home" v-if="type==2||type==3">
          <ul class="hr-ul">
            <li class="ul-list">{{data.mobile}}
              <ul class="sencdlist">
                <router-link class="routerLink" to="/companyemploy"><li>应聘管理</li></router-link>
                <router-link class="routerLink" to="/companyposition"><li>职位管理</li></router-link>
                <router-link class="routerLink" to="/companyissue"><li>发布职位</li></router-link>
                <router-link class="routerLink" to="/companyaccount"><li>账号管理</li></router-link>
                <span @click="ExitLogons()"><li>退出</li></span>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sxs--modal" v-if="addressSelection"  @click="addressSelection=false;">
      <div class="sxs--modal--bg" style="height: 484px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div class="sxs--modal--title">切换城市</div>
          <div class="sxs--modal--text f16">尊敬的用户， 您当前选择的城市为 <span class="select_city sxs--modal--close" style="cursor: pointer" @click="monitorAreaChanges('','全国站')">[全国]</span>，您也可以切换到以下城市
          </div>
          <div class="sxs--modal--text bottom0">
            <div class="select_citys">
              <span v-for="list in HitCity" style="cursor: pointer" @click="monitorAreaChanges(list.id,list.shortName)">{{list.shortName}}</span>
            </div>
          </div>
          <div class="sxs--modal--text top10 f16">其他城市请选<span class="quanguo" @click="monitorAreaChanges('','全国站')" style="cursor: pointer"> [全国]</span></div>
          <div class="sxs--modal--btn top10 sure-btn">
            <span class="sxs--modal--close" @click="addressSelection=false;">关闭</span>
          </div>
        </div>
      </div>
    </div>
    <div style="position: fixed;right: 0px; bottom: 200px;width: 100px;height: 150px;z-index: 99999999;">
      <img src="http://39.106.117.195/image/658351592518957314.png" style="width: 100px;height: 100px;" alt="">
      <div style="font-size: 15px;text-align: center"><span>联系客服</span></div>
    </div>
  </div>
</template>

<script>
  import { common } from '../js/common.js'
  export default {
    name: "company-head",
    data(){
      return{
        x_width:1080,
        userImg:'http://39.106.117.195/image/home/default_headpic.png',
        logo:'http://39.106.117.195/image/logo/logo.png',
        ifStudentAndEnterprise:false,
        addressSelection:false,
        HitCity:[],
        HitCityId:"100000",
        area:"全国站",
        data:{},
        type:0,

      }
    },
    mounted () {//初始化
      let _this=this;
      this.getHitCity();
      this.getUserData();
      common.$on("iflogin",function () {
        _this.getUserData();
      });
    },
    methods:{
      //获取登陆者的个人信息
      getUserData(){
        //console.log(this.type)
        this.getData("/api/member/get",{}).then((res)=>{
          if(res.data.code==0){
            this.type=parseInt(window.localStorage.getItem("type")) ;
            if(this.type==1){
              this.x_width=1080;
            }else{
              this.x_width=1600;
              //this.$router.push('./companyhr');
            }
            this.postData("/api/resume/getUser", {userId: res.data.data.id}).then((res) => {
              if (res.data.code == 0) {
                this.data= res.data.data;
                console.log(this.data)
                this.jrPage();
              } else {
                console.log(res.data.message);
              }
            });
          }else{
            //alert(window.localStorage.getItem("type"))
            this.type=window.localStorage.getItem("type");
            window.localStorage.setItem("type",0);
            this.x_width=1080;
            common.$emit("c_s",true);

          }
        })
      },
      //刷新时判断进入哪个页面
      jrPage(){
        this.type=window.localStorage.getItem("type");
        if(this.type==0){
          this.x_width=1080;
          this.$router.push('/StudentHome');
          common.$emit("c_s",true);
        }else if(this.type==4){
          this.x_width=1600;
          this.$router.push('/companyhome');
          common.$emit("c_s",false);
        }
      },
      //获取热门城市
      getHitCity(){
        this.postData("/api/homepage/getHitCity",{},{}).then((res) => {
          if(res.data.code==0){
            this.HitCity=res.data.data;
          }else{
            console.log(res.data.methods);
          }
        });
      },
      //监听地区变化
      monitorAreaChanges(id,name){
        this.area=name;
        common.$emit("HitCityId", id);
        this.addressSelection=false;
      },
      //切换学生和企业
      ClickEntrance:function(num){
        this.type=num;
        window.localStorage.setItem("type",num)
        this.jrPage();
      },
      //退出账号
      ExitLogons:function () {
        this.postData("/api/session/logout",{},{}).then((res) => {
          if(res.data.code==0){
            console.log("退出成功");
            //window.localStorage.removeItem('USER');
            window.localStorage.removeItem('C_USER');
            window.localStorage.removeItem('S_id');
            window.localStorage.removeItem('token');
            window.localStorage.setItem('type','0');
            window.localStorage.removeItem("cs");
            this.ifStudentAndEnterprise=false;
            this.addressSelection=false;
            this.if_login=false;
            this.if_clogin=false;
            this.x_width=1080;
            this.type=0;
            this.getUserData();
            this.jrPage();
            this.$router.push('./StudentHome');
            common.$emit("iflogin", false);
          }else{
            console.log(res.data.message)
          }
        }, (err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style scoped>
/**{*/
  /*font-size: 16px;*/
/*}*/

#head_content .home_logo h1 {
  text-indent: -9999px;
}

#hr_nav li {
  float: left;
  list-style: none;
  margin: 0 20px;
  cursor: pointer;
  line-height: 90px;
  font-weight: 500;
}

#hr_nav li a {
  height: 100%;
  display: inline-block;
  color: #1c4f70;
  cursor: pointer;
}
.hr_home {
  position: absolute;
  right: 0px;
  top: 10px;
  cursor: pointer;
}

.hr_home ul li {
  width: 143px;
  height: 40px;
  background: #02a0e9;
  line-height: 40px;
  text-align: center;
  color: #fff;
}

.hr_home ul li a {
  color: #fff;
}

.ul-list {
  overflow: hidden;
}

.ul-list:hover {
  overflow: visible;
}

.ul-list:hover .sencdlist {
  margin-top: 0;
}

.sencdlist {
  transition: all .3s linear;
  -moz-transition: all .3s linear;
  /* Firefox 4 */
  -webkit-transition: all .3s linear;
  /* Safari and Chrome */
  -o-transition: all .3s linear;
  /* Opera */
  margin-top: 10px;
}

.sencdlist li {
  -webkit-transition: text-indent .3s ease;
  transition: text-indent .3s ease;
}

.sencdlist li:hover {
  background-color: #00c6ff;
  text-indent: 10px;
}
.Hmain{
  width: 1080px;
  margin: 0 auto;
  height: 56px;
  position: relative;
}
.icon_app{
  padding-top: 4px;
  position: absolute;
  top:15px;
  left: 0px;
  width: 120px;
  z-index: 22;
}
  /*头部*/
  .companyhead {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .Hmain>div {
    float: left;
  }

  /*logo*/
  .logo {
    margin-top: 10px;
    width:125px;
    height: 31px;
    background-color: #fff;
    margin-right: 30px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
.men_box{
  height: 100%;
}
  /*菜单*/
  .menu {
    height: 100%;
    list-style: none;
    display: flex;
    align-items: center;
  }

  .menu li {
    display: inline-block;
    font-size: 16px;
    height:56px;
    line-height: 56px;
    padding: 0 30px;
  }
  .city-address{
    cursor: pointer;
  }
  .menu li .routerLink {
    text-decoration: none;
    color: #000;
    display: inline-block;
    height: 98.5%;
  }

  .Hmain .student_enter {
    height: 48px;
    float: right;
    display: flex;
    align-items: center;
  }
.geren_caidan{
  float: right;
  height:35px;
  overflow: hidden;
  position: absolute;
  top:15px;
  right: 0px;
  width: 112px;
  text-align: right;
  z-index: 10;
  background: #fff;
  transition:width 2s;
  -webkit-transition:height 0.5s; /* Safari */
}

.geren_caidan:hover{
  height:207px;
}
.geren_caidan ul{
  position: absolute;
  width: 110px;
  right: 0px;
  top: 45px;
  z-index: 99;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 4px #eaeaea;
  background-color: #fff;
}
.geren_caidan ul>li{
  height: 40px;
  width: 110px;
  margin:0;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.geren_caidan a{
  text-decoration: none;
  font-size: 14px;
}
.geren_caidan ul>li:hover{
  background: #eaeaea;
  color: #6aa2e4;
}
.geren_caidan ul a:hover{
  background: #eaeaea;
  color: #6aa2e4;
}
.geren_caidan .p_sj{
  position: absolute;
  right: 7px;
  top: 33px;
  z-index: 999;
}
.app_nav .nav li{
  cursor:pointer;
}

  .student_enter>a {
    border: 1px solid #6cbcef;
    padding: 2px 12px;
    text-decoration: none;
    color: #6cbcef;
    cursor: pointer;
  }
  .menu li a:hover{
    color:#49b4ee;
  }
.menu li .router-link-active{
  color:#49b4ee;
  border-bottom: 2px solid #49b4ee;
}
.city-address::before {
  content: "(切换)";
  position: absolute;
  line-height: 42px;
  font-size: 12px;
  color: #999;
}
.city-address {
  line-height: 74px !important;
  color: #666;
  font-weight: 300;
  -webkit-transition: all .4s;
  -moz-transition: all .4s;
  -ms-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
}
.sxs--modal--container.sxs--modal--shown{
  opacity: 1;
  z-index: 90;
  -webkit-transform: translate3D(0, 0px, 0);
  -moz-transform: translate3D(0, 0px, 0);
  -ms-transform: translate3D(0, 0px, 0);
  -o-transform: translate3D(0, 0px, 0);
  transform: translate3D(0, 0px, 0);
}
.sxs--modal--container
{
  width: 434px;
  position: absolute;
  top:50%;
  /*bottom:0;*/
  left:0;right:0;
  margin:auto;
  opacity: 0;
  -webkit-transform: translate3D(0, -100px, 0);
  -moz-transform: translate3D(0, -100px, 0);
  -ms-transform: translate3D(0, -100px, 0);
  -o-transform: translate3D(0, -100px, 0);
  transform: translate3D(0, -100px, 0);
}
.sxs--modal > .sxs--modal--bg{
  width: 434px;
  padding: 6px;
  height: 0px;
  position: absolute;
  top:0;bottom:0;
  left:0;right:0;margin:auto;
  background: #dfedfd;
  -webkit-transition: all .6s;
  -moz-transition: all .6s;
  -ms-transition: all .6s;
  -o-transition: all .6s;
  transition: all .6s;
}
/*.sxs--modal--content{*/
/*display: table-cell;*/
/*vertical-align: middle;*/
/*width: 100%;*/
/*}*/
.sxs--modal--bg::before{
  content: '';
  height: 100%;
  width: 100%;
  display: block;
  background: #fff;
}
.sxs--modal{
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.4);
  width: 100%;
  height: 100%;
}
.sxs--modal > .sxs--modal--bg{

}
.sxs--modal--content > div,
.sxs--modal--content > form
{
  padding: 10px 0;
  margin: 0 36px;
}



.sxs--modal--hiding {
  -webkit-animation: sxs--modal--hiding .6s 1 forwards;
  -o-animation: sxs--modal--hiding .6s 1 forwards;
  animation: sxs--modal--hiding .6s 1 forwards;
}
.sxs--modal--shown{
  -webkit-animation: sxs--modal--shown .6s 1 forwards;
  -o-animation: sxs--modal--shown .6s 1 forwards;
  animation: sxs--modal--shown .6s 1 forwards;
}

@keyframes sxs--modal--shown {
  0%{
    opacity: 0;
    -webkit-transform: translate3D(0, 100px, 0);
    -moz-transform: translate3D(0, 100px, 0);
    -ms-transform: translate3D(0, 100px, 0);
    -o-transform: translate3D(0, 100px, 0);
    transform: translate3D(0, 100px, 0);
  }
  100%{
    opacity: 1;
    -webkit-transform: translate3D(0, 0px, 0);
    -moz-transform: translate3D(0, 0px, 0);
    -ms-transform: translate3D(0, 0px, 0);
    -o-transform: translate3D(0, 0px, 0);
    transform: translate3D(0, 0px, 0);
  }
}
@keyframes sxs--modal--hiding{
  100%{
    opacity: 0;
    -webkit-transform: translate3D(0, -100px, 0);
    -moz-transform: translate3D(0, -100px, 0);
    -ms-transform: translate3D(0, -100px, 0);
    -o-transform: translate3D(0, -100px, 0);
    transform: translate3D(0, -100px, 0);
  }
  0%{
    opacity: 1;
    -webkit-transform: translate3D(0, 0px, 0);
    -moz-transform: translate3D(0, 0px, 0);
    -ms-transform: translate3D(0, 0px, 0);
    -o-transform: translate3D(0, 0px, 0);
    transform: translate3D(0, 0px, 0);
  }
}

.sxs--modal--content > .sxs--modal--icon:first-child{
  background: no-repeat center 36px;
}
/*.sxs--modal--content > .sxs--modal--icon {*/
  /*height: 76px;*/
  /*background: url("img/i-tip.png") no-repeat center;*/
/*}*/
/*.sxs--modal--content > .sxs--modal--icon[data-icon='tip']{*/
  /*background-image: url("img/i-tip.png");*/
/*}*/
/*.sxs--modal--content > .sxs--modal--icon[data-icon='error']{*/
  /*background-image: url("img/i-error.png");*/
/*}*/
/*.sxs--modal--content > .sxs--modal--icon[data-icon='success']{*/
  /*background-image: url("img/i-success.png");*/
/*}*/
.sxs--modal--content > div.sxs--modal--title:first-child,
.sxs--modal--content > div.sxs--modal--icon:first-child
{
  padding-top: 36px;
}
.sxs--modal--content > div:last-child{
  padding-bottom: 36px;
}
.sxs--modal--title{
  text-align: center;
  color: #333;
  font-size: 24px;
  line-height: 30px;
  padding: 8px 0 10px;
}
.sxs--modal--text{
  color: #999;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
}
.sxs--modal--text > span,
.sxs--modal--text > a
{
  color: #6aa2e4;
  display: inline-block;
  vertical-align: top;
  padding: 0 3px;
}
.sxs--modal--text > a:hover{
  text-decoration: none;
}
.sxs--modal--content > .sxs--modal--btn{
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding-top: 36px;
}
.sxs--modal--btn > span,
.sxs--modal--btn > a
{
  display: block;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  line-height: 48px;
  text-align: center;
  margin-right: 20px;
  background: #fafafa;
  border: solid 1px #eaeaea;
  color: #999;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.sxs--modal--btn > span[data-style='primary'],
.sxs--modal--btn > span[data-style='primary'][data-modal-form-check='passed'],
.sxs--modal--btn > a[data-style='primary'],
.sxs--modal--btn > a[data-style='primary'][data-modal-form-check='passed']
{
  background: #fafafa;
  border: solid 1px #eaeaea;
  color: #999;
  cursor: pointer;
}
.sxs--modal--btn > span[data-style='primary']:hover,
.sxs--modal--btn > span[data-style='primary'][data-modal-form-check='passed']:hover,
.sxs--modal--btn > a[data-style='primary']:hover,
.sxs--modal--btn > a[data-style='primary'][data-modal-form-check='passed']:hover
{
  border: solid 1px #eaeaea;
  color: #999;
  background: #f5f5f5;
  cursor: pointer;
}
.sxs--modal--btn > span[data-style='active'],
.sxs--modal--btn > span[data-style='active'][data-modal-form-check='passed'],
.sxs--modal--btn > a[data-style='active'],
.sxs--modal--btn > a[data-style='active'][data-modal-form-check='passed']
{
  background: #6aa2e4;
  border: solid 1px #5e98db;
  color: #fff;
  cursor: pointer;
}
.sxs--modal--btn > span[data-style='active']:hover,
.sxs--modal--btn > span[data-style='active'][data-modal-form-check='passed']:hover,
.sxs--modal--btn > a[data-style='active']:hover,
.sxs--modal--btn > a[data-style='active'][data-modal-form-check='passed']:hover
{
  border: solid 1px #5e98db;
  color: #fff;
  background: #5e98db;
  cursor: pointer;
}
.sxs--modal--btn > span[data-style='disable'],
.sxs--modal--btn > span[data-modal-form-check],
.sxs--modal--btn > span[data-style='disable']:hover,
.sxs--modal--btn > span[data-modal-form-check]:hover,
.sxs--modal--btn > a[data-style='disable'],
.sxs--modal--btn > a[data-modal-form-check],
.sxs--modal--btn > a[data-style='disable']:hover,
.sxs--modal--btn > a[data-modal-form-check]:hover
{
  background: #fafafa;
  border: solid 1px #eaeaea;
  color: #ccc;
  cursor: not-allowed;
}
.sxs--modal--btn > a:last-child,
.sxs--modal--btn > span:last-child{
  margin-right: 0;
}
.sxs--modal--content{
  overflow-y: auto;
  overflow-x: hidden;
}

.sxs--modal--input{
  height: 48px;
}
.sxs--modal--content > .sxs--modal--form{
  padding-bottom: 30px;
  position: relative;
}
.sxs--modal--form>label{
  display: block;
  padding-bottom: 20px;
}
.sxs--modal--form>label:last-child{
  padding-bottom: 0;
}
.sxs--modal--form>label.sxs--modal--input{
  position: relative;
}
.sxs--modal--form>label.sxs--modal--input > input
{
  padding: 8px;
  border: solid 1px #f5f5f5;
  background: #fafafa;
  line-height: 32px;
  font-size: 16px;
  color: #6aa2e4;
  letter-spacing: 2px;
  -webkit-transition: all .4s;
  -moz-transition: all .4s;
  -ms-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}
.sxs--modal--form>label.sxs--modal--input > span.sxs--modal--input--btn{
  position: absolute;
  padding: 0 22px;
  display: inline-block;
  right: 7px;
  top: 7px;
  line-height: 36px;
  background: #6aa2e4;
  color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
.sxs--modal--form>label.sxs--modal--input > span.sxs--modal--input--btn:hover{
  background: #5e98db;
}
.sxs--modal--form>label.sxs--modal--input > input:focus{
  border-color: #6aa2e4;
}
.sxs--modal--form>label.sxs--modal--input[data-sxs-err="true"] > input{
  border-color: #f68a8a !important;
  color: #f68a8a !important;
  -webkit-box-shadow: inset 0 0 4px 2px rgba(246, 138, 138, 0.61);
  -moz-box-shadow: inset 0 0 4px 2px rgba(246, 138, 138, 0.61);
  box-shadow: inset 0 0 4px 2px rgba(246, 138, 138, 0.61);
}
.sxs--modal--form>label.sxs--modal--select > select{
  display: none;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector
{
  display: block;
  padding: 8px;
  border: solid 1px #f5f5f5;
  background: #fafafa;
  line-height: 32px;
  font-size: 16px;
  color: #666;
  letter-spacing: 2px;
  -webkit-transition: all .4s;
  -moz-transition: all .4s;
  -ms-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}
.sxs--modal--form>label.sxs--modal--select{
  position: relative;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector::before,
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector::after
{
  content: "";
  position: absolute;
  display: block;
  width: 6px;
  height: 2px;
  background: #ccc;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  right: 20px;
  top: 25px;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector::after{
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 16px;
  top: 25px;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector.active{
  color: #999;
  background: #fff;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector.active::before,
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector.active::after{
  background: #6aa2e4;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector.active,
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector.active ~ ul.sxs--modal--options
{
  border-color: #6aa2e4;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector.active ~ ul.sxs--modal--options{
  -webkit-transform: scale(1, 1) !important;
  -moz-transform: scale(1, 1) !important;
  -ms-transform: scale(1, 1) !important;
  -o-transform: scale(1, 1) !important;
  transform: scale(1, 1) !important;
  -webkit-transform-origin: 50% 0 !important;
  -moz-transform-origin: 50% 0 !important;
  -ms-transform-origin: 50% 0 !important;
  -o-transform-origin: 50% 0 !important;
  transform-origin: 50% 0 !important;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector ~ ul.sxs--modal--options li.active{
  color: #6aa2e4;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector ~ ul.sxs--modal--options li:hover{
  background: #fafafa;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector ~ ul.sxs--modal--options li{
  list-style: none;
  line-height: 32px;
  padding: 8px;
  font-size: 16px;
}
.sxs--modal--form>label.sxs--modal--select > .sxs--modal--selector ~ ul.sxs--modal--options
{
  position: absolute;
  top: 49px;
  margin: 0;
  padding: 0;
  border: solid 1px #f5f5f5;
  border-top: none;
  background: #fff;
  color: #333;
  letter-spacing: 2px;
  -webkit-transition: all .4s;
  -moz-transition: all .4s;
  -ms-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
  -webkit-transform: scale(1, 0);
  -moz-transform: scale(1, 0);
  -ms-transform: scale(1, 0);
  -o-transform: scale(1, 0);
  transform: scale(1, 0);
  -webkit-transform-origin: 50% 0 ;
  -moz-transform-origin: 50% 0 ;
  -ms-transform-origin: 50% 0 ;
  -o-transform-origin: 50% 0 ;
  transform-origin: 50% 0 ;
  outline: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  z-index: 9;
  max-height: 145px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.sxs--modal--form>label{

}
.sxs--modal--form[data-sxs-err]::before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  bottom: 3px;
  left: 3px;
  background: #f68a8a;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.sxs--modal--form[data-sxs-err]::after {
  content: attr(data-sxs-err);
  color: #f68a8a;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 24px;
  line-height: 20px;
}

.select_citys>span {
  color: #444;
  margin: 0 8px 20px;
  width: 68px;
  height: 36px;
  line-height: 38px;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  background-color: #f5f5f5;
  display: inline-block;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
}
.select_citys > span {
  color: #444;
  padding: .2em .8em;
  margin: 0 .8em 1em;
  display: inline-block;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
}
.f16{
  font-size: 16px;
}
</style>
