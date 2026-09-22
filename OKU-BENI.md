# ÜSTAD KPSS — Uzmanlık ve Müfettişlik Sınavına Hazırlık

Kenan Kuzucu için hazırlandı. Çevrimdışı çalışan, uyarlamalı öğretim motorlu KPSS hazırlık uygulaması.

## Ne var
- **Soru bankası**: Türkçe, Matematik, Genel Kültür (Tarih, Coğrafya), Vatandaşlık ve Anayasa, Hukuk,
  İktisat, Maliye, Muhasebe, İşletme, Kamu Yönetimi, Çalışma Ekonomisi, Uluslararası İlişkiler
- **Deneme sınavı**: 30/60/120 soru · 30/75/130 dakika · soru paleti · işaretleme · süre bitiminde otomatik teslim
- **Uyarlamalı öğretim motoru**: aralıklı tekrar (1-3-7-21-45 gün), zayıf konu avı, uyarlanan zorluk,
  günlük program, günlük hedef ve seri, rütbe (Yeni Başlayan → Üstat), öğrenene kadar tekrar
- **Konu özetleri**: 13 ders için sınav odaklı notlar + sınav ipucu
- **İstatistik**: ders başarı çubukları, konu hakimiyeti, yanlış defteri, toplam süre
- **16 şablon**: 6 açık, 4 koyu, 3 OLED tam siyah, 3 QLED canlı · geniş renk gamı (P3) ve HDR algılama
- Bütün simgeler vektör (SVG) — her ekran çözünürlüğünde net

## Dosyalar
| Dosya | İş |
|---|---|
| `index.html` | ekranlar (panel, öğren, soru, sınav, özet, istatistik, ayarlar) |
| `assets/stil.css` | 16 şablon, animasyonlar, OLED/QLED/HDR desteği |
| `assets/uygulama.js` | motor: soru çözme, sınav, uyarlamalı öğretim, istatistik |
| `icerik/sorular.js` | derlenmiş soru bankası |
| `icerik/soru-*.json` | ham soru bankası dosyaları |
| `icerik/ozetler.js` | konu özetleri |
| `sorulari-derle.py` | JSON → sorular.js (şema denetimi, yinelenen ayıklama, dengesi) |
| `olcum.py` + `olcum-senaryo.js` | Chrome ile gerçek ölçüm koşucusu |
| `kart-uret.py` | APK künye kartı (QR kodlu) |
| `kilavuz-uret.py` | renkli Word kullanım kılavuzu |
| `yayinla.py` | web sürümünü GitHub Pages'e yayınlar |

## Komutlar
    python sorulari-derle.py                  # soru bankasını derle ve denetle
    python olcum.py index.html olcum-senaryo.js 412 880 3.5   # gerçek tarayıcı ölçümü
    bash /c/Users/kenan/AndroidBuild/build-kpss.sh            # APK derle
    python kart-uret.py <apk> <link>          # künye kartı
    python kilavuz-uret.py                    # Word kılavuz
    python yayinla.py --apk                   # GitHub Pages yayını

## Not
Sorular bu uygulama için özgün yazılmıştır. Resmî çıkmış sorular ÖSYM'nin kendi yayınlarındadır
(panelde bağlantılar vardır). Uygulama internet izni istemez; veriler yalnızca cihazda saklanır.
