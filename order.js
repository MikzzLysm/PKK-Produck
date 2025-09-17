document.addEventListener('DOMContentLoaded', function () {
  // ambil semua tombol "Beli Sekarang"
  const buyButtons = document.querySelectorAll('[data-bs-target="#orderModal"]');

  buyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const productCard = btn.closest('.card');
      const imgSrc = productCard.querySelector('.card-img-top').src;
      const name = productCard.querySelector('h5').textContent;
      const price = productCard.querySelector('.text-muted').textContent;

      // isi modal pesanan
      document.querySelector('#orderModal .order-card img').src = imgSrc;
      document.querySelector('#orderModal .order-card h6').textContent = name;
      document.querySelector('#orderModal .order-card p.text-muted').textContent = `1 x ${price}`;
      document.querySelector('#orderModal .order-card p.fw-bold').textContent = `Total Harga: ${price}`;
    });
  });

  // handle submit form
  const orderForm = document.getElementById('orderForm');
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    orderModal.hide();

    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
    thankYouModal.show();
  });
});


