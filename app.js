const categories = ["Общий","Продавцы","Официанты","Бариста","Кассиры","Технички","Морозильщики","Менеджеры"];
const workCategories = categories.filter(c=>c!=="Общий");
const baseShifts = ["1 смена","2 смена","3 смена"];
const shiftTemplates = {
  "1 смена": "08:00-16:00",
  "2 смена": "16:00-23:00",
  "3 смена": "23:00-08:00",
  "08:00-20:00": "08:00-20:00",
  "20:00-08:00": "20:00-08:00",
  "11:00-23:00": "11:00-23:00",
  "18:00-02:00": "18:00-02:00",
  "08:00-17:00": "08:00-17:00",
  "09:00-18:00": "09:00-18:00",
  "17:00-02:00": "17:00-02:00",
  "Выходной": "выходной"
};
const shiftBlocks = {
  "1 смена": "08:00-16:00",
  "2 смена": "16:00-23:00",
  "3 смена": "23:00-08:00"
};

const EMPLOYEE_ROWS = `ABDIYEVA SHAHINABONU SUNNATULLO QIZI\tПродавец\t16:00-23:00
ABDUKARIMOV UMIDJON ILXOM O'G'LI\tПродавец\t23:00-08:00
ABDULLAYEVA SEVINCHOY AHMADJON QIZI\tОфициант\t16:00-23:00
ABDUNABIYEVA GULSANAM ABDUG'ANI QIZI\tОфициант\t16:00-23:00
ABDUSALIMOV FAXRIDDIN IMOMALI O'G'LI\tОфициант\t16:00-23:00
AGZAMOV RAMZIDDIN SHUHRAT O'G'LI\tКассир\t20:00-08:00
AKBAROVA GULCHEXRA MAXMUDJONOVNA\tТехничка\t08:00-16:00
ANORBOYEV ABDULATIF NURIDDIN O'G'LI\tМорозильщик\t20:00-08:00
AXMEDJANOVA BIBIXOJAR OYBEK QIZI\tОфициант\t08:00-16:00
AXMEDOVA NIGORAXON ULUGBEK QIZI\tМенеджер\t23:00-08:00
BEKNAZAROVA MAHLIYO G'ULOMJON QIZI\tПродавец\t08:00-16:00
DADABOYEVA AZIZAXON DILSHOD QIZI\tОфициант\t08:00-16:00
ERGASHEVA DILAFRUZ MURODJON QIZI\tПродавец\t16:00-23:00
ERGASHOVA AZIZA XOLIYOR QIZI\tТехничка\t16:00-23:00
FOZILOVA KOMILA KAMOLITDINOVNA\tТехничка\t20:00-08:00
G'OFUROV ABDULATIF AKMAL O'G'LI\tБариста\t16:00-23:00
GAFUROVA SURAYYO ABDUNABIYEVNA\tТехничка\t16:00-23:00
GAPPAROV MUHAMMADRIZO SHARIF O'G'LI\tМенеджер\t08:00-17:00
IBODULLAYEV YODGOR OZOD O'G'LI\tМенеджер\t17:00-02:00
IKROMOV ZAFARBEK MURODBEK O'G'LI\tОфициант\t18:00-02:00
ISAXOVA VENERA ANSATBAY QIZI\tОфициант\t18:00-02:00
ISMATILLAYEVA MALIKA MARDON QIZI\tБариста\t16:00-23:00
ISMOILOVA KRISTINA TAXIROVNA\tТехничка\t16:00-23:00
JALILOV ABDURAHMON RAVSHAN O'G'LI\tМорозильщик\t08:00-20:00
JANGIROVA IRODAXON BAHODIR QIZI\tОфициант\t08:00-16:00
JO'RAYEVA HUSNORA BOZAROVNA\tТехничка\t08:00-20:00
KADIROVA MAPURA TAXIROVNA\tПродавец\t08:00-16:00
KARIMJONOV AVAZBEK MURODJON O'G'LI\tБариста\t23:00-08:00
KRIVOROTOVA SVETLANA VITALEVNA\tМенеджер\t09:00-18:00
KUSHSHAYEV ISLOMBEK KAXRAMON O'G'LI\tОфициант\t08:00-16:00
MANSUROV DAVRONBEK AZIZBEKOVICH\tОфициант\t16:00-23:00
MAXMUDOVA E'ZOZAXON ABDUSAMAD QIZI\tПродавец\t16:00-23:00
MUXAMEDOVA SHAXNOZA KAMILOVNA\tТехничка\t08:00-16:00
NASRULLOVA MALIKA BAXTIYOROVNA\tПродавец\t16:00-23:00
NISHONBOYEVA NOZIMA JAMSHID QIZI\tБариста\t08:00-16:00
NIZAMATDINOV BEKZOD KOSIM -TALGAT O'G'LI\tБариста\t16:00-23:00
OLIMBOYEV AFZALBEK ALISHER O'G'LI\tОфициант\t18:00-02:00
ORIPOVA SARVINOZ DILMUROD QIZI\tКассир\t08:00-20:00
PARDABOYEVA RUSHANA MIRZOXIDOVNA\tОфициант\t08:00-16:00
PATXITDINOV RASULJON TO'YCHI O'G'LI\tОфициант\t16:00-23:00
RAHMATOVA E'ZOZA AKBAR QIZI\tМенеджер\t16:00-23:00
RAIMBOYEV G'IYOSJON ERKINBOY O'G'LI\tОфициант\t16:00-23:00
RASULOVA RUXSHONA RUSTAM QIZI\tОфициант\t16:00-23:00
RAXMONBERDIYEVA ZUHRA RAXIMBERDI QIZI\tТехничка\t08:00-20:00
SAIDALIYEV SAIDMUXAMMAD SAIDIVALI O'G'LI\tОфициант\t23:00-08:00
SAIDAZIMOV FAZLIDDIN FAXRIDDINOVICH\tОфициант\t16:00-23:00
SALYAMOVA ZAVXARON FURQAT QIZI\tПродавец\t16:00-23:00
SAYDULLAYEV AZIZBEK DILSHODJON O'G'LI\tОфициант\t16:00-23:00
SHAMSHIDDINOVA MUXLISA DILSHOD QIZI\tПродавец\t16:00-23:00
TOG'AYBEKOVA NIGORA QUANISH QIZI\tБариста\t08:00-16:00
TOIROV HASANBOY OTABEK O'G'LI\tОфициант\t23:00-08:00
TOJIBOYEVA MARJONA ILXOMBOY QIZI\tОфициант\t08:00-16:00
TURSUNALIYEV OZODBEK ALISHER O'G'LI\tМорозильщик\t20:00-08:00
UMARALIYEV SHAHZOD SHERZOD O'GLI\tОфициант\t08:00-16:00
UMIROVA GULASAL ABDIXALIL QIZI\tОфициант\t08:00-16:00
USMANOVA GULNOZA AZIZ QIZI\tМенеджер\t08:00-16:00
USMONOV FARRUX USMON O'G'LI\tОфициант\t08:00-16:00
USMONQULOVA GULCHEHRA KARIMOVNA\tПродавец\t08:00-16:00
VOHIDOVA NASIBA ALIYEVNA\tТехничка\t08:00-16:00
XASHIMOVA SEVARA TAXIROVNA\tПродавец\t08:00-16:00
ZARIPOVA MAFTUNA ZAFAR QIZI\tПродавец\t16:00-23:00
ZOKIRJONOVA ZARINA G'AYRAT QIZI\tБариста\t08:00-16:00
ZOKIROV ABDULVORIS ABDUQAHHOR O'G'LI\tКассир\t08:00-16:00`;

