// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue';
import CompanyLogin from './CompanyLogin';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

//接口地址
Vue.prototype.c_url = "http://39.106.117.195:8080/disciple-front";

//是否登录
Vue.prototype.iflogin = false;

//接口get方法
Vue.prototype.getData= function (url,data) {
  let token="";
  if(window.localStorage.getItem("token")){
    token=window.localStorage.getItem("token");
  }
  return axios({
    method: 'get',
    url: url,
    headers:{'token':token},
    params: data,
    baseURL:Vue.prototype.c_url,
  })
}
Vue.prototype.getData2= function (url,data) {
  //let Z_data={};
  return axios({
    method: 'get',
    dataType: "json",
    url: url,
    params: data,
  })
}

//接口Post方法
Vue.prototype.postData= function (url,data,data2) {
  //let Z_data={};
  return axios({
    method: 'post',
    url: url,
    //contentType: "application/json",
    params: data,
    data:data2,
    baseURL:Vue.prototype.c_url,
  })
}

//接口Post方法
Vue.prototype.postData2= function (url,data) {
  //let Z_data={};
  return axios({
    method: 'post',
    url: url,
    contentType: "application/json",
    data: data,
    baseURL: Vue.prototype.c_url,
  })
}

// 接口post方法
//修改密码
Vue.prototype.modifyPasssword=function (token,data) {
  axios({
    method: 'post',
    url: '/api/member/password/reset',
    // accept:"*/*",
    headers:{'token':token},
    data: data,
    baseURL: Vue.prototype.c_url,
  }).then(function (res) {
    if(res.data.code==0){
      alert("密码修改成功！！！");
    }else{
      alert(res.data.message);
    }
  })
}
//修改密码

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<CompanyLogin/>',
  components: { CompanyLogin }
})
