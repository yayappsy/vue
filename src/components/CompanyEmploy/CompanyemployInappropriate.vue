<template>
  <div class="company_employ_pending">
    <!--子页顶部标题栏-->
    <div class="employ_pending_title">
      <div class="pending_title_left">
        <select name="position" id="pending_title_position" v-model="searchResume.jobName" v-on:change="initdata()">
          <option value="">不限</option>
          <option v-for="list in getJobNames" :value="list">{{list}}</option>
        </select>
      </div>
      <div class="pending_title_middle">
        <h3><span class="redText">{{jobInResumeDtos.length}}</span>封不合适简历</h3>
      </div>
      <div class="pending_title_right">
        <div>
          <input id="pending_title_right_input" placeholder="姓名或学校" type="text" v-model="searchResume.searchName">
          <input id="pending_title_right_btn" type="button" @click="initdata()">
        </div>
      </div>
    </div>
    <!--子页内容-->
    <div class="employ_pending_inner">
      <!--选项栏-->
      <div class="employ_pending_inner_options">
        <div>
          <span>现居城市：</span>
          <input type="text" v-on:focus="addressSelection=true" v-model="areaName" style="width: 120px;height: 28px;line-height: 28px;border: 1px solid #ccc">
        </div>
        <div>
          <span>每周天数：</span>
          <select name="" id="pending_inner_option_2" class="pending_inner_option" v-model="searchResume.days" v-on:change="initdata()">
            <option value="" selected>不限</option>
            <option value="1">一天</option>
            <option value="2">二天</option>
            <option value="3">三天</option>
            <option value="4">四天</option>
            <option value="5">五天</option>
          </select>
        </div>
        <div>
          <span>实习时长：</span>
          <select name="" id="pending_inner_option_3" class="pending_inner_option" v-model="searchResume.months" v-on:change="initdata()">
            <option value="" selected>不限</option>
            <option value="1">一月</option>
            <option value="2">二月</option>
            <option value="3">三月</option>
            <option value="4">四月</option>
            <option value="5">五月以上</option>
          </select>
        </div>
        <div>
          <span>入职时间：</span>
          <datepicker id="datepicker" v-on:picked="picked"></datepicker>
        </div>
        <div>
          <span>学历：</span>
          <select name="" id="pending_inner_option_5" class="pending_inner_option" v-model="searchResume.education" v-on:change="initdata()">
            <option value="" selected>不限</option>
            <option value="博士">博士</option>
            <option value="硕士">硕士</option>
            <option value="本科">本科</option>
            <option value="专科">专科</option>
          </select>
        </div>

        <div>
          <span>性别：</span>
          <select name="" id="pending_inner_option_7" class="pending_inner_option" v-model="searchResume.gender" v-on:change="initdata()">
            <option value="" selected>不限</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
      </div>
      <!--个人信息展示-->
      <div class="employ_pending_inner_peoples">
        <ul class="employ_pending_inner_people_list">
          <li class="people_inner" v-for="list in jobInResumeDtos">
            <div class="people_inner_checkbox">
              <!--<input type="checkbox" class="checkbox" @click="checkBoxClick(list)">-->
            </div>
            <img class="people_photo" v-bind:src="list.avatar" alt="">
            <div class="people_information">
              <!--职位-->
              <div class="people_post">
                <h4 class="penging_people_post">{{list.jobName}}</h4>
                <router-link :to="{ name: 'LookResume', params: { ids:JSON.stringify({sid:list.userId,rid:list.resumeId})}}" class="pending_people_resume" ><span class="eye"></span><span
                  class="resume">查看简历</span></router-link>
                <span class="pending_people_dleiver">投递时间：{{list.createDate}}</span>
              </div>
              <!--基本信息-->
              <div class="people_base_information">
                <div class="information">
                  <p>
                    <span class="people_name">{{list.name}}</span>
                    <span class="people_sex">{{list.gender}}</span>
                    <span class="people_city">现居{{list.residenceName}}</span>
                    <span class="people_daysAWeek">{{list.days}}天/周</span>
                    <span class="people_month">{{list.months}}个月</span>
                    <span class="people_date">{{list.arrivalDate}}后可入职</span>
                  </p>
                  <p>
                    {{list.school}}-{{list.major}}-{{list.education}}&nbsp;{{list.endDate}}年毕业
                  </p>
                </div>
                <!--<div class="type">-->
                  <!--<span @click="mainshiyaoqing(list)">面试邀请</span>-->
                <!--</div>-->
                <div class="options">
                  <!--<a @click="handResume(list.id,2)">删除</a>-->
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="employ_pending_inner_bottom">
        <!--<div class="inner_bottom_left" style="font-size: 14px;width: 220px;">-->
          <!--<input type="checkbox" id="Q_checkBox" @click="Q_checkBoxClick()">全选-->
          <!--<a style="cursor: pointer" @click="Q_handResume(4)">待定</a>-->
          <!--<a style="cursor: pointer" @click="Q_handResume(2)">不合适</a>-->
        <!--</div>-->
        <div id="pagebar" class="pagination" v-if="pageable.WhetherNotShown" style="float: right;width: 750px; margin-top: 0">
          <ul>
            <li :class="{'disabled':pageable.pageNo<=1}" @click="TurnThePage(1)"><a>首页</a></li>
            <li :class="{'disabled':pageable.pageNo<=1}" @click="TurnThePage(pageable.pageNo-1)"><a>上一页</a></li>
            <li v-for="list in pageable.pageNumber" :class="{'active':list.active}" @click="TurnThePage(list.Number)"><a>{{list.Number}}</a></li>
            <li :class="{'disabled':pageable.pageNo>=pageable.maxPage}" @click="TurnThePage(pageable.pageNo+1)"><a>下一页</a></li>
            <li :class="{'disabled':pageable.pageNo>=pageable.maxPage}" @click="TurnThePage(pageable.maxPage)"><a>尾页</a></li>
          </ul>
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
    <div class="sxs--modal" v-if="addressSelection2"  @click="addressSelection2=false;">
      <div class="sxs--modal--bg" style="height: 650px;width: 700px"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 650px; margin-top: -320px;width: 700px">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 650px;width: 700px" @click.stop="">
          <div class="in_top"><span class="top-name">面试邀请</span><span class="in_exit">我要自行通知</span></div>
          <div class="in_content">
            <div class="in_first">
              <div class="in_msg">收件人：<span id="toUsername">{{emain.name}}</span>（系统将通过短信和邮件的方式邀请该用户参加面试）</div>
              <div class="in_item"><span class="in_l"><span>主题</span></span><input type="text" class="in_input in_theme" readonly="readonly" v-model="emain.recipient"></div>
              <div class="in_item" style="height: 50px"><span class="in_l"><span class="star">面试时间</span></span>
                <select  style="width: 108px;height: 28px;text-align: center;float: right;margin-right: 200px;margin-top: 5px" v-model="shijian">
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                </select>
                <datepicker v-on:picked="picked" style="float: right;margin-right: 50px;margin-top: 5px" ></datepicker>
              </div>

            </div>
            <div class="in_second">
              <div class="in_nav"><span class="nav_name">面试信息</span><span class="nav_status " @click="UseTemplate()">使用模板</span></div>
              <div class="nav_scroll">
                <div class="nav_content nav_content_hidden">
                  <div class="con_list" data-uuid="din_axw7fy1ymtst"><span class="li_name">18143148444</span><span class="li_position">12312</span><span class="li_phone">18143148443</span><span class="li_del">x</span></div>
                </div>
              </div>
            </div>
            <div class="in_third">
              <div class="in_item"><span class="in_l"><span class="star">面试地点</span></span><input type="text" class="in_input in_position" v-model="emain.interview"></div>
              <div class="in_item"><span class="in_l"><span class="star">联系人</span></span><input type="text" class="in_input in_name" v-model="emain.contact"></div>
              <div class="in_item"><span class="in_l"><span class="star">联系电话</span></span><input type="text" class="in_input in_phone" v-model="emain.ontactPhone"></div>
              <div class="save_mould_con"><span class="save_mould" @click="SaveTemplate()">保存为模板</span></div>
              <input type="hidden" id="deliverId" value="dlv_qa205nyxszfy" >
            </div>
            <div class="in_last">
              <div class="in_item_special"><span class="in_l">补充内容</span><textarea name="" id="" class="in_text" v-model="emain.AddTheContent"></textarea></div>
              <div class="in_send"><span class="in_send_btn" @click="Send_Email()">发送系统通知</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import datepicker from '../../html/datepicker.vue';
  import {common} from '../../js/common.js';
  export default {
    name: "company-employ-pending",
    data() {
      return {
        PendingId:null,
        pending_title: "7",
        tf:false,
        shijian:"",
        areaName:"",
        addressSelection:false,
        addressSelection2:false,
        jRData:[],
        pita:{},
        pita2:{},
        pita3:{},
        getJobNames:[],

        searchResume:{
          companyId:"",
          arrivalDate: "",
          city: {
            id:"",
            name:""
          },
          days: "",
          education: "",
          endDate: "",
          gender: "",
          isLook: "",
          jobName: "",
          months: "",
          searchName: "",
          status: "2"
        },
        //页数
        pageable:{
          pageNumber:[],
          WhetherNotShown:true,
          pageNo:1,
          maxPage:null
        },
        emain:{
          name:"",
          recipient:"",
          theme:"",
          interviewTime:"",
          interview:"",
          contact:"",
          ontactPhone:"",
          AddTheContent:"",
          Email:"",
          jobName:""
        },
        jobInResumeDtos:[],
        /*jobInResumeDtos:[
          {
            arrivalDate:"2016-12-12",
            avatar:"",
            createDate:"2018-11-12",
            days:5,
            education:"专科",
            endDate:"2017",
            gender:"男",
            major:"计算机",
            months:5,
            name:"张田野",
            position:"java",
            residenceName:"吉林省",
            resumeId:"5555",
            school:"1",
          }
        ]*/
      }
    },
    mounted() {//初始化
      let _this=this;
      this.searchResume.companyId=window.localStorage.getItem("C_id");
      this.PendingId=this.$route.params.PendingId;//获取传过来的值
      common.$on("num",function (num) {
        _this.searchResume.isLook=num.toString();
        _this.initdata();
      });
      this.getIndustryList();
      this.initdata();
      this.getAreaData();
    },
    methods: {
      //面试邀请
      mainshiyaoqing:function (list) {
        let data=JSON.parse(window.localStorage.getItem("C_DATA"));
        this.emain.name=list.name;
        this.emain.recipient=data.shortName+":"+list.jobName;
        this.emain.jobName=list.jobName;
        this.getData("/api/jobInManager/getResumeDetail",{id:list.resumeId}).then((res) => {
          if(res.data.code==0){
            this.emain.Email=res.data.data.email;
            this.addressSelection2=true;
          }
        })

      },
      //发送邮件
      Send_Email:function(){
        let c_data=JSON.parse(window.localStorage.getItem("C_DATA"));
        let data={
          "email": "zhangtianye9535@163.com",
          "fromAlias": "面试通知",
          "htmlBody": '<p>公司名称:'+c_data.name+'</p>'+ '<p>应聘职位:'+this.emain.jobName+'</p>'+
          '<p>面试时间:'+this.searchResume.arrivalDate+this.shijian+'</p>'+
          '<p>面试地址:'+this.emain.interview+'</p>'+
          '<p>联系人:'+this.emain.contact+'</p>'+
          '<p>联系方式:'+this.emain.ontactPhone+'</p>'+
          '<p>补充内容:'+this.emain.AddTheContent+'</p>',
          "subject": this.emain.recipient
        }
        this.postData2("/api/jobInManager/sendEmail",data).then((res) => {
          console.log(res);
          if(res.data.code==0){
            alert("邀请面试发送成功！！")
          }
        })
      },
      //保存模板
      SaveTemplate:function () {
        let data={
          companyId: window.localStorage.getItem("C_id"),
          linkman: this.emain.contact,
          linkphone: this.emain.ontactPhone,
          place: this.emain.interview
        }
        this.postData2("/api/jobInManager/commitCompanyContact",data).then((res) => {
          console.log(res);
          if(res.data.code==0){

          }
        })
      },
      //使用模板
      UseTemplate:function () {
        let cid=window.localStorage.getItem("C_id");
        this.getData("/api/jobInManager/getCompanyContacts",{id:cid}).then((res) => {
          if(res.data.code==0){
            this.getJobNames=res.data.data;
            this.emain.contact=res.data.data[0].linkman;
            this.emain.ontactPhone=res.data.data[0].linkphone;
            this.emain.interview=res.data.data[0].place;
          }
        })
      },
      //初始化获取数据
      initdata:function () {
        this.searchResume.days=parseInt(this.searchResume.days);
        this.searchResume.months=parseInt(this.searchResume.months);
        this.postData("/api/jobInManager/searchResume",{pageNo:this.pageable.pageNo,pageSize:10},this.searchResume).then((res) => {
          if(res.data.code==0){
            let able=res.data.data.pageable;
            let Number = Math.ceil(able.count/10);
            this.pageable.maxPage=Math.ceil(able.count/10);
            this.jobInResumeDtos=res.data.data.jobInResumeDtos;
            //console.log(Number)
            if(Number<=1){
              this.pageable.WhetherNotShown=false;
              console.log(this.pageable.WhetherNotShown);
            }else {
              this.pageable.pageNumber=[];
              this.pageable.WhetherNotShown=true;
              for(let i=1;i<=Number;i++){
                if(i==this.pageable.pageNo){
                  this.pageable.pageNumber.push({
                    Number:i,
                    active:true
                  })
                }else{
                  this.pageable.pageNumber.push({
                    Number:i,
                    active:false
                  })
                }
              }
            }

          }
        }, (err) => {
          console.log(err);
        });
      },
      //翻页
      TurnThePage:function (t) {
        if(t>=1&&t<=this.pageable.maxPage){
          this.pageable.pageNo=t;
          this.initdata();
        }
      },
      //获取行业列表
      getIndustryList:function () {
        let cid=window.localStorage.getItem("C_id");
        this.getData("/api/jobInManager/getJobNames",{id:cid}).then((res) => {
          if(res.data.code==0){
            this.getJobNames=res.data.data;
          }
        })
      },
      //更简历状态
      handResume:function (id,num) {
        this.postData("/api/jobInManager/handResume",{id:id,result:num},{}).then((res) => {
          console.log(res);
          if(res.data.code==0){
          }
        })
      },
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
        this.areaName=list.name;
        //console.log(this.areaName)
        this.searchResume.city.id=list.id;
        this.searchResume.city.name=list.name;
        this.addressSelection=false;
        this.initdata();
      },
      //多选添加或删除
      checkBoxClick:function (list) {
        let index=this.jRData.indexOf(list);
        if(index<0){
          this.jRData.push(list);
        }else{
          this.jRData.splice(index,1);
        }
      },
      //全选选添加或删除
      Q_checkBoxClick:function (list) {
        if(this.tf){
          this.tf=true;
          $('.checkbox').attr('checked',true);
          this.jRData=this.jobInResumeDtos;
        }else{
          this.tf=false;
          $('.checkbox').attr('checked',false);
          this.jRData=[];
        }
      },
      //全选改变
      Q_handResume:function (num) {
        this.jRData.forEach(function (element) {
          this.handResume(element.resumeId,num)
        })
      },
      picked(year, month, date) {
        if(month<10){
          month="0"+month;
        }
        if(date<10){
          date="0"+date;
        }
        this.searchResume.arrivalDate =year+'-'+month+'-'+date;
        console.log(`你选择了${year}年${month}月${date}日`);
        this.initdata();
      }
    },components:{
      datepicker
    }
  }
