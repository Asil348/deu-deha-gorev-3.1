# DEU DEHA GÖREV 3

## Kurulum

---

1. Projeyi klonlayın.
2. mysql veritabanı oluşturun. Veritabanı konfigurasyonunu `.env` dosyasından tanımlayın. Tablo aşağıdaki gibi olmalıdır.
```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
```
3. Sunucuları çalıştırın:

### Frontend sunucusu için:
```
cd client/
yarn
yarn dev
```

build için:
```
yarn build
```

### Backend sunucusu için:
```
cd server/
npm i
npm run start
```

---

## Mantık
Kullanıcıyı giriş sayfası karşılar. Yukarıda profil linki de bulunur, fakat kullanıcı giriş yapmadan profil sayfasına ulaşamaz. Giriş yapmak için kullanıcı adı ve şifre girmelidir. Giriş başarılı olursa kullanıcı profil sayfasına yönlendirilir, kullanıcı bilgileri localStorage'a kaydedilir. Profil sayfasında kullanıcıya ait profil bilgileri görünür. Profil sayfasından giriş ve kayıt sayfalarına erişilemez. Kullanıcı profil sayfasından çıkış yapabilir. Çıkış yapmak için kullanıcı profil sayfasında bulunan çıkış butonuna tıklamalıdır. Çıkış yapıldığında kullanıcı giriş sayfasına yönlendirilir, localStorage'dan kullanıcı bilgileri silinir.

# ÖNEMLİ
Kullanıcı bilgiler **KESİNLİKLE ASLA** localStorage'da tutulmamalıdır. Bu localStorage injection'a yol açabilir. Kullanıcı bilgileri **SADECE** server tarafında tutulmalıdır. localStorage'da sadece kullanıcıya ait bir token tutulmalıdır. Bu token ile server tarafında kullanıcı bilgileri çekilmelidir. Bunun için JWT kullanılabilir. Bu projede kolaylık ve gösterim amacından dolayı kullanıcı bilgileri ilk loginden sonra, logout yapılmadığı sürece, localStorage'da tutulmaktadır.