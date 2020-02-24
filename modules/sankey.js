/*
 Highcharts JS v8.0.0 (2020-02-24)

 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sankey",["highcharts"],function(l){b(l);b.Highcharts=l;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function l(b,g,k,l){b.hasOwnProperty(g)||(b[g]=l.apply(null,k))}b=b?b._modules:{};l(b,"mixins/nodes.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,g){var k=g.defined,n=g.extend,l=g.find,p=g.pick,t=b.Point;
b.NodesMixin={createNode:function(b){function c(a,c){return l(a,function(d){return d.id===c})}var a=c(this.nodes,b),w=this.pointClass;if(!a){var k=this.options.nodes&&c(this.options.nodes,b);a=(new w).init(this,n({className:"highcharts-node",isNode:!0,id:b,y:1},k));a.linksTo=[];a.linksFrom=[];a.formatPrefix="node";a.name=a.name||a.options.id;a.mass=p(a.options.mass,a.options.marker&&a.options.marker.radius,this.options.marker&&this.options.marker.radius,4);a.getSum=function(){var c=0,b=0;a.linksTo.forEach(function(d){c+=
d.weight});a.linksFrom.forEach(function(d){b+=d.weight});return Math.max(c,b)};a.offset=function(c,b){for(var d=0,e=0;e<a[b].length;e++){if(a[b][e]===c)return d;d+=a[b][e].weight}};a.hasShape=function(){var c=0;a.linksTo.forEach(function(a){a.outgoing&&c++});return!a.linksTo.length||c!==a.linksTo.length};this.nodes.push(a)}return a},generatePoints:function(){var g=this.chart,c={};b.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=0;this.nodes.forEach(function(a){a.linksFrom.length=
0;a.linksTo.length=0;a.level=a.options.level});this.points.forEach(function(a){k(a.from)&&(c[a.from]||(c[a.from]=this.createNode(a.from)),c[a.from].linksFrom.push(a),a.fromNode=c[a.from],g.styledMode?a.colorIndex=p(a.options.colorIndex,c[a.from].colorIndex):a.color=a.options.color||c[a.from].color);k(a.to)&&(c[a.to]||(c[a.to]=this.createNode(a.to)),c[a.to].linksTo.push(a),a.toNode=c[a.to]);a.name=a.name||a.id},this);this.nodeLookup=c},setData:function(){this.nodes&&(this.nodes.forEach(function(b){b.destroy()}),
this.nodes.length=0);b.Series.prototype.setData.apply(this,arguments)},destroy:function(){this.data=[].concat(this.points||[],this.nodes);return b.Series.prototype.destroy.apply(this,arguments)},setNodeState:function(b){var c=arguments,a=this.isNode?this.linksTo.concat(this.linksFrom):[this.fromNode,this.toNode];"select"!==b&&a.forEach(function(a){a&&a.series&&(t.prototype.setState.apply(a,c),a.isNode||(a.fromNode.graphic&&t.prototype.setState.apply(a.fromNode,c),a.toNode&&a.toNode.graphic&&t.prototype.setState.apply(a.toNode,
c)))});t.prototype.setState.apply(this,c)}}});l(b,"mixins/tree-series.js",[b["parts/Color.js"],b["parts/Utilities.js"]],function(b,g){var k=g.extend,l=g.isArray,n=g.isNumber,p=g.isObject,t=g.merge,u=g.pick;return{getColor:function(c,a){var w=a.index,k=a.mapOptionsToLevel,g=a.parentColor,n=a.parentColorIndex,d=a.series,e=a.colors,y=a.siblings,q=d.points,h=d.chart.options.chart,z;if(c){q=q[c.i];c=k[c.level]||{};if(k=q&&c.colorByPoint){var f=q.index%(e?e.length:h.colorCount);var m=e&&e[f]}if(!d.chart.styledMode){e=
q&&q.options.color;h=c&&c.color;if(z=g)z=(z=c&&c.colorVariation)&&"brightness"===z.key?b.parse(g).brighten(w/y*z.to).get():g;z=u(e,h,m,z,d.color)}var r=u(q&&q.options.colorIndex,c&&c.colorIndex,f,n,a.colorIndex)}return{color:z,colorIndex:r}},getLevelOptions:function(c){var a=null;if(p(c)){a={};var b=n(c.from)?c.from:1;var g=c.levels;var x={};var v=p(c.defaults)?c.defaults:{};l(g)&&(x=g.reduce(function(a,e){if(p(e)&&n(e.level)){var d=t({},e);var q="boolean"===typeof d.levelIsConstant?d.levelIsConstant:
v.levelIsConstant;delete d.levelIsConstant;delete d.level;e=e.level+(q?0:b-1);p(a[e])?k(a[e],d):a[e]=d}return a},{}));g=n(c.to)?c.to:1;for(c=0;c<=g;c++)a[c]=t({},v,p(x[c])?x[c]:{})}return a},setTreeValues:function B(a,b){var g=b.before,n=b.idRoot,d=b.mapIdToNode[n],e=b.points[a.i],y=e&&e.options||{},q=0,h=[];k(a,{levelDynamic:a.level-(("boolean"===typeof b.levelIsConstant?b.levelIsConstant:1)?0:d.level),name:u(e&&e.name,""),visible:n===a.id||("boolean"===typeof b.visible?b.visible:!1)});"function"===
typeof g&&(a=g(a,b));a.children.forEach(function(d,e){var f=k({},b);k(f,{index:e,siblings:a.children.length,visible:a.visible});d=B(d,f);h.push(d);d.visible&&(q+=d.val)});a.visible=0<q||a.visible;g=u(y.value,q);k(a,{children:h,childrenTotal:q,isLeaf:a.visible&&!q,val:g});return a},updateRootId:function(a){if(p(a)){var b=p(a.options)?a.options:{};b=u(a.rootNode,b.rootId,"");p(a.userOptions)&&(a.userOptions.rootId=b);a.rootNode=b}return b}}});l(b,"modules/sankey.src.js",[b["parts/Globals.js"],b["parts/Color.js"],
b["parts/Utilities.js"],b["mixins/tree-series.js"]],function(b,g,k,l){var n=k.defined,p=k.find,t=k.isObject,u=k.merge,c=k.pick,a=k.relativeLength,w=k.seriesType,B=k.stableSort,x=l.getLevelOptions,v=b.Point;w("sankey","column",{borderWidth:0,colorByPoint:!0,curveFactor:.33,dataLabels:{enabled:!0,backgroundColor:"none",crop:!1,nodeFormat:void 0,nodeFormatter:function(){return this.point.name},format:void 0,formatter:function(){},inside:!0},inactiveOtherPoints:!0,linkOpacity:.5,minLinkWidth:0,nodeWidth:20,
nodePadding:10,showInLegend:!1,states:{hover:{linkOpacity:1},inactive:{linkOpacity:.1,opacity:.1,animation:{duration:50}}},tooltip:{followPointer:!0,headerFormat:'<span style="font-size: 10px">{series.name}</span><br/>',pointFormat:"{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",nodeFormat:"{point.name}: <b>{point.sum}</b><br/>"}},{isCartesian:!1,invertable:!0,forceDL:!0,orderNodes:!0,pointArrayMap:["from","to"],createNode:b.NodesMixin.createNode,setData:b.NodesMixin.setData,
destroy:b.NodesMixin.destroy,getNodePadding:function(){var a=this.options.nodePadding||0;if(this.nodeColumns){var e=this.nodeColumns.reduce(function(a,d){return Math.max(a,d.length)},0);e*a>this.chart.plotSizeY&&(a=this.chart.plotSizeY/e)}return a},createNodeColumn:function(){var d=this,e=this.chart,b=[];b.sum=function(){return this.reduce(function(a,d){return a+d.getSum()},0)};b.offset=function(e,c){for(var q=0,f,h=d.nodePadding,y=0;y<b.length;y++){f=b[y].getSum();var g=Math.max(f*c,d.options.minLinkWidth);
f=f?g+h:0;if(b[y]===e)return{relativeTop:q+a(e.options.offset||0,f)};q+=f}};b.top=function(a){var b=d.nodePadding,c=this.reduce(function(e,c){0<e&&(e+=b);c=Math.max(c.getSum()*a,d.options.minLinkWidth);return e+c},0);return(e.plotSizeY-c)/2};return b},createNodeColumns:function(){var a=[];this.nodes.forEach(function(d){var b=-1,e;if(!n(d.options.column))if(0===d.linksTo.length)d.column=0;else{for(e=0;e<d.linksTo.length;e++){var c=d.linksTo[0];if(c.fromNode.column>b){var f=c.fromNode;b=f.column}}d.column=
b+1;f&&"hanging"===f.options.layout&&(d.hangsFrom=f,e=-1,p(f.linksFrom,function(a,b){(a=a.toNode===d)&&(e=b);return a}),d.column+=e)}a[d.column]||(a[d.column]=this.createNodeColumn());a[d.column].push(d)},this);for(var b=0;b<a.length;b++)"undefined"===typeof a[b]&&(a[b]=this.createNodeColumn());return a},hasData:function(){return!!this.processedXData.length},pointAttribs:function(a,b){var d=this,e=d.mapOptionsToLevel[(a.isNode?a.level:a.fromNode.level)||0]||{},h=a.options,k=e.states&&e.states[b]||
{};b=["colorByPoint","borderColor","borderWidth","linkOpacity"].reduce(function(a,b){a[b]=c(k[b],h[b],e[b],d.options[b]);return a},{});var f=c(k.color,h.color,b.colorByPoint?a.color:e.color);return a.isNode?{fill:f,stroke:b.borderColor,"stroke-width":b.borderWidth}:{fill:g.parse(f).setOpacity(b.linkOpacity).get()}},generatePoints:function(){function a(b,d){"undefined"===typeof b.level&&(b.level=d,b.linksFrom.forEach(function(b){b.toNode&&a(b.toNode,d+1)}))}b.NodesMixin.generatePoints.apply(this,arguments);
this.orderNodes&&(this.nodes.filter(function(a){return 0===a.linksTo.length}).forEach(function(b){a(b,0)}),B(this.nodes,function(a,b){return a.level-b.level}))},translateNode:function(a,b){var d=this.translationFactor,e=this.chart,h=this.options,g=a.getSum(),f=Math.max(Math.round(g*d),this.options.minLinkWidth),m=Math.round(h.borderWidth)%2/2,r=b.offset(a,d);b=Math.floor(c(r.absoluteTop,b.top(d)+r.relativeTop))+m;m=Math.floor(this.colDistance*a.column+h.borderWidth/2)+m;m=e.inverted?e.plotSizeX-m:
m;d=Math.round(this.nodeWidth);(a.sum=g)?(a.shapeType="rect",a.nodeX=m,a.nodeY=b,a.shapeArgs=e.inverted?{x:m-d,y:e.plotSizeY-b-f,width:a.options.height||h.height||d,height:a.options.width||h.width||f}:{x:m,y:b,width:a.options.width||h.width||d,height:a.options.height||h.height||f},a.shapeArgs.display=a.hasShape()?"":"none",h=this.mapOptionsToLevel[a.level],g=a.options,g=t(g)?g.dataLabels:{},h=t(h)?h.dataLabels:{},h=u({style:{}},h,g),a.dlOptions=h,a.plotY=1,a.tooltipPos=e.inverted?[e.plotSizeY-a.shapeArgs.y-
a.shapeArgs.height/2,e.plotSizeX-a.shapeArgs.x-a.shapeArgs.width/2]:[a.shapeArgs.x+a.shapeArgs.width/2,a.shapeArgs.y+a.shapeArgs.height/2]):a.dlOptions={enabled:!1}},translateLink:function(a){var b=function(b,c){var d;c=b.offset(a,c)*g;return Math.min(b.nodeY+c,b.nodeY+(null===(d=b.shapeArgs)||void 0===d?void 0:d.height)-f)},d=a.fromNode,c=a.toNode,h=this.chart,g=this.translationFactor,f=Math.max(a.weight*g,this.options.minLinkWidth),m=(h.inverted?-this.colDistance:this.colDistance)*this.options.curveFactor,
r=b(d,"linksFrom");b=b(c,"linksTo");var k=d.nodeX,l=this.nodeWidth;c=c.column*this.colDistance;var n=a.outgoing,p=c>k;h.inverted&&(r=h.plotSizeY-r,b=h.plotSizeY-b,c=h.plotSizeX-c,l=-l,f=-f,p=k>c);a.shapeType="path";a.linkBase=[r,r+f,b,b+f];if(p)a.shapeArgs={d:["M",k+l,r,"C",k+l+m,r,c-m,b,c,b,"L",c+(n?l:0),b+f/2,"L",c,b+f,"C",c-m,b+f,k+l+m,r+f,k+l,r+f,"z"]};else{m=c-20-f;n=c-20;p=c;var t=k+l,C=t+20,u=C+f,x=r,v=r+f,w=v+20,D=w+(h.plotHeight-r-f),A=D+20,F=A+f,B=b,E=B+f,G=E+20,H=A+.7*f,I=p-.7*f,J=t+.7*
f;a.shapeArgs={d:["M",t,x,"C",J,x,u,v-.7*f,u,w,"L",u,D,"C",u,H,J,F,t,F,"L",p,F,"C",I,F,m,H,m,D,"L",m,G,"C",m,E-.7*f,I,B,p,B,"L",p,E,"C",n,E,n,E,n,G,"L",n,D,"C",n,A,n,A,p,A,"L",t,A,"C",C,A,C,A,C,D,"L",C,w,"C",C,v,C,v,t,v,"z"]}}a.dlBox={x:k+(c-k+l)/2,y:r+(b-r)/2,height:f,width:0};a.tooltipPos=h.inverted?[h.plotSizeY-a.dlBox.y-f/2,h.plotSizeX-a.dlBox.x]:[a.dlBox.x,a.dlBox.y+f/2];a.y=a.plotY=1;a.color||(a.color=d.color)},translate:function(){var b=this,c=function(a){for(var c=a.slice(),d=b.options.minLinkWidth||
0,e,f=0,m,l=k.plotSizeY-h.borderWidth-(a.length-1)*g.nodePadding;a.length;){f=l/a.sum();e=!1;for(m=a.length;m--;)a[m].getSum()*f<d&&(a.splice(m,1),l-=d+g.nodePadding,e=!0);if(!e)break}a.length=0;c.forEach(function(b){return a.push(b)});return f};this.processedXData||this.processData();this.generatePoints();this.nodeColumns=this.createNodeColumns();this.nodeWidth=a(this.options.nodeWidth,this.chart.plotSizeX);var g=this,k=this.chart,h=this.options,l=this.nodeWidth,f=this.nodeColumns;this.nodePadding=
this.getNodePadding();this.translationFactor=f.reduce(function(a,b){return Math.min(a,c(b))},Infinity);this.colDistance=(k.plotSizeX-l-h.borderWidth)/Math.max(1,f.length-1);g.mapOptionsToLevel=x({from:1,levels:h.levels,to:f.length-1,defaults:{borderColor:h.borderColor,borderRadius:h.borderRadius,borderWidth:h.borderWidth,color:g.color,colorByPoint:h.colorByPoint,levelIsConstant:!0,linkColor:h.linkColor,linkLineWidth:h.linkLineWidth,linkOpacity:h.linkOpacity,states:h.states}});f.forEach(function(a){a.forEach(function(b){g.translateNode(b,
a)})},this);this.nodes.forEach(function(a){a.linksFrom.forEach(function(a){(a.weight||a.isNull)&&a.to&&(g.translateLink(a),a.allowShadow=!1)})})},render:function(){var a=this.points;this.points=this.points.concat(this.nodes||[]);b.seriesTypes.column.prototype.render.call(this);this.points=a},animate:b.Series.prototype.animate},{applyOptions:function(a,b){v.prototype.applyOptions.call(this,a,b);n(this.options.level)&&(this.options.column=this.column=this.options.level);return this},setState:b.NodesMixin.setNodeState,
getClassName:function(){return(this.isNode?"highcharts-node ":"highcharts-link ")+v.prototype.getClassName.call(this)},isValid:function(){return this.isNode||"number"===typeof this.weight}});""});l(b,"masters/modules/sankey.src.js",[],function(){})});
//# sourceMappingURL=sankey.js.map