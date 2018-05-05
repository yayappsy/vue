import Vue from 'vue'
import Router from 'vue-router'


import CompanyHome from '@/components/CompanyHome'
import CompanyHR from '@/components/CompanyHR'
import CompanyResume from '@/components/CompanyResume'
import CompanyBaseInformation from '@/components/CompanyBaseInformation'
import CompanyIssue from '@/components/CompanyIssue'
import CompanyEmploy from '@/components/CompanyEmploy'
import CompanyPosition from '@/components/CompanyPosition'
import CompanyAccount from '@/components/CompanyAccount'
import CompanylssueMessage from '@/components/CompanylssueMessage'


//应聘管理  页面导入文件
import CompanyEmployPending from '@/components/CompanyEmploy/CompanyEmployPending'
import CompanyEmployFilter from '@/components/CompanyEmploy/CompanyEmployFilter'
import CompanyEmployPass from '@/components/CompanyEmploy/CompanyEmployPass'
import CompanyemployInappropriate from '@/components/CompanyEmploy/CompanyemployInappropriate'
import CompanyEmployAccepted from '@/components/CompanyEmploy/CompanyEmployAccepted'
import CompanyEmployUndetermined from '@/components/CompanyEmploy/CompanyEmployUndetermined'

//职位管理  页面导入文件
import CompanyPositionRecruiting from '@/components/CompanyPosition/CompanyPositionRecruiting'
import CompanyPositionDownline from '@/components/CompanyPosition/CompanyPositionDownline'
import CompanyPositionPast from '@/components/CompanyPosition/CompanyPositionPast'
import CompanyPositionAudit from '@/components/CompanyPosition/CompanyPositionAudit'

//发布职位  页面导入文件
import CompanyIssueRelease from "@/components/CompanyIssue/CompanyIssueRelease"
import CompanyIssuePreview from "@/components/CompanyIssue/CompanyIssuePreview"

//账号管理
import CompanyAccountInformation from "@/components/CompanyAccount/CompanyAccountInformation"
import CompanyAccountPassworld from "@/components/CompanyAccount/CompanyAccountPassworld"
import CompanyAccountBind from "@/components/CompanyAccount/CompanyAccountBind"
//企业验证
import CompanyAccountVerification from "@/components/CompanyAccount/CompanyAccountVerification"
import CompanyAccountVerification_1 from "@/components/CompanyAccount/CompanyAccountVerification_1"
import CompanyAccountVerification_2 from "@/components/CompanyAccount/CompanyAccountVerification_2"
import CompanyAccountVerification_3 from "@/components/CompanyAccount/CompanyAccountVerification_3"

//绑定手机页面
import CompanyBindPhoneNumber from '@/components/CompanyBindPhoneNumber'

//企业注册
import CompanyRegister from '@/components/CompanyRegister'

import CompanyRegisterProtocol from '@/components/CompanyRegisterProtocol'

//学生
//首页
import StudentHome from '@/html/home'

//搜索
import StudentSearch from '@/html/search'
import recruitDetails from '@/html/recruitDetails'
//个人中心
import Personal_Center from '@/html/Personal_Center'

//内推信息
import push_message from  '@/html/push_message'

//内推信息
import push_details from  '@/html/push_details'

//课程培训
import curriculum_training from '@/html/curriculum_training'

//课程详情
import course_details from '@/html/course_details'

//了解我们
import understand from '@/html/understand'

//学生注册
import Student_register from '@/html/Student_register'

//完善信息
import Perfect_information from '@/html/Perfect_information'

//在线简历
import online_resume from '@/html/online_resume'

//上传简历
import my_resume from '@/html/my_resume'

//帮助中心
import Help_center from '@/html/Help_center.vue'

//公司主页
import company_home from '@/html/company_home.vue'

//账号设置
import Account_Settings from '@/html/Account_Settings'

import account_Settings_password from '@/html/account_Settings/account_Settings_password'
import account_Settings_binding from '@/html/account_Settings/account_Settings_binding'

//我的信息C:\Users\admin\Desktop\Disciple_Job\mentu\src\html\myInformation\my_collect.vue
import my_information from '@/html/my_information'

//我的收藏
import my_collect from '@/html/myInformation/my_collect'

//推荐职位
import my_match from '@/html/myInformation/my_match'

//私信详情
import my_invite from '@/html/myInformation/my_invite'

