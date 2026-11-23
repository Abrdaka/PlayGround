(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const oo="180",Qc=0,No=1,th=2,Ql=1,eh=2,Sn=3,zn=0,Be=1,en=2,On=0,ii=1,Ii=2,Oo=3,Fo=4,nh=5,Qn=100,ih=101,sh=102,rh=103,ah=104,oh=200,lh=201,ch=202,hh=203,ca=204,ha=205,uh=206,dh=207,fh=208,ph=209,mh=210,gh=211,_h=212,vh=213,xh=214,ua=0,da=1,fa=2,Ni=3,pa=4,ma=5,ga=6,_a=7,lo=0,yh=1,Mh=2,Fn=0,Sh=1,Eh=2,bh=3,tc=4,Th=5,wh=6,Ah=7,ec=300,Oi=301,Fi=302,va=303,xa=304,gr=306,ya=1e3,Nn=1001,Ma=1002,$e=1003,Rh=1004,ys=1005,un=1006,Sr=1007,ei=1008,fn=1009,nc=1010,ic=1011,ss=1012,co=1013,ai=1014,En=1015,fs=1016,ho=1017,uo=1018,rs=1020,sc=35902,rc=35899,ac=1021,oc=1022,an=1023,as=1026,os=1027,lc=1028,fo=1029,cc=1030,po=1031,mo=1033,ir=33776,sr=33777,rr=33778,ar=33779,Sa=35840,Ea=35841,ba=35842,Ta=35843,wa=36196,Aa=37492,Ra=37496,Ca=37808,Pa=37809,La=37810,Da=37811,Ia=37812,Ua=37813,Na=37814,Oa=37815,Fa=37816,Ba=37817,za=37818,ka=37819,Ha=37820,Ga=37821,Va=36492,Wa=36494,Xa=36495,qa=36283,Ya=36284,$a=36285,Ka=36286,Ch=3200,Ph=3201,hc=0,Lh=1,Un="",Ue="srgb",Bi="srgb-linear",cr="linear",ce="srgb",hi=7680,Bo=519,Dh=512,Ih=513,Uh=514,uc=515,Nh=516,Oh=517,Fh=518,Bh=519,Za=35044,zo="300 es",dn=2e3,hr=2001;class Hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],or=Math.PI/180,Ja=180/Math.PI;function bn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[s&255]+De[s>>8&255]+De[s>>16&255]+De[s>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Qt(s,t,e){return Math.max(t,Math.min(e,s))}function zh(s,t){return(s%t+t)%t}function Er(s,t,e){return(1-e)*s+e*t}function hn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function he(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ps{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-o;const f=l*d+c*p+h*g+u*_,E=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const R=Math.sqrt(M),A=Math.atan2(R,f*E);m=Math.sin(m*A)/R,o=Math.sin(o*A)/R}const y=o*E;if(l=l*m+d*y,c=c*m+p*y,h=h*m+g*y,u=u*m+_*y,m===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-o*p,t[e+2]=c*g+h*p+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),p=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ko.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ko.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return br.copy(this).projectOnVector(t),this.sub(br)}reflect(t){return this.sub(br.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const br=new D,ko=new ps;class Kt{constructor(t,e,n,i,r,a,o,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],E=i[1],M=i[4],y=i[7],R=i[2],A=i[5],C=i[8];return r[0]=a*_+o*E+l*R,r[3]=a*m+o*M+l*A,r[6]=a*f+o*y+l*C,r[1]=c*_+h*E+u*R,r[4]=c*m+h*M+u*A,r[7]=c*f+h*y+u*C,r[2]=d*_+p*E+g*R,r[5]=d*m+p*M+g*A,r[8]=d*f+p*y+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Tr.makeScale(t,e)),this}rotate(t){return this.premultiply(Tr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Tr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Tr=new Kt;function dc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ur(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function kh(){const s=ur("canvas");return s.style.display="block",s}const Ho={};function ls(s){s in Ho||(Ho[s]=!0,console.warn(s))}function Hh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Go=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vo=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gh(){const s={enabled:!0,workingColorSpace:Bi,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ce&&(i.r=Tn(i.r),i.g=Tn(i.g),i.b=Tn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ce&&(i.r=Ui(i.r),i.g=Ui(i.g),i.b=Ui(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Un?cr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ls("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ls("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Bi]:{primaries:t,whitePoint:n,transfer:cr,toXYZ:Go,fromXYZ:Vo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:Go,fromXYZ:Vo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),s}const se=Gh();function Tn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ui(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ui;class Vh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ui===void 0&&(ui=ur("canvas")),ui.width=t.width,ui.height=t.height;const i=ui.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ui}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ur("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Tn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Tn(e[n]/255)*255):e[n]=Tn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wh=0;class go{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=bn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(wr(i[a].image)):r.push(wr(i[a]))}else r=wr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function wr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xh=0;const Ar=new D;class ze extends Hi{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=Nn,i=Nn,r=un,a=ei,o=an,l=fn,c=ze.DEFAULT_ANISOTROPY,h=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=bn(),this.name="",this.source=new go(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ar).x}get height(){return this.source.getSize(Ar).y}get depth(){return this.source.getSize(Ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ya:t.x=t.x-Math.floor(t.x);break;case Nn:t.x=t.x<0?0:1;break;case Ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ya:t.y=t.y-Math.floor(t.y);break;case Nn:t.y=t.y<0?0:1;break;case Ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=ec;ze.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,i=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,y=(p+1)/2,R=(f+1)/2,A=(h+d)/4,C=(u+_)/4,I=(g+m)/4;return M>y&&M>R?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=C/n):y>R?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=A/i,r=I/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=C/r,i=I/r),this.set(n,i,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(d-h)/E,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qh extends Hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new ze(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new go(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends qh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class fc extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yh extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ms{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ms.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ms.copy(n.boundingBox)),Ms.applyMatrix4(t.matrixWorld),this.union(Ms)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Wi),Ss.subVectors(this.max,Wi),di.subVectors(t.a,Wi),fi.subVectors(t.b,Wi),pi.subVectors(t.c,Wi),An.subVectors(fi,di),Rn.subVectors(pi,fi),Vn.subVectors(di,pi);let e=[0,-An.z,An.y,0,-Rn.z,Rn.y,0,-Vn.z,Vn.y,An.z,0,-An.x,Rn.z,0,-Rn.x,Vn.z,0,-Vn.x,-An.y,An.x,0,-Rn.y,Rn.x,0,-Vn.y,Vn.x,0];return!Rr(e,di,fi,pi,Ss)||(e=[1,0,0,0,1,0,0,0,1],!Rr(e,di,fi,pi,Ss))?!1:(Es.crossVectors(An,Rn),e=[Es.x,Es.y,Es.z],Rr(e,di,fi,pi,Ss))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const _n=[new D,new D,new D,new D,new D,new D,new D,new D],nn=new D,Ms=new ms,di=new D,fi=new D,pi=new D,An=new D,Rn=new D,Vn=new D,Wi=new D,Ss=new D,Es=new D,Wn=new D;function Rr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Wn.fromArray(s,r);const o=i.x*Math.abs(Wn.x)+i.y*Math.abs(Wn.y)+i.z*Math.abs(Wn.z),l=t.dot(Wn),c=e.dot(Wn),h=n.dot(Wn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const $h=new ms,Xi=new D,Cr=new D;class gs{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):$h.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xi.subVectors(t,this.center);const e=Xi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Xi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Cr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xi.copy(t.center).add(Cr)),this.expandByPoint(Xi.copy(t.center).sub(Cr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const vn=new D,Pr=new D,bs=new D,Cn=new D,Lr=new D,Ts=new D,Dr=new D;class _o{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Pr.copy(t).add(e).multiplyScalar(.5),bs.copy(e).sub(t).normalize(),Cn.copy(this.origin).sub(Pr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(bs),o=Cn.dot(this.direction),l=-Cn.dot(bs),c=Cn.lengthSq(),h=Math.abs(1-a*a);let u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Pr).addScaledVector(bs,d),p}intersectSphere(t,e){vn.subVectors(t.center,this.origin);const n=vn.dot(this.direction),i=vn.dot(vn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,i,r){Lr.subVectors(e,t),Ts.subVectors(n,t),Dr.crossVectors(Lr,Ts);let a=this.direction.dot(Dr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Cn.subVectors(this.origin,t);const l=o*this.direction.dot(Ts.crossVectors(Cn,Ts));if(l<0)return null;const c=o*this.direction.dot(Lr.cross(Cn));if(c<0||l+c>a)return null;const h=-o*Cn.dot(Dr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,n,i,r,a,o,l,c,h,u,d,p,g,_,m){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,p,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,u,d,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/mi.setFromMatrixColumn(t,0).length(),r=1/mi.setFromMatrixColumn(t,1).length(),a=1/mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,p=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,p=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kh,t,Zh)}lookAt(t,e,n){const i=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Pn.crossVectors(n,We),Pn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Pn.crossVectors(n,We)),Pn.normalize(),ws.crossVectors(We,Pn),i[0]=Pn.x,i[4]=ws.x,i[8]=We.x,i[1]=Pn.y,i[5]=ws.y,i[9]=We.y,i[2]=Pn.z,i[6]=ws.z,i[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],E=n[3],M=n[7],y=n[11],R=n[15],A=i[0],C=i[4],I=i[8],b=i[12],S=i[1],P=i[5],N=i[9],k=i[13],$=i[2],W=i[6],Y=i[10],Q=i[14],H=i[3],rt=i[7],pt=i[11],vt=i[15];return r[0]=a*A+o*S+l*$+c*H,r[4]=a*C+o*P+l*W+c*rt,r[8]=a*I+o*N+l*Y+c*pt,r[12]=a*b+o*k+l*Q+c*vt,r[1]=h*A+u*S+d*$+p*H,r[5]=h*C+u*P+d*W+p*rt,r[9]=h*I+u*N+d*Y+p*pt,r[13]=h*b+u*k+d*Q+p*vt,r[2]=g*A+_*S+m*$+f*H,r[6]=g*C+_*P+m*W+f*rt,r[10]=g*I+_*N+m*Y+f*pt,r[14]=g*b+_*k+m*Q+f*vt,r[3]=E*A+M*S+y*$+R*H,r[7]=E*C+M*P+y*W+R*rt,r[11]=E*I+M*N+y*Y+R*pt,r[15]=E*b+M*k+y*Q+R*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*p-n*l*p)+_*(+e*l*p-e*c*d+r*a*d-i*a*p+i*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+f*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],E=u*m*c-_*d*c+_*l*p-o*m*p-u*l*f+o*d*f,M=g*d*c-h*m*c-g*l*p+a*m*p+h*l*f-a*d*f,y=h*_*c-g*u*c+g*o*p-a*_*p-h*o*f+a*u*f,R=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,A=e*E+n*M+i*y+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=E*C,t[1]=(_*d*r-u*m*r-_*i*p+n*m*p+u*i*f-n*d*f)*C,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*f+n*l*f)*C,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*p-n*l*p)*C,t[4]=M*C,t[5]=(h*m*r-g*d*r+g*i*p-e*m*p-h*i*f+e*d*f)*C,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*f-e*l*f)*C,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*p+e*l*p)*C,t[8]=y*C,t[9]=(g*u*r-h*_*r-g*n*p+e*_*p+h*n*f-e*u*f)*C,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*f+e*o*f)*C,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*p-e*o*p)*C,t[12]=R*C,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*m+e*u*m)*C,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*C,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,g=r*u,_=a*h,m=a*u,f=o*u,E=l*c,M=l*h,y=l*u,R=n.x,A=n.y,C=n.z;return i[0]=(1-(_+f))*R,i[1]=(p+y)*R,i[2]=(g-M)*R,i[3]=0,i[4]=(p-y)*A,i[5]=(1-(d+f))*A,i[6]=(m+E)*A,i[7]=0,i[8]=(g+M)*C,i[9]=(m-E)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=mi.set(i[0],i[1],i[2]).length();const a=mi.set(i[4],i[5],i[6]).length(),o=mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],sn.copy(this);const c=1/r,h=1/a,u=1/o;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,e.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=dn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),p=(n+i)/(n-i);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===dn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===hr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=dn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),p=-(n+i)/(n-i);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===dn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===hr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const mi=new D,sn=new me,Kh=new D(0,0,0),Zh=new D(1,1,1),Pn=new D,ws=new D,We=new D,Wo=new me,Xo=new ps;class pn{constructor(t=0,e=0,n=0,i=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Wo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xo.setFromEuler(this),this.setFromQuaternion(Xo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class pc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Jh=0;const qo=new D,gi=new ps,xn=new me,As=new D,qi=new D,jh=new D,Qh=new ps,Yo=new D(1,0,0),$o=new D(0,1,0),Ko=new D(0,0,1),Zo={type:"added"},tu={type:"removed"},_i={type:"childadded",child:null},Ir={type:"childremoved",child:null};class we extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new D,e=new pn,n=new ps,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new me},normalMatrix:{value:new Kt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gi.setFromAxisAngle(t,e),this.quaternion.multiply(gi),this}rotateOnWorldAxis(t,e){return gi.setFromAxisAngle(t,e),this.quaternion.premultiply(gi),this}rotateX(t){return this.rotateOnAxis(Yo,t)}rotateY(t){return this.rotateOnAxis($o,t)}rotateZ(t){return this.rotateOnAxis(Ko,t)}translateOnAxis(t,e){return qo.copy(t).applyQuaternion(this.quaternion),this.position.add(qo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yo,t)}translateY(t){return this.translateOnAxis($o,t)}translateZ(t){return this.translateOnAxis(Ko,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?As.copy(t):As.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(qi,As,this.up):xn.lookAt(As,qi,this.up),this.quaternion.setFromRotationMatrix(xn),i&&(xn.extractRotation(i.matrixWorld),gi.setFromRotationMatrix(xn),this.quaternion.premultiply(gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zo),_i.child=t,this.dispatchEvent(_i),_i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tu),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zo),_i.child=t,this.dispatchEvent(_i),_i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,t,jh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,Qh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}we.DEFAULT_UP=new D(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new D,yn=new D,Ur=new D,Mn=new D,vi=new D,xi=new D,Jo=new D,Nr=new D,Or=new D,Fr=new D,Br=new ue,zr=new ue,kr=new ue;class Ye{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),rn.subVectors(t,e),i.cross(rn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){rn.subVectors(i,e),yn.subVectors(n,e),Ur.subVectors(t,e);const a=rn.dot(rn),o=rn.dot(yn),l=rn.dot(Ur),c=yn.dot(yn),h=yn.dot(Ur),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mn.x),l.addScaledVector(a,Mn.y),l.addScaledVector(o,Mn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Br.setScalar(0),zr.setScalar(0),kr.setScalar(0),Br.fromBufferAttribute(t,e),zr.fromBufferAttribute(t,n),kr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Br,r.x),a.addScaledVector(zr,r.y),a.addScaledVector(kr,r.z),a}static isFrontFacing(t,e,n,i){return rn.subVectors(n,e),yn.subVectors(t,e),rn.cross(yn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),rn.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ye.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ye.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Ye.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Ye.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ye.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;vi.subVectors(i,n),xi.subVectors(r,n),Nr.subVectors(t,n);const l=vi.dot(Nr),c=xi.dot(Nr);if(l<=0&&c<=0)return e.copy(n);Or.subVectors(t,i);const h=vi.dot(Or),u=xi.dot(Or);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(vi,a);Fr.subVectors(t,r);const p=vi.dot(Fr),g=xi.dot(Fr);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(xi,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Jo.subVectors(r,i),o=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Jo,o);const f=1/(m+_+d);return a=_*f,o=d*f,e.copy(n).addScaledVector(vi,a).addScaledVector(xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function Hr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=zh(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Hr(a,r,t+1/3),this.g=Hr(a,r,t),this.b=Hr(a,r,t-1/3)}return se.colorSpaceToWorking(this,i),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){const n=mc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=Ui(t.r),this.g=Ui(t.g),this.b=Ui(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return se.workingToColorSpace(Ie.copy(this),t),Math.round(Qt(Ie.r*255,0,255))*65536+Math.round(Qt(Ie.g*255,0,255))*256+Math.round(Qt(Ie.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(Ie.copy(this),e);const n=Ie.r,i=Ie.g,r=Ie.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Ue){se.workingToColorSpace(Ie.copy(this),t);const e=Ie.r,n=Ie.g,i=Ie.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ln),this.setHSL(Ln.h+t,Ln.s+e,Ln.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ln),t.getHSL(Rs);const n=Er(Ln.h,Rs.h,e),i=Er(Ln.s,Rs.s,e),r=Er(Ln.l,Rs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new Vt;Vt.NAMES=mc;let eu=0;class kn extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=bn(),this.name="",this.type="Material",this.blending=ii,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=ha,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hi,this.stencilZFail=hi,this.stencilZPass=hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ii&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ca&&(n.blendSrc=this.blendSrc),this.blendDst!==ha&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ni&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class si extends kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new D,Cs=new ft;let nu=0;class Ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Za,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Cs.fromBufferAttribute(this,e),Cs.applyMatrix3(t),this.setXY(e,Cs.x,Cs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hn(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hn(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hn(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array),r=he(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Za&&(t.usage=this.usage),t}}class gc extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class _c extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pe extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let iu=0;const je=new me,Gr=new we,yi=new D,Xe=new ms,Yi=new ms,Pe=new D;class Ae extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dc(t)?_c:gc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Gr.lookAt(t),Gr.updateMatrix(),this.applyMatrix4(Gr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Yi.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(Xe.min,Yi.min),Xe.expandByPoint(Pe),Pe.addVectors(Xe.max,Yi.max),Xe.expandByPoint(Pe)):(Xe.expandByPoint(Yi.min),Xe.expandByPoint(Yi.max))}Xe.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Pe.fromBufferAttribute(o,c),l&&(yi.fromBufferAttribute(t,c),Pe.add(yi)),i=Math.max(i,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new D,l[I]=new D;const c=new D,h=new D,u=new D,d=new ft,p=new ft,g=new ft,_=new D,m=new D;function f(I,b,S){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(c),u.sub(c),p.sub(d),g.sub(d);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[I].add(_),o[b].add(_),o[S].add(_),l[I].add(m),l[b].add(m),l[S].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,b=E.length;I<b;++I){const S=E[I],P=S.start,N=S.count;for(let k=P,$=P+N;k<$;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const M=new D,y=new D,R=new D,A=new D;function C(I){R.fromBufferAttribute(i,I),A.copy(R);const b=o[I];M.copy(b),M.sub(R.multiplyScalar(R.dot(b))).normalize(),y.crossVectors(A,b);const P=y.dot(l[I])<0?-1:1;a.setXYZW(I,M.x,M.y,M.z,P)}for(let I=0,b=E.length;I<b;++I){const S=E[I],P=S.start,N=S.count;for(let k=P,$=P+N;k<$;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Ke(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jo=new me,Xn=new _o,Ps=new gs,Qo=new D,Ls=new D,Ds=new D,Is=new D,Vr=new D,Us=new D,tl=new D,Ns=new D;class Yt extends we{constructor(t=new Ae,e=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Us.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Vr.fromBufferAttribute(u,t),a?Us.addScaledVector(Vr,h):Us.addScaledVector(Vr.sub(e),h))}e.add(Us)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(r),Xn.copy(t.ray).recast(t.near),!(Ps.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(Ps,Qo)===null||Xn.origin.distanceToSquared(Qo)>(t.far-t.near)**2))&&(jo.copy(r).invert(),Xn.copy(t.ray).applyMatrix4(jo),!(n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Xn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],E=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,R=M;y<R;y+=3){const A=o.getX(y),C=o.getX(y+1),I=o.getX(y+2);i=Os(this,f,t,n,c,h,u,A,C,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const E=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);i=Os(this,a,t,n,c,h,u,E,M,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],E=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,R=M;y<R;y+=3){const A=y,C=y+1,I=y+2;i=Os(this,f,t,n,c,h,u,A,C,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const E=m,M=m+1,y=m+2;i=Os(this,a,t,n,c,h,u,E,M,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function su(s,t,e,n,i,r,a,o){let l;if(t.side===Be?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===zn,o),l===null)return null;Ns.copy(o),Ns.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ns);return c<e.near||c>e.far?null:{distance:c,point:Ns.clone(),object:s}}function Os(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Ls),s.getVertexPosition(l,Ds),s.getVertexPosition(c,Is);const h=su(s,t,e,n,Ls,Ds,Is,tl);if(h){const u=new D;Ye.getBarycoord(tl,Ls,Ds,Is,u),i&&(h.uv=Ye.getInterpolatedAttribute(i,o,l,c,u,new ft)),r&&(h.uv1=Ye.getInterpolatedAttribute(r,o,l,c,u,new ft)),a&&(h.normal=Ye.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};Ye.getNormal(Ls,Ds,Is,d.normal),h.face=d,h.barycoord=u}return h}class ee extends Ae{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(u,2));function g(_,m,f,E,M,y,R,A,C,I,b){const S=y/C,P=R/I,N=y/2,k=R/2,$=A/2,W=C+1,Y=I+1;let Q=0,H=0;const rt=new D;for(let pt=0;pt<Y;pt++){const vt=pt*P-k;for(let At=0;At<W;At++){const Ot=At*S-N;rt[_]=Ot*E,rt[m]=vt*M,rt[f]=$,c.push(rt.x,rt.y,rt.z),rt[_]=0,rt[m]=0,rt[f]=A>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(At/C),u.push(1-pt/I),Q+=1}}for(let pt=0;pt<I;pt++)for(let vt=0;vt<C;vt++){const At=d+vt+W*pt,Ot=d+vt+W*(pt+1),Jt=d+(vt+1)+W*(pt+1),zt=d+(vt+1)+W*pt;l.push(At,Ot,zt),l.push(Ot,Jt,zt),H+=6}o.addGroup(p,H,b),p+=H,d+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ee(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function zi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Fe(s){const t={};for(let e=0;e<s.length;e++){const n=zi(s[e]);for(const i in n)t[i]=n[i]}return t}function ru(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function vc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const au={clone:zi,merge:Fe};var ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ou,this.fragmentShader=lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zi(t.uniforms),this.uniformsGroups=ru(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class xc extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new D,el=new ft,nl=new ft;class qe extends xc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ja*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ja*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z)}getViewSize(t,e){return this.getViewBounds(t,el,nl),e.subVectors(nl,el)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(or*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Mi=-90,Si=1;class cu extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new qe(Mi,Si,t,e);i.layers=this.layers,this.add(i);const r=new qe(Mi,Si,t,e);r.layers=this.layers,this.add(r);const a=new qe(Mi,Si,t,e);a.layers=this.layers,this.add(a);const o=new qe(Mi,Si,t,e);o.layers=this.layers,this.add(o);const l=new qe(Mi,Si,t,e);l.layers=this.layers,this.add(l);const c=new qe(Mi,Si,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yc extends ze{constructor(t=[],e=Oi,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hu extends oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new yc(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ee(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:On});r.uniforms.tEquirect.value=e;const a=new Yt(i,r),o=e.minFilter;return e.minFilter===ei&&(e.minFilter=un),new cu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class Ee extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uu={type:"move"};class Wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(uu)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ee;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class vo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Vt(t),this.near=e,this.far=n}clone(){return new vo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class du extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class fu{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Za,this.updateRanges=[],this.version=0,this.uuid=bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Oe=new D;class dr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=hn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=hn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=hn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=hn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),i=he(i,this.array),r=he(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new dr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ja extends kn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ei;const $i=new D,bi=new D,Ti=new D,wi=new ft,Ki=new ft,Mc=new me,Fs=new D,Zi=new D,Bs=new D,il=new ft,Xr=new ft,sl=new ft;class rl extends we{constructor(t=new ja){if(super(),this.isSprite=!0,this.type="Sprite",Ei===void 0){Ei=new Ae;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new fu(e,5);Ei.setIndex([0,1,2,0,2,3]),Ei.setAttribute("position",new dr(n,3,0,!1)),Ei.setAttribute("uv",new dr(n,2,3,!1))}this.geometry=Ei,this.material=t,this.center=new ft(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bi.setFromMatrixScale(this.matrixWorld),Mc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ti.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bi.multiplyScalar(-Ti.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;zs(Fs.set(-.5,-.5,0),Ti,a,bi,i,r),zs(Zi.set(.5,-.5,0),Ti,a,bi,i,r),zs(Bs.set(.5,.5,0),Ti,a,bi,i,r),il.set(0,0),Xr.set(1,0),sl.set(1,1);let o=t.ray.intersectTriangle(Fs,Zi,Bs,!1,$i);if(o===null&&(zs(Zi.set(-.5,.5,0),Ti,a,bi,i,r),Xr.set(0,1),o=t.ray.intersectTriangle(Fs,Bs,Zi,!1,$i),o===null))return;const l=t.ray.origin.distanceTo($i);l<t.near||l>t.far||e.push({distance:l,point:$i.clone(),uv:Ye.getInterpolation($i,Fs,Zi,Bs,il,Xr,sl,new ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function zs(s,t,e,n,i,r){wi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Ki.x=r*wi.x-i*wi.y,Ki.y=i*wi.x+r*wi.y):Ki.copy(wi),s.copy(t),s.x+=Ki.x,s.y+=Ki.y,s.applyMatrix4(Mc)}const qr=new D,pu=new D,mu=new Kt;class Zn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=qr.subVectors(n,e).cross(pu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(qr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||mu.getNormalMatrix(t),i=this.coplanarPoint(qr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qn=new gs,gu=new ft(.5,.5),ks=new D;class xo{constructor(t=new Zn,e=new Zn,n=new Zn,i=new Zn,r=new Zn,a=new Zn){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=dn,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],E=r[12],M=r[13],y=r[14],R=r[15];if(i[0].setComponents(c-a,p-h,f-g,R-E).normalize(),i[1].setComponents(c+a,p+h,f+g,R+E).normalize(),i[2].setComponents(c+o,p+u,f+_,R+M).normalize(),i[3].setComponents(c-o,p-u,f-_,R-M).normalize(),n)i[4].setComponents(l,d,m,y).normalize(),i[5].setComponents(c-l,p-d,f-m,R-y).normalize();else if(i[4].setComponents(c-l,p-d,f-m,R-y).normalize(),e===dn)i[5].setComponents(c+l,p+d,f+m,R+y).normalize();else if(e===hr)i[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(t){qn.center.set(0,0,0);const e=gu.distanceTo(t.center);return qn.radius=.7071067811865476+e,qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ks.x=i.normal.x>0?t.max.x:t.min.x,ks.y=i.normal.y>0?t.max.y:t.min.y,ks.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yo extends kn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const fr=new D,pr=new D,al=new me,Ji=new _o,Hs=new gs,Yr=new D,ol=new D;class Sc extends we{constructor(t=new Ae,e=new yo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)fr.fromBufferAttribute(e,i-1),pr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=fr.distanceTo(pr);t.setAttribute("lineDistance",new pe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(i),Hs.radius+=r,t.ray.intersectsSphere(Hs)===!1)return;al.copy(i).invert(),Ji.copy(t.ray).applyMatrix4(al);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const f=h.getX(_),E=h.getX(_+1),M=Gs(this,t,Ji,l,f,E,_);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Gs(this,t,Ji,l,_,m,g-1);f&&e.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const f=Gs(this,t,Ji,l,_,_+1,_);f&&e.push(f)}if(this.isLineLoop){const _=Gs(this,t,Ji,l,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gs(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(fr.fromBufferAttribute(o,i),pr.fromBufferAttribute(o,r),e.distanceSqToSegment(fr,pr,Yr,ol)>n)return;Yr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Yr);if(!(c<t.near||c>t.far))return{distance:c,point:ol.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const ll=new D,cl=new D;class _u extends Sc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)ll.fromBufferAttribute(e,i),cl.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ll.distanceTo(cl);t.setAttribute("lineDistance",new pe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mo extends kn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const hl=new me,Qa=new _o,Vs=new gs,Ws=new D;class Ec extends we{constructor(t=new Ae,e=new Mo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(i),Vs.radius+=r,t.ray.intersectsSphere(Vs)===!1)return;hl.copy(i).invert(),Qa.copy(t.ray).applyMatrix4(hl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,_=p;g<_;g++){const m=c.getX(g);Ws.fromBufferAttribute(u,m),ul(Ws,m,l,i,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,_=p;g<_;g++)Ws.fromBufferAttribute(u,g),ul(Ws,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ul(s,t,e,n,i,r,a){const o=Qa.distanceSqToPoint(s);if(o<e){const l=new D;Qa.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class _r extends ze{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bc extends ze{constructor(t,e,n=ai,i,r,a,o=$e,l=$e,c,h=as,u=1){if(h!==as&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new go(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Tc extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class tn extends Ae{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;E(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new pe(u,3)),this.setAttribute("normal",new pe(d,3)),this.setAttribute("uv",new pe(p,2));function E(){const y=new D,R=new D;let A=0;const C=(e-t)/n;for(let I=0;I<=r;I++){const b=[],S=I/r,P=S*(e-t)+t;for(let N=0;N<=i;N++){const k=N/i,$=k*l+o,W=Math.sin($),Y=Math.cos($);R.x=P*W,R.y=-S*n+m,R.z=P*Y,u.push(R.x,R.y,R.z),y.set(W,C,Y).normalize(),d.push(y.x,y.y,y.z),p.push(k,1-S),b.push(g++)}_.push(b)}for(let I=0;I<i;I++)for(let b=0;b<r;b++){const S=_[b][I],P=_[b+1][I],N=_[b+1][I+1],k=_[b][I+1];(t>0||b!==0)&&(h.push(S,P,k),A+=3),(e>0||b!==r-1)&&(h.push(P,N,k),A+=3)}c.addGroup(f,A,0),f+=A}function M(y){const R=g,A=new ft,C=new D;let I=0;const b=y===!0?t:e,S=y===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,m*S,0),d.push(0,S,0),p.push(.5,.5),g++;const P=g;for(let N=0;N<=i;N++){const $=N/i*l+o,W=Math.cos($),Y=Math.sin($);C.x=b*Y,C.y=m*S,C.z=b*W,u.push(C.x,C.y,C.z),d.push(0,S,0),A.x=W*.5+.5,A.y=Y*.5*S+.5,p.push(A.x,A.y),g++}for(let N=0;N<i;N++){const k=R+N,$=P+N;y===!0?h.push($,$+1,k):h.push($+1,$,k),I+=3}c.addGroup(f,I,y===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ri extends tn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ri(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class So extends Ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const M=new D,y=new D,R=new D;for(let A=0;A<e.length;A+=3)p(e[A+0],M),p(e[A+1],y),p(e[A+2],R),l(M,y,R,E)}function l(E,M,y,R){const A=R+1,C=[];for(let I=0;I<=A;I++){C[I]=[];const b=E.clone().lerp(y,I/A),S=M.clone().lerp(y,I/A),P=A-I;for(let N=0;N<=P;N++)N===0&&I===A?C[I][N]=b:C[I][N]=b.clone().lerp(S,N/P)}for(let I=0;I<A;I++)for(let b=0;b<2*(A-I)-1;b++){const S=Math.floor(b/2);b%2===0?(d(C[I][S+1]),d(C[I+1][S]),d(C[I][S])):(d(C[I][S+1]),d(C[I+1][S+1]),d(C[I+1][S]))}}function c(E){const M=new D;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(E),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function h(){const E=new D;for(let M=0;M<r.length;M+=3){E.x=r[M+0],E.y=r[M+1],E.z=r[M+2];const y=m(E)/2/Math.PI+.5,R=f(E)/Math.PI+.5;a.push(y,1-R)}g(),u()}function u(){for(let E=0;E<a.length;E+=6){const M=a[E+0],y=a[E+2],R=a[E+4],A=Math.max(M,y,R),C=Math.min(M,y,R);A>.9&&C<.1&&(M<.2&&(a[E+0]+=1),y<.2&&(a[E+2]+=1),R<.2&&(a[E+4]+=1))}}function d(E){r.push(E.x,E.y,E.z)}function p(E,M){const y=E*3;M.x=t[y+0],M.y=t[y+1],M.z=t[y+2]}function g(){const E=new D,M=new D,y=new D,R=new D,A=new ft,C=new ft,I=new ft;for(let b=0,S=0;b<r.length;b+=9,S+=6){E.set(r[b+0],r[b+1],r[b+2]),M.set(r[b+3],r[b+4],r[b+5]),y.set(r[b+6],r[b+7],r[b+8]),A.set(a[S+0],a[S+1]),C.set(a[S+2],a[S+3]),I.set(a[S+4],a[S+5]),R.copy(E).add(M).add(y).divideScalar(3);const P=m(R);_(A,S+0,E,P),_(C,S+2,M,P),_(I,S+4,y,P)}}function _(E,M,y,R){R<0&&E.x===1&&(a[M]=E.x-1),y.x===0&&y.z===0&&(a[M]=R/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function f(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new So(t.vertices,t.indices,t.radius,t.details)}}class Eo extends So{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Eo(t.radius,t.detail)}}const Xs=new D,qs=new D,$r=new D,Ys=new Ye;class vu extends Ae{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const i=Math.pow(10,4),r=Math.cos(or*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:f}=Ys;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Ys.getNormal($r),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(f.x*i)},${Math.round(f.y*i)},${Math.round(f.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let E=0;E<3;E++){const M=(E+1)%3,y=u[E],R=u[M],A=Ys[h[E]],C=Ys[h[M]],I=`${y}_${R}`,b=`${R}_${y}`;b in d&&d[b]?($r.dot(d[b].normal)<=r&&(p.push(A.x,A.y,A.z),p.push(C.x,C.y,C.z)),d[b]=null):I in d||(d[I]={index0:c[E],index1:c[M],normal:$r.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];Xs.fromBufferAttribute(o,_),qs.fromBufferAttribute(o,m),p.push(Xs.x,Xs.y,Xs.z),p.push(qs.x,qs.y,qs.z)}this.setAttribute("position",new pe(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class mn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,p=(a-h)/d;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new ft:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new D,i=[],r=[],a=[],o=new D,l=new me;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Qt(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(Qt(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class bo extends mn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ft){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class xu extends bo{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function To(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const $s=new D,Kr=new To,Zr=new To,Jr=new To;class yu extends mn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:($s.subVectors(i[0],i[1]).add(i[0]),c=$s);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:($s.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=$s),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Kr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),Zr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),Jr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Kr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Zr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Jr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Kr.calc(l),Zr.calc(l),Jr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function dl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Mu(s,t){const e=1-s;return e*e*t}function Su(s,t){return 2*(1-s)*s*t}function Eu(s,t){return s*s*t}function ns(s,t,e,n){return Mu(s,t)+Su(s,e)+Eu(s,n)}function bu(s,t){const e=1-s;return e*e*e*t}function Tu(s,t){const e=1-s;return 3*e*e*s*t}function wu(s,t){return 3*(1-s)*s*s*t}function Au(s,t){return s*s*s*t}function is(s,t,e,n,i){return bu(s,t)+Tu(s,e)+wu(s,n)+Au(s,i)}class wc extends mn{constructor(t=new ft,e=new ft,n=new ft,i=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ft){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(is(t,i.x,r.x,a.x,o.x),is(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ru extends mn{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(is(t,i.x,r.x,a.x,o.x),is(t,i.y,r.y,a.y,o.y),is(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ac extends mn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cu extends mn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rc extends mn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ns(t,i.x,r.x,a.x),ns(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pu extends mn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ns(t,i.x,r.x,a.x),ns(t,i.y,r.y,a.y),ns(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cc extends mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(dl(o,l.x,c.x,h.x,u.x),dl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ft().fromArray(i))}return this}}var to=Object.freeze({__proto__:null,ArcCurve:xu,CatmullRomCurve3:yu,CubicBezierCurve:wc,CubicBezierCurve3:Ru,EllipseCurve:bo,LineCurve:Ac,LineCurve3:Cu,QuadraticBezierCurve:Rc,QuadraticBezierCurve3:Pu,SplineCurve:Cc});class Lu extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new to[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new to[i.type]().fromJSON(i))}return this}}class fl extends Lu{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ac(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Rc(this.currentPoint.clone(),new ft(t,e),new ft(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new wc(this.currentPoint.clone(),new ft(t,e),new ft(n,i),new ft(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Cc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new bo(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Pc extends fl{constructor(t){super(t),this.uuid=bn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new fl().fromJSON(i))}return this}}function Du(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Lc(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Fu(s,t,r,e)),s.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=e;d<i;d+=e){const p=s[d],g=s[d+1];p<o&&(o=p),g<l&&(l=g),p>h&&(h=p),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return cs(r,a,e,o,l,c,0),a}function Lc(s,t,e,n,i){let r;if(i===$u(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=pl(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=pl(a/n|0,s[a],s[a+1],r);return r&&ki(r,r.next)&&(us(r),r=r.next),r}function li(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ki(e,e.next)||Me(e.prev,e,e.next)===0)){if(us(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function cs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Gu(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?Uu(s,n,i,r):Iu(s)){t.push(l.i,s.i,c.i),us(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Nu(li(s),t),cs(s,t,e,n,i,r,2)):a===2&&Ou(s,t,e,n,i,r):cs(li(s),t,e,n,i,r,1);break}}}function Iu(s){const t=s.prev,e=s,n=s.next;if(Me(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),d=Math.max(i,r,a),p=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&ts(i,o,r,l,a,c,g.x,g.y)&&Me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Uu(s,t,e,n){const i=s.prev,r=s,a=s.next;if(Me(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,p=Math.min(o,l,c),g=Math.min(h,u,d),_=Math.max(o,l,c),m=Math.max(h,u,d),f=eo(p,g,t,e,n),E=eo(_,m,t,e,n);let M=s.prevZ,y=s.nextZ;for(;M&&M.z>=f&&y&&y.z<=E;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ts(o,h,l,u,c,d,M.x,M.y)&&Me(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&ts(o,h,l,u,c,d,y.x,y.y)&&Me(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=f;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ts(o,h,l,u,c,d,M.x,M.y)&&Me(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=E;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==a&&ts(o,h,l,u,c,d,y.x,y.y)&&Me(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Nu(s,t){let e=s;do{const n=e.prev,i=e.next.next;!ki(n,i)&&Ic(n,e,e.next,i)&&hs(n,i)&&hs(i,n)&&(t.push(n.i,e.i,i.i),us(e),us(e.next),e=s=i),e=e.next}while(e!==s);return li(e)}function Ou(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Xu(a,o)){let l=Uc(a,o);a=li(a,a.next),l=li(l,l.next),cs(a,t,e,n,i,r,0),cs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Fu(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Lc(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Wu(c))}i.sort(Bu);for(let r=0;r<i.length;r++)e=zu(i[r],e);return e}function Bu(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function zu(s,t){const e=ku(s,t);if(!e)return t;const n=Uc(e,s);return li(n,n.next),li(e,e.next)}function ku(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(ki(s,e))return e;do{if(ki(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Dc(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);hs(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Hu(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Hu(s,t){return Me(s.prev,s,t.prev)<0&&Me(t.next,s,s.next)<0}function Gu(s,t,e,n){let i=s;do i.z===0&&(i.z=eo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Vu(i)}function Vu(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function eo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Wu(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Dc(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function ts(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Dc(s,t,e,n,i,r,a,o)}function Xu(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!qu(s,t)&&(hs(s,t)&&hs(t,s)&&Yu(s,t)&&(Me(s.prev,s,t.prev)||Me(s,t.prev,t))||ki(s,t)&&Me(s.prev,s,s.next)>0&&Me(t.prev,t,t.next)>0)}function Me(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ki(s,t){return s.x===t.x&&s.y===t.y}function Ic(s,t,e,n){const i=Zs(Me(s,t,e)),r=Zs(Me(s,t,n)),a=Zs(Me(e,n,s)),o=Zs(Me(e,n,t));return!!(i!==r&&a!==o||i===0&&Ks(s,e,t)||r===0&&Ks(s,n,t)||a===0&&Ks(e,s,n)||o===0&&Ks(e,t,n))}function Ks(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Zs(s){return s>0?1:s<0?-1:0}function qu(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Ic(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function hs(s,t){return Me(s.prev,s,s.next)<0?Me(s,t,s.next)>=0&&Me(s,s.prev,t)>=0:Me(s,t,s.prev)<0||Me(s,s.next,t)<0}function Yu(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Uc(s,t){const e=no(s.i,s.x,s.y),n=no(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function pl(s,t,e,n){const i=no(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function us(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function no(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $u(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Ku{static triangulate(t,e,n=2){return Du(t,e,n)}}class Pi{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Pi.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];ml(t),gl(n,t);let a=t.length;e.forEach(ml);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,gl(n,e[l]);const o=Ku.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function ml(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function gl(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class wo extends Ae{constructor(t=new Pc([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new pe(i,3)),this.setAttribute("uv",new pe(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:Zu;let M,y=!1,R,A,C,I;f&&(M=f.getSpacedPoints(h),y=!0,d=!1,R=f.computeFrenetFrames(h,!1),A=new D,C=new D,I=new D),d||(m=0,p=0,g=0,_=0);const b=o.extractPoints(c);let S=b.shape;const P=b.holes;if(!Pi.isClockWise(S)){S=S.reverse();for(let it=0,j=P.length;it<j;it++){const J=P[it];Pi.isClockWise(J)&&(P[it]=J.reverse())}}function k(it){const J=10000000000000001e-36;let Z=it[0];for(let ut=1;ut<=it.length;ut++){const at=ut%it.length,mt=it[at],Xt=mt.x-Z.x,Wt=mt.y-Z.y,w=Xt*Xt+Wt*Wt,v=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(Z.x),Math.abs(Z.y)),B=J*v*v;if(w<=B){it.splice(at,1),ut--;continue}Z=mt}}k(S),P.forEach(k);const $=P.length,W=S;for(let it=0;it<$;it++){const j=P[it];S=S.concat(j)}function Y(it,j,J){return j||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(j,J)}const Q=S.length;function H(it,j,J){let Z,ut,at;const mt=it.x-j.x,Xt=it.y-j.y,Wt=J.x-it.x,w=J.y-it.y,v=mt*mt+Xt*Xt,B=mt*w-Xt*Wt;if(Math.abs(B)>Number.EPSILON){const X=Math.sqrt(v),st=Math.sqrt(Wt*Wt+w*w),K=j.x-Xt/X,Dt=j.y+mt/X,dt=J.x-w/st,Ct=J.y+Wt/st,Pt=((dt-K)*w-(Ct-Dt)*Wt)/(mt*w-Xt*Wt);Z=K+mt*Pt-it.x,ut=Dt+Xt*Pt-it.y;const ot=Z*Z+ut*ut;if(ot<=2)return new ft(Z,ut);at=Math.sqrt(ot/2)}else{let X=!1;mt>Number.EPSILON?Wt>Number.EPSILON&&(X=!0):mt<-Number.EPSILON?Wt<-Number.EPSILON&&(X=!0):Math.sign(Xt)===Math.sign(w)&&(X=!0),X?(Z=-Xt,ut=mt,at=Math.sqrt(v)):(Z=mt,ut=Xt,at=Math.sqrt(v/2))}return new ft(Z/at,ut/at)}const rt=[];for(let it=0,j=W.length,J=j-1,Z=it+1;it<j;it++,J++,Z++)J===j&&(J=0),Z===j&&(Z=0),rt[it]=H(W[it],W[J],W[Z]);const pt=[];let vt,At=rt.concat();for(let it=0,j=$;it<j;it++){const J=P[it];vt=[];for(let Z=0,ut=J.length,at=ut-1,mt=Z+1;Z<ut;Z++,at++,mt++)at===ut&&(at=0),mt===ut&&(mt=0),vt[Z]=H(J[Z],J[at],J[mt]);pt.push(vt),At=At.concat(vt)}let Ot;if(m===0)Ot=Pi.triangulateShape(W,P);else{const it=[],j=[];for(let J=0;J<m;J++){const Z=J/m,ut=p*Math.cos(Z*Math.PI/2),at=g*Math.sin(Z*Math.PI/2)+_;for(let mt=0,Xt=W.length;mt<Xt;mt++){const Wt=Y(W[mt],rt[mt],at);Rt(Wt.x,Wt.y,-ut),Z===0&&it.push(Wt)}for(let mt=0,Xt=$;mt<Xt;mt++){const Wt=P[mt];vt=pt[mt];const w=[];for(let v=0,B=Wt.length;v<B;v++){const X=Y(Wt[v],vt[v],at);Rt(X.x,X.y,-ut),Z===0&&w.push(X)}Z===0&&j.push(w)}}Ot=Pi.triangulateShape(it,j)}const Jt=Ot.length,zt=g+_;for(let it=0;it<Q;it++){const j=d?Y(S[it],At[it],zt):S[it];y?(C.copy(R.normals[0]).multiplyScalar(j.x),A.copy(R.binormals[0]).multiplyScalar(j.y),I.copy(M[0]).add(C).add(A),Rt(I.x,I.y,I.z)):Rt(j.x,j.y,0)}for(let it=1;it<=h;it++)for(let j=0;j<Q;j++){const J=d?Y(S[j],At[j],zt):S[j];y?(C.copy(R.normals[it]).multiplyScalar(J.x),A.copy(R.binormals[it]).multiplyScalar(J.y),I.copy(M[it]).add(C).add(A),Rt(I.x,I.y,I.z)):Rt(J.x,J.y,u/h*it)}for(let it=m-1;it>=0;it--){const j=it/m,J=p*Math.cos(j*Math.PI/2),Z=g*Math.sin(j*Math.PI/2)+_;for(let ut=0,at=W.length;ut<at;ut++){const mt=Y(W[ut],rt[ut],Z);Rt(mt.x,mt.y,u+J)}for(let ut=0,at=P.length;ut<at;ut++){const mt=P[ut];vt=pt[ut];for(let Xt=0,Wt=mt.length;Xt<Wt;Xt++){const w=Y(mt[Xt],vt[Xt],Z);y?Rt(w.x,w.y+M[h-1].y,M[h-1].x+J):Rt(w.x,w.y,u+J)}}}q(),tt();function q(){const it=i.length/3;if(d){let j=0,J=Q*j;for(let Z=0;Z<Jt;Z++){const ut=Ot[Z];bt(ut[2]+J,ut[1]+J,ut[0]+J)}j=h+m*2,J=Q*j;for(let Z=0;Z<Jt;Z++){const ut=Ot[Z];bt(ut[0]+J,ut[1]+J,ut[2]+J)}}else{for(let j=0;j<Jt;j++){const J=Ot[j];bt(J[2],J[1],J[0])}for(let j=0;j<Jt;j++){const J=Ot[j];bt(J[0]+Q*h,J[1]+Q*h,J[2]+Q*h)}}n.addGroup(it,i.length/3-it,0)}function tt(){const it=i.length/3;let j=0;St(W,j),j+=W.length;for(let J=0,Z=P.length;J<Z;J++){const ut=P[J];St(ut,j),j+=ut.length}n.addGroup(it,i.length/3-it,1)}function St(it,j){let J=it.length;for(;--J>=0;){const Z=J;let ut=J-1;ut<0&&(ut=it.length-1);for(let at=0,mt=h+m*2;at<mt;at++){const Xt=Q*at,Wt=Q*(at+1),w=j+Z+Xt,v=j+ut+Xt,B=j+ut+Wt,X=j+Z+Wt;jt(w,v,B,X)}}}function Rt(it,j,J){l.push(it),l.push(j),l.push(J)}function bt(it,j,J){oe(it),oe(j),oe(J);const Z=i.length/3,ut=E.generateTopUV(n,i,Z-3,Z-2,Z-1);L(ut[0]),L(ut[1]),L(ut[2])}function jt(it,j,J,Z){oe(it),oe(j),oe(Z),oe(j),oe(J),oe(Z);const ut=i.length/3,at=E.generateSideWallUV(n,i,ut-6,ut-3,ut-2,ut-1);L(at[0]),L(at[1]),L(at[3]),L(at[1]),L(at[2]),L(at[3])}function oe(it){i.push(l[it*3+0]),i.push(l[it*3+1]),i.push(l[it*3+2])}function L(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ju(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new to[i.type]().fromJSON(i)),new wo(n,t.options)}}const Zu={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new ft(r,a),new ft(o,l),new ft(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],p=t[i*3+1],g=t[i*3+2],_=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ft(a,1-l),new ft(c,1-u),new ft(d,1-g),new ft(_,1-f)]:[new ft(o,1-l),new ft(h,1-u),new ft(p,1-g),new ft(m,1-f)]}};function Ju(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class _s extends Ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const E=f*d-a;for(let M=0;M<c;M++){const y=M*u-r;g.push(y,-E,0),_.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){const M=E+c*f,y=E+c*(f+1),R=E+1+c*(f+1),A=E+1+c*f;p.push(M,y,A),p.push(y,R,A)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ao extends Ae{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,d=new D,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const E=[],M=f/n;let y=0;f===0&&a===0?y=.5/e:f===n&&l===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){const A=R/e;u.x=-t*Math.cos(i+A*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(i+A*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(A+y,1-M),E.push(c++)}h.push(E)}for(let f=0;f<n;f++)for(let E=0;E<e;E++){const M=h[f][E+1],y=h[f][E],R=h[f+1][E],A=h[f+1][E+1];(f!==0||a>0)&&p.push(M,y,A),(f!==n-1||l<Math.PI)&&p.push(y,R,A)}this.setIndex(p),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Le extends kn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hc,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ju extends kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ch,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qu extends kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class vr extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class td extends vr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const jr=new me,_l=new D,vl=new D;class Nc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xo,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;_l.setFromMatrixPosition(t.matrixWorld),e.position.copy(_l),vl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vl),e.updateMatrixWorld(),jr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const xl=new me,ji=new D,Qr=new D;class ed extends Nc{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new ue(2,1,1,1),new ue(0,1,1,1),new ue(3,1,1,1),new ue(1,1,1,1),new ue(3,0,1,1),new ue(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ji.setFromMatrixPosition(t.matrixWorld),n.position.copy(ji),Qr.copy(n.position),Qr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Qr),n.updateMatrixWorld(),i.makeTranslation(-ji.x,-ji.y,-ji.z),xl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl,n.coordinateSystem,n.reversedDepth)}}class mr extends vr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ed}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Oc extends xc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class nd extends Nc{constructor(){super(new Oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class id extends vr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new nd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sd extends vr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class rd extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function yl(s,t,e,n){const i=ad(n);switch(e){case ac:return s*t;case lc:return s*t/i.components*i.byteLength;case fo:return s*t/i.components*i.byteLength;case cc:return s*t*2/i.components*i.byteLength;case po:return s*t*2/i.components*i.byteLength;case oc:return s*t*3/i.components*i.byteLength;case an:return s*t*4/i.components*i.byteLength;case mo:return s*t*4/i.components*i.byteLength;case ir:case sr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case rr:case ar:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ea:case Ta:return Math.max(s,16)*Math.max(t,8)/4;case Sa:case ba:return Math.max(s,8)*Math.max(t,8)/2;case wa:case Aa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ra:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Pa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case La:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Da:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Na:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Fa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case za:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ka:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ha:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ga:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Va:case Wa:case Xa:return Math.ceil(s/4)*Math.ceil(t/4)*16;case qa:case Ya:return Math.ceil(s/4)*Math.ceil(t/4)*8;case $a:case Ka:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ad(s){switch(s){case fn:case nc:return{byteLength:1,components:1};case ss:case ic:case fs:return{byteLength:2,components:1};case ho:case uo:return{byteLength:2,components:4};case ai:case co:case En:return{byteLength:4,components:1};case sc:case rc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);function Fc(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function od(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var ld=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ud=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,md=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,_d=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Md=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ld=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Dd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Id=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ud=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Od=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bd="gl_FragColor = linearToOutputTexel( gl_FragColor );",zd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Xd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,tf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ef=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,af=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,of=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,df=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ff=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_f=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ef=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Tf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Af=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Df=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,If=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Uf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Of=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ff=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Yf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ep=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,np=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ip=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,op=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,up=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_p=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ep=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ap=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Pp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ip=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:ld,alphahash_pars_fragment:cd,alphamap_fragment:hd,alphamap_pars_fragment:ud,alphatest_fragment:dd,alphatest_pars_fragment:fd,aomap_fragment:pd,aomap_pars_fragment:md,batching_pars_vertex:gd,batching_vertex:_d,begin_vertex:vd,beginnormal_vertex:xd,bsdfs:yd,iridescence_fragment:Md,bumpmap_pars_fragment:Sd,clipping_planes_fragment:Ed,clipping_planes_pars_fragment:bd,clipping_planes_pars_vertex:Td,clipping_planes_vertex:wd,color_fragment:Ad,color_pars_fragment:Rd,color_pars_vertex:Cd,color_vertex:Pd,common:Ld,cube_uv_reflection_fragment:Dd,defaultnormal_vertex:Id,displacementmap_pars_vertex:Ud,displacementmap_vertex:Nd,emissivemap_fragment:Od,emissivemap_pars_fragment:Fd,colorspace_fragment:Bd,colorspace_pars_fragment:zd,envmap_fragment:kd,envmap_common_pars_fragment:Hd,envmap_pars_fragment:Gd,envmap_pars_vertex:Vd,envmap_physical_pars_fragment:tf,envmap_vertex:Wd,fog_vertex:Xd,fog_pars_vertex:qd,fog_fragment:Yd,fog_pars_fragment:$d,gradientmap_pars_fragment:Kd,lightmap_pars_fragment:Zd,lights_lambert_fragment:Jd,lights_lambert_pars_fragment:jd,lights_pars_begin:Qd,lights_toon_fragment:ef,lights_toon_pars_fragment:nf,lights_phong_fragment:sf,lights_phong_pars_fragment:rf,lights_physical_fragment:af,lights_physical_pars_fragment:of,lights_fragment_begin:lf,lights_fragment_maps:cf,lights_fragment_end:hf,logdepthbuf_fragment:uf,logdepthbuf_pars_fragment:df,logdepthbuf_pars_vertex:ff,logdepthbuf_vertex:pf,map_fragment:mf,map_pars_fragment:gf,map_particle_fragment:_f,map_particle_pars_fragment:vf,metalnessmap_fragment:xf,metalnessmap_pars_fragment:yf,morphinstance_vertex:Mf,morphcolor_vertex:Sf,morphnormal_vertex:Ef,morphtarget_pars_vertex:bf,morphtarget_vertex:Tf,normal_fragment_begin:wf,normal_fragment_maps:Af,normal_pars_fragment:Rf,normal_pars_vertex:Cf,normal_vertex:Pf,normalmap_pars_fragment:Lf,clearcoat_normal_fragment_begin:Df,clearcoat_normal_fragment_maps:If,clearcoat_pars_fragment:Uf,iridescence_pars_fragment:Nf,opaque_fragment:Of,packing:Ff,premultiplied_alpha_fragment:Bf,project_vertex:zf,dithering_fragment:kf,dithering_pars_fragment:Hf,roughnessmap_fragment:Gf,roughnessmap_pars_fragment:Vf,shadowmap_pars_fragment:Wf,shadowmap_pars_vertex:Xf,shadowmap_vertex:qf,shadowmask_pars_fragment:Yf,skinbase_vertex:$f,skinning_pars_vertex:Kf,skinning_vertex:Zf,skinnormal_vertex:Jf,specularmap_fragment:jf,specularmap_pars_fragment:Qf,tonemapping_fragment:tp,tonemapping_pars_fragment:ep,transmission_fragment:np,transmission_pars_fragment:ip,uv_pars_fragment:sp,uv_pars_vertex:rp,uv_vertex:ap,worldpos_vertex:op,background_vert:lp,background_frag:cp,backgroundCube_vert:hp,backgroundCube_frag:up,cube_vert:dp,cube_frag:fp,depth_vert:pp,depth_frag:mp,distanceRGBA_vert:gp,distanceRGBA_frag:_p,equirect_vert:vp,equirect_frag:xp,linedashed_vert:yp,linedashed_frag:Mp,meshbasic_vert:Sp,meshbasic_frag:Ep,meshlambert_vert:bp,meshlambert_frag:Tp,meshmatcap_vert:wp,meshmatcap_frag:Ap,meshnormal_vert:Rp,meshnormal_frag:Cp,meshphong_vert:Pp,meshphong_frag:Lp,meshphysical_vert:Dp,meshphysical_frag:Ip,meshtoon_vert:Up,meshtoon_frag:Np,points_vert:Op,points_frag:Fp,shadow_vert:Bp,shadow_frag:zp,sprite_vert:kp,sprite_frag:Hp},_t={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},cn={basic:{uniforms:Fe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Fe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Fe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Fe([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Fe([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Fe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Fe([_t.points,_t.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Fe([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Fe([_t.common,_t.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Fe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Fe([_t.sprite,_t.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Fe([_t.common,_t.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Fe([_t.lights,_t.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};cn.physical={uniforms:Fe([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Js={r:0,b:0,g:0},Yn=new pn,Gp=new me;function Vp(s,t,e,n,i,r,a){const o=new Vt(0);let l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?e:t).get(y)),y}function _(M){let y=!1;const R=g(M);R===null?f(o,l):R&&R.isColor&&(f(R,1),y=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,y){const R=g(y);R&&(R.isCubeTexture||R.mapping===gr)?(h===void 0&&(h=new Yt(new ee(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:zi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Yn.copy(y.backgroundRotation),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gp.makeRotationFromEuler(Yn)),h.material.toneMapped=se.getTransfer(R.colorSpace)!==ce,(u!==R||d!==R.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,p=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Yt(new _s(2,2),new wn({name:"BackgroundMaterial",uniforms:zi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=se.getTransfer(R.colorSpace)!==ce,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,p=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,y){M.getRGB(Js,vc(s)),n.buffers.color.setClear(Js.r,Js.g,Js.b,y,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(o,l)},render:_,addToRenderList:m,dispose:E}}function Wp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(S,P,N,k,$){let W=!1;const Y=u(k,N,P);r!==Y&&(r=Y,c(r.object)),W=p(S,k,N,$),W&&g(S,k,N,$),$!==null&&t.update($,s.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(S,P,N,k),$!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,P,N){const k=N.wireframe===!0;let $=n[S.id];$===void 0&&($={},n[S.id]=$);let W=$[P.id];W===void 0&&(W={},$[P.id]=W);let Y=W[k];return Y===void 0&&(Y=d(l()),W[k]=Y),Y}function d(S){const P=[],N=[],k=[];for(let $=0;$<e;$++)P[$]=0,N[$]=0,k[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:k,object:S,attributes:{},index:null}}function p(S,P,N,k){const $=r.attributes,W=P.attributes;let Y=0;const Q=N.getAttributes();for(const H in Q)if(Q[H].location>=0){const pt=$[H];let vt=W[H];if(vt===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(vt=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(vt=S.instanceColor)),pt===void 0||pt.attribute!==vt||vt&&pt.data!==vt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==k}function g(S,P,N,k){const $={},W=P.attributes;let Y=0;const Q=N.getAttributes();for(const H in Q)if(Q[H].location>=0){let pt=W[H];pt===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(pt=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(pt=S.instanceColor));const vt={};vt.attribute=pt,pt&&pt.data&&(vt.data=pt.data),$[H]=vt,Y++}r.attributes=$,r.attributesNum=Y,r.index=k}function _(){const S=r.newAttributes;for(let P=0,N=S.length;P<N;P++)S[P]=0}function m(S){f(S,0)}function f(S,P){const N=r.newAttributes,k=r.enabledAttributes,$=r.attributeDivisors;N[S]=1,k[S]===0&&(s.enableVertexAttribArray(S),k[S]=1),$[S]!==P&&(s.vertexAttribDivisor(S,P),$[S]=P)}function E(){const S=r.newAttributes,P=r.enabledAttributes;for(let N=0,k=P.length;N<k;N++)P[N]!==S[N]&&(s.disableVertexAttribArray(N),P[N]=0)}function M(S,P,N,k,$,W,Y){Y===!0?s.vertexAttribIPointer(S,P,N,$,W):s.vertexAttribPointer(S,P,N,k,$,W)}function y(S,P,N,k){_();const $=k.attributes,W=N.getAttributes(),Y=P.defaultAttributeValues;for(const Q in W){const H=W[Q];if(H.location>=0){let rt=$[Q];if(rt===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const pt=rt.normalized,vt=rt.itemSize,At=t.get(rt);if(At===void 0)continue;const Ot=At.buffer,Jt=At.type,zt=At.bytesPerElement,q=Jt===s.INT||Jt===s.UNSIGNED_INT||rt.gpuType===co;if(rt.isInterleavedBufferAttribute){const tt=rt.data,St=tt.stride,Rt=rt.offset;if(tt.isInstancedInterleavedBuffer){for(let bt=0;bt<H.locationSize;bt++)f(H.location+bt,tt.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let bt=0;bt<H.locationSize;bt++)m(H.location+bt);s.bindBuffer(s.ARRAY_BUFFER,Ot);for(let bt=0;bt<H.locationSize;bt++)M(H.location+bt,vt/H.locationSize,Jt,pt,St*zt,(Rt+vt/H.locationSize*bt)*zt,q)}else{if(rt.isInstancedBufferAttribute){for(let tt=0;tt<H.locationSize;tt++)f(H.location+tt,rt.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let tt=0;tt<H.locationSize;tt++)m(H.location+tt);s.bindBuffer(s.ARRAY_BUFFER,Ot);for(let tt=0;tt<H.locationSize;tt++)M(H.location+tt,vt/H.locationSize,Jt,pt,vt*zt,vt/H.locationSize*tt*zt,q)}}else if(Y!==void 0){const pt=Y[Q];if(pt!==void 0)switch(pt.length){case 2:s.vertexAttrib2fv(H.location,pt);break;case 3:s.vertexAttrib3fv(H.location,pt);break;case 4:s.vertexAttrib4fv(H.location,pt);break;default:s.vertexAttrib1fv(H.location,pt)}}}}E()}function R(){I();for(const S in n){const P=n[S];for(const N in P){const k=P[N];for(const $ in k)h(k[$].object),delete k[$];delete P[N]}delete n[S]}}function A(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const N in P){const k=P[N];for(const $ in k)h(k[$].object),delete k[$];delete P[N]}delete n[S.id]}function C(S){for(const P in n){const N=n[P];if(N[S.id]===void 0)continue;const k=N[S.id];for(const $ in k)h(k[$].object),delete k[$];delete N[S.id]}}function I(){b(),a=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function Xp(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function qp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==an&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const I=C===fs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==fn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!I)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:R,maxSamples:A}}function Yp(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Zn,o=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,M=E*4;let y=f.clippingState||null;l.value=y,y=h(g,d,M,p);for(let R=0;R!==M;++R)y[R]=e[R];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,E=d.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,y=p;M!==_;++M,y+=4)a.copy(u[M]).applyMatrix4(E,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function $p(s){let t=new WeakMap;function e(a,o){return o===va?a.mapping=Oi:o===xa&&(a.mapping=Fi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===va||o===xa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new hu(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Li=4,Ml=[.125,.215,.35,.446,.526,.582],ti=20,ta=new Oc,Sl=new Vt;let ea=null,na=0,ia=0,sa=!1;const Jn=(1+Math.sqrt(5))/2,Ai=1/Jn,El=[new D(-Jn,Ai,0),new D(Jn,Ai,0),new D(-Ai,0,Jn),new D(Ai,0,Jn),new D(0,Jn,-Ai),new D(0,Jn,Ai),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Kp=new D;class bl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=Kp}=r;ea=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ea,na,ia),this._renderer.xr.enabled=sa,t.scissorTest=!1,js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===Fi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ea=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:un,minFilter:un,generateMipmaps:!1,type:fs,format:an,colorSpace:Bi,depthBuffer:!1},i=Tl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zp(r)),this._blurMaterial=Jp(r,t,e)}return i}_compileMaterial(t){const e=new Yt(this._lodPlanes[0],t);this._renderer.compile(e,ta)}_sceneToCubeUV(t,e,n,i,r){const l=new qe(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Sl),u.toneMapping=Fn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const _=new si({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),m=new Yt(new ee,_);let f=!1;const E=t.background;E?E.isColor&&(_.color.copy(E),t.background=null,f=!0):(_.color.copy(Sl),f=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const R=this._cubeSize;js(i,y*R,M>2?R:0,R,R),u.setRenderTarget(i),f&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=E}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Oi||t.mapping===Fi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Al()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Yt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;js(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ta)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=El[(i-r-1)%El.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Yt(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ti-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ti;m>ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ti}`);const f=[];let E=0;for(let C=0;C<ti;++C){const I=C/_,b=Math.exp(-I*I/2);f.push(b),C===0?E+=b:C<m&&(E+=2*b)}for(let C=0;C<f.length;C++)f[C]=f[C]/E;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const y=this._sizeLods[i],R=3*y*(i>M-Li?i-M+Li:0),A=4*(this._cubeSize-y);js(e,R,A,3*y,2*y),l.setRenderTarget(e),l.render(u,ta)}}function Zp(s){const t=[],e=[],n=[];let i=s;const r=s-Li+1+Ml.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Li?l=Ml[a-s+Li-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,E=new Float32Array(_*g*p),M=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const C=A%3*2/3-1,I=A>2?0:-1,b=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];E.set(b,_*g*A),M.set(d,m*g*A);const S=[A,A,A,A,A,A];y.set(S,f*g*A)}const R=new Ae;R.setAttribute("position",new Ke(E,_)),R.setAttribute("uv",new Ke(M,m)),R.setAttribute("faceIndex",new Ke(y,f)),t.push(R),i>Li&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Tl(s,t,e){const n=new oi(s,t,e);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function js(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Jp(s,t,e){const n=new Float32Array(ti),i=new D(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function wl(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Al(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Ro(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jp(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===va||l===xa,h=l===Oi||l===Fi;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new bl(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new bl(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Qp(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ls("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function tm(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)t.update(d[p],s.ARRAY_BUFFER)}function c(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let M=0,y=E.length;M<y;M+=3){const R=E[M+0],A=E[M+1],C=E[M+2];d.push(R,A,A,C,C,R)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,y=E.length/3-1;M<y;M+=3){const R=M+0,A=M+1,C=M+2;d.push(R,A,A,C,C,R)}}else return;const m=new(dc(d)?_c:gc)(d,1);m.version=_;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function em(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){s.drawElements(n,p,r,d*a),e.update(p,n,1)}function c(d,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,d*a,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=p[E]*_[E];e.update(f,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function nm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function im(s,t,e){const n=new WeakMap,i=new ue;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let S=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var p=S;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let R=o.attributes.position.count*y,A=1;R>t.maxTextureSize&&(A=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const C=new Float32Array(R*A*4*u),I=new fc(C,R,A,u);I.type=En,I.needsUpdate=!0;const b=y*4;for(let P=0;P<u;P++){const N=f[P],k=E[P],$=M[P],W=R*A*4*P;for(let Y=0;Y<N.count;Y++){const Q=Y*b;g===!0&&(i.fromBufferAttribute(N,Y),C[W+Q+0]=i.x,C[W+Q+1]=i.y,C[W+Q+2]=i.z,C[W+Q+3]=0),_===!0&&(i.fromBufferAttribute(k,Y),C[W+Q+4]=i.x,C[W+Q+5]=i.y,C[W+Q+6]=i.z,C[W+Q+7]=0),m===!0&&(i.fromBufferAttribute($,Y),C[W+Q+8]=i.x,C[W+Q+9]=i.y,C[W+Q+10]=i.z,C[W+Q+11]=$.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new ft(R,A)},n.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function sm(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const Bc=new ze,Rl=new bc(1,1),zc=new fc,kc=new Yh,Hc=new yc,Cl=[],Pl=[],Ll=new Float32Array(16),Dl=new Float32Array(9),Il=new Float32Array(4);function Gi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Cl[i];if(r===void 0&&(r=new Float32Array(i),Cl[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Re(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ce(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function xr(s,t){let e=Pl[t];e===void 0&&(e=new Int32Array(t),Pl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function rm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function am(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2fv(this.addr,t),Ce(e,t)}}function om(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;s.uniform3fv(this.addr,t),Ce(e,t)}}function lm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4fv(this.addr,t),Ce(e,t)}}function cm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Il.set(n),s.uniformMatrix2fv(this.addr,!1,Il),Ce(e,n)}}function hm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Dl.set(n),s.uniformMatrix3fv(this.addr,!1,Dl),Ce(e,n)}}function um(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Ll.set(n),s.uniformMatrix4fv(this.addr,!1,Ll),Ce(e,n)}}function dm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2iv(this.addr,t),Ce(e,t)}}function pm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;s.uniform3iv(this.addr,t),Ce(e,t)}}function mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4iv(this.addr,t),Ce(e,t)}}function gm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function _m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2uiv(this.addr,t),Ce(e,t)}}function vm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;s.uniform3uiv(this.addr,t),Ce(e,t)}}function xm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4uiv(this.addr,t),Ce(e,t)}}function ym(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Rl.compareFunction=uc,r=Rl):r=Bc,e.setTexture2D(t||r,i)}function Mm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||kc,i)}function Sm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Hc,i)}function Em(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||zc,i)}function bm(s){switch(s){case 5126:return rm;case 35664:return am;case 35665:return om;case 35666:return lm;case 35674:return cm;case 35675:return hm;case 35676:return um;case 5124:case 35670:return dm;case 35667:case 35671:return fm;case 35668:case 35672:return pm;case 35669:case 35673:return mm;case 5125:return gm;case 36294:return _m;case 36295:return vm;case 36296:return xm;case 35678:case 36198:case 36298:case 36306:case 35682:return ym;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return Em}}function Tm(s,t){s.uniform1fv(this.addr,t)}function wm(s,t){const e=Gi(t,this.size,2);s.uniform2fv(this.addr,e)}function Am(s,t){const e=Gi(t,this.size,3);s.uniform3fv(this.addr,e)}function Rm(s,t){const e=Gi(t,this.size,4);s.uniform4fv(this.addr,e)}function Cm(s,t){const e=Gi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Pm(s,t){const e=Gi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Lm(s,t){const e=Gi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Dm(s,t){s.uniform1iv(this.addr,t)}function Im(s,t){s.uniform2iv(this.addr,t)}function Um(s,t){s.uniform3iv(this.addr,t)}function Nm(s,t){s.uniform4iv(this.addr,t)}function Om(s,t){s.uniform1uiv(this.addr,t)}function Fm(s,t){s.uniform2uiv(this.addr,t)}function Bm(s,t){s.uniform3uiv(this.addr,t)}function zm(s,t){s.uniform4uiv(this.addr,t)}function km(s,t,e){const n=this.cache,i=t.length,r=xr(e,i);Re(n,r)||(s.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Bc,r[a])}function Hm(s,t,e){const n=this.cache,i=t.length,r=xr(e,i);Re(n,r)||(s.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||kc,r[a])}function Gm(s,t,e){const n=this.cache,i=t.length,r=xr(e,i);Re(n,r)||(s.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Hc,r[a])}function Vm(s,t,e){const n=this.cache,i=t.length,r=xr(e,i);Re(n,r)||(s.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||zc,r[a])}function Wm(s){switch(s){case 5126:return Tm;case 35664:return wm;case 35665:return Am;case 35666:return Rm;case 35674:return Cm;case 35675:return Pm;case 35676:return Lm;case 5124:case 35670:return Dm;case 35667:case 35671:return Im;case 35668:case 35672:return Um;case 35669:case 35673:return Nm;case 5125:return Om;case 36294:return Fm;case 36295:return Bm;case 36296:return zm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return Vm}}class Xm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=bm(e.type)}}class qm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wm(e.type)}}class Ym{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function Ul(s,t){s.seq.push(t),s.map[t.id]=t}function $m(s,t,e){const n=s.name,i=n.length;for(ra.lastIndex=0;;){const r=ra.exec(n),a=ra.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ul(e,c===void 0?new Xm(o,s,t):new qm(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Ym(o),Ul(e,u)),e=u}}}class lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);$m(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Nl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Km=37297;let Zm=0;function Jm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ol=new Kt;function jm(s){se._getMatrix(Ol,se.workingColorSpace,s);const t=`mat3( ${Ol.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(s)){case cr:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Fl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Jm(s.getShaderSource(t),o)}else return r}function Qm(s,t){const e=jm(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function t0(s,t){let e;switch(t){case Sh:e="Linear";break;case Eh:e="Reinhard";break;case bh:e="Cineon";break;case tc:e="ACESFilmic";break;case wh:e="AgX";break;case Ah:e="Neutral";break;case Th:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Qs=new D;function e0(){se.getLuminanceCoefficients(Qs);const s=Qs.x.toFixed(4),t=Qs.y.toFixed(4),e=Qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(es).join(`
`)}function i0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function s0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function es(s){return s!==""}function Bl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function io(s){return s.replace(r0,o0)}const a0=new Map;function o0(s,t){let e=Zt[t];if(e===void 0){const n=a0.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return io(e)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kl(s){return s.replace(l0,c0)}function c0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Hl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function h0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ql?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===eh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Sn&&(t="SHADOWMAP_TYPE_VSM"),t}function u0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Oi:case Fi:t="ENVMAP_TYPE_CUBE";break;case gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function d0(s){let t="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Fi&&(t="ENVMAP_MODE_REFRACTION"),t}function f0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case lo:t="ENVMAP_BLENDING_MULTIPLY";break;case yh:t="ENVMAP_BLENDING_MIX";break;case Mh:t="ENVMAP_BLENDING_ADD";break}return t}function p0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function m0(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=h0(e),c=u0(e),h=d0(e),u=f0(e),d=p0(e),p=n0(e),g=i0(r),_=i.createProgram();let m,f,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(es).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(es).join(`
`),f.length>0&&(f+=`
`)):(m=[Hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(es).join(`
`),f=[Hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fn?"#define TONE_MAPPING":"",e.toneMapping!==Fn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Fn?t0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Qm("linearToOutputTexel",e.outputColorSpace),e0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(es).join(`
`)),a=io(a),a=Bl(a,e),a=zl(a,e),o=io(o),o=Bl(o,e),o=zl(o,e),a=kl(a),o=kl(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=E+m+a,y=E+f+o,R=Nl(i,i.VERTEX_SHADER,M),A=Nl(i,i.FRAGMENT_SHADER,y);i.attachShader(_,R),i.attachShader(_,A),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(P){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(_)||"",k=i.getShaderInfoLog(R)||"",$=i.getShaderInfoLog(A)||"",W=N.trim(),Y=k.trim(),Q=$.trim();let H=!0,rt=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,R,A);else{const pt=Fl(i,R,"vertex"),vt=Fl(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+W+`
`+pt+`
`+vt)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(Y===""||Q==="")&&(rt=!1);rt&&(P.diagnostics={runnable:H,programLog:W,vertexShader:{log:Y,prefix:m},fragmentShader:{log:Q,prefix:f}})}i.deleteShader(R),i.deleteShader(A),I=new lr(i,_),b=s0(i,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,Km)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let g0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new v0(t),e.set(t,n)),n}}class v0{constructor(t){this.id=g0++,this.code=t,this.usedTimes=0}}function x0(s,t,e,n,i,r,a){const o=new pc,l=new _0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,S,P,N,k){const $=N.fog,W=k.geometry,Y=b.isMeshStandardMaterial?N.environment:null,Q=(b.isMeshStandardMaterial?e:t).get(b.envMap||Y),H=Q&&Q.mapping===gr?Q.image.height:null,rt=g[b.type];b.precision!==null&&(p=i.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,vt=pt!==void 0?pt.length:0;let At=0;W.morphAttributes.position!==void 0&&(At=1),W.morphAttributes.normal!==void 0&&(At=2),W.morphAttributes.color!==void 0&&(At=3);let Ot,Jt,zt,q;if(rt){const re=cn[rt];Ot=re.vertexShader,Jt=re.fragmentShader}else Ot=b.vertexShader,Jt=b.fragmentShader,l.update(b),zt=l.getVertexShaderID(b),q=l.getFragmentShaderID(b);const tt=s.getRenderTarget(),St=s.state.buffers.depth.getReversed(),Rt=k.isInstancedMesh===!0,bt=k.isBatchedMesh===!0,jt=!!b.map,oe=!!b.matcap,L=!!Q,it=!!b.aoMap,j=!!b.lightMap,J=!!b.bumpMap,Z=!!b.normalMap,ut=!!b.displacementMap,at=!!b.emissiveMap,mt=!!b.metalnessMap,Xt=!!b.roughnessMap,Wt=b.anisotropy>0,w=b.clearcoat>0,v=b.dispersion>0,B=b.iridescence>0,X=b.sheen>0,st=b.transmission>0,K=Wt&&!!b.anisotropyMap,Dt=w&&!!b.clearcoatMap,dt=w&&!!b.clearcoatNormalMap,Ct=w&&!!b.clearcoatRoughnessMap,Pt=B&&!!b.iridescenceMap,ot=B&&!!b.iridescenceThicknessMap,Mt=X&&!!b.sheenColorMap,Ht=X&&!!b.sheenRoughnessMap,It=!!b.specularMap,xt=!!b.specularColorMap,$t=!!b.specularIntensityMap,U=st&&!!b.transmissionMap,ht=st&&!!b.thicknessMap,gt=!!b.gradientMap,Tt=!!b.alphaMap,lt=b.alphaTest>0,nt=!!b.alphaHash,Lt=!!b.extensions;let qt=Fn;b.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(qt=s.toneMapping);const fe={shaderID:rt,shaderType:b.type,shaderName:b.name,vertexShader:Ot,fragmentShader:Jt,defines:b.defines,customVertexShaderID:zt,customFragmentShaderID:q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:bt,batchingColor:bt&&k._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&k.instanceColor!==null,instancingMorph:Rt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Bi,alphaToCoverage:!!b.alphaToCoverage,map:jt,matcap:oe,envMap:L,envMapMode:L&&Q.mapping,envMapCubeUVHeight:H,aoMap:it,lightMap:j,bumpMap:J,normalMap:Z,displacementMap:d&&ut,emissiveMap:at,normalMapObjectSpace:Z&&b.normalMapType===Lh,normalMapTangentSpace:Z&&b.normalMapType===hc,metalnessMap:mt,roughnessMap:Xt,anisotropy:Wt,anisotropyMap:K,clearcoat:w,clearcoatMap:Dt,clearcoatNormalMap:dt,clearcoatRoughnessMap:Ct,dispersion:v,iridescence:B,iridescenceMap:Pt,iridescenceThicknessMap:ot,sheen:X,sheenColorMap:Mt,sheenRoughnessMap:Ht,specularMap:It,specularColorMap:xt,specularIntensityMap:$t,transmission:st,transmissionMap:U,thicknessMap:ht,gradientMap:gt,opaque:b.transparent===!1&&b.blending===ii&&b.alphaToCoverage===!1,alphaMap:Tt,alphaTest:lt,alphaHash:nt,combine:b.combine,mapUv:jt&&_(b.map.channel),aoMapUv:it&&_(b.aoMap.channel),lightMapUv:j&&_(b.lightMap.channel),bumpMapUv:J&&_(b.bumpMap.channel),normalMapUv:Z&&_(b.normalMap.channel),displacementMapUv:ut&&_(b.displacementMap.channel),emissiveMapUv:at&&_(b.emissiveMap.channel),metalnessMapUv:mt&&_(b.metalnessMap.channel),roughnessMapUv:Xt&&_(b.roughnessMap.channel),anisotropyMapUv:K&&_(b.anisotropyMap.channel),clearcoatMapUv:Dt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:dt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&_(b.sheenRoughnessMap.channel),specularMapUv:It&&_(b.specularMap.channel),specularColorMapUv:xt&&_(b.specularColorMap.channel),specularIntensityMapUv:$t&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ht&&_(b.thicknessMap.channel),alphaMapUv:Tt&&_(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Z||Wt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(jt||Tt),fog:!!$,useFog:b.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:St,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:At,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:qt,decodeVideoTexture:jt&&b.map.isVideoTexture===!0&&se.getTransfer(b.map.colorSpace)===ce,decodeVideoTextureEmissive:at&&b.emissiveMap.isVideoTexture===!0&&se.getTransfer(b.emissiveMap.colorSpace)===ce,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===en,flipSided:b.side===Be,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Lt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&b.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return fe.vertexUv1s=c.has(1),fe.vertexUv2s=c.has(2),fe.vertexUv3s=c.has(3),c.clear(),fe}function f(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)S.push(P),S.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(E(S,b),M(S,b),S.push(s.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function E(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function M(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function y(b){const S=g[b.type];let P;if(S){const N=cn[S];P=au.clone(N.uniforms)}else P=b.uniforms;return P}function R(b,S){let P;for(let N=0,k=h.length;N<k;N++){const $=h[N];if($.cacheKey===S){P=$,++P.usedTimes;break}}return P===void 0&&(P=new m0(s,S,b,r),h.push(P)),P}function A(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:I}}function y0(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function M0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Gl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Vl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,p,g,_,m){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function o(u,d,p,g,_,m){const f=a(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(u,d,p,g,_,m){const f=a(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||M0),n.length>1&&n.sort(d||Gl),i.length>1&&i.sort(d||Gl)}function h(){for(let u=t,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function S0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Vl,s.set(n,[a])):i>=r.length?(a=new Vl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function E0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Vt};break;case"SpotLight":e={position:new D,direction:new D,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function b0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let T0=0;function w0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function A0(s){const t=new E0,e=b0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const i=new D,r=new me,a=new me;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,E=0,M=0,y=0,R=0,A=0,C=0;c.sort(w0);for(let b=0,S=c.length;b<S;b++){const P=c[b],N=P.color,k=P.intensity,$=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=N.r*k,u+=N.g*k,d+=N.b*k;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(P.sh.coefficients[Y],k);C++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,H=e.get(P);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,n.directionalShadow[p]=H,n.directionalShadowMap[p]=W,n.directionalShadowMatrix[p]=P.shadow.matrix,E++}n.directional[p]=Y,p++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(N).multiplyScalar(k),Y.distance=$,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,n.spot[_]=Y;const Q=P.shadow;if(P.map&&(n.spotLightMap[R]=P.map,R++,Q.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=Q.matrix,P.castShadow){const H=e.get(P);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=W,y++}_++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(N).multiplyScalar(k),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=Y,m++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const Q=P.shadow,H=e.get(P);H.shadowIntensity=Q.intensity,H.shadowBias=Q.bias,H.shadowNormalBias=Q.normalBias,H.shadowRadius=Q.radius,H.shadowMapSize=Q.mapSize,H.shadowCameraNear=Q.camera.near,H.shadowCameraFar=Q.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(k),Y.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[f]=Y,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==E||I.numPointShadows!==M||I.numSpotShadows!==y||I.numSpotMaps!==R||I.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=E,I.numPointShadows=M,I.numSpotShadows=y,I.numSpotMaps=R,I.numLightProbes=C,n.version=T0++)}function l(c,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,E=c.length;f<E;f++){const M=c[f];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),u++}else if(M.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Wl(s){const t=new A0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function R0(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Wl(s),t.set(i,[o])):r>=a.length?(o=new Wl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const C0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function L0(s,t,e){let n=new xo;const i=new ft,r=new ft,a=new ue,o=new ju({depthPacking:Ph}),l=new Qu,c={},h=e.maxTextureSize,u={[zn]:Be,[Be]:zn,[en]:en},d=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:C0,fragmentShader:P0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ae;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Yt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ql;let f=this.type;this.render=function(A,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const b=s.getRenderTarget(),S=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),N=s.state;N.setBlending(On),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const k=f!==Sn&&this.type===Sn,$=f===Sn&&this.type!==Sn;for(let W=0,Y=A.length;W<Y;W++){const Q=A[W],H=Q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const rt=H.getFrameExtents();if(i.multiply(rt),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/rt.x),i.x=r.x*rt.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/rt.y),i.y=r.y*rt.y,H.mapSize.y=r.y)),H.map===null||k===!0||$===!0){const vt=this.type!==Sn?{minFilter:$e,magFilter:$e}:{};H.map!==null&&H.map.dispose(),H.map=new oi(i.x,i.y,vt),H.map.texture.name=Q.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const pt=H.getViewportCount();for(let vt=0;vt<pt;vt++){const At=H.getViewport(vt);a.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),N.viewport(a),H.updateMatrices(Q,vt),n=H.getFrustum(),y(C,I,H.camera,Q,this.type)}H.isPointLightShadow!==!0&&this.type===Sn&&E(H,I),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(b,S,P)};function E(A,C){const I=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new oi(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,I,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,I,p,_,null)}function M(A,C,I,b){let S=null;const P=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)S=P;else if(S=I.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=S.uuid,k=C.uuid;let $=c[N];$===void 0&&($={},c[N]=$);let W=$[k];W===void 0&&(W=S.clone(),$[k]=W,C.addEventListener("dispose",R)),S=W}if(S.visible=C.visible,S.wireframe=C.wireframe,b===Sn?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const N=s.properties.get(S);N.light=I}return S}function y(A,C,I,b,S){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===Sn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const k=t.update(A),$=A.material;if(Array.isArray($)){const W=k.groups;for(let Y=0,Q=W.length;Y<Q;Y++){const H=W[Y],rt=$[H.materialIndex];if(rt&&rt.visible){const pt=M(A,rt,b,S);A.onBeforeShadow(s,A,C,I,k,pt,H),s.renderBufferDirect(I,null,k,pt,A,H),A.onAfterShadow(s,A,C,I,k,pt,H)}}}else if($.visible){const W=M(A,$,b,S);A.onBeforeShadow(s,A,C,I,k,W,null),s.renderBufferDirect(I,null,k,W,A,null),A.onAfterShadow(s,A,C,I,k,W,null)}}const N=A.children;for(let k=0,$=N.length;k<$;k++)y(N[k],C,I,b,S)}function R(A){A.target.removeEventListener("dispose",R);for(const I in c){const b=c[I],S=A.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const D0={[ua]:da,[fa]:ga,[pa]:_a,[Ni]:ma,[da]:ua,[ga]:fa,[_a]:pa,[ma]:Ni};function I0(s,t){function e(){let U=!1;const ht=new ue;let gt=null;const Tt=new ue(0,0,0,0);return{setMask:function(lt){gt!==lt&&!U&&(s.colorMask(lt,lt,lt,lt),gt=lt)},setLocked:function(lt){U=lt},setClear:function(lt,nt,Lt,qt,fe){fe===!0&&(lt*=qt,nt*=qt,Lt*=qt),ht.set(lt,nt,Lt,qt),Tt.equals(ht)===!1&&(s.clearColor(lt,nt,Lt,qt),Tt.copy(ht))},reset:function(){U=!1,gt=null,Tt.set(-1,0,0,0)}}}function n(){let U=!1,ht=!1,gt=null,Tt=null,lt=null;return{setReversed:function(nt){if(ht!==nt){const Lt=t.get("EXT_clip_control");nt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),ht=nt;const qt=lt;lt=null,this.setClear(qt)}},getReversed:function(){return ht},setTest:function(nt){nt?tt(s.DEPTH_TEST):St(s.DEPTH_TEST)},setMask:function(nt){gt!==nt&&!U&&(s.depthMask(nt),gt=nt)},setFunc:function(nt){if(ht&&(nt=D0[nt]),Tt!==nt){switch(nt){case ua:s.depthFunc(s.NEVER);break;case da:s.depthFunc(s.ALWAYS);break;case fa:s.depthFunc(s.LESS);break;case Ni:s.depthFunc(s.LEQUAL);break;case pa:s.depthFunc(s.EQUAL);break;case ma:s.depthFunc(s.GEQUAL);break;case ga:s.depthFunc(s.GREATER);break;case _a:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Tt=nt}},setLocked:function(nt){U=nt},setClear:function(nt){lt!==nt&&(ht&&(nt=1-nt),s.clearDepth(nt),lt=nt)},reset:function(){U=!1,gt=null,Tt=null,lt=null,ht=!1}}}function i(){let U=!1,ht=null,gt=null,Tt=null,lt=null,nt=null,Lt=null,qt=null,fe=null;return{setTest:function(re){U||(re?tt(s.STENCIL_TEST):St(s.STENCIL_TEST))},setMask:function(re){ht!==re&&!U&&(s.stencilMask(re),ht=re)},setFunc:function(re,gn,on){(gt!==re||Tt!==gn||lt!==on)&&(s.stencilFunc(re,gn,on),gt=re,Tt=gn,lt=on)},setOp:function(re,gn,on){(nt!==re||Lt!==gn||qt!==on)&&(s.stencilOp(re,gn,on),nt=re,Lt=gn,qt=on)},setLocked:function(re){U=re},setClear:function(re){fe!==re&&(s.clearStencil(re),fe=re)},reset:function(){U=!1,ht=null,gt=null,Tt=null,lt=null,nt=null,Lt=null,qt=null,fe=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,E=null,M=null,y=null,R=null,A=null,C=new Vt(0,0,0),I=0,b=!1,S=null,P=null,N=null,k=null,$=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Q=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(H)[1]),Y=Q>=1):H.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),Y=Q>=2);let rt=null,pt={};const vt=s.getParameter(s.SCISSOR_BOX),At=s.getParameter(s.VIEWPORT),Ot=new ue().fromArray(vt),Jt=new ue().fromArray(At);function zt(U,ht,gt,Tt){const lt=new Uint8Array(4),nt=s.createTexture();s.bindTexture(U,nt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Lt=0;Lt<gt;Lt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ht,0,s.RGBA,1,1,Tt,0,s.RGBA,s.UNSIGNED_BYTE,lt):s.texImage2D(ht+Lt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,lt);return nt}const q={};q[s.TEXTURE_2D]=zt(s.TEXTURE_2D,s.TEXTURE_2D,1),q[s.TEXTURE_CUBE_MAP]=zt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[s.TEXTURE_2D_ARRAY]=zt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),q[s.TEXTURE_3D]=zt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(s.DEPTH_TEST),a.setFunc(Ni),J(!1),Z(No),tt(s.CULL_FACE),it(On);function tt(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function St(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Rt(U,ht){return u[U]!==ht?(s.bindFramebuffer(U,ht),u[U]=ht,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ht),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ht),!0):!1}function bt(U,ht){let gt=p,Tt=!1;if(U){gt=d.get(ht),gt===void 0&&(gt=[],d.set(ht,gt));const lt=U.textures;if(gt.length!==lt.length||gt[0]!==s.COLOR_ATTACHMENT0){for(let nt=0,Lt=lt.length;nt<Lt;nt++)gt[nt]=s.COLOR_ATTACHMENT0+nt;gt.length=lt.length,Tt=!0}}else gt[0]!==s.BACK&&(gt[0]=s.BACK,Tt=!0);Tt&&s.drawBuffers(gt)}function jt(U){return g!==U?(s.useProgram(U),g=U,!0):!1}const oe={[Qn]:s.FUNC_ADD,[ih]:s.FUNC_SUBTRACT,[sh]:s.FUNC_REVERSE_SUBTRACT};oe[rh]=s.MIN,oe[ah]=s.MAX;const L={[oh]:s.ZERO,[lh]:s.ONE,[ch]:s.SRC_COLOR,[ca]:s.SRC_ALPHA,[mh]:s.SRC_ALPHA_SATURATE,[fh]:s.DST_COLOR,[uh]:s.DST_ALPHA,[hh]:s.ONE_MINUS_SRC_COLOR,[ha]:s.ONE_MINUS_SRC_ALPHA,[ph]:s.ONE_MINUS_DST_COLOR,[dh]:s.ONE_MINUS_DST_ALPHA,[gh]:s.CONSTANT_COLOR,[_h]:s.ONE_MINUS_CONSTANT_COLOR,[vh]:s.CONSTANT_ALPHA,[xh]:s.ONE_MINUS_CONSTANT_ALPHA};function it(U,ht,gt,Tt,lt,nt,Lt,qt,fe,re){if(U===On){_===!0&&(St(s.BLEND),_=!1);return}if(_===!1&&(tt(s.BLEND),_=!0),U!==nh){if(U!==m||re!==b){if((f!==Qn||y!==Qn)&&(s.blendEquation(s.FUNC_ADD),f=Qn,y=Qn),re)switch(U){case ii:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ii:s.blendFunc(s.ONE,s.ONE);break;case Oo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Fo:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ii:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ii:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Oo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,M=null,R=null,A=null,C.set(0,0,0),I=0,m=U,b=re}return}lt=lt||ht,nt=nt||gt,Lt=Lt||Tt,(ht!==f||lt!==y)&&(s.blendEquationSeparate(oe[ht],oe[lt]),f=ht,y=lt),(gt!==E||Tt!==M||nt!==R||Lt!==A)&&(s.blendFuncSeparate(L[gt],L[Tt],L[nt],L[Lt]),E=gt,M=Tt,R=nt,A=Lt),(qt.equals(C)===!1||fe!==I)&&(s.blendColor(qt.r,qt.g,qt.b,fe),C.copy(qt),I=fe),m=U,b=!1}function j(U,ht){U.side===en?St(s.CULL_FACE):tt(s.CULL_FACE);let gt=U.side===Be;ht&&(gt=!gt),J(gt),U.blending===ii&&U.transparent===!1?it(On):it(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const Tt=U.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),at(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?tt(s.SAMPLE_ALPHA_TO_COVERAGE):St(s.SAMPLE_ALPHA_TO_COVERAGE)}function J(U){S!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),S=U)}function Z(U){U!==Qc?(tt(s.CULL_FACE),U!==P&&(U===No?s.cullFace(s.BACK):U===th?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):St(s.CULL_FACE),P=U}function ut(U){U!==N&&(Y&&s.lineWidth(U),N=U)}function at(U,ht,gt){U?(tt(s.POLYGON_OFFSET_FILL),(k!==ht||$!==gt)&&(s.polygonOffset(ht,gt),k=ht,$=gt)):St(s.POLYGON_OFFSET_FILL)}function mt(U){U?tt(s.SCISSOR_TEST):St(s.SCISSOR_TEST)}function Xt(U){U===void 0&&(U=s.TEXTURE0+W-1),rt!==U&&(s.activeTexture(U),rt=U)}function Wt(U,ht,gt){gt===void 0&&(rt===null?gt=s.TEXTURE0+W-1:gt=rt);let Tt=pt[gt];Tt===void 0&&(Tt={type:void 0,texture:void 0},pt[gt]=Tt),(Tt.type!==U||Tt.texture!==ht)&&(rt!==gt&&(s.activeTexture(gt),rt=gt),s.bindTexture(U,ht||q[U]),Tt.type=U,Tt.texture=ht)}function w(){const U=pt[rt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function v(){try{s.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{s.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{s.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{s.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{s.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Dt(){try{s.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{s.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{s.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{s.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{s.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(U){Ot.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Ot.copy(U))}function Ht(U){Jt.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Jt.copy(U))}function It(U,ht){let gt=c.get(ht);gt===void 0&&(gt=new WeakMap,c.set(ht,gt));let Tt=gt.get(U);Tt===void 0&&(Tt=s.getUniformBlockIndex(ht,U.name),gt.set(U,Tt))}function xt(U,ht){const Tt=c.get(ht).get(U);l.get(ht)!==Tt&&(s.uniformBlockBinding(ht,Tt,U.__bindingPointIndex),l.set(ht,Tt))}function $t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},rt=null,pt={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,E=null,M=null,y=null,R=null,A=null,C=new Vt(0,0,0),I=0,b=!1,S=null,P=null,N=null,k=null,$=null,Ot.set(0,0,s.canvas.width,s.canvas.height),Jt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:St,bindFramebuffer:Rt,drawBuffers:bt,useProgram:jt,setBlending:it,setMaterial:j,setFlipSided:J,setCullFace:Z,setLineWidth:ut,setPolygonOffset:at,setScissorTest:mt,activeTexture:Xt,bindTexture:Wt,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:B,texImage2D:Pt,texImage3D:ot,updateUBOMapping:It,uniformBlockBinding:xt,texStorage2D:dt,texStorage3D:Ct,texSubImage2D:X,texSubImage3D:st,compressedTexSubImage2D:K,compressedTexSubImage3D:Dt,scissor:Mt,viewport:Ht,reset:$t}}function U0(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ft,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return p?new OffscreenCanvas(w,v):ur("canvas")}function _(w,v,B){let X=1;const st=Wt(w);if((st.width>B||st.height>B)&&(X=B/Math.max(st.width,st.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const K=Math.floor(X*st.width),Dt=Math.floor(X*st.height);u===void 0&&(u=g(K,Dt));const dt=v?g(K,Dt):u;return dt.width=K,dt.height=Dt,dt.getContext("2d").drawImage(w,0,0,K,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+K+"x"+Dt+")."),dt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),w;return w}function m(w){return w.generateMipmaps}function f(w){s.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(w,v,B,X,st=!1){if(w!==null){if(s[w]!==void 0)return s[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let K=v;if(v===s.RED&&(B===s.FLOAT&&(K=s.R32F),B===s.HALF_FLOAT&&(K=s.R16F),B===s.UNSIGNED_BYTE&&(K=s.R8)),v===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.R8UI),B===s.UNSIGNED_SHORT&&(K=s.R16UI),B===s.UNSIGNED_INT&&(K=s.R32UI),B===s.BYTE&&(K=s.R8I),B===s.SHORT&&(K=s.R16I),B===s.INT&&(K=s.R32I)),v===s.RG&&(B===s.FLOAT&&(K=s.RG32F),B===s.HALF_FLOAT&&(K=s.RG16F),B===s.UNSIGNED_BYTE&&(K=s.RG8)),v===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RG8UI),B===s.UNSIGNED_SHORT&&(K=s.RG16UI),B===s.UNSIGNED_INT&&(K=s.RG32UI),B===s.BYTE&&(K=s.RG8I),B===s.SHORT&&(K=s.RG16I),B===s.INT&&(K=s.RG32I)),v===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGB8UI),B===s.UNSIGNED_SHORT&&(K=s.RGB16UI),B===s.UNSIGNED_INT&&(K=s.RGB32UI),B===s.BYTE&&(K=s.RGB8I),B===s.SHORT&&(K=s.RGB16I),B===s.INT&&(K=s.RGB32I)),v===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),B===s.UNSIGNED_INT&&(K=s.RGBA32UI),B===s.BYTE&&(K=s.RGBA8I),B===s.SHORT&&(K=s.RGBA16I),B===s.INT&&(K=s.RGBA32I)),v===s.RGB&&(B===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(K=s.R11F_G11F_B10F)),v===s.RGBA){const Dt=st?cr:se.getTransfer(X);B===s.FLOAT&&(K=s.RGBA32F),B===s.HALF_FLOAT&&(K=s.RGBA16F),B===s.UNSIGNED_BYTE&&(K=Dt===ce?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(w,v){let B;return w?v===null||v===ai||v===rs?B=s.DEPTH24_STENCIL8:v===En?B=s.DEPTH32F_STENCIL8:v===ss&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ai||v===rs?B=s.DEPTH_COMPONENT24:v===En?B=s.DEPTH_COMPONENT32F:v===ss&&(B=s.DEPTH_COMPONENT16),B}function R(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==$e&&w.minFilter!==un?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function A(w){const v=w.target;v.removeEventListener("dispose",A),I(v),v.isVideoTexture&&h.delete(v)}function C(w){const v=w.target;v.removeEventListener("dispose",C),S(v)}function I(w){const v=n.get(w);if(v.__webglInit===void 0)return;const B=w.source,X=d.get(B);if(X){const st=X[v.__cacheKey];st.usedTimes--,st.usedTimes===0&&b(w),Object.keys(X).length===0&&d.delete(B)}n.remove(w)}function b(w){const v=n.get(w);s.deleteTexture(v.__webglTexture);const B=w.source,X=d.get(B);delete X[v.__cacheKey],a.memory.textures--}function S(w){const v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let st=0;st<v.__webglFramebuffer[X].length;st++)s.deleteFramebuffer(v.__webglFramebuffer[X][st]);else s.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)s.deleteFramebuffer(v.__webglFramebuffer[X]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=w.textures;for(let X=0,st=B.length;X<st;X++){const K=n.get(B[X]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(B[X])}n.remove(w)}let P=0;function N(){P=0}function k(){const w=P;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),P+=1,w}function $(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function W(w,v){const B=n.get(w);if(w.isVideoTexture&&mt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const X=w.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,w,v);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+v)}function Y(w,v){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){q(B,w,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+v)}function Q(w,v){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){q(B,w,v);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+v)}function H(w,v){const B=n.get(w);if(w.version>0&&B.__version!==w.version){tt(B,w,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+v)}const rt={[ya]:s.REPEAT,[Nn]:s.CLAMP_TO_EDGE,[Ma]:s.MIRRORED_REPEAT},pt={[$e]:s.NEAREST,[Rh]:s.NEAREST_MIPMAP_NEAREST,[ys]:s.NEAREST_MIPMAP_LINEAR,[un]:s.LINEAR,[Sr]:s.LINEAR_MIPMAP_NEAREST,[ei]:s.LINEAR_MIPMAP_LINEAR},vt={[Dh]:s.NEVER,[Bh]:s.ALWAYS,[Ih]:s.LESS,[uc]:s.LEQUAL,[Uh]:s.EQUAL,[Fh]:s.GEQUAL,[Nh]:s.GREATER,[Oh]:s.NOTEQUAL};function At(w,v){if(v.type===En&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===un||v.magFilter===Sr||v.magFilter===ys||v.magFilter===ei||v.minFilter===un||v.minFilter===Sr||v.minFilter===ys||v.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,rt[v.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,rt[v.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,rt[v.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,pt[v.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,pt[v.minFilter]),v.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,vt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===$e||v.minFilter!==ys&&v.minFilter!==ei||v.type===En&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ot(w,v){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",A));const X=v.source;let st=d.get(X);st===void 0&&(st={},d.set(X,st));const K=$(v);if(K!==w.__cacheKey){st[K]===void 0&&(st[K]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),st[K].usedTimes++;const Dt=st[w.__cacheKey];Dt!==void 0&&(st[w.__cacheKey].usedTimes--,Dt.usedTimes===0&&b(v)),w.__cacheKey=K,w.__webglTexture=st[K].texture}return B}function Jt(w,v,B){return Math.floor(Math.floor(w/B)/v)}function zt(w,v,B,X){const K=w.updateRanges;if(K.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,B,X,v.data);else{K.sort((ot,Mt)=>ot.start-Mt.start);let Dt=0;for(let ot=1;ot<K.length;ot++){const Mt=K[Dt],Ht=K[ot],It=Mt.start+Mt.count,xt=Jt(Ht.start,v.width,4),$t=Jt(Mt.start,v.width,4);Ht.start<=It+1&&xt===$t&&Jt(Ht.start+Ht.count-1,v.width,4)===xt?Mt.count=Math.max(Mt.count,Ht.start+Ht.count-Mt.start):(++Dt,K[Dt]=Ht)}K.length=Dt+1;const dt=s.getParameter(s.UNPACK_ROW_LENGTH),Ct=s.getParameter(s.UNPACK_SKIP_PIXELS),Pt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let ot=0,Mt=K.length;ot<Mt;ot++){const Ht=K[ot],It=Math.floor(Ht.start/4),xt=Math.ceil(Ht.count/4),$t=It%v.width,U=Math.floor(It/v.width),ht=xt,gt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,$t),s.pixelStorei(s.UNPACK_SKIP_ROWS,U),e.texSubImage2D(s.TEXTURE_2D,0,$t,U,ht,gt,B,X,v.data)}w.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,dt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ct),s.pixelStorei(s.UNPACK_SKIP_ROWS,Pt)}}function q(w,v,B){let X=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=s.TEXTURE_3D);const st=Ot(w,v),K=v.source;e.bindTexture(X,w.__webglTexture,s.TEXTURE0+B);const Dt=n.get(K);if(K.version!==Dt.__version||st===!0){e.activeTexture(s.TEXTURE0+B);const dt=se.getPrimaries(se.workingColorSpace),Ct=v.colorSpace===Un?null:se.getPrimaries(v.colorSpace),Pt=v.colorSpace===Un||dt===Ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let ot=_(v.image,!1,i.maxTextureSize);ot=Xt(v,ot);const Mt=r.convert(v.format,v.colorSpace),Ht=r.convert(v.type);let It=M(v.internalFormat,Mt,Ht,v.colorSpace,v.isVideoTexture);At(X,v);let xt;const $t=v.mipmaps,U=v.isVideoTexture!==!0,ht=Dt.__version===void 0||st===!0,gt=K.dataReady,Tt=R(v,ot);if(v.isDepthTexture)It=y(v.format===os,v.type),ht&&(U?e.texStorage2D(s.TEXTURE_2D,1,It,ot.width,ot.height):e.texImage2D(s.TEXTURE_2D,0,It,ot.width,ot.height,0,Mt,Ht,null));else if(v.isDataTexture)if($t.length>0){U&&ht&&e.texStorage2D(s.TEXTURE_2D,Tt,It,$t[0].width,$t[0].height);for(let lt=0,nt=$t.length;lt<nt;lt++)xt=$t[lt],U?gt&&e.texSubImage2D(s.TEXTURE_2D,lt,0,0,xt.width,xt.height,Mt,Ht,xt.data):e.texImage2D(s.TEXTURE_2D,lt,It,xt.width,xt.height,0,Mt,Ht,xt.data);v.generateMipmaps=!1}else U?(ht&&e.texStorage2D(s.TEXTURE_2D,Tt,It,ot.width,ot.height),gt&&zt(v,ot,Mt,Ht)):e.texImage2D(s.TEXTURE_2D,0,It,ot.width,ot.height,0,Mt,Ht,ot.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){U&&ht&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Tt,It,$t[0].width,$t[0].height,ot.depth);for(let lt=0,nt=$t.length;lt<nt;lt++)if(xt=$t[lt],v.format!==an)if(Mt!==null)if(U){if(gt)if(v.layerUpdates.size>0){const Lt=yl(xt.width,xt.height,v.format,v.type);for(const qt of v.layerUpdates){const fe=xt.data.subarray(qt*Lt/xt.data.BYTES_PER_ELEMENT,(qt+1)*Lt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,lt,0,0,qt,xt.width,xt.height,1,Mt,fe)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,lt,0,0,0,xt.width,xt.height,ot.depth,Mt,xt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,lt,It,xt.width,xt.height,ot.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?gt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,lt,0,0,0,xt.width,xt.height,ot.depth,Mt,Ht,xt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,lt,It,xt.width,xt.height,ot.depth,0,Mt,Ht,xt.data)}else{U&&ht&&e.texStorage2D(s.TEXTURE_2D,Tt,It,$t[0].width,$t[0].height);for(let lt=0,nt=$t.length;lt<nt;lt++)xt=$t[lt],v.format!==an?Mt!==null?U?gt&&e.compressedTexSubImage2D(s.TEXTURE_2D,lt,0,0,xt.width,xt.height,Mt,xt.data):e.compressedTexImage2D(s.TEXTURE_2D,lt,It,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?gt&&e.texSubImage2D(s.TEXTURE_2D,lt,0,0,xt.width,xt.height,Mt,Ht,xt.data):e.texImage2D(s.TEXTURE_2D,lt,It,xt.width,xt.height,0,Mt,Ht,xt.data)}else if(v.isDataArrayTexture)if(U){if(ht&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Tt,It,ot.width,ot.height,ot.depth),gt)if(v.layerUpdates.size>0){const lt=yl(ot.width,ot.height,v.format,v.type);for(const nt of v.layerUpdates){const Lt=ot.data.subarray(nt*lt/ot.data.BYTES_PER_ELEMENT,(nt+1)*lt/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,nt,ot.width,ot.height,1,Mt,Ht,Lt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,Mt,Ht,ot.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,It,ot.width,ot.height,ot.depth,0,Mt,Ht,ot.data);else if(v.isData3DTexture)U?(ht&&e.texStorage3D(s.TEXTURE_3D,Tt,It,ot.width,ot.height,ot.depth),gt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,Mt,Ht,ot.data)):e.texImage3D(s.TEXTURE_3D,0,It,ot.width,ot.height,ot.depth,0,Mt,Ht,ot.data);else if(v.isFramebufferTexture){if(ht)if(U)e.texStorage2D(s.TEXTURE_2D,Tt,It,ot.width,ot.height);else{let lt=ot.width,nt=ot.height;for(let Lt=0;Lt<Tt;Lt++)e.texImage2D(s.TEXTURE_2D,Lt,It,lt,nt,0,Mt,Ht,null),lt>>=1,nt>>=1}}else if($t.length>0){if(U&&ht){const lt=Wt($t[0]);e.texStorage2D(s.TEXTURE_2D,Tt,It,lt.width,lt.height)}for(let lt=0,nt=$t.length;lt<nt;lt++)xt=$t[lt],U?gt&&e.texSubImage2D(s.TEXTURE_2D,lt,0,0,Mt,Ht,xt):e.texImage2D(s.TEXTURE_2D,lt,It,Mt,Ht,xt);v.generateMipmaps=!1}else if(U){if(ht){const lt=Wt(ot);e.texStorage2D(s.TEXTURE_2D,Tt,It,lt.width,lt.height)}gt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,Ht,ot)}else e.texImage2D(s.TEXTURE_2D,0,It,Mt,Ht,ot);m(v)&&f(X),Dt.__version=K.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function tt(w,v,B){if(v.image.length!==6)return;const X=Ot(w,v),st=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+B);const K=n.get(st);if(st.version!==K.__version||X===!0){e.activeTexture(s.TEXTURE0+B);const Dt=se.getPrimaries(se.workingColorSpace),dt=v.colorSpace===Un?null:se.getPrimaries(v.colorSpace),Ct=v.colorSpace===Un||Dt===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Pt=v.isCompressedTexture||v.image[0].isCompressedTexture,ot=v.image[0]&&v.image[0].isDataTexture,Mt=[];for(let nt=0;nt<6;nt++)!Pt&&!ot?Mt[nt]=_(v.image[nt],!0,i.maxCubemapSize):Mt[nt]=ot?v.image[nt].image:v.image[nt],Mt[nt]=Xt(v,Mt[nt]);const Ht=Mt[0],It=r.convert(v.format,v.colorSpace),xt=r.convert(v.type),$t=M(v.internalFormat,It,xt,v.colorSpace),U=v.isVideoTexture!==!0,ht=K.__version===void 0||X===!0,gt=st.dataReady;let Tt=R(v,Ht);At(s.TEXTURE_CUBE_MAP,v);let lt;if(Pt){U&&ht&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Tt,$t,Ht.width,Ht.height);for(let nt=0;nt<6;nt++){lt=Mt[nt].mipmaps;for(let Lt=0;Lt<lt.length;Lt++){const qt=lt[Lt];v.format!==an?It!==null?U?gt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,0,0,qt.width,qt.height,It,qt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,$t,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,0,0,qt.width,qt.height,It,xt,qt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,$t,qt.width,qt.height,0,It,xt,qt.data)}}}else{if(lt=v.mipmaps,U&&ht){lt.length>0&&Tt++;const nt=Wt(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Tt,$t,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ot){U?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Mt[nt].width,Mt[nt].height,It,xt,Mt[nt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,$t,Mt[nt].width,Mt[nt].height,0,It,xt,Mt[nt].data);for(let Lt=0;Lt<lt.length;Lt++){const fe=lt[Lt].image[nt].image;U?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,0,0,fe.width,fe.height,It,xt,fe.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,$t,fe.width,fe.height,0,It,xt,fe.data)}}else{U?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,It,xt,Mt[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,$t,It,xt,Mt[nt]);for(let Lt=0;Lt<lt.length;Lt++){const qt=lt[Lt];U?gt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,0,0,It,xt,qt.image[nt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,$t,It,xt,qt.image[nt])}}}m(v)&&f(s.TEXTURE_CUBE_MAP),K.__version=st.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function St(w,v,B,X,st,K){const Dt=r.convert(B.format,B.colorSpace),dt=r.convert(B.type),Ct=M(B.internalFormat,Dt,dt,B.colorSpace),Pt=n.get(v),ot=n.get(B);if(ot.__renderTarget=v,!Pt.__hasExternalTextures){const Mt=Math.max(1,v.width>>K),Ht=Math.max(1,v.height>>K);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,K,Ct,Mt,Ht,v.depth,0,Dt,dt,null):e.texImage2D(st,K,Ct,Mt,Ht,0,Dt,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,w),at(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,st,ot.__webglTexture,0,ut(v)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,st,ot.__webglTexture,K),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Rt(w,v,B){if(s.bindRenderbuffer(s.RENDERBUFFER,w),v.depthBuffer){const X=v.depthTexture,st=X&&X.isDepthTexture?X.type:null,K=y(v.stencilBuffer,st),Dt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=ut(v);at(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,dt,K,v.width,v.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,K,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,K,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Dt,s.RENDERBUFFER,w)}else{const X=v.textures;for(let st=0;st<X.length;st++){const K=X[st],Dt=r.convert(K.format,K.colorSpace),dt=r.convert(K.type),Ct=M(K.internalFormat,Dt,dt,K.colorSpace),Pt=ut(v);B&&at(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,Ct,v.width,v.height):at(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Pt,Ct,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Ct,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function bt(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(v.depthTexture);X.__renderTarget=v,(!X.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const st=X.__webglTexture,K=ut(v);if(v.depthTexture.format===as)at(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0);else if(v.depthTexture.format===os)at(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function jt(w){const v=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const X=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){const st=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",st)};X.addEventListener("dispose",st),v.__depthDisposeCallback=st}v.__boundDepthTexture=X}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const X=w.texture.mipmaps;X&&X.length>0?bt(v.__webglFramebuffer[0],w):bt(v.__webglFramebuffer,w)}else if(B){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=s.createRenderbuffer(),Rt(v.__webglDepthbuffer[X],w,!1);else{const st=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,K)}}else{const X=w.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),Rt(v.__webglDepthbuffer,w,!1);else{const st=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,K)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function oe(w,v,B){const X=n.get(w);v!==void 0&&St(X.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&jt(w)}function L(w){const v=w.texture,B=n.get(w),X=n.get(v);w.addEventListener("dispose",C);const st=w.textures,K=w.isWebGLCubeRenderTarget===!0,Dt=st.length>1;if(Dt||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=v.version,a.memory.textures++),K){B.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[dt]=[];for(let Ct=0;Ct<v.mipmaps.length;Ct++)B.__webglFramebuffer[dt][Ct]=s.createFramebuffer()}else B.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let dt=0;dt<v.mipmaps.length;dt++)B.__webglFramebuffer[dt]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(Dt)for(let dt=0,Ct=st.length;dt<Ct;dt++){const Pt=n.get(st[dt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=s.createTexture(),a.memory.textures++)}if(w.samples>0&&at(w)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let dt=0;dt<st.length;dt++){const Ct=st[dt];B.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[dt]);const Pt=r.convert(Ct.format,Ct.colorSpace),ot=r.convert(Ct.type),Mt=M(Ct.internalFormat,Pt,ot,Ct.colorSpace,w.isXRRenderTarget===!0),Ht=ut(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ht,Mt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,B.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Rt(B.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),At(s.TEXTURE_CUBE_MAP,v);for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ct=0;Ct<v.mipmaps.length;Ct++)St(B.__webglFramebuffer[dt][Ct],w,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Ct);else St(B.__webglFramebuffer[dt],w,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(v)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let dt=0,Ct=st.length;dt<Ct;dt++){const Pt=st[dt],ot=n.get(Pt);let Mt=s.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Mt=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Mt,ot.__webglTexture),At(Mt,Pt),St(B.__webglFramebuffer,w,Pt,s.COLOR_ATTACHMENT0+dt,Mt,0),m(Pt)&&f(Mt)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(dt=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,X.__webglTexture),At(dt,v),v.mipmaps&&v.mipmaps.length>0)for(let Ct=0;Ct<v.mipmaps.length;Ct++)St(B.__webglFramebuffer[Ct],w,v,s.COLOR_ATTACHMENT0,dt,Ct);else St(B.__webglFramebuffer,w,v,s.COLOR_ATTACHMENT0,dt,0);m(v)&&f(dt),e.unbindTexture()}w.depthBuffer&&jt(w)}function it(w){const v=w.textures;for(let B=0,X=v.length;B<X;B++){const st=v[B];if(m(st)){const K=E(w),Dt=n.get(st).__webglTexture;e.bindTexture(K,Dt),f(K),e.unbindTexture()}}}const j=[],J=[];function Z(w){if(w.samples>0){if(at(w)===!1){const v=w.textures,B=w.width,X=w.height;let st=s.COLOR_BUFFER_BIT;const K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Dt=n.get(w),dt=v.length>1;if(dt)for(let Pt=0;Pt<v.length;Pt++)e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const Ct=w.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Pt=0;Pt<v.length;Pt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Dt.__webglColorRenderbuffer[Pt]);const ot=n.get(v[Pt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ot,0)}s.blitFramebuffer(0,0,B,X,0,0,B,X,st,s.NEAREST),l===!0&&(j.length=0,J.length=0,j.push(s.COLOR_ATTACHMENT0+Pt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(j.push(K),J.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,J)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let Pt=0;Pt<v.length;Pt++){e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.RENDERBUFFER,Dt.__webglColorRenderbuffer[Pt]);const ot=n.get(v[Pt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Pt,s.TEXTURE_2D,ot,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const v=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function ut(w){return Math.min(i.maxSamples,w.samples)}function at(w){const v=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function mt(w){const v=a.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function Xt(w,v){const B=w.colorSpace,X=w.format,st=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Bi&&B!==Un&&(se.getTransfer(B)===ce?(X!==an||st!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function Wt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.setTexture2D=W,this.setTexture2DArray=Y,this.setTexture3D=Q,this.setTextureCube=H,this.rebindTextures=oe,this.setupRenderTarget=L,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=at}function N0(s,t){function e(n,i=Un){let r;const a=se.getTransfer(i);if(n===fn)return s.UNSIGNED_BYTE;if(n===ho)return s.UNSIGNED_SHORT_4_4_4_4;if(n===uo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===sc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===rc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===nc)return s.BYTE;if(n===ic)return s.SHORT;if(n===ss)return s.UNSIGNED_SHORT;if(n===co)return s.INT;if(n===ai)return s.UNSIGNED_INT;if(n===En)return s.FLOAT;if(n===fs)return s.HALF_FLOAT;if(n===ac)return s.ALPHA;if(n===oc)return s.RGB;if(n===an)return s.RGBA;if(n===as)return s.DEPTH_COMPONENT;if(n===os)return s.DEPTH_STENCIL;if(n===lc)return s.RED;if(n===fo)return s.RED_INTEGER;if(n===cc)return s.RG;if(n===po)return s.RG_INTEGER;if(n===mo)return s.RGBA_INTEGER;if(n===ir||n===sr||n===rr||n===ar)if(a===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sa||n===Ea||n===ba||n===Ta)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wa||n===Aa||n===Ra)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===wa||n===Aa)return a===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ra)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua||n===Na||n===Oa||n===Fa||n===Ba||n===za||n===ka||n===Ha||n===Ga)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ca)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===La)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Da)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ia)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ua)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Na)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ba)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===za)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ka)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ha)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ga)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Va||n===Wa||n===Xa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Va)return a===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qa||n===Ya||n===$a||n===Ka)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===qa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ka)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const O0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,F0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class B0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Tc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new wn({vertexShader:O0,fragmentShader:F0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new _s(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class z0 extends Hi{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new B0,f={},E=e.getContextAttributes();let M=null,y=null;const R=[],A=[],C=new ft;let I=null;const b=new qe;b.viewport=new ue;const S=new qe;S.viewport=new ue;const P=[b,S],N=new rd;let k=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=R[q];return tt===void 0&&(tt=new Wr,R[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=R[q];return tt===void 0&&(tt=new Wr,R[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=R[q];return tt===void 0&&(tt=new Wr,R[q]=tt),tt.getHandSpace()};function W(q){const tt=A.indexOf(q.inputSource);if(tt===-1)return;const St=R[tt];St!==void 0&&(St.update(q.inputSource,q.frame,c||a),St.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",Q);for(let q=0;q<R.length;q++){const tt=A[q];tt!==null&&(A[q]=null,R[q].disconnect(tt))}k=null,$=null,m.reset();for(const q in f)delete f[q];t.setRenderTarget(M),p=null,d=null,u=null,i=null,y=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(M=t.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",Q),E.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Rt=null,bt=null;E.depth&&(bt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=E.stencil?os:as,Rt=E.stencil?rs:ai);const jt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(jt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new oi(d.textureWidth,d.textureHeight,{format:an,type:fn,depthTexture:new bc(d.textureWidth,d.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const St={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,St),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new oi(p.framebufferWidth,p.framebufferHeight,{format:an,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),zt.setContext(i),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(q){for(let tt=0;tt<q.removed.length;tt++){const St=q.removed[tt],Rt=A.indexOf(St);Rt>=0&&(A[Rt]=null,R[Rt].disconnect(St))}for(let tt=0;tt<q.added.length;tt++){const St=q.added[tt];let Rt=A.indexOf(St);if(Rt===-1){for(let jt=0;jt<R.length;jt++)if(jt>=A.length){A.push(St),Rt=jt;break}else if(A[jt]===null){A[jt]=St,Rt=jt;break}if(Rt===-1)break}const bt=R[Rt];bt&&bt.connect(St)}}const H=new D,rt=new D;function pt(q,tt,St){H.setFromMatrixPosition(tt.matrixWorld),rt.setFromMatrixPosition(St.matrixWorld);const Rt=H.distanceTo(rt),bt=tt.projectionMatrix.elements,jt=St.projectionMatrix.elements,oe=bt[14]/(bt[10]-1),L=bt[14]/(bt[10]+1),it=(bt[9]+1)/bt[5],j=(bt[9]-1)/bt[5],J=(bt[8]-1)/bt[0],Z=(jt[8]+1)/jt[0],ut=oe*J,at=oe*Z,mt=Rt/(-J+Z),Xt=mt*-J;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Xt),q.translateZ(mt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),bt[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Wt=oe+mt,w=L+mt,v=ut-Xt,B=at+(Rt-Xt),X=it*L/w*Wt,st=j*L/w*Wt;q.projectionMatrix.makePerspective(v,B,X,st,Wt,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function vt(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let tt=q.near,St=q.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(St=m.depthFar)),N.near=S.near=b.near=tt,N.far=S.far=b.far=St,(k!==N.near||$!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),k=N.near,$=N.far),N.layers.mask=q.layers.mask|6,b.layers.mask=N.layers.mask&3,S.layers.mask=N.layers.mask&5;const Rt=q.parent,bt=N.cameras;vt(N,Rt);for(let jt=0;jt<bt.length;jt++)vt(bt[jt],Rt);bt.length===2?pt(N,b,S):N.projectionMatrix.copy(b.projectionMatrix),At(q,N,Rt)};function At(q,tt,St){St===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(St.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ja*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(q){return f[q]};let Ot=null;function Jt(q,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){const St=h.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Rt=!1;St.length!==N.cameras.length&&(N.cameras.length=0,Rt=!0);for(let L=0;L<St.length;L++){const it=St[L];let j=null;if(p!==null)j=p.getViewport(it);else{const Z=u.getViewSubImage(d,it);j=Z.viewport,L===0&&(t.setRenderTargetTextures(y,Z.colorTexture,Z.depthStencilTexture),t.setRenderTarget(y))}let J=P[L];J===void 0&&(J=new qe,J.layers.enable(L),J.viewport=new ue,P[L]=J),J.matrix.fromArray(it.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(it.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(j.x,j.y,j.width,j.height),L===0&&(N.matrix.copy(J.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Rt===!0&&N.cameras.push(J)}const bt=i.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const L=u.getDepthInformation(St[0]);L&&L.isValid&&L.texture&&m.init(L,i.renderState)}if(bt&&bt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let L=0;L<St.length;L++){const it=St[L].camera;if(it){let j=f[it];j||(j=new Tc,f[it]=j);const J=u.getCameraImage(it);j.sourceTexture=J}}}}for(let St=0;St<R.length;St++){const Rt=A[St],bt=R[St];Rt!==null&&bt!==void 0&&bt.update(Rt,tt,c||a)}Ot&&Ot(q,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const zt=new Fc;zt.setAnimationLoop(Jt),this.setAnimationLoop=function(q){Ot=q},this.dispose=function(){}}}const $n=new pn,k0=new me;function H0(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,vc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,E,M,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,E,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Be&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Be&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=t.get(f),M=E.envMap,y=E.envMapRotation;M&&(m.envMap.value=M,$n.copy(y),$n.x*=-1,$n.y*=-1,$n.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),m.envMapRotation.value.setFromMatrix4(k0.makeRotationFromEuler($n)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,E,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=M*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Be&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const E=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function G0(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,M){const y=M.program;n.uniformBlockBinding(E,y)}function c(E,M){let y=i[E.id];y===void 0&&(g(E),y=h(E),i[E.id]=y,E.addEventListener("dispose",m));const R=M.program;n.updateUBOMapping(E,R);const A=t.render.frame;r[E.id]!==A&&(d(E),r[E.id]=A)}function h(E){const M=u();E.__bindingPointIndex=M;const y=s.createBuffer(),R=E.__size,A=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,R,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,y),y}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const M=i[E.id],y=E.uniforms,R=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,C=y.length;A<C;A++){const I=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,S=I.length;b<S;b++){const P=I[b];if(p(P,A,b,R)===!0){const N=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let $=0;for(let W=0;W<k.length;W++){const Y=k[W],Q=_(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,N+$,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,$),$+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(E,M,y,R){const A=E.value,C=M+"_"+y;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const I=R[C];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return R[C]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(E){const M=E.uniforms;let y=0;const R=16;for(let C=0,I=M.length;C<I;C++){const b=Array.isArray(M[C])?M[C]:[M[C]];for(let S=0,P=b.length;S<P;S++){const N=b[S],k=Array.isArray(N.value)?N.value:[N.value];for(let $=0,W=k.length;$<W;$++){const Y=k[$],Q=_(Y),H=y%R,rt=H%Q.boundary,pt=H+rt;y+=rt,pt!==0&&R-pt<Q.storage&&(y+=R-pt),N.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=Q.storage}}}const A=y%R;return A>0&&(y+=R-A),E.__size=y,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function m(E){const M=E.target;M.removeEventListener("dispose",m);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function f(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:l,update:c,dispose:f}}class V0{constructor(t={}){const{canvas:e=kh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const E=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let R=!1;this._outputColorSpace=Ue;let A=0,C=0,I=null,b=-1,S=null;const P=new ue,N=new ue;let k=null;const $=new Vt(0);let W=0,Y=e.width,Q=e.height,H=1,rt=null,pt=null;const vt=new ue(0,0,Y,Q),At=new ue(0,0,Y,Q);let Ot=!1;const Jt=new xo;let zt=!1,q=!1;const tt=new me,St=new D,Rt=new ue,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function oe(){return I===null?H:1}let L=n;function it(T,O){return e.getContext(T,O)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oo}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",lt,!1),L===null){const O="webgl2";if(L=it(O,T),L===null)throw it(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let j,J,Z,ut,at,mt,Xt,Wt,w,v,B,X,st,K,Dt,dt,Ct,Pt,ot,Mt,Ht,It,xt,$t;function U(){j=new Qp(L),j.init(),It=new N0(L,j),J=new qp(L,j,t,It),Z=new I0(L,j),J.reversedDepthBuffer&&d&&Z.buffers.depth.setReversed(!0),ut=new nm(L),at=new y0,mt=new U0(L,j,Z,at,J,It,ut),Xt=new $p(y),Wt=new jp(y),w=new od(L),xt=new Wp(L,w),v=new tm(L,w,ut,xt),B=new sm(L,v,w,ut),ot=new im(L,J,mt),dt=new Yp(at),X=new x0(y,Xt,Wt,j,J,xt,dt),st=new H0(y,at),K=new S0,Dt=new R0(j),Pt=new Vp(y,Xt,Wt,Z,B,p,l),Ct=new L0(y,B,J),$t=new G0(L,ut,J,Z),Mt=new Xp(L,j,ut),Ht=new em(L,j,ut),ut.programs=X.programs,y.capabilities=J,y.extensions=j,y.properties=at,y.renderLists=K,y.shadowMap=Ct,y.state=Z,y.info=ut}U();const ht=new z0(y,L);this.xr=ht,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=j.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=j.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(T){T!==void 0&&(H=T,this.setSize(Y,Q,!1))},this.getSize=function(T){return T.set(Y,Q)},this.setSize=function(T,O,G=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,Q=O,e.width=Math.floor(T*H),e.height=Math.floor(O*H),G===!0&&(e.style.width=T+"px",e.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(Y*H,Q*H).floor()},this.setDrawingBufferSize=function(T,O,G){Y=T,Q=O,H=G,e.width=Math.floor(T*G),e.height=Math.floor(O*G),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(vt)},this.setViewport=function(T,O,G,V){T.isVector4?vt.set(T.x,T.y,T.z,T.w):vt.set(T,O,G,V),Z.viewport(P.copy(vt).multiplyScalar(H).round())},this.getScissor=function(T){return T.copy(At)},this.setScissor=function(T,O,G,V){T.isVector4?At.set(T.x,T.y,T.z,T.w):At.set(T,O,G,V),Z.scissor(N.copy(At).multiplyScalar(H).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(T){Z.setScissorTest(Ot=T)},this.setOpaqueSort=function(T){rt=T},this.setTransparentSort=function(T){pt=T},this.getClearColor=function(T){return T.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(T=!0,O=!0,G=!0){let V=0;if(T){let F=!1;if(I!==null){const ct=I.texture.format;F=ct===mo||ct===po||ct===fo}if(F){const ct=I.texture.type,yt=ct===fn||ct===ai||ct===ss||ct===rs||ct===ho||ct===uo,wt=Pt.getClearColor(),Et=Pt.getClearAlpha(),kt=wt.r,Gt=wt.g,Nt=wt.b;yt?(g[0]=kt,g[1]=Gt,g[2]=Nt,g[3]=Et,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=kt,_[1]=Gt,_[2]=Nt,_[3]=Et,L.clearBufferiv(L.COLOR,0,_))}else V|=L.COLOR_BUFFER_BIT}O&&(V|=L.DEPTH_BUFFER_BIT),G&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),Pt.dispose(),K.dispose(),Dt.dispose(),at.dispose(),Xt.dispose(),Wt.dispose(),B.dispose(),xt.dispose(),$t.dispose(),X.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",on),ht.removeEventListener("sessionend",Co),Hn.stop()};function gt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const T=ut.autoReset,O=Ct.enabled,G=Ct.autoUpdate,V=Ct.needsUpdate,F=Ct.type;U(),ut.autoReset=T,Ct.enabled=O,Ct.autoUpdate=G,Ct.needsUpdate=V,Ct.type=F}function lt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function nt(T){const O=T.target;O.removeEventListener("dispose",nt),Lt(O)}function Lt(T){qt(T),at.remove(T)}function qt(T){const O=at.get(T).programs;O!==void 0&&(O.forEach(function(G){X.releaseProgram(G)}),T.isShaderMaterial&&X.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,G,V,F,ct){O===null&&(O=bt);const yt=F.isMesh&&F.matrixWorld.determinant()<0,wt=Yc(T,O,G,V,F);Z.setMaterial(V,yt);let Et=G.index,kt=1;if(V.wireframe===!0){if(Et=v.getWireframeAttribute(G),Et===void 0)return;kt=2}const Gt=G.drawRange,Nt=G.attributes.position;let te=Gt.start*kt,le=(Gt.start+Gt.count)*kt;ct!==null&&(te=Math.max(te,ct.start*kt),le=Math.min(le,(ct.start+ct.count)*kt)),Et!==null?(te=Math.max(te,0),le=Math.min(le,Et.count)):Nt!=null&&(te=Math.max(te,0),le=Math.min(le,Nt.count));const Se=le-te;if(Se<0||Se===1/0)return;xt.setup(F,V,wt,G,Et);let ge,de=Mt;if(Et!==null&&(ge=w.get(Et),de=Ht,de.setIndex(ge)),F.isMesh)V.wireframe===!0?(Z.setLineWidth(V.wireframeLinewidth*oe()),de.setMode(L.LINES)):de.setMode(L.TRIANGLES);else if(F.isLine){let Bt=V.linewidth;Bt===void 0&&(Bt=1),Z.setLineWidth(Bt*oe()),F.isLineSegments?de.setMode(L.LINES):F.isLineLoop?de.setMode(L.LINE_LOOP):de.setMode(L.LINE_STRIP)}else F.isPoints?de.setMode(L.POINTS):F.isSprite&&de.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ls("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))de.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Bt=F._multiDrawStarts,xe=F._multiDrawCounts,ne=F._multiDrawCount,Ge=Et?w.get(Et).bytesPerElement:1,ci=at.get(V).currentProgram.getUniforms();for(let Ve=0;Ve<ne;Ve++)ci.setValue(L,"_gl_DrawID",Ve),de.render(Bt[Ve]/Ge,xe[Ve])}else if(F.isInstancedMesh)de.renderInstances(te,Se,F.count);else if(G.isInstancedBufferGeometry){const Bt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xe=Math.min(G.instanceCount,Bt);de.renderInstances(te,Se,xe)}else de.render(te,Se)};function fe(T,O,G){T.transparent===!0&&T.side===en&&T.forceSinglePass===!1?(T.side=Be,T.needsUpdate=!0,xs(T,O,G),T.side=zn,T.needsUpdate=!0,xs(T,O,G),T.side=en):xs(T,O,G)}this.compile=function(T,O,G=null){G===null&&(G=T),f=Dt.get(G),f.init(O),M.push(f),G.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),T!==G&&T.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const V=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ct=F.material;if(ct)if(Array.isArray(ct))for(let yt=0;yt<ct.length;yt++){const wt=ct[yt];fe(wt,G,F),V.add(wt)}else fe(ct,G,F),V.add(ct)}),f=M.pop(),V},this.compileAsync=function(T,O,G=null){const V=this.compile(T,O,G);return new Promise(F=>{function ct(){if(V.forEach(function(yt){at.get(yt).currentProgram.isReady()&&V.delete(yt)}),V.size===0){F(T);return}setTimeout(ct,10)}j.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let re=null;function gn(T){re&&re(T)}function on(){Hn.stop()}function Co(){Hn.start()}const Hn=new Fc;Hn.setAnimationLoop(gn),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(T){re=T,ht.setAnimationLoop(T),T===null?Hn.stop():Hn.start()},ht.addEventListener("sessionstart",on),ht.addEventListener("sessionend",Co),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(O),O=ht.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,O,I),f=Dt.get(T,M.length),f.init(O),M.push(f),tt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Jt.setFromProjectionMatrix(tt,dn,O.reversedDepth),q=this.localClippingEnabled,zt=dt.init(this.clippingPlanes,q),m=K.get(T,E.length),m.init(),E.push(m),ht.enabled===!0&&ht.isPresenting===!0){const ct=y.xr.getDepthSensingMesh();ct!==null&&yr(ct,O,-1/0,y.sortObjects)}yr(T,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(rt,pt),jt=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,jt&&Pt.addToRenderList(m,T),this.info.render.frame++,zt===!0&&dt.beginShadows();const G=f.state.shadowsArray;Ct.render(G,T,O),zt===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=m.opaque,F=m.transmissive;if(f.setupLights(),O.isArrayCamera){const ct=O.cameras;if(F.length>0)for(let yt=0,wt=ct.length;yt<wt;yt++){const Et=ct[yt];Lo(V,F,T,Et)}jt&&Pt.render(T);for(let yt=0,wt=ct.length;yt<wt;yt++){const Et=ct[yt];Po(m,T,Et,Et.viewport)}}else F.length>0&&Lo(V,F,T,O),jt&&Pt.render(T),Po(m,T,O);I!==null&&C===0&&(mt.updateMultisampleRenderTarget(I),mt.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(y,T,O),xt.resetDefaultState(),b=-1,S=null,M.pop(),M.length>0?(f=M[M.length-1],zt===!0&&dt.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function yr(T,O,G,V){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Jt.intersectsSprite(T)){V&&Rt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(tt);const yt=B.update(T),wt=T.material;wt.visible&&m.push(T,yt,wt,G,Rt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Jt.intersectsObject(T))){const yt=B.update(T),wt=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Rt.copy(T.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Rt.copy(yt.boundingSphere.center)),Rt.applyMatrix4(T.matrixWorld).applyMatrix4(tt)),Array.isArray(wt)){const Et=yt.groups;for(let kt=0,Gt=Et.length;kt<Gt;kt++){const Nt=Et[kt],te=wt[Nt.materialIndex];te&&te.visible&&m.push(T,yt,te,G,Rt.z,Nt)}}else wt.visible&&m.push(T,yt,wt,G,Rt.z,null)}}const ct=T.children;for(let yt=0,wt=ct.length;yt<wt;yt++)yr(ct[yt],O,G,V)}function Po(T,O,G,V){const F=T.opaque,ct=T.transmissive,yt=T.transparent;f.setupLightsView(G),zt===!0&&dt.setGlobalState(y.clippingPlanes,G),V&&Z.viewport(P.copy(V)),F.length>0&&vs(F,O,G),ct.length>0&&vs(ct,O,G),yt.length>0&&vs(yt,O,G),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function Lo(T,O,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[V.id]===void 0&&(f.state.transmissionRenderTarget[V.id]=new oi(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?fs:fn,minFilter:ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const ct=f.state.transmissionRenderTarget[V.id],yt=V.viewport||P;ct.setSize(yt.z*y.transmissionResolutionScale,yt.w*y.transmissionResolutionScale);const wt=y.getRenderTarget(),Et=y.getActiveCubeFace(),kt=y.getActiveMipmapLevel();y.setRenderTarget(ct),y.getClearColor($),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),jt&&Pt.render(G);const Gt=y.toneMapping;y.toneMapping=Fn;const Nt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),f.setupLightsView(V),zt===!0&&dt.setGlobalState(y.clippingPlanes,V),vs(T,G,V),mt.updateMultisampleRenderTarget(ct),mt.updateRenderTargetMipmap(ct),j.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let le=0,Se=O.length;le<Se;le++){const ge=O[le],de=ge.object,Bt=ge.geometry,xe=ge.material,ne=ge.group;if(xe.side===en&&de.layers.test(V.layers)){const Ge=xe.side;xe.side=Be,xe.needsUpdate=!0,Do(de,G,V,Bt,xe,ne),xe.side=Ge,xe.needsUpdate=!0,te=!0}}te===!0&&(mt.updateMultisampleRenderTarget(ct),mt.updateRenderTargetMipmap(ct))}y.setRenderTarget(wt,Et,kt),y.setClearColor($,W),Nt!==void 0&&(V.viewport=Nt),y.toneMapping=Gt}function vs(T,O,G){const V=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ct=T.length;F<ct;F++){const yt=T[F],wt=yt.object,Et=yt.geometry,kt=yt.group;let Gt=yt.material;Gt.allowOverride===!0&&V!==null&&(Gt=V),wt.layers.test(G.layers)&&Do(wt,O,G,Et,Gt,kt)}}function Do(T,O,G,V,F,ct){T.onBeforeRender(y,O,G,V,F,ct),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(y,O,G,V,T,ct),F.transparent===!0&&F.side===en&&F.forceSinglePass===!1?(F.side=Be,F.needsUpdate=!0,y.renderBufferDirect(G,O,V,F,T,ct),F.side=zn,F.needsUpdate=!0,y.renderBufferDirect(G,O,V,F,T,ct),F.side=en):y.renderBufferDirect(G,O,V,F,T,ct),T.onAfterRender(y,O,G,V,F,ct)}function xs(T,O,G){O.isScene!==!0&&(O=bt);const V=at.get(T),F=f.state.lights,ct=f.state.shadowsArray,yt=F.state.version,wt=X.getParameters(T,F.state,ct,O,G),Et=X.getProgramCacheKey(wt);let kt=V.programs;V.environment=T.isMeshStandardMaterial?O.environment:null,V.fog=O.fog,V.envMap=(T.isMeshStandardMaterial?Wt:Xt).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,kt===void 0&&(T.addEventListener("dispose",nt),kt=new Map,V.programs=kt);let Gt=kt.get(Et);if(Gt!==void 0){if(V.currentProgram===Gt&&V.lightsStateVersion===yt)return Uo(T,wt),Gt}else wt.uniforms=X.getUniforms(T),T.onBeforeCompile(wt,y),Gt=X.acquireProgram(wt,Et),kt.set(Et,Gt),V.uniforms=wt.uniforms;const Nt=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Nt.clippingPlanes=dt.uniform),Uo(T,wt),V.needsLights=Kc(T),V.lightsStateVersion=yt,V.needsLights&&(Nt.ambientLightColor.value=F.state.ambient,Nt.lightProbe.value=F.state.probe,Nt.directionalLights.value=F.state.directional,Nt.directionalLightShadows.value=F.state.directionalShadow,Nt.spotLights.value=F.state.spot,Nt.spotLightShadows.value=F.state.spotShadow,Nt.rectAreaLights.value=F.state.rectArea,Nt.ltc_1.value=F.state.rectAreaLTC1,Nt.ltc_2.value=F.state.rectAreaLTC2,Nt.pointLights.value=F.state.point,Nt.pointLightShadows.value=F.state.pointShadow,Nt.hemisphereLights.value=F.state.hemi,Nt.directionalShadowMap.value=F.state.directionalShadowMap,Nt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Nt.spotShadowMap.value=F.state.spotShadowMap,Nt.spotLightMatrix.value=F.state.spotLightMatrix,Nt.spotLightMap.value=F.state.spotLightMap,Nt.pointShadowMap.value=F.state.pointShadowMap,Nt.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Gt,V.uniformsList=null,Gt}function Io(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=lr.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function Uo(T,O){const G=at.get(T);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Yc(T,O,G,V,F){O.isScene!==!0&&(O=bt),mt.resetTextureUnits();const ct=O.fog,yt=V.isMeshStandardMaterial?O.environment:null,wt=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Bi,Et=(V.isMeshStandardMaterial?Wt:Xt).get(V.envMap||yt),kt=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Gt=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Nt=!!G.morphAttributes.position,te=!!G.morphAttributes.normal,le=!!G.morphAttributes.color;let Se=Fn;V.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Se=y.toneMapping);const ge=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,de=ge!==void 0?ge.length:0,Bt=at.get(V),xe=f.state.lights;if(zt===!0&&(q===!0||T!==S)){const Ne=T===S&&V.id===b;dt.setState(V,T,Ne)}let ne=!1;V.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==xe.state.version||Bt.outputColorSpace!==wt||F.isBatchedMesh&&Bt.batching===!1||!F.isBatchedMesh&&Bt.batching===!0||F.isBatchedMesh&&Bt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Bt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Bt.instancing===!1||!F.isInstancedMesh&&Bt.instancing===!0||F.isSkinnedMesh&&Bt.skinning===!1||!F.isSkinnedMesh&&Bt.skinning===!0||F.isInstancedMesh&&Bt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Bt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Bt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Bt.instancingMorph===!1&&F.morphTexture!==null||Bt.envMap!==Et||V.fog===!0&&Bt.fog!==ct||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==dt.numPlanes||Bt.numIntersection!==dt.numIntersection)||Bt.vertexAlphas!==kt||Bt.vertexTangents!==Gt||Bt.morphTargets!==Nt||Bt.morphNormals!==te||Bt.morphColors!==le||Bt.toneMapping!==Se||Bt.morphTargetsCount!==de)&&(ne=!0):(ne=!0,Bt.__version=V.version);let Ge=Bt.currentProgram;ne===!0&&(Ge=xs(V,O,F));let ci=!1,Ve=!1,Vi=!1;const ye=Ge.getUniforms(),Ze=Bt.uniforms;if(Z.useProgram(Ge.program)&&(ci=!0,Ve=!0,Vi=!0),V.id!==b&&(b=V.id,Ve=!0),ci||S!==T){Z.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ye.setValue(L,"projectionMatrix",T.projectionMatrix),ye.setValue(L,"viewMatrix",T.matrixWorldInverse);const ke=ye.map.cameraPosition;ke!==void 0&&ke.setValue(L,St.setFromMatrixPosition(T.matrixWorld)),J.logarithmicDepthBuffer&&ye.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ye.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,Ve=!0,Vi=!0)}if(F.isSkinnedMesh){ye.setOptional(L,F,"bindMatrix"),ye.setOptional(L,F,"bindMatrixInverse");const Ne=F.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),ye.setValue(L,"boneTexture",Ne.boneTexture,mt))}F.isBatchedMesh&&(ye.setOptional(L,F,"batchingTexture"),ye.setValue(L,"batchingTexture",F._matricesTexture,mt),ye.setOptional(L,F,"batchingIdTexture"),ye.setValue(L,"batchingIdTexture",F._indirectTexture,mt),ye.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&ye.setValue(L,"batchingColorTexture",F._colorsTexture,mt));const Je=G.morphAttributes;if((Je.position!==void 0||Je.normal!==void 0||Je.color!==void 0)&&ot.update(F,G,Ge),(Ve||Bt.receiveShadow!==F.receiveShadow)&&(Bt.receiveShadow=F.receiveShadow,ye.setValue(L,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ze.envMap.value=Et,Ze.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&O.environment!==null&&(Ze.envMapIntensity.value=O.environmentIntensity),Ve&&(ye.setValue(L,"toneMappingExposure",y.toneMappingExposure),Bt.needsLights&&$c(Ze,Vi),ct&&V.fog===!0&&st.refreshFogUniforms(Ze,ct),st.refreshMaterialUniforms(Ze,V,H,Q,f.state.transmissionRenderTarget[T.id]),lr.upload(L,Io(Bt),Ze,mt)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(lr.upload(L,Io(Bt),Ze,mt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ye.setValue(L,"center",F.center),ye.setValue(L,"modelViewMatrix",F.modelViewMatrix),ye.setValue(L,"normalMatrix",F.normalMatrix),ye.setValue(L,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ne=V.uniformsGroups;for(let ke=0,Mr=Ne.length;ke<Mr;ke++){const Gn=Ne[ke];$t.update(Gn,Ge),$t.bind(Gn,Ge)}}return Ge}function $c(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Kc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,O,G){const V=at.get(T);V.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),at.get(T.texture).__webglTexture=O,at.get(T.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:G,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,O){const G=at.get(T);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const Zc=L.createFramebuffer();this.setRenderTarget=function(T,O=0,G=0){I=T,A=O,C=G;let V=!0,F=null,ct=!1,yt=!1;if(T){const Et=at.get(T);if(Et.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(Et.__webglFramebuffer===void 0)mt.setupRenderTarget(T);else if(Et.__hasExternalTextures)mt.rebindTextures(T,at.get(T.texture).__webglTexture,at.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Nt=T.depthTexture;if(Et.__boundDepthTexture!==Nt){if(Nt!==null&&at.has(Nt)&&(T.width!==Nt.image.width||T.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(T)}}const kt=T.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(yt=!0);const Gt=at.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Gt[O])?F=Gt[O][G]:F=Gt[O],ct=!0):T.samples>0&&mt.useMultisampledRTT(T)===!1?F=at.get(T).__webglMultisampledFramebuffer:Array.isArray(Gt)?F=Gt[G]:F=Gt,P.copy(T.viewport),N.copy(T.scissor),k=T.scissorTest}else P.copy(vt).multiplyScalar(H).floor(),N.copy(At).multiplyScalar(H).floor(),k=Ot;if(G!==0&&(F=Zc),Z.bindFramebuffer(L.FRAMEBUFFER,F)&&V&&Z.drawBuffers(T,F),Z.viewport(P),Z.scissor(N),Z.setScissorTest(k),ct){const Et=at.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Et.__webglTexture,G)}else if(yt){const Et=O;for(let kt=0;kt<T.textures.length;kt++){const Gt=at.get(T.textures[kt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+kt,Gt.__webglTexture,G,Et)}}else if(T!==null&&G!==0){const Et=at.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Et.__webglTexture,G)}b=-1},this.readRenderTargetPixels=function(T,O,G,V,F,ct,yt,wt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et){Z.bindFramebuffer(L.FRAMEBUFFER,Et);try{const kt=T.textures[wt],Gt=kt.format,Nt=kt.type;if(!J.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-V&&G>=0&&G<=T.height-F&&(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+wt),L.readPixels(O,G,V,F,It.convert(Gt),It.convert(Nt),ct))}finally{const kt=I!==null?at.get(I).__webglFramebuffer:null;Z.bindFramebuffer(L.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(T,O,G,V,F,ct,yt,wt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et)if(O>=0&&O<=T.width-V&&G>=0&&G<=T.height-F){Z.bindFramebuffer(L.FRAMEBUFFER,Et);const kt=T.textures[wt],Gt=kt.format,Nt=kt.type;if(!J.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const te=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,te),L.bufferData(L.PIXEL_PACK_BUFFER,ct.byteLength,L.STREAM_READ),T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+wt),L.readPixels(O,G,V,F,It.convert(Gt),It.convert(Nt),0);const le=I!==null?at.get(I).__webglFramebuffer:null;Z.bindFramebuffer(L.FRAMEBUFFER,le);const Se=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Hh(L,Se,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,te),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ct),L.deleteBuffer(te),L.deleteSync(Se),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,O=null,G=0){const V=Math.pow(2,-G),F=Math.floor(T.image.width*V),ct=Math.floor(T.image.height*V),yt=O!==null?O.x:0,wt=O!==null?O.y:0;mt.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,yt,wt,F,ct),Z.unbindTexture()};const Jc=L.createFramebuffer(),jc=L.createFramebuffer();this.copyTextureToTexture=function(T,O,G=null,V=null,F=0,ct=null){ct===null&&(F!==0?(ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ct=F,F=0):ct=0);let yt,wt,Et,kt,Gt,Nt,te,le,Se;const ge=T.isCompressedTexture?T.mipmaps[ct]:T.image;if(G!==null)yt=G.max.x-G.min.x,wt=G.max.y-G.min.y,Et=G.isBox3?G.max.z-G.min.z:1,kt=G.min.x,Gt=G.min.y,Nt=G.isBox3?G.min.z:0;else{const Je=Math.pow(2,-F);yt=Math.floor(ge.width*Je),wt=Math.floor(ge.height*Je),T.isDataArrayTexture?Et=ge.depth:T.isData3DTexture?Et=Math.floor(ge.depth*Je):Et=1,kt=0,Gt=0,Nt=0}V!==null?(te=V.x,le=V.y,Se=V.z):(te=0,le=0,Se=0);const de=It.convert(O.format),Bt=It.convert(O.type);let xe;O.isData3DTexture?(mt.setTexture3D(O,0),xe=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(mt.setTexture2DArray(O,0),xe=L.TEXTURE_2D_ARRAY):(mt.setTexture2D(O,0),xe=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const ne=L.getParameter(L.UNPACK_ROW_LENGTH),Ge=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ci=L.getParameter(L.UNPACK_SKIP_PIXELS),Ve=L.getParameter(L.UNPACK_SKIP_ROWS),Vi=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Gt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Nt);const ye=T.isDataArrayTexture||T.isData3DTexture,Ze=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){const Je=at.get(T),Ne=at.get(O),ke=at.get(Je.__renderTarget),Mr=at.get(Ne.__renderTarget);Z.bindFramebuffer(L.READ_FRAMEBUFFER,ke.__webglFramebuffer),Z.bindFramebuffer(L.DRAW_FRAMEBUFFER,Mr.__webglFramebuffer);for(let Gn=0;Gn<Et;Gn++)ye&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,at.get(T).__webglTexture,F,Nt+Gn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,at.get(O).__webglTexture,ct,Se+Gn)),L.blitFramebuffer(kt,Gt,yt,wt,te,le,yt,wt,L.DEPTH_BUFFER_BIT,L.NEAREST);Z.bindFramebuffer(L.READ_FRAMEBUFFER,null),Z.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(F!==0||T.isRenderTargetTexture||at.has(T)){const Je=at.get(T),Ne=at.get(O);Z.bindFramebuffer(L.READ_FRAMEBUFFER,Jc),Z.bindFramebuffer(L.DRAW_FRAMEBUFFER,jc);for(let ke=0;ke<Et;ke++)ye?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Je.__webglTexture,F,Nt+ke):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Je.__webglTexture,F),Ze?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ne.__webglTexture,ct,Se+ke):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ne.__webglTexture,ct),F!==0?L.blitFramebuffer(kt,Gt,yt,wt,te,le,yt,wt,L.COLOR_BUFFER_BIT,L.NEAREST):Ze?L.copyTexSubImage3D(xe,ct,te,le,Se+ke,kt,Gt,yt,wt):L.copyTexSubImage2D(xe,ct,te,le,kt,Gt,yt,wt);Z.bindFramebuffer(L.READ_FRAMEBUFFER,null),Z.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ze?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(xe,ct,te,le,Se,yt,wt,Et,de,Bt,ge.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(xe,ct,te,le,Se,yt,wt,Et,de,ge.data):L.texSubImage3D(xe,ct,te,le,Se,yt,wt,Et,de,Bt,ge):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ct,te,le,yt,wt,de,Bt,ge.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ct,te,le,ge.width,ge.height,de,ge.data):L.texSubImage2D(L.TEXTURE_2D,ct,te,le,yt,wt,de,Bt,ge);L.pixelStorei(L.UNPACK_ROW_LENGTH,ne),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ge),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ci),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ve),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Vi),ct===0&&O.generateMipmaps&&L.generateMipmap(xe),Z.unbindTexture()},this.initRenderTarget=function(T){at.get(T).__webglFramebuffer===void 0&&mt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?mt.setTextureCube(T,0):T.isData3DTexture?mt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?mt.setTexture2DArray(T,0):mt.setTexture2D(T,0),Z.unbindTexture()},this.resetState=function(){A=0,C=0,I=null,Z.reset(),xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const Bn=8,ni=16,Ut={GRASS_TOP:0,GRASS_SIDE:1,DIRT:2,STONE:3,LOG_SIDE:4,LOG_TOP:5,LEAVES:6,SAND:7,PLANKS:8,COBBLE:9,IRON:10,WATER:11,CONCRETE:12,GLASS:13,CRATE_SIDE:14,CRATE_TOP:15,ASPHALT:16,GRAVEL:17,BEDROCK:18,METAL:19,PATH:20,TALLGRASS:21,FLOWER_R:22,FLOWER_Y:23,MOSS:24,BARK:25};function Gc(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ci(s,t,e){const n=new Vt(s),i=(e()-.5)*t;return n.offsetHSL(0,0,i),"#"+n.getHexString()}function W0(){const s=document.createElement("canvas");s.width=s.height=Bn*ni;const t=s.getContext("2d");return t.imageSmoothingEnabled=!1,{canvas:s,ctx:t}}function Vc(s){return[s%Bn*ni,Math.floor(s/Bn)*ni]}function be(s,t,e,n,i=.09){const[r,a]=Vc(t),o=Gc(n);s.fillStyle=e[0],s.fillRect(r,a,ni,ni);for(let l=0;l<ni;l++)for(let c=0;c<ni;c++){const h=e[Math.floor(o()*e.length)];s.fillStyle=Ci(h,i,o),s.fillRect(r+c,a+l,1,1)}}function X0(s,t,e){const[n,i]=Vc(t),r=Gc(e+t*977),a=(o,l,c)=>{s.fillStyle=c,s.fillRect(n+o,i+l,1,1)};switch(t){case Ut.GRASS_TOP:be(s,t,["#527f34","#5c8a3b","#4b762f","#659342"],e,.07);for(let o=0;o<18;o++)a(r()*16|0,r()*16|0,r()>.5?"#79a54e":"#416a29");break;case Ut.GRASS_SIDE:be(s,t,["#74563a","#7d5e40","#6a4e35"],e,.05);for(let o=0;o<16;o++){const l=3+(r()*3|0);for(let c=0;c<l;c++)a(o,c,Ci(c===l-1?"#527f34":"#5c8a3b",.09,r))}break;case Ut.DIRT:be(s,t,["#74563a","#7d5e40","#6a4e35","#876a48"],e,.06);break;case Ut.STONE:be(s,t,["#83868a","#8e9195","#787b7f","#999ca0"],e,.045);for(let o=0;o<5;o++){let l=r()*16|0,c=r()*16|0;for(let h=0;h<3;h++)a(l,c,"#6c6f73"),l=Math.min(15,l+(r()>.5?1:0)),c=Math.min(15,c+(r()>.3?1:0))}break;case Ut.LOG_SIDE:case Ut.BARK:be(s,t,["#8a6438","#9a7144","#7a5731"],e,.06);for(let o=0;o<16;o++)if(r()>.5)for(let l=0;l<16;l++)r()>.45&&a(o,l,Ci("#67482a",.12,r));for(let o=0;o<12;o++)a(r()*16|0,r()*16|0,"#b08750");break;case Ut.LOG_TOP:be(s,t,["#bb9160","#c69c69","#a98153"],e,.05);for(let o=2;o<8;o+=2)for(let l=0;l<64;l++){const c=l/64*Math.PI*2;a(7.5+Math.cos(c)*o|0,7.5+Math.sin(c)*o|0,"#8d6738")}break;case Ut.LEAVES:be(s,t,["#2f5a26","#3b6b2d","#26481e","#467a35"],e,.17);for(let o=0;o<22;o++)a(r()*16|0,r()*16|0,"#1b3415");for(let o=0;o<3;o++){const l=r()*16|0,c=r()*16|0;s.clearRect(n+l,i+c,1,1)}break;case Ut.SAND:be(s,t,["#c9b57c","#d6c48d","#bdaa72"],e,.06);break;case Ut.PLANKS:be(s,t,["#a37d4c","#b08a56","#957147"],e,.07);for(let o=0;o<16;o+=4){for(let l=0;l<16;l++)a(l,o,"#6f5332"),a(l,(o+3)%16,"#c39a62");for(let l=0;l<16;l++)r()>.8&&a(l,o+1+(r()*2|0),"#8a6942")}break;case Ut.COBBLE:be(s,t,["#6f7276","#7d8084","#666a6d"],e,.06);for(let o=0;o<7;o++){const l=r()*14|0,c=r()*14|0,h=2+(r()*4|0),u=2+(r()*3|0);s.fillStyle=Ci("#8b8e92",.1,r),s.fillRect(n+l,i+c,h,u)}for(let o=0;o<20;o++)a(r()*16|0,r()*16|0,"#4f5256");break;case Ut.IRON:be(s,t,["#7c7f83","#8a8d91","#6e7175"],e,.07);for(let o=0;o<11;o++){const l=r()*15|0,c=r()*15|0;a(l,c,"#c9783d"),a((l+1)%16,c,"#e09a5d"),a(l,(c+1)%16,"#a35a2c")}break;case Ut.WATER:be(s,t,["#2b6690","#32749f","#255b82"],e,.05);for(let o=0;o<16;o+=3)for(let l=0;l<16;l++)(l+o/3|0)%7<2&&a(l,o,"#4a8cb4");break;case Ut.CONCRETE:be(s,t,["#9c9a92","#a8a69e","#8f8d86"],e,.05);for(let o=0;o<10;o++)a(r()*16|0,r()*16|0,"#7d7b75");break;case Ut.GLASS:s.fillStyle="#a9d0d8",s.fillRect(n,i,16,16),s.clearRect(n+2,i+2,12,12),s.fillStyle="#d7eef2",s.fillRect(n+1,i+1,14,1),s.fillRect(n+1,i+14,14,1);break;case Ut.CRATE_SIDE:be(s,t,["#8d6838","#9a7540","#7d5a30"],e,.07);for(let o=0;o<16;o++)a(o,0,"#4d3a1d"),a(o,15,"#4d3a1d");for(let o=0;o<16;o++)a(0,o,"#4d3a1d"),a(15,o,"#4d3a1d");s.fillStyle="#6b5129",s.fillRect(n+2,i+2,12,2),s.fillRect(n+2,i+12,12,2),s.fillStyle="#c9a45e",s.fillRect(n+7,i+6,2,4);break;case Ut.CRATE_TOP:be(s,t,["#9a7540","#a67f47","#8d6838"],e,.06);for(let o=0;o<16;o++)a(o,0,"#4d3a1d"),a(o,15,"#4d3a1d");for(let o=0;o<16;o++)a(0,o,"#4d3a1d"),a(15,o,"#4d3a1d");s.fillStyle="#6b5129",s.fillRect(n+1,i+7,14,2);break;case Ut.ASPHALT:be(s,t,["#3d3f42","#46484b","#343639"],e,.07);for(let o=0;o<12;o++)a(r()*16|0,r()*16|0,"#56585b");break;case Ut.GRAVEL:be(s,t,["#77736c","#837f77","#66635d"],e,.1);for(let o=0;o<18;o++){const l=r()*15|0,c=r()*15|0;s.fillStyle=Ci("#94908a",.16,r),s.fillRect(n+l,i+c,2,2)}break;case Ut.BEDROCK:be(s,t,["#35373a","#2b2d2f","#414346"],e,.09);break;case Ut.METAL:be(s,t,["#5d666d","#68727a","#515a60"],e,.05);for(let o=0;o<4;o++)a(r()*16|0,r()*16|0,"#a8b2b8");break;case Ut.PATH:be(s,t,["#8a7148","#978052","#7b6340"],e,.08);for(let o=0;o<10;o++)a(r()*16|0,r()*16|0,"#a8905f");break;case Ut.TALLGRASS:s.clearRect(n,i,16,16);for(let o=0;o<12;o++){let l=2+(r()*12|0);const c=5+(r()*9|0);for(let h=0;h<c;h++)a(l,15-h,Ci(h>c-4?"#77a447":"#4c7a2f",.12,r))}break;case Ut.FLOWER_R:case Ut.FLOWER_Y:s.clearRect(n,i,16,16);for(let o=0;o<3;o++){const l=4+(r()*9|0);for(let c=0;c<7;c++)a(l,15-c,"#4c7a2f");a(l-1,9,"#5c8c38"),a(l+1,8,"#5c8c38")}s.fillStyle=t===Ut.FLOWER_R?"#c94a3d":"#d9b23a";for(const[o,l]of[[3,6],[4,5],[5,6],[4,7],[10,8],[11,7],[12,8],[11,9],[11,8]])s.fillRect(n+o,i+l,1,1);break;case Ut.MOSS:be(s,t,["#54663a","#5f7342","#495a32"],e,.1);break}}function q0(){const{canvas:s,ctx:t}=W0();t.clearRect(0,0,s.width,s.height);for(let n=0;n<Bn*Bn;n++)X0(t,n,1337);const e=new _r(s);return e.magFilter=$e,e.minFilter=$e,e.generateMipmaps=!1,e.colorSpace=Ue,e.wrapS=e.wrapT=Nn,e}function Y0(s,t=.02){const e=s%Bn,n=Math.floor(s/Bn),i=1/Bn;return{u0:(e+t)*i,v0:1-(n+1-t)*i,u1:(e+1-t)*i,v1:1-(n+t)*i}}const et={AIR:0,GRASS:1,DIRT:2,STONE:3,LOG:4,LEAVES:5,SAND:6,PLANKS:7,COBBLE:8,IRON:9,WATER:10,CONCRETE:11,GLASS:12,CRATE:13,GRAVEL:14,ASPHALT:15,BEDROCK:16,METAL:17,PATH:18,TALLGRASS:19,FLOWER_R:20,FLOWER_Y:21,MOSS:22},so={[et.AIR]:{name:"Air",solid:!1,transparent:!0,tile:Ut.DIRT},[et.GRASS]:{name:"Grass",solid:!0,tiles:[Ut.GRASS_TOP,Ut.DIRT,Ut.GRASS_SIDE],hp:12,power:10,tool:"axe",drop:null,color:5671477},[et.DIRT]:{name:"Dirt",solid:!0,tile:Ut.DIRT,hp:12,power:10,tool:"pick",drop:"dirt",dropCount:1,color:7032625},[et.STONE]:{name:"Stone",solid:!0,tile:Ut.STONE,hp:52,power:7,tool:"pick",drop:"stone",dropCount:2,color:8619658},[et.LOG]:{name:"Wood Log",solid:!0,tiles:[Ut.LOG_TOP,Ut.LOG_TOP,Ut.LOG_SIDE],hp:48,power:6,tool:"axe",drop:"wood",dropCount:3,color:5914662},[et.LEAVES]:{name:"Leaves",solid:!0,tile:Ut.LEAVES,alphaTest:!0,hp:4,power:4,tool:"axe",drop:"wood",dropChance:.18,dropCount:1,color:3498282},[et.SAND]:{name:"Sand",solid:!0,tile:Ut.SAND,hp:10,power:10,tool:"pick",drop:null,color:13482884},[et.PLANKS]:{name:"Wood Planks",solid:!0,tile:Ut.PLANKS,hp:36,power:8,tool:"axe",drop:"planks",dropCount:1,color:10714444},[et.COBBLE]:{name:"Cobblestone",solid:!0,tile:Ut.COBBLE,hp:64,power:8,tool:"pick",drop:"cobble",dropCount:1,color:8093314},[et.IRON]:{name:"Iron Ore",solid:!0,tile:Ut.IRON,hp:110,power:5,tool:"pick",needsPick:!0,drop:"iron",dropCount:2,color:10255464},[et.WATER]:{name:"Water",solid:!1,transparent:!0,water:!0,tile:Ut.WATER,color:3109791},[et.CONCRETE]:{name:"Concrete",solid:!0,tile:Ut.CONCRETE,hp:80,power:6,tool:"pick",drop:"stone",dropCount:1,color:10263186},[et.GLASS]:{name:"Glass",solid:!0,transparent:!0,glass:!0,tile:Ut.GLASS,hp:6,power:30,tool:"pick",color:11129048},[et.CRATE]:{name:"Supply Crate",solid:!0,tiles:[Ut.CRATE_TOP,Ut.CRATE_TOP,Ut.CRATE_SIDE],hp:20,power:12,tool:"any",crate:!0,color:10122560},[et.GRAVEL]:{name:"Gravel",solid:!0,tile:Ut.GRAVEL,hp:20,power:8,tool:"pick",drop:null,color:7828332},[et.ASPHALT]:{name:"Asphalt",solid:!0,tile:Ut.ASPHALT,hp:70,power:6,tool:"pick",drop:null,color:4013890},[et.BEDROCK]:{name:"Bedrock",solid:!0,tile:Ut.BEDROCK,hp:1/0,power:0,tool:"none",color:3487546},[et.METAL]:{name:"Rusted Metal",solid:!0,tile:Ut.METAL,hp:95,power:5,tool:"pick",drop:"iron",dropCount:1,color:6121069},[et.PATH]:{name:"Dirt Path",solid:!0,tile:Ut.PATH,hp:10,power:10,tool:"pick",drop:null,color:9072968},[et.TALLGRASS]:{name:"Tall Grass",solid:!1,transparent:!0,plant:Ut.TALLGRASS,color:5999928},[et.FLOWER_R]:{name:"Poppy",solid:!1,transparent:!0,plant:Ut.FLOWER_R,color:13191741},[et.FLOWER_Y]:{name:"Dandelion",solid:!1,transparent:!0,plant:Ut.FLOWER_Y,color:14266938},[et.MOSS]:{name:"Mossy Stone",solid:!0,tile:Ut.MOSS,hp:60,power:7,tool:"pick",drop:"stone",dropCount:2,color:6255426}};function ve(s){return so[s]||so[et.AIR]}function $0(s){return ve(s).solid===!0}function K0(s){const t=ve(s);return t.solid&&!t.transparent}const jn=16,ro=10,ae=jn*ro,Kn=64,aa=23;function Z0(s){let t=s>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Di(s,t,e){let n=Math.imul(s|0,374761393)^Math.imul(t|0,668265263)^Math.imul(e|0,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function ao(s){return s*s*(3-2*s)}function ds(s,t,e){const n=Math.floor(s),i=Math.floor(t),r=s-n,a=t-i,o=ao(r),l=ao(a),c=Di(n,i,e),h=Di(n+1,i,e),u=Di(n,i+1,e),d=Di(n+1,i+1,e);return c+(h-c)*o+(u+(d-u)*o-(c+(h-c)*o))*l}function tr(s,t,e,n){const i=Math.floor(e),r=e-i,a=ao(r),o=ds(s+i*17.13,t-i*9.71,n+i*131),l=ds(s+(i+1)*17.13,t-(i+1)*9.71,n+(i+1)*131);return o+(l-o)*a}function Xl(s,t,e,n=4){let i=0,r=1,a=1,o=0;for(let l=0;l<n;l++)i+=ds(s*a,t*a,e+l*1013)*r,o+=r,r*=.5,a*=2.03;return i/o}const J0=[{n:[0,1,0],c:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]],shade:1,tile:0},{n:[0,-1,0],c:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],shade:.5,tile:1},{n:[0,0,1],c:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],shade:.8,tile:2},{n:[0,0,-1],c:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],shade:.8,tile:2},{n:[1,0,0],c:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],shade:.9,tile:2},{n:[-1,0,0],c:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],shade:.9,tile:2}],j0=[.55,.72,.86,1];class Q0{constructor(t,e=20250707){this.scene=t,this.seed=e,this.chunks=new Map,this.edits=new Map,this.dirty=new Set,this.campfires=[],this.baseHeight=new Int16Array(ae*ae),this.atlas=q0(),this.group=new Ee,this.group.name="world",t.add(this.group),this.opaqueMat=new Le({map:this.atlas,vertexColors:!0,alphaTest:.25}),this.waterMat=new Le({map:this.atlas,vertexColors:!0,transparent:!0,opacity:.68,depthWrite:!1,side:en}),this.glassMat=new Le({map:this.atlas,vertexColors:!0,transparent:!0,opacity:.38,depthWrite:!1,side:en}),this.plantMat=new Le({map:this.atlas,vertexColors:!0,alphaTest:.4,side:en}),this.SPAWN={x:80.5,y:0,z:80.5}}key(t,e){return t+","+e}getChunk(t,e){return this.chunks.get(this.key(t,e))}getBlock(t,e,n){if(e<0||e>=Kn||(t=Math.floor(t),n=Math.floor(n),t<0||n<0||t>=ae||n>=ae))return et.AIR;const i=this.chunks.get(this.key(t>>4,n>>4));return i?i.data[e<<8|(n&15)<<4|t&15]:et.AIR}setRaw(t,e,n,i){if(e<0||e>=Kn||(t=Math.floor(t),n=Math.floor(n),t<0||n<0||t>=ae||n>=ae))return;const r=this.chunks.get(this.key(t>>4,n>>4));r&&(r.data[e<<8|(n&15)<<4|t&15]=i)}worldToChunk(t,e){return[t>>4,e>>4]}setBlock(t,e,n,i,r=!0){if(t=Math.floor(t),e=Math.floor(e),n=Math.floor(n),e<0||e>=Kn||t<0||n<0||t>=ae||n>=ae)return!1;this.setRaw(t,e,n,i),r&&this.edits.set(`${t},${e},${n}`,i);const a=t>>4,o=n>>4;this.dirty.add(this.key(a,o));const l=t&15,c=n&15;return l===0&&this.dirty.add(this.key(a-1,o)),l===15&&this.dirty.add(this.key(a+1,o)),c===0&&this.dirty.add(this.key(a,o-1)),c===15&&this.dirty.add(this.key(a,o+1)),!0}generate(){const t=Z0(this.seed);for(let e=0;e<ro;e++)for(let n=0;n<ro;n++)this.chunks.set(this.key(e,n),{data:new Uint8Array(jn*jn*Kn),cx:e,cz:n,mesh:null,tmesh:null,pmesh:null});for(let e=0;e<ae;e++)for(let n=0;n<ae;n++){const i=Xl(e*.0085,n*.0085,this.seed,4),r=Xl(e*.031,n*.031,this.seed+77,3);let a=22+i*16+r*5;a<9&&(a=9),this.baseHeight[n*ae+e]=Math.round(a)}this.flattenZone(80,80,14,30),this.flattenZone(80,60.5,12,30),this.flattenZone(80,71,5,29.6),this.carvePond(65,71,7.5,27.5);for(let e=0;e<ae;e++)for(let n=0;n<ae;n++){const i=this.baseHeight[n*ae+e],r=i<=aa+1,a=r?et.SAND:et.GRASS;for(let o=0;o<=i;o++){let l=et.STONE;if(o===i?l=a:o>=i-3&&(l=r?et.SAND:et.DIRT),o===0&&(l=et.BEDROCK),o>2&&o<i-2){const c=tr(e*.075,o*.11,n*.075,this.seed+311),h=tr(e*.045,o*.07+12,n*.045,this.seed+913);(c>.68||h>.72&&o<i-6)&&(l=et.AIR)}l===et.STONE&&o<i-3&&(tr(e*.12,o*.16,n*.12,this.seed+505)>.73&&o<30?l=et.IRON:tr(e*.09,o*.13,n*.09,this.seed+88)>.76&&(l=et.GRAVEL)),this.setRaw(e,o,n,l)}if(i<aa)for(let o=i+1;o<=aa;o++)this.setRaw(e,o,n,et.WATER)}this.fillPond(65,71,7.5,27.5),this.carvePath(80,80,80,65),this.buildCabin(77,57),this.placeTrees(t),this.placeRocks(t),this.placePlants(t),this.buildCampfire(82.5,68.6),this.SPAWN.y=this.surfaceHeight(80,80)+2.2;for(const[e,n]of this.edits){const[i,r,a]=e.split(",").map(Number);this.setRaw(i,r,a,n)}this.rebuildAll()}reset(){for(const t of this.chunks.values())for(const e of["mesh","tmesh","pmesh"]){const n=t[e];n&&(this.group.remove(n),n.geometry.dispose())}for(const t of this.campfires)this.scene.remove(t.group),t.group.traverse(e=>{e.geometry&&e.geometry.dispose()});this.chunks.clear(),this.edits.clear(),this.dirty.clear(),this.campfires=[],this.generate()}flattenZone(t,e,n,i){for(let r=Math.max(0,t-n|0);r<Math.min(ae,t+n);r++)for(let a=Math.max(0,e-n|0);a<Math.min(ae,e+n);a++){const o=Math.hypot(r-t,a-e);if(o>n)continue;const l=o<n*.7?1:1-(o-n*.7)/(n*.3),c=a*ae+r;this.baseHeight[c]=Math.round(this.baseHeight[c]*(1-l)+i*l)}}carvePond(t,e,n,i){for(let r=Math.max(0,t-n-4|0);r<Math.min(ae,t+n+4);r++)for(let a=Math.max(0,e-n-4|0);a<Math.min(ae,e+n+4);a++){const o=Math.hypot(r-t,a-e);if(o>n+3)continue;const l=a*ae+r;if(o<n){const c=2+(1-o/n)*3.2;this.baseHeight[l]=Math.min(this.baseHeight[l],Math.round(i-c))}else{const c=Math.min(this.baseHeight[l],Math.round(i+.4));this.baseHeight[l]=Math.max(c,Math.round(i))}}}fillPond(t,e,n,i){const r=n+3;for(let a=Math.max(0,t-r|0);a<Math.min(ae,t+r);a++)for(let o=Math.max(0,e-r|0);o<Math.min(ae,e+r);o++){const l=Math.hypot(a-t,o-e);if(l>r)continue;const c=this.baseHeight[o*ae+a];if(c<i){for(let h=c+1;h<=i;h++)this.setRaw(a,h,o,et.WATER);for(let h=c-1;h<=c+1;h++)this.getBlock(a,h,o)!==et.WATER&&this.setRaw(a,h,o,et.SAND)}else l<n+2.2&&(this.setRaw(a,c,o,et.SAND),this.setRaw(a,c+1,o,et.AIR),this.setRaw(a,c+2,o,et.AIR))}}carvePath(t,e,n,i){const r=Math.max(Math.abs(n-t),Math.abs(i-e))*2;for(let a=0;a<=r;a++){const o=a/r,l=Math.round(t+(n-t)*o),c=Math.round(e+(i-e)*o);for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++){if(Math.abs(h)+Math.abs(u)>1)continue;const d=this.surfaceHeight(l+h,c+u);this.getBlock(l+h,d,c+u)===et.GRASS&&this.setRaw(l+h,d,c+u,et.PATH)}}}buildCabin(t,e){for(let l=t;l<t+9;l++)for(let c=e;c<e+8;c++){for(let h=29;h<=38;h++)this.setRaw(l,h,c,et.AIR);for(let h=0;h<3;h++)for(let u=0;u<3;u++)this.setRaw(l,29-u,c,et.DIRT)}for(let l=t;l<t+9;l++)for(let c=e;c<e+8;c++)l>t&&l<t+9-1&&c>e&&c<e+8-1&&(l+c)%7!==3&&this.setRaw(l,30,c,et.PLANKS);const a=(l,c,h,u)=>{const d=(l===t||l===t+9-1)&&(h===e||h===e+8-1);let p=et.PLANKS;d?p=et.LOG:(c===31||c===34||u%17===0)&&(p=et.COBBLE),(l+h+c)%13!==0&&this.setRaw(l,c,h,p)};let o=0;for(let l=31;l<=34;l++){for(let c=t;c<t+9;c++){c>t+4&&l<33||a(c,l,e,o++);const h=e+8-1;c>=t+3&&c<=t+5&&l<=33?l===34&&this.setRaw(c,l,h,et.COBBLE):a(c,l,h,o++)}for(let c=e+1;c<e+8-1;c++)c>e+5&&l>32||a(t,l,c,o++),c>e+2&&c<e+5&&l===32||this.setRaw(t+9-1,l,c,o%6===0?et.AIR:et.PLANKS),o++}for(const[l,c]of[[t+2,e],[t+6,e],[t,e+3],[t+9-1,e+2],[t+9-1,e+5]])this.setRaw(l,32,c,et.AIR);for(let l=t-1;l<=t+9;l++)for(let c=e-1;c<=e+8;c++){const h=l===t-1||l===t+9||c===e-1||c===e+8,u=ds(l*1.7,c*1.7,4)>.68||l>t+5&&c<e+3;h?u||this.setRaw(l,35,c,et.PLANKS):u||this.setRaw(l,35,c,ds(l*2.1,c*2.1,9)>.55?et.COBBLE:et.PLANKS)}for(let l=t+1;l<=t+9-2;l++)for(let c=e+8;c<=e+8+2;c++)(l+c)%9!==0&&this.setRaw(l,35,c,et.PLANKS);for(const[l,c]of[[t+1,e+8+2],[t+9-2,e+8+2]])for(let h=31;h<=34;h++)this.setRaw(l,h,c,et.LOG);for(let l=35;l<=37;l++)this.setRaw(t+6,l,e+2,l===37?et.MOSS:et.COBBLE);this.setRaw(t+2,32,e,et.GLASS),this.setRaw(t+9-1,32,e+5,et.GLASS);for(const[l,c]of[[t+2,e+2],[t+9-3,e+2],[t+2,e+8-3]])for(let h=31;h<=34;h++)this.setRaw(l,h,c,et.LOG);this.setRaw(t+2,31,e+5,et.CRATE),this.setRaw(t+6,31,e+2,et.CRATE),this.setRaw(t+7,31,e+5,et.METAL),this.setRaw(t+4,31,e+2,et.COBBLE),this.setRaw(t-1,31,e+6,et.GRAVEL)}addTree(t,e,n,i,r){const a=Math.round(t),o=Math.round(e),l=r??this.surfaceHeight(a,o);if(this.getBlock(a,l,o)!==et.GRASS)return;const h=n==="pine"?6+Math.floor(i()*3):4+Math.floor(i()*3);for(let u=1;u<=h;u++)this.setRaw(a,l+u,o,et.LOG);if(n==="pine"){for(let u=0;u<5;u++){const d=Math.max(0,2-Math.floor(u*.55)),p=l+h-3+u;for(let g=-d;g<=d;g++)for(let _=-d;_<=d;_++)Math.abs(g)+Math.abs(_)>d+1||this.getBlock(a+g,p,o+_)===et.AIR&&this.setRaw(a+g,p,o+_,et.LEAVES)}this.setRaw(a,l+h+1,o,et.LEAVES)}else{const u=l+h;for(let d=-2;d<=2;d++){const p=d===2?1:2;for(let g=-p;g<=p;g++)for(let _=-p;_<=p;_++)Math.abs(g)===p&&Math.abs(_)===p&&i()>.5||this.getBlock(a+g,u+d,o+_)===et.AIR&&this.setRaw(a+g,u+d,o+_,et.LEAVES)}}}placeTrees(t){this.addTree(72,67,"oak",t),this.addTree(91,66,"pine",t),this.addTree(69,79,"oak",t),this.addTree(93,77,"oak",t),this.addTree(87,52,"pine",t),this.addTree(71,52,"oak",t);let e=0;for(;e++<220;){const n=8+t()*(ae-16),i=8+t()*(ae-16);if(Math.hypot(n-80,i-80)<17||Math.abs(n-80)<11&&i>56&&i<82||Math.hypot(n-65,i-71)<10||Math.hypot(n-80,i-60.5)<9)continue;const r=this.surfaceHeight(n,i);this.getBlock(n,r,i)===et.GRASS&&this.getBlock(n,r+1,i)===et.AIR&&this.addTree(n,i,t()>.62?"pine":"oak",t,r)}}placeRocks(t){const e=[[88,73,4],[70,62,3],[58,84,4],[97,88,3]];for(const[n,i,r]of e){const a=this.surfaceHeight(n,i);for(let o=-r;o<=r;o++)for(let l=-r;l<=r;l++)for(let c=0;c<r-1;c++)Math.hypot(o,l,c*.8)<=r-.4&&this.setRaw(n+o,a+c,i+l,t()>.85?et.MOSS:et.STONE)}}placePlants(t){for(let e=2;e<ae-2;e++)for(let n=2;n<ae-2;n++){const i=this.surfaceHeight(e,n);if(this.getBlock(e,i,n)!==et.GRASS||this.getBlock(e,i+1,n)!==et.AIR||this.getBlock(e,i+1,n)===et.WATER)continue;const r=t();r<.1?this.setRaw(e,i+1,n,et.TALLGRASS):r<.118&&this.setRaw(e,i+1,n,t()>.5?et.FLOWER_R:et.FLOWER_Y)}}buildCampfire(t,e){const n=this.surfaceHeight(t,e),i=new Ee;i.position.set(t+.5,n+1.02,e+.5);const r=new Le({color:7040368});for(let d=0;d<8;d++){const p=d/8*Math.PI*2,g=new Yt(new Eo(.22),r);g.position.set(Math.cos(p)*.72,0,Math.sin(p)*.72),g.rotation.set(d,d*1.7,0),i.add(g)}const a=new Le({color:4928541});for(let d=0;d<4;d++){const p=new Yt(new tn(.09,.11,1.05,5),a);p.rotation.z=Math.PI/2,p.rotation.y=d/4*Math.PI,p.position.y=.13,i.add(p)}const o=new si({color:16747050,transparent:!0,opacity:.8,blending:Ii,depthWrite:!1}),l=new si({color:16766826,transparent:!0,opacity:.85,blending:Ii,depthWrite:!1}),c=new Yt(new ri(.22,.62,6,1,!0),o);c.position.y=.38;const h=new Yt(new ri(.11,.4,5,1,!0),l);h.position.y=.31,i.add(c,h);const u=new mr(16747068,9,13,1.7);u.position.y=1.1,i.add(u),this.scene.add(i),this.campfires.push({group:i,flame:c,inner:h,light:u,seed:Math.random()*10}),this.setBlock(84.9,n+1,70.4,et.LOG,!1),this.setBlock(84.7,n+1,66.8,et.LOG,!1),this.buildTorch(78.1,n+1.12,66.6),this.buildTorch(83.4,n+1.12,66.6),this.buildTorch(76.6,31.12,62.4)}buildTorch(t,e,n){const i=new Ee;i.position.set(t,e,n);const r=new Yt(new tn(.045,.055,.62,5),new Le({color:7031338}));r.position.y=.18,r.rotation.z=.18;const a=new Yt(new tn(.09,.07,.15,6),new Le({color:2827296}));a.position.set(-.05,.5,0);const o=new Yt(new ri(.1,.28,5),new si({color:16753980,transparent:!0,opacity:.9,blending:Ii,depthWrite:!1}));o.position.set(-.05,.68,0);const l=new mr(16751429,6,11,1.8);l.position.set(-.05,.7,0),i.add(r,a,o,l),this.scene.add(i),this.campfires.push({group:i,flame:o,inner:o,light:l,seed:Math.random()*10,torch:!0})}surfaceHeight(t,e){if(t=Math.floor(t),e=Math.floor(e),t<0||e<0||t>=ae||e>=ae)return 0;for(let n=Kn-1;n>=0;n--){const i=this.getBlock(t,n,e);if(i!==et.AIR&&!ve(i).water&&!ve(i).plant)return n}return 0}rebuildAll(){for(const t of this.chunks.values())this.buildChunk(t);this.dirty.clear()}flushDirty(t=3){let e=0;for(const n of this.dirty){const i=this.chunks.get(n);if(i&&this.buildChunk(i),this.dirty.delete(n),++e>=t)break}}buildChunk(t){const e=[],n=[],i=[],r=[],a=[],o=[],l=[],c=[],h=[],u=[],d=[],p=[],g=t.cx*jn,_=t.cz*jn,m={},f=C=>m[C]||(m[C]=Y0(C)),E=(C,I,b)=>K0(this.getBlock(C,I,b)),M=(C,I,b,S,P,N,k,$=1)=>{const{positions:W,normals:Y,uvs:Q,colors:H}=C,rt=f(k.tile!==void 0?k.tile:k.tiles[N.tile]),pt=[[rt.u0,rt.v0],[rt.u1,rt.v0],[rt.u1,rt.v1],[rt.u0,rt.v1]],vt=[0,1,2,0,2,3],At=[];for(let zt=0;zt<4;zt++){const q=N.c[zt],tt=b+q[0],St=S+q[1],Rt=P+q[2];At.push([tt,St,Rt,q])}const Ot=[];for(let zt=0;zt<4;zt++){const q=At[zt][3];let tt=0,St=0,Rt=0;const bt=[0,1,2].filter(at=>N.n[at]===0),jt=bt[0],oe=bt[1],L=q[jt]*2-1,it=q[oe]*2-1,j=[0,0,0];j[jt]=L;const J=[0,0,0];J[oe]=it;const Z=[b+N.n[0],S+N.n[1],P+N.n[2]];tt=E(Z[0]+j[0],Z[1]+j[1],Z[2]+j[2])?1:0,St=E(Z[0]+J[0],Z[1]+J[1],Z[2]+J[2])?1:0,Rt=E(Z[0]+j[0]+J[0],Z[1]+j[1]+J[1],Z[2]+j[2]+J[2])?1:0;let ut=3;tt&&St?ut=0:ut=3-(tt+St+Rt),Ot.push(j0[Math.max(0,ut)])}const Jt=.95+Di(b,P,this.seed+S)*.1;for(const zt of vt){const q=At[zt];W.push(q[0],q[1],q[2]),Y.push(N.n[0],N.n[1],N.n[2]),Q.push(pt[zt][0],pt[zt][1]);const tt=Math.min(1.25,N.shade*Ot[zt]*Jt*$);H.push(tt,tt,tt)}},y={positions:e,normals:n,uvs:i,colors:r},R={positions:a,normals:o,uvs:l,colors:c},A={positions:h,normals:u,uvs:d,colors:p};for(let C=0;C<Kn;C++)for(let I=0;I<jn;I++)for(let b=0;b<jn;b++){const S=t.data[C<<8|I<<4|b];if(S===et.AIR)continue;const P=so[S];if(!P)continue;const N=g+b,k=_+I;if(P.plant){const H=f(P.plant),rt=Di(N,k,7)*.15,pt=[[[.12,0,.5],[.88,0,.5],[.88,1,.5],[.12,1,.5]],[[.5,0,.12],[.5,0,.88],[.5,1,.88],[.5,1,.12]]];for(const vt of pt)for(const At of[0,1,2,0,2,3]){const Ot=vt[At];h.push(N+Ot[0],C+Ot[1]+rt,k+Ot[2]),u.push(0,1,0),d.push(At===1||At===2?H.u1:H.u0,At>=2?H.v1:H.v0),p.push(.95,.95,.95)}continue}const $=P.water||P.glass?R:y,W=this.baseHeight[k*ae+N]||30,Q=C<W-2?Math.max(.34,1-(W-C)*.05):1;for(const H of J0){const rt=N+H.n[0],pt=C+H.n[1],vt=k+H.n[2],At=this.getBlock(rt,pt,vt),Ot=ve(At);if(!(H.n[1]===1&&C===Kn-1)){if(P.water){if(At===et.WATER||Ot.solid&&!Ot.transparent)continue}else if(P.glass){if(At===et.GLASS||Ot.solid&&!Ot.transparent)continue}else if(At!==et.AIR&&(Ot.solid||Ot.plant))continue;M($,0,N,C,k,H,P,Q)}}}this.applyMesh(t,"mesh",y,this.opaqueMat),this.applyMesh(t,"tmesh",R,this.waterMat),this.applyMesh(t,"pmesh",A,this.plantMat),t.mesh&&(t.mesh.castShadow=!0,t.mesh.receiveShadow=!0)}applyMesh(t,e,n,i){let r=t[e];if(!n.positions.length){r&&(this.group.remove(r),r.geometry.dispose(),t[e]=null);return}const a=new Ae;a.setAttribute("position",new pe(n.positions,3)),a.setAttribute("normal",new pe(n.normals,3)),a.setAttribute("uv",new pe(n.uvs,2)),a.setAttribute("color",new pe(n.colors,3)),a.computeBoundingSphere(),r?(r.geometry.dispose(),r.geometry=a):(r=new Yt(a,i),r.name="chunk-"+e,r.matrixAutoUpdate=!1,this.group.add(r),t[e]=r)}raycast(t,e,n=6){let i=Math.floor(t.x),r=Math.floor(t.y),a=Math.floor(t.z);const o=e.x>0?1:-1,l=e.y>0?1:-1,c=e.z>0?1:-1,h=Math.abs(1/(e.x||1e-9)),u=Math.abs(1/(e.y||1e-9)),d=Math.abs(1/(e.z||1e-9)),p=M=>M-Math.floor(M);let g=((e.x>0?1-p(t.x):p(t.x))||1e-9)*h,_=((e.y>0?1-p(t.y):p(t.y))||1e-9)*u,m=((e.z>0?1-p(t.z):p(t.z))||1e-9)*d,f=[0,0,0],E=0;for(let M=0;M<200&&E<=n;M++){const y=this.getBlock(i,r,a);if(ve(y).solid)return{x:i,y:r,z:a,id:y,normal:f,dist:E,point:new D(t.x+e.x*E,t.y+e.y*E,t.z+e.z*E)};g<_&&g<m?(i+=o,E=g,g+=h,f=[-o,0,0]):_<m?(r+=l,E=_,_+=u,f=[0,-l,0]):(a+=c,E=m,m+=d,f=[0,0,-c])}return null}collide(t,e,n){const i=e.x/2,r=Math.floor(t.x-i),a=Math.floor(t.x+i),o=Math.floor(t.y),l=Math.floor(t.y+e.y),c=Math.floor(t.z-i),h=Math.floor(t.z+i);let u=!1,d=!1,p=!1;for(let g=r;g<=a;g++)for(let _=o;_<=l;_++)for(let m=c;m<=h;m++)$0(this.getBlock(g,_,m))&&n.y;return{grounded:u,hitX:d,hitZ:p}}isWaterAt(t,e,n){return this.getBlock(t,e,n)===et.WATER}serializeEdits(){return Array.from(this.edits.entries())}loadEdits(t){for(const[e,n]of t){const[i,r,a]=e.split(",").map(Number);this.edits.set(e,n),this.setRaw(i,r,a,n)}for(const e of this.chunks.values())this.dirty.add(this.key(e.cx,e.cz));this.flushDirty(999)}update(t,e){for(const n of this.campfires){const i=Math.sin(e*9+n.seed)*.5+Math.sin(e*21+n.seed*2)*.3;n.flame.scale.set(1+i*.12,1+i*.18,1+i*.12),n.inner.scale.setScalar(1+i*.2),n.light.intensity=12+i*4,n.flame.rotation.y=e*.7}}}const ql=1.62,Ri=1.8,_e=.34;class tg{constructor(t,e){this.camera=t,this.world=e,this.pos=new D(e.SPAWN.x,e.SPAWN.y,e.SPAWN.z),this.vel=new D,this.yaw=-.12,this.pitch=-.06,this.onGround=!1,this.inWater=!1,this.headInWater=!1,this.health=100,this.maxHealth=100,this.stamina=100,this.maxStamina=100,this.hunger=100,this.thirst=100,this.level=1,this.xp=0,this.xpNext=100,this.fallStart=null,this.bob=0,this.shake=0,this.fov=75,this.dead=!1,this.swing=0,this.swingSpeed=1,this.recoil=0,this.viewGroup=new Ee,this.camera.add(this.viewGroup),this.held=new Map,this.currentItem="axe",this.buildBlock="planks",this.buildMaterials={planks:"planks_block",cobble:"cobble_block"},this.heldModels={},this.buildModels={},this.muzzle=null,this.buildHeldModels(),this.selectItem("axe"),this.syncCamera(0)}buildHeldModels(){const t=(Jt,zt=1)=>new Le({color:Jt,flatShading:!0}),e=t(9069110),n=t(6045474),i=t(9277588),r=t(10134699),a=t(3159354),o=t(2761504),l=new Ee,c=new Yt(new ee(.05,.8,.05),e);c.position.set(0,.02,0),c.rotation.z=-.18;const h=new Pc;h.moveTo(-.03,-.085),h.lineTo(.15,-.155),h.lineTo(.24,-.03),h.lineTo(.24,.03),h.lineTo(.15,.155),h.lineTo(-.03,.085),h.closePath();const u=new wo(h,{depth:.065,bevelEnabled:!1});u.translate(0,0,-.0325);const d=new Yt(u,i);d.position.set(.045,.35,0),d.rotation.z=-.18;const p=new Yt(new ee(.03,.28,.075),r);p.position.set(.275,.39,0),p.rotation.z=-.18;const g=new Yt(new ee(.08,.055,.08),n);g.position.set(.015,.3,0),l.add(c,d,p,g);const _=new Ee,m=new Yt(new ee(.05,.84,.05),e);m.position.y=.02,m.rotation.z=-.18;const f=new Yt(new ee(.38,.06,.06),i);f.position.set(.02,.37,0),f.rotation.z=-.18,f.rotation.y=.1;const E=new Yt(new ri(.042,.16,4),r);E.rotation.z=-Math.PI/2,E.position.set(.26,.32,0);const M=new Yt(new ri(.042,.14,4),r);M.rotation.z=Math.PI/2,M.position.set(-.21,.41,0),_.add(m,f,E,M);const y=new Ee,R=new Yt(new ee(.12,.13,.42),a);R.position.set(0,.13,-.1);const A=new Yt(new tn(.032,.032,.3,8),r);A.rotation.x=Math.PI/2,A.position.set(0,.15,-.28);const C=new Yt(new ee(.1,.24,.13),o);C.position.set(0,0,.03),C.rotation.x=-.22;const I=new Yt(new ee(.04,.07,.05),r);I.position.set(0,.03,-.05);const b=new Yt(new ee(.03,.035,.05),r);b.position.set(0,.205,.05),y.add(R,A,C,I,b);const S=new Ee,P=new Yt(new tn(.11,.11,.24,12),t(11749941));P.rotation.z=.2;const N=new Yt(new tn(.112,.112,.12,12),t(14205851));N.rotation.z=.2,P.add(N),S.add(P);const k=new Yt(new ee(.05,.02,.3),r);k.position.set(.09,.13,0),k.rotation.z=.3,S.add(k);const $=new Ee,W=new Yt(new tn(.075,.09,.34,10),new Le({color:8373464,transparent:!0,opacity:.75}));W.rotation.z=.18;const Y=new Yt(new tn(.04,.04,.07,8),t(3108746));Y.position.y=.2,Y.rotation.z=.18,$.add(W,Y);const Q=new Ee,H=new Yt(new tn(.11,.11,.16,12),t(15261903));H.rotation.z=Math.PI/2;const rt=new Yt(new ee(.04,.012,.3),t(15920349));rt.position.set(.02,-.06,.12),Q.add(H,rt);const pt=Jt=>{const zt=new Ee,q=new Yt(new ee(.26,.26,.26),new Le({color:Jt,flatShading:!0}));q.rotation.set(.35,.6,.1);const tt=new _u(new vu(q.geometry),new yo({color:0,transparent:!0,opacity:.22}));return tt.rotation.copy(q.rotation),zt.add(q,tt),zt};this.heldModels={axe:l,pick:_,pistol:y,food:S,water:$,bandage:Q},this.buildModels={planks:pt(10714444),cobble:pt(8093314)},this.viewRig=new Ee,this.viewRig.position.set(.37,-.4,-.72),this.viewRig.scale.setScalar(.55),this.viewGroup.add(this.viewRig),this.modelBase={axe:[.02,.1,0],pick:[.02,.1,0],pistol:[.02,.2,0],food:[.02,.17,0],water:[.02,.16,0],bandage:[.02,.19,0],planks:[.02,.16,0],cobble:[.02,.16,0]};for(const Jt of[...Object.values(this.heldModels),...Object.values(this.buildModels)])Jt.visible=!1,Jt.position.set(0,0,0),this.viewRig.add(Jt);const vt=new Yt(new ee(.16,.16,.5),t(12159587));vt.position.set(.02,-.42,.22),vt.rotation.set(.42,.1,.34);const At=new Yt(new ee(.2,.2,.26),t(5069381));At.position.set(-.04,-.53,.4),At.rotation.set(.42,.1,.34),this.viewRig.add(vt,At);const Ot=new mr(16761963,0,7,2);Ot.position.set(0,.05,-.35),this.viewGroup.add(Ot),this.muzzle=Ot}selectItem(t){this.currentItem=t;for(const[e,n]of Object.entries(this.heldModels))n.visible=e===t;for(const[e,n]of Object.entries(this.buildModels))n.visible=t==="block"&&e===this.buildBlock;this.swing=0}selectBuildBlock(t){this.buildBlock=t,this.currentItem==="block"&&this.selectItem("block")}getHeldModel(){return this.currentItem==="block"?this.buildModels[this.buildBlock]:this.heldModels[this.currentItem]}startSwing(t=1){this.swing=1e-4,this.swingSpeed=t}syncCamera(t){const e=(Math.random()-.5)*this.shake*.03,n=(Math.random()-.5)*this.shake*.03;Math.abs(this.camera.fov-this.fov)>.01&&(this.camera.fov=this.fov,this.camera.updateProjectionMatrix()),this.camera.position.set(this.pos.x,this.pos.y+ql+Math.sin(this.bob*2)*.035,this.pos.z),this.camera.rotation.set(0,0,0),this.camera.rotateY(this.yaw+e),this.camera.rotateX(this.pitch+this.recoil+n),this.shake=Math.max(0,this.shake-t*4)}update(t,e,n){if(this.dead){this.syncCamera(t);return}const i=new D(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),r=new D(Math.cos(this.yaw),0,-Math.sin(this.yaw));let a=0,o=0;n&&(e.forward&&(a+=i.x,o+=i.z),e.back&&(a-=i.x,o-=i.z),e.left&&(a-=r.x,o-=r.z),e.right&&(a+=r.x,o+=r.z));const l=a!==0||o!==0,c=Math.hypot(a,o);c>0&&(a/=c,o/=c);const h=this.world.getBlock(this.pos.x,this.pos.y+.2,this.pos.z),u=this.inWater;this.inWater=ve(h).water===!0,this.headInWater=ve(this.world.getBlock(this.pos.x,this.pos.y+ql,this.pos.z)).water===!0,this.inWater&&!u&&this.vel.y<-4&&(this.vel.y*=.35),this.inWater=this.inWater||ve(this.world.getBlock(this.pos.x,this.pos.y+1,this.pos.z)).water===!0;const d=e.sprint&&l&&this.stamina>2&&e.forward&&!this.inWater;let p=this.inWater?3:d?6.5:4.3;(this.currentItem==="food"||this.currentItem==="water")&&(p*=.9),e.sprint&&d&&(this.stamina=Math.max(0,this.stamina-t*11)),(!e.sprint||!l)&&(this.stamina=Math.min(this.maxStamina,this.stamina+t*(this.onGround?17:6))),this.stamina<=0&&(p=Math.min(p,3.7));const g=this.onGround?26:9,_=a*p,m=o*p;this.vel.x+=(_-this.vel.x)*Math.min(1,g*t),this.vel.z+=(m-this.vel.z)*Math.min(1,g*t),this.inWater?(this.vel.y-=6*t,this.vel.y<-2.2&&(this.vel.y=-2.2),e.jump&&(this.vel.y=3.2),this.headInWater&&(this.vel.y=Math.max(this.vel.y,e.jump?3.6:-.4))):(this.vel.y-=27*t,this.vel.y<-32&&(this.vel.y=-32),e.jump&&this.onGround&&(this.vel.y=8.7,this.onGround=!1,this.stamina=Math.max(0,this.stamina-5))),this.pos.y;let f=this.moveAxis("x",this.vel.x*t);!f&&this.onGround&&this.tryStep(this.vel.x*t,0)&&(f=!0);let E=this.moveAxis("z",this.vel.z*t);if(!E&&this.onGround&&this.tryStep(0,this.vel.z*t)&&(E=!0),f||(this.vel.x*=.2),E||(this.vel.z*=.2),this.vel.y<0,this.pos.y+=this.vel.y*t,this.onGround=!1,this.collidesY()){if(this.vel.y<=0){if(this.pos.y=Math.ceil(this.pos.y*1e3)/1e3,this.resolveYDown(),this.onGround=!0,this.fallStart!==null){const A=this.fallStart-this.pos.y;A>3.4&&!this.inWater&&this.onFallDamage?.(A),this.fallStart=null}}else this.resolveYUp();this.vel.y=0}!this.onGround&&this.vel.y<0&&this.fallStart===null&&!this.inWater&&(this.fallStart=this.pos.y),this.pos.x=Math.max(2,Math.min(this.world.SPAWN.x*2-2,this.pos.x)),this.pos.z=Math.max(2,Math.min(this.world.SPAWN.z*2-2,this.pos.z)),this.pos.y<-6&&(this.pos.y=this.world.SPAWN.y,this.vel.set(0,0,0));const M=Math.hypot(this.vel.x,this.vel.z);this.onGround&&M>.4?this.bob+=t*(d?13:9):this.bob+=t*1.6*0;const y=d?81:75;this.fov+=(y-this.fov)*Math.min(1,t*6),this.recoil*=Math.max(0,1-t*7),this.syncCamera(t);const R=this.getHeldModel();if(R){const A=this.currentItem==="block"?this.buildBlock:this.currentItem,C=this.modelBase[A]||[0,0,0],I=Math.sin(this.bob)*(M>.4?.012:.003),b=Math.abs(Math.cos(this.bob*1))*(M>.4?.014:.004);let S=0,P=0,N=0;if(this.swing>0){this.swing+=t*6.2*this.swingSpeed;const k=Math.min(1,this.swing),$=Math.sin(k*Math.PI);S=-$*1.15,P=$*.3,N=-$*.16,k>=1&&(this.swing=0)}R.position.set(C[0]-I,C[1]-b+N,C[2]+Math.sin(this.bob*.5)*.004),R.rotation.set(S,.06,P)}}tryStep(t,e){const n=this.pos.clone();if(this.pos.y+=1.02,this.collidesAll())return this.pos.copy(n),!1;const i=this.moveAxis("x",t),r=this.moveAxis("z",e);return!i&&!r?(this.pos.copy(n),!1):(this.pos.y=n.y+1.02,!0)}collidesAll(){const t=this.pos;for(let e=Math.floor(t.x-_e);e<=Math.floor(t.x+_e);e++)for(let n=Math.floor(t.y+.001);n<=Math.floor(t.y+Ri-.001);n++)for(let i=Math.floor(t.z-_e);i<=Math.floor(t.z+_e);i++)if(this.world.getBlock(e,n,i)!==et.AIR&&ve(this.world.getBlock(e,n,i)).solid)return!0;return!1}collidesY(){const t=this.pos;for(let e=Math.floor(t.x-_e+.02);e<=Math.floor(t.x+_e-.02);e++)for(let n=Math.floor(t.y+.001);n<=Math.floor(t.y+Ri-.001);n++)for(let i=Math.floor(t.z-_e+.02);i<=Math.floor(t.z+_e-.02);i++)if(ve(this.world.getBlock(e,n,i)).solid)return!0;return!1}resolveYDown(){const t=this.pos;let e=-1/0;for(let n=Math.floor(t.x-_e+.02);n<=Math.floor(t.x+_e-.02);n++)for(let i=Math.floor(t.z-_e+.02);i<=Math.floor(t.z+_e-.02);i++)for(let r=Math.floor(t.y-1);r<=Math.floor(t.y+1);r++)ve(this.world.getBlock(n,r,i)).solid&&(e=Math.max(e,r+1));e>-1/0&&(t.y=e)}resolveYUp(){const t=this.pos;let e=1/0;for(let n=Math.floor(t.x-_e+.02);n<=Math.floor(t.x+_e-.02);n++)for(let i=Math.floor(t.z-_e+.02);i<=Math.floor(t.z+_e-.02);i++)for(let r=Math.floor(t.y+Ri-.2);r<=Math.floor(t.y+Ri+.5);r++)ve(this.world.getBlock(n,r,i)).solid&&(e=Math.min(e,r));e<1/0&&(t.y=e-Ri-.001)}moveAxis(t,e){if(e===0)return!0;this.pos[t]+=e;const n=this.pos,r=(()=>{const a=Math.floor(n.x-_e+.001),o=Math.floor(n.x+_e-.001),l=Math.floor(n.z-_e+.001),c=Math.floor(n.z+_e-.001),h=Math.floor(n.y+.01),u=Math.floor(n.y+Ri-.01);for(let d=a;d<=o;d++)for(let p=h;p<=u;p++)for(let g=l;g<=c;g++)if(ve(this.world.getBlock(d,p,g)).solid)return{x:d,y:p,z:g};return null})();return r?(t==="x"?n.x=e>0?r.x-_e-.001:r.x+1+_e+.001:n.z=e>0?r.z-_e-.001:r.z+1+_e+.001,!1):!0}addShake(t){this.shake=Math.min(2.2,this.shake+t)}damage(t,e="hit"){this.dead||(this.health=Math.max(0,this.health-t),this.addShake(Math.min(1.4,t*.09)),this.onDamage?.(t,e),this.health<=0&&(this.dead=!0,this.onDeath?.()))}heal(t){this.health=Math.min(this.maxHealth,this.health+t)}addXp(t){for(this.xp+=t;this.xp>=this.xpNext;)this.xp-=this.xpNext,this.level++,this.xpNext=Math.round(this.xpNext*1.35),this.maxHealth+=5,this.heal(15),this.onLevelUp?.(this.level)}tick(t){if(this.dead)return;const e=Math.hypot(this.vel.x,this.vel.z)>2;this.hunger=Math.max(0,this.hunger-t*(.09+(e?.035:0))),this.thirst=Math.max(0,this.thirst-t*(.13+(e?.03:0))),this.hunger<=0&&this.damage(t*.9,"starve"),this.thirst<=0&&this.damage(t*1.1,"thirst"),this.hunger>55&&this.thirst>55&&this.health<this.maxHealth&&(this.health=Math.min(this.maxHealth,this.health+t*.35))}}const Yl=[8164448,9083499,7439704,9740663,7110488],$l=[5532541,8014658,5988167,7035964,5199200,8219479],Kl=[4014927,4538422,3489866,4931640];let eg=1;class ng{constructor(t,e,n,i,r,a={}){this.id=eg++,this.scene=t,this.world=e,this.player=n,this.type=a.type||"walker",this.day=a.day||1,this.horde=!!a.horde,this.scale=this.type==="brute"?1.26:this.type==="runner"?.94:1,this.height=1.8*this.scale,this.half=.31*this.scale,this.maxHealth=Math.round((this.type==="brute"?190:this.type==="runner"?55:80)*(1+(this.day-1)*.075)),this.health=this.maxHealth,this.speed=this.type==="runner"?3.5:this.type==="brute"?1.9:2.05,this.damage=this.type==="brute"?17:this.type==="runner"?7:10,this.pos=new D(i,e.surfaceHeight(i,r)+1.01,r),this.vy=0,this.dead=!1,this.deadTime=0,this.attackCd=0,this.growlCd=1+Math.random()*5,this.digCount=0,this.digKey="",this.digCd=0,this.walkPhase=Math.random()*8,this.flash=0,this.hitTimer=0,this.stuck=0,this.aggro=!0,this.lunge=0,this.buildModel()}buildModel(){const t=this.scale,e=new Le({color:Yl[this.id%Yl.length],flatShading:!0}),n=new Le({color:$l[this.id*3%$l.length],flatShading:!0}),i=new Le({color:Kl[this.id*2%Kl.length],flatShading:!0});this.materials=[e,n,i];const r=new Ee;r.scale.setScalar(t);const a=(u,d,p,g,_,m=r)=>{const f=new Yt(u,d);return f.position.set(p,g,_),f.castShadow=!0,m.add(f),f};this.torso=a(new ee(.6,.68,.32),n,0,1.13,0),a(new ee(.62,.16,.33),i,0,.86,0).scale.set(1,1,1),this.head=a(new ee(.34,.34,.32),e,0,1.63,0);const l=a(new ee(.2,.08,.06),new Le({color:4008486}),0,1.52,.17);this.jaw=l;const c=new si({color:this.type==="brute"?16726558:this.type==="runner"?16761402:16743466}),h=new ee(.075,.055,.02);a(h,c,-.085,1.67,.165),a(h,c,.085,1.67,.165),this.eyeMat=c,a(new ee(.35,.09,.33),new Le({color:2827808}),0,1.8,0),this.armL=new Ee,this.armL.position.set(-.36,1.43,0),a(new ee(.15,.58,.16),e,0,-.28,0,this.armL),a(new ee(.16,.2,.17),n,0,-.06,0,this.armL),this.armR=new Ee,this.armR.position.set(.36,1.43,0),a(new ee(.15,.58,.16),e,0,-.28,0,this.armR),a(new ee(.16,.2,.17),n,0,-.06,0,this.armR),this.legL=new Ee,this.legL.position.set(-.16,.78,0),a(new ee(.2,.76,.22),i,0,-.38,0,this.legL),a(new ee(.21,.1,.3),new Le({color:2762274}),0,-.76,.04,this.legL),this.legR=new Ee,this.legR.position.set(.16,.78,0),a(new ee(.2,.76,.22),i,0,-.38,0,this.legR),a(new ee(.21,.1,.3),new Le({color:2762274}),0,-.76,.04,this.legR),r.add(this.armL,this.armR,this.legL,this.legR),r.position.copy(this.pos),r.rotation.y=Math.atan2(this.player.pos.x-x,this.player.pos.z-z),this.group=r,this.scene.add(r)}collidesAt(t,e,n,i=this.height,r=this.half){for(let a=Math.floor(t-r+.01);a<=Math.floor(t+r-.01);a++)for(let o=Math.floor(e+.02);o<=Math.floor(e+i-.02);o++)for(let l=Math.floor(n-r+.01);l<=Math.floor(n+r-.01);l++)if(ve(this.world.getBlock(a,o,l)).solid)return!0;return!1}groundAt(t,e,n){const i=Math.floor(t),r=Math.floor(e);let a=Math.min(63,Math.floor(n+1.1));for(;a>0;){if(ve(this.world.getBlock(i,a,r)).solid)return a+1;if(a--,n-a>14)break}return 1}tryMove(t,e){const n=this.pos;return this.collidesAt(n.x+t,n.y,n.z+e)?this.collidesAt(n.x+t,n.y+1.02,n.z+e)?(this.collidesAt(n.x+t,n.y+.3,n.z+e)||(n.y+=.3),!1):(n.y+=1.02,n.x+=t,n.z+=e,!0):(n.x+=t,n.z+=e,!0)}blockInFront(){const t=this.player.pos.x-this.pos.x,e=this.player.pos.z-this.pos.z,n=Math.hypot(t,e)||1,i=t/n,r=e/n,a=this.pos.x+i*(this.half+.35),o=this.pos.z+r*(this.half+.35),l=[[a,Math.floor(this.pos.y+1.35),o],[a,Math.floor(this.pos.y+2.25),o],[a,Math.floor(this.pos.y+.4),o]];for(const[c,h,u]of l){const d=this.world.getBlock(c,h,u);if(ve(d).solid&&d!==et.BEDROCK)return{x:Math.floor(c),y:h,z:Math.floor(u),id:d}}return null}update(t,e,n){if(this.dead){this.deadTime+=t;const E=Math.min(1,this.deadTime*3.4);this.group.rotation.x=-E*Math.PI/2.1,this.group.position.y=this.pos.y+.1-Math.max(0,this.deadTime-1.2)*.35,this.deadTime>3&&(this.group.visible=!1);for(const M of this.materials)M.opacity=1;return}if(!n)return;const i=this.player,r=i.pos.x-this.pos.x,a=i.pos.z-this.pos.z,o=Math.hypot(r,a),l=i.pos.y-this.pos.y;this.flash=Math.max(0,this.flash-t*4);const c=this.flash>0?.75:0;for(const E of this.materials)E.emissive.setRGB(c*.7,c*.08,c*.02);this.eyeMat.color.setHex(this.flash>0?16777215:this.type==="brute"?16726558:this.type==="runner"?16761402:16743466),this.attackCd=Math.max(0,this.attackCd-t),this.lunge=Math.max(0,this.lunge-t*4),this.growlCd-=t,this.growlCd<=0&&(this.growlCd=4+Math.random()*9,o<26&&this.onGrowl?.(this));let h=0,u=0;if(o>.9&&o<70){h=r/o,u=a/o;for(const M of this.neighbors||[]){if(M===this||M.dead)continue;const y=this.pos.x-M.pos.x,R=this.pos.z-M.pos.z,A=Math.hypot(y,R);A<1&&A>.001&&(h+=y/A*.6,u+=R/A*.6)}const E=Math.hypot(h,u);h/=E,u/=E}const d=(this.horde?1.08:1)*this.speed*(this.lunge>0?1.6:1);let p=!1;if(o<70&&(p=this.tryMove(h*d*t,u*d*t),p?(this.walkPhase+=t*d*3.1,this.stuck=Math.max(0,this.stuck-t*2)):this.stuck+=t),this.collidesAt(this.pos.x,this.pos.y+.02,this.pos.z))this.vy=0;else{const E=this.groundAt(this.pos.x,this.pos.z,this.pos.y);this.pos.y>E?(this.vy-=24*t,this.pos.y+=this.vy*t,this.pos.y<E&&(this.pos.y=E,this.vy=0)):(this.pos.y=E,this.vy=0)}let _=Math.atan2(r,a)-this.group.rotation.y;for(;_>Math.PI;)_-=Math.PI*2;for(;_<-Math.PI;)_+=Math.PI*2;this.group.rotation.y+=_*Math.min(1,t*6);const m=Math.sin(this.walkPhase)*.7;this.legL.rotation.x=m,this.legR.rotation.x=-m;const f=this.type==="runner"?-.5:-1.25;if(this.armL.rotation.x=f+Math.sin(this.walkPhase*.5)*.12+this.lunge*.7,this.armR.rotation.x=f-Math.sin(this.walkPhase*.5)*.12+this.lunge*.7,this.armL.rotation.z=-.12,this.armR.rotation.z=.12,this.torso.rotation.z=Math.sin(this.walkPhase)*.05,this.head.rotation.z=Math.sin(this.walkPhase*.7)*.09,this.group.position.copy(this.pos),this.group.position.y+=Math.abs(Math.sin(this.walkPhase))*.03,o<(this.type==="brute"?2.3:1.85)&&Math.abs(l)<2.1&&this.attackCd<=0&&!i.dead&&(this.attackCd=this.type==="brute"?1.5:1.05,this.lunge=1,this.onAttack?.(this)),this.digCd-=t,o<14&&this.stuck>.45&&this.digCd<=0){const E=this.blockInFront();if(E){this.digCd=.55;const M=`${E.x},${E.y},${E.z}`;M===this.digKey?this.digCount++:(this.digKey=M,this.digCount=1),this.lunge=.7,this.onDig?.(this,E,this.digCount);const y=ve(E.id),R=y.hp>60?7:y.hp>35?5:3;this.digCount>=R&&(this.world.setBlock(E.x,E.y,E.z,et.AIR),this.onBreak?.(this,E),this.digCount=0,this.digKey="",this.stuck=0)}}(o>88||i.dead)&&this.remove()}damage(t,e={}){if(this.dead)return!1;if(this.health-=t,this.flash=1,this.lunge=1,this.aggro=!0,e.knockback){const n=e.knockback,i=this.pos.x-e.from.x,r=this.pos.z-e.from.z,a=Math.hypot(i,r)||1;this.pos.x+=i/a*n,this.pos.z+=r/a*n}return this.health<=0?(this.dead=!0,this.deadTime=0,this.onDeath?.(this,e),!0):!1}remove(){this.group.parent&&this.group.parent.remove(this.group),this.group.traverse(t=>{t.geometry&&t.geometry.dispose()}),this.removed=!0}}class ig{constructor(t){this.game=t,this.list=[],this.cap=24,this.hordeActive=!1,this.hordeWave=0,this.hordeTimer=0,this.ambientTimer=4,this.totalKills=0}get aliveCount(){return this.list.filter(t=>!t.dead&&!t.removed).length}spawnAt(t,e,n="walker",i=!1){const{scene:r,world:a,player:o}=this.game,l=a.surfaceHeight(t,e);if(l<=1||ve(a.getBlock(t,l,e)).water||a.getBlock(t,l+1,e)!==et.AIR)return null;const c=new ng(r,a,o,t,e,{type:n,day:this.game.day,horde:i});return c.onAttack=h=>this.game.zombieAttack(h),c.onGrowl=h=>this.game.audio.zombieGrowl(h.pos,h.type),c.onDeath=(h,u)=>this.game.zombieKilled(h,u),c.onDig=(h,u,d)=>this.game.fx.digDust(u,d),c.onBreak=(h,u)=>this.game.fx.blockBurst(u.x,u.y,u.z,u.id),this.list.push(c),c}spawnAway(t,e,n=26,i=46,r=14){const a=this.game.player.pos;for(let o=0;o<r;o++){const l=Math.random()*Math.PI*2,c=n+Math.random()*(i-n),h=Math.floor(a.x+Math.cos(l)*c),u=Math.floor(a.z+Math.sin(l)*c);if(h<4||u<4||h>155||u>155)continue;const d=this.spawnAt(h,u,t,e);if(d)return d}return null}startHorde(t){this.hordeActive=!0,this.hordeWave=0,this.hordeTimer=2,this.cap=28,this.game.audio.hordeHorn()}endHorde(){this.hordeActive=!1;for(const t of this.list)t.dead||(t.burn=!0)}pickType(){const t=this.game.day,e=Math.random();return this.hordeActive?t>=5&&e<.16?"brute":e<.5?"runner":"walker":t>=3&&e<.28?"runner":t>=6&&e<.07?"brute":"walker"}update(t,e,n){const i=this.game,r=this.list.filter(a=>!a.dead&&!a.removed);for(const a of this.list){if(a.removed)continue;const o=[];for(const l of r)l!==a&&Math.abs(l.pos.x-a.pos.x)<1.8&&Math.abs(l.pos.z-a.pos.z)<1.8&&o.push(l);a.neighbors=o,a.update(t,e,!i.paused),a.dead&&a.deadTime>3.4&&a.remove(),a.burn&&!a.dead&&(a.health-=t*30,a.flash=.65,a.health<=0&&a.damage(a.health+5))}if(this.list=this.list.filter(a=>!a.removed),!i.paused)if(this.hordeActive){if(this.hordeTimer-=t,this.hordeTimer<=0&&this.aliveCount<this.cap){this.hordeTimer=Math.max(1.1,3.4-this.hordeWave*.05);const a=1+Math.floor(Math.random()*Math.min(4,1+this.hordeWave*.25));for(let o=0;o<a;o++)this.spawnAway(this.pickType(),!0,24,44);this.hordeWave++,this.hordeWave===1&&i.onHordeAnnounce?.()}}else n&&(this.ambientTimer-=t,this.ambientTimer<=0&&(this.ambientTimer=Math.max(4,13-i.day),this.aliveCount<Math.min(18,8+i.day*2)&&(this.spawnAway(this.pickType(),!1,30,52),Math.random()<.25&&this.spawnAway(this.pickType(),!1,30,52))))}clearAll(){for(const t of this.list)t.remove();this.list=[],this.hordeActive=!1,this.cap=24}}const In=[{t:0,top:132364,hor:659739,fog:659480,light:9085640,sun:.16,hemi:.32,hsky:2307148,hground:855826,stars:1,exp:1.05},{t:.22,top:198158,hor:857118,fog:725273,light:9085640,sun:.14,hemi:.3,hsky:2307148,hground:855826,stars:1,exp:1.05},{t:.27,top:1976898,hor:12745304,fog:9073512,light:16757124,sun:.75,hemi:.55,hsky:8359592,hground:3813672,stars:.25,exp:1},{t:.34,top:4883382,hor:12769505,fog:12373976,light:16773849,sun:1.35,hemi:1,hsky:11061724,hground:6510662,stars:0,exp:.96},{t:.62,top:4488623,hor:13229284,fog:12702169,light:16773332,sun:1.32,hemi:1,hsky:11061724,hground:6510662,stars:0,exp:.96},{t:.74,top:3825034,hor:14919281,fog:13216915,light:16765082,sun:1.05,hemi:.82,hsky:11121860,hground:5786168,stars:0,exp:.98},{t:.8,top:2634318,hor:13657404,fog:10185300,light:16749400,sun:.7,hemi:.5,hsky:8357536,hground:4076072,stars:.35,exp:1.02},{t:.86,top:659228,hor:1842986,fog:1185825,light:9085640,sun:.15,hemi:.32,hsky:2307148,hground:855826,stars:1,exp:1.05},{t:1,top:132364,hor:659739,fog:659480,light:9085640,sun:.16,hemi:.32,hsky:2307148,hground:855826,stars:1,exp:1.05}];function Zl(s){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");if(s==="sun"){const i=e.createRadialGradient(64,64,4,64,64,62);i.addColorStop(0,"rgba(255,252,235,1)"),i.addColorStop(.22,"rgba(255,238,190,1)"),i.addColorStop(.45,"rgba(255,196,120,.55)"),i.addColorStop(1,"rgba(255,150,60,0)"),e.fillStyle=i,e.fillRect(0,0,128,128)}else{const i=e.createRadialGradient(64,64,18,64,64,62);i.addColorStop(0,"rgba(240,246,255,1)"),i.addColorStop(.4,"rgba(214,228,245,1)"),i.addColorStop(.62,"rgba(170,190,215,.35)"),i.addColorStop(1,"rgba(140,160,190,0)"),e.fillStyle=i,e.beginPath(),e.arc(64,64,62,0,7),e.fill(),e.fillStyle="rgba(160,175,195,.55)";for(const[r,a,o]of[[52,50,9],[76,72,12],[60,84,6],[80,44,5]])e.beginPath(),e.arc(r,a,o,0,7),e.fill()}const n=new _r(t);return n.colorSpace=Ue,n}class sg{constructor(t){this.scene=t;const e=new Ao(480,32,20);this.material=new wn({side:Be,depthWrite:!1,fog:!1,uniforms:{topColor:{value:new Vt(4160432)},horizonColor:{value:new Vt(12178142)},glowColor:{value:new Vt(16767392)},sunDir:{value:new D(.4,.3,-.6).normalize()},glowStrength:{value:.5}},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying vec3 vDir;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 glowColor;
        uniform vec3 sunDir;
        uniform float glowStrength;
        void main() {
          float h = clamp(vDir.y, -1.0, 1.0);
          float grad = pow(clamp(h, 0.0, 1.0), 0.42);
          vec3 col = mix(horizonColor, topColor, grad);
          float glow = pow(max(dot(normalize(vDir), normalize(sunDir)), 0.0), 6.0);
          col += glowColor * glow * glowStrength;
          if (h < 0.0) col = mix(horizonColor, col * 0.55, clamp(-h * 3.0, 0.0, 1.0));
          gl_FragColor = vec4(col, 1.0);
        }`}),this.dome=new Yt(e,this.material),this.dome.frustumCulled=!1,this.dome.renderOrder=-10,t.add(this.dome);const n=new Ae,i=[];for(let l=0;l<900;l++){const c=Math.random()*Math.PI*2,h=Math.pow(Math.random(),.6)*.95+.03,u=Math.sqrt(1-h*h);i.push(Math.cos(c)*u*430,h*430,Math.sin(c)*u*430)}n.setAttribute("position",new pe(i,3)),this.starMat=new Mo({color:14674175,size:1.8,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.stars=new Ec(n,this.starMat),this.stars.frustumCulled=!1,this.stars.renderOrder=-9,t.add(this.stars),this.sunSprite=new rl(new ja({map:Zl("sun"),transparent:!0,depthWrite:!1,fog:!1,blending:Ii})),this.sunSprite.scale.setScalar(110),this.sunSprite.renderOrder=-8,t.add(this.sunSprite),this.moonSprite=new rl(new ja({map:Zl("moon"),transparent:!0,depthWrite:!1,fog:!1})),this.moonSprite.scale.setScalar(58),this.moonSprite.renderOrder=-8,t.add(this.moonSprite),this.sunLight=new id(16773592,1.7),this.sunLight.position.set(40,70,20),t.add(this.sunLight),t.add(this.sunLight.target),this.hemi=new td(10470360,5984577,.85),t.add(this.hemi),this.ambient=new sd(16777215,.12),t.add(this.ambient),this.palette={top:new Vt,hor:new Vt,fog:new Vt,light:new Vt,stars:0,sunI:1.7,hemiI:.85,exp:1},this._tmpA=new Vt,this._tmpB=new Vt;const r=document.createElement("canvas");r.width=r.height=256;const a=r.getContext("2d");a.filter="blur(7px)",a.fillStyle="rgba(255,255,255,0.92)";for(const[l,c,h,u]of[[128,128,74,34],[82,118,44,24],[174,140,52,26],[120,104,38,20],[152,112,30,18]])a.beginPath(),a.ellipse(l,c,h,u,.2,0,7),a.fill();const o=new _r(r);o.colorSpace=Ue,this.cloudMat=new si({map:o,transparent:!0,opacity:.55,depthWrite:!1,fog:!1,color:16777215}),this.clouds=new Ee;for(let l=0;l<16;l++){const c=new Yt(new _s(1,1),this.cloudMat),h=Math.random()*Math.PI*2,u=120+Math.random()*190;c.position.set(Math.cos(h)*u,72+Math.random()*46,Math.sin(h)*u),c.rotation.x=-Math.PI/2,c.rotation.z=Math.random()*Math.PI;const d=60+Math.random()*110;c.scale.set(d,d*(.5+Math.random()*.4),1),this.clouds.add(c)}this.clouds.renderOrder=-7,t.add(this.clouds)}lerpPalette(t,e){let n=In[0],i=In[In.length-1];for(let l=0;l<In.length-1;l++)if(t>=In[l].t&&t<=In[l+1].t){n=In[l],i=In[l+1];break}const r=Math.max(1e-4,i.t-n.t),a=Math.min(1,Math.max(0,(t-n.t)/r)),o=(l,c,h)=>h.copy(this._tmpA.setHex(l)).lerp(this._tmpB.setHex(c),a);if(o(n.top,i.top,this.palette.top),o(n.hor,i.hor,this.palette.hor),o(n.fog,i.fog,this.palette.fog),o(n.light,i.light,this.palette.light),this.palette.stars=n.stars+(i.stars-n.stars)*a,this.palette.sunI=n.sun+(i.sun-n.sun)*a,this.palette.hemiI=n.hemi+(i.hemi-n.hemi)*a,this.palette.exp=n.exp+(i.exp-n.exp)*a,this.hemi.color.copy(this._tmpA.setHex(n.hsky)).lerp(this._tmpB.setHex(i.hsky),a),this.hemi.groundColor.copy(this._tmpA.setHex(n.hground)).lerp(this._tmpB.setHex(i.hground),a),e){const l=this.palette.stars;this.palette.top.lerp(this._tmpA.setHex(1705737),.55*l),this.palette.hor.lerp(this._tmpA.setHex(8199184),.5*l),this.palette.fog.lerp(this._tmpA.setHex(4001804),.5*l),this.palette.light.lerp(this._tmpA.setHex(16733752),.6*l),this.hemi.color.lerp(this._tmpA.setHex(6035986),.45*l)}}update(t,e,n,i,r){this.lerpPalette(t,e);const a=this.palette;this.material.uniforms.topColor.value.copy(a.top),this.material.uniforms.horizonColor.value.copy(a.hor),this.material.uniforms.glowColor.value.copy(a.light),this.dome.position.set(n.x,0,n.z),this.stars.position.set(n.x,0,n.z),this.starMat.opacity=Math.min(1,a.stars)*.95,this.starMat.size=1.7,this.clouds.position.set(n.x,0,n.z),this.clouds.rotation.y=performance.now()*35e-7,this.cloudMat.opacity=.16+(1-Math.min(1,a.stars))*.4,this.cloudMat.color.setHex(e?11565168:16777215).lerp(a.light,.22);const o=(t-.25)*Math.PI*2,l=new D(Math.cos(o)*.75,Math.sin(o),-.55).normalize();this.material.uniforms.sunDir.value.copy(l),this.material.uniforms.glowStrength.value=.35+Math.max(0,l.y)*.7;const c=l.y>-.06;this.sunSprite.visible=c,this.sunSprite.position.set(n.x+l.x*380,l.y*380,n.z+l.z*380);const h=l.clone().multiplyScalar(-1);return this.moonSprite.visible=h.y>-.02,this.moonSprite.position.set(n.x+h.x*380,h.y*380,n.z+h.z*380),this.moonSprite.material.color.setHex(e?16743002:16777215),this.moonSprite.scale.setScalar(e?70:52),this.sunSprite.material.opacity=c?1:0,this.sunLight.color.copy(a.light),this.sunLight.intensity=a.sunI,this.sunLight.position.set(i.x+l.x*60,Math.max(8,i.y+l.y*80+20),i.z+l.z*60),this.sunLight.target.position.set(i.x,i.y,i.z),this.hemi.intensity=a.hemiI,this.ambient.intensity=.18+r*.04,this.scene.fog&&(this.scene.fog.color.copy(a.fog),this.scene.fog.near=32,this.scene.fog.far=e?78:118-r*26),a}}const ln={axe:{name:"Stone Axe",kind:"tool",desc:"Chops wood fast. Also a decent club."},pick:{name:"Stone Pickaxe",kind:"tool",desc:"Mines stone and iron ore."},pistol:{name:"9mm Pistol",kind:"weapon",desc:"Hits hard. Ammo is precious."},food:{name:"Canned Food",kind:"food",desc:"Restores 32 hunger."},water:{name:"Purified Water",kind:"drink",desc:"Restores 38 thirst."},bandage:{name:"Bandage",kind:"heal",desc:"Heals 30 health."},wood:{name:"Wood",kind:"resource",desc:"From logs and trees."},stone:{name:"Stone",kind:"resource",desc:"Mined from rock."},iron:{name:"Iron",kind:"resource",desc:"Smelted ore scrap."},cloth:{name:"Cloth",kind:"resource",desc:"Torn from the undead."},ammo:{name:"9mm Rounds",kind:"ammo",desc:"Pistol ammunition."},planks_block:{name:"Wood Planks",kind:"block",desc:"Place with the building slot."},cobble_block:{name:"Cobblestone",kind:"block",desc:"Sturdy building block."}},Wc=[{id:"planks_block",out:"planks_block",count:4,cost:{wood:1},label:"Saw planks"},{id:"cobble_block",out:"cobble_block",count:4,cost:{stone:2},label:"Split cobble"},{id:"ammo",out:"ammo",count:12,cost:{iron:2,stone:1},label:"Cast 9mm rounds"},{id:"bandage",out:"bandage",count:1,cost:{cloth:2},label:"Wrap bandage"},{id:"pick",out:"pick",count:1,cost:{wood:3,stone:3},label:"Stone pickaxe"},{id:"pistol",out:"pistol",count:1,cost:{iron:8,wood:4},label:"Assemble pistol"}];function oa(){return{axe:1,pick:1,pistol:1,ammo:18,food:2,water:2,bandage:2,wood:8,stone:6,iron:2,cloth:1,planks_block:12,cobble_block:8}}function Xc(s,t){return Object.entries(t.cost).every(([e,n])=>(s[e]||0)>=n)}function rg(s,t){if(!Xc(s,t))return!1;for(const[e,n]of Object.entries(t.cost))s[e]-=n;return s[t.out]=(s[t.out]||0)+t.count,!0}const He=(s,t="")=>`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" ${t}>${s}</svg>`;function er(s){switch(s){case"axe":return He('<rect x="14" y="7" width="4" height="21" rx="1.5" fill="#8a6236"/><path d="M17 6c6 0 9 4 9 4s-3 4-9 4z" fill="#a7abb0"/><path d="M17 6c4 1 6 4 6 4s-2 3-6 4z" fill="#c4c8cc"/>');case"pick":return He('<rect x="14" y="7" width="4" height="21" rx="1.5" fill="#8a6236" transform="rotate(-8 16 16)"/><path d="M4 10c5-5 19-5 24 0-6-1-18-1-24 0z" fill="#a7abb0"/><path d="M4 10c3 2 6 3 9 3l-2 2c-3-1-5-3-7-5z" fill="#c4c8cc"/>');case"pistol":return He('<rect x="5" y="10" width="21" height="7" rx="1.5" fill="#3b4147"/><rect x="7" y="11" width="19" height="2" fill="#586068"/><rect x="10" y="16" width="7" height="10" rx="2" fill="#2b2a28" transform="rotate(-10 13 20)"/><rect x="24" y="11" width="5" height="3" fill="#4b5258"/><rect x="25" y="9" width="2" height="2" fill="#c9ced3"/>');case"food":return He('<rect x="9" y="6" width="14" height="21" rx="3" fill="#b34a35"/><rect x="9" y="11" width="14" height="10" fill="#d8c39b"/><rect x="12" y="14" width="8" height="4" rx="1" fill="#7a4b2e"/><rect x="9" y="6" width="14" height="3" rx="1.5" fill="#9aa1a7"/>');case"water":return He('<path d="M13 5h6v4l3 4v14a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V13l3-4z" fill="#7fc4d8" stroke="#3d7f96" stroke-width="1.4"/><rect x="13" y="3" width="6" height="3" rx="1" fill="#2f6f8a"/><path d="M14 16h4v8h-4z" fill="#a9deec" opacity=".7"/>');case"bandage":return He('<rect x="5" y="11" width="22" height="11" rx="5" fill="#ece5d6" stroke="#c3b9a4" stroke-width="1.2"/><circle cx="16" cy="16.5" r="3.2" fill="#d8ceba"/><path d="M22 18c3 1 5 4 5 8h-4c0-3-1-5-3-6z" fill="#f2ecdd"/>');case"wood":return He('<rect x="5" y="12" width="22" height="7" rx="3" fill="#6b4a2a" transform="rotate(-10 16 16)"/><rect x="5" y="18" width="22" height="7" rx="3" fill="#7d5934" transform="rotate(-4 16 16)"/><circle cx="8" cy="16" r="2.2" fill="#a67c4e"/><circle cx="8" cy="21" r="2.2" fill="#a67c4e"/>');case"stone":return He('<path d="M7 21l3-9 8-5 8 5 2 9-7 5H12z" fill="#85898d"/><path d="M10 12l8-5 8 5-8 3z" fill="#a3a7ab"/><path d="M18 15l8-3 2 9-7 5z" fill="#6f7377"/>');case"iron":return He('<path d="M8 12h16l4 6-3 6H7l-3-6z" fill="#9aa4ab"/><path d="M8 12h16l2 3H9z" fill="#c0c9cf"/><path d="M7 24h18l-3 2H9z" fill="#6f787e"/>');case"cloth":return He('<path d="M6 12c4-3 8 2 12-1s7 1 8 4-3 6-7 5-7 3-11 1-5-6-2-9z" fill="#c8bda6"/><path d="M9 14c5 2 10-2 15 0M9 19c5 2 10-1 15 1" stroke="#a89c85" stroke-width="1.2" fill="none"/>');case"ammo":return He('<g fill="#c9a24b"><rect x="6" y="12" width="5" height="14" rx="1"/><rect x="14" y="10" width="5" height="16" rx="1"/><rect x="22" y="13" width="5" height="13" rx="1"/></g><g fill="#a97e37"><rect x="6" y="12" width="5" height="3"/><rect x="14" y="10" width="5" height="3"/><rect x="22" y="13" width="5" height="3"/></g>');case"planks_block":return He('<path d="M5 9h22v14H5z" fill="#a37d4c"/><path d="M5 12h22M5 16h22M5 20h22" stroke="#6f5332" stroke-width="1.6"/><path d="M5 9h22v3H5z" fill="#b8905c"/>');case"cobble_block":return He('<path d="M5 9h22v14H5z" fill="#7b7e82"/><path d="M6 10h7v5H6zM15 11h8v4h-8zM8 17h6v4H8zM17 16h7v5h-7z" fill="#8f9296"/><path d="M13 10h2v5h-2zM23 15h2v5h-2z" fill="#63666a"/>');default:return He('<rect x="8" y="8" width="16" height="16" rx="3" fill="#777"/>')}}const Ft=s=>document.getElementById(s),Jl=[{slot:"axe",key:"1",item:"axe"},{slot:"pick",key:"2",item:"pick"},{slot:"pistol",key:"3",item:"pistol"},{slot:"block",key:"4",item:"planks_block"},{slot:"food",key:"5",item:"food"},{slot:"water",key:"6",item:"water"},{slot:"bandage",key:"7",item:"bandage"}];class ag{constructor(t){this.game=t,this.el={loading:Ft("loading"),menu:Ft("menu"),hud:Ft("hud"),inventory:Ft("inventory"),death:Ft("death"),victory:Ft("victory"),pause:Ft("pause"),vHealth:Ft("v-health"),vStamina:Ft("v-stamina"),vHunger:Ft("v-hunger"),vThirst:Ft("v-thirst"),barHealth:Ft("bar-health"),barStamina:Ft("bar-stamina"),barHunger:Ft("bar-hunger"),barThirst:Ft("bar-thirst"),vLevel:Ft("v-level"),vXp:Ft("v-xp"),barXp:Ft("bar-xp"),vDay:Ft("v-day"),vTime:Ft("v-time"),vPhase:Ft("v-phase"),vHorde:Ft("v-horde"),clockIcon:Ft("clock-icon"),clockCard:Ft("clock-card"),dayPips:Ft("day-pips"),hordeBanner:Ft("horde-banner"),objDay:Ft("obj-day"),objTitle:Ft("obj-title"),objDesc:Ft("obj-desc"),missionPips:Ft("mission-pips"),vCompass:Ft("v-compass"),vAmmo:Ft("v-ammo"),ammoBox:Ft("ammo-box"),hotbar:Ft("hotbar"),blockSel:Ft("block-sel"),statusPill:Ft("status-pill"),notifications:Ft("notifications"),hint:Ft("hint-strip"),crosshair:Ft("crosshair"),hitmarker:Ft("hitmarker"),targetLabel:Ft("target-label"),mineRing:Ft("mine-ring"),damageFlash:Ft("damage-flash"),lowHealth:Ft("low-health"),toastBig:Ft("toast-big"),invGrid:Ft("inv-grid"),recipes:Ft("recipes"),deathStats:Ft("death-stats"),victoryStats:Ft("victory-stats"),tipText:Ft("tip-text"),crosshairMsg:Ft("crosshair-msg")},this.lastUpdate=0,this.hintTime=0,this.invOpen=!1,this.hitTimer=null,this.bigTimer=null,this.msgTimer=null,this.buildHotbar(),this.buildMissionPips(),this.onSelectSlot=null,this.onCraft=null,this.onCloseInv=null,this.onTogglePause=null;const e=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window&&navigator.maxTouchPoints>0;this.isTouch=e,e&&document.body.classList.add("mobile")}buildHotbar(){this.el.hotbar.innerHTML=Jl.map(t=>`
      <div class="slot" data-slot="${t.slot}" role="button" aria-label="${t.slot}">
        <span class="key">${t.key}</span>
        <span class="icon">${er(t.item)}</span>
        <span class="count"></span>
      </div>`).join(""),this.el.hotbar.querySelectorAll(".slot").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation(),this.onSelectSlot?.(t.dataset.slot)})})}buildMissionPips(){this.el.missionPips.innerHTML=Array.from({length:7},(t,e)=>"<i></i>").join("")}setContinue(t){Ft("btn-continue").classList.toggle("hidden",!t)}hideLoading(){this.el.loading.classList.add("done"),setTimeout(()=>this.el.loading.classList.add("hidden"),600)}showMenu(){this.el.menu.classList.remove("hidden"),this.el.hud.classList.add("hidden"),this.el.inventory.classList.add("hidden"),this.el.pause.classList.add("hidden"),this.setContinue(!!this.game.hasSave)}hideMenu(){this.el.menu.classList.add("hidden")}showHUD(){this.el.hud.classList.remove("hidden"),this.el.hintTime=0,this.el.hint.style.opacity="1"}hideHUD(){this.el.hud.classList.add("hidden")}update(t,e){if(this.el.hintTime+=t,this.el.hintTime>16&&(this.el.hint.style.opacity="0"),e-this.lastUpdate<.08)return;this.lastUpdate=e;const n=this.game,i=n.player;if(!i)return;const r=i.health/i.maxHealth,a=i.stamina/i.maxStamina;this.el.barHealth.style.width=(r*100).toFixed(1)+"%",this.el.barStamina.style.width=(a*100).toFixed(1)+"%",this.el.barHunger.style.width=i.hunger.toFixed(1)+"%",this.el.barThirst.style.width=i.thirst.toFixed(1)+"%",this.el.vHealth.textContent=Math.ceil(i.health),this.el.vStamina.textContent=Math.ceil(i.stamina),this.el.vHunger.textContent=Math.ceil(i.hunger),this.el.vThirst.textContent=Math.ceil(i.thirst),this.el.vLevel.textContent="LVL "+i.level,this.el.vXp.textContent=`${Math.floor(i.xp)}/${i.xpNext}`,this.el.barXp.style.width=Math.min(100,i.xp/i.xpNext*100)+"%",this.el.lowHealth.style.opacity=i.health<30?String(.5+Math.sin(e*4)*.2):"0";const o=Math.floor(n.timeOfDay*24*60),l=String(Math.floor(o/60)).padStart(2,"0"),c=String(o%60).padStart(2,"0");this.el.vTime.textContent=`${l}:${c}`,this.el.vDay.textContent=`DAY ${n.day}`;const h=n.phase;this.el.vPhase.textContent=h.label,this.el.vPhase.style.color=h.night?"#7fb1d6":"",this.el.clockIcon.textContent=h.night?n.hordeNight?"🌑":"☾":h.dusk?"◐":h.dawn?"◑":"☀",this.el.clockIcon.style.color=n.hordeNight?"#ff5b36":h.night?"#9ec4e0":"#ffce7a";const u=n.hordeNight?0:7-(n.day-1)%7;this.el.vHorde.textContent=n.hordeNight?"BLOOD MOON RISING":`BLOOD MOON IN ${u} NIGHT${u===1?"":"S"}`,this.el.vHorde.style.color=n.hordeNight?"#ff6a42":u<=1?"#d9542f":"",this.el.clockCard.classList.toggle("horde",n.hordeNight),this.updatePips(n);const d=n.objective();this.el.objTitle.textContent=d.title,this.el.objDesc.textContent=d.desc,this.el.objDay.textContent=d.tag;const p=this.el.missionPips.children;for(let E=0;E<p.length;E++){const M=E+1;p[E].className=M<n.day?"done":M===n.day?"now":M===7?"end":""}this.el.vAmmo.textContent=n.inv.ammo||0,this.el.vAmmo.classList.toggle("low",(n.inv.ammo||0)<=4),this.el.blockSel.textContent=i.buildBlock==="planks"?`PLANKS ×${n.inv.planks_block||0}`:`COBBLE ×${n.inv.cobble_block||0}`;const g=["N","NE","E","SE","S","SW","W","NW"],_=(i.yaw%(Math.PI*2)+Math.PI*2)%(Math.PI*2),m=Math.round(_/(Math.PI*2)*8)%8;this.el.vCompass.textContent=g[(8-m)%8];let f=n.hordeNight?"<b>BLOOD MOON</b> · FIGHT FOR DAWN":n.phase.night?"<b>NIGHT</b> · THE DEAD WALK":"SURVIVE · SCAVENGE · FORTIFY";i.inWater&&(f="SWIMMING · SLOWED"),this.el.statusPill.innerHTML=f,this.updateHotbar(),this.updateDamage()}updatePips(t){if(this._pipDay===t.day&&this._pipNight===t.hordeNight)return;this._pipDay=t.day,this._pipNight=t.hordeNight;const e=t.day;this.el.dayPips.innerHTML=Array.from({length:7},(n,i)=>{const r=i+1;return`<i class="${r<e?"filled":r===e?r===7?"now horde":"now":r===7?"horde":""}"></i>`}).join("")}updateHotbar(){const t=this.game,e=t.player;for(const n of Jl){const i=this.el.hotbar.querySelector(`[data-slot="${n.slot}"]`);if(!i)continue;let r=n.item,a=1;n.slot==="block"?(r=e.buildBlock==="planks"?"planks_block":"cobble_block",a=t.inv[r]||0):["food","water","bandage"].includes(n.slot)?a=t.inv[n.item]||0:n.slot==="pistol"&&(a=t.inv.ammo||0);const o=i.querySelector(".icon");o.dataset.icon!==r&&(o.innerHTML=er(r),o.dataset.icon=r);const l=i.querySelector(".count"),c=n.slot==="pistol"||n.slot==="block"||["food","water","bandage"].includes(n.slot)?a:"";l.textContent=c===""?"":c;const h=["food","water","bandage"].includes(n.slot)||n.slot==="block"?a<=0:!1;i.classList.toggle("empty",h),i.classList.toggle("selected",e.currentItem===n.slot)}}updateDamage(){const t=this.el.damageFlash;t._t&&(t._t-=.08,t.style.opacity=String(Math.max(0,t._t)))}flashDamage(t){const e=this.el.damageFlash;e._t=Math.min(1,.35+t*.02),e.style.opacity=String(e._t)}setTarget(t,e="",n=0){const i=this.el.targetLabel;if(!t){i.classList.remove("show"),this.el.mineRing.classList.remove("active");return}i.classList.add("show"),i.innerHTML=`${t}${e?`<small>${e}</small>`:""}`,n>0?(this.el.mineRing.classList.add("active"),this.el.mineRing.style.setProperty("--p",String(Math.round(n*100)))):this.el.mineRing.classList.remove("active")}hitmark(t=!1){const e=this.el.hitmarker;e.classList.remove("show","kill"),e.offsetWidth,e.classList.add("show"),t&&e.classList.add("kill"),clearTimeout(this.hitTimer),this.hitTimer=setTimeout(()=>e.classList.remove("show"),130)}message(t,e=1800){const n=this.el.crosshairMsg;n.textContent=t,n.classList.remove("hidden"),clearTimeout(this.msgTimer),this.msgTimer=setTimeout(()=>n.classList.add("hidden"),e)}clearMessage(){this.el.crosshairMsg.classList.add("hidden")}notify(t,e="",n="◆"){const i=document.createElement("div");for(i.className="toast "+e,i.innerHTML=`<span class="t-ico">${n}</span><span>${t}</span>`,this.el.notifications.appendChild(i);this.el.notifications.children.length>5;)this.el.notifications.firstChild.remove();setTimeout(()=>{i.classList.add("out"),setTimeout(()=>i.remove(),320)},3200)}toastBig(t,e="",n=2600){const i=this.el.toastBig;i.innerHTML=`${t}${e?`<small>${e}</small>`:""}`,i.classList.remove("hidden"),clearTimeout(this.bigTimer),this.bigTimer=setTimeout(()=>i.classList.add("hidden"),n)}setHordeBanner(t){this.el.hordeBanner.classList.toggle("hidden",!t)}openInventory(){this.invOpen=!0,this.el.inventory.classList.remove("hidden"),this.renderInventory()}closeInventory(){this.invOpen&&(this.invOpen=!1,this.el.inventory.classList.add("hidden"),this.onCloseInv?.())}renderInventory(){const t=this.game,e=["wood","stone","iron","cloth","ammo","planks_block","cobble_block","axe","pick","pistol","food","water","bandage"];this.el.invGrid.innerHTML=e.map(n=>{const i=t.inv[n]||0,a=["axe","pick","pistol"].includes(n)?i>0?"READY":"—":i;return`<div class="inv-cell ${i>0?"":"empty"}" title="${ln[n]?.name||n}">
        <span class="cell-count">${a}</span>
        ${er(n)}
        <span>${ln[n]?.name||n}</span>
      </div>`}).join(""),this.el.recipes.innerHTML=Wc.map(n=>{const i=Xc(t.inv,n),r=Object.entries(n.cost).map(([a,o])=>{const l=t.inv[a]||0;return`<span class="cost ${l>=o?"":"missing"}">${ln[a]?.name||a} <b>${l}/${o}</b></span>`}).join("");return`<div class="recipe" data-recipe="${n.id}">
        ${er(n.out)}
        <div class="recipe-main">
          <div class="recipe-name">${n.label}${n.count>1?` <span style="color:#8d8472">×${n.count}</span>`:""}</div>
          <div class="recipe-cost">${r}</div>
        </div>
        <button class="craft-btn" data-craft="${n.id}" ${i?"":"disabled"}>CRAFT</button>
      </div>`}).join(""),this.el.recipes.querySelectorAll("[data-craft]").forEach(n=>{n.addEventListener("click",i=>{i.stopPropagation(),this.onCraft?.(n.dataset.craft)})})}showDeath(t){this.el.deathStats.innerHTML=t.map(e=>`<div class="end-stat"><b>${e.value}</b><span>${e.label}</span></div>`).join(""),this.el.death.classList.remove("hidden")}showVictory(t){this.el.victoryStats.innerHTML=t.map(e=>`<div class="end-stat"><b>${e.value}</b><span>${e.label}</span></div>`).join(""),this.el.victory.classList.remove("hidden")}hideEndScreens(){this.el.death.classList.add("hidden"),this.el.victory.classList.add("hidden"),this.el.pause.classList.add("hidden")}showPause(){this.el.pause.classList.remove("hidden")}hidePause(){this.el.pause.classList.add("hidden")}}class og{constructor(){this.ctx=null,this.master=null,this.muted=!1,this.listener={x:0,y:0,z:0},this.wind=null}init(){if(this.ctx){this.ctx.resume?.();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.55,this.master.connect(this.ctx.destination);const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuffer.getChannelData(0);for(let i=0;i<e;i++)n[i]=Math.random()*2-1;this.startWind()}setMuted(t){this.muted=t,this.master&&(this.master.gain.value=t?0:.55)}startWind(){if(!this.ctx)return;const t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.value=420;const n=this.ctx.createGain();n.gain.value=.035;const i=this.ctx.createOscillator();i.frequency.value=.07;const r=this.ctx.createGain();r.gain.value=.02,i.connect(r),r.connect(n.gain),t.connect(e),e.connect(n),n.connect(this.master),t.start(),i.start(),this.wind={src:t,gain:n,filter:e}}env(t,e,n,i,r){const a=this.ctx.currentTime;e.gain.setValueAtTime(1e-4,a),e.gain.exponentialRampToValueAtTime(Math.max(1e-4,e.gain.value||1),a+n),e.gain.setValueAtTime(e.gain.value,a+n+i),e.gain.exponentialRampToValueAtTime(1e-4,a+n+i+r)}noise(t=.2,e=.3,n="lowpass",i=900,r=null){if(!this.ctx)return;const a=this.ctx.createBufferSource();a.buffer=this.noiseBuffer;const o=this.ctx.createBiquadFilter();o.type=n,o.frequency.setValueAtTime(i,this.ctx.currentTime),r&&o.frequency.exponentialRampToValueAtTime(r,this.ctx.currentTime+t);const l=this.ctx.createGain();l.gain.setValueAtTime(e,this.ctx.currentTime),l.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+t),a.connect(o),o.connect(l),l.connect(this.master),a.start(),a.stop(this.ctx.currentTime+t+.02)}tone(t,e=.2,n=.15,i="sine",r=null,a=0){if(!this.ctx)return;const o=this.ctx.currentTime+a,l=this.ctx.createOscillator();l.type=i,l.frequency.setValueAtTime(t,o),r&&l.frequency.exponentialRampToValueAtTime(Math.max(20,r),o+e);const c=this.ctx.createGain();c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(n,o+.012),c.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(c),c.connect(this.master),l.start(o),l.stop(o+e+.02)}spatial(t,e=.09){const n=t.x-this.listener.x,i=t.y-this.listener.y,r=t.z-this.listener.z;return 1/(1+(n*n+i*i+r*r)*e)}gunshot(){this.noise(.16,.55,"highpass",700,180),this.noise(.42,.3,"lowpass",420,90),this.tone(150,.16,.28,"square",45)}dryFire(){this.tone(1400,.04,.08,"square"),this.tone(900,.05,.06,"square",600,.05)}swing(){this.noise(.14,.08,"bandpass",900,350)}chop(){this.noise(.1,.2,"lowpass",700,250),this.tone(180,.09,.12,"triangle",90)}pickHit(){this.noise(.08,.18,"bandpass",2200,900),this.tone(620,.08,.08,"square",300)}breakBlock(t=1){this.noise(.28,.3,"lowpass",1100,160),this.tone(120,.18,.16,"triangle",60)}flesh(){this.noise(.1,.25,"lowpass",600,180),this.tone(90,.12,.12,"sawtooth",55)}place(){this.noise(.08,.2,"lowpass",800,300),this.tone(210,.1,.1,"triangle",140)}pickup(){this.tone(760,.08,.07,"triangle"),this.tone(1140,.1,.06,"triangle",null,.05)}eat(){this.noise(.09,.15,"bandpass",500,300),this.noise(.11,.12,"bandpass",800,200)}drink(){this.tone(300,.16,.06,"sine",460),this.tone(420,.2,.04,"sine",620,.1)}heal(){[520,660,780].forEach((t,e)=>this.tone(t,.25,.05,"sine",null,e*.07))}hurt(){this.tone(120,.22,.22,"sawtooth",70),this.noise(.18,.18,"lowpass",500,120)}levelUp(){[392,523,659,784].forEach((t,e)=>this.tone(t,.35,.08,"triangle",null,e*.1))}click(){this.tone(520,.05,.05,"square")}error(){this.tone(160,.14,.1,"square",100)}death(){this.tone(180,1.3,.2,"sawtooth",40),this.noise(1.4,.18,"lowpass",500,60)}victory(){[523,659,784,1047].forEach((t,e)=>this.tone(t,.7,.09,"triangle",null,e*.16))}zombieGrowl(t,e="walker"){if(!this.ctx)return;const n=this.spatial(t)*(e==="brute"?.5:.28);if(n<.02)return;const i=this.ctx.currentTime,r=this.ctx.createOscillator();r.type="sawtooth";const a=e==="runner"?150:e==="brute"?58:90;r.frequency.setValueAtTime(a,i),r.frequency.linearRampToValueAtTime(a*.65,i+.5);const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=500;const l=this.ctx.createOscillator();l.frequency.value=22+Math.random()*12;const c=this.ctx.createGain();c.gain.value=a*.14,l.connect(c),c.connect(r.frequency);const h=this.ctx.createGain();h.gain.setValueAtTime(1e-4,i),h.gain.exponentialRampToValueAtTime(n*.5,i+.08),h.gain.exponentialRampToValueAtTime(1e-4,i+.7),r.connect(o),o.connect(h),h.connect(this.master),r.start(i),l.start(i),r.stop(i+.75),l.stop(i+.75)}hordeHorn(){if(!this.ctx)return;const t=this.ctx.currentTime;for(const[e,n]of[[55,0],[82,.4],[41,.9]]){const i=this.ctx.createOscillator();i.type="sawtooth",i.frequency.setValueAtTime(e,t+n),i.frequency.linearRampToValueAtTime(e*.9,t+n+2.2);const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.value=220;const a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t+n),a.gain.exponentialRampToValueAtTime(.18,t+n+.25),a.gain.exponentialRampToValueAtTime(1e-4,t+n+2.4),i.connect(r),r.connect(a),a.connect(this.master),i.start(t+n),i.stop(t+n+2.5)}}heartbeat(){this.tone(55,.13,.2,"sine",35),this.tone(50,.11,.14,"sine",32,.18)}}function lg(){const s=document.createElement("canvas");s.width=s.height=32;const t=s.getContext("2d"),e=t.createRadialGradient(16,16,2,16,16,15);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.65,"rgba(255,255,255,0.9)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,32,32),new _r(s)}class cg{constructor(t,e,n){this.scene=t,this.camera=e,this.ui=n,this.max=700,this.pos=new Float32Array(this.max*3),this.col=new Float32Array(this.max*3),this.vel=new Float32Array(this.max*3),this.life=new Float32Array(this.max),this.maxLife=new Float32Array(this.max),this.grav=new Float32Array(this.max),this.next=0;const i=new Ae;i.setAttribute("position",new Ke(this.pos,3)),i.setAttribute("color",new Ke(this.col,3)),i.setDrawRange(0,this.max);for(let r=0;r<this.max;r++)this.pos[r*3+1]=-999;this.points=new Ec(i,new Mo({size:.13,map:lg(),vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,alphaTest:.02,blending:ii})),this.points.frustumCulled=!1,t.add(this.points),this.tracers=[],this.numbers=[]}spawn(t,e,n,i,r,a,o,l=.8,c=14,h=1){const u=this.next;this.next=(this.next+1)%this.max,this.pos[u*3]=t,this.pos[u*3+1]=e,this.pos[u*3+2]=n,this.vel[u*3]=i,this.vel[u*3+1]=r,this.vel[u*3+2]=a;const d=new Vt(o);this.col[u*3]=d.r,this.col[u*3+1]=d.g,this.col[u*3+2]=d.b,this.life[u]=l,this.maxLife[u]=l}blockBurst(t,e,n,i){const a=ve(i).color||8947848;for(let o=0;o<16;o++){const l=Math.random()*Math.PI*2,c=1+Math.random()*3.4;this.spawn(t+.5+(Math.random()-.5)*.7,e+.5+Math.random()*.5,n+.5+(Math.random()-.5)*.7,Math.cos(l)*c,1.2+Math.random()*3.2,Math.sin(l)*c,a,.6+Math.random()*.5,15)}}digDust(t,e){const n=ve(t.id);for(let i=0;i<5;i++){const r=Math.random()*Math.PI*2;this.spawn(t.x+.5+(Math.random()-.5)*.6,t.y+.5+Math.random()*.6,t.z+.5+(Math.random()-.5)*.6,Math.cos(r)*1.2,.6+Math.random()*1.5,Math.sin(r)*1.2,n.color||7829367,.4,6)}}blood(t,e=10){for(let n=0;n<e;n++){const i=Math.random()*Math.PI*2;this.spawn(t.x+(Math.random()-.5)*.3,t.y+(Math.random()-.5)*.3,t.z+(Math.random()-.5)*.3,Math.cos(i)*(.6+Math.random()*2),Math.random()*2.6,Math.sin(i)*(.6+Math.random()*2),9051672,.5,13)}for(let n=0;n<4;n++)this.spawn(t.x,t.y,t.z,(Math.random()-.5)*.5,.3,(Math.random()-.5)*.5,5312782,.9,4)}spark(t,e=16761444){for(let n=0;n<7;n++)this.spawn(t.x,t.y,t.z,(Math.random()-.5)*5,(Math.random()-.2)*4,(Math.random()-.5)*5,e,.22,7)}tracer(t,e,n=16769697){const i=new Ae().setFromPoints([t,e]),r=new yo({color:n,transparent:!0,opacity:.9,depthWrite:!1}),a=new Sc(i,r);this.scene.add(a),this.tracers.push({line:a,life:.09})}damageNumber(t,e,n=!1){if(!this.ui)return;const i=document.createElement("div");i.className="dmg-number"+(n?" crit":""),i.textContent=Math.round(e),this.ui.layer.appendChild(i),this.numbers.push({el:i,pos:t.clone(),life:.85,vy:1.8+Math.random()*.5})}update(t){const e=this.points.geometry.attributes.position;for(let n=0;n<this.max;n++){if(this.life[n]<=0)continue;this.life[n]-=t;const i=n*3;this.vel[i+1]-=14*t,this.pos[i]+=this.vel[i]*t,this.pos[i+1]+=this.vel[i+1]*t,this.pos[i+2]+=this.vel[i+2]*t,this.life[n]<=0&&(this.pos[i+1]=-999)}e.needsUpdate=!0,this.points.geometry.attributes.color.needsUpdate=!0;for(const n of this.tracers)n.life-=t,n.line.material.opacity=Math.max(0,n.life/.09)*.9;this.tracers=this.tracers.filter(n=>n.life<=0?(this.scene.remove(n.line),n.line.geometry.dispose(),n.line.material.dispose(),!1):!0);for(const n of this.numbers){n.life-=t,n.pos.y+=n.vy*t,n.el.style.opacity=Math.max(0,n.life/.85),n.el.style.transform="translate(-50%,-50%) scale("+(1+Math.max(0,1-n.life/.85)*.25)+")";const i=n.pos.clone().project(this.camera);if(i.z>1){n.el.style.display="none";continue}const r=(i.x*.5+.5)*window.innerWidth,a=(-i.y*.5+.5)*window.innerHeight;n.el.style.left=r+"px",n.el.style.top=a+"px"}this.numbers=this.numbers.filter(n=>n.life<=0?(n.el.remove(),!1):!0)}}function hg(s,t){if(!s.ui.isTouch)return null;const n=document.getElementById("stick-zone"),i=document.getElementById("stick-knob"),r=s.canvas;let a=null,o=null,l=0,c=0;const h=38,u=()=>{a=null,i.style.transform="translate(0px, 0px)",t.forward=t.back=t.left=t.right=!1};n.addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation(),s.audio.init(),a=m.pointerId,n.setPointerCapture(m.pointerId),d(m)});const d=m=>{const f=n.getBoundingClientRect();let E=m.clientX-(f.left+f.width/2),M=m.clientY-(f.top+f.height/2);const y=Math.hypot(E,M);y>h&&(E=E/y*h,M=M/y*h),i.style.transform=`translate(${E}px, ${M}px)`;const R=E/h,A=M/h;t.forward=A<-.24,t.back=A>.32,t.left=R<-.24,t.right=R>.24,t.sprint=A<-.72};n.addEventListener("pointermove",m=>{m.pointerId===a&&(m.preventDefault(),d(m))});const p=m=>{m.pointerId===a&&u()};n.addEventListener("pointerup",p),n.addEventListener("pointercancel",p),n.addEventListener("lostpointercapture",p),r.addEventListener("pointerdown",m=>{s.state!=="playing"||s.paused||o===null&&(o=m.pointerId,l=m.clientX,c=m.clientY,s.audio.init())}),window.addEventListener("pointermove",m=>{if(m.pointerId!==o)return;const f=m.clientX-l,E=m.clientY-c;l=m.clientX,c=m.clientY,s.look(f*1.9,E*1.9)});const g=m=>{m.pointerId===o&&(o=null)};window.addEventListener("pointerup",g),window.addEventListener("pointercancel",g);const _=(m,f,E)=>{const M=document.getElementById(m);M.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),s.audio.init(),M.setPointerCapture(R.pointerId),f()});const y=R=>{R.preventDefault(),E()};M.addEventListener("pointerup",y),M.addEventListener("pointercancel",y),M.addEventListener("pointerleave",R=>{R.buttons&&E()})};return _("mob-mine",()=>{t.attack=!0,t.attackPressed=!0},()=>{t.attack=!1}),_("mob-jump",()=>{t.jump=!0},()=>{t.jump=!1}),document.getElementById("mob-place").addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation(),t.placeQueued=!0}),document.getElementById("mob-pack").addEventListener("click",m=>{m.stopPropagation(),s.openInventory()}),document.getElementById("mob-pause").addEventListener("click",m=>{m.stopPropagation(),s.pause()}),document.addEventListener("gesturestart",m=>m.preventDefault()),document.addEventListener("dblclick",m=>m.preventDefault()),{resetStick:u}}const Qi="seven-days-to-die-save-v1",ug=200,Qe=s=>document.getElementById(s);class dg{constructor(){this.renderer=new V0({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputColorSpace=Ue,this.renderer.toneMapping=tc,this.renderer.toneMappingExposure=1,Qe("game").appendChild(this.renderer.domElement),this.canvas=this.renderer.domElement,this.scene=new du,this.scene.fog=new vo(12177884,32,118),this.camera=new qe(75,window.innerWidth/window.innerHeight,.06,700),this.scene.add(this.camera),this.audio=new og,this.sky=new sg(this.scene),this.world=new Q0(this.scene),this.player=new tg(this.camera,this.world),this.inv=oa(),this.day=1,this.timeOfDay=.345,this.state="init",this.paused=!1,this.hordeNight=!1,this.victoryShown=!1,this.lastHordeDay=0,this.playTime=0,this.shootCd=0,this.swingCd=0,this.useCd=0,this.placeCd=0,this.muzzleTime=0,this.hitmarkTime=0,this.mine={key:"",dmg:0},this.aim=null,this.menuTime=.4,this.elapsed=0,this.autosave=0,this.heartbeatCd=0,this.input={forward:!1,back:!1,left:!1,right:!1,jump:!1,sprint:!1,attack:!1,attackPressed:!1,placeQueued:!1},this.stats={kills:0,blocksMined:0,crafted:0,shots:0},this.hasSave=!1;try{this.hasSave=!!localStorage.getItem(Qi)}catch{}this.fx=new cg(this.scene,this.camera,null),this.ui=new ag(this),this.fx.ui=this.ui,this.zombies=new ig(this),this.bindEvents(),this.player.onDamage=t=>{this.ui.flashDamage(t),this.audio.hurt()},this.player.onDeath=()=>this.onDeath(),this.player.onFallDamage=t=>this.player.damage(Math.max(4,(t-3.2)*8),"fall"),this.player.onLevelUp=t=>{this.ui.toastBig("LEVEL "+t,"MAX HEALTH INCREASED",1800),this.audio.levelUp()},this.mobile=hg(this,this.input),this.onResize()}startNew(){(this.world.edits.size>0||this.everStarted)&&this.world.reset(),this.everStarted=!0,this.inv=oa(),this.day=1,this.timeOfDay=.345,this.stats={kills:0,blocksMined:0,crafted:0,shots:0},this.hordeNight=!1,this.victoryShown=!1,this.lastHordeDay=0,this.zombies.clearAll(),this.ui.hideEndScreens(),this.resetPlayer(),this.begin()}resetPlayer(){const t=this.player;t.pos.set(this.world.SPAWN.x,this.world.SPAWN.y,this.world.SPAWN.z),t.vel.set(0,0,0),t.yaw=-.02,t.pitch=-.045,t.health=t.maxHealth=100,t.stamina=t.maxStamina=100,t.hunger=100,t.thirst=100,t.level=1,t.xp=0,t.xpNext=100,t.dead=!1,t.fallStart=null,t.selectItem("axe"),t.selectBuildBlock("planks"),t.syncCamera(0),this.input.attack=!1}begin(){this.state="playing",this.paused=!1,this.playTime=0,this.ui.hideMenu(),this.ui.showHUD(),this.ui.setHordeBanner(!1),this.ui.toastBig("DAY 1","SCAVENGE · BUILD · SURVIVE",2400),this.ui.notify("You wake beside a dying campfire.","","☼"),this.ui.notify("Craft gear with E. The dead come at night.","","⚠"),this.audio.init(),this.saveGame(),this.requestLock()}loadGame(){let t;try{t=JSON.parse(localStorage.getItem(Qi)||"null")}catch{t=null}if(!t){this.startNew();return}(this.world.edits.size>0||this.everStarted)&&this.world.reset(),this.everStarted=!0,this.world.loadEdits(t.edits||[]),this.inv={...oa(),...t.inv||{}},this.day=t.day||1,this.timeOfDay=t.time??.345,this.stats={kills:0,blocksMined:0,crafted:0,shots:0,...t.stats||{}},this.hordeNight=!!t.hordeNight,this.victoryShown=!!t.victoryShown,this.lastHordeDay=t.lastHordeDay||0,this.zombies.clearAll();const e=this.player;e.pos.set(t.player.x,t.player.y,t.player.z),e.yaw=t.player.yaw||0,e.pitch=t.player.pitch||0,e.health=t.player.health??100,e.maxHealth=t.player.maxHealth||100,e.stamina=t.player.stamina??100,e.hunger=t.player.hunger??100,e.thirst=t.player.thirst??100,e.level=t.player.level||1,e.xp=t.player.xp||0,e.xpNext=t.player.xpNext||100,e.dead=!1,e.selectBuildBlock(t.buildBlock==="cobble"?"cobble":"planks"),e.syncCamera(0),this.ui.hideEndScreens(),this.begin(),this.hordeNight&&(this.zombies.startHorde(this.day),this.ui.setHordeBanner(!0)),this.ui.notify(`Save loaded — Day ${this.day}.`,"loot","⛁")}requestLock(){try{const t=this.canvas.requestPointerLock?.();t&&t.catch&&t.catch(()=>{})}catch{}}pause(){this.state==="playing"&&(this.paused=!0,this.state="paused",this.ui.showPause(),this.audio.setMuted(this.audio.muted),document.exitPointerLock?.())}resume(){this.state==="paused"&&(this.paused=!1,this.state="playing",this.ui.hidePause(),this.requestLock())}backToMenu(){(this.state==="playing"||this.state==="paused")&&this.saveGame(),this.state="menu",this.paused=!1,this.zombies.clearAll(),this.input.attack=!1,this.ui.hideEndScreens(),this.ui.hideHUD(),this.ui.closeInventory(),this.ui.setHordeBanner(!1),document.exitPointerLock?.(),this.menuCam=null,this.ui.showMenu(),this.hasSave=!!localStorage.getItem(Qi),this.ui.setContinue(this.hasSave)}onDeath(){this.state!=="dead"&&(this.state="dead",this.paused=!0,this.ui.setHordeBanner(!1),this.audio.death(),document.exitPointerLock?.(),this.ui.showDeath([{label:"DAYS SURVIVED",value:Math.max(1,this.day-1)},{label:"ZOMBIES KILLED",value:this.stats.kills},{label:"BLOCKS MINED",value:this.stats.blocksMined},{label:"LEVEL",value:this.player.level}]))}showVictory(){this.victoryShown||(this.victoryShown=!0,this.state="victory",this.paused=!0,this.audio.victory(),document.exitPointerLock?.(),this.ui.showVictory([{label:"DAYS SURVIVED",value:7},{label:"ZOMBIES KILLED",value:this.stats.kills},{label:"BLOCKS PLACED/MINED",value:this.stats.blocksMined},{label:"LEVEL",value:this.player.level}]),this.saveGame())}saveGame(){if(!(this.state==="dead"||this.state==="menu"&&!this.everStarted))try{const t=this.player,e={version:1,day:this.day,time:this.timeOfDay,inv:this.inv,stats:this.stats,hordeNight:this.hordeNight,victoryShown:this.victoryShown,lastHordeDay:this.lastHordeDay,buildBlock:t.buildBlock,player:{x:t.pos.x,y:t.pos.y,z:t.pos.z,yaw:t.yaw,pitch:t.pitch,health:t.health,maxHealth:t.maxHealth,stamina:t.stamina,hunger:t.hunger,thirst:t.thirst,level:t.level,xp:t.xp,xpNext:t.xpNext},edits:Array.from(this.world.edits.entries())};localStorage.setItem(Qi,JSON.stringify(e)),this.hasSave=!0}catch(t){console.warn("save failed",t)}}bindEvents(){Qe("btn-start").addEventListener("click",()=>{this.audio.init(),this.startNew()}),Qe("btn-continue").addEventListener("click",()=>{this.audio.init(),this.loadGame()}),Qe("btn-close-inv").addEventListener("click",()=>this.closeInventory()),Qe("btn-respawn").addEventListener("click",()=>{try{localStorage.removeItem(Qi)}catch{}this.startNew()}),Qe("btn-death-menu").addEventListener("click",()=>{this.ui.hideEndScreens(),this.backToMenu()}),Qe("btn-continue-game").addEventListener("click",()=>{this.state="playing",this.paused=!1,this.ui.hideEndScreens(),this.ui.setHordeBanner(!1),this.requestLock()}),Qe("btn-victory-menu").addEventListener("click",()=>{this.ui.hideEndScreens(),this.backToMenu()}),Qe("btn-resume").addEventListener("click",()=>this.resume()),Qe("btn-save").addEventListener("click",()=>{this.saveGame(),this.ui.notify("Game saved.","loot","⛁"),this.audio.click()}),Qe("btn-pause-menu").addEventListener("click",()=>{this.ui.hideEndScreens(),this.backToMenu()}),Qe("pause").addEventListener("click",t=>{t.target.id==="pause"&&this.resume()}),window.addEventListener("resize",()=>this.onResize()),window.addEventListener("blur",()=>{this.input.forward=this.input.back=this.input.left=this.input.right=this.input.attack=!1}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&this.saveGame()}),window.addEventListener("keydown",t=>this.onKeyDown(t)),window.addEventListener("keyup",t=>this.onKeyUp(t)),document.addEventListener("pointerlockchange",()=>{const t=document.pointerLockElement===this.canvas;this.locked=t,!t&&this.state==="playing"&&this.playTime>1.6&&!this.ui.invOpen&&this.pause()}),this.canvas.addEventListener("mousedown",t=>{this.state!=="playing"||this.paused||(t.button===0?(this.input.attack=!0,this.input.attackPressed=!0,this.locked||this.requestLock()):t.button===2&&(t.preventDefault(),this.input.placeQueued=!0))}),window.addEventListener("mouseup",t=>{t.button===0&&(this.input.attack=!1)}),this.canvas.addEventListener("contextmenu",t=>t.preventDefault()),window.addEventListener("mousemove",t=>{this.state!=="playing"||this.paused||!this.locked&&!this.input.attack||this.look(t.movementX||0,t.movementY||0)}),this.canvas.addEventListener("wheel",t=>{this.state!=="playing"||this.paused||this.ui.invOpen||(t.preventDefault(),this.cycleSlot(t.deltaY>0?1:-1))},{passive:!1}),this.ui.onSelectSlot=t=>this.selectSlot(t),this.ui.onCraft=t=>this.craftRecipe(t),this.ui.onCloseInv=()=>{this.paused=!1,this.state==="playing"&&(this.ui.showHUD(),this.requestLock())}}onKeyDown(t){const e=t.code;if(e==="KeyM"){this.audio.setMuted(!this.audio.muted),this.ui.notify(this.audio.muted?"Audio muted":"Audio on","","♪");return}if(this.state!=="menu"){if(e==="Escape"){if(this.ui.invOpen){this.closeInventory();return}this.state==="playing"?this.pause():this.state==="paused"&&this.resume();return}if(this.state==="playing"){if(e==="KeyE"||e==="Tab"){t.preventDefault(),this.ui.invOpen?this.closeInventory():this.openInventory();return}if(!this.ui.invOpen){if((e==="KeyW"||e==="ArrowUp")&&(this.input.forward=!0),(e==="KeyS"||e==="ArrowDown")&&(this.input.back=!0),(e==="KeyA"||e==="ArrowLeft")&&(this.input.left=!0),(e==="KeyD"||e==="ArrowRight")&&(this.input.right=!0),e==="Space"&&(t.preventDefault(),this.input.jump=!0),(e==="ShiftLeft"||e==="ShiftRight")&&(this.input.sprint=!0),e==="KeyF"&&this.drinkWater(),e==="KeyB"&&this.cycleBlock(),e.startsWith("Digit")){const n=Number(e.slice(5));n>=1&&n<=7&&this.selectSlotByIndex(n-1)}e==="KeyQ"&&this.selectSlot("block")}}}}onKeyUp(t){const e=t.code;(e==="KeyW"||e==="ArrowUp")&&(this.input.forward=!1),(e==="KeyS"||e==="ArrowDown")&&(this.input.back=!1),(e==="KeyA"||e==="ArrowLeft")&&(this.input.left=!1),(e==="KeyD"||e==="ArrowRight")&&(this.input.right=!1),e==="Space"&&(this.input.jump=!1),(e==="ShiftLeft"||e==="ShiftRight")&&(this.input.sprint=!1)}look(t,e){this.player.yaw-=t*.0024,this.player.pitch-=e*.0022,this.player.pitch=Math.max(-1.45,Math.min(1.45,this.player.pitch))}onResize(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()}get slots(){return["axe","pick","pistol","block","food","water","bandage"]}selectSlotByIndex(t){const e=this.slots[t];e&&this.selectSlot(e)}cycleSlot(t){const e=this.player;let n=this.slots.indexOf(e.currentItem);n=(n+t+this.slots.length)%this.slots.length,this.selectSlot(this.slots[n])}selectSlot(t){const e=this.player;if(t==="block"){const n=e.buildBlock==="planks"?"planks_block":"cobble_block";if(!this.inv[n]){this.ui.message(`No ${e.buildBlock==="planks"?"planks":"cobblestone"} — craft more with E`),this.audio.error();return}}if(["food","water","bandage"].includes(t)&&!this.inv[t]){this.ui.message(`No ${ln[t].name.toLowerCase()} left`),this.audio.error();return}if(t==="pistol"&&!this.inv.pistol){this.ui.message("You need a pistol — craft one with E");return}e.selectItem(t),this.audio.click()}cycleBlock(){const t=this.player;t.selectBuildBlock(t.buildBlock==="planks"?"cobble":"planks");const e=t.buildBlock==="planks"?"planks_block":"cobble_block";this.ui.message(`Building: ${ln[e].name} (${this.inv[e]||0})`,1400),this.audio.click()}openInventory(){this.state==="playing"&&(this.paused=!0,this.input.attack=!1,document.exitPointerLock?.(),this.ui.openInventory())}closeInventory(){this.ui.closeInventory()}craftRecipe(t){const e=Wc.find(n=>n.id===t);e&&(rg(this.inv,e)?(this.stats.crafted++,this.player.addXp(4),this.audio.click(),this.ui.notify(`Crafted ${ln[e.out].name}${e.count>1?" ×"+e.count:""}`,"loot","⚒"),this.ui.renderInventory(),this.ui.updateHotbar()):(this.audio.error(),this.ui.message("Missing materials",1200)))}get phase(){const t=this.timeOfDay;return t<.26?{label:"NIGHT",night:!0}:t<.325?{label:"DAWN",night:!1,dawn:!0}:t<.76?{label:"DAY",night:!1}:t<.84?{label:"DUSK",night:!1,dusk:!0}:{label:"NIGHT",night:!0}}get isNight(){return this.timeOfDay<.26||this.timeOfDay>=.84}onNightfall(){this.day%7===0&&!this.hordeNight&&this.lastHordeDay!==this.day?(this.lastHordeDay=this.day,this.hordeNight=!0,this.zombies.startHorde(this.day),this.ui.setHordeBanner(!0),this.ui.toastBig("BLOOD MOON","THE HORDE IS COMING",4200),this.player.addShake(1.4)):this.hordeNight||this.ui.toastBig("NIGHTFALL","THE DEAD ARE WAKING",2600),this.audio.zombieGrowl(this.player.pos,"brute")}onDawn(){this.hordeNight?(this.hordeNight=!1,this.ui.setHordeBanner(!1),this.day>=8?this.showVictory():this.ui.toastBig("SURVIVED","THE HORDE RETREATS",2600)):this.ui.toastBig("DAWN","YOU SURVIVED THE NIGHT",2200);for(const t of this.zombies.list)t.dead||(t.burn=!0);this.saveGame()}objective(){const t=this.day;return this.hordeNight?{title:"SURVIVE THE BLOOD MOON",desc:"They will break through. Hold until dawn.",tag:"BLOOD MOON"}:this.isNight?{title:"SURVIVE THE NIGHT",desc:"Zombies are hunting you. Keep your back to a wall.",tag:`DAY ${t} / 7`}:t%7===6?{title:"PREPARE FOR TOMORROW",desc:"The seventh night is close. Wall up and stock ammo.",tag:"HORDE TOMORROW"}:t===7?{title:"FORTIFY FOR THE HORDE",desc:"Night falls soon. Build thick walls and a killing floor.",tag:"DAY 7 / 7"}:{title:t===1?"SURVIVE THE FIRST NIGHT":"SCAVENGE & FORTIFY",desc:t===1?"Chop trees, mine stone, and build shelter before dark.":"Loot crates, craft ammo, and brace for the seventh night.",tag:`DAY ${t} / 7`}}update(t){if(this.elapsed+=t,this.audio.listener=this.player.pos,this.aim=null,this.state==="playing"&&!this.paused?(this.playTime+=t,this.simulate(t)):this.state==="menu"&&this.menuUpdate(t),this.world.update(t,this.elapsed),this.state!=="menu"){this.sky.update(this.timeOfDay,this.hordeNight,this.camera.position,this.player.pos,this.phase.night?1:0);const e=this.phase.night?1:0;this.headlight.intensity=this.hordeNight?1:e?.9:.18}(this.state==="playing"||this.state==="paused")&&this.ui.update(t,this.elapsed),this.fx.update(t)}menuUpdate(t){this.menuTime+=t*8e-4;const e=this.elapsed*.055,n=this.world.SPAWN,i=n.x+6.5+Math.sin(e)*2.2,r=n.z+13.5+Math.cos(e*.8)*1.4,a=this.world.surfaceHeight(i,r)+2.7+Math.sin(e*1.7)*.12;this.camera.position.set(i,a,r),this.camera.lookAt(n.x-1.5,n.y+1.2,n.z-17.5),this.player.pos.copy(this.camera.position),this.sky.update(.41,!1,this.camera.position,n,0),this.headlight.intensity=.2}simulate(t){const e=this.player;this.updateTime(t),e.update(t,this.input,!0),e.tick(t),this.audio.listener=e.pos,this.updateAim(),this.handleActions(t),this.zombies.update(t,this.elapsed,this.isNight||this.hordeNight),this.input.attackPressed=!1,this.input.placeQueued=!1,this.muzzleTime=Math.max(0,this.muzzleTime-t),e.muzzle.intensity=this.muzzleTime>0?8:0,this.hordeNight&&(this.muzzle.intensity=Math.max(this.muzzle.intensity,.8)),e.health<25&&(this.heartbeatCd-=t,this.heartbeatCd<=0&&(this.audio.heartbeat(),this.heartbeatCd=1.5)),this.autosave+=t,this.autosave>18&&(this.autosave=0,this.saveGame())}updateTime(t){this.timeOfDay;const e=this.isNight;this.timeOfDay+=t/ug,this.timeOfDay>=1&&(this.timeOfDay-=1,this.day++),!e&&this.isNight&&this.onNightfall(),e&&!this.isNight&&this.onDawn(),!this.hordeNight&&this.day%7===0&&this.timeOfDay>=.8&&this.timeOfDay<.83&&this.lastHordeDay!==this.day&&(this.lastHordeDay=this.day,this.hordeNight=!0,this.zombies.startHorde(this.day),this.ui.setHordeBanner(!0),this.ui.toastBig("BLOOD MOON","THE HORDE IS COMING",4200),this.player.addShake(1.4))}updateAim(){const t=this.player,e=this.camera.position.clone(),n=new D;this.camera.getWorldDirection(n);const i=this.world.raycast(e,n,6),r=this.rayZombie(e,n,70);if(this.aim={block:i,zombie:r,origin:e,dir:n},r&&(!i||r.dist<i.dist))this.ui.setTarget(r.zombie.type==="brute"?"BRUTE":r.zombie.type==="runner"?"RUNNER":"WALKER",`${Math.max(0,Math.ceil(r.zombie.health))} / ${r.zombie.maxHealth} HP`,0);else if(i){const a=ve(i.id);let o="";a.crate?o="HIT TO LOOT":t.currentItem==="axe"&&a.tool==="axe"?o="STONE AXE":t.currentItem==="pick"&&a.tool==="pick"?o="STONE PICKAXE":a.needsPick?o="NEEDS A PICKAXE":a.hp===1/0?o="INDESTRUCTIBLE":o="BARE HANDS"+(t.currentItem==="pistol"?" · USE A TOOL":"");const l=`${i.x},${i.y},${i.z}`,c=this.mine.key===l?this.mine.dmg/a.hp:0;this.ui.setTarget(a.name,o,Math.min(1,c))}else this.ui.setTarget(null)}rayZombie(t,e,n){let i=null;for(const r of this.zombies.list){if(r.dead||r.removed)continue;const o=new D(r.pos.x,r.pos.y+r.height*.55,r.pos.z).clone().sub(t),l=o.dot(e);if(l<0||l>n)continue;const c=o.lengthSq()-l*l,h=.42*r.scale+.14;if(c>h*h)continue;const u=Math.max(.1,l-Math.sqrt(h*h-c));if(!i||u<i.dist){const d=t.clone().addScaledVector(e,u),p=d.y>r.pos.y+r.height*.8;i={zombie:r,dist:u,point:d,head:p}}}return i}handleActions(t){const e=this.player,n=this.input;this.shootCd=Math.max(0,this.shootCd-t),this.swingCd=Math.max(0,this.swingCd-t),this.useCd=Math.max(0,this.useCd-t),this.placeCd=Math.max(0,this.placeCd-t);const i=e.currentItem;if(n.placeQueued&&this.placeCd<=0&&(this.tryPlace(),n.placeQueued=!1),i==="pistol"){n.attack&&this.shootCd<=0&&this.shoot();return}if(i==="food"||i==="water"||i==="bandage"){n.attackPressed&&this.useCd<=0&&this.consume(i);return}if(i==="axe"||i==="pick"){n.attack&&this.swingCd<=0?this.swing(i):n.attackPressed&&e.startSwing(1);return}i==="block"&&n.attack&&this.placeCd<=0&&(this.tryPlace(),this.placeCd=.2)}swing(t){const e=this.player,{block:n,zombie:i,origin:r,dir:a}=this.aim||{};if(this.swingCd=t==="axe"?.38:.42,e.startSwing(1),this.audio.swing(),i&&(!n||i.dist<n.dist)&&i.dist<3.6){const u=t==="axe"?32:22,d=i.point.clone();this.damageZombie(i.zombie,u,d,!1,r,()=>this.ui.hitmark(i.zombie.dead)),e.addXp(1);return}if(!n)return;const o=ve(n.id),l=`${n.x},${n.y},${n.z}`;let c=8;const h=t==="axe"&&o.tool==="axe"||t==="pick"&&o.tool==="pick";if(h&&(c=34),o.needsPick&&t!=="pick"){this.ui.message(`${o.name} requires a pickaxe`,1500),this.audio.error();return}if(o.hp!==1/0){if(o.crate){this.openCrate(n);return}this.mine.key!==l&&(this.mine.key=l,this.mine.dmg=0),this.mine.dmg+=c,this.fx.digDust(n,this.mine.dmg),h?this.audio.chop():this.audio.pickHit(),this.mine.dmg>=o.hp&&(this.breakBlock(n,o),this.mine.key="",this.mine.dmg=0)}}breakBlock(t,e){const n=this.player;if(this.world.setBlock(t.x,t.y,t.z,et.AIR),this.fx.blockBurst(t.x,t.y,t.z,t.id),this.audio.breakBlock(e.hp/50),n.addXp(2),this.stats.blocksMined++,e.drop&&Math.random()<=(e.dropChance??1)){const i=e.dropCount||1,r=e.drop;this.inv[r]=(this.inv[r]||0)+i;const a={wood:"🪵",stone:"🪨",iron:"⛓",planks:"▤",cobble:"▦"};this.ui.notify(`+${i} ${ln[r]?.name||r}`,"loot",a[r]||"◆"),this.audio.pickup()}}openCrate(t){this.world.setBlock(t.x,t.y,t.z,et.AIR),this.fx.blockBurst(t.x,t.y,t.z,et.CRATE),this.audio.breakBlock(1);const e=[["ammo",12,24],["food",1,3],["water",1,3],["iron",2,5],["cloth",1,3],["bandage",1,2],["planks_block",4,10],["cobble_block",4,10]],n=new Set;for(;n.size<3;)n.add(Math.floor(Math.random()*e.length));const i=[];for(const r of n){const[a,o,l]=e[r],c=o+Math.floor(Math.random()*(l-o+1));this.inv[a]=(this.inv[a]||0)+c,i.push(`${ln[a].name} ×${c}`)}this.ui.notify("Crate: "+i.join(" · "),"loot","▣"),this.ui.toastBig("SUPPLIES",i[0],1600),this.player.addXp(10),this.audio.pickup(),this.stats.blocksMined++}shoot(){const t=this.player;if(this.shootCd=.34,t.startSwing(2.4),!this.inv.ammo){this.audio.dryFire(),this.ui.message("OUT OF 9MM — craft ammo with E",1500);return}this.inv.ammo--,this.stats.shots++,this.audio.gunshot(),t.recoil=.035+Math.random()*.012,t.addShake(.22),this.muzzleTime=.055;const e=this.camera.position.clone(),n=new D;this.camera.getWorldDirection(n);const i=this.world.raycast(e,n,90),r=this.rayZombie(e,n,90),a=r&&(!i||r.dist<i.dist),o=a?r.point:i?i.point:e.clone().addScaledVector(n,90),l=e.clone().addScaledVector(n,.5).add(new D(.18,-.12,0));if(this.fx.tracer(l,o),this.fx.spark(l,16763256),a){const c=r.head?96:46;this.damageZombie(r.zombie,c,r.point,r.head,e,()=>{this.ui.hitmark(r.zombie.dead),r.head&&this.ui.message("HEADSHOT",700)})}else i&&(this.fx.blockBurst(i.x,i.y,i.z,i.id),this.fx.spark(i.point,16769184),this.audio.pickHit())}damageZombie(t,e,n,i,r,a){const o=t.damage(e,{knockback:.22,from:new D(r.x,r.y,r.z)});this.fx.blood(n,i?16:9),this.audio.flesh(),this.fx.damageNumber(n,e,i),a?.(),o||this.player.addXp(i?6:3)}zombieAttack(t){this.player.damage(Math.round(t.damage),"zombie"),this.ui.flashDamage(t.damage),this.audio.hurt();const e=this.player.pos.x-t.pos.x,n=this.player.pos.z-t.pos.z,i=Math.hypot(e,n)||1;this.player.vel.x+=e/i*2.6,this.player.vel.z+=n/i*2.6,this.fx.blood(new D(this.player.pos.x,this.player.pos.y+1.2,this.player.pos.z),6)}zombieKilled(t){this.stats.kills++,this.player.addXp(t.type==="brute"?34:t.type==="runner"?16:22);const e=[],n=(i,r)=>{this.inv[i]=(this.inv[i]||0)+r,e.push(`+${r} ${ln[i].name}`)};Math.random()<.7&&n("cloth",1+(Math.random()<.3?1:0)),Math.random()<.3&&n("ammo",3+Math.floor(Math.random()*5)),Math.random()<.22&&n("food",1),Math.random()<.18&&n("water",1),Math.random()<.14&&n("bandage",1),Math.random()<.08&&n("iron",1),e.length&&this.ui.notify(e.join(" · "),"loot","☠"),this.audio.flesh()}consume(t){const e=this.player;if(!this.inv[t]){this.ui.message(`No ${ln[t].name.toLowerCase()} left`,1400),this.audio.error();return}if(t==="food"&&e.hunger>=99){this.ui.message("Not hungry",1200);return}if(t==="water"&&e.thirst>=99){this.ui.message("Not thirsty",1200);return}if(t==="bandage"&&e.health>=e.maxHealth-.5){this.ui.message("Health is full",1200);return}this.inv[t]--,this.useCd=.9,t==="food"&&(e.hunger=Math.min(100,e.hunger+32),this.audio.eat(),this.ui.message("+32 HUNGER",1e3)),t==="water"&&(e.thirst=Math.min(100,e.thirst+38),this.audio.drink(),this.ui.message("+38 THIRST",1e3)),t==="bandage"&&(e.heal(30),this.audio.heal(),this.ui.message("+30 HEALTH",1e3))}drinkWater(){if(this.state!=="playing"||this.paused)return;const t=this.player,e=Math.floor(t.pos.x),n=Math.floor(t.pos.y+1),i=Math.floor(t.pos.z);let r=!1;for(let a=-3;a<=3&&!r;a++)for(let o=-2;o<=2&&!r;o++)for(let l=-3;l<=3;l++)if(this.world.getBlock(e+a,n+o,i+l)===et.WATER){r=!0;break}if(!r){this.ui.message("No water nearby",1200);return}if(t.thirst>=99){this.ui.message("Not thirsty",1200);return}t.thirst=Math.min(100,t.thirst+20),this.audio.drink(),this.ui.message("Drank from the water · +20 THIRST",1400)}tryPlace(){const t=this.player,e=t.buildBlock==="planks"?"planks_block":"cobble_block",n=t.buildBlock==="planks"?et.PLANKS:et.COBBLE;if(!this.inv[e]){this.ui.message(`Out of ${t.buildBlock==="planks"?"planks":"cobblestone"}`,1200),this.audio.error();return}const i=this.camera.position.clone(),r=new D;this.camera.getWorldDirection(r);const a=this.world.raycast(i,r,5.5);if(!a)return;const o=a.x+a.normal[0],l=a.y+a.normal[1],c=a.z+a.normal[2];if(l<1||l>62)return;const h=this.world.getBlock(o,l,c);if(h!==et.AIR&&!ve(h).plant&&h!==et.WATER){this.ui.message("Blocked",900);return}const u=t.pos.x,d=t.pos.z,p=o+1>u-.34&&o<u+.34,g=c+1>d-.34&&c<d+.34,_=l+1>t.pos.y+.02&&l<t.pos.y+1.8;if(p&&g&&_){this.ui.message("Can't build inside yourself",1100);return}this.world.setBlock(o,l,c,n),this.inv[e]--,this.audio.place(),this.fx.digDust({x:o,y:l,z:c,id:n},1),this.placeCd=.22,this.player.addXp(1)}}const ie=new dg;async function fg(){await new Promise(t=>requestAnimationFrame(()=>setTimeout(t,40))),ie.world.generate(),ie.SPAWN_READY=!0,ie.player.pos.set(ie.world.SPAWN.x,ie.world.SPAWN.y,ie.world.SPAWN.z),ie.menuCam=!0,ie.state="menu",ie.ui.setContinue(ie.hasSave),ie.ui.showMenu(),ie.ui.hideLoading();const s=new mr(16765600,.35,13,1.7);s.position.set(0,0,0),ie.camera.add(s),ie.headlight=s,ie.hasSave&&ie.ui.notify("Save detected — Continue or start fresh.","","⛁"),ie.audio.init=ie.audio.init.bind(ie.audio)}let jl=performance.now(),la=0,nr=0;function qc(s){requestAnimationFrame(qc);const t=Math.min(.05,Math.max(1e-4,(s-jl)/1e3));if(jl=s,la++,nr+=t,nr>=1&&(ie.fps=Math.round(la/nr),la=0,nr=0),!ie.SPAWN_READY){ie.renderer.render(ie.scene,ie.camera);return}ie.update(t),ie.renderer.render(ie.scene,ie.camera)}fg().then(()=>{requestAnimationFrame(qc),setTimeout(()=>{ie.renderer.render(ie.scene,ie.camera)},120)});window.__game=ie;
