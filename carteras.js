"use strict";
const $=id=>document.getElementById(id);
const fmt=n=>Number(n||0).toLocaleString("es-CL");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const kit=new Set(["15","21","22","26A","26B","25","29","28","27","30","31","32","33","34","35"]);
const kinds=["Problema","Oportunidad","Actor","Lugar importante"];
const state={scope:"kit",lead:"",theme:"",uv:"",sub:"",view:"all"};
let data=null,tax=null,records=[],visible=35;
const sum=a=>a.reduce((n,x)=>n+Number(x||0),0);
const sortText=(a,b)=>String(a).localeCompare(String(b),"es",{numeric:true});
const subTotal=(u,type,sub)=>(u.por_tipo[type]?.subtemas||[]).find(x=>x.etiqueta===sub)?.n||0;
function validate(d,t){
if(d.uvs?.length!==25||d.totales?.filas_matriz!==1570||d.distribucion_tematica?.length!==7||t.pares?.length!==15)throw Error("Versión incompatible de datos");
const seen=new Set();for(const p of t.pares){
if(seen.has(p.subtema)||!p.subtema||!p.tematica||!p.direccion_lider_referencial||!p.instrumento_respuesta)throw Error("Taxonomía incompleta");
seen.add(p.subtema)}
let n=0;
for(const u of d.uvs){for(const type of kinds){
const matched=sum(t.pares.map(p=>subTotal(u,type,p.subtema)));
if(matched!==Number(u.tipo[type]||0))throw Error("Diferencia en UV "+u.uv+" / "+type)}
n+=u.total}
if(n!==1570)throw Error("Total incompatible");
data=d;tax=t;
}
function allRows(){
const base=data.uvs.filter(u=>(state.scope==="all"||kit.has(u.uv))&&(!state.uv||state.uv===u.uv));
const out=[];
for(const uv of base)for(const p of tax.pares){
if(state.lead&&state.lead!==p.direccion_lider_referencial)continue;
if(state.theme&&state.theme!==p.tematica)continue;
if(state.sub&&state.sub!==p.subtema)continue;
const n={uv:uv.uv,theme:p.tematica,sub:p.subtema,lead:p.direccion_lider_referencial,help:p.apoyo_habitual||"",instrument:p.instrumento_respuesta||"",method:p.modalidad_gestion||"",
p:subTotal(uv,"Problema",p.subtema),o:subTotal(uv,"Oportunidad",p.subtema),a:subTotal(uv,"Actor",p.subtema),l:subTotal(uv,"Lugar importante",p.subtema)};
n.total=n.p+n.o;n.context=n.a+n.l;
if(n.total+n.context>0)out.push(n);
}return out;
}
function relevant(){
const q=allRows();return q.filter(r=>state.view==="problems"?r.p>0:state.view==="opportunities"?r.o>0:true);
}
function option(value,label){return '<option value="'+esc(value)+'">'+esc(label)+'</option>'}
function fill(id,choices,blank){
const el=$(id);el.innerHTML=option("",blank)+choices.map(a=>option(a[0],a[1])).join("");
if([...el.options].some(x=>x.value===state[id]))el.value=state[id];else state[id]="";
}
function updateControls(){
$("scope").value=state.scope;$("view").value=state.view;
fill("lead",[...new Set(tax.pares.map(p=>p.direccion_lider_referencial))].sort(sortText).map(x=>[x,x]),"Todas las direcciones");
fill("theme",[...new Set(tax.pares.filter(p=>!state.lead||p.direccion_lider_referencial===state.lead).map(p=>p.tematica))].sort(sortText).map(x=>[x,x]),"Todas las temáticas");
fill("uv",data.uvs.filter(u=>state.scope==="all"||kit.has(u.uv)).sort((a,b)=>sortText(a.uv,b.uv)).map(u=>[u.uv,"UV "+u.uv]),"Todas las UV");
fill("sub",tax.pares.filter(p=>(!state.lead||p.direccion_lider_referencial===state.lead)&&(!state.theme||p.tematica===state.theme)).map(p=>[p.subtema,p.subtema]).sort((a,b)=>sortText(a[0],b[0])),"Todos los subtemas");
}
function updateUrl(){const q=new URLSearchParams();q.set("corte",state.scope==="kit"?"entrega01":"todo");
for(const k of ["lead","theme","uv","sub","view"])if(state[k]&&!(k==="view"&&state[k]==="all"))q.set(k,state[k]);
history.replaceState(null,"",location.pathname+"?"+q)}
function choose(obj){
Object.assign(state,obj);
if(state.sub){const s=tax.pares.find(p=>p.subtema===state.sub);if(s&&((state.lead&&s.direccion_lider_referencial!==state.lead)||(state.theme&&s.tematica!==state.theme)))state.sub=""}
if(obj.sub){const p=tax.pares.find(x=>x.subtema===state.sub);if(p){state.theme=p.tematica;state.lead=p.direccion_lider_referencial}}
updateControls();visible=35;updateUrl();render();
}
const totals=a=>({p:sum(a.map(x=>x.p)),o:sum(a.map(x=>x.o)),a:sum(a.map(x=>x.a)),l:sum(a.map(x=>x.l)),uv:new Set(a.map(x=>x.uv)).size,sub:new Set(a.map(x=>x.sub)).size});
function renderKPIs(a){
const v=totals(a),list=[["Problemas reportados",v.p],["Oportunidades propuestas",v.o],["Actores y lugares de contexto",v.a+v.l],["UV representadas",v.uv],["Subtemas presentes",v.sub]];
$("kpis").innerHTML=list.map(x=>'<div class="kpi"><strong>'+fmt(x[1])+'</strong><span>'+esc(x[0])+'</span></div>').join("");
$("kpiNote").textContent="Hay "+fmt(v.p+v.o)+" menciones de problemas y oportunidades, más "+fmt(v.a+v.l)+" referencias a actores/lugares. No equivale a "+fmt(v.p+v.o+v.a+v.l)+" casos por resolver.";
$("feedback").textContent="Selección actual: "+fmt(v.p)+" problemas, "+fmt(v.o)+" oportunidades, "+fmt(v.uv)+" UV. Sin compromisos municipales derivados automáticamente.";
}
function summarize(a,key){
const groups=new Map();for(const r of a){const id=r[key],z=groups.get(id)||{label:id,p:0,o:0,total:0};z.p+=r.p;z.o+=r.o;z.total+=r.total;groups.set(id,z)}
return [...groups.values()].filter(x=>x.total>0).sort((a,b)=>b.total-a.total||sortText(a.label,b.label));
}
function bars(id,a,field){
const sorted=summarize(a,field),max=Math.max(1,...sorted.map(x=>x.total));
$(""+id).innerHTML=sorted.map(x=>{
const lbl=field==="uv"?"UV "+x.label:x.label;
const red=(x.p/max*100).toFixed(3),green=(x.o/max*100).toFixed(3);
return '<div class="barrow"><div class="barlabel"><button type="button" data-key="'+esc(field)+'" data-val="'+esc(x.label)+'" aria-label="Filtrar '+esc(lbl)+'">'+esc(lbl)+'</button></div><div class="barbg" role="img" aria-label="'+esc(lbl)+": "+fmt(x.p)+" problemas y "+fmt(x.o)+" oportunidades"+'"><i style="width:'+red+'%;background:#b95151"></i><i style="width:'+green+'%;background:#178b80"></i></div><div class="barnum">'+fmt(x.total)+'</div></div>';
}).join("")||'<p class="small">No hay problemas ni oportunidades en esta selección.</p>';
$(id).querySelectorAll("[data-key]").forEach(b=>b.onclick=()=>choose({[b.dataset.key]:b.dataset.val}));
}
function urlToRecord(r,type){
const q=new URLSearchParams();q.set("uv",r.uv);q.set("tema",r.theme);q.set("subtema",r.sub);
if(type)q.set("tipo",type);if(state.scope==="kit")q.set("corte","entrega01");return "uv-grupos.html?"+q;
}
function urlToAnalysis(r,type){
const q=new URLSearchParams();q.set("corte",state.scope==="kit"?"entrega01":"todo");q.set("tema",r.theme);q.set("subtema",r.sub);
if(type)q.set("tipo",type);if(state.uv)q.set("uv",state.uv);return "cruces.html?"+q;
}
function renderCards(a){
const merged=new Map();for(const r of a){const id=r.lead+"|"+r.sub;
const z=merged.get(id)||{...r,uvs:new Set(),p:0,o:0,a:0,l:0};z.p+=r.p;z.o+=r.o;z.a+=r.a;z.l+=r.l;z.uvs.add(r.uv);merged.set(id,z)}
const arr=[...merged.values()].filter(r=>r.p+r.o>0).sort((a,b)=>((state.view==="opportunities"?b.o:state.view==="problems"?b.p:b.p+b.o)-(state.view==="opportunities"?a.o:state.view==="problems"?a.p:a.p+a.o))||sortText(a.sub,b.sub));
const display=n=>n>0&&n<3?"<3":fmt(n);
$("cards").innerHTML=arr.map(r=>{
const bad=state.uv?"UV "+r.uv:fmt(r.uvs.size)+" UV";
const pathP=state.uv?urlToRecord(r,"Problema"):urlToAnalysis(r,"Problema");
const pathO=state.uv?urlToRecord(r,"Oportunidad"):urlToAnalysis(r,"Oportunidad");
return '<article class="workcard"><h3>'+esc(r.sub)+'</h3><span class="pill">'+esc(r.theme)+'</span><p><strong>'+esc(r.lead)+'</strong> · '+esc(bad)+'</p><div class="mini"><div><strong>'+display(r.p)+'</strong><span>Problemas</span></div><div><strong>'+display(r.o)+'</strong><span>Oportunidades</span></div></div><p><strong>Instrumento orientativo:</strong> '+esc(r.instrument)+' · '+esc(r.method)+'</p><p><strong>Apoyos habituales:</strong> '+esc(r.help||"Por verificar")+'</p><p class="small">La dirección y el instrumento necesitan validación institucional antes de generar una tarea.</p><div class="links"><a href="'+urlToAnalysis(r)+'">Cruce temático</a><a href="'+pathP+'">Problemas</a><a href="'+pathO+'">Oportunidades</a></div></article>';
}).join("")||'<p class="small">No existen grupos de problemas u oportunidades en esta selección.</p>';
}
function renderTable(a){
const list=a.filter(r=>r.total>0).sort((x,y)=>y.total-x.total||sortText(x.uv,y.uv)||sortText(x.sub,y.sub));
const show=list.slice(0,visible),masked=n=>n>0&&n<3?"<3":fmt(n);
$("rows").innerHTML=show.map(r=>'<tr><td>UV '+esc(r.uv)+'</td><td>'+esc(r.sub)+'</td><td>'+esc(r.lead)+'</td><td>'+masked(r.p)+'</td><td>'+masked(r.o)+'</td><td>'+masked(r.context)+'</td><td><a href="'+urlToRecord(r)+'">Consultar</a></td></tr>').join("")||'<tr><td colspan="7">No se encontraron intersecciones.</td></tr>';
$("rowCount").textContent=fmt(show.length)+" de "+fmt(list.length)+" cruces UV-subtema con problemas u oportunidades.";
$("more").hidden=visible>=list.length;
}
function render(){if(!data||!tax)return;const a=relevant();renderKPIs(a);bars("leadBars",a,"lead");bars("themeBars",a,"theme");bars("uvBars",a,"uv");renderCards(a);renderTable(a)}
const columns=["uv","tematica","subtema","direccion_referencia_sin_asignar","apoyo_referencial","instrumento_referencial","modalidad_referencial","n_problemas","n_oportunidades","n_actores","n_lugares","estado","competencia_a_validar","evidencia_por_cotejar","accion_propuesta","responsable_por_designar","fecha_inicio","tipo_plazo","fecha_termino","financiamiento","prioridad_fundamentada","validacion_requerida","evidencia_de_seguimiento"];
function csvEsc(v){let s=String(v??"");if(/^\s*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function exportCSV(){
const a=relevant().filter(x=>x.total>0),lines=[columns.map(csvEsc).join(",")];
for(const r of a){const safe=n=>n>0&&n<3?"SUPRIMIDO_MENOR_A_3":n;
const values=[r.uv,r.theme,r.sub,r.lead,r.help,r.instrument,r.method,safe(r.p),safe(r.o),safe(r.a),safe(r.l),"SOLO_ANALISIS_SIN_ASIGNACION","","","","","","","","","","",""];
if(values.length!==columns.length)throw Error("Columnas inconsistentes");
lines.push(values.map(csvEsc).join(","))}
const blob=new Blob(["\uFEFF"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="congreso_barrial_cartera_referencial_"+state.scope+".csv";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
for(const id of ["scope","lead","theme","uv","sub","view"])$(id).addEventListener("change",()=>choose({[id]:$(id).value}));
$("clear").onclick=()=>choose({scope:state.scope,lead:"",theme:"",uv:"",sub:"",view:"all"});
$("more").onclick=()=>{visible+=35;renderTable(relevant())};
$("export").onclick=exportCSV;
Promise.all([fetch("datos-agregados.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Datos "+r.status);return r.json()}),
fetch("taxonomia-subtemas.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Taxonomía "+r.status);return r.json()})])
.then(([d,t])=>{validate(d,t);const q=new URLSearchParams(location.search);state.scope=q.get("corte")==="todo"?"all":"kit";
for(const k of ["lead","theme","uv","sub"])state[k]=q.get(k)||"";
state.view=["all","problems","opportunities"].includes(q.get("view"))?q.get("view"):"all";
updateControls();updateUrl();render();})
.catch(e=>{$("feedback").textContent="No se puede cargar la cartera: "+e.message;});
