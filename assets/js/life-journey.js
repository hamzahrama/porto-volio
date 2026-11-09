// Life Journey Album - Photo Loader
const albumPhotos = [
    // Education photos
    { src: 'photos/mi-muhammadiyah.jpg', title: 'MI Muhammadiyah Undaan', desc: 'Pendidikan Dasar 6 Tahun', category: 'education' },
    { src: 'photos/mts-maahid.jpg', title: 'MTs Ma\'ahid Kudus', desc: 'SMP di Pesantren', category: 'education' },
    { src: 'photos/ma-maahid.jpg', title: 'MA Ma\'ahid Kudus', desc: 'SMA & Osis', category: 'education' },
    { src: 'photos/panti-melati.jpg', title: 'Panti Asuhan Yatim Melati', desc: '6 Tahun Menetap & Belajar', category: 'education' },
    { src: 'photos/pondok-it.jpg', title: 'Pondok IT Bantul', desc: 'Belajar Tech Saat Ini', category: 'education' },

    // Organization photos
    { src: 'photos/samapala.jpg', title: 'SAMAPALA', desc: 'Santri Pencinta Alam', category: 'organization' },
    { src: 'photos/ipm-ahmad-dahlan.jpg', title: 'IPM Ahmad Dahlan', desc: 'Sekretaris Bidang', category: 'organization' },
    { src: 'photos/ipm-undaan.jpg', title: 'IPM PC Undaan', desc: 'Anggota Perkaderan', category: 'organization' },
    { src: 'photos/ipm-kudus.jpg', title: 'Fasilitator PD IPM Kudus', desc: 'Pengembangan Diri', category: 'organization' },

    // Memory photos (from user uploads)
    { src: 'photos/pantai.jpg', title: 'Pantai & Sunset', desc: 'Beach Vibes & Recharging', category: 'memory' },
    { src: 'photos/malam-api.jpg', title: 'Malam di Alam', desc: 'Kegiatan Outdoor Pramuka', category: 'memory' },
    { src: 'photos/beladiri-lomba.jpg', title: 'Lomba Bela Diri', desc: 'Prestasi Perlombaan Bela Diri', category: 'memory' },
];

let currentFilter = 'all';

function initAlbum() {
    const grid = document.getElementById('albumGrid');
    const filters = document.getElementById('albumFilters');
    if (!grid || !filters) return;

    grid.innerHTML = '';

    albumPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'album-item';
        item.dataset.category = photo.category;
        item.style.animationDelay = `${0.1 + index * 0.05}s`;
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="album-placeholder" style="display:none; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:var(--bg-tertiary); color:var(--text-muted); font-size:0.875rem; text-align:center; padding:20px;">
                <i class="fas fa-image" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
                Foto: ${photo.title}
            </div>
            <div class="album-overlay">
                <span class="album-title">${photo.title}</span>
                <span class="album-desc-text">${photo.desc}</span>
            </div>
        `;
        grid.appendChild(item);
    });

    // Filter button handlers
    filters.querySelectorAll('.album-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            setFilter(filter);
        });
    });
}

function setFilter(filter) {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.album-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Filter items
    document.querySelectorAll('.album-item').forEach(item => {
        const category = item.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
            item.classList.remove('hidden');
            item.style.animation = 'none';
            item.offsetHeight; // trigger reflow
            item.style.animation = '';
        } else {
            item.classList.add('hidden');
        }
    });
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', initAlbum);

// Re-init on theme change (if needed)
const observer = new MutationObserver(() => {
    initAlbum();
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });