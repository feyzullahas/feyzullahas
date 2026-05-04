import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', setCanvasDimensions);

    let particles = [];
    const particleCount = 110;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    class CodeParticle {
      constructor(index) {
        this.index = index;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 1.5 + Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        
        // İlk 90 tanesi kod sembolü, son 20 tanesi yazılım fonksiyonu
        if (index < 90) {
          // Kod sembolleri
          const symbols = ['{', '}', '(', ')', '[', ']', ';', '<', '>', '/', '=', '+', '-', '*'];
          this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
          
          // Renkler - syntax highlighter temalı
          const colors = [
            'rgba(147, 51, 234, 0.4)',  // Purple - keywords
            'rgba(59, 130, 246, 0.4)',   // Blue - functions
            'rgba(34, 197, 94, 0.4)',    // Green - strings
            'rgba(251, 146, 60, 0.4)',   // Orange - operators
            'rgba(239, 68, 68, 0.4)',    // Red - errors
          ];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
          // Yazılım fonksiyonları
          const functions = [
            'fetch()', 'map()', 'filter()', 'reduce()', 'sort()',
            'useState()', 'useEffect()', 'forEach()', 'push()', 'pop()',
            'async()', 'await', 'Promise', 'class', 'extends',
            'import', 'export', 'require()', 'module', 'const',
            'let', 'var', 'function', 'return', 'if', 'else'
          ];
          this.symbol = functions[Math.floor(Math.random() * functions.length)];
          
          // Özel renkler - yazılım fonksiyonları için
          const functionColors = [
            'rgba(139, 92, 246, 0.5)',  // Violet - functions
            'rgba(59, 130, 246, 0.5)',   // Blue - built-ins
            'rgba(16, 185, 129, 0.5)',   // Green - async
            'rgba(245, 158, 11, 0.5)',    // Amber - keywords
            'rgba(236, 72, 153, 0.5)',    // Pink - special
          ];
          this.color = functionColors[Math.floor(Math.random() * functionColors.length)];
        }
        
        this.opacity = 0.5 + Math.random() * 0.3;
        this.fadeSpeed = 0.005 + Math.random() * 0.01;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Opaklık animasyonu
        this.opacity += this.fadeDirection * this.fadeSpeed;
        if (this.opacity >= 0.8) {
          this.opacity = 0.8;
          this.fadeDirection = -1;
        } else if (this.opacity <= 0.5) {
          this.opacity = 0.5;
          this.fadeDirection = 1;
        }

        // Kenarlardan geri dön
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;

        // Fare etkileşimi - profesyonel
        const distToMouse = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2));
        if (distToMouse < 100) {
          const force = (100 - distToMouse) / 100;
          const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;
          this.opacity = Math.min(0.9, this.opacity + force * 0.4);
        }
      }

      draw() {
        ctx.save();
        ctx.font = `${this.size * 9}px 'Fira Code', 'Courier New', monospace`;
        ctx.fillStyle = this.color.replace('0.4', this.opacity.toString());
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Orta glow efekti
        ctx.shadowColor = this.color.replace('0.4', (this.opacity * 0.6).toString());
        ctx.shadowBlur = 12;
        
        ctx.fillText(this.symbol, this.x, this.y);
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new CodeParticle(i));
      }
    };

    const drawBackground = () => {
      // Profesyonel gradient arka plan
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(0.5, '#f1f5f9');
      gradient.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid pattern
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      // Yakın parçacıklar arasında bağlantılar
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const opacity = (1 - distance / 80) * 0.3;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    setCanvasDimensions();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 1;

      // Arka plan
      drawBackground();

      // Bağlantıları çiz
      drawConnections();

      // Parçacıkları çiz
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="background-animation-container">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
    </div>
  );
};

export default BackgroundAnimation;
