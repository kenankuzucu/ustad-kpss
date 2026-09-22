/* =====================================================================
   ÜSTAD KPSS — uygulama motoru
   Çevrimdışı çalışır · veriler yalnızca cihazda saklanır
   ===================================================================== */
(function(){
"use strict";

/* ===================== yardımcılar ===================== */
function $(id){ return document.getElementById(id); }
function hepsi(sel, kok){ return Array.prototype.slice.call((kok || document).querySelectorAll(sel)); }
function yap(tag, sinif, metin){
  var e = document.createElement(tag);
  if(sinif) e.className = sinif;
  if(metin !== undefined && metin !== null) e.textContent = metin;
  return e;
}
function kisalt(s, n){ s = String(s == null ? "" : s); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
function yuzde(a, b){ return b ? Math.round(a * 100 / b) : 0; }
function karistir(dizi, tohum){
  var d = dizi.slice(), r = tohum === undefined ? Math.random : mulberry32(tohum);
  for(var i = d.length - 1; i > 0; i--){
    var j = Math.floor(r() * (i + 1)), t = d[i]; d[i] = d[j]; d[j] = t;
  }
  return d;
}
function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function sureYazi(sn){
  sn = Math.max(0, Math.round(sn));
  var d = Math.floor(sn / 60), s = sn % 60;
  return (d < 10 ? "0" : "") + d + ":" + (s < 10 ? "0" : "") + s;
}
/* sayıları sıfırdan hedefe doğru sayarak gösterir (profesyonel geçiş) */
function sayacAnimasyon(dugum, hedef){
  if(!dugum) return;
  var metin = String(hedef == null ? "" : hedef);
  var eslesme = metin.match(/(-?\d+(?:[.,]\d+)?)/);
  if(!eslesme){ dugum.textContent = metin; return; }
  var sayi = parseFloat(eslesme[1].replace(",", "."));
  if(!isFinite(sayi) || Math.abs(sayi) < 3 || window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    dugum.textContent = metin; return;
  }
  var onEk = metin.slice(0, eslesme.index), sonEk = metin.slice(eslesme.index + eslesme[1].length);
  var bas = performance.now(), sure = 720;
  (function adim(t){
    var g = Math.min(1, (t - bas) / sure), y = 1 - Math.pow(1 - g, 3);
    var anlik = Math.round(sayi * y);
    dugum.textContent = onEk + anlik + sonEk;
    if(g < 1) requestAnimationFrame(adim);
    else dugum.textContent = metin;
  })(bas);
}
function tarihYazi(ms){
  try{ return new Date(ms).toLocaleString("tr-TR", { day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit" }); }
  catch(e){ return "—"; }
}

/* ===================== şablonlar ===================== */
var TEMALAR = [
  { id:"zarif",       ad:"Zarif",        tip:"Açık", renk:["#f6f3ec","#b8860b","#0f766e"] },
  { id:"kagit",       ad:"Kağıt",        tip:"Açık", renk:["#fbf7ee","#8a6508","#26231d"] },
  { id:"zumrut",      ad:"Zümrüt",       tip:"Açık", renk:["#eef7f2","#0f766e","#15803d"] },
  { id:"lavanta",     ad:"Lavanta",      tip:"Açık", renk:["#f4f1fb","#6d28d9","#be185d"] },
  { id:"gul",         ad:"Gül",          tip:"Açık", renk:["#fdf1f4","#be185d","#6d28d9"] },
  { id:"okyanus",     ad:"Okyanus",      tip:"Açık", renk:["#eef5fb","#1d4ed8","#0f766e"] },
  { id:"gece",        ad:"Gece Mavisi",  tip:"Koyu", renk:["#0d1b2a","#e0b252","#2dd4bf"] },
  { id:"bordo-altin", ad:"Bordo & Altın",tip:"Koyu", renk:["#180d12","#d4af37","#e0793b"] },
  { id:"antrasit",    ad:"Antrasit",     tip:"Koyu", renk:["#16181c","#7dd3fc","#a3e635"] },
  { id:"orman",       ad:"Orman",        tip:"Koyu", renk:["#0e1b14","#facc15","#34d399"] },
  { id:"oled-siyah",  ad:"OLED Siyah",   tip:"OLED", renk:["#000000","#22d3ee","#a3e635"] },
  { id:"oled-altin",  ad:"OLED Altın",   tip:"OLED", renk:["#000000","#f0c14b","#f97316"] },
  { id:"oled-neon",   ad:"OLED Neon",    tip:"OLED", renk:["#000000","#c084fc","#22d3ee"] },
  { id:"qled-canli",  ad:"QLED Canlı",   tip:"QLED", renk:["#081226","#ff2d78","#00e5a0"] },
  { id:"qled-tropic", ad:"QLED Tropik",  tip:"QLED", renk:["#041c17","#ffd60a","#00d1ff"] },
  { id:"qled-gunes",  ad:"QLED Güneş",   tip:"QLED", renk:["#1a0a02","#ff8a00","#ffe066"] }
];

/* ===================== durum ===================== */
var DEPO = "ustad_kpss_v1";
var VARSAYILAN = {
  tema:"zarif", yazi:"normal", zamanlayici:true, ses:true, titresim:true, karistir:true,
  sorulan:0, dogru:0, yanlis:0, bos:0, dogruSeri:0, enIyiSeri:0,
  dersStat:{}, yanlislar:[], favoriler:[], cozulenIdler:[],
  sonCalisma:null, sinavSayisi:0, sonSinav:null, toplamSure:0,
  /* --- uyarlamalı öğretim motoru --- */
  hedef:20, gunluk:{ tarih:"", cozulen:0, dogru:0, sure:0 }, seri:0, enUzunSeri:0, sonGunCalisma:"",
  soruKayit:{}, konuHakimiyet:{}, seviyePuan:0, motorToplam:0, sonProgramTarih:""
};
var V = {};
function oku(){
  V = JSON.parse(JSON.stringify(VARSAYILAN));
  try{
    var h = localStorage.getItem(DEPO);
    if(h){
      var d = JSON.parse(h);
      for(var k in V){ if(d[k] !== undefined && d[k] !== null) V[k] = d[k]; }
    }
  }catch(e){}
  if(!V.dersStat) V.dersStat = {};
}
function yaz(){ try{ localStorage.setItem(DEPO, JSON.stringify(V)); }catch(e){} }

/* ===================== içerik ===================== */
var SORULAR = window.SORULAR || [];
var OZETLER = window.OZETLER || { liste:[] };
var dersler = [];
function icerikKur(){
  var harita = {};
  SORULAR.forEach(function(s, i){
    s._i = i;
    if(!harita[s.ders]) harita[s.ders] = { ad:s.ders, sorular:[], konular:{} };
    harita[s.ders].sorular.push(s);
    harita[s.ders].konular[s.konu] = (harita[s.ders].konular[s.konu] || 0) + 1;
  });
  dersler = Object.keys(harita).map(function(k){
    return { ad:k, sorular:harita[k].sorular, konular:harita[k].konular,
             konuListesi:Object.keys(harita[k].konular).sort(function(a,b){ return a.localeCompare(b, "tr"); }) };
  }).sort(function(a, b){
    var g = ["Türkçe","Matematik","Geometri","Tarih","Coğrafya","Vatandaşlık","Anayasa","Güncel Bilgiler"];
    var ai = g.indexOf(a.ad), bi = g.indexOf(b.ad);
    if(ai !== bi) return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    return a.ad.localeCompare(b.ad, "tr");
  });
}
function dersBul(ad){ for(var i = 0; i < dersler.length; i++) if(dersler[i].ad === ad) return dersler[i]; return null; }

/* ===================== ekran yeteneği (OLED / QLED / HDR) ===================== */
function ekranYeteneği(){
  var e = { genislik:screen.width, yukseklik:screen.height, dpr:window.devicePixelRatio || 1,
            cizim:Math.round(window.innerWidth * (window.devicePixelRatio || 1)) + "×" +
                  Math.round(window.innerHeight * (window.devicePixelRatio || 1)),
            renkDerinligi:screen.colorDepth, p3:false, hdr:false, dokunmatik:("ontouchstart" in window) };
  try{ e.p3 = window.matchMedia("(color-gamut: p3)").matches; }catch(err){}
  try{ e.hdr = window.matchMedia("(dynamic-range: high)").matches; }catch(err){}
  if(e.hdr) e.panel = "HDR ekran (OLED/QLED sınıfı)";
  else if(e.p3) e.panel = "Geniş renk gamı (P3)";
  else e.panel = "Standart sRGB panel";
  e.oneri = e.hdr ? "oled-siyah" : (e.p3 ? "qled-canli" : "zarif");
  return e;
}
function ekranYaz(){
  var e = ekranYeteneği(), k = $("ekranBilgi");
  if(!k) return;
  k.textContent = "Ekran: " + e.genislik + "×" + e.yukseklik + "  ·  piksel oranı: " + e.dpr +
    "  ·  çizim alanı: " + e.cizim + "  ·  renk derinliği: " + e.renkDerinligi + " bit" +
    "  ·  panel: " + e.panel + (e.hdr ? "  ·  HDR açık" : (e.p3 ? "  ·  P3 gam" : "")) +
    (e.dokunmatik ? "  ·  dokunmatik" : "");
}

/* ===================== ses ve titreşim ===================== */
var SES_CTX = null;
function sesCal(frekans, sure){
  if(!V.ses) return;
  try{
    SES_CTX = SES_CTX || new (window.AudioContext || window.webkitAudioContext)();
    if(SES_CTX.state === "suspended") SES_CTX.resume();
    var o = SES_CTX.createOscillator(), g = SES_CTX.createGain();
    o.type = "sine"; o.frequency.value = frekans;
    o.connect(g); g.connect(SES_CTX.destination);
    var t = SES_CTX.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (sure || 0.18));
    o.start(t); o.stop(t + (sure || 0.18) + 0.02);
  }catch(e){}
}
function titret(ms){ if(V.titresim && navigator.vibrate){ try{ navigator.vibrate(ms); }catch(e){} } }
function uyari(mesaj, tur){
  var k = $("uyariKutu"); if(!k) return;
  k.textContent = mesaj;
  k.className = "uyariKutu acik" + (tur ? " " + tur : "");
  clearTimeout(k._z);
  k._z = setTimeout(function(){ k.className = "uyariKutu"; }, 2600);
}

/* ===================== konfeti ===================== */
function konfeti(){
  var c = $("konfeti"); if(!c) return;
  var dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = window.innerWidth * dpr; c.height = window.innerHeight * dpr;
  c.classList.remove("gizli");
  var ctx = c.getContext("2d"); ctx.scale(dpr, dpr);
  var renkler = ["#d4af37","#22d3ee","#f43f5e","#34d399","#a855f7","#fbbf24"];
  var parcalar = [];
  for(var i = 0; i < 130; i++){
    parcalar.push({ x:Math.random() * window.innerWidth, y:-20 - Math.random() * window.innerHeight * .5,
      g:1.6 + Math.random() * 2.6, b:Math.random() * 12 - 6, r:4 + Math.random() * 7,
      a:Math.random() * 6.28, va:Math.random() * .2 - .1,
      renk:renkler[Math.floor(Math.random() * renkler.length)] });
  }
  var bas = performance.now(), sure = 2600;
  (function dongu(t){
    var gecen = t - bas;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    parcalar.forEach(function(p){
      p.y += p.g; p.x += p.b; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = p.renk; ctx.globalAlpha = Math.max(0, 1 - gecen / sure);
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5); ctx.restore();
    });
    if(gecen < sure) requestAnimationFrame(dongu);
    else { ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); c.classList.add("gizli"); }
  })(bas);
}

/* ===================== tema / yazı ===================== */
function temaUygula(){
  document.documentElement.setAttribute("data-tema", V.tema);
  document.documentElement.setAttribute("data-yazi", V.yazi);
}
function temaListesiCiz(){
  var k = $("temaListe"); if(!k) return;
  k.innerHTML = "";
  TEMALAR.forEach(function(t){
    var b = yap("button", "temaKart" + (V.tema === t.id ? " secili" : ""));
    b.appendChild(yap("b", null, t.ad));
    var r = yap("div", "temaRenkler");
    t.renk.forEach(function(c){ var i = document.createElement("i"); i.style.background = c; r.appendChild(i); });
    b.appendChild(r);
    b.appendChild(yap("span", "temaEtiket", t.tip));
    b.onclick = function(){ V.tema = t.id; temaUygula(); temaListesiCiz(); yaz(); uyari("Şablon: " + t.ad, "basarili"); };
    k.appendChild(b);
  });
}

/* ===================== gezinme ===================== */
function git(ad){
  hepsi(".ekran").forEach(function(e){ e.classList.remove("acik"); });
  var e = $("ekran" + ad.charAt(0).toUpperCase() + ad.slice(1));
  if(e) e.classList.add("acik");
  hepsi(".altDugme").forEach(function(b){ b.classList.toggle("secili", b.getAttribute("data-git") === ad); });
  window.scrollTo({ top:0, behavior:"smooth" });
  if(ad === "panel") panelCiz();
  if(ad === "istatistik") istatistikCiz();
  if(ad === "soru") soruEkraniCiz();
  if(ad === "ozet") ozetListesiCiz();
  if(ad === "ogren") ogrenCiz();
}

/* ===================== panel ===================== */
function statHesapla(){
  var top = 0, dog = 0, yan = 0;
  Object.keys(V.dersStat).forEach(function(k){
    top += V.dersStat[k].t || 0; dog += V.dersStat[k].d || 0; yan += V.dersStat[k].y || 0;
  });
  return { toplam:top, dogru:dog, yanlis:yan, oran:yuzde(dog, dog + yan) };
}
function kutuCiz(kok, ikon, deger, etiket, renk){
  var k = yap("div", "kutu" + (renk ? " " + renk : ""));
  var ic = yap("div", "kutuIc");
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "ikon"); svg.innerHTML = '<use href="#' + ikon + '"/>';
  ic.appendChild(svg);
  var y = yap("div");
  var buyuk = yap("b", null, String(deger));
  y.appendChild(buyuk);
  y.appendChild(yap("span", null, etiket));
  sayacAnimasyon(buyuk, deger);
  ic.appendChild(y);
  k.appendChild(ic);
  kok.appendChild(k);
  return k;
}
function panelCiz(){
  var s = statHesapla(), k = $("hizliIstatistik");
  if(k){
    k.innerHTML = "";
    kutuCiz(k, "i-kitap", s.toplam, "çözülen soru", "r-mavi");
    kutuCiz(k, "i-dogru", "%" + s.oran, "doğru oranı", "r-yesil");
    kutuCiz(k, "i-yanlis", V.yanlislar.length, "yanlış defteri", "r-kirmizi");
    kutuCiz(k, "i-alev", V.enIyiSeri, "en iyi seri", "r-mor");
    kutuCiz(k, "i-saat", sureYazi(V.toplamSure), "toplam süre", "");
  }
  var d = $("devamKart");
  if(d){
    if(V.sonCalisma && V.sonCalisma.kalan > 0){
      d.classList.remove("gizli");
      $("devamMetin").textContent = V.sonCalisma.ders + " · " + (V.sonCalisma.toplam - V.sonCalisma.kalan) +
        "/" + V.sonCalisma.toplam + " soru (" + tarihYazi(V.sonCalisma.tarih) + ")";
    }else d.classList.add("gizli");
  }
  var ms = $("menuSoruSayi");
  if(ms) ms.textContent = SORULAR.length + " soru · " + dersler.length + " ders · " + OZETLER.liste.length + " konu özeti";
  var kb = $("kaynakListe");
  if(kb && !kb.childElementCount){
    (OZETLER.kaynaklar || []).forEach(function(a){
      var l = yap("a", "kaynakSatir", a.ad);
      l.href = a.adres; l.target = "_blank"; l.rel = "noopener";
      kb.appendChild(l);
    });
  }
  var sb = $("sinavBilgi");
  if(sb) sb.textContent = OZETLER.sinavBilgi || "";
  ekranYaz();
  seviyeCiz();
}

/* ===================== soru çözme ===================== */
var SEC = { ders:null, konular:[], zorluk:"hepsi", adet:20 };
var KOSU = null;

function soruEkraniCiz(){
  var k = $("dersListe"); if(!k) return;
  k.innerHTML = "";
  $("dersOzet").textContent = SORULAR.length + " soru";
  dersler.forEach(function(d, i){
    var b = yap("button", "dersKart" + (SEC.ders === d.ad ? " secili" : ""));
    b.style.animationDelay = (i * .03) + "s";
    var r = yap("span", "dersRenk");
    var renk = ["#1d4ed8","#b91c1c","#15803d","#6d28d9","#be185d","#b45309","#0f766e","#7c3aed","#0369a1","#c2410c"];
    r.style.background = renk[i % renk.length];
    b.appendChild(r);
    var ad = yap("span", "dersAd");
    ad.appendChild(yap("b", null, d.ad));
    ad.appendChild(yap("small", null, d.konuListesi.length + " konu"));
    b.appendChild(ad);
    var st = V.dersStat[d.ad];
    b.appendChild(yap("span", "dersSayi", st && (st.d + st.y) ? ("%" + yuzde(st.d, st.d + st.y)) : (d.sorular.length + " soru")));
    b.onclick = function(){ dersSec(d.ad); };
    k.appendChild(b);
  });
  if(SEC.ders) konuCiz();
}
function dersSec(ad){
  SEC.ders = ad; SEC.konular = [];
  $("konuKart").classList.remove("gizli");
  soruEkraniCiz();
  var d = dersBul(ad);
  uyari(d.ad + " · " + d.sorular.length + " soru", "basarili");
}
function konuCiz(){
  var k = $("konuListe"), d = dersBul(SEC.ders); if(!k || !d) return;
  k.innerHTML = "";
  var hepsiCip = yap("button", "konuCip" + (!SEC.konular.length ? " secili" : ""), "Tüm konular");
  hepsiCip.onclick = function(){ SEC.konular = []; konuCiz(); };
  k.appendChild(hepsiCip);
  d.konuListesi.forEach(function(kn){
    var c = yap("button", "konuCip" + (SEC.konular.indexOf(kn) >= 0 ? " secili" : ""), kn + " (" + d.konular[kn] + ")");
    c.onclick = function(){
      var i = SEC.konular.indexOf(kn);
      if(i >= 0) SEC.konular.splice(i, 1); else SEC.konular.push(kn);
      konuCiz();
    };
    k.appendChild(c);
  });
}
function soruHavuzu(dersAd, konular, zorluk, sadeceIdler){
  var d = dersBul(dersAd); if(!d) return [];
  var h = d.sorular.filter(function(s){
    if(konular && konular.length && konular.indexOf(s.konu) < 0) return false;
    if(zorluk && zorluk !== "hepsi" && s.zorluk !== zorluk) return false;
    return true;
  });
  if(sadeceIdler) h = h.filter(function(s){ return sadeceIdler.indexOf(s._i) >= 0; });
  return h;
}
function calismaBasla(liste, baslik, ayar){
  if(!liste.length){ uyari("Bu seçimde soru yok.", "hatali"); return; }
  KOSU = { liste:liste, i:0, secim:null, dogru:0, yanlis:0, bos:0, baslangic:Date.now(),
           baslik:baslik || "", sure:0, cevaplar:[], tip:"calisma",
           karistir:ayar && ayar.karistir !== undefined ? ayar.karistir : V.karistir,
           zamanlayici:ayar && ayar.zamanlayici !== undefined ? ayar.zamanlayici : V.zamanlayici };
  $("soruSecim").classList.add("gizli");
  $("soruSonuc").classList.add("gizli");
  $("soruKosu").classList.remove("gizli");
  $("kronometre").classList.toggle("gizli", !KOSU.zamanlayici);
  zamanlayiciBasla();
  soruGoster();
}
function zamanlayiciBasla(){
  if(KOSU) KOSU.sure = 0;
  clearInterval(zamanlayiciBasla._z);
  zamanlayiciBasla._z = setInterval(function(){
    if(!KOSU || !KOSU.zamanlayici) return;
    KOSU.sure++;
    var e = $("kronometre");
    if(e) e.textContent = sureYazi(KOSU.sure);
  }, 1000);
}
function soruGoster(){
  var s = KOSU.liste[KOSU.i], kart = $("soruKart");
  KOSU.secim = null;
  if($("aciklama")) $("aciklama").classList.add("gizli");
  $("soruSayac").textContent = (KOSU.i + 1) + " / " + KOSU.liste.length;
  $("soruDers").textContent = KOSU.baslik || (s.ders + " · " + s.konu);
  $("soruKonu").textContent = s.ders + " · " + s.konu;
  var z = $("soruZorluk"); z.textContent = s.zorluk || "orta"; z.className = "zorluk " + (s.zorluk || "orta");
  $("soruMetin").textContent = s.soru;
  $("ileriDolgu").style.width = yuzde(KOSU.i, KOSU.liste.length) + "%";
  $("dFavori").classList.toggle("secili", V.favoriler.indexOf(s._i) >= 0);
  $("dSonraki").disabled = true;
  $("dSonraki").textContent = (KOSU.i === KOSU.liste.length - 1) ? "Sonuçları gör" : "Sonraki soru";
  var k = $("siklar"); k.innerHTML = "";
  var harfler = ["A","B","C","D","E"];
  s.siklar.forEach(function(metin, i){
    var b = yap("button", "sik");
    b.appendChild(yap("span", "harf", harfler[i]));
    b.appendChild(yap("span", null, metin));
    b.onclick = function(ev){
      var d = document.createElement("span");
      d.className = "dokunuldu"; b.appendChild(d);
      setTimeout(function(){ if(d.parentNode) d.parentNode.removeChild(d); }, 560);
      cevapla(i, false);
    };
    k.appendChild(b);
  });
  kart.style.animation = "none";
  void kart.offsetWidth;
  kart.style.animation = "";
}
function cevapla(i, sinavModu){
  if(!KOSU) return;
  if(sinavModu){
    var s = KOSU.liste[KOSU.i];
    KOSU.cevaplar[KOSU.i] = (KOSU.cevaplar[KOSU.i] === i) ? null : i;
    s._secim = KOSU.cevaplar[KOSU.i];
    sinavSoruGoster();
    return;
  }
  if(KOSU.secim !== null) return;                 /* ikinci kez cevaplanamaz */
  KOSU.secim = i;
  var soru = KOSU.liste[KOSU.i], dogru = (i === soru.dogru);
  var butonlar = hepsi(".sik", $("siklar"));
  butonlar.forEach(function(b, j){
    if(j === soru.dogru) b.classList.add("dogru");
    else if(j === i) b.classList.add("yanlis");
  });
  if(dogru){
    KOSU.dogru++;
    V.dogruSeri++; V.enIyiSeri = Math.max(V.enIyiSeri || 0, V.dogruSeri);
    sesCal(880, .16); titret(18);
  }else{
    KOSU.yanlis++;
    V.dogruSeri = 0;
    sesCal(220, .28); titret([22, 60, 22]);
    if(V.yanlislar.indexOf(soru._i) < 0) V.yanlislar.push(soru._i);
  }
  KOSU.cevaplar[KOSU.i] = i;
  dersStatGuncelle(soru.ders, dogru);
  kayitGuncelle(soru, dogru);
  $("aciklamaMetin").textContent = soru.aciklama || "";
  $("aciklamaKaynak").textContent = soru.kaynak ? ("Kaynak: " + soru.kaynak) : "";
  $("aciklama").classList.remove("gizli");
  $("dSonraki").disabled = false;
  yaz();
}
function dersStatGuncelle(ders, dogruMu){
  if(!V.dersStat[ders]) V.dersStat[ders] = { t:0, d:0, y:0 };
  var s = V.dersStat[ders];
  s.t++; if(dogruMu) s.d++; else s.y++;
  V.sorulan = (V.sorulan || 0) + 1; V.toplamSure = (V.toplamSure || 0) + 1;
}
function sonrakiSoru(){
  if(!KOSU) return;
  if(KOSU.secim === null && KOSU.cevaplar[KOSU.i] === null) KOSU.bos++;
  if(KOSU.i >= KOSU.liste.length - 1){ sonucGoster(); return; }
  KOSU.i++;
  soruGoster();
}
function sonucGoster(){
  clearInterval(zamanlayiciBasla._z);
  $("soruKosu").classList.add("gizli");
  var k = $("soruSonuc"); k.classList.remove("gizli");
  var toplam = KOSU.liste.length, dogru = KOSU.dogru, yanlis = KOSU.yanlis,
      bos = toplam - dogru - yanlis, oran = yuzde(dogru, toplam);
  V.sonCalisma = null; yaz();
  k.innerHTML = "";
  var kart = yap("div", "sonucKart");
  kart.innerHTML =
    '<div class="puanHalka"><svg width="190" height="190" viewBox="0 0 190 190">' +
      '<defs><linearGradient id="puanGradyan" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#d4af37"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>' +
      '<circle class="iz" cx="95" cy="95" r="80"/><circle class="dolgu" cx="95" cy="95" r="80" ' +
      'stroke-dasharray="502" stroke-dashoffset="502"/></svg>' +
      '<div class="puanOrta"><b>' + oran + '%</b><span>başarı</span></div></div>' +
    '<h2 class="sonucBaslik">' + (oran >= 85 ? "Muhteşem!" : oran >= 70 ? "Çok iyi!" : oran >= 50 ? "İyi gidiyorsun" : "Biraz daha çalışmalı") + '</h2>' +
    '<p class="sonucAlt">' + toplam + ' soru · ' + sureYazi(KOSU.sure) + ' süre</p>' +
    '<div class="sonucKutular">' +
      '<div class="sonucKutu dogru"><b>' + dogru + '</b><span>doğru</span></div>' +
      '<div class="sonucKutu yanlis"><b>' + yanlis + '</b><span>yanlış</span></div>' +
      '<div class="sonucKutu bos"><b>' + bos + '</b><span>boş</span></div>' +
    '</div>';
  var alt = yap("div", "kosuAlt");
  var b1 = yap("button", "dugme", "Yanlışları çöz");
  b1.onclick = yanlislariCoz;
  var b2 = yap("button", "dugme dugme-buyuk", "Yeni çalışma");
  b2.onclick = function(){ $("soruSonuc").classList.add("gizli"); $("soruSecim").classList.remove("gizli"); soruEkraniCiz(); };
  alt.appendChild(b1); alt.appendChild(b2);
  kart.appendChild(alt);
  k.appendChild(kart);
  setTimeout(function(){
    var d = document.querySelector(".puanHalka .dolgu");
    if(d) d.setAttribute("stroke-dashoffset", String(502 - 502 * oran / 100));
  }, 120);
  if(oran >= 70){ konfeti(); sesCal(660, .2); setTimeout(function(){ sesCal(990, .26); }, 180); }
  else sesCal(330, .3);
  V.sinavSayisi = V.sinavSayisi || 0;
  yaz();
}
function yanlislariCoz(){
  var liste = SORULAR.filter(function(s){ return V.yanlislar.indexOf(s._i) >= 0; });
  if(!liste.length){ uyari("Yanlış defterinde soru yok. Tebrikler!", "basarili"); return; }
  git("soru");
  calismaBasla(karistir(liste), "Yanlışlarım (" + liste.length + " soru)", { karistir:false });
}

/* ===================== deneme sınavı ===================== */
var SINAV = { tur:"genel", adet:60, sure:75 };
var SKOSU = null;
function sinavHavuzu(tur){
  var genel = ["Türkçe","Matematik","Geometri","Tarih","Coğrafya","Vatandaşlık","Anayasa","Güncel Bilgiler"];
  if(tur === "genel") return SORULAR.filter(function(s){ return genel.indexOf(s.ders) >= 0; });
  if(tur === "a") return SORULAR.filter(function(s){ return genel.indexOf(s.ders) < 0; });
  return SORULAR.slice();
}
function sinavBasla(){
  var havuz = sinavHavuzu(SINAV.tur);
  if(havuz.length < 10){ uyari("Bu türde yeterli soru yok.", "hatali"); return; }
  var secilen = karistir(havuz).slice(0, Math.min(SINAV.adet, havuz.length));
  SKOSU = { liste:secilen, i:0, cevaplar:new Array(secilen.length).fill(null), isaretli:{},
            baslangic:Date.now(), kalan:SINAV.sure * 60, bitti:false };
  secilen.forEach(function(s){ s._secim = null; });
  $("sinavAyar").classList.add("gizli");
  $("sinavSonuc").classList.add("gizli");
  $("sinavKosu").classList.remove("gizli");
  $("sinavTur").textContent = SINAV.tur === "genel" ? "Genel Yetenek + Genel Kültür" : (SINAV.tur === "a" ? "A Grubu" : "Karışık");
  sinavSayaci();
  sinavSoruGoster();
}
function sinavSayaci(){
  clearInterval(sinavSayaci._z);
  if(!SINAV.sure){ $("sinavKronometre").textContent = "süresiz"; return; }
  sinavSayaci._z = setInterval(function(){
    if(!SKOSU || SKOSU.bitti) return;
    SKOSU.kalan--;
    var e = $("sinavKronometre");
    if(e){
      e.textContent = sureYazi(SKOSU.kalan);
      e.classList.toggle("az", SKOSU.kalan <= 300);
    }
    if(SKOSU.kalan <= 0){ uyari("Süre doldu, sınav bitiriliyor.", "hatali"); sinavBitir(true); }
  }, 1000);
}
function sinavSoruGoster(){
  var s = SKOSU.liste[SKOSU.i];
  $("sinavSayac").textContent = (SKOSU.i + 1) + " / " + SKOSU.liste.length;
  $("sinavKonu").textContent = s.ders + " · " + s.konu;
  var z = $("sinavZorluk"); z.textContent = s.zorluk || "orta"; z.className = "zorluk " + (s.zorluk || "orta");
  $("sinavMetin").textContent = s.soru;
  $("sinavIleriDolgu").style.width = yuzde(SKOSU.i + 1, SKOSU.liste.length) + "%";
  $("dSinavIsaretle").classList.toggle("dugme-altin", !!SKOSU.isaretli[SKOSU.i]);
  var k = $("sinavSiklar"); k.innerHTML = "";
  var harfler = ["A","B","C","D","E"];
  s.siklar.forEach(function(metin, i){
    var b = yap("button", "sik" + (SKOSU.cevaplar[SKOSU.i] === i ? " secili" : ""));
    b.appendChild(yap("span", "harf", harfler[i]));
    b.appendChild(yap("span", null, metin));
    b.onclick = function(){ cevapla(i, true); };
    k.appendChild(b);
  });
}
function paletAc(){
  var kap = yap("div", "paletKutu");
  var ic = yap("div", "paletIc");
  ic.appendChild(yap("div", "kartBas", "SORU LİSTESİ — boş: dokunulmadı · mavi: cevaplandı · mor: işaretli"));
  var l = yap("div", "paletListe");
  SKOSU.liste.forEach(function(s, i){
    var b = yap("button", "paletDugme" + (SKOSU.cevaplar[i] !== null ? " dolu" : "") +
                (SKOSU.isaretli[i] ? " isaretli" : "") + (i === SKOSU.i ? " simdiki" : ""), String(i + 1));
    b.onclick = function(){ SKOSU.i = i; kap.remove(); sinavSoruGoster(); };
    l.appendChild(b);
  });
  ic.appendChild(l);
  var alt = yap("div", "kosuAlt");
  var bk = yap("button", "dugme dugme-buyuk", "Kapat");
  bk.onclick = function(){ kap.remove(); };
  alt.appendChild(bk); ic.appendChild(alt);
  kap.appendChild(ic);
  kap.onclick = function(e){ if(e.target === kap) kap.remove(); };
  document.body.appendChild(kap);
}
function sinavBitir(zamanDoldu){
  SKOSU.bitti = true;
  clearInterval(sinavSayaci._z);
  $("sinavKosu").classList.add("gizli");
  var k = $("sinavSonuc"); k.classList.remove("gizli");
  var dogru = 0, yanlis = 0, bos = 0, dersDok = {};
  SKOSU.liste.forEach(function(s, i){
    var c = SKOSU.cevaplar[i];
    if(!dersDok[s.ders]) dersDok[s.ders] = { t:0, d:0, y:0 };
    dersDok[s.ders].t++;
    if(c === null || c === undefined){ bos++; dersDok[s.ders].y += 0; }
    else if(c === s.dogru){ dogru++; dersDok[s.ders].d++; }
    else { yanlis++; dersDok[s.ders].y++; if(V.yanlislar.indexOf(s._i) < 0) V.yanlislar.push(s._i); }
    if(!V.dersStat[s.ders]) V.dersStat[s.ders] = { t:0, d:0, y:0 };
    V.dersStat[s.ders].t++;
    if(c === s.dogru) V.dersStat[s.ders].d++; else if(c !== null && c !== undefined) V.dersStat[s.ders].y++;
    if(c !== null && c !== undefined) kayitGuncelle(s, c === s.dogru);
    else { gunlukKontrol(); V.gunluk.cozulen++; }
  });
  var oran = yuzde(dogru, SKOSU.liste.length);
  V.sinavSayisi = (V.sinavSayisi || 0) + 1;
  V.sonSinav = { tarih:Date.now(), dogru:dogru, yanlis:yanlis, bos:bos, oran:oran, toplam:SKOSU.liste.length };
  V.sorulan = (V.sorulan || 0) + SKOSU.liste.length;
  yaz();
  k.innerHTML = "";
  var kart = yap("div", "sonucKart");
  kart.innerHTML =
    '<div class="puanHalka"><svg width="190" height="190" viewBox="0 0 190 190">' +
      '<defs><linearGradient id="puanGradyan" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#d4af37"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>' +
      '<circle class="iz" cx="95" cy="95" r="80"/><circle class="dolgu" cx="95" cy="95" r="80" ' +
      'stroke-dasharray="502" stroke-dashoffset="502"/></svg>' +
      '<div class="puanOrta"><b>' + oran + '%</b><span>başarı</span></div></div>' +
    '<h2 class="sonucBaslik">Deneme Sınavı Sonucu</h2>' +
    '<p class="sonucAlt">' + (zamanDoldu ? "Süre doldu · " : "") + SKOSU.liste.length + ' soru · ' +
      sureYazi(Math.round((Date.now() - SKOSU.baslangic) / 1000)) + '</p>' +
    '<div class="sonucKutular">' +
      '<div class="sonucKutu dogru"><b>' + dogru + '</b><span>doğru</span></div>' +
      '<div class="sonucKutu yanlis"><b>' + yanlis + '</b><span>yanlış</span></div>' +
      '<div class="sonucKutu bos"><b>' + bos + '</b><span>boş</span></div>' +
      '<div class="sonucKutu"><b>' + dogru + '</b><span>puan (doğru sayısı)</span></div>' +
    '</div>';
  var dok = yap("div", "dersDokum");
  dok.appendChild(yap("div", "kartBas", "DERS BAZINDA DÖKÜM"));
  dok.appendChild(cubukListesi(dersDok));
  kart.appendChild(dok);
  var alt = yap("div", "kosuAlt");
  var b1 = yap("button", "dugme", "Yanlışları çöz");
  b1.onclick = yanlislariCoz;
  var b2 = yap("button", "dugme dugme-buyuk", "Yeni sınav");
  b2.onclick = function(){ $("sinavSonuc").classList.add("gizli"); $("sinavAyar").classList.remove("gizli"); };
  alt.appendChild(b1); alt.appendChild(b2);
  kart.appendChild(alt);
  k.appendChild(kart);
  setTimeout(function(){
    var d = document.querySelector(".puanHalka .dolgu");
    if(d) d.setAttribute("stroke-dashoffset", String(502 - 502 * oran / 100));
    hepsi(".cubukDolgu").forEach(function(e){ e.style.width = e.getAttribute("data-w") + "%"; });
  }, 150);
  if(oran >= 60) konfeti();
}

/* ===================== istatistik ===================== */
function cubukListesi(veri){
  var k = yap("div", "cubukListe");
  var adlar = Object.keys(veri).sort(function(a, b){
    return yuzde(veri[a].d, veri[a].t) - yuzde(veri[b].d, veri[b].t);
  });
  if(!adlar.length){ k.appendChild(yap("p", "metin", "Henüz veri yok. Soru çözdükçe burada dolacak.")); return k; }
  adlar.forEach(function(ad){
    var v = veri[ad], oran = yuzde(v.d, v.t);
    var c = yap("div", "cubuk");
    c.appendChild(yap("span", "cubukAd", ad));
    var iz = yap("div", "cubukIz");
    var dol = yap("span", "cubukDolgu" + (oran >= 70 ? "" : oran >= 45 ? " orta" : " dusuk"));
    dol.setAttribute("data-w", String(oran));
    iz.appendChild(dol); c.appendChild(iz);
    c.appendChild(yap("span", "cubukYuzde", "%" + oran + " (" + v.t + ")"));
    k.appendChild(c);
  });
  setTimeout(function(){ hepsi(".cubukDolgu", k).forEach(function(e){ e.style.width = e.getAttribute("data-w") + "%"; }); }, 100);
  return k;
}
function istatistikCiz(){
  var s = statHesapla(), k = $("istKutular");
  if(k){
    k.innerHTML = "";
    kutuCiz(k, "i-kitap", s.toplam, "çözülen soru", "r-mavi");
    kutuCiz(k, "i-dogru", s.dogru, "doğru", "r-yesil");
    kutuCiz(k, "i-yanlis", s.yanlis, "yanlış", "r-kirmizi");
    kutuCiz(k, "i-grafik", "%" + s.oran, "başarı", "r-mor");
    kutuCiz(k, "i-kupa", V.sinavSayisi || 0, "deneme sınavı", "");
  }
  var d = $("istDersler");
  if(d){ d.innerHTML = ""; d.appendChild(cubukListesi(V.dersStat)); }
  var ys = $("yanlisSayi");
  if(ys) ys.textContent = V.yanlislar.length + " soru";
  var yl = $("yanlisListe");
  if(yl){
    yl.innerHTML = "";
    if(!V.yanlislar.length){
      yl.appendChild(yap("p", "metin", "Yanlış defteri boş. Yanlış yaptığın sorular otomatik buraya gelir."));
    }else{
      V.yanlislar.slice(-40).reverse().forEach(function(i){
        var s2 = SORULAR[i]; if(!s2) return;
        var b = yap("button", "dersKart");
        var ad = yap("span", "dersAd");
        ad.appendChild(yap("b", null, kisalt(s2.soru, 92)));
        ad.appendChild(yap("small", null, s2.ders + " · " + s2.konu));
        b.appendChild(ad);
        b.onclick = function(){ calismaBasla([s2], s2.ders + " tekrar", { karistir:false }); git("soru"); };
        yl.appendChild(b);
      });
    }
  }
}

/* ===================== konu özetleri ===================== */
function ozetListesiCiz(){
  var k = $("ozetListe"); if(!k) return;
  $("ozetDetay").classList.add("gizli");
  $("ozetListeEkrani").classList.remove("gizli");
  k.innerHTML = "";
  if(!OZETLER.liste.length){ k.appendChild(yap("p", "metin", "Özet bulunamadı.")); return; }
  OZETLER.liste.forEach(function(o, i){
    var b = yap("button", "dersKart");
    b.style.animationDelay = (i * .03) + "s";
    var r = yap("span", "dersRenk");
    r.style.background = o.renk || "#1d4ed8";
    b.appendChild(r);
    var ad = yap("span", "dersAd");
    ad.appendChild(yap("b", null, o.ad));
    ad.appendChild(yap("small", null, (o.bloklar ? o.bloklar.length : 0) + " başlık"));
    b.appendChild(ad);
    b.appendChild(yap("span", "dersSayi", "oku"));
    b.onclick = function(){ ozetGoster(i); };
    k.appendChild(b);
  });
}
function ozetGoster(i){
  var o = OZETLER.liste[i]; if(!o) return;
  $("ozetListeEkrani").classList.add("gizli");
  var k = $("ozetDetay"); k.classList.remove("gizli");
  k.innerHTML = "";
  var kart = yap("div", "kart");
  var bas = yap("div", "ozetBas");
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "ikon"); svg.innerHTML = '<use href="#i-defter"/>';
  bas.appendChild(svg);
  bas.appendChild(yap("h2", null, o.ad));
  kart.appendChild(bas);
  (o.bloklar || []).forEach(function(bl){
    var b = yap("div", "ozetBlok");
    b.appendChild(yap("h3", null, bl.baslik));
    var ul = document.createElement("ul");
    (bl.maddeler || []).forEach(function(m){
      var li = document.createElement("li");
      li.innerHTML = m;                       /* içerik dosyamızdan: kalın vurgular için */
      ul.appendChild(li);
    });
    b.appendChild(ul);
    kart.appendChild(b);
  });
  if(o.ipucu) kart.appendChild(yap("div", "ipucuKutu", "Sınav ipucu: " + o.ipucu));
  var alt = yap("div", "kosuAlt");
  var bg = yap("button", "dugme", "Listeye dön");
  bg.onclick = function(){ $("ozetDetay").classList.add("gizli"); $("ozetListeEkrani").classList.remove("gizli"); };
  var bs = yap("button", "dugme dugme-buyuk", "Bu dersten soru çöz");
  bs.onclick = function(){
    var d = dersBul(o.ad);
    if(!d){ uyari("Bu ders için soru bulunamadı.", "hatali"); return; }
    git("soru"); SEC.ders = o.ad; SEC.konular = [];
    $("konuKart").classList.remove("gizli");
    soruEkraniCiz(); konuCiz();
  };
  alt.appendChild(bg); alt.appendChild(bs);
  kart.appendChild(alt);
  k.appendChild(kart);
  window.scrollTo({ top:0, behavior:"smooth" });
}


/* =====================================================================
   UYARLAMALI ÖĞRETİM MOTORU
   Amaç: uygulama kendini sürekli güncelleyip öğrenciyi ileri taşısın.
   · Aralıklı tekrar (SM-2 benzeri): doğru yapılan soru 1 → 3 → 7 → 21 → 45 gün sonra geri gelir
   · Zayıf konu avı: hakimiyeti düşük konular programa kendiliğinden girer
   · Uyarlanan zorluk: hakimiyet yükseldikçe zor sorular devreye girer
   · Günlük hedef + gün serisi + rütbe: istikrar puanla ödüllendirilir
   · Öğrenene kadar tekrar: yanlış yapılan soru iki kez üst üste doğru yapılmadan defterden düşmez
   ===================================================================== */
var GUN_MS = 86400000;
function bugun(){ var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function dunTarih(){ var d = new Date(Date.now() - GUN_MS); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function konuAnahtar(ders, konu){ return ders + "|" + konu; }
function hakimiyetAl(ders, konu){
  var k = V.konuHakimiyet[konuAnahtar(ders, konu)];
  return k ? k.h : -1;                                  /* -1 = hiç çalışılmadı */
}
function kayitAl(i){
  if(!V.soruKayit[i]) V.soruKayit[i] = { n:0, aralik:0, kolaylik:2.5, son:0, d:0, y:0, zorluk:0 };
  return V.soruKayit[i];
}
function gunlukKontrol(){
  var b = bugun();
  if(V.gunluk.tarih !== b){ V.gunluk = { tarih:b, cozulen:0, dogru:0, sure:0 }; }
  if(V.sonGunCalisma && V.sonGunCalisma !== b){
    if(V.sonGunCalisma === dunTarih()){ /* dün çalışılmış: seri korunur */ }
    else if(V.sonGunCalisma < dunTarih()){ V.seri = 0; }  /* arada gün atlanmış */
  }
  yaz();
}
function rutbeBul(puan){
  var R = [[0,"Yeni Başlayan"],[60,"Hazırlık Öğrencisi"],[160,"Konu Tamamlayan"],[320,"Soru Ustası"],
           [520,"Deneme Şampiyonu"],[800,"Uzman Adayı"],[1150,"Müfettişlik Yolunda"],[1600,"Üstat"],[2200,"Efsane"]];
  var ad = R[0][1], alt = 0, ust = R[1][0];
  for(var i = 0; i < R.length; i++){
    if(puan >= R[i][0]){ ad = R[i][1]; alt = R[i][0]; ust = (i + 1 < R.length) ? R[i + 1][0] : R[i][0] + 500; }
  }
  return { ad:ad, alt:alt, ust:ust, oran: Math.min(100, Math.round((puan - alt) * 100 / Math.max(1, ust - alt))) };
}
function kayitGuncelle(soru, dogruMu){
  var k = kayitAl(soru._i);
  gunlukKontrol();
  var oncesiHakimiyet = hakimiyetAl(soru.ders, soru.konu);
  /* --- aralıklı tekrar --- */
  if(dogruMu){
    k.d++;
    k.n = k.n + 1;
    if(k.n <= 1) k.aralik = 1;
    else if(k.n === 2) k.aralik = 3;
    else k.aralik = Math.min(120, Math.round(Math.max(1, k.aralik) * k.kolaylik));
    k.kolaylik = Math.min(2.9, k.kolaylik + 0.06);
    if(V.yanlislar.indexOf(soru._i) >= 0 && k.d >= 2 && (hakimiyetAl(soru.ders, soru.konu) >= 70 || k.d >= 3)){
      V.yanlislar.splice(V.yanlislar.indexOf(soru._i), 1);   /* öğrenildi: defterden düş */
    }
  }else{
    k.y++; k.n = 0; k.aralik = 0; k.kolaylik = Math.max(1.4, k.kolaylik - 0.2);
    if(V.yanlislar.indexOf(soru._i) < 0) V.yanlislar.push(soru._i);
  }
  k.son = Date.now();
  /* --- konu hakimiyeti (ağırlıklı ortalama: son cevaplar daha etkili) --- */
  var anahtar = konuAnahtar(soru.ders, soru.konu);
  var hk = V.konuHakimiyet[anahtar];
  if(!hk){ hk = V.konuHakimiyet[anahtar] = { d:0, y:0, h:dogruMu ? 100 : 0 }; }
  hk.d += dogruMu ? 1 : 0; hk.y += dogruMu ? 0 : 1;
  hk.h = Math.max(0, Math.min(100, hk.h * 0.72 + (dogruMu ? 100 : 0) * 0.28));
  hk.son = Date.now();
  /* --- günlük hedef, seri, puan --- */
  V.gunluk.cozulen++; if(dogruMu) V.gunluk.dogru++;
  if(V.sonGunCalisma !== bugun()){ V.sonGunCalisma = bugun(); V.seri = (V.seri || 0) + 1; }
  V.enUzunSeri = Math.max(V.enUzunSeri || 0, V.seri || 0);
  V.seviyePuan = (V.seviyePuan || 0) + (dogruMu ? 2 : 0) + (oncesiHakimiyet < 0 ? 1 : 0) + (dogruMu && oncesiHakimiyet >= 0 && oncesiHakimiyet < 50 ? 1 : 0);
  V.motorToplam = (V.motorToplam || 0) + 1;
  yaz();
  seviyeCiz();                                    /* seviye/hedef kartı her cevaptan sonra tazelenir */
}
/* tekrar zamanı gelmiş sorular (en gecikmiş önce) */
function tekrarBekleyenler(sinir){
  var simdi = Date.now(), s = [];
  Object.keys(V.soruKayit).forEach(function(i){
    var k = V.soruKayit[i], soru = SORULAR[parseInt(i, 10)];
    if(!soru) return;
    if(k.aralik === 0 && k.y > 0) s.push({ soru:soru, gecikme: GUN_MS, acil:true });
    else if(k.aralik > 0 && (k.son + k.aralik * GUN_MS) <= simdi) s.push({ soru:soru, gecikme: simdi - (k.son + k.aralik * GUN_MS), acil:false });
  });
  s.sort(function(a, b){ return (b.acil ? 1 : 0) - (a.acil ? 1 : 0) || b.gecikme - a.gecikme; });
  return s.slice(0, sinir || 999).map(function(x){ return x.soru; });
}
/* hakimiyeti düşük konular */
function zayifKonular(sinir){
  var dizi = [];
  Object.keys(V.konuHakimiyet).forEach(function(anahtar){
    var hk = V.konuHakimiyet[anahtar], p = anahtar.split("|"), ders = p[0], konu = p[1];
    var toplam = hk.d + hk.y;
    if(toplam < 2) return;
    if(hk.h >= 65) return;
    dizi.push({ ders:ders, konu:konu, h:hk.h, cozulen:toplam, d:hk.d, y:hk.y });
  });
  dizi.sort(function(a, b){ return a.h - b.h; });
  return sinir ? dizi.slice(0, sinir) : dizi;
}
/* hiç çözülmemiş konular (sırayla ilerler) */
function yeniKonular(sinir){
  var dizi = [];
  dersler.forEach(function(d){
    d.konuListesi.forEach(function(kn){
      if(hakimiyetAl(d.ad, kn) < 0) dizi.push({ ders:d.ad, konu:kn, adet:d.konular[kn] });
    });
  });
  dizi.sort(function(a, b){ return b.adet - a.adet; });
  return sinir ? dizi.slice(0, sinir) : dizi;
}
/* uyarlanmış zorluk: hakimiyete göre soru seçimi */
function uyarlanmisZorluk(){
  var toplam = 0, dolu = 0;
  Object.keys(V.konuHakimiyet).forEach(function(k){ toplam += V.konuHakimiyet[k].h; dolu++; });
  var ort = dolu ? toplam / dolu : 55;
  if(ort >= 82) return { ad:"zor", aciklama:"Hakimiyetin yüksek: sorular zor seviyeden geliyor." };
  if(ort >= 62) return { ad:"orta", aciklama:"Hakimiyetin iyi: orta ve zor sorular karışık geliyor." };
  if(ort >= 40) return { ad:"kolay-orta", aciklama:"Temel pekişiyor: kolay ve orta sorular karışık geliyor." };
  return { ad:"kolay", aciklama:"Temelden başlıyoruz: kolay sorularla güven kazanıyorsun." };
}
function zorlukSuzgeci(havuz, ad){
  if(ad === "kolay") return havuz.filter(function(s){ return s.zorluk !== "zor"; });
  if(ad === "kolay-orta") return havuz.filter(function(s){ return s.zorluk !== "zor"; });
  if(ad === "zor") return havuz.filter(function(s){ return s.zorluk !== "kolay"; });
  return havuz;
}
function konuSorulari(ders, konu){
  var d = dersBul(ders); if(!d) return [];
  return d.sorular.filter(function(s){ return s.konu === konu; });
}
/* günlük karışık: %40 tekrar · %35 zayıf konu · %25 yeni */
function gunlukKarisik(adet){
  var z = uyarlanmisZorluk().ad;
  var tekrar = zorlukSuzgeci(tekrarBekleyenler(60), z);
  var zayifHavuz = [];
  zayifKonular(8).forEach(function(k){ zayifHavuz = zayifHavuz.concat(konuSorulari(k.ders, k.konu)); });
  var yeniHavuz = [];
  yeniKonular(5).forEach(function(k){ yeniHavuz = yeniHavuz.concat(konuSorulari(k.ders, k.konu)); });
  var secilen = [], kullanilan = {};
  function ekle(liste, n){
    var s = karistir(liste);
    for(var i = 0; i < s.length && n > 0; i++){
      if(kullanilan[s[i]._i]) continue;
      kullanilan[s[i]._i] = 1; secilen.push(s[i]); n--;
    }
  }
  ekle(tekrar, Math.round(adet * .40));
  ekle(zayifHavuz, Math.round(adet * .35));
  ekle(yeniHavuz, Math.round(adet * .25));
  if(secilen.length < adet){
    var kalan = karistir(zorlukSuzgeci(SORULAR, z)).filter(function(s){ return !kullanilan[s._i]; });
    ekle(kalan, adet - secilen.length);
  }
  return karistir(secilen).slice(0, adet);
}
/* program blokları */
function programUret(){
  var z = uyarlanmisZorluk();
  var tekrar = zorlukSuzgeci(tekrarBekleyenler(30), z).slice(0, 15);
  var zayiflar = zayifKonular(3), yeni = yeniKonular(2), bloklar = [];
  var kalanHedef = Math.max(6, (V.hedef || 20) - (V.gunluk.cozulen || 0));
  if(tekrar.length){
    bloklar.push({ tur:"tekrar", renk:"renk-altin", ikon:"i-yenile", baslik:"Tekrar zamanı gelen sorular",
      aciklama: tekrar.length + " soru aralıklı tekrar takvimine göre geri geldi. Bunları çözmeden yenisi eklenmez.",
      sorular: tekrar, dugme:"Tekrarı çöz" });
  }
  zayiflar.forEach(function(k){
    var havuz = zorlukSuzgeci(konuSorulari(k.ders, k.konu), z === "kolay" ? "kolay" : z);
    if(havuz.length < 3) havuz = konuSorulari(k.ders, k.konu);
    bloklar.push({ tur:"zayif", renk:"renk-bordo", ikon:"i-hedef", baslik:k.ders + " · " + k.konu,
      aciklama:"Hakimiyetin %" + Math.round(k.h) + " (" + k.cozulen + " soruda " + k.d + " doğru). Zayıf halka burada: " +
               Math.min(10, havuz.length) + " soruluk odak turu.", sorular:karistir(havuz).slice(0, 10),
      dugme:"Odak turu", ozetDers:k.ders });
  });
  yeni.forEach(function(k){
    bloklar.push({ tur:"yeni", renk:"renk-yesil", ikon:"i-kitap", baslik:"Yeni konu · " + k.ders + " · " + k.konu,
      aciklama:"Bu konudan hiç soru çözmedin. Önce özetini oku, sonra " + Math.min(10, k.adet) + " soruyla başla.",
      sorular:karistir(konuSorulari(k.ders, k.konu)).slice(0, 10), dugme:"Konuyu başlat", ozetDers:k.ders });
  });
  bloklar.push({ tur:"karisik", renk:"renk-mavi", ikon:"i-simsek", baslik:"Günün karışık turu",
    aciklama:"Günlük hedefin " + (V.hedef || 20) + " soru · kalan " + kalanHedef + ". Tekrar + zayıf konu + yeni konu karışık gelir.",
    sorular: gunlukKarisik(Math.min(20, kalanHedef)), dugme:"Karışık tura başla" });
  return { zorluk:z, bloklar:bloklar };
}
function ogrenCiz(){
  var p = programUret(), k = $("programListe");
  if(!k) return;
  var ms = $("motorAciklama");
  if(ms){
    var s = statHesapla(), hk = Object.keys(V.konuHakimiyet).length,
        zayif = zayifKonular().length, bekleyen = tekrarBekleyenler(999).length;
    ms.textContent = "Motor " + (V.motorToplam || 0) + " cevabını izliyor. Şu an " + hk + " konu takipte, " +
      zayif + " konu zayıf, " + bekleyen + " soru tekrar bekliyor. Zorluk ayarı: " + p.zorluk.aciklama +
      " Genel başarın %" + s.oran + ", gün serisi " + (V.seri || 0) + " gün, rütben " + rutbeBul(V.seviyePuan || 0).ad + ".";
  }
  k.innerHTML = "";
  p.bloklar.forEach(function(b, i){
    var kart = yap("div", "kart programKart " + b.renk);
    kart.style.animationDelay = (i * .05) + "s";
    var bas = yap("div", "kartBas");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "ikon"); svg.innerHTML = '<use href="#' + b.ikon + '"/>';
    bas.appendChild(svg); bas.appendChild(yap("span", null, b.baslik));
    kart.appendChild(bas);
    kart.appendChild(yap("p", "metin", b.aciklama));
    var alt = yap("div", "kosuAlt");
    var git_ = yap("button", "dugme dugme-buyuk", b.dugme + " (" + b.sorular.length + " soru)");
    git_.onclick = function(){
      var veri = b.tur === "zayif" ? { ders:b.baslik.split(" · ")[0], konu:b.baslik.split(" · ")[1] } : null;
      SEC.ders = veri ? veri.ders : null;
      if(veri){ SEC.konular = [veri.konu]; }
      git("soru");
      if(veri){ $("konuKart").classList.remove("gizli"); soruEkraniCiz(); konuCiz(); }
      calismaBasla(b.sorular, b.baslik, { karistir:false });
    };
    alt.appendChild(git_);
    if(b.ozetDers && ozetBul(b.ozetDers) >= 0){
      var bo = yap("button", "dugme", "Önce özeti oku");
      bo.onclick = function(){ git("ozet"); ozetGoster(ozetBul(b.ozetDers)); };
      alt.appendChild(bo);
    }
    kart.appendChild(alt);
    k.appendChild(kart);
  });
  /* konu hakimiyeti listesi */
  var hl = $("hakimiyetListe");
  if(hl){
    hl.innerHTML = "";
    var anahtarlar = Object.keys(V.konuHakimiyet);
    if(!anahtarlar.length){
      hl.appendChild(yap("p", "metin", "Henüz konu verisi yok. İlk turu çözünce burada her konunun hakimiyeti çubukla görünecek."));
    }else{
      anahtarlar.sort(function(a, b){ return V.konuHakimiyet[a].h - V.konuHakimiyet[b].h; });
      anahtarlar.forEach(function(a){
        var v = V.konuHakimiyet[a], p2 = a.split("|"), h = Math.round(v.h);
        var c = yap("div", "cubuk hakimiyet");
        c.appendChild(yap("span", "cubukAd", p2[1]));
        var iz = yap("div", "cubukIz"), dol = yap("span", "cubukDolgu" + (h >= 70 ? "" : h >= 45 ? " orta" : " dusuk"));
        dol.setAttribute("data-w", String(h)); iz.appendChild(dol); c.appendChild(iz);
        c.appendChild(yap("span", "cubukYuzde", "%" + h + " · " + (v.d + v.y) + " soru"));
        var b2 = yap("button", "miniDugme", "çalış");
        b2.onclick = function(){
          git("soru"); SEC.ders = p2[0]; SEC.konular = [p2[1]];
          $("konuKart").classList.remove("gizli"); soruEkraniCiz(); konuCiz();
        };
        c.appendChild(b2);
        hl.appendChild(c);
      });
      setTimeout(function(){ hepsi(".hakimiyet .cubukDolgu").forEach(function(e){ e.style.width = e.getAttribute("data-w") + "%"; }); }, 100);
    }
  }
  /* öğrenene kadar tekrar */
  var tb = $("tekrarBilgi"), td = $("tekrarDugmeler");
  if(tb && td){
    var ogrenilmemis = V.yanlislar.filter(function(i){
      var k2 = V.soruKayit[i];
      return !k2 || k2.d < 2;
    });
    tb.textContent = ogrenilmemis.length
      ? "Defterinde " + ogrenilmemis.length + " soru var; iki kez üst üste doğru yapılmadan listeden düşmez."
      : "Şu an öğrenilmemiş soru yok. Yanlış yaptığın sorular buraya düşer ve doğru yapana kadar geri gelir.";
    td.innerHTML = "";
    if(ogrenilmemis.length){
      var b3 = yap("button", "dugme dugme-buyuk", "Öğrenene kadar tekrar et (" + ogrenilmemis.length + ")");
      b3.onclick = function(){
        var liste = ogrenilmemis.map(function(i){ return SORULAR[i]; }).filter(Boolean);
        git("soru"); calismaBasla(karistir(liste), "Öğrenene kadar tekrar", { karistir:false });
      };
      td.appendChild(b3);
    }
  }
  /* hedef seçimi */
  var hs = $("hedefSecim");
  if(hs){
    hepsi("button", hs).forEach(function(b){
      b.classList.toggle("secili", parseInt(b.getAttribute("data-hedef"), 10) === (V.hedef || 20));
      b.onclick = function(){
        V.hedef = parseInt(b.getAttribute("data-hedef"), 10);
        yaz(); hepsi("button", hs).forEach(function(x){ x.classList.toggle("secili", x === b); });
        ogrenCiz(); seviyeCiz(); uyari("Günlük hedef: " + V.hedef + " soru", "basarili");
      };
    });
  }
}
function ozetBul(ders){
  for(var i = 0; i < (OZETLER.liste || []).length; i++) if(OZETLER.liste[i].ad === ders) return i;
  return -1;
}
function seviyeCiz(){
  var r = rutbeBul(V.seviyePuan || 0), hedef = V.hedef || 20;
  var hedefOran = Math.min(100, yuzde(V.gunluk.cozulen || 0, hedef));
  var e1 = $("seviyeRutbe"); if(e1) e1.textContent = r.ad;
  var e2 = $("seviyeMetin");
  if(e2) e2.textContent = "Bugün " + (V.gunluk.cozulen || 0) + " / " + hedef + " soru · gün serisi " + (V.seri || 0) +
    " gün · toplam " + (V.seviyePuan || 0) + " puan";
  var e3 = $("seviyeYuzde"); if(e3) e3.textContent = hedefOran + "%";
  var d = $("seviyeDolgu"); if(d) setTimeout(function(){ d.setAttribute("stroke-dashoffset", String(289 - 289 * hedefOran / 100)); }, 120);
  var c = $("seviyeCubukDolgu"); if(c) c.style.width = r.oran + "%";
  var mp = $("menuProgramOzet");
  if(mp){
    var blok = programUret().bloklar.length;
    mp.textContent = blok + " blokluk plan · bugün " + (V.gunluk.cozulen || 0) + "/" + hedef + " soru · " + r.ad;
  }
}

/* ===================== olaylar ===================== */
function bagla(){
  hepsi("[data-git]").forEach(function(b){
    b.addEventListener("click", function(){ git(b.getAttribute("data-git")); });
  });
  var dp = $("dPalet"); if(dp) dp.onclick = function(){ git("ayarlar"); };
  var da = $("dAyar"); if(da) da.onclick = function(){ git("ayarlar"); };
  var dev = $("dDevam");
  if(dev) dev.onclick = function(){
    var sc = V.sonCalisma; if(!sc) return;
    var d = dersBul(sc.ders);
    if(!d){ uyari("Kayıt bulunamadı.", "hatali"); return; }
    var havuz = karistir(soruHavuzu(sc.ders, sc.konular, sc.zorluk), 7);
    git("soru");
    calismaBasla(havuz.slice(sc.kalan), sc.ders + " (devam)", { karistir:false });
  };

  /* soru ekranı */
  var db = $("dBasla");
  if(db) db.onclick = function(){
    if(!SEC.ders){ uyari("Önce bir ders seç.", "hatali"); return; }
    var havuz = soruHavuzu(SEC.ders, SEC.konular, SEC.zorluk);
    if(V.karistir) havuz = karistir(havuz);
    var adet = SEC.adet || 20;
    var secilen = adet ? havuz.slice(0, adet) : havuz;
    if(V.karistir) secilen = karistir(secilen);
    if(adet && havuz.length > adet){
      V.sonCalisma = { ders:SEC.ders, konular:SEC.konular.slice(), zorluk:SEC.zorluk,
                       toplam:secilen.length, kalan:secilen.length, tarih:Date.now() };
      yaz();
    }
    calismaBasla(secilen, SEC.ders + (SEC.konular.length ? " · " + SEC.konular.join(", ") : ""));
  };
  var dz = $("secZorluk");
  if(dz) dz.addEventListener("click", function(e){
    var b = e.target.closest("button[data-zorluk]"); if(!b) return;
    SEC.zorluk = b.getAttribute("data-zorluk");
    hepsi("button", dz).forEach(function(x){ x.classList.toggle("secili", x === b); });
  });
  var sa = $("secAdet");
  if(sa) sa.addEventListener("click", function(e){
    var b = e.target.closest("button[data-adet]"); if(!b) return;
    SEC.adet = parseInt(b.getAttribute("data-adet"), 10);
    hepsi("button", sa).forEach(function(x){ x.classList.toggle("secili", x === b); });
  });
  var dsn = $("dSonraki"); if(dsn) dsn.onclick = sonrakiSoru;
  var dat = $("dAtla");
  if(dat) dat.onclick = function(){
    if(!KOSU) return;
    KOSU.bos++; KOSU.cevaplar[KOSU.i] = null;
    if(KOSU.i >= KOSU.liste.length - 1) sonucGoster(); else { KOSU.i++; soruGoster(); }
  };
  var dsc = $("dSoruCik");
  if(dsc) dsc.onclick = function(){
    if(KOSU && KOSU.i > 0){
      V.sonCalisma.kalan = KOSU.liste.length - KOSU.i - 1;
      V.sonCalisma.tarih = Date.now(); yaz();
    }
    clearInterval(zamanlayiciBasla._z);
    if(KOSU) KOSU.zamanlayici = false;
    $("soruKosu").classList.add("gizli");
    $("soruSonuc").classList.add("gizli");
    $("soruSecim").classList.remove("gizli");
    if(KOSU && KOSU.dogru + KOSU.yanlis > 0) sonucGoster();
    else git("soru");
  };
  var dfv = $("dFavori");
  if(dfv) dfv.onclick = function(){
    if(!KOSU) return;
    var i = KOSU.liste[KOSU.i]._i, ix = V.favoriler.indexOf(i);
    if(ix >= 0) V.favoriler.splice(ix, 1); else V.favoriler.push(i);
    dfv.classList.toggle("secili", ix < 0);
    yaz(); uyari(ix < 0 ? "Favorilere eklendi" : "Favoriden çıkarıldı", "basarili");
  };

  /* sınav */
  var st = $("secTur");
  if(st) st.addEventListener("click", function(e){
    var b = e.target.closest("button[data-tur]"); if(!b) return;
    SINAV.tur = b.getAttribute("data-tur");
    hepsi("button", st).forEach(function(x){ x.classList.toggle("secili", x === b); });
  });
  var ss = $("secSinavAdet");
  if(ss) ss.addEventListener("click", function(e){
    var b = e.target.closest("button[data-adet]"); if(!b) return;
    SINAV.adet = parseInt(b.getAttribute("data-adet"), 10);
    hepsi("button", ss).forEach(function(x){ x.classList.toggle("secili", x === b); });
  });
  var ssu = $("secSure");
  if(ssu) ssu.addEventListener("click", function(e){
    var b = e.target.closest("button[data-sure]"); if(!b) return;
    SINAV.sure = parseInt(b.getAttribute("data-sure"), 10);
    hepsi("button", ssu).forEach(function(x){ x.classList.toggle("secili", x === b); });
  });
  var dsb = $("dSinavBasla"); if(dsb) dsb.onclick = sinavBasla;
  var dsk = $("dSinavCik");
  if(dsk) dsk.onclick = function(){
    if(!confirm("Sınavdan çıkılsın mı? Cevaplar kaydedilmez.")) return;
    clearInterval(sinavSayaci._z);
    $("sinavKosu").classList.add("gizli");
    $("sinavAyar").classList.remove("gizli");
  };
  var dsp = $("dPalete"); if(dsp) dsp.onclick = paletAc;
  var dsg = $("dSinavGeri");
  if(dsg) dsg.onclick = function(){ if(!SKOSU) return; if(SKOSU.i > 0){ SKOSU.i--; sinavSoruGoster(); } };
  var dsi = $("dSinavIsaretle");
  if(dsi) dsi.onclick = function(){
    if(!SKOSU) return;
    SKOSU.isaretli[SKOSU.i] = !SKOSU.isaretli[SKOSU.i];
    sinavSoruGoster();
  };
  var dsbit = $("dSinavBitir");
  if(dsbit) dsbit.onclick = function(){
    if(!SKOSU) return;
    var bos = SKOSU.cevaplar.filter(function(c){ return c === null; }).length;
    if(!confirm(bos ? (bos + " soru boş. Sınav bitirilsin mi?") : "Sınav bitirilsin mi?")) return;
    sinavBitir(false);
  };

  /* istatistik */
  var dyc = $("dYanlislariCoz"); if(dyc) dyc.onclick = yanlislariCoz;
  /* ayarlar */
  var kv = { kZamanlayici:"zamanlayici", kSes:"ses", kTitresim:"titresim", kKaristir:"karistir" };
  Object.keys(kv).forEach(function(id){
    var e = $(id); if(!e) return;
    e.checked = !!V[kv[id]];
    e.addEventListener("change", function(){ V[kv[id]] = e.checked; yaz(); uyari("Ayar güncellendi", "basarili"); });
  });
  var sy = $("secYazi");
  if(sy) sy.addEventListener("click", function(e){
    var b = e.target.closest("button[data-yazi]"); if(!b) return;
    V.yazi = b.getAttribute("data-yazi"); temaUygula();
    hepsi("button", sy).forEach(function(x){ x.classList.toggle("secili", x === b); });
    yaz();
  });
  var dv = $("dVeriSifirla");
  if(dv) dv.onclick = function(){
    if(!confirm("Bütün istatistikler ve yanlış defteri silinsin mi?")) return;
    V.dersStat = {}; V.yanlislar = []; V.sorulan = 0; V.dogru = 0; V.yanlis = 0; V.bos = 0;
    V.dogruSeri = 0; V.enIyiSeri = 0; V.sonCalisma = null; V.sinavSayisi = 0; V.sonSinav = null; V.toplamSure = 0;
    yaz(); panelCiz(); istatistikCiz(); uyari("Veriler sıfırlandı", "basarili");
  };

  /* klavye (bilgisayarda) */
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      if(document.querySelector(".paletKutu")) document.querySelector(".paletKutu").remove();
      return;
    }
    if(!KOSU || $("soruKosu").classList.contains("gizli")) return;
    if(e.key >= "1" && e.key <= "5") cevapla(parseInt(e.key, 10) - 1, false);
    else if(e.key === "Enter" || e.key === "ArrowRight"){ if(!$("dSonraki").disabled) sonrakiSoru(); }
    else if(e.key === "f" || e.key === "F") $("dFavori").click();
  });
}

