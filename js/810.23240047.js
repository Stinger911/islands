"use strict";(globalThis["webpackChunkislands"]=globalThis["webpackChunkislands"]||[]).push([[810],{810:(e,t,a)=>{a.r(t),a.d(t,{default:()=>I});var l=a(9835),n=a(1957),s=a(6970);const o=e=>((0,l.dD)("data-v-7ab1ed27"),e=e(),(0,l.Cn)(),e),r=o((()=>(0,l._)("div",{class:"row items-center no-wrap"},[(0,l._)("div",{class:"col"},[(0,l._)("div",{class:"text-h6 text-center"},"Login")])],-1))),d={key:0,class:"items-center text-center text-warning",style:{height:"150px"}},i=o((()=>(0,l._)("b",null,"No saved games found",-1))),u={class:"text-left text-lumi"},c={class:"text-right date-time text-lumi"},m={class:"text-right text-ui"};function g(e,t,a,o,g,p){const w=(0,l.up)("q-card-section"),k=(0,l.up)("q-select"),h=(0,l.up)("q-separator"),f=(0,l.up)("q-tooltip"),_=(0,l.up)("q-icon"),b=(0,l.up)("q-btn"),v=(0,l.up)("q-input"),x=(0,l.up)("q-markup-table"),y=(0,l.up)("q-card"),N=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(N,{class:"backed row items-center justify-center"},{default:(0,l.w5)((()=>[(0,l.Wm)(y,{flat:"",bordered:"",class:"my-card bg-grey-8",style:{width:"50%"}},{default:(0,l.w5)((()=>[(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[r])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(k,{rounded:"",outlined:"",dense:"","options-dense":"",modelValue:o.gtype,"onUpdate:modelValue":t[0]||(t[0]=e=>o.gtype=e),options:o.options,"emit-value":"","map-options":""},null,8,["modelValue","options"])])),_:1}),(0,l.Wm)(h),"local"==o.gtype?((0,l.wg)(),(0,l.j4)(w,{key:0,class:"text-center"},{default:(0,l.w5)((()=>[(0,l.Wm)(v,{outlined:"",modelValue:o.text,"onUpdate:modelValue":t[3]||(t[3]=e=>o.text=e),label:"Use local login",dense:"",rules:[e=>!!e||"Field is required"]},{append:(0,l.w5)((()=>[(0,l.Wm)(_,{name:"settings",onClick:t[1]||(t[1]=(0,n.iM)((e=>o.newName()),["stop","prevent"]))},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Uk)("Generate Name")])),_:1})])),_:1})])),after:(0,l.w5)((()=>[(0,l.Wm)(b,{label:"New Game",class:"game-btn",flat:"",onClick:t[2]||(t[2]=e=>o.localLogin())})])),_:1},8,["modelValue","rules"]),0==o.games.length?((0,l.wg)(),(0,l.iD)("div",d,[(0,l.Wm)(_,{name:"warning"}),(0,l.Uk)(),i])):(0,l.kq)("",!0),o.games.length>0?((0,l.wg)(),(0,l.j4)(x,{key:1,style:{"max-height":"150px",scroll:"auto"}},{default:(0,l.w5)((()=>[(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.games,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.userName},[(0,l._)("td",u,(0,s.zw)(e.userName),1),(0,l._)("td",c,(0,s.zw)(e.sDate),1),(0,l._)("td",m,[(0,l.Wm)(b,{round:"",dense:"",flat:"",color:"negative",icon:"cancel",onClick:t=>o.delGame(e.userName)},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Uk)("Delete this game")])),_:1})])),_:2},1032,["onClick"]),(0,l.Wm)(b,{round:"",dense:"",flat:"",icon:"send"},{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Uk)("Continue saved game")])),_:1})])),_:1})])])))),128))])])),_:1})):(0,l.kq)("",!0)])),_:1})):(0,l.kq)("",!0)])),_:1})])),_:1})}a(9665);var p=a(499),w=a(9085),k=a(9281),h=a.n(k),f=a(7907),_=a(5031);const b={name:"AuthPage",preFetch({store:e,redirect:t}){const a=(0,w.h)();a.logged&&t("/game")},setup(){const e=h()(Date.now(),{state:!0});let t=window.localStorage.getItem("savedGames");null==t&&(t="{}");const a=JSON.parse(t);var l=[];for(const n in a)a.hasOwnProperty(n)&&l.push(JSON.parse(a[n]));return{rng:e,text:(0,p.iH)((0,f.Ek)(e)+" "+(0,f.Ek)(e)),gtype:(0,p.iH)("local"),options:[{label:"Local Roguelike",value:"local"},{label:"Network Roguelike",value:"network"},{label:"Network Sandbox",value:"sandbox"}],games:(0,p.iH)(l),newName(){this.text=(0,f.Ek)(this.rng)+" "+(0,f.Ek)(this.rng)},localLogin(){const e=(0,_.g)(),t=(0,w.h)();e.newGame(this.text),t.login()},delGame(e){let t={};try{t=JSON.parse(window.localStorage.getItem("savedGames")),null==t&&(t={})}catch{t={}}delete t[e],console.log(e,t),window.localStorage.setItem("savedGames",JSON.stringify(t));var a=[];for(const l in t)t.hasOwnProperty(l)&&a.push(JSON.parse(t[l]));this.games=a}}}};var v=a(1639),x=a(9885),y=a(4458),N=a(3190),q=a(9698),W=a(926),S=a(6611),Z=a(2857),C=a(6858),Q=a(4455),G=a(6933),D=a(9984),O=a.n(D);const U=(0,v.Z)(b,[["render",g],["__scopeId","data-v-7ab1ed27"]]),I=U;O()(b,"components",{QPage:x.Z,QCard:y.Z,QCardSection:N.Z,QSelect:q.Z,QSeparator:W.Z,QInput:S.Z,QIcon:Z.Z,QTooltip:C.Z,QBtn:Q.Z,QMarkupTable:G.Z})}}]);