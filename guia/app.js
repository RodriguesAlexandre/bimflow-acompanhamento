'use strict';
const id=x=>document.getElementById(x);
const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
function render(data){id('data-atualizacao').textContent='Atualizado em '+data.atualizadoEm;id('total-tipos').textContent=data.disciplinas.reduce((n,d)=>n+d.tipos,0);id('total-itens').textContent=data.disciplinas.reduce((n,d)=>n+d.itensPainel,0)+' itens';id('versao-preparada').textContent='v'+data.versaoPreparada;id('release-atual').textContent='v'+data.ultimaRelease;id('release-atual').href='https://github.com/Pavelar-BIM/BIMFlow/releases/tag/v'+data.ultimaRelease;
 id('disciplinas-cards').replaceChildren(...data.disciplinas.map(d=>{const card=node('article','discipline-card');card.append(node('span','eyebrow','BIBLIOTECA · '+d.nome.toUpperCase()),node('h3','',d.nome),node('p','',d.descricao));const numbers=node('div','discipline-numbers'),detail=node('span');detail.append(node('b','',`${d.carregaveis} carregáveis + ${d.sistemas} sistemas`),document.createTextNode(`${d.pacotes} pacotes de vistas · ${d.itensPainel} itens no painel`));numbers.append(node('strong','',d.tipos),detail);const bottom=node('div','discipline-bottom');bottom.append(node('span','','tipos catalogados'),node('strong','',d.distribuicao));card.append(numbers,bottom);return card;}));
 const [ele,arq]=data.disciplinas;const rows=[['Tipos carregáveis',ele.carregaveis,arq.carregaveis,'Uma opção por tipo'],['Tipos de sistema',ele.sistemas,arq.sistemas,'Categorias específicas de cada disciplina'],['Tabelas',ele.tabelas,arq.tabelas,'Um pacote de tabelas por disciplina'],['Legendas',ele.legendas,arq.legendas,'Um pacote de legendas por disciplina'],['Modelos de vista',ele.modelosVista||'Próxima exportação',arq.modelosVista,'Um pacote de modelos de vista por disciplina'],['Total no painel',ele.itensPainel,arq.itensPainel,'Tipos + pacotes; as vistas não são cartões individuais']];id('numeros-corpo').replaceChildren(...rows.map(row=>{const tr=node('tr');for(const value of row)tr.append(node('td','',value));return tr;}));
 const labels={concluido:'CONCLUÍDO',validacao:'EM VALIDAÇÃO',pendente:'PENDENTE',andamento:'EM TRABALHO',futuro:'FUTURO'};
 const atuais=data.etapas;
 function stepCard(step,i,total){const future=step.status==='futuro';const card=node('article','flow-step '+(future?'pendente futuro':step.status)+((i+1)%5===0||i===13||i===total-1?' end':''));card.dataset.status=step.status;card.style.gridRow=String(i>=14?4:Math.floor(i/5)+1);card.style.gridColumn=String(i>=14?i-13:i%5+1);const top=node('div','flow-step-top');top.append(node('span','step-number',step.id),node('span','step-status',labels[step.status]));card.append(top,node('h3','',step.titulo),node('p','',step.texto),node('small','',step.evidencia));return card;}
 id('roadmap-steps').replaceChildren(...atuais.map((step,i)=>stepCard(step,i,atuais.length)));
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('.flow-step').forEach(card=>{const show=filter==='todos'||card.dataset.status===filter;card.classList.toggle('highlighted',filter!=='todos'&&show);if(show)count++;});id('filter-note').textContent=filter==='todos'?'Leia da esquerda para a direita, linha por linha. Os filtros destacam as etapas sem apagar o caminho.':`${count} etapa(s) em destaque. Todos os cartões permanecem legíveis; a borda destaca a situação escolhida.`;}));
}
document.querySelectorAll('[data-role]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));document.querySelectorAll('.role-panel').forEach(p=>p.hidden=p.id!=='role-'+button.dataset.role);}));
id('imprimir').addEventListener('click',()=>window.print());const dialog=id('image-modal');document.querySelectorAll('.panel-image,.folder-figure img').forEach(image=>image.addEventListener('click',()=>{dialog.querySelector('img').src=image.src;dialog.querySelector('img').alt=image.alt;dialog.querySelector('p').textContent=image.closest('figure').querySelector('figcaption').textContent;dialog.showModal();}));id('close-image').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
fetch('guia/dados.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Falha ao carregar os dados do guia');return r.json();}).then(render).catch(()=>{id('filter-note').textContent='Não foi possível carregar os estados e números do guia. Atualize a página.';});