//私信
import my_message from '@/html/myInformation/my_message'

//查看简历
import lookResume from '@/html/lookResume'

//聊天
import chat from '@/html/chat'

//聊天
import findpwd from '@/html/findpwd'


//
Vue.use(Router);

export default new Router({
  routes: [
    //*学生*/
    {
      //学生首页
      path: '/',
      name: 'StudentHome',
      component: StudentHome//lookResume
    },
    {
      //学生首页
      path: '/StudentHome',
      name: 'StudentHome',
      component: StudentHome
    },
    {
      //忘记密码
      path:'/findpwd',
      name:'findpwd',
      component:findpwd
    },
    {
      //预览简历
      path: '/LookResume/:ids',
      name: 'LookResume',
      component: lookResume
    },
    {   //个人中心
      path:'/Personal_Center',
      name:'Personal_Center',
      component:Personal_Center
    },

    {   //内推信息
      path:'/push_message',
      name:'push_message',
      component:push_message
    },
    {   //内推详情
      path:'/push_details/:pushData',
      name:'push_details',
      component:push_details
    },
    {   //课程培训
      path:'/curriculum_training',
      name:'curriculum_training',
      component:curriculum_training
    },
    {   //课程详情
      path:'/course_details/:lists',
      name:'course_details',
      component:course_details
    },
    { //搜索
      path:'/search/:searchName',
      name:'search',
      title:'search',
      component:StudentSearch
    },{   //招聘详情
      path:'/recruitDetails/:searchData',
      name:'recruitDetails',
      component:recruitDetails
    },{   //了解我们
      path:'/understand',
      name:'understand',
      component:understand
    },


    {   //学生注册
      path:'/Student_register',
      name:'Student_register',
      component:Student_register
    },
    {   //完善信息
      path:'/Perfect_information',
      name:'Perfect_information',
      title:'Perfect_information',
      component:Perfect_information
    },



    {   //在线简历
      path:'/online_resume/:rid',
      name:'online_resume',
      title:'online_resume',
      component:online_resume
    },
    {
      //上传简历
      path:'/my_resume/:rid',
      name:'my_resume',
      title:'my_resume',
      component:my_resume
    },
    {   //帮助中心
      path:'/Help_center',
      name:'Help_center',
      title:'Help_center',
      component:Help_center
    },
    //聊天界面
    {
      path:'chat',
      name:'chat',
      title:'sixin',
      component:chat
    },
    {   //公司主页
      path:'/company_home/:CompanyData',
      name:'company_home',
      title:'company_home',
      component:company_home
    },
    {   //账号设置
      path:'/Account_Settings',
      name:'Account_Settings',
      title:'Account_Settings',
      component:Account_Settings,
      children: [
        //修改密码
        {
          path: "/Account_Settings",
          name: "account_Settings_password",
          component:account_Settings_password
        },
        //修改密码
        {
          path: "/Account_Settings/account_Settings_password",
          name: "account_Settings_password",
          component:account_Settings_password
        },
        //绑定账号
        {
          path: "/Account_Settings/account_Settings_binding",
          name: "account_Settings_binding",
          component:account_Settings_binding
        }
      ]
    },
    {   //我的信息
      path:'/my_information',
      name:'my_information',
      component:my_information,
      children: [
        {
          //我的收藏
          path: "/my_information",
          name: "my_collect",
          component:my_match
        },
        {
          //我的收藏
          path: "/my_information/my_collect",
          name: "my_collect",
          component:my_collect
        },
        {
          //职位推荐
          path: "/my_information/my_match",
          name: "my_match",
          component:my_match
        },{
          //职位邀请
          path: "/my_information/my_invite/:list",
          name: "my_invite",
          component:my_invite
        },{
          path: "/my_information/my_message",
          name: "my_message",
          component:my_message
        }
      ]
    },
    /*企业*/
    {
      //首页
      path: '/companyhome',
      name: 'CompanyHome',
      component: CompanyHome
    },
    {
      //HR中心
      path: '/companyhr',
      name: 'CompanyHR',
      component: CompanyHR
    },
    {
      //企业端聊天
      path: '/companylssueMessage',
      name: 'companylssueMessage',
      component: CompanylssueMessage
    },
    {
      //完善公司基本资料
      path: '/companybaseinformation',
      name: 'companybaseinformation',
      component: CompanyBaseInformation
    },

    {
      //发布职位
      path: '/companyissue',
      name: 'companyissue',
      component: CompanyIssue,
      children: [
        {
          path: "/companyissue",
          name: "CompanyIssueRelease",
          component: CompanyIssueRelease,
        },
        {
          path: "/companyissue/:list",
          name: "CompanyIssueRelease2",
          component: CompanyIssueRelease,
        },
        {
          path: "my_message",
          name: "my_message",
          component: my_message,

        }
      ]
    },
    //预览
    {
      path: "/companyissue/companyissuepreview",
      name: "CompanyIssuePreview",
      component: CompanyIssuePreview,
    },
    //绑定手机号页面
    {
      path: "/companybindphonenumber",
      name:'CompanyBindPhoneNumber',
      component:CompanyBindPhoneNumber,
    },
    //企业注册
    {
      path:'/companyregister',
      name:'CompanyRegister',
      component:CompanyRegister,
    },
    {
      path:'/companyregisterprotocol',
      name:'CompanyRegisterProtocol',
      component:CompanyRegisterProtocol,
    },
    {
      //应聘管理
      path: '/companyemploy',
      name: 'companyemploy',
      component: CompanyEmploy,
      children: [
        {
          path: "/companyemploy/",
          name: "/companyemploy/companyEmployPending",
          component: CompanyEmployPending,
        },
        {
          path: "/companyemploy/companyemploypending",
          name: "companyEmployPending",
          component: CompanyEmployPending,
        },
        {
          path: "/companyemploy/companyemployfilter",
          name: "companyEmployFilter",
          component: CompanyEmployFilter,
        },
        {
          path: "/companyemploy/companyemploypass",
          name: "CompanyEmployPass",
          component: CompanyEmployPass,
        },
        {
          path: "/companyemploy/companyemployinappropriate",
          name: "CompanyemployInappropriate",
          component: CompanyemployInappropriate,
        },
        {
          path: "/companyemploy/companyemployaccepted",
          name: "CompanyEmployAccepted",
          component: CompanyEmployAccepted,
        },
        {
          path: "/companyemploy/companyemployundetermined",
          name: "CompanyEmployUndetermined",
          component: CompanyEmployUndetermined,
        },
      ]
    },
    {
      //职位管理
      path: '/companyposition',
      name: 'companyposition',
      component: CompanyPosition,
      children: [
        {
          path: "/companyposition",
          name: "CompanyPositionRecruiting",
          component: CompanyPositionRecruiting,
        },
        {
          path: "/companyposition/companypositionrecruiting",
          name: "companypositionrecruiting",
          component: CompanyPositionRecruiting,
        },
        {
          path: "/companyposition/companypositiondownline",
          name: "companypositiondownline",
          component: CompanyPositionDownline,
        },
        {
          path: "/companyposition/companypositionpast",
          name: "companypositionpast",
          component: CompanyPositionPast,
        },
        {
          path: "/companyposition/companypositionaudit",
          name: "companypositionaudit",
          component: CompanyPositionAudit,
        },
      ]
    },
    {
      //账户管理
      path: '/companyaccount',
      name: 'companyaccount',
      component: CompanyAccount,
      children:[
        {
          //企业信息
          path: "/companyaccount",
          name: "companyaccountinformation",
          component: CompanyAccountInformation,
        },
        {
          path: "/companyaccount/companyaccountinformation",
          name: "companyaccountinformation",
          component: CompanyAccountInformation,
        },
        {
          //企业验证
          path: "/companyaccount/companyaccountverification",
          name: "CompanyAccountVerification",
          component: CompanyAccountVerification,
        },
        {
          path: "/companyaccount/companyaccountverification_1",
          name: "CompanyAccountVerification_1",
          component: CompanyAccountVerification_1,
        },
        {
          path: "/companyaccount/companyaccountverification_2",
          name: "CompanyAccountVerification_2",
          component: CompanyAccountVerification_2,
        },
        {
          path: "/companyaccount/companyaccountverification_3",
          name: "CompanyAccountVerification_3",
          component: CompanyAccountVerification_3,
        },
        {
          //更改密码
          path: "/companyaccount/companyaccountpassworld",
          name: "CompanyAccountPassworld",
          component: CompanyAccountPassworld,
        },
        {
          // 账户绑定
          path: "/companyaccount/companyaccountbind",
          name: "CompanyAccountBind",
          component: CompanyAccountBind,
        },
      ],
    }
  ]
})
