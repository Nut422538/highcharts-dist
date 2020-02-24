/*
 Highcharts JS v8.0.0 (2020-02-24)

 Highcharts cylinder module

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/cylinder",["highcharts","highcharts/highcharts-3d"],function(f){c(f);c.Highcharts=f;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function f(c,h,d,f){c.hasOwnProperty(h)||(c[h]=f.apply(null,d))}c=c?c._modules:{};f(c,"modules/cylinder.src.js",[c["parts/Globals.js"],c["parts/Color.js"],c["parts/Utilities.js"]],function(c,
f,d){var h=f.parse;f=d.merge;var t=d.pick,l=d.seriesType,u=c.charts,v=c.deg2rad,w=c.perspective;d=c.Renderer.prototype;var x=d.cuboidPath;l("cylinder","column",{},{},{shapeType:"cylinder",hasNewShapeType:c.seriesTypes.column.prototype.pointClass.prototype.hasNewShapeType});c=f(d.elements3d.cuboid,{parts:["top","bottom","front","back"],pathType:"cylinder",fillSetter:function(a){this.singleSetterForParts("fill",null,{front:a,back:a,top:h(a).brighten(.1).get(),bottom:h(a).brighten(-.1).get()});this.color=
this.fill=a;return this}});d.elements3d.cylinder=c;d.cylinder=function(a){return this.element3d("cylinder",a)};d.cylinderPath=function(a){var b=u[this.chartIndex],e=x.call(this,a),c=!e.isTop,p=!e.isFront,d=this.getCylinderEnd(b,a);a=this.getCylinderEnd(b,a,!0);return{front:this.getCylinderFront(d,a),back:this.getCylinderBack(d,a),top:d,bottom:a,zIndexes:{top:c?3:0,bottom:c?0:3,front:p?2:1,back:p?1:2,group:e.zIndexes.group}}};d.getCylinderFront=function(a,b){a=a.slice(0,a.simplified?9:17);a.push("L");
b.simplified?(a=a.concat(b.slice(7,9)).concat(b.slice(3,6)).concat(b.slice(0,3)),a[a.length-3]="L"):a.push(b[15],b[16],"C",b[13],b[14],b[11],b[12],b[8],b[9],"C",b[6],b[7],b[4],b[5],b[1],b[2]);a.push("Z");return a};d.getCylinderBack=function(a,b){var e=["M"];a.simplified?(e=e.concat(a.slice(7,12)),e.push("L",a[1],a[2])):e=e.concat(a.slice(15));e.push("L");b.simplified?e=e.concat(b.slice(1,3)).concat(b.slice(9,12)).concat(b.slice(6,9)):e.push(b[29],b[30],"C",b[27],b[28],b[25],b[26],b[22],b[23],"C",
b[20],b[21],b[18],b[19],b[15],b[16]);e.push("Z");return e};d.getCylinderEnd=function(a,b,e){var c=t(b.depth,b.width),d=Math.min(b.width,c)/2,f=v*(a.options.chart.options3d.beta-90+(b.alphaCorrection||0));e=b.y+(e?b.height:0);var g=.5519*d,h=b.width/2+b.x,l=c/2+b.z,k=[{x:0,y:e,z:d},{x:g,y:e,z:d},{x:d,y:e,z:g},{x:d,y:e,z:0},{x:d,y:e,z:-g},{x:g,y:e,z:-d},{x:0,y:e,z:-d},{x:-g,y:e,z:-d},{x:-d,y:e,z:-g},{x:-d,y:e,z:0},{x:-d,y:e,z:g},{x:-g,y:e,z:d},{x:0,y:e,z:d}],q=Math.cos(f),r=Math.sin(f),m,n;k.forEach(function(a,
b){m=a.x;n=a.z;k[b].x=m*q-n*r+h;k[b].z=n*q+m*r+l});a=w(k,a,!0);2.5>Math.abs(a[3].y-a[9].y)&&2.5>Math.abs(a[0].y-a[6].y)?(a=this.toLinePath([a[0],a[3],a[6],a[9]],!0),a.simplified=!0):a=this.getCurvedPath(a);return a};d.getCurvedPath=function(a){var b=["M",a[0].x,a[0].y],d=a.length-2,c;for(c=1;c<d;c+=3)b.push("C",a[c].x,a[c].y,a[c+1].x,a[c+1].y,a[c+2].x,a[c+2].y);return b}});f(c,"masters/modules/cylinder.src.js",[],function(){})});
//# sourceMappingURL=cylinder.js.map