const demo=document.querySelector('.video-details');demo.addEventListener('toggle',()=>{const video=demo.querySelector('video'),source=video.querySelector('source');if(demo.open){if(!source.getAttribute('src')){source.src=source.dataset.src;video.load();}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)video.play().catch(()=>{});}else video.pause();});
const roleButtons=[...document.querySelectorAll('[data-role]')];roleButtons.forEach((button,index)=>button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%roleButtons.length;else if(event.key==='ArrowLeft')next=(index+roleButtons.length-1)%roleButtons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=roleButtons.length-1;else return;event.preventDefault();roleButtons[next].click();roleButtons[next].focus();}));
/* ===== Seção 06: resumo do dashboard de instalações (mesma fonte da telemetria) ===== */
(function(){
const box=id('painel-instalacoes');if(!box)return;
const esc=s=>String(s??'').trim();
function parseVersion(v){const t=esc(v).replace(/^v/i,'');if(!/^\d+(\.\d+){1,3}$/.test(t))return null;const p=t.split('.').map(Number);while(p.length<4)p.push(0);return p;}
function cmp(a,b){const x=parseVersion(a),y=parseVersion(b);if(!x||!y)return null;for(let i=0;i<4;i++)if(x[i]!==y[i])return x[i]>y[i]?1:-1;return 0;}
function parseDate(v){const t=esc(v);const m=/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(t);return m?new Date(`${m[3]}-${m[2]}-${m[1]}T${m[4]||'00'}:${m[5]||'00'}:${m[6]||'00'}-03:00`):null;}
function show(rows,cfg,state,label){
 const uniq=new Map();
 for(const r of rows){const d=parseDate(r[0]),maq=esc(r[2]),rev=esc(r[3]),ver=esc(r[4]);if(!d||!maq||!rev||!ver)continue;const k=(maq+'|'+rev).toLowerCase();if(!uniq.has(k)||d>uniq.get(k).d)uniq.set(k,{d,user:esc(r[1])||'Não informado',maq,rev,ver});}
 const all=[...uniq.values()],ref=cfg.referenceVersion;
 const baixo=all.filter(r=>cmp(r.ver,ref)===-1).sort((a,b)=>cmp(a.ver,b.ver));
 id('inst-ref').textContent='v'+ref;id('inst-total').textContent=all.length;id('inst-baixo').textContent=baixo.length;id('inst-ok').textContent=all.filter(r=>{const c=cmp(r.ver,ref);return c!==null&&c>=0;}).length;
 const lista=id('inst-lista');
 lista.replaceChildren(...(baixo.length?baixo.map(r=>{const li=node('li');const who=node('span');who.append(node('strong','',r.user),document.createTextNode(` · ${r.maq} · Revit ${r.rev}`));li.append(who,node('b','','v'+r.ver.replace(/\.0$/,'')));return li;}):[node('li','muted','Todas as instalações estão na versão de referência.')]));
 const st=id('inst-estado');st.className='live-state '+state;st.textContent=label;
}
function query(cfg){return new Promise((resolve,reject)=>{const cb='BIMFlowGuia_'+Date.now(),sc=document.createElement('script');const t=setTimeout(()=>done(new Error('timeout')),12000);function done(e,d){clearTimeout(t);sc.remove();delete window[cb];e?reject(e):resolve(d);}
 window[cb]=r=>{if(r.status!=='ok'||!r.table)return done(new Error('planilha'));done(null,r.table.rows.map(row=>[0,1,2,3,4].map(i=>{const c=row.c[i];return c?(i===0?(c.f||c.v):String(c.v??'')):'';})));};
 sc.onerror=()=>done(new Error('conexao'));const u=new URL(`https://docs.google.com/spreadsheets/d/${cfg.sheetId}/gviz/tq`);u.searchParams.set('sheet',cfg.sheetName);u.searchParams.set('headers','1');u.searchParams.set('tq','select A,B,C,D,E');u.searchParams.set('tqx','out:json;responseHandler:'+cb);sc.src=u.href;document.head.append(sc);});}
fetch('telemetria/config.json',{cache:'no-store'}).then(r=>r.json()).then(cfg=>{
 show(cfg.rows||[],cfg,'cached','Cópia salva');
 query(cfg).then(rows=>show(rows,cfg,'ok','Ao vivo · planilha')).catch(()=>{});
}).catch(()=>{id('inst-estado').textContent='Dados indisponíveis';});
})();
