"use strict";
const $=id=>document.getElementById(id);
const fmt=n=>Number(n||0).toLocaleString("es-CL");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const kit=new Set(["15","21","22","26A","26B","25","29","28","27","30","31","32","33","34","35"]);
const kinds=["Problema","Oportunidad","Actor","Lugar importante"];
const state={scope:"kit",role:"both",focus:"all",uv:"",sub:"",pattern:"all"};
let data=null,tax=null,topics=[],items=[],limit=40,quality=null;
const sum=vals=>vals.reduce((a,n)=>a+Number(n||0),0);
const sort=(a,b)=>String(a).localeCompare(String(b),"es",{numeric:true});
function roleOf(x){if(x.direccion_lider_referencial==="DIMAO")return"lead";const support=String(x.apoyo_habitual||"").split(/\s*[·;,]\s*/).map(s=>s.trim());return support.includes("DIMAO")?"support":""}
function subCount(u,ty,sub){return(u.por_tipo[ty]?.subtemas||[]).find(x=>x.etiqueta===sub)?.n||0}
function validate(d,t){
if(d.uvs?.length!==25||d.totales?.filas_matriz!==1570||t.pares?.length!==15)throw Error("Versión de fuentes incompatible");
const unique=new Set();for(const p of t.pares){if(unique.has(p.subtema)||!p.tematica||!p.direccion_lider_referencial)throw Error("Taxonomía repetida o incompleta");unique.add(p.subtema)}
let total=0;for(const u of d.uvs){for(const type of kinds){const count=sum(t.pares.map(x=>subCount(u,type,x.subtema)));if(count!==Number(u.tipo[type]||0))throw Error("No reconcilia: UV "+u.uv+" tipo "+type)}total+=u.total}
if(total!==1570)throw Error("No reconcilia total");data=d;tax=t;
topics=t.pares.map(p=>({...p,role:roleOf(p)})).filter(x=>x.role!=="");
if(topics.length!==5||topics.filter(x=>x.role==="lead").length!==2||topics.filter(x=>x.role==="support").length!==3)throw Error("Cobertura DIMAO distinta del corte verificado");
}
function listRows(opts={}){
const scope=opts.scope||state.scope,role=opts.role||state.role,uv=opts.uv===undefined?state.uv:opts.uv,sub=opts.sub===undefined?state.sub:opts.sub;
const uvList=data.uvs.filter(u=>(scope==="all"||kit.has(u.uv))&&(!uv||u.uv===uv));
const result=[];for(const u of uvList)for(const t of topics){
if(role!=="both"&&t.role!==role)continue;if(sub&&sub!==t.subtema)continue;
const p=subCount(u,"Problema",t.subtema),o=subCount(u,"Oportunidad",t.subtema),a=subCount(u,"Actor",t.subtema),l=subCount(u,"Lugar importante",t.subtema);
if(p+o+a+l===0)continue;result.push({uv:u.uv,sub:t.subtema,theme:t.tematica,role:t.role,leader:t.direccion_lider_referencial,helpers:t.apoyo_habitual||"",instrument:t.instrumento_respuesta||"",method:t.modalidad_gestion||"",p,o,a,l})}
return result;
}
function focused(r){return state.focus==="problems"?r.p:state.focus==="opportunities"?r.o:r.p+r.o}
function patternOf(r){return r.p>0&&r.o>0?"both":r.p>0?"problemOnly":r.o>0?"opportunityOnly":"contextOnly"}
function selectedRows(){return listRows().filter(r=>focused(r)>0&&(state.pattern==="all"||patternOf(r)===state.pattern))}
function totals(rows){return{p:sum(rows.map(r=>r.p)),o:sum(rows.map(r=>r.o)),a:sum(rows.map(r=>r.a)),l:sum(rows.map(r=>r.l)),issues:sum(rows.map(r=>r.p+r.o)),uvs:new Set(rows.filter(r=>r.p+r.o>0).map(r=>r.uv)).size,subtopics:new Set(rows.filter(r=>r.p+r.o>0).map(r=>r.sub)).size}}
function opt(v,l){return'<option value="'+esc(v)+'">'+esc(l)+'</option>'}
function chooseOptions(id,list,blank,current){const el=$(id);el.innerHTML=opt("",blank)+list.map(([v,l])=>opt(v,l)).join("");if([...el.options].some(x=>x.value===current))el.value=current;else{el.value="";if(id==="uv"||id==="sub")state[id]=""}}
function sync(){
$("scope").value=state.scope;$("role").value=state.role;$("focus").value=state.focus;$("pattern").value=state.pattern;
chooseOptions("uv",data.uvs.filter(u=>state.scope==="all"||kit.has(u.uv)).map(u=>[u.uv,"UV "+u.uv+(u.registro_provisional?" · por conciliar":"")]).sort((a,b)=>sort(a[0],b[0])),"Todas las UV",state.uv);
chooseOptions("sub",topics.filter(t=>state.role==="both"||state.role===t.role).map(t=>[t.subtema,t.subtema]).sort((a,b)=>sort(a[0],b[0])),"Todos los subtemas",state.sub);
}
function query(){const q=new URLSearchParams();q.set("corte",state.scope==="all"?"todo":"entrega01");if(state.role!=="both")q.set("rol",state.role);if(state.focus!=="all")q.set("foco",state.focus);if(state.uv)q.set("uv",state.uv);if(state.sub)q.set("subtema",state.sub);if(state.pattern!=="all")q.set("patron",state.pattern);history.replaceState({},"",location.pathname+"?"+q)}
function choose(changes){Object.assign(state,changes);if(state.sub&&!topics.some(t=>t.subtema===state.sub&&(state.role==="both"||t.role===state.role)))state.sub="";sync();query();limit=40;render()}
function recordLink(uv,t,type){
const q=new URLSearchParams();q.set("corte",state.scope==="all"?"todo":"entrega01");if(uv)q.set("uv",uv);q.set("tema",t.tematica||t.theme);q.set("subtema",t.subtema||t.sub);if(type)q.set("tipo",type);return"trazabilidad.html?"+q}
function crossLink(uv,t,type){
const q=new URLSearchParams();q.set("corte",state.scope==="all"?"todo":"entrega01");if(uv)q.set("uv",uv);q.set("tema",t.tematica||t.theme);q.set("subtema",t.subtema||t.sub);if(type)q.set("tipo",type);return"cruces.html?"+q}
function renderKPIs(rows){const v=totals(rows);
const cards=[["Problemas",v.p],["Oportunidades",v.o],["Actores y lugares (contexto)",v.a+v.l],["UV involucradas",v.uvs],["Subtemas DIMAO",v.subtopics]];
$("kpis").innerHTML=cards.map(([k,n])=>'<div class="stat"><b>'+fmt(n)+'</b><span>'+esc(k)+'</span></div>').join("");
$("kpiNote").textContent="Los "+fmt(v.issues)+" registros de problemas/oportunidades son una selección temática (no demandas formalmente validadas). Las "+fmt(v.a+v.l)+" referencias de contexto no se suman como nuevos problemas. El tipo elegido modifica los grupos visibles.";
$("status").textContent="Panel actualizado: "+fmt(v.p)+" problemas, "+fmt(v.o)+" oportunidades, "+fmt(v.uvs)+" UV y "+fmt(v.subtopics)+" subtemas vinculados; DIMAO aún no ha sido designada formalmente por este panel.";
}
function barGroups(rows,key){const m=new Map();for(const r of rows){const k=key==="role"?r.role:r[key],a=m.get(k)||{key:k,p:0,o:0,n:0};a.p+=r.p;a.o+=r.o;a.n+=focused(r);m.set(k,a)}
return[...m.values()].filter(x=>x.n>0).sort((a,b)=>b.n-a.n||sort(a.key,b.key))}
function barRender(id,groups,key){
const max=Math.max(1,...groups.map(x=>x.n));
$(""+id).innerHTML=groups.map(x=>{
const label=key==="role"?(x.key==="lead"?"DIMAO · dirección de referencia":"DIMAO · apoyo habitual"):key==="uv"?"UV "+x.key:x.key;
const wP=(state.focus==="opportunities"?0:x.p/max*100).toFixed(3),wO=(state.focus==="problems"?0:x.o/max*100).toFixed(3);
return'<div class="barrow"><div><button type="button" data-key="'+esc(key)+'" data-value="'+esc(x.key)+'">'+esc(label)+'</button></div><div class="track" role="img" aria-label="'+esc(label+" con "+fmt(x.p)+" problemas y "+fmt(x.o)+" oportunidades")+'"><i style="width:'+wP+'%;background:#b94f50"></i><i style="width:'+wO+'%;background:#218d81"></i></div><strong>'+fmt(x.n)+'</strong></div>';
}).join("")||'<div class="empty">No hay registros para este filtro.</div>';
$(id).querySelectorAll("button[data-key]").forEach(btn=>btn.onclick=()=>choose({[btn.dataset.key]:btn.dataset.value}));
}
function renderHeat(rows){
const subNames=topics.filter(t=>state.role==="both"||t.role===state.role).filter(t=>!state.sub||state.sub===t.subtema);
const uvNames=data.uvs.filter(u=>state.scope==="all"||kit.has(u.uv)).filter(u=>!state.uv||state.uv===u.uv).sort((a,b)=>sort(a.uv,b.uv)).map(u=>u.uv);
const value=(uv,sub)=>sum(rows.filter(r=>r.uv===uv&&r.sub===sub).map(focused));
const max=Math.max(1,...uvNames.flatMap(u=>subNames.map(s=>value(u,s.subtema))));
let html='<table><thead><tr><th>UV</th>'+subNames.map(t=>'<th title="'+esc(t.subtema)+'">'+esc(t.subtema)+'</th>').join("")+'<th>Total</th></tr></thead><tbody>';
for(const uv of uvNames){let total=0;html+='<tr><th>UV '+esc(uv)+'</th>';for(const t of subNames){const n=value(uv,t.subtema);total+=n;const alpha=n>0?Math.min(.86,.12+.74*Math.sqrt(n/max)):.045;const v=n>0&&n<3?"&lt;3":fmt(n);
html+='<td><button type="button" data-uv="'+esc(uv)+'" data-sub="'+esc(t.subtema)+'" aria-label="'+esc("UV "+uv+", "+t.subtema+", registros "+(n<3&&n>0?"menos de 3":fmt(n)))+'" style="background:rgba(32,111,140,'+alpha.toFixed(3)+');color:'+(alpha>.53?"#fff":"#173d52")+'" aria-pressed="'+(state.uv===uv&&state.sub===t.subtema)+'">'+v+'</button></td>'}
html+='<td><strong>'+fmt(total)+'</strong></td></tr>'}html+='</tbody><tfoot><tr><th>Total</th>'+subNames.map(t=>'<th>'+fmt(sum(uvNames.map(u=>value(u,t.subtema))))+'</th>').join("")+'<th>'+fmt(sum(rows.map(focused)))+'</th></tr></tfoot></table>';
$("heat").innerHTML=html;$("heat").querySelectorAll("button[data-uv]").forEach(btn=>btn.onclick=()=>choose({uv:btn.dataset.uv,sub:btn.dataset.sub}));
}
function renderCards(rows){
const groups=new Map();for(const r of rows){const c=groups.get(r.sub)||{...r,p:0,o:0,a:0,l:0,uvs:new Set()};c.p+=r.p;c.o+=r.o;c.a+=r.a;c.l+=r.l;c.uvs.add(r.uv);groups.set(r.sub,c)}
const ranked=[...groups.values()].sort((a,b)=>sum([focused(b)])-sum([focused(a)])||sort(a.sub,b.sub));
$("cards").innerHTML=ranked.map(r=>{
const role=r.role==="lead"?"Dirección de referencia":"Apoyo habitual";
const local=state.uv?" · UV "+esc(state.uv):" · "+fmt(r.uvs.size)+" UV";
const number=n=>state.uv&&n>0&&n<3?"&lt;3":fmt(n);
const showP=state.focus==="opportunities"?0:r.p,showO=state.focus==="problems"?0:r.o;
return'<article class="work"><h3>'+esc(r.sub)+'</h3><span class="pill '+(r.role==="support"?"support":"")+'">'+role+'</span><p><strong>Dirección líder en la taxonomía:</strong> '+esc(r.leader)+local+'</p><div class="twonums"><div><b>'+number(showP)+'</b><span>Problemas en el enfoque</span></div><div><b>'+number(showO)+'</b><span>Oportunidades en el enfoque</span></div></div><p><strong>Respuesta orientativa:</strong> '+esc(r.instrument)+' · '+esc(r.method)+'</p><p><strong>Apoyos de referencia:</strong> '+esc(r.helpers||"Por confirmar")+'</p><p class="small muted">Para formular medidas se requiere cotejo documental, análisis de competencias y validación técnica.</p><div class="links"><a href="'+crossLink(state.uv,r)+'">Cruzar por UV</a><a href="'+(state.uv?recordLink(state.uv,r,"Problema"):crossLink("",r,"Problema"))+'">Problemas</a><a href="'+(state.uv?recordLink(state.uv,r,"Oportunidad"):crossLink("",r,"Oportunidad"))+'">Oportunidades</a></div></article>';
}).join("")||'<div class="empty">Sin subtemas en el filtro elegido.</div>';
}
function renderTable(rows){
const arr=rows.slice().sort((a,b)=>focused(b)-focused(a)||sort(a.uv,b.uv)||sort(a.sub,b.sub));
const show=arr.slice(0,limit),masked=n=>n>0&&n<3?"&lt;3":fmt(n);
$("table").innerHTML=show.map(r=>'<tr><td>UV '+esc(r.uv)+'</td><td>'+esc(r.sub)+'</td><td>'+esc(r.role==="lead"?"Referencia":"Apoyo")+'</td><td>'+masked(state.focus==="opportunities"?0:r.p)+'</td><td>'+masked(state.focus==="problems"?0:r.o)+'</td><td><a href="'+recordLink(r.uv,r)+'">Ver registros</a></td></tr>').join("")||'<tr><td colspan="6">Sin cruces UV-subtema.</td></tr>';
$("tableInfo").textContent=fmt(show.length)+" de "+fmt(arr.length)+" intersecciones UV–subtema.";
$("more").hidden=limit>=arr.length;
}
function renderPilot(){
const uv15=listRows({scope:"kit",role:"lead",uv:"15",sub:""}).filter(r=>r.p+r.o>0),v=totals(uv15);
$("pilotSummary").textContent="Piloto UV15, DIMAO como dirección de referencia: "+fmt(v.p)+" problemas y "+fmt(v.o)+" oportunidades en "+fmt(v.subtopics)+" subtemas. Se pueden consultar los ID en DATOS; el vínculo individual con los post-it y la cartografía original requiere cotejo humano.";
const pA=topics.find(t=>t.subtema==="Aseo, residuos y salubridad"),pB=topics.find(t=>t.subtema==="Áreas verdes y arbolado");
for(const [id,s] of [["pilotEvidenceA",pA],["pilotEvidenceB",pB]])$(id).href=s?recordLink("15",s):"trazabilidad.html";
}

