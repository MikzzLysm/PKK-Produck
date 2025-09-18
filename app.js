document.addEventListener("DOMContentLoaded", function () {
  const orderForm = document.getElementById("orderForm");

  orderForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Ambil value input form
    const nama = orderForm.querySelector('input[placeholder="Nama Anda"]').value;
    const kelas = orderForm.querySelector('input[placeholder="Kelas Anda"]').value;
    const jurusan = orderForm.querySelector('input[placeholder="Jurusan Anda"]').value;
    const metode = orderForm.querySelector('input[name="payment"]:checked')?.id;

    // Validasi input
    if (!nama || !kelas || !jurusan || !metode) {
      alert("⚠️ Lengkapi semua data!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/pesan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: nama,
          kelas: kelas,
          jurusan: jurusan,
          metode_pembayaran: metode
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Pesanan tersimpan:", data);

        // Tutup modal pesanan
        const orderModalEl = document.getElementById("orderModal");
        const orderModal = bootstrap.Modal.getInstance(orderModalEl);
        if (orderModal) orderModal.hide();

        // Tampilkan modal terima kasih
        const thankYouModalEl = document.getElementById("thankYouModal");
        const thankYouModal = new bootstrap.Modal(thankYouModalEl);
        thankYouModal.show();

        // Reset form
        orderForm.reset();
      } else {
        console.error("❌ Gagal simpan:", data.message);
        alert("Gagal simpan pesanan: " + data.message);
      }
    } catch (err) {
      console.error("⚠️ Error fetch:", err);
      alert("Tidak bisa terhubung ke server");
    }
  });
});
