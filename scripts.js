document.addEventListener('DOMContentLoaded', function() {
    const services = [
        {
            name: 'Joki Free Fire Rank Boosting',
            ranks: [
                { name: 'Bronze ke Silver', price: 'Rp 20.000 - Rp 50.000' },
                { name: 'Silver ke Gold', price: 'Rp 50.000 - Rp 100.000' },
                { name: 'Gold ke Platinum', price: 'Rp 100.000 - Rp 200.000' },
                { name: 'Platinum ke Diamond', price: 'Rp 200.000 - Rp 400.000' },
                { name: 'Diamond ke Heroic', price: 'Rp 400.000 - Rp 800.000' }
            ],
            description: 'Layanan joki untuk meningkatkan rank akun Free Fire Anda.',
            image: 'ff_service_image.jpg'
        },
        {
            name: 'Joki Mobile Legends Rank Boosting',
            ranks: [
                { name: 'Warrior ke Elite', price: 'Rp 10.000 - Rp 30.000' },
                { name: 'Elite ke Master', price: 'Rp 30.000 - Rp 60.000' },
                { name: 'Master ke Grandmaster', price: 'Rp 60.000 - Rp 99.000' },
                { name: 'Grandmaster ke Epic', price: 'Rp 100.000 - Rp 130.000' },
                { name: 'Epic ke Legend', price: 'Rp 240.000 - Rp 380.000' },
                { name: 'Legend ke Mythic', price: 'Rp 380.000 - Rp 700.000' }
            ],
            description: 'Layanan joki untuk meningkatkan rank akun Mobile Legends Anda.',
            image: 'ml_service_image.jpg'
        }
    ];

    const serviceList = document.getElementById('service-list');
    const cart = [];
    
    function updateCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Keranjang jasa kosong</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <p>${item.serviceName} (${item.rankName}) - ${item.price}</p>
                `;
                cartContainer.appendChild(cartItem);
            });
        }
        
        // Show or hide the checkout button based on cart contents
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.style.display = cart.length > 0 ? 'block' : 'none';
    }

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.classList.add('col-lg-4', 'col-md-6', 'mb-4');
        
        const ranksOptions = service.ranks.map(rank => 
            `<option value="${rank.name}" data-price="${rank.price}">${rank.name} (${rank.price})</option>`
        ).join('');

        serviceCard.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top" src="${service.image}" alt="${service.name}">
                <div class="card-body">
                    <h4 class="card-title">${service.name}</h4>
                    <p class="card-text">${service.description}</p>
                    <select class="form-control rank-select">
                        <option value="" disabled selected>Pilih Rank</option>
                        ${ranksOptions}
                    </select>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary buy-now-btn" disabled>Pesan Sekarang</button>
                </div>
            </div>
        `;

        const rankSelect = serviceCard.querySelector('.rank-select');
        const buyNowBtn = serviceCard.querySelector('.buy-now-btn');

        rankSelect.addEventListener('change', function() {
            buyNowBtn.disabled = !this.value;
        });

        buyNowBtn.addEventListener('click', function() {
            const selectedRank = rankSelect.options[rankSelect.selectedIndex];
            cart.push({
                serviceName: service.name,
                rankName: selectedRank.value,
                price: selectedRank.getAttribute('data-price')
            });
            updateCart();
        });

        serviceList.appendChild(serviceCard);
    });

    document.getElementById('checkout-btn').addEventListener('click', function() {
        const totalAmount = cart.reduce((total, item) => {
            const priceRange = item.price.split(' - ');
            const minPrice = parseInt(priceRange[0].replace(/[^0-9]/g, ''));
            const maxPrice = parseInt(priceRange[1].replace(/[^0-9]/g, ''));
            return total + ((minPrice + maxPrice) / 2);
        }, 0);
        document.getElementById('total-amount').textContent = `Rp ${totalAmount.toLocaleString('id-ID')}`;
        
        // Update modal body with the price ranges of selected items
        const selectedItems = cart.map(item => `<li>${item.serviceName} (${item.rankName}): ${item.price}</li>`).join('');
        document.querySelector('#paymentModal .modal-body').insertAdjacentHTML('beforeend', `
            <ul>${selectedItems}</ul>
        `);

        $('#paymentModal').modal('show');
    });

    updateCart();
});
