<template>
  <!--个人中心-->
  <div id="Personal_Center">
    <div class="name_resume">
      <!-- 名字与头像 -->
      <div class="name_photo">
        <div class="photo">
          <img :src="getUser.avatar">
        </div>
        <div class="name">
          <span>{{getUser.name}}</span>
          <p class="color999">中午好，{{getUser.name}}同学，这里有为你精心挑选的职位套餐哦</p>
        </div>
      </div>
      <!-- 简历 -->
      <div class="resume">
        <div class="resume_title">
          <span class="s1">简历</span>
          <span class="color999">磨刀不误砍材工,完善一下简历吧</span>
          <span class="s2" @click="ChooseToCreate=true" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/center_new_resume.png);width: 20px;height: 20px;margin-top: 20px;"></span>
        </div>
        <div class="resume_subject">
            <div class="default_resume" v-if="resumeOnline.length">
              <div class="default1">
                <span class="s1">{{resumeOnline[0].name}}</span>
                <span class="color999">-在线</span>
                <p>最新修改-{{resumeOnline[0].newDate}}</p>
              </div>
              <div class="default3" v-if="resume.online.english||resume.online.chinese">
                <span v-if="resume.online.english" style="line-height: 42px;cursor: pointer;" @click="create('english',resumeOnline[0].name,0)">创建英文简历</span>
                <span v-if="resume.online.chinese" style="line-height: 42px;cursor: pointer;" @click="create('chinese',resumeOnline[0].name,0)">创建中文简历</span>
              </div>
              <div class="default3" v-for="list in resumeOnline" @mouseenter="list.ifsh=true" @mouseleave="list.ifsh=false">
                <router-link   :to="{ name: 'online_resume', params: { rid:JSON.stringify(list)}}">
                    <span v-if="list.language=='chinese'" style="color: #333">中文&nbsp;{{((parseInt(list.moduleNum)+2) / 9).toFixed(2) * 100}}%</span>
                    <span v-if="list.language=='english'" style="color: #333">英文&nbsp;{{((parseInt(list.moduleNum)+2) / 9).toFixed(2) * 100}}%</span>
                    <div class="progress_bar">
                      <div class="progress" :style="{width:(parseInt(list.moduleNum) / 9).toFixed(2) * 100+'%'}"></div>
                    </div>
                </router-link>
                <div v-if="list.ifsh" style="position: absolute;right: -10px;top: -10px;color: #fff;background:#ccc;width: 20px;height: 20px;border-radius: 50%;line-height: 20px;cursor: pointer" @click="deleteResume(list.resumeId,0)"><span>x</span></div>
              </div>

            </div>
            <div class="my_resume" v-if="resumeAnnex.length">
              <div class="default1">
                <span class="s1">{{resumeAnnex[0].name}}</span>
                <span class="color999">-附件</span>
                <p>最新修改-{{resumeAnnex[0].newDate}}</p>
              </div>
              <div class="default3" v-if="resume.annex.english||resume.annex.chinese">
                <span v-if="resume.annex.english" style="line-height: 42px;cursor: pointer;" @click="create('english',resumeAnnex[0].name,1)">创建英文简历</span>
                <span v-if="resume.annex.chinese" style="line-height: 42px;cursor: pointer;" @click="create('chinese',resumeAnnex[0].name,1)">创建中文简历</span>
              </div>
              <div class="default3" v-for="list in resumeAnnex"  @mouseenter="list.ifsh=true" @mouseleave="list.ifsh=false">
                <router-link :to="{ name: 'my_resume', params: { rid:JSON.stringify(list)}}">
                  <span v-if="list.language=='chinese'" style="color: #333">中文&nbsp;{{((parseInt(list.moduleNum)+2) / 3).toFixed(2) * 100}}%</span>
                  <span v-if="list.language=='english'" style="color: #333">英文&nbsp;{{((parseInt(list.moduleNum)+2) / 3).toFixed(2) * 100}}%</span>
                  <div class="progress_bar">
                    <div class="progress" :style="{width:(parseInt(list.moduleNum) / 3).toFixed(2) * 100+'%'}"></div>
                  </div>
                </router-link>
                <div v-if="list.ifsh" style="position: absolute;right: -10px;top: -10px;color: #fff;background:#ccc;width: 20px;height: 20px;border-radius: 50%;line-height: 20px;cursor: pointer" @click="deleteResume(list.resumeId,1)"><span>x</span></div>
              </div>

            </div>
        </div>
      </div>
    </div>
    <div class="jump">
      <router-link to="/my_information/my_match">
        <div class="recommendation">
          <div class="number">
            <span>{{rdatanum.num1}}</span>
          </div>
          <div class="text">
            <span style="color: #333">推荐职位</span>
            <p class="color999">大数据为小哥哥你量身定制</p>
          </div>
          <span class="po_a_tubiao color999" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/center_icon_next.png)"></span>
        </div>
      </router-link>
      <router-link to="/my_information/my_collect">
        <div class="my_collection">
          <div class="number">
            <span>{{rdatanum.num2}}</span>
          </div>
          <div class="text">
            <span style="color: #333">我的收藏</span>
            <p class="color999">把喜欢的放在这里</p>
          </div>
          <span class="po_a_tubiao color999" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/center_icon_next.png)"></span>
        </div>
      </router-link>
      <router-link to="/my_information/my_message">
        <div class="job_invitation">
          <div class="number">
            <span>{{rdatanum.num3}}</span>
          </div>
          <div class="text">
            <span style="color: #333">我的私信</span>
            <p class="color999">Hr想要了解你的详情</p>
          </div>
          <span class="po_a_tubiao color999" style="background-image: url(https://sxsimg.xiaoyuanzhao.com/static/new_main/img/center_icon_next.png)"></span>
        </div>
      </router-link>
    </div>
    <div class="center-content">
      <div class="con_til"><span class="til-name">投递记录</span><span class="til_num color999">(0)</span></div>
      <div class="fun_model">
        <div class="fun_model_feedback">
          <div class="back_nav">
            <ul>
              <li class="back_item" :class="{'active':lis==3}" @click="deliveryRecord(3)"> 全部</li>
              <li class="back_item" :class="{'active':lis==0}" @click="deliveryRecord(0)">投递成功</li>
              <li class="back_item" :class="{'active':lis==9}" @click="deliveryRecord(9)">被查看</li>
              <li class="back_item" :class="{'active':lis==1}" @click="deliveryRecord(1)">通知面试</li>
              <li class="back_item" :class="{'active':lis==2}" @click="deliveryRecord(2)">不合适</li>
            </ul>
            <span class="blue_line" :style="{left: left+'px', width: 68+'px', opacity: 1,}"></span>
          </div>
          <div class="back_model">
            <div class="back_inf">
              <div class="back_inf_inf" v-for="list in reJobIn">
                <div class="back_inf_header" @click="JumpJobDetails(list.jobId)">
                  <p >
                    <a >{{list.jobName}}</a>
                    <a class="resume_name"
                       target="_blank">{{list.companyName}}-<span>{{list.cityName}}</span>
                    </a>
                    <a v-if="list.resumeType==0"><span>使用简历：</span>在线简历</a>
                    <a v-if="list.resumeType==1"><span>使用简历：</span>附件简历</a>
                  </p>
                  <div>
                    <span>{{list.updateDate}}</span>
                    <p>
                      <br>
                      <span v-if="list.status==0" class="inf_resume">投递成功</span>
                      <span v-if="list.status==9" class="inf_resume">被查看</span>
                      <span v-if="list.status==1" class="inf_resume">通知面试</span>
                      <span v-if="list.status==2" class="inf_resume">不合适</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="pagebar" class="pagination">
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ChooseToCreate">
      <div id="shade"
           style="width: 100%; height: 100%; background: rgb(0, 0, 0); opacity: 0.8; position: fixed; top: 0px; left: 0px; z-index: 1001; cursor: pointer; display: block;"></div>
      <div id="addResume" class="popup"
           style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1002; display: block;">
        <div class="popup_head">请选择简历类型</div>
        <div class="popup_close" @click="ChooseToCreate=false">×</div>
        <div class="popup_main">
          <div class="btn_box">
            <a class="resume_resume_btn fl" @click="CreateYourResume(0)">在线简历</a>
            <a class="resume_resume_btn fr" @click="CreateYourResume(1)">附件简历</a>
          </div>
          <p class="tips">你最多只能拥有 2 个简历哦</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {//变量
      return {
        ChooseToCreate: false,
        id: "",
        resumeData: {
          num0: {},
          num1: {}
        },
        reJobIn:[],
        lis:3,
        left:0,
        getUser:{},
        resume:{
          online:{
            english:false,
            chinese:false
          },
          annex:{
            english:false,
            chinese:false
          }
        },
        rdatanum:{
          num1:0,
          num2:0,
          num3:0
        },
        resumeOnline:[{name:"在线简历"}],
        resumeAnnex:[{name:"附件简历"}],
        searchCriteria:{
          homeShow:"3",
          isPush: '1',
          state: "1"
        },
      }
    },
    mounted() {
      if(window.localStorage.getItem('token')==null){
        alert("您还没有登录，请先去登录");
        this.$router.push('/StudentHome');
      }else{
        this.id = JSON.parse(window.localStorage.getItem('S_id')).id;
      }
      this.init();
    },
    methods: {
      init: function () {
        this.ObtainMembershipInformation();
        this.getResume(0);
        this.getResume(1);
        this.deliveryRecord(0);
        this.tuijainnum();
        this.shouchangnum();
        this.sixinnum();
      },
      //获取会员信息
      ObtainMembershipInformation:function () {
        this.postData("/api/resume/getUser",{userId:this.id}).then((res) =>{
          console.log(res.code)
          this.getUser=res.data.data;
        })
      },
      //获取简历信息
      getResume(num){
        if(num==0){
          //获取在线简历
          this.postData("/api/resume/get", {userId: this.id, type: num}).then((res) => {
            if (res.data.code == 0) {
              this.resumeOnline=res.data.data;
              if(res.data.data.length==1){
                if(res.data.data[0].language=='english'){
                  this.resume.online.chinese=true;
                }else{
                  this.resume.online.english=true;
                }
              }else{
                this.resume.online.english=false;
                this.resume.online.chinese=false;
              }
            }else{
              console.log(res.data.message)
            }
            this.resumeOnline.forEach((element) => {
              this.$set(element,"ifsh",false);
              console.log(element)
              if(!element.name){
                element.name="在线简历";
              }
            })
          });
        }else{
          //获取附件简历
          this.postData("/api/resume/get", {userId: this.id, type: num}).then((res) => {
            if (res.data.code == 0) {
              this.resumeAnnex=res.data.data;
              if(res.data.data.length==1){
                if(res.data.data.language=='english'){
                  this.resume.annex.chinese=true;
                }else{
                  this.resume.annex.english=true;
                }
              }else{
                this.resume.annex.chinese=false;
                this.resume.annex.english=false;
              }
            }else{
              console.log(res.data.message)
            }
            this.resumeAnnex.forEach((element) => {
              this.$set(element,"ifsh",false);
              if(!element.name){
                element.name="附件简历";
              }
            })
          });
        }
      },
      //跳转职位相求
      JumpJobDetails(jid){
        this.postData("/api/jobManager/getJobById",{jobId:jid,type:"1"}).then((res)=>{
          if(res.data.code==0){
            this.$router.push({name:'recruitDetails',params: {searchData:JSON.stringify(res.data.data)}});
          }else{
            alert(res.data.message)
          }
        })
      },
      //获取推荐职位数量
      tuijainnum(){
        this.postData("/api/jobManager/jobRecommend",{userId:this.id,pageNo:1,pageSize:1000}).then((res) => {
          //显示或隐藏页码
          console.log(res.data.data.pageable)
          this.rdatanum.num1=res.data.data.pageable.count;
        }, (err) => {
          console.log(err)
        });
      },
      //获取收藏职位数量
      shouchangnum(){
        this.postData("/api/userInfo/myCollectJob",{mumberId:this.id,pageNo:1,pageSize:5}).then((res) => {
          //显示或隐藏页码
          this.rdatanum.num2=res.data.data.pageable.count;
        }, (err) => {
          console.log(err)
        });
      },
      //获取私信职位数量
      sixinnum(){
        this.postData("/api/homepage/getCommunicationList",{pageNo:1,pageSize:1},{isRead: "0",type: "2",userId:this.id}).then((res) => {
          //显示或隐藏页码
          this.rdatanum.num3=res.data.data.pageable.count;
        }, (err) => {
          console.log(err)
        });
      },
      //创建简历
      CreateYourResume: function (num) {
        if(num==0){
          if(this.resumeOnline.length>0){
            alert("您已存在在线简历！！！");
          }else{
            this.create("chinese","在线简历",num);

          }
        }else{
          if(this.resumeAnnex.length>0){
            alert("您已存在附件简历！！！");
          }else{
            this.create("chinese","附件简历",num);
          }
        }
      },
      //创建简历方法
      create(language,name,num){
        this.postData("/api/resume/create", {userId: this.id, language: language,name:name, type: num}).then((res) => {
          if (res.data.code == 0) {
            if (res.data.data) {
              this.getResume(num);
              this.ChooseToCreate=false;
            }
          } else {
            console.log(res.data.message)
          }
        })
      },
      //删除简历
      deleteResume(id,num){
        this.postData("/api/resume/deleteResume",{id:id}).then((res) => {
          if(res.data.code==0){
            this.getResume(num);
          }else{
            alert(res.data.message)
          }
        })
      },
      //查询投递记录0投递成功，1通知面试，2不合适，9被查看
      deliveryRecord:function (num) {
        console.log(num)
        this.lis=num;
        if(num==3){
          num="";
          this.left=0;
        }else if(num==0){
          this.left=88;
        }else if(num==9){
          this.left=184;
        }else if(num==1){
          this.left=282;
        }else if(num==2){
          this.left=377;
        }
        this.postData("/api/userInfo/reJobIn", {memberId: this.id, type:num}).then((res) => {
          if (res.data.code == 0) {
            this.reJobIn=res.data.data;
          }else{
            alert(res.data.message);
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  #Personal_Center{
      min-height: 750px;
      position: relative;
      max-width: 1080px;
      width: 100%;
      height: 100%;
      margin: 35px auto 20px;
      color: #333;
      font-size: 14px;
    *{
      margin: 0;
      padding: 0;
      font-family: PingFang SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
      /*color: #333;*/
      list-style: none;
    }
    .back_inf_inf {
      background: #fff;
      margin-top: 15px;
      padding: 15px;
      overflow: hidden;
    }
    .back_inf_header > p {
      display: inline-block;
    }
    .back_inf_header > p a:first-child {
      font-size: 18px;
      cursor: pointer;
      margin-bottom: 12px;
      color: #333;
    }
    .back_inf_header > p a {
      display: block;
      color: #999;
    }
    .back_inf_header .resume_name {
      display: inline-block;
      /* width: 700px; */
      /* overflow: hidden; */
      /* text-overflow: ellipsis; */
      /* white-space: nowrap; */
      /* word-wrap: normal; */
      margin-bottom: 10px;
      font-size: 14px;
      color: #6da1ee;
    }
    .back_inf_header > div {
      float: right;
      position: relative;
    }
    .back_inf_header > div > span:first-child {
      font-size: 14px;
      color: #999;
      float: right;
    }
    .back_inf_header > div p {
      clear: both;
      text-align: right;
    }
    .back_inf_header > div p span {
      font-size: 12px;
      color: #555555;
      margin: 5px 0;
      display: inline-block;
      cursor: pointer;
    }
    .back_inf_header > div .inf_resume {
      font-size: 18px;
      color: #6ea3ee;
      cursor: pointer;
      position: relative;
      margin: 0 19px 0 0;
    }

    .popup {
      width: 560px;
      margin: 0;
      padding: 0;
      background-color: #FFF;
      position: relative;
      display: none;
      border-radius: 5px;
      overflow: hidden;
    }

    .popup_head {
      background-color: #6da1ee;
      height: 50px;
      width: 540px;
      font-size: 18px;
      color: #fff;
      line-height: 50px;
      padding-left: 20px;
    }

    .popup_close {
      font-size: 30px;
      position: absolute;
      top: 4px;
      right: 10px;
      color: #fff;
      cursor: pointer;
    }

    .popup_main {
      width: 460px;
      padding: 10px 50px 30px;
    }

    .btn_box {
      display: block;
      zoom: 1;
      overflow: hidden;
    }

    .tips {
      color: red;
    }

    .tips {
      font-size: 14px;
    }

    .popup_main:after {
      content: '';
      height: 0;
      display: block;
      clear: both;
    }

    .fl {
      float: left;
    }

    .resume_resume_btn {
      width: 150px;
      height: 50px;
      background-color: #8db0f9;
      margin: 40px 0 20px 0;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      cursor: pointer;
    }

    .fr {
      float: right;
    }

    .name_resume {
      background: #fafafa;
      height: 160px;
      border-bottom: 1px solid #ecf1f5;
    }

    .name_resume > div {
      float: left;
    }

    .name_photo {
      padding: 30px 20px;
      height: 100px;
      width: 320px;
      border-right: 1px solid #ecf1f5;
    }

    .name_photo > .photo {
      width: 92px;
      height: 92px;
      border-radius: 50%;
      overflow: hidden;
      float: left;
    }

    .name_photo > .photo > img {
      width: 92px;
      height: 92px;
    }

    .name_photo > .name {
      width: 210px;
      height: 92px;
      float: right;
      padding-left: 18px;
    }

    .name_photo .name > span {
      line-height: 40px;
      font-weight: 600;
      font-size: 18px;
    }

    .color999 {
      color: #999;
    }

    .resume {
      width: 719px;

    }

    .resume_title {
      line-height: 56px;
      position: relative;
      padding-left: 20px;
      border-bottom: 1px solid #ecf1f5;

    }

    .resume_title > .s1 {
      font-weight: 600;
      font-size: 18px;
    }

    .resume_title > .s2 {
      font-size: 20px;
      line-height: 56px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 0px;
      color: #6e9bf5;
    }

    .default_resume {
      position: relative;
      display: inline-block;
      width: 337px;
      padding: 20px 0 25px 20px;
      border-right: 1px solid #ecf1f5;
    }

    .my_resume {
      position: relative;
      display: inline-block;
      width: 336px;
      padding: 20px 0 25px 20px;
    }

    .default_resume > div, .my_resume > div {
      float: left;
    }

    .default1 > .s1 {
      font-size: 16px;
    }

    .default1 > p {
      padding-top: 12px;
    }

    .default3 {
      position: relative;
      line-height: 30px;
      width: 85px;
      height: 42px;
      margin-left: 10px;
      text-align: center;
      background: #f5f5f5;
      padding-bottom: 12px;
    }

    .progress_bar {
      position: relative;
      width: 70px;
      height: 12px;
      margin: auto;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
    }

    .progress {
      position: absolute;
      height: 12px;
      margin: auto;
      left: 0px;
      top: 0px;
      background: #8db0f9;
    }

    .jump {
      width: 100%;
      background: #fafafa;
      height: 120px;
    }

    .jump > a > div {
      position: relative;
      width: 300px;
      padding: 30px 30px 30px 30px;
      float: left;
      height: 60px;
    }

    .jump > a > div > div {
      float: left;
    }

    .jump .number {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #5c8ce6;
      color: #fff;
      line-height: 60px;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: #fff;
    }

    .jump .number > span {
      color: #fff;
    }

    .jump .text {
      padding-left: 20px;
    }

    .jump .text > span {
      font-weight: 600;
      font-size: 19px;
      line-height: 32px;
    }

    .jump .recommendation {
      border-right: 1px solid #ecf1f5;
    }

    .jump .my_collection {
      border-right: 1px solid #ecf1f5;
      width: 297px;
    }

    .jump .my_collection .number {
      background: #3dc68e;
    }

    .jump .job_invitation .number {
      background: #f69581;
    }

    .open_invite {
      font-size: 14px;
      color: #6aa2e4;
      cursor: pointer;
    }

    .po_a_tubiao {
      position: absolute;
      right: 20px;
      top: 37px;
      font-size: 34px;
    }

    .center-content {
      position: relative;
      width: 100%;
      margin-top: 12px;
      background-color: #fafafa;
      padding: 20px;
    }

    .til-name {
      font-weight: 600;
      font-size: 19px;
      line-height: 32px;
    }

    .til_num {
      font-size: 19px;
      line-height: 32px;
    }

    .fun_model {
      width: 100%;
      padding-bottom: 30px;
    }

    .back_nav {
      background: #fafafa;
      border-bottom: 1px solid #eef3f6;
      position: relative;
    }

    .back_nav ul {
      padding-top: 20px;
    }

    .back_nav ul .active {
      /* font-weight: bold; */
      color: #6da1ee;
    }

    .back_nav ul li {
      display: inline-block;
      padding: 0 18px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      padding-bottom: 15px;
    }

    .blue_line {
      position: absolute;
      display: inline-block;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #6b9eed;
      -webkit-transition: all .25s ease-out;
      -moz-transition: all .25s ease-out;
      -o-transition: all .25s ease-out;
      transition: all .25s ease-out;
      opacity: 0;
      left: 0px;
      width: 68px;
      opacity: 1;
    }
  }

</style>
