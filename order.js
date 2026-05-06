document.addEventListener('DOMContentLoaded', function () {
  // ambil semua tombol "Beli Sekarang"
  const buyButtons = document.querySelectorAll('[data-bs-target="#orderModal"]');

  buyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const productCard = btn.closest('.card');
      const imgSrc = productCard.querySelector('.card-img-top').src;
      const name = productCard.querySelector('h5').textContent;
      const price = productCard.querySelector('.text-muted').textContent;

      // isi modal pesanan - cek apakah elemen ada
      const modalImg = document.querySelector('#orderModal .order-card img');
      const modalName = document.querySelector('#orderModal .order-card h6');
      const modalPrice = document.querySelector('#orderModal .order-card p.text-muted');
      const modalTotal = document.querySelector('#orderModal .order-card p.fw-bold');
      
      if (modalImg && modalName && modalPrice && modalTotal) {
        modalImg.src = imgSrc;
        modalName.textContent = name;
        modalPrice.textContent = `1 x ${price}`;
        modalTotal.textContent = `Total Harga: ${price}`;
      }
    });
  });

  // handle submit form - cek apakah form ada
  const orderForm = document.getElementById('orderForm');
  const orderModalEl = document.getElementById('orderModal');
  const thankYouModalEl = document.getElementById('thankYouModal');
  
  if (orderForm && orderModalEl && thankYouModalEl) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const orderModal = bootstrap.Modal.getInstance(orderModalEl);
      if (orderModal) orderModal.hide();

      const thankYouModal = new bootstrap.Modal(thankYouModalEl);
      thankYouModal.show();
    });
  }
});


