(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{I2Mb:function(e,t,i){"use strict";i.r(t),i.d(t,"FoundModule",function(){return te});var n=i("ofXK"),s=i("fXoL"),o=i("lxb6"),c=i("tyNb");const r=function(){return["/found","movies","page",1]},a=function(e){return{"found__tab--active":e}};function l(e,t){if(1&e&&(s.Pb(0,"div",2),s.tc(1," movies"),s.Pb(2,"span",3),s.tc(3),s.Ob(),s.Ob()),2&e){const e=s.ac();s.ec("routerLink",s.ic(3,r))("ngClass",s.jc(4,a,e.findService.movieFlag)),s.zb(3),s.uc(e.findService.movieArr.length)}}const f=function(){return["/found","series","page",1]};function d(e,t){if(1&e&&(s.Pb(0,"div",2),s.tc(1," series"),s.Pb(2,"span",4),s.tc(3),s.Ob(),s.Ob()),2&e){const e=s.ac();s.ec("routerLink",s.ic(3,f))("ngClass",s.jc(4,a,e.findService.seriesFlag)),s.zb(3),s.uc(e.findService.seriesArr.length)}}const u=function(){return["/found","people","page",1]};function g(e,t){if(1&e&&(s.Pb(0,"div",2),s.tc(1," persons"),s.Pb(2,"span",5),s.tc(3),s.Ob(),s.Ob()),2&e){const e=s.ac();s.ec("routerLink",s.ic(3,u))("ngClass",s.jc(4,a,e.findService.peopleFlag)),s.zb(3),s.uc(e.findService.peopleArr.length)}}let p=(()=>{class e{constructor(e,t){this.findService=e,this.router=t}ngOnInit(){this.route=this.router.events.subscribe(e=>{void 0!==e.url&&(null!==e.url.match(/\bmovies\b/)?(this.findService.movieFlag=!0,this.findService.seriesFlag=!1,this.findService.peopleFlag=!1,window.localStorage.setItem("movieFlag",JSON.stringify(this.findService.movieFlag)),window.localStorage.setItem("seriesFlag",JSON.stringify(this.findService.seriesFlag)),window.localStorage.setItem("peopleFlag",JSON.stringify(this.findService.peopleFlag))):null!==e.url.match(/\bseries\b/)?(this.findService.movieFlag=!1,this.findService.seriesFlag=!0,this.findService.peopleFlag=!1,window.localStorage.setItem("movieFlag",JSON.stringify(this.findService.movieFlag)),window.localStorage.setItem("seriesFlag",JSON.stringify(this.findService.seriesFlag)),window.localStorage.setItem("peopleFlag",JSON.stringify(this.findService.peopleFlag))):(this.findService.movieFlag=!1,this.findService.seriesFlag=!1,this.findService.peopleFlag=!0,window.localStorage.setItem("movieFlag",JSON.stringify(this.findService.movieFlag)),window.localStorage.setItem("seriesFlag",JSON.stringify(this.findService.seriesFlag)),window.localStorage.setItem("peopleFlag",JSON.stringify(this.findService.peopleFlag))))})}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(o.a),s.Kb(c.c))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-found-nav"]],decls:4,vars:3,consts:[[1,"found__nav"],["class","found__tab",3,"routerLink","ngClass",4,"ngIf"],[1,"found__tab",3,"routerLink","ngClass"],[1,"found__movieCount"],[1,"found__seriesCount"],[1,"found__personCount"]],template:function(e,t){1&e&&(s.Pb(0,"div",0),s.rc(1,l,4,6,"div",1),s.rc(2,d,4,6,"div",1),s.rc(3,g,4,6,"div",1),s.Ob()),2&e&&(s.zb(1),s.ec("ngIf",0!==t.findService.movieArr.length),s.zb(1),s.ec("ngIf",0!==t.findService.seriesArr.length),s.zb(1),s.ec("ngIf",0!==t.findService.peopleArr.length))},directives:[n.k,c.d,n.i],styles:[""]}),e})();function v(e,t){1&e&&(s.Pb(0,"div"),s.Pb(1,"div",4),s.tc(2,"Not found"),s.Ob(),s.Ob())}function b(e,t){1&e&&(s.Lb(0,"app-found-nav"),s.Lb(1,"router-outlet"))}let h=(()=>{class e{constructor(e){this.findService=e,this.notFound=!1}ngOnInit(){this.notFound=this.findService.notFound}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(o.a))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-found"]],decls:5,vars:2,consts:[[1,"found"],[1,"container"],[4,"ngIf","ngIfElse"],["foundTrue",""],[1,"found__not"]],template:function(e,t){if(1&e&&(s.Pb(0,"section",0),s.Pb(1,"div",1),s.rc(2,v,3,0,"div",2),s.rc(3,b,2,0,"ng-template",null,3,s.sc),s.Ob(),s.Ob()),2&e){const e=s.lc(4);s.zb(2),s.ec("ngIf",t.notFound)("ngIfElse",e)}},directives:[n.k,p,c.g],styles:[""]}),e})();const _=["pageItem"],m=function(e){return["/found","movies","page",e]},w=function(e){return{"found__pagesMovie--active":e}};function O(e,t){if(1&e&&(s.Pb(0,"div",5),s.tc(1),s.Ob()),2&e){const e=t.$implicit,i=s.ac(2);s.ec("routerLink",s.jc(3,m,e+1))("ngClass",s.jc(5,w,e+1===i.pageMatch)),s.zb(1),s.vc(" ",e+1," ")}}function S(e,t){if(1&e){const e=s.Qb();s.Pb(0,"div",2,3),s.Wb("click",function(t){return s.nc(e),s.ac().switchPage(t)}),s.rc(2,O,2,7,"div",4),s.Ob()}if(2&e){const e=s.ac();s.zb(2),s.ec("ngForOf",e.quantityPages)}}let P=(()=>{class e{constructor(e,t){this.findServise=e,this.router=t,this.quantityPages=[],this.pagesExist=!0}ngOnInit(){this.countPages(),this.pageMatch=+window.location.pathname.match(/\d+/)[0],this.routerObservable=this.router.events.subscribe(e=>{if(void 0!==e.url&&e.url.match(/\bmovies\b/)){const t=this.pageItems.nativeElement.children;for(const i of t)i.classList.remove("found__pagesMovie--active"),i.innerText===e.url.match(/\d+/)[0]&&i.classList.add("found__pagesMovie--active")}window.scrollTo(0,0)})}ngOnDestroy(){this.routerObservable.unsubscribe()}countPages(){let e=this.findServise.movieArr.length;e/=10,e%10!=0&&(e=Math.ceil(e)),e<2&&(this.pagesExist=!1),this.quantityPages=Array(e).fill(0).map((e,t)=>t)}switchPage(e){if(!e.target.classList.contains("found__pagesMovie")){const t=e.target.parentNode.children;for(const e of t)e.classList.remove("found__pagesMovie--active");e.target.classList.add("found__pagesMovie--active")}window.scrollTo(0,0)}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(o.a),s.Kb(c.c))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-found-movie-list"]],viewQuery:function(e,t){if(1&e&&s.xc(_,1),2&e){let e;s.kc(e=s.Xb())&&(t.pageItems=e.first)}},decls:3,vars:1,consts:[[1,"found__content","found__content--movie"],["class","found__pagesMovie",3,"click",4,"ngIf"],[1,"found__pagesMovie",3,"click"],["pageItem",""],["class","found__pageItemMovie",3,"routerLink","ngClass",4,"ngFor","ngForOf"],[1,"found__pageItemMovie",3,"routerLink","ngClass"]],template:function(e,t){1&e&&(s.Pb(0,"div",0),s.Lb(1,"router-outlet"),s.rc(2,S,3,1,"div",1),s.Ob()),2&e&&(s.zb(2),s.ec("ngIf",t.pagesExist))},directives:[c.g,n.k,n.j,c.d,n.i],styles:[""]}),e})();const F=["pageItem"],I=function(e){return["/found","series","page",e]},k=function(e){return{"found__pagesSeries--active":e}};function L(e,t){if(1&e&&(s.Pb(0,"div",5),s.tc(1),s.Ob()),2&e){const e=t.$implicit,i=s.ac(2);s.ec("routerLink",s.jc(3,I,e+1))("ngClass",s.jc(5,k,e+1===i.pageMatch)),s.zb(1),s.vc(" ",e+1," ")}}function y(e,t){if(1&e){const e=s.Qb();s.Pb(0,"div",2,3),s.Wb("click",function(t){return s.nc(e),s.ac().switchPage(t)}),s.rc(2,L,2,7,"div",4),s.Ob()}if(2&e){const e=s.ac();s.zb(2),s.ec("ngForOf",e.quantityPages)}}let z=(()=>{class e{constructor(e,t){this.findServise=e,this.router=t,this.quantityPages=[],this.pagesExist=!0}ngOnInit(){this.countPages(),this.pageMatch=+window.location.pathname.match(/\d+/)[0],this.routerObservable=this.router.events.subscribe(e=>{if(void 0!==e.url&&e.url.match(/\bseries\b/)&&e.url.match(/\bfound\b/)){const t=this.pageItems.nativeElement.children;for(const i of t)i.classList.remove("found__pagesSeries--active"),i.innerText===e.url.match(/\d+/)[0]&&i.classList.add("found__pagesSeries--active")}window.scrollTo(0,0)})}ngOnDestroy(){this.routerObservable.unsubscribe()}countPages(){let e=this.findServise.seriesArr.length;e/=10,e%10!=0&&(e=Math.ceil(e)),e<2&&(this.pagesExist=!1),this.quantityPages=Array(e).fill(0).map((e,t)=>t)}switchPage(e){if(!e.target.classList.contains("found__pagesSeries")){const t=e.target.parentNode.children;for(const e of t)e.classList.remove("found__pagesSeries--active");e.target.classList.add("found__pagesSeries--active")}}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(o.a),s.Kb(c.c))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-found-series-list"]],viewQuery:function(e,t){if(1&e&&s.xc(F,1),2&e){let e;s.kc(e=s.Xb())&&(t.pageItems=e.first)}},decls:3,vars:1,consts:[[1,"found__content","found__content--series"],["class","found__pagesSeries",3,"click",4,"ngIf"],[1,"found__pagesSeries",3,"click"],["pageItem",""],["class","found__pageItemSeries",3,"routerLink","ngClass",4,"ngFor","ngForOf"],[1,"found__pageItemSeries",3,"routerLink","ngClass"]],template:function(e,t){1&e&&(s.Pb(0,"div",0),s.Lb(1,"router-outlet"),s.rc(2,y,3,1,"div",1),s.Ob()),2&e&&(s.zb(2),s.ec("ngIf",t.pagesExist))},directives:[c.g,n.k,n.j,c.d,n.i],styles:[""]}),e})();const E=["pageItem"],x=function(e){return["/found","people","page",e]},A=function(e){return{"found__pagesPerson--active":e}};function j(e,t){if(1&e&&(s.Pb(0,"div",5),s.tc(1),s.Ob()),2&e){const e=t.$implicit,i=s.ac(2);s.ec("routerLink",s.jc(3,x,e+1))("ngClass",s.jc(5,A,e+1===i.pageMatch)),s.zb(1),s.vc(" ",e+1," ")}}function M(e,t){if(1&e){const e=s.Qb();s.Pb(0,"div",2,3),s.Wb("click",function(t){return s.nc(e),s.ac().switchPage(t)}),s.rc(2,j,2,7,"div",4),s.Ob()}if(2&e){const e=s.ac();s.zb(2),s.ec("ngForOf",e.quantityPages)}}let C=(()=>{class e{constructor(e,t){this.findServise=e,this.router=t,this.quantityPages=[],this.pagesExist=!0}ngOnInit(){this.countPages(),this.pageMatch=+window.location.pathname.match(/\d+/)[0],this.routerObservable=this.router.events.subscribe(e=>{if(void 0!==e.url&&e.url.match(/\bpeople\b/)&&e.url.match(/\bfound\b/)){const t=this.pageItems.nativeElement.children;for(const i of t)i.classList.remove("found__pagesPerson--active"),i.innerText===e.url.match(/\d+/)[0]&&i.classList.add("found__pagesPerson--active")}window.scrollTo(0,0)})}ngDoCheck(){}ngOnDestroy(){this.routerObservable.unsubscribe()}countPages(){let e=this.findServise.peopleArr.length;e/=10,e%10!=0&&(e=Math.ceil(e)),e<2&&(this.pagesExist=!1),this.quantityPages=Array(e).fill(0).map((e,t)=>t)}switchPage(e){if(!e.target.classList.contains("found__pagesPerson")){const t=e.target.parentNode.children;for(const e of t)e.classList.remove("found__pagesPerson--active");e.target.classList.add("found__pagesPerson--active")}window.scrollTo(0,0)}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(o.a),s.Kb(c.c))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-found-people-list"]],viewQuery:function(e,t){if(1&e&&s.xc(E,1),2&e){let e;s.kc(e=s.Xb())&&(t.pageItems=e.first)}},decls:3,vars:1,consts:[[1,"found__content","found__content--person"],["class","found__pagesPerson",3,"click",4,"ngIf"],[1,"found__pagesPerson",3,"click"],["pageItem",""],["class","found__pageItemPerson",3,"routerLink","ngClass",4,"ngFor","ngForOf"],[1,"found__pageItemPerson",3,"routerLink","ngClass"]],template:function(e,t){1&e&&(s.Pb(0,"div",0),s.Lb(1,"router-outlet"),s.rc(2,M,3,1,"div",1),s.Ob()),2&e&&(s.zb(2),s.ec("ngIf",t.pagesExist))},directives:[c.g,n.k,n.j,c.d,n.i],styles:[""]}),e})();var N=i("R0Ic");function K(e,t){if(1&e&&s.Lb(0,"img",10),2&e){const e=s.ac().$implicit;s.gc("src","https://www.themoviedb.org/t/p/w220_and_h330_face",e.poster_path,"",s.pc),s.hc("srcset","https://www.themoviedb.org/t/p/w220_and_h330_face",e.poster_path," 1x, https://www.themoviedb.org/t/p/w440_and_h660_face",e.poster_path," 2x",s.pc)}}function J(e,t){1&e&&s.Lb(0,"img",11)}const q=function(e){return["/movieoverview",e]};function T(e,t){if(1&e&&(s.Pb(0,"div",3),s.rc(1,K,1,3,"img",4),s.rc(2,J,1,0,"ng-template",null,5,s.sc),s.Pb(4,"div",6),s.Pb(5,"p",7),s.tc(6),s.Ob(),s.Pb(7,"div",8),s.tc(8),s.bc(9,"date"),s.Ob(),s.Pb(10,"div",9),s.tc(11),s.Ob(),s.Ob(),s.Ob()),2&e){const e=t.$implicit,i=s.lc(3);s.fc("id",e.id),s.ec("routerLink",s.jc(10,q,e.id))("@item",void 0),s.zb(1),s.ec("ngIf",null!==e.poster_path)("ngIfElse",i),s.zb(5),s.vc(" ",e.title," "),s.zb(2),s.vc(" ",s.cc(9,8,e.release_date)," "),s.zb(3),s.vc(" ",e.overview," ")}}function $(e,t){if(1&e&&(s.Pb(0,"div"),s.rc(1,T,12,12,"div",2),s.Ob()),2&e){const e=s.ac();s.zb(1),s.ec("ngForOf",e.itemArr)}}function Q(e,t){if(1&e&&s.Lb(0,"img",10),2&e){const e=s.ac().$implicit;s.gc("src","https://www.themoviedb.org/t/p/w220_and_h330_face",e.poster_path,"",s.pc),s.hc("srcset","https://www.themoviedb.org/t/p/w220_and_h330_face",e.poster_path," 1x, https://www.themoviedb.org/t/p/w440_and_h660_face",e.poster_path," 2x",s.pc)}}function X(e,t){1&e&&s.Lb(0,"img",11)}const D=function(e){return["/seriesoverview",e]};function W(e,t){if(1&e&&(s.Pb(0,"div",3),s.rc(1,Q,1,3,"img",4),s.rc(2,X,1,0,"ng-template",null,5,s.sc),s.Pb(4,"div",6),s.Pb(5,"p",7),s.tc(6),s.Ob(),s.Pb(7,"div",8),s.tc(8),s.bc(9,"date"),s.Ob(),s.Pb(10,"div",9),s.tc(11),s.Ob(),s.Ob(),s.Ob()),2&e){const e=t.$implicit,i=s.lc(3);s.fc("id",e.id),s.ec("routerLink",s.jc(10,D,e.id))("@item",void 0),s.zb(1),s.ec("ngIf",null!==e.poster_path)("ngIfElse",i),s.zb(5),s.vc(" ",e.name," "),s.zb(2),s.vc(" ",s.cc(9,8,e.first_air_date)," "),s.zb(3),s.vc(" ",e.overview," ")}}function H(e,t){if(1&e&&(s.Pb(0,"div"),s.rc(1,W,12,12,"div",2),s.Ob()),2&e){const e=s.ac(2);s.zb(1),s.ec("ngForOf",e.itemArr)}}function R(e,t){if(1&e&&s.Lb(0,"img",10),2&e){const e=s.ac().$implicit;s.gc("src","https://www.themoviedb.org/t/p/w220_and_h330_face",e.profile_path,"",s.pc),s.hc("srcset","https://www.themoviedb.org/t/p/w220_and_h330_face",e.profile_path," 1x, https://www.themoviedb.org/t/p/w440_and_h660_face",e.profile_path," 2x",s.pc)}}function B(e,t){1&e&&s.Lb(0,"img",11)}const G=function(e){return["/personoverview",e]};function U(e,t){if(1&e&&(s.Pb(0,"div",3),s.rc(1,R,1,3,"img",4),s.rc(2,B,1,0,"ng-template",null,5,s.sc),s.Pb(4,"div",6),s.Pb(5,"p",7),s.tc(6),s.Ob(),s.Pb(7,"div",13),s.tc(8),s.Ob(),s.Pb(9,"div",14),s.Pb(10,"p",15),s.tc(11),s.Ob(),s.Ob(),s.Ob(),s.Ob()),2&e){const e=t.$implicit,i=t.index,n=s.lc(3),o=s.ac(3);s.fc("id",e.id),s.ec("routerLink",s.jc(8,G,e.id))("@item",void 0),s.zb(1),s.ec("ngIf",null!==e.profile_path)("ngIfElse",n),s.zb(5),s.vc(" ",e.name," "),s.zb(2),s.vc(" ",e.known_for_department," "),s.zb(3),s.vc(" ",o.knownArr[i]," ")}}function V(e,t){if(1&e&&s.rc(0,U,12,10,"div",2),2&e){const e=s.ac(2);s.ec("ngForOf",e.itemArr)}}function Y(e,t){if(1&e&&(s.rc(0,H,2,1,"div",0),s.rc(1,V,1,1,"ng-template",null,12,s.sc)),2&e){const e=s.lc(2),t=s.ac();s.ec("ngIf",t.seriesFlag)("ngIfElse",e)}}let Z=(()=>{class e{constructor(e,t){this.findService=e,this.router=t,this.itemArr=[],this.movieFlag=!0,this.seriesFlag=!0,this.peopleFlag=!0,this.knownArr=[]}ngOnInit(){this.router.params.subscribe(e=>{let t;this.itemArr=[],this.findService.movieFlag?(t=this.findService.movieArr,this.seriesFlag=!1,this.movieFlag=!0,this.peopleFlag=!1):this.findService.seriesFlag?(t=this.findService.seriesArr,this.seriesFlag=!0,this.movieFlag=!1,this.peopleFlag=!1):(t=this.findService.peopleArr,this.seriesFlag=!1,this.movieFlag=!1,this.peopleFlag=!0);let i=+e.page;i=1==i?0:10*(i-1);const n=i+9;for(;i<=n;i++)void 0!==t[i]&&this.itemArr.push(t[i]);void 0!==this.itemArr[0].known_for&&this.peopleFlag&&this.itemArr.forEach(e=>{const t=[];e.known_for.forEach(e=>{void 0!==e.original_title&&t.push(e.original_title)}),this.knownArr.push(t.join(", "))})})}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(o.a),s.Kb(c.a))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-movie-content"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["other",""],["class","found__item",3,"id","routerLink",4,"ngFor","ngForOf"],[1,"found__item",3,"id","routerLink"],["class","found__poster","loading","lazy",3,"src","srcset",4,"ngIf","ngIfElse"],["alter",""],[1,"found__right"],[1,"found__title","title__movie"],[1,"found__release"],[1,"found__text"],["loading","lazy",1,"found__poster",3,"src","srcset"],["loading","lazy","src","https://st.depositphotos.com/2251265/2417/i/600/depositphotos_24176415-stock-photo-blank-poster-on-a-wood.jpg",1,"found__poster"],["people",""],[1,"found__text","found__text--person"],[1,"found__knownFor"],[1,"found__knownForItem"]],template:function(e,t){if(1&e&&(s.rc(0,$,2,1,"div",0),s.rc(1,Y,3,2,"ng-template",null,1,s.sc)),2&e){const e=s.lc(2);s.ec("ngIf",t.movieFlag)("ngIfElse",e)}},directives:[n.k,n.j,c.d],pipes:[n.d],styles:[""],data:{animation:[Object(N.i)("item",[Object(N.h)(":enter",[Object(N.g)({opacity:0}),Object(N.e)("850ms ease-out")])])]}}),e})();const ee=[{path:"",component:h,children:[{path:"movies",component:P,children:[{path:"page/:page",component:Z}]},{path:"series",component:z,children:[{path:"page/:page",component:Z}]},{path:"people",component:C,children:[{path:"page/:page",component:Z}]}]}];let te=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.Ib({type:e}),e.\u0275inj=s.Hb({imports:[[n.b,c.f.forChild(ee)],c.f]}),e})()}}]);