let role="admin", managerCategory="Продавцы", currentCategory="Общий", selectedDay="";
let employees=[], weeks=[], currentWeek=0, history=[];

function uid(){return 'id_'+Math.random().toString(36).slice(2)+Date.now().toString(36)}
function positionToCategory(pos){return ({"Продавец":"Продавцы","Официант":"Официанты","Бариста":"Бариста","Кассир":"Кассиры","Техничка":"Технички","Морозильщик":"Морозильщики","Менеджер":"Менеджеры"})[pos]||pos}
function timeToTemplate(t){for(const [k,v] of Object.entries(shiftTemplates)) if(v===t) return k; return t}
function defaultEmployees(){return EMPLOYEE_ROWS.trim().split('\n').map(row=>{const [name,pos,time]=row.split('\t'); const cat=positionToCategory(pos); const skill=pos; return {id:uid(), name, position:pos, category:cat, defaultShift:timeToTemplate(time), skills:[skill], universal:false, night:time.includes('23')||time.includes('20:00-08')||time.includes('02')};});}
function addDays(date, n){const d=new Date(date); d.setDate(d.getDate()+n); return d}
function fmtDay(d){const ru=['Вс','Пн','Вт','Ср','Чт','Пт','Сб']; return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')} ${ru[d.getDay()]}`}
function createWeek(startDate, copyFrom=null){const days=Array.from({length:7},(_,i)=>fmtDay(addDays(startDate,i))); const assignments={}; const staffing={}; for(const day of days){assignments[day]={}; for(const e of employees){assignments[day][e.id]=copyFrom?.assignments?.[copyFrom.days[i]]?.[e.id] || e.defaultShift || 'Выходной'} for(const c of workCategories) for(const s of baseShifts) staffing[`${day}|${c}|${s}`]=copyFrom?.staffing?.[`${copyFrom.days[i]}|${c}|${s}`] ?? defaultNeed(c,s);} return {id:uid(), startISO:startDate.toISOString().slice(0,10), days, assignments, staffing, savedAt:new Date().toLocaleString('ru-RU')};}
function defaultNeed(cat, shift){const m={"Продавцы": shift==='3 смена'?1:3,"Официанты": shift==='3 смена'?2:5,"Бариста":1,"Кассиры":1,"Технички":1,"Морозильщики":1,"Менеджеры":1}; return m[cat]||1}
function week(){return weeks[currentWeek]}
function empById(id){return employees.find(e=>e.id===id)}
function empName(id){return empById(id)?.name || 'Удалён'}
function safe(v){return String(v??'').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}
function save(){localStorage.setItem('ss_v3_employees',JSON.stringify(employees));localStorage.setItem('ss_v3_weeks',JSON.stringify(weeks));localStorage.setItem('ss_v3_currentWeek',String(currentWeek));localStorage.setItem('ss_v3_history',JSON.stringify(history));}
function load(){employees=JSON.parse(localStorage.getItem('ss_v3_employees')||'null')||defaultEmployees(); weeks=JSON.parse(localStorage.getItem('ss_v3_weeks')||'null')||[createWeek(new Date('2026-06-29'))]; currentWeek=Number(localStorage.getItem('ss_v3_currentWeek')||0); history=JSON.parse(localStorage.getItem('ss_v3_history')||'[]'); selectedDay=week().days[0];}

function toMin(t){let [h,m]=t.split(':').map(Number); return h*60+m}
function interval(time){if(time==='выходной'||!time) return null; let [a,b]=time.split('-'); let s=toMin(a), e=toMin(b); if(e<=s) e+=1440; return [s,e]}
function overlapMinutes(timeA,timeB){const a=interval(timeA), b=interval(timeB); if(!a||!b)return 0; const variants=[b,[b[0]+1440,b[1]+1440],[b[0]-1440,b[1]-1440]]; let best=0; for(const v of variants){best=Math.max(best, Math.min(a[1],v[1])-Math.max(a[0],v[0]));} return Math.max(0,best)}
function shiftHours(key){const it=interval(shiftTemplates[key]||key); return it?(it[1]-it[0])/60:0}
function covers(empShift, baseShift){return overlapMinutes(shiftTemplates[empShift]||empShift, shiftBlocks[baseShift])>0}
function coverageLabel(empShift, baseShift){const min=overlapMinutes(shiftTemplates[empShift]||empShift, shiftBlocks[baseShift]); const full=overlapMinutes(shiftBlocks[baseShift], shiftBlocks[baseShift]); if(!min)return ''; if(min>=full)return 'полностью'; return `${Math.round(min/60*10)/10} ч`;}
function assigned(day,id){return week().assignments[day]?.[id] || 'Выходной'}
function employeesIn(day,cat,baseShift){return employees.filter(e=>(cat==='Общий'||e.category===cat) && assigned(day,e.id)!=='Выходной' && covers(assigned(day,e.id),baseShift));}
function dayoffEmployees(day,cat){return employees.filter(e=>(cat==='Общий'||e.category===cat) && assigned(day,e.id)==='Выходной');}
function status(day,cat,shift){const need=Number(week().staffing[`${day}|${cat}|${shift}`]??0); const actual=employeesIn(day,cat,shift).length; return {need,actual,diff:actual-need};}
function employeeDayHours(day,id,ignore=false){const sh=assigned(day,id); return sh==='Выходной'?0:shiftHours(sh)}
function canSetShift(day,id,newShift){if(newShift==='Выходной')return true; const h=shiftHours(newShift); if(h>17){alert(`Нельзя: смена ${newShift} = ${h} часов, максимум 17.`); return false;} return true;}
function setAssignment(day,id,newShift){if(!canSetShift(day,id,newShift))return false; week().assignments[day][id]=newShift; addHistory(`${empName(id)}: ${day} → ${newShift}`); save(); return true;}

function login(){role=document.getElementById('roleSelect').value; managerCategory=document.getElementById('managerCategorySelect').value; currentCategory=role==='admin'?'Общий':managerCategory; document.getElementById('loginScreen').classList.add('hidden'); document.getElementById('app').classList.remove('hidden'); document.getElementById('roleBadge').innerText=role==='admin'?'Админ':'Менеджер'; document.querySelectorAll('.admin-only').forEach(x=>x.style.display=role==='admin'?'block':'none'); renderAll();}
function logout(){location.reload()}
function openPage(id,btn){document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden')); document.getElementById(id).classList.remove('hidden'); document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active')); if(btn)btn.classList.add('active'); document.getElementById('pageTitle').innerText=btn?.innerText.replace(/^[^А-ЯA-Z]+/,'')||'Главная'; renderAll();}
function changeCategory(){currentCategory=document.getElementById('categorySelect').value; renderAll();}
function renderCategorySelect(){const sel=document.getElementById('categorySelect'); const allowed=role==='admin'?categories:['Общий',managerCategory]; sel.innerHTML=allowed.map(c=>`<option ${c===currentCategory?'selected':''}>${c}</option>`).join('');}
function renderWeekLabel(){document.getElementById('weekLabel').innerText=`Неделя: ${week().days[0]} — ${week().days[6]}`;}

