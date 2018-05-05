<!--聊天界面-->
<template>
  <div id="chat">
    <div class="history">

    </div>
    <div class="send_content"></div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {//变量
      return {

      }
    },
    mounted () {//初始化
      this.CompanyData=JSON.parse(this.$route.params.CompanyData);//获取传过来的值
      console.log(this.CompanyData);
    },
    methods:{//方法

    }
  }
</script>
<style lang="scss">
  #chat{

  }
</style>
