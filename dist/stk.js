!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return t[r].call(u.exports,u,u.exports,e),u.loaded=!0,u.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(1),u=r.store,o=r.createCommand,i=r.createEvent,c=r.defaultProjection,f=n(8),s=n(4);t.exports={store:u,createCommand:o,createEvent:i,defaultProjection:c,devtools:{addStore:f},flushStrategies:s}},function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){return t.reduce(function(t,e){return e.reduce(t,e.update)},e)}function o(t){var e,n=arguments.length<=1||void 0===arguments[1]?p:arguments[1],c=[],s=[],d=n(u);return e={},r(e,v,function(){return this}),r(e,"_eventLog",function(t){return"function"==typeof t&&(t=a.apply(void 0,arguments)),s.push(t),{unsubscribe:function(){s=f(s,t)}}}),r(e,"subscribe",function(t){return"function"==typeof t&&(t=a.apply(void 0,arguments)),this.view(u).subscribe(t)}),r(e,"plug",function(t,e){var n=this.createEvent(e);return t.subscribe({next:n})}),r(e,"view",function(e){var r=arguments.length<=1||void 0===arguments[1]?t:arguments[1],u=[],o=this._eventLog,s=n(e);return{subscribe:function(t){"function"==typeof t&&(t=a.apply(void 0,arguments)),u.push(t);var n=function(){return t.next(e(c,r))};n();var l=o(function(){n();var t=s(c,r),e=i(t,2);r=e[1]});return{unsubscribe:function(){l.unsubscribe(),u=f(u,t)}}}}}),r(e,"transaction",function(){var e=c.length,n=[],r=o(t),u=this._eventLog(r.dispatch),i=r._eventLog(function(t){return n.push(t)});return{store:function(){return r},dispatch:r.dispatch,commit:function(){u.unsubscribe(),i.unsubscribe(),c=c.slice(0,e).concat(n),n.length=0,l(s,b(function(t){return t})())},cancel:function(){u.unsubscribe(),i.unsubscribe(),n.length=0}}}),r(e,"dispatch",function(e){c.push(e),l(s,e);var n=d(c,t),r=i(n,2);c=r[0],t=r[1]}),r(e,"createCommand",function(t){var e=this;return function(){for(var n=arguments.length,r=Array(n),u=0;u<n;u++)r[u]=arguments[u];return new Promise(function(n){var u=e.subscribe(function(e){n(t.apply(void 0,[e].concat(r))),u.unsubscribe()})})}}),r(e,"createEvent",function(t){var e=this;return function(n){return e.dispatch({reduce:t,update:n})}}),e}var i=function(){function t(t,e){var n=[],r=!0,u=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(f){u=!0,o=f}finally{try{!r&&c["return"]&&c["return"]()}finally{if(u)throw o}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c=n(2),f=c.removeItem,s=n(3),a=s.fromCallbacks,l=s.notifyAll,d=n(4),p=d.count100kFlushStrategy,v=n(5),b=function(t){return function(e){return{reduce:t,update:e}}},y=function(t){return t};t.exports={store:o,createEvent:b,createCommand:y,defaultProjection:u}},function(t,e){"use strict";function n(t,e){return t.filter(function(t){return Object.keys(e).every(function(n){return t[n]===e[n]})})}function r(t,e){var n=t.slice(0),r=n.indexOf(e);return n.splice(r,1),n}t.exports={extract:n,removeItem:r}},function(t,e){"use strict";function n(t,e){t.forEach(function(t){return t.next(e)})}function r(t,e,n){return{next:t,error:e,complete:n}}t.exports={notifyAll:n,fromCallbacks:r}},function(t,e){"use strict";function n(t){return function(e,n){var r=t(e,n);return[[],r]}}function r(t){return function(t,e){return[t,e]}}function u(t){return function(e,n){return e.length>=1e5?[[],t(e,n)]:[e,n]}}t.exports={count100kFlushStrategy:u,neverFlushStrategy:r,immediateFlushStrategy:n}},function(t,e,n){t.exports=n(6)},function(t,e,n){(function(t){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var u=n(7),o=r(u),i=void 0;"undefined"!=typeof t?i=t:"undefined"!=typeof window&&(i=window);var c=(0,o["default"])(i);e["default"]=c}).call(e,function(){return this}())},function(t,e){"use strict";function n(t){var e,n=t.Symbol;return"function"==typeof n?n.observable?e=n.observable:(e=n("observable"),n.observable=e):e="@@observable",e}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n},function(t,e){"use strict";t.exports=function(t,e){var n=t.createEvent(function(t,e){return e.state}),r=window.devToolsExtension(function(t,n){return"@@INIT"===n.type?e:n.reduce(t,n.update)});return r.subscribe(function(){return n({_type:"@@RESET",state:r.getState()})}),t._eventLog(function(t){t.update&&"@@RESET"!==t.update._type&&r.dispatch(Object.assign(t,{type:t.reduce.name}))}),r}}])});