function renderHome(){const cats=role==='admin'?workCategories:[managerCategory]; let low=0, high=0, ok=0; let cards=''; for(const c of cats){let cLow=0,cHigh=0,cOk=0; for(const d of week().days) for(const s of baseShifts){const st=status(d,c,s); if(st.diff<0)cLow++; else if(st.diff>0)cHigh++; else cOk++;} low+=cLow; high+=cHigh; ok+=cOk; cards+=`<div class="card ${cLow?'low':cHigh?'high':'ok'}"><h3>${c}</h3><p>${cLow?'🔴 Не хватает: '+cLow:cHigh?'🟡 Много: '+cHigh:'🟢 Всё по норме'}</p><p class="muted">Проверок в норме: ${cOk}</p></div>`;} document.getElementById('home').innerHTML=`<div class="cards"><div class="card"><h3>Неделя</h3><p>${week().days[0]} — ${week().days[6]}</p><button onclick="createNextWeek()">Создать следующую неделю</button></div><div class="card low"><h3>Проблемы</h3><p>Не хватает: ${low}</p><p>Много: ${high}</p></div>${cards}</div>`;}

function renderSchedule(){const cats=currentCategory==='Общий'?(role==='admin'?workCategories:[managerCategory]):[currentCategory]; let html=`<div class="schedule-shell"><div class="schedule-head"><div><h3>Визуальный график</h3><p class="muted">Сотрудники 08:00–20:00 показываются и в 1 смене, и частично во 2 смене. 20:00–08:00 показывается частично во 2 и полностью в 3 смене.</p></div><div class="legend"><span class="lg-ok">Норма</span><span class="lg-low">Не хватает</span><span class="lg-high">Много</span><span class="lg-off">Выходной</span></div></div><div class="day-switch">`;
for(const d of week().days){let l=0,h=0; for(const c of cats) for(const s of baseShifts){const st=status(d,c,s); if(st.diff<0)l++; if(st.diff>0)h++;} html+=`<button class="day-chip ${d===selectedDay?'active':''}" onclick="selectedDay='${d}';renderAll()">${d}${l?' 🔴':h?' 🟡':' 🟢'}</button>`;} html+=`</div>`;
for(const cat of cats){if(currentCategory==='Общий')html+=`<div class="cat-title">${cat}</div>`; html+=`<div class="schedule-grid">`; for(const sh of [...baseShifts,"Выходной"]){let list= sh==='Выходной'?dayoffEmployees(selectedDay,cat):employeesIn(selectedDay,cat,sh); const st=sh==='Выходной'?null:status(selectedDay,cat,sh); const cls=sh==='Выходной'?'off':st.diff<0?'low':st.diff>0?'high':'ok'; const counter=sh==='Выходной'?list.length:`${st.actual}/${st.need}`; html+=`<div class="shift-card ${cls}" ondragover="allowDrop(event)" ondrop="dropEmp(event,'${selectedDay}','${cat}','${sh}')"><div class="shift-head"><div><div class="shift-name">${sh}</div><div class="shift-time">${shiftBlocks[sh]||'выходной'}</div></div><div class="counter">${counter}</div></div><div class="people">`; if(!list.length) html+=`<div class="empty-note">Пока пусто</div>`; for(const e of list){const a=assigned(selectedDay,e.id); const cov=sh==='Выходной'?'':coverageLabel(a,sh); html+=`<div class="person" draggable="true" ondragstart="drag(event,'${e.id}')" onclick="quickEdit(event,'${selectedDay}','${e.id}')"><div class="p-main"><span class="avatar">${safe(e.name[0])}</span><div><div class="p-name">${safe(e.name)}</div><span class="p-meta">${safe(e.position)} • ${safe(shiftTemplates[a]||a)} ${cov&&cov!=='полностью'?'• '+cov:''}</span></div></div>${e.universal?'<span class="badge">универсал</span>':''}</div>`;} html+=`</div></div>`;} html+=`</div>`;} html+=`</div>`; document.getElementById('schedule').innerHTML=html;}
function allowDrop(e){e.preventDefault()} function drag(e,id){e.dataTransfer.setData('id',id)}
function dropEmp(e,day,cat,shift){e.preventDefault(); const id=e.dataTransfer.getData('id'); const emp=empById(id); if(!emp)return; if(role!=='admin' && emp.category!==managerCategory)return alert('Нет доступа к этой категории'); const newShift=shift==='Выходной'?'Выходной':shift; if(setAssignment(day,id,newShift)) renderAll();}
function quickEdit(ev,day,id){ev.stopPropagation(); const e=empById(id); if(role!=='admin' && e.category!==managerCategory)return; const opts=Object.keys(shiftTemplates); const current=assigned(day,id); const answer=prompt(`Выберите смену для ${e.name}\n\n${opts.map((o,i)=>`${i+1}. ${o} (${shiftTemplates[o]})`).join('\n')}`, String(opts.indexOf(current)+1)); const idx=Number(answer)-1; if(opts[idx]){setAssignment(day,id,opts[idx]); renderAll();}}

