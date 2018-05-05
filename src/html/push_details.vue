<template>
  <div class="job-box">
    <div class="job-header">
      <div class="new_job_name">{{pageData.name}}</div>
      <div class="job_date "><span class="cutom_font">{{pageData.updateTime}}</span><span>刷新</span></div>
      <div class="job_msg">
        <span class="job_money cutom_font">{{pageData.lowest}}-{{pageData.highest}}／天</span>
        <span class="job_position">{{pageData.area.name}}</span>
        <span class="job_academic">
          <span v-if="pageData.education==''">不限</span>
          <span v-if="pageData.education=='专科'">专科</span>
          <span v-if="pageData.education=='本科'">本科</span>
          <span v-if="pageData.education=='硕士'">硕士</span>
          <span v-if="pageData.education=='博士'">博士</span>
        </span>
        <span class="job_week cutom_font">{{pageData.dayNumber}}天/周</span>
        <span class="job_time cutom_font">实习{{pageData.practiceMonth}}个月</span>
      </div>
      <div class="job_good">职位诱惑：{{pageData.jobAttract}}</div>
      <div class="job-com" >
        <router-link target="_blank" class="com-con" :to="{ name: 'company_home', params: { CompanyData: JSON.stringify(pageData.companyDto)}}">
          <img :src='pageData.companyDto.logo'  alt="科锐国际实习招聘" class="com-logo bgs">
          <div class="com-name">{{pageData.companyDto.name}}</div>
          <div class="com-num">{{pageData.companyDto.size}}</div>
          <div class="com-class">{{pageData.companyDto.mainBusinessDescription}}</div>
          <div class="com-right" style="background-image: url(http://39.106.117.195/image/lcon/right.png)"></div>
        </router-link>
      </div>
      <div class="job_more">
        <!--<span class="share bgs" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/job_icon_share.png?v=e3bdd1f31bb159cd431e7848e011a6e4)"  >-->
        <!--<span class="job_det_share">-->
        <!--<span class="bdsharebuttonbox bdshare-button-style1-24" data-bd-bind="1513374821226">-->
        <!--<a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>-->
        <!--<a class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>-->
        <!--<a class="bds_sqq" data-cmd="sqq" title="分享到QQ"></a>-->
        <!--<a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>-->
        <!--<a class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>-->
        <!--<a class="bds_renren" data-cmd="renren" title="分享到人人网"></a>-->
        <!--<a class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a>-->
        <!--</span>-->
        <!--</span>-->
        <!--</span>-->
        <span class="tip bgs jb"
              style="background-image: url(http://39.106.117.195/image/lcon/job_icon_tip.png)" v-on:click="reportShow()"></span>
      </div>
    </div>
    <div class="job-content">
      <div class="content_left">
        <input type="hidden" class="taruuid" value="inn_gc0twcmxncvx">
        <input type="hidden" class="toemail" value="">
        <input id="sdtoken_complain" name="sdtoken_complain" value="P6N39c1q14jOch9MjPdUOk6odvnB57on" type="hidden">
        <input id="sdtoken_cf" value="XaQT7zlXKcSXH6iYG30783FHdbZb6O8Z" type="hidden">
        <div class="con-job job_introduce">
          <div class="job_til">职位描述：</div>
          <div class="job_part" v-html="pageData.description">

          </div>
        </div>
        <div class="con-job con-com_introduce">
          <div class="job_til">公司简介：</div>
          <div class="job_com_name cutom_font" style="font-size: 16px;">{{pageData.companyDto.name}}</div>
          <div class="job_detail" style="font-size: 16px;">{{pageData.companyDto.introduce}}</div>
          <div class="job_detail job_detail_msg" style="font-size: 16px;"><span>{{pageData.companyDto.area.name}}</span><span>{{pageData.companyDto.size}}人</span><span>{{pageData.companyDto.mainBusinessDescription }}</span></div>
          <a target="_blank" rel="nofollow" class="job_link" style="font-size: 16px;color: #000">官网：{{pageData.companyDto.site}}</a>
          <div class="job_com_position"><span class="com_position" style="font-size: 16px;">{{pageData.address}}</span></div>
        </div>
        <div class="con-job deadline">
          <div class="job_til">截止时间：</div>
          <div class="job_detail cutom_font">{{pageData.expiryDate}}</div>
        </div>
        <div class="con-job resume_content">
        </div>
      </div>
      <div class="content_right">
        <div style="text-align: center">
          <img :src="pageData.qrCode" alt="" style="width: 200px;height: 200px;">
          <div style="text-align: center"><span>扫二维码，咨询小助手job_com_name cutom_font</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {//变量
      return {
        calendar:{
          fullyear:"",
          month:"",
          date:"",
          datalist:[]
        },
        pageData:{jobDtos: [{
          companyDto:{
            logo:""
          }
        }
        ]},
      }
    },
    mounted () {//初始化
      this.pageData=JSON.parse(this.$route.params.pushData);//获取传过来的值
      console.log(this.pageData);
    },
    methods:{//方法
      //显示举报
      reportShow:function () {
        $(".jb-box").css("display","block");
        $("#shade").css("display","block");
      },
      //隐藏举报
      reportHide:function () {
        $(".jb-box").css("display","none");
        $("#shade").css("display","none");
      }
    }
  }
