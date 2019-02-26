(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{43:function(e,t,a){e.exports=a(81)},48:function(e,t,a){},49:function(e,t,a){},75:function(e,t){},81:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(39),l=a.n(n),i=(a(48),a(5)),c=a(6),o=a(8),h=a(7),u=a(9),p=(a(49),a(84)),m=a(83),y=a(25),d=a(16),g=a(40),f=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return(a=Object(o.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).state={color:a.props.color,methods:{turn:null}},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({methods:{turn:this.props.turn}})}},{key:"render",value:function(){var e=this.props.color,t="board__slot ".concat(e);return s.a.createElement("div",{row:this.props.row,className:t})}}]),t}(r.Component),v=a(17),b=a.n(v),w=(b()("http://localhost:3001"),function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return(a=Object(o.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).state={display:!0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"submitHandler",value:function(e){e.preventDefault(),this.props.socket(),this.setState({display:!1})}},{key:"render",value:function(){return s.a.createElement("div",{className:"header"},s.a.createElement("h1",{className:"header__title"},"CONNECT 4"),s.a.createElement("div",{className:"display"},s.a.createElement("div",{className:"display__player-info"},s.a.createElement("div",{className:"display__player"},"Player 1",s.a.createElement("div",{className:"display__player-color Cream"})),s.a.createElement("h2",{className:"display__name"},this.props.players.Cream)),s.a.createElement("div",{className:"display__center"},s.a.createElement("h1",{className:"display__message"},this.messageHandler()),this.state.display?s.a.createElement("form",{onSubmit:this.submitHandler.bind(this)},s.a.createElement("input",{onChange:this.props.change,name:"name",placeholder:"enter name",value:this.props.player.name,className:"form__input"}),s.a.createElement("input",{onChange:this.props.change,name:"code",placeholder:"enter codename",value:this.props.player.code,className:"form__input"}),s.a.createElement("button",{type:"submit",className:"form__button"},"submit")):s.a.createElement("div",{className:"display__filler"})),s.a.createElement("div",{className:"display__player-info"},s.a.createElement("div",{className:"display__player"},"Player 2",s.a.createElement("div",{className:"display__player-color Black"})),s.a.createElement("h2",{className:"display__name"},this.props.players.Black))))}},{key:"messageHandler",value:function(){return this.props.players.Cream&&this.props.players.Black?this.props.players.Cream!==this.props.player.name||this.props.gameOn?this.props.players.Cream===this.props.player.name||this.props.gameOn?this.props.player.name===this.props.players[this.props.current]?"It's Your Turn":this.props.player.name!==this.props.players[this.props.current]?"Waiting for ".concat(this.props.players[this.props.current]):void 0:"Waiting for ".concat(this.props.players.Cream):s.a.createElement("button",{className:"form__button",onClick:this.props.newGame},"New Game"):"Waiting for players..."}}]),t}(r.Component)),k=b()("http://localhost:3001"),O=function(e){function t(){var e,a;Object(i.a)(this,t);for(var r=arguments.length,s=new Array(r),n=0;n<r;n++)s[n]=arguments[n];return(a=Object(o.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).state={grid:Array(7).fill("white").map(function(e){return Array(6).fill("white")}),players:{Cream:"",Black:""},player:{name:"",code:""},currentPlayer:"Cream",message:"",gameOn:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){k.on("new",function(e){console.log(e)}),k.on("board",function(e){console.log(e),this.setState({grid:e.grid,currentPlayer:e.currentPlayer,gameOn:e.gameOn,message:e.message})}.bind(this)),k.on("users",function(e){console.log(e),e&&this.setState({players:{Cream:e.player1,Black:e.player2?e.player2:""}})}.bind(this)),k.on("info",function(e){e&&(console.log(e),this.setState({currentPlayer:e.currentPlayer}))}.bind(this)),k.on("winning player",function(e){console.log(e),this.setState({message:e})}.bind(this))}},{key:"socketHandler",value:function(){k.emit("user-info",this.state.player)}},{key:"changeHandler",value:function(e){this.setState({player:Object(g.a)({},this.state.player,Object(d.a)({},e.target.name,e.target.value))})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"game"},s.a.createElement(w,{players:this.state.players,newGame:this.newGame.bind(this),current:this.state.currentPlayer,socket:this.socketHandler.bind(this),gameOn:this.state.gameOn,change:this.changeHandler.bind(this),player:this.state.player}),s.a.createElement("div",{className:"board"},this.state.grid.map(function(t,a){return s.a.createElement("div",{column:a,onMouseDown:e.checkBelow.bind(e),className:"board__column"},t.map(function(t,r){return s.a.createElement(f,{color:t,column:a,row:r,current:e.state.currentPlayer})}))})),s.a.createElement("h1",{className:"game__message"},this.state.message))}},{key:"turnHandler",value:function(){this.state.gameOn&&(this.state.currentPlayer===this.state.players[0].player?this.setState({currentPlayer:this.state.players[1].player}):this.state.currentPlayer===this.state.players[1].player&&this.setState({currentPlayer:this.state.players[0].player}))}},{key:"newGame",value:function(){var e=this;this.setState({currentPlayer:"Cream",grid:Array(7).fill("white").map(function(e){return Array(6).fill("white")}),message:"",gameOn:!0},function(){k.emit("state",e.state)})}},{key:"checkVertically",value:function(e){for(var t=this,a=e.currentTarget.attributes.column.value,r=e.currentTarget.children,s=a,n=Object(y.a)(this.state.grid),l=r.length-1;l>=3;l--)n[s][l]===this.state.currentPlayer&&n[s][l-1]===this.state.currentPlayer&&n[s][l-2]===this.state.currentPlayer&&n[s][l-3]===this.state.currentPlayer&&this.setState({message:"".concat(this.state.players[this.state.currentPlayer]," wins!"),currentPlayer:null,gameOn:!1},function(){k.emit("winner",t.state.message)})}},{key:"checkHorizontally",value:function(e,t){for(var a=this,r=e,s=0;s<4;s++)if(r[s][t]===this.state.currentPlayer&&r[s+1][t]===this.state.currentPlayer&&r[s+2][t]===this.state.currentPlayer&&r[s+3][t]===this.state.currentPlayer)return this.setState({message:"".concat(this.state.players[this.state.currentPlayer]," wins!"),currentPlayer:null,gameOn:!1},function(){k.emit("winner",a.state.message)})}},{key:"checkRightUp",value:function(e,t,a){for(var r=this,s=this.state.currentPlayer,n=[],l=[],i=!0,c=0,o=!0;i;)t<=-1||a>=6?(i=!1,console.log("first")):t>6||e[t][a]!==s&&o?(o=!1,t=n[0],a=l[0],t-=1,a+=1,console.log("second")):e[t][a]===s&&o?(c++,l.push(a),n.push(t),t++,a--,console.log("third")):e[t][a]!==s||o?(i=!1,console.log("last")):(c++,t--,a++,console.log("fourth"));if(console.log(c),c>=4)return this.setState({message:"".concat(this.state.players[this.state.currentPlayer]," wins!"),currentPlayer:null,gameOn:!1},function(){k.emit("winner",r.state.message)})}},{key:"checkRightDown",value:function(e,t,a){for(var r=this,s=this.state.currentPlayer,n=[],l=[],i=!0,c=0,o=!0;i;)t<=-1||a<=-1?(i=!1,console.log("first")):t>6||e[t][a]!==s&&o?(o=!1,t=n[0],a=l[0],t-=1,a-=1,console.log("second")):e[t][a]===s&&o?(c++,l.push(a),n.push(t),t++,a++,console.log("third")):e[t][a]!==s||o?(i=!1,console.log("last")):(c++,t--,a--,console.log("fourth"));if(console.log(c),c>=4)return this.setState({message:"".concat(this.state.players[this.state.currentPlayer]," wins!"),currentPlayer:null,gameOn:!1},function(){k.emit("winner",r.state.message)})}},{key:"checkBelow",value:function(e){var t=this,a=e.currentTarget.attributes.column.value,r=e.currentTarget.children,s=parseInt(a),n=Object(y.a)(this.state.grid);if(this.state.gameOn&&this.state.player.name===this.state.players[this.state.currentPlayer])for(var l=r.length-1;l>=0;l--){if("white"===r[l].className.split(" ")[1])return n[s][l]=this.state.currentPlayer,this.checkVertically(e),this.checkHorizontally(n,l),this.checkRightUp(n,s,l),this.checkRightDown(n,s,l),this.setState({grid:n,currentPlayer:"Cream"===this.state.currentPlayer?"Black":"Cream"},function(){k.emit("state",t.state)})}}}]),t}(r.Component),_=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(p.a,null,s.a.createElement(m.a,{path:"/",render:function(e){return s.a.createElement(O,{prop:e})}})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var P=a(82);l.a.render(s.a.createElement(P.a,null,s.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[43,1,2]]]);
//# sourceMappingURL=main.eb02a8c9.chunk.js.map