<template>
  <div class="company_notifition">
    <div class="main">

    </div>
  </div>
</template>

<script>
  export default {
    name: "company-notifition",
    data() {
      return {
        messages:[
          {
            title:'审核消息',
            detail:'您发布的职位【产品经理实习】审核通过啦！',
            time:'2017-09-14 11:17:08',
            showFlag:'true',
          },
          {
            title:'审核消息',
            detail:'赶紧去应聘管理中心查看简历吧',
            time:'',
            showFlag:'fales',
          },
          {
            title:'审核消息',
            detail:'您发布的职位【产品经理实习】审核通过啦！',
            time:'2017-09-14 11:17:08',
            showFlag:'true',
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .company_notifition {

  }

  /*主体*/
  .main {
    width: 1200px;
    margin: 0 auto;
    /*background-color: #abd;*/
  }
</style>
