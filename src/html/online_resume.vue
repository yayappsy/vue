<!-- 在线简历 -->
<template>
  <div class="online_resume_wed">
    <div class="online_resume">
      <div class="bg_fff">
        <div class="online_resume_nav">
          <router-link to="Personal_Center">&lt; 个人中心</router-link>
          <span id="gdata" class="name" v-show="sss">{{r_data.name}}</span>
          <input type="text" v-model="r_data.name" v-show="!sss">
          <span class="change_name" id="changename" @click="modifyName()">
          <span class="close_tip"></span>
        </span>
          <div class="yuandxia">
            <router-link :to="{name: 'LookResume', params: { ids:JSON.stringify(ids)}}" target="_blank">{{r_data.language=="chinese"?"预览":"Preview"}}</router-link>
            <!--<span>下载到本地</span>-->
          </div>
        </div>
        <div class="content">
          <div class="bg_fff resume_content_left">
            <h1 class="res_header"></h1>
            <div class="sec_box" @click="page.tr9=true;page.tr1=true">
              <div class="section_item bas_must complete">
                <div class="bas_inf">
                  <div>
                    <img :src="data.getUser.avatar" class="user_img">
                    <p class="bas_inf_inf">
                      <span class="stu_name v1">{{data.getUser.name}}</span>
                      <span>
                        <span v-if="data.getUser.gender==1">{{r_data.language=="chinese"?"男":"Male"}}</span>
                        <span v-if="data.getUser.gender==2">{{r_data.language=="chinese"?"女":"Female"}}</span>
                        <span v-if="data.getUser.gender==3">{{r_data.language=="chinese"?"保密":"Keep secret"}}</span>
                      |
                      {{data.getUser.age}}{{r_data.language=="chinese"?"岁":"Age"}}
                      |
                        <span class="v2">{{dataA.getUser.name}}</span>
                      |
                      <span class="v6">{{data.getUser.school}}</span>
                      |
                      <span class="v7">{{data.getUser.majorId}}</span>
                      |
                      <span class="v3">
                        <span v-if="data.getUser.education=='专科'">{{r_data.language=="chinese"?"专科":"College"}}</span>
                        <span v-if="data.getUser.education=='本科'">{{r_data.language=="chinese"?"本科":"Undergraduate"}}</span>
                        <span v-if="data.getUser.education=='硕士'">{{r_data.language=="chinese"?"硕士":"Master"}}</span>
                        <span v-if="data.getUser.education=='博士'">{{r_data.language=="chinese"?"博士":"Dr."}}</span>
                      </span>
                      |
                      <span class="v8">{{data.getUser.endStudy}}</span>
                      年毕业
                      </span>
                      <span>
                      <span class="v4">{{data.getUser.mobile}}</span>
                      <span class="v5">{{data.getUser.email}}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" @click="page.tr9=true;page.tr2=true">
              <div class="section_item item_expect complete">
                <div class="expect">
                  <h2 class="ico">{{r_data.language=="chinese"?"期望实习":"Expected Internship"}}</h2>
                  <div class="inf">
                    <p>
                      <span class="v2">{{dataA.getHopePractice.name}}</span> |
                      <span class="v1">{{industry.name}}</span> |
                      <span class="v3">{{data.getHopePractice.dailyWage}}</span> {{r_data.language=="chinese"?"日薪":"Daily"}} |
                      <span class="d1">{{data.getHopePractice.days}}</span> {{r_data.language=="chinese"?"天":"Days"}} | {{r_data.language=="chinese"?"实习":"Practice"}}:
                      <span class="mons">{{data.getHopePractice.months}}</span> {{r_data.language=="chinese"?"个月":"Months"}}| {{r_data.language=="chinese"?"预计到岗日期":"Expected date on Post"}}:
                      <span class="v4">{{data.getHopePractice.arrivalDate}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr1">
              <div class="section_item item_education  complete">
                <div class="education">
                  <h2 class="ico">{{r_data.language=="chinese"?"教育背景":"Education background"}}</h2>
                  <span style="position: absolute;right: 33px;top: 25px;font-size: 30px; color: #4cae4c" @click="page.tr9=true;page.tr3=true">+</span>
                  <div class="inf" v-for="list in data.getEducations" @click="temporary=list;page.tr9=true;page.tr3=true">
                    <p>
                    <span class="time">
                    <span class="v4 item0">{{list.beginDate}}</span>-
                    <span class="v5 item0">{{list.endDate}}</span>
                    </span>
                      <span class="inf_content">
                        <span class="v1 item0">{{list.school}}</span> |
                        <span class="v2 item0">{{list.majorId}}</span> |
                        <span v-if="list.education=='专科'">{{r_data.language=="chinese"?"专科":"College"}}</span>
                        <span v-if="list.education=='本科'">{{r_data.language=="chinese"?"本科":"Undergraduate"}}</span>
                        <span v-if="list.education=='硕士'">{{r_data.language=="chinese"?"硕士":"Master"}}</span>
                        <span v-if="list.education=='博士'">{{r_data.language=="chinese"?"博士":"Dr."}}</span>|
                        <span class="v3 item0">{{list.city.name}}</span>
                      </span>
                    </p>
                    <p>
                      <span class="v6 item0"></span>
                      {{r_data.language=="chinese"?"成绩排名":"Ranking of grades"}}：<span class="v9 item0">{{list.classRank}}</span>
                      <span class="v7 item0"></span>

                    </p>
                    <div class="delete"  style="width: 40px;height: 100%;min-height: 20px; text-align: center;line-height: 100%;" @click.stop="">
                      <span @click="delEducation(list.id)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr2">
              <div class="section_item item_practice  complete">
                <div class="practice" data-num="3">
                  <h2 class="ico">{{r_data.language=="chinese"?"实习经历":"Internship Experience"}}</h2>
                  <span style="position: absolute;right: 33px;top: 25px;font-size: 30px; color: #4cae4c" @click="page.tr9=true;page.tr4=true">+</span>
                  <div class="inf" v-for="list in data.getPracticeExperiences" @click="temporary=list;page.tr9=true;page.tr4=true">
                    <p>
                    <span class="time">
                    <span class="v3 item0">{{list.beginDate}}</span>-
                    <span>{{list.endDate}}</span>
                    </span>
                      <span class="inf_content">
                      <span class="v1 item0">{{list.companyName}}</span>|
                      <span class="v2 item0">{{list.jobName}}</span>|
                        <span class="v8 item0">{{list.city.name}}</span>
                      <br>
                    </span></p>
                    <pre class="v7 item0">{{list.description}}</pre>

                    <div class="delete"  style="width: 40px;height: 100%;min-height: 20px; text-align: center;line-height: 100%;" @click.stop="">
                      <span @click="delPracticeExperience(list.id)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr3">
              <div class="section_item item_project  complete">
                <div class="project">
                  <h2 class="ico">{{r_data.language=="chinese"?"学术经历":"Academic Experience"}}</h2>
                  <span style="position: absolute;right: 33px;top: 25px;font-size: 30px; color: #4cae4c" @click="page.tr9=true;page.tr5=true">+</span>
                  <div class="inf" v-for="list in data.getScienceExperiences" @click="temporary=list;page.tr9=true;page.tr5=true">

                    <p>
                  <span class="time">
                  <span class="v3 item0">{{list.beginDate}}</span>-
                  <span>{{list.endDate}}</span>
                  </span>
                  <span class="inf_content">
                    <span class="v1 item0">{{list.projectName}}</span> |
                    <span class="v2 item0">{{list.assumeOffice}}</span> |
                    <span class="v8 item0">{{list.city.name}}</span>
                    <br>
                  </span></p>
                    <pre class="v7 item0">{{list.description}}</pre>

                    <div class="delete"  style="width: 40px;height: 100%;min-height: 20px; text-align: center;line-height: 100%;" @click.stop="">
                      <span @click="delScienceExperience(list.id)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr4">
              <div class="section_item item_exp ">
                <div class="exp" >
                  <h2 class="ico">{{r_data.language=="chinese"?"校园经历":"Campus Experience"}}</h2>
                  <span style="position: absolute;right: 33px;top: 25px;font-size: 30px; color: #4cae4c" @click="page.tr9=true;page.tr10=true">+</span>
                  <div class="inf" v-for="list in data.getSchoolExperiences" @click="temporary=list;page.tr9=true;page.tr10=true">
                    <p>
                    <span class="time">
                    <span class="v3 item0">{{list.beginDate}}</span>-
                    <span>{{list.endDate}}</span>
                    </span>
                      <span class="inf_content">
                      <span class="v1 item0">{{list.projectName}}</span>|
                      <span class="v2 item0">{{list.assumeOffice}}</span>|
                        <span class="v8 item0">{{list.city.name}}</span>
                      <br>
                    </span></p>
                    <pre class="v7 item0">{{list.description}}</pre>
                    <div class="delete"  style="width: 40px;height: 100%;min-height: 20px; text-align: center;line-height: 100%;" @click.stop="">
                      <span @click="delSchoolExperience(list.id)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr5">
              <div class="section_item item_skill complete">
                <div class="skill" data-num="3">
                  <h2 class="ico">{{r_data.language=="chinese"?"技能爱好":"Skill Hobby"}}</h2>
                  <span style="position: absolute;right: 33px;top: 25px;font-size: 30px; color: #4cae4c" @click="page.tr9=true;page.tr6=true">+</span>
                  <div class="inf" v-for="list in data.getSkillHobbys" @click="temporary=list;page.tr9=true;page.tr6=true">
                    <p><strong>{{list.type}}</strong></p>
                    <input type="hidden" class="s1 item0" value="兴趣爱好">
                    <pre><a class="v1 item0">{{list.explain}}</a></pre>
                    <div class="delete"  style="width: 40px;height: 100%;min-height: 20px; text-align: center;line-height: 100%;" @click.stop="">
                      <span @click="delSkillHobby(list.id)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr6">
              <div class="section_item item_works ">
                <div class="works">
                  <h2 class="ico">{{r_data.language=="chinese"?"作品展示":"Work Show"}}</h2>
                  <span style="position: absolute;right: 33px;top: 25px;font-size: 30px; color: #4cae4c" @click="page.tr9=true;page.tr7=true">+</span>
                  <div class="inf" v-for="list in data.getOpusShows" @click="temporary=list;page.tr9=true;page.tr7=true">
                    <p><strong>{{list.url}}</strong></p>
                    <pre><a class="v1 item0">{{list.explain}}</a></pre>
                    <input type="hidden" class="item_all" value="0">
                    <div class="delete"  style="width: 40px;height: 100%;min-height: 20px; text-align: center;line-height: 100%;" @click.stop="">
                      <span @click="delOpusShow(list.id)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sec_box" v-if="page.cr7" @click="page.tr9=true;page.tr8=true">
              <div class="section_item item_self ">
                <div class="self">
                  <h2 class="ico">{{r_data.language=="chinese"?"个人评价":"Personal evaluation"}}</h2>
                  <div class="inf">
<pre class="v1">{{data.getOwnAssess.access}}
</pre>
                  </div>
                </div>
              </div>
            </div>
            <div class="item_works" style="background: rgb(255, 255, 255);">
              <div class="attachment">
                <h2 class="ico">{{r_data.language=="chinese"?"相关附件":"Related Accessories"}}</h2>
                <div class="inf" >
                  <p><strong>{{data.getRelatedOption.name}}</strong><span style="float: right;cursor: pointer;margin-right: 50px" @click="DeleteAttachment(data.getRelatedOption.id)" v-if="data.getRelatedOption.name!=''">x</span></p>
                </div>
              </div>
            </div>
            <p class="add_accti">{{r_data.language=="chinese"?"(*支持格式：.jpg,.png,.jpeg,.pdf,.doc,.docx,.txt ;大小不超过5M)":"(* Support format:. jpg,.png,.jpeg,.pdf,.doc,.docx,.txt; size not exceeding 5M)"}}</p>
            <div id="add_att" class="add_acc">
              <div id="picker" class="webuploader-container" style="position: relative">
                <div class="webuploader-pick">{{r_data.language=="chinese"?"添加附件":"Add attachment"}}</div>
                <input type="file" class="webuploader-element-invisible" name='myFile' style="position:absolute;top:0px;left:155px;width:91px;height:41px;opacity: 0;z-index: 100" @change='onUpload'>
              </div>
            </div>
          </div>
          <div class=" resume_content_right">
            <p class="aside_header">
              {{r_data.language=="chinese"?"简历模块":"Resume Module"}}
            </p>
            <dl>
              <dt class="aside_inf must">

                {{r_data.language=="chinese"?"基本信息":"Basic information"}}
                <span class="aside_inf_flg aside_inf_flg_ok"></span>
              </dt>
              <dd class="aside_inf must">
                {{r_data.language=="chinese"?"期望实习":"Expected Internship"}}
                <span class="aside_inf_flg aside_inf_flg_ok"></span>
              </dd>
              <dd class="aside_inf" data-flg="item_education">

                {{r_data.language=="chinese"?"教育背景":"Education background"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr1}" @click="page.cr1=!page.cr1"></span>
              </dd>
              <dd class="aside_inf">

                {{r_data.language=="chinese"?"实习经历":"Internship Experience"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr2}" @click="page.cr2=!page.cr2"></span>
              </dd>
              <dd class="aside_inf">

                {{r_data.language=="chinese"?"学术经历":"Academic Experience"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr3}" @click="page.cr3=!page.cr3"></span>
              </dd>
              <dd class="aside_inf">

                {{r_data.language=="chinese"?"校园经历":"Campus Experience"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr4}" @click="page.cr4=!page.cr4"></span>
              </dd>
              <dd class="aside_inf">

                {{r_data.language=="chinese"?"技能爱好":"Skill Hobby"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr5}" @click="page.cr5=!page.cr5"></span>
              </dd>
              <dd class="aside_inf">

                {{r_data.language=="chinese"?"作品展示":"Work Show"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr6}" @click="page.cr6=!page.cr6"></span>
              </dd>
              <dd class="aside_inf">

                {{r_data.language=="chinese"?"个人评价":"Personal evaluation"}}
                <span class="aside_inf_flg" :class="{'aside_inf_flg_ok':page.cr7}" @click="page.cr7=!page.cr7"></span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="shade" v-if="page.tr9">
        <!-----------------------------修改的弹框------------------------------->
        <div class="change_res">
          <div class="bas_inf_change" v-if="page.tr1">
            <div class="load_box">
              <p class="change_header">
                基本信息
              </p>
              <div class="change_section_box">
                <div class="change_section">
                  <div class="d_change_header" title="点击更换照片，建议使用一寸免冠证件照" style="position: relative">
                    <img id="img_upload" :src="data.getUser.avatar"
                         width="100" height="100">
                    <input type="file" name='myFile' style="position:absolute;top:20px;left:0px;width:100px;height:100px;opacity: 0;z-index: 100" @change='onUpload'>
                  </div>
                  <p class="header_text">{{r_data.language=="chinese"?"(上传简历照片)":"(Upload resume photo)"}}</p>
                  <form>
                    <input id="headpic" name="headpic" value="" type="hidden">
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"姓名":"Name"}}</span>
                      <input type="text"  maxlength="15" placeholder="请填写真实姓名" data-v="v1"
                             class="v_itm change_sec_inf" v-model="data.getUser.name">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"性别":"Gender"}}</span>
                      <select name="gender" data-v="v9" class="v_itm change_sec_inf sec_1" v-model="data.getUser.gender">
                        <option value="1">{{r_data.language=="chinese"?"男":"Male"}}</option>
                        <option value="2">{{r_data.language=="chinese"?"女":"Female"}}</option>
                        <option value="0">{{r_data.language=="chinese"?"保密":"Keep secret"}}</option>
                      </select>
                    </p>
                    <div class="change_sec_item city-choose">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"现在城市":"Now city"}}</span>
                      <input type="text" name="bcity" maxlength="20" placeholder="现居城市名称，如北京。"
                             class="v_itm change_sec_inf" value="北京市" v-model="dataA.getUser.name" v-on:focus="addressSelection=true">
                    </div>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"生日":"Birthday"}}</span>
                      <date-picker field="myDate" placeholder="选择日期" v-model="data.getUser.birth" format="yyyy-mm-dd"  backward="teue"></date-picker>
                    </p>
                    <div class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"最高学历":"Degree"}}</span>
                      <select name="degree" class="change_sec_inf v_itm" data-v="v3" v-model="data.getUser.education">
                        <option value="专科">{{r_data.language=="chinese"?"专科":"College"}}</option>
                        <option value="本科">{{r_data.language=="chinese"?"本科":"Undergraduate"}}</option>
                        <option value="硕士">{{r_data.language=="chinese"?"硕士":"Master"}}</option>
                        <option value="博士">{{r_data.language=="chinese"?"博士":"Dr."}}</option>
                      </select>
                    </div>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"毕业时间":"Graduation"}}</span>
                      <date-picker field="myDate" placeholder="选择日期" v-model="data.getUser.endStudy" format="yyyy-mm-dd"></date-picker>
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"就读学校":"School"}}</span>
                      <input type="text" maxlength="60" autocomplete="off" placeholder="填写学校全称，如北京大学" data-v="v6" class="v_itm change_sec_inf" v-model="data.getUser.school">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"就读专业":"professional"}}</span>
                      <input type="text" name="major" maxlength="60" placeholder="填写专业全称，如工商管理" data-v="v7"
                             class="v_itm change_sec_inf" v-model="data.getUser.majorId" >
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"手机号码":"Phone"}}</span>
                      <input type="text" name="telep" placeholder="填写完整的手机号码" maxlength="15" data-v="v4"
                             class="v_itm change_sec_inf im_phone" v-model="data.getUser.mobile">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"常用邮箱":"Mailbox"}}</span>
                      <input type="text" name="email" placeholder="填写规范的邮箱号，如echo@mshare.cn" maxlength="100" data-v="v5" class="v_itm change_sec_inf change_email" v-model="data.getUser.email">
                      <span class="tips change_sec_item" id="tipforemail"> tips: {{r_data.language=="chinese"?"请仔细核对联系方式是否正确，以免错过面试通知":"Please check the contact form carefully so as not to miss the interview notice."}}。</span>
                    </p>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr1=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveUser()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="expect_change" v-if="page.tr2">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"期望实习":"Expected Internship"}}
                 <img src="http://39.106.117.195/image/lcon/tips.png"
                          alt="" width="18" class="icontips">
              </p>
              <input type="hidden" class="mod" value="expc">
              <div class="change_section">
                <form>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"期望职位":"Position"}}</span>
                    <input  type="text" name="job" maxlength="18" placeholder="选择期望实习职位，如产品经理"
                            class="v_itm change_sec_inf" v-model="industry.name" v-on:focus="addressSelection3=true">
                  </p>
                  <div class="change_sec_item city-choose">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"期望地点":"Location"}}</span>
                    <input type="text"  placeholder="填写期望实习地点，如北京。多个城市请用逗号隔开。" class="v_itm change_sec_inf" v-model="dataA.getHopePractice.name" v-on:focus="addressSelection=true">
                  </div>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"天数/周":"Days/weeks"}}</span>
                    <input type="text" placeholder="填写每周做多少天，数字1-7之间。如6" class="v_itm change_sec_inf" value="北京市" v-model="data.getHopePractice.days">
                  </p>
                  <p class="change_sec_item" id="year">
                    <span class="change_sec_head" style="margin-right: 22px">{{r_data.language=="chinese"?"实习月份 ":"Month"}}</span>
                    <date-picker field="Month" placeholder="选择日期" v-model="data.getHopePractice.beginMonth" format="yyyy-mm-dd"  forward="true"></date-picker>
                    <span class="change_sec_head_bot" style="float: left;line-height: 36px;margin: 0px 20px"> － </span>
                    <date-picker field="Month" placeholder="选择日期" v-model="data.getHopePractice.endMonth" format="yyyy-mm-dd" forward="true"></date-picker>
                  </p>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"期望日薪 ":"Sun NEW"}}</span>
                    <input type="text" name="sly" maxlength="5" placeholder="日薪只能填写数字，比如：100" data-v="v3"
                           class="change_day v_itm" v-model="data.getHopePractice.dailyWage">
                  </p>
                  <p class="change_sec_item">
                    <span class="change_sec_head">{{r_data.language=="chinese"?"到岗日期 ":"Hillock"}}</span>
                    <date-picker field="myDate" placeholder="选择日期" v-model="data.getHopePractice.arrivalDate" format="yyyy-mm-dd"  forward="true"></date-picker>
                  </p>
                </form>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr2=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveHopePractice()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="education_change" v-if="page.tr3">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"教育背景":"Education background"}} <img src="http://39.106.117.195/image/lcon/tips.png" alt="" width="18" class="icontips" data-title="教育经历从最高学历写起，填写最近2个学历（硕士填写研究生及大学学历）">
              </p>
              <input type="hidden" class="mod" value="educ">
              <div class="change_section_box">
                <div class="change_section must_arr">
                  <form>
                    <p class="change_sec_item">
                      <span class="change_sec_head"><span class="must_star">*</span>{{r_data.language=="chinese"?"学校":"School"}}</span>
                      <input type="text" name="school" autocomplete="off" maxlength="15" placeholder="四川大学" data-v="v1"
                             class="v_itm school_choose change_sec_inf" v-model="temporary.school">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head"><span class="must_star">*</span>{{r_data.language=="chinese"?"专业":"Professional"}}</span>
                      <input type="text" name="major" maxlength="15" placeholder="软件工程" data-v="v2"
                             class="v_itm change_sec_inf" v-model="temporary.majorId">
                    </p>
                    <div class="change_sec_item">
                      <span class="change_sec_head"><span class="must_star">*</span>{{r_data.language=="chinese"?"学历":"Degree"}}</span>
                      <select name="degree" class="change_sec_inf s v_itm" data-s="s1" v-model="temporary.education">
                        <option value="专科">{{r_data.language=="chinese"?"专科":"College"}}</option>
                        <option value="本科">{{r_data.language=="chinese"?"本科":"Undergraduate"}}</option>
                        <option value="硕士">{{r_data.language=="chinese"?"硕士":"Master"}}</option>
                        <option value="博士">{{r_data.language=="chinese"?"博士":"Dr."}}</option>
                      </select>
                    </div>
                    <div class="change_sec_item city-choose">
                      <span class="change_sec_head"><span class="must_star">*</span>{{r_data.language=="chinese"?"城市":"City"}}</span>
                      <input type="text" name="city" maxlength="15" placeholder="北京" data-v="v3"
                             class="v_itm change_sec_inf cc1" value="北京市" v-model="temporary.city.name" v-on:focus="addressSelection=true">
                    </div>
                    <p class="change_sec_item selmon">
                      <span class="change_sec_head"><span class="must_star">*</span>{{r_data.language=="chinese"?"在校时间":"TimeSchool"}}</span>
                      <date-picker field="Month" placeholder="开学时间" v-model="temporary.beginDate" format="yyyy-mm-dd"  backward="teue" style="margin-left: 95px;"></date-picker>
                      <span class="change_sec_head_bot" style="float: left;line-height: 36px;margin: 0px 8px"> － </span>
                      <date-picker field="Month" placeholder="毕业时间" v-model="temporary.endDate" format="yyyy-mm-dd" ></date-picker>
                    </p>
                    <div class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"成绩排名":"Ranking"}}</span>
                      <select name="ranking" class="change_sec_inf can_empty v_itm" data-v="v9" v-model="temporary.classRank">
                        <option value="前10%">{{r_data.language=="chinese"?"前10%":"Top 10%"}}</option>
                        <option value="前30%">{{r_data.language=="chinese"?"前30%":"Top 30%"}}</option>
                        <option value="中等">{{r_data.language=="chinese"?"中等":"Medium"}}</option>
                        <option value="中下">{{r_data.language=="chinese"?"中下":"Next"}}</option>
                      </select>
                    </div>
                    <p class="change_sec_item" style="height:124px;">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"主修课程":"Major courses"}}</span>
                      <textarea name="course" maxlength="256" placeholder="软件工程,C++基础"
                                class="can_empty v_itm change_sec_inf" data-autosize-on="true"
                                style="overflow: hidden; word-wrap: break-word; height: 100px;" v-model="temporary.majorCourse"></textarea>
                    </p>
                    <p class="change_sec_item" style="height:124px;">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"荣誉奖励":"Honor Award"}}</span>
                      <textarea wrap="virtual" name="honor" maxlength="512"
                                placeholder="中国大学生创业大赛国家金奖、北京市优秀毕业生、美国国际数学建模大赛一等奖"
                                class="v_itm change_sec_inf can_empty" data-autosize-on="true"
                                style="overflow: hidden; word-wrap: break-word; height: 100px;" v-model="temporary.honor"></textarea>
                    </p>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr3=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveEducation()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="practice_change" v-if="page.tr4">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"实习经历":"Internship Experience"}} <img src="http://39.106.117.195/image/lcon/tips.png"
                          alt="" width="18" class="icontips">
              </p>
              <input type="hidden" class="mod" value="prac">
              <div class="change_section_box">
                <div class="change_section must_arr">
                  <form>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"公司名称":"CoName"}}</span>
                      <input type="text" name="name" maxlength="20" placeholder="萌想（上海）网络科技有限公司" class="v_itm change_sec_inf" v-model="temporary.companyName">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"职位名称":"JopName"}}</span>
                      <input type="text" name="play_role" maxlength="15" placeholder="运营推广" data-v="v2"
                             class="v_itm change_sec_inf" v-model="temporary.jobName">
                    </p>
                    <p class="change_sec_item selmon">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"实习时间":"IPTime"}}</span>
                      <date-picker field="Month" placeholder="实习开始时间" v-model="temporary.beginDate" format="yyyy-mm-dd" style="margin-left: 95px;"></date-picker>
                      <span class="change_sec_head_bot" style="float: left;line-height: 36px;margin: 0px 8px"> － </span>
                      <date-picker field="Month" placeholder="实习结束时间" v-model="temporary.endDate" format="yyyy-mm-dd" ></date-picker>
                    </p>
                    <div class="change_sec_item city-choose">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"实习地点":"IPPlace"}}</span>
                      <input type="text" name="city" maxlength="15" placeholder="成都" class="v_itm change_sec_inf" value="北京市" v-model="temporary.city.name" v-on:focus="addressSelection=true">
                      </div>
                    <div class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"实习描述":"IP Description"}}</span>
                      <textarea name="description" id="work_desc" maxlength="350" class="change_sec_inf v_itm"
                                style="resize: none; overflow: hidden; word-wrap: break-word; height: 100px;"
                                placeholder="•主要涉及方向为以压电智能材料为主的作动器的机械结构设计
