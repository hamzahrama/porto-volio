// Life Journey Album - Photo Loader
const albumPhotos = [
    // Education photos
    { src: 'photos/tk-aba.svg', title: 'TK ABA XIII Wates', desc: 'Awal Mula Pendidikan', category: 'education' },
    { src: 'photos/mi-muhammadiyah.svg', title: 'MI Muhammadiyah Undaan', desc: 'Pendidikan Dasar 6 Tahun', category: 'education' },
    { src: 'photos/mts-maahid.svg', title: 'MTs Ma\'ahid Kudus', desc: 'SMP di Pesantren', category: 'education' },
    { src: 'photos/ma-maahid.svg', title: 'MA Ma\'ahid Kudus', desc: 'SMA & Osis', category: 'education' },
    { src: 'photos/panti-melati.svg', title: 'Panti Asuhan Yatim Melati', desc: '6 Tahun Menetap & Belajar', category: 'education' },
    { src: 'photos/pondok-it.svg', title: 'Pondok IT Bantul', desc: 'Belajar Tech Saat Ini', category: 'education' },
    
    // Organization photos
    { src: 'photos/osis.svg', title: 'OSIS MA Ma\'ahid Kudus', desc: 'Kepemimpinan Siswa', category: 'organization' },
    { src: 'photos/samapala.svg', title: 'SAMAPALA', desc: 'Santri Pencinta Alam', category: 'organization' },
    { src: 'photos/ipm-ahmad-dahlan.svg', title: 'IPM Ahmad Dahlan', desc: 'Sekretaris Bidang', category: 'organization' },
    { src: 'photos/ipm-undaan.svg', title: 'IPM PC Undaan', desc: 'Anggota Perkaderan', category: 'organization' },
    { src: 'photos/ipm-kudus.svg', title: 'Fasilitator PD IPM Kudus', desc: 'Pengembangan Diri', category: 'organization' },
    
    // Memory photos (from user uploads)
    { src: 'photos/pondok-it-logo.svg', title: 'PONDOK IT Logo', desc: 'Tech School Branding', category: 'memory' },
    { src: 'photos/mts-ponpes.svg', title: 'MTS-PONPES Gedung', desc: 'Sekolah & Acara Jalan Sehat', category: 'memory' },
    { src: 'photos/ma-mahid-kudus.svg', title: 'MA & MTs Ma\'ahid Kudus', desc: 'Sekolah Asal', category: 'memory' },
    { src: 'photos/pelantikan.svg', title: 'Pelantikan Pengurus', desc: 'Acara Pelantikan Organisasi', category: 'memory' },
    { src: 'photos/wisuda.svg', title: 'Wisuda / Acara Keagamaan', desc: 'Momen Wisuda', category: 'memory' },
    { src: 'photos/yayasan-al-ikhsan.svg', title: 'Yayasan Al-Ikhsan Panti Asuhan', desc: 'Kumpul di Panti Asuhan', category: 'memory' },
    { src: 'photos/gunung.svg', title: 'Puncak Gunung', desc: 'Hiking & Reflection', category: 'memory' },
    { src: 'photos/pantai.svg', title: 'Pantai & Sunset', desc: 'Beach Vibes & Recharging', category: 'memory' },
    { src: 'photos/malam-api.svg', title: 'Malam di Alam', desc: 'Kegiatan Outdoor Pramuka', category: 'memory' },
    { src: 'photos/beladiri-lomba.svg', title: 'Lomba Bela Diri', desc: 'Prestasi Perlombaan Bela Diri', category: 'memory' },
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