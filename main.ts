import*as f from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256);
let s=0,c=0,pc=0,st=0,ip=0,ol=0,a,b,v,r,y,g,out='';
const n=p.length,t=e=>[out,e];
const B=[(a,b)=>a+b|0,(a,b)=>a-b|0,Math.imul,(a,b)=>(a/b)|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b|0,0,(a,b)=>+(a===b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
for(;;){
if(st==1e6)return t(10);
if(pc>>>0>=n)return t(9);
const o=p[pc],m=o==1?1:o==2?4:o>47&&o<52?2:0;
if(n<=pc+m)return t(9);
st++;
const x=pc+1+m;
pc=x;
switch(o){
case 0:return[out,0];
case 1:if(s>>8)return t(3);D[s++]=p[x-1]<<24>>24;break;
case 2:if(s>>8)return t(3);D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:if(!s)return t(2);s--;break;
case 4:if(!s)return t(2);if(s>>8)return t(3);D[s]=D[s-1],s++;break;
case 5:if(s<=1)return t(2);a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break;
case 6:if(s<=1)return t(2);if(s>>8)return t(3);D[s]=D[s-2],s++;break;
case 7:if(s<=2)return t(2);a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;
case 23:if(!s)return t(2);D[s-1]=-D[s-1]|0;break;
case 27:if(!s)return t(2);D[s-1]=~D[s-1];break;
case 48:case 49:case 50:r=(p[x-2]|p[x-1]<<8)<<16>>16;y=1;if(o-48){if(!s)return t(2);v=D[--s];y=o==49?v===0:v!==0}if(y)pc=x+r;break;
case 51:if(c>63)return t(7);C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return t(8);pc=C[--c];break;
case 64:if(!s)return t(2);a=D[s-1];if(a>>>0>255)return t(6);D[s-1]=M[a];break;
case 65:if(s<=1)return t(2);a=D[s-1],v=D[s-2];if(a>>>0>255)return t(6);s-=2;M[a]=v;break;
case 80:if(!s)return t(2);g=String(D[s-1]);if(65536<ol+g.length)return t(11);s--;out+=g;ol+=g.length;break;
case 81:if(!s)return t(2);if(ol>65535)return t(11);out+=String.fromCharCode(D[--s]&255);ol++;break;
case 82:if(s>>8)return t(3);D[s++]=ip<q.length?q[ip++]:-1;break;
case 83:if(!s)return t(2);return[out,D[--s]&255];
default:if(o>15&&o<35&&o!=31){if(s<=1)return t(2);if(o>18&&o<23&&!D[s-1])return t(4);b=D[s-1];a=D[s-2];s-=2;D[s++]=B[o-16](a,b)}else return t(5);
}
}
}
for(const d of f.readdirSync(I)){const z=run(f.readFileSync(I+'/'+d+'/program.bin'),f.readFileSync(I+'/'+d+'/input.bin'));f.mkdirSync(O+'/'+d,{recursive:!0});f.writeFileSync(O+'/'+d+'/stdout.bin',Buffer.from(z[0],'latin1'));f.writeFileSync(O+'/'+d+'/exit.txt',z[1]+'\n')}
