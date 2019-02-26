(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(37)},28:function(e,t,a){},34:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),s=a.n(c),o=(a(28),a(5)),l=a(6),i=a(10),u=a(7),m=a(9),h=a(38),d=a(41),f=a(40),p=a(8),E=a(39),v=function(e){function t(){var e;Object(o.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).NAME_REGEX=/^[a-zA-Z0-9\-]+$/,e.storage=window.localStorage,e.handleClick=function(t){t.preventDefault(),e.validateName(e.state.userName)?(e.storage.setItem("userName",e.state.userName),e.setState({shouldRedirect:!0})):alert("Invalid name provided, please try again.")},e.handleChange=function(t){var a=t.target,n=a.name,r=a.value;e.setState(Object(p.a)({},n,r))},e.validateName=function(t){return e.NAME_REGEX.test(t)};var a=!1;return e.storage.getItem("userName")&&(a=!0),e.state={userName:"",shouldRedirect:a},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12 spacer"}),r.a.createElement("div",{className:"col-md-4 offset-md-4"},r.a.createElement("form",{className:"panel"},r.a.createElement("div",{className:"form-group"},r.a.createElement("h1",null,"Enter your name:"),r.a.createElement("input",{type:"text",className:"form-control",id:"userName",name:"userName",placeholder:"Enter name",value:this.state.userName,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(t){return e.handleClick(t)}},"Submit")),this.state.shouldRedirect?r.a.createElement(E.a,{to:"/fill-survey"}):null))}}]),t}(n.Component),g=a(18),N=a(12),b=a.n(N),y=a(16),S=a(17),C=a(13),w=function(e){function t(){var e;Object(o.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).REQUIRED_SCORES=15,e.API_URL="/api/attractions",e.API_POST="/api/response",e.renderItems=function(){return e.state.displayAttractions.map(function(t,a){if(t)return r.a.createElement("tr",{key:t.nrCrt},r.a.createElement("td",null,t.nrCrt),r.a.createElement("td",null,t.name.length>=80?t.name.substring(0,80)+"...":t.name),r.a.createElement("td",null,t.description.length>=180?t.description.substring(0,180)+"...":t.description),r.a.createElement("td",{className:"rating-stars"},e.renderStars(t.nrCrt)))})},e.fetchItems=Object(S.a)(b.a.mark(function t(){var a,n;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e.API_URL);case 3:return a=t.sent,t.next=6,a.json();case 6:(n=t.sent).success&&e.setState(Object(y.a)({},e.state,{attractions:n.attractions,displayAttractions:n.attractions})),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),alert("Error has occurred: ".concat(t.t0));case 13:case"end":return t.stop()}},t,null,[[0,10]])})),e.handleClick=function(){var t=Object(S.a)(b.a.mark(function t(a){var n,r,c,s,o,l;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),!e.validateScores()){t.next=19;break}return n=e.state.position,r=n.latitude,c=n.longitude,s={location:{latitude:r,longitude:c},userName:e.state.userName,scores:e.state.scores},t.prev=4,t.next=7,fetch(e.API_POST,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});case 7:return o=t.sent,t.next=10,o.json();case 10:(l=t.sent).success?(window.localStorage.removeItem("userName"),e.setState({shouldRedirect:!0})):alert("An error has occurred: ".concat(l.error)),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(4),alert("An error has occurred: ".concat(t.t0));case 17:t.next=20;break;case 19:alert("Please fill in at least 15 responses!");case 20:case"end":return t.stop()}},t,null,[[4,14]])}));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){var a=t.target,n=a.value,r=a.name;e.setState({search:Object(y.a)({},e.state.search,Object(p.a)({},r,n))});var c=r.replace("search","").toLowerCase();"searchNrCrt"===r&&(c="nrCrt"),""!==n?e.setState({displayAttractions:e.state.attractions.filter(function(e){return e&&new RegExp(n,"gi").test(e[c])})}):e.setState({displayAttractions:e.state.attractions})},e.setLocation=function(){var t=Object(C.a)(e);navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){t.setState({position:e.coords})})},e.validateScores=function(){return e.state.scores.length>=15},e.handleRate=function(t,a){a/=5;var n=e.state.scoreStates;n[t]=a,e.setState({scoreStates:n});var r={attractionId:t,rating:a};e.setState({scores:[].concat(Object(g.a)(e.state.scores.filter(function(e){return e.attractionId!==t})),[r])})},e.updateScore=function(t,a){var n=t.nativeEvent.offsetX/t.nativeEvent.target.offsetWidth,r=(t.target.children[0]?t.target.children[0]:t.target,e.state.scoreStates);r[a]=Math.ceil(100*n),e.setState({scoreStates:r});var c={attractionId:a,rating:n};e.setState({scores:[].concat(Object(g.a)(e.state.scores.filter(function(e){return e.attractionId!==a})),[c])})},e.scrollToTop=function(e){e.current.scrollIntoView({behavior:"smooth"})},e.renderScoresMessage=function(){return r.a.createElement("div",{className:"scores-message alert alert-".concat(e.REQUIRED_SCORES-e.state.scores.length<=0?"success":"primary")},e.REQUIRED_SCORES-e.state.scores.length>0?r.a.createElement("div",null,"You still have to rate",r.a.createElement("strong",null," "+(e.REQUIRED_SCORES-e.state.scores.length)," out of"," "+e.REQUIRED_SCORES+" "),"items."):r.a.createElement("div",null,"You can submit!"))},e.renderToolbox=function(){return r.a.createElement("div",{className:"container-fluid toolbox"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"offset-md-9 col-md-3 col-sm-12"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},"Touristic attractions"),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},"Please provide your opinion on the touristic attractions in the list. To find attractions that you have visited, you can search the list from the header. Thank you for participating!")),r.a.createElement("div",{className:"card-footer"},r.a.createElement("button",{className:"btn btn-primary",onClick:function(t){return e.handleClick(t)}},"Submit"),"\xa0",r.a.createElement("button",{className:"btn btn-secondary float-right",onClick:function(){return e.scrollToTop(e.currentRef)}},"Go to top"))))))},e.renderStars=function(t){return[1,2,3,4,5].map(function(a){var n=e.state.scoreStates[t],c="fa-star-o";return n&&5*n>=a&&(c="fa-star golden"),r.a.createElement("i",{className:"fa ".concat(c),key:t+"."+a,onClick:function(n){return e.handleRate(t,a)}})})};var a=window.localStorage.getItem("userName");return e.currentRef=r.a.createRef(),e.state={position:[],userName:a,attractions:[],displayAttractions:[],scores:[],scoreStates:[],search:{searchNrCrt:"",searchName:"",searchDescription:""},shouldRedirect:!1},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},this.renderScoresMessage(),r.a.createElement("h1",{ref:this.currentRef,className:"panel"},"Complete your survey"," "),r.a.createElement("table",{className:"table table-hover panel"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,r.a.createElement("input",{className:"form-control",placeholder:"Nr. Crt",name:"searchNrCrt",onChange:function(t){return e.handleChange(t)},value:this.state.search.nrCrt})),r.a.createElement("th",null,r.a.createElement("input",{className:"form-control",placeholder:"Name",name:"searchName",onChange:function(t){return e.handleChange(t)},value:this.state.search.name})),r.a.createElement("th",null,r.a.createElement("input",{className:"form-control",placeholder:"Description",name:"searchDescription",onChange:function(t){return e.handleChange(t)},value:this.state.search.description})),r.a.createElement("th",null))),r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{width:"8%"},"#"),r.a.createElement("th",{width:"20%"},"Name"),r.a.createElement("th",{width:"60%"},"Description"),r.a.createElement("th",{width:"12%"},"Your rating"))),r.a.createElement("tbody",null,this.renderItems())),this.renderToolbox(),this.state.shouldRedirect?r.a.createElement(E.a,{to:"/thank-you"}):null))}},{key:"componentWillMount",value:function(){this.fetchItems(),this.setLocation()}}]),t}(n.Component),O=function(e){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12 spacer"}),r.a.createElement("div",{className:"col-md-8 offset-md-2"},r.a.createElement("div",{className:"panel"},r.a.createElement("h1",{className:"display-3"},"Thank you!"),r.a.createElement("p",{className:"lead"},"Please accept my heartfelt thanks for filling out this survey. Hopefully together we can build something interesting! Check out the project on Github, it's not much yet but we're getting there ;)"),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("p",{className:"lead"},r.a.createElement("a",{className:"btn btn-primary",href:"https://github.com/codepadawan93/ba-thesis-datasets"},"Learn more")))))},R=(a(34),a(35),a(36),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement(d.a,null,r.a.createElement("div",{className:"container-fluid"},r.a.createElement(f.a,{exact:!0,path:"/",component:v}),r.a.createElement(f.a,{exact:!0,path:"/fill-survey",component:w}),r.a.createElement(f.a,{exact:!0,path:"/thank-you",component:O}))))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.55862ed4.chunk.js.map