/*
 Highcharts JS v8.0.0 (2020-02-24)

 Boost module

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/boost-canvas",["highcharts"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(b,m,q,y){b.hasOwnProperty(m)||(b[m]=y.apply(null,q))}b=b?b._modules:{};m(b,"modules/boost-canvas.src.js",[b["parts/Globals.js"],b["parts/Color.js"],b["parts/Utilities.js"]],function(b,m,q){var y=m.parse,
z=q.addEvent,w=q.extend,ba=q.fireEvent,ca=q.isNumber,da=q.merge,ea=q.pick,r=q.wrap,A=b.win.document,fa=function(){},B=b.Series,k=b.seriesTypes,L;b.initCanvasBoost=function(){b.seriesTypes.heatmap&&r(b.seriesTypes.heatmap.prototype,"drawPoints",function(){var a=this.chart,c=this.getContext(),e=this.chart.inverted,b=this.xAxis,d=this.yAxis;c?(this.points.forEach(function(f){var g=f.plotY;"undefined"===typeof g||isNaN(g)||null===f.y||(g=f.shapeArgs,f=a.styledMode?f.series.colorAttribs(f):f.series.pointAttribs(f),
c.fillStyle=f.fill,e?c.fillRect(d.len-g.y+b.left,b.len-g.x+d.top,-g.height,-g.width):c.fillRect(g.x+b.left,g.y+d.top,g.width,g.height))}),this.canvasToSVG()):this.chart.showLoading("Your browser doesn't support HTML5 canvas, <br>please use a modern browser")});w(B.prototype,{getContext:function(){var a=this.chart,c=a.chartWidth,e=a.chartHeight,b=a.seriesGroup||this.group,d=this,m=function(a,d,e,c,b,f,g){a.call(this,e,d,c,b,f,g)};a.isChartSeriesBoosting()&&(d=a,b=a.seriesGroup);var g=d.ctx;d.canvas||
(d.canvas=A.createElement("canvas"),d.renderTarget=a.renderer.image("",0,0,c,e).addClass("highcharts-boost-canvas").add(b),d.ctx=g=d.canvas.getContext("2d"),a.inverted&&["moveTo","lineTo","rect","arc"].forEach(function(a){r(g,a,m)}),d.boostCopy=function(){d.renderTarget.attr({href:d.canvas.toDataURL("image/png")})},d.boostClear=function(){g.clearRect(0,0,d.canvas.width,d.canvas.height);d===this&&d.renderTarget.attr({href:""})},d.boostClipRect=a.renderer.clipRect(),d.renderTarget.clip(d.boostClipRect));
d.canvas.width!==c&&(d.canvas.width=c);d.canvas.height!==e&&(d.canvas.height=e);d.renderTarget.attr({x:0,y:0,width:c,height:e,style:"pointer-events: none",href:""});d.boostClipRect.attr(a.getBoostClipRect(d));return g},canvasToSVG:function(){this.chart.isChartSeriesBoosting()?this.boostClear&&this.boostClear():(this.boostCopy||this.chart.boostCopy)&&(this.boostCopy||this.chart.boostCopy)()},cvsLineTo:function(a,c,e){a.lineTo(c,e)},renderCanvas:function(){var a=this,c=a.options,e=a.chart,f=this.xAxis,
d=this.yAxis,k=(e.options.boost||{}).timeRendering||!1,g=0,r=a.processedXData,A=a.processedYData,M=c.data,l=f.getExtremes(),C=l.min,D=l.max;l=d.getExtremes();var B=l.min,ha=l.max,N={},E,ia=!!a.sampling,F=c.marker&&c.marker.radius,O=this.cvsDrawPoint,G=c.lineWidth?this.cvsLineTo:void 0,P=F&&1>=F?this.cvsMarkerSquare:this.cvsMarkerCircle,ja=this.cvsStrokeBatch||1E3,ka=!1!==c.enableMouseTracking,Q;l=c.threshold;var u=d.getThreshold(l),R=ca(l),S=u,la=this.fill,T=a.pointArrayMap&&"low,high"===a.pointArrayMap.join(","),
U=!!c.stacking,V=a.cropStart||0;l=e.options.loading;var ma=a.requireSorting,W,na=c.connectNulls,X=!r,H,I,v,x,J,t=U?a.data:r||M,oa=a.fillOpacity?(new m(a.color)).setOpacity(ea(c.fillOpacity,.75)).get():a.color,Y=function(){la?(n.fillStyle=oa,n.fill()):(n.strokeStyle=a.color,n.lineWidth=c.lineWidth,n.stroke())},Z=function(d,c,b,f){0===g&&(n.beginPath(),G&&(n.lineJoin="round"));e.scroller&&"highcharts-navigator-series"===a.options.className?(c+=e.scroller.top,b&&(b+=e.scroller.top)):c+=e.plotTop;d+=
e.plotLeft;W?n.moveTo(d,c):O?O(n,d,c,b,Q):G?G(n,d,c):P&&P.call(a,n,d,c,F,f);g+=1;g===ja&&(Y(),g=0);Q={clientX:d,plotY:c,yBottom:b}},pa="x"===c.findNearestPointBy,aa=this.xData||this.options.xData||this.processedXData||!1,K=function(a,c,b){J=pa?a:a+","+c;ka&&!N[J]&&(N[J]=!0,e.inverted&&(a=f.len-a,c=d.len-c),qa.push({x:aa?aa[V+b]:!1,clientX:a,plotX:a,plotY:c,i:V+b}))};this.renderTarget&&this.renderTarget.attr({href:""});(this.points||this.graph)&&this.destroyGraphics();a.plotGroup("group","series",
a.visible?"visible":"hidden",c.zIndex,e.seriesGroup);a.markerGroup=a.group;z(a,"destroy",function(){a.markerGroup=null});var qa=this.points=[];var n=this.getContext();a.buildKDTree=fa;this.boostClear&&this.boostClear();this.visible&&(99999<M.length&&(e.options.loading=da(l,{labelStyle:{backgroundColor:y("#ffffff").setOpacity(.75).get(),padding:"1em",borderRadius:"0.5em"},style:{backgroundColor:"none",opacity:1}}),q.clearTimeout(L),e.showLoading("Drawing..."),e.options.loading=l),k&&console.time("canvas rendering"),
b.eachAsync(t,function(c,b){var g=!1,m=!1,k=!1,l=!1,n="undefined"===typeof e.index,q=!0;if(!n){if(X){var p=c[0];var h=c[1];t[b+1]&&(k=t[b+1][0]);t[b-1]&&(l=t[b-1][0])}else p=c,h=A[b],t[b+1]&&(k=t[b+1]),t[b-1]&&(l=t[b-1]);k&&k>=C&&k<=D&&(g=!0);l&&l>=C&&l<=D&&(m=!0);if(T){X&&(h=c.slice(1,3));var r=h[0];h=h[1]}else U&&(p=c.x,h=c.stackY,r=h-c.y);c=null===h;ma||(q=h>=B&&h<=ha);if(!c&&(p>=C&&p<=D&&q||g||m))if(p=Math.round(f.toPixels(p,!0)),ia){if("undefined"===typeof v||p===E){T||(r=h);if("undefined"===
typeof x||h>I)I=h,x=b;if("undefined"===typeof v||r<H)H=r,v=b}p!==E&&("undefined"!==typeof v&&(h=d.toPixels(I,!0),u=d.toPixels(H,!0),Z(p,R?Math.min(h,S):h,R?Math.max(u,S):u,b),K(p,h,x),u!==h&&K(p,u,v)),v=x=void 0,E=p)}else h=Math.round(d.toPixels(h,!0)),Z(p,h,u,b),K(p,h,b);W=c&&!na;0===b%5E4&&(a.boostCopy||a.chart.boostCopy)&&(a.boostCopy||a.chart.boostCopy)()}return!n},function(){var c=e.loadingDiv,b=e.loadingShown;Y();a.canvasToSVG();k&&console.timeEnd("canvas rendering");ba(a,"renderedCanvas");
b&&(w(c.style,{transition:"opacity 250ms",opacity:0}),e.loadingShown=!1,L=setTimeout(function(){c.parentNode&&c.parentNode.removeChild(c);e.loadingDiv=e.loadingSpan=null},250));delete a.buildKDTree;a.buildKDTree()},e.renderer.forExport?Number.MAX_VALUE:void 0))}});k.scatter.prototype.cvsMarkerCircle=function(a,c,b,f){a.moveTo(c,b);a.arc(c,b,f,0,2*Math.PI,!1)};k.scatter.prototype.cvsMarkerSquare=function(a,c,b,f){a.rect(c-f,b-f,2*f,2*f)};k.scatter.prototype.fill=!0;k.bubble&&(k.bubble.prototype.cvsMarkerCircle=
function(a,c,b,f,d){a.moveTo(c,b);a.arc(c,b,this.radii&&this.radii[d],0,2*Math.PI,!1)},k.bubble.prototype.cvsStrokeBatch=1);w(k.area.prototype,{cvsDrawPoint:function(a,b,e,f,d){d&&b!==d.clientX&&(a.moveTo(d.clientX,d.yBottom),a.lineTo(d.clientX,d.plotY),a.lineTo(b,e),a.lineTo(b,f))},fill:!0,fillOpacity:!0,sampling:!0});w(k.column.prototype,{cvsDrawPoint:function(a,b,e,f){a.rect(b-1,e,1,f-e)},fill:!0,sampling:!0});b.Chart.prototype.callbacks.push(function(a){z(a,"predraw",function(){a.renderTarget&&
a.renderTarget.attr({href:""});a.canvas&&a.canvas.getContext("2d").clearRect(0,0,a.canvas.width,a.canvas.height)});z(a,"render",function(){a.boostCopy&&a.boostCopy()})})}});m(b,"masters/modules/boost-canvas.src.js",[],function(){})});
//# sourceMappingURL=boost-canvas.js.map