function checkQuality(q){
if(!q||!q.alcances)return false;
for(const scope of ["kit","all"]){const set=q.alcances[scope];if(!set||!set.both||!set.lead||!set.support)return false;
for(const role of ["both","lead","support"]){const v=set[role];if(!v||v.total!==v.CONSISTENTE+v.REQUIERE_RELECTURA+v.SIN_AUDITAR)return false}
for(const k of ["total","CONSISTENTE","REQUIERE_RELECTURA","SIN_AUDITAR"])if(set.both[k]!==set.lead[k]+set.support[k])return false}
return q.piloto_UV15_referencia?.total===10;
}
function renderQuality(){
const box=$("qualityMetrics"),track=$("qualityStack");
if(!quality){$("qualityScope").textContent="Los agregados de auditoría no están disponibles en esta consulta; el resto de las cifras sigue operativo.";box.innerHTML="";track.replaceChildren();return}
const q=quality.alcances[state.scope][state.role],more=!!state.uv||!!state.sub||state.focus!=="all"||state.pattern!=="all";
const role=state.role==="lead"?"DIMAO como dirección de referencia":state.role==="support"?"DIMAO como apoyo":"DIMAO como referencia o apoyo";
const cut=state.scope==="kit"?"15 UV de Entrega 01":"25 etiquetas UV de la matriz";
$("qualityScope").textContent="Revisión del conjunto "+cut+" · "+role+" · problemas y oportunidades (n="+fmt(q.total)+"). "+(more?"Atención: este agregado NO está filtrado por UV, subtema, foco o perfil; el detalle debe comprobarse por sus IDs.":"Los valores corresponden al mismo corte y rol de los indicadores principales, sin otros filtros.");
const vals=[["Total para auditar",q.total],["CONSISTENTE en DATOS",q.CONSISTENTE],["REQUIERE RELECTURA",q.REQUIERE_RELECTURA],["SIN AUDITAR",q.SIN_AUDITAR]];
box.innerHTML=vals.map(([k,v])=>'<div><b>'+fmt(v)+'</b><span>'+esc(k)+'</span></div>').join("");
track.innerHTML=[
["consistent",q.CONSISTENTE],["reread",q.REQUIERE_RELECTURA],["pending",q.SIN_AUDITAR]
].map(([cl,n])=>'<i class="'+cl+'" style="width:'+(100*n/Math.max(1,q.total)).toFixed(4)+'%"></i>').join("");
track.setAttribute("aria-label","Auditoría "+fmt(q.total)+" registros; consistentes "+fmt(q.CONSISTENTE)+", relectura "+fmt(q.REQUIERE_RELECTURA)+", sin auditar "+fmt(q.SIN_AUDITAR));
}
function renderPatterns(){
const rr=listRows().filter(r=>focused(r)>0),counts={both:0,problemOnly:0,opportunityOnly:0};
for(const r of rr){const p=patternOf(r);if(counts[p]!==undefined)counts[p]++}
const defs=[["both","Ambos tipos","Problemas y propuestas registrados"],["problemOnly","Solo problemas","Sin oportunidad registrada en el cruce"],["opportunityOnly","Solo oportunidades","Sin problema registrado en el cruce"]];
$("patternCards").innerHTML=defs.map(([key,label,explain])=>
'<button type="button" class="patternBtn'+(state.pattern===key?' active':'')+'" data-pattern="'+key+'" aria-pressed="'+(state.pattern===key)+'"><b>'+fmt(counts[key])+'</b><span>'+label+'</span><small>'+explain+'</small></button>').join("");
$("patternCards").querySelectorAll("button[data-pattern]").forEach(btn=>btn.onclick=()=>choose({pattern:state.pattern===btn.dataset.pattern?"all":btn.dataset.pattern}));
}
function renderScatter(rows){
const map=new Map();for(const r of rows){const v=map.get(r.uv)||{uv:r.uv,p:0,o:0};v.p+=r.p;v.o+=r.o;map.set(r.uv,v)}
const list=[...map.values()].sort((a,b)=>sort(a.uv,b.uv));
const svg=$("scatter"),W=1040,H=430,left=92,right=930,top=45,bottom=350,ww=right-left,hh=bottom-top;
if(!list.length){svg.innerHTML='<text x="80" y="55" fill="#54748a">No hay registros para este filtro.</text>';$("scatterNote").textContent="Prueba otra combinación de filtros.";return}
const maxP=Math.max(1,...list.map(x=>x.p)),maxO=Math.max(1,...list.map(x=>x.o));
const x=v=>left+ww*v/maxP,y=v=>bottom-hh*v/maxO;
let fragments='',grid='';
for(let i=0;i<=4;i++){const xVal=maxP*i/4,yVal=maxO*i/4;
grid+='<line class="gridline" x1="'+x(xVal).toFixed(1)+'" y1="'+top+'" x2="'+x(xVal).toFixed(1)+'" y2="'+bottom+'"/><line class="gridline" x1="'+left+'" y1="'+y(yVal).toFixed(1)+'" x2="'+right+'" y2="'+y(yVal).toFixed(1)+'"/>';
grid+='<text class="tick" x="'+x(xVal).toFixed(1)+'" y="'+(bottom+20)+'" text-anchor="middle">'+fmt(Math.round(xVal))+'</text><text class="tick" x="'+(left-14)+'" y="'+(y(yVal)+5).toFixed(1)+'" text-anchor="end">'+fmt(Math.round(yVal))+'</text>'}
for(const item of list){const r=Math.min(21,6+Math.sqrt(item.p+item.o)*2.1),color="#1f8393";
const label="UV "+item.uv+" · "+(item.p>0&&item.p<3?"menos de 3":fmt(item.p))+" problemas · "+(item.o>0&&item.o<3?"menos de 3":fmt(item.o))+" oportunidades";
fragments+='<circle tabindex="0" role="button" aria-label="'+esc("Seleccionar "+label)+'" data-uv="'+esc(item.uv)+'" cx="'+x(item.p).toFixed(2)+'" cy="'+y(item.o).toFixed(2)+'" r="'+r.toFixed(2)+'" fill="'+color+'" fill-opacity=".76"><title>'+esc(label)+'</title></circle>'}
const axis='<line class="axis" x1="'+left+'" y1="'+bottom+'" x2="'+right+'" y2="'+bottom+'"/><line class="axis" x1="'+left+'" y1="'+top+'" x2="'+left+'" y2="'+bottom+'"/>';
const title='<text class="axis-label" x="'+((left+right)/2)+'" y="407" text-anchor="middle">Problemas reportados</text><text class="axis-label" x="22" y="'+((top+bottom)/2)+'" text-anchor="middle" transform="rotate(-90 22 '+((top+bottom)/2)+')">Oportunidades propuestas</text>';
svg.innerHTML=grid+axis+fragments+title;
svg.querySelectorAll("circle[data-uv]").forEach(node=>{
const select=()=>choose({uv:node.dataset.uv});
node.addEventListener("click",select);node.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();select()}});
});
$("scatterNote").textContent=fmt(list.length)+" UV representadas · el círculo varía de tamaño según la suma de ambos tipos. El enfoque elegido define los grupos que entran al gráfico; se muestran los dos conteos de cada grupo incluido.";
}

