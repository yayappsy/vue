<template>
  <div class="company_position_recruiting">
    <div class="position_recruiting_title" style="position:relative">
      <h3><span class="colorText">{{jobDtos.length}}</span>个招聘中职位</h3>
      <div class="filter_title_right" style="position: absolute;right: 0px;top:15px;">
        <div>
          <input id="filter_title_right_input" placeholder="姓名或学校" type="text" v-model="UploadData.jobName">
          <input id="filter_title_right_btn" type="button" @click="initdata()">
        </div>
      </div>
    </div>
    <!--详细列表内容-->
    <div class="position_recruiting_inner">
      <div class="table_title">
        <span class="table_inner_checkBox"></span>
        <span class="recruiting_positionName">职位名称</span>
        <span class="title_nbsp">|</span>
        <span class="recruiting_applicationecord">申请记录</span>
        <span class="title_nbsp">|</span>
        <span class="recruiting_educationrequirements">学历要求</span>
        <span class="title_nbsp">|</span>
        <span class="recruiting_workCity">工作城市</span>
        <span class="title_nbsp">|</span>
        <span class="recruiting_upDateTime">更新时间</span>
        <span class="title_nbsp">|</span>
        <span class="recruiting_operation">操作</span>
      </div>
      <ul class="table_inner">
        <li v-for="list in jobDtos">
          <input class="table_inner_checkBox checkbox" type="checkbox" @click="checkBoxClick(list)">
          <span class="recruiting_positionName">{{list.name}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="recruiting_applicationecord">{{list.deliver}}投递(<span class="colorText">{{list.dispose}}</span>未处理,{{list.filter}}过滤)</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="recruiting_educationrequirements">{{list.education}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="recruiting_workCity">{{list.area.name}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="recruiting_upDateTime">{{list.updateTime}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="recruiting_operation">
            <a @click="fresh(list.id)">刷新</a>
            <router-link :to="{name:'CompanyIssueRelease2',params: { list:JSON.stringify({list})}}">修改</router-link>
            <a @click="lineOff(list.id)">下线</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="position_recruiting_foot">
      <div class="position_recruiting_foot_left">
        <input class="position_recruiting_selectAll" type="checkbox" id="Q_checkBox" @click="Q_checkBoxClick()">
        <span @click="Q_checkBoxClick()">全选</span>
        <a @click="fresh()">下线</a>
        <a @click="fresh()">刷新</a>
      </div>
        <div id="pagebar" class="pagination" v-if="pageable.WhetherNotShown" style="float: right;width: 735px; margin-top: 0">
          <ul style="float: right">
            <li :class="{'disabled':pageable.pageNo<=1}" @click="TurnThePage(1)"><a>首页</a></li>
            <li :class="{'disabled':pageable.pageNo<=1}" @click="TurnThePage(pageable.pageNo-1)"><a>上一页</a></li>
            <li v-for="list in pageable.pageNumber" :class="{'active':list.active}" @click="TurnThePage(list.Number)"><a>{{list.Number}}</a></li>
            <li :class="{'disabled':pageable.pageNo>=pageable.maxPage}" @click="TurnThePage(pageable.pageNo+1)"><a>下一页</a></li>
            <li :class="{'disabled':pageable.pageNo>=pageable.maxPage}" @click="TurnThePage(pageable.maxPage)"><a>尾页</a></li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "company-position-recruiting",
    data() {
      return {
        recruiting_count: 1,
        UploadData:{
          companyId:"",
          jobName:"",
          state:"",
        },
        ids:[],
        jobDtos:[],
        //页数
        pageable:{
          pageNumber:[],
          WhetherNotShown:true,
          pageNo:1,
          maxPage:null,
          pageSize:10
        },
        jRData:[],
        tf:false
      }
    },
    mounted() {//初始化
      this.UploadData.companyId=window.localStorage.getItem("C_id")
      this.initdata();
    },
    methods: {
      //初始化
      initdata:function () {
        this.postData("/api/jobManager/jobSearch",{companyId:this.UploadData.companyId,jobName:this.UploadData.jobName,state:1,pageNo:this.pageable.pageNo,pageSize:this.pageable.pageSize}).then((res) => {
          if(res.data.code==0){
            let able=res.data.data.pageable;
            let Number = Math.ceil(able.count/this.pageable.pageSize);
            this.pageable.maxPage=Math.ceil(able.count/this.pageable.pageSize);
            this.jobDtos=res.data.data.jobDtos;
            console.log(able)
            if(Number<=1){
              this.pageable.WhetherNotShown=false;
              console.log(this.pageable.WhetherNotShown);
            }else {
              this.pageable.pageNumber=[];
              this.pageable.WhetherNotShown=true;
              for(let i=1;i<=Number;i++){
                if(i==this.pageable.pageNo){
                  this.pageable.pageNumber.push({
                    Number:i,
                    active:true
                  })
                }else{
                  this.pageable.pageNumber.push({
                    Number:i,
                    active:false
                  })
                }
              }
            }
          }
        });
      },
      //翻页
      TurnThePage:function (t) {
        if(t>=1&&t<=this.pageable.maxPage){
          this.pageable.pageNo=t;
          this.initdata();
        }
      },
      //刷新职位
      fresh(listId){
        let ids2="";
        if(listId){
          this.ids=[];
          ids2=listId;
          $('.checkbox').attr('checked',false);
        }else{
          this.ids.forEach(function (element) {
            ids2+=element;
          })
        }
        this.postData("/api/jobManager/fresh",{ids:ids2},{}).then((res)=>{
          if(res.data.code==0){
            this.ids=[];
            this.initdata();
          }else{
            console.log(res.data)
          }
        })
      },
      //下线职位
      lineOff(listId){
        let ids2="";
        if(listId){
          this.ids=[];
          ids2=listId;
          $('.checkbox').attr('checked',false);
        }else{
          this.ids.forEach(function (element) {
            ids2+=element;
          })
        }
        this.postData("/api/jobManager/lineOff",{ids:ids2},{}).then((res)=>{
          if(res.data.code==0){
            this.ids=[];
            this.initdata();
          }else{
            console.log(res.data)
          }
        })
      },
      //多选
      checkBoxClick:function (list) {
        let index=this.ids.indexOf(list.id);
        if(index<0){
          this.ids.push(list.id);
        }else{
          this.ids.splice(index.id,1);
        }
        console.log(this.ids)
      },
      //全选选添加或删除
      Q_checkBoxClick:function () {
        if(!this.tf){
          $('.checkbox').attr('checked',true);
          let _this=this;
          this.jobDtos.forEach(function (element) {
            _this.ids.push(element.id)
          })
          this.tf=false;
        }else{
          $('.checkbox').attr('checked',false);
          this.ids=[];
          this.tf=true;
        }
        console.log(this.ids)
      }
    }

  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
  .company_position_recruiting {
    padding: 10px 20px;
    width: 96%;
    /*height: 96%;*/
  }

  /*标题右部*/
  .filter_title_right {
    display: inline-block;
    float: right;
    width: 21%;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    overflow: hidden;
  }

  /*标题右部输入框*/
  #filter_title_right_input {
    border: none;
    background-color: initial;
    float: left;
    width: 78%;
    height: 30px;
    outline: none;
    padding-left: 10px;
  }

  /*标题右部按钮*/
  #filter_title_right_btn {
    width: 16%;
    height: 30px;
    border: none;
    background-image: url("../../assets/CompanyEmploy/serach.png");
    background-position: center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    outline: none;
  }
  /*标题  n个招聘中职位*/
  .position_recruiting_title {
    width: 100%;
    height: 60px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
  }

  .colorText {
    color: #ff4d4e;
  }

  /*列表标题*/
  position_recruiting_inner *{
   font-size: 14px;
  }
  .position_recruiting_inner .table_title {
    color: #b5b5b5;
    height: 30px;
    width: 100%;
    line-height: 30px;
    overflow: hidden;
    font-size: 14px;
    margin-top: 10px;
    background: #f3f3f3;
    color: #999;
    padding: 5px 0px;
  }

  /*职位名称*/
  .recruiting_positionName, .recruiting_applicationecord, .recruiting_upDateTime, .recruiting_operation {
    width: 16%;
    height: 100%;
    display: inline-block;
    text-align: center;
    color: #1c4f70;
  }

  .recruiting_operation a {
    color: #78bfef;
    text-decoration: none;
    padding: 0 10px;
  }

  .recruiting_educationrequirements, .recruiting_workCity {
    width: 13%;
    height: 100%;
    display: inline-block;
    text-align: center;
    color: #1c4f70
  }

  /*竖线和空格*/
  .title_nbsp {
    display: inline-block;
    width: 0.5%;
    height: 100%;
    text-align: center;
  }

  /*表格内容*/
  .position_recruiting_inner .table_inner {
    list-style: none;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
  }

  /*复选框*/
  .table_inner_checkBox {
    display: inline-block;
    width: 14px;
    height: 18px;
    float: left;
    margin-top: 17px;
  }
  /*列表 中的 li*/
  .position_recruiting_inner .table_inner li {
    width: 100%;
    /*height: 50px;*/
    line-height: 50px;
    border-bottom: 1px solid #eee;
  }
  /*底部 全选 下线 刷新   分页*/
  .position_recruiting_foot{
    width: 100%;
    height: 30px;
    margin: 50px 0;
    overflow: hidden;
  }
  /*底部左侧*/
  .position_recruiting_foot_left{
    float: left;
    overflow: hidden;
    height: 100%;
    width: 200px;
    line-height: 30px;
    color: #1c4f70;
    font-size: 14px;

  }
  /* 下线 刷新*/
  .position_recruiting_foot_left a{
    margin: 0 10px;
    text-decoration: none;
    color: #1c4f70;
  }
  /*全选*/
  .position_recruiting_selectAll{
    display: inline-block;
    width: 14px;
    height: 16px;
    float: left;
    margin-top: 8px;
  }
  /*底部右侧*/
  .position_recruiting_foot_right{
    float: right;
  }
  /*分页按钮 */
  .position_recruiting_foot_right a{
    float: right;
    display: inline-block;
    border-radius: 5px;
    background-color: #f5f5f5;
    margin: 0 5px;
    padding: 2px 10px;
    color: #b3b3b3;
    text-decoration: none;
  }
  /*当前 分页*/
  .position_recruiting_foot_right .current{
    background-color: #02a0e9;
    color: #fff;
  }
</style>
