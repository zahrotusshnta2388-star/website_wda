/* =========================================
   1. DATA MENU ASLI E-CAFE
========================================= */

const RAW_MENU = {
    "Ramen|Ramen": [
        ["Spicy Ramen", 18, 24],
        ["Shoyu Ramen", 18, 22],
        ["Shio Ramen", 18, 20],
        ["Creamy Paitan Ramen", 22, 6],
        ["Spicy Chicken Feet", 12]
    ],

    "Yakitori|Yakitori": [
        ["Tare Tori", 13, 30],
        ["Spicy Tori", 13],
        ["Nori Tori", 13]
    ],

    "Makanan|Main Course": [
        ["Curry Katsu", 20],
        ["Katsu Volcano", 16],
        ["Katsu Garlic Spicy", 16],
        ["Karage Original", 16],
        ["Karage Volcano", 16],
        ["Karage Garlic Spicy", 16],
        ["Karage Barbeque", 16],
        ["Ayam Bakar Pedas", 14],
        ["Nasi Nori", 5],
        ["Chicken Saus Katsudon", 18],
        ["Katsu Original", 16]
    ],

    "Paket Hemat|Paket Hemat": [
        ["Paket 1", 22, 0, "Ramen Shio / Shoyu / Spicy + Squash"],
        ["Paket 2", 18, 0, "Nasi Ayam Bakar + Squash"],
        ["Paket 3", 14, 0, "Nasi Ayam Serundeng + Es Teh"],
        ["Paket Combo", 70, 0, "2 Porsi Ramen + 2 Ice Coffee + 2 Ice Cream"]
    ],

    "Makanan|Snack": [
        ["Cireng", 12],
        ["Mix Platter", 12],
        ["Tempe Selimut", 12],
        ["French Fries", 12]
    ],

    "Makanan|Lainnya": [
        ["Milky Pudding", 15],
        ["Choco Pudding", 15],
        ["Skin Karage", 13]
    ],

    "Coffee Menu|Coffee Menu": [
        ["Espresso", 18],
        ["Lungo", 18],
        ["Cafe Latte", 18, 42],
        ["Americano", 18],
        ["Cappuccino", 18],
        ["Macchiato", 18]
    ],

    "Coffee Menu|Oriental Menu Filter": [
        ["Arabika + Honey", 18],
        ["Arabika + Pine + Brown Sugar", 18],
        ["Arabika + Caramel", 18],
        ["Arabika + Vanilla", 18],
        ["Arabika + Hazelnut", 18],
        ["Arabika", 20]
    ],

    "Coffee Menu|Ice Coffee": [
        ["Matcha Coffee", 13],
        ["Vanilla Coffee", 13],
        ["Vanila Mocha", 13],
        ["Caramel Coffee", 13],
        ["Hazelnut Coffee", 13],
        ["Taro Coffee", 13],
        ["Avocado Coffee", 13]
    ],

    "Drink Menu|Squash": [
        ["Lychee Squash", 8],
        ["Pine Squash", 8],
        ["Strawberry Squash", 8],
        ["Passion Fruit Squash", 8]
    ],

    "Drink Menu|Mojito": [
        ["Lychee Mojito", 15],
        ["Strawberry Mojito", 15]
    ],

    "Drink Menu|Choco Based": [
        ["Choco Macaroon", 15],
        ["Choco Caramel", 15],
        ["Choco Vanilla", 15],
        ["Choco Hazelnut", 15]
    ],

    "Drink Menu|Matcha Based": [
        ["Matcha Original", 15],
        ["Matcha Milk", 15],
        ["Matcha Strawberry", 15]
    ]
};


/* =========================================
   2. MENU NAVIGASI MOBILE
========================================= */

const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.navigation');

if (navToggle && navigation) {

    navToggle.addEventListener('click', () => {

        const opened = navigation.classList.toggle('open');

        navToggle.setAttribute('aria-expanded', String(opened));
        navToggle.textContent = opened ? '×' : '☰';

    });

    // Menutup menu setelah link diklik
    navigation.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            navigation.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';

        });

    });

}


/* =========================================
   3. TAHUN OTOMATIS PADA FOOTER
========================================= */

document.querySelectorAll('[data-year]').forEach(item => {

    item.textContent = new Date().getFullYear();

});


/* =========================================
   4. FUNGSI NAMA FOTO OTOMATIS
   FORMAT: nama_menu.jpg
========================================= */

function getMenuImage(nama) {

    const namaFile = nama
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');

    return `images/menu/${namaFile}.jpg`;

}


/* =========================================
   5. MENGUBAH RAW_MENU MENJADI DATA MENU
========================================= */

const menuData = [];

Object.entries(RAW_MENU).forEach(([key, items]) => {

    const [kategori, subkategori] = key.split('|');

    items.forEach(item => {

        const nama = item[0];
        const harga = item[1];
        const stok = item[2] ?? 0;
        const deskripsi = item[3] ?? '';

        const kategoriUtama =
            kategori === 'Ramen' ||
            kategori === 'Yakitori' ||
            kategori === 'Makanan' ||
            kategori === 'Paket Hemat'
                ? 'makanan'
                : 'minuman';

        menuData.push({
            nama,
            harga,
            stok,
            deskripsi,
            kategori: kategoriUtama,
            subkategori,
            gambar: getMenuImage(nama)
        });

    });

});


/* =========================================
   6. MEMBUAT KARTU MENU OTOMATIS
========================================= */

function tampilkanMenu(data) {

    const menuGrid = document.querySelector('#menuGrid');

    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    if (data.length === 0) {

        menuGrid.innerHTML = `
            <p class="notice">Menu belum tersedia.</p>
        `;

        return;

    }

    data.forEach(menu => {

        const card = document.createElement('article');

        card.className = 'food-card';

        card.dataset.category = menu.kategori;


        // Foto menu
        const img = document.createElement('img');

        img.src = menu.gambar;

        img.alt = menu.nama;

        img.loading = 'lazy';

        img.onerror = function () {

            this.onerror = null;

            this.src = 'images/menu/default.jpg';

        };


        // Isi kartu
        const content = document.createElement('div');

        const category = document.createElement('span');

        category.textContent = menu.subkategori;


        const title = document.createElement('h3');

        title.textContent = menu.nama;


        const description = document.createElement('p');

        description.textContent = menu.deskripsi ||
            `Pilihan ${menu.subkategori} dari E-Cafe Engineering.`;


        // Menggabungkan elemen
        content.append(category, title, description);

        card.append(img, content);

        menuGrid.appendChild(card);

    });

}


/* =========================================
   7. FILTER KATEGORI MENU
========================================= */

const filterButtons = document.querySelectorAll('[data-filter]');

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        const category = button.dataset.filter;

        // Mengatur tombol filter aktif
        filterButtons.forEach(item => {

            item.classList.toggle('active', item === button);

        });

        // Menampilkan menu sesuai kategori
        const hasil = category === 'all'
            ? menuData
            : menuData.filter(menu => menu.kategori === category);

        tampilkanMenu(hasil);

    });

});


/* =========================================
   8. TAMPILKAN SEMUA MENU SAAT HALAMAN DIBUKA
========================================= */

tampilkanMenu(menuData);