/* ===================== hakkında ===================== */
function hakkindaYaz(){
  var k = $("hakkinda");
  if(!k) return;
  k.textContent = "ÜSTAD KPSS · sürüm " + (window.UYGULAMA_SURUM || "1.0") +
    " · toplam " + SORULAR.length + " soru, " + dersler.length + " ders, " + OZETLER.liste.length + " konu özeti. " +
    "Sorular bu uygulama için özgün olarak yazılmıştır; resmî çıkmış soru kitapçıkları ÖSYM'nin kendi yayınlarındadır " +
    "(paneldeki kaynak bağlantılarına bak). Uygulama çevrimdışı çalışır, internet izni yalnızca bağlantı paylaşımı içindir.";
  var eb = $("ekranBilgi");
  if(eb) eb.classList.remove("gizli");
}

/* ===================== açılış ===================== */
function acilis(){
  oku(); icerikKur(); gunlukKontrol(); temaUygula(); bagla();
  temaListesiCiz();
  panelCiz();
  soruEkraniCiz();
  ozetListesiCiz();
  istatistikCiz();
  hakkindaYaz();
  ekranYaz();
  window.addEventListener("resize", function(){ ekranYaz(); });
  try{ if("serviceWorker" in navigator && location.protocol === "https:"){
    navigator.serviceWorker.register("sw.js").catch(function(){});
  } }catch(e){}
}