function renderDayoff(){const cats=role==='admin'?workCategories:[managerCategory]; let html=`<div class="toolbar"><div class="panel"><h3>Фильтр</h3><select id="dayoffCatFilter" onchange="renderDayoff()">${cats.map(c=>`<option ${c===(document.getElementById('dayoffCatFilter')?.value||cats[0])?'selected':''}>${c}</option>`).join('')}</select><input id="dayoffSearch" placeholder="Поиск сотрудника" oninput="renderDayoff()" value="${safe(document.getElementById('dayoffSearch')?.value||'')}"></div>`; const fc=document.getElementById('dayoffCatFilter')?.value||cats[0], q=(document.getElementById('dayoffSearch')?.value||'').toLowerCase(); const emps=employees.filter(e=>e.category===fc && e.name.toLowerCase().includes(q)); html+=`<div class="panel"><h3>Сотрудники</h3><div class="checks">${emps.map(e=>`<label><input type="checkbox" class="offEmp" value="${e.id}"> ${safe(e.name)}</label>`).join('')}</div></div><div class="panel"><h3>Даты</h3><div class="checks">${week().days.map(d=>`<label><input type="checkbox" class="offDay" value="${d}"> ${d}</label>`).join('')}</div><button onclick="massDayoff()">Поставить выходной</button></div></div>`; document.getElementById('dayoff').innerHTML=html;}
function massDayoff(){const ids=[...document.querySelectorAll('.offEmp:checked')].map(x=>x.value), ds=[...document.querySelectorAll('.offDay:checked')].map(x=>x.value); if(!ids.length||!ds.length)return alert('Выберите сотрудников и даты'); for(const d of ds) for(const id of ids) setAssignment(d,id,'Выходной'); renderAll();}