</script>

<style scoped>
  #datepicker{
    width: 120px;
    height: 30px;
  }
  #datepicker input{
    height: 30px;
    width: 120px;
  }
  .in_top{
    position: relative;
    height: 60px;
    padding:0 20px;
    line-height: 60px;
    background-color: #02a0e9;
    color: #fff;
    letter-spacing: 2px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .in_top .top-name{
    position: relative;
    font-size: 24px;
  }
  .in_top .in_exit{
    float: right;
    font-size: 16px;
    cursor: pointer;
  }
  .in_content{
    position: relative;
    font-size: 16px;
    color: #666;
  }
  .in_content .in_first,.in_content .in_second,.in_content .in_third,.in_content .in_last{
    margin: 0 20px;
    padding: 12px 0;
    position: relative;
    border-bottom: 1px solid #eaeaea;
  }
  .in_content .in_last{
    padding: 16px 0 0 0;
  }
  .in_content .in_second{
    padding-bottom: 0;
    border-bottom: none;
  }
  .in_content .in_last{
    border-bottom: none;
  }
  .in_content .in_first .in_item,.in_content .in_first .in_msg,.in_content .in_third .in_item,.in_content .in_last .in_item_special{
    position: relative;
    padding-bottom: 14px;
  }
  .in_content .in_first .in_item:last-child{
    padding-bottom: 8px;
  }
  .in_content .in_last .in_item_special{
    padding-bottom: 15px;
  }
  .in_content .in_first .in_item,.in_content .in_third .in_item,.in_content .in_last .in_item_special{
    padding-left: 80px;
  }
  .in_content .in_first .in_item .in_l,.in_content .in_third .in_item .in_l,.in_content .in_last .in_item_special .in_l{
    position: absolute;
    display: inline-block;
    line-height: 40px;
    width: 70px;
    left: 0;
    text-align: right;
  }
  .in_content .in_l .star{
    position: relative;
  }
  .in_content .in_l .star:before{
    content: "*";
    display: inline-block;
    position: absolute;
    font-size: 18px;
    left: -10px;
    top: -10px;
  }
  .in_content .in_item .in_input{
    position: relative;
    width: 450px;
    height: 38px;
    font-size: 16px;
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    line-height: 40px;
    padding: 0 15px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
  }
  .in_content .in_second .in_nav{
    position: relative;
    padding-bottom: 4px;
  }
  .in_content .in_second .in_nav .nav_name{
    position: relative;
    color: #333;
  }
  .in_content .in_second .in_nav .nav_status{
    color: #02a0e9;
    float: right;
    cursor: pointer;
  }
  .in_content .in_second .in_nav .nav_forbid{
    color: #999;
  }
  .in_content .in_second .nav_scroll{
    position: relative;
    max-height: 150px;
    overflow: hidden;
  }
  .in_content .in_second .nav_scroll_show{
    overflow-y: scroll;
  }
  .in_content .in_second .nav_content{
    position: relative;
    overflow: hidden;
    height: 0;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 20px;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }
  .in_content .in_second .nav_content_hidden{
    padding-bottom: 0;
    border-bottom: none;
  }
  .in_content .in_second .nav_content .con_list{
    position: relative;
    margin-bottom: 10px;
    line-height: 40px;
    background-color: #f5f5f5;
    padding: 0 15px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    cursor: pointer;
  }
  .in_content .in_second .nav_content .con_list:hover{
    background-color: #f0f0f0;
  }
  .in_content .in_second .nav_content .con_lis_active{
    background-color: #02a0e9!important;
    color: #fff!important;
  }
  .in_content .in_second .nav_content .con_list:last-child{
    margin-bottom: 0;
  }
  .in_content .in_second .nav_content .con_list .li_name,.in_content .in_second .nav_content .con_list .li_position,.in_content .in_second .nav_content .con_list .li_phone{
    margin-right: 15px;
    display: inline-block;
    vertical-align: top;
  }
  .in_content .in_second .nav_content .con_list .li_position{
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  .in_content .in_second .nav_content .con_list .li_name{
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  .in_content .in_second .nav_content .con_list .li_del{
    float: right;
    cursor: pointer;
  }
  .in_content .in_third .save_mould_con{
    position: relative;
    height: 22px;
  }
  .in_content .in_third .save_mould_con .save_mould{
    position: relative;
    display: inline-block;
    float: right;
    color: #02a0e9;
    cursor: pointer;
  }
  .in_content .in_last .in_item_special{
    position: relative;
  }
  .in_content .in_last .in_item_special .in_text{
    resize: none;
    outline: none;
    overflow: auto;
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    width: 450px;
    height: 42px;
    font-size: 16px;
    padding: 10px 15px;
    line-height: 24px;
  }
  .in_content .in_last .in_send{
    position: relative;
    height: 50px;
  }
  .in_content .in_last .in_send_btn{
    position: relative;
    float: right;
    cursor: pointer;
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background-color: #02a0e9;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
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
  .company_employ_pending {
    /*background-color: #add;*/
  }
  .employ_pending_inner_options{
    width: 100%;
    height: 50px;
  }
  .employ_pending_inner_options>div{
    float: left;
    width: 165px;
  }
  /*标题*/
  .employ_pending_title {
    width: 96%;
    height: 30px;
    border-bottom: 1px solid #eee;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /*标题左侧*/
  .pending_title_left {
    display: inline-block;
    width: 20%;
    height: 30px;
    float: left;
  }

  /*下拉菜单全部职位*/
  #pending_title_position {
    width: 150px;
    height: 30px;
    outline: none;
    background-color: #fff;
    border-color: #eee;
  }

  /*标题中部*/
  .pending_title_middle {
    display: inline-block;
    margin: 0 auto;
    width: 58%;
    height: 30px;

    text-align: center;
  }

  /*标题右部*/
  .pending_title_right {
    display: inline-block;
    float: right;
    width: 21%;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    overflow: hidden;
  }

  /*标题右部输入框*/
  #pending_title_right_input {
    border: none;
    background-color: initial;
    float: left;
    width: 78%;
    height: 30px;
    outline: none;
    padding-left: 10px;
  }

  /*标题右部按钮*/
  #pending_title_right_btn {
    width: 16%;
    height: 30px;
    border: none;
    background-image: url("../../assets/CompanyEmploy/serach.png");
    background-position: center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    outline: none;
  }

  /*红色字体*/
  .redText {
    color: #ff5252;
  }

  /*信息展示*/
  .employ_pending_inner {
    padding: 20px 0;
  }

  /*下拉菜单栏*/
  .employ_pending_inner_options {
    margin-left: 20px;
    margin-bottom: 10px;
  }

  /*各个下拉菜单*/
  .pending_inner_option {
    width: 120px;
    height: 30px;
    background-color: #fff;
    border-color: #eee;
    outline: none;
  }

  /*个人信息*/
  .employ_pending_inner_peoples {
    width: 100%;
    /*height: 69%;*/
    /*background-color: #add;*/
  }

  /*个人信息列表*/
  .employ_pending_inner_people_list {
    list-style: none;
    width: 100%;
    height: 100%;
  }

  /*个人信息*/
  .people_inner {
    width: 100%;
    height: 100px;
    /*background-color: #abc;*/
    padding: 10px;
    border-bottom: 1px solid #eee;

  }

  /*复选框*/
  .people_inner_checkbox {
    width: 12px;
    height: 30px;
    padding: 35px 20px;
    float: left;
  }

  /*照片*/
  .people_photo {
    width: 80px;
    height: 100%;
    float: left;
  }

  /*个人信息*/
  .people_information {
    float: left;
    width: 80%;
    height: 100%;
    margin-left: 20px;
  }

  /*职位栏*/
  .people_post {
    border-bottom: 1px solid #eee;
    height: 25px;
  }

  /*职位*/
  .penging_people_post {
    color: #859aab;
    float: left;
  }

  /*查看简历*/
  .pending_people_resume {
    float: right;
    text-decoration: none;
    margin-left: 70px;
  }

  /*眼睛图标*/
  .pending_people_resume .eye {
    width: 16px;
    height: 13px;
    margin: 4px;
    display: inline-block;
    background-image: url("../../assets/CompanyEmploy/eye.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  /*简历文字*/
  .pending_people_resume .resume {
    float: right;
    color: #02a0e9;
    font-size: 14px;
  }

  /*投递日期*/
  .pending_people_dleiver {
    color: #c1c1c1;
    float: right;
    font-size: 14px;
  }

  .people_base_information {
    width: 100%;
    height: 60%;
    padding: 10px 0;
  }

  .people_base_information > div {
    float: left;
    height: 100%;
  }

  /*个人信息展示*/
  .people_base_information .information {
    width: 60%;
  }
  .people_base_information .information p:nth-child(2){
    margin-top: 10px;
    font-size: 0.8em;
  }
  .people_base_information .information .people_name{
    display: inline-block;
    width: 6em;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .information .people_sex{
    width: 2em;
    display: inline-block;
    font-size: 0.8em;
  }
  .information .people_city{
    width: 6em;
    display: inline-block;
    font-size: 0.8em;
  }
  .information .people_daysAWeek{
    width: 5em;
    display: inline-block;
    font-size: 0.8em;

  }
  .information .people_month{
    font-size: 0.8em;
    width: 4em;
    display: inline-block;

  }
  .information .people_date{
    font-size: 0.8em;
    width: 10.5em;
    display: inline-block;

  }

  /*状态 待处理*/
  .people_base_information .type {
    width: 15%;
    margin-left: 20px;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    cursor: pointer;
    color: #fe6f6f;
  }

  /*选项*/
  .people_base_information .options {
    width: 19%;
    margin-left: 10px;
    line-height: 50px;
    text-align: right;
  }

  .people_base_information .options a {
    margin-left: 10px;
    font-size: 14px;

    text-decoration: none;
    color: #02a0e9;
  }

  .employ_pending_inner_bottom{
    width: 100%;
    height: 40px;
    margin-top: 50px;
    padding-top: 10px;
  }
  .inner_bottom_left{
    float: left;
    width: 15%;
    height: 30px;
    padding: 0 30px;
    line-height: 30px;
  }
  .inner_bottom_left input{
    margin-right: 10px;
  }
  .inner_bottom_left a{
    text-decoration:none;
    color: #000;
    margin: 0 5px;
  }
  .inner_bottom_right{
    float: right;
    width: 70%;
    height: 30px;
    margin-right: 20px;
  }
  .inner_bottom_right a{
    float: right;
    height: 80%;
    display: inline-block;
    background-color: #f5f5f5;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 0 0.5em;
    color: #adadad;
    text-decoration: none;
    margin: 3px;
  }
  .inner_bottom_right .current{
    background-color: #02a0e9;
    color: #fff;
  }

</style>
