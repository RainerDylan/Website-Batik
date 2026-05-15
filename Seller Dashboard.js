// Seller Dashboard
const DEFAULT_PRODUCTS = [
  {id:"p1",name:"Batik Mega Mendung",price:130000,stock:25,cat:"Batik Tulis",sizes:"S,M,L,XL",image:"produk1.jpg",desc:"Batik khas dengan motif awan elegan."},
  {id:"p2",name:"Batik Sogan Klasik",price:175000,stock:18,cat:"Batik Tulis",sizes:"M,L,XL",image:"produk2.jpg",desc:"Batik klasik berwarna coklat sogan."},
  {id:"p3",name:"Batik Cap Pekalongan",price:95000,stock:40,cat:"Batik Cap",sizes:"S,M,L,XL,XXL",image:"produk3.jpg",desc:"Batik cap motif Pekalongan."}
];
const DEFAULT_STORE = {storeName:"PETIK Official Store",owner:"Admin PETIK",email:"hello@petikbatik.id",phone:"+62 812 3456 7890",address:"Pekalongan, Jawa Tengah",desc:"Toko resmi PETIK menjual batik Pekalongan asli dari pengrajin lokal.",cat:"Batik Tulis",logo:""};

let store = JSON.parse(localStorage.getItem("sellerStore")) || DEFAULT_STORE;
let products = JSON.parse(localStorage.getItem("sellerProducts")) || DEFAULT_PRODUCTS;
let sales = JSON.parse(localStorage.getItem("sellerSales")) || [];
let orders = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

const fmt = n => "Rp." + Number(n||0).toLocaleString("id-ID");
const $ = id => document.getElementById(id);

// Tabs
document.querySelectorAll(".snav").forEach(a=>{
  a.onclick=e=>{e.preventDefault();
    document.querySelectorAll(".snav").forEach(x=>x.classList.remove("active"));
    a.classList.add("active");
    const tab=a.dataset.tab;
    document.querySelectorAll(".tab-pane").forEach(p=>p.classList.toggle("active",p.dataset.pane===tab));
    if(tab==="overview")renderOverview();
    if(tab==="products")renderProducts();
    if(tab==="orders")renderOrders();
    if(tab==="sales")renderSales();
  };
});

// Store form
function loadStoreForm(){
  ["storeName","owner","email","phone","address","desc","cat","logo"].forEach(k=>{const el=$("f_"+k);if(el)el.value=store[k]||"";});
  $("sideStoreName").innerText=store.storeName||"Toko Saya";
}
$("storeForm").onsubmit=e=>{
  e.preventDefault();
  ["storeName","owner","email","phone","address","desc","cat","logo"].forEach(k=>{store[k]=$("f_"+k).value;});
  localStorage.setItem("sellerStore",JSON.stringify(store));
  $("sideStoreName").innerText=store.storeName;
  alert("Detail toko berhasil disimpan!");
};

// Products
function saveProducts(){localStorage.setItem("sellerProducts",JSON.stringify(products));}
function renderProducts(){
  const wrap=$("sellerProducts");
  if(!products.length){wrap.innerHTML='<p style="color:#666;padding:20px;">Belum ada produk. Klik "Tambah Produk" untuk mulai.</p>';return;}
  wrap.innerHTML=products.map(p=>`
    <div class="prod-card">
      <img src="${p.image}" onerror="this.style.background='#f5f0dd';this.src='';">
      <div class="body">
        <h4>${p.name}</h4>
        <div class="price">${fmt(p.price)}</div>
        <div class="meta">${p.cat} • Stok: ${p.stock}</div>
      </div>
      <div class="actions">
        <button onclick="editProduct('${p.id}')">✏️ Edit</button>
        <button class="del" onclick="deleteProduct('${p.id}')">🗑️ Hapus</button>
      </div>
    </div>
  `).join("");
}
function openProductModal(){
  $("modalTitle").innerText="Tambah Produk";
  $("productForm").reset();
  $("p_id").value="";
  $("productModal").classList.add("show");
}
function closeProductModal(){$("productModal").classList.remove("show");}
function editProduct(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  $("modalTitle").innerText="Edit Produk";
  ["id","name","price","stock","cat","sizes","image","desc"].forEach(k=>{const el=$("p_"+k);if(el)el.value=p[k];});
  $("productModal").classList.add("show");
}
function deleteProduct(id){
  if(!confirm("Yakin hapus produk ini?"))return;
  products=products.filter(x=>x.id!==id);saveProducts();renderProducts();renderOverview();
}
$("productForm").onsubmit=e=>{
  e.preventDefault();
  const data={id:$("p_id").value||"p"+Date.now(),name:$("p_name").value,price:+$("p_price").value,stock:+$("p_stock").value,cat:$("p_cat").value,sizes:$("p_sizes").value,image:$("p_image").value,desc:$("p_desc").value};
  const idx=products.findIndex(p=>p.id===data.id);
  if(idx>=0)products[idx]=data;else products.push(data);
  saveProducts();closeProductModal();renderProducts();renderOverview();
};
$("productModal").onclick=e=>{if(e.target.id==="productModal")closeProductModal();};

