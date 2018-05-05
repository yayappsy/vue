<template>
  <div class="job-box">
    <div class="job-header">
      <div class="new_job_name">{{pageData.name}}</div>
      <div class="job_date "><span class="cutom_font">{{pageData.updateTime}}</span><span>刷新</span></div>
      <div class="job_msg"><span class="job_money cutom_font">{{pageData.lowest}}-{{pageData.highest}}／天</span><span class="job_position">{{pageData.area.name}}</span><span
        class="job_academic">{{pageData.education}}</span><span class="job_week cutom_font">{{pageData.dayNumber}}天/周</span><span class="job_time cutom_font">实习{{pageData.practiceMonth}}个月</span>
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
          <div class="job_part" >
            <div class="job_detail" v-html="pageData.description"></div>
          </div>
        </div>
        <div class="con-job con-com_introduce">
          <div class="job_til">公司简介：</div>
          <div class="job_com_name cutom_font">{{pageData.companyDto.name}}</div>
          <div class="job_detail" v-html="pageData.companyDto.introduce"></div>
          <div class="job_detail job_detail_msg"><span>{{pageData.area.name}}</span><span>{{pageData.companyDto.size}}</span><span>{{pageData.companyDto.mainBusinessDescription }}</span></div>
          <a target="_blank" rel="nofollow" title="http://www.careerintlinc.com/"
             class="job_link">{{pageData.companyDto.site}}</a>
          <div class="job_com_position"><span class="com_position">{{pageData.address}}</span></div>
        </div>
        <div class="con-job deadline">
          <div class="job_til">截止时间：</div>
          <div class="job_detail cutom_font">{{pageData.expiryDate}}</div>
        </div>
        <div class="con-job resume_content">
          <div class="resume_apply com_res" v-on:click="addressSelection3=true">投个简历</div>
        </div>
      </div>
      <div class="content_right">
        <div class="resume_apply com_res" v-on:click="addressSelection3=true">投个简历</div>
        <div class="sc " :class="{job_collect:!isIfCollect,sc_confirm:isIfCollect}" @click="jobCollect()"><span class="job_star"></span><span class="job_star_status">收藏</span></div>
      </div>
    </div>
    <div class="load_res_de" v-if="addressSelection3" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1002;">
      <div id="deliver_resume" >
        <div id="de_hed">
          <p class="de_h_p">投个简历</p>
          <span id="close_de"  v-on:click="addressSelection3=false">x</span>
        </div>
        <div id="de_center">

          <p id="de_sele" class="de_sele" style="">请选择你要投递的简历：</p>
          <ul id="resume_list_box">
            <input type="hidden" id="resume_uuid">
            <input type="hidden" id="group_uuid">

            <li class="resume_list " v-for="list in ListOfResumes" >
              <span :class="{active:list.wts}"  @click="selectResume(list.resumeId)">
                <p style="padding: 10px 0 5px 0;" v-if="list.type==0">在线简历：</p>
                <p style="padding: 10px 0 5px 0;" v-if="list.type==1">附件简历：</p>
                <p class="resume_list_p">
                <span class="resume-name">默认简历({{list.module}}%)-中文</span>
                <span class="de_look">
                  <router-link  :to="{ name: 'LookResume', params: { ids:JSON.stringify({sid:list.userId,rid:list.resumeId})}}"  target="_blank">预览</router-link>|
                   <router-link v-if="list.type==0" :to="{ name: 'online_resume', params: { rid:JSON.stringify(list)}}"  target="_blank">修改</router-link>
                  <router-link v-if="list.type==1" :to="{ name: 'my_resume', params: { rid:JSON.stringify(list)}}"  target="_blank">修改</router-link>
                </span>
                </p>
              </span>
            </li>
          </ul>
          <p class="de_sele">其他信息：</p>
          <div class="de_am_inf" style="position: relative">
            <input type="text" v-on:focus="addressSelection=true" v-model="ResumeLnformation.areaName" class="de_an_city" id="cityChoice" placeholder="现居城市">
            <date-picker field="de_an_time" placeholder="入职时间" v-model="ResumeLnformation.data" format="yyyy-mm-dd"  forward="true"></date-picker>
          </div>
          <button id="deli_pre" @click="confirmationInformation() ">确认</button>
        </div>
      </div>
    </div>
    <div class="jb-box" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1002; display: none;">
      <span class="jb_close" v-on:click="reportHide()">x</span>
      <p class="jb_title">
        举报
      </p>
      <div class="inf">
        <p>请写下举报的理由</p>
        <textarea name="" class="inf_msg"></textarea>
        <button class="inf_pre">提交</button>
      </div>
    </div>
    <div id="shade" v-if="addressSelection3" style="width: 100%; height: 100%; background: rgb(0, 0, 0); opacity: 0.8; position: fixed; top: 0px; left: 0px; z-index: 1001; cursor: pointer;"></div>
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
    <div class="sxs--modal" v-if="addressSelection2" >
      <div class="sxs--modal--bg" style="height: 444px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div class="sxs--modal--icon" style="text-align: center;margin-top: 36px;">
            <img src="../img/t_1.png" alt="">
          </div>
          <div class="sxs--modal--title" style="text-align: center;margin-top: 10px;font-size: 25px;">投递确认</div>
          <div class="sxs--modal--text" id="deli_prompt" style="text-align: center;margin-top: 10px;color:#ccc;">确认要投递吗？</div>
          <div class="sxs--modal--btn" style="margin-top: 36px;">
            <span class="" id="del_pre" @click="postResume()">确认投递</span>
            <a class="change_btn" >修改简历</a>
          </div>
          <div class="sxs--modal--text" style="text-align: right;cursor: pointer"><span class="sxs--modal--close"  @click="addressSelection2=false;">放弃投递</span></div>
        </div>
      </div>
    </div>
    <div class="sxs--modal" v-if="addressSelection4">
      <div class="sxs--modal--bg" style="height: 444px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div class="sxs--modal--icon" style="text-align: center;margin-top: 36px;">
            <img src="../img/t_2.png" alt="">
          </div>
          <div class="sxs--modal--title" style="text-align: center;margin-top: 10px;font-size: 25px;">投递成功</div>
          <div class="sxs--modal--text" id="deli_prompt" style="text-align: center;margin-top: 10px;color:#ccc;">温馨提示：若在求职过程中遇到收取费用，或实习地址、联系方式与官方发布信息不一致，请提高警惕，以防受骗，并及时与门徒官方取得联系。</div>
          <div class="sxs--modal--btn" style="margin-top: 36px;">
            <span class="" id="del_pre" @click="addressSelection4=false">确认</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
  export default {
    name: 'app',

    data () {//变量
      return {
        addressSelection3:false,
        addressSelection:false,
        addressSelection2:false,
        addressSelection4:false,
        ResumeLnformation:{
          companyId:"",
          jobId:"",
          resumeId:"",
          areaid:"",
          areaName:"",
          data:""
        },
        pita:{},
        pita2:{},
        pita3:{},
        whetherToCollect:true,
        ListOfResumes:[],
        userData:{},
        calendar:{
          fullyear:"",
          month:"",
          date:"",
          datalist:[]
        },
        pageData:{
          jobDtos: [{
            companyDto:{
              logo:""
            }
          }],
        },
        data:{
          getUser:{},
          getHopePractice:{}
        },
        ids:{
          sid:"",
          rid:""
        },
        isIfCollect:false
      }
    },
    mounted () {//初始化
      this.getAreaData();
      this.pageData=JSON.parse(this.$route.params.searchData);//获取传过来的值
      console.log(this.pageData)
      this.userData= JSON.parse(window.localStorage.getItem('S_id'));
      this.GetAListOfResumes();
      this.isCollect()
    },
    methods:{//方法
      //弹出确认选择界面
      confirmationInformation(){
        if(this.ResumeLnformation.resumeId==""){
          alert("请选择简历！！！");
        }else if(this.ResumeLnformation.areaid==""){
          alert("请选择居住城市！！！");
        }else if(this.ResumeLnformation.data=="") {
          alert("请选择到岗时间！！！");
        }else{
          this.addressSelection=false;
          this.addressSelection2=true;
          this.addressSelection3=false;
        }
      },
      //显示举报
      reportShow:function () {
        $(".jb-box").css("display","block");
        $("#shade").css("display","block");
      },
      //选择简历
      selectResume(id){
        this.ResumeLnformation.companyId=this.pageData.companyDto.id;
        this.ResumeLnformation.jobId=this.pageData.id;
        this.ResumeLnformation.resumeId=id;
        this.getResume();
        this.ListOfResumes. forEach(function (element) {
          if(element.resumeId==id){
            element.wts=true;
          }else{
            element.wts=false;
          }
        })
      },
      //投递简历
      postResume(){
        this.reviseResume();
        console.log(this.pageData)
        this.postData("/api/companyDetail/deliver", {companyId:this.ResumeLnformation.companyId,jobId:this.ResumeLnformation.jobId,resumeId:this.ResumeLnformation.resumeId,userId:this.userData.id}).then((res) => {
          if (res.data.code == 0) {
            console.log(res.data)
            this.addressSelection2=false;
            this.addressSelection4=true;
          }else{
            console.log(res.data.message)
          }
        })
      },
      //获取简历信息
      getResume(){
        //个人信息
        this.postData("/api/resume/getUser", {userId: this.userData.id}).then((res) => {
          if (res.data.code == 0) {
            console.log( res.data.data);
            this.data.getUser = res.data.data;
            this.data.getUser.resumeId=this.userData.id;
            if(res.data.data.residence.id!=""){
              this. ResumeLnformation.areaid = res.data.data.residence.id;

              this. ResumeLnformation.areaName= res.data.data.residence.name;
            }
            console.log(res.data.data)
          } else {
            console.log(res.data.message);
          }
        });
        //期望实习
        this.getData("/api/resume/getHopePractice", {id:this.ResumeLnformation.resumeId}).then((res) => {
          console.log(res.data.data)
          if (res.data.code == 0) {
            if(res.data.data){
              this.data.getHopePractice = res.data.data;
              this.ResumeLnformation.data=res.data.data.arrivalDate;
            }
          } else {
            console.log(res.data.message);
          }
        });
      },
      //修改简历
      reviseResume(){
        this.data.getHopePractice.arrivalDate= this.ResumeLnformation.data;
        this.data.getUser.residence={
          id: this. ResumeLnformation.areaid,
          name:this. ResumeLnformation.areaName
        }
        this.postData2("/api/resume/editUser",this.data.getUser).then((res) => {
          if (res.data.code == 0) {
          } else {
            console.log(res.data.message);
          }
        });
        this.postData2("/api/resume/commitHopePractice",this.data.getHopePractice).then((res) => {
          if (res.data.code == 0) {
          } else {
            console.log(res.data.message);
          }
        });
      },
      //隐藏举报
      reportHide:function () {
        $(".jb-box").css("display","none");
        $("#shade").css("display","none");
      },
      //显示选择简历
      ChooseResumeShow:function () {
        $("#deliver_resume").css("display","block");
        $("#shade").css("display","block");
      },
      //获取简历列表
      GetAListOfResumes(){
        this.postData("/api/userInfo/myResumeList", {memberId:this.userData.id.toString()}).then((res) => {
          if (res.data.code == 0) {
            this.ListOfResumes=res.data.data;
            console.log()
            this.$set(this.ListOfResumes[0],'module',(parseInt(res.data.data[0].moduleNum) / 9).toFixed(2) * 100);
            this.$set(this.ListOfResumes[0],'wts',false);
            this.$set(this.ListOfResumes[1],'wts',false);
            this.$set(this.ListOfResumes[1],'module',(parseInt(res.data.data[1].moduleNum) / 3).toFixed(2) * 100);
            console.log(this.ListOfResumes);
          }else{
            console.log(res.data.message)
          }
        })
      },
      //收藏职位
      jobCollect(){
        if(!this.isIfCollect){
          this.postData("/api/userInfo/jobCollect",{numberId:this.userData.id,jobId:this.pageData.id},{}).then((res) => {
            if(res.data.code==0){
              this.isCollect();
            }else{
              console.log(res.data.message)
            }
          })
        }else{
          this.postData("/api/userInfo/cancelJobCollect",{numberId:this.userData.id,jobId:this.pageData.id}).then((res) => {
            if(res.data.code==0){
              this.isCollect();
            }else{
              console.log(res.data)
            }
          })
        }
      },
      //获取地区城市
      getAreaData:function(){
        this.getData("/api/basic/region/listTree",{parentId:110000,type:3}).then((res) => {
          this.pita=res.data.data[0].child;
        }, (err) => {
          console.log(err)
        });
      },
      //选择地区
      areaClick:function (list) {
        this.ResumeLnformation.areaName=list.name;
        this.ResumeLnformation.areaid=list.id;
        this.addressSelection=false;
      },
      //判断该职位是否已被收藏
      isCollect(){
        this.postData("/api/homepage/isCollect",{userId:this.userData.id,collectorId:this.pageData.id},{}).then((res) => {
          if(res.data.code==0){
            this.isIfCollect=res.data.data;
          }else{
            console.log(res.data.message)
          }
        })
      },
      //取消收藏职位
      cancelJobCollect(jobId){
        this.postData("/api/userInfo/cancelJobCollect",{numberId:this.id,jobId:this.pageData.id}).then((res) => {
          if(res.data.code==0){
            this.getdata2();
          }else{
            console.log(res.data)
          }
        })
      }
  }  ,components:{
      'date-picker': myDatepicker
    }
  }
