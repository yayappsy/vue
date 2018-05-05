<template>
  <div class="company_issue_preview">
    <div class="main">
      <div class="inner_left">
        <div class="preview_title_box">
          <div class="title_box">
            <h1 class="title">{{preview_title}}</h1>
            <div class="title_icon">
              <a href="javascript:;" class="title_icon_2"></a>
              <a href="javascript:;" class="title_icon_1"></a>
            </div>
          </div>
          <p class="dateTime_box">{{dateTime}} <a class="reload" href="javascript:location.reload(true);">刷新</a></p>
          <div class="text_box_box">
            <span class="text_box">
              <span class="icon_1"></span>
              <span class="text salary">{{salary}}/天</span>
            </span>
            <span class="l">|</span>
            <span class="text_box">
              <span class="icon_2"></span>
              <span class="text city">{{city}}</span>
            </span>
            <span class="l">|</span>
            <span class="text_box">
              <span class="icon_3"></span>
              <span class="text education">{{education}}</span>
            </span>
            <span class="l">|</span>
            <span class="text_box">
              <span class="icon_4"></span>
              <span class="text daysaweek">{{daysaweek}}天/周</span>
            </span>
            <span class="l">|</span>
            <span class="text_box">
              <span class="icon_5"></span>
              <span class="text mouths">实习{{mouths}}个月</span>
            </span>
          </div>
          <p class="tempt">职位诱惑：{{tempt}}</p>
        </div>

        <div class="preview_inner_box">
          <p class="preview_inner_title">职位描述：</p>
          <p v-for="description in descriptions">{{description}}</p>
          <p class="inner_title">岗位职责</p>
          <ol class="inner_list">
            <li v-for="responsibility in responsibilitys">{{responsibility}}</li>
          </ol>
          <p class="inner_title">任职要求</p>
          <ol class="inner_list">
            <li v-for="demand in demands">{{demand}}</li>
          </ol>
          <p class="preview_inner_title">公司介绍：</p>
          <p class="preview_inner_title">{{company.name}}</p>
          <p class="companyText">{{company.synopsis}}</p>
          <p class="companyText">
            <span>{{company.companyaddress}}</span>
            <span>|</span>
            <span>{{company.scale}}人</span>
            <span>|</span>
            <span v-for="label in company.labels">{{label}}</span>
          </p>
          <a class="companyUrl" :href="`${company.URL}`">{{company.URL}}</a>
          <p class="companyText"><span class="icon_2"></span><span>{{company.address}}</span><a class="companyUrl" href="javascript:;">查看地图</a></p>
          <p class="preview_inner_title">截止时间：</p>
          <p>{{company.deadline}}</p>
        </div>
      </div>


      <div class="inner_right">
        <div class="company_logo" :style="{backgroundImage:`url(${company.logo})`}"></div>
        <a class="collect" href="javascript:;">
          <span class="collect_image" :style="{backgroundImage:`url(${collectImage})`}"></span>
          <span>收藏</span>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "company-issue-preview",
    data() {
      return {
        preview_title: "中意财险-商业风险部助理实习",
        dateTime: '2017-09-29 09:15:57',
        salary: "100-120",
        city: "北京",
        education: "本科",
        daysaweek: 3,
        mouths: 4,
        tempt: "平台大 环境好 行业前景好",
        collectImage: "http://39.106.117.195/image/CompanyIssueImages/collect.png",
        company:{
          name:'科锐国际',
          logo:"http://39.106.117.195/image/CompanyIssueImages/company_logo.png",
          synopsis:'亚洲领先的整体人才解决方案服务商',
          companyaddress:'苏州',
          scale:'500-2000',
          labels:[
            "人力资源",
            '招聘',
            '猎头服务',
          ],
          URL:'http://www.careerintlinc.com',
          address:'北京市朝阳区建国门外大街乙12号双子座大厦西塔',
          addresspoint:'',
          deadline:'2017-10-04',
        },
        descriptions: [
          '【宇宙最快反馈 -- 1小时查看，5小时通知】',
          '本职位由科锐国际公司提供简历筛选及面试通知',
        ],
        responsibilitys: [
          '协助业务经理完成再保分入承接，并对业务进行初步的风险分析',
          '核心系统保单录入及归档，保费和佣金的结算',
          '业务数据统计',
          '协助理赔部门进行赔案操作',
          '定期与客户沟通，维护良好的客户关系'
        ],
        demands: [
          '全日制本科或硕士在校学生，经营类专业',
          '熟练使用办公软件操作',
          '工作细心认真，踏实肯干，具体良好的团队合作意识，敬业精神和服务意识',
          '英文优秀者优先',
          '性格开朗，品行良好',
          '能保证一周3天以上工作',
        ],
        deadline:'2017-10-04',
      }
    }
  }
