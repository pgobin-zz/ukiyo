/*
 * Wallaby.js - v1.0.714
 * https://wallabyjs.com
 * Copyright (c) 2014-2019 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
!function(e){e.addEventListener&&(e.addEventListener("beforeunload",function(){if(!(e.$_$tracer&&e.$_$tracer._finished||e.navigator&&e.navigator.userAgent&&!/PhantomJS/.test(e.navigator.userAgent)&&!/Electron/.test(e.navigator.userAgent)&&!e.$_$tracer._startRequested)&&e.$_$throwOnBeforeunload)throw new Error("One of your tests is trying to unload window object.")}),e.$_$reportUnhanledPromises&&e.addEventListener("unhandledrejection",function(e){if(e&&e.reason){var t=new Error;throw e.reason.stack&&(t.stack=e.reason.stack),t.message="Unhandled promise rejection: "+(e.reason.message||e.reason),t}}));var t,n=/%[sdjc%]/g,i=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/,r=/^(0|[1-9][0-9]*)$/,o=/'([^\\']|\\')*'/;"function"!=typeof Function.prototype.bind&&(Function.prototype.bind=function(e){var t=Array.prototype.slice.call(arguments,1),n=this,i=function(){},r=function(){return n.apply(this instanceof i?this:e||{},t.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype||{},r.prototype=new i,r});var a=function(){var t=this;t._noOp=function(){},t._maxLogEntrySize=e.$_$maxLogEntrySize||16384,t._evaluatedExpressionPerRangeLimit=10,t._undefined=e.undefined,t._setTimeout=e.setTimeout,t._Date=e.Date,t._Error=e.Error,t._Symbol=e.Symbol,t._JSONStringify=JSON.stringify,t._XMLHttpRequest=e.XMLHttpRequest,t._regExpToString=RegExp.prototype.toString,t._dateToString=Date.prototype.toString,t._HTMLAllCollection=e.HTMLAllCollection,t._getOwnPropertyNames=Object.getOwnPropertyNames,t._getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,t._pauseAfterSingleTestExecution=e.navigator&&e.navigator.userAgent&&/PhantomJS/.test(e.navigator.userAgent),t._replacedConsoleLog=e.console.log=function(){t._suppressConsoleLog||t._doWhenReceiverIsReady(function(e){t._log.apply(t,e)},arguments)},e.console.warn=function(){t._doWhenReceiverIsReady(function(e){t._warn.apply(t,e)},arguments)},e.console.error=function(){t._doWhenReceiverIsReady(function(e){t._error.apply(t,e)},arguments)},e.console.dir=function(){t._doWhenReceiverIsReady(function(e){t._dir.apply(t,e)},arguments)},e.console.debug=function(){t._doWhenReceiverIsReady(function(e){t._debug.apply(t,e)},arguments)},e.console.info=function(){t._doWhenReceiverIsReady(function(e){t._info.apply(t,e)},arguments)},t._receiver=e.$_$receiver||new e.WebSocket("ws://127.0.0.1:"+e.$_$receiverPort),t._onReceiverReady=[function(){t._receiverReady=!0}],t._receiver.onopen=function(){for(var e=0,n=t._onReceiverReady.length;e<n;e++)t._onReceiverReady[e]()},t._receiver.onerror=function(e){throw new Error("Sandbox receiver error: "+e.message)},t.reset()};if(a.prototype={setGlobalErrorHandler:function(){var t=this;e.$_$reuseableTracer||(e.onerror=function(){t._globalBrowserError.apply(t,arguments)})},_globalBrowserError:function(){var e=this;e._doWhenReceiverIsReady(function(t){e._sendBrowserGlobalError.apply(e,t)},arguments)},reportDeclarationError:function(){var e=this;e._doWhenReceiverIsReady(function(t){e._sendDeclarationError.apply(e,t)},arguments)},sendTransformedFile:function(){var e=this;e._doWhenReceiverIsReady(function(t){e._sendTransformedFile.apply(e,t)},arguments)},_sendTransformedFile:function(e){this._send("transformedFile",e)},initialSpecId:function(){return e.$_$initialSpecId},start:function(t){var n=this;if(t||!(n._delayStart||n._startRequested&&!e.$_$reuseableTracer))if(n.reset(),t)this._onStart=t,this._patchFrameworks();else{if(!this._onStart)throw new Error("Missing tracer start subscription");n._startRequested=!0,this._receiverReady?this._onStart():this._onReceiverReady.push(this._onStart)}},isInitialized:function(){return!!e.$_$coverage},statement:function(n,i){e.$_$coverage[n][i][this._spec]=t++},scopeStart:function(e){this._fileEncounter[e]||(this._fileEncounterSequence.push(e),this._fileEncounter[e]=1)},programScopeStartLoading:function(e){this._testFileIds[e]&&this._resetFileData(),this.scopeStart(e)},programScopeEndLoading:function(e){this._testFileIds[e]&&(this._saveCurrentTestLoadingSequence(),this._resetFileData())},_saveCurrentTestLoadingSequence:function(){this._fileEncounterSequence.length&&this._testLoadingSequence.push(this._fileEncounterSequence.slice())},entryFile:function(){return this._fileEncounterSequence[0]},started:function(t){t=t||{},t.loadingSequence=this._testLoadingSequence.slice(),this._resetLoadingData(),this._resetFileData(),e.$_$wp=this._original_$_$wp,e.$_$wpe=this._original_$_$wpe,this._send("started",t)},specStart:function(e,t){var n=this,i="string"==typeof t?t:n._format(t);this._doWhenReceiverIsReady(function(){n._sendWithHighPriority("preTest",i)}),this._spec=e,this._specName=i,this._resetFileData()},specSyncStart:function(){this._specRangeStart=t},specSyncEnd:function(){this._specRangeEnd=t-1},specEnd:function(){this._spec=0,delete this._specName;var e=this._specRangeStart,n=this._specRangeEnd;return this._specRangeStart=0,this._specRangeEnd=0,[e,n||t]},needToNotifySingleTestRun:function(){if(this._paused||this._onResumed||!this.hasSpecFilter()||e.$_$reuseableTracer||!this._pauseAfterSingleTestExecution)return!1;for(var t=e.$_$tests;"*"!==t;){var n=Object.keys(t);if(1!=n.length)return!1;t=t[n[0]]}return!0},notifySingleTestAfterEach:function(t){return this._paused||this._onResumed||e.$_$reuseableTracer?void t():(this._paused=!0,this._onResumed=t,void this._send("resume"))},resume:function(){this._paused&&(this._paused=!1,this._onResumed&&(this._onResumed(),delete this._onResumed))},paused:function(){return this._paused},hasSpecFilter:function(){return!!e.$_$tests&&"*"!==e.$_$tests},specFilter:function(t){var n=e.$_$tests[":?"];if(n&&n[":"+t[t.length-1]])return!0;for(var i=e.$_$tests,r=0,o=t.length;r<o;r++){var a=t[r];if(i=i[":"+a],!i)return!1;if("*"===i)return!0}return!1},complete:function(t){e.$_$coverage&&(this._sendCoverageAndTimeMeasures(),this._send("complete",t),e.$_$reuseableTracer||(this._receiver.close(),this._finished=!0))},intermediateComplete:function(){this._sendCoverageAndTimeMeasures()},_sendCoverageAndTimeMeasures:function(){if(e.$_$coverage){var t,n;for(t=0,n=e.$_$coverage.length;t<n;t++){var i=e.$_$coverage[t];i&&i.length&&this._send("coverage",{id:t,ranges:i})}var r=Object.keys(s._autoTimeHits);for(t=0,n=r.length;t<n;t++){var o=s._autoTimeHits[r[t]];o.fileId&&this._sendLog("autoLog",o.value?this._formatTime(o.value)+"ms":"Σ "+this._formatTime(o.total)+"ms, μ "+this._formatTime(o.total/o.n)+"ms, ⋀ "+this._formatTime(o.min)+"ms, ⋁ "+this._formatTime(o.max)+"ms",o.context,o.fileId,o.rangeId)}}},_formatTime:function(e){return e.toFixed(3)},result:function(t){t.files=this._fileEncounterSequence,e.$_$reuseableTracer&&this._sendWithHighPriority("postTest"),this._send("test",t)},_patchFrameworks:function(){var t=this;if(!t._patchedFrameworks&&!e.$_$reuseableTracer){t._patchedFrameworks=!0;var n=e.requirejs&&"function"==typeof e.requirejs.load,i=e.System&&(e.System.fetch||e.System["import"]);if(t._shouldReportProgramScope=t._shouldReportProgramScope||n||i,n){var r=e.requirejs.load;e.requirejs.load=function(e,n,i){return r.call(this,e,n,t._urlWithFileData(i))}}if(i){var o=e.System.fetch;e.System.fetch=function(){var e=arguments[0]&&arguments[0].address;return e&&(arguments[0].address=t._urlWithFileData(e)),o.apply(this,arguments)};var a=e.fetch;a&&(e.fetch=function(){var e=arguments[0];return e&&(arguments[0]=t._urlWithFileData(e)),a.apply(this,arguments)});var s=e.System["import"];e.System["import"]=function(){var e=arguments[0];return e&&(arguments[0]=t._urlWithFileData(e)),s.apply(this,arguments)}}if(t._XMLHttpRequest){var l=t._XMLHttpRequest.prototype.open;t._XMLHttpRequest.prototype.open=function(e,n){arguments[1]=t._urlWithFileData(n),l.apply(this,arguments)}}t._Error&&!t._Error.captureStackTrace&&e.navigator&&e.navigator.userAgent&&/PhantomJS\/2/.test(e.navigator.userAgent)&&(t._Error.captureStackTrace=function(){})}},_urlWithFileData:function(e){var t=this;if(e&&~e.indexOf("wallabyFileId"))return e;for(var n=[],i=e.replace(/\\/g,"/").split("/"),r=0;r<i.length;r++)"."!==i[r]&&(".."===i[r]&&n.length&&".."!==n[n.length-1]?n.pop():n.push(i[r]));return e=n.join("/"),e=t._appendFileData(e)},_appendFileData:function(t){var n=this,i="/"===t.charAt(0)?t.substr(1):t,r=e.location&&e.location.host&&t.indexOf(e.location.host);r>=0&&(i=i.substr(r+e.location.host.length+1));var o=t.lastIndexOf("?");o>=0&&(i=i.substring(0,o));var a=i&&n._getFileMetadata(i);return a?t+(~o?"&":"?")+a.ts+"&wallabyFileId="+a.id:t},_getFileMetadata:function(t){return e.$_$files[t]||e.$_$files[t.split("\\").join("/")]},_doWhenReceiverIsReady:function(e,t){var n=this;n._receiverReady?e(t):n._onReceiverReady.push(function(){e(t)})},_log:function(){this._sendLog("log",this._format.apply(this,arguments))},_warn:function(){this._sendLog("warn",this._format.apply(this,arguments))},_error:function(){this._sendLog("error",this._format.apply(this,arguments))},_dir:function(e){this._sendLog("dir",this._inspect(e))},_debug:function(e){this._sendLog("debug",this._inspect(e))},_info:function(e){this._sendLog("info",this._inspect(e))},_debugLog:function(){this._sendLog("debugLog",this._format.apply(this,arguments))},_sendBrowserGlobalError:function(e,t,n){e=e&&e.toString()||"",t=t&&t.toString()||"",n=n&&n.toString()||"",this._send("globalError",{message:e,stack:e+"\nat "+t+":"+n})},_sendDeclarationError:function(e){this._send("globalError",{message:e.message,stack:e.stack,declaration:!0})},setEnvGlobal:function(e){this._envGlobal=e},resetEnvGlobal:function(){delete this._envGlobal},debugLog:function(){var e=this;e._doWhenReceiverIsReady(function(t){e._debugLog.apply(e,t)},arguments)},log:function(){var t=this,n=t._replacedConsoleLog!==e.console.log;if(n||t._envGlobal){for(var i=[],r=arguments.length-3,o=0;o<r;o++)i.push(arguments[o]);t._suppressConsoleLog=!0,t._envGlobal&&t._envGlobal.console.log.apply(t._envGlobal.console,i),n&&e.console.log.apply(console,i),t._suppressConsoleLog=!1}t._doWhenReceiverIsReady(function(e){for(var n=[],i=e.length-3,r=0;r<i;r++)n.push(e[r]);var o,a=e[i],s=e[i+1],l=e[i+2],c=s+","+l,p=t._consoleHits[c]=t._consoleHits[c]||0;p<t._evaluatedExpressionPerRangeLimit?o=t._evaluateExpressions(t._expressionId(s,c,p),n[0],a):p===t._evaluatedExpressionPerRangeLimit&&(o=t._evaluateExpressions(t._expressionId(s,c,p),n[0],a,new Error("Only the first "+p+" values are evaluated"))),t._consoleHits[c]=p+1,t._sendLog("log",t._format.apply(t,n)||"",a,s,l,o)},arguments)},_expressionId:function(e,t,n){var i=(this.entryFile()||"").toString();return e=e.toString(),t+","+n+(i===e?"":","+i)},setAssertionData:function(e,t){try{var n=Object.prototype.toString.call(e.actual);e.showDiff===!0&&n==Object.prototype.toString.call(e.expected)&&void 0!==e.expected&&"[object Boolean]"!==n&&"[object Number]"!==n&&"[object Function]"!==n&&("string"!=typeof e.actual&&(e.actual=this._inspect(e.actual,8,1e3,!0),e.expected=this._inspect(e.expected,8,1e3,!0)),t.actual=e.actual,t.expected=e.expected),"UnexpectedError"===e.name&&e.getErrorMessage&&(t.formattedDiff=e.getErrorMessage("ansi").toString()),e.actual&&e.actual.stack&&"string"==typeof e.actual.stack&&(t.stack=t.stack||"",t.stack+="\nFrom actual error object:\n"+e.actual.stack)}catch(i){}return t},diff:function(e,t,n,i,r){var o=this;o._doWhenReceiverIsReady(function(){var a=o.setAssertionData({showDiff:!0,expected:e,actual:t},{});o._sendLog("diff","",n,i,r,void 0,a.expected,a.actual)},arguments)},_sendLog:function(e,t,n,i,r,o,a,s){var l=t?t.length:0;t&&l>this._maxLogEntrySize&&(t=t.slice(0,this._maxLogEntrySize)+"...\n(truncated, total length: "+l+")"),this._send("console",{type:e,text:t||"",valueBag:o,spec:this._spec,file:i,range:r,context:n,expected:a,actual:s})},_send:function(e,t){this._receiver.send(this._JSONStringify(this._createMessage(e,t)))},_createMessage:function(t,n){return{type:t,data:n,session:e.$_$session}},_sendWithHighPriority:function(e,t){if(this._highPriorityReceiver){var n=this._createMessage(e,t);n._p="###wpm###",this._highPriorityReceiver.send(this._JSONStringify(n)+"\n")}else this._send(e,t)},_resetLoadingData:function(){this._testLoadingSequence=this._safeObject([])},_resetFileData:function(){this._fileEncounterSequence=this._safeObject([]),this._fileEncounter=this._safeObject([])},reset:function(){var e=this;t=1,e._formattingOpts={},e._consoleHits={},e._autoTimeHits={},e._spec=0,delete e._specName,e._specRangeStart=0,e._specRangeEnd=0,e._resetFileData()},_safeObject:function(e){return e.toJSON=this._undefined,e},_format:function(e){var t,i=this._formattingOpts.depth||2,r=this._formattingOpts.maxElementsPerLevel||5e3;if("string"!=typeof e){var o=[];for(t=0;t<arguments.length;t++)o.push(this._inspect(arguments[t],i,r));return o.join(" ")}t=1;for(var a=arguments,s=a.length,l=1===s?e:String(e).replace(n,function(e){if("%%"===e)return"%";if(t>=s)return e;switch(e){case"%s":return String(a[t++]);case"%d":return Number(a[t++]);case"%j":return JSON.stringify(a[t++]);case"%c":return t++&&"";default:return e}}),c=a[t];t<s;c=a[++t])l+=null===c||"object"!=typeof c?" "+c:" "+this._inspect(c,i,r);return l},_inspect:function(t,n,i,r){var o={seen:[],showHidden:!1,hideTypes:r,depth:n||2,stylize:function(e){return e},maxElementsPerLevel:i||5e3,customInspect:e.$_$reuseableTracer&&this._nodeUtil};return this._formatValue(o,t,o.depth)},_formatValue:function(e,t,n){var i=this,r=this._formatPrimitive(e,t);if(r)return r;if(e.customInspect){var o=i._nodeUtil.inspect&&t[i._nodeUtil.inspect.custom];if(o||t.inspect===i._nodeUtil.inspect||"function"!=typeof t.inspect||(o=t.inspect),"function"==typeof o&&o!==i._nodeUtil.inspect&&(!t.constructor||t.constructor.prototype!==t)){var a=o.call(t,n,e);if(a!==t)return"string"!=typeof a?i._formatValue(e,a,n):a}}var s=Object.keys(t),l=this._arrayToHash(s);e.showHidden&&(s=Object.getOwnPropertyNames(t));var c=this._getOwnPropertySymbols(t);if(c.length&&(s=s.concat(c)),0===s.length){if("function"==typeof t){var p=t.name?": "+t.name:"";return e.stylize("[λ"+p+"]","special")}if(this._isRegExp(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(this._isDate(t))return e.stylize(Date.prototype.toString.call(t),"date");if(this._isBigInt(t))return t.toString();if(this._isError(t))return this._formatError(t)}var d="",u=!1,h=!1,m=!1,f=["{","}"],S=t&&t.constructor&&t.constructor.name||void 0;if(("Object"===S||e.hideTypes)&&(S=void 0),this._isArray(t)?(S=void 0,u=!0,f=["[","]"]):this._isSet(t)?h=!0:this._isMap(t)&&(m=!0),"function"==typeof t){var _=t.name?": "+t.name:"";d=" [λ"+_+"]"}if(this._isRegExp(t)&&(d=" "+RegExp.prototype.toString.call(t)),this._isDate(t)&&(d=" "+Date.prototype.toUTCString.call(t)),this._isError(t)&&(d=" "+this._formatError(t)),""===d&&S&&(f[0]=S+("String"!==S&&"Number"!==S&&"Boolean"!==S||"function"!=typeof t.valueOf?"":" "+this._formatPrimitive(e,t.valueOf()))+" "+f[0]),u||!this._isIterator(t)||m||h||(d=" [Iterator] "),!(0!==s.length||u&&0!==t.length||h||m))return f[0]+d+f[1];if(n<0)return this._isRegExp(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var V,w=!1;return s.length>e.maxElementsPerLevel&&(s.length=e.maxElementsPerLevel,u&&t&&(t=t.slice(0,e.maxElementsPerLevel)),w=!0),V=u?this._formatArray(e,t,n,l,s):h?this._formatSet(e,t,n,l,s,w):m?this._formatMap(e,t,n,l,s,w):s.map(function(r){return i._formatProperty(e,t,n,l,r,u)}),w&&V.push("..."),e.seen.pop(),this._reduceToSingleString(V,d,f)},_isArray:function(e){return Array.isArray(e)||"object"==typeof e&&"[object Array]"===this._objectToString(e)},_isSet:function(t){return!!(t&&e.Set&&"[object Set]"===this._objectToString(t)&&t.forEach)},_isMap:function(t){return!!(t&&e.Map&&"[object Map]"===this._objectToString(t)&&t.forEach)},_isIterator:function(t){return!!(t&&e.Symbol&&e.Symbol.iterator&&"function"==typeof t[e.Symbol.iterator])},_isRegExp:function(e){return"object"==typeof e&&"[object RegExp]"===this._objectToString(e)},_isDate:function(e){return"object"==typeof e&&"[object Date]"===this._objectToString(e)},_isBigInt:function(e){return"bigint"==typeof e},_isError:function(e){return"object"==typeof e&&("[object Error]"===this._objectToString(e)||e instanceof Error)},_objectToString:function(e){return Object.prototype.toString.call(e)},_reduceToSingleString:function(e,t,n){var i=0,r=e.reduce(function(e,t){return i++,t.indexOf("\n")>=0&&i++,e+t.length+1},0);return r>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]},_formatPrimitive:function(e,t){switch(typeof t){case"undefined":return e.stylize("undefined","undefined");case"string":var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string");case"number":return e.stylize(""+t,"number");case"boolean":return e.stylize(""+t,"boolean");case"symbol":return this._Symbol&&this._Symbol.prototype.toString.call(t)}if(null===t)return e.stylize("null","null")},_formatError:function(e){return"["+Error.prototype.toString.call(e)+"]"},_formatSet:function(e,t,n,i,r,o){var a=this,s=[];t.forEach(function(t){if(!(s.length>e.maxElementsPerLevel)){var i=null===n?null:n-1,r=a._formatValue(e,t,i);s.push(r)}}),!o&&s.length>e.maxElementsPerLevel&&s.push("...");for(var l=0;l<r.length;l++)s.push(a._formatProperty(e,t,n,i,r[l],!1));return s},_formatMap:function(e,t,n,i,r,o){var a=this,s=[];t.forEach(function(t,i){if(!(s.length>e.maxElementsPerLevel)){var r=null===n?null:n-1,o=a._formatValue(e,i,r);o+=" => ",o+=a._formatValue(e,t,r),s.push(o)}}),!o&&s.length>e.maxElementsPerLevel&&s.push("...");for(var l=0;l<r.length;l++)s.push(a._formatProperty(e,t,n,i,r[l],!1));return s},_formatArray:function(e,t,n,i,r){for(var o=this,a=[],s=0,l=t.length;s<l;++s)this._hasOwnProperty(t,String(s))?a.push(this._formatProperty(e,t,n,i,String(s),!0)):a.push("");return r.forEach(function(r){r.toString().match(/^\d+$/)||a.push(o._formatProperty(e,t,n,i,r,!0))}),a},_formatProperty:function(e,t,n,i,r,o){var a,s,l;if(l=Object.getOwnPropertyDescriptor(t,r)||{value:t[r]},l.get?s=l.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):l.set&&(s=e.stylize("[Setter]","special")),this._hasOwnProperty(i,r)||(a="["+r.toString()+"]"),s||(e.seen.indexOf(l.value)<0?(s=null===n?this._formatValue(e,l.value,null):this._formatValue(e,l.value,n-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n"))):s=e.stylize("[Circular]","special")),"undefined"==typeof a){if(o&&r.match(/^\d+$/))return s;a=this._propertyName(r),a=e.stylize(a,"string")}return a+": "+s},_arrayToHash:function(e){var t={};return e.forEach(function(e){t[e]=!0}),t},_hasOwnProperty:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},_getOwnPropertySymbols:function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]},_propertyName:function(e){if(e.match(/^\d+$/))return e;var t=JSON.stringify(""+e);return t=t.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?t.substr(1,t.length-2):t.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'")},_evaluate:function(e,t,n,i,r){var o={};try{var a=n||{};if(a.props=a.props!==this._undefined?a.props:100,a.elements=a.elements!==this._undefined?a.elements:100,a.depth=a.depth!==this._undefined?a.depth:1,a.strLength=a.strLength!==this._undefined?a.strLength:200,a.level=0,a.expId=a.expId||i,a.rootExpression=t,a.autoExpand=a.autoExpand!==this._undefined&&a.autoExpand,a.autoExpandPreviousObjects=[],a.autoExpandPropertyCount=0,a.autoExpandLimit=a.autoExpandLimit!==this._undefined?a.autoExpandLimit:5e3,a.autoExpandMaxDepth=a.autoExpandMaxDepth!==this._undefined?a.autoExpandMaxDepth:10,a.node={current:this._undefined,parent:this._undefined,index:0},r){var s={error:r.message};this._processTreeNodeResult(s,a),o.data=s}else o.data=this._traverseObject({},e,a,a.expressionsToEvaluate||{}),this._specName&&o.data&&o.data.label&&o.data.label.value&&(o.data.label.value+=" ("+this._specName+")")}catch(l){var c={error:'Error while evaluating "'+t+'": '+(l&&l.message||"")};this._processTreeNodeResult(c,a),o.data=c}return o},_addProperty:function(e,t,n,i,r,o){var a=this;return function(s){var l=r.node.current,c=r.node.index,p=r.node.parent;r.node.parent=l,r.node.index="number"==typeof i?i:s,e.push(a._property(t,n,i,r,o)),r.node.parent=p,r.node.index=c}},_addObjectProperty:function(e,t,n,i,r,o,a){var s=this;return t["_p_"+r.toString()]=!0,function(t){var l=o.node.current,c=o.node.index,p=o.node.parent;o.node.parent=l,o.node.index=t,e.push(s._property(n,i,r,o,a)),o.node.parent=p,o.node.index=c}},_traverseObject:function(e,t,n,i){var r=this,o=n.autoExpand;try{n.level++,n.autoExpand&&n.autoExpandPreviousObjects.push(t);var a,s,l,c,p,d,u,h=[],m=[],f=this._type(t),S="array"===f,_="function"===f,V=this._isPrimitiveType(f),w=this._isPrimitiveWrapperType(f),g=V||w,y={},v=0,b=!1;if(n.depth){if(S){d=t.splice(0,t.length),s=d.length;var R=i.ranges||n.ranges;if(R&&R.length===s)h=R.props,this._traverseRanges(h,function(e,t,i){for(a=t;a<=i;a++)m.push(r._addProperty(e.props,d,f,a,n))});else if(s>n.elements)l=0,c=s-1,m.push(function(e,t,n){return function(){h=h.concat(r._createRanges(e,t,n))}}(l,c,n));else for(l=0,c=s,a=l;a<c;a++)m.push(r._addProperty(h,d,f,a,n));n.autoExpandPropertyCount+=m.length}if("null"!==f&&"undefined"!==f&&!V&&"String"!==f&&"Buffer"!==f&&"bigint"!==f){var T=i.props||n.props;this._isSet(t)?(a=0,t.forEach(function(e){return v++,n.autoExpandPropertyCount++,v>T?void(b=!0):!n.isExpressionToEvaluate&&n.autoExpand&&n.autoExpandPropertyCount>n.autoExpandLimit?void(b=!0):void m.push(r._addProperty(h,t,"Set",a++,n,function(e){return function(){return e}}(e)))})):this._isMap(t)&&t.forEach(function(e,i){if(v++,n.autoExpandPropertyCount++,v>T)return void(b=!0);if(!n.isExpressionToEvaluate&&n.autoExpand&&n.autoExpandPropertyCount>n.autoExpandLimit)return void(b=!0);var o=r._inspect(i,2,10).replace(/\r?\n|\r/g," ").replace(/\s\s+/g," ");o.length>100&&(o=o.slice(0,100)+"..."),m.push(r._addProperty(h,t,"Map",o,n,function(e){return function(){return e}}(e)))});try{for(p in t)if(!this._blacklistedProperty(t,p)){if(v++,n.autoExpandPropertyCount++,v>T){b=!0;break}if(!n.isExpressionToEvaluate&&n.autoExpand&&n.autoExpandPropertyCount>n.autoExpandLimit){b=!0;break}m.push(r._addObjectProperty(h,y,t,f,p,n))}}catch(D){}if(y._p_length=!0,_&&(y._p_name=!0),!b){var k=this._getOwnPropertyNames(t).concat(this._getOwnPropertySymbols(t));for(a=0,s=k.length;a<s;a++)if(p=k[a],!this._blacklistedProperty(t,p)&&!y["_p_"+p.toString()]){if(v++,n.autoExpandPropertyCount++,v>T){b=!0;break}if(!n.isExpressionToEvaluate&&n.autoExpand&&n.autoExpandPropertyCount>n.autoExpandLimit){b=!0;break}m.push(r._addObjectProperty(h,y,t,f,p,n))}}}}if(e.type=f,g?(e.value=t.valueOf(),this._capIfString(f,e,n,i)):"date"===f?e.value=this._dateToString.call(t):"RegExp"===f?e.value=this._regExpToString.call(t):"symbol"===f&&this._Symbol?e.value=this._Symbol.prototype.toString.call(t):n.depth||"null"===f||"undefined"===f||(delete e.value,e.capped=!0),b&&(e.cappedProps=!0),u=n.node.current,n.node.current=e,this._treeNodePropertiesBeforeFullValue(e,n),m.length)for(a=0,s=m.length;a<s;a++)m[a](a);h.length&&(e.props=h)}catch(D){e.type="unknown",e.error=D.message,u=n.node.current,n.node.current=e,this._treeNodePropertiesBeforeFullValue(e,n)}finally{S&&n.depth&&t.splice.apply(t,[0,0].concat(d))}return this._additionalMetadata(t,e),this._treeNodePropertiesAfterFullValue(e,n),n.node.current=u,n.level--,n.autoExpand=o,n.autoExpand&&n.autoExpandPreviousObjects.pop(),e},_blacklistedProperty:function(t,n){if((t===e||t===this._envGlobal)&&"wallaby"===n||n.indexOf&&0===n.indexOf("$_$"))return!0},_createRanges:function(e,t,n,i){i=i||{index:0};for(var r=n.elements,o=t-e+1,a=[],s=Math.max(Math.ceil(o/r),r),l=e;l<t;l+=s){var c=l,p=Math.min(l+s-1,t);p+r/2>=t&&(p=t);var d=c+" - "+p,u=p-c+1,h={rangeNode:!0,name:d,props:u>2*r&&r>1?this._createRanges(c,p,n,i):[]};if(this._setNodeId(h,n),this._setNodeLabel(h,n),this._setNodeExpandableState(h,n),this._setNodePermissions(h,n),h.id+=" r "+i.index++,a.push(h),p===t)break}return a},_traverseRanges:function(e,t){for(var n=0,i=e.length;n<i;n++){var r=e[n];if(r.rangeNode=!0,r.props)if(r.props.length)this._traverseRanges(r.props,t);else if(r.props===!0){var o=r.name.split("-");r.props=[],t(r,parseInt(o[0],10),parseInt(o[1],10))}}},_capIfString:function(e,t,n,i){var r=i.strLength||n.strLength;("string"===e||"String"===e)&&t.value&&t.value.length>r&&(t.capped=t.value.substr(0,r),delete t.value)},_property:function(e,t,n,i,r){var o=this;r||(r=function(e,t){return e[t]});var a=n.toString(),s=i.expressionsToEvaluate||{},l=i.depth,c=i.isExpressionToEvaluate;try{var p=this._isMap(e),d=a;p&&"'"===d[0]&&(d=d.substr(1,d.length-2));var u=i.expressionsToEvaluate=s["_p_"+d];u&&(i.depth=i.depth+1),i.isExpressionToEvaluate=!!u;var h="symbol"==typeof n,m={name:h||p?a:this._propertyName(a)};if(h&&(m.symbol=!0),"array"!==t&&"Error"!==t){var f=this._getOwnPropertyDescriptor(e,n);if(f&&(f.set&&(m.setter=!0),f.get&&!u))return m.getter=!0,this._processTreeNodeResult(m,i),m}var S;try{S=r(e,n)}catch(_){return m={name:a,type:"unknown",error:_.message},this._processTreeNodeResult(m,i),m}var V=this._type(S),w=this._isPrimitiveType(V);if(m.type=V,w)this._processTreeNodeResult(m,i,S,function(){m.value=S.valueOf(),!u&&o._capIfString(V,m,i,{})});else{var g=i.autoExpand&&i.level<i.autoExpandMaxDepth&&i.autoExpandPreviousObjects.indexOf(S)<0&&"function"!==V&&i.autoExpandPropertyCount<i.autoExpandLimit;g||i.level<l||u?(this._traverseObject(m,S,i,u||{}),this._additionalMetadata(S,m)):this._processTreeNodeResult(m,i,S,function(){"null"!==V&&"undefined"!==V&&(delete m.value,m.capped=!0)})}return m}finally{i.expressionsToEvaluate=s,i.depth=l,i.isExpressionToEvaluate=c}},_processTreeNodeResult:function(e,t,n,i){this._treeNodePropertiesBeforeFullValue(e,t),i&&i(),this._additionalMetadata(n,e),this._treeNodePropertiesAfterFullValue(e,t)},_treeNodePropertiesBeforeFullValue:function(e,t){this._setNodeId(e,t),this._setNodeQueryPath(e,t),this._setNodeExpressionPath(e,t),this._setNodePermissions(e,t)},_treeNodePropertiesAfterFullValue:function(e,t){this._setNodeLabel(e,t),this._setNodeExpandableState(e,t),this._sortProps(e,t),this._addFunctionsNode(e,t),this._addLoadNode(e,t),this._cleanNode(e,t)},_additionalMetadata:function(e,t){try{e&&"number"==typeof e.length&&(t.length=e.length)}catch(n){}if("number"===t.type||"Number"===t.type)if(isNaN(t.value))t.nan=!0,delete t.value;else switch(t.value){case Number.POSITIVE_INFINITY:t.positiveInfinity=!0,delete t.value;break;case Number.NEGATIVE_INFINITY:t.negativeInfinity=!0,delete t.value}else"function"===t.type&&"string"==typeof e.name&&e.name&&t.name&&e.name!==t.name&&(t.funcName=e.name)},_setNodeId:function(e,t){e.id=t.node.parent?t.node.parent.id+" "+t.node.index:t.expId},_sortProps:function(e){e.props&&e.props.length&&"array"!==e.type&&"Map"!==e.type&&"Set"!==e.type&&e.props.sort(function(e,t){var n=e.name.toLowerCase(),i=t.name.toLowerCase();return n<i?-1:n>i?1:0})},_addFunctionsNode:function(e,t){if(e.props&&e.props.length){for(var n=[],i=[],r=0,o=e.props.length;r<o;r++){var a=e.props[r];"function"===a.type?n.push(a):i.push(a)}if(!i.length&&t.autoExpand&&(e.capped=!0),i.length&&!(n.length<=1)){e.props=i;var s={functionsNode:!0,props:n};t.autoExpand&&(s.capped=!0),this._setNodeId(s,t),this._setNodeLabel(s,t),this._setNodeExpandableState(s,t),this._setNodePermissions(s,t),s.id+=" f",e.props.unshift(s)}}},_addLoadNode:function(e,t){if(e.props&&e.props.length&&e.cappedProps&&"string"!==e.type){var n={loadActionNode:!0};this._setNodeId(n,t),this._setNodeQueryPath(n,t),this._setNodeLabel(n,t),this._setNodeExpandableState(n,t),this._setNodePermissions(n,t),n.id+=" l",e.props.push(n)}},_setNodeExpandableState:function(e){(e.capped||e.cappedProps||e.functionsNode||e.loadActionNode||e.rangeNode||e.getter||this._isArray(e.props))&&(e.expandable=!0)},_setNodePermissions:function(e,t){var n=t.node.parent;e._hasSymbolPropertyOnItsPath=e.symbol||n&&n._hasSymbolPropertyOnItsPath;var i=n&&n._hasSetOnItsPath,r=n&&n._hasMapOnItsPath;e._hasSetOnItsPath="Set"===e.type||i,e._hasMapOnItsPath="Map"===e.type||r;var o=!(e.functionsNode||e.loadActionNode||e.rangeNode||e.error);(!o||e._hasSymbolPropertyOnItsPath||i||r)&&(e.disallowToCopyPath=!0),o&&!e.getter&&"function"!==e.type&&"symbol"!==e.type&&"Set"!==e.type&&"Map"!==e.type||(e.disallowToCopyData=!0)},_cleanNode:function(e){delete e._hasSymbolPropertyOnItsPath,delete e._hasSetOnItsPath,delete e._hasMapOnItsPath},_setNodeExpressionPath:function(e,t){if(!t.node.parent)return void(e.expressionPath=[t.rootExpression]);var n=t.node.parent.expressionPath.slice();e.expressionPath=n.concat([this._propertyAccessor(e.name)])},_propertyAccessor:function(e){return e?e.match(r)?"["+e+"]":e.match(i)?"."+e:e.match(o)?"["+e+"]":"['"+e+"']":""},_setNodeQueryPath:function(e,t){if(!t.node.parent)return void(e.queryPath=[e.id]);if(e.loadActionNode)return void(e.queryPath=t.node.current.queryPath.slice());var n=e.name;n&&"'"===n[0]&&(n=n.substr(1,n.length-2)),e.queryPath=t.node.parent.queryPath.slice().concat(["_p_"+n])},_setNodeLabel:function(e,t){return e.label={},e.rangeNode?void(e.label.name=e.name):e.loadActionNode?void(e.label.name="..."):e.functionsNode?void(e.label.name="functions"):(e.label.name=e.name,e.label.type=this._formatNodeType(e,t),void(e.label.value=this._formatNodeValue(e,t)))},_formatNodeValue:function(e,t,n){if(e.rangeNode)return e.name;if(e.error)return e.error;if(e.getter)return"(...)";if("number"===e.type.toLowerCase()){var i=e;if(i.nan)return"NaN";if(i.positiveInfinity)return"Infinity";if(i.negativeInfinity)return"-Infinity"}if("null"===e.type||"undefined"===e.type)return e.type;if("string"===e.type.toLowerCase()){var r=e.capped?e.capped+"...":e.value;return"'"+r.replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'"+(e.capped?" (total length: "+e.length+")":"")}return(this._isUndefined(e.value)?this._formatCompactObjectView(e,t,n):e.value)+(e.funcName?":"+e.funcName:"")},_formatCompactObjectView:function(e,t,n){if("function"===e.type)return"λ";var i="array"===e.type&&0===e.length,r=["array"===e.type?"[":"{","","array"===e.type?"]":"}"];if(n||e.capped||e.ranges)r[1]=i?"":"...";else if(e.props){for(var o=5,a=[],s=[],l=0;l<e.props.length&&s.length<=o;l++){var c=e.props[l];("function"===c.type||c.getter?a:s).push("array"===e.type?this._formatNodeValue(c,t,!0):c.name+": "+this._formatNodeValue(c,t,!0))}s.length<o&&(s=s.concat(a)),r[1]=s.join(", "),e.props.length>o&&(r[1]+=", ...")}return r.join("")},_formatNodeType:function(e){if(this._isDisplayableType(e.type))return e.error?"":"date"===e.type?"Date":"array"===e.type?e.length?"Array("+e.length+")":"":e.type},_isUndefined:function(e){return e===this._undefined},_isDisplayableType:function(e){return!("boolean"===e||"Boolean"===e||"symbol"===e||"string"===e||"String"===e||"number"===e||"Number"===e||"object"===e||"Object"===e||"function"===e||"null"===e||"undefined"===e)},_type:function(e){var t=typeof e;return"object"===t?"[object Array]"===this._objectToString(e)?t="array":"[object Date]"===this._objectToString(e)?t="date":null===e?t="null":e.constructor&&(t=e.constructor.name||t):"undefined"===t&&this._HTMLAllCollection&&e instanceof this._HTMLAllCollection&&(t="HTMLAllCollection"),t},_isPrimitiveType:function(e){return"boolean"===e||"string"===e||"number"===e},_isPrimitiveWrapperType:function(e){return"Boolean"===e||"String"===e||"Number"===e},initLoadingPhase:function(){var t=this;this._resetLoadingData(),this._testFileIds=this._safeObject({}),(e.$_$testFiles||[]).forEach(function(e){t._testFileIds[e.id]=1}),t._original_$_$wp=e.$_$wp,t._original_$_$wpe=e.$_$wpe,
e.$_$wp=function(e){t._reportProgramScope("programScopeStart",e),t.programScopeStartLoading(e)},e.$_$wpe=function(e){t._reportProgramScope("programScopeEnd",e),t.programScopeEndLoading(e)}},_reportProgramScope:function(e,t){var n=this;this._shouldReportProgramScope&&this._doWhenReceiverIsReady(function(){n._sendWithHighPriority(e,t)})},_looksLikePromise:function(t){return t&&t.constructor&&"Promise"===t.constructor.name&&"function"==typeof t.then&&"function"==typeof t["catch"]&&(e.Promise||{}).prototype!==t},_looksLikeObservable:function(e){return e&&e.constructor&&e.constructor.name&&~e.constructor.name.indexOf("Observable")&&"function"==typeof e.forEach},_looksLikeBuffer:function(t){return t&&t.constructor&&"Buffer"===t.constructor.name&&"function"==typeof t.toString&&(e.Buffer||{}).prototype!==t},_autoLogValue:function(t,n,i,r,o,a,s,l,c){var p=this,d=e.$_$session;p._looksLikePromise(o)?o.then(function(o){e.$_$session===d&&p._autoLogResolvedValue(t,n,i,r,"then ",p._valueToFormat(o,a),s,l,c)})["catch"](function(o){e.$_$session===d&&p._autoLogResolvedValue(t,n,i,r,"catch ",(o||"<No Reason Provided>").toString(),s,l,c)}):p._looksLikeObservable(o)?o.forEach(function(o){e.$_$session===d&&p._autoLogResolvedValue(t,n,i,r,"",p._valueToFormat(o,a),s,l,c)}):(p._isBigInt(o)&&(o=o.toString()),p._autoLogResolvedValue(t,n,i,r,"",p._valueToFormat(p._looksLikeBuffer(o)?o.toString():o,a),s,l,c))},_valueToFormat:function(e,t){return"$_$ne"===t?e:t(e)},_autoLogResolvedValue:function(e,t,n,i,r,o,a,s,l){this._formattingOpts={maxElementsPerLevel:a?10:100};var c,p=e+","+t;n<this._evaluatedExpressionPerRangeLimit?c=this._evaluateExpressions(this._expressionId(e,p,n),o,i,void 0,s,l):n===this._evaluatedExpressionPerRangeLimit&&(c=this._evaluateExpressions(this._expressionId(e,p,n),o,i,new Error("Only the first "+n+" values are evaluated"),s,l)),this._sendLog("autoLog",r+(this._format(o)||""),i,e,t,c),this._formattingOpts={}},_evaluateExpressions:function(e,t,n,i,r,o){var a=this._expressionsToEvaluate&&this._expressionsToEvaluate[e],s={expressionsToEvaluate:a};a||(s.depth=0),r&&(s.autoExpand=!0,s.depth=1,s.strLength=8192);var l=this._evaluate(t,n,s,e,i);return(l.data||{}).id=e,(l.data||{}).autoExpand=!!r,(l.data||{}).copyKey=o,l}},e.$_$doNotInit)e.$_$Tracer=a;else{var s=new a;s.setGlobalErrorHandler();var l=function(e,t){return t-e};e.performance?s._time=function(){return e.performance.now()}:e.process&&e.process.hrtime?(s._time=function(){return e.process.hrtime()},l=function(e,t){return 1e3*(t[0]-e[0])+(t[1]-e[1])/1e6}):s._time=function(){return+new Date},s._logTime=function(e,t,n,i,r,o,a){var c=l(r,a),p=s._autoTimeHits[n];return p?(p.value&&(p.n=1,p.min=p.value,p.max=p.value,p.total=p.value,delete p.value),p.min=Math.min(p.min,c),p.max=Math.max(p.max,c),p.total+=c,p.n+=1):s._autoTimeHits[n]={value:c,context:i,fileId:e,rangeId:t},o},e.$_$w=function(e,t){s.statement(e,t)},e.$_$wp=function(e){s._reportProgramScope("programScopeStart",e),s.scopeStart(e)},e.$_$wpe=function(e){s._reportProgramScope("programScopeEnd",e)},e.$_$wf=function(e){s.scopeStart(e)},e.$_$wv=function(e,t,n,i,r,o,a,l,c){var p=s._consoleHits[n]||0;return a?s._identifierExpressionAutoLogHitLimit?p<s._identifierExpressionAutoLogHitLimit?s._doWhenReceiverIsReady(function(){s._autoLogValue(e,t,p,i,r,o,a,l,c)},arguments):p===s._identifierExpressionAutoLogHitLimit&&s._doWhenReceiverIsReady(function(){s._sendLog("log","Only the first "+s._identifierExpressionAutoLogHitLimit+" values are automatically logged, use console.log("+(i||"...")+") for the full output",i,e,t)},arguments):p||s._doWhenReceiverIsReady(function(){s._autoLogValue(e,t,p,i,r,o,a,l,c)},arguments):s._doWhenReceiverIsReady(function(){s._autoLogValue(e,t,p,i,r,o,a,l,c)},arguments),s._consoleHits[n]=p+1,r},e.$_$tracer=s,e.$_$coverage=e.$_$coverage||[],e.$_$reuseableTracer||(e.$_$tracer._expressionsToEvaluate=e.$_$expressionsToEvaluate||{});var c=function(e){return e.path},p=function(e){return e?e.replace(/\\/g,"/"):e},d=e.$_$testFiles&&(e.$_$testFiles||[]).map(c).map(p),u=e.$_$testFiles&&e.$_$testFiles.filter(function(e){return e.loaded}).map(c);s.initLoadingPhase(),e.wallaby={delayStart:function(){s._patchFrameworks(),s._delayStart=!0},start:function(){s._delayStart=!1,s.start()},_startWhenReceiverIsReady:function(e){s._shouldReportProgramScope=!0,s._doWhenReceiverIsReady(function(){e()})},tests:d,loadedTests:u,baseDir:e.$_$baseDir,slowTestThreshold:e.$_$slow||75}}}(function(){return this}()||global);