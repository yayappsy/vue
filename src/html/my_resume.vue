<!-- 在线简历 -->
<template>
  <div class="My_resume">
    <div class="online_resume">
      <div class="bg_fff">
        <div class="online_resume_nav">
          <router-link to="Personal_Center">&lt; 个人中心</router-link>
          <span id="gdata" class="name" v-show="sss">{{r_data.name}}</span>
          <input type="text" v-model="r_data.name" v-show="!sss">
          <span class="change_name" id="changename" @click="modifyName()">
          <span class="close_tip"></span>
        </span>
          <div class="yuandxia">
            <router-link :to="{name: 'LookResume', params: { ids:JSON.stringify(ids)}}" target="_blank">{{r_data.language=="chinese"?"预览":"Preview"}}</router-link>
            <!--<span>下载到本地</span>-->
          </div>
        </div>
        <div class="content">
          <div class="bg_fff resume_content_left">
            <h1 class="res_header"></h1>
            <div class="sec_box" @click="page.tr9=true;page.tr1=true">
              <div class="section_item bas_must complete">
                <div class="bas_inf">
                  <div>
                    <img :src="data.getUser.avatar" class="user_img">
                    <p class="bas_inf_inf">
                      <span class="stu_name v1">{{data.getUser.name}}</span>
                      <span>
                        <span v-if="data.getUser.gender==1">{{r_data.language=="chinese"?"男":"Male"}}</span>
                        <span v-if="data.getUser.gender==2">{{r_data.language=="chinese"?"女":"Female"}}</span>
                        <span v-if="data.getUser.gender==3">{{r_data.language=="chinese"?"保密":"Keep secret"}}</span>
                      |
                      {{data.getUser.age}}{{r_data.language=="chinese"?"岁":"Age"}}
                      |
                        <span class="v2">{{dataA.getUser.name}}</span>
                      |
                      <span class="v6">{{data.getUser.school}}</span>
                      |
                      <span class="v7">{{data.getUser.majorId}}</span>
                      |
                      <span class="v3">
                        <span v-if="data.getUser.education=='专科'">{{r_data.language=="chinese"?"专科":"College"}}</span>
                        <span v-if="data.getUser.education=='本科'">{{r_data.language=="chinese"?"本科":"Undergraduate"}}</span>
                        <span v-if="data.getUser.education=='硕士'">{{r_data.language=="chinese"?"硕士":"Master"}}</span>
                        <span v-if="data.getUser.education=='博士'">{{r_data.language=="chinese"?"博士":"Dr."}}</span>
                      </span>
                      |
                      <span class="v8">{{data.getUser.endStudy}}</span>
                      年毕业
                      </span>
                      <span>
                      <span class="v4">{{data.getUser.mobile}}</span>
                      <span class="v5">{{data.getUser.email}}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" @click="page.tr9=true;page.tr2=true">
              <div class="section_item item_expect complete">
                <div class="expect">
                  <h2 class="ico">{{r_data.language=="chinese"?"期望实习":"Expected Internship"}}</h2>
                  <div class="inf">
                    <p>
                      <span class="v2">{{dataA.getHopePractice.name}}</span> |
                      <span class="v1">{{industry.name}}</span> |
                      <span class="v3">{{data.getHopePractice.dailyWage}}</span> {{r_data.language=="chinese"?"日薪":"Daily"}} |
                      <span class="d1">{{data.getHopePractice.days}}</span> {{r_data.language=="chinese"?"天":"Days"}} | {{r_data.language=="chinese"?"实习":"Practice"}}:
                      <span class="mons">{{data.getHopePractice.months}}</span> {{r_data.language=="chinese"?"个月":"Months"}}| {{r_data.language=="chinese"?"预计到岗日期":"Expected date on Post"}}:
                      <span class="v4">{{data.getHopePractice.arrivalDate}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="item_works" style="background: rgb(255, 255, 255);">
              <div class="attachment">
                <h2 class="ico">{{r_data.language=="chinese"?"附件简历":"Related Accessories"}}</h2>
                <div class="inf" >
                  <p><strong>{{data.getRelatedOption.name}}</strong><span style="float: right;cursor: pointer;margin-right: 50px" @click="DeleteAttachment(data.getRelatedOption.id)" v-if="data.getRelatedOption.name!=''">x</span></p>
                </div>
              </div>
            </div>
            <p class="add_accti">{{r_data.language=="chinese"?"(*支持格式：.jpg,.png,.jpeg,.pdf,.doc,.docx,.txt ;大小不超过5M)":"(* Support format:. jpg,.png,.jpeg,.pdf,.doc,.docx,.txt; size not exceeding 5M)"}}</p>
            <div id="add_att" class="add_acc">
              <div id="picker" class="webuploader-container" style="position: relative">
                <div class="webuploader-pick">{{r_data.language=="chinese"?"添加附件":"Add attachment"}}</div>
                <input type="file" class="webuploader-element-invisible" name='myFile' style="position:absolute;top:0px;left:155px;width:91px;height:41px;opacity: 0;z-index: 100" @change='onUpload'>
              </div>
            </div>
          </div>
          <div class=" resume_content_right">
            <p class="aside_header">
              {{r_data.language=="chinese"?"简历模块":"Resume Module"}}
            </p>
            <dl>
              <dt class="aside_inf must">

                {{r_data.language=="chinese"?"基本信息":"Basic information"}}
                <span class="aside_inf_flg aside_inf_flg_ok"></span>
              </dt>
              <dd class="aside_inf must">
                {{r_data.language=="chinese"?"期望实习":"Expected Internship"}}
                <span class="aside_inf_flg aside_inf_flg_ok"></span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="shade" v-if="page.tr9">
        <!-----------------------------修改的弹框------------------------------->
        <div class="change_res">
          <div class="bas_inf_change" v-if="page.tr1">
            <div class="load_box">
              <p class="change_header">
                基本信息
              </p>
              <div class="change_section_box">
                <div class="change_section">
                  <div class="d_change_header" title="点击更换照片，建议使用一寸免冠证件照" style="position: relative">
                    <img id="img_upload" :src="data.getUser.avatar"
                         width="100" height="100">
                    <input type="file" name='myFile' style="position:absolute;top:20px;left:0px;width:100px;height:100px;opacity: 0;z-index: 100" @change='onUpload'>
                  </div>
                  <p class="header_text">{{r_data.language=="chinese"?"(上传简历照片)":"(Upload resume photo)"}}</p>
                  <form>
                    <input id="headpic" name="headpic" value="" type="hidden">
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"姓名":"Name"}}</span>
                      <input type="text"  maxlength="15" placeholder="请填写真实姓名" data-v="v1"
                             class="v_itm change_sec_inf" v-model="data.getUser.name">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"性别":"Gender"}}</span>
                      <select name="gender" data-v="v9" class="v_itm change_sec_inf sec_1" v-model="data.getUser.gender">
                        <option value="1">{{r_data.language=="chinese"?"男":"Male"}}</option>
                        <option value="2">{{r_data.language=="chinese"?"女":"Female"}}</option>
                        <option value="0">{{r_data.language=="chinese"?"保密":"Keep secret"}}</option>
                      </select>
                    </p>
                    <div class="change_sec_item city-choose">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"现在城市":"Now city"}}</span>
                      <input type="text" name="bcity" maxlength="20" placeholder="现居城市名称，如北京。"
                             class="v_itm change_sec_inf" value="北京市" v-model="dataA.getUser.name" v-on:focus="addressSelection=true">
                    </div>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"生日":"Birthday"}}</span>
                      <date-picker field="myDate" placeholder="选择日期" v-model="data.getUser.birth" format="yyyy-mm-dd"  backward="teue"></date-picker>
                    </p>
                    <div class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"最高学历":"Degree"}}</span>
                      <select name="degree" class="change_sec_inf v_itm" data-v="v3" v-model="data.getUser.education">
                        <option value="专科">{{r_data.language=="chinese"?"专科":"College"}}</option>
                        <option value="本科">{{r_data.language=="chinese"?"本科":"Undergraduate"}}</option>
                        <option value="硕士">{{r_data.language=="chinese"?"硕士":"Master"}}</option>
                        <option value="博士">{{r_data.language=="chinese"?"博士":"Dr."}}</option>
                      </select>
                    </div>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"毕业时间":"Graduation"}}</span>
                      <date-picker field="myDate" placeholder="选择日期" v-model="data.getUser.endStudy" format="yyyy-mm-dd"></date-picker>
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"就读学校":"School"}}</span>
                      <input type="text" maxlength="60" autocomplete="off" placeholder="填写学校全称，如北京大学" data-v="v6" class="v_itm change_sec_inf" v-model="data.getUser.school">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"就读专业":"professional"}}</span>
                      <input type="text" name="major" maxlength="60" placeholder="填写专业全称，如工商管理" data-v="v7"
                             class="v_itm change_sec_inf" v-model="data.getUser.majorId" >
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"手机号码":"Phone"}}</span>
                      <input type="text" name="telep" placeholder="填写完整的手机号码" maxlength="15" data-v="v4"
                             class="v_itm change_sec_inf im_phone" v-model="data.getUser.mobile">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"常用邮箱":"Mailbox"}}</span>
                      <input type="text" name="email" placeholder="填写规范的邮箱号，如echo@mshare.cn" maxlength="100" data-v="v5" class="v_itm change_sec_inf change_email" v-model="data.getUser.email">
                      <span class="tips change_sec_item" id="tipforemail"> tips: {{r_data.language=="chinese"?"请仔细核对联系方式是否正确，以免错过面试通知":"Please check the contact form carefully so as not to miss the interview notice."}}。</span>
                    </p>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr1=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveUser()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="expect_change" v-if="page.tr2">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"期望实习":"Expected Internship"}}
                <img src="https://sxsimg.xiaoyuanzhao.com/static/img/tips.png?v=49c3bb4483efbe72dc1129d143b4288c"
                     alt="" width="18" class="icontips">
              </p>
              <input type="hidden" class="mod" value="expc">
              <div class="change_section">
                <form>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"期望职位":"Position"}}</span>
                    <input type="text" name="job" maxlength="18" placeholder="填写期望实习职位，如产品经理"
                           class="v_itm change_sec_inf"  v-model="industry.name" v-on:focus="addressSelection3=true">
                  </p>
                  <div class="change_sec_item city-choose">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"期望地点":"Location"}}</span>
                    <input type="text"  placeholder="填写期望实习地点，如北京。多个城市请用逗号隔开。" class="v_itm change_sec_inf" v-model="dataA.getHopePractice.name" v-on:focus="addressSelection=true">
                  </div>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"天数/周":"Days/weeks"}}</span>
                    <input type="text" placeholder="填写每周做多少天，数字1-7之间。如6" class="v_itm change_sec_inf" value="北京市" v-model="data.getHopePractice.days">
                  </p>
                  <p class="change_sec_item" id="year">
                    <span class="change_sec_head" style="margin-right: 22px">{{r_data.language=="chinese"?"实习月份 ":"Month"}}</span>
                    <date-picker field="Month" placeholder="选择日期" v-model="data.getHopePractice.beginMonth" format="yyyy-mm-dd"  forward="true"></date-picker>
                    <span class="change_sec_head_bot" style="float: left;line-height: 36px;margin: 0px 20px"> － </span>
                    <date-picker field="Month" placeholder="选择日期" v-model="data.getHopePractice.endMonth" format="yyyy-mm-dd" forward="true"></date-picker>
                  </p>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"期望日薪 ":"Sun NEW"}}</span>
                    <input type="text" name="sly" maxlength="5" placeholder="日薪只能填写数字，比如：100" data-v="v3"
                           class="change_day v_itm" v-model="data.getHopePractice.dailyWage">
                  </p>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"到岗日期 ":"Hillock"}}</span>
                    <date-picker field="myDate" placeholder="选择日期" v-model="data.getHopePractice.arrivalDate" format="yyyy-mm-dd"  forward="true"></date-picker>
                  </p>
                </form>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr2=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveHopePractice()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sxs--modal" v-if="addressSelection"  @click="addressSelection=false;">
      <div class="sxs--modal--bg" style="height: 484px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div id="job_addr">
            <div>
              <p>省</p>
              <span v-for="list in pita"  @click="pita2=list.child">{{list.name}}</span>
            </div>
            <div>
              <p>市</p>
              <span v-for="list in pita2"  @click="areaClick(list)">{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sxs--modal" v-if="addressSelection3"  @click="addressSelection3=false;">
      <div class="sxs--modal--bg" style="height: 484px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div id="job_addr1">
            <div>
              <p>一级</p>
              <span v-for="list in getJobNames"  @click="industryTwoDtos=list.industryTwoDtos">{{list.name}}</span>
            </div>
            <span>-------------------------------</span>
            <div>
              <p>二级</p>
              <span v-for="list in industryTwoDtos"  @click="industryThreeDtos=list.industryThreeDtos">{{list.name}}</span>
            </div>
            <span>-------------------------------</span>
            <div>
              <p>三级</p>
              <span v-for="list in industryThreeDtos"  @click="JobNamesClick(list.id,list.name)">{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
  import { common } from '../js/common.js';

  export default {
    data() {//变量
      return {
        addressSelection3:false,
        sss:true,
        r_data:{},
        ids:{},
        industry:{
          id:"",
          name:""
        },
        industryTwoDtos:'',
        industryThreeDtos:'',
        date:"",
        name: 'app',
        date1: '',
        date2: '',
        date3: '',
        format: 'yyyy/mm/dd',
        sl1:false,
        sl2:false,
        sl3:false,
        sl4:false,
        page: {
          tr1: false,
          tr2: false,
          tr3: false,
          tr4: false,
          tr5: false,
          tr6: false,
          tr7: false,
          tr8: false,
          tr9: false,
          tr10: false,
          tr11: false,
          tr12: false,
          cr1: true,
          cr2: true,
          cr3: true,
          cr4: true,
          cr5: true,
          cr6: true,
          cr7: true
        },
        user: '123',
        password: "123456",
        r_id: "",
        s_id: "",
        data: {
          //个人信息
          getUser: {},
          //期望实习
          getHopePractice: {},
          //教育背景
          getEducations: [],
          //附件
          getRelatedOption: []
        },
        dataA: {
          //个人信息
          getUser: {
            id:'',
            name:""
          },
          //期望实习
          getHopePractice: {
            id:'',
            name:''
          }
        },
        //个人信息
        getUser: {},
        addressSelection:"",
        pita:{},
        pita2:{},
        pita3:{},
        ifInput:"",
        ifImg:"",
        temporary:{
          city:{
            id:"",
            name:""
          }
        }
      }
    },
    mounted() {//初始化
      //this.localStorageUser();
      this.s_id= JSON.parse(window.localStorage.getItem('S_id')).id;
      this.r_data = JSON.parse(this.$route.params.rid);//获取传过来的值;
      console.log(this.r_data);
      this.r_id = this.r_data.resumeId;//获取传过来的值;
      this.ids={
        sid:this.s_id,
        rid:this.r_id
      }
      this.getIndustryList();
      this.getResumeData();
      this.getAreaData();
      let _this=this;
    },
    methods: {
      //选择期望职位
      JobNamesClick(id,name){
        this.industry={
          id:id,
          name:name,
        };

        this.addressSelection3=false;
      },
      //获取行业列表
      getIndustryList:function () {
        let cid=window.localStorage.getItem("C_id");
        this.getData("/api/homepage/industryTags").then((res) => {
          if(res.data.code==0){
            this.getJobNames=res.data.data;
          }
        })
      },
      //修改简历名称
      modifyName(){
        this.sss=!this.sss;
        if(this.sss){
          this.postData("/api/resume/updateResumeName ", {id: this.r_id,name:this.r_data.name}).then((res) => {
            if (res.data.code == 0) {
              console.log(res.data.data)
            } else {
              console.log(res.data.message);
            }
          });
        }
      },
      //获取所有简历信息
      getResumeData: function () {
        //个人信息
        this.postData("/api/resume/getUser", {userId: this.s_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getUser = res.data.data;
            this.data.getUser.resumeId=this.r_id;
            this.data.getUser.id=this.s_id;
            if(res.data.data.residence.id!=""){
              this.dataA.getUser.id = res.data.data.residence.id;
              this.dataA.getUser.name = res.data.data.residence.name;
              this.data.getUser.residence = this.dataA.getUser;
              console.log(res.data.data.residence)
            }
            console.log(res.data.data)
          } else {
            console.log(res.data.message);
          }
        });
        //期望实习
        this.getData("/api/resume/getHopePractice", {id: this.r_id}).then((res) => {
          console.log(res.data.data)
          if(res.data.data){
            this.data.getHopePractice = res.data.data;
            this.dataA.getHopePractice=res.data.data.city;
            this.dataA.getHopePractice.id = res.data.data.city.id;
            this.dataA.getHopePractice.name = res.data.data.city.name;
            this.data.getHopePractice.city = this.dataA.getHopePractice;
            console.log(res.data.data.industry)
            if(res.data.data.industry){
              this.industry=res.data.data.industry;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //附件
        this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
          if (res.data.code == 0) {
            console.log(res.data.data)
            this.data.getRelatedOption = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
      },
      //获取地址选择
      getAreaData:function(){
        //this.data.userInfoId= JSON.parse(window.localStorage.getItem('C_DATA')).id;
        this.getData("/api/basic/region/listTree",{parentId:110000,type:3}).then((res) => {
          this.pita=res.data.data[0].child;
          //console.log(this.pita);
        }, (err) => {
          console.log(err)
        });
      },
      //选择地区
      areaClick:function (list) {
        console.log(this.data.getUser)
        if(this.page.tr1){
          this.dataA.getUser.name=list.name;
          this.dataA.getUser.id=list.id;
        }else if(this.page.tr2){
          this.dataA.getHopePractice.name=list.name;
          this.dataA.getHopePractice.id=list.id;
        }else{
          this.temporary.city={
            name:this.temporary.city.name,
            id:this.temporary.city.id
          }
          this.temporary.city.name=list.name;
          this.temporary.city.id=list.id;
        }
        this.addressSelection=false;
      },
      //保存个人信息
      saveUser:function () {
        console.log(this.dataA.getUser);
        this.data.getUser.residence=this.dataA.getUser;
        this.data.getUser.resumeId=this.r_id;
        this.data.getUser.id=this.s_id;
        console.log(JSON.stringify(this.data.getUser))
        this.postData2("/api/resume/editUser",this.data.getUser).then((res) => {
          if (res.data.code == 0) {
            this.page.tr1=false;
            this.page.tr9=false;
            this.postData("/api/resume/getUser", {userId: this.s_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getUser = res.data.data;
                this.data.getUser.resumeId=this.r_id;
                this.data.getUser.id=this.s_id;
                if(res.data.data.residence.id!=""){
                  this.dataA.getUser.id = res.data.data.residence.id;
                  this.dataA.getUser.name = res.data.data.residence.name;
                  this.data.getUser.residence = this.dataA.getUser;
                  console.log(res.data.data.residence)
                }
                console.log(res.data.data)
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存期望职位信息
      saveHopePractice:function () {
        console.log(this.data.getHopePractice);
        this.data.getHopePractice.memberId=this.s_id;
        this.data.getHopePractice.resumeId=this.r_id;
        this.data.getHopePractice.city=this.dataA.getHopePractice
        this.data.getHopePractice.industry=this.industry;
        this.postData2("/api/resume/commitHopePractice",this.data.getHopePractice).then((res) => {
          if (res.data.code == 0) {
            this.page.tr2=false;
            this.page.tr9=false;
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除附件
      DeleteAttachment:function (AttachmentId) {
        this.postData("/api/resume/deleteRelatedOption",{id:AttachmentId},{}).then((res) => {
          if (res.data.code == 0) {
            this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
              if (res.data.code == 0) {
                this.data.getRelatedOption = res.data.data;
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //上传图片
      onUpload(e){
        let formData = new FormData();
        formData.append('myFile', e.target.files[0]);
        if(e.target.files[0].size/1024>300){
          alert("您的图片大于300KB")
        }else{
          this.postData2("/api/fileupload/up",formData).then((res) => {
            if(res.data.code==0){
              console.log(res.data.data);
              let imgData=res.data.data;
              if(this.page.tr1){
                this.data.getUser.avatar=res.data.data.realPath;
              }else{
                this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
                  if (res.data.code == 0) {
                    console.log(res.data.data)
                    if(res.data.data.name==""){
                      this.postData2("/api/resume/commitRelatedOption",{id:"",memberId:this.s_id,name:imgData.originalFilename ,options:imgData.fileName,resumeId:this.r_id,type:0}).then((res)=> {
                        if (res.data.code == 0) {
                          this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
                            if (res.data.code == 0) {
                              console.log(res.data.data)
                              this.data.getRelatedOption = res.data.data;
                            } else {
                              console.log(res.data.message);
                            }
                          });
                        } else {
                          console.log(res.data.message);
                        }
                      });
                    }else{
                      alert("已存在附件，请删除后重新添加")
                    }
                    this.data.getRelatedOption = res.data.data;
                  } else {
                    console.log(res.data.message);
                  }
                });
              }
            }else{
              console.log(res.data.message)
            }
          });
        }
      }
    },components:{
      'date-picker': myDatepicker
    }
  }
</script>
<style lang="scss">
  .My_resume{
    #job_addr1 span{
      margin-left:20px;
      font-size: 15px;
    }
    #job_addr p{
      padding: 10px 0;
    }
    #job_addr span {
      margin: 3px 5px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
    .inf:hover {
      background: #f4f4f4;
    }
    #myDate{
      margin-left: 95px;
      height: 34px;
      width: 360px;
    }
    #Month{
      width: 160px;
      height: 34px;
      float: left;
    }
    .online_resume_wed .content {
      background: #f4f4f4;
      width: 100%;
      height: 100%;
    }

    .online_resume {
      width: 1030px;
      margin: 0 auto;
      padding-top: 40px;
    }

    .bg_fff {
      background: #fff;
    }

    .online_resume .online_resume_nav {
      width: 100%;
      height: 56px;
      line-height: 56px;
      position: relative;
      box-sizing: border-box;
      padding: 0 0 0 90px;
    }

    .online_resume .online_resume_nav a {
      color: #777777;
      display: inline-block;
      position: absolute;
      left: 15px;
      top: 18px;
      line-height: 20px;
    }

    .online_resume .online_resume_nav .name {
      font-size: 18px;
      color: #333333;
      display: inline-block;
      margin-left: 30px;
      max-width: 320px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
      vertical-align: bottom;
    }

    .online_resume .online_resume_nav .change_name {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(//sxsimg.xiaoyuanzhao.com/static/img/pen.svg);
      cursor: pointer;
      vertical-align: sub;
      position: relative;
    }

    .online_resume .online_resume_nav .close_tip {
      color: #fff;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      position: absolute;
      bottom: -26px;
      left: 160px;
      z-index: 19891016;
      display: none;
      cursor: pointer;
    }

    .online_resume .online_resume_nav .change_lag {
      color: #333333;
      display: inline-block;
      margin-left: 20px;
    }

    .online_resume select {
      font-family: 'Microsoft YaHei';
    }

    .online_resume_nav > .yuandxia {
      color: #555555;
      width: 133px;
      line-height: 56px;
      position: absolute;
      top: 0;
      right: 0;
    }

    .online_resume_nav .yuandxia > span {
      cursor: pointer;
      margin-right: 15px;
      font-size: 13px;
      color: #777777;
    }

    .online_resume .resume_content_left {
      padding: 35px 35px 0 35px;
      width: 700px;
    }

    .online_resume .resume_content_right {
      width: 234px;
      position: absolute;
      right: 0px;
      top: 20px;
      color: #447791;
      background-color: #fff;
    }

    .content {
      position: relative;
      padding-top: 20px;
      min-height: 400px;
    }

    .aside_header {
      font-size: 16px;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
    }

    .aside > dl {
      padding: 10px;
      background-color: #fff;
    }

    .aside_inf {
      position: relative;
      padding: 5px 10px;
      margin: 3px 0;
      cursor: pointer;
    }

    dl {
      padding: 10px;
      background-color: #fff;
      font-size: 14px;
    }

    .must {
      cursor: default;
    }

    dt {
      display: block;
    }

    .aside_inf_flg {
      display: inline-block;
      width: 18px;
      height: 16px;
      position: absolute;
      right: 0;
      top: 8px;
      background: url(//sxsimg.xiaoyuanzhao.com/static/img/kuang.png) no-repeat;
    }

    .aside_inf_flg_ok {
      background: url(//sxsimg.xiaoyuanzhao.com/static/img/gou.png) no-repeat;
    }

    .res_header {
      width: 100%;
      height: 45px;
      border-bottom: 2px solid #858f99;
      margin-top: 0;
      background: url(http://39.106.117.195/image/logo/logo.png) no-repeat;
    }

    h1 {
      display: block;
      font-size: 2em;
      -webkit-margin-before: 0.67em;
      -webkit-margin-after: 0.67em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      font-weight: bold;
    }

    .sec_box {
      overflow: hidden;
      position: relative;
    }

    .complete {
      overflow: hidden;
    }

    .section_item {
      cursor: pointer;
      padding: 20px 5px;
      overflow: hidden;
      border-bottom: 1px solid #eee;
    }

    .bas_inf img {
      width: 100px;
      height: 100px;
      float: left;
      background: #abcdef;
    }

    .complete p {
      color: #333;
    }

    .bas_inf_inf {
      padding-left: 160px;
    }

    .bas_inf_inf > span {
      display: block;
      color: #858f99;
    }

    .complete span {
      color: #333;
    }

    .bas_inf_inf .stu_name {
      font-size: 18px;
      color: #447791;
      padding: 15px 0;
    }

    .complete .stu_name {
      color: #447791;
    }

    input {
      outline: none;
      font-family: "Microsoft YaHei", Verdana, Arial;
    }

    .complete span {
      color: #333;
      font-size: 14px;
    }

    .ico {
      font-size: 18px;
      color: #447791;
      margin-bottom: 0;
      position: relative;
      padding-left: 30px;
    }

    h2 {
      display: block;
      font-size: 1.5em;
      -webkit-margin-before: 0.83em;
      -webkit-margin-after: 0.83em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      font-weight: bold;
    }

    .ico:before {
      content: '';
      position: absolute;
      left: 0;
      width: 23px;
      height: 23px;
      background-image: url(//sxsimg.xiaoyuanzhao.com/static/img/resume_manage_ico.png);
    }

    .complete p {
      color: #333;
    }

    .inf {
      width: 100%;
      margin: 0;
      font-size: 14px;
      position: relative;
    }
    .inf>.delete{
      position: absolute;
      right: 20px;
      top:0px;
      padding-top: 10px;
    }

    .inf > p {
      position: relative;
      margin: 15px 0;
    }

    .hid {
      height: 20px;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    .show_fil_name {
      padding: 15px 0 15px 125px;
      position: relative;
    }

    .close_file {
      position: absolute;
      width: 20px;
      text-align: center;
      line-height: 20px;
      top: 0;
      right: 0;
      font-size: 18px;
      color: #999;
      display: none;
      cursor: pointer;
    }

    .filr_box {
      padding: 20px;
      display: none;
      position: relative;
    }

    .rate_name {
      width: 50%;
      margin: auto;
      display: none;
    }

    .rate_box {
      width: 50%;
      margin: auto;
      height: 2px;
      background: #fff;
      position: relative;
      border: 1px solid #ccc;
      display: none;
    }

    .rate {
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      background-color: #ccc;
      width: 0;
    }

    .filr_box {
      padding: 20px;
      display: none;
      position: relative;
    }

    .up_erro {
      display: none;
      position: absolute;
      left: 85px;
      font-size: 12px;
      top: 75%;
      color: red;
    }

    .com_logo {
      width: 220px;
    }

    #file_length {
      font-size: 12px;
    }

    #file_rate {
      font-size: 12px;
    }

    .add_accti {
      width: 100%;
      margin: 10px 0 0 0;
      text-align: center;
      font-size: 14px;
      color: #aaa;
    }

    .webuploader-container {
      position: relative;
    }

    .add_acc {
      width: 400px;
      /* line-height: 40px; */
      margin: 10px auto 30px;
      text-align: center;
      /* border: 1px solid #ddd; */
      /* cursor: pointer; */
      /* color: #555555; */
      /* position: relative; */
    }

    .webuploader-pick {
      position: relative;
      display: inline-block;
      cursor: pointer;
      background: #00b7ee;
      padding: 10px 15px;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
    }

    input {
      outline: none;
      font-family: "Microsoft YaHei", Verdana, Arial;
    }

    .webuploader-element-invisible {
      position: absolute;
      top:0px;
      left: 50px;
      width: 86px;
      height: 42px;
    }

    .shade {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      cursor: pointer;
    }

    .change_res {
      width: 540px;
      max-height: 550px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -250px 0 0 -265px;
      z-index: 3;
      border-radius: 15px;

    }

    /*@media screen and (max-height: 560px)*/
    .change_res {
      max-height: 90%;
      top: 5%;
      width: 560px;
      margin-top: 0;
      overflow: hidden;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .change_res > div {
      width: 100%;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 0 5px 0 #333;
    }

    .change_header {
      font-size: 18px;
      color: #333333;
      text-align: center;
      padding: 18px 0;
      border-bottom: 1px solid #ddd;
    }

    .header_text {
      text-align: center;
    }

    .change_section {
      padding-top: 10px;
    }

    .header_text {
      font-size: 14px;
    }

    .d_change_header {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
    }

    .change_sec_head {
      display: block;
      width: 73px;
      float: left;
      line-height: 36px;
      text-align: right;
    }

    .v_itm {
      border: 1px solid #ddd;
      font-size: 14px;
    }

    input.change_sec_inf {
      height: 34px;
      color: #333333;
      padding: 0 8px;
      font-size: 14px;
    }

    .change_sec_inf {
      display: inline-block;
      width: 73.2%;
      margin-left: 22px;
    }

    .change_section {
      border-top: 1px solid #ddd;
      padding: 10px 25px 5px;
      position: relative;
    }

    select.sec_1 {
      margin: 0 0 0 22px;
    }

    .change_sec_item {
      height: 36px;

    }

    select.change_sec_inf {
      height: 38px;
      width: 77%;
      outline: none;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #333333;
      background: #fff;
    }

    select.city_choose_f {
      width: 20%;
    }

    select.city_choose_s {
      width: 20%;
    }

    .change_sec_inf.select_sec {
      width: 35.8%;
    }

    select.major_subject {
      width: 20%;
    }

    select.major_class {
      width: 52%;
      margin-left: 24px;
    }

    .change_sec_item {
      margin: 15px 0;
      /* line-height: 36px; */
    }

    .tips {
      margin-left: 95px;
      color: #999;
      /* color: yellow; */
    }

    .tips {
      font-size: 14px;
    }

    .change_footer {
      width: 100%;
      height: 70px;
      border-top: 1px solid #ddd;
    }

    .change_footer .btn {
      border: none;
      outline: none;
      padding: 6px 15px;
      color: #fff;
      font-size: 18px;
      border-radius: 5px;
      background: #4dd5ff;
      float: right;
      margin: 20px 30px;
      cursor: pointer;
      font-family: inherit;
    }

    .icontips {
      vertical-align: middle;
    }

    .city-choose {
      position: relative;
    }

    .city_add, .city_delete {
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .change_sec_inf > span {
      cursor: pointer;
      display: inline-block;
      width: 45px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #ddd;
      margin: 0 7px 0 0;
      color: #555555;
      font-size: 14px;
      line-height: 20px;
      margin-top: 8px;
    }

    .change_sec_inf .active {
      background: #4dd5ff;
      color: #fff;
    }

    select.sec_item4 {
      width: 17.5%;
      margin-left: 0;
    }

    select.sec_1 {
      margin: 0 0 0 22px;
    }

    .change_day {
      width: 75%;
      height: 34px;
      margin-left: 22px;
      padding-left: 8px;
      font-size: 14px;
    }

    .must_star {
      color: red;
    }

    select.sec_item2 {
      width: 36%;
      margin-left: 0;
    }

    select.sec_1 {
      margin: 0 0 0 22px;
    }

    .change_sec_item textarea {
      outline: none;
      padding: 8px;
      resize: none;
      min-height: 100px;
      border: 1px solid #ddd;
      font-family: "Microsoft YaHei", Verdana, Arial;
    }

    .add_item {
      width: 470px;
      margin: 0 auto 10px;
      text-align: center;
      line-height: 38px;
      border: 1px dashed #ddd;
      cursor: pointer;
      font-size: 14px;
      line-height: 40px;
    }

    .add_item h2 {
      display: inline-block;
      margin: 0;
    }

    .change_section_box {
      overflow-y: scroll;
      width: 540px;
      height: 365px;
      padding-bottom: 40px;
    }

    .change_section_box::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    .change_section_box::-webkit-scrollbar-thumb {
      background: #f1f1f1;
      border-radius: 7px;
    }

    .change_section_box::-webkit-scrollbar-thumb:hover {
      background: #bdbdbd;
    }

    .demo-btn {
      margin-left: 95px;
      color: #02a0e9;
      font-size: 14px;
      /*line-height: 20px;*/
    }

    .demo-text {
      /*display: none;*/
      border: 1px solid #eee;
      padding: 10px;
      margin-left: 10px;
      margin-top: 14px;
      width: 90.2%;
      position: relative;
      box-shadow: 0px 0px 3px #eee;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 20px;
    }

    .demo-text:before {
      width: 14px;
      height: 14px;
      border: 1px solid;
      content: '';
      position: absolute;
      left: 102px;
      top: -8px;
      background: #ffffff;
      transform: rotate(45deg);
      border-color: #eee transparent transparent #eee;
    }

    pre {
      white-space: pre-wrap; /*css-3*/
      white-space: -moz-pre-wrap; /*Mozilla,since1999*/
      white-space: -pre-wrap; /*Opera4-6*/
      white-space: -o-pre-wrap; /*Opera7*/
      word-wrap: break-word; /*InternetExplorer5.5+*/
    }

    .change_section {
      border-top: 1px solid #ddd;
      padding: 10px 25px 5px;
      position: relative;
    }

    .self_change textarea {
      outline: none;
      padding: 15px;
      resize: none;
      min-height: 100px;
      width: 415px;
      font-family: "Microsoft YaHei", Verdana, Arial;
      border: 1px solid #ddd;
    }
  }
</style>
