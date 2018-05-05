<template>
  <div class="company_base_information">
    <div class="main">
      <div class="title">
        <h2>完善公司基本资料</h2>
      </div>
      <div class="information">
        <!--基本信息。。。。。。-->
        <p>{{basecue}}</p>
        <br>
        <!--温馨提示-->
        <p class="warmprompt">{{warmprompt}}</p>
        <form class="company_form" action="">
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>公司名称 </span>
            <input type="text" placeholder="请输入与公司营业执照相同的名称"
                   v-model="data.name" id="companyName">
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>公司简称 </span>
            <input type="text" placeholder="请输入公司简称，如：门徒求职"
                   v-model="data.shortName" id="companyShort">
          </div>
          <div class="company_base_information_inner company_logo">
            <span><b class="redstart">&nbsp;</b>公司Logo </span>
            <div class="companyLogo">
              <div class="add">+</div>
              <div class="logo_upload">上传</div>
              <img :src="data.logo" style="position:absolute;top:20px;left:0px;width:150px;height:150px;z-index: 50" alt="">
              <span style="position:absolute;top:100px;left:50px;width:150px;height:150px;z-index: 10">上传图片</span>
              <input type="file" name='myFile' style="position:absolute;top:20px;left:0px;width:150px;height:150px;opacity: 0;z-index: 100" @change='onUpload'>
              <p class="state">图片不能超过300k</p>
            </div>
            <span class="text">(大小200*200px,小于2M)</span>
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">&nbsp;</b>公司网址 </span>
            <input type="text" placeholder="请输入公司网址"
                   v-model="data.site">
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>联系电话 </span>
            <input type="text" placeholder="请输入您的手机号码或座机号码"
                   v-model="data.phone" id="companyPhoneNumber">
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>企业邮箱 </span>
            <input type="text" placeholder="请输入您的企业邮箱" v-model="data.email" id="companyEmail">
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>所在城市 </span>
            <input type="text" placeholder="请选择所在城市" v-model="areaName" id="companyCity" v-on:focus="addressSelection=true">
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>行业领域 </span>
            <select style="height: 44px;width: 590px;padding-left: 10px;font-size: 16px;color: #999"  v-model="industry" v-on:change="data.industryId=industry">
              <option  v-for="list in IndustryData" :value="list.id">{{list.name}}</option>
            </select>
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>公司规模 </span>

            <select style="height: 44px;width: 590px;padding-left: 10px;font-size: 16px;color: #999" v-model="data.size">
              <option>少于15人</option>
              <option>15-50人</option>
              <option>50-150人</option>
              <option>150-500人</option>
              <option>500-2000人</option>
              <option>2000人以上</option>
            </select>
          </div>
          <div class="company_base_information_inner">
            <span><b class="redstart">*</b>一句话介绍 </span>
            <input type="text" placeholder="一句话概括公司亮点，如公司愿景，领导团队等，限50字"v-model="data.mainBusinessDescription"/>
          </div>
          <div class="company_base_information_inner" style="height: 100px">
            <span><b class="redstart">*</b>公司介绍 </span>
            <textarea type="text" placeholder="请分段详细描述公司简介，企业文化等" v-model="data.introduce" maxlength="1000"></textarea>
          </div>
          <div class="company_base_information_inner companyRecommend_div">
            <span><b class="redstart">&nbsp;</b>公司福利 </span>
            <div class="label_box">
              <div class="label_input_box">
                <input id="label_input" type="text" placeholder="请分段描述公司福利用空格隔开，例：13薪 双休" v-model="data.companyLabels">
              </div>
            </div>
          </div>
          <input id="commit_next" type="button" @click="save()" value="保存,进去Hr中心">
        </form>
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

  </div>
</template>