function renderEmployees(){let html=`<div class="panel"><h3>Добавить сотрудника</h3><div class="toolbar"><input id="newName" placeholder="ФИО"><select id="newPos">${['Продавец','Официант','Бариста','Кассир','Техничка','Морозильщик','Менеджер'].map(p=>`<option>${p}</option>`).join('')}</select><select id="newShift">${Object.keys(shiftTemplates).filter(x=>x!=='Выходной').map(s=>`<option>${s}</option>`).join('')}</select><button onclick="addEmployee()">Добавить</button></div></div><div class="table-wrap"><table><tr><th>ФИО</th><th>Должность</th><th>Основная смена</th><th>Универсал</th><th>Ночь</th><th></th></tr>`; for(const e of employees){html+=`<tr><td>${safe(e.name)}</td><td>${e.position}</td><td><select onchange="empById('${e.id}').defaultShift=this.value;save()">${Object.keys(shiftTemplates).filter(x=>x!=='Выходной').map(s=>`<option ${e.defaultShift===s?'selected':''}>${s}</option>`).join('')}</select></td><td>${e.universal?'Да':'Нет'}</td><td>${e.night?'Да':'Нет'}</td><td><button class="mini danger-btn" onclick="deleteEmployee('${e.id}')">Удалить</button></td></tr>`;} html+='</table></div>'; document.getElementById('employees').innerHTML=html;}
function addEmployee(){const name=document.getElementById('newName').value.trim(), pos=document.getElementById('newPos').value, sh=document.getElementById('newShift').value; if(!name)return; const cat=positionToCategory(pos); const e={id:uid(),name,position:pos,category:cat,defaultShift:sh,skills:[pos],universal:false,night:sh.includes('3')||sh.includes('20')||sh.includes('02')}; employees.push(e); for(const w of weeks) for(const d of w.days) w.assignments[d][e.id]=sh; addHistory('Добавлен сотрудник: '+name); save(); renderAll();}
function deleteEmployee(id){const name=empName(id); if(!confirm('Удалить сотрудника?'))return; employees=employees.filter(e=>e.id!==id); for(const w of weeks) for(const d of w.days) delete w.assignments[d][id]; addHistory('Удалён сотрудник: '+name); save(); renderAll();}