•主要涉及卫星天线在轨可重构型面反射器的机械结构设计，电气控制系统的设" data-autosize-on="true" v-model="temporary.description">
                      </textarea>
                      <span class="demo-btn" @click="sl1=!sl1">查看示例</span>
                      <pre class="demo-text" v-if="sl1">
示例1:
2015.3-2015.8 xx会计师事务所 审计助理
协助财务主管核算成本及收入，编制月度预算报表；
处理现金，应收账款，应付账款，总账，财务报表等一千多份原始单1111111111据；
使用会计软件完成268笔交易的会计实录。
示例2:
2010.06-2011.08 xx公司 行政文员
协助行政部经理完成公司行政事务工作及部门内部日常事务工作；
协助行政部经理进行内务、安全管理，为其他部门提供及时有效的行政服务；
完成材料收集、档案管理、文书起草、公文制定、文件收发等工作
                    </pre>
                    </div>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr4=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="savePractice()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="project_change" v-if="page.tr5">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"学术经历":"Academic Experience"}} <img src="https://sxsimg.xiaoyuanzhao.com/static/img/tips.png?v=49c3bb4483efbe72dc1129d143b4288c"
                          alt="" width="18" class="icontips">
              </p>
              <input type="hidden" class="mod" value="proj">
              <div class="change_section_box">
                <div class="change_section must_arr">
                  <form>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"项目名称":"ProjectName"}}</span>
                      <input type="text" name="name" maxlength="50" placeholder="XX文化网" class="v_itm change_sec_inf"
                             data-v="v1"v-model="temporary.projectName">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"担任职务":"HoldJop"}}</span>
                      <input type="text" name="play_role" maxlength="25" placeholder="主要负责人"
                             class="v_itm change_sec_inf" data-v="v2" v-model="temporary.assumeOffice">
                    </p>
                    <p class="change_sec_item selmon">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"项目时间":"Time"}}</span>
                      <date-picker field="Month" placeholder="实习开始时间" v-model="temporary.beginDate" format="yyyy-mm-dd" style="margin-left: 95px;"></date-picker>
                      <span class="change_sec_head_bot" style="float: left;line-height: 36px;margin: 0px 8px"> － </span>
                      <date-picker field="Month" placeholder="实习结束时间" v-model="temporary.endDate" format="yyyy-mm-dd" ></date-picker>
                    </p>
                    <div class="change_sec_item city-choose">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"项目地点":"Location"}}</span>
                      <input type="text" name="city" placeholder="成都" class="v_itm change_sec_inf" value="北京市" v-model="temporary.city.name" v-on:focus="addressSelection=true">
                    </div>
                    <div class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"项目描述":"Project Description"}}</span>
                      <textarea name="description" id="proj_desc" maxlength="350" class="change_sec_inf v_itm"
                                data-v="v7" placeholder="•负责实现电子病历在移动端的计算机辅助图像识别功能
  • 发表多篇论文，被SCI等收录" style="overflow: hidden; word-wrap: break-word; height: auto;" v-model="temporary.description"></textarea>
                      <span class="demo-btn" @click="sl2=!sl2">查看示例</span>
                      <pre class="demo-text" v-if="sl2">
