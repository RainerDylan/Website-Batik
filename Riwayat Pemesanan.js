// Riwayat Pemesanan
let allOrders = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
let activeFilter = "all";
let searchQ = "";

function fmt(n){return "Rp." + Number(n||0).toLocaleString("id-ID");}
function fmtDate(iso){const d=new Date(iso);return d.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})+" "+d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});}

function render(){
  const list = document.getElementById("ordersList");
  const empty = document.getElementById("emptyState");
  let filtered = allOrders.filter(o=>{
    if(activeFilter!=="all" && o.status!==activeFilter) return false;
    if(searchQ){
      const q=searchQ.toLowerCase();
      if(!o.id.toLowerCase().includes(q) && !o.items.some(i=>i.name.toLowerCase().includes(q))) return false;
    }
    return true;
  });
  if(!filtered.length){ list.innerHTML=""; empty.style.display="block"; return; }
  empty.style.display="none";
  list.innerHTML = filtered.map(o=>`
    <div class="order-card">
      <div class="order-head">
        <div>
          <div class="order-id">${o.id}</div>
          <div class="order-date">${fmtDate(o.date)}</div>
        </div>
        <span class="status-pill status-${o.status}">${o.status}</span>
      </div>
      <div class="order-body">
        ${o.items.map(it=>`
          <div class="order-item">
            <img src="${it.image||''}" onerror="this.style.background='#f5f0dd';this.src='';">
            <div class="info">
              <h4>${it.name}</h4>
              <p>${it.size?'Ukuran: '+it.size+' • ':''}${it.qty} x ${fmt(it.price)}</p>
            </div>
            <div style="font-weight:600;">${fmt(it.price*it.qty)}</div>
          </div>
        `).join("")}
      </div>
      <div class="order-foot">
        <div>Total: <span class="order-total">${fmt(o.total)}</span></div>
        <div class="order-actions">
          ${o.status!=="Selesai"?`<button class="dark-btn" onclick="advance('${o.id}')">Update Status</button>`:""}
          <button class="gold-btn" onclick="reorder('${o.id}')">Beli Lagi</button>
        </div>
      </div>
    </div>
  `).join("");
}

function advance(id){
  const flow=["Diproses","Dikirim","Selesai"];
  allOrders=allOrders.map(o=>{
    if(o.id===id){const idx=flow.indexOf(o.status);o.status=flow[Math.min(idx+1,flow.length-1)];}
    return o;
  });
  localStorage.setItem("purchaseHistory",JSON.stringify(allOrders));
  render();
}
function reorder(id){
  const o=allOrders.find(x=>x.id===id); if(!o) return;
  const cart=JSON.parse(localStorage.getItem("cartItems"))||[];
  o.items.forEach(i=>cart.push({...i}));
  localStorage.setItem("cartItems",JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
  window.location.href="Keranjang.html";
}
document.querySelectorAll(".filter-btn").forEach(b=>{
  b.onclick=()=>{document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.status;render();};
});
document.getElementById("searchOrder").oninput=e=>{searchQ=e.target.value;render();};
render();