</script>
<style>
  .sxs--modal--btn > span, .sxs--modal--btn > a {
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
  .sxs--modal--content > .sxs--modal--btn {
    position: relative;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    padding-top: 36px;
  }
  .sxs--modal--btn > span{
    background: #6aa2e4;
    border: solid 1px #5e98db;
    color: #fff;
    cursor: pointer;
  }
  .resume_list> span {
    display: block;
    background-color: #fafafa;
    border: solid 1px #eee;
    padding-left: 8px;
    line-height: 24px;
  }
  .resume_list .active{
    background-color: #fff;
    border: solid 1px #6aa2e4;
    color: #6aa2e4;
  }
  .sc_confirm .job_star {
    background-image: url(http://39.106.117.195/image/lcon/job_icon_star_active.png);
  }
  .job_collect .job_star {
    background-image: url(http://39.106.117.195/image/lcon/job_icon_star.png);
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
  .job-box {
    position: relative;
    max-width: 1080px;
    width: 100%;
    height: 100%;
    margin: 35px auto 20px;
    color: #333;
    font-size: 14px;
  }
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

  .job-header .job_img {
    position: absolute;
    width: 120px;
    height: 120px;
    right: 60px;
    top: 55px;
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

  .job-header .job_more .job_det_share_show{
    height: 32px;
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
    top:0px;
    right: 0px;
    width: 240px;
  }

  .block {
    clear: both;
  }

  .content_left .con-job {
    position: relative;
    padding-top: 40px;
  }

  .content_left .con-job .job_til{
    position: relative;
    font-size: 16px;
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

  .resume_apply {
    position: relative;
    width: 240px;
    height: 60px;
    line-height: 60px;
    background-color: #bbb;
    color: #888;
    text-align: center;
    font-size: 20px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    display: inline-block;
  }
  .content_right .block {
    display: block;
    clear: both;
  }
  .content_right .resume_apply {
    cursor: pointer;
    width: 240px;
    float: left;
  }
  .com_res{
    cursor: pointer;
    background-color: #6aa2e4;
    color: #fff;
  }

  .content_left .resume_content {
    position: relative;
    width: 100%;
    text-align: center;
  }

  .content_right .job_collect, .content_right .sc_confirm {
    cursor: pointer;
    margin-top: 30px;
    position: relative;
    width: 240px;
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
  }
  .content_right .job_collect .job_star,.content_right .sc_confirm .job_star {
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

  #mapBox{
    width: 300px;
    background: #19aa8d;
    /*margin: 15px auto 20px;*/
    margin-bottom: 16px;
  }
  .mapBoxCss{
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }
  .mapBoxCss_show{
    height: 160px;
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
  .job-header .job-com .com-con .com-name {
    display: inline-block;
    font-size: 20px;
    color: #6aa2e4;
    max-width: 115px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .job-header .job-com .com-con .com-num,
  .job-header .job-com .com-con .com-class {
    font-size: 16px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .job-header .job-com .com-con .com-num {
    padding: 16px 0 6px 0;
  }
  .job-header .job-com .com-con .com-right {
    position: absolute;
    width: 10px;
    height: 19px;
    right: 0;
    top: 40px;
  }
  .load_res_de {
    width: 500px;
  }
  #deliver_resume {
    width: 434px;
    background: #fff;
    padding: 0 0 10px 0;
    border: solid 6px #dfedfd;
    /*overflow: hidden;*/
  }
  #de_hed {
    width: 100%;
    line-height: 45px;
    color: #333;
    font-size: 24px;
    text-align: center;
    padding: 36px 0 10px;
    position: relative;
  }
  .de_h_p {
    padding: 0 15px;
  }
  #close_de {
    position: absolute;
    right: 10px;
    top: -2px;
    cursor: pointer;
    font-size: 25px;
    -webkit-transform: scale(1.2, 1);
    -moz-transform: scale(1.2, 1);
    -ms-transform: scale(1.2, 1);
    -o-transform: scale(1.2, 1);
    transform: scale(1.2, 1);
  }
  .de_sele {
    position: relative;
    color: #555;
    font-size: 14px;
    padding: 20px 0 10px 45px;
  }
  #resume_list_box {
    position: relative;
  }
  .resume_list {
    padding: 5px 0 5px 45px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    width: 368px;
  }
  .de_ra {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .de_ra + span {
    display: block;
    background-color: #fafafa;
    border: solid 1px #eee;
    padding-left: 8px;
    line-height: 24px;
  }
  .resume-name {
    display: inline-block;
    width: 270px;
    /* overflow: hidden; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
  .de_look {
    color: #555;
    float: right;
    margin-right: 15px;
  }
  .de_ra + span a {
    position: relative;
    z-index: 3;
  }
  .de_look a {
    color: #555;
    cursor: pointer;
  }
  .de_sele::before {
    content: '';
    position: absolute;
    display: block;
    background-color: #6aa2e4;
    top: 26px;
    left: 20px;
    width: 10px;
    height: 10px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  #resume_list_box::after {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 100%;
    left: 24px;
    top: 0px;
    background-color: #ccc;
  }
  .de_am_inf {
    padding-left: 45px;
  }
  .de_an_city, #de_an_time {
    padding: 0 8px;
    width: 348px;
    border: solid 1px #eee;
    background: #f5f5f5;
    line-height: 36px;
    height: 36px;
    margin-bottom: 10px;
    position: relative;

  }
  #de_an_time + .vue-datepicker-panels{
    top:-290px;
  }
  .down_pin {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 6px;
    height: 6px;
    border: 1px solid;
    border-color: transparent #6aa2e4 #6aa2e4 transparent;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  #deli_pre {
    display: block;
    border: none;
    outline: none;
    background: #6aa2e4;
    color: #fff;
    cursor: pointer;
    padding: 8px 0;
    width: 390px;
    font-size: 18px;
    margin: 15px auto;
    /* border-radius: 6px; */
  }
  .jb-box {
    width: 500px;
    height: 360px;
    background: #fff;
    position: relative;
    display: none;
    border-radius: 4px;
    overflow: hidden;
  }
  .jb_close {
    position: absolute;
    top: 7px;
    right: 10px;
    color: #fff;
    font-size: 26px;
    cursor: pointer;
    -webkit-transform: scale(1.2, 1);
    -moz-transform: scale(1.2, 1);
    -ms-transform: scale(1.2, 1);
    -o-transform: scale(1.2, 1);
    transform: scale(1.2, 1);
  }
  .jb_title {
    background: #6aa2e4;
    color: #fff;
    font-size: 18px;
    padding: 10px;
  }
  .inf {
    width: 400px;
    margin: 20px auto 0;
  }
  .inf_msg {
    width: 380px;
    height: 160px;
    padding: 10px;
    resize: none;
    outline: none;
    border-radius: 6px;
    margin: 10px 0 0 0;
    border: 1px solid #ddd;
  }
  textarea {
    overflow: auto;
  }
  .inf_pre {
    outline: none;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 25px;
    background: #6aa2e4;
    color: #fff;
    border: none;
    float: right;
    border-radius: 6px;
    margin: 20px 0 0 0;
  }
  .content_left .con-com_introduce .job_com_position .com_position:before{
    background-image: url(http://39.106.117.195/image/lcon/job_com_position.png);
  }
  .SelectionDate{
    display: none;
    position: absolute;
    left: 45px;
    bottom: 48px;
    background-color: #fff;
    width: 224px;
    height: 220px;
    border-bottom: 1px solid #BBBBBB;
    border-left: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;
    border-top: 1px solid #CCCCCC;
    padding: 8px;
  }
  .SelectionDate_top{
    position: relative;
    height: 20px;
  }
  .SelectionDate_top_spna1{
    position: absolute;
    left: 0px;
    top: 0px;
    color: #999;
  }
  .SelectionDate_top_spna5{
    position: absolute;
    left: 30px;
    top: 0px;
    color: #999;
  }
  .SelectionDate_top_spna2{
    position: absolute;
    right: 110px;
    top: 0px;
    font-weight: bold;
  }
  .SelectionDate_top_spna3{
    position: absolute;
    right: 40px;
    top: 0px;
    font-weight: bold;
  }
  .SelectionDate_top_spna4{
    position: absolute;
    right: 0px;
    top: 0px;
    color: #999;
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
</style>
