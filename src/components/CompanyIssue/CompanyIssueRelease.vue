<template>
  <div class="company_issue_release">
    <div class="company_issue_title">
      <div class="issue_title_left">
        <span class="issue_title_logo"></span>
        <!--<span class="issue_title_text">今天发布职位{{issue_count}},还可发布{{issue_residue}}个职位</span>-->
      </div>
      <a class="issue_reload" href="javascript:location.reload(true);">
        <span class="issue_title_reload"></span>
        <span class="issue_title_text">重置</span>
      </a>
    </div>
    <div class="issue_inner" style="padding-top: 0px">
      <div class="issue_inner_1" style="padding-bottom: 0px">
        <ul class="issue_inner_1_list" style="height: 950px;">
          <li class="half">
            <span class="list_text">职位类别</span>
            <input type="text" placeholder="请选择职位类别" v-model="page.industryName" v-on:focus="addressSelection2=true">
          </li>
          <li class="half">
            <span class="list_text">职位名称</span>
            <input type="text" placeholder="请输入职位名称，如产品经理" v-model="publish.name">
          </li>
          <li class="half">
            <span class="list_text">工作城市</span>
            <input type="text" placeholder="请选择工作城市" v-model="publish.area.name" v-on:focus="addressSelection=true">
          </li>
          <li class="half">
            <span class="list_text">实习人数</span>
            <input type="number" placeholder="请输入数字，如3" v-model="publish.practiceNumber">
          </li>
          <li>
            <span class="list_text">职位诱惑</span>
            <input type="text" placeholder="30字描述该职位的吸引力，如：福利待遇，发展前景等" v-model="publish.jobAttract">
          </li>
          <li class="list_textarea">
            <span class="list_text">职位描述</span>
            <div>
              <span class="reminder">(建议描述工作职责，任职要求，若为非实习类岗位或出现邮箱及外链，系统将自动删除)</span>
              <div style="width: 835px;float: right;height: 255px;">
                <vue-editor v-model="publish.description"></vue-editor>
              </div>
            </div>
          </li>
          <li class="address">
            <span class="list_text">工作地址</span>
            <div>
              <input id="address" type="text" placeholder="输入工作具体地址" v-model="publish.address">
              <!--<a href="javascript:;">预览地图</a>-->
            </div>
          </li>
          <li>
            <span class="list_text">日薪范围</span>
            <div class="salary">
              <input type="number" placeholder="最低日薪(请输入整数)" v-model="publish.lowest">
              <input type="number" placeholder="最高日薪(请输入整数)" v-model="publish.highest">
            </div>

          </li>
          <li>
            <span class="list_text">每周至少</span>
            <div>
              <a class="daysAWeek " href="javascript:;" :class="{'currentDays':publish.dayNumber==1}" @click="publish.dayNumber=1">1天</a>
              <a class="daysAWeek" href="javascript:;" :class="{'currentDays':publish.dayNumber==2}" @click="publish.dayNumber=2">2天</a>
              <a class="daysAWeek" href="javascript:;" :class="{'currentDays':publish.dayNumber==3}" @click="publish.dayNumber=3">3天</a>
              <a class="daysAWeek" href="javascript:;" :class="{'currentDays':publish.dayNumber==4}" @click="publish.dayNumber=4">4天</a>
              <a class="daysAWeek" href="javascript:;" :class="{'currentDays':publish.dayNumber==5}" @click="publish.dayNumber=5">5天</a>
              <a class="daysAWeek" href="javascript:;" :class="{'currentDays':publish.dayNumber==6}" @click="publish.dayNumber=6">6天</a>
              <a class="daysAWeek" href="javascript:;" :class="{'currentDays':publish.dayNumber==7}" @click="publish.dayNumber=7">7天</a>
            </div>

          </li>
        </ul>
      </div>
      <div class="issue_inner_2">
        <div class="list_box">
          <span class="inner_title">学历要求</span>
          <select name="" id="education" v-model="publish.education">
            <option value="不限">专科</option>
            <option value="博士">博士</option>
            <option value="硕士">硕士</option>
            <option value="本科">本科</option>
            <option value="专科">专科</option>
          </select>
        </div>
        <div class="list_box">
          <span class="inner_title">实习月份</span>
          <select name="" id="startyear" v-model="AsAnInternIn.minYears" v-on:change="IntegrationOfTheMonths()">
            <option value="2018" selected>2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <select name="" id="startmouth" v-model="AsAnInternIn.minMonth" v-on:change="IntegrationOfTheMonths()">
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="09">09</option>
            <option value="08" selected>08</option>
            <option value="07">07</option>
            <option value="06">06</option>
            <option value="05">05</option>
            <option value="04">04</option>
            <option value="03">03</option>
            <option value="02">02</option>
            <option value="01">01</option>
          </select>
          <span>----</span>
          <select name="" id="endyear" v-model="AsAnInternIn.maxYears" v-on:change="IntegrationOfTheMonths()">
            <option value="2018">2018</option>
            <option value="2019" selected>2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <select name="" id="endmouth" v-model="AsAnInternIn.maxMonth" v-on:change="IntegrationOfTheMonths()">
            <option value="12">12</option>
            <option value="11">11</option>
            <option value="10">10</option>
            <option value="09">09</option>
            <option value="08" selected>08</option>
            <option value="07">07</option>
            <option value="06">06</option>
            <option value="05">05</option>
            <option value="04">04</option>
            <option value="03">03</option>
            <option value="02">02</option>
            <option value="01">01</option>
          </select>
          <span>(共{{AsAnInternIn.poor}}个月)</span>
        </div>
        <div class="list_box">
          <span class="inner_title">截止日期</span>
          <datepicker id="datepicker" v-on:picked="picked"></datepicker>
        </div>
      </div>
      <div class="issue_inner_3">
        <div class="list_box">
          <span class="inner_title">转正机会</span>
          <a class="regular" href="javascript:;" :class="{'currentregular':publish.chance == 'yes'}" @click="publish.chance = 'yes'">提供转正</a>
          <a class="regular" href="javascript:;" :class="{'currentregular':publish.chance == 'no'}" @click="publish.chance = 'no'">不提供转正</a>
          <a class="regular" href="javascript:;" :class="{'currentregular':publish.chance == 'negotiate'}" @click="publish.chance = 'negotiate'">面议</a>
        </div>
        <div class="list_box">
          <span class="inner_title">是否倾向海外留学生</span>
          <a class="overseasStudent" href="javascript:;" :class="{'currentStudent':publish.isOverseas == '1'}" @click="publish.isOverseas = '1'">是</a>
          <a class="overseasStudent" href="javascript:;"  :class="{'currentStudent':publish.isOverseas == '0'}" @click="publish.isOverseas = '0'">否</a>
        </div>
      </div>
      <div class="issue_inner_4">
        <div class="list_box">
          <span class="inner_title">接收邮件</span>
          <input type="email" placeholder="29387923457@163.com" v-model="publish.email">
        </div>
        <div class="jobLabel">
          <span class="inner_title">职位标签</span>
          <div>
            <p class="reminder">职位标签是该职位的要求关键词，不会在学生端显示，选择职位标签能够提高推荐，过滤精准度高，匹配更多人才</p>
            <input type="text" placeholder="请选择或输入标签，输入多个标签是用空格分割" v-model="publish.labels">
          </div>
        </div>
      </div>
      <div class="issue_inner_5">
        <input id="send" type="button" @click="save()" value="发布">
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
              <span v-for="list in industryThreeDtos"  @click="JobNamesClick(list)">{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sxs--modal" v-if="addressSelection3"  @click="addressSelection3=false;">
      <div class="sxs--modal--bg" style="height: 484px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; height: 450px;" @click.stop="">
          <div id="job_addr2">
            <h1 style="text-align: center">请选择内推的公司</h1>
            <p style="text-align: center;"><span style="color: #985f0d">内推公司没注册,新建公司</span></p>
            <div style="width: 250px;margin: 0 auto;padding-top: 20px;position: relative">
              <input type="text" v-model="s_name" v-on:input ="FuzzMatchingCompanyName" style="width: 250px;height: 30px;">
              <div  style="position: absolute;top: 52px;max-height: 200px;width: 270px;left: 0px;border: 1px solid #ccc;border-top-style: none;overflow-y: hidden" >
                <div>
                  <p v-for="list in s_option" @click="s_name=list.name;publish.companyPushId=list.id;">{{list.name}}</p>
                </div>
              </div>
            </div>
            <div style="text-align: right; position: absolute;bottom: 20px;right: 20px;">
              <button style="background: #02a0e9;width: 100px;height: 30px;color: #fff">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import datepicker from '../../html/datepicker.vue'
  import {VueEditor} from 'vue2-editor'
  export default {
    name: "company-issue-release",
    data() {
      return {
        s_name:"",
        s_option:[],
        AsAnInternIn:{
          minYears:"",
          minMonth:"",
          maxYears:"",
          maxMonth:"",
          poor:"",
        },
        industryThreeDtos:{},
        industryTwoDtos:{},
        issue_count: 0,
        issue_residue: 10,
        mouthSun: 3,
        pita:{},
        pita2:{},
        pita3:{},
        addressSelection:false,
        addressSelection2:false,
        addressSelection3:false,
        page:{
          aeraname:"",
          industryName:""
        },
        publish:{
          companyPushId:"",
          address: "",
          beginDate: "",
          chance: "yes",
          area:{
            id:'',
            name:''
          },
          companyId: "",
          dayNumber: 5,
          description: "",
          education: "",
          email: "",
          endDate: "",
          expiryDate: "",
          highest: "",
          id: "",
          industryId: "",
          isOverseas: "1",
          isResume: "",
          jobAttract: "",
          labels: "",
          language: "",
          lowest: "",
          name: "",
          practiceNumber: 1
        },
        getJobNames:{},
        cid:"",
        CurrentYear:{
          year:"",
          month:""
        },
        list:{}
      }
    },
    mounted() {
      if(window.localStorage.getItem('token')==null) {
        alert("您还没有登录，请先去登录");
        this.$router.push('/companyhome');
      }
      this.cid=window.localStorage.getItem("C_id");
      this.publish.companyId=this.cid;
      console.log( this.publish.companyId)
      if(this.$route.params.list){
        this.publish= JSON.parse(this.$route.params.list).list;

        this.page.industryName = this.publish.industry.name;
        this.publish.industryId = this.publish.industry.id;
        console.log(JSON.stringify(this.publish));
        this.page.aeraname=this.publish.area.name;
        $("#datepicker").find("input").val(this.publish.expiryDate);
        console.log(this.publish);
      }


        this.getAreaData();
      this.getIndustryList();
      this.GetTheCurrentYear();
    },
    methods: {
      //获取行业列表
      getIndustryList:function () {
        let cid=window.localStorage.getItem("C_id");
        this.getData("/api/homepage/industryTags").then((res) => {
          if(res.data.code==0){
            console.log(res.data.data)
            this.getJobNames=res.data.data;
          }
        })
      },

      //模糊匹配公司名称
      FuzzMatchingCompanyName(){
        this.s_option=[];
        this.postData("/api/publishJob/searchCompanyByName",{name:this.s_name},{}).then((res) => {
          if(res.data.code==0){
            this.s_option=res.data.data;
            console.log(res);
          }else{
            console.log(res.data.message)
          }
        });
      },
      //显示日历
      picked(year, month, date) {

        if(month<10){
          month="0"+month;
        }
        if(date<10){
          date="0"+date;
        }
        this.publish.expiryDate =year+'-'+month+'-'+date;
        console.log(`你选择了${year}年${month}月${date}日`)
      },
      //整合实习月数
      IntegrationOfTheMonths:function () {
        this.AsAnInternIn.poor=(parseInt(this.AsAnInternIn.maxYears)-parseInt(this.AsAnInternIn.minYears))*12+ parseInt(this.AsAnInternIn.maxMonth)-parseInt(this.AsAnInternIn.minMonth);
        // if(this.AsAnInternIn.poor<0){
        //   alert("开始时间不可小于结束时间")
        // }else if(this.CurrentYear.year==this.AsAnInternIn.minYears&&this.CurrentYear.month>this.AsAnInternIn.minMonth){
        //   alert("开始时间不可小于当前时间")
        // }else{
          this.publish.beginDate=this.AsAnInternIn.minYears+"-"+this.AsAnInternIn.minMonth+"-"+"01";
          this.publish.endDate=this.AsAnInternIn.maxYears+"-"+this.AsAnInternIn.maxMonth+"-"+"01";
        // }
        console.log(this.AsAnInternIn.maxYears-this.AsAnInternIn.minYears)
      },
      //获取当前的年月
      GetTheCurrentYear:function () {
        let data=new Date();
        this.CurrentYear.year=data.getFullYear();
        this.CurrentYear.month=data.getMonth()+1;
      },
      //获取地址
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
        this.page.aeraname=list.name;
        //console.log(this.areaName)
        this.publish.area.id=list.id;
        this.publish.area.name=list.name;

        this.addressSelection=false;
      },

      //选择行业
      JobNamesClick:function (list) {
        this.page.industryName=list.name;
        this.publish.industryId=list.id;
        this.addressSelection2=false;
      },
      //发布或修改职位
      save:function () {
        let type=JSON.parse(window.localStorage.getItem("type"));
        this.cid=window.localStorage.getItem("C_id");
        this.publish.companyId=this.cid;
        if(type!=3){
          this.postData2("/api/publishJob/publish",this.publish).then((res) => {
            if (res.data.code == 0) {
              alert("发布成功！！！");
              this.publish={
                address: "",
                beginDate: "",
                chance: "",
                area:{
                  id:'',
                  name:''
                },
                companyId: "",
                dayNumber: null,
                description: "",
                education: "",
                email: "",
                endDate: "",
                expiryDate: "",
                highest: "",
                id: "",
                industryId: "",
                isOverseas: "",
                isResume: "",
                jobAttract: "",
                labels: "",
                language: "",
                lowest: "",
                name: "",
                practiceNumber: 1
              };
            } else {
              alert("发布失败！！！请检查填写信息");
            }
          })
        }else{

          this.addressSelection3=true;
        }

      }
    },
    components: {
      VueEditor,
      datepicker
    }
  }
