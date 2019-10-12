(window.webpackJsonpReactShips=window.webpackJsonpReactShips||[]).push([[0],{108:function(e,t){},111:function(e,t,a){},112:function(e,t,a){},126:function(e,t,a){},127:function(e,t,a){},128:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(29),i=(a(77),a(78),a(3)),o=a(4),l=a(6),p=a(5),c=a(7),h=a(23),u=a(11),m=a.n(u),d=a(14),y=function e(t){Object(i.a)(this,e),this.board=void 0,this.boardName=void 0,this.boardName=t,this.board=[]},f=function(){function e(t,a,r){Object(i.a)(this,e),this.x=void 0,this.y=void 0,this.h=void 0,this.w=void 0,this.c=void 0,this.part=void 0,this.owner=void 0,this.hover=!1,this.hit=!1,this.x=t,this.y=a,this.w=50,this.h=50,this.part="empty",this.owner=r}return Object(o.a)(e,[{key:"contains",value:function(e,t){return e>this.x&&e<this.x+this.w&&t>this.y&&t<this.y+this.w}}]),e}(),v=a(24),S=a.n(v),C=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).enemyBoard=void 0,a.lastMoveResult=void 0,a.enemyCells=void 0,a.importBoard=void 0,a.shipCount=void 0,a.height=510,a.width=510,a.canvasRef=r.createRef(),a.b=!0,a.enemySocket=void 0,a.saveBoard=Object(d.a)(m.a.mark(function e(){var t,r,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomID:a.props.roomID,player:a.props.PlayerName,boardCell:a.enemyCells,lastMoveResult:a.lastMoveResult,enemyBoard:a.enemyBoard,importBoard:a.importBoard,shipCount:a.shipCount,state:a.state},e.next=3,fetch("http://localhost:5005/api/enemyBoard/".concat(a.props.roomID),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return r=e.sent,e.next=6,r.json();case 6:s=e.sent,console.log(s);case 8:case"end":return e.stop()}},e)})),a.getBoard=Object(d.a)(m.a.mark(function e(){var t,r,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5005/api/enemyBoard/".concat(a.props.roomID,"&").concat(a.props.PlayerName));case 2:return t=e.sent,e.next=5,t.json();case 5:for(r=e.sent,s=0;s<a.enemyCells.length;s++)a.enemyCells[s].x=r.boardCell[s].x,a.enemyCells[s].y=r.boardCell[s].y,a.enemyCells[s].h=r.boardCell[s].h,a.enemyCells[s].w=r.boardCell[s].w,a.enemyCells[s].c=r.boardCell[s].c,a.enemyCells[s].part=r.boardCell[s].part,a.enemyCells[s].owner=r.boardCell[s].owner,a.enemyCells[s].hover=r.boardCell[s].hover,a.enemyCells[s].hit=r.boardCell[s].hit;a.setState({GameStatus:r.state.GameStatus,CurrentTurn:r.state.CurrentTurn,ShipsRemaining:r.state.ShipsRemaining}),a.setState({getBoard:!1}),a.b=!1;case 10:case"end":return e.stop()}},e)})),a.state={GameStatus:e.GameState.GameStatus,CurrentTurn:e.GameState.CurrentTurn,ShipsRemaining:e.GameState.EnemyShipsR,screen:{width:a.width,height:a.height},ctx:void 0,getBoard:e.getBoard},a.shipCount={Carrier:5,Battleship:5,Cruiser:3,Submarine:3,Destroyer:2},a.enemyCells=new Array(100),a.enemyCells=a.addCells(0,0,"enemy"),a.lastMoveResult=" ",a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("div",{className:"canvas-enemy"},r.createElement("canvas",{id:"enemyC",ref:this.canvasRef,width:"510",height:"510"}))}},{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current.getContext("2d");this.props.getBoard&&this.getBoard(),this.setSocket(),this.setState({ctx:t}),this.startGame(),this.setEvents(),requestAnimationFrame(function(){e.update()})}},{key:"componentDidUpdate",value:function(){this.saveBoard()}},{key:"setSocket",value:function(){var e=this;this.enemySocket=S()("localhost:5005/play"),this.enemySocket.emit("join",this.props.roomID),this.enemySocket.on("setEnemyBoard",function(t){e.props.PlayerName!==t.boardName&&e.setupBoard(t.board)})}},{key:"setupBoard",value:function(e){this.importBoard=e,this.setBoard()}},{key:"update",value:function(){var e=this;this.drawCells(this.enemyCells),this.checkStatus(),requestAnimationFrame(function(){e.update()})}},{key:"startGame",value:function(){this.setState({GameStatus:k.Setup}),this.enemyBoard=new y("enemy"),this.enemyCells=new Array(100),this.enemyCells=this.addCells(0,0,"enemy")}},{key:"checkStatus",value:function(){0===this.state.ShipsRemaining&&(this.props.GameState.GameStatus=k.GameOver,this.props.GameState.Winner="Player Wins!",this.props.updateGameState(this.props.GameState))}},{key:"setEvents",value:function(){var e=this,t=this.canvasRef.current;t.addEventListener("click",function(a){var r=a.clientX-t.getBoundingClientRect().left,s=a.clientY-t.getBoundingClientRect().top;e.saveBoard(),1===e.props.GameState.GameStatus&&e.props.GameState.CurrentTurn!==e.props.PlayerName&&(e.enemySocket.emit("enemyMove",e.props.roomID,r,s,e.props.PlayerName),e.toggleCell(e.enemyCells,r,s))}),this.canvasRef.current.addEventListener("mousemove",function(a){var r=a.clientX-t.getBoundingClientRect().left,s=a.clientY-t.getBoundingClientRect().top;1===e.props.GameState.GameStatus&&e.hoverEffect(e.enemyCells,r,s)})}},{key:"drawCells",value:function(e){var t=this.state.ctx;e.forEach(function(e){t.fillStyle=e.c,t.fillRect(e.x+1,e.y+1,e.w-2,e.w-2)})}},{key:"addCells",value:function(e,t,a){for(var r=new Array(100),s=0;s<10;s++)for(var n=0;n<10;n++)r[s+10*n]=new f(50*s+e,50*n+t,a),r[s+10*n].c="enemy"===a?"#8F282F":"#464478";return r}},{key:"toggleCell",value:function(e,t,a){var r=this;e.forEach(function(e){if(e.contains(t,a))if("empty"===e.part||e.hit){if("empty"===e.part&&!e.hit){e.c="white";r.props.updateMoves({Player:"Player",Move:"Miss!"}),e.hit=!0,r.props.GameState.CurrentTurn=r.props.PlayerName,r.props.updateGameState(r.props.GameState)}}else{e.c="red",r.lastMoveResult="Hit!";var s={Player:"Player",Move:"Hit!"};e.hit=!0,r.shipCount[e.part]=r.shipCount[e.part]-1,0===r.shipCount[e.part]&&(s.Player="Player",s.Move="".concat(e.part," was sunk"),r.props.GameState.EnemyShipsR--,r.setState({ShipsRemaining:r.state.ShipsRemaining-1}),0===r.state.ShipsRemaining&&(r.setState({GameStatus:k.GameOver}),r.props.GameState.GameStatus=k.GameOver)),r.props.updateMoves(s),r.props.GameState.CurrentTurn=r.props.PlayerName,r.props.updateGameState(r.props.GameState)}})}},{key:"setBoard",value:function(){for(var e=0;e<this.importBoard.length;e++)0===this.importBoard[e]?this.enemyCells[e].part="empty":1===this.importBoard[e]?this.enemyCells[e].part="Carrier":2===this.importBoard[e]?this.enemyCells[e].part="Battleship":3===this.importBoard[e]?this.enemyCells[e].part="Cruiser":4===this.importBoard[e]?this.enemyCells[e].part="Submarine":this.enemyCells[e].part="Destroyer";this.shipCount={Carrier:5,Battleship:5,Cruiser:3,Submarine:3,Destroyer:2}}},{key:"hoverEffect",value:function(e,t,a){var r=this.state.ctx;e.forEach(function(e){e.contains(t,a)?(r.fillStyle="white",r.fillRect(e.x,e.y,e.w,e.w)):r.clearRect(e.x,e.y,e.w,e.w)})}}]),t}(r.Component),b=function e(t,a,r){Object(i.a)(this,e),this.size=void 0,this.name=void 0,this.orientation=void 0,this.c=void 0,this.size=a,this.name=t,this.c=r};function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function E(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach(function(t){Object(h.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var k,O=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).playerBoard=void 0,a.playerCells=void 0,a.currentShip=void 0,a.shipCells=[],a.ships=void 0,a.ship=void 0,a.height=510,a.width=510,a.canvasRef=r.createRef(),a.exported=0,a.b=!0,a.playerSocket=void 0,a.saveB=!1,a.saveBoard=Object(d.a)(m.a.mark(function e(){var t,r,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomID:a.props.roomID,player:a.props.PlayerName,boardCell:a.playerCells,state:a.state,ships:a.ships,ship:a.ship,playerBoard:a.playerBoard,currentShip:a.currentShip,shipCells:a.shipCells,exported:a.exported},e.next=3,fetch("http://localhost:5005/api/playerBoard/".concat(a.props.roomID),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return r=e.sent,e.next=6,r.json();case 6:s=e.sent,console.log(s);case 8:case"end":return e.stop()}},e)})),a.getBoard=Object(d.a)(m.a.mark(function e(){var t,r,s,n,i;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5005/api/playerBoard/".concat(a.props.roomID,"&").concat(a.props.PlayerName));case 2:return t=e.sent,e.next=5,t.json();case 5:for(r=e.sent,s=0;s<a.playerCells.length;s++)a.playerCells[s].x=r.boardCell[s].x,a.playerCells[s].y=r.boardCell[s].y,a.playerCells[s].h=r.boardCell[s].h,a.playerCells[s].w=r.boardCell[s].w,a.playerCells[s].c=r.boardCell[s].c,a.playerCells[s].part=r.boardCell[s].part,a.playerCells[s].owner=r.boardCell[s].owner,a.playerCells[s].hover=r.boardCell[s].hover,a.playerCells[s].hit=r.boardCell[s].hit;for(a.exported=r.exported,n=0;n<a.ships.length;n++)a.ships[n].c=r.ships[n].c,a.ships[n].name=r.ships[n].name,a.ships[n].size=r.ships[n].size;for(i=0;i<a.shipCells.length;i++)a.shipCells[i].x=r.shipCells[i].x,a.shipCells[i].y=r.shipCells[i].y,a.shipCells[i].h=r.shipCells[i].h,a.shipCells[i].w=r.shipCells[i].w,a.shipCells[i].c=r.shipCells[i].c,a.shipCells[i].part=r.shipCells[i].part,a.shipCells[i].owner=r.shipCells[i].owner,a.shipCells[i].hover=r.shipCells[i].hover,a.shipCells[i].hit=r.shipCells[i].hit;a.currentShip=r.currentShip,a.ship=r.ship,a.setState(function(e){var t=E({},e.ShipParts);return t.Carrier=r.state[0].ShipParts.Carrier,t.Battleship=r.state[0].ShipParts.Battleship,t.Cruiser=r.state[0].ShipParts.Cruiser,t.Submarine=r.state[0].ShipParts.Submarine,t.Destroyer=r.state[0].ShipParts.Destroyer,{ShipParts:t}}),a.setState({ShipRemaining:r.state[0].ShipRemaining,clicks:r.state[0].clicks}),a.setState({CurrentShip:r.state[0].CurrentShip}),a.saveB=!0,a.updateCurrentShip(),a.setState({getBoard:!1}),a.b=!1;case 19:case"end":return e.stop()}},e)})),a.state={CurrentShip:"Carrier",GameStatus:e.GameState.GameStatus,ShipRemaining:5,ShipParts:{Carrier:5,Battleship:4,Cruiser:3,Submarine:3,Destroyer:2},screen:{width:a.width,height:a.height},clicks:0,getBoard:e.getBoard},a.ships=a.createShipList(),a.playerBoard=new y(a.props.PlayerName),a.playerCells=a.addCells(0,0,"player"),a.ship=0,a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("div",{className:"canvas-player"},r.createElement("canvas",{id:"playerC",ref:this.canvasRef,width:this.state.screen.width,height:this.state.screen.height}))}},{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current.getContext("2d");this.props.getBoard&&this.getBoard(),this.setState({ctx:t}),this.startGame(),this.setSocket(),this.setEvents(),requestAnimationFrame(function(){e.update()})}},{key:"componentDidUpdate",value:function(){this.saveBoard()}},{key:"setSocket",value:function(){var e=this;this.playerSocket=S()("localhost:5005/play"),this.playerSocket.emit("join",this.props.roomID),this.playerSocket.on("enemySendMove",function(t,a,r){if(r!==e.props.PlayerName){var s=!0,n=!1,i=void 0;try{for(var o,l=e.playerCells[Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var p=o.value;if(p.contains(t,a)){if("Carrier"===p.part)e.setState(function(e){var t=E({},e.ShipParts);return t.Carrier--,{ShipParts:t}}),0===e.state.ShipParts.Carrier&&e.checkRemainingShips();else if("Battleship"===p.part)e.setState(function(e){var t=E({},e.ShipParts);return t.Battleship--,{ShipParts:t}}),0===e.state.ShipParts.Battleship&&e.checkRemainingShips();else if("Cruiser"===p.part)e.setState(function(e){var t=E({},e.ShipParts);return t.Cruiser--,{ShipParts:t}}),0===e.state.ShipParts.Cruiser&&e.checkRemainingShips();else if("Submarine"===p.part)e.setState(function(e){var t=E({},e.ShipParts);return t.Submarine--,{ShipParts:t}}),0===e.state.ShipParts.Submarine&&e.checkRemainingShips();else{if("empty"===p.part){p.hit=!0,p.c="white",p.part="empty",e.props.GameState.CurrentTurn="Player";e.props.updateMoves({Player:"Enemy",Move:"Miss!"}),e.props.updateGameState(e.props.GameState);break}e.setState(function(e){var t=E({},e.ShipParts);return t.Destroyer--,{ShipParts:t}}),0===e.state.ShipParts.Destroyer&&e.checkRemainingShips()}p.hit=!0,p.c="red",p.part="empty",e.props.GameState.CurrentTurn="Player";e.props.updateMoves({Player:"Enemy",Move:"Hit!"}),e.props.updateGameState(e.props.GameState)}}}catch(c){n=!0,i=c}finally{try{s||null==l.return||l.return()}finally{if(n)throw i}}}})}},{key:"update",value:function(){var e=this;this.drawCells(this.playerCells),1===this.props.GameState.GameStatus&&0===this.exported&&this.exportBoard(),this.state.GameStatus,requestAnimationFrame(function(){e.update()})}},{key:"startGame",value:function(){this.setState({GameStatus:k.Setup}),this.playerCells=[],this.shipCells=[],this.ship=0,this.currentShip=this.ships[this.ship],this.playerBoard=new y(this.props.PlayerName),this.playerCells=this.addCells(0,0,"player"),this.props.GameState.CurrentShip="Carrier",this.props.GameState.GameStatus=k.Setup,this.setState({CurrentShip:"Carrier"}),this.ships=this.createShipList(),this.props.updateGameState(this.props.GameState),this.setState(function(e){var t=E({},e.ShipParts);return t.Carrier=5,t.Battleship=4,t.Cruiser=3,t.Submarine=3,t.Destroyer=2,{ShipParts:t}}),this.setState({ShipRemaining:5,clicks:0})}},{key:"checkRemainingShips",value:function(){this.setState({ShipRemaining:this.state.ShipRemaining-1}),this.props.GameState.PlayerShipsR--,this.props.updateGameState(this.props.GameState),0===this.state.ShipRemaining&&(this.props.GameState.Winner="Enemy Wins!",this.props.GameState.GameStatus=k.GameOver,this.props.updateGameState(this.props.GameState))}},{key:"setEvents",value:function(){var e=this,t=this.canvasRef.current;t.addEventListener("click",function(a){var r=a.clientX-t.getBoundingClientRect().left,s=a.clientY-t.getBoundingClientRect().top;0===e.props.GameState.GameStatus&&(e.toggleCell(e.playerCells,r,s),e.checkValid(),e.saveBoard(),e.state.clicks===e.currentShip.size&&e.finalCheck(),e.checkShipTurn())}),this.canvasRef.current.addEventListener("mousemove",function(a){var r=a.clientX-t.getBoundingClientRect().left,s=a.clientY-t.getBoundingClientRect().top;0===e.props.GameState.GameStatus&&e.hoverEffect(e.playerCells,r,s)})}},{key:"updateCurrentShip",value:function(){this.props.GameState.CurrentShip=this.state.CurrentShip,this.props.updateGameState(this.props.GameState)}},{key:"createShipList",value:function(){var e=[],t=new b("Carrier",5,"#752323"),a=new b("Battleship",4,"#442375"),r=new b("Cruiser",3,"#2e7523"),s=new b("Submarine",3,"#23756e"),n=new b("Destroyer",2,"#727523");return e.push(t),e.push(a),e.push(r),e.push(s),e.push(n),e}},{key:"drawCells",value:function(e){var t=this,a=this.state.ctx;e.forEach(function(e){"empty"===e.part?(a.fillStyle=e.c,a.fillRect(e.x+1,e.y+1,e.w-2,e.w-2)):"empty"!==e.part&&(t.ships.forEach(function(t){t.name===e.part&&(a.fillStyle=t.c)}),a.fillRect(e.x+1,e.y+1,e.w-2,e.w-2))})}},{key:"addCells",value:function(e,t,a){for(var r=new Array(100),s=0;s<10;s++)for(var n=0;n<10;n++)r[s+10*n]=new f(50*s+e,50*n+t,a),r[s+10*n].c="enemy"===a?"#8F282F":"#464478";return r}},{key:"checkShipTurn",value:function(){var e=this;this.shipCells.length===this.currentShip.size&&("Destroyer"===this.currentShip.name?(this.setState({GameStatus:k.Playing}),this.props.GameState.GameStatus=this.state.GameStatus,this.props.GameState.CurrentTurn="Player",this.props.updateGameState(this.props.GameState),this.playerBoard=new y(this.props.PlayerName),this.playerCells.forEach(function(t){"empty"===t.part?e.playerBoard.board.push(0):"Carrier"===t.part?e.playerBoard.board.push(1):"Battleship"===t.part?e.playerBoard.board.push(2):"Cruiser"===t.part?e.playerBoard.board.push(3):"Submarine"===t.part?e.playerBoard.board.push(4):e.playerBoard.board.push(5)})):(this.setState({clicks:0}),this.ship++,this.currentShip=this.ships[this.ship],this.setState({CurrentShip:this.currentShip.name}),this.updateCurrentShip(),this.shipCells=[]))}},{key:"toggleCell",value:function(e,t,a){var r=this,s=this.state.ctx;0===this.props.GameState.GameStatus?(this.props.GameState.SetupMessages="",this.props.updateGameState(this.props.GameState),e.forEach(function(e){e.contains(t,a)&&r.state.clicks!==r.currentShip.size&&"empty"===e.part&&(r.shipCells.push(e),e.part=r.currentShip.name,r.setState({clicks:r.state.clicks+1}))})):e.forEach(function(e){e.contains(t,a)&&r.state.clicks!==r.currentShip.size&&"empty"===e.part&&(r.shipCells.push(e),e.part="enemy",s.fillStyle="red",s.fillRect(e.x,e.y,e.w,e.w),r.setState({clicks:r.state.clicks+1}))})}},{key:"checkValid",value:function(){this.checkValidCell()||this.clearInvalid()}},{key:"clearInvalid",value:function(){var e=this;this.props.GameState.SetupMessages="Invalid Ship Placement",this.props.updateGameState(this.props.GameState),this.playerCells.forEach(function(t){t.part===e.currentShip.name&&(t.part="empty")}),this.shipCells=[],this.setState({clicks:0})}},{key:"checkValidCell",value:function(){var e;if(1===this.shipCells.length)return!0;if(this.shipCells.length>1){if(this.shipCells[0].x===this.shipCells[1].x)e="h";else{if(this.shipCells[0].y!==this.shipCells[1].y)return!1;e="v"}for(var t=0;t<this.shipCells.length;t++)if("h"===e){if(this.shipCells[0].x!==this.shipCells[t].x)return!1}else if("v"===e&&this.shipCells[0].y!==this.shipCells[t].y)return!1;return!0}return!1}},{key:"finalCheck",value:function(){var e,t=this,a=this.playerCells.filter(function(e){return e.part===t.currentShip.name});a[0].x===a[1].x?e="v":a[0].y===a[1].y&&(e="h");for(var r=0,s=1;r<a.length-1;r++,s++){if("h"===e){if(a[r].x+50===a[s].x||a[r].x-50===a[s].x)continue;return void this.clearInvalid()}if("v"===e){if(a[r].y+50===a[s].y||a[r].y-50===a[s].y)continue;return void this.clearInvalid()}}}},{key:"hoverEffect",value:function(e,t,a){var r=this.state.ctx;e.forEach(function(e){e.contains(t,a)?(r.fillStyle="white",r.fillRect(e.x,e.y,e.w,e.w)):r.clearRect(e.x,e.y,e.w,e.w)})}},{key:"exportBoard",value:function(){this.playerSocket.emit("playerBoard",this.playerBoard,this.props.roomID),this.exported=1}}]),t}(r.Component),j=(a(111),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("div",null,r.createElement("div",{className:"status-name"},this.props.player),r.createElement("div",{className:"status-msg"},this.props.move))}}]),t}(r.Component)),w=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.messages.map(function(e,t){return r.createElement(j,{key:t,player:e.Player,move:e.Move})});return r.createElement("div",{className:"status-messages",id:"status-list"},e)}},{key:"componentDidUpdate",value:function(){var e=document.getElementById("status-list");e.scrollTop=e.scrollHeight}}]),t}(r.Component),G=function(e){return s.a.createElement("div",{className:"current-turn"},e.currentTurn,"'s Turn")},B=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return 0===this.props.GameState.GameStatus?r.createElement("div",{className:"status-area"},r.createElement("div",null,"Currently Placing: ",this.props.GameState.CurrentShip),r.createElement("div",null,this.props.GameState.SetupMessages)):r.createElement("div",{className:"status-area playing"},r.createElement(G,{currentTurn:this.props.GameState.CurrentTurn}),r.createElement(w,{messages:this.props.GameState.Moves}))}}]),t}(r.Component),x=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.me?"player-message":"enemy";return r.createElement("div",{className:e},r.createElement("div",{className:"username"},this.props.username),r.createElement("div",{className:"message-body"},this.props.text))}}]),t}(r.Component),P=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.messages.map(function(e,t){return r.createElement(x,{key:t,username:e.username,text:e.text,me:e.me})});return r.createElement("div",{className:"messages",id:"messageList"},e)}},{key:"componentDidUpdate",value:function(){var e=document.getElementById("messageList");e.scrollTop=e.scrollHeight}}]),t}(r.Component),D=a(25),R=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).state={chatInput:""},a.handleText=a.handleText.bind(Object(D.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(D.a)(a)),a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("form",{onSubmit:this.handleSubmit,className:"chat-input"},r.createElement("input",{type:"text",onChange:this.handleText,id:"chat-box",value:this.state.chatInput,placeholder:"Type a message and press enter...",required:!0}))}},{key:"handleText",value:function(e){this.setState({chatInput:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.onSend(this.state.chatInput,this.props.username),this.setState({chatInput:""})}}]),t}(r.Component),N=(a(112),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).socket=void 0,a.sendMessage=function(e,t){a.socket.emit("sendMessage",e,a.props.roomID,a.props.username)},a.updateMessages=function(e,t){var r=!1,s=a.state.messages;t===a.props.username&&(r=!0);var n={username:t,text:e,me:r};s.push(n),a.setState({messages:s})},a.state={messages:[],username:e.username},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket=S()("localhost:5005"),this.socket.emit("join",this.props.username,this.props.roomID),this.socket.on("message",function(t,a){e.updateMessages(t,a)})}},{key:"componentWillUnmount",value:function(){this.socket.emit("disconnect")}},{key:"render",value:function(){return r.createElement("div",{className:"chat-area",id:"chat"},r.createElement("span",{className:"chat-title"},"Chat"),r.createElement(P,{messages:this.state.messages}),r.createElement(R,{onSend:this.sendMessage,username:this.props.username}))}}]),t}(r.Component));function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(a,!0).forEach(function(t){Object(h.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}!function(e){e[e.Setup=0]="Setup",e[e.Playing=1]="Playing",e[e.GameOver=2]="GameOver"}(k||(k={}));var T=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).playSocket=void 0,a.loaded=!0,a.test=void 0,a.saveState=Object(d.a)(m.a.mark(function e(){var t,r,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomID:a.state.roomID,PlayerName:a.props.player,state:a.state},e.next=3,fetch("http://localhost:5005/api/gamestate/".concat(a.state.roomID),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return r=e.sent,e.next=6,r.json();case 6:s=e.sent,console.log(s);case 8:case"end":return e.stop()}},e)})),a.getState=Object(d.a)(m.a.mark(function e(){var t,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5005/api/gamestate/".concat(a.props.roomid,"&").concat(a.props.player));case 2:return t=e.sent,e.next=5,t.json();case 5:r=e.sent,console.log(r.state),a.setState({GameState:r.state.GameState}),a.setState({getBoard:!1}),a.loaded=!0;case 10:case"end":return e.stop()}},e)})),a.updateGameState=function(e){a.setState(function(t){M({},t.GameState);return{GameState:e}})},a.updateMoves=function(e){a.setState(function(t){var a=M({},t.GameState);return a.Moves.push(e),{GameState:a}})},a.state={roomID:a.props.roomid,GameState:{CurrentShip:null,CurrentTurn:null,Moves:[],GameStatus:k.Setup,Winner:null,EnemyShipsR:5,PlayerShipsR:5,SetupMessages:null},PlayerName:a.props.player,getBoard:a.props.getBoard},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.getBoard&&(this.loaded=!1,this.getState()),this.setUpdate(),this.test=setInterval(function(){return e.setUpdate()},5e3)}},{key:"setUpdate",value:function(){!1===this.props.getBoard&&1==this.loaded&&this.saveState()}},{key:"componentWillUnmount",value:function(){this.playSocket.emit("disconnect")}},{key:"render",value:function(){return r.createElement("div",{className:"play-area"},r.createElement(C,{updateGameState:this.updateGameState,updateMoves:this.updateMoves,GameState:this.state.GameState,roomID:this.state.roomID,PlayerName:this.state.PlayerName,getBoard:this.state.getBoard}),r.createElement(O,{updateGameState:this.updateGameState,updateMoves:this.updateMoves,GameState:this.state.GameState,roomID:this.state.roomID,PlayerName:this.state.PlayerName,getBoard:this.state.getBoard}),r.createElement(B,{GameState:this.state.GameState,roomID:this.props.roomid}),r.createElement(N,{username:this.props.player,roomID:this.props.roomid}))}}]),t}(r.Component),L=a(131),A=a(132),z=a(43),F=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement(L.a,{variant:"dark",expand:"lg"},r.createElement(z.LinkContainer,{to:"/"},r.createElement(L.a.Brand,null,"ReactShips")),r.createElement(L.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.createElement(L.a.Collapse,{id:"basic-navbar-nav"},r.createElement(A.a,{className:"mr-auto"},r.createElement(z.LinkContainer,{to:"/"},r.createElement(A.a.Link,null,"Home")),r.createElement("div",{className:"navbar-text"},"Room ID: ",this.props.roomid))))}}]),t}(r.Component),q=a(130),U=(a(126),function(){return s.a.createElement("div",null,s.a.createElement("h1",{className:"player-h"},"Player Details"))}),W=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).handleLoad=function(e){e.preventDefault(),a.state.disableButton||(a.props.player(a.state.playerName),""!==a.state.roomID&&(a.props.room(a.state.roomID),a.props.handleLogin(!0,!0)),a.setState({disableButton:!0}))},a.handleSubmit=function(e){e.preventDefault(),a.state.disableButton||(a.props.player(a.state.playerName),""!==a.state.roomID?(a.props.room(a.state.roomID),a.props.handleLogin(!0,!1)):a.setRoom(),a.setState({disableButton:!0}))},a.setRoom=Object(d.a)(m.a.mark(function e(){var t,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5005/api/gameID");case 2:return t=e.sent,e.next=5,t.json();case 5:r=e.sent,a.setState({roomID:r.id}),a.props.room(a.state.roomID),a.props.handleLogin(!0,!1);case 9:case"end":return e.stop()}},e)})),a.handleChange=function(e){a.setState(Object(h.a)({},e.target.name,e.target.value))},a.state={playerName:"",roomID:"",disableButton:!1},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("form",{className:"player-details"},r.createElement(U,null),r.createElement("label",null,r.createElement("span",{className:"player-name"},"Please Enter your Player Name")),r.createElement("input",{type:"text",name:"playerName",required:!0,onChange:this.handleChange,value:this.state.playerName}),r.createElement("label",null,r.createElement("span",{className:"room-id"},"Room ID")," "),r.createElement("input",{type:"text",className:"room-input",name:"roomID",onChange:this.handleChange,value:this.state.roomID}),r.createElement(q.a,{variant:"outline-success",type:"submit",name:"New",onClick:this.handleSubmit},"New / Join Game"),r.createElement(q.a,{variant:"outline-success",type:"submit",name:"Load",onClick:this.handleLoad},"Load Game"))}}]),t}(r.Component);var H=function(){return s.a.createElement("div",{className:"ship-table-div"},s.a.createElement("table",{className:"ship-table"},s.a.createElement("tr",null,s.a.createElement("th",null,"Placed"),s.a.createElement("th",null,"Ships"),s.a.createElement("th",null,"Size")),s.a.createElement("tr",null,s.a.createElement("td",null,"First"),s.a.createElement("td",null,"Carrier"),s.a.createElement("td",null,"5")),s.a.createElement("tr",null,s.a.createElement("td",null,"Second"),s.a.createElement("td",null,"Battleship"),s.a.createElement("td",null,"4")),s.a.createElement("tr",null,s.a.createElement("td",null,"Third"),s.a.createElement("td",null,"Cruiser"),s.a.createElement("td",null,"3")),s.a.createElement("tr",null,s.a.createElement("td",null,"Fourth"),s.a.createElement("td",null,"Submarine"),s.a.createElement("td",null,"3")),s.a.createElement("tr",null,s.a.createElement("td",null,"Fifth"),s.a.createElement("td",null,"Destroyer"),s.a.createElement("td",null,"2"))))},J=(a(127),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("div",{className:"info-area"},r.createElement("div",{className:"info-heading"},r.createElement("h1",null,"Info")),r.createElement("div",{className:"info-text"},r.createElement("p",null,"ReactShips is a clone of the classic board game Battle Ships. The game starts out with each player placing their 5 ships on their own board. Each ship can only place in the vertical or horizontal direction, They cannot be placed diagonally or a mix of vertical or horizontal. Ships consist of the following sizes:",r.createElement(H,null),"After these ships are placed each player takes turn guessing which squares the other player has placed their ships. If a ship is hit a square will turn red and if its a miss the square will turn white. The first player to sink all the other players ships is the winner of the game.")))}}]),t}(r.Component)),V=a(28),X=a(18),Y=a(71),K=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.createElement("div",{id:"chart-test"})}},{key:"componentDidMount",value:function(){this.drawChart()}},{key:"drawChart",value:function(){Y.a("#chart-test").append("svg").attr("width",700).attr("height",300).selectAll("rect").data([12,5,6,6,9,10]).enter().append("rect").attr("x",function(e,t){return 70*t}).attr("y",function(e,t){return 300-10*e}).attr("width",25).attr("height",function(e,t){return 10*e}).attr("fill","green")}}]),t}(r.Component),Q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).getDetails=function(e){a.setState({playerName:e})},a.getRoomID=function(e){console.log("We here"),console.log(e),e.length<1||a.setState({roomID:e})},a.handleLogin=function(e,t){a.setState({login:e}),a.setState({getBoard:t})},a.state={login:!1,playerName:"Player",enemyName:"No Enemy Ready"},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.state.login?r.createElement(V.BrowserRouter,null,r.createElement("div",null,r.createElement(F,{roomid:this.state.roomID}),r.createElement(X.g,null,r.createElement(X.d,{path:"/",exact:!0,render:function(t){return r.createElement(T,Object.assign({},t,{player:e.state.playerName,enemy:e.state.enemyName,roomid:e.state.roomID,getBoard:e.state.getBoard}))}}),r.createElement(X.d,{path:"/info",exact:!0,component:J}),r.createElement(X.d,{path:"/stats",exact:!0,component:K})))):r.createElement("div",null,r.createElement(L.a,{variant:"dark",expand:"lg"},r.createElement(L.a.Brand,null,"ReactShips")),r.createElement("div",{className:"login-container"},r.createElement(W,{handleLogin:this.handleLogin,player:this.getDetails,room:this.getRoomID})))}}]),t}(r.Component);n.render(r.createElement("div",null,r.createElement(Q,null)),document.getElementById("root"))},72:function(e,t,a){e.exports=a(128)},78:function(e,t,a){}},[[72,1,2]]]);
//# sourceMappingURL=main.0594bd3f.chunk.js.map