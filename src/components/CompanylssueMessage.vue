<template>
  <div id="CompanylssueMessage">
    <div class="left">
      <div class="date">
        <span>时间选择</span>
        <div>
          <date-picker field="myDate" placeholder="请选择开始年月日" v-model="date.start" format="yyyy-mm-dd" backward="true" ></date-picker>
        </div>
        <div>
          <date-picker field="myDate" placeholder="请选择结束年月日" v-model="date.end" format="yyyy-mm-dd"  backward="true" ></date-picker>
        </div>
        <div>
          <button @click="getListAllStudent()">搜索</button>
        </div>
      </div>
      <div class="namelist">
        <p>学生名单</p>
        <div>
          <ul>
            <li v-for="list in studentList" @click="clickGetId(list.id)">
              <p>{{list.name}}</p>
              <p>{{list.userName}}</p>
              <p>-----------------------------</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
        <div class="content-title">
          <span class="title active">门徒求职</span>
        </div>
        <div class="content_a">
          <div class="content_b"  id="content_b">
            <div class="content_c">
              <div v-for="list in data" :class="{'left':list.type==1,'right':list.type==2}">
                <div class="titleName">
                  <span class="spanName" v-if="list.type==2">门徒求职</span>
                  <span class="spanName" v-if="list.type==1">{{list.userName}}</span>
                </div>
                <div class="con">
                  <span>{{list.content}}</span>
                </div>
                <div class="jiao"></div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
          <div class="send_web">
            <input type="text" class="send_text" v-model="sendPost.content"  @keyup="show($event)">
            <button class="send" @click="SendMessage()">发送</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
  export default {
    name: "company-hr",
    data() {
      return {
        date:{
          start:"",
          end:""
        },
        studentList:[],
        //页数
        pageable:{
          pageNumber:[],
          WhetherNotShown:true,
          pageNo:1,
          maxPage:null
        },
        user:{},
        data:{},
        post:{},
        post2:{},
        post3:{},
        sendPost:{},
        user:{}
      }
    },
    mounted() {//初始化
      this.init();
      this.getListAllStudent();
    },
    methods: {
      init:function(){
        let date = new Date();
        this.date.start=data.getYear()+"-"+data.getMonth()+"-"+data.getDate();
        this.date.end=data.getYear()+"-"+(data.getMonth()+1)+"-"+data.getDate();
      },
      //获取学生列表
      getListAllStudent(){
        this.postData2("/api/homepage/listAllStudent",{
          endDate: this.date.end,
          startDate: this.date.start
        }).then((res) => {
          if(res.data.code==0){
            this.studentList=res.data.data;
          }
        })
      },
      //点击学生时触发
      clickGetId(id){
        this.init(id)
      },
      //初始化聊天界面
      init(id){
        this.post.userId=id;
        this.post.companyId="177846429040123904";
        console.log(this.post);
        this.post2={
          userId: this.post.userId,
          companyId:this.post.companyId
        };
        this.post3={
          userId: this.post.userId,
          companyId:this.post.companyId,
          type:'2',
          isRead:'0'
        };
        this.sendPost={
          userId: this.post.userId,
          companyId:this.post.companyId,
          type:'2',
          content:''
        },
        this.post.companyId="177846429040123904";
        this.getMessage();
        this.getMessage2();
      },
      //获取聊天列表
      getMessage(){
        this.postData('/api/homepage/getCommunicationList',{pageNo:this.pageable.pageNo,pageSize:200},this.post2).then((res) => {
          if(res.data.code==0){
            this.data=res.data.data.list.reverse();
            if(res.data.data.list.length!=0){
              this.sendPost.content="";
              if(document.getElementById('content_b').scrollHeight>700){
                let inter = setInterval(function() {
                  document.getElementById('content_b').scrollTop = document.getElementById('content_b').scrollHeight;
                  console.log(document.getElementById('content_b').scrollHeight)

                  if(document.getElementById('content_b').scrollTop!=0){
                    clearInterval(inter);
                  }
                }, 50);
              }
            }
          }else{
            alert(res.data.message)
          }
        }, (err) => {
          console.log(err);
        });
      },
      //获取未读消息列表
      getMessage2(){
        this.postData('/api/homepage/getCommunicationList',{pageNo:this.pageable.pageNo,pageSize:200},this.post3).then((res) => {
          if(res.data.code==0){
            let _this=this;
            if(res.data.data.length!=0){
              res.data.data.forEach(function (element) {
                _this.MarkedRead(element.id);
              })
            }
          }else{
            alert(res.data.message)
          }
        }, (err) => {
          console.log(err);
        });
      },
      //聊天记录表为已读
      MarkedRead(id){
        this.postData('/api/homepage/CommunicationIsRead',{id:id}).then((res) => {
          if(res.data.code==0){
            console.log(id+"标记成功")
          }else{
            alert(res.data.message)
          }
        }, (err) => {
          console.log(err);
        });
      },
      //回车键触发事件
      show:function(ev){
        if(ev.keyCode == 13){
          this.SendMessage();
        }
      },
      //发送消息
      SendMessage(){
        if(this.sendPost.content!=""){
          this.postData('/api/homepage/addCommunication',this.sendPost).then((res) => {
            if(res.data.code==0){
              console.log("发送成功");
              this.getMessage();
            }else{
              alert(res.data.message)
            }
          }, (err) => {
            console.log(err);
          });
        }
      }
    },components:{
      'date-picker': myDatepicker
    }
  };
