/*
 Highcharts JS v8.0.0 (2020-02-24)

 Module for adding patterns and images as point fills.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Hnsi, ystein Moseng

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/pattern-fill",["highcharts"],function(g){c(g);c.Highcharts=g;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function g(p,c,g,n){p.hasOwnProperty(c)||(p[c]=n.apply(null,g))}c=c?c._modules:{};g(c,"modules/pattern-fill.src.js",[c["parts/Globals.js"],c["parts/Utilities.js"]],function(c,e){function g(a,b){a=JSON.stringify(a);
var c=a.length||0,f=0,d=0;if(b){b=Math.max(Math.floor(c/500),1);for(var h=0;h<c;h+=b)f+=a.charCodeAt(h);f&=f}for(;d<c;++d)b=a.charCodeAt(d),f=(f<<5)-f+b,f&=f;return f.toString(16).replace("-","1")}var n=e.addEvent,p=e.animObject,t=e.erase,r=e.merge,q=e.pick,u=e.removeEvent;e=e.wrap;c.patterns=function(){var a=[],b=c.getOptions().colors;"M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11;M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9;M 3 0 L 3 10 M 8 0 L 8 10;M 0 3 L 10 3 M 0 8 L 10 8;M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7;M 3 3 L 8 3 L 8 8 L 3 8 Z;M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0;M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7;M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0".split(";").forEach(function(c,
f){a.push({path:c,color:b[f],width:10,height:10})});return a}();c.Point.prototype.calculatePatternDimensions=function(a){if(!a.width||!a.height){var b=this.graphic&&(this.graphic.getBBox&&this.graphic.getBBox(!0)||this.graphic.element&&this.graphic.element.getBBox())||{},c=this.shapeArgs;c&&(b.width=c.width||b.width,b.height=c.height||b.height,b.x=c.x||b.x,b.y=c.y||b.y);if(a.image){if(!b.width||!b.height){a._width="defer";a._height="defer";return}a.aspectRatio&&(b.aspectRatio=b.width/b.height,a.aspectRatio>
b.aspectRatio?b.aspectWidth=b.height*a.aspectRatio:b.aspectHeight=b.width/a.aspectRatio);a._width=a.width||Math.ceil(b.aspectWidth||b.width);a._height=a.height||Math.ceil(b.aspectHeight||b.height)}a.width||(a._x=a.x||0,a._x+=b.x-Math.round(b.aspectWidth?Math.abs(b.aspectWidth-b.width)/2:0));a.height||(a._y=a.y||0,a._y+=b.y-Math.round(b.aspectHeight?Math.abs(b.aspectHeight-b.height)/2:0))}};c.SVGRenderer.prototype.addPattern=function(a,b){b=q(b,!0);var c=p(b),f=a.width||a._width||32,d=a.height||a._height||
32,h=a.color||"#343434",k=a.id,g=this,e=function(a){g.rect(0,0,f,d).attr({fill:a}).add(m)};k||(this.idCounter=this.idCounter||0,k="highcharts-pattern-"+this.idCounter+"-"+(this.chartIndex||0),++this.idCounter);this.defIds=this.defIds||[];if(!(-1<this.defIds.indexOf(k))){this.defIds.push(k);var l={id:k,patternUnits:"userSpaceOnUse",patternContentUnits:a.patternContentUnits||"userSpaceOnUse",width:f,height:d,x:a._x||a.x||0,y:a._y||a.y||0};a.patternTransform&&(l.patternTransform=a.patternTransform);
var m=this.createElement("pattern").attr(l).add(this.defs);m.id=k;a.path?(l=a.path,a.backgroundColor&&e(a.backgroundColor),e={d:l.d||l},this.styledMode||(e.stroke=l.stroke||h,e["stroke-width"]=q(l.strokeWidth,2),e.fill=l.fill||"none"),l.transform&&(e.transform=l.transform),this.createElement("path").attr(e).add(m),m.color=h):a.image&&(b?this.image(a.image,0,0,f,d,function(){this.animate({opacity:q(a.opacity,1)},c);u(this.element,"load")}).attr({opacity:0}).add(m):this.image(a.image,0,0,f,d).add(m));
a.image&&b||"undefined"===typeof a.opacity||[].forEach.call(m.element.childNodes,function(b){b.setAttribute("opacity",a.opacity)});this.patternElements=this.patternElements||{};return this.patternElements[k]=m}};e(c.Series.prototype,"getColor",function(a){var b=this.options.color;b&&b.pattern&&!b.pattern.color?(delete this.options.color,a.apply(this,Array.prototype.slice.call(arguments,1)),b.pattern.color=this.color,this.color=this.options.color=b):a.apply(this,Array.prototype.slice.call(arguments,
1))});n(c.Series,"render",function(){var a=this.chart.isResizing;(this.isDirtyData||a||!this.chart.hasRendered)&&(this.points||[]).forEach(function(b){var c=b.options&&b.options.color;c&&c.pattern&&(!a||b.shapeArgs&&b.shapeArgs.width&&b.shapeArgs.height?b.calculatePatternDimensions(c.pattern):(c.pattern._width="defer",c.pattern._height="defer"))})});n(c.Point,"afterInit",function(){var a=this.options.color;a&&a.pattern&&("string"===typeof a.pattern.path&&(a.pattern.path={d:a.pattern.path}),this.color=
this.options.color=r(this.series.options.color,a))});n(c.SVGRenderer,"complexColor",function(a){var b=a.args[0],e=a.args[1];a=a.args[2];var f=this.chartIndex||0,d=b.pattern,h="#343434";"undefined"!==typeof b.patternIndex&&c.patterns&&(d=c.patterns[b.patternIndex]);if(!d)return!0;if(d.image||"string"===typeof d.path||d.path&&d.path.d){var k=a.parentNode&&a.parentNode.getAttribute("class");k=k&&-1<k.indexOf("highcharts-legend");"defer"!==d._width&&"defer"!==d._height||c.Point.prototype.calculatePatternDimensions.call({graphic:{element:a}},
d);if(k||!d.id)d=r({},d),d.id="highcharts-pattern-"+f+"-"+g(d)+g(d,!0);this.addPattern(d,!this.forExport&&q(d.animation,this.globalAnimation,{duration:100}));h="url("+this.url+"#"+d.id+")"}else h=d.color||h;a.setAttribute(e,h);b.toString=function(){return h};return!1});n(c.Chart,"endResize",function(){(this.renderer&&this.renderer.defIds||[]).filter(function(a){return a&&a.indexOf&&0===a.indexOf("highcharts-pattern-")}).length&&(this.series.forEach(function(a){a.points.forEach(function(a){(a=a.options&&
a.options.color)&&a.pattern&&(a.pattern._width="defer",a.pattern._height="defer")})}),this.redraw(!1))});n(c.Chart,"redraw",function(){var a=[],b=this.renderer,c=(b.defIds||[]).filter(function(a){return a.indexOf&&0===a.indexOf("highcharts-pattern-")});c.length&&([].forEach.call(this.renderTo.querySelectorAll('[color^="url("], [fill^="url("], [stroke^="url("]'),function(b){(b=b.getAttribute("fill")||b.getAttribute("color")||b.getAttribute("stroke"))&&a.push(b.substring(b.indexOf("url(")+5).replace(")",
""))}),c.forEach(function(c){-1===a.indexOf(c)&&(t(b.defIds,c),b.patternElements[c]&&(b.patternElements[c].destroy(),delete b.patternElements[c]))}))})});g(c,"masters/modules/pattern-fill.src.js",[],function(){})});
//# sourceMappingURL=pattern-fill.js.map