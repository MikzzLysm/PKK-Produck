const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve file statis (index.html, app.js, css, dll)

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // default XAMPP
  password: "",       // default kosong
  database: "switch_on"
});

db.connect(err => {
  if (err) {
    console.error("Koneksi gagal:", err);
    return;
  }
  console.log("✅ MySQL connected...");
});

// Route utama -> buka index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint untuk simpan pesanan
app.post("/pesan", (req, res) => {
  const { nama, kelas, jurusan, metode_pembayaran } = req.body;

  // Validasi input
  if (!nama || !kelas || !jurusan || !metode_pembayaran) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  // Validasi metode pembayaran hanya QRIS atau Cash
  const validMethods = ['QRIS', 'Cash'];
  if (!validMethods.includes(metode_pembayaran)) {
    return res.status(400).json({ message: "Metode pembayaran tidak valid" });
  }

  const sql = "INSERT INTO pesanan (nama, kelas, jurusan, metode_pembayaran) VALUES (?, ?, ?, ?)";
  db.query(sql, [nama, kelas, jurusan, metode_pembayaran], (err, result) => {
    if (err) {
      console.error("❌ Gagal simpan data:", err);
      return res.status(500).json({ message: "Gagal simpan data", error: err });
    }
    res.json({ message: "✅ Pesanan berhasil disimpan!", id: result.insertId });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server running di http://localhost:${port}`);
});
