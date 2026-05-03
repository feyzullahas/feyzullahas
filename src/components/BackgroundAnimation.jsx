import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseOut = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', setCanvasDimensions);

    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 200;
    let particles = [];

    const colors = [
      { r: 99, g: 102, b: 241 },   // Indigo
      { r: 139, g: 92, b: 246 },   // Violet
      { r: 56, g: 189, b: 248 },   // Sky Blue
      { r: 236, g: 72, b: 153 },   // Pink
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.color = this.baseColor;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitSpeed = (Math.random() - 0.5) * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time) {
        // Sürekli yavaş hareket
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.orbitSpeed;

        // Ekran sınırlarından sekme
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Fare etkileşimi
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && mouse.active) {
          // Fareye doğru çekim kuvveti
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;

          // Fare yakınında büyüme ve parlaklık
          this.radius = this.baseRadius * (1 + force * 2);
          this.color = { r: 56, g: 189, b: 248 }; // Sky Blue
        } else {
          // Normal nefes alma animasyonu
          const pulse = Math.sin(time + this.pulsePhase) * 0.3 + 1;
          this.radius = this.baseRadius * pulse;
          this.color = this.baseColor;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const isNearMouse = mouse.active && 
          Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2) < mouseRadius;

        const alpha = isNearMouse ? 1 : 0.6;
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.fill();

        // Parlama efekti
        if (isNearMouse) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Fare ile parçacık arasındaki bağlantılar
        if (mouse.active) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius * 1.5) {
            const alpha = (1 - dist / (mouseRadius * 1.5)) * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    setCanvasDimensions();

    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Arka plan gradyan
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'rgba(248, 250, 252, 1)');
      gradient.addColorStop(1, 'rgba(241, 245, 249, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bağlantıları çiz
      drawConnections();

      // Parçacıkları güncelle ve çiz
      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });

      ctx.shadowBlur = 0;
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="background-animation-container">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default BackgroundAnimation;
