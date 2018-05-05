<template>
  <div>
    <div class="app_footer_Shell">
      <footer>
        <div class="container">
          <div class="nav_bottom" style="margin: 0 auto">
            <div class="nav_item">
              <span class="nav_til">产品服务</span>
              <span class="a"><a href="http://wallstreets.cn/">华尔街学堂</a></span>
            </div>
            <div class="nav_item">
              <span class="nav_til">关于我们</span>
              <span class="a"><router-link to="/understand" target="_blank">了解我们</router-link></span>
              <span class="a"><a href="http://mp.weixin.qq.com/s?__biz=MzI2MzM3ODY3Ng==&mid=100003800&idx=1&sn=b1df8535c86c9106b19750a73f25c6a0&chksm=6abd8c435dca05559b218a4eb393c718a32304241ff946318761d752cb40a5146630a243319d&mpshare=1&scene=1&srcid=0321tr5kQHVXq836l60Zb8WI#rd" target="_blank">加入我们</a></span>
            </div>
            <div class="nav_item">
              <span class="nav_til">联系我们</span>
              <span class="a" style="position: relative"><a class="khfw"  v-on:mouseenter="youxiang=true" v-on:mouseleave="youxiang=false">邮箱</a><a v-show="youxiang">
                mentoroffer0@163.com
              </a></span>
              <span class="a" style="position: relative;"><a class="khfw"  v-on:mouseenter="img1=true" v-on:mouseleave="img1=false">公众账号</a><a
                v-show="img1" style="position: absolute;right:70px;top: 0px;"><img src="../img/Understand/mentugongzhonghao.jpg" style="width: 100px;height: 100px;" alt=""></a></span>
              <span class="a"><a class="khfw" v-on:mouseenter="img2=true" v-on:mouseleave="img2=false">微信客服</a><a
                v-show="img2" style="position: absolute;right:70px;top: 0px;"><img src="http://39.106.117.195/image/658351592518957314.png" style="width: 100px;height: 100px;" alt=""></a></span>
            </div>
          </div>
          <div class="text_bottom">
            <div class="text"><span>©2018 门徒求职</span>|<span><a style="color:#999" target="_blank" href="http://www.miitbeian.gov.cn">京ICP备18000484号</a></span>|<span>联系我们：<a class="a_link" href="Mailto:mentoroffer0@163.com" target="_blank">mentoroffer0@163.com</a></span></div>
            <div class="text">中国领先的实习生招聘平台</div>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001179" target="_blank" class="text"><i style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/record-icon.png?v=d0289dc0a46fc5b15b3363ffa78cf6c7)"></i></a>
          </div>
        </div>
      </footer>
    </div>
  </div>

</template>

<script>
  import { common } from '../js/common.js'
  export default {
    name: "companyfoot",
    data() {
      return {
        youxiang:false,
        img:"",
        img1:false,
        img2:false,
        foot_1: '中国领先的实习生招聘平台',
        foot_2: '2017门徒求职',
        foot_3: '京ICP备18000484号',
        foot_4: 'hr@mentoroffer.com',
        ifStudentAndEnterprise:false,
        type:"0"
      }
    },
    mounted () {//初始化

      let _this=this;
      common.$on("c_s",function (c_s) {
        console.log(c_s);
        _this.jrPage();
      });
    },
    methods: {
      //刷新时判断进入哪个页面
      jrPage(){
        this.type=window.localStorage.getItem("type");
        if(this.type==0||this.type==1){
          this.ifStudentAndEnterprise=false;
        }else if(this.type==2||this.type==3||this.type==4){
          this.ifStudentAndEnterprise=true;
        }
      },
    }
  }
</script>

<style scoped>
  a{
    cursor: pointer;
  }
  .Fmain{
    width: 1080px;
    margin: 0 auto;
  }
  .companyfoot{
    width: 100%;
    height: 150px;
    background-color: #253038;
  }
  .companyfoot .Fmain p{
    color: #6e7173;
    text-align: center;
    padding: 3em;
  }
  .app_footer_Shell{
    width: 100%;
    height: 354px;
    position: relative;
    z-index: 3;
    overflow: hidden;
    color: #000;
    padding-top: 30px;
    background-color: #fafafa;
  }
  .app_footer_Shell footer{
    width: 1080px;
    margin: auto;
  }
  .app_footer_Shell .container {
    width: 100%;
    height: 100%;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
  }
  .app_footer_Shell .nav_bottom {
    position: relative;
    height: 204px;
    padding-top: 60px;
    letter-spacing: 0;
    font-size: 0;
  }
  .app_footer_Shell .text_bottom {
    position: relative;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    color: #999;
    display: block;
  }
  .app_footer_Shell .nav_item {
    position: relative;
    display: inline-block;
    width: 245px;
    vertical-align: top;
  }
  .app_footer_Shell .nav_til {
    position: relative;
    width: 100%;
    display: inline-block;
    font-size: 20px;
    color: #333;
  }
  .app_footer_Shell .a {
    width: 100%;
    position: relative;
    display: inline-block;
    font-size: 14px;
    padding-top: 14px;
  }
  .app_footer_Shell .a > a {
    display: inline-block;
    color: #666;
    text-decoration: none;
  }
  .app_footer_Shell .nav_r {
    width: 82px;
    text-align: right;
  }
</style>
