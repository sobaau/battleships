!function(t){var e={};function s(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(r,i,function(e){return t[e]}.bind(null,i));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e){t.exports=React},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=s(0),i=s(2),n=s(3),a=s(8);s(9),i.render(r.createElement("div",null,r.createElement(n.Canvas,null),r.createElement(a.ChatBox,null)),document.getElementById("app"))},function(t,e){t.exports=ReactDOM},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=s(0),i=s(14),n=s(4);e.Canvas=class extends r.Component{constructor(t){super(t),this.handleClick=this.handleClick.bind(this)}render(){return r.createElement("div",null,r.createElement("canvas",{id:"enemy",width:"510",height:"510"}),r.createElement("p",null,"This is a test of "),r.createElement("canvas",{id:"player",width:"510",height:"510"}),r.createElement("button",{onClick:this.handleClick},"Rest"))}componentDidMount(){this.PlayerBoard=new n.PlayerArea,this.enemyBoard=new i.EnemyArea,this.PlayerBoard.draw(),this.enemyBoard.draw()}handleClick(){this.PlayerBoard.startGame(),this.PlayerBoard.startGame()}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=s(5),i=s(6),n=s(7);e.PlayerArea=class{constructor(){this.angle=2,this.shipCells=[],this.gameState="setup",this.canvas=document.getElementById("player"),this.ctx=this.canvas.getContext("2d"),this.setEvents(),this.createShipList(),this.startGame()}draw(){this.drawCells(this.playerCells),requestAnimationFrame(()=>{this.draw()})}startGame(){console.log("start"),this.gameState="setup",this.ship=0,this.currentShip=this.ships[this.ship],this.playerBoard=new r.Board("player"),this.enemyBoard=new r.Board("enemy"),this.playerCells=new Array(100),this.addCells(this.playerCells,0,0,"player"),this.clicks=0}drawCells(t){t.forEach(t=>{"empty"===t.part?(this.ctx.fillStyle=t.c,this.ctx.fillRect(t.x+1,t.y+1,t.w-2,t.w-2)):"empty"!==t.part&&(this.ships.forEach(e=>{e.name===t.part&&(this.ctx.fillStyle=e.c)}),this.ctx.fillRect(t.x+1,t.y+1,t.w-2,t.w-2))})}createShipList(){this.ships=[];const t=new n.Ship("Carrier",5,"#a6a6a6"),e=new n.Ship("Battleship",4,"#c7c7c7"),s=new n.Ship("Cruiser",3,"#ded9d9"),r=new n.Ship("Submarine",3,"#e8e1e1"),i=new n.Ship("Destroyer",2,"#ededed");this.ships.push(t),this.ships.push(e),this.ships.push(s),this.ships.push(r),this.ships.push(i)}addCells(t,e,s,r){for(let n=0;n<10;n++)for(let a=0;a<10;a++)t[n+10*a]=new i.BoardCell(50*n+e,50*a+s,r),t[n+10*a].c="enemy"===r?"#8F282F":"#464478"}setEvents(){this.canvas.addEventListener("click",t=>{const e=t.pageX-this.canvas.offsetLeft,s=t.pageY-this.canvas.offsetTop;"setup"===this.gameState&&(this.toggleCell(this.playerCells,e,s),this.checkValid(),this.clicks===this.currentShip.size&&this.finalCheck(),this.checkShipTurn())}),this.canvas.addEventListener("mousemove",t=>{const e=t.pageX-this.canvas.offsetLeft,s=t.pageY-this.canvas.offsetTop;"setup"===this.gameState&&this.hoverEffect(this.playerCells,e,s)})}finalCheck(){let t;const e=this.playerCells.filter(t=>t.part===this.currentShip.name);e[0].x===e[1].x?t="h":e[0].y===e[1].y&&(t="v");for(let s=0,r=1;s<e.length-1;s++,r++){if(t="h"){if(e[s].x+50===e[r].x||e[s].x-50===e[r].x)continue;return void this.clearInvalid()}if(e[s].y+50!==e[r].x&&e[s].y-50!==e[r].x)return void this.clearInvalid()}}checkShipTurn(){this.shipCells.length===this.currentShip.size&&("Destroyer"===this.currentShip.name?(this.gameState="playing",this.playerBoard=new r.Board("player"),this.playerCells.forEach(t=>{"empty"===t.part?this.playerBoard.board.push(0):"Carrier"===t.part?this.playerBoard.board.push(1):"Battleship"===t.part?this.playerBoard.board.push(2):"Cruiser"===t.part?this.playerBoard.board.push(3):"Submarine"===t.part?this.playerBoard.board.push(4):this.playerBoard.board.push(5)})):(this.clicks=0,this.ship++,this.currentShip=this.ships[this.ship],this.shipCells=[]))}toggleCell(t,e,s){"setup"===this.gameState?t.forEach(t=>{t.contains(e,s)&&this.clicks!==this.currentShip.size&&"empty"===t.part&&(this.shipCells.push(t),t.part=this.currentShip.name,this.clicks++,console.log(this.shipCells))}):t.forEach(t=>{t.contains(e,s)&&this.clicks!==this.currentShip.size&&"empty"===t.part&&(this.shipCells.push(t),t.part="enemy",this.ctx.fillStyle="red",this.ctx.fillRect(t.x,t.y,t.w,t.w),this.clicks++)})}checkValid(){this.checkValidCell()||this.clearInvalid()}clearInvalid(){console.log("Invalid"),this.playerCells.forEach(t=>{t.part===this.currentShip.name&&(t.part="empty")}),this.shipCells=[],this.clicks=0}checkValidCell(){let t;if(1===this.shipCells.length)return!0;if(this.shipCells.length>1){if(this.shipCells[0].x===this.shipCells[1].x)t="h";else{if(this.shipCells[0].y!==this.shipCells[1].y)return!1;t="v"}for(let e=0;e<this.shipCells.length;e++)if("h"==t){if(this.shipCells[0].x!==this.shipCells[e].x)return!1}else if("v"===t&&this.shipCells[0].y!==this.shipCells[e].y)return!1;return!0}return!1}hoverEffect(t,e,s){t.forEach(t=>{t.contains(e,s)&&"empty"===t.part?(this.ctx.fillStyle="white",this.ctx.fillRect(t.x,t.y,t.w,t.w)):"empty"===t.part&&this.ctx.clearRect(t.x,t.y,t.w,t.w)})}exportBoard(){return this.playerBoard}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class r{constructor(t){this.boardName=t,this.board=[]}newBoard(){for(let t=0;t<100;t++)this.board[t]=0;this.board[90]=1}}e.Board=r,e.playerBoard=new r("player"),e.enemyBoard=new r("enemy")},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.BoardCell=class{constructor(t,e,s){this.hover=!1,this.hit=!1,this.x=t,this.y=e,this.w=50,this.h=50,this.part="empty",this.owner=s}contains(t,e){return t>this.x&&t<this.x+this.w&&e>this.y&&e<this.y+this.w}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Ship=class{constructor(t,e,s){this.size=e,this.name=t,this.c=s}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=s(0);e.ChatBox=class extends r.Component{constructor(t){super(t)}render(){return r.createElement("div",null,"This is the chat area?")}}},function(t,e,s){var r=s(10);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};s(12)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,s){(t.exports=s(11)(!1)).push([t.i,"body{\n    background-color: #15232D\n    ;\n}\n#can{\n    border:1px solid #000000;\n}",""])},function(t,e,s){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var s=function(t,e){var s=t[1]||"",r=t[3];if(!r)return s;if(e&&"function"==typeof btoa){var i=(a=r,o=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(l," */")),n=r.sources.map(function(t){return"/*# sourceURL=".concat(r.sourceRoot).concat(t," */")});return[s].concat(n).concat([i]).join("\n")}var a,o,l;return[s].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(s,"}"):s}).join("")},e.i=function(t,s){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var n=this[i][0];null!=n&&(r[n]=!0)}for(var a=0;a<t.length;a++){var o=t[a];null!=o[0]&&r[o[0]]||(s&&!o[2]?o[2]=s:s&&(o[2]="(".concat(o[2],") and (").concat(s,")")),e.push(o))}},e}},function(t,e,s){var r,i,n={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=r.apply(this,arguments)),i}),o=function(t){var e={};return function(t,s){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,s);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),l=null,h=0,c=[],p=s(13);function u(t,e){for(var s=0;s<t.length;s++){var r=t[s],i=n[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(C(r.parts[a],e))}else{var o=[];for(a=0;a<r.parts.length;a++)o.push(C(r.parts[a],e));n[r.id]={id:r.id,refs:1,parts:o}}}}function f(t,e){for(var s=[],r={},i=0;i<t.length;i++){var n=t[i],a=e.base?n[0]+e.base:n[0],o={css:n[1],media:n[2],sourceMap:n[3]};r[a]?r[a].parts.push(o):s.push(r[a]={id:a,parts:[o]})}return s}function d(t,e){var s=o(t.insertInto);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===t.insertAt)r?r.nextSibling?s.insertBefore(e,r.nextSibling):s.appendChild(e):s.insertBefore(e,s.firstChild),c.push(e);else if("bottom"===t.insertAt)s.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=o(t.insertAt.before,s);s.insertBefore(e,i)}}function y(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function m(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return s.nc}();r&&(t.attrs.nonce=r)}return v(e,t.attrs),d(t,e),e}function v(t,e){Object.keys(e).forEach(function(s){t.setAttribute(s,e[s])})}function C(t,e){var s,r,i,n;if(e.transform&&t.css){if(!(n="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=n}if(e.singleton){var a=h++;s=l||(l=m(e)),r=w.bind(null,s,a,!1),i=w.bind(null,s,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(s=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(e,t.attrs),d(t,e),e}(e),r=function(t,e,s){var r=s.css,i=s.sourceMap,n=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||n)&&(r=p(r));i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(a),o&&URL.revokeObjectURL(o)}.bind(null,s,e),i=function(){y(s),s.href&&URL.revokeObjectURL(s.href)}):(s=m(e),r=function(t,e){var s=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}.bind(null,s),i=function(){y(s)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var s=f(t,e);return u(s,e),function(t){for(var r=[],i=0;i<s.length;i++){var a=s[i];(o=n[a.id]).refs--,r.push(o)}t&&u(f(t,e),e);for(i=0;i<r.length;i++){var o;if(0===(o=r[i]).refs){for(var l=0;l<o.parts.length;l++)o.parts[l]();delete n[o.id]}}}};var g,b=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function w(t,e,s,r){var i=s?"":r.css;if(t.styleSheet)t.styleSheet.cssText=b(e,i);else{var n=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(n,a[e]):t.appendChild(n)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var s=e.protocol+"//"+e.host,r=s+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i,n=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(n)?t:(i=0===n.indexOf("//")?n:0===n.indexOf("/")?s+n:r+n.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=s(5),i=s(6);e.EnemyArea=class{constructor(){this.angle=0,this.gameState="start",this.shipsRemaining=5,this.canvas=document.getElementById("enemy"),this.ctx=this.canvas.getContext("2d"),this.setEvents(),this.startGame(),this.setTempBoard()}draw(){this.drawCells(this.enemyCells),this.checkStatus(),requestAnimationFrame(()=>{this.draw()})}startGame(){console.log("start"),this.gameState="start",this.enemyBoard=new r.Board("enemy"),this.enemyCells=new Array(100),this.addCells(this.enemyCells,0,0,"enemy")}checkStatus(){0===this.shipsRemaining&&console.log("Player Wins!")}drawCells(t){t.forEach(t=>{this.ctx.fillStyle=t.c,this.ctx.fillRect(t.x+1,t.y+1,t.w-2,t.w-2)})}addCells(t,e,s,r){for(let n=0;n<10;n++)for(let a=0;a<10;a++)t[n+10*a]=new i.BoardCell(50*n+e,50*a+s,r),t[n+10*a].c="enemy"===r?"#8F282F":"#464478"}setEvents(){this.canvas.addEventListener("click",t=>{const e=t.pageX-this.canvas.offsetLeft,s=t.pageY-this.canvas.offsetTop;"setup"!==this.gameState&&this.toggleCell(this.enemyCells,e,s)}),this.canvas.addEventListener("mousemove",t=>{const e=t.pageX-this.canvas.offsetLeft,s=t.pageY-this.canvas.offsetTop;console.log(`${e}, ${s}`),"setup"!==this.gameState&&"over"!==this.gameState&&this.hoverEffect(this.enemyCells,e,s)})}toggleCell(t,e,s){t.forEach(t=>{t.contains(e,s)&&("empty"===t.part||t.hit?"empty"===t.part&&(t.c="white",this.lastMoveResult="Miss!",t.hit=!0):(t.c="red",this.lastMoveResult="Hit!",t.hit=!0,this.shipCount.set(t.part,this.shipCount.get(t.part)-1),0===this.shipCount.get(t.part)&&(console.log(`${t.part} Was sunk`),this.shipsRemaining--,console.log(this.shipsRemaining),0===this.shipsRemaining&&(this.gameState="over"))))})}setTempBoard(){this.tempBoard=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,5,0,0,0];for(let t=0;t<this.tempBoard.length;t++)0==this.tempBoard[t]?this.enemyCells[t].part="empty":1==this.tempBoard[t]?this.enemyCells[t].part="Carrier":2==this.tempBoard[t]?this.enemyCells[t].part="Battleship":3==this.tempBoard[t]?this.enemyCells[t].part="Cruiser":4==this.tempBoard[t]?this.enemyCells[t].part="Submarine":this.enemyCells[t].part="Destroyer";this.shipCount=new Map,this.shipCount.set("Carrier",5),this.shipCount.set("Battleship",4),this.shipCount.set("Cruiser",3),this.shipCount.set("Submarine",3),this.shipCount.set("Destroyer",2)}hoverEffect(t,e,s){t.forEach(t=>{t.contains(e,s)?(this.ctx.fillStyle="white",this.ctx.fillRect(t.x,t.y,t.w,t.w)):this.ctx.clearRect(t.x,t.y,t.w,t.w)})}}}]);
//# sourceMappingURL=main.js.map