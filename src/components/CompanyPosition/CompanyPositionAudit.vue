<template>
  <!--bushi-->
  <div class="company_position_audit">
    <div class="position_audit_title">
      <h3><span class="colorText">{{audits.length}}</span>个招聘中职位</h3>
      <p>简历处理率提升至70%以上，可增加一次只为刷新次数</p>
    </div>
    <!--详细列表内容-->
    <div class="position_audit_inner">
      <div class="table_title">
        <span class="table_inner_checkBox"></span>
        <span class="audit_positionName">职位名称</span>
        <span class="title_nbsp">|</span>
        <span class="audit_applicationecord">申请记录</span>
        <span class="title_nbsp">|</span>
        <span class="audit_educationrequirements">学历要求</span>
        <span class="title_nbsp">|</span>
        <span class="audit_workCity">工作城市</span>
        <span class="title_nbsp">|</span>
        <span class="audit_upDateTime">更新时间</span>
        <span class="title_nbsp">|</span>
        <span class="audit_operation">操作</span>
      </div>
      <ul class="table_inner">
        <li v-for="audit in audits">
          <input class="table_inner_checkBox" type="checkbox">
          <span class="audit_positionName">{{audit.positionName}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="audit_applicationecord">{{audit.applicationecord.deliver}}投递(<span class="colorText">{{audit.applicationecord.dispose}}</span>未处理,{{audit.applicationecord.filter}}过滤)</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="audit_educationrequirements">{{audit.educationrequirements}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="audit_workCity">{{audit.workCity}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="audit_upDateTime">{{audit.upDateTime}}</span>
          <span class="title_nbsp">&nbsp;</span>
          <span class="audit_operation">
            <a href="javascript:;">刷新</a>
            <a href="javascript:;">修改</a>
            <a href="javascript:;">下载</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="position_audit_foot">
      <div class="position_audit_foot_left">
        <input class="position_audit_selectAll" type="checkbox">
        <span>全选</span>
        <a href="javascript:;">下线</a>
        <a href="javascript:location.reload(true);">刷新</a>
      </div>
      <div class="position_audit_foot_right">
        <a href="javascript:;">尾页</a>
        <a href="javascript:;">上一页</a>
        <a href="javascript:;" class="current">1</a>
        <a href="javascript:;">下一页</a>
        <a href="javascript:;">首页</a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "company-position-audit",
      data() {
        return {
          audit_count: 1,
          audits: [
            {
              //职位名称
              positionName: "产品经理实习",
              // 申请记录
              applicationecord: {
                deliver: 7,
                dispose: 7,
                filter: 0,
              },
              educationrequirements: "不限",
              workCity: "北京",
              upDateTime: "2017-09-14 11:17:04",
            }
          ]
        }
      }
    }
</script>

<style scoped>
  .company_position_audit {
    padding: 10px 20px;
    width: 96%;
    /*height: 96%;*/
  }

  /*标题  n个招聘中职位*/
  .position_audit_title {
    width: 100%;
    height: 60px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
  }

  .colorText {
    color: #ff4d4e;
  }

  /*列表标题*/
  .position_audit_inner .table_title {
    color: #b5b5b5;
    height: 30px;
    width: 100%;
    line-height: 30px;
    overflow: hidden;
    margin-top: 20px;
  }

  /*职位名称*/
  .audit_positionName, .audit_applicationecord, .audit_upDateTime, .audit_operation {
    width: 18.2%;
    height: 100%;
    display: inline-block;
    text-align: center;
  }

  .audit_operation a {
    color: #78bfef;
    text-decoration: none;
    padding: 0 10px;
  }

  .audit_educationrequirements, .audit_workCity {
    width: 8%;
    height: 100%;
    display: inline-block;
    text-align: center;
  }

  /*竖线和空格*/
  .title_nbsp {
    display: inline-block;
    width: 0.5%;
    height: 100%;
    text-align: center;
  }

  /*表格内容*/
  .position_audit_inner .table_inner {
    list-style: none;
    width: 100%;
    overflow: hidden;
  }

  /*复选框*/
  .table_inner_checkBox {
    display: inline-block;
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 17px;
  }
  /*列表 中的 li*/
  .position_audit_inner .table_inner li {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
  }
  /*底部 全选 下线 刷新   分页*/
  .position_audit_foot{
    width: 100%;
    height: 30px;
    margin: 50px 0;
    overflow: hidden;
  }
  /*底部左侧*/
  .position_audit_foot_left{
    float: left;
    overflow: hidden;
    height: 100%;
    width: 30%;
    line-height: 30px;
    color: #575757;
  }
  /* 下线 刷新*/
  .position_audit_foot_left a{
    margin: 0 10px;
    text-decoration: none;
    color: #575757;
  }
  /*全选*/
  .position_audit_selectAll{
    display: inline-block;
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 8px;
  }
  /*底部右侧*/
  .position_audit_foot_right{
    float: right;
  }
  /*分页按钮 */
  .position_audit_foot_right a{
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
  .position_audit_foot_right .current{
    background-color: #02a0e9;
    color: #fff;
  }
</style>