示例1:
2012.2-8 抗衰老化妆品成分对人体成纤维细胞生长的影响效果 项目助理
对样品进行无菌处理以及相应检测浓度的调配
提供检测用细胞以及细胞培养
对样品进行辩解浓度的检测
细胞生长情况与样品浓度依赖关系的检测
示例2:
2014.3-2014.6 二级斜齿圆柱齿轮减速器的设计
根据给定的要求设计一个二级斜齿圆柱齿轮减速器
选择合适的电动机类型、容量、转速，分配各个传动轴的传动比
确定各轴的转速、输入功率、输入转矩，合理设计V带
根据轮齿弯曲强度校核齿轮，选定通气孔、定位销、起盖螺钉等零件
选择润滑方式和密封方式，制定出设计说明书绘画结构设计图和零件图
  </pre>
                    </div>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr5=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveScience()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="skill_change" v-if="page.tr6">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"技能爱好":"Skills hobby"}}
              </p>
              <input type="hidden" class="mod" value="skill">
              <div class="change_section_box" style="padding-bottom: 0px;">
                <div class="change_section must_arr">
                  <form>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"类型":"Type"}}</span>
                      <select id="select-jt" name="type" class="change_sec_inf v_itm s" v-model="temporary.type">
                        <option data-ph="请列出如 ：Office、PS等">{{r_data.language=="chinese"?"专业技能":"Professional skills"}}</option>
                        <option data-ph="">语言水平</option>
                        <option data-ph="请列出你的兴趣爱好">{{r_data.language=="chinese"?"兴趣爱好":"Hobbies"}}</option>
                        <option data-ph="请列出你的其他相关技能">{{r_data.language=="chinese"?"其他":"Other"}}</option>
                      </select>
                    </p>
                    <p class="change_sec_item skill_text">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"说明":"Description"}}</span>
                      <textarea id="ph-change" name="info" class="change_sec_inf v_itm" maxlength="350" placeholder="请列出你的兴趣爱好" style="overflow: hidden; word-wrap: break-word; height: auto;" v-model="temporary.explain"></textarea>
                    </p>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr6=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveSkillHobby()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="works_change" v-if="page.tr7">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"作品展示":"Work Show"}}
              </p>
              <input type="hidden" class="mod" value="prod">
              <div class="change_section_box" style="padding-bottom: 0px">
                <div class="change_section must_arr">
                  <form>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"作品链接":"Works Links"}}</span>
                      <input type="text" name="url" maxlength="512" placeholder="www.example.com" class="v_itm change_sec_inf" v-model="temporary.url">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"文字说明":"Text description"}}</span>
                      <textarea name="info" class="v_itm change_sec_inf" data-v="v2" maxlength="350" placeholder="本人的个人博客站点，包含发布日志，签到，日志及用户管理等各个功能。"  style="overflow: hidden; word-wrap: break-word; height: auto;" v-model="temporary.explain"></textarea>
                    </p>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr7=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveOpusShow()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="self_change" v-if="page.tr8">
            <div class="load_box">
              <p class="change_header">
                自我评价
              </p>
              <input type="hidden" class="mod" value="desc">
              <div class="change_section">
                <form>
