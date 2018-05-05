<template>
  <div class="look_Resume">
    <div class="essentialInformation">
      <h2>{{getUser.name}}</h2>
      <p class="fontW"><span>电话：</span>{{getUser.mobile}}</p>
      <p class="fontW"><span>邮箱：</span>{{getUser.email}}</p>
      <div style="overflow: hidden">
        <img :src="getUser.avatar" alt="我的头像">
      </div>
    </div>
    <div v-if="getEducations==undefined||getEducations==''||getEducations">
      <h3>教育背景</h3>
      <hr>
      <div  v-for="list in getEducations" >
        <div>
          <p class="fontW w_25 text_l">{{list.beginDate}}-{{list.endDate}}</p>
          <p class="fontW w_25 text_c">{{list.school}}</p>
          <p class="fontW w_25 text_c">{{list.majorId}}(
            <span v-if="list.education=='专科'">专科</span>
            <span v-if="list.education=='本科'">本科</span>
            <span v-if="list.education=='硕士'">硕士</span>
            <span v-if="list.education=='博士'">博士</span>
            )</p>
          <p class="fontW w_25 text_r">{{list.city.name}}</p>
        </div>
        <p><span class="fontW">·成绩排名:</span><span>{{list.classRank}}</span></p>
      </div>
    </div>
    <div>
      <h3>实习经历</h3>
      <hr>
      <div v-for="list in getPracticeExperiences">
        <div>
          <p class="fontW w_25 text_l">{{list.beginDate}}-{{list.endDate}}</p>
          <p class="fontW w_25 text_c">{{list.companyName}}</p>
          <p class="fontW w_25 text_c">{{list.jobName}}</p>
          <p class="fontW w_25 text_r">{{list.city.name}}</p>
        </div>
        <p><span>{{list.description}}</span></p>
      </div>
    </div>
    <div>
      <h3>学术经历</h3>
      <hr>
      <div v-for="list in getScienceExperiences">
        <div>
          <p class="fontW w_25 text_l">{{list.beginDate}}-{{list.endDate}}</p>
          <p class="fontW w_25 text_c">{{list.projectName}}</p>
          <p class="fontW w_25 text_c">{{list.assumeOffice}}</p>
          <p class="fontW w_25 text_r">{{list.city.name}}</p>
        </div>
        <p><span>{{list.description}}</span></p>s
      </div>
    </div>
    <div>
      <h3>校园经历</h3>
      <hr>
      <div v-for="list in getSchoolExperiences">
        <div>
          <p class="fontW w_25 text_l">{{list.beginDate}}-{{list.endDate}}</p>
          <p class="fontW w_25 text_c">{{list.projectName}}</p>
          <p class="fontW w_25 text_c">{{list.assumeOffice}}</p>
          <p class="fontW w_25 text_r">{{list.city.name}}</p>
        </div>
        <p><span>{{list.description}}</span></p>s
      </div>
    </div>
    <div>
      <h3>技能爱好</h3>
      <hr>
      <div v-for="list in getSkillHobbys">
        <div style="padding:15px 0;">
          <p class="fontW text_l">{{list.type}}</p>
        </div>
        <p><span>{{list.explain}}</span></p>
      </div>
    </div>
    <div>
      <h3>作品展示</h3>
      <hr>
      <div v-for="list in getOpusShows">
        <div style="padding: 15px 0;">
          <p>网址:<span class="color_ccc" >{{list.url}}</span></p>
        </div>
        <p><span>{{list.explain}}</span></p>
      </div>
    </div>
    <div>
      <h3>个人竞技</h3>
      <hr>
      <div style="padding-top: 15px">
        <p>{{getOwnAssess.access}}</p>
      </div>
    </div>
    <div>
      <h3>相关附件</h3>
      <hr>
      <p style="padding-top:15px;" @click="downFile(getRelatedOption.options)">{{getRelatedOption.name}}  </p>

    </div>
  </div>
</template>
<script>
  export default {
    name: "company-issue-release",
    data() {
      return {
        ids:{},
        getUser:{},
        getEducations:{},
        getPracticeExperiences:{},
        getScienceExperiences:{},
        getSchoolExperiences:{},
        getSkillHobbys:{},
        getOpusShows:{},
        getOwnAssess:{},
        getRelatedOption:{},
        openPath:''
      }
    },
    mounted() {
      this.ids = JSON.parse(this.$route.params.ids);//获取传过来的值;
      this.getResumeData();
      this.getPath();
    },
    methods: {
      downFile(file){
          window.open(this.openPath  + '/' + file);
      },
      getPath(){
        this.postData("/api/fileupload/getPath",{}).then((res) => {
          this.openPath = res.data.data.urlPath;
        })
      },
  getResumeData: function () {
    let cid=localStorage.getItem("C_id");
    this.postData("/api/jobInManager/lookResume", {companyId:cid,resumeId:this.ids.rid}).then((res) => {
      if (res.data.code == 0) {
        console.log(res.data)
      }else{
        console.log(res.data.message)
      }
    })
        this.getData("/api/jobInManager/getResumeDetail", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getUser = {
              avatar:res.data.data.avatar,
              name:res.data.data.name,
              mobile:res.data.data.phone,
              email :res.data.data.email,
            }
          } else {
            console.log(res.data.message);
          }
        });

        //教育背景
        this.getData("/api/resume/getEducations", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getEducations = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //实习经历
        this.getData("/api/resume/getPracticeExperiences", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getPracticeExperiences = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //学术经历
        this.getData("/api/resume/getScienceExperiences", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getScienceExperiences = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //校园经历
        this.getData("/api/resume/getSchoolExperiences", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getSchoolExperiences = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //技能爱好
        this.getData("/api/resume/getSkillHobbys", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getSkillHobbys = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //作品展示
        this.getData("/api/resume/getOpusShows", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getOpusShows = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //个人评价
        this.getData("/api/resume/getOwnAssess", {id: this.ids.rid}).then((res) => {
          if (res.data.code == 0) {
            this.getOwnAssess = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
        //附件
        this.getData("/api/resume/getRelatedOption", {id: this.ids.rid, type: 0}).then((res) => {
          if (res.data.code == 0) {
            console.log(res.data.data)
            this.getRelatedOption = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .look_Resume{
    width: 780px;
    margin: 0 auto;
    .text_l{
      text-align: left;
    }
    .color_ccc{
      color: #ccc;
    }
    .w_25{
      float: left;
      width: 25%;
      padding: 15px 0;
    }
    .text_c{
      text-align: center;
    }
    .text_r{
      text-align: right;
    }
    p{
      font-size: 14px;
    }
    .fontW{
      font-weight: bold;
      height: 19px;
    }
    >div{
      padding-bottom: 20px;
    }
    .essentialInformation{
      position: relative;
      padding-top: 20px;
      h2{
        padding-bottom: 15px;
      }
      div{
        width: 92px;
        height: 92px;
        border: 1px solid red;
        position: absolute;
        right: 0px;
        top: 20px;
        border-radius: 50%;
        img{
          width: 92px;
          height: 92px;
        }
      }
    }
  }
</style>
