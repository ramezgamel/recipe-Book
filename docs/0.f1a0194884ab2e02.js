"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[0],{1e3:(_,c,l)=>{l.r(c),l.d(c,{AuthModule:()=>w});var p=l(9822),u=l(529),s=l(433),m=l(4466),t=l(8256);let d=(()=>{class n{constructor(e){this.viewContainerRef=e}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.s_b))},n.\u0275dir=t.lG2({type:n,selectors:[["","appPlaceHolder",""]]}),n})(),g=(()=>{class n{constructor(){this.close=new t.vpe}onClose(){this.close.emit()}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-alert"]],inputs:{message:"message"},outputs:{close:"close"},decls:7,vars:1,consts:[[1,"drop-down"],[1,"alert-box"],[1,"alert-box-actions"],[1,"btn","btn-primary",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"p"),t._uU(3),t.qZA(),t.TgZ(4,"div",2)(5,"button",3),t.NdJ("click",function(){return o.onClose()}),t._uU(6,"Close"),t.qZA()()()()),2&e&&(t.xp6(3),t.Oqu(o.message))},styles:[".drop-down[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#000000bf;z-index:2}.alert-box[_ngcontent-%COMP%]{position:fixed;top:30vh;left:30vw;width:40vw;padding:16px;background-color:#fff;box-shadow:0 2px 8px #00000040;z-index:3}.alert-box-actions[_ngcontent-%COMP%]{text-align:right}"]}),n})();var h=l(5599);let f=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-loading-spinner"]],decls:1,vars:0,consts:[[1,"lds-dual-ring"]],template:function(e,o){1&e&&t._UZ(0,"div",0)},styles:['.lds-dual-ring[_ngcontent-%COMP%]{display:inline-block;width:80px;height:80px}.lds-dual-ring[_ngcontent-%COMP%]:after{content:" ";display:block;width:64px;height:64px;margin:8px;border-radius:50%;border:6px solid rgb(52,27,161);border-color:rgb(52,27,161) transparent rgb(52,27,161) transparent;animation:lds-dual-ring 1.2s linear infinite}@keyframes lds-dual-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}']}),n})();var v=l(6895);function b(n,i){}function C(n,i){1&n&&(t.TgZ(0,"div",5),t._UZ(1,"app-loading-spinner"),t.qZA())}function x(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"form",6,7),t.NdJ("ngSubmit",function(){t.CHM(e);const r=t.MAs(1),a=t.oxw();return t.KtG(a.onSubmit(r))}),t.TgZ(2,"div",8)(3,"label",9),t._uU(4,"Email"),t.qZA(),t._UZ(5,"input",10),t.qZA(),t.TgZ(6,"div",8)(7,"label",11),t._uU(8,"Password"),t.qZA(),t._UZ(9,"input",12),t.qZA(),t.TgZ(10,"div")(11,"button",13),t._uU(12),t.qZA(),t._uU(13," | "),t.TgZ(14,"button",14),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.onSwitchMode())}),t._uU(15),t.qZA()()()}if(2&n){const e=t.MAs(1),o=t.oxw();t.xp6(11),t.Q6J("disabled",!e.valid),t.xp6(1),t.Oqu(o.isLoginMode?"Login":"Sign Up"),t.xp6(3),t.hij("Switch to ",o.isLoginMode?"Sign Up":"Login","")}}let A=(()=>{class n{constructor(e,o,r){this._authService=e,this._router=o,this.cmpFactoryResolver=r,this.isLoginMode=!0,this.isLoading=!1,this.error=""}onSwitchMode(){this.isLoginMode=!this.isLoginMode}onSubmit(e){let o;!e.valid||(this.isLoading=!0,o=this.isLoginMode?this._authService.login(e.value.email,e.value.password):this._authService.signUp(e.value.email,e.value.password),o.subscribe(r=>{this.isLoading=!1,this._router.navigate(["/recipes"])},r=>{this.error=r,this.ShowErrorAlert(r),this.isLoading=!1}),e.reset())}onHandleError(){this.error=null}ShowErrorAlert(e){const o=this.cmpFactoryResolver.resolveComponentFactory(g),r=this.hostView?.viewContainerRef,a=r?.createComponent(o);a.instance.message=e,this.closeSub=a?.instance.close.subscribe(()=>{this.closeSub.unsubscribe(),r?.clear()})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.e),t.Y36(p.F0),t.Y36(t._Vd))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-auth"]],viewQuery:function(e,o){if(1&e&&t.Gf(d,5),2&e){let r;t.iGM(r=t.CRH())&&(o.hostView=r.first)}},decls:5,vars:2,consts:[["appPlaceHolder",""],[1,"row"],[1,"col-xs-12","col-md-6","col-md-offset-3"],["style","text-align: center;",4,"ngIf"],[3,"ngSubmit",4,"ngIf"],[2,"text-align","center"],[3,"ngSubmit"],["authForm","ngForm"],[1,"form-group"],["for","email"],["type","email","id","email","ngModel","","name","email","required","","email","",1,"form-control"],["for","password"],["type","password","id","password","ngModel","","name","password","required","","minlength","6",1,"form-control"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button",1,"btn","btn-primary",3,"click"]],template:function(e,o){1&e&&(t.YNc(0,b,0,0,"ng-template",0),t.TgZ(1,"div",1)(2,"div",2),t.YNc(3,C,2,0,"div",3),t.YNc(4,x,16,3,"form",4),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("ngIf",o.isLoading),t.xp6(1),t.Q6J("ngIf",!o.isLoading))},dependencies:[s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.wO,s.on,s.On,s.F,f,d,v.O5]}),n})(),w=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.JF,s.u5,m.m,p.Bz.forChild([{path:"",component:A}])]}),n})()}}]);