function renderSkills(){let html='<div class="table-wrap"><table><tr><th>Сотрудник</th><th>Навыки</th><th>Универсал</th><th>Ночь</th></tr>'; for(const e of employees){html+=`<tr><td>${safe(e.name)}</td><td>${['Продавец','Официант','Бариста','Кассир','Техничка','Морозильщик','Менеджер'].map(s=>`<label class="skill-pill"><input type="checkbox" ${e.skills.includes(s)?'checked':''} onchange="toggleSkill('${e.id}','${s}',this.checked)">${s}</label>`).join('')}</td><td><input type="checkbox" ${e.universal?'checked':''} onchange="empById('${e.id}').universal=this.checked;save();renderAll()"></td><td><input type="checkbox" ${e.night?'checked':''} onchange="empById('${e.id}').night=this.checked;save();renderAll()"></td></tr>`;} html+='</table></div>'; document.getElementById('skills').innerHTML=html;}
function toggleSkill(id,skill,on){const e=empById(id); if(on&&!e.skills.includes(skill))e.skills.push(skill); if(!on)e.skills=e.skills.filter(x=>x!==skill); save();}

function renderStaffing(){const curCat=document.getElementById('staffCatFilter')?.value||'Все'; const curDay=document.getElementById('staffDayFilter')?.value||'Все'; const curShift=document.getElementById('staffShiftFilter')?.value||'Все'; let html=`<div class="panel"><h3>Фильтр штатки</h3><div class="toolbar"><select id="staffDayFilter" onchange="renderStaffing()"><option>Все</option>${week().days.map(d=>`<option ${curDay===d?'selected':''}>${d}</option>`).join('')}</select><select id="staffCatFilter" onchange="renderStaffing()"><option>Все</option>${workCategories.map(c=>`<option ${curCat===c?'selected':''}>${c}</option>`).join('')}</select><select id="staffShiftFilter" onchange="renderStaffing()"><option>Все</option>${baseShifts.map(s=>`<option ${curShift===s?'selected':''}>${s}</option>`).join('')}</select></div></div><div class="table-wrap"><table><tr><th>Дата</th><th>Категория</th><th>Смена</th><th>Нужно</th><th>Стоит</th><th>Статус</th></tr>`; for(const d of week().days) for(const c of workCategories) for(const s of baseShifts){if(curDay!=='Все'&&curDay!==d)continue; if(curCat!=='Все'&&curCat!==c)continue; if(curShift!=='Все'&&curShift!==s)continue; const st=status(d,c,s); html+=`<tr class="${st.diff<0?'low':st.diff>0?'high':'ok'}"><td>${d}</td><td>${c}</td><td>${s}</td><td><input type="number" min="0" value="${st.need}" onchange="week().staffing['${d}|${c}|${s}']=Number(this.value);save();renderAll()"></td><td>${st.actual}</td><td>${st.diff<0?'Не хватает '+Math.abs(st.diff):st.diff>0?'Много '+st.diff:'Норма'}</td></tr>`;} html+='</table></div>'; document.getElementById('staffing').innerHTML=html;}

