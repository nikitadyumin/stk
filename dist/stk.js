!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=n(1),u=n(7);e.exports={data:r,actions:u}},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){function t(e,t){var n=c(o,{observable:e,reducer:t});n.forEach(function(e){return e.unsubscribe()}),o=n.reduce(i,o)}var n,u=e,o=[],f=[];return n={},r(n,l,function(){return this}),r(n,"reduce",function(e,n){var r=e.subscribe({next:function(e){u=n(u,e),a(f,u)},error:function(e){},complete:function(){t(e,n)}});return o.push({observable:e,reducer:n,subscription:r}),this}),r(n,"remove",function(e,n){t(e,n)}),r(n,"subscribe",function(e){return"function"==typeof e&&(e=s.apply(void 0,arguments)),f.push(e),e.next(u),{unsubscribe:function(){f=i(f,e)}}}),n}var o=n(2),i=o.removeItem,c=o.extract,f=n(3),s=f.fromCallbacks,a=f.notifyAll,l=n(4);e.exports=u},function(e,t){"use strict";function n(e,t){return e.filter(function(e){return Object.keys(t).every(function(n){return e[n]===t[n]})})}function r(e,t){var n=e.slice(0),r=n.indexOf(t);return n.splice(r,1),n}e.exports={extract:n,removeItem:r}},function(e,t){"use strict";function n(e,t){e.forEach(function(e){return e.next(t)})}function r(e,t,n){return{next:e,error:t,complete:n}}e.exports={notifyAll:n,fromCallbacks:r}},function(e,t,n){e.exports=n(5)},function(e,t,n){(function(e){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(6),o=r(u),i=void 0;"undefined"!=typeof e?i=e:"undefined"!=typeof window&&(i=window);var c=(0,o["default"])(i);t["default"]=c}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t,n=e.Symbol;return"function"==typeof n?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){function t(e,t){return e.reduce(function(e,t){return t.reduce(e,t.update)},t)}var n,u=[],o=[];return n={},r(n,a,function(){return this}),r(n,"_project",t),r(n,"_eventLog",function(e){return"function"==typeof e&&(e=f.apply(void 0,arguments)),u.forEach(e.next),o.push(e),{unsubscribe:function(){o=i(o,e)}}}),r(n,"subscribe",function(e){return"function"==typeof e&&(e=f.apply(void 0,arguments)),this.view(t)(e)}),r(n,"view",function(t){var n=[],r=this._eventLog;return{subscribe:function(o){"function"==typeof o&&(o=f.apply(void 0,arguments)),n.push(o);var c=r(function(){o.next(t(u,e))});return{unsubscribe:function(){c.unsubscribe(),n=i(n,o)}}}}}),r(n,"dispatch",function(e){u.push(e),s(o,e)}),r(n,"createEvent",function(e){var t=this;return function(n){return t.dispatch({reduce:e,update:n})}}),n}var o=n(2),i=o.removeItem,c=n(3),f=c.fromCallbacks,s=c.notifyAll,a=n(4);u.createEvent=function(e){return function(t){return{reduce:e,update:t}}},e.exports=u}])});