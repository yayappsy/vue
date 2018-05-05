<template>
	<div class="perfect_information">
		<div>
			<div class="img" style="overflow: hidden;position: relative">
        <div class="img" style="position: absolute;top: 0px;left: 0px;z-index: 10" v-if="lists.avatar==''">上传照片</div>
        <img :src="lists.avatar" style="position:absolute;top: 0px;left: 0px;z-index: 20 ;width: 102px;height: 102px;" alt="" v-if="lists.avatar!=''">
        <input type="file" class="webuploader-element-invisible" name='myFile' style="position:absolute;top:0px;left:0px;width:102px;height:102px;opacity: 0;z-index: 100" @change='onUpload'>
      </div>

			<p>尺寸：120*120px大小：5M</p>
		</div>
		<form>
			<div class="f_l input">
				<div class="f_l text">真实姓名</div>
				<input type="text" name="" placeholder="请填写真实姓名" v-model="lists.name">
			</div>
			<div class="f_l input sex">
				<div class="f_l text">真实性别</div>
				<button :class="{'bg_84b0e5':lists.gender=='1','bg_f':lists.gender==2}" @click="nannv(1)">男</button>
				<button :class="{'bg_f':lists.gender==1,'bg_84b0e5':lists.gender==2}" @click="nannv(2)">女</button>
			</div>
			<div class="f_l input">
				<div class="f_l text">出生年月</div>
        <date-picker field="Month" placeholder="请选择出生年月日" v-model="lists.birth" format="yyyy-mm-dd"  backward="teue" style="width: 250px;float: right;margin-right: 30px;height: 42px;"></date-picker>

			</div>
			<div class="f_l input">
				<div class="f_l text">毕业时间</div>
        <date-picker field="Month" placeholder="请选择出生年月日" v-model="lists.endStudy" format="yyyy-mm-dd"  backward="teue" style="width: 250px;float: right;margin-right: 30px;height: 42px;"></date-picker>
			</div>
			<div class="f_l input">
				<div class="f_l text">所在城市</div>
        <input type="text" name="city" maxlength="15" placeholder="北京" class="v_itm change_sec_inf cc1" value="北京市" v-model="lists.residence.name" v-on:focus="addressSelection=true">
			</div>
			<div class="f_l input">
				<div class="f_l text">最高学历</div>
				<select class="select" v-model="lists.education">
          <option value="专科">专科</option>
          <option value="本科">本科</option>
          <option value="硕士">硕士</option>
          <option value="博士">博士</option>
        </select>
			</div>
			<div class="f_l input">
				<div class="f_l text">学校名称</div>
				<input type="text" name="" v-model="lists.school" placeholder="请填写学校名称">
			</div>
			<div class="f_l input">
				<div class="f_l text">专业</div>
				<input type="text" name="" v-model="lists.majorId" placeholder="请填写所学专业">
			</div>
			<div class="f_l input">
				<div class="f_l text">手机号码</div>
				<input type="text" name="" v-model="lists.mobile" placeholder="请填写手机号码">
			</div>
			<div class="f_l input">
				<div class="f_l text">邮箱地址</div>
				<input type="text" name="" v-model="lists.email" placeholder="请填写邮箱地址">
			</div>
			<div class="f_l w_100">
				<input type="button" name="" @click="save()" value="保存">
			</div>
		</form>
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
	</div>
</template>
<script>
  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
  import { common } from '../js/common.js';
  export default {
    name: 'app',
    data() {//变量
      return{
        addressSelection:"",
        pita:{},
        pita2:{},
        pita3:{},
      lists:{
        age: 0,
        avatar: "",
        birth: "",
        education: "0",
        educationId: "",
        email: "",
        endStudy: "",
        gender: "1",
        id: "",
        majorId: "",
        mobile: "",
        name: "",
        residence: {
          id: "",
          name: "",
        },
        school: ""
      }
      }
    },
    mounted() {
      this.getAreaData();
    },
    methods: {
      nannv(num){
        this.lists.gender=num;
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
        this.lists.residence.id=list.id;
        this.lists.residence.name=list.name;
        this.addressSelection=false;
      },
      //保存
      save () {
        this.lists.id= JSON.parse(window.localStorage.getItem('S_id')).id
        this.postData2("/api/resume/editUser",this.lists).then((res) => {
          if (res.data.code == 0) {
            this.$router.push('./Personal_Center');
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
              this.lists.avatar=res.data.data.realPath;
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
<style>
  #job_addr p{
    padding: 10px 0;
  }
  #job_addr span {
    margin: 3px 5px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
  form{
    height: 500px;
  }
  .perfect_information{
    width:760px;
    margin: auto;
    padding: 20px
  }
  .perfect_information .f_l{
    float: left;
  }
  .perfect_information .img{
    width: 100px;
    height: 100px;
    line-height: 100px;
    overflow: hidden;
    border: 1px solid #ccc;
    margin: auto;
    text-align: center;
    border-radius: 50%;
    color: #ccc;
  }
  .perfect_information p{
    font-size: 15px;
    text-align: center;
    padding: 10px 0;
    color: #ccc;
  }
  .perfect_information form{
    padding: 20px 0 40px;
  }
  .perfect_information .input{
    width:50%;
    padding: 15px 0;
  }
  .perfect_information .input>input,.perfect_information .input>select{
    height: 38px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-left: 10px;
  }
  .perfect_information .input>input{
    width: 250px;
  }
  .perfect_information .input .select{
    width: 250px;
  }
  .perfect_information .input>select{
    width: 130px;
  }
  .perfect_information .text{
    width: 100px;
    text-align: center;
    line-height: 40px;
    color:#ccc;
  }
  .perfect_information .sex>button{
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border-style: none;
  }
  .perfect_information .sex>.bg_f{
    background:#fff;
    color:#ccc;
  }
  .perfect_information .sex>.bg_84b0e5{
    background:#84b0e5;
    color: #fff;
  }
  .perfect_information .w_100{
    width: 100%;
    text-align: center;
  }
  .perfect_information .w_100>input{
    height: 40px;
    width: 130px;
    border-radius: 5px;
    border-style: none;
    background:#84b0e5;
    color: #fff;
  }
</style>
