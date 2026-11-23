import f from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',R=f.readFileSync,W=f.writeFileSync;
const B='a+b|0;a-b|0;Math.imul(a,b);a/b|0;a%b|0;u/v|0;u%v|0;;a&b;a|b;a^b;;a<<b;a>>b;a>>>b|0;;+(a==b);+(a<b);+(u<v)'.split(';');
function run(p,q){
const D=[],C=[],M=[];
let s=0,c=0,pc=0,st=0,ip=0,ol=0,a,b,u,v,out='';
const U=n=>{if(s<(n||1))throw 2},P=v=>{if(s>>8)throw 3;D[s++]=v};
try{for(;;){
if(++st>1e6)throw 10;
if(pc>>>0>=p.length)throw 9;
const o=p[pc],m=o<3?o==2?4:o:o>47&o<52?2:0;
if(p.length<=pc+m)throw 9;
pc+=1+m;
switch(o){
case 0:return[out,0];
case 1:P(p[pc-1]<<24>>24);break;
case 2:P(p.readInt32LE(pc-4));break;
case 3:U();s--;break;
case 4:U();P(D[s-1]);break;
case 5:U(2);a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break;
case 6:U(2);P(D[s-2]);break;
case 7:U(3);a=D[s-1];D[s-1]=D[s-3];D[s-3]=D[s-2];D[s-2]=a;break;
case 23:U();D[s-1]=-D[s-1]|0;break;
case 27:U();D[s-1]=~D[s-1];break;
case 48:case 49:case 50:if(o>48){U();a=D[--s];if((o==49)!=(a==0))break}pc+=p.readInt16LE(pc-2);break;
case 51:if(c>63)throw 7;C[c++]=pc;pc=p[pc-2]|p[pc-1]<<8;break;
case 52:if(!c)throw 8;pc=C[--c];break;
case 64:U();a=D[s-1];if(a>>>8)throw 6;D[s-1]=M[a]|0;break;
case 65:U(2);a=D[s-1],b=D[s-2];if(a>>>8)throw 6;s-=2;M[a]=b;break;
case 80:U();a=D[--s]+'';if((ol+=a.length)>65536)throw 11;out+=a;break;
case 81:U();if(++ol>65536)throw 11;out+=String.fromCharCode(D[--s]&255);break;
case 82:P(ip<q.length?q[ip++]:-1);break;
case 83:U();return[out,D[--s]&255];
default:if(o>15&o<35&&o!=31){U(2);if(o>18&o<23&&!D[s-1])throw 4;b=D[s-1];a=D[s-2];u=a>>>0;v=b>>>0;s-=2;P(eval(B[o-16]))}else throw 5;
}
}}catch(e){return[out,e]}
}
f.readdirSync(I).map(d=>{const u=I+'/'+d,w=O+'/'+d,[a,b]=run(R(u+'/program.bin'),R(u+'/input.bin'));f.mkdirSync(w,{recursive:!0});W(w+'/stdout.bin',a,'latin1');W(w+'/exit.txt',b+'\n')});
