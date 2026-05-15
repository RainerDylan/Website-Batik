// Virtual Try-On (Beta)
const SAMPLES = [
  {name:"Batik Mega Mendung",img:"produk1.jpg"},
  {name:"Batik Sogan",img:"produk2.jpg"},
  {name:"Batik Cap",img:"produk3.jpg"},
  {name:"Batik Kombinasi",img:"produk4.jpg"}
];
// also pull seller products if any
const sellerP = JSON.parse(localStorage.getItem("sellerProducts"))||[];
const list = sellerP.length?sellerP.map(p=>({name:p.name,img:p.image})):SAMPLES;

const wrap=document.getElementById("tryonProducts");
const overlay=document.getElementById("overlay");
const stage=document.querySelector(".cam-stage");
const cam=document.getElementById("cam");

wrap.innerHTML=list.map((p,i)=>`<div class="item ${i===0?'sel':''}" data-img="${p.img}"><img src="${p.img}" onerror="this.src='';this.style.background='#e8dec1';"><p>${p.name}</p></div>`).join("");
wrap.querySelectorAll(".item").forEach(el=>{
  el.onclick=()=>{wrap.querySelectorAll(".item").forEach(x=>x.classList.remove("sel"));el.classList.add("sel");overlay.src=el.dataset.img;applyTransform();};
});
overlay.src=list[0].img;

function applyTransform(){
  const s=document.getElementById("scale").value;
  const x=document.getElementById("posX").value;
  const y=document.getElementById("posY").value;
  const o=document.getElementById("opacity").value;
  overlay.style.width=s+"%";
  overlay.style.transform=`translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`;
  overlay.style.opacity=o/100;
}
["scale","posX","posY","opacity"].forEach(id=>document.getElementById(id).oninput=applyTransform);
applyTransform();

document.getElementById("startCam").onclick=async()=>{
  try{
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:720,height:960},audio:false});
    cam.srcObject=stream;cam.classList.add("live");stage.classList.add("live");overlay.classList.add("show");
  }catch(err){alert("Tidak bisa mengakses kamera: "+err.message+"\n\nPastikan kamu mengizinkan akses kamera di browser.");}
};

document.getElementById("snapshot").onclick=()=>{
  if(!cam.srcObject){alert("Aktifkan kamera dulu!");return;}
  const c=document.getElementById("snapCanvas");
  c.width=cam.videoWidth;c.height=cam.videoHeight;
  const ctx=c.getContext("2d");
  ctx.translate(c.width,0);ctx.scale(-1,1);
  ctx.drawImage(cam,0,0,c.width,c.height);
  ctx.setTransform(1,0,0,1,0,0);
  // overlay
  const ov=new Image();ov.crossOrigin="anonymous";ov.onload=()=>{
    const w=c.width*(parseInt(document.getElementById("scale").value)/100);
    const h=w*(ov.height/ov.width);
    const x=(c.width-w)/2 + (parseInt(document.getElementById("posX").value)/100)*c.width;
    const y=(c.height-h)/2 + (parseInt(document.getElementById("posY").value)/100)*c.height;
    ctx.globalAlpha=parseInt(document.getElementById("opacity").value)/100;
    ctx.drawImage(ov,x,y,w,h);
    ctx.globalAlpha=1;
    const link=document.createElement("a");link.download="petik-tryon.png";link.href=c.toDataURL("image/png");link.click();
  };ov.onerror=()=>{const link=document.createElement("a");link.download="petik-tryon.png";link.href=c.toDataURL("image/png");link.click();};
  ov.src=overlay.src;
};
