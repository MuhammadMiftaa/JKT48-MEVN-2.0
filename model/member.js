import mongoose from "mongoose"

const memberSchema = new mongoose.Schema({
    id: Number,
    nama: String,
    generasi: Number,
    asal: String,
    nama_panggilan: String,
    umur: Number,
    salam_perkenalan: String,
    tanggal_bergabung: String,
    fanbase: String,
    kota_lahir: String,
    tanggal_lahir: String,
    nama_lengkap: String,
    universitas: String,
    jurusan: String,
    foto: String,
    member_regular: Boolean,
    username_idn: String,
    username_ig: String,
    username_sr: String,
    username_tiktok: String,
    username_x: String
})

const Member = mongoose.model('Member', memberSchema)

export default Member