</script>
<style lang="scss">
  .job-box {
    position: relative;
    max-width: 1080px;
    width: 100%;
    height: 100%;
    margin: 35px auto 20px;
    color: #333;
    font-size: 14px;
    .job-header {
      position: relative;
      /*height: 150px;*/
      padding: 40px 320px 40px 0;
      border-bottom: 1px solid #eaeaea;
    }

    .job-header .new_job_name {
      position: relative;
      font-size: 30px;
      max-width: 680px;
    }

    .job-header .job_date {
      position: relative;
      font-size: 16px;
      color: #888888;
      padding: 22px 0;
    }

    .job-header .job_date > span {
      margin-right: 15px;
    }

    .job-header .job_msg, .job-header .job_good {
      position: relative;
      font-size: 16px;
    }

    .job-header .job_msg > span {
      position: relative;
      padding: 0 20px;
      /*padding: 0 20px 0 42px;*/
    }

    .job-header .job_msg .job_money {
      padding-left: 0;
      /*padding-left: 20px;*/
    }

    .job-header .job_msg > span:before {
      content: "";
      position: absolute;
      display: none;
      width: 9px;
      height: 12px;
      left: 22px;
      top: 5px;
    }

    .job-header .job_msg .job_money:before {
      left: 0;
    }


    .job-header .job_msg .job_academic:before {
      top: 4px;
      width: 14px;
      height: 14px;
    }

    .job-header .job_msg .job_week:before {
      top: 5px;
      width: 11px;
    }

    .job-header .job_msg .job_time:before {
      top: 5px;
      width: 11px;
    }

    .job-header .job_msg > span:after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 18px;
      left: 0;
      top: 2px;
      background-color: #333;
    }

    .job-header .job_msg .job_money:after {
      display: none;
    }

    .job-header .job_good {
      padding-top: 20px;
    }

    .job-header .job_more {
      position: absolute;
      right: 320px;
      top: 40px;
    }

    .job-header .job_more > span {
      position: relative;
      float: right;
      margin-left: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .job-header .job_more .job_det_share{
      position: absolute;
      top: 38px;
      left: -120px;
      height: 0;
      overflow: hidden;
      width: 220px;
      -webkit-transition: all .4s;
      -moz-transition: all .4s;
      -ms-transition: all .4s;
      -o-transition: all .4s;
      transition: all .4s;
    }


    .job-content {
      position: relative;
    }

    .content_left {
      position: relative;

      width: 760px;
    }

    .content_right {
      padding-top: 40px;
      position: absolute;
right: 0px;
      top:20px;
      width: 240px;
    }

    .content_left .con-job {
      position: relative;
      padding-top: 40px;
    }

    .content_left .con-job .job_til {
      position: relative;
      font-size: 20px;
      padding-bottom: 30px;
    }

    .content_left .con-job .job_part {
      position: relative;
      padding-bottom: 30px;
    }

    .content_left .con-job .job_detail {
      position: relative;
      padding-bottom: 10px;
      word-break: break-all;
      font-size: 16px;
    }

    .content_left .con-job .job_com_name {
      position: relative;
      font-size: 18px;
      padding-bottom: 30px;
    }

    .content_left .con-job .job_link {
      position: relative;
      display: inline-block;
      text-decoration: none;
      color: #6aa2e4;
      margin-bottom: 16px;
      cursor: pointer;
    }

    .content_left .con-com_introduce .job_detail {
      padding-bottom: 16px;
    }

    .content_left .con-com_introduce .job_detail_msg > span {
      position: relative;
      padding: 0 20px 0 22px;
    }

    .content_left .con-com_introduce .job_detail_msg > span:before {
      content: "";
      position: absolute;
      display: inline-block;
      width: 1px;
      height: 18px;
      left: 0;
      top: 0;
      background-color: #333;
    }

    .content_left .con-com_introduce .job_detail_msg > span:first-child {
      padding-left: 0;
    }

    .content_left .con-com_introduce .job_detail_msg > span:first-child:before {
      display: none;
    }

    .content_left .con-com_introduce .job_com_position {
      position: relative;
      padding-bottom: 16px;
    }

    .content_left .con-com_introduce .job_com_position .com_position {
      position: relative;
      padding-left: 30px;
    }

    .content_left .con-com_introduce .job_com_position .com_position:before {
      content: "";
      position: absolute;
      display: inline-block;
      width: 12px;
      height: 14px;
      left: 0;
      top: 2px;
    }

    .content_left .con-com_introduce .job_com_position .search_map {
      position: relative;
      margin-left: 30px;
      color: #6aa2e4;
      cursor: pointer;
    }

    .content_right .job_collect {
      position: relative;
      /*width: 238px;*/
      height: 58px;
      border: 1px solid #999;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      border-radius: 4px;
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
      cursor: pointer;
      float: right;
      width: 89px;
    }
    .content_right .job_collect .job_star {
      position: relative;
      display: inline-block;
      width: 18px;
      height: 18px;
      top: 3px;
      margin-right: 8px;
      background-size: cover;
    }

    .content_left .deadline {
      padding-bottom: 30px;
      border-bottom: 1px solid #eaeaea;
    }

    .jb-box > p{
      margin: 0;
    }

    .job-header .job-com {
      position: absolute;
      right: 0;
      top: 60px;
      width: 240px;
      height: 90px;
    }
    .job-header .job-com .com-con {
      position: relative;
      display: inline-block;
      text-decoration: none;
      width: 115px;
      height: 90px;
      padding: 0 20px 0 105px;
    }
    .job-header .job-com .com-con .com-logo {
      position: absolute;
      width: 90px;
      height: 90px;
      left: 0;
      top: 0;
      border: 1px solid #eaeaea;
    }

    .de_ra + span {
      display: block;
      background-color: #fafafa;
      border: solid 1px #eee;
      padding-left: 8px;
      line-height: 24px;
    }

    .de_ra + span a {
      position: relative;
      z-index: 3;
    }
    .de_look a {
      color: #555;
      cursor: pointer;
    }

    textarea {
      overflow: auto;
    }

    .content_left .con-com_introduce .job_com_position .com_position:before{
      background-image: url(http://39.106.117.195/image/lcon/job_com_position.png);
    }
    .calendar_week>li{
      color:#666;
      background: #F1F1F1;
    }
    .calendar li{
      width: 30px;
      height: 23px;
      float: left;
      border: 1px solid #DDDDDD;
      line-height: 25px;
      text-align: center;
    }
  }


</style>

