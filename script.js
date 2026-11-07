const stars=document.getElementById('stars');
for(let i=0;i<55;i++){const s=document.createElement('span');s.className='star';s.textContent='✦';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.fontSize=8+Math.random()*12+'px';s.style.animationDelay=Math.random()*3+'s';stars.appendChild(s)}
const no=document.getElementById('no');
let lastDodge=0;
function moveNoButton(pointerX=innerWidth/2,pointerY=innerHeight/2){
  const rect=no.getBoundingClientRect(),margin=12;
  const maxX=Math.max(margin,innerWidth-rect.width-margin),maxY=Math.max(margin,innerHeight-rect.height-margin);
  let x=margin+Math.random()*Math.max(0,maxX-margin),y=margin+Math.random()*Math.max(0,maxY-margin);
  for(let i=0;i<18;i++){const tx=margin+Math.random()*Math.max(0,maxX-margin),ty=margin+Math.random()*Math.max(0,maxY-margin);if(Math.hypot(tx+rect.width/2-pointerX,ty+rect.height/2-pointerY)>Math.hypot(x+rect.width/2-pointerX,y+rect.height/2-pointerY)){x=tx;y=ty}}
  no.style.position='fixed';no.style.left=Math.round(x)+'px';no.style.top=Math.round(y)+'px';no.style.zIndex='30';lastDodge=Date.now();
}
function dodgeIfApproaching(e){
  if(document.getElementById('invite').classList.contains('hidden'))return;
  if(e.pointerType&&e.pointerType!=='mouse'&&e.pointerType!=='pen')return;
  const r=no.getBoundingClientRect(),pad=110;
  if(e.clientX>=r.left-pad&&e.clientX<=r.right+pad&&e.clientY>=r.top-pad&&e.clientY<=r.bottom+pad&&Date.now()-lastDodge>280)moveNoButton(e.clientX,e.clientY);
}
document.addEventListener('pointermove',dodgeIfApproaching,true);
no.addEventListener('pointerenter',e=>moveNoButton(e.clientX,e.clientY));
no.addEventListener('touchstart',e=>{e.preventDefault();const t=e.touches[0];moveNoButton(t.clientX,t.clientY)},{passive:false});
no.addEventListener('click',e=>{e.preventDefault();moveNoButton(e.clientX||innerWidth/2,e.clientY||innerHeight/2)});
addEventListener('resize',()=>{if(no.style.position==='fixed'){const r=no.getBoundingClientRect();no.style.left=Math.max(12,Math.min(innerWidth-r.width-12,r.left))+'px';no.style.top=Math.max(12,Math.min(innerHeight-r.height-12,r.top))+'px'}});
function launchFireworks(){
  const symbols=['🎆','🎇','✨','💖','🌟','🎉','🪔'];
  for(let i=0;i<38;i++){const f=document.createElement('span');f.className='firework';f.textContent=symbols[Math.floor(Math.random()*symbols.length)];f.style.left=(5+Math.random()*90)+'vw';f.style.top=(8+Math.random()*72)+'vh';f.style.animationDelay=(Math.random()*.9)+'s';document.body.appendChild(f);setTimeout(()=>f.remove(),2600)}
  for(let i=0;i<65;i++){const c=document.createElement('span');c.className='confetti';c.textContent=['✨','🎉','💛','🌟','🪔','💖','🌸'][Math.floor(Math.random()*7)];c.style.left=Math.random()*100+'vw';c.style.animationDuration=(2+Math.random()*3)+'s';c.style.animationDelay=(Math.random()*.8)+'s';c.style.fontSize=(14+Math.random()*18)+'px';document.body.appendChild(c);setTimeout(()=>c.remove(),6000)}
}
let currentMoment=0;
const moments=[...document.querySelectorAll('[data-moment]')];
function showMoment(index){
  currentMoment=index;
  moments.forEach((el,i)=>el.hidden=i!==index);
  document.querySelectorAll('#progressDots span').forEach((dot,i)=>dot.classList.toggle('active',i===index));
  const next=document.getElementById('nextMoment'),again=document.getElementById('again');
  next.classList.toggle('hidden',index===moments.length-1);
  again.classList.toggle('hidden',index!==moments.length-1);
  next.textContent=index===0?'Light the diyas 🪔':index===1?'See the colours 🌸':index===2?'A little sweetness 🍬':index===3?'One little note 💌':'The grand finale 🎆';
  if(index===5)launchFireworks();
}
function showCelebration(){
  document.getElementById('invite').classList.add('hidden');
  document.getElementById('celebration').classList.remove('hidden');
  showMoment(0);
  launchFireworks();
}
document.getElementById('yes').addEventListener('click',showCelebration);
document.getElementById('nextMoment').addEventListener('click',()=>{if(currentMoment<moments.length-1)showMoment(currentMoment+1)});
document.getElementById('again').addEventListener('click',()=>{showMoment(0);launchFireworks()});
