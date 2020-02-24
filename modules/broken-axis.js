/*
 Highcharts JS v8.0.0 (2020-02-24)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/broken-axis",["highcharts"],function(l){e(l);e.Highcharts=l;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function l(e,h,u,l){e.hasOwnProperty(h)||(e[h]=l.apply(null,u))}e=e?e._modules:{};l(e,"modules/broken-axis.src.js",[e["parts/Globals.js"],e["parts/Utilities.js"]],function(e,h){var l=h.addEvent,v=h.extend,w=h.find,
r=h.fireEvent,x=h.isArray,p=h.pick,n=e.Axis;h=e.Series;var t=function(b,c){return w(c,function(c){return c.from<b&&b<c.to})};v(n.prototype,{isInBreak:function(b,c){var g=b.repeat||Infinity,f=b.from,a=b.to-b.from;c=c>=f?(c-f)%g:g-(f-c)%g;return b.inclusive?c<=a:c<a&&0!==c},isInAnyBreak:function(b,c){var g=this.options.breaks,f=g&&g.length,a;if(f){for(;f--;)if(this.isInBreak(g[f],b)){var d=!0;a||(a=p(g[f].showPoints,!this.isXAxis))}var k=d&&c?d&&!a:d}return k}});l(n,"afterInit",function(){"function"===
typeof this.setBreaks&&this.setBreaks(this.options.breaks,!1)});l(n,"afterSetTickPositions",function(){if(this.isBroken){var b=this.tickPositions,c=this.tickPositions.info,g=[],f;for(f=0;f<b.length;f++)this.isInAnyBreak(b[f])||g.push(b[f]);this.tickPositions=g;this.tickPositions.info=c}});l(n,"afterSetOptions",function(){this.isBroken&&(this.options.ordinal=!1)});n.prototype.setBreaks=function(b,c){function g(b){var d=b,c;for(c=0;c<a.breakArray.length;c++){var k=a.breakArray[c];if(k.to<=b)d-=k.len;
else if(k.from>=b)break;else if(a.isInBreak(k,b)){d-=b-k.from;break}}return d}function f(b){var d;for(d=0;d<a.breakArray.length;d++){var c=a.breakArray[d];if(c.from>=b)break;else c.to<b?b+=c.len:a.isInBreak(c,b)&&(b+=c.len)}return b}var a=this,d=x(b)&&!!b.length;a.isDirty=a.isBroken!==d;a.isBroken=d;a.options.breaks=a.userOptions.breaks=b;a.forceRedraw=!0;a.series.forEach(function(a){a.isDirty=!0});d||a.val2lin!==g||(delete a.val2lin,delete a.lin2val);d&&(a.userOptions.ordinal=!1,a.val2lin=g,a.lin2val=
f,a.setExtremes=function(a,b,c,d,f){if(this.isBroken){for(var g,e=this.options.breaks;g=t(a,e);)a=g.to;for(;g=t(b,e);)b=g.from;b<a&&(b=a)}n.prototype.setExtremes.call(this,a,b,c,d,f)},a.setAxisTranslation=function(b){n.prototype.setAxisTranslation.call(this,b);this.unitLength=null;if(this.isBroken){b=a.options.breaks;var c=[],d=[],g=0,f,e=a.userMin||a.min,k=a.userMax||a.max,l=p(a.pointRangePadding,0),h;b.forEach(function(b){f=b.repeat||Infinity;a.isInBreak(b,e)&&(e+=b.to%f-e%f);a.isInBreak(b,k)&&
(k-=k%f-b.from%f)});b.forEach(function(a){m=a.from;for(f=a.repeat||Infinity;m-f>e;)m-=f;for(;m<e;)m+=f;for(h=m;h<k;h+=f)c.push({value:h,move:"in"}),c.push({value:h+(a.to-a.from),move:"out",size:a.breakSize})});c.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});var q=0;var m=e;c.forEach(function(a){q+="in"===a.move?1:-1;1===q&&"in"===a.move&&(m=a.value);0===q&&(d.push({from:m,to:a.value,len:a.value-m-(a.size||0)}),g+=a.value-m-(a.size||0))});a.breakArray=
d;a.unitLength=k-e-g+l;r(a,"afterBreaks");a.staticScale?a.transA=a.staticScale:a.unitLength&&(a.transA*=(k-a.min+l)/a.unitLength);l&&(a.minPixelPadding=a.transA*a.minPointOffset);a.min=e;a.max=k}});p(c,!0)&&this.chart.redraw()};l(h,"afterGeneratePoints",function(){var b=this.options.connectNulls,c=this.points,e=this.xAxis,f=this.yAxis;if(this.isDirty)for(var a=c.length;a--;){var d=c[a],k=!(null===d.y&&!1===b)&&(e&&e.isInAnyBreak(d.x,!0)||f&&f.isInAnyBreak(d.y,!0));d.visible=k?!1:!1!==d.options.visible}});
l(h,"afterRender",function(){this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,p(this.pointArrayMap,["y"]))});e.Series.prototype.drawBreaks=function(b,c){var e=this,f=e.points,a,d,k,h;b&&c.forEach(function(c){a=b.breakArray||[];d=b.isXAxis?b.min:p(e.options.threshold,b.min);f.forEach(function(e){h=p(e["stack"+c.toUpperCase()],e[c]);a.forEach(function(a){k=!1;if(d<a.from&&h>a.to||d>a.from&&h<a.from)k="pointBreak";else if(d<a.from&&h>a.from&&h<a.to||d>a.from&&h>a.to&&h<a.from)k="pointInBreak";
k&&r(b,k,{point:e,brk:a})})})})};e.Series.prototype.gappedPath=function(){var b=this.currentDataGrouping,c=b&&b.gapSize;b=this.options.gapSize;var g=this.points.slice(),f=g.length-1,a=this.yAxis,d;if(b&&0<f)for("value"!==this.options.gapUnit&&(b*=this.basePointRange),c&&c>b&&c>=this.basePointRange&&(b=c),d=void 0;f--;)d&&!1!==d.visible||(d=g[f+1]),c=g[f],!1!==d.visible&&!1!==c.visible&&(d.x-c.x>b&&(d=(c.x+d.x)/2,g.splice(f+1,0,{isNull:!0,x:d}),this.options.stacking&&(d=a.stacks[this.stackKey][d]=
new e.StackItem(a,a.options.stackLabels,!1,d,this.stack),d.total=0)),d=c);return this.getGraphPath(g)}});l(e,"masters/modules/broken-axis.src.js",[],function(){})});
//# sourceMappingURL=broken-axis.js.map