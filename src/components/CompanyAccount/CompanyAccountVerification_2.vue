<template>
  <div class="company-account-verification_2">
    <div class="verification_box">
      <div class="box">
        <div class="box_inner">
          <div class="box_1 blueBox">
            <div class="icon finishIcon"></div>
            <p>信息验证</p>
          </div>
          <div class="box_2 blueBox">
            <div class="icon blueIcon"></div>
            <p>证件验证</p>
          </div>
          <div class="box_3">
            <div class="icon"></div>
            <p>证件成功</p>
          </div>
        </div>
      </div>
    </div>
    <div class="inner_box">
      <h2>请上传企业证明资料</h2>
      <p class="remark">
        情点击下方按钮上传企业营业执照，支持png，jpg，jpeg，gif等图片格
        式点击下方按钮上传营业执照，支持png，jpg，jpeg，gif等图片格式，
        最大不超过2M，为了尽快审核通过请保证上传营业执照真实合法且图片
        清晰。包含营业执照，名片、工牌等其他证明公司的图片
      </p>
      <div style="height: 100px;width: 100%;position: relative">
        <a class="upload" href="javascript:;">
          <span class="grayText">上传</span>
          <span class="blackText">证明材料</span>
        </a>
        <input type="file" style="width: 120px;height: 30px;position: absolute;top: 0px;left: 144px;opacity: 0" @change='onUpload'>
      </div>
      <div>
        <img v-for="list in urls" :src=list alt="" style="width: 200px;height: 200px;">
      </div>
      <div class="btns">
        <router-link class="router" id="prev" to="/companyaccount/companyaccountverification_1">
          上一步
        </router-link>
        <router-link class="router" id="next" to="/companyaccount/companyaccountverification_3">
          下一步
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-account-verification_2",
    data() {
      return {
        cid:"",
        url:"",
        urls:[]
      }
    },
    mounted () {//初始化
      this.cid=window.localStorage.getItem('C_id');
    },
    methods: {
      //上传图片
      onUpload(e){

        let formData = new FormData();
        formData.append('myFile', e.target.files[0]);
        if(e.target.files[0].size/1024/1024>2){
          alert("您的图片大于2M");
        }else{
          this.postData2("/api/fileupload/up",formData).then((res) => {
            if(res.data.code==0){
              this.url=res.data.data.realPath;
              this.urls.push(res.data.data.realPath);
              this.AssociatedSave();
            }else{
              console.log(res.data.message)
            }
          });
        }
      },
      //关联保存
      AssociatedSave:function () {
        this.postData("/api/AccountManage/proofData",{companyId:this.cid,proofData:this.url}).then((res) => {
          if(res.data.code==0){}else{
            alert(res.data.message)
          }
        });
      }
    }
  }
</script>

<style scoped>
  .verification_box {
    width: 100%;
    height: 120px;
    /*background-color: #add;*/
  }

  .box {
    width: 70%;
    height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
  }

  .box_1, .box_2, .box_3 {
    height: 60px;
    width: 60px;
    text-align: center;
    margin-top: 40px;
    float: left;
    display: inline-block;
    font-size: 0.8em;
    color: #aeaeae;
    /*border: 1px solid #eee;*/
  }

  .box_inner {
    width: 109%;
    margin-left: -30px;
  }

  .box_1 {
    float: left;
  }

  .box_2 {
    margin: 40px 38%;

  }

  .box_3 {
    float: right;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    border-radius: 15px;
    border: 1px solid #eee;
    background-color: #fff;
  }

  .blueIcon {
    background-color: #02a0e9;
    border-color: #02a0e9;
  }

  .blueBox {
    color: #02a0e9;
  }

  .finishIcon {
    background: url("../../assets/CompanyAccount/finishLogo.png");
    background-position: center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .inner_box {
    width: 40%;
    margin: 0 auto;
    padding-bottom: 30px;
  }

  .inner_box h2 {
    text-align: center;
  }

  /*上传证明资料*/
  .upload {
    height: 30px;
    width: 100px;
    line-height: 30px;
    padding: 0 10px;
    text-align: center;
    text-decoration: none;
    display: block;
    margin: 30px auto;
    border: 1px solid #02a0e9;
    border-radius: 5px;
  }

  .grayText {
    font-size: 0.8em;
    color: #a8a8a8;
  }

  .blackText {
    color: #000;
  }

  .btns {
    width: 100%;
    height: 30px;
    padding: 30px 0;
  }

  #prev {
    float: left;
    width: 100px;
    height: 30px;
    border: 1px solid #02a0e9;
    border-radius: 5px;
    color: #02a0e9;
  }

  #next {
    float: right;
    width: 100px;
    height: 30px;
    border: 1px solid #02a0e9;
    background-color: #02a0e9;
    border-radius: 5px;
    color: #fff;
  }

  .router {
    text-align: center;
    text-decoration: none;
    line-height: 30px;
  }
  .remark{
    margin-top: 20px;
    font-size: 10px;
    color: #b8b8b8;
  }
</style>
