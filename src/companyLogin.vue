<template>
  <div id="companyLogin">
    <companyhead></companyhead>
    <router-view/>
    <companyfoot></companyfoot>
  </div>
</template>

<script>
  import CompanyHead from './components/CompanyHead';
  import CompanyFoot from './components/CompanyFoot';
  export default {
    name: 'companyLogin',
    // router,
    data() {
      return {
        student_enter: '',
      }
    },
    components: {
      "companyhead": CompanyHead,
      "companyfoot": CompanyFoot,
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: PingFang SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    /*color: #333;*/
    list-style: none;
  }

  /*主体*/
  .main {
    width: 1080px;
    margin: 0 auto;
    min-height: 860px;
    /*background-color: #abd;*/
  }
  #pagebar {
    text-align: center;
    margin: 35px 0 30px 0;
    font-size: 14px;
  }
  #pagebar li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    line-height: 30px;
    margin: 0 10px 10px 0;
    background: #b5d5e8;
    -webkit-transition: .2s;
    -moz-transition: .2s;
    transition: .2s;
    border-radius: 6px;
  }
  #pagebar li:hover {
    background: #6aa2e4;
  }
  #pagebar li a {
    display: block;
    text-align: center;
    min-width: 10px;
    padding: 0 10px;
    color: #fff;
    text-decoration: none;
  }
  #pagebar .active {
    background: #6aa2e4;
  }
  #pagebar .disabled {
    padding: 0 10px;
    cursor: default;
    color: #999;
    background-color: #f5f5f5;
  }
  #pagebar .disabled:hover {
    background: #b5d5e8;
    color: #fff;
  }
  a{
    text-decoration: none;
  }
  .sxs--modal--container.sxs--modal--shown{
    opacity: 1;
    z-index: 9999;
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
</style>
