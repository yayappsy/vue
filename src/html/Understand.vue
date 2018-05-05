<template>
    <div class="Understand">
      <div class="logo"><img src="../img/Understand/logo2.png"></div>
      <div class="conter">
        <div class="left">

            <div class="QRCode">
              <img src="../img/Understand/huaerjiegongzhonghao.jpg">
              <p>华尔街公众号</p>
            </div>
          <div class="QRCode">
            <img src="../img/Understand/mentugongzhonghao.jpg">
            <p>门徒求职公众号</p>
          </div>
          </div>
        <div class="right">
          <p class="right_title">公司简介</p>
          <div class="paragraph_aggregate">
            <p class="paragraph">门徒求职（Mentor Offer）是国内领先的大学生泛金融求职服务领导品牌，由北京图灵伟业科技有限公司发起，深耕金融行业，致力于为海内外学子提供一站式求职解决方案，搭建广大学子迈向知名金融机构的桥梁，引领大学生迈好职场第一步</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'app',
    data () {//变量
      return {

      }
    },
    mounted () {
    },
    methods:{}
  }
</script>
<style>
  .Understand{
    width: 1080px;
    margin: auto;
    background-color: #fafafa ;
    color: #666;
  }
  .Understand .logo img{
    width: 100%;
  }
  .Understand .conter{
    width: 100%;
    margin-top: 20px;
    padding: 20px 0px;
    min-height: 600px;
  }
  .Understand .conter>*{
    display: inline-block;
  }
  .Understand .left{
    width: 150px;
    float: left;
  }
  .Understand .left_title{
    width: 150px;
    text-align: center;
    background: #fff;
    line-height: 35px;
    font-size: 17px;
    height: 35px;
    position: relative;
  }
  .Understand .bg_bule{
    width: 2px;
    background: #69a2e5;
    height: 35px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .Understand .QRCode_aggregate{
    width: 100%;
    padding: 25px 0;
  }
  .Understand .QRCode{
    margin: auto;
    text-align: center;
    font-size: 15px;
    padding: 10px 0;
  }
  .Understand .QRCode>img{
    width: 87px;
    height: 87px;
    border-style: none;
  }
  .Understand .right{
    width: 870px;
    padding: 0 30px;
    float: right;
  }
  .Understand .right_title{
    line-height: 35px;
    font-size: 19px;
    color: #69a2e5;
  }
  .Understand .paragraph_aggregate{
    padding: 25px 0;
  }
  .Understand .paragraph{
    font-size: 15px;
    padding: 10px 0;
  }
</style>
