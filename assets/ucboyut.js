/* =====================================================================
   ÜSTAD KPSS — GERÇEK 3B KATMAN (WebGL / Three.js)
   · Derinlikli yıldız alanı (kameraya doğru akan 3B noktalar)
   · Dönen tel kafes cisimler (ikosahedron + torus düğümü)
   · Doğru cevapta ekranda kıvılcım, sınav sonunda gerçek fizikli konfeti
   · Tema renklerine göre kendini günceller · tema/ayar değişince yeniden kurulur
   WebGL yoksa sessizce kapanır, uygulama CSS animasyonlarıyla çalışmaya devam eder.
   ===================================================================== */
window.UC = (function(){
  "use strict";
  var A = {
    hazir:false, kapali:false, sahne:null, kamera:null, cizici:null,
    yildizlar:null, cisimler:[], parcalar:null, kivilcimlar:null,
    yogunluk:1, enerji:0, hedefEnerji:0, son:0, kare:0, fps:60, olcumBas:0,
    parcaSayi:0, konfetiAktif:false, kivilcimSayaci:0, yavasSayaci:0, baslamaZamani:0,
    renkAna:null, renkVurgu:null, genislik:0, yukseklik:0
  };
  var PARCA_SAY = 320, KIVILCIM_SAY = 400;

  function renkAl(ad, varsayilan){
    try{
      var v = getComputedStyle(document.documentElement).getPropertyValue(ad).trim();
      return v ? new THREE.Color(v) : new THREE.Color(varsayilan);
    }catch(e){ return new THREE.Color(varsayilan); }
  }
  function sayiAl(ad, varsayilan){
    try{ return parseFloat(getComputedStyle(document.body).getPropertyValue(ad)) || varsayilan; }
    catch(e){ return varsayilan; }
  }

  /* ---------- yıldız alanı ---------- */
  function yildizlariKur(){
    var n = Math.round(1400 * A.yogunluk);
    var konum = new Float32Array(n * 3), boyut = new Float32Array(n);
    for(var i = 0; i < n; i++){
      konum[i*3]   = (Math.random() - 0.5) * 260;
      konum[i*3+1] = (Math.random() - 0.5) * 260;
      konum[i*3+2] = -Math.random() * 320 + 40;
      boyut[i] = 0.6 + Math.random() * 2.4;
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(konum, 3));
    g.setAttribute("boyut", new THREE.BufferAttribute(boyut, 1));
    var m = new THREE.PointsMaterial({
      color: A.renkAna, size: 1.5, sizeAttenuation: true,
      transparent: true, opacity: 0.85, depthWrite: false
    });
    var p = new THREE.Points(g, m);
    p.frustumCulled = false;
    A.sahne.add(p);
    A.yildizlar = p;
  }

  /* ---------- dönen cisimler ---------- */
  function cisimKur(geometri, x, y, z, olcek, opaklik, kalinlik){
    var malzeme = new THREE.MeshBasicMaterial({
      color: A.renkVurgu, wireframe: true, transparent: true, opacity: opaklik,
      linewidth: kalinlik || 1
    });
    var c = new THREE.Mesh(geometri, malzeme);
    c.position.set(x, y, z);
    c.scale.setScalar(olcek);
    A.sahne.add(c);
    A.cisimler.push(c);
    return c;
  }
  function cisimleriKur(){
    if(window.innerWidth < 700){
      cisimKur(new THREE.IcosahedronGeometry(23, 1), -26, 10, -78, 1, 0.42);
      cisimKur(new THREE.TorusKnotGeometry(11, 3.4, 90, 12), 30, -14, -92, 1, 0.30);
    }else{
      cisimKur(new THREE.IcosahedronGeometry(19, 1), -19, 6, -62, 1, 0.40);
      cisimKur(new THREE.TorusKnotGeometry(9, 2.8, 110, 14), 21, -7, -74, 1, 0.32);
      cisimKur(new THREE.OctahedronGeometry(12, 0), 0, 14, -86, 1, 0.22);
    }
  }

  /* ---------- konfeti (gerçek fizik: hız, yer çekimi, sürtünme, dönme) ---------- */
  function konfetiKur(){
    var n = Math.round(PARCA_SAY * A.yogunluk);
    var konum = new Float32Array(n * 3), renk = new Float32Array(n * 3);
    var veri = [];
    var palet = [A.renkAna.clone(), A.renkVurgu.clone(),
                 new THREE.Color("#ffffff"), new THREE.Color("#f97316"), new THREE.Color("#22d3ee")];
    for(var i = 0; i < n; i++){
      konum[i*3] = 0; konum[i*3+1] = -999; konum[i*3+2] = -999;
      var c = palet[i % palet.length];
      renk[i*3] = c.r; renk[i*3+1] = c.g; renk[i*3+2] = c.b;
      veri.push({ hx:0, hy:0, hz:0, aktif:false });
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(konum, 3));
    g.setAttribute("color", new THREE.BufferAttribute(renk, 3));
    var m = new THREE.PointsMaterial({
      size: 1.7, sizeAttenuation: true, vertexColors: true,
      transparent: true, opacity: 0.96, depthWrite: false
    });
    var p = new THREE.Points(g, m);
    p.frustumCulled = false;
    A.sahne.add(p);
    A.parcalar = { noktalar:p, veri:veri, gecen:0, sure:4.6 };
    A.parcaSayi = n;
  }
  function konfetiPatlat(guc){
    if(!A.hazir || A.kapali || !A.parcalar) return;
    var p = A.parcalar, k = p.noktalar.geometry.attributes.position, v = p.veri;
    var guclu = guc === undefined ? 1 : guc;
    p.gecen = 0; p.sure = guclu > 1 ? 6.2 : 4.6; A.konfetiAktif = true;
    for(var i = 0; i < v.length; i++){
      var a = Math.random() * Math.PI * 2, b = Math.random() * Math.PI - Math.PI / 2;
      var hiz = (10 + Math.random() * 22) * guclu;
      v[i].aktif = true;
      v[i].hx = Math.cos(a) * Math.cos(b) * hiz;
      v[i].hy = Math.abs(Math.sin(b)) * hiz * 0.9 + 6 * guclu;
      v[i].hz = Math.sin(a) * Math.cos(b) * hiz * 0.55;
      v[i].sp = 0.55 + Math.random() * 0.9;
      k.setXYZ(i, (Math.random() - 0.5) * 10, -4 + Math.random() * 4, -26 + Math.random() * 14);
    }
    k.needsUpdate = true;
    A.hedefEnerji = Math.min(1, A.hedefEnerji + 0.75);
  }

  /* ---------- kıvılcım (doğru cevap) ---------- */
  function kivilcimKur(){
    var n = KIVILCIM_SAY;
    var konum = new Float32Array(n * 3), renk = new Float32Array(n * 3);
    for(var i = 0; i < n; i++){
      konum[i*3] = 0; konum[i*3+1] = -999; konum[i*3+2] = -999;
      renk[i*3] = 1; renk[i*3+1] = 0.82; renk[i*3+2] = 0.28;
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(konum, 3));
    g.setAttribute("color", new THREE.BufferAttribute(renk, 3));
    var m = new THREE.PointsMaterial({ size: 1.2, sizeAttenuation:true, vertexColors:true,
      transparent:true, opacity:0.98, depthWrite:false, blending:THREE.AdditiveBlending });
    var p = new THREE.Points(g, m); p.frustumCulled = false; A.sahne.add(p);
    A.kivilcimlar = { noktalar:p, aktif:[], gecen:0 };
  }
  function kivilcim(x, y, tur){
    if(!A.hazir || A.kapali || !A.kivilcimlar) return;
    var k = A.kivilcimlar, pos = k.noktalar.geometry.attributes.position;
    var dunya = ekranDunya(x, y, -22);
    var renkler = tur === "yanlis" ? [new THREE.Color("#ef4444"), new THREE.Color("#f97316")]
                                   : [A.renkAna.clone(), new THREE.Color("#ffffff"), A.renkVurgu.clone()];
    for(var i = 0; i < 26; i++){
      var idx = k.aktif.length % KIVILCIM_SAY;
      var c = renkler[i % renkler.length];
      k.noktalar.geometry.attributes.color.setXYZ(idx, c.r, c.g, c.b);
      pos.setXYZ(idx, dunya.x, dunya.y, dunya.z);
      k.aktif.push({ i:idx, hx:(Math.random()-0.5)*26, hy:(Math.random()-0.3)*22, hz:(Math.random()-0.5)*10, t:0, omur:0.75 + Math.random()*0.5 });
    }
    k.noktalar.geometry.attributes.color.needsUpdate = true;
    A.hedefEnerji = Math.min(1, A.hedefEnerji + (tur === "yanlis" ? -0.25 : 0.22));
  }
  /* ekran koordinatını (px) sahne düzlemine çevirir */
  function ekranDunya(x, y, z){
    var fov = A.kamera.fov * Math.PI / 180;
    var yuk = 2 * Math.tan(fov / 2) * Math.abs(z);
    var gen = yuk * A.kamera.aspect;
    return { x: (x / window.innerWidth - 0.5) * gen, y: -(y / window.innerHeight - 0.5) * yuk, z: z };
  }

  /* ---------- tema renkleri ---------- */
  function renkleriTazele(){
    A.renkAna = renkAl("--ana", "#b8860b");
    A.renkVurgu = renkAl("--vurgu", "#0f766e");
    if(A.yildizlar) A.yildizlar.material.color = A.renkAna;
    for(var i = 0; i < A.cisimler.length; i++) A.cisimler[i].material.color = A.renkVurgu;
    if(A.parcalar){
      var palet = [A.renkAna, A.renkVurgu, new THREE.Color("#ffffff"),
                   new THREE.Color("#f97316"), new THREE.Color("#22d3ee")];
      var renk = A.parcalar.noktalar.geometry.attributes.color;
      for(var j = 0; j < renk.count; j++){
        var c = palet[j % palet.length];
        renk.setXYZ(j, c.r, c.g, c.b);
      }
      renk.needsUpdate = true;
    }
  }

  /* ---------- kurulum ---------- */
  function kur(){
    if(A.hazir || A.kapali) return A.hazir;
    if(typeof THREE === "undefined" || !window.WebGLRenderingContext){ A.kapali = true; return false; }
    try{
      A.cizici = new THREE.WebGLRenderer({ alpha:true, antialias:false, powerPreference:"low-power" });
    }catch(e){ A.kapali = true; return false; }
    A.cizici.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1));
    A.cizici.setSize(window.innerWidth, window.innerHeight);
    A.cizici.setClearColor(0x000000, 0);
    var kutu = A.cizici.domElement;
    kutu.id = "ucBoyut"; kutu.setAttribute("aria-hidden", "true");
    document.body.insertBefore(kutu, document.body.firstChild);
    A.kamera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 900);
    A.kamera.position.set(0, 0, 44);
    A.sahne = new THREE.Scene();
    A.genislik = window.innerWidth; A.yukseklik = window.innerHeight;
    renkleriTazele();
    yildizlariKur(); cisimleriKur(); konfetiKur(); kivilcimKur();
    A.hazir = true; A.son = performance.now(); A.olcumBas = A.son;
    A.baslamaZamani = A.son; A.yavasSayaci = 0;
    window.addEventListener("resize", boyutla);
    document.addEventListener("visibilitychange", function(){
      if(document.hidden) A.son = 0; else A.son = performance.now();
    });
    istekKare();
    return true;
  }
  function boyutla(){
    if(!A.hazir) return;
    A.camera && A.kamera.aspect && (A.kamera.aspect = window.innerWidth / window.innerHeight, A.kamera.updateProjectionMatrix());
    A.cizici.setSize(window.innerWidth, window.innerHeight);
    A.genislik = window.innerWidth; A.yukseklik = window.innerHeight;
  }
  function istekKare(){ if(!A.kapali) requestAnimationFrame(kare); }

  /* ---------- ana döngü ---------- */
  function kare(t){
    istekKare();
    if(!A.hazir) return;
    var g = A.son ? Math.min(0.05, (t - A.son) / 1000) : 0;
    A.son = t;
    if(g <= 0) return;
    var dt = g * 60;                        /* 60 kareye göre normalize adım */
    A.enerji += (A.hedefEnerji - A.enerji) * Math.min(1, 0.06 * dt);

    /* yıldız alanı: kameraya doğru akış */
    if(A.yildizlar){
      var pos = A.yildizlar.geometry.attributes.position;
      var hiz = (0.55 + A.enerji * 1.6) * dt;
      for(var i = 0; i < pos.count; i++){
        var z = pos.getZ(i) + hiz;
        if(z > 46){ z -= 366; pos.setX(i, (Math.random() - 0.5) * 260); pos.setY(i, (Math.random() - 0.5) * 260); }
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      A.yildizlar.rotation.z += 0.0004 * dt * (1 + A.enerji);
    }
    /* cisimler */
    for(var c = 0; c < A.cisimler.length; c++){
      var o = A.cisimler[c];
      o.rotation.x += 0.0022 * dt * (0.6 + A.enerji * 1.8);
      o.rotation.y += 0.0030 * dt * (0.6 + A.enerji * 1.8);
      o.material.opacity = 0.20 + 0.30 * A.enerji + 0.12 * Math.sin(t / 900 + c);
    }
    /* konfeti */
    if(A.parcalar && A.parcalar.gecen < A.parcalar.sure){
      var p = A.parcalar, k2 = p.noktalar.geometry.attributes.position, v = p.veri;
      p.gecen += g;
      for(var j = 0; j < v.length; j++){
        if(!v[j].aktif) continue;
        v[j].hy -= 0.42 * dt;                       /* yer çekimi */
        v[j].hx *= (1 - 0.012 * dt);                /* hava sürtünmesi */
        v[j].hy *= (1 - 0.006 * dt);
        v[j].hz *= (1 - 0.012 * dt);
        k2.setXYZ(j,
          k2.getX(j) + v[j].hx * g * 0.6,
          k2.getY(j) + v[j].hy * g * 0.6,
          k2.getZ(j) + v[j].hz * g * 0.6);
      }
      k2.needsUpdate = true;
      if(p.gecen >= p.sure) A.konfetiAktif = false;
      var bit = Math.max(0, 1 - p.gecen / p.sure);
      p.noktalar.material.opacity = 0.25 + 0.75 * bit;
    }
    /* kıvılcımlar */
    if(A.kivilcimlar && A.kivilcimlar.aktif.length){
      var kv = A.kivilcimlar, k3 = kv.noktalar.geometry.attributes.position, yeni = [];
      for(var q = 0; q < kv.aktif.length; q++){
        var s = kv.aktif[q];
        s.t += g;
        if(s.t >= s.omur){ k3.setXYZ(s.i, 0, -999, -999); continue; }
        s.hy -= 0.55 * dt;
        k3.setXYZ(s.i, k3.getX(s.i) + s.hx * g, k3.getY(s.i) + s.hy * g, k3.getZ(s.i) + s.hz * g);
        yeni.push(s);
      }
      kv.aktif = yeni;
      k3.needsUpdate = true;
    }
    /* enerji sönümü */
    A.hedefEnerji *= (1 - 0.004 * dt);

    /* kare hızı denetimi: çok yavaşsa yoğunluğu düşür, gerekirse 3B'yi kapat */
    A.kare++;
    if(t - A.olcumBas > 1500){
      A.fps = A.kare * 1000 / (t - A.olcumBas);
      var isinma = (t - A.baslamaZamani) < 4500;      /* ilk saniyeler yavaş olabilir */
      if(!isinma && A.fps < 24 && A.yogunluk > 0.34){ A.yogunluk = 0.34; yenidenKur(); }
      else if(!isinma && A.fps < 12){
        A.yavasSayaci++;
        if(A.yavasSayaci >= 2){ kapat(); return; }        /* iki ölçüm üst üste çok yavaşsa kapat */
      }else A.yavasSayaci = 0;
      A.kare = 0; A.olcumBas = t;
    }
    A.kamera.position.x = Math.sin(t / 5200) * 3.2;
    A.kamera.position.y = Math.cos(t / 6400) * 2.2;
    A.kamera.lookAt(0, 0, -60);
    A.cizici.render(A.sahne, A.kamera);
  }

  function yenidenKur(){
    if(!A.hazir) return;
    temizle(false);
    A.hazir = false;
    kur();
  }
  function temizle(tam){
    try{
      if(A.sahne){
        for(var i = A.sahne.children.length - 1; i >= 0; i--){
          var o = A.sahne.children[i];
          A.sahne.remove(o);
          if(o.geometry) o.geometry.dispose();
          if(o.material) o.material.dispose();
        }
      }
      A.yildizlar = null; A.parcalar = null; A.kivilcimlar = null; A.cisimler = [];
      if(tam && A.cizici){
        var d = A.cizici.domElement;
        if(d && d.parentNode) d.parentNode.removeChild(d);
        A.cizici.dispose(); A.cizici = null; A.hazir = false;
      }
    }catch(e){}
  }
  function kapat(){ A.kapali = true; temizle(true); }

  /* ---------- dışa açılan yüz ---------- */
  return {
    baslat: function(ayar){
      /* ayar: "bol" | "normal" | "sade" */
      if(ayar === "sade"){ kapat(); return false; }
      A.yogunluk = ayar === "normal" ? 0.6 : 1;
      A.kapali = false; A.yavasSayaci = 0;                /* cihaza ikinci şans */
      if(A.hazir){ renkleriTazele(); return true; }
      return kur();
    },
    tema: function(){
      if(A.hazir) renkleriTazele();
      else { A.kapali = false; A.yavasSayaci = 0; kur(); }
    },
    kutlama: function(guc){ konfetiPatlat(guc); },
    kivilcim: function(x, y, tur){ A.kivilcimSayaci++; kivilcim(x, y, tur); },
    enerjiVer: function(deger){ A.hedefEnerji = Math.max(0, Math.min(1, deger)); },
    durum: function(){
      return { hazir:A.hazir, kapali:A.kapali, yogunluk:A.yogunluk, fps:Math.round(A.fps),
               enerji:Number(A.enerji.toFixed(3)), yildiz:A.yildizlar ? A.yildizlar.geometry.attributes.position.count : 0,
               cisim:A.cisimler.length, konfeti:A.parcaSayi, konfetiAktif:A.konfetiAktif,
               kivilcimAktif:A.kivilcimlar ? A.kivilcimlar.aktif.length : 0, kivilcimSayaci:A.kivilcimSayaci };
    }
  };
})();
