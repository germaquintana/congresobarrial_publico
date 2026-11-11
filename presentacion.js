"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>Number(n||0).toLocaleString("es-CL");
const kit=new Set(["15","21","22","25","26A","26B","27","28","29","30","31","32","33","34","35"]);
const types=["Problema","Oportunidad","Actor","Lugar importante"];
// Paleta recuperada de index.html; una temática conserva el mismo color en todas las capas.
const themePalette={
 "Infraestructura y espacio público":"#2b689b",
 "Aseo y medio ambiente":"#238b84",
 "Desarrollo social y comunitario":"#be772c",
 "Seguridad y convivencia":"#9554a9",
 "Movilidad y transporte":"#d05859",
 "Actividad económica y comercio":"#698b35",
 "Vivienda y entorno urbano":"#946781"
};
const topicOrder=["Infraestructura y espacio público","Desarrollo social y comunitario","Aseo y medio ambiente","Seguridad y convivencia","Movilidad y transporte","Actividad económica y comercio","Vivienda y entorno urbano"];
const typePalette={"Problema":"#c35b57","Oportunidad":"#21887b","Actor":"#6792a5","Lugar importante":"#b18b5d"};
const state={cut:"kit",view:"comuna",uv:"15",direction:"DIMAO",role:"both"};
let data=null,tax=null;
const sort=(a,b)=>String(a).localeCompare(String(b),"es",{numeric:true});
const sum=list=>list.reduce((a,n)=>a+Number(n||0),0);
const mask=n=>n>0&&n<3?"<3":fmt(n);
function cutID(){return state.cut==="kit"?"entrega01":"todo"}
function scopeUVs(){return data.uvs.filter(u=>state.cut==="all"||kit.has(u.uv)).sort((a,b)=>sort(a.uv,b.uv))}
function topicRows(){return scopeUVs().flatMap(u=>u.temas.map(t=>({name:t.etiqueta,n:t.n})))}
function byField(rows,key){const map=new Map();for(const r of rows)map.set(r[key],(map.get(r[key])||0)+Number(r.n||0));return[...map].map(([name,n])=>({name,n})).sort((a,b)=>b.n-a.n||sort(a.name,b.name))}
function totalFor(uv,sub,type){return(uv.por_tipo[type]?.subtemas||[]).find(x=>x.etiqueta===sub)?.n||0}
function roleOf(p,dir){
 if(p.direccion_lider_referencial===dir)return"lead";
 const helpers=String(p.apoyo_habitual||"").split(/\s*[·;,]\s*/).map(s=>s.trim());
 return helpers.includes(dir)?"support":"";
}
function directionRows(){
 const result=[];for(const u of scopeUVs())for(const p of tax.pares){
 const role=roleOf(p,state.direction);if(!role||(state.role!=="both"&&role!==state.role))continue;
 const problem=totalFor(u,p.subtema,"Problema"),opportunity=totalFor(u,p.subtema,"Oportunidad");
 const actor=totalFor(u,p.subtema,"Actor"),place=totalFor(u,p.subtema,"Lugar importante");
 if(problem+opportunity+actor+place)result.push({uv:u.uv,theme:p.tematica,sub:p.subtema,role,leader:p.direccion_lider_referencial,problem,opportunity,actor,place});
 }
 return result;
}
function stat(label,n){return'<div class="metric"><strong>'+fmt(n)+'</strong><span>'+esc(label)+'</span></div>'}
function bar(label,n,max,url){
 const w=(n/Math.max(1,max)*100).toFixed(4);
 return'<div class="barrow"><div>'+(url?'<a href="'+esc(url)+'">'+esc(label)+'</a>':esc(label))+'</div><div class="track" role="img" aria-label="'+esc(label+": "+fmt(n)+" menciones")+'"><i class="fill" style="width:'+w+'%"></i></div><b>'+fmt(n)+'</b></div>';
}
function stacked(label,p,o,max,url){
 const a=(p/Math.max(1,max)*100).toFixed(3),b=(o/Math.max(1,max)*100).toFixed(3);
 return'<div class="barrow"><div>'+(url?'<a href="'+esc(url)+'">'+esc(label)+'</a>':esc(label))+'</div><div class="track" role="img" aria-label="'+esc(label+": "+fmt(p)+" problemas y "+fmt(o)+" oportunidades")+'"><i style="width:'+a+'%;background:#c35b57"></i><i style="width:'+b+'%;background:#21887b"></i></div><b>'+mask(p+o)+'</b></div>';
}

