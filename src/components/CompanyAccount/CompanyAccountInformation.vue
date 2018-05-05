<template>
  <div class="company_account_information">
    <div class="account_information_title">
      <h4>{{saveCompany.name}}</h4>
    </div>
    <div class="account_information_left">
      <div class="companyName" >
        <h4>{{saveCompany.shortName}}</h4>
        <span>{{saveCompany.mainBusinessDescription}}</span>
      </div>
      <div class="companyInformation" @click="sh=true">
        <span>地点 : {{areaName}}</span>
        <span>领域 : {{industry}}</span>
        <span>规模 : {{saveCompany.size}}</span>
        <span>网址 : {{saveCompany.site}}</span>
        <span>邮箱:{{saveCompany.email}}</span>
      </div>
      <div class="companylabels">
        <span>公司标签:</span>
        <div class="company_label_box">
          <span class="label" v-for="list in getCompanyWealLists">{{list}}</span>
        </div>
        <a class="addLabel" style="cursor: pointer" @click="sh=true">更改</a>
      </div>
      <div class="companyInformation_4">
        <a class="addLabel" style="cursor: pointer;font-size: 13px;" @click="introduce_sh=!introduce_sh" >更改</a>
        <p class="title">公司介绍:</p>

        <div class="introduce" style="font-size: 14px;margin-left: 60px;" v-html="saveCompany.introduce" v-if="introduce_sh" @click="introduce_sh=!introduce_sh"></div>
        <div v-if="!introduce_sh">
          <vue-editor v-model="saveCompany.introduce"></vue-editor>
          <div style="text-align: center">
            <button class="present" @click="save()">保存</button>
            <button class="present" @click="introduce_sh=true">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="account_information_right" style="position: relative">
      <img :src="saveCompany.logo" style="position:absolute;top:20px;left:0px;width:150px;height:150px;z-index: 50" alt="">
      <span style="position:absolute;top:100px;left:50px;width:150px;height:150px;z-index: 10;cursor: pointer;color: #02a0e9;font-size: 13px;">上传图片</span>
      <input type="file" name='myFile' style="position:absolute;top:20px;left:0px;width:150px;height:150px;opacity: 0;z-index: 100" @change='onUpload'>
      <p class="state">图片不能超过300k</p>
    </div>

    <div v-if="sh">
      <div
        style="width: 100%; height: 100%; background: rgb(0, 0, 0); opacity: 0.8; position: fixed; top: 0px; left: 0px; z-index: 1001; cursor: pointer; display: block;" @click="sh=!sh"></div>
      <form class="msg" action="javascript:;" @click.stop="">
        <div class="fun_model_subs"
             style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1002; display: block;">
          <input type="hidden" value="com_6wn2li9m2zu0" name="companyid" id="companyid">
          <ul class="item_box">
            <li>
              <span class="item_title">公司简称</span>
              <input type="text" class="input_box v_itm" name="name" placeholder="请输入公司简称，如:门徒求职" value="门徒求职"
                     maxlength="10" v-model="saveCompany.shortName">
            </li>
            <li class="error_box">
              <span class="item_title">公司网址</span>
              <input type="text" class="input_box v_itm website" name="web_url" placeholder="请输入公司网址" value=""
                     maxlength="150" v-model="saveCompany.site" >
              <!--<span class="error_text">网址格式不对</span>-->
            </li>
            <li>
              <span class="item_title">所在城市</span>
              <input type="text" class="input_box v_itm website" v-model="areaName" name="web_url" placeholder="请输入公司网址" value="" maxlength="150" v-on:focus="addressSelection=true">
            </li>
            <li>
              <span class="item_title">行业领域</span>
              <select style="width: 366px; margin-left: 10px;height: 40px;line-height: 35px;border-radius: 5px;border: 1px solid #ddd;padding-left: 10px" v-model="saveCompany.industryId">
                <option v-for="list in IndustryData" :value="list.id">{{list.name}}</option>
              </select>
            </li>
            <li>
              <span class="item_title">公司规模</span>
              <select style="width: 366px; margin-left: 10px;height: 40px;line-height: 35px;border-radius: 5px;border: 1px solid #ddd;padding-left: 10px" v-model="saveCompany.size">
                <option value="少于15人">少于15人</option>
                <option value="15-50人">15-50人</option>
                <option value="50-150人">50-150人</option>
                <option value="150-500人">150-500人</option>
                <option value="500-2000人">500-2000人</option>
                <option value="2000人以上">2000人以上</option>
              </select>
            </li>
            <li>
              <span class="item_title">简短介绍</span>
              <input type="text" class="input_box temptation v_itm" name="description" maxlength="50"
                     placeholder="一句话描述公司优势，核心价值，限50字" value="主要做大学生的职业培训业务" v-model="saveCompany.mainBusinessDescription">
            </li>
            <li>
              <span class="item_title">公司邮箱</span>
              <input type="text" class="input_box temptation v_itm" name="description" maxlength="50"
                     placeholder="1@qq.com" value="主要做大学生的职业培训业务" v-model="saveCompany.email">
            </li>
            <li>
              <span class="item_title">公司标签</span>
              <input type="text" class="input_box temptation v_itm" name="companyLabels" maxlength="50" placeholder="标注公司的特点,用空格隔开;例:16薪 双休 妹子多"  v-model="saveCompany.companyLabels">
            </li>
            <li class="present_box">
              <button class="present sure" id="submit_btn" @click="save()">保存</button>
              <button class="present" id="close_btn" @click="sh=!sh">取消</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
    <div class="sxs--modal" v-if="addressSelection" style="z-index: 9999"  @click="addressSelection=false;">
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
              <span v-for="list in pita2" @click="pita3=list.child">{{list.name}}</span>
            </div>
            <div>
              <p>区</p>
              <span v-for="list in pita3" @click="areaClick(list)">{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'

  export default {
    name: "company-account-information",
    data() {
      return {
        sh:false,
        introduce_sh:true,
        industry:"",
        pita:{},
        pita2:{},
        pita3:{},
        areaName:"",
        cid:"",
        IndustryData:[],
        addressSelection:false,
        getCompanyWealLists:[],
        saveCompany:{
          areaId: "",
          companyLabels: "",
          email: "",
          id: "",
          industryId: "",
          introduce: "",
          mainBusinessDescription: "",
          name: "",
          phone: "",
          shortName: "",
          site: "",
          logo:"",
          size: "",
          userInfoId: ""
        },
      }
    },
    mounted () {//初始化
      this.cid=window.localStorage.getItem('C_id');
      this.getAreaData();///获取数据
      this.getIndustryData();
      this.getCompanyInfo();

    },
    methods: {
      //获取地区数据
      getAreaData:function(){
        this.saveCompany.userInfoId= JSON.parse(window.localStorage.getItem('C_DATA')).id;
        this.getData("/api/basic/region/listTree",{parentId:110000,type:3}).then((res) => {
          this.pita=res.data.data[0].child;
        }, (err) => {
          console.log(err)
        });
      },
      //获取公司标签
      getCompanyWeal:function () {
        let _this=this;
        this.saveCompany.companyLabels="";
        this.postData("/api/companyDetail/getCompanyWeal",{companyId:this.cid},{}).then((res) => {
          if(res.data.code==0){
            this.getCompanyWealLists=res.data.data;
            this.getCompanyWealLists.forEach(function (element) {
              _this.saveCompany.companyLabels+=element+" ";
            })
            console.log(this.saveCompany.companyLabels);
          }else{
            console.log(res.data.message)
          }
        });

      },
      //获取信息
      getCompanyInfo:function () {
        this.postData("/api/companyDetail/companyInfo",{companyId:this.cid},{}).then((res) => {
          if(res.data.code==0){
            this.areaName=res.data.data.area.name;
            this.industry=res.data.data.industry.name;
            this.saveCompany={
              areaId: res.data.data.area.id,
              companyLabels: res.data.data.companyLabels,
              email: res.data.data.email,
              id: res.data.data.id,
              industryId: res.data.data.industry.id,
              introduce: res.data.data.introduce,
              mainBusinessDescription: res.data.data.mainBusinessDescription,
              name: res.data.data.name,
              phone: res.data.data.phone,
              shortName: res.data.data.shortName,
              site: res.data.data.site,
              logo:res.data.data.logo,
              size: res.data.data.size,
              userInfoId: res.data.data.userInfoId
            };
            //this.$router.push('./companyhr');
            this.getCompanyWeal();
          }else{
            console.log(res.data.message)
          }
        });
      },
      getIndustryData:function(){
        //let _this=this;
        this.getData("/api/publishJob/industryTags",{}).then((res) => {
          this.IndustryData=res.data.data;
        }, (err) => {
          console.log(err)
        });
      },
      //选择地区
      areaClick:function (list) {
        this.areaName=list.name;
        this.saveCompany.areaId=list.id;
        this.addressSelection=false;
      },
      //保存
      save:function () {
        this.saveCompany.id=this.cid;
        this.postData2("/api/companyDetail/updateCompany",this.saveCompany).then((res) => {
          if(res.data.code==0){
            this.sh=false;
            this.introduce_sh=true;
          }else{
            console.log(res.data.message)
          }
          //console.log(res);
          //向页面输出数据
        }, (err) => {
          console.log(err)
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
            console.log(res.data.code);
            if(res.data.code==0){

              this.saveCompany.logo=res.data.data.realPath;
              console.log(this.saveCompany.logo);
              this.save();
            }else{
              console.log(res.data.message)
            }
          });
        }
      }

    },
    components: {
      VueEditor
    }
  }
