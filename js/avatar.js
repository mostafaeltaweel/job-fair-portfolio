/**
 * INTERACTIVE 3D AVATAR MOTION & PHYSICS ENGINE
 * Controls 3D orientation, mouse follow, breathing physics, draggable placement, and speech sync.
 */

class AvatarEngine {
  constructor(avatarElementId, containerElementId) {
    this.avatar = document.getElementById(avatarElementId);
    this.container = document.getElementById(containerElementId);
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.targetRotateX = 0;
    this.targetRotateY = 0;
    this.currentRotateX = 0;
    this.currentRotateY = 0;
    this.isSpeaking = false;

    this.init();
  }

  init() {
    if (!this.avatar || !this.container) return;

    // Mouse move tracking (3D parallax tilt & look-at)
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Touch move tracking for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.onMouseMove(e.touches[0]);
      }
    }, { passive: true });

    // Drag & Reposition physics
    this.container.addEventListener('mousedown', (e) => this.onDragStart(e));
    window.addEventListener('mousemove', (e) => this.onDragMove(e));
    window.addEventListener('mouseup', () => this.onDragEnd());

    // Touch drag for mobile
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) this.onDragStart(e.touches[0]);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) this.onDragMove(e.touches[0]);
    }, { passive: true });
    window.addEventListener('touchend', () => this.onDragEnd());

    // Click on avatar to trigger reaction
    this.avatar.addEventListener('click', () => {
      this.triggerReaction();
    });

    // Start render loop for smooth interpolation
    this.renderLoop();
  }

  onMouseMove(e) {
    if (this.isDragging) return;

    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    // Subtle 3D tilt angles
    this.targetRotateY = deltaX * 14;  // Tilt left-right up to 14 deg
    this.targetRotateX = -deltaY * 10; // Tilt up-down up to 10 deg
  }

  onDragStart(e) {
    this.isDragging = true;
    this.startX = e.clientX - this.currentX;
    this.startY = e.clientY - this.currentY;
    this.container.style.cursor = 'grabbing';
    this.container.style.transition = 'none';
  }

  onDragMove(e) {
    if (!this.isDragging) return;
    this.currentX = e.clientX - this.startX;
    this.currentY = e.clientY - this.startY;
  }

  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.container.style.cursor = 'grab';
    this.container.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    // Spring back gently towards natural side position
    this.currentX = 0;
    this.currentY = 0;
  }

  setSpeaking(speaking) {
    this.isSpeaking = speaking;
    if (speaking) {
      this.avatar.classList.add('avatar-speaking');
    } else {
      this.avatar.classList.remove('avatar-speaking');
    }
  }

  triggerReaction() {
    this.avatar.style.transform = 'scale(1.08) translateY(-10px)';
    setTimeout(() => {
      this.avatar.style.transform = '';
    }, 300);

    // Trigger greeting speech
    if (window.appController) {
      window.appController.handleAvatarClick();
    }
  }

  renderLoop() {
    // Linear interpolation (lerp) for ultra-smooth 60fps feel
    this.currentRotateX += (this.targetRotateX - this.currentRotateX) * 0.08;
    this.currentRotateY += (this.targetRotateY - this.currentRotateY) * 0.08;

    if (!this.isDragging) {
      this.avatar.style.transform = `perspective(1000px) rotateY(${this.currentRotateY.toFixed(2)}deg) rotateX(${this.currentRotateX.toFixed(2)}deg)`;
    } else {
      this.container.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}
