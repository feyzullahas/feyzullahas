# Feyzullah As - Kişisel Web Sitesi

Modern ve koyu temalı kişisel web sitesi. React ve Vite kullanılarak geliştirilmiştir.

## Özellikler

- 🎨 Koyu tema tasarımı
- 📱 Responsive (mobil uyumlu) tasarım
- ⚡ Vite ile hızlı geliştirme
- 🚀 Vercel ile kolay deploy
- 📄 Ana Sayfa, Hakkımda, Deneyim, Projeler, Beceriler, CV, İletişim bölümleri

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production build'i önizle
npm run preview
```

## Proje Yapısı

```
src/
├── components/       # React componentleri
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Contact.jsx
│   ├── CV.jsx
│   └── Footer.jsx
├── pages/           # Sayfa componentleri
│   ├── Home.jsx
│   ├── AboutPage.jsx
│   ├── ExperiencePage.jsx
│   ├── ProjectsPage.jsx
│   ├── SkillsPage.jsx
│   ├── CVPage.jsx
│   └── ContactPage.jsx
├── assets/          # Resimler ve diğer dosyalar
├── App.jsx          # Ana uygulama componenti
└── main.jsx         # Giriş noktası
```

## Resim Ekleme

Resimlerinizi eklemek için:

1. Resimlerinizi `public/images/` klasörüne ekleyin
2. Component dosyalarında resim yolunu güncelleyin:
   - Hero componentinde: `src="/images/your-photo.jpg"`
   - About componentinde: `src="/images/about1.jpg"`
   - Experience componentinde: `src="/images/experience1.jpg"`
   - Projects componentinde: `src="/images/project1.jpg"`
   - CV componentinde: `src="/images/cv-preview.jpg"`

## Vercel'e Deploy

1. GitHub'a projeyi push edin
2. Vercel hesabınıza giriş yapın
3. "New Project" butonuna tıklayın
4. GitHub repository'nizi seçin
5. Framework Preset: Vite seçin
6. Deploy butonuna tıklayın

Veya Vercel CLI ile:

```bash
npm i -g vercel
vercel
```

## Özelleştirme

- Kişisel bilgilerinizi component dosyalarındaki ilgili yerlerden güncelleyebilirsiniz
- Renkleri değiştirmek için `src/index.css` dosyasındaki CSS değişkenlerini düzenleyin
- İçerikleri component dosyalarından düzenleyebilirsiniz

## Lisans

MIT
