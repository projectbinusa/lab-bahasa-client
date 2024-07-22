// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  id: {
    translation: {
      "Meeting ID": "ID Pertemuan",
      "Participants": "Peserta",
      "Join Now": "Bergabung ke Pertemuan",
      "Leave Meeting": "Keluar dari Pertemuan",
      "Access Denied": "Akses Ditolak",
      "You are not allowed to access this room.": "Anda tidak diizinkan untuk mengakses ruangan ini.",
      "Settings": "Pengaturan",
      "Check your audio and video": "Periksa audio dan video Anda",
      "Turn off mic": "Matikan mikrofon",
      "Turn off camera": "Matikan kamera",
      "Meeting is connecting": "Menghubungkan ke pertemuan",
      "You": "Anda",
      "Turn off webcam": "Matikan kamera",
      "Present Screen": "Bagikan layar",
      "More Options": "Menu",
      "Participants": "Anggota",
      "Open popup": "Buka popup",
      "Leave": "Keluar",
      "End": "Selesai",
      "Only you will leave the call" : "Hanya anda yang akan meninggalkan panggilan",
      "End call for all participants": "Akhiri panggilan untuk semua peserta",
      "Write your message": "Ketik suatu pesan",
      "You have left the meeting!": "Anda telah meninggalkan rapat!",
      "Rejoin Meeting": "Join meet kembali"
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
