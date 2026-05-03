import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Re-calculate grid on resize
    };
    
    window.addEventListener('resize', setCanvasDimensions);

    // Altıgen (Hexagon) matematiği
    const hexRadius = 45; // Altıgenin boyutu
    const hexHeight = hexRadius * Math.sqrt(3);
    const hexWidth = hexRadius * 2;
    // Izgara kaydırma (offset) miktarları
    const xOffset = hexRadius * 1.5;
    const yOffset = hexHeight;

    let hexagons = [];

    class Hexagon {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.targetScale = 1;
        this.scale = 1;
        
        // Renkler: Normalde çok silik, etkileşime girildiğinde belirginleşecek
        // Indigo ve Violet'in çok açık tonları
        this.baseColor = Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(139, 92, 246, 0.15)';
        // Hover durumunda parlak Sky Blue
        this.activeColor = 'rgba(56, 189, 248, 0.7)';
      }

      update(time) {
        let dx = mouse.x - this.baseX;
        let dy = mouse.y - this.baseY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && mouse.x !== -1000) {
          // Fare etkileşimi: Farenin etrafındaki altıgenler küçülür ve fareye doğru hafifçe çekilir
          this.targetScale = 0.3 + (dist / 180) * 0.7; // Farenin merkezine ne kadar yakınsa o kadar küçülür
          this.x = this.baseX + (dx / dist) * 12; // Fareye doğru hafif çekim
          this.y = this.baseY + (dy / dist) * 12;
        } else {
          // Kendi başına (Otonom) Nefes Alma Dalgası:
          // X ve Y koordinatlarına dayalı matematiksel bir dalga (Sinüs) formülü
          let wave = Math.sin(this.baseX * 0.005 + this.baseY * 0.005 + time) * 0.15;
          this.targetScale = 1 + wave;
          this.x = this.baseX;
          this.y = this.baseY;
        }

        // Akıcı animasyon için mevcut boyutu hedef boyuta yumuşakça (Lerp) yaklaştır
        this.scale += (this.targetScale - this.scale) * 0.15;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale); // Büyüklüğü ayarla
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          // 6 köşeli poligon çizimi
          let angle = (Math.PI / 3) * i;
          let px = hexRadius * Math.cos(angle);
          let py = hexRadius * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        
        // İçini doldurmak yerine sadece kenarlarını (Wireframe) çiziyoruz
        ctx.lineWidth = 1.5;
        // Fareyle etkileşime girip küçülüyorsa rengi parlak yap, yoksa soluk kalsın
        ctx.strokeStyle = this.scale < 0.8 ? this.activeColor : this.baseColor;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    const init = () => {
      hexagons = [];
      // Ekranı kaplayacak kadar sütun ve satır sayısını hesapla
      let cols = Math.ceil(canvas.width / xOffset) + 2;
      let rows = Math.ceil(canvas.height / yOffset) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          let x = col * xOffset;
          let y = row * yOffset;
          // Arı peteği (Honeycomb) dizilimi için her ikinci sütunu yarım boy aşağı kaydır
          if (col % 2 !== 0) {
            y += hexHeight / 2;
          }
          hexagons.push(new Hexagon(x, y));
        }
      }
    };

    // İlk çalıştırmada boyutları ayarla ve ızgarayı oluştur
    setCanvasDimensions();

    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.03;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let hex of hexagons) {
        hex.update(time);
        hex.draw();
      }
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
    <div className="background-animation-container" style={{ background: '#f8fafc' }}>
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default BackgroundAnimation;