<textarea name="judge" class="change_sec_inf v_itm" data-v="v1" id="self_desc" maxlength="650"placeholder="快速学习能力强，半年内获得4 张不同学科领域的MOOC 证书；擅长多线程工作和时间管理，计划意识强，擅 长数据收集和处理，做事细致认真。如果我能来这个职位我将努力工作，我认为我因为牛逼、技术好，所以我能胜任这个工作。"style="overflow: hidden; word-wrap: break-word; height: 100px;" v-model="data.getOwnAssess.access"></textarea><br>
                </form>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr8=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveOwnAssess()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
          <div class="exp_change" v-if="page.tr10">
            <div class="load_box">
              <p class="change_header">
                {{r_data.language=="chinese"?"校园经历":"Campus Experience"}} <img src="http://39.106.117.195/image/lcon/tips.png"
                          alt="" width="18" class="icontips" >
              </p>
              <input type="hidden" class="mod" value="exp">
              <div class="change_section_box">
                <div class="change_section must_arr">
                  <form>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"活动名称":"ActivityName"}}</span>
                      <input type="text" name="name" maxlength="50" placeholder="清华大学学生致知协会"
                             class="v_itm change_sec_inf" v-model="temporary.projectName">
                    </p>
                    <p class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"担任职务":"HoldPosition"}}</span>
                      <input type="text" name="play_role" maxlength="25" placeholder="会长" class="v_itm change_sec_inf"
                            v-model="temporary.assumeOffice">
                    </p>
                    <p class="change_sec_item selmon">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"活动时间":"ActivityTime"}}</span>
                      <date-picker field="Month" placeholder="实习开始时间" v-model="temporary.beginDate" format="yyyy-mm-dd"  backward="teue" style="margin-left: 95px"></date-picker>
                      <span class="change_sec_head_bot" style="float: left;line-height: 36px;margin: 0px 8px"> － </span>
                      <date-picker field="Month" placeholder="实习结束时间" v-model="temporary.endDate" format="yyyy-mm-dd"  backward="teue"></date-picker>
                    </p>
                    <div class="change_sec_item city-choose">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"活动地点":"PlaceActivity"}}</span>
                      <input type="text" name="city" placeholder="成都" class="v_itm change_sec_inf" value="北京市" v-model="temporary.city.name" v-on:focus="addressSelection=true">
                    </div>
                    <div class="change_sec_item">
                      <span class="change_sec_head">{{r_data.language=="chinese"?"活动描述":"Activity Description"}}</span>
                      <textarea name="description" id="act_desc" maxlength="350" class="change_sec_inf v_itm"
                                placeholder="•协会研究高效学习的方法，批判性思维方式，推崇阅读分享和知识管理
