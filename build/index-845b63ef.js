import{S as e,i as s,s as t,e as a,a as i,b as o,d as r,c as n,l,n as m,f as d,m as c,h as p,p as u}from"./main.js";const{document:h}=p;function b(e){let s,t,c,p,b,g,S,j,v,x,k,E,M,T,q,z,A,B,C,$,F,P;return{c(){s=a("script"),c=a("base"),p=i(),b=a("h1"),b.textContent="Bolt Action side missions generator",g=i(),S=a("form"),j=a("label"),j.textContent="Player #1",v=i(),x=a("input"),k=i(),E=a("br"),M=i(),T=a("label"),T.textContent="Player #2",q=i(),z=a("input"),A=i(),B=a("br"),C=i(),$=a("input"),s.src!==(t="https://smtpjs.com/v3/smtp.js")&&o(s,"src","https://smtpjs.com/v3/smtp.js"),o(c,"href","/missions"),o(j,"for","email1"),o(x,"type","email"),o(x,"name","email1"),o(x,"pattern",f),o(x,"title","player 1 email address"),x.required=!0,o(x,"placeholder","Enter email"),o(T,"for","email2"),o(z,"type","email"),o(z,"name","email2"),o(z,"pattern",f),o(z,"title","player 2 email address"),z.required=!0,o(z,"placeholder","Enter email"),o($,"type","submit")},m(e,t){r(h.head,s),r(h.head,c),n(e,p,t),n(e,b,t),n(e,g,t),n(e,S,t),r(S,j),r(S,v),r(S,x),r(S,k),r(S,E),r(S,M),r(S,T),r(S,q),r(S,z),r(S,A),r(S,B),r(S,C),r(S,$),F||(P=l(S,"submit",u(y)),F=!0)},p:m,i:m,o:m,d(e){d(s),d(c),e&&d(p),e&&d(b),e&&d(g),e&&d(S),F=!1,P()}}}const f="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";function y(e){const s=Array.from(document.querySelectorAll("a")).filter(e=>e.href.includes("mission")).map(e=>e.href),t=s[(a=s.length,Math.floor(Math.random()*Math.floor(a)))];var a;Email.send({SecureToken:"0b6eed09-ca2b-41ed-9283-2d33686b5dd2",To:e.target.email1.value,From:"missions@philippesimpson.dk",Subject:"You have been assigned a secret side mission",Body:`See your mission <a href=${t}>here</a>`}).then(e=>console.log(e)),Email.send({SecureToken:"0b6eed09-ca2b-41ed-9283-2d33686b5dd2",To:e.target.email2.value,From:"missions@philippesimpson.dk",Subject:"You have been assigned a secret side mission",Body:`See your mission <a href=${t}>here</a>`}).then(e=>console.log(e))}function g(e){return c.title="Mission generator",c.description="Description coming soon...",[]}export default class extends e{constructor(e){super(),s(this,e,g,b,t,{})}}
//# sourceMappingURL=index-845b63ef.js.map