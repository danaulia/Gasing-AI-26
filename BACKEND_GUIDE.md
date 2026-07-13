# Backend Server Architecture & Folder Structure Guide
## Zenith Prime Labs — StarLive Group

Dokumen ini menjelaskan struktur folder dan arahan arsitektur untuk pengembangan sistem backend Zenith Prime Labs.

---

## 📁 Struktur Rekap Folder Proyek (Monorepo)

```
/zpl-monorepo
├── /frontend               # SPA static frontend files (Zenith Prime Labs Portal)
│   ├── /assets             # Ilustrasi anime & scene background
│   ├── index.html          # Portal utama SPA
│   ├── index.css           # Desain sistem 4 musim
│   ├── app.js              # Router utama, lightbox galeri, modal proyek
│   ├── settings.js         # Pengatur 8 bahasa, musim, musik
│   ├── chat-sidebar.js     # Global chat & friend list simulator
│   ├── auth-chat.js        # Modul auth & profile
│   └── security-dashboard.js # Modul dashboard admin
│
├── /stealth-recon          # Standalone OSINT application (Stealth Recon)
│   ├── index.html          # Form pencarian target
│   ├── styles.css          # Tampilan glassmorphism standalone
│   ├── app.js              # Alur generator query OSINT & mock data
│   └── pdf-report.js       # Integrasi html2canvas & jsPDF
│
├── /backend-core           # Node.js Express REST API server (backend utama)
│   ├── /src
│   │   ├── /config         # Konfigurasi database & environment variables
│   │   ├── /controllers    # Logika bisnis (auth, dashboard, chat, settings)
│   │   ├── /middleware     # Validasi JWT token & authorization check
│   │   ├── /models         # Skema database Mongoose (User, ChatMessage, Scene)
│   │   └── /routes         # API endpoint definitions (/api/v1/...)
│   ├── server.js           # Server Entry Point
│   └── package.json        # Dependensi server
│
└── /backend-osint          # Python FastAPI microservice (Stealth Recon engine)
    ├── /app
    │   ├── /services       # Mesin crawler web & visual search API
    │   ├── /utils          # Generator PDF laporan & kompresor gambar
    │   └── main.py         # Entry point microservice
    └── requirements.txt    # Library Python (BeautifulSoup, requests, ReportLab)
```

---

## ⚙️ Arahan Arsitektur Backend Server

### 1. Sistem Autentikasi & MFA (Multi-Factor Authentication)
- **Teknologi**: Gunakan **JSON Web Tokens (JWT)** yang ditandatangani dengan algoritma HS256/RS256.
- **MFA flow**: 
  1. User memasukkan email di endpoint `/api/auth/login`.
  2. Server memvalidasi email, membuat kode OTP 6 digit acak yang disimpan sementara di Redis dengan waktu kedaluwarsa 60 detik.
  3. Server mengirimkan OTP tersebut ke email target menggunakan SMTP (Nodemailer / SendGrid).
  4. User mengirimkan OTP ke endpoint `/api/auth/verify`. Jika valid, server mengembalikan JWT Token untuk sesi autentikasi.

### 2. Sinkronisasi Global Chat (WebSockets)
- **Teknologi**: Gunakan **Socket.io** pada Node.js backend.
- **Alur**:
  - Saat user sukses login, inisialisasi koneksi WebSocket aman (`wss://`).
  - Lakukan broadcast status user online ke semua node aliansi.
  - Setiap pesan baru yang dikirimkan di Global Chat disimpan ke database MongoDB dan disebarkan secara real-time ke semua client yang terhubung via event `chat:message`.

### 3. OpenCTI Live Feed Integration
- **Teknologi**: Backend-core menjalankan cron job internal (misalnya menggunakan library `node-cron`) setiap 15 menit.
- **Tugas**:
  - Mengambil data kerentanan terbaru dari API publik NVD CVE / CIRCL.
  - Memasukkan data tersebut ke database dan memancarkan data terbaru ke klien dashboard keamanan via endpoint `/api/security/cti-feed`.

### 4. Penyimpanan Musik & Scene Gambar
- **Teknologi**: Penyimpanan object storage pihak ketiga (misalnya AWS S3, Cloudinary, atau MinIO).
- **Prosedur**:
  - Admin mengunggah file musik (.mp3) atau gambar scene (.png/.jpg) via dashboard.
  - Backend menerima file (menggunakan middleware `multer`), menyimpannya di Cloud Object Storage, lalu mencatat URL publiknya ke dalam database MongoDB.
  - Klien mengambil daftar aset dinamis ini saat inisialisasi aplikasi Zenith Prime Labs.

---

*Panduan arsitektur ini dirancang khusus untuk Zenith Prime Labs agar siap dimigrasikan dari frontend statis saat ini ke backend dinamis sesungguhnya.*
