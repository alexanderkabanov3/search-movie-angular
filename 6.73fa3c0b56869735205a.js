(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{rDna:function(e,t,i){"use strict";i.r(t),i.d(t,"DetailPeopleModule",function(){return w});var o=i("ofXK"),n=i("mrSG"),r=i("R0Ic"),s=i("fXoL"),c=i("tk/3"),a=i("tyNb");function p(e,t){1&e&&(s.Pb(0,"div",3),s.Lb(1,"div",4),s.Lb(2,"div",5),s.Lb(3,"div",6),s.Lb(4,"div",7),s.Ob())}function d(e,t){if(1&e&&s.Lb(0,"img",20),2&e){const e=s.ac(2);s.gc("src","https://www.themoviedb.org/t/p/w220_and_h330_face",e.item.profile_path,"",s.pc),s.hc("srcset","https://www.themoviedb.org/t/p/w220_and_h330_face",e.item.profile_path," 1x, https://www.themoviedb.org/t/p/w440_and_h660_face",e.item.profile_path," 2x",s.pc),s.ec("@item",void 0)}}function l(e,t){1&e&&s.Lb(0,"img",21)}function v(e,t){if(1&e&&s.Lb(0,"img",26),2&e){const e=s.ac().$implicit;s.gc("src","https://www.themoviedb.org/t/p/w220_and_h330_face",e.poster_path,"",s.pc)}}function b(e,t){1&e&&s.Lb(0,"img",27)}const h=function(e){return["/movieoverview",e]},_=function(e){return["/seriesoverview",e]};function g(e,t){if(1&e&&(s.Pb(0,"div",22),s.rc(1,v,1,1,"img",23),s.rc(2,b,1,0,"ng-template",null,11,s.sc),s.Pb(4,"p",24),s.tc(5),s.Ob(),s.Pb(6,"p",25),s.tc(7),s.bc(8,"date"),s.Ob(),s.Ob()),2&e){const e=t.$implicit,i=s.lc(3);s.ec("routerLink",e.title?s.jc(8,h,e.id):s.jc(10,_,e.id))("@item",void 0),s.zb(1),s.ec("ngIf",null!==e.poster_path)("ngIfElse",i),s.zb(4),s.uc(e.title||e.name),s.zb(2),s.vc(" ",s.cc(8,6,e.release_date||e.first_air_date)," ")}}function m(e,t){if(1&e&&(s.Pb(0,"div",8),s.Pb(1,"div",9),s.rc(2,d,1,4,"img",10),s.rc(3,l,1,0,"ng-template",null,11,s.sc),s.Pb(5,"div",12),s.Pb(6,"p",13),s.tc(7),s.Ob(),s.Pb(8,"p",14),s.tc(9),s.Ob(),s.Pb(10,"p",15),s.tc(11," Biography "),s.Ob(),s.Pb(12,"p",16),s.tc(13),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Pb(14,"div",17),s.Pb(15,"p",15),s.tc(16," Known for "),s.Ob(),s.Pb(17,"div",18),s.rc(18,g,9,12,"div",19),s.Ob(),s.Ob()),2&e){const e=s.lc(4),t=s.ac();s.zb(2),s.ec("ngIf",null!==t.item.profile_path)("ngIfElse",e),s.zb(5),s.vc(" ",t.item.name," "),s.zb(2),s.uc(t.item.known_for_department),s.zb(4),s.vc(" ",t.item.biography," "),s.zb(5),s.ec("ngForOf",t.known)}}let f=(()=>{class e{constructor(e,t){this.httpMovie=e,this.httpCredits=t,this.preLoader=!0,this.known=[]}ngOnInit(){const e=window.location.pathname.match(/\d+/)[0];this.fetchItem(e).then(e=>{this.item=e,this.bgImgPath=`https://image.tmdb.org/t/p/original${this.item.profile_path}`,this.searchMovies(this.item.imdb_id).then(e=>{0!==e.person_results.length&&(this.known=e.person_results[0].known_for),setTimeout(()=>{this.preLoader=!1},500)})})}fetchItem(e){return Object(n.a)(this,void 0,void 0,function*(){return yield this.httpMovie.get(`https://api.themoviedb.org/3/person/${e}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`).toPromise()})}searchMovies(e){return Object(n.a)(this,void 0,void 0,function*(){return yield this.httpCredits.get(`https://api.themoviedb.org/3/find/${e}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&external_source=imdb_id`).toPromise()})}}return e.\u0275fac=function(t){return new(t||e)(s.Kb(c.a),s.Kb(c.a))},e.\u0275cmp=s.Eb({type:e,selectors:[["app-detail-people"]],decls:4,vars:2,consts:[[1,"overview"],["class","loader",4,"ngIf","ngIfElse"],["mainContent",""],[1,"loader"],[1,"dash","uno"],[1,"dash","dos"],[1,"dash","tres"],[1,"dash","cuatro"],[1,"overview__topPerson"],[1,"container","overview__topBlock"],["class","overview__poster","loading","lazy",3,"src","srcset",4,"ngIf","ngIfElse"],["alter",""],[1,"overview__information"],[1,"overview__title","overview__title--person"],[1,"overview__known"],[1,"overview__castTitle","overview__castTitle--biography"],[1,"overview__biography"],[1,"container"],[1,"overview__knownBlock"],["class","overview__person",3,"routerLink",4,"ngFor","ngForOf"],["loading","lazy",1,"overview__poster",3,"src","srcset"],["loading","lazy","src","https://st.depositphotos.com/2251265/2417/i/600/depositphotos_24176415-stock-photo-blank-poster-on-a-wood.jpg",1,"overview__poster"],[1,"overview__person",3,"routerLink"],["class","overview__castPoster","loading","lazy",3,"src",4,"ngIf","ngIfElse"],[1,"overview__originalName"],[1,"overview__originalName","overview__originalName--character"],["loading","lazy",1,"overview__castPoster",3,"src"],["loading","lazy","src","https://st.depositphotos.com/2251265/2417/i/600/depositphotos_24176415-stock-photo-blank-poster-on-a-wood.jpg",1,"overview__castPoster"]],template:function(e,t){if(1&e&&(s.Pb(0,"div",0),s.rc(1,p,5,0,"div",1),s.rc(2,m,19,6,"ng-template",null,2,s.sc),s.Ob()),2&e){const e=s.lc(3);s.zb(1),s.ec("ngIf",t.preLoader)("ngIfElse",e)}},directives:[o.k,o.j,a.d],pipes:[o.d],styles:[""],data:{animation:[Object(r.i)("item",[Object(r.h)(":enter",[Object(r.g)({opacity:0}),Object(r.e)("850ms ease-out")])])]}}),e})(),w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.Ib({type:e}),e.\u0275inj=s.Hb({imports:[[o.b,a.f.forChild([{path:"",component:f}])]]}),e})()}}]);