function addHistory(text){history.unshift({time:new Date().toLocaleString('ru-RU'), user:role==='admin'?'Админ':'Менеджер', text, week:`${week().days[0]} — ${week().days[6]}`});}
function saveSnapshot(){addHistory('Сохранён график недели'); save(); renderAll(); alert('История сохранена');}
function renderHistory(){let html='<div class="cards">'; for(const h of history){html+=`<div class="card"><h3>${safe(h.time)}</h3><p>${safe(h.text)}</p><p class="muted">${safe(h.user)} • ${safe(h.week||'')}</p></div>`;} html+='</div>'; document.getElementById('history').innerHTML=html;}
function createNextWeek(){const last=weeks[weeks.length-1]; const start=addDays(new Date(last.startISO),7); const useCopy=confirm('Создать следующую неделю и скопировать текущий график?'); weeks.push(createWeek(start,useCopy?week():null)); currentWeek=weeks.length-1; selectedDay=week().days[0]; addHistory('Создана следующая неделя'); save(); renderAll();}
function resetAll(){if(confirm('Сбросить все данные?')){['ss_v3_employees','ss_v3_weeks','ss_v3_currentWeek','ss_v3_history'].forEach(k=>localStorage.removeItem(k)); location.reload();}}

function namesFor(day,cat,shift){const list=shift==='Выходной'?dayoffEmployees(day,cat):employeesIn(day,cat,shift); return list.map(e=>`${e.name} (${shift==='Выходной'?'выходной':shiftTemplates[assigned(day,e.id)]})`).join(', ');}
function exportExcel(){const cats=role==='admin'?workCategories:[managerCategory]; let html=`<html><head><meta charset="UTF-8"><style>table{border-collapse:collapse;width:100%;font-family:Arial;font-size:12px}th,td{border:1px solid #777;padding:7px;vertical-align:top}th{background:#92d050}.cat{background:#d9ead3;font-weight:bold}.low{background:#f4cccc}.high{background:#fff2cc}.ok{background:#d9ead3}.off{background:#eee}@page{size:landscape;margin:.5in}</style></head><body><h2>График Сергели — ${week().days[0]}–${week().days[6]}</h2><table><tr><th>Категория / смена</th>${week().days.map(d=>`<th>${d}</th>`).join('')}</tr>`; for(const c of cats){html+=`<tr><td class="cat" colspan="8">${c}</td></tr>`; for(const s of [...baseShifts,'Выходной']){html+=`<tr><td>${s}<br>${shiftBlocks[s]||'выходной'}</td>`; for(const d of week().days){let cls=s==='Выходной'?'off':'ok', foot=''; if(s!=='Выходной'){const st=status(d,c,s); cls=st.diff<0?'low':st.diff>0?'high':'ok'; foot=`<br><small>Стоит ${st.actual}/Нужно ${st.need}</small>`;} html+=`<td class="${cls}">${safe(namesFor(d,c,s)).replace(/, /g,'<br>')||'&nbsp;'}${foot}</td>`;} html+='</tr>';}} html+='</table></body></html>'; const blob=new Blob(['\ufeff',html],{type:'application/vnd.ms-excel;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`grafik_sergeli_${week().startISO}.xls`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); addHistory('Скачан Excel'); save(); renderAll();}

function renderAll(){renderWeekLabel(); renderCategorySelect(); renderHome(); renderSchedule(); renderDayoff(); if(role==='admin'){renderEmployees(); renderSkills(); renderStaffing();} renderHistory();}
load();
