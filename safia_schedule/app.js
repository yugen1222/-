const days=["29.06 Пн","30.06 Вт","01.07 Ср","02.07 Чт","03.07 Пт","04.07 Сб","05.07 Вс"];
const shifts={"1 смена":"08:00-16:00","2 смена":"16:00-23:00","3 смена":"23:00-08:00","12ч день":"08:00-20:00","12ч ночь":"20:00-08:00","11-23":"11:00-23:00","18-02":"18:00-02:00"};
const shiftHours={"1 смена":8,"2 смена":7,"3 смена":9,"12ч день":12,"12ч ночь":12,"11-23":12,"18-02":8};
const categories=["Общий","Продавцы","Официанты","Бариста","Кассиры","Технички","Морозильщики","Менеджеры"];
let role="admin", managerCategory="Продавцы", currentCategory="Общий";
let selectedDay=days[0];
let employees=[], schedule={}, staffing={}, history=[];

function defaultEmployees(){return[
{id:crypto.randomUUID(),name:"Азиза",category:"Продавцы",skills:["Продавец","Кассир"],universal:true,night:false},
{id:crypto.randomUUID(),name:"Зарина",category:"Продавцы",skills:["Продавец"],universal:false,night:true},
{id:crypto.randomUUID(),name:"Нозима",category:"Продавцы",skills:["Продавец","Бариста"],universal:true,night:false},
{id:crypto.randomUUID(),name:"Акром",category:"Официанты",skills:["Официант"],universal:false,night:true},
{id:crypto.randomUUID(),name:"Фаррух",category:"Официанты",skills:["Официант","Менеджер"],universal:true,night:true},
{id:crypto.randomUUID(),name:"Кристина",category:"Бариста",skills:["Бариста"],universal:false,night:false},
{id:crypto.randomUUID(),name:"Рамзиддин",category:"Кассиры",skills:["Кассир","Продавец"],universal:true,night:true},
{id:crypto.randomUUID(),name:"Сурайёпа",category:"Технички",skills:["Техничка"],universal:false,night:false},
{id:crypto.randomUUID(),name:"Бекзод",category:"Морозильщики",skills:["Морозильщик"],universal:false,night:true},
{id:crypto.randomUUID(),name:"Азиз",category:"Менеджеры",skills:["Менеджер","Кассир"],universal:true,night:true}
]}
function init(){employees=JSON.parse(localStorage.ss_employees||"null")||defaultEmployees();schedule=JSON.parse(localStorage.ss_schedule||"null")||{};staffing=JSON.parse(localStorage.ss_staffing||"null")||{};history=JSON.parse(localStorage.ss_history||"null")||[];for(const d of days){schedule[d]??={};for(const c of categories.filter(x=>x!=="Общий")){schedule[d][c]??={"1 смена":[],"2 смена":[],"3 смена":[],"Выходной":[]};staffing[`${d}|${c}|1 смена`]??=2;staffing[`${d}|${c}|2 смена`]??=2;staffing[`${d}|${c}|3 смена`]??=1;}}autoFill();save()}
function autoFill(){for(const e of employees){let has=false;for(const d of days){for(const c in schedule[d]){for(const s in schedule[d][c])if(schedule[d][c][s].includes(e.id))has=true}}if(!has){days.forEach((d,i)=>{const s=i%3===0?"Выходной":(i%2===0?"1 смена":"2 смена");schedule[d][e.category]?.[s]?.push(e.id)})}}}
function save(){localStorage.ss_employees=JSON.stringify(employees);localStorage.ss_schedule=JSON.stringify(schedule);localStorage.ss_staffing=JSON.stringify(staffing);localStorage.ss_history=JSON.stringify(history)}
function login(){role=document.getElementById('roleSelect').value;managerCategory=document.getElementById('managerCategorySelect').value;currentCategory=role==='admin'?'Общий':managerCategory;document.getElementById('loginScreen').classList.add('hidden');document.getElementById('app').classList.remove('hidden');document.getElementById('roleBadge').innerText=role==='admin'?'Админ':'Менеджер';document.querySelectorAll('.admin-only').forEach(x=>x.style.display=role==='admin'?'block':'none');renderCategorySelect();renderAll()}
function logout(){location.reload()}
function renderCategorySelect(){const sel=document.getElementById('categorySelect');sel.innerHTML='';const list=role==='admin'?categories:["Общий",managerCategory];list.forEach(c=>sel.innerHTML+=`<option ${c===currentCategory?'selected':''}>${c}</option>`)}
function changeCategory(){currentCategory=document.getElementById('categorySelect').value;renderAll()}
function openPage(id,btn){document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));btn.classList.add('active');document.getElementById('pageTitle').innerText=btn.innerText.replace(/[🏠📅📆👥⭐📊📜]/g,'').trim();renderAll()}
function visibleCats(){return currentCategory==='Общий'?categories.filter(c=>c!=="Общий"):[currentCategory]}
function empName(id){return employees.find(e=>e.id===id)?.name||"Удалён"}
function empById(id){return employees.find(e=>e.id===id)}
function removeFromDay(id,day){for(const c in schedule[day])for(const s in schedule[day][c])schedule[day][c][s]=schedule[day][c][s].filter(x=>x!==id)}
function employeeHours(id,day,skip=false){let total=0;for(const c in schedule[day])for(const s in schedule[day][c])if(s!=="Выходной"&&schedule[day][c][s].includes(id))total+=shiftHours[s]||0;return total}
function moveEmp(id,day,cat,shift){if(shift!=="Выходной"){const h=employeeHours(id,day)+(shiftHours[shift]||0);if(h>17){alert(`Нельзя: получится ${h} часов. Максимум 17 часов.`);return}}removeFromDay(id,day);schedule[day][cat][shift].push(id);addHistory(`${empName(id)} → ${day}, ${cat}, ${shift}`);save();renderAll()}
function allowDrop(e){e.preventDefault()}function drag(e,id){e.dataTransfer.setData('id',id)}function drop(e,day,cat,shift){e.preventDefault();moveEmp(e.dataTransfer.getData('id'),day,cat,shift)}
function status(day,cat,shift){const need=staffing[`${day}|${cat}|${shift}`]||0;const actual=schedule[day][cat][shift].length;return {need,actual,diff:actual-need}}
function renderHome(){let html='<div class="cards">';for(const cat of categories.filter(x=>x!=="Общий")){let low=0,high=0,ok=0;for(const d of days)for(const s of ["1 смена","2 смена","3 смена"]){const st=status(d,cat,s);if(st.diff<0)low++;else if(st.diff>0)high++;else ok++}let cls=low?'low':high?'high':'ok';html+=`<div class="card ${cls}"><h3>${cat}</h3><p>✅ Норма: ${ok}</p><p>🔴 Не хватает: ${low}</p><p>🟡 Много: ${high}</p></div>`}html+='</div>';document.getElementById('home').innerHTML=html}
function renderSchedule(){
  const cats=visibleCats();
  let html=`<div class="schedule-shell">
    <div class="schedule-head">
      <div>
        <h3 style="margin:0">${currentCategory==='Общий'?'Общий просмотр':currentCategory}</h3>
        <div class="muted">Перетаскивай карточки между сменами. Сайт проверяет штатку и лимит 17 часов.</div>
      </div>
      <div class="legend">
        <span class="lg-ok">Зелёный — норма</span>
        <span class="lg-low">Красный — не хватает</span>
        <span class="lg-high">Жёлтый — много</span>
        <span class="lg-off">Серый — выходной</span>
      </div>
    </div>
    <div class="day-switch">`;

  for(const d of days){
    let low=0,high=0;
    for(const c of cats) for(const sh of ["1 смена","2 смена","3 смена"]){
      const st=status(d,c,sh); if(st.diff<0) low++; if(st.diff>0) high++;
    }
    const mark=low?' 🔴':high?' 🟡':' 🟢';
    html+=`<button class="day-chip ${d===selectedDay?'active':''}" onclick="selectedDay='${d}';renderAll()">${d}${mark}</button>`;
  }
  html+=`</div>`;

  for(const cat of cats){
    if(currentCategory==='Общий') html+=`<div class="cat-title">${cat}</div>`;
    html+=`<div class="schedule-grid">`;
    for(const sh of ["1 смена","2 смена","3 смена","Выходной"]){
      const st=sh==='Выходной'?null:status(selectedDay,cat,sh);
      const cls=sh==='Выходной'?'off':(st.diff<0?'low':st.diff>0?'high':'ok');
      const countText=st?`${st.actual}/${st.need}`:`${schedule[selectedDay][cat][sh].length}`;
      html+=`<div class="shift-card ${cls}" ondragover="allowDrop(event)" ondrop="drop(event,'${selectedDay}','${cat}','${sh}')">
        <div class="shift-head">
          <div><div class="shift-name">${sh}</div><div class="shift-time">${shifts[sh]||'выходной день'}</div></div>
          <div class="counter">${countText}</div>
        </div>
        <div class="people">`;
      const list=schedule[selectedDay][cat][sh];
      if(!list.length) html+=`<div class="empty-note">Пока пусто</div>`;
      for(const id of list){
        const e=empById(id); const nm=empName(id); const first=nm.trim()[0]||'?';
        html+=`<div class="person ${sh==='Выходной'?'dayoff':''}" draggable="true" ondragstart="drag(event,'${id}')">
          <div class="p-main"><span class="avatar">${first}</span><div><div class="p-name">${nm}</div><span class="p-meta">${e?.category||''}${e?.night?' • ночь':''}</span></div></div>
          ${e?.universal?'<span class="badge">универсал</span>':''}
        </div>`;
      }
      html+=`</div></div>`;
    }
    html+=`</div>`;
    if(currentCategory==='Общий') html+=`<div class="cat-divider"></div>`;
  }
  html+=`</div>`;
  document.getElementById('schedule').innerHTML=html;
}
function renderDayoff(){let emps=employees.filter(e=>role==='admin'||e.category===managerCategory);let html='<div class="toolbar"><div class="panel"><h3>Сотрудники</h3><div class="checks">';emps.forEach(e=>html+=`<label><input type="checkbox" class="offEmp" value="${e.id}"> ${e.name}</label>`);html+='</div></div><div class="panel"><h3>Даты</h3><div class="checks">';days.forEach(d=>html+=`<label><input type="checkbox" class="offDay" value="${d}"> ${d}</label>`);html+='</div><button onclick="massDayoff()">Поставить выходной</button></div></div>';document.getElementById('dayoff').innerHTML=html}
function massDayoff(){const ids=[...document.querySelectorAll('.offEmp:checked')].map(x=>x.value);const ds=[...document.querySelectorAll('.offDay:checked')].map(x=>x.value);if(!ids.length||!ds.length)return alert('Выберите сотрудников и даты');for(const d of ds)for(const id of ids){const cat=empById(id)?.category;if(cat&&schedule[d][cat])moveEmp(id,d,cat,'Выходной')}addHistory(`Массовый выходной: ${ids.length} сотруд., ${ds.length} дат`);save();renderAll()}
function renderEmployees(){let html='<div class="panel"><h3>Добавить сотрудника</h3><div class="toolbar"><input id="newName" placeholder="Имя"><select id="newCat">';categories.filter(c=>c!=="Общий").forEach(c=>html+=`<option>${c}</option>`);html+='</select><button onclick="addEmployee()">Добавить</button></div></div><div class="table-wrap"><table><tr><th>Имя</th><th>Категория</th><th>Универсал</th><th>Ночь</th><th></th></tr>';employees.forEach(e=>html+=`<tr><td>${e.name}</td><td>${e.category}</td><td>${e.universal?'Да':'Нет'}</td><td>${e.night?'Да':'Нет'}</td><td><button class="mini danger-btn" onclick="deleteEmployee('${e.id}')">Удалить</button></td></tr>`);html+='</table></div>';document.getElementById('employees').innerHTML=html}
function addEmployee(){const name=document.getElementById('newName').value.trim();const cat=document.getElementById('newCat').value;if(!name)return;employees.push({id:crypto.randomUUID(),name,category:cat,skills:[cat.slice(0,-1)],universal:false,night:false});save();renderAll()}
function deleteEmployee(id){if(!confirm('Удалить сотрудника?'))return;employees=employees.filter(e=>e.id!==id);for(const d of days)removeFromDay(id,d);addHistory(`Удалён сотрудник: ${empName(id)}`);save();renderAll()}
function renderSkills(){let html='<div class="table-wrap"><table><tr><th>Сотрудник</th><th>Навыки</th><th>Универсал</th><th>Ночь</th></tr>';employees.forEach(e=>html+=`<tr><td>${e.name}</td><td>${["Продавец","Официант","Бариста","Кассир","Техничка","Морозильщик","Менеджер"].map(s=>`<label class="skill-pill"><input type="checkbox" ${e.skills.includes(s)?'checked':''} onchange="toggleSkill('${e.id}','${s}',this.checked)">${s}</label>`).join('')}</td><td><input type="checkbox" ${e.universal?'checked':''} onchange="setProp('${e.id}','universal',this.checked)"></td><td><input type="checkbox" ${e.night?'checked':''} onchange="setProp('${e.id}','night',this.checked)"></td></tr>`);html+='</table></div>';document.getElementById('skills').innerHTML=html}
function toggleSkill(id,skill,on){const e=empById(id);if(on&&!e.skills.includes(skill))e.skills.push(skill);if(!on)e.skills=e.skills.filter(x=>x!==skill);save()}function setProp(id,p,v){empById(id)[p]=v;save();renderAll()}
function renderStaffing(){let html='<div class="table-wrap"><table><tr><th>Дата</th><th>Категория</th><th>Смена</th><th>Нужно</th><th>Стоит</th></tr>';for(const d of days)for(const c of categories.filter(x=>x!=="Общий"))for(const s of ["1 смена","2 смена","3 смена"]){const st=status(d,c,s);html+=`<tr class="${st.diff<0?'low':st.diff>0?'high':'ok'}"><td>${d}</td><td>${c}</td><td>${s}</td><td><input type="number" min="0" value="${st.need}" onchange="staffing['${d}|${c}|${s}']=Number(this.value);save();renderAll()"></td><td>${st.actual}</td></tr>`}html+='</table></div>';document.getElementById('staffing').innerHTML=html}
function addHistory(text){history.unshift({time:new Date().toLocaleString('ru-RU'),user:role==='admin'?'Админ':'Менеджер',text})}
function saveSnapshot(){addHistory('Сохранён график недели');save();renderAll();alert('История сохранена')}
function renderHistory(){let html='<div class="cards">';history.forEach(h=>html+=`<div class="card"><h3>${h.time}</h3><p>${h.text}</p><p class="muted">${h.user}</p></div>`);html+='</div>';document.getElementById('history').innerHTML=html}
function resetAll(){if(confirm('Сбросить все данные?')){localStorage.removeItem('ss_employees');localStorage.removeItem('ss_schedule');localStorage.removeItem('ss_staffing');localStorage.removeItem('ss_history');location.reload()}}
function renderAll(){renderHome();renderSchedule();renderDayoff();if(role==='admin'){renderEmployees();renderSkills();renderStaffing()}renderHistory();renderCategorySelect()}
init();