</script>

<style lang="scss">
  #CompanylssueMessage{
    width: 1080px;
    margin: 0 auto;
    position: relative;
    .date{
      div{
        padding-top: 10px;
        input{
          width: 230px;
          height: 30px;
          border-radius: 5px;
          font-size: 18px;
        }
      }
      button{
        width: 100%;
        height: 40px;
        background: #02a0e9;
        color: aliceblue;
        font-size: 18px;
        border-style: none;
        border-radius: 5px;
      }
    }
    .namelist{
      padding-top: 20px;
      >p{
        font-size: 20px;
        text-align: center;
      }
      >div{
        height: 600px;
        overflow-y: auto;
      }
      li{
        padding: 5px ;
      }
    }
    .left{
      width: 240px;
      padding: 20px;
    }
    .right{
      width: 800px;
      position: absolute;
      right: 0px;
      top:0px;
      .content-title {
        text-align: center;
        height: 59px;
        border-bottom: solid 1px #f5f5f5;
        line-height: 60px;
      }
      .left{
        position: relative;
        padding-bottom: 10px;
        /*max-width: 500px;*/
        .titleName{
          padding-bottom: 10px;
          .spanName{
            font-size: 18px;
          }
          .spanData{
            font-size: 14px;
            color: #ccc;
          }
        }
        .con{
          clear:both;
          border-radius: 5px;
          max-width: 500px;
          background: #6aa2e4;
          padding: 10px 15px;
          color: aliceblue;
          display:inline-block;
          *display:inline;
          *zoom:1;
        }
        .jiao{
          position: absolute;
          height: 0px;
          width: 0px;
          left:40px;
          top:40px;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          border-bottom: 15px solid #6aa2e4;
        }
      }
      .right{
        position: relative;
        padding-bottom: 10px;
        /*max-width: 500px;*/
        .titleName{
          padding-bottom: 10px;
          text-align: right;
          .spanName{
            font-size: 18px;
          }
          .spanData{
            font-size: 14px;
            color: #ccc;
          }
        }
        .con{

          float: right;
          border-radius: 5px;
          max-width: 500px;
          background: #6aa2e4;
          padding: 10px 15px;
          color: aliceblue;
          display:inline-block;
          *display:inline;
          *zoom:1;
          clear:both;
          word-wrap:break-word ;
        }
        .jiao{
          position: absolute;
          height: 0px;
          width: 0px;
          right: 20px;
          top:20px;
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          border-bottom: 15px solid #6aa2e4;
        }
      }
      .clear{
        clear:both;
      }
      .title.active {
        color: #333;
        /* font-weight: bolder; */
        height: 58px;
        border-bottom: 2px solid #333;
      }
      .content_a{
        padding-top: 20px;
      }
      .content_b{
        height: 700px;
        overflow-y: auto;
      }
      .content_c{
        min-height: 700px;
      }
      .title {
        display: inline-block;
        text-align: center;
        font-size: 18px;
        height: 60px;
        width: 120px;
        line-height: 60px;
        color: #cbcbcb;
        cursor: pointer;
      }
      .open-invite {
        position: relative;
        display: inline-block;
        float: right;
        font-size: 16px;
        color: #6aa2e4;
        cursor: pointer;
        right: 20px;
      }
      .not-invite {
        width: 220px;
        margin: 100px auto 20px;
      }
      .send_web{
        width: 100%;
        position: absolute;
        bottom: 0px;
        left: 0px;
        text-align: center;
      }
      .send_text{
        width: 585px;
        padding-left: 15px;
        font-size: 22px;
        height: 50px;
      }
      .send{
        width: 133px;
        height: 54px;
        font-size: 22px;
      }
    }
  }
</style>
