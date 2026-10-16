import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  NgZone,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../theme/theme.service';

interface Star {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  size: number;
  baseAlpha: number;
  twinkle: number;
  speed: number;
  driftX: number;
  driftY: number;
}

@Component({
  selector: 'app-starfield',
  template: `<canvas #canvas class="starfield-canvas" aria-hidden="true"></canvas>`,
  host: {
    '[class.light]': 'theme.theme() === "light"',
  },
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background: #090a10;
    }

    :host.light {
      background: #eef1f7;
    }

    .starfield-canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Starfield {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly theme = inject(ThemeService);
  private isLight = false;

  constructor() {
    effect(() => {
      this.isLight = this.theme.theme() === 'light';
    });
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let running = true;

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = this.createStars(width, height);
    };

    const onMove = (event: PointerEvent): void => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onLeave = (): void => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const tick = (): void => {
      if (!running) {
        return;
      }

      ctx.clearRect(0, 0, width, height);
      frame += 1;

      for (const star of stars) {
        star.homeX += star.driftX;
        star.homeY += star.driftY;

        if (star.homeX < -8) star.homeX = width + 8;
        if (star.homeX > width + 8) star.homeX = -8;
        if (star.homeY < -8) star.homeY = height + 8;
        if (star.homeY > height + 8) star.homeY = -8;

        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const dist = Math.hypot(dx, dy);
        const radius = 140;

        if (dist < radius) {
          const force = (1 - dist / radius) * 18;
          star.x += (dx / (dist || 1)) * force;
          star.y += (dy / (dist || 1)) * force;
        }

        star.x += (star.homeX - star.x) * 0.045;
        star.y += (star.homeY - star.y) * 0.045;

        const pulse = 0.45 + 0.55 * Math.abs(Math.sin(frame * star.speed + star.twinkle));
        const tone = this.isLight ? '28, 27, 30' : '229, 225, 228';
        const alpha = star.baseAlpha * pulse * (this.isLight ? 0.45 : 1);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${tone}, ${alpha})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(tick);
    };

    this.zone.runOutsideAngular(() => {
      resize();
      window.addEventListener('resize', resize);
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerleave', onLeave);
      requestAnimationFrame(tick);
    });

    this.destroyRef.onDestroy(() => {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    });
  }

  private createStars(width: number, height: number): Star[] {
    const count = Math.round((width * height) / 14000);
    return Array.from({ length: Math.max(70, count) }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        homeX: x,
        homeY: y,
        size: 0.4 + Math.random() * 1.15,
        baseAlpha: 0.18 + Math.random() * 0.28,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.02,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.35) * 0.05,
      };
    });
  }
}
