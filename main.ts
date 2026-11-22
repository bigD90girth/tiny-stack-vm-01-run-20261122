import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,q){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256);
 let s=0,c=0,pc=0,st=0,ip=0,ol=0,out='';
 const n=p.length;
 const trap=e=>[out,e];
 for(;;){
  if(st===1e6)return trap(10);
  if(pc<0||pc>=n)return trap(9);
  const o=p[pc],im=o===1?1:o===2?4:o>=48&&o<52?2:0;
  if(pc+im>=n)return trap(9);
  st++;
  const nx=pc+1+im;
  pc=nx;
  switch(o){
  case 0:return[out,0];
  case 1:
   if(s>255)return trap(3);
   D[s++]=(p[nx-1]<<24)>>24;
   break;
  case 2:
   if(s>255)return trap(3);
   D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;
   break;
  case 3:
   if(s<1)return trap(2);
   s--;
   break;
  case 4:
   if(s<1)return trap(2);
   if(s>255)return trap(3);
   D[s]=D[s-1];s++;
   break;
  case 5:{
   if(s<2)return trap(2);
   const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;
   break;}
  case 6:
   if(s<2)return trap(2);
   if(s>255)return trap(3);
   D[s]=D[s-2];s++;
   break;
  case 7:{
   if(s<3)return trap(2);
   const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;
   break;}
  case 23:
   if(s<1)return trap(2);
   D[s-1]=-D[s-1]|0;
   break;
  case 27:
   if(s<1)return trap(2);
   D[s-1]=~D[s-1];
   break;
  case 48:case 49:case 50:{
   const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
   let t=true;
   if(o!==48){
    if(s<1)return trap(2);
    const v=D[--s];
    t=o===49?v===0:v!==0;
   }
   if(t)pc=nx+rel;
   break;}
  case 51:
   if(c===64)return trap(7);
   C[c++]=nx;
   pc=p[nx-2]|p[nx-1]<<8;
   break;
  case 52:
   if(c===0)return trap(8);
   pc=C[--c];
   break;
  case 64:{
   if(s<1)return trap(2);
   const a=D[s-1];
   if(a<0||a>255)return trap(6);
   D[s-1]=M[a];
   break;}
  case 65:{
   if(s<2)return trap(2);
   const a=D[s-1],v=D[s-2];
   if(a<0||a>255)return trap(6);
   s-=2;M[a]=v;
   break;}
  case 80:{
   if(s<1)return trap(2);
   const g=String(D[s-1]);
   if(ol+g.length>65536)return trap(11);
   s--;out+=g;ol+=g.length;
   break;}
  case 81:
   if(s<1)return trap(2);
   if(ol+1>65536)return trap(11);
   out+=String.fromCharCode(D[--s]&255);ol++;
   break;
  case 82:
   if(s>255)return trap(3);
   D[s++]=ip<q.length?q[ip++]:-1;
   break;
  case 83:
   if(s<1)return trap(2);
   return[out,D[--s]&255];
  default:
   if(o>=16&&o<=34&&o!==31){
    if(s<2)return trap(2);
    const b=D[s-1],a=D[s-2];
    let r=0;
    if(o===16)r=(a+b)|0;
    else if(o===17)r=(a-b)|0;
    else if(o===18)r=Math.imul(a,b);
    else if(o===19){if(!b)return trap(4);r=(a/b)|0;}
    else if(o===20){if(!b)return trap(4);r=a%b|0;}
    else if(o===21){if(!b)return trap(4);r=(a>>>0)/(b>>>0)|0;}
    else if(o===22){if(!b)return trap(4);r=(a>>>0)%(b>>>0)|0;}
    else if(o===24)r=a&b;
    else if(o===25)r=a|b;
    else if(o===26)r=a^b;
    else if(o===28)r=a<<b;
    else if(o===29)r=a>>b;
    else if(o===30)r=a>>>b|0;
    else if(o===32)r=a===b?1:0;
    else if(o===33)r=a<b?1:0;
    else r=(a>>>0)<(b>>>0)?1:0;
    s-=2;D[s++]=r;
   }else return trap(5);
  }
 }
}
for(const id of readdirSync(I).sort()){
 const r=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),Buffer.from(r[0],'latin1'));
 writeFileSync(join(O,id,'exit.txt'),r[1]+'\n');
}