</script>

<style scoped>
  #datepicker{
    position: absolute;
    width: 230px;
    height: 45px;
    top:0px;
    left: 88px;
  }
  #job_addr p,#job_addr1 p{
    padding: 10px 0;
  }
  #job_addr span,#job_addr1 span {
    margin: 3px 5px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
  .company_issue_release {
    padding: 10px 0;
    width: 100%;
    height: 50px;
  }
  .issue_inner_1_list  .half{
    width: 50%;
    float: left;

  }
  .issue_inner_1_list  .half>select,.issue_inner_1_list  .half>input{
    width: 70%;

  }
  select {
    background-color: #fff;
    border-color: #eee;
  }

  /*标题*/
  .company_issue_title {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
  }

  /*标题logo*/
  .issue_title_logo {
    background: url("../../assets/CompanyIssueImages/issueTitleLogo.png");
    -webkit-background-size: 110% 110%;
    background-size: 110% 110%;
    background-position: center center;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    display: inline-block;
    float: left;
  }

  /*标题左侧*/
  .issue_title_left {
    display: inline-block;
    width: 32%;
    height: 100%;
    line-height: 40px;
    margin-left: 20px;
  }

  /*标题文字*/
  .issue_title_text {
    height: 100%;
    line-height: 45px;
    float: right;
    margin-right: 30px;
  }

  /*重置*/
  .issue_reload {
    float: right;
    display: inline-block;
    line-height: 50px;
    margin-right: 30px;
    width: 9%;
    color: #000;
  }

  /*重置图标*/
  .issue_title_reload {
    background: url("../../assets/CompanyIssueImages/reload.png");
    width: 20px;
    height: 20px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }

  .issue_inner {
    height: 1250px;
    width: 96%;
    padding: 30px 20px;
  }

  .issue_inner_1, .issue_inner_2, .issue_inner_3, .issue_inner_4 {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }

  .issue_inner_4 {
    border: none;
  }

  .issue_inner_1_list {
    list-style: none;
  }

  .issue_inner_1_list li {
    width: 96%;
    height: 50px;
    margin-top: 44px;
    float: left;
  }
  .issue_inner_1_list li input {
    width: 290px;
    height: 46px;
    line-height: 46px;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 0 0 0 15px;
    font-size: 18px;
    color: #333;
    background: #fafbfb;
  }
  .issue_inner_1_list .list_textarea {
    height: 300px;
    margin-top: 44px;
    line-height: 30px;
  }

  textarea {
    border-color: #eee;
  }

  .issue_inner_1_list .list_textarea > span {
    margin-top: 10px;
  }

  /*提示*/
  .reminder {
    font-size: 5px;
    display: block;
  }

  /*职位描述*/
  #issue_description {
    width: 90.5%;
    height: 250px;
    resize: none;
  }

  .list_text {
    display: inline-block;
    width: 5em;
    text-align: center;
    float: left;
    line-height: 50px;
  }

  .issue_inner_1_list li > select {
    width: 30%;
    /*//width: 290px;*/
    height: 46px;
    line-height: 46px;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 0 0 0 15px;
    font-size: 18px;
    color: #333;
    background: #fafbfb;
  }

  .issue_inner_1_list li > input {
    width: 88%;

  }

  .issue_inner_1_list .address {
    height: 65px;
  }

  /*工作地址*/
  #address {
    width: 88%;
  }

  .address div a {
    float: right;
    font-size: 10px;
    text-decoration: none;
    margin-right: 10px;
  }



  /*每周几天*/
  .daysAWeek {
    display: inline-block;
    padding: 0 20px;
    height: 30px;
    background-color: #efefef;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
    text-decoration: none;
    color: #343434;
    margin-right: 10px;
  }

  /*当前选项*/
  .currentDays {
    background-color: #02a0e9;
    color: #fff;
  }

  .list_box .currentregular {
    background-color: #02a0e9;
    color: #fff;
  }

  .list_box .currentStudent {
    background-color: #02a0e9;
    color: #fff;
  }

  /*倾向留学生*//*提供转正*/
  .overseasStudent, .regular {
    display: inline-block;
    padding: 0 20px;
    height: 30px;
    background-color: #efefef;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
    text-decoration: none;
    color: #343434;
    margin-right: 10px;
  }

  .issue_inner_5 {
    width: 50%;
    height: 60px;
    margin:0 30px;
  }

  /*发布*/
   #send {
    display: inline-block;
    width: 200px;
    height: 40px;
    font-size: 1.5em;
    background-color: #02a0e9;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    margin-left: 20px;
    float: right;
  }
  /*预览*/
  #preview {
    text-decoration: none;
    text-align: center;
    display: inline-block;
    width: 200px;
    height: 40px;
    font-size: 1.5em;
    background-color: #02a0e9;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    margin-left: 50px;
    float: left;

  }

  .inner_title {
    /*margin-left: 20px;*/
    display: inline-block;
    padding: 10px;
  }

  /*列表子项的div*/
  .list_box {
    width: 100%;
    height: 60px;
    position: relative;
  }

  /*截止日期 语言  学历  大的 select*/
  #endDay, #language, #education {
    width: 30%;
    height: 46px;
    line-height: 46px;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 0 0 0 15px;
    font-size: 18px;
    color: #333;
    background: #fafbfb;
  }

  /*实习开始时间*/
  #endmouth, #endyear, #startmouth, #startyear {
    width: 10%;
    height: 46px;
    line-height: 46px;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 0 0 0 15px;
    font-size: 18px;
    color: #333;
    background: #fafbfb;
  }

  /*职位标签 下的提示*/
  .jobLabel .reminder {
    font-size: 5px;
    color: #ddd;
  }

  /*职位标签*/
  .jobLabel div {
    float: right;
    width: 91%;
  }

  .jobLabel div input {
    width: 97%;
    height: 30px;
  }

  .list_box input {
    width: 88%;
    height: 30px;
    margin-top: 30px;
  }

  input {
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid #eee;
  }
</style>
