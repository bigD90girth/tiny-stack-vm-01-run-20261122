import f from'node:fs';
const E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',O=E.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,q){
const D=[],C=[],M=[];
let s=0,c=0,pc=0,st=0,ip=0,ol=0,a,b,r,out='';
const n=p.length,t=e=>[out,e];
for(;;){
if(st==1e6)return t(10);
if(pc>>>0>=n)return t(9);
const o=p[pc],m=o<3?o==2?4:o:o>47&&o<52?2:0;
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
case 5:if(s<=1)return t(2);[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
case 6:if(s<=1)return t(2);if(s>>8)return t(3);D[s]=D[s-2],s++;break;
case 7:if(s<=2)return t(2);[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
case 23:if(!s)return t(2);D[s-1]=-D[s-1]|0;break;
case 27:if(!s)return t(2);D[s-1]=~D[s-1];break;
case 48:case 49:case 50:r=(p[x-2]|p[x-1]<<8)<<16>>16;if(o>48){if(!s)return t(2);a=D[--s];if((o==49)==(a!==0))break}pc=x+r;break;
case 51:if(c>63)return t(7);C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return t(8);pc=C[--c];break;
case 64:if(!s)return t(2);a=D[s-1];if(a>>>0>255)return t(6);D[s-1]=M[a]|0;break;
case 65:if(s<=1)return t(2);a=D[s-1],b=D[s-2];if(a>>>0>255)return t(6);s-=2;M[a]=b;break;
case 80:if(!s)return t(2);a=String(D[--s]);if(65536<ol+a.length)return t(11);out+=a;ol+=a.length;break;
case 81:if(!s)return t(2);if(ol>65535)return t(11);out+=String.fromCharCode(D[--s]&255);ol++;break;
case 82:if(s>>8)return t(3);D[s++]=ip<q.length?q[ip++]:-1;break;
case 83:if(!s)return t(2);return[out,D[--s]&255];
default:if(o>15&&o<35&&o!=31){if(s<=1)return t(2);if(o>18&&o<23&&!D[s-1])return t(4);b=D[s-1];a=D[s-2];s-=2;D[s++]=o<17?a+b|0:o<18?a-b|0:o<19?Math.imul(a,b):o<20?(a/b)|0:o<21?a%b|0:o<22?(a>>>0)/(b>>>0)|0:o<23?(a>>>0)%(b>>>0)|0:o<25?a&b:o<26?a|b:o<27?a^b:o<29?a<<b:o<30?a>>b:o<31?a>>>b|0:o<33?+(a===b):o<34?+(a<b):+((a>>>0)<(b>>>0))}else return t(5);
}
}
}
for(const d of f.readdirSync(I)){const u=I+'/'+d,w=O+'/'+d,[a,b]=run(f.readFileSync(u+'/program.bin'),f.readFileSync(u+'/input.bin'));f.mkdirSync(w,{recursive:!0});f.writeFileSync(w+'/stdout.bin',a,'latin1');f.writeFileSync(w+'/exit.txt',b+'\n')}
