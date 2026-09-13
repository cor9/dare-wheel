const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname,'../script.js'),'utf8');
const connect = source.slice(source.indexOf('async function connect('),source.indexOf('\nfunction renderLobby()',source.indexOf('async function connect(')));
for (const phase of ['lobby','play']) test(`join preserves ${phase} screen without waiting for camera`,async()=>{
 const els = new Map();
 const $ = id => {
  if (!els.has(id)) {const classes = new Set(['hidden']);els.set(id,{value:'',textContent:'',classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),toggle:(c,on)=>on?classes.add(c):classes.delete(c),contains:c=>classes.has(c)}});}
  return els.get(id);
 };
 const S={phase:'lobby'};
  const context=vm.createContext({ $,S,ROOM_PREFIX:'test',Math,tiles:new Map(),soloMode:false,
   window:{},syncInterval:null,clearInterval:()=>{},setInterval:()=>1,requestGameState:()=>{},
  P2PRoom:class {constructor(){this.me={id:'guest'};this.hostId='host';}async join(){S.phase=phase;}},
  LKMedia:class {connect(){return new Promise(()=>{});}},
  mountChatUI:()=>({}),isHost:()=>false,setTiles:()=>{},renderLobby:()=>{},
 });
 vm.runInContext(connect,context);
 await context.connect(false,'abc123');
 assert.equal($('homeScreen').classList.contains('hidden'),true);
 assert.equal($('lobbyScreen').classList.contains('hidden'),phase==='play');
});
