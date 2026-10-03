import React, { useEffect, useRef } from 'react';

// Tunables for the node-graph background. Distances are in CSS pixels,
// speeds in pixels per 60fps frame.
const CFG = {
  areaPerNode: 9000, // one node per this many px² of viewport
  minNodes: 40,
  maxNodes: 140,
  linkDist: 150, // nodes closer than this get a connecting line
  mouseRadius: 190, // nodes inside this drift toward the cursor
  mousePull: 0.045, // acceleration toward the cursor at point-blank range
  relax: 0.018, // how quickly a node eases back to its own drift
  maxSpeed: 1.6,
  goldShare: 0.12, // fraction of nodes drawn in KRITS yellow
  maxDpr: 2,
  minFrameMs: 1000 / 60 - 1, // cap at ~60fps, even on 120Hz screens
};

const BLUE = '150, 195, 255';
const GOLD = '242, 176, 30';
const LINE_BUCKETS = 4; // lines are batched into this many opacity levels

// A soft radial glow, pre-rendered once so each node is a cheap drawImage
// instead of a shadowBlur.
function glowSprite(rgb, core) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, core);
  grad.addColorStop(0.12, `rgba(${rgb}, 0.9)`);
  grad.addColorStop(0.35, `rgba(${rgb}, 0.18)`);
  grad.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

function makeNode(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.08 + Math.random() * 0.22;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx,
    vy,
    bvx: vx, // the drift the node relaxes back to after the cursor lets go
    bvy: vy,
    size: 9 + Math.random() * 9,
    gold: Math.random() < CFG.goldShare,
  };
}

const nodeCount = (w, h) => Math.max(CFG.minNodes, Math.min(CFG.maxNodes, Math.round((w * h) / CFG.areaPerNode)));

// Fixed, full-viewport canvas of drifting nodes that link up when close and
// lean toward the mouse. Sits behind all page content.
export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blueSprite = glowSprite(BLUE, 'rgba(235, 245, 255, 1)');
    const goldSprite = glowSprite(GOLD, 'rgba(255, 240, 200, 1)');
    const buckets = Array.from({ length: LINE_BUCKETS }, () => []);
    const mouse = { x: 0, y: 0, active: false };
    let w = 0;
    let h = 0;
    let nodes = [];
    let raf = 0;
    let last = 0;
    let resizeTimer = 0;

    function resize() {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, CFG.maxDpr);
      canvas.width = Math.round(nw * dpr);
      canvas.height = Math.round(nh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep existing nodes where they were, proportionally, so a resize
      // doesn't reshuffle the whole field.
      if (w && h) {
        for (const n of nodes) {
          n.x *= nw / w;
          n.y *= nh / h;
        }
      }
      w = nw;
      h = nh;
      const target = nodeCount(w, h);
      while (nodes.length < target) nodes.push(makeNode(w, h));
      nodes.length = target;
    }

    function step(k) {
      const R = CFG.mouseRadius;
      const margin = 20;
      for (const n of nodes) {
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / R) * CFG.mousePull * k;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        n.vx += (n.bvx - n.vx) * CFG.relax * k;
        n.vy += (n.bvy - n.vy) * CFG.relax * k;
        const s = Math.hypot(n.vx, n.vy);
        if (s > CFG.maxSpeed) {
          n.vx *= CFG.maxSpeed / s;
          n.vy *= CFG.maxSpeed / s;
        }
        n.x += n.vx * k;
        n.y += n.vy * k;
        // Wrap just off-screen so nodes never visibly pop in or out.
        if (n.x < -margin) n.x = w + margin;
        else if (n.x > w + margin) n.x = -margin;
        if (n.y < -margin) n.y = h + margin;
        else if (n.y > h + margin) n.y = -margin;
      }
    }

    // One path + stroke per opacity level instead of one per line.
    function strokeBuckets(rgb, maxAlpha, width) {
      ctx.lineWidth = width;
      for (let b = 0; b < LINE_BUCKETS; b++) {
        const seg = buckets[b];
        if (!seg.length) continue;
        ctx.strokeStyle = `rgba(${rgb}, ${(((b + 1) / LINE_BUCKETS) * maxAlpha).toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < seg.length; i += 4) {
          ctx.moveTo(seg[i], seg[i + 1]);
          ctx.lineTo(seg[i + 2], seg[i + 3]);
        }
        ctx.stroke();
        seg.length = 0;
      }
    }

    function bucketFor(strength) {
      return buckets[Math.min(LINE_BUCKETS - 1, Math.floor(strength * LINE_BUCKETS))];
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const L = CFG.linkDist;
      const L2 = L * L;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          if (dx > L || dx < -L) continue;
          const dy = a.y - b.y;
          if (dy > L || dy < -L) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 < L2) bucketFor(1 - Math.sqrt(d2) / L).push(a.x, a.y, b.x, b.y);
        }
      }
      strokeBuckets(BLUE, 0.32, 1);

      if (mouse.active) {
        const R = CFG.mouseRadius;
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < R) bucketFor(1 - d / R).push(mouse.x, mouse.y, n.x, n.y);
        }
        strokeBuckets(GOLD, 0.45, 0.8);
      }

      for (const n of nodes) {
        ctx.drawImage(n.gold ? goldSprite : blueSprite, n.x - n.size / 2, n.y - n.size / 2, n.size, n.size);
      }
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      const elapsed = now - last;
      if (elapsed < CFG.minFrameMs) return;
      // Normalise to 60fps steps; clamp so a long stall doesn't teleport nodes.
      const k = Math.min(elapsed / (1000 / 60), 3);
      last = now;
      step(k);
      draw();
    }

    function start() {
      if (reduceMotion || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduceMotion) draw();
      }, 150);
    }

    // Only record the position; the next animation frame reads it.
    // On phones this follows a finger while it is down.
    function onPointerMove(e) {
      if (e.pointerType === 'touch' && e.type === 'pointermove' && !mouse.active) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function onPointerUp(e) {
      if (e.pointerType === 'touch') mouse.active = false;
    }

    function onPointerOut(e) {
      if (!e.relatedTarget) mouse.active = false;
    }

    function onBlur() {
      mouse.active = false;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    draw();
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerdown', onPointerMove, { passive: true });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      document.addEventListener('pointerout', onPointerOut);
      window.addEventListener('blur', onBlur);
    }

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      document.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <div className="network-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
