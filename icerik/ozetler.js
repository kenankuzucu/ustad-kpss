/* =====================================================================
   ÜSTAD KPSS — KONU ÖZETLERİ
   Sınav odaklı kısa notlar. Kalın yerler sınavda en çok sorulan noktalar.
   ===================================================================== */
window.OZETLER = {
sinavBilgi: "KPSS iki aşamalı bir sistemdir: Genel Yetenek-Genel Kültür oturumları her aday için ortaktır; " +
  "uzmanlık (A grubu) kadroları için ayrıca alan bilgisi oturumları yapılır. Müfettişlik, uzman yardımcılığı ve " +
  "denetmenlik kadroları A grubundandır ve alan dersleri (İktisat, Maliye, Hukuk, İşletme, Muhasebe, Kamu Yönetimi, " +
  "Çalışma Ekonomisi, Ekonometri, Uluslararası İlişkiler) bu oturumlarda sorulur. Sınav tarihleri, konu dağılımı ve " +
  "puan türleri her yıl ÖSYM'nin kılavuzunda yayımlanır; başvuru öncesi güncel kılavuzu mutlaka oku. " +
  "Çalışma sırası olarak şu yol verimlidir: (1) genel kültür-yetenek temeli, (2) alan derslerinde konu bitirme, " +
  "(3) deneme sınavlarıyla hız ve hata analizi, (4) yanlış defterini haftalık tekrar.",
kaynaklar: [
  { ad: "ÖSYM — çıkmış soru kitapçıkları ve cevap anahtarları (resmî, ücretsiz)", adres: "https://www.osym.gov.tr/TR,8797/cikmis-sorular.html" },
  { ad: "ÖSYM — KPSS sınav kılavuzları ve konu dağılımı", adres: "https://www.osym.gov.tr/TR,8772/kpss.html" },
  { ad: "Mevzuat Bilgi Sistemi — kanun ve yönetmelik metinleri (Anayasa, VUK, TCMB Kanunu…)", adres: "https://www.mevzuat.gov.tr" },
  { ad: "TÜİK — ekonomi ve nüfus istatistikleri", adres: "https://data.tuik.gov.tr" },
  { ad: "TCMB — para politikası ve enflasyon raporları", adres: "https://www.tcmb.gov.tr" }
],
liste: [
{
  ad: "Türkçe", renk: "#1d4ed8",
  ipucu: "Paragraf soruları KPSS Türkçe'nin yarısına yakınıdır. Soruyu okumadan önce şıkları oku, sorunun ne istediğini (ana fikir, yanlış çıkarım, akışı bozan cümle) işaretle; sonra paragrafa dön.",
  bloklar: [
    { baslik: "Sözcük ve cümlede anlam", maddeler: [
      "Gerçek anlam (temel), <b>yan anlam</b> (yakıştırma/mecaz) ve <b>mecaz anlam</b> ayrımı sık sorulur: “sıcak karşılama” mecaz, “sıcak çay” gerçek.",
      "Deyim aktarması (insandan doğaya, doğadan insana): “dağın eteği”, “kurtlar sofrası”.",
      "Cümlede anlam ilişkileri: neden-sonuç, amaç-sonuç, koşul (şart), karşıtlık, karşılaştırma, tanım cümlesi.",
      "Öznellik-nesnellik: kanıtlanabilir ifade nesnel; kişisel yorum, beğeni, olasılık öznel. “Bence, kanımca, sanki, adeta” gibi sözcükler cümleyi öznel yapar.",
      "Neden-sonuç ile amaç-sonuç farkı: amaç-sonuç cümlesinde “için, amacıyla, diye” vardır ve yapılan iş, henüz gerçekleşmemiş bir amaca yöneliktir."
    ]},
    { baslik: "Paragraf", maddeler: [
      "Ana fikir: paragrafın tamamını kapsayan yargı. Konu “ne anlatılıyor”, ana fikir “yazar ne demek istiyor” sorusunun cevabıdır.",
      "Yardımcı fikir: ana fikri örnek, kanıt, karşılaştırma ile destekleyen cümleler.",
      "Akışı bozan cümle: anlamca ve konu bağlantısıyla diğerlerinden kopan cümledir; başlık ve zamir bağlantısına bak.",
      "Paragraf oluşturma sıralaması: <b>ilk cümle</b> genelde tanım ya da giriş niteliğindedir; bağlaçlar (ama, ancak, bu yüzden, oysa) sıralamada kılavuzdur; “bu, o, öyleyse” gibi göndermeler kendinden önceki cümleye bağlanır."
    ]},
    { baslik: "Yazım ve noktalama", maddeler: [
      "Düzeltme işareti: “hâlâ, kâr, âdet”; “şapkalı” gibi yazım yanlışları sık çeldiricidir.",
      "Ki/da/de ayrı mı bitişik mi: “de/da” bağlaç ise <b>ayrı</b>, hâl eki ise <b>bitişik</b>. “ki” bağlaç ise ayrı, ekleşmişse bitişik (belki, mademki, oysaki).",
      "Nokta: tamamlanmış cümle sonu, kısaltmalar, tarih ve saat yazımı, sıra bildiren sayılar. Kesme işareti (') özel adlara ek ayrımında; ancak kurum, kuruluş ve işletme adlarına gelen çekim ekleri <b>kesmeyle ayrılmaz</b> (Türk Dil Kurumuna).",
      "Yazımı karıştırılan sözcükler: her şey (ayrı), hiçbir (bitişik), pekâlâ, yalnız, maalesef, birçok, birtakım.",
      "Sayıların yazımı: cümle içinde tek başına kullanılan küçük sayılar yazıyla; kesirli ve büyük sayılar rakamla; “üçü, beşer” gibi çekimler yazıyla."
    ]},
    { baslik: "Dil bilgisi", maddeler: [
      "Sözcük türleri: isim, sıfat, zamir, zarf, edat, bağlaç, ünlem, fiil, fiilimsi (isim-fiil, sıfat-fiil, zarf-fiil).",
      "Yapısına göre sözcükler: basit, türemiş, birleşik; yapısına göre fiiller: basit, türemiş, birleşik.",
      "Fiil çatısı: öznesine göre etken-edilgen (dönüşlü, işteş), nesnesine göre geçişli-geçişsiz (oldurgan, ettirgen).",
      "Cümlenin ögeleri: yüklem, özne, nesne (belirtili-belirtisiz), dolaylı tümleç, zarf tümleci, edat tümleci. Önce yüklem bulunur.",
      "Cümle çeşitleri: yapısına göre (basit, birleşik, sıralı, bağlı), yüklemin türüne göre (fiil, isim), yüklemin yerine göre (kurallı, devrik)."
    ]},
    { baslik: "Anlatım bozuklukları", maddeler: [
      "Gereksiz sözcük kullanımı ve anlam belirsizliği en sık çıkan iki başlıktır.",
      "Öge eksikliği: nesne, dolaylı tümleç veya özne eksikliği; özellikle sıralı cümlelerde <b>ortak öge yanlış kullanımı</b>.",
      "Tamlayan/tamlanan eksikliği ve tamlama yanlışları: “ekonomik ve sosyal haklarımız” gibi ortak tamlanan hataları.",
      "Çatı uyuşmazlığı: aynı yükleme bağlanan birden çok öznenin etken-edilgen bakımından uyumsuzluğu.",
      "Mantık hataları: ölçü birimi yanlışlığı, sıralama hatası, karşıtlık kullanımı hataları."
    ]}
  ]
},
{
  ad: "Matematik", renk: "#0f766e",
  ipucu: "KPSS matematik soruları işlem hızı ölçer. Uzun çözüm yerine pratik kural ve değer verme (şıktan gitme) tekniğini kullan; her soru için hedef 60-75 saniyedir.",
  bloklar: [
    { baslik: "Sayılar ve bölme", maddeler: [
      "Asal sayılar, aralarında asal sayılar, en büyük ortak bölen (<b>EBOB</b>) ve en küçük ortak kat (<b>EKOK</b>) ilişkisi: iki sayının çarpımı = EBOB × EKOK.",
      "Basamak çözümlemesi: iki/üç basamaklı sayıyı 10a+b biçiminde yazıp denklem kurmak, sayı sorularının anahtarıdır.",
      "Bölünebilme: 3 ve 9 için rakamlar toplamı, 4 için son iki basamak, 8 için son üç basamak, 11 için “+ - + -” toplamı.",
      "Faktöriyel ve ardışık sayı toplamları: ardışık sayı toplamı = terim sayısı × (ilk + son) / 2.",
      "Birler basamağı ve kalan bulma sorularında sıklıkla <b>periyot</b> (devir) mantığı kullanılır."
    ]},
    { baslik: "Oran, yüzde, problemler", maddeler: [
      "Yüzde problemleri: artıştan sonra azalış ters yönde eşit yüzdede dengeyi sağlamaz (100’den 20 azalma farklıdır).",
      "Kar-zarar: satış = maliyet × (1 ± oran); indirimli fiyat üzerinden ikinci indirim, <b>çarpımsal</b> uygulanır.",
      "Karışım: karışımdaki madde miktarı korunur; “saf madde denklemi” kurulur.",
      "İşçi-havuz: birim zamanda yapılan iş toplanır; birlikte süre 1/t1 + 1/t2 = 1/t.",
      "Hareket: yol = hız × zaman; aynı yönde giden araçlarda <b>hız farkı</b>, zıt yönde <b>hız toplamı</b> kullanılır; köprü/tünel sorularında trenin boyu eklenir."
    ]},
    { baslik: "Cebir, kümeler, fonksiyon", maddeler: [
      "Özdeşlikler: (a±b)², a²−b², (a+b)³ — çarpanlara ayırmada temel araçtır.",
      "Birinci dereceden denklem ve eşitsizliklerde mutlak değer: |x−a| = b ise x = a±b.",
      "Kümeler: birleşim ve kesişim için s(A∪B) = s(A) + s(B) − s(A∩B); <b>en az/en çok</b> sorularında Venn şeması en hızlı yol.",
      "Fonksiyonlarda bileşke ve ters fonksiyon; tanım kümesi kısıtları (bölümün sıfır olmaması, karekökün negatif olmaması)."
    ]},
    { baslik: "Olasılık, istatistik, geometri", maddeler: [
      "Olasılık = istenen durum / tüm durumlar; “en az bir” sorularında <b>tümleyen</b> kullanmak kısa yoldur.",
      "Aritmetik ortalama, medyan, mod ve açıklık; veriye eklenen yeni değerin ortalamayı nasıl değiştirdiği sık sorulur.",
      "Üçgende açı ve uzunluk bağıntıları, <b>Pisagor</b> ve özel üçgenler (3-4-5, 5-12-13, 30-60-90, 45-45-90).",
      "Dörtgenler: paralelkenar, eşkenar dörtgen, yamuk alan formülleri; benzerlik oranının <b>kare</b> alan oranı verdiği unutulmamalı.",
      "Çember: merkez açı-çevre açı ilişkisi ve teğet-kiriş özellikleri; daire alanı ve çevresi."
    ]}
  ]
},
{
  ad: "Tarih", renk: "#b91c1c",
  ipucu: "Tarih sorularında sıralama ve eşleştirme hâkimdir: antlaşma-yıl, padişah-dönem, ıslahat-alan üçlüsünü tablo hâlinde çalış. Kronolojiyi karıştıran aday, doğru bilgiyle bile yanlış şıkka gider.",
  bloklar: [
    { baslik: "Osmanlı: kuruluş ve yükselme", maddeler: [
      "Osmanlı Devleti'nin kuruluşunda <b>Bizans'ın zayıflığı</b>, Anadolu Selçuklu'nun yıkılışı ve uç beyliklerinin gaza anlayışı etkili olmuştur.",
      "İskân (şenlendirme) politikası: fethedilen bölgelerin Türkleşmesi ve İslamlaşması amaçlanmıştır.",
      "Devşirme ve kapıkulu sistemi, merkezî otoriteyi güçlendiren kurumlardır; tımar sistemi hem üretimi hem askerliği düzenler.",
      "Yükselme dönemi sınır genişlemesi: Rumeli'ye geçiş, İstanbul'un fethi, Doğu ve Batı yönlü seferler; denizlerde de üstünlük kurulmuştur.",
      "Fatih döneminde merkezîleşme ve kanunnâmeler; Yavuz döneminde Doğu politikası ve halifeliğin Osmanlı'ya geçişi (Mısır seferi sonrası)."
    ]},
    { baslik: "Duraklama, gerileme, dağılma", maddeler: [
      "Duraklama döneminin iç nedenleri arasında <b>doğal sınırlara ulaşılması</b>, tımar bozulması, coğrafi keşifler ve deniz ticaretinin el değiştirmesi vardır.",
      "Islahat çabaları iki kolda ilerler: <b>batılılaşma</b> (askeri-teknik) ve <b>merkezîleşme</b> (Lale Devri, Nizam-ı Cedit, Sekban-ı Cedit).",
      "Sened-i İttifak (1808) ayanlarla imzalanan belge; Tanzimat Fermanı (1839) hukuk ve vergi alanında düzenleme; Islahat Fermanı (1856) gayrimüslimlere yönelik haklar.",
      "I. ve II. Meşrutiyet: Kanun-i Esasi ile anayasal düzene geçiş, meclisin açılması ve kapatılması süreçleri.",
      "Osmanlı'nın dağılmasında milliyetçilik akımları, kaybedilen savaşlar ve azınlık isyanları etkili olmuştur; Osmanlıcılık, İslamcılık, Türkçülük ve Batıcılık akımları bu dönemde gündeme gelmiştir."
    ]},
    { baslik: "Kurtuluş Savaşı", maddeler: [
      "Hazırlık dönemi: Kongrelerle <b>millî irade</b> merkezli yönetim anlayışı benimsenir; Amasya Genelgesi'nde milletin bağımsızlığını yine milletin azim ve kararının kurtaracağı belirtilir.",
      "Son Osmanlı Mebusan Meclisi'nde Misak-ı Millî kabul edilir; bu karar Anadolu'da millî sınırların ilanıdır.",
      "Cepheler: Doğu (Ermenistan ile ilişkiler, Gümrü Antlaşması), Güney (Kuvâ-yı Milliye direnişi), Batı (I. ve II. İnönü, Sakarya, Büyük Taarruz).",
      "Sakarya Savaşı sonrası Fransa ile Ankara Antlaşması imzalanır; bu, diplomatik üstünlüğün göstergesidir.",
      "Mudanya Ateşkesi askerî süreci bitirir, Lozan Antlaşması siyasi sonucu belirler; kapitülasyonlar kaldırılır, sınırlar büyük ölçüde Misak-ı Millî'ye göre çizilir."
    ]},
    { baslik: "Cumhuriyet dönemi", maddeler: [
      "Saltanatın kaldırılması (1922) ve cumhuriyetin ilanı (1923) ile rejim değişir; halifelik 1924'te kaldırılır.",
      "Hukuk alanında <b>Medeni Kanun</b> (1926) ile laik hukuk düzeni kurulur; eğitimde Tevhid-i Tedrisat Kanunu tek çatı altında birleştirir.",
      "Ekonomide İzmir İktisat Kongresi (1923) ile karma ekonomi ilkeleri esas alınır; 1929 sonrası devletçilik öne çıkar.",
      "Çok partili hayata geçiş denemeleri ve tek parti dönemi sonrası 1946 ve 1950 seçimleri.",
      "Atatürk ilkeleri: cumhuriyetçilik, milliyetçilik, halkçılık, devletçilik, laiklik, inkılapçılık — bütünleyici ilkelerle (millî egemenlik, millî birlik, çağdaşlaşma, insan ve insanlık sevgisi) birlikte çalışılmalıdır."
    ]}
  ]
},
{
  ad: "Coğrafya", renk: "#15803d",
  ipucu: "Coğrafyada “neden-sonuç” zinciri kur: yer şekli → iklim → tarım → nüfus. Harita sorularında önce güney-kuzey, denizden yükseklik ve yağış rejimini göz önünde tut.",
  bloklar: [
    { baslik: "Yer şekilleri ve iklim", maddeler: [
      "Türkiye'nin yer şekilleri genç, kırılmalı ve engebelidir; Kuzey Anadolu ve Toroslar <b>kıvrım dağları</b>, Ege bölgesi <b>kırılma (graben)</b> ovalarıdır.",
      "Karadeniz iklimi her mevsim yağışlı, Akdeniz iklimi yazları sıcak-kurak, karasal iklim kışı soğuk ve yağış rejimi düzensizdir.",
      "Sıcaklık dağılışını etkileyen faktörler: enlem, yükselti, denizellik, bakı, karasallık.",
      "Yer altı suları, karst (kalkerli) şekiller (mağara, obruk, polye, lapya) ve Türkiye'nin önemli ovaları."
    ]},
    { baslik: "Su, toprak, bitki", maddeler: [
      "Akarsu rejimi iklime bağlıdır: Karadeniz akarsuları düzenli, Akdeniz akarsuları düzensiz rejimlidir.",
      "Türkiye'nin en büyük gölü <b>Van Gölü</b> (sodalı), en büyük baraj gölü Atatürk Barajı'dır.",
      "Toprak türleri: zonal (klimatik), azonal (taşınmış) ve intrazonal; çernezyom Karadeniz'in yüksek kesimlerinde, laterit tropikal kuşakta görülür.",
      "Bitki örtüsü yükseltiye ve yağışa göre kuşaklar oluşturur; maki Akdeniz ikliminin, step karasal iklimin göstergesidir."
    ]},
    { baslik: "Ekonomik coğrafya", maddeler: [
      "Tarım ürünlerinin dağılışı iklime bağlıdır: çay-fındık Karadeniz, pamuk-turunçgil Akdeniz, buğday-şeker pancarı İç Anadolu.",
      "Madenler: bor mineralleri (dünya rezervinde öne çıkar), krom, bakır, alüminyum (boksit), taş kömürü ve linyit.",
      "Enerji: hidroelektrik potansiyeli yüksek, güneş ve rüzgâr enerjisi son yıllarda artan paya sahiptir.",
      "Sanayi yer seçimini hammadde, enerji, ulaşım, pazar ve iş gücü belirler; organize sanayi bölgeleri bu mantığın ürünüdür.",
      "Ulaşımda boğazlar ve limanlar dış ticarette stratejiktir; turizm gelirinde kültür ve deniz turizmi öne çıkar."
    ]},
    { baslik: "Nüfus ve yerleşme", maddeler: [
      "Nüfus yoğunluğu kıyılarda ve sanayi bölgelerinde yüksek, yüksek ve engebeli iç kesimlerde düşüktür.",
      "Kır-kent nüfus oranı kent lehine değişmiştir; göçün itici nedenleri işsizlik, arazinin yetersizliği, çekici nedenleri iş ve eğitim olanaklarıdır.",
      "Nüfus piramidi biçimi (taban genişliği, tepe genişliği) nüfusun yaş yapısını ve doğurganlık eğilimini gösterir.",
      "Yerleşme dokusu: toplu, dağınık ve gevşek; konut tipini iklim ve yer şekli belirler."
    ]}
  ]
},
{
  ad: "Vatandaşlık ve Anayasa", renk: "#6d28d9",
  ipucu: "Anayasa sorularında madde numarası değil <b>rejim mantığı</b> sorulur. Temel hak-sınırlama-durdurma üçlüsünü, kuvvetler ayrımını ve yargı denetimini şema hâlinde çiz; madde numaralarını sonra ezberle.",
  bloklar: [
    { baslik: "Temel kavramlar", maddeler: [
      "Devletin temel unsurları: toprak, millet, egemenlik; anayasa hukuku açısından devlet biçimi (monarşi-cumhuriyet) ve yönetim biçimi (üniter-federal) ayrı sorulur.",
      "1982 Anayasası'na göre Türkiye Cumhuriyeti <b>başlangıç</b> hükümleri ve genel esaslarla tanımlanır; devletin şekli cumhuriyettir ve bu madde <b>değiştirilemez</b>.",
      "Hukukun kaynakları: yazılı (anayasa, kanun, tüzük, yönetmelik), yazısız (örf-adet) ve yardımcı (içtihat, doktrin).",
      "Kamu hukuku-özel hukuk ayrımı: kamu hukukunda devlet üstün irade sahibidir; anayasa, idare, ceza, vergi hukuku kamu hukukudur.",
      "Hak-ehliyet ayrımı: <b>hak ehliyeti</b> herkes için eşittir, <b>fiil ehliyeti</b> yaş, ayırt etme gücü ve kısıtlılığa bağlıdır."
    ]},
    { baslik: "Temel hak ve ödevler", maddeler: [
      "Temel hak ve hürriyetlerin sınırlandırılması (m.13): ancak <b>kanunla</b>, Anayasa'nın ilgili maddesindeki özel sebeplerle, özüne dokunmadan, ölçülülük ilkesine uygun olarak sınırlanabilir.",
      "Temel hak ve hürriyetlerin kötüye kullanılmasının yasaklanması (m.14) ve savaş, seferberlik, olağanüstü hâllerde durdurulma rejimi (m.15): durdurulsa bile <b>savaş hukukuna uygun fiiller</b> hariç, kişinin yaşam hakkına, maddi-manevi varlığının bütünlüğüne dokunulamaz; kimse din, vicdan, düşünce ve kanaatlerini açıklamaya zorlanamaz.",
      "Kişi hakları: kişi dokunulmazlığı, özel hayatın gizliliği, konut dokunulmazlığı, haberleşme hürriyeti, yerleşme ve seyahat hürriyeti, mülkiyet hakkı.",
      "Sosyal ve ekonomik haklar: çalışma hakkı, sendika hakkı, sağlık, eğitim, sosyal güvenlik hakları; devlete <b>olumlu edim</b> yükler.",
      "Siyasi haklar: seçme-seçilme, siyasi parti kurma, kamu hizmetlerine girme, dilekçe ve bilgi edinme hakkı."
    ]},
    { baslik: "Yasama, yürütme, yargı", maddeler: [
      "Yasama yetkisi millet adına TBMM'ye aittir ve <b>devredilemez</b>; kanun teklifi milletvekilleri, kanun tasarısı Cumhurbaşkanlığı tarafından verilir.",
      "TBMM seçimleri beş yılda bir yapılır; seçme hakkı 18 yaşını dolduran Türk vatandaşları içindir; milletvekilliği ile bağdaşmayan işler kanunla belirlenir.",
      "Yürütme yetkisi ve görevi Cumhurbaşkanına aittir; Cumhurbaşkanı devletin başıdır, kanunları veto edebilir (geri gönderme) ve Anayasa değişikliklerini gerekli görürse halk oylamasına sunabilir.",
      "Olağanüstü hâl ilanı, Cumhurbaşkanlığı kararnamesi (Cumhurbaşkanı kararnameleri kanun varsa o konuda düzenleme yapamaz; temel haklar sınırlandırılamaz) başlıkları son dönemde sık sorulur.",
      "Yargı: Anayasa Mahkemesi kanunların ve Cumhurbaşkanlığı kararnamelerinin Anayasa'ya uygunluğunu denetler (şekil denetimi ayrı); yürütme işlemlerinin yargı denetimi <b>idari yargı</b> tarafından yapılır.",
      "Anayasa Mahkemesi norm denetimi, bireysel başvuru, siyasi partilerin malî denetimi ve Yüce Divan sıfatıyla yargılama görevlerini yürütür."
    ]},
    { baslik: "İdare hukuku ilkeleri", maddeler: [
      "İdarenin bütünlüğü ilkesi iki araçla işler: <b>hiyerarşi</b> ve <b>idari vesayet</b> (yerinden yönetim kuruluşları üzerinde).",
      "İdari işlemlerin unsurları: yetki, şekil, sebep, konu, maksat; unsurlardan birinin sakatlığı iptal davasının konusudur.",
      "İdari eylem ve işlemlerin yargı denetimine kapalılığı sınırlıdır: Cumhurbaşkanının tek başına yapacağı işlemler ve Yüksek Askerî Şûra kararlarının bir kısmı yargı denetimi dışındadır.",
      "İdari yargıda iptal ve tam yargı (tazminat) davaları; dava açma süreleri ve idareye başvurunun (zarf/ihtar) süreyi durdurması dikkat ister.",
      "Kamu görevlileri rejimi: sınıflar, asli-memur tanımı, disiplin cezaları ve <b>savunma hakkı</b>, kamu hizmetine girme şartları (liyakat ilkesi).",
      "Kamu malları (kamusal mallar) üzerinde haciz uygulanamaz; kamu hizmetinin sürekliliği ve değişkenliği ilkeleri Malî sorumluluğu da şekillendirir."
    ]},
    { baslik: "Güncel bilgiler", maddeler: [
      "Türkiye'nin yönetim yapısı ve bakanlıkların temel görev alanları; kurum kısaltmalarını (TÜİK, TCMB, MEB, YÖK…) açılımıyla birlikte öğren.",
      "Uluslararası kuruluşların kısa adları ve merkezleri: BM (New York), NATO (Brüksel), IMF ve Dünya Bankası (Washington), DTÖ (Cenevre), UNESCO (Paris).",
      "Türkiye'nin taraf olduğu öne çıkan sözleşmeler ve Türkiye'nin üyesi olduğu uluslararası kuruluşlar.",
      "Önemli ödüller, uluslararası gün ve yıllar, Türkiye'nin uzay ve teknoloji programları gibi süreli başlıklar; bu tür sorular için sınav öncesi kısa bir güncel özet taraması yeterlidir."
    ]}
  ]
},
{
  ad: "İktisat", renk: "#c2410c",
  ipucu: "İktisatta doğru cevap genellikle <b>mekanizma</b> sorusudur: “değişken artarsa ne olur?”. Grafik okumayı ve okların yönünü kur; soruların yarısı yön sorusudur.",
  bloklar: [
    { baslik: "Temel kavramlar ve arz-talep", maddeler: [
      "Kıtlık ve <b>fırsat maliyeti</b>: bir seçim yapıldığında vazgeçilen en iyi alternatifin değeri; üretim imkânları eğrisi bunun grafiğidir.",
      "Talep kanunu: fiyat artınca talep edilen miktar azalır. <b>Talep kayması</b> (gelir, zevk, beklenti, ilgili mal fiyatı) ile <b>miktar değişmesi</b> (malın kendi fiyatı) farklı olgulardır.",
      "İkame ve tamamlayıcı mallar; normal, düşük (lüks), zorunlu mal ayrımı.",
      "Esneklik: fiyat esnekliği |E| > 1 esnek, < 1 esnek değil; esnek talepte fiyat indirimi toplam hasılatı <b>artırır</b>.",
      "Tavan fiyat ve taban fiyat müdahalelerinin yarattığı kıtlık/arz fazlası; vergi yansıması (kayıtsız kayıp, vergi yükünün paylaşılması)."
    ]},
    { baslik: "Tüketici, üretim, maliyet, piyasalar", maddeler: [
      "Azalan marjinal fayda yasası; tüketici dengesinde MU1/P1 = MU2/P2 eşitliği sağlanır.",
      "Farksızlık eğrisi ve bütçe doğrusu teğet noktası, bütçe kısıtının değişmesiyle yeni dengeyi verir.",
      "Kısa dönemde üretim: toplam, ortalama ve <b>marjinal</b> ürün; azalan verimlilik marjinal ürünün düşmesidir.",
      "Maliyet eğrileri: MC, AVC ve ATC ilişkisi; MC eğrisi AVC ve ATC'yi en düşük noktalarından keser.",
      "Tam rekabette firma <b>fiyat alıcıdır</b> (P = MR); kısa dönemde P > AVC olduğu sürece üretim sürer, uzun dönemde marjinal firma piyasadan çıkar.",
      "Monopolde fiyat MC'den büyüktür, marjinal hasılat fiyattan küçüktür; tekelde <b>ölü ağırlık kaybı</b> oluşur. Tekelci rekabet ve oligopolde eksik rekabet koşulları görülür."
    ]},
    { baslik: "Milli gelir ve makro denge", maddeler: [
      "GSYH hesaplama: üretim (katma değer), harcama (C + I + G + X − M) ve gelir yöntemi; <b>nominal-reel</b> ayrımı deflatörle yapılır.",
      "Denge koşulu: planlanan yatırım = tasarruf; enjekte edilen harcamalar (I, G, X) ile sızıntılar (S, T, M).",
      "Çarpan (k) = 1 / (1 − c) ; c marjinal tüketim eğilimidir. Kamu harcaması çarpanı vergi çarpanından büyüktür.",
      "Hızlandıran (yatırım hızlandıranı) yatırımın gelir artışına bağlı olduğunu söyler.",
      "Enflasyon açığı ve deflasyon açığı; tam istihdam gelir düzeyi ile fiilî gelir arasındaki fark."
    ]},
    { baslik: "Para, bankacılık, enflasyon", maddeler: [
      "Para arzı tanımları (M1, M2, M3), <b>reel ve nominal faiz</b> (Fisher denklemi), paranın dolanım hızı ve mübadele denklemi.",
      "TCMB'nin temel amacı <b>fiyat istikrarıdır</b> (1211 sayılı Kanun m.4); araçları arasında açık piyasa işlemleri, zorunlu karşılıklar, faiz koridoru ve rezerv yönetimi bulunur.",
      "Merkez bankası bilançosu ve para yaratma: bankalar mevduatı krediye çevirerek <b>kaydi para</b> yaratır; zorunlu karşılık oranı çarpanı belirler.",
      "Enflasyon türleri: talep, maliyet (itilmiş), yapısal ve para arzına bağlı. Sürünen, dörtnala ve hiperenflasyon kavramları.",
      "İşsizlik türleri: friksiyonel, yapısal, konjonktürel (devresel), teknolojik ve mevsimsel; <b>doğal işsizlik oranı</b> friksiyonel + yapısal işsizliğe karşılık gelir.",
      "Phillips eğrisi enflasyon ile işsizlik arasındaki kısa dönem ters ilişkiyi gösterir; beklentiler uyarlanınca (stagflasyon) ilişki kaybolur.",
      "Uyarlayıcı ve rasyonel beklentiler; kurala bağlı politika ve <b>zaman tutarsızlığı</b> (Kydland-Prescott) başlıkları KPSS A'da sorulur."
    ]},
    { baslik: "Büyüme, dış ticaret, düşünce tarihi", maddeler: [
      "Büyüme kaynakları: sermaye birikimi, iş gücü ve <b>teknoloji</b>; Solow modelinde uzun dönemde kişi başı gelir artışı teknolojiye bağlanır.",
      "Kalkınma göstergeleri: kişi başı gelir, insani gelişme endeksi, gelir dağılımı (Lorenz eğrisi, Gini katsayısı).",
      "Karşılaştırmalı üstünlük (Ricardo) serbest ticaretin temelidir; gümrük tarifesi, kota ve sübvansiyon dış ticareti kısıtlar; <b>gümrük birliği</b> ve serbest ticaret anlaşmaları ayrı başlıklardır.",
      "Ödemeler dengesi: cari işlemler + sermaye hareketleri + resmî rezervler = 0; cari açık sermaye girişiyle finanse edilir.",
      "Kur sistemleri: sabit, esnek ve ara rejimler; <b>devalüasyon</b> (sabit kurda) ile <b>depresiasyon</b> (esnek kurda) ayrımı.",
      "İktisadi düşünce: Merkantilizm (dış ticaret fazlası), Fizyokrasi (doğa/tarım önceliği), Klasikler (görünmez el, Say yasası), Keynesyen (efektif talep, müdahale), Monetarist (para arzı kuralı), Arz yönlü iktisat (vergi indirimi), Yeni Klasik ve Yeni Keynesyen yaklaşımlar."
    ]}
  ]
},
{
  ad: "Maliye", renk: "#0369a1",
  ipucu: "Maliyede kavram karışıklığı en büyük tuzaktır: <b>vergiyi doğuran olay</b> ile <b>tahakkuk</b>, <b>yansıma</b> ile <b>yükümlülük</b> ayrımını netleştir. Tarife türlerini (artan, azalan, düz oranlı) bir sayı örneğiyle çalış.",
  bloklar: [
    { baslik: "Kamu harcamaları ve gelirleri", maddeler: [
      "Kamu harcamaları: cari, yatırım, transfer ve borç faiz ödemeleri; <b>reel</b> (üretime yönelik) ve <b>transfer</b> harcaması ayrımı ekonomik etki bakımından temeldir.",
      "Kamu gelirleri: vergi, resim, harç, şerefiyeler, para ve vergi cezaları, mülk ve teşebbüs gelirleri, borçlanma.",
      "Verginin unsurları: mükellef (ödeyen), sorumlu (vergiyi kesen), matrah (verginin hesaplandığı değer), oran ve tarife.",
      "Vergileme ilkeleri: <b>ödeme gücü</b> (mali güç), eşitlik (yatay-dikey), belirlilik, kanunilik, iktisadilik ve verimlilik.",
      "Vergilerin sınıflandırılması: gelir, servet, harcama üzerinden alınanlar; dolaylı ve dolaysız vergiler; genel ve özel vergiler."
    ]},
    { baslik: "Vergi tekniği ve vergi hukuku", maddeler: [
      "Vergiyi doğuran olay, tarh (tahakkuk), tebliğ ve tahsil aşamaları sırasıyla işler; tebliğ edilmeyen vergi tahsil edilemez.",
      "Verginin güvenlik müesseseleri: <b>teminat</b>, ihtiyati haciz, ihtiyati tahakkuk, vergi kefaleti.",
      "Vergi kabahatleri (VUK): vergi ziyaı, usulsüzlük kabahati; ceza hukuku bakımından vergi suçları: kaçakçılık, vergi mahremiyetinin ihlali, mühür bozma, sahte belge.",
      "Vergi uyuşmazlıklarının çözümü: uzlaşma, düzeltme, şikâyet, vergi mahkemesinde iptal davası.",
      "Vergide <b>kaynakta kesinti (stopaj)</b>, beyanname esası ve götürü usul uygulamaları; amortisman ve değerleme hükümleri."
    ]},
    { baslik: "Vergi yansıması ve vergi yükü", maddeler: [
      "Verginin yansıması (kaydırılması): öne kaydırma, geriye kaydırma; yansıma piyasa koşullarına (esneklik) bağlıdır.",
      "Talep esnekliği düşük malda vergi tüketiciye, esnekliği yüksek malda üreticiye daha çok yüklenir.",
      "Vergi yükü kavramı; vergi kaçırmak (yasa dışı) ile vergiden kaçınmak (yasal yol) ayrımı.",
      "Vergi politikasının araçları: muafiyet, istisna, indirim, mahsup ve teşvikler; Laffer eğrisi aşırı oranın hasılatı düşürebileceğini gösterir."
    ]},
    { baslik: "Bütçe, borç, mahalli idareler", maddeler: [
      "Bütçe türleri: genel bütçe, katma bütçe (uygulamadan kalktı ancak kavramsal olarak sorulur), özel bütçe, düzenleyici ve denetleyici kurum bütçeleri.",
      "Bütçe ilkeleri: genellik, birlik, yıllık olma, denklik, açıklık (şeffaflık), doğruluk ve aleniyet.",
      "Bütçe süreci: hazırlık, görüşme-kabul (TBMM Plan ve Bütçe Komisyonu), uygulama, denetim (Sayıştay).",
      "Bütçe açığı finansmanı: iç-dış borçlanma, para basma (senyoraj), rezerv ve varlık kullanımı; borç çevrimi ve borç yükü göstergeleri.",
      "Devlet borçları: iç-dış, kısa-uzun vadeli; borcun yönetimi ve <b>konsolidasyon</b>, konversiyon gibi teknikler.",
      "Mahalli idareler (belediye, il özel idaresi, köy) gelirleri: öz gelirler, devlet yardımları, borçlanma; yerel yönetim birlikleri ve bunların denetimi."
    ]}
  ]
},
{
  ad: "Muhasebe", renk: "#7c3aed",
  ipucu: "Muhasebede borç-alacak yönü karıştırılırsa bütün soru gider. Şu dörtlüyü ezberle: varlık artar → <b>borç</b>; varlık azalır → <b>alacak</b>; kaynak (borç+öz kaynak) artar → <b>alacak</b>; kaynak azalır → <b>borç</b>. Gider borçlanır, gelir alacaklanır.",
  bloklar: [
    { baslik: "Temel kavramlar", maddeler: [
      "Muhasebenin işlevleri: kaydetme, sınıflandırma, özetleme, yorumlama (raporlama), analiz; temel kavram: <b>sosyal sorumluluk, kişilik, süreklilik, dönemsellik, maliyet, tutarlılık, ihtiyatlılık, tam açıklama</b>.",
      "Muhasebe eşitliği: varlıklar = borçlar (yabancı kaynaklar) + öz kaynaklar.",
      "Temel mali tablolar: <b>bilanço</b> (belirli tarihte durum) ve <b>gelir tablosu</b> (belirli dönemde performans); ek tablolar: nakit akış, öz kaynak değişim ve kâr dağıtım tabloları.",
      "Hesap kavramı ve işleyişi: hesabın sol tarafı borç, sağ tarafı alacak; borç ve alacak toplamlarının farkı kalan (bakiye) verir.",
      "Çift taraflı kayıt yöntemi: her işlem en az iki hesabı etkiler ve <b>borç = alacak</b> eşitliği bozulmaz."
    ]},
    { baslik: "Tekdüzen hesap planı", maddeler: [
      "Hesap grupları: 1 Dönen Varlıklar, 2 Duran Varlıklar, 3 Kısa Vadeli Yabancı Kaynaklar, 4 Uzun Vadeli Yabancı Kaynaklar, 5 Öz Kaynaklar, 6 Gelir Tablosu Hesapları, 7 Maliyet Hesapları, 8 Serbest, 9 Nazım Hesaplar.",
      "Dönen varlık örnekleri: 100 Kasa, 101 Alınan Çekler, 102 Bankalar, 120 Alıcılar, 153 Ticari Mallar, 108 Diğer Hazır Değerler.",
      "Duran varlıklar: 252 Binalar, 254 Taşıtlar, 255 Demirbaşlar, 257 Birikmiş Amortismanlar (<b>alacak</b> kalanlıdır).",
      "Kaynaklar: 300 Banka Kredileri, 320 Satıcılar, 360 Ödenecek Vergi ve Fonlar, 391 Hesaplanan KDV; 500 Sermaye, 570 Geçmiş Yıllar Kârları, 580 Geçmiş Yıllar Zararları.",
      "Gelir tablosu hesapları: 600 Yurtiçi Satışlar, 621 Satılan Ticari Mallar Maliyeti, 632 Genel Yönetim Giderleri, 631 Pazarlama Giderleri, 760 Pazarlama, 770 Genel Yönetim maliyet hesapları."
    ]},
    { baslik: "Kayıt süreci ve sık sorulan kayıtlar", maddeler: [
      "İşlem sırası: belge → yevmiye defteri (madde kaydı) → büyük defter (kebir) → mizan → mali tablolar.",
      "Mal alımı (peşin): <b>153 Ticari Mallar borç</b>, 191 İndirilecek KDV borç / 100 Kasa alacak.",
      "Mal satışı: 120 Alıcılar borç / <b>600 Yurtiçi Satışlar alacak</b> + 391 Hesaplanan KDV alacak.",
      "Satılan malın maliyeti: 621 borç / 153 Ticari Mallar alacak.",
      "Amortisman ayırma: <b>gider hesabı borç</b> (770 veya 730) / 257 Birikmiş Amortismanlar alacak.",
      "KDV mahsubu: 391 Hesaplanan KDV ile 191 İndirilecek KDV karşılaştırılır; indirilecek fazlaysa fark <b>devreden KDV</b> olur.",
      "Mizan çeşitleri: genel mizan (sadece borç-alacak toplam ve kalan), <b>ayrıntılı mizan</b> (dönem başı, hareketler, dönem sonu), mahsup ve kesin mizan."
    ]},
    { baslik: "Maliyet ve raporlama", maddeler: [
      "Maliyet türleri: direkt ilk madde ve malzeme, direkt işçilik, genel üretim giderleri.",
      "Maliyet yöntemleri: sipariş maliyeti, safha (evre) maliyeti; tam maliyet, değişken maliyet ve <b>başabaş noktası</b> analizi.",
      "Başabaş noktası = toplam sabit gider / (birim satış fiyatı − birim değişken gider).",
      "Stok değerleme yöntemleri (FIFO, ortalama maliyet, LIFO-VUK'ta uygulanamaz) ve dönem sonu envanter işlemleri.",
      "Raporlama: bilanço kalemlerinin düzenlenme esasları (dönen-duran varlık ayrımı bir yıllık süreye göre yapılır) ve gelir tablosunun kademeli gösterimi."
    ]}
  ]
},
{
  ad: "Hukuk", renk: "#be185d",
  ipucu: "Hukuk sorularında tanımları ayırt et: <b>kast</b> ile <b>taksir</b>, <b>teşebbüs</b> ile <b>hazırlık hareketi</b>, <b>haksız fiil</b> ile <b>sebepsiz zenginleşme</b>. Kanun maddesi ezberlemek yerine kavram sınırlarını öğren.",
  bloklar: [
    { baslik: "Hukukun temel kavramları", maddeler: [
      "Kamu hukuku-özel hukuk ayrımı; hukukun kaynakları ve <b>kanunların yürürlüğe girişi</b> (Resmî Gazete'de yayım, yayım tarihinde veya belirtilen tarihte yürürlük).",
      "Kanunların geriye yürümezliği ilkesi ve bunun istisnaları; eşitlik, hukuk devleti, kanunilik ilkeleri.",
      "Yorum yöntemleri (lafzî, amaçsal, tarihsel) ve boşluk doldurma (kıyas, örf-adet, hâkimin hukuk yaratması).",
      "Hakların kazanılması, kullanılması ve korunması; iyi niyet (dürüstlük) kuralı ve hakkın kötüye kullanılması yasağı."
    ]},
    { baslik: "Ceza hukuku", maddeler: [
      "<b>Kanunilik ilkesi</b>: suç ve ceza ancak kanunla konulur; kıyas yoluyla suç ihdas edilemez, ceza artırılamaz.",
      "Suçun unsurları: maddi unsur (fiil, netice, illiyet bağı), manevi unsur (<b>kast</b> veya <b>taksir</b>), hukuka aykırılık ve kusurluluk (haksız tahrik, hata, yaş küçüklüğü, akıl hastalığı).",
      "Teşebbüs: elverişli hareketlerle doğrudan doğruya icraya başlanması ve elde olmayan nedenlerle tamamlanmaması; <b>hazırlık hareketi</b> cezalandırılmaz.",
      "İştirak: fail, azmettiren, yardım eden; <b>içtima</b> (bileşik suç, zincirleme suç, fikri içtima) kuralları.",
      "Cezalar: hapis ve adlî para cezası; güvenlik tedbirleri; cezanın ertelenmesi, hükmün açıklanmasının geri bırakılması ve <b>müebbet</b> kurumları.",
      "Teori: mutlak (kefaret), nispi (önleme) ve karma ceza teorileri; suç siyaseti ve cezalandırmanın amacı."
    ]},
    { baslik: "Medeni ve borçlar hukuku", maddeler: [
      "Kişilik hakları: kişiliğin başlangıcı <b>sağ doğumla</b>; kişilik hakkına saldırıda açılabilecek davalar (saldırının önlenmesi, kaldırılması, tazminat).",
      "Ehliyet: <b>tam ehliyet</b> (ayırt etme gücü, erginlik, kısıtlı olmamak), sınırlı ehliyetli ve ehliyetsiz kişilerin hukuki işlem ehliyeti.",
      "Aile hukuku: evlenme engelleri ve şartları, boşanma sebepleri (özel-genel), mal rejimleri (edinilmiş mallara katılma varsayılan rejimdir), nafaka türleri.",
      "Miras hukuku: yasal mirasçılar ve saklı pay, tasarruf oranı, ölüme bağlı tasarruflar (vasiyet, miras sözleşmesi), mirasın reddi (reddi miras).",
      "Borçlar: sözleşmenin kuruluşu (icap-kabul), geçersizlik hâlleri (ehliyetsizlik, muvazaa, kanuna aykırılık, ahlaka aykırılık, imkânsızlık), <b>temsil</b> ve yetkisiz temsil.",
      "Sözleşmeye aykırılıkta borçlunun temerrüdü (ihtar, seçimlik haklar) ve <b>haksız fiil</b> sorumluluğu (hukuka aykırılık, kusur, zarar, illiyet); sebepsiz zenginleşmede iade borcu.",
      "Sona erme ve zamanaşımı: borcu sona erdiren sebepler (ibra, takas, yenileme, birleşme) ve zamanaşımı süreleri."
    ]},
    { baslik: "İş hukuku", maddeler: [
      "İş sözleşmesi türleri (belirli-belirsiz süreli, tam-kısmi süreli) ve <b>işçinin iş görme, sadakat ve rekabet etmeme</b> borçları.",
      "İşverenin ücret ödeme, eşit davranma ve işçiyi koruma borçları; fazla çalışma ve <b>fazla süreli çalışma</b> kavramları ile zamlı ücret.",
      "İş sözleşmesinin feshi: ihbar süresi ve ihbar tazminatı, haklı nedenle derhal fesih (ahlak ve iyi niyet kurallarına aykırılık, devamsızlık), geçerli nedenle feshin usulü.",
      "Kıdem tazminatına hak kazanma koşulları ve tazminatın hesaplanması; <b>işe iade</b> davası ve sonuçları.",
      "Sendikalar ve toplu iş sözleşmesi: sendika özgürlüğü, toplu iş sözleşmesinden yararlanma, grev ve lokavt yasakları, arabuluculuk ve Yüksek Hakem Kurulu."
    ]}
  ]
},
{
  ad: "İşletme", renk: "#ca8a04",
  ipucu: "İşletmede teoriler eşleştirmeyle sorulur: kuram-cu isim-yaklaşım üçlüsünü kart hâlinde çalış (Maslow ihtiyaçlar, Herzberg çift faktör, McGregor X-Y, Taylor bilimsel yönetim, Fayol yönetim süreci, Weber bürokrasi).",
  bloklar: [
    { baslik: "İşletme kavramları ve yönetim düşüncesi", maddeler: [
      "İşletmenin amaçları: kâr, süreklilik, topluma hizmet, büyüme; işletme ile kurum (kuruluş) farkı: işletme iktisadi, kurum sosyal yönü ağır basan örgüttür.",
      "<b>Taylor</b> bilimsel yönetim (iş ölçümü, standartlaşma), <b>Fayol</b> yönetim süreci (planlama-örgütleme-yöneltme-koordinasyon-denetim), <b>Weber</b> bürokrasi (yasal-rasyonel otorite).",
      "Neo-klasik dönem: <b>Elton Mayo</b> Hawthorne araştırmaları ile insan ilişkileri yaklaşımı; örgütsel davranışın doğuşu.",
      "Modern dönem: sistem yaklaşımı, durumsallık (olasılık) yaklaşımı, toplam kalite yönetimi ve öğrenen örgüt kavramları.",
      "Kurumsal sosyal sorumluluk, etik ve sürdürülebilirlik kavramları."
    ]},
    { baslik: "Örgütleme ve örgüt yapıları", maddeler: [
      "Örgütlenme ilkeleri: iş bölümü, uzmanlaşma, yetki devri, <b>komuta birliği</b>, denetim alanı, yetki-sorumluluk denkliği.",
      "Örgüt yapıları: fonksiyonel, ürün temelli (bölümlere göre), matris, coğrafi ve karma yapılar.",
      "Organizasyon şemaları ve <b>örgüt kademeleri</b>; merkezîleşme-merkezîleşmeme (adem-i merkeziyet).",
      "Örgütlerde karar verme modelleri: akılcı (rasyonel), sınırlı akılcılık (Simon), sezgisel ve katılımcı karar verme.",
      "Güç kaynakları ve otorite türleri (yasal, geleneksel, karizmatik otorite)."
    ]},
    { baslik: "Motivasyon, liderlik, iletişim", maddeler: [
      "İçerik teorileri: <b>Maslow</b> ihtiyaçlar hiyerarşisi, Alderfer ERG, McClelland başarı-güç-ilişki, <b>Herzberg</b> çift faktör (hijyen ve güdüleyici faktörler).",
      "Süreç teorileri: Vroom beklenti (beklenti-araçsallık-değer), Adams eşitlik, Locke hedef belirleme teorisi.",
      "X-Y teorisi (McGregor): X işgöreni sorumluluktan kaçan, Y işgöreni kendini geliştiren kabul eder.",
      "Liderlik: otokratik, demokratik, serbest bırakıcı (Lippitt-White); Ohio State (yapıyı belirleme ile ilgi), Blake-Mouton yönetim tarzı matrisi, <b>durumsallık</b> yaklaşımları (Fiedler, Hersey-Blanchard).",
      "Dönüşümcü, etkileşimci, karizmatik ve hizmetkâr liderlik kavramları; iletişim türleri (formel-informel, sözlü-sözsüz) ve iletişim engelleri."
    ]},
    { baslik: "Üretim, pazarlama, finansman", maddeler: [
      "Üretim sistemleri: siparişe göre, sürekli (akış), parti tipi üretim; <b>tam zamanında üretim (JIT)</b> ve yalın üretim.",
      "Kuruluş yeri seçimini etkileyen faktörler: hammaddeye, pazara, iş gücüne ve ulaşıma yakınlık; kapasite ve kapasite kullanım oranı.",
      "Stok yönetimi: ekonomik sipariş miktarı, emniyet stoğu, stok devir hızı; kalite yönetimi (kalite kontrol, kalite güvence, altı sigma).",
      "Pazarlama karması (ürün, fiyat, dağıtım, tutundurma), ürün yaşam eğrisi (sunuş, büyüme, olgunluk, gerileme) ve pazar bölümleme, konumlandırma, hedefleme.",
      "Finansman: sermaye yapısı, kaldıraç, likidite oranları, <b>başabaş</b> analizi, kâr hesapları (brüt, faaliyet, net kâr) ve nakit bütçesi.",
      "Yatırım kararları: sermaye bütçelemesi, geri ödeme süresi, net bugünkü değer ve iç verim oranı kavramları."
    ]}
  ]
},
{
  ad: "Kamu Yönetimi", renk: "#0891b2",
  ipucu: "Kamu yönetiminde yapı soruları baskındır: merkezî yönetim taşra birimleri, yardımcı kuruluşlar ve yerinden yönetim kuruluşlarını şema hâlinde çiz. “Hangi kuruluş hangi bakanlığa bağlı” sorusu sık çıkar.",
  bloklar: [
    { baslik: "Yönetim biliminin gelişimi", maddeler: [
      "Klasik yaklaşım: Taylor (bilimsel yönetim), Fayol (yönetim süreci), Gulick-POSDCORB, Urwick; verimlilik odaklıdır.",
      "Neo-klasik/insan ilişkileri: Mayo ve Hawthorne araştırmaları; <b>informel örgüt</b> ve sosyal faktörlerin önemi.",
      "Bürokrasi kuramı: Weber'in yasal-rasyonel modeli, hiyerarşi, yazılı kurallar, uzmanlaşma; “demir kafes” eleştirileri ve bürokrasi sorunları.",
      "Yeni kamu yönetimi (işletmecilik yaklaşımı): performans yönetimi, stratejik planlama, toplam kalite, vatandaş odaklılık, <b>yönetişim</b> ve e-devlet.",
      "Hesap verebilirlik, şeffaflık, etik yönetim ve kamu değeri kavramları."
    ]},
    { baslik: "Türk kamu yönetiminin yapısı", maddeler: [
      "Merkezî yönetim: Cumhurbaşkanlığı, bakanlıklar, bağlı ve ilgili kuruluşlar; <b>yardımcı kuruluşlar</b> (Danıştay, Sayıştay, Devlet Denetleme Kurulu) ve düzenleyici-denetleyici kurumlar.",
      "Taşra teşkilatı: il ve ilçe idaresi; vali ve kaymakamın görevleri ve <b>idari vesayet</b> yetkisi.",
      "Yerinden yönetim: yer yönünden (belediye, il özel idaresi, köy, mahallî idare birlikleri) ve hizmet yönünden (kamu kurumları, meslek kuruluşları, üniversiteler) yerinden yönetim.",
      "Belediye organları ve görevleri (belediye meclisi, encümen, başkan), büyükşehir belediyesi özel düzenlemeleri ve mahalle yönetimi.",
      "Kamu tüzel kişiliği olan meslek kuruluşları ve kamu yararına çalışan dernekler; kamu kurumu niteliğindeki meslek kuruluşlarının özerkliği."
    ]},
    { baslik: "Personel rejimi ve denetim", maddeler: [
      "657 sayılı Kanun'da <b>memur</b> tanımı ve memurluk mesleğinin temel ilkeleri: sınıflandırma, kariyer ve liyakat.",
      "Hizmete alma yolu (sınav ve atama), aday memurluk, yer değiştirme, nakil; izin türleri ve sosyal haklar.",
      "Disiplin cezaları (uyarma, kınama, aylıktan kesme, kademe ilerlemesinin durdurulması, devlet memurluğundan çıkarma) ve <b>savunma hakkı</b>.",
      "Denetim türleri: idari denetim (hiyerarşik denetim, vesayet denetimi), <b>yargısal denetim</b>, siyasi denetim (TBMM), kamuoyu denetimi ve kamu denetçiliği (ombudsmanlık).",
      "Kamu İktisadi Teşebbüsleri ve özelleştirme; kamu ihale mevzuatının genel çerçevesi ve kamu alımlarında şeffaflık ilkesi."
    ]}
  ]
},
{
  ad: "Çalışma Ekonomisi", renk: "#b45309",
  ipucu: "Bu derste tanım ve ölçüm soruları çok güçlüdür: <b>işgücüne katılma oranı</b>, <b>işsizlik oranı</b>, <b>eksik istihdam</b> ve ücret teorilerini formülleriyle çalış. Grev-lokavt yasaklarını örnek olayla pekiştir.",
  bloklar: [
    { baslik: "İşgücü piyasası ve işsizlik", maddeler: [
      "İşgücü piyasasının temel kavramları: çalışma çağı nüfusu, işgücü, istihdam, işsizlik ve <b>işgücü dışı</b> kesim.",
      "İşgücüne katılma oranı = işgücü / kurumsal olmayan çalışma çağı nüfusu; işsizlik oranı = işsiz / işgücü.",
      "İşsizlik türleri: <b>friksiyonel</b>, <b>yapısal</b>, <b>konjonktürel (devresel)</b>, mevsimsel, teknolojik ve gizli işsizlik.",
      "Doğal işsizlik oranı (tam istihdam düzeyi) friksiyonel ve yapısal işsizliğin toplamıdır; bu oranın altına inilirse enflasyon baskısı artar.",
      "Eksik istihdam, atıl işgücü, umutsuz işçi ve uzun süreli işsizlik kavramları; işsizliğin gelir dağılımı ve yoksullukla ilişkisi."
    ]},
    { baslik: "Ücret teorileri ve yapısı", maddeler: [
      "Ücretin tanımı: emeğin karşılığı; <b>nominal</b> ve <b>reel</b> ücret ayrımı (reel ücret nominal ücretin satın alma gücüdür).",
      "Teoriler: emek değer teorisi (Marx), <b>marjinal verimlilik teorisi</b>, ücret fonu teorisi, pazarlık (müzakere) teorisi, verimlilik ücret teorisi (etkin ücret).",
      "Ücret yapısı: kök (temel) ücret, ek ödemeler, sosyal yardımlar; ücret türleri: zaman, parça (akort), primli ve yüzde usulü.",
      "Ücretin belirlenmesinde etkili faktörler: işgücü arz-talep dengesi, sendikal güç, asgari ücret, verimlilik, yaşam maliyeti.",
      "Ücret eşitsizliği ve ölçümü: sektörel, bölgesel ve cinsiyete dayalı ücret farkı; eşit işe eşit ücret ilkesi."
    ]},
    { baslik: "Sendikalar ve toplu pazarlık", maddeler: [
      "Sendika kavramı ve türleri (işçi, işveren, kamu görevlileri sendikaları; işkolu ve işyeri sendikacılığı; meslek ve genel sendikacılık).",
      "Sendikalaşma teorileri: <b>Webb'ler</b> (ortak çıkar/pazarlık), <b>Commons</b> (iş çevresi), Perlman (işçi hareketinin ekonomik temeli), Tannenbaum (sendika-siyaset).",
      "Toplu pazarlık süreci ve aşamaları: çağrı, görüşme, uyuşmazlık, grev-lokavt kararı; <b>toplu iş sözleşmesi</b> hükümleri (normatif ve borç doğurucu hükümler).",
      "Uyuşmazlık çözümü: zorunlu ve isteğe bağlı <b>arabuluculuk</b>, özel hakem (yüksek hakem kurulu) ve grev-lokavt yasakları (genel sağlık, millî güvenlik gibi işyerleri).",
      "Grev türleri: genel, işyeri, işkolu, dayanışma, sempatik, oturma ve yavaşlatma grevleri; kanun dışı grevin sonuçları."
    ]},
    { baslik: "Sosyal politika ve sosyal güvenlik", maddeler: [
      "Sosyal politikanın araçları: çalışma mevzuatı, sosyal sigorta, sosyal yardım, sosyal hizmet ve istihdam politikaları.",
      "Sosyal güvenliğin kapsamı ve teknikleri: primli (sosyal sigorta) ve primsiz sistemler (sosyal yardım, sosyal hizmet); <b>sosyal sigorta kolları</b>.",
      "Sosyal sigortanın temel ilkeleri: zorunluluk, primle finansman, kamusal denetim, risklerin toplanması ve <b>normalleşme</b> (riskin geniş kitleye dağıtılması).",
      "Sosyal devlet, yoksulluk ve gelir dağılımı; asgari geçim, gelir desteği ve işsizlik sigortası uygulamaları.",
      "Uluslararası çalışma normları: <b>ILO</b> sözleşmeleri ve tavsiye kararları, çalışma yaşamına ilişkin temel haklar (sendikalaşma, toplu pazarlık, zorla çalıştırma ve çocuk işçiliğinin yasaklanması, ayrımcılığın önlenmesi).",
      "Esneklik ve güvenceli esneklik: işgücü piyasasında esnek çalışma biçimleri (kısmi süreli, geçici, taşeron, uzaktan çalışma) ve bunların sosyal güvenlik boyutu."
    ]}
  ]
},
{
  ad: "Uluslararası İlişkiler", renk: "#4338ca",
  ipucu: "Uluslararası ilişkilerde teori-eleştiri eşleştirmesine dikkat: realizm güç ve çıkar, liberalizm iş birliği ve kurumlar, inşacılık kimlik ve normlar der. Türk dış politikasında dönem-açılım eşleştirmesi (Lozan, Montrö, NATO üyeliği, AB süreci) tablo hâlinde çalışılmalıdır.",
  bloklar: [
    { baslik: "Temel kavramlar ve teoriler", maddeler: [
      "Uluslararası sistemin temel aktörleri: devletler, uluslararası örgütler, çok uluslu şirketler, birey ve sivil toplum.",
      "Kavramlar: egemenlik, <b>güç</b>, güç dengesi, ulusal çıkar, güvenlik ikilemi, karşılıklı bağımlılık, hegemonya.",
      "Realizm: devlet merkezli, güç ve çıkar odaklı; anarşik ortamda <b>kendi kendine yardım</b> (self-help) ve askerî gücün belirleyiciliği.",
      "Liberalizm: iş birliği, uluslararası kurumlar, serbest ticaret, demokratik barış kuramı; kolektif güvenlik ve hukukun üstünlüğü.",
      "Marksizm/eleştirel teori: iktisadi yapı ve sınıf ilişkileri; inşacılık: normlar, kimlik ve sosyal inşa; İngiliz Okulu: uluslararası toplum, düzen ve adalet."
    ]},
    { baslik: "Tarihsel süreç", maddeler: [
      "Vestfalya düzeni (1648) egemen eşit devletler sisteminin başlangıcı kabul edilir; <b>Viyana Kongresi</b> güç dengesi ve restorasyon ilkesini kurar.",
      "I. Dünya Savaşı sonrası Versailles sistemi ve <b>Milletler Cemiyeti</b>'nin kurulması; sistemin başarısızlığı II. Dünya Savaşı'na yol açar.",
      "II. Dünya Savaşı sonrası: <b>Birleşmiş Milletler</b>, Bretton Woods kurumları (IMF ve Dünya Bankası), Marshall Planı ve iki kutuplu düzen.",
      "Soğuk Savaş dönemi: NATO-Varşova Paktı, yumuşama (detant), bağlantısızlık hareketi, blok siyaseti; Berlin Duvarı'nın yıkılması ve Sovyetler Birliği'nin dağılması sonrası yeni düzen.",
      "1990 sonrası: tek kutupluluk tartışması, küreselleşme, terörle mücadele, yükselen güçler ve çok kutupluluğa geçiş eğilimi."
    ]},
    { baslik: "Uluslararası örgütler ve hukuk", maddeler: [
      "BM sistemi: Genel Kurul, Güvenlik Konseyi (daimî üyeler ve <b>veto</b> hakkı), Ekonomik ve Sosyal Konsey, Uluslararası Adalet Divanı, Sekretarya; uzman kuruluşlar (UNESCO, WHO, FAO, ILO).",
      "Güvenlik örgütleri: NATO (kolektif savunma, 5. madde), AGİT (siyasi diyalog ve insan hakları boyutu), AB'nin ortak güvenlik ve savunma politikası.",
      "Ekonomik örgütler: IMF (ödemeler dengesi desteği ve istikrar), Dünya Bankası (kalkınma finansmanı), WTO (ticaretin serbestleştirilmesi, anlaşmazlık çözümü), OECD.",
      "Bölgesel örgütler: AB (kurumsal yapı: Komisyon, Konsey, Parlamento, Adalet Divanı), Arap Ligi, Afrika Birliği, ŞİÖ, ASEAN, KEİ.",
      "Uluslararası hukukun kaynakları: <b>andlaşmalar</b>, örf ve âdet hukuku, hukukun genel ilkeleri, yargı kararları ve doktrin; kuvvet kullanma yasağı ve meşru müdafaa istisnası (BM Antlaşması'nın ilgili maddeleri), diplomasi ve dokunulmazlıklar (Viyana Sözleşmeleri)."
    ]},
    { baslik: "Türk dış politikası", maddeler: [
      "Kurtuluş Savaşı ve Lozan: <b>Misak-ı Millî</b> temelinde bağımsızlık ve eşitlik ilkeleri; kapitülasyonların kaldırılması, azınlıklar ve boğazlar konuları.",
      "Atatürk dönemi: Yunanistan ile dostluk (1930 anlaşmaları), Balkan Antantı (1934), Sadabat Paktı (1937), Montrö Boğazlar Sözleşmesi (1936) ve Hatay'ın anavatana katılması.",
      "II. Dünya Savaşı: aktif tarafsızlık siyaseti; savaş sonrası Sovyet baskıları karşısında Batı bloğuna yakınlaşma ve <b>NATO üyeliği</b> (1952).",
      "Soğuk Savaş dönemi: Kıbrıs sorunu ve garantörlük sistemi, Bağlantısızlar ile ilişkiler, 1974 sonrası gelişmeler, Balkan ve Orta Doğu politikaları.",
      "1990 sonrası: Avrupa Birliği süreci (gümrük birliği, adaylık ve müzakere başlıkları), Türk Cumhuriyetleriyle ilişkiler, enerji koridorları ve çok boyutlu dış politika anlayışı."
    ]}
  ]
}
]};