</script>

<style scoped>
  .introduce:hover{
    background-color: #ccc;
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
  .fun_model_subs ul input, .fun_model_subs ul li>dl {
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    vertical-align: middle;
  }
  .fun_model_subs ul li>dl {
    display: inline-block;
    width: 365px;
    height: 40px;
    position: relative;
  }
  .fun_model_subs .input_box {
    width: 350px;
    height: 40px;
    line-height: 35px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
  }
  .fun_model_subs ul li>dl>dd {
    display: none;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 2;
  }
  .pad_5 {
    padding: 5px;
  }
  .pad_5 dd {
    cursor: pointer;
  }
  .present {
    font-size: 20px;
    outline: none;
    border: none;
    background: #02a0e9;
    color: #fff;
    border-radius: 5px;
    width: 120px;
    height: 40px;
    margin: 10px 0 0 70px;
    cursor: pointer;
  }
  .v_itm {
    -webkit-transition: border .3s;
    transition: border .3s;
  }
  .fun_model_subs ul input {
    width: 350px;
    height: 35px;
    line-height: 35px;
    padding: 0 0 0 15px;
    font-size: 14px;
    color: #333;
  }
  .fun_model_subs {
    width: 540px;
    margin: auto;
    padding: 20px 0;
    background: #fff;
    display: none;
    border-radius: 10px;
  }
  input {
    outline: none;
    font-family: "Microsoft YaHei",Arial,Verdana;
  }
  .item_box {
    width: 450px;
    margin: auto;
  }
  .fun_model_subs ul li {
    margin-top: 20px;
  }
  .fun_model_subs input.input_box {
    width: 350px;
  }
  .fun_model_subs .input_box {
    width: 350px;
    height: 40px;
    line-height: 35px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
  }
  .fun_model_subs ul input, .fun_model_subs ul li>dl {
    margin-left: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    vertical-align: middle;
  }
  .company_account_information {
    padding-left: 20px;
  }

  .account_information_title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eee;
  }

  .account_information_left {
    width: 80%;
    float: left;
    padding-bottom: 20px;
  }

  .account_information_right {
    width: 18%;
    float: right;
  }

  /*公司简称*/
  .companyName {
    height: 60px;
    line-height: 60px;
  }

  .companyName * {
    float: left;
    margin-right: 20px;
  }

  .companyName span {
    font-size: 0.8em;
  }

  /*公司信息*/
  .companyInformation {
    font-size: 0.8em;
    height: 30px;
    /*line-height: 30px;*/
  }

  .companyInformation span {
    margin-right: 20px;
  }

  .companylabels {
    height: 45px;
  }

  .companylabels * {
    display: inline-block;
    float: left;
    font-size: 0.8em;
  }

  /*公司标签*/
  .label {
    display: inline-block;
    padding: 2px 10px;
    background-color: #02a0e9;
    margin-left: 20px;
    border-radius: 3px;
    color: #fff;
    text-decoration: none;
  }

  .company_label_box {
    border-bottom: 1px solid #eee;
    width: 80%;
    padding-bottom: 20px;
  }

  .companyLogo {
    width: 150px;
    height: 150px;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 20px;
  }

  .state {
    width: 150px;
    text-align: center;
    font-size: 0.5em;
    color: #ddd;
    margin-top: 5px;
  }

  .addLabel {
    float: right;
    color: #02a0e9;
    text-decoration: none;
  }

  .companyInformation_3 {
    height: 150px;
    width: 90%;
    padding-left: 4em;
  }

  .title {
    font-size: 0.8em;
    margin: 20px 0;
  }

  .inner {
    font-size: 0.8em;
  }

  .labels {
    width: 80%;
    float: left;
  }

  .companyInformation_3 .labels .label {
    margin: 10px;
    font-size: 0.8em;
    color: #000;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 3px;
  }

  .reload {
    width: 25px;
    height: 25px;
    background: url("../../assets/CompanyAccount/reload.png");
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
  }

  .companyInformation_4 {
    padding-bottom: 20px;
  }
</style>
