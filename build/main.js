function e(){}function t(e,t){for(const n in t)e[n]=t[n];return e}function n(e){return e()}function o(){return Object.create(null)}function i(e){e.forEach(n)}function r(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function a(t,...n){if(null==t)return e;const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function c(e){let t;return a(e,e=>t=e)(),t}function l(e,t,n){e.$$.on_destroy.push(a(t,n))}function u(e,t,n,o){if(e){const i=p(e,t,n,o);return e[0](i)}}function p(e,n,o,i){return e[1]&&i?t(o.ctx.slice(),e[1](i(n))):o.ctx}function f(e,t,n,o,i,r,s){const a=function(e,t,n,o){if(e[2]&&o){const i=e[2](o(n));if(void 0===t.dirty)return i;if("object"==typeof i){const e=[],n=Math.max(t.dirty.length,i.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|i[o];return e}return t.dirty|i}return t.dirty}(t,o,i,r);if(a){const i=p(t,n,o,s);e.p(i,a)}}function d(e,t){e.appendChild(t)}function h(e,t,n){e.insertBefore(t,n||null)}function m(e){e.parentNode.removeChild(e)}function g(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function y(e){return document.createElement(e)}function b(e){return document.createTextNode(e)}function $(){return b(" ")}function w(){return b("")}function _(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function v(e){return function(t){return t.preventDefault(),e.call(this,t)}}function x(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function k(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function P(e,t,n,o){e.style.setProperty(t,n,o?"important":"")}function F(e,t,n){e.classList[n?"add":"remove"](t)}let j;function R(e){j=e}function E(){if(!j)throw new Error("Function called outside component initialization");return j}function M(e,t){E().$$.context.set(e,t)}function L(e){return E().$$.context.get(e)}const D=[],I=[],O=[],S=[],T=Promise.resolve();let A=!1;function C(){A||(A=!0,T.then(H))}function N(e){O.push(e)}let B=!1;const q=new Set;function H(){if(!B){B=!0;do{for(let e=0;e<D.length;e+=1){const t=D[e];R(t),U(t.$$)}for(R(null),D.length=0;I.length;)I.pop()();for(let e=0;e<O.length;e+=1){const t=O[e];q.has(t)||(q.add(t),t())}O.length=0}while(D.length);for(;S.length;)S.pop()();A=!1,B=!1,q.clear()}}function U(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(N)}}const K=new Set;let z;function G(){z={r:0,c:[],p:z}}function J(){z.r||i(z.c),z=z.p}function Q(e,t){e&&e.i&&(K.delete(e),e.i(t))}function V(e,t,n,o){if(e&&e.o){if(K.has(e))return;K.add(e),z.c.push(()=>{K.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}}function W(e,t){e.d(1),t.delete(e.key)}function Z(e,t){V(e,1,1,()=>{t.delete(e.key)})}function X(e,t,n,o,i,r,s,a,c,l,u,p){let f=e.length,d=r.length,h=f;const m={};for(;h--;)m[e[h].key]=h;const g=[],y=new Map,b=new Map;for(h=d;h--;){const e=p(i,r,h),a=n(e);let c=s.get(a);c?o&&c.p(e,t):(c=l(a,e),c.c()),y.set(a,g[h]=c),a in m&&b.set(a,Math.abs(h-m[a]))}const $=new Set,w=new Set;function _(e){Q(e,1),e.m(a,u),s.set(e.key,e),u=e.first,d--}for(;f&&d;){const t=g[d-1],n=e[f-1],o=t.key,i=n.key;t===n?(u=t.first,f--,d--):y.has(i)?!s.has(o)||$.has(o)?_(t):w.has(i)?f--:b.get(o)>b.get(i)?(w.add(o),_(t)):($.add(i),f--):(c(n,s),f--)}for(;f--;){const t=e[f];y.has(t.key)||c(t,s)}for(;d;)_(g[d-1]);return g}function Y(e,t){const n={},o={},i={$$scope:1};let r=e.length;for(;r--;){const s=e[r],a=t[r];if(a){for(const e in s)e in a||(o[e]=1);for(const e in a)i[e]||(n[e]=a[e],i[e]=1);e[r]=a}else for(const e in s)i[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}function ee(e){return"object"==typeof e&&null!==e?e:{}}function te(e){e&&e.c()}function ne(e,t,o){const{fragment:s,on_mount:a,on_destroy:c,after_update:l}=e.$$;s&&s.m(t,o),N(()=>{const t=a.map(n).filter(r);c?c.push(...t):i(t),e.$$.on_mount=[]}),l.forEach(N)}function oe(e,t){const n=e.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ie(t,n,r,s,a,c,l=[-1]){const u=j;R(t);const p=n.props||{},f=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:a,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:l,skip_bound:!1};let d=!1;if(f.ctx=r?r(t,p,(e,n,...o)=>{const i=o.length?o[0]:n;return f.ctx&&a(f.ctx[e],f.ctx[e]=i)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](i),d&&function(e,t){-1===e.$$.dirty[0]&&(D.push(e),C(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(t,e)),n}):[],f.update(),d=!0,i(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);f.fragment&&f.fragment.l(e),e.forEach(m)}else f.fragment&&f.fragment.c();n.intro&&Q(t.$$.fragment),ne(t,n.target,n.anchor),H()}R(u)}class re{$destroy(){oe(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const se=[];function ae(t,n=e){let o;const i=[];function r(e){if(s(t,e)&&(t=e,o)){const e=!se.length;for(let e=0;e<i.length;e+=1){const n=i[e];n[1](),se.push(n,t)}if(e){for(let e=0;e<se.length;e+=2)se[e][0](se[e+1]);se.length=0}}}return{set:r,update:function(e){r(e(t))},subscribe:function(s,a=e){const c=[s,a];return i.push(c),1===i.length&&(o=n(r)||e),s(t),()=>{const e=i.indexOf(c);-1!==e&&i.splice(e,1),0===i.length&&(o(),o=null)}}}}function ce(t,n,o){const s=!Array.isArray(t),c=s?[t]:t,l=n.length<2;return{subscribe:ae(o,t=>{let o=!1;const u=[];let p=0,f=e;const d=()=>{if(p)return;f();const o=n(s?u[0]:u,t);l?t(o):f=r(o)?o:e},h=c.map((e,t)=>a(e,e=>{u[t]=e,p&=~(1<<t),o&&d()},()=>{p|=1<<t}));return o=!0,d(),function(){i(h),f()}}).subscribe}}var le={queryHandler:{parse:e=>{return t=new URLSearchParams(e),[...t].reduce((e,[t,n])=>(e[t]=n,e),{});var t},stringify:e=>"?"+new URLSearchParams(e).toString()},urlTransform:{apply:e=>e,remove:e=>e},useHash:!1};const ue=RegExp(/\:([^/()]+)/g);function pe(e){if(navigator.userAgent.includes("jsdom"))return!1;!function e(t){t&&t.scrollTo&&"scroll-lock"!==t.dataset.routify&&"lock"!==t.dataset["routify-scroll"]&&(t.style["scroll-behavior"]="auto",t.scrollTo({top:0,behavior:"auto"}),t.style["scroll-behavior"]="",e(t.parentElement))}(e),function(){if(navigator.userAgent.includes("jsdom"))return!1;const{hash:e}=window.location;if(e){if(/^[A-Za-z]+[\w\-\:\.]*$/.test(e.substring(1))){const t=document.querySelector(e);t&&t.scrollIntoView()}}}()}const fe=e=>{const t=[];let n;for(;n=ue.exec(e);)t.push(n[1]);return t};let de=!1;function he(){const e=function(){const e=window.location.search.match(/__routify_path=([^&]+)/),t=window.location.search.match(/__routify_prefetch=\d+/);window.routify=window.routify||{},window.routify.prefetched=!!t;return e&&e[1].replace(/[#?].+/,"")}();return e||(le.useHash?window.location.hash.replace(/#/,""):window.location.pathname)}window.routify=window.routify||{};const me=ae(null),ge=ae([]);ge.subscribe(e=>window.routify.routes=e);let ye=ae({component:{params:{}}});const be=ae(null);function $e(e){e=le.urlTransform.remove(e);const t=c(ge),n=t.find(t=>e===t.meta.name)||t.find(t=>e.match("^"+t.regex));if(!n)throw new Error(`Route could not be found for "${e}".`);const o=e;if(le.queryHandler&&(n.params=le.queryHandler.parse(window.location.search)),n.paramKeys){const e=function(e){const t=[];return e.forEach(e=>{t[e.path.split("/").filter(Boolean).length-1]=e}),t}(n.layouts),t=o.split("/").filter(Boolean);(function(e){return e.split("/").filter(Boolean).map(e=>e.match(/\:(.+)/)).map(e=>e&&e[1])})(n.path).forEach((o,i)=>{o&&(n.params[o]=t[i],e[i]?e[i].param={[o]:t[i]}:n.param={[o]:t[i]})})}return n.leftover=e.replace(new RegExp(n.regex),""),n}function we(e,t,n){const o=e.slice();return o[1]=t[n],o}function _e(e,t){let n,o;return{key:e,first:null,c(){n=y("iframe"),n.src!==(o=t[1].url)&&x(n,"src",o),x(n,"frameborder","0"),x(n,"title","routify prefetcher"),this.first=n},m(e,t){h(e,n,t)},p(e,t){1&t&&n.src!==(o=e[1].url)&&x(n,"src",o)},d(e){e&&m(n)}}}function ve(t){let n,o=[],i=new Map,r=t[0];const s=e=>e[1].options.prefetch;for(let e=0;e<r.length;e+=1){let n=we(t,r,e),a=s(n);i.set(a,o[e]=_e(a,n))}return{c(){n=y("div");for(let e=0;e<o.length;e+=1)o[e].c();x(n,"id","__routify_iframes"),P(n,"display","none")},m(e,t){h(e,n,t);for(let e=0;e<o.length;e+=1)o[e].m(n,null)},p(e,[t]){if(1&t){const r=e[0];o=X(o,t,s,1,e,r,i,n,W,_e,null,we)}},i:e,o:e,d(e){e&&m(n);for(let e=0;e<o.length;e+=1)o[e].d()}}}const xe=ae([]),ke=ce(xe,e=>e.slice(0,2));function Pe(e){const t=e.data?e.data.prefetchId:e;if(!t)return null;const n=c(xe).find(e=>e&&e.options.prefetch==t);if(n){const{gracePeriod:e}=n.options,o=new Promise(t=>setTimeout(t,e)),i=new Promise(t=>{window.requestIdleCallback?window.requestIdleCallback(t):setTimeout(t,e+1e3)});Promise.all([o,i]).then(()=>{xe.update(e=>e.filter(e=>e.options.prefetch!=t))})}}function Fe(e,t,n){let o;return l(e,ke,e=>n(0,o=e)),[o]}ke.subscribe(e=>e.forEach(({options:e})=>{setTimeout(()=>Pe(e.prefetch),e.timeout)})),addEventListener("message",Pe,!1);class je extends re{constructor(e){super(),ie(this,e,Fe,ve,s,{})}}function Re(){return L("routify")||ye}const Ee={subscribe:e=>ce(Re(),e=>e.layout.api).subscribe(e)},Me={_hooks:[],subscribe:De},Le={_hooks:[],subscribe:De};function De(e){const t=this._hooks,n=t.length;return e(e=>{t[n]=e}),()=>delete t[n]}const Ie={subscribe:e=>ce([Re(),me,ge],e=>function(e,t,n){return function(o,i,r){const{component:s}=e;let a=o&&o.nodeType&&o;a&&(o=o.getAttribute("href")),o=function(e){if(e)if(e.match(/^\.\.?\//)){let[,t,n]=e.match(/^([\.\/]+)(.*)/),o=s.path.replace(/\/$/,"");const i=t.match(/\.\.\//g)||[];s.isPage&&i.push(null),i.forEach(()=>o=o.replace(/\/[^\/]+\/?$/,"")),e=(e=`${o}/${n}`.replace(/\/$/,""))||"/"}else if(e.match(/^\//));else{const t=n.find(t=>t.meta.name===e);t&&(e=t.shortPath)}else e=s.shortPath;return e}(o);r&&!1!==r.strict||(o=o.replace(/index$/,""));let c=l(o,i);return a?(a.href=c,{update(e){a.href=l(o,e)}}):le.urlTransform.apply(c);function l(e,n){const o=function(e,n){const o=Object.assign({},t.params,s.params,n);let i=e;for(const[e,t]of Object.entries(o))i=i.replace(":"+e,t);return(i+function(e,t){if(!le.queryHandler)return"";const n=fe(e),o={};t&&Object.entries(t).forEach(([e,t])=>{n.includes(e)||(o[e]=t)});return le.queryHandler.stringify(o)}(e,n)).replace(/\?$/,"")}(e,n);return le.useHash?"#"+o:o}}}(...e)).subscribe(e)};const Oe={subscribe:e=>ce([Ie,me],([e,t])=>function(n="",o={},{strict:i}={strict:!0}){n=e(n,null,{strict:i});const r=e(t.path,null,{strict:i}),s=new RegExp("^"+n+"($|/)");return!!r.match(s)}).subscribe(e)},Se={props:{},templates:{},services:{plain:{propField:"name",valueField:"content"},twitter:{propField:"name",valueField:"content"},og:{propField:"property",valueField:"content"}},plugins:[{name:"applyTemplate",condition:()=>!0,action:(e,t)=>[e,(Se.getLongest(Se.templates,e)||(e=>e))(t)]},{name:"createMeta",condition:()=>!0,action(e,t){Se.writeMeta(e,t)}},{name:"createOG",condition:e=>!e.match(":"),action(e,t){Se.writeMeta("og:"+e,t)}},{name:"createTitle",condition:e=>"title"===e,action(e,t){document.title=t}}],getLongest(e,t){const n=e[t];if(n){const o=c(me).path;return n[Object.keys(e[t]).filter(e=>o.includes(e)).sort((e,t)=>t.length-e.length)[0]]}},writeMeta(e,t){const n=document.getElementsByTagName("head")[0],o=e.match(/(.+)\:/),i=o&&o[1]||"plain",{propField:r,valueField:s}=Te.services[i]||Te.services.plain,a=document.querySelector(`meta[${r}='${e}']`);a&&a.remove();const c=document.createElement("meta");c.setAttribute(r,e),c.setAttribute(s,t),c.setAttribute("data-origin","routify"),n.appendChild(c)},set(e,t){Se.plugins.forEach(n=>{n.condition(e,t)&&([e,t]=n.action(e,t)||[e,t])})},clear(){const e=document.querySelector("meta");e&&e.remove()},template(e,t){const n=Se.getOrigin();Se.templates[e]=Se.templates[e]||{},Se.templates[e][n]=t},update(){Object.keys(Se.props).forEach(e=>{let t=Se.getLongest(Se.props,e);Se.plugins.forEach(n=>{n.condition(e,t)&&([e,t]=n.action(e,t)||[e,t])})})},batchedUpdate(){Se._pendingUpdate||(Se._pendingUpdate=!0,setTimeout(()=>{Se._pendingUpdate=!1,this.update()}))},_updateQueued:!1,getOrigin(){const e=Re();return e&&c(e).path||"/"},_pendingUpdate:!1},Te=new Proxy(Se,{set(e,t,n,o){const{props:i,getOrigin:r}=e;return Reflect.has(e,t)?Reflect.set(e,t,n,o):(i[t]=i[t]||{},i[t][r()]=n),window.routify.appLoaded&&e.batchedUpdate(),!0}});!function(){const e=ae(!0);Le.subscribe(t=>t(t=>e.set(!0)||!0)),Me.subscribe(t=>t(t=>e.set(!1)))}();function Ae(e,t,n){const o=e.slice();return o[18]=t[n].component,o[19]=t[n].componentFile,o}function Ce(e,t,n){const o=e.slice();return o[18]=t[n].component,o[19]=t[n].componentFile,o}function Ne(e){let t,n,o,i;const r=[qe,Be],s=[];function a(e,t){return!1===e[6].component.isLayout?0:e[5].length?1:-1}return~(t=a(e))&&(n=s[t]=r[t](e)),{c(){n&&n.c(),o=w()},m(e,n){~t&&s[t].m(e,n),h(e,o,n),i=!0},p(e,i){let c=t;t=a(e),t===c?~t&&s[t].p(e,i):(n&&(G(),V(s[c],1,1,()=>{s[c]=null}),J()),~t?(n=s[t],n||(n=s[t]=r[t](e),n.c()),Q(n,1),n.m(o.parentNode,o)):n=null)},i(e){i||(Q(n),i=!0)},o(e){V(n),i=!1},d(e){~t&&s[t].d(e),e&&m(o)}}}function Be(e){let t,n,o=[],i=new Map,r=[e[6]];const s=e=>e[18].path;for(let t=0;t<1;t+=1){let n=Ae(e,r,t),a=s(n);i.set(a,o[t]=Ue(a,n))}return{c(){for(let e=0;e<1;e+=1)o[e].c();t=w()},m(e,i){for(let t=0;t<1;t+=1)o[t].m(e,i);h(e,t,i),n=!0},p(e,n){if(50331767&n){const r=[e[6]];G(),o=X(o,n,s,1,e,r,i,t.parentNode,Z,Ue,t,Ae),J()}},i(e){if(!n){for(let e=0;e<1;e+=1)Q(o[e]);n=!0}},o(e){for(let e=0;e<1;e+=1)V(o[e]);n=!1},d(e){for(let t=0;t<1;t+=1)o[t].d(e);e&&m(t)}}}function qe(e){let t,n,o=[],i=new Map,r=[e[6]];const s=e=>function(e){const t=e.meta&&e.meta["param-is-page"]?JSON.stringify(e.param):"";return e.path+t}(e[18]);for(let t=0;t<1;t+=1){let n=Ce(e,r,t),a=s(n);i.set(a,o[t]=Ke(a,n))}return{c(){for(let e=0;e<1;e+=1)o[e].c();t=w()},m(e,i){for(let t=0;t<1;t+=1)o[t].m(e,i);h(e,t,i),n=!0},p(e,n){if(85&n){const r=[e[6]];G(),o=X(o,n,s,1,e,r,i,t.parentNode,Z,Ke,t,Ce),J()}},i(e){if(!n){for(let e=0;e<1;e+=1)Q(o[e]);n=!0}},o(e){for(let e=0;e<1;e+=1)V(o[e]);n=!1},d(e){for(let t=0;t<1;t+=1)o[t].d(e);e&&m(t)}}}function He(e){let t,n,o;return t=new Qe({props:{layouts:[...e[5]],Decorator:void 0!==e[25]?e[25]:e[1],childOfDecorator:e[4].isDecorator,scoped:{...e[0],...e[24]}}}),{c(){te(t.$$.fragment),n=$()},m(e,i){ne(t,e,i),h(e,n,i),o=!0},p(e,n){const o={};32&n&&(o.layouts=[...e[5]]),33554434&n&&(o.Decorator=void 0!==e[25]?e[25]:e[1]),16&n&&(o.childOfDecorator=e[4].isDecorator),16777217&n&&(o.scoped={...e[0],...e[24]}),t.$set(o)},i(e){o||(Q(t.$$.fragment,e),o=!0)},o(e){V(t.$$.fragment,e),o=!1},d(e){oe(t,e),e&&m(n)}}}function Ue(e,n){let o,i,r,s;const a=[{scoped:n[0]},{scopedSync:n[2]},n[4].param||{}];var c=n[19];function l(e){let n={$$slots:{default:[He,({scoped:e,decorator:t})=>({24:e,25:t}),({scoped:e,decorator:t})=>(e?16777216:0)|(t?33554432:0)]},$$scope:{ctx:e}};for(let e=0;e<a.length;e+=1)n=t(n,a[e]);return{props:n}}return c&&(i=new c(l(n))),{key:e,first:null,c(){o=w(),i&&te(i.$$.fragment),r=w(),this.first=o},m(e,t){h(e,o,t),i&&ne(i,e,t),h(e,r,t),s=!0},p(e,t){const n=21&t?Y(a,[1&t&&{scoped:e[0]},4&t&&{scopedSync:e[2]},16&t&&ee(e[4].param||{})]):{};if(117440563&t&&(n.$$scope={dirty:t,ctx:e}),c!==(c=e[19])){if(i){G();const e=i;V(e.$$.fragment,1,0,()=>{oe(e,1)}),J()}c?(i=new c(l(e)),te(i.$$.fragment),Q(i.$$.fragment,1),ne(i,r.parentNode,r)):i=null}else c&&i.$set(n)},i(e){s||(i&&Q(i.$$.fragment,e),s=!0)},o(e){i&&V(i.$$.fragment,e),s=!1},d(e){e&&m(o),e&&m(r),i&&oe(i,e)}}}function Ke(e,n){let o,i,r,s;const a=[{scoped:n[0]},{scopedSync:n[2]},n[4].param||{}];var c=n[19];function l(e){let n={};for(let e=0;e<a.length;e+=1)n=t(n,a[e]);return{props:n}}return c&&(i=new c(l())),{key:e,first:null,c(){o=w(),i&&te(i.$$.fragment),r=w(),this.first=o},m(e,t){h(e,o,t),i&&ne(i,e,t),h(e,r,t),s=!0},p(e,t){const n=21&t?Y(a,[1&t&&{scoped:e[0]},4&t&&{scopedSync:e[2]},16&t&&ee(e[4].param||{})]):{};if(c!==(c=e[19])){if(i){G();const e=i;V(e.$$.fragment,1,0,()=>{oe(e,1)}),J()}c?(i=new c(l()),te(i.$$.fragment),Q(i.$$.fragment,1),ne(i,r.parentNode,r)):i=null}else c&&i.$set(n)},i(e){s||(i&&Q(i.$$.fragment,e),s=!0)},o(e){i&&V(i.$$.fragment,e),s=!1},d(e){e&&m(o),e&&m(r),i&&oe(i,e)}}}function ze(t){let n,o,i,s;return{c(){n=y("span")},m(a,c){var l;h(a,n,c),i||(l=o=t[8].call(null,n),s=l&&r(l.destroy)?l.destroy:e,i=!0)},d(e){e&&m(n),i=!1,s()}}}function Ge(e){let t,n,o,i=e[6]&&Ne(e),r=!e[3]&&ze(e);return{c(){i&&i.c(),t=$(),r&&r.c(),n=w()},m(e,s){i&&i.m(e,s),h(e,t,s),r&&r.m(e,s),h(e,n,s),o=!0},p(e,[o]){e[6]?i?(i.p(e,o),64&o&&Q(i,1)):(i=Ne(e),i.c(),Q(i,1),i.m(t.parentNode,t)):i&&(G(),V(i,1,1,()=>{i=null}),J()),e[3]?r&&(r.d(1),r=null):r||(r=ze(e),r.c(),r.m(n.parentNode,n))},i(e){o||(Q(i),o=!0)},o(e){V(i),o=!1},d(e){i&&i.d(e),e&&m(t),r&&r.d(e),e&&m(n)}}}function Je(e,t,n){let o,i;l(e,me,e=>n(13,o=e));let r,{layouts:s=[]}=t,{scoped:a={}}=t,{Decorator:u=null}=t,{childOfDecorator:p=!1}=t,{isRoot:f=!1}=t,d={},h=!1,m=null,g=[];const y=ae(null);l(e,y,e=>n(6,i=e));const b=L("routify");function $(e){const t=c(b);n(2,d={...a}),0===g.length&&async function(){await(C(),T),pe(r);const e=i.component.path===o.path;!window.routify.stopAutoReady&&e&&async function({page:e,metatags:t,afterPageLoad:n}){const{path:o}=e,i=window.location.search.match(/__routify_prefetch=(\d+)/),r=i&&i[1];for(const t of n._hooks)t&&await t(e.api);t.update(),dispatchEvent(new CustomEvent("app-loaded")),parent.postMessage({msg:"app-loaded",prefetched:window.routify.prefetched,path:o,prefetchId:r},"*"),window.routify.appLoaded=!0,window.routify.stopAutoReady=!1}({page:i.component,metatags:Te,afterPageLoad:Me})}();const s={layout:h?t.layout:m,component:m,route:o,componentFile:e,child:h?t.child:c(y)&&c(y).child};y.set(s),f&&ye.set(s),t&&!h&&b.update(e=>(e.child=m||e.child,e))}return h=u&&!p,M("routify",y),e.$$set=e=>{"layouts"in e&&n(9,s=e.layouts),"scoped"in e&&n(0,a=e.scoped),"Decorator"in e&&n(1,u=e.Decorator),"childOfDecorator"in e&&n(10,p=e.childOfDecorator),"isRoot"in e&&n(11,f=e.isRoot)},e.$$.update=()=>{if(4610&e.$$.dirty&&h){const e={component:()=>u,path:s[0].path+"__decorator",isDecorator:!0};n(9,s=[e,...s])}512&e.$$.dirty&&n(4,[m,...g]=s,m,(n(5,g),n(9,s),n(12,h),n(1,u))),16&e.$$.dirty&&function(e){let t=e.component();t instanceof Promise?t.then($):$(t)}(m)},[a,u,d,r,m,g,i,y,function(e){n(3,r=e.parentElement)},s,p,f]}class Qe extends re{constructor(e){super(),ie(this,e,Je,Ge,s,{layouts:9,scoped:0,Decorator:1,childOfDecorator:10,isRoot:11})}}function Ve(e,t){let n=!1;function o(e,o){const i=$e(e||he()),r=[...(o&&$e(he())||i).layouts,i];n&&delete n.last,i.last=n,n=i,e||be.set(i),me.set(i),t(r)}const i=function(e){["pushState","replaceState"].forEach(e=>{const t=history[e];history[e]=async function(n={},o,i){const{id:r,path:s,params:a}=c(me);n={id:r,path:s,params:a,...n};const l=new Event(e.toLowerCase());if(Object.assign(l,{state:n,title:o,url:i}),await Ze(l))return t.apply(this,[n,o,i]),dispatchEvent(l)}});let t=!1;const n={click:We,pushstate:()=>e(),replacestate:()=>e(),popstate:async n=>{t?t=!1:await Ze(n)?e():(t=!0,n.preventDefault(),history.go(1))}};Object.entries(n).forEach(e=>addEventListener(...e));return()=>{Object.entries(n).forEach(e=>removeEventListener(...e))}}(o);return{updatePage:o,destroy:i}}function We(e){const t=e.target.closest("a"),n=t&&t.getAttribute("href");e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button||e.defaultPrevented||n&&!t.target&&t.host===location.host&&(e.preventDefault(),history.pushState({},"",n))}async function Ze(e){const t=c(me);for(const n of Le._hooks.filter(Boolean)){if(!await n(e,t))return!1}return!0}function Xe(e){let t,n;return t=new Qe({props:{layouts:e[0],isRoot:!0}}),{c(){te(t.$$.fragment)},m(e,o){ne(t,e,o),n=!0},p(e,n){const o={};1&n&&(o.layouts=e[0]),t.$set(o)},i(e){n||(Q(t.$$.fragment,e),n=!0)},o(e){V(t.$$.fragment,e),n=!1},d(e){oe(t,e)}}}function Ye(e){let t,n,o,i=e[0]&&null!==e[1]&&Xe(e);return n=new je({}),{c(){i&&i.c(),t=$(),te(n.$$.fragment)},m(e,r){i&&i.m(e,r),h(e,t,r),ne(n,e,r),o=!0},p(e,[n]){e[0]&&null!==e[1]?i?(i.p(e,n),3&n&&Q(i,1)):(i=Xe(e),i.c(),Q(i,1),i.m(t.parentNode,t)):i&&(G(),V(i,1,1,()=>{i=null}),J())},i(e){o||(Q(i),Q(n.$$.fragment,e),o=!0)},o(e){V(i),V(n.$$.fragment,e),o=!1},d(e){i&&i.d(e),e&&m(t),oe(n,e)}}}function et(e,t,n){let o;l(e,me,e=>n(1,o=e));let i,r,{routes:s}=t,{config:a={}}=t;window.routify=window.routify||{},window.routify.inBrowser=!window.navigator.userAgent.match("jsdom"),Object.entries(a).forEach(([e,t])=>{le[e]=t}),function(){if(de)return;const e=console.warn;console.warn=function(t,...n){if(!["was created with unknown prop 'scoped'","was created with unknown prop 'scopedSync'"].find(e=>t.includes(e)))return e(t,...n)},de=!0}();M("routifyupdatepage",(...e)=>r&&r.updatePage(...e));const c=e=>n(0,i=e),u=()=>{r&&(r.destroy(),r=null)};let p=null;var f;return f=u,E().$$.on_destroy.push(f),e.$$set=e=>{"routes"in e&&n(2,s=e.routes),"config"in e&&n(3,a=e.config)},e.$$.update=()=>{4&e.$$.dirty&&s&&(clearTimeout(p),p=setTimeout(()=>{u(),r=Ve(0,c),ge.set(s),r.updatePage()}))},[i,o,s,a]}class tt extends re{constructor(e){super(),ie(this,e,et,Ye,s,{routes:2,config:3})}}function nt(e){const t=async function(t){return await async function e(t,n){const o=await t(n);if(!1===o)return!1;const i=o||n.file;if(i.children){const o=await Promise.all(i.children.map(async o=>e(t,{state:n.state,scope:ot(n.scope||{}),parent:n.file,file:await o})));i.children=o.filter(Boolean)}return i}(e,{file:t.tree,state:{treePayload:t},scope:{}})};return t.sync=function(t){return function e(t,n){const o=t(n);if(!1===o)return!1;const i=o||n.file;if(i.children){const o=i.children.map(o=>e(t,{state:n.state,scope:ot(n.scope||{}),parent:n.file,file:o}));i.children=o.filter(Boolean)}return i}(e,{file:t.tree,state:{treePayload:t},scope:{}})},t}function ot(e){return JSON.parse(JSON.stringify(e))}const it=nt(({file:e})=>{(e.isPage||e.isFallback)&&(e.regex=((e,t)=>{const n=t?"":"/?$";return e=(e=(e=e.replace(/\/_fallback?$/,"(/|$)")).replace(/\/index$/,"(/index)?")).replace(ue,"([^/]+)")+n})(e.path,e.isFallback))}),rt=nt(({file:e})=>{e.paramKeys=fe(e.path)}),st=nt(({file:e})=>{e.isFallback||e.isIndex?e.shortPath=e.path.replace(/\/[^/]+$/,""):e.shortPath=e.path}),at=nt(({file:e})=>{e.ranking=(({path:e})=>e.split("/").filter(Boolean).map(e=>"_fallback"===e?"A":e.startsWith(":")?"B":"C").join(""))(e)}),ct=nt(({file:e})=>{const t=e,n=e.meta&&e.meta.children||[];n.length&&(t.children=t.children||[],t.children.push(...n.map(e=>({isMeta:!0,...e,meta:e}))))}),lt=nt(e=>{const{file:t}=e,{isFallback:n,meta:o}=t;t.isIndexable=!n&&!1!==o.index,t.isNonIndexable=!t.isIndexable}),ut=nt(({file:e,parent:t})=>{Object.defineProperty(e,"parent",{get:()=>t}),Object.defineProperty(e,"nextSibling",{get:()=>pt(e,1)}),Object.defineProperty(e,"prevSibling",{get:()=>pt(e,-1)}),Object.defineProperty(e,"lineage",{get:()=>function e(t,n=[]){t&&(n.unshift(t),e(t.parent,n));return n}(t)})});function pt(e,t){if(!e.root){const n=e.parent.children.filter(e=>e.isIndexable),o=n.indexOf(e);return n[o+t]}}const ft=nt(({file:e,parent:t})=>{e.isIndex&&Object.defineProperty(t,"index",{get:()=>e})}),dt=nt(({file:e,scope:t})=>{Object.defineProperty(e,"layouts",{get:()=>function e(t){const{parent:n}=t,o=n&&n.component&&n,i=o&&o.isReset,r=n&&!i&&e(n)||[];o&&r.push(o);return r}(e)})}),ht=nt(({file:e})=>{const t=e.root?function(){}:e.children?(e.isFile,function(){}):(e.isReset||e.isLayout||e.isFallback,function(){});Object.setPrototypeOf(e,t.prototype)});var mt=Object.freeze({__proto__:null,setRegex:it,setParamKeys:rt,setShortPath:st,setRank:at,addMetaChildren:ct,setIsIndexable:lt,assignRelations:ut,assignIndex:ft,assignLayout:dt,createFlatList:e=>{nt(e=>{(e.file.isPage||e.file.isFallback)&&e.state.treePayload.routes.push(e.file)}).sync(e),e.routes.sort((e,t)=>e.ranking>=t.ranking?-1:1)},setPrototype:ht});const gt=nt(({file:e})=>{e.api=new yt(e)});class yt{constructor(e){this.__file=e,Object.defineProperty(this,"__file",{enumerable:!1}),this.isMeta=!!e.isMeta,this.path=e.path,this.title=function(e){return void 0!==e.meta.title?e.meta.title:(e.shortPath||e.path).split("/").pop().replace(/-/g," ")}(e),this.meta=e.meta}get parent(){return!this.__file.root&&this.__file.parent.api}get children(){return(this.__file.children||this.__file.isLayout&&this.__file.parent.children||[]).filter(e=>!e.isNonIndexable).sort((e,t)=>e.isMeta&&t.isMeta?0:(e=(e.meta.index||e.meta.title||e.path).toString(),t=(t.meta.index||t.meta.title||t.path).toString(),e.localeCompare(t,void 0,{numeric:!0,sensitivity:"base"}))).map(({api:e})=>e)}get next(){return bt(this,1)}get prev(){return bt(this,-1)}preload(){this.__file.layouts.forEach(e=>e.component()),this.__file.component()}}function bt(e,t){if(!e.__file.root){const n=e.parent.children.indexOf(e);return e.parent.children[n+t]}}const $t={...mt,assignAPI:gt};const wt={name:"_folder",filepath:"/_folder.svelte",root:!0,ownMeta:{},absolutePath:"/home/runner/work/coprolit.github.io/coprolit.github.io/src/pages/_folder.svelte",children:[{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!0,isPage:!1,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/_fallback",id:"__fallback",component:()=>import("./_fallback-9fcecb1a.js").then(e=>e.default)},{isFile:!0,isDir:!0,ext:"svelte",children:[{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Control-The-Flanks",id:"_missions_ControlTheFlanks",component:()=>import("./Control-The-Flanks-8fed5ca5.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Decapitation",id:"_missions_Decapitation",component:()=>import("./Decapitation-baaf9642.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Envelopment",id:"_missions_Envelopment",component:()=>import("./Envelopment-60cf83ed.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Fuel-Shortage",id:"_missions_FuelShortage",component:()=>import("./Fuel-Shortage-784880be.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Hold-This",id:"_missions_HoldThis",component:()=>import("./Hold-This-98d41347.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/keep-up-the-pressure",id:"_missions_keepUpThePressure",component:()=>import("./keep-up-the-pressure-733d59d9.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Probe-Defences",id:"_missions_ProbeDefences",component:()=>import("./Probe-Defences-d4145f49.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Reckless-bravery",id:"_missions_RecklessBravery",component:()=>import("./Reckless-bravery-e860e9d4.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Shock-and-awe",id:"_missions_ShockAndAwe",component:()=>import("./Shock-and-awe-a4e2b154.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/Take-Prisoners",id:"_missions_TakePrisoners",component:()=>import("./Take-Prisoners-5b9fe0bb.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions/The-Mole",id:"_missions_TheMole",component:()=>import("./The-Mole-5798aa7f.js").then(e=>e.default)}],isLayout:!0,isReset:!1,isIndex:!1,isFallback:!1,isPage:!1,ownMeta:{},meta:{recursive:!0,preload:!1,prerender:!0},path:"/missions",id:"_missions__layout",component:()=>import("./_layout-a0e9defb.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{title:"About"},meta:{title:"About",recursive:!0,preload:!1,prerender:!0},path:"/about",id:"_about",component:()=>import("./about-6b6656a0.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{title:"Conditions"},meta:{title:"Conditions",recursive:!0,preload:!1,prerender:!0},path:"/conditions",id:"_conditions",component:()=>import("./conditions-f7fcc113.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!0,isFallback:!1,isPage:!0,ownMeta:{title:"Generator"},meta:{title:"Generator",recursive:!0,preload:!1,prerender:!0},path:"/index",id:"_index",component:()=>import("./index-7356e8a0.js").then(e=>e.default)},{isFile:!0,isDir:!1,ext:"svelte",isLayout:!1,isReset:!1,isIndex:!1,isFallback:!1,isPage:!0,ownMeta:{title:"Missions"},meta:{title:"Missions",recursive:!0,preload:!1,prerender:!0},path:"/missions",id:"_missions",component:()=>import("./missions-c8a8342c.js").then(e=>e.default)}],isLayout:!0,isReset:!1,isIndex:!1,isFallback:!1,isPage:!1,isFile:!0,file:"_folder.svelte",ext:"svelte",badExt:!1,importPath:"../src/pages/_folder.svelte",meta:{recursive:!0,preload:!1,prerender:!0},path:"/",id:"__folder",component:()=>import("./_folder-a8655010.js").then(e=>e.default)},{tree:_t,routes:vt}=function(e){const t=["setParamKeys","setRegex","setShortPath","setRank","assignLayout","setPrototype","addMetaChildren","assignRelations","setIsIndexable","assignIndex","assignAPI","createFlatList"],n={tree:e,routes:[]};for(let e of t){($t[e].sync||$t[e])(n)}return n}(wt);function xt(t){let n,o;return n=new tt({props:{routes:vt}}),{c(){te(n.$$.fragment)},m(e,t){ne(n,e,t),o=!0},p:e,i(e){o||(Q(n.$$.fragment,e),o=!0)},o(e){V(n.$$.fragment,e),o=!1},d(e){oe(n,e)}}}!function(e,t={target:document.body},n="hmr",o="app-loaded"){const i=document.getElementById(n),r=document.createElement("div");i?r.style.visibility="hidden":r.setAttribute("id",n),t.target.appendChild(r),addEventListener(o,(function(){i&&i.remove();r.style.visibility="initial",r.setAttribute("id",n)})),new e({...t,target:r})}(class extends re{constructor(e){super(),ie(this,e,null,xt,s,{})}},{target:document.body},"routify-app");export{re as S,$ as a,x as b,h as c,d,y as e,m as f,l as g,u as h,ie as i,f as j,Q as k,_ as l,V as m,e as n,k as o,v as p,Te as q,i as r,s,b as t,Ie as u,Ee as v,F as w,g as x,Oe as y,P as z};
//# sourceMappingURL=main.js.map