function pieChart(id,items,palette,description,linkFor){
 const vals=items.filter(x=>Number(x.n)>0),total=sum(vals.map(x=>x.n));
 if(!total){$(id).innerHTML='<p class="empty">No hay datos para esta categoría.</p>';return}
 let cursor=0;const colors=vals.map((x,i)=>{
 const from=cursor;cursor=i===vals.length-1?100:cursor+100*x.n/total;
 return (palette[x.name]||"#708c9b")+" "+from.toFixed(5)+"% "+cursor.toFixed(5)+"%";
 });
 const legend=vals.map(x=>{
 const color=palette[x.name]||"#708c9b",pct=(x.n/total*100).toLocaleString("es-CL",{maximumFractionDigits:1});
 const label=linkFor?'<a href="'+esc(linkFor(x))+'">'+esc(x.name)+'</a>':esc(x.name);
 return'<div class="pie-line"><span class="color-dot" style="background:'+color+'"></span><span>'+label+'<br><small>'+fmt(x.n)+' menciones · '+pct+'%</small></span></div>';
 }).join("");
 $(id).innerHTML='<div class="pie-graphic" role="img" aria-label="'+esc(description+": "+fmt(total)+" menciones distribuidas en "+vals.length+" categorías")+'" style="background:conic-gradient('+colors.join(",")+')"></div><div class="pie-legend">'+legend+'</div>';
}
function verticalColumns(id,items,segmenter,linkFor,uvLinkFor){
 if(!items.length){$(id).innerHTML='<p class="empty">No hay registros para el filtro elegido.</p>';return}
 const max=Math.max(1,...items.map(x=>x.total));
 $(id).innerHTML=items.map(row=>{
 const total=Number(row.total)||0;
 const segments=segmenter(row).filter(t=>t.n>0).map(t=>{
 const height=(100*t.n/Math.max(total,1)).toFixed(5);
 return'<a class="stack-segment" href="'+esc(linkFor(row,t))+'" title="'+esc(t.label+": "+fmt(t.n)+" menciones · UV "+row.uv)+'" aria-label="'+esc("UV "+row.uv+", "+t.label+", "+fmt(t.n)+" registros")+'" style="height:'+height+'%;background:'+t.color+'"></a>';
 }).join("");
 return'<div class="stack-column"><span class="stack-total">'+fmt(total)+'</span><div class="stack-shell"><div class="stack-tower" role="group" aria-label="'+esc("UV "+row.uv+": "+fmt(total)+" registros")+'" style="height:'+(100*total/max).toFixed(5)+'%">'+segments+'</div></div><a class="stack-uv-label" href="'+esc(uvLinkFor(row))+'">UV '+esc(row.uv)+'</a></div>';
 }).join("");
}
function thematicStackSegments(u){
 return topicOrder.map(t=>{
  const n=u.temas.find(x=>x.etiqueta===t)?.n||0;
  return {label:t,n,color:themePalette[t]||"#708c9b"};
 });
}

