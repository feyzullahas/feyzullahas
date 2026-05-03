import { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let paths = [];
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Mouse interaction
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

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

    // Path class for circuit lines
    class Path {
      constructor(x, y) {
        this.reset(x, y);
      }

      reset(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        // Align to a virtual 20x20 grid
        this.x = Math.floor(this.x / 20) * 20;
        this.y = Math.floor(this.y / 20) * 20;
        
        this.history = [{ x: this.x, y: this.y }];
        this.maxLength = Math.floor(Math.random() * 25) + 10;
        this.speed = 2; // Must divide grid size (20) perfectly
        this.dir = Math.floor(Math.random() * 4); // 0: right, 1: down, 2: left, 3: up
        
        const colors = [
          'rgba(99, 102, 241, 0.6)', // Indigo
          'rgba(139, 92, 246, 0.6)', // Violet
          'rgba(167, 139, 250, 0.4)'  // Lighter violet
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.isDead = false;
      }

      update() {
        if (this.isDead) return;

        let dx = 0, dy = 0;
        if (this.dir === 0) dx = this.speed;
        if (this.dir === 1) dy = this.speed;
        if (this.dir === 2) dx = -this.speed;
        if (this.dir === 3) dy = -this.speed;

        this.x += dx;
        this.y += dy;

        // Check bounds
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.isDead = true;
          return;
        }

        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }

        // Only allow turning when aligned with the 20x20 grid
        if (this.x % 20 === 0 && this.y % 20 === 0) {
          // Check mouse collision
          let distX = mouse.x - this.x;
          let distY = mouse.y - this.y;
          let dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < mouse.radius) {
            // Force turn away from mouse
            if (Math.abs(distX) > Math.abs(distY)) {
              this.dir = distX > 0 ? 2 : 0; // go left if mouse is right, etc.
            } else {
              this.dir = distY > 0 ? 3 : 1;
            }
          } else if (Math.random() < 0.15) {
            // Random chance to turn 90 degrees
            this.dir = (this.dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
          }
        }
      }

      draw() {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        // Draw the glowing head of the data packet
        const head = this.history[this.history.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('0.6)', '1)').replace('0.4)', '0.8)');
        ctx.fill();
        
        // Add a subtle glow to the head
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      }
    }

    // Initialize paths
    const init = () => {
      paths = [];
      // Adjust density based on screen size
      let numberOfPaths = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < numberOfPaths; i++) {
        paths.push(new Path());
      }
    };

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < paths.length; i++) {
        paths[i].update();
        paths[i].draw();
        
        if (paths[i].isDead) {
          // Random delay before respawning a path
          if (Math.random() < 0.05) { 
            paths[i].reset();
          }
        }
      }
    };

    init();
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