</script>

<style scoped>
  .company_issue_preview {
    width: 100%;
    /*height: 1000px;*/
    background-color: #fff;
    font-size: 0.9em;
  }

  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    padding: 20px 30px;
  }

  .inner_left {
    width: 70%;
    float: left;
    padding-bottom: 30px;
  }

  .inner_right {
    width: 28%;
    float: right;
    text-align: center;
  }

  .preview_title_box {
    border-bottom: 1px solid #eee;
    padding: 20px;
  }

  .title_box {
    height: 50px;
  }

  .title {
    float: left;
  }

  .title_icon {
    display: inline-block;
    float: right;
    padding-top: 15px;
  }

  .title_icon_1 {
    width: 25px;
    height: 25px;
    display: inline-block;
    background: url("../../assets/CompanyIssueImages/title_icon_1.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    margin-right: 15px;
  }

  .title_icon_2 {
    width: 25px;
    height: 25px;
    display: inline-block;
    background: url("../../assets/CompanyIssueImages/title_icon_2.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    margin-right: 15px;
  }

  /*刷新时间*/
  .dateTime_box {
    margin: 10px 0;
    color: #a5a5a5;
  }

  .dateTime_box a {
    color: #a5a5a5;
    text-decoration: none;
    margin-left: 20px;
  }

  /*职位诱惑*/
  .tempt {
    margin: 10px 0;
  }

  /*竖线*/
  .l {
    padding: 0 20px;
    line-height: 20px;
    float: left;
  }

  /*图标*/
  .icon_1 {
    background: url("../../assets/CompanyIssueImages/icon_1.png");
  }

  .icon_2 {
    background: url("../../assets/CompanyIssueImages/icon_2.png");
  }

  .icon_3 {
    background: url("../../assets/CompanyIssueImages/icon_3.png");
  }

  .icon_4 {
    background: url("../../assets/CompanyIssueImages/icon_4.png");
  }

  .icon_5 {
    background: url("../../assets/CompanyIssueImages/icon_5.png");
  }

  .icon_1, .icon_2, .icon_3, .icon_4, .icon_5 {
    width: 20px;
    height: 20px;
    display: inline-block;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    padding-top: 2px;
    float: left;
    margin: 0 5px 0 0;
  }

  .text_box_box {
    height: 20px;
  }

  .text_box {
    display: inline-block;
    line-height: 20px;
    float: left;
  }

  .text {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    float: right;
  }

  /*公司 logo*/
  .company_logo {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background-position: center center;
    background-repeat: no-repeat;
  }

  /*收藏*/
  .collect {
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    line-height: 40px;
    display: inline-block;
    width: 60%;
    height: 40px;
    background-color: #fff;
    border: 1px solid #757575;
    color: #757575;
    margin: 30px auto;
    border-radius: 5px;
  }

  .collect_image {
    width: 20px;
    height: 20px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }

  /*职位内容 等*/
  .preview_inner_box {
    padding: 30px 20px;
    border-bottom: 1px solid #eee;
  }
  .preview_inner_title{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.5em;

  }
  .inner_title {
    margin-top: 20px;
  }

  .inner_list {
    margin-left: 20px;
  }
  .companyUrl{
    text-decoration: none;
    /*margin: 5px 0;*/
    display: inline-block;
    color: #4bb4ed;
  }
  .companyText{
    margin: 10px 0;
    height: 20px;
  }
  .companyText *{
    display: inline-block;
    float: left;
    margin-right: 20px;
  }
</style>
