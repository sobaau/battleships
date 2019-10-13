(window.webpackJsonpReactShips=window.webpackJsonpReactShips||[]).push([[0],{111:function(e,t){},114:function(e,t,a){},115:function(e,t,a){},129:function(e,t,a){},138:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(26),i=(a(81),a(82),a(3)),o=a(4),l=a(6),p=a(5),c=a(7),h=a(15),u=a(9),m=a.n(u),d=a(12),y=function e(t){Object(i.a)(this,e),this.board=void 0,this.boardName=void 0,this.boardName=t,this.board=[]},f=function(){function e(t,a,s){Object(i.a)(this,e),this.x=void 0,this.y=void 0,this.h=void 0,this.w=void 0,this.c=void 0,this.part=void 0,this.owner=void 0,this.hover=!1,this.hit=!1,this.x=t,this.y=a,this.w=50,this.h=50,this.part="empty",this.owner=s}return Object(o.a)(e,[{key:"contains",value:function(e,t){return e>this.x&&e<this.x+this.w&&t>this.y&&t<this.y+this.w}}]),e}(),v=a(25),S=a.n(v),C=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).enemyBoard=void 0,a.lastMoveResult=void 0,a.enemyCells=void 0,a.importBoard=void 0,a.shipCount=void 0,a.height=510,a.width=510,a.canvasRef=s.createRef(),a.b=!0,a.enemySocket=void 0,a.saveBoard=Object(d.a)(m.a.mark(function e(){var t,s,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomID:a.props.roomID,player:a.props.PlayerName,boardCell:a.enemyCells,lastMoveResult:a.lastMoveResult,enemyBoard:a.enemyBoard,importBoard:a.importBoard,shipCount:a.shipCount,state:a.state},e.next=3,fetch("https://reactships.herokuapp.com/api/enemyBoard/".concat(a.props.roomID),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return s=e.sent,e.next=6,s.json();case 6:r=e.sent,console.log(r);case 8:case"end":return e.stop()}},e)})),a.getBoard=Object(d.a)(m.a.mark(function e(){var t,s,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://reactships.herokuapp.com/api/enemyBoard/".concat(a.props.roomID,"&").concat(a.props.PlayerName));case 2:return t=e.sent,e.next=5,t.json();case 5:for(s=e.sent,r=0;r<a.enemyCells.length;r++)a.enemyCells[r].x=s.boardCell[r].x,a.enemyCells[r].y=s.boardCell[r].y,a.enemyCells[r].h=s.boardCell[r].h,a.enemyCells[r].w=s.boardCell[r].w,a.enemyCells[r].c=s.boardCell[r].c,a.enemyCells[r].part=s.boardCell[r].part,a.enemyCells[r].owner=s.boardCell[r].owner,a.enemyCells[r].hover=s.boardCell[r].hover,a.enemyCells[r].hit=s.boardCell[r].hit;a.setState({GameStatus:s.state.GameStatus,CurrentTurn:s.state.CurrentTurn,ShipsRemaining:s.state.ShipsRemaining}),a.setState({getBoard:!1}),a.b=!1;case 10:case"end":return e.stop()}},e)})),a.state={GameStatus:e.GameState.GameStatus,CurrentTurn:e.GameState.CurrentTurn,ShipsRemaining:e.GameState.EnemyShipsR,screen:{width:a.width,height:a.height},ctx:void 0,getBoard:e.getBoard},a.shipCount={Carrier:5,Battleship:5,Cruiser:3,Submarine:3,Destroyer:2},a.enemyCells=new Array(100),a.enemyCells=a.addCells(0,0,"enemy"),a.lastMoveResult=" ",a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement("div",{className:"canvas-enemy"},s.createElement("canvas",{id:"enemyC",ref:this.canvasRef,width:"510",height:"510"}))}},{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current.getContext("2d");this.props.getBoard&&this.getBoard(),this.setSocket(),this.setState({ctx:t}),this.startGame(),this.setEvents(),requestAnimationFrame(function(){e.update()})}},{key:"componentDidUpdate",value:function(){this.saveBoard()}},{key:"setSocket",value:function(){var e=this;this.enemySocket=S()("https://reactships.herokuapp.com/play"),this.enemySocket.emit("join",this.props.roomID),this.enemySocket.on("setEnemyBoard",function(t){e.props.PlayerName!==t.boardName&&e.setupBoard(t.board)})}},{key:"setupBoard",value:function(e){this.importBoard=e,this.setBoard()}},{key:"update",value:function(){var e=this;this.drawCells(this.enemyCells),this.checkStatus(),requestAnimationFrame(function(){e.update()})}},{key:"startGame",value:function(){this.setState({GameStatus:O.Setup}),this.enemyBoard=new y("enemy"),this.enemyCells=new Array(100),this.enemyCells=this.addCells(0,0,"enemy")}},{key:"checkStatus",value:function(){0===this.state.ShipsRemaining&&(this.props.GameState.GameStatus=O.GameOver,this.props.GameState.Winner="Player Wins!",this.props.updateGameState(this.props.GameState))}},{key:"setEvents",value:function(){var e=this,t=this.canvasRef.current;t.addEventListener("click",function(a){var s=a.clientX-t.getBoundingClientRect().left,r=a.clientY-t.getBoundingClientRect().top;e.saveBoard(),1===e.props.GameState.GameStatus&&e.props.GameState.CurrentTurn!==e.props.PlayerName&&(e.enemySocket.emit("enemyMove",e.props.roomID,s,r,e.props.PlayerName),e.toggleCell(e.enemyCells,s,r))}),this.canvasRef.current.addEventListener("mousemove",function(a){var s=a.clientX-t.getBoundingClientRect().left,r=a.clientY-t.getBoundingClientRect().top;1===e.props.GameState.GameStatus&&e.hoverEffect(e.enemyCells,s,r)})}},{key:"drawCells",value:function(e){var t=this.state.ctx;e.forEach(function(e){t.fillStyle=e.c,t.fillRect(e.x+1,e.y+1,e.w-2,e.w-2)})}},{key:"addCells",value:function(e,t,a){for(var s=new Array(100),r=0;r<10;r++)for(var n=0;n<10;n++)s[r+10*n]=new f(50*r+e,50*n+t,a),s[r+10*n].c="enemy"===a?"#8F282F":"#464478";return s}},{key:"toggleCell",value:function(e,t,a){var s=this;e.forEach(function(e){if(e.contains(t,a))if("empty"===e.part||e.hit){if("empty"===e.part&&!e.hit){e.c="white";s.props.updateMoves({Player:"Player",Move:"Miss!"}),e.hit=!0,s.props.GameState.CurrentTurn=s.props.PlayerName,s.props.updateGameState(s.props.GameState)}}else{e.c="red",s.lastMoveResult="Hit!";var r={Player:"Player",Move:"Hit!"};e.hit=!0,s.shipCount[e.part]=s.shipCount[e.part]-1,0===s.shipCount[e.part]&&(r.Player="Player",r.Move="".concat(e.part," was sunk"),s.props.GameState.EnemyShipsR--,s.setState({ShipsRemaining:s.state.ShipsRemaining-1}),0===s.state.ShipsRemaining&&(s.setState({GameStatus:O.GameOver}),s.props.GameState.GameStatus=O.GameOver)),s.props.updateMoves(r),s.props.GameState.CurrentTurn=s.props.PlayerName,s.props.updateGameState(s.props.GameState)}})}},{key:"sendStats",value:function(e){"Hit"===e?this.enemySocket.emit("hit"):this.enemySocket.emit("miss")}},{key:"setBoard",value:function(){for(var e=0;e<this.importBoard.length;e++)0===this.importBoard[e]?this.enemyCells[e].part="empty":1===this.importBoard[e]?this.enemyCells[e].part="Carrier":2===this.importBoard[e]?this.enemyCells[e].part="Battleship":3===this.importBoard[e]?this.enemyCells[e].part="Cruiser":4===this.importBoard[e]?this.enemyCells[e].part="Submarine":this.enemyCells[e].part="Destroyer";this.shipCount={Carrier:5,Battleship:5,Cruiser:3,Submarine:3,Destroyer:2}}},{key:"hoverEffect",value:function(e,t,a){var s=this.state.ctx;e.forEach(function(e){e.contains(t,a)?(s.fillStyle="white",s.fillRect(e.x,e.y,e.w,e.w)):s.clearRect(e.x,e.y,e.w,e.w)})}}]),t}(s.Component),b=function e(t,a,s){Object(i.a)(this,e),this.size=void 0,this.name=void 0,this.orientation=void 0,this.c=void 0,this.size=a,this.name=t,this.c=s};function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,s)}return a}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach(function(t){Object(h.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var O,j=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).playerBoard=void 0,a.playerCells=void 0,a.currentShip=void 0,a.shipCells=[],a.ships=void 0,a.ship=void 0,a.height=510,a.width=510,a.canvasRef=s.createRef(),a.exported=0,a.b=!0,a.playerSocket=void 0,a.saveB=!1,a.saveBoard=Object(d.a)(m.a.mark(function e(){var t,s,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomID:a.props.roomID,player:a.props.PlayerName,boardCell:a.playerCells,state:a.state,ships:a.ships,ship:a.ship,playerBoard:a.playerBoard,currentShip:a.currentShip,shipCells:a.shipCells,exported:a.exported},e.next=3,fetch("https://reactships.herokuapp.com/api/playerBoard/".concat(a.props.roomID),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return s=e.sent,e.next=6,s.json();case 6:r=e.sent,console.log(r);case 8:case"end":return e.stop()}},e)})),a.getBoard=Object(d.a)(m.a.mark(function e(){var t,s,r,n,i;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://reactships.herokuapp.com/api/playerBoard/".concat(a.props.roomID,"&").concat(a.props.PlayerName));case 2:return t=e.sent,e.next=5,t.json();case 5:for(s=e.sent,r=0;r<a.playerCells.length;r++)a.playerCells[r].x=s.boardCell[r].x,a.playerCells[r].y=s.boardCell[r].y,a.playerCells[r].h=s.boardCell[r].h,a.playerCells[r].w=s.boardCell[r].w,a.playerCells[r].c=s.boardCell[r].c,a.playerCells[r].part=s.boardCell[r].part,a.playerCells[r].owner=s.boardCell[r].owner,a.playerCells[r].hover=s.boardCell[r].hover,a.playerCells[r].hit=s.boardCell[r].hit;for(a.exported=s.exported,n=0;n<a.ships.length;n++)a.ships[n].c=s.ships[n].c,a.ships[n].name=s.ships[n].name,a.ships[n].size=s.ships[n].size;for(i=0;i<a.shipCells.length;i++)a.shipCells[i].x=s.shipCells[i].x,a.shipCells[i].y=s.shipCells[i].y,a.shipCells[i].h=s.shipCells[i].h,a.shipCells[i].w=s.shipCells[i].w,a.shipCells[i].c=s.shipCells[i].c,a.shipCells[i].part=s.shipCells[i].part,a.shipCells[i].owner=s.shipCells[i].owner,a.shipCells[i].hover=s.shipCells[i].hover,a.shipCells[i].hit=s.shipCells[i].hit;a.currentShip=s.currentShip,a.ship=s.ship,a.setState(function(e){var t=k({},e.ShipParts);return t.Carrier=s.state[0].ShipParts.Carrier,t.Battleship=s.state[0].ShipParts.Battleship,t.Cruiser=s.state[0].ShipParts.Cruiser,t.Submarine=s.state[0].ShipParts.Submarine,t.Destroyer=s.state[0].ShipParts.Destroyer,{ShipParts:t}}),a.setState({ShipRemaining:s.state[0].ShipRemaining,clicks:s.state[0].clicks}),a.setState({CurrentShip:s.state[0].CurrentShip}),a.saveB=!0,a.updateCurrentShip(),a.setState({getBoard:!1}),a.b=!1;case 19:case"end":return e.stop()}},e)})),a.state={CurrentShip:"Carrier",GameStatus:e.GameState.GameStatus,ShipRemaining:5,ShipParts:{Carrier:5,Battleship:4,Cruiser:3,Submarine:3,Destroyer:2},screen:{width:a.width,height:a.height},clicks:0,getBoard:e.getBoard},a.ships=a.createShipList(),a.playerBoard=new y(a.props.PlayerName),a.playerCells=a.addCells(0,0,"player"),a.ship=0,a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement("div",{className:"canvas-player"},s.createElement("canvas",{id:"playerC",ref:this.canvasRef,width:this.state.screen.width,height:this.state.screen.height}))}},{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current.getContext("2d");this.props.getBoard&&this.getBoard(),this.setState({ctx:t}),this.startGame(),this.setSocket(),this.setEvents(),requestAnimationFrame(function(){e.update()})}},{key:"componentDidUpdate",value:function(){this.saveBoard()}},{key:"setSocket",value:function(){var e=this;this.playerSocket=S()("https://reactships.herokuapp.com/play"),this.playerSocket.emit("join",this.props.roomID),this.playerSocket.on("enemySendMove",function(t,a,s){if(s!==e.props.PlayerName){var r=!0,n=!1,i=void 0;try{for(var o,l=e.playerCells[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var p=o.value;if(p.contains(t,a)){if("Carrier"===p.part)e.setState(function(e){var t=k({},e.ShipParts);return t.Carrier--,{ShipParts:t}}),0===e.state.ShipParts.Carrier&&e.checkRemainingShips();else if("Battleship"===p.part)e.setState(function(e){var t=k({},e.ShipParts);return t.Battleship--,{ShipParts:t}}),0===e.state.ShipParts.Battleship&&e.checkRemainingShips();else if("Cruiser"===p.part)e.setState(function(e){var t=k({},e.ShipParts);return t.Cruiser--,{ShipParts:t}}),0===e.state.ShipParts.Cruiser&&e.checkRemainingShips();else if("Submarine"===p.part)e.setState(function(e){var t=k({},e.ShipParts);return t.Submarine--,{ShipParts:t}}),0===e.state.ShipParts.Submarine&&e.checkRemainingShips();else{if("empty"===p.part){p.hit=!0,p.c="white",p.part="empty",e.props.GameState.CurrentTurn="Player";e.props.updateMoves({Player:"Enemy",Move:"Miss!"}),e.props.updateGameState(e.props.GameState);break}e.setState(function(e){var t=k({},e.ShipParts);return t.Destroyer--,{ShipParts:t}}),0===e.state.ShipParts.Destroyer&&e.checkRemainingShips()}p.hit=!0,p.c="red",p.part="empty",e.props.GameState.CurrentTurn="Player";e.props.updateMoves({Player:"Enemy",Move:"Hit!"}),e.props.updateGameState(e.props.GameState)}}}catch(c){n=!0,i=c}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}}})}},{key:"update",value:function(){var e=this;this.drawCells(this.playerCells),1===this.props.GameState.GameStatus&&0===this.exported&&this.exportBoard(),this.state.GameStatus,requestAnimationFrame(function(){e.update()})}},{key:"startGame",value:function(){this.setState({GameStatus:O.Setup}),this.playerCells=[],this.shipCells=[],this.ship=0,this.currentShip=this.ships[this.ship],this.playerBoard=new y(this.props.PlayerName),this.playerCells=this.addCells(0,0,"player"),this.props.GameState.CurrentShip="Carrier",this.props.GameState.GameStatus=O.Setup,this.setState({CurrentShip:"Carrier"}),this.ships=this.createShipList(),this.props.updateGameState(this.props.GameState),this.setState(function(e){var t=k({},e.ShipParts);return t.Carrier=5,t.Battleship=4,t.Cruiser=3,t.Submarine=3,t.Destroyer=2,{ShipParts:t}}),this.setState({ShipRemaining:5,clicks:0})}},{key:"checkRemainingShips",value:function(){this.setState({ShipRemaining:this.state.ShipRemaining-1}),this.props.GameState.PlayerShipsR--,this.props.updateGameState(this.props.GameState),0===this.state.ShipRemaining&&(this.props.GameState.Winner="Enemy Wins!",this.props.GameState.GameStatus=O.GameOver,this.props.updateGameState(this.props.GameState))}},{key:"setEvents",value:function(){var e=this,t=this.canvasRef.current;t.addEventListener("click",function(a){var s=a.clientX-t.getBoundingClientRect().left,r=a.clientY-t.getBoundingClientRect().top;0===e.props.GameState.GameStatus&&(e.toggleCell(e.playerCells,s,r),e.checkValid(),e.saveBoard(),e.state.clicks===e.currentShip.size&&e.finalCheck(),e.checkShipTurn())}),this.canvasRef.current.addEventListener("mousemove",function(a){var s=a.clientX-t.getBoundingClientRect().left,r=a.clientY-t.getBoundingClientRect().top;0===e.props.GameState.GameStatus&&e.hoverEffect(e.playerCells,s,r)})}},{key:"updateCurrentShip",value:function(){this.props.GameState.CurrentShip=this.state.CurrentShip,this.props.updateGameState(this.props.GameState)}},{key:"createShipList",value:function(){var e=[],t=new b("Carrier",5,"#752323"),a=new b("Battleship",4,"#442375"),s=new b("Cruiser",3,"#2e7523"),r=new b("Submarine",3,"#23756e"),n=new b("Destroyer",2,"#727523");return e.push(t),e.push(a),e.push(s),e.push(r),e.push(n),e}},{key:"drawCells",value:function(e){var t=this,a=this.state.ctx;e.forEach(function(e){"empty"===e.part?(a.fillStyle=e.c,a.fillRect(e.x+1,e.y+1,e.w-2,e.w-2)):"empty"!==e.part&&(t.ships.forEach(function(t){t.name===e.part&&(a.fillStyle=t.c)}),a.fillRect(e.x+1,e.y+1,e.w-2,e.w-2))})}},{key:"addCells",value:function(e,t,a){for(var s=new Array(100),r=0;r<10;r++)for(var n=0;n<10;n++)s[r+10*n]=new f(50*r+e,50*n+t,a),s[r+10*n].c="enemy"===a?"#8F282F":"#464478";return s}},{key:"checkShipTurn",value:function(){var e=this;this.shipCells.length===this.currentShip.size&&("Destroyer"===this.currentShip.name?(this.setState({GameStatus:O.Playing}),this.props.GameState.GameStatus=this.state.GameStatus,this.props.GameState.CurrentTurn="Player",this.props.updateGameState(this.props.GameState),this.playerBoard=new y(this.props.PlayerName),this.playerCells.forEach(function(t){"empty"===t.part?e.playerBoard.board.push(0):"Carrier"===t.part?e.playerBoard.board.push(1):"Battleship"===t.part?e.playerBoard.board.push(2):"Cruiser"===t.part?e.playerBoard.board.push(3):"Submarine"===t.part?e.playerBoard.board.push(4):e.playerBoard.board.push(5)})):(this.setState({clicks:0}),this.ship++,this.currentShip=this.ships[this.ship],this.setState({CurrentShip:this.currentShip.name}),this.updateCurrentShip(),this.shipCells=[]))}},{key:"toggleCell",value:function(e,t,a){var s=this,r=this.state.ctx;0===this.props.GameState.GameStatus?(this.props.GameState.SetupMessages="",this.props.updateGameState(this.props.GameState),e.forEach(function(e){e.contains(t,a)&&s.state.clicks!==s.currentShip.size&&"empty"===e.part&&(s.shipCells.push(e),e.part=s.currentShip.name,s.setState({clicks:s.state.clicks+1}))})):e.forEach(function(e){e.contains(t,a)&&s.state.clicks!==s.currentShip.size&&"empty"===e.part&&(s.shipCells.push(e),e.part="enemy",r.fillStyle="red",r.fillRect(e.x,e.y,e.w,e.w),s.setState({clicks:s.state.clicks+1}))})}},{key:"checkValid",value:function(){this.checkValidCell()||this.clearInvalid()}},{key:"clearInvalid",value:function(){var e=this;this.props.GameState.SetupMessages="Invalid Ship Placement",this.props.updateGameState(this.props.GameState),this.playerCells.forEach(function(t){t.part===e.currentShip.name&&(t.part="empty")}),this.shipCells=[],this.setState({clicks:0})}},{key:"checkValidCell",value:function(){var e;if(1===this.shipCells.length)return!0;if(this.shipCells.length>1){if(this.shipCells[0].x===this.shipCells[1].x)e="h";else{if(this.shipCells[0].y!==this.shipCells[1].y)return!1;e="v"}for(var t=0;t<this.shipCells.length;t++)if("h"===e){if(this.shipCells[0].x!==this.shipCells[t].x)return!1}else if("v"===e&&this.shipCells[0].y!==this.shipCells[t].y)return!1;return!0}return!1}},{key:"finalCheck",value:function(){var e,t=this,a=this.playerCells.filter(function(e){return e.part===t.currentShip.name});a[0].x===a[1].x?e="v":a[0].y===a[1].y&&(e="h");for(var s=0,r=1;s<a.length-1;s++,r++){if("h"===e){if(a[s].x+50===a[r].x||a[s].x-50===a[r].x)continue;return void this.clearInvalid()}if("v"===e){if(a[s].y+50===a[r].y||a[s].y-50===a[r].y)continue;return void this.clearInvalid()}}}},{key:"hoverEffect",value:function(e,t,a){var s=this.state.ctx;e.forEach(function(e){e.contains(t,a)?(s.fillStyle="white",s.fillRect(e.x,e.y,e.w,e.w)):s.clearRect(e.x,e.y,e.w,e.w)})}},{key:"exportBoard",value:function(){this.playerSocket.emit("playerBoard",this.playerBoard,this.props.roomID),this.exported=1}}]),t}(s.Component),w=(a(114),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement("div",null,s.createElement("div",{className:"status-name"},this.props.player),s.createElement("div",{className:"status-msg"},this.props.move))}}]),t}(s.Component)),G=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.messages.map(function(e,t){return s.createElement(w,{key:t,player:e.Player,move:e.Move})});return s.createElement("div",{className:"status-messages",id:"status-list"},e)}},{key:"componentDidUpdate",value:function(){var e=document.getElementById("status-list");e.scrollTop=e.scrollHeight}}]),t}(s.Component),E=function(e){return r.a.createElement("div",{className:"current-turn"},e.currentTurn,"'s Turn")},x=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return 0===this.props.GameState.GameStatus?s.createElement("div",{className:"status-area"},s.createElement("div",null,"Currently Placing: ",this.props.GameState.CurrentShip),s.createElement("div",null,this.props.GameState.SetupMessages)):s.createElement("div",{className:"status-area playing"},s.createElement(E,{currentTurn:this.props.GameState.CurrentTurn}),s.createElement(G,{messages:this.props.GameState.Moves}))}}]),t}(s.Component),B=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.me?"player-message":"enemy";return s.createElement("div",{className:e},s.createElement("div",{className:"username"},this.props.username),s.createElement("div",{className:"message-body"},this.props.text))}}]),t}(s.Component),P=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.messages.map(function(e,t){return s.createElement(B,{key:t,username:e.username,text:e.text,me:e.me})});return s.createElement("div",{className:"messages",id:"messageList"},e)}},{key:"componentDidUpdate",value:function(){var e=document.getElementById("messageList");e.scrollTop=e.scrollHeight}}]),t}(s.Component),D=a(16),R=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).state={chatInput:""},a.handleText=a.handleText.bind(Object(D.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(D.a)(a)),a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement("form",{onSubmit:this.handleSubmit,className:"chat-input"},s.createElement("input",{type:"text",onChange:this.handleText,id:"chat-box",value:this.state.chatInput,placeholder:"Type a message and press enter...",required:!0}))}},{key:"handleText",value:function(e){this.setState({chatInput:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.onSend(this.state.chatInput,this.props.username),this.setState({chatInput:""})}}]),t}(s.Component),N=(a(115),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).socket=void 0,a.sendMessage=function(e,t){a.socket.emit("sendMessage",e,a.props.roomID,a.props.username)},a.updateMessages=function(e,t){var s=!1,r=a.state.messages;t===a.props.username&&(s=!0);var n={username:t,text:e,me:s};r.push(n),a.setState({messages:r})},a.state={messages:[],username:e.username},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket=S()("https://reactships.herokuapp.com"),this.socket.emit("join",this.props.username,this.props.roomID),this.socket.on("message",function(t,a){e.updateMessages(t,a)})}},{key:"componentWillUnmount",value:function(){this.socket.emit("disconnect")}},{key:"render",value:function(){return s.createElement("div",{className:"chat-area",id:"chat"},s.createElement("span",{className:"chat-title"},"Chat"),s.createElement(P,{messages:this.state.messages}),s.createElement(R,{onSend:this.sendMessage,username:this.props.username}))}}]),t}(s.Component));function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,s)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(a,!0).forEach(function(t){Object(h.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}!function(e){e[e.Setup=0]="Setup",e[e.Playing=1]="Playing",e[e.GameOver=2]="GameOver"}(O||(O={}));var T=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).playSocket=void 0,a.loaded=!0,a.test=void 0,a.saveState=Object(d.a)(m.a.mark(function e(){var t,s,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={roomID:a.state.roomID,PlayerName:a.props.player,state:a.state},e.next=3,fetch("https://reactships.herokuapp.com/api/gamestate/".concat(a.state.roomID),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return s=e.sent,e.next=6,s.json();case 6:r=e.sent,console.log(r);case 8:case"end":return e.stop()}},e)})),a.getState=Object(d.a)(m.a.mark(function e(){var t,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://reactships.herokuapp.com/api/gamestate/".concat(a.props.roomid,"&").concat(a.props.player));case 2:return t=e.sent,e.next=5,t.json();case 5:s=e.sent,console.log(s.state),a.setState({GameState:s.state.GameState}),a.setState({getBoard:!1}),a.loaded=!0;case 10:case"end":return e.stop()}},e)})),a.updateGameState=function(e){a.setState(function(t){M({},t.GameState);return{GameState:e}})},a.updateMoves=function(e){a.setState(function(t){var a=M({},t.GameState);return a.Moves.push(e),{GameState:a}})},a.state={roomID:a.props.roomid,GameState:{CurrentShip:null,CurrentTurn:null,Moves:[],GameStatus:O.Setup,Winner:null,EnemyShipsR:5,PlayerShipsR:5,SetupMessages:null},PlayerName:a.props.player,getBoard:a.props.getBoard},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.getBoard&&(this.loaded=!1,this.getState()),this.setUpdate(),this.test=setInterval(function(){return e.setUpdate()},5e3)}},{key:"setUpdate",value:function(){!1===this.props.getBoard&&!0===this.loaded&&this.saveState()}},{key:"componentWillUnmount",value:function(){this.playSocket.emit("disconnect")}},{key:"render",value:function(){return s.createElement("div",{className:"play-area"},s.createElement(C,{updateGameState:this.updateGameState,updateMoves:this.updateMoves,GameState:this.state.GameState,roomID:this.state.roomID,PlayerName:this.state.PlayerName,getBoard:this.state.getBoard}),s.createElement(j,{updateGameState:this.updateGameState,updateMoves:this.updateMoves,GameState:this.state.GameState,roomID:this.state.roomID,PlayerName:this.state.PlayerName,getBoard:this.state.getBoard}),s.createElement(x,{GameState:this.state.GameState,roomID:this.props.roomid}),s.createElement(N,{username:this.props.player,roomID:this.props.roomid}))}}]),t}(s.Component),L=a(141),A=a(142),U=a(43),z=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement(L.a,{variant:"dark",expand:"lg"},s.createElement(U.LinkContainer,{to:"/"},s.createElement(L.a.Brand,null,"ReactShips")),s.createElement(L.a.Toggle,{"aria-controls":"basic-navbar-nav"}),s.createElement(L.a.Collapse,{id:"basic-navbar-nav"},s.createElement(A.a,{className:"mr-auto"},s.createElement(U.LinkContainer,{to:"/"},s.createElement(A.a.Link,null,"Home")),s.createElement(A.a.Link,{onClick:this.props.stats},"Stats"),s.createElement("div",{className:"navbar-text"},"Room ID: ",this.props.roomid))))}}]),t}(s.Component),H=a(140),F=(a(129),function(){return r.a.createElement("div",null,r.a.createElement("h1",{className:"player-h"},"Player Details"))}),W=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).handleLoad=function(e){e.preventDefault(),a.state.disableButton||(a.props.player(a.state.playerName),""!==a.state.roomID&&(a.props.room(a.state.roomID),a.props.handleLogin(!0,!0)),a.setState({disableButton:!0}))},a.handleSubmit=function(e){e.preventDefault(),a.state.disableButton||(a.props.player(a.state.playerName),""!==a.state.roomID?(a.props.room(a.state.roomID),a.props.handleLogin(!0,!1)):a.setRoom(),a.setState({disableButton:!0}))},a.setRoom=Object(d.a)(m.a.mark(function e(){var t,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://reactships.herokuapp.com/api/gameID");case 2:return t=e.sent,e.next=5,t.json();case 5:s=e.sent,a.setState({roomID:s.id}),a.props.room(a.state.roomID),a.props.handleLogin(!0,!1);case 9:case"end":return e.stop()}},e)})),a.handleChange=function(e){a.setState(Object(h.a)({},e.target.name,e.target.value))},a.state={playerName:"",roomID:"",disableButton:!1},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement("form",{className:"player-details"},s.createElement(F,null),s.createElement("label",null,s.createElement("span",{className:"player-name"},"Please Enter your Player Name")),s.createElement("input",{type:"text",name:"playerName",required:!0,onChange:this.handleChange,value:this.state.playerName}),s.createElement("label",null,s.createElement("span",{className:"room-id"},"Room ID")," "),s.createElement("input",{type:"text",className:"room-input",name:"roomID",onChange:this.handleChange,value:this.state.roomID}),s.createElement(H.a,{variant:"outline-success",type:"submit",name:"New",onClick:this.handleSubmit},"New / Join Game"),s.createElement(H.a,{variant:"outline-success",type:"submit",name:"Load",onClick:this.handleLoad},"Load Game"))}}]),t}(s.Component),q=a(29),J=a(20),V=a(74),X=function(e){function t(){var e,a;Object(i.a)(this,t);for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];return(a=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).stats={ActiveUsers:0,Hits:0,Misses:0},a.getStats=Object(d.a)(m.a.mark(function e(){var t,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://reactships.herokuapp.com/api/stats");case 2:return t=e.sent,e.next=5,t.json();case 5:s=e.sent,a.stats=s,console.log(a.stats),a.drawChart();case 9:case"end":return e.stop()}},e)})),a.xLocation=function(e,t,a,s){return t*(a/s)+a/s/2},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.createElement("div",{id:"chart-test",className:"chart-test"})}},{key:"componentDidMount",value:function(){this.getStats()}},{key:"drawChart",value:function(){var e=this,t=[];t.push({name:"Users",stats:this.stats.ActiveUsers}),t.push({name:"Hits",stats:this.stats.Hits}),t.push({name:"Misses",stats:this.stats.Misses});var a=V.a("#chart-test").append("svg").attr("width",600).attr("height",100);a.selectAll("rect").data(t).enter().append("rect").attr("x",function(e,a){return a*(600/t.length)}).attr("y",function(e){return 100-4*e.stats}).attr("width",600/t.length-1).attr("height",function(e){return 4*e.stats}).attr("fill",function(e){return"rgb(10, 0, ".concat(10*e.stats,")")});var s=a.selectAll("text").data(t).enter();s.append("text").text(function(e){return e.stats}).attr("text-anchor","middle").attr("x",function(a,s){return e.xLocation(a,s,600,t.length)}).attr("y",function(e){return 100-4*e.stats+14}).attr("font-family","sans-serif").attr("font-size","11px").attr("fill","white"),s.append("text").text(function(e){return e.name}).attr("text-anchor","middle").attr("x",function(a,s){return e.xLocation(a,s,600,t.length)}).attr("y",function(e){return 84-4*e.stats+14}).attr("font-family","sans-serif").attr("font-size","11px").attr("fill","white")}}]),t}(s.Component),Y=a(75),K=a(73),Q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(p.a)(t).call(this,e))).getDetails=function(e){a.setState({playerName:e})},a.getRoomID=function(e){e.length<1||a.setState({roomID:e})},a.showStats=function(){return a.setState({showStats:!a.state.showStats})},a.handleLogin=function(e,t){a.setState({login:e}),a.setState({getBoard:t})},a.state={login:!1,playerName:"Player",enemyName:"No Enemy Ready",showStats:!1},a}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.state.login?s.createElement(q.BrowserRouter,null,s.createElement("div",null,s.createElement(z,{roomid:this.state.roomID,stats:this.showStats}),s.createElement(K.Transition,{native:!0,items:this.state.showStats,from:{opacity:0},enter:{opacity:1},leave:{opacity:0}},function(e){return e&&function(e){return s.createElement(Y.a.div,{style:e},s.createElement(X,null))}}),s.createElement(J.g,null,s.createElement(J.d,{path:"/",exact:!0,render:function(t){return s.createElement(T,Object.assign({},t,{player:e.state.playerName,enemy:e.state.enemyName,roomid:e.state.roomID,getBoard:e.state.getBoard}))}})))):s.createElement("div",null,s.createElement(L.a,{variant:"dark",expand:"lg"},s.createElement(L.a.Brand,null,"ReactShips")),s.createElement("div",{className:"login-container"},s.createElement(W,{handleLogin:this.handleLogin,player:this.getDetails,room:this.getRoomID})))}}]),t}(s.Component);n.render(s.createElement("div",null,s.createElement(Q,null)),document.getElementById("root"))},76:function(e,t,a){e.exports=a(138)},82:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.84550e8b.chunk.js.map