function chooseView(next){state.view=next;render()}
function chooseUV(uv){state.uv=uv;state.view="uv";render()}
function setUrl(){
 const p=new URLSearchParams();p.set("corte",cutID());p.set("vista",state.view);
 if(state.view==="uv")p.set("uv",state.uv);
 if(state.view==="direcciones"){p.set("direccion",state.direction);if(state.role!=="both")p.set("rol",state.role)}
 history.replaceState({},"",location.pathname+"?"+p.toString());
}
function renderComuna(){
 const uvs=scopeUVs(),totals=Object.fromEntries(types.map(t=>[t,sum(uvs.map(u=>u.tipo[t]||0))]));
 const count=sum(uvs.map(u=>u.total)),grupos=sum(uvs.map(u=>u.grupos.length));
 $("communeKpis").innerHTML=stat("Registros en el corte",count)+stat("Etiquetas UV con registros",uvs.length)+stat("Problemas",totals.Problema)+stat("Oportunidades",totals.Oportunidad);
 const topics=byField(topicRows(),"name");
 pieChart("themesPie",topics,themePalette,"Distribución temática del corte",x=>"tematicas.html?corte="+cutID()+"&tema="+encodeURIComponent(x.name));
 $("themesBars").innerHTML=topics.map(t=>bar(t.name,t.n,Math.max(...topics.map(x=>x.n),1),"tematicas.html?corte="+cutID()+"&tema="+encodeURIComponent(t.name))).join("");
 const typesList=types.map(name=>({name,n:totals[name]}));
 pieChart("typesPie",typesList,typePalette,"Distribución por tipo de registro",x=>"cruces.html?corte="+cutID()+"&tipo="+encodeURIComponent(x.name));
 $("typeBars").innerHTML=typesList.map(t=>bar(t.name,t.n,count)).join("")+'<p class="small muted">'+fmt(grupos)+' combinaciones UV–grupo documentadas en este corte; los grupos no acreditan mapas físicos.</p>';
 $("stackLegend").innerHTML=topicOrder.map(name=>'<span class="legend-key"><span class="color-dot" style="background:'+(themePalette[name]||"#708c9b")+'"></span>'+esc(name)+'</span>').join("");
 verticalColumns("uvStacks",uvs,thematicStackSegments,
 (row,segment)=>"cruces.html?corte="+cutID()+"&uv="+encodeURIComponent(row.uv)+"&tema="+encodeURIComponent(segment.label),
 row=>"presentacion.html?corte="+cutID()+"&vista=uv&uv="+encodeURIComponent(row.uv));
 $("stackNote").textContent="Escala común: la columna más alta equivale a "+fmt(Math.max(...uvs.map(u=>u.total)))+" registros. "+fmt(grupos)+" grupos documentados en el corte. Los colores identifican temáticas, no niveles de prioridad.";
 $("uvCards").innerHTML=uvs.map(u=>'<a href="presentacion.html?corte='+cutID()+'&vista=uv&uv='+encodeURIComponent(u.uv)+'" class="uvCard" data-uv="'+esc(u.uv)+'"><b>UV '+esc(u.uv)+'</b><span>'+fmt(u.total)+' registros · '+fmt(u.grupos.length)+' grupos</span><span>'+esc(u.temas.slice(0,2).map(x=>x.etiqueta).join(" · "))+'</span></a>').join("");
 $("uvCards").querySelectorAll("[data-uv]").forEach(a=>a.onclick=e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();chooseUV(a.dataset.uv)});
}
function renderUV(){
 const uvs=scopeUVs();if(!uvs.some(u=>u.uv===state.uv))state.uv=uvs[0]?.uv||"";
 const select=$("uvSelect");select.innerHTML=uvs.map(u=>'<option value="'+esc(u.uv)+'">UV '+esc(u.uv)+'</option>').join("");select.value=state.uv;
 const u=uvs.find(x=>x.uv===state.uv);if(!u)return;
 $("uvKpis").innerHTML=stat("Registros de la UV",u.total)+stat("Problemas",u.tipo.Problema||0)+stat("Oportunidades",u.tipo.Oportunidad||0)+stat("Grupos en DATOS",u.grupos.length);
 $("uvThemes").textContent="Los actores ("+fmt(u.tipo.Actor||0)+") y lugares importantes ("+fmt(u.tipo["Lugar importante"]||0)+") proporcionan contexto. La frecuencia de registros no es un indicador de urgencia.";
 const source=new URLSearchParams({corte:cutID(),uv:state.uv});
 $("uvFull").href="index.html?"+source;$("uvRead").href=$("toReader").href="uv-grupos.html?"+source;
 $("uvGroups").innerHTML=u.grupos.map(g=>{
 const p=new URLSearchParams(source);p.set("grupo",g.etiqueta);
 return'<a href="uv-grupos.html?'+p+'" class="groupcard"><span><strong>'+esc(g.etiqueta)+'</strong><br><span class="small muted">Explorar registros</span></span><b>'+fmt(g.n)+'</b></a>';
 }).join("");
 $("uvWarning").textContent=state.uv==="15"?"Control pendiente: DATOS registra G2 con 16 registros, mientras MAPAS_UV propone G3 con 16. Son etiquetas distintas; no se homologan sin cotejo.":"El vínculo entre grupo de DATOS y mapa físico sigue siendo una asociación pendiente de cotejo.";
 const top=[...u.temas].sort((a,b)=>b.n-a.n);
 pieChart("uvThemePie",top.map(x=>({name:x.etiqueta,n:x.n})),themePalette,"Distribución temática UV "+u.uv,x=>"cruces.html?corte="+cutID()+"&uv="+encodeURIComponent(u.uv)+"&tema="+encodeURIComponent(x.name));
 $("uvThemeBars").innerHTML=top.map(x=>bar(x.etiqueta,x.n,Math.max(1,...top.map(y=>y.n)),"cruces.html?corte="+cutID()+"&uv="+encodeURIComponent(u.uv)+"&tema="+encodeURIComponent(x.etiqueta))).join("");
}
function renderDirecciones(){
 const dirs=[...new Set(tax.pares.map(p=>p.direccion_lider_referencial).filter(Boolean))].sort(sort);
 if(!dirs.includes(state.direction))state.direction=dirs[0];
 $("directionSelect").innerHTML=dirs.map(d=>'<option value="'+esc(d)+'">'+esc(d)+'</option>').join("");$("directionSelect").value=state.direction;
 $("roleSelect").value=state.role;
 const rows=directionRows(),p=sum(rows.map(r=>r.problem)),o=sum(rows.map(r=>r.opportunity)),context=sum(rows.map(r=>r.actor+r.place));
 const nUV=new Set(rows.filter(r=>r.problem+r.opportunity>0).map(r=>r.uv)).size;
 $("directionKpis").innerHTML=stat("Problemas vinculados",p)+stat("Oportunidades vinculadas",o)+stat("UV con problemas/propuestas",nUV)+stat("Actores y lugares (contexto)",context);
 const topicsMap=new Map(),uvMap=new Map();
 for(const r of rows){
  if(r.problem+r.opportunity===0)continue;
  const t=topicsMap.get(r.sub)||{p:0,o:0,theme:r.theme},v=uvMap.get(r.uv)||{p:0,o:0};
  t.p+=r.problem;t.o+=r.opportunity;topicsMap.set(r.sub,t);
  v.p+=r.problem;v.o+=r.opportunity;uvMap.set(r.uv,v);
 }
 const subItems=[...topicsMap].sort((a,b)=>(b[1].p+b[1].o)-(a[1].p+a[1].o)),uvItems=[...uvMap].sort((a,b)=>(b[1].p+b[1].o)-(a[1].p+a[1].o)||sort(a[0],b[0]));
 const mx=Math.max(1,...subItems.map(x=>x[1].p+x[1].o)),maxUV=Math.max(1,...uvItems.map(x=>x[1].p+x[1].o));
 $("directionTopics").innerHTML=subItems.map(([label,v])=>stacked(label,v.p,v.o,mx,"cruces.html?corte="+cutID()+"&subtema="+encodeURIComponent(label))).join("")||'<p class="empty">Sin menciones de este tipo en el corte seleccionado.</p>';
 $("directionUVs").innerHTML=uvItems.map(([uv,v])=>{
 const q=new URLSearchParams({corte:cutID(),uv:uv,direccion:state.direction});if(state.role!=="both")q.set("rol",state.role);
 return stacked("UV "+uv,v.p,v.o,maxUV,"uv-grupos.html?"+q);
 }).join("")||'<p class="empty">Sin registros de problemas u oportunidades.</p>';
 verticalColumns("directionStacks",uvItems.map(([uv,counts])=>({uv,total:counts.p+counts.o,counts})),
 row=>[{label:"Problema",n:row.counts.p,color:typePalette.Problema},{label:"Oportunidad",n:row.counts.o,color:typePalette.Oportunidad}],
 (row,segment)=>{const q=new URLSearchParams({corte:cutID(),uv:row.uv,direccion:state.direction,tipo:segment.label});
 if(state.role!=="both")q.set("rol",state.role);return"uv-grupos.html?"+q},
 row=>{const q=new URLSearchParams({corte:cutID(),uv:row.uv,direccion:state.direction});
 if(state.role!=="both")q.set("rol",state.role);return"uv-grupos.html?"+q});
 $("directionStackNote").textContent="Escala común: columna máxima = "+fmt(maxUV)+" menciones de problemas u oportunidades. Dirección: "+state.direction+" · "+(state.role==="both"?"referencia y apoyo":state.role==="lead"?"liderazgo referencial":"apoyo habitual")+".";
 $("directionDeep").href=state.direction==="DIMAO"?"dimao.html?corte="+cutID()+"&rol="+(state.role==="lead"?"lead":state.role==="support"?"support":"both"):"carteras.html?corte="+cutID()+"&lead="+encodeURIComponent(state.direction);
}
function render(){
 if(!data||!tax)return;
 $("cut").value=state.cut;$("cutDescription").textContent=state.cut==="kit"?"Primera entrega del 11-11-2026: 15 UV y 872 registros documentados. No constituye un panorama exhaustivo de la población comunal.":"Matriz completa: 25 etiquetas UV y 1.570 registros, incluida UV20 con correspondencia por conciliar.";
 for(const v of ["comuna","uv","direcciones"]){
 $("view-"+v).classList.toggle("hidden",state.view!==v);
 $("tab-"+v).classList.toggle("active",state.view===v);
 $("tab-"+v).setAttribute("aria-selected",state.view===v?"true":"false");
 }
 renderComuna();renderUV();renderDirecciones();if(state.view==="direcciones"){const p=new URLSearchParams({corte:cutID(),uv:state.uv,direccion:state.direction});if(state.role!=="both")p.set("rol",state.role);$("toReader").href="uv-grupos.html?"+p;}setUrl();
}
function validate(d,t){
 if(d.uvs?.length!==25||d.totales?.filas_matriz!==1570||t.pares?.length!==15)throw Error("Cortes publicados incompatibles");
 const all=d.uvs.reduce((n,u)=>n+u.total,0);
 if(all!==1570)throw Error("Total de DATOS no reconcilia");
 const selected=d.uvs.filter(u=>kit.has(u.uv)),kitRows=selected.reduce((n,u)=>n+u.total,0);
 if(selected.length!==15||kitRows!==872)throw Error("Entrega 01 no reconcilia");
 for(const u of d.uvs)if(u.grupos.reduce((n,g)=>n+g.n,0)!==u.total)throw Error("Grupos no reconcilian en UV "+u.uv);
 data=d;tax=t;
}
for(const el of document.querySelectorAll("[data-view]"))el.addEventListener("click",()=>chooseView(el.dataset.view));
$("cut").onchange=()=>{state.cut=$("cut").value;render()};
$("uvSelect").onchange=()=>chooseUV($("uvSelect").value);
$("directionSelect").onchange=()=>{state.direction=$("directionSelect").value;render()};
$("roleSelect").onchange=()=>{state.role=$("roleSelect").value;render()};
$("print").onclick=()=>window.print();
const q=new URLSearchParams(location.search);
state.cut=q.get("corte")==="todo"?"all":"kit";
state.view=["comuna","uv","direcciones"].includes(q.get("vista"))?q.get("vista"):"comuna";
state.uv=q.get("uv")||"15";state.direction=q.get("direccion")||"DIMAO";
state.role=["both","lead","support"].includes(q.get("rol"))?q.get("rol"):"both";
Promise.all([
 fetch("datos-agregados.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("DATOS HTTP "+r.status);return r.json()}),
 fetch("taxonomia-subtemas.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Taxonomía HTTP "+r.status);return r.json()})
]).then(([d,t])=>{validate(d,t);render()}).catch(e=>{
 $("communeKpis").textContent="No fue posible cargar el dashboard: "+e.message;
});