/* ===================== ölçüm kapısı ===================== */
window.UT = {
  surum: "1.0",
  V: function(){ return V; },
  dersler: function(){ return dersler.map(function(d){ return { ad:d.ad, soru:d.sorular.length, konu:d.konuListesi.length }; }); },
  sorular: function(){ return SORULAR; },
  ozetler: function(){ return OZETLER; },
  ekran: ekranYeteneği,
  durum: function(){
    return { soru:SORULAR.length, ders:dersler.length, ozet:OZETLER.liste.length,
             tema:V.tema, yazi:V.yazi, ekran:ekranYeteneği(),
             acikEkran:(document.querySelector(".ekran.acik") || {}).id,
             kosuAktif:!!KOSU, sinavAktif:!!SKOSU,
             duzDersler:SORULAR.reduce(function(a,s){ a[s.ders]=(a[s.ders]||0)+1; return a; }, {}) };
  },
  soruCozBasla: function(ders, adet){ SEC.ders = ders; SEC.konular = []; SEC.zorluk = "hepsi"; SEC.adet = adet || 10;
    var h = soruHavuzu(ders, [], "hepsi"); calismaBasla(h.slice(0, SEC.adet), ders); },
  cevapla: cevapla, sonraki: sonrakiSoru, git: git, calismaBasla: calismaBasla,
  sinavBasla: sinavBasla, sinavBitir: sinavBitir, palet: paletAc,
  temaUygula: temaUygula, ozetGoster: ozetGoster, statHesapla: statHesapla,
  dersStat: function(){ return V.dersStat; }, yanlislar: function(){ return V.yanlislar; },
  sifirla: function(){ try{ localStorage.removeItem(DEPO); }catch(e){} oku(); },
  program: function(){ var p = programUret(); return { zorluk:p.zorluk, bloklar:p.bloklar.map(function(b){ return { tur:b.tur, baslik:b.baslik, soru:b.sorular.length }; }) }; },
  hakimiyet: function(){ return V.konuHakimiyet; },
  tekrarBekleyen: function(){ return tekrarBekleyenler(999).length; },
  zayifKonular: function(){ return zayifKonular(); },
  kayit: kayitGuncelle, ogrenCiz: ogrenCiz, seviye: seviyeCiz, rutbe: rutbeBul,
  hedefAyarla: function(n){ V.hedef = n; yaz(); seviyeCiz(); }
};

if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", acilis);
else acilis();
})();