function render(){if(!data||!tax)return;const rows=selectedRows();renderKPIs(rows);renderQuality();renderPatterns();barRender("roleBars",barGroups(rows,"role"),"role");barRender("subBars",barGroups(rows,"sub"),"sub");barRender("uvBars",barGroups(rows,"uv"),"uv");renderScatter(rows);renderHeat(rows);renderCards(rows);renderTable(rows);renderPilot()}
function pilot(){choose({scope:"kit",role:"lead",focus:"all",uv:"15",sub:"",pattern:"all"});$("heat").scrollIntoView({behavior:"smooth",block:"nearest"})}
const csvCols=["uv","tema_principal","subtema","rol_DIMAO_referencial","perfil_registrado_UV_subtema","competencias_validadas_preliminarmente","direccion_lider_CAT_SUBTEMAS","apoyo_habitual_CAT_SUBTEMAS","instrumento_referencial","modalidad_referencial","n_problemas","n_oportunidades","n_actores","n_lugares","estado_cartera","id_punto_a_cotejar","cartografia_original_a_validar","privacidad_a_revisar","competencia_a_validar","unidad_responsable_por_confirmar","accion_propuesta","responsable_por_designar","fecha_inicio_por_definir","tipo_plazo_por_definir","fecha_termino_por_definir","recursos_a_evaluar","prioridad_a_fundamentar","autorizacion_requerida","evidencia_seguimiento"];
function csvSafe(val){let x=String(val??"");if(/^\s*[=+\-@]/.test(x))x="'"+x;return'"'+x.replace(/"/g,'""')+'"'}
function exportCSV(){
const arr=selectedRows();const lines=[csvCols.map(csvSafe).join(",")];
for(const r of arr){const mask=n=>n>0&&n<3?"SUPRIMIDO_MENOR_A_3":n;
const vals=[r.uv,r.theme,r.sub,r.role==="lead"?"DIRECCION_REFERENCIAL":"APOYO_REFERENCIAL",patternOf(r),"CONFIRMACION_PRELIMINAR_USUARIO_PENDIENTE_VALIDACION_FORMAL",r.leader,r.helpers,r.instrument,r.method,mask(r.p),mask(r.o),mask(r.a),mask(r.l),"INSUMO_ANALITICO_NO_ASIGNADO","","","","","","","","","","","","","",""];
if(vals.length!==csvCols.length)throw Error("CSV: "+vals.length+" datos para "+csvCols.length+" columnas");lines.push(vals.map(csvSafe).join(","))}
const blob=new Blob(["\uFEFF"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");
link.href=url;link.download="congreso_barrial_cartera_DIMAO_"+state.scope+".csv";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
for(const id of ["scope","role","focus","uv","sub","pattern"])$(id).addEventListener("change",()=>choose({[id]:$(id).value}));
$("reset").onclick=()=>choose({scope:"kit",role:"both",focus:"all",uv:"",sub:"",pattern:"all"});
$("pilotButton").onclick=pilot;$("pilotAgain").onclick=pilot;
$("more").onclick=()=>{limit+=40;renderTable(selectedRows())};
$("export").onclick=exportCSV;
Promise.all([
fetch("datos-agregados.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Datos "+r.status);return r.json()}),
fetch("taxonomia-subtemas.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Taxonomía "+r.status);return r.json()}),
fetch("dimao-calidad-agregada.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Calidad "+r.status);return r.json()}).catch(()=>null)
]).then(([d,t,qdata])=>{validate(d,t);quality=checkQuality(qdata)?qdata:null;const q=new URLSearchParams(location.search);state.scope=q.get("corte")==="todo"?"all":"kit";
state.role=["both","lead","support"].includes(q.get("rol"))?q.get("rol"):"both";
state.focus=["all","problems","opportunities"].includes(q.get("foco"))?q.get("foco"):"all";
state.uv=q.get("uv")||"";state.sub=q.get("subtema")||"";
state.pattern=["all","both","problemOnly","opportunityOnly"].includes(q.get("patron"))?q.get("patron"):"all";
sync();query();render()}).catch(e=>{$("status").textContent="No se pudo construir el panel: "+e.message});