<script>
  export default {

    name: "company-base-information",
    data() {
      return {
        ta:"500-1000人",
        basecue: '基本信息为必填项，是学生快速了解公司的窗口，请如实认真填写。',
        warmprompt: "温馨提示，为保证企业的真实性，门徒求职已开通企业工商信息查询系统，为了贵公司信誉，\"公司全称\"请勿必填写营业执照上的全称",
        //各个输入框内容变量
        addressSelection:false,
        IndustryData:[],
        industry:"",
        pita:{},
        pita2:{},
        pita3:{},
        areaName:"",
        data:{
          areaId: "",
          companyLabels: "",
          email: "",
          industryId: "",
          introduce: "",
          name: "",
          logo:"",
          phone: "",
          mainBusinessDescription: "",
          shortName: "",
          site: "",
          size: "",
          userInfoId: ""
        }
      }
    },
    mounted () {//初始化
      this.getAreaData();///获取数据
      this.getIndustryData();
      console.log(JSON.parse(window.localStorage.getItem('C_DATA')));
    },
    methods: {
      getAreaData:function(){
        this.data.userInfoId= JSON.parse(window.localStorage.getItem('C_DATA')).id;
        this.getData("/api/basic/region/listTree",{parentId:110000,type:3}).then((res) => {
          this.pita=res.data.data[0].child;
          //console.log(this.pita);
        }, (err) => {
          console.log(err)
        });
      },
      optionClick:function (id) {
        console.log(id)
      },
      getIndustryData:function(){
        console.log(this.pita);
        let _this=this;
        this.getData("/api/publishJob/industryTags",{}).then((res) => {
          this.IndustryData=res.data.data;
          this.IndustryData.forEach(function (element) {
            if(_this.data.industryId==element.id){
              _this.industry=element.name;
            }
          })
          console.log(res.data.data)
        }, (err) => {
          console.log(err)
        });
      },
      //选择地区
      areaClick:function (list) {
        console.log(list)
        this.areaName=list.name;
        this.data.areaId=list.id;
        this.addressSelection=false;
      },
      //保存
      save:function () {
        this.postData2("/api/companyDetail/saveCompany",this.data).then((res) => {

          if(res.data.code==0){
            window.localStorage.setItem('C_id',res.data.data);
            alert(1);
            this.$router.push('./companyhr');
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
              this.data.logo=res.data.data.realPath;
            }else{
              console.log(res.data.message)
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .company_base_information{
    background-color: #f0f0f0;
    min-height: 460px;
    #job_addr {
      width: 400px;
      position: absolute;
      top: 10px;
      left: 0px;
      padding: 10px;
      border: 1px solid #f5f5f5;
      margin: 0;
      z-index: 4;
      /*opacity: 0;*/

      /*filter: alpha(opacity=0);*/
      background: rgb(255, 255, 255);
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
    .sxs--modal--container.sxs--modal--shown{
      opacity: 1;
      z-index: 90;
      -webkit-transform: translate3D(0, 0px, 0);
      -moz-transform: translate3D(0, 0px, 0);
      -ms-transform: translate3D(0, 0px, 0);
      -o-transform: translate3D(0, 0px, 0);
      transform: translate3D(0, 0px, 0);
    }
    .sxs--modal--container
    {
      width: 434px;
      position: absolute;
      top:50%;
      /*bottom:0;*/
      left:0;right:0;
      margin:auto;
      opacity: 0;
      -webkit-transform: translate3D(0, -100px, 0);
      -moz-transform: translate3D(0, -100px, 0);
      -ms-transform: translate3D(0, -100px, 0);
      -o-transform: translate3D(0, -100px, 0);
      transform: translate3D(0, -100px, 0);
    }
    .sxs--modal > .sxs--modal--bg{
      width: 434px;
      padding: 6px;
      height: 0px;
      position: absolute;
      top:0;bottom:0;
      left:0;right:0;margin:auto;
      background: #dfedfd;
      -webkit-transition: all .6s;
      -moz-transition: all .6s;
      -ms-transition: all .6s;
      -o-transition: all .6s;
      transition: all .6s;
    }

    .sxs--modal--bg::before{
      content: '';
      height: 100%;
      width: 100%;
      display: block;
      background: #fff;
    }
    .sxs--modal{
      position: fixed;
      z-index: 9998;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.4);
      width: 100%;
      height: 100%;
    }
    .sxs--modal > .sxs--modal--bg{

    }
    .sxs--modal--content > div,
    .sxs--modal--content > form
    {
      padding: 10px 0;
      margin: 0 36px;
    }
    .sxs--modal--shown{
      -webkit-animation: sxs--modal--shown .6s 1 forwards;
      -o-animation: sxs--modal--shown .6s 1 forwards;
      animation: sxs--modal--shown .6s 1 forwards;
    }

    @keyframes sxs--modal--shown {
      0%{
        opacity: 0;
        -webkit-transform: translate3D(0, 100px, 0);
        -moz-transform: translate3D(0, 100px, 0);
        -ms-transform: translate3D(0, 100px, 0);
        -o-transform: translate3D(0, 100px, 0);
        transform: translate3D(0, 100px, 0);
      }
      100%{
        opacity: 1;
        -webkit-transform: translate3D(0, 0px, 0);
        -moz-transform: translate3D(0, 0px, 0);
        -ms-transform: translate3D(0, 0px, 0);
        -o-transform: translate3D(0, 0px, 0);
        transform: translate3D(0, 0px, 0);
      }
    }
    @keyframes sxs--modal--hiding{
      100%{
        opacity: 0;
        -webkit-transform: translate3D(0, -100px, 0);
        -moz-transform: translate3D(0, -100px, 0);
        -ms-transform: translate3D(0, -100px, 0);
        -o-transform: translate3D(0, -100px, 0);
        transform: translate3D(0, -100px, 0);
      }
      0%{
        opacity: 1;
        -webkit-transform: translate3D(0, 0px, 0);
        -moz-transform: translate3D(0, 0px, 0);
        -ms-transform: translate3D(0, 0px, 0);
        -o-transform: translate3D(0, 0px, 0);
        transform: translate3D(0, 0px, 0);
      }
    }

    .sxs--modal--content > div:last-child{
      padding-bottom: 36px;
    }

    .sxs--modal--text > span,
    .sxs--modal--text > a
    {
      color: #6aa2e4;
      display: inline-block;
      vertical-align: top;
      padding: 0 3px;
    }
    .sxs--modal--text > a:hover{
      text-decoration: none;
    }
    .sxs--modal--btn > span,
    .sxs--modal--btn > a
    {
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
    .sxs--modal--btn > span[data-style='primary'],
    .sxs--modal--btn > span[data-style='primary'][data-modal-form-check='passed'],
    .sxs--modal--btn > a[data-style='primary'],
    .sxs--modal--btn > a[data-style='primary'][data-modal-form-check='passed']
    {
      background: #fafafa;
      border: solid 1px #eaeaea;
      color: #999;
      cursor: pointer;
    }
    .sxs--modal--btn > span[data-style='primary']:hover,
    .sxs--modal--btn > span[data-style='primary'][data-modal-form-check='passed']:hover,
    .sxs--modal--btn > a[data-style='primary']:hover,
    .sxs--modal--btn > a[data-style='primary'][data-modal-form-check='passed']:hover
    {
      border: solid 1px #eaeaea;
      color: #999;
      background: #f5f5f5;
      cursor: pointer;
    }
    .sxs--modal--btn > span[data-style='active'],
    .sxs--modal--btn > span[data-style='active'][data-modal-form-check='passed'],
    .sxs--modal--btn > a[data-style='active'],
    .sxs--modal--btn > a[data-style='active'][data-modal-form-check='passed']
    {
      background: #6aa2e4;
      border: solid 1px #5e98db;
      color: #fff;
      cursor: pointer;
    }
    .sxs--modal--btn > span[data-style='active']:hover,
    .sxs--modal--btn > span[data-style='active'][data-modal-form-check='passed']:hover,
    .sxs--modal--btn > a[data-style='active']:hover,
    .sxs--modal--btn > a[data-style='active'][data-modal-form-check='passed']:hover
    {
      border: solid 1px #5e98db;
      color: #fff;
      background: #5e98db;
      cursor: pointer;
    }
    .sxs--modal--btn > span[data-style='disable'],
    .sxs--modal--btn > span[data-modal-form-check],
    .sxs--modal--btn > span[data-style='disable']:hover,
    .sxs--modal--btn > span[data-modal-form-check]:hover,
    .sxs--modal--btn > a[data-style='disable'],
    .sxs--modal--btn > a[data-modal-form-check],
    .sxs--modal--btn > a[data-style='disable']:hover,
    .sxs--modal--btn > a[data-modal-form-check]:hover
    {
      background: #fafafa;
      border: solid 1px #eaeaea;
      color: #ccc;
      cursor: not-allowed;
    }
    .sxs--modal--btn > a:last-child,
    .sxs--modal--btn > span:last-child{
      margin-right: 0;
    }
    .sxs--modal--content{
      overflow-y: auto;
      overflow-x: hidden;
    }

    .sxs--modal--form>label{
      display: block;
      padding-bottom: 20px;
    }
    .sxs--modal--form>label:last-child{
      padding-bottom: 0;
    }

    .sxs--modal--form>label.sxs--modal--input > input
    {
      padding: 8px;
      border: solid 1px #f5f5f5;
      background: #fafafa;
      line-height: 32px;
      font-size: 16px;
      color: #6aa2e4;
      letter-spacing: 2px;
      -webkit-transition: all .4s;
      -moz-transition: all .4s;
      -ms-transition: all .4s;
      -o-transition: all .4s;
      transition: all .4s;
      outline: none;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
    }
    .sxs--modal--form>label.sxs--modal--input > input:focus{
      border-color: #6aa2e4;
    }
    .sxs--modal--form>label.sxs--modal--input[data-sxs-err="true"] > input{
      border-color: #f68a8a !important;
      color: #f68a8a !important;
      -webkit-box-shadow: inset 0 0 4px 2px rgba(246, 138, 138, 0.61);
      -moz-box-shadow: inset 0 0 4px 2px rgba(246, 138, 138, 0.61);
      box-shadow: inset 0 0 4px 2px rgba(246, 138, 138, 0.61);
    }
    .sxs--modal--form>label.sxs--modal--select > select{
      display: none;
    }
    input{
      padding-left: 10px;
    }


    /*主体*/
    .main {
      width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      /*background-color: #abd;*/
    }

    /*标题*/
     .title {
      text-align: center;
      color: #fff;
      width: 90%;
      height: 60px;
      line-height: 60px;
      background-color: #02a0e9;
      margin: 0 auto;
    }

     .information {
       width: 68.6%;
       background-color: #fff;
       margin: 0 auto;
       padding: 2em 8em;
       height: 1400px;
     }

    /*温馨提示*/
    .warmprompt {
      color: #ff5253;
    }

    /*form表单*/
    .company_form {
      width: 100%;
    }

    /*每一横行 的 div*/
    .company_base_information_inner {
      width: 100%;
      height: 40px;
      margin-top: 30px;
    }

    /* 名称 */
    .company_base_information_inner > span {
      display: inline-block;
      float: left;
      width: 20%;
      height: 100%;
      line-height: 40px;

    }

    /* 每个输入框*/
    .company_base_information_inner input {
      width: 70%;
      height: 40px;
      outline: none;
      font-size: 1em;
    }

    /*文本域*/
    .company_base_information_inner textarea {
      width: 70%;
      height: 100px;
      resize: none;
      outline: none;
      font-size: 1em;
    }

    /*红色 *     */
    .redstart {
      color: #ff5b5f;
    }

    /*公司介绍*/
    .companyRecommend_div {
      height: 200px;
    }

    /*标签*/
    .label_box {
      height: 200px;
      width: 70%;
      outline: none;
      font-size: 1em;

      display: inline-block;
    }

    /*标签   输入框 父div*/
    .label_input_box {
      width: 100%;
      height: 40px;
      border: 1px solid #02a0e9;
    }

    #label_input {
      width: 85%;
      height: 100%;
      border: none;
      outline: none;
    }

    /*贴上按钮*/
    #label_btn {
      border: none;
      width: 15%;
      height: 100%;
      background-color: #02a0e9;
      outline: none;
      float: right;
      color: #fff;
      cursor: pointer;
    }

    /*标签 父div*/
    .company_label_box {
      width: 100%;
      height: 120px;
      height: 20px;
    }

    /*每个 标签*/
    .company_label {
      display: inline-block;
      border: 1px solid #f2f2f2;
      margin: 10px;
      padding: 5px 10px;
      line-height: 30px;
      text-decoration: none;
      color: #000;
    }

    /*保存按钮*/
    #commit_next {
      width: 200px;
      height: 40px;
      background-color: #02a0e9;
      border: none;
      outline: none;
      font-size: 1em;
      color: #fff;
      margin: 0 auto;
      display: block;
      cursor: pointer;
    }

    /*上传文件*/
    .company_logo {
      height: 200px;
    }

    .company_base_information_inner .companyLogo {
      width: 200px;
      height: 200px;
      display: inline-block;
      position: relative;
      float: left;
    }

    .upload_btn {
      width: 150px;
      height: 180px;
      position: absolute;
      top: 0;
      left: 0;
      background: none;
      cursor: pointer;
      outline: none;
    }

    .add {
      font-size: 8em;
      color: #aaa;
      background-color: #fff;
      width: 150px;
      height: 140px;
      line-height: 125px;
      text-align: center;
    }

    .logo_upload {
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #aaa;
      color: #fff;
    }

    .company_logo .text {
      width: auto;
    }
  }
</style>