// Orders (read from purchaseHistory)
function renderOrders(){
  orders=JSON.parse(localStorage.getItem("purchaseHistory"))||[];
  const wrap=$("sellerOrders");
  if(!orders.length){wrap.innerHTML='<p style="color:#666;padding:20px;">Belum ada pesanan masuk.</p>';return;}
  wrap.innerHTML=orders.map(o=>`
    <div class="order-row">
      <div class="left">
        <h4>${o.id} <span class="status-pill status-${o.status}" style="margin-left:8px;">${o.status}</span></h4>
        <p>${new Date(o.date).toLocaleString("id-ID")} • ${o.items.length} item • ${fmt(o.total)}</p>
      </div>
      <div style="display:flex;gap:8px;">
        <select onchange="updOrder('${o.id}',this.value)">
          <option ${o.status==='Diproses'?'selected':''}>Diproses</option>
          <option ${o.status==='Dikirim'?'selected':''}>Dikirim</option>
          <option ${o.status==='Selesai'?'selected':''}>Selesai</option>
        </select>
      </div>
    </div>
  `).join("");
}
function updOrder(id,status){
  orders=orders.map(o=>o.id===id?{...o,status}:o);
  localStorage.setItem("purchaseHistory",JSON.stringify(orders));
  renderOrders();
}

// Overview & Sales
function renderOverview(){
  const totalRev=sales.reduce((t,s)=>t+s.total,0);
  $("statRevenue").innerText=fmt(totalRev);
  $("statOrders").innerText=orders.length;
  $("statProducts").innerText=products.length;
  const now=new Date(),mo=now.getMonth(),yr=now.getFullYear();
  const monthRev=sales.filter(s=>{const d=new Date(s.date);return d.getMonth()===mo&&d.getFullYear()===yr;}).reduce((t,s)=>t+s.total,0);
  $("statMonth").innerText=fmt(monthRev);
  // top products
  const map={};sales.forEach(s=>{map[s.product]=(map[s.product]||0)+s.qty;});
  const top=Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5);
  $("topProducts").innerHTML=top.length?top.map(([n,q])=>`<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed #eee;"><span>${n}</span><b>${q} terjual</b></div>`).join(""):'<p style="color:#666;">Belum ada penjualan.</p>';
}
function renderSales(){
  const totalRev=sales.reduce((t,s)=>t+s.total,0);
  const totalItems=sales.reduce((t,s)=>t+s.qty,0);
  const avg=orders.length?totalRev/orders.length:0;
  $("sRevenue").innerText=fmt(totalRev);
  $("sItems").innerText=totalItems;
  $("sAvg").innerText=fmt(avg);
  // 7 days chart
  const days=[];const today=new Date();
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);days.push(d);}
  const dailyTotals=days.map(d=>{
    return sales.filter(s=>{const sd=new Date(s.date);return sd.toDateString()===d.toDateString();}).reduce((t,s)=>t+s.total,0);
  });
  const max=Math.max(...dailyTotals,1);
  $("chartBars").innerHTML=days.map((d,i)=>{
    const h=Math.max((dailyTotals[i]/max)*180,6);
    return `<div class="bar" style="height:${h}px;" title="${fmt(dailyTotals[i])}"><span>${d.toLocaleDateString("id-ID",{weekday:'short'})}</span></div>`;
  }).join("");
  // table
  $("salesBody").innerHTML=sales.length?sales.slice().reverse().slice(0,20).map(s=>`<tr><td>${new Date(s.date).toLocaleDateString("id-ID")}</td><td>${s.orderId||'-'}</td><td>${s.product}</td><td>${s.qty}</td><td>${fmt(s.total)}</td></tr>`).join(""):'<tr><td colspan="5" style="text-align:center;color:#666;padding:20px;">Belum ada transaksi.</td></tr>';
}

// init
loadStoreForm();
renderOverview();
saveProducts();
