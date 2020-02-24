/*
 Highstock JS v8.0.0 (2020-02-24)

 Drag-panes module

 (c) 2010-2019 Highsoft AS
 Author: Kacper Madej

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/drag-panes",["highcharts","highcharts/modules/stock"],function(h){b(h);b.Highcharts=h;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function h(b,d,c,p){b.hasOwnProperty(d)||(b[d]=p.apply(null,c))}b=b?b._modules:{};h(b,"modules/drag-panes.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,d){var c=d.addEvent,
p=d.clamp,h=d.isNumber,y=d.merge,z=d.objectEach,w=d.relativeLength;d=d.wrap;var A=b.hasTouch,m=b.Axis,x=b.Pointer;y(!0,m.prototype.defaultYAxisOptions,{minLength:"10%",maxLength:"100%",resize:{controlledAxis:{next:[],prev:[]},enabled:!1,cursor:"ns-resize",lineColor:"#cccccc",lineDashStyle:"Solid",lineWidth:4,x:0,y:0}});b.AxisResizer=function(a){this.init(a)};b.AxisResizer.prototype={init:function(a,f){this.axis=a;this.options=a.options.resize;this.render();f||this.addMouseEvents()},render:function(){var a=
this.axis,f=a.chart,b=this.options,d=b.x,c=b.y,k=p(a.top+a.height+c,f.plotTop,f.plotTop+f.plotHeight),l={};f.styledMode||(l={cursor:b.cursor,stroke:b.lineColor,"stroke-width":b.lineWidth,dashstyle:b.lineDashStyle});this.lastPos=k-c;this.controlLine||(this.controlLine=f.renderer.path().addClass("highcharts-axis-resizer"));this.controlLine.add(a.axisGroup);b=f.styledMode?this.controlLine.strokeWidth():b.lineWidth;l.d=f.renderer.crispLine(["M",a.left+d,k,"L",a.left+a.width+d,k],b);this.controlLine.attr(l)},
addMouseEvents:function(){var a=this,b=a.controlLine.element,d=a.axis.chart.container,v=[],h,k,l;a.mouseMoveHandler=h=function(b){a.onMouseMove(b)};a.mouseUpHandler=k=function(b){a.onMouseUp(b)};a.mouseDownHandler=l=function(b){a.onMouseDown(b)};v.push(c(d,"mousemove",h),c(d.ownerDocument,"mouseup",k),c(b,"mousedown",l));A&&v.push(c(d,"touchmove",h),c(d.ownerDocument,"touchend",k),c(b,"touchstart",l));a.eventsToUnbind=v},onMouseMove:function(a){a.touches&&0===a.touches[0].pageX||!this.grabbed||(this.hasDragged=
!0,this.updateAxes(this.axis.chart.pointer.normalize(a).chartY-this.options.y))},onMouseUp:function(a){this.hasDragged&&this.updateAxes(this.axis.chart.pointer.normalize(a).chartY-this.options.y);this.grabbed=this.hasDragged=this.axis.chart.activeResizer=null},onMouseDown:function(a){this.axis.chart.pointer.reset(!1,0);this.grabbed=this.axis.chart.activeResizer=!0},updateAxes:function(a){var b=this,d=b.axis.chart,c=b.options.controlledAxis,m=0===c.next.length?[d.yAxis.indexOf(b.axis)+1]:c.next;c=
[b.axis].concat(c.prev);var k=[],l=!1,r=d.plotTop,n=d.plotHeight,u=r+n;a=p(a,r,u);var t=a-b.lastPos;1>t*t||([c,m].forEach(function(c,f){c.forEach(function(c,g){var e=(c=h(c)?d.yAxis[c]:f||g?d.get(c):c)&&c.options;if(e&&"navigator-y-axis"!==e.id){g=c.top;var m=Math.round(w(e.minLength,n));var q=Math.round(w(e.maxLength,n));f?(t=a-b.lastPos,e=Math.round(p(c.len-t,m,q)),g=c.top+t,g+e>u&&(q=u-e-g,a+=q,g+=q),g<r&&(g=r,g+e>u&&(e=n)),e===m&&(l=!0),k.push({axis:c,options:{top:100*(g-r)/n+"%",height:100*e/
n+"%"}})):(e=Math.round(p(a-g,m,q)),e===q&&(l=!0),a=g+e,k.push({axis:c,options:{height:100*e/n+"%"}}))}})}),l||(k.forEach(function(a){a.axis.update(a.options,!1)}),d.redraw(!1)))},destroy:function(){var a=this;delete a.axis.resizer;this.eventsToUnbind&&this.eventsToUnbind.forEach(function(a){a()});a.controlLine.destroy();z(a,function(b,c){a[c]=null})}};m.prototype.keepProps.push("resizer");c(m,"afterRender",function(){var a=this.resizer,c=this.options.resize;c&&(c=!1!==c.enabled,a?c?a.init(this,!0):
a.destroy():c&&(this.resizer=new b.AxisResizer(this)))});c(m,"destroy",function(a){!a.keepEvents&&this.resizer&&this.resizer.destroy()});d(x.prototype,"runPointActions",function(a){this.chart.activeResizer||a.apply(this,Array.prototype.slice.call(arguments,1))});d(x.prototype,"drag",function(a){this.chart.activeResizer||a.apply(this,Array.prototype.slice.call(arguments,1))})});h(b,"masters/modules/drag-panes.src.js",[],function(){})});
//# sourceMappingURL=drag-panes.js.map