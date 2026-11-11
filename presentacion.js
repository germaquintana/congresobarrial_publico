"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>Number(n||0).toLocaleString("es-CL");
const kit=new Set(["15","21","22","25","26A","26B","27","28","29","30","31","32","33","34","35"]);
const types=["Problema","Oportunidad","Actor","Lugar importante"];
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
 const topics=byField(topicRows(),"name");$("themesBars").innerHTML=topics.map(t=>bar(t.name,t.n,Math.max(...topics.map(x=>x.n),1),"tematicas.html?corte="+cutID()+"&tema="+encodeURIComponent(t.name))).join("");
 const typesList=types.map(name=>({name,n:totals[name]}));$("typeBars").innerHTML=typesList.map(t=>bar(t.name,t.n,count)).join("")+'<p class="small muted">'+fmt(grupos)+' combinaciones UV–grupo documentadas en este corte; los grupos no acreditan mapas físicos.</p>';
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
 const top=[...u.temas].sort((a,b)=>b.n-a.n);$("uvThemeBars").innerHTML=top.map(x=>bar(x.etiqueta,x.n,Math.max(1,...top.map(y=>y.n)),"cruces.html?corte="+cutID()+"&uv="+encodeURIComponent(u.uv)+"&tema="+encodeURIComponent(x.etiqueta))).join("");
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
