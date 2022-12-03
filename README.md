## DEU DEHA GÖREV 3

### Kurulum

---

1. Projeyi klonlayın.
1. mysql veritabanı oluşturun. Veritabanı konfigurasyonunu `server/index.js` dosyasından tanımlayın.
1. Sunucuları çalıştırın:

#### Frontend sunucusu için:
```
cd client/
yarn
yarn dev
```

build için:
```
yarn build
```

#### Backend sunucusu için:
```
cd server/
npm i
npm run start
```

### Mantık
Kullanıcıyı giriş sayfası karşılar. Yukarıda profil linki de bulunur, fakat kullanıcı giriş yapmadan profil sayfasına ulaşamaz. Giriş yapmak için kullanıcı adı ve şifre girmelidir. Giriş başarılı olursa kullanıcı profil sayfasına yönlendirilir, kullanıcı bilgileri browser cookielerine kaydedilir. Profil sayfasında kullanıcıya ait profil bilgileri görünür. Profil sayfasından giriş ve kayıt sayfalarına erişilemez. Kullanıcı profil sayfasından çıkış yapabilir. Çıkış yapmak için kullanıcı profil sayfasında bulunan çıkış butonuna tıklamalıdır. Çıkış yapıldığında kullanıcı giriş sayfasına yönlendirilir, cookieler'den kullanıcı bilgileri silinir.