•在协会成立前，提出了清晨研讨的模式，与初创会员一起测试6 周，初期积累会员50 人"
                                style="overflow: hidden; word-wrap: break-word; height: auto;" v-model="temporary.description"></textarea>
                      <span class="demo-btn" @click="sl3=!sl3">查看示例</span>
                      <pre class="demo-text" v-if="sl3">示例1:
学校论坛 xx版版主
根据版规进行版面维护，维持板块正常的秩序；
搜集网络上近期热点话题，发帖引导用户讨论，提高板块活跃度，将论坛活跃度排名由15名提升至第3名；
任职期间成功举办2次板块线下聚会，促进板块用户的相互了解沟通，将板块活跃用户增加了130%。
示例2:
xx大学 XX精英俱乐部 副主席
负责俱乐部各项活动经费的汇总整理，负责制作年度财务报告
协助俱乐部主席开展日常工作，撰写俱乐部年度工作计划
XX大学系列培训项目组骨干，协助公司圆满组织两场培训，一百余名同学参加了培训
</pre>
                    </div>
                  </form>
                </div>
              </div>
              <div class="change_footer">
                <button class="btn" @click="page.tr9=false;page.tr10=false;">{{r_data.language=="chinese"?"取消":"Cancel"}}</button>
                <button class="btn" @click="saveSchool()">{{r_data.language=="chinese"?"保存":"Save"}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div class="sxs--modal" v-if="addressSelection3"  @click="addressSelection3=false;">
      <div class="sxs--modal--bg" style="height: 484px;"></div>
      <div class="sxs--modal--container sxs--modal--shown" style="height: 484px; margin-top: -242px;">
        <div class="sxs--modal--content" style="letter-spacing: 1px; max-height: 561px;" @click.stop="">
          <div id="job_addr1">
            <div>
              <p>一级</p>
              <span v-for="list in getJobNames"  @click="industryTwoDtos=list.industryTwoDtos">{{list.name}}</span>
            </div>
            <span>-------------------------------</span>
            <div>
              <p>二级</p>
              <span v-for="list in industryTwoDtos"  @click="industryThreeDtos=list.industryThreeDtos">{{list.name}}</span>
            </div>
            <span>-------------------------------</span>
            <div>
              <p>三级</p>
              <span v-for="list in industryThreeDtos"  @click="JobNamesClick(list.id,list.name)">{{list.name}}</span>
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
    data() {//变量
      return {
        sss:true,
        r_data:{},
        ids:{},
        date:"",
        name: 'app',
        date1: '',
        date2: '',
        date3: '',
        format: 'yyyy/mm/dd',
        sl1:false,
        sl2:false,
        sl3:false,
        sl4:false,
        industry:{
          id:"",
          name:""
        },
        page: {
          tr1: false,
          tr2: false,
          tr3: false,
          tr4: false,
          tr5: false,
          tr6: false,
          tr7: false,
          tr8: false,
          tr9: false,
          tr10: false,
          tr11: false,
          tr12: false,
          cr1: true,
          cr2: true,
          cr3: true,
          cr4: true,
          cr5: true,
          cr6: true,
          cr7: true
        },
        user: '123',
        password: "123456",
        r_id: "",
        s_id: "",
        addressSelection2:"",
        addressSelection3:false,
        industryTwoDtos:[],
        industryThreeDtos:[],
        data: {
          //个人信息
          getUser: {},
          //期望实习
          getHopePractice: {},
          //教育背景
          getEducations: [],
          //实习经历
          getPracticeExperiences: [],
          //学术经历
          getScienceExperiences: [],
          //校园经历
          getSchoolExperiences: [],
          //技能爱好
          getSkillHobbys: [],
          //作品展示
          getOpusShows: [],
          //个人评价
          getOwnAssess: [],
          //附件
          getRelatedOption: []
        },
        dataA: {
          //个人信息
          getUser: {
            id:'',
            name:""
          },
          //期望实习
          getHopePractice: {
            id:'',
            name:''
          }
        },
        //个人信息
        getUser: {},
        addressSelection:"",
        pita:{},
        pita2:{},
        pita3:{},
        ifInput:"",
        ifImg:"",
        temporary:{
          city:{
            id:"",
            name:""
          }
        }
      }
    },
    mounted() {//初始化
      //this.localStorageUser();
      this.s_id= JSON.parse(window.localStorage.getItem('S_id')).id;
      this.r_data = JSON.parse(this.$route.params.rid);//获取传过来的值;
      console.log(this.r_data);
      this.r_id = this.r_data.resumeId;//获取传过来的值;
      this.ids={
        sid:this.s_id,
        rid:this.r_id
      }
      this.getIndustryList();
      this.getResumeData();
      this.getAreaData();
      let _this=this;
    },
    methods: {
      //获取行业列表
      getIndustryList:function () {
        let cid=window.localStorage.getItem("C_id");
        this.getData("/api/homepage/industryTags").then((res) => {
          if(res.data.code==0){
            this.getJobNames=res.data.data;
          }
        })
      },
      //选择期望职位
      JobNamesClick(id,name){
        this.industry={
          id:id,
          name:name,
        };

        this.addressSelection3=false;
      },
      //修改简历名称
      modifyName(){
        this.sss=!this.sss;
        if(this.sss){
          this.postData("/api/resume/updateResumeName ", {id: this.r_id,name:this.r_data.name}).then((res) => {
            if (res.data.code == 0) {
              console.log(res.data.data)
            } else {
              console.log(res.data.message);
            }
          });
        }
      },
      //获取所有简历信息
      getResumeData: function () {
        //个人信息
        this.postData("/api/resume/getUser", {userId: this.s_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getUser = res.data.data;
            this.data.getUser.resumeId=this.r_id;
            this.data.getUser.id=this.s_id;
            if(res.data.data.residence.id!=""){
              this.dataA.getUser.id = res.data.data.residence.id;
              this.dataA.getUser.name = res.data.data.residence.name;
              this.data.getUser.residence = this.dataA.getUser;
              console.log(res.data.data.residence)
            }
            console.log(res.data.data)
          } else {
            console.log(res.data.message);
          }
        });
        //期望实习
        this.getData("/api/resume/getHopePractice", {id: this.r_id}).then((res) => {
          console.log(res.data.data);
          if (res.data.code == 0) {
            if(res.data.data){
              this.data.getHopePractice = res.data.data;
              this.dataA.getHopePractice=res.data.data.city;
              this.dataA.getHopePractice.id = res.data.data.city.id;
              this.dataA.getHopePractice.name = res.data.data.city.name;
              this.data.getHopePractice.city = this.dataA.getHopePractice;
              console.log(res.data.data.industry)
              if(res.data.data.industry){
                this.industry=res.data.data.industry;
              }
            }
          } else {
            console.log(res.data.message);
          }
        });
        //教育背景
        this.getData("/api/resume/getEducations", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getEducations = res.data.data;
            if(res.data.data.length>0){
              this.page.cr1=true;
            }
          } else {
            console.log(res.data.message);
          }
        });

        //实习经历
        this.getData("/api/resume/getPracticeExperiences", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getPracticeExperiences = res.data.data;
            if(res.data.data.length>0){
              this.page.cr2=true;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //学术经历
        this.getData("/api/resume/getScienceExperiences", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getScienceExperiences = res.data.data;
            if(res.data.data.length>0){
              this.page.cr3=true;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //校园经历
        this.getData("/api/resume/getSchoolExperiences", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getSchoolExperiences = res.data.data;
            if(res.data.data.length>0){
              this.page.cr4=true;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //技能爱好
        this.getData("/api/resume/getSkillHobbys", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getSkillHobbys = res.data.data;
            if(res.data.data.length>0){
              this.page.cr5=true;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //作品展示
        this.getData("/api/resume/getOpusShows", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getOpusShows = res.data.data;
            if(res.data.data.length>0){
              this.page.cr6=true;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //个人评价
        this.getData("/api/resume/getOwnAssess", {id: this.r_id}).then((res) => {
          if (res.data.code == 0) {
            this.data.getOwnAssess = res.data.data;
            if(res.data.data){
              this.page.cr7=true;
            }
          } else {
            console.log(res.data.message);
          }
        });
        //附件
        this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
          if (res.data.code == 0) {
            console.log(res.data.data)
            this.data.getRelatedOption = res.data.data;
          } else {
            console.log(res.data.message);
          }
        });
      },
      //获取地址选择
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
        console.log(this.data.getUser)
        if(this.page.tr1){
          this.dataA.getUser.name=list.name;
          this.dataA.getUser.id=list.id;
        }else if(this.page.tr2){
          this.dataA.getHopePractice.name=list.name;
          this.dataA.getHopePractice.id=list.id;
        }else{
          this.temporary.city={
            name:this.temporary.city.name,
            id:this.temporary.city.id
          }
          this.temporary.city.name=list.name;
          this.temporary.city.id=list.id;
        }
        this.addressSelection=false;
      },
      //保存个人信息
      saveUser:function () {
        console.log(this.dataA.getUser);
        this.data.getUser.residence=this.dataA.getUser;
        this.data.getUser.resumeId=this.r_id;
        this.data.getUser.id=this.s_id;
        console.log(JSON.stringify(this.data.getUser))
        this.postData2("/api/resume/editUser",this.data.getUser).then((res) => {
          if (res.data.code == 0) {
            this.page.tr1=false;
            this.page.tr9=false;
            this.postData("/api/resume/getUser", {userId: this.s_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getUser = res.data.data;
                this.data.getUser.resumeId=this.r_id;
                this.data.getUser.id=this.s_id;
                if(res.data.data.residence.id!=""){
                  this.dataA.getUser.id = res.data.data.residence.id;
                  this.dataA.getUser.name = res.data.data.residence.name;
                  this.data.getUser.residence = this.dataA.getUser;
                  console.log(res.data.data.residence)
                }
                console.log(res.data.data)
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存期望职位信息
      saveHopePractice:function () {
        console.log(this.data.getHopePractice);
        this.data.getHopePractice.memberId=this.s_id;
        this.data.getHopePractice.resumeId=this.r_id;
        this.data.getHopePractice.city=this.dataA.getHopePractice
        this.data.getHopePractice.industry=this.industry;
        this.postData2("/api/resume/commitHopePractice",this.data.getHopePractice).then((res) => {
          if (res.data.code == 0) {
            this.page.tr2=false;
            this.page.tr9=false;
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存教育背景
      saveEducation:function () {
        this.temporary.memberId=this.s_id;
        this.temporary.resumeId=this.r_id;
        this.postData2("/api/resume/commitEducation",this.temporary).then((res) => {
          if (res.data.code == 0) {
            this.page.tr3=false;
            this.page.tr9=false;
            this.temporary={
              city:{
                id:"",
                name:""
              }
            };
            this.getData("/api/resume/getEducations", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getEducations = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr1=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存实习经历
      savePractice:function () {
        this.temporary.memberId=this.s_id;
        this.temporary.resumeId=this.r_id;
        this.postData2("/api/resume/commitPracticeExperience",this.temporary).then((res) => {
          if (res.data.code == 0) {
            this.page.tr4=false;
            this.page.tr9=false;
            this.temporary={
              city:{
                id:"",
                name:""
              }
            };
            this.getData("/api/resume/getPracticeExperiences", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getPracticeExperiences = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr2=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存学术经历
      saveScience:function () {
        this.temporary.memberId=this.s_id;
        this.temporary.resumeId=this.r_id;
        this.postData2("/api/resume/commitScienceExperience",this.temporary).then((res) => {
          if (res.data.code == 0) {
            this.page.tr5=false;
            this.page.tr9=false;
            this.temporary={
              city:{
                id:"",
                name:""
              }
            };
            this.getData("/api/resume/getScienceExperiences", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getScienceExperiences = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr3=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存校园经历
      saveSchool:function () {
        this.temporary.memberId=this.s_id;
        this.temporary.resumeId=this.r_id;
        this.postData2("/api/resume/commitSchoolExperience",this.temporary).then((res) => {
          if (res.data.code == 0) {
            this.page.tr10=false;
            this.page.tr9=false;
            this.temporary={
              city:{
                id:"",
                name:""
              }
            };
            this.getData("/api/resume/getSchoolExperiences", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getSchoolExperiences = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr4=true;
                }
              } else {
                console.log(res.data.message);
              }
            })
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存兴趣爱好
      saveSkillHobby:function () {
        this.temporary.memberId=this.s_id;
        this.temporary.resumeId=this.r_id;
        this.postData2("/api/resume/commitSkillHobby",this.temporary).then((res) => {
          if (res.data.code == 0) {
            this.page.tr6=false;
            this.page.tr9=false;
            this.temporary={
              city:{
                id:"",
                name:""
              }
            };
            this.getData("/api/resume/getSkillHobbys", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getSkillHobbys = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr5=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存作品展示
      saveOpusShow:function () {
        this.temporary.memberId=this.s_id;
        this.temporary.resumeId=this.r_id;
        this.postData2("/api/resume/commitOpusShow",this.temporary).then((res) => {
          if (res.data.code == 0) {
            this.page.tr7=false;
            this.page.tr9=false;
            this.temporary={
              city:{
                id:"",
                name:""
              }
            };
            this.getData("/api/resume/getOpusShows", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getOpusShows = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr6=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //保存个人评价
      saveOwnAssess:function () {
        this.postData2("/api/resume/commitOwnAssess",this.data.getOwnAssess).then((res) => {
          if (res.data.code == 0) {
            this.page.tr7=false;
            this.page.tr9=false;
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除教育背景
      delEducation:function (id) {
        this.postData("/api/resume/delEducation",{id:id},{}).then((res) => {
          if (res.data.code == 0) {
            //教育背景
            this.getData("/api/resume/getEducations", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getEducations = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr1=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除实习经历
      delPracticeExperience:function (id) {
        this.postData("/api/resume/delPracticeExperience",{id:id},{}).then((res) => {
          if (res.data.code == 0) {
            //教育背景
            this.getData("/api/resume/getPracticeExperiences", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getPracticeExperiences = res.data.data;
                if(res.data.data.length>0){
                  this.page.cr1=true;
                }
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除学术经历
      delScienceExperience:function (id) {
        this.postData("/api/resume/delScienceExperience",{id:id},{}).then((res) => {
          if (res.data.code == 0) {
            //教育背景
            this.getData("/api/resume/getScienceExperiences", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getScienceExperiences = res.data.data;
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除校园经历
      delSchoolExperience:function (id) {
        this.postData("/api/resume/delSchoolExperience",{id:id},{}).then((res) => {
          if (res.data.code == 0) {
            //教育背景
            this.getData("/api/resume/getSchoolExperiences", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getSchoolExperiences = res.data.data;
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除兴趣爱好
      delSkillHobby:function (id) {
        this.postData("/api/resume/delSkillHobby",{id:id},{}).then((res) => {
          if (res.data.code == 0) {
            this.getData("/api/resume/getSkillHobbys", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getSkillHobbys = res.data.data;
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除作品展示
      delOpusShow:function (id) {
        this.postData("/api/resume/delOpusShow",{id:id},{}).then((res) => {
          if (res.data.code == 0) {
            this.getData("/api/resume/getOpusShows", {id: this.r_id}).then((res) => {
              if (res.data.code == 0) {
                this.data.getOpusShows = res.data.data;
              } else {
                console.log(res.data.message);
              }
            });
          } else {
            console.log(res.data.message);
          }
        });
      },
      //删除附件
      DeleteAttachment:function (AttachmentId) {
        this.postData("/api/resume/deleteRelatedOption",{id:AttachmentId},{}).then((res) => {
          if (res.data.code == 0) {
            this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
              if (res.data.code == 0) {
                this.data.getRelatedOption = res.data.data;
              } else {
                console.log(res.data.message);
              }
            });
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
              let imgData=res.data.data;
              if(this.page.tr1){
                this.data.getUser.avatar=res.data.data.realPath;
              }else{
                this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
                  if (res.data.code == 0) {
                    console.log(res.data.data)
                    if(res.data.data.name==""){
                      this.postData2("/api/resume/commitRelatedOption",{id:"",memberId:this.s_id,name:imgData.originalFilename ,options:imgData.fileName,resumeId:this.r_id,type:0}).then((res)=> {
                        if (res.data.code == 0) {
                          this.getData("/api/resume/getRelatedOption", {id: this.r_id, type: 0}).then((res) => {
                            if (res.data.code == 0) {
                              console.log(res.data.data)
                              this.data.getRelatedOption = res.data.data;
                            } else {
                              console.log(res.data.message);
                            }
                          });
                        } else {
                          console.log(res.data.message);
                        }
                      });
                    }else{
                      alert("已存在附件，请删除后重新添加")
                    }
                    this.data.getRelatedOption = res.data.data;
                  } else {
                    console.log(res.data.message);
                  }
                });
              }
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
<style lang="scss">
  .online_resume_wed{
    #job_addr1 span{
      margin-left:20px;
      font-size: 15px;
    }
    #job_addr p{
      padding: 10px 0;
    }
    #job_addr span {
      margin: 3px 5px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
    .inf:hover {
      background: #f4f4f4;
    }
    #myDate{
      margin-left: 95px;
      height: 34px;
      width: 360px;
    }
    #Month{

      width: 160px;
      height: 34px;
      float: left;
    }
     .content {
      background: #f4f4f4;
      width: 100%;
      height: 100%;
    }

    .online_resume {
      width: 1030px;
      margin: 0 auto;
      padding-top: 40px;
    }

    .bg_fff {
      background: #fff;
    }

    .online_resume .online_resume_nav {
      width: 100%;
      height: 56px;
      line-height: 56px;
      position: relative;
      box-sizing: border-box;
      padding: 0 0 0 90px;
    }

    .online_resume .online_resume_nav a {
      color: #777777;
      display: inline-block;
      position: absolute;
      left: 15px;
      top: 18px;
      line-height: 20px;
    }

    .online_resume .online_resume_nav .name {
      font-size: 18px;
      color: #333333;
      display: inline-block;
      margin-left: 30px;
      max-width: 320px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      overflow: hidden;
      vertical-align: bottom;
    }

    .online_resume .online_resume_nav .change_name {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(http://39.106.117.195/image/lcon/pen.svg);
      cursor: pointer;
      vertical-align: sub;
      position: relative;
    }

    .online_resume .online_resume_nav .close_tip {
      color: #fff;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      position: absolute;
      bottom: -26px;
      left: 160px;
      z-index: 19891016;
      display: none;
      cursor: pointer;
    }

    .online_resume .online_resume_nav .change_lag {
      color: #333333;
      display: inline-block;
      margin-left: 20px;
    }

    .online_resume select {
      font-family: 'Microsoft YaHei';
    }

    .online_resume_nav > .yuandxia {
      color: #555555;
      width: 133px;
      line-height: 56px;
      position: absolute;
      top: 0;
      right: 0;
    }

    .online_resume_nav .yuandxia > span {
      cursor: pointer;
      margin-right: 15px;
      font-size: 13px;
      color: #777777;
    }

    .online_resume .resume_content_left {
      padding: 35px 35px 0 35px;
      width: 700px;
    }

    .online_resume .resume_content_right {
      width: 234px;
      position: absolute;
      right: 0px;
      top: 20px;
      color: #447791;
      background-color: #fff;
    }

    .content {
      position: relative;
      padding-top: 20px;
      min-height: 400px;
    }

    .aside_header {
      font-size: 16px;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
    }

    .aside > dl {
      padding: 10px;
      background-color: #fff;
    }

    .aside_inf {
      position: relative;
      padding: 5px 10px;
      margin: 3px 0;
      cursor: pointer;
    }

    dl {
      padding: 10px;
      background-color: #fff;
      font-size: 14px;
    }

    .must {
      cursor: default;
    }

    dt {
      display: block;
    }

    .aside_inf_flg {
      display: inline-block;
      width: 18px;
      height: 16px;
      position: absolute;
      right: 0;
      top: 8px;
      background: url(//sxsimg.xiaoyuanzhao.com/static/img/kuang.png) no-repeat;
    }

    .aside_inf_flg_ok {
      background: url(//sxsimg.xiaoyuanzhao.com/static/img/gou.png) no-repeat;
    }

    .res_header {
      width: 100%;
      height: 45px;
      border-bottom: 2px solid #858f99;
      margin-top: 0;
      background: url(http://39.106.117.195/image/logo/logo.png) no-repeat;
    }

    h1 {
      display: block;
      font-size: 2em;
      -webkit-margin-before: 0.67em;
      -webkit-margin-after: 0.67em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      font-weight: bold;
    }

    .sec_box {
      overflow: hidden;
      position: relative;
    }

    .complete {
      overflow: hidden;
    }

    .section_item {
      cursor: pointer;
      padding: 20px 5px;
      overflow: hidden;
      border-bottom: 1px solid #eee;
    }

    .bas_inf img {
      width: 100px;
      height: 100px;
      float: left;
      background: #abcdef;
    }

    .complete p {
      color: #333;
    }

    .bas_inf_inf {
      padding-left: 160px;
    }

    .bas_inf_inf > span {
      display: block;
      color: #858f99;
    }

    .complete span {
      color: #333;
    }

    .bas_inf_inf .stu_name {
      font-size: 18px;
      color: #447791;
      padding: 15px 0;
    }

    .complete .stu_name {
      color: #447791;
    }

    input {
      outline: none;
      font-family: "Microsoft YaHei", Verdana, Arial;
    }


    .complete span {
      color: #333;
      font-size: 14px;
    }

    .ico {
      font-size: 18px;
      color: #447791;
      margin-bottom: 0;
      position: relative;
      padding-left: 30px;
    }

    h2 {
      display: block;
      font-size: 1.5em;
      -webkit-margin-before: 0.83em;
      -webkit-margin-after: 0.83em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      font-weight: bold;
    }

    .ico:before {
      content: '';
      position: absolute;
      left: 0;
      width: 23px;
      height: 23px;
      background-image: url(//sxsimg.xiaoyuanzhao.com/static/img/resume_manage_ico.png);
    }

    .complete p {
      color: #333;
    }

    .inf {
      width: 100%;
      margin: 0;
      font-size: 14px;
      position: relative;
    }
    .inf>.delete{
      position: absolute;
      right: 20px;
      top:0px;
      padding-top: 10px;
    }

    .inf > p {
      position: relative;
      margin: 15px 0;
    }

    .hid {
      height: 20px;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    .show_fil_name {
      padding: 15px 0 15px 125px;
      position: relative;
    }

    .close_file {
      position: absolute;
      width: 20px;
      text-align: center;
      line-height: 20px;
      top: 0;
      right: 0;
      font-size: 18px;
      color: #999;
      display: none;
      cursor: pointer;
    }

    .filr_box {
      padding: 20px;
      display: none;
      position: relative;
    }

    .rate_name {
      width: 50%;
      margin: auto;
      display: none;
    }

    .rate_box {
      width: 50%;
      margin: auto;
      height: 2px;
      background: #fff;
      position: relative;
      border: 1px solid #ccc;
      display: none;
    }

    .rate {
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      background-color: #ccc;
      width: 0;
    }

    .filr_box {
      padding: 20px;
      display: none;
      position: relative;
    }

    .up_erro {
      display: none;
      position: absolute;
      left: 85px;
      font-size: 12px;
      top: 75%;
      color: red;
    }

    .com_logo {
      width: 220px;
    }

    #file_length {
      font-size: 12px;
    }

    #file_rate {
      font-size: 12px;
    }

    .add_accti {
      width: 100%;
      margin: 10px 0 0 0;
      text-align: center;
      font-size: 14px;
      color: #aaa;
    }

    .webuploader-container {
      position: relative;
    }

    .add_acc {
      width: 400px;
      /* line-height: 40px; */
      margin: 10px auto 30px;
      text-align: center;
      /* border: 1px solid #ddd; */
      /* cursor: pointer; */
      /* color: #555555; */
      /* position: relative; */
    }

    .webuploader-pick {
      position: relative;
      display: inline-block;
      cursor: pointer;
      background: #00b7ee;
      padding: 10px 15px;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
    }

    input {
      outline: none;
      font-family: "Microsoft YaHei", Verdana, Arial;
    }

    .webuploader-element-invisible {
      position: absolute;
      top:0px;
      left: 50px;
      width: 86px;
      height: 42px;
    }

    .shade {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      cursor: pointer;
    }

    .change_res {
      width: 540px;
      max-height: 550px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -250px 0 0 -265px;
      z-index: 3;
      border-radius: 15px;

    }

    /*@media screen and (max-height: 560px)*/
    .change_res {
      max-height: 90%;
      top: 5%;
      width: 560px;
      margin-top: 0;
      overflow: hidden;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .change_res > div {
      width: 100%;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 0 5px 0 #333;
    }

    .change_header {
      font-size: 18px;
      color: #333333;
      text-align: center;
      padding: 18px 0;
      border-bottom: 1px solid #ddd;
    }

    .header_text {
      text-align: center;
    }

    .change_section {
      padding-top: 10px;
    }

    .header_text {
      font-size: 14px;
    }

    .d_change_header {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
    }

    .change_sec_head {
      display: block;
      width: 73px;
      float: left;
      line-height: 36px;
      text-align: right;
    }

    .v_itm {
      border: 1px solid #ddd;
      font-size: 14px;
    }

    input.change_sec_inf {
      height: 34px;
      color: #333333;
      padding: 0 8px;
      font-size: 14px;
    }

    .change_sec_inf {
      display: inline-block;
      width: 73.2%;
      margin-left: 22px;
    }

    .change_section {
      border-top: 1px solid #ddd;
      padding: 10px 25px 5px;
      position: relative;
    }

    select.sec_1 {
      margin: 0 0 0 22px;
    }

    .change_sec_item {
      height: 36px;

    }

    select.change_sec_inf {
      height: 38px;
      width: 77%;
      outline: none;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #333333;
      background: #fff;
    }

    select.city_choose_f {
      width: 20%;
    }

    select.city_choose_s {
      width: 20%;
    }

    .change_sec_inf.select_sec {
      width: 35.8%;
    }

    select.major_subject {
      width: 20%;
    }

    select.major_class {
      width: 52%;
      margin-left: 24px;
    }

    .change_sec_item {
      margin: 15px 0;
      /* line-height: 36px; */
    }

    .tips {
      margin-left: 95px;
      color: #999;
      /* color: yellow; */
    }

    .tips {
      font-size: 14px;
    }

    .change_footer {
      width: 100%;
      height: 70px;
      border-top: 1px solid #ddd;
    }

    .change_footer .btn {
      border: none;
      outline: none;
      padding: 6px 15px;
      color: #fff;
      font-size: 18px;
      border-radius: 5px;
      background: #4dd5ff;
      float: right;
      margin: 20px 30px;
      cursor: pointer;
      font-family: inherit;
    }

    .icontips {
      vertical-align: middle;
    }

    .city-choose {
      position: relative;
    }

    .city_add, .city_delete {
      position: absolute;
      right: -10px;
      top: 5px;
    }

    .change_sec_inf > span {
      cursor: pointer;
      display: inline-block;
      width: 45px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #ddd;
      margin: 0 7px 0 0;
      color: #555555;
      font-size: 14px;
      line-height: 20px;
      margin-top: 8px;
    }

    .change_sec_inf .active {
      background: #4dd5ff;
      color: #fff;
    }

    select.sec_item4 {
      width: 17.5%;
      margin-left: 0;
    }

    select.sec_1 {
      margin: 0 0 0 22px;
    }

    .change_day {
      width: 75%;
      height: 34px;
      margin-left: 22px;
      padding-left: 8px;
      font-size: 14px;
    }

    .must_star {
      color: red;
    }

    select.sec_item2 {
      width: 36%;
      margin-left: 0;
    }

    select.sec_1 {
      margin: 0 0 0 22px;
    }

    .change_sec_item textarea {
      outline: none;
      padding: 8px;
      resize: none;
      min-height: 100px;
      border: 1px solid #ddd;
      font-family: "Microsoft YaHei", Verdana, Arial;
    }

    .add_item {
      width: 470px;
      margin: 0 auto 10px;
      text-align: center;
      line-height: 38px;
      border: 1px dashed #ddd;
      cursor: pointer;
      font-size: 14px;
      line-height: 40px;
    }

    .add_item h2 {
      display: inline-block;
      margin: 0;
    }

    .change_section_box {
      overflow-y: scroll;
      width: 540px;
      height: 365px;
      padding-bottom: 40px;
    }

    .change_section_box::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    .change_section_box::-webkit-scrollbar-thumb {
      background: #f1f1f1;
      border-radius: 7px;
    }

    .change_section_box::-webkit-scrollbar-thumb:hover {
      background: #bdbdbd;
    }

    .demo-btn {
      margin-left: 95px;
      color: #02a0e9;
      font-size: 14px;
      /*line-height: 20px;*/
    }

    .demo-text {
      /*display: none;*/
      border: 1px solid #eee;
      padding: 10px;
      margin-left: 10px;
      margin-top: 14px;
      width: 90.2%;
      position: relative;
      box-shadow: 0px 0px 3px #eee;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 20px;
    }

    .demo-text:before {
      width: 14px;
      height: 14px;
      border: 1px solid;
      content: '';
      position: absolute;
      left: 102px;
      top: -8px;
      background: #ffffff;
      transform: rotate(45deg);
      border-color: #eee transparent transparent #eee;
    }

    pre {
      white-space: pre-wrap; /*css-3*/
      white-space: -moz-pre-wrap; /*Mozilla,since1999*/
      white-space: -pre-wrap; /*Opera4-6*/
      white-space: -o-pre-wrap; /*Opera7*/
      word-wrap: break-word; /*InternetExplorer5.5+*/
    }

    .change_section {
      border-top: 1px solid #ddd;
      padding: 10px 25px 5px;
      position: relative;
    }

    .self_change textarea {
      outline: none;
      padding: 15px;
      resize: none;
      min-height: 100px;
      width: 415px;
      font-family: "Microsoft YaHei", Verdana, Arial;
      border: 1px solid #ddd;
    }
  }
</style>
