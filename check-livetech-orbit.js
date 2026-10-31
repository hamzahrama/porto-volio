// Quick check for Living Technology Orbit functionality
console.log('🔍 Checking Living Technology Orbit implementation...');

// Check if LivingTechOrbit class exists
if (typeof LivingTechOrbit === 'undefined') {
    console.error('❌ LivingTechOrbit class not found');
    alert('LivingTechOrbit class not found - check living-tech-orbit.js');
} else {
    console.log('✅ LivingTechOrbit class found');
}

// Check if we have a canvas element
const canvas = document.querySelector('.tech-orbit-canvas');
if (!canvas) {
    console.error('❌ tech-orbit-canvas not found');
} else {
    console.log('✅ tech-orbit-canvas found');
    console.log('📊 Canvas attributes:', {
        width: canvas.width,
        height: canvas.height,
        styleWidth: canvas.style.width,
        styleHeight: canvas.style.height
    });
}

// Check if we have tech items
const techItems = document.querySelectorAll('.orbit-item-tech');
if (techItems.length === 0) {
    console.error('❌ No orbit items found');
} else {
    console.log(`✅ Found ${techItems.length} technology orbit items`);
    techItems.forEach((item, index) => {
        const title = item.getAttribute('title');
        console.log(`   ${index + 1}. ${title || 'Unnamed Tech'}`);
    });
}

// Check if we have the profile image
const profileImage = document.querySelector('.tech-profile-image');
if (!profileImage) {
    console.error('❌ Profile image not found');
} else {
    console.log('✅ Profile image found:', profileImage.src);
}

// Check if the main.js script loads properly
const script = document.querySelector('script[src="assets/js/main.js"]');
if (!script) {
    console.error('❌ main.js script not found');
} else {
    console.log('✅ main.js script loaded');
}

// Check if the living-tech-orbit.js script loads properly
const livingTechScript = document.querySelector('script[src="assets/js/living-tech-orbit.js"]');
if (!livingTechScript) {
    console.error('❌ living-tech-orbit.js script not found');
} else {
    console.log('✅ living-tech-orbit.js script loaded');
}

console.log('\n🎉 Living Technology Orbit implementation check complete!');

// Try to initialize if everything looks good
if (typeof LivingTechOrbit !== 'undefined' && canvas && techItems.length > 0) {
    console.log('🚀 Attempting to initialize LivingTechOrbit...');
    setTimeout(() => {
        try {
            if (typeof window.techOrbit === 'undefined') {
                window.techOrbit = new LivingTechOrbit();
                console.log('🎯 LivingTechOrbit successfully initialized!');
            }
        } catch (error) {
            console.error('❌ Error initializing LivingTechOrbit:', error);
        }
    }, 100);
}