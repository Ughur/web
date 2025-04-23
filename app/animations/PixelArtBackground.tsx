'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type p5Type from 'p5';

interface PixelArtBackgroundProps {
  className?: string;
  colors?: string[];
  gridSize?: number;
  frameRate?: number;
  pixelMargin?: number;
  pixelRadius?: number;
  opacity?: number;
}

const PixelArtBackground = ({
  className = '',
  colors = ['#1abc9c', '#0099cc', '#2ecc71', '#3498db'],
  gridSize = 30,
  frameRate = 12,
  pixelMargin = 2,
  pixelRadius = 4,
  opacity = 180,
}: PixelArtBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: p5Type;

    const initP5 = async () => {
      const p5 = (await import('p5')).default;

      const sketch = (p: p5Type) => {
        const grid: number[][] = Array(gridSize)
          .fill(0)
          .map(() => Array(gridSize).fill(0));

        p.setup = () => {
          const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
          canvas.parent(containerRef.current!);
          p.frameRate(frameRate);
        };

        p.draw = () => {
          p.clear();

          // Update grid with random pixels
          for (let i = 0; i < 12; i++) {
            const x = p.floor(p.random(gridSize));
            const y = p.floor(p.random(gridSize));
            grid[x][y] = p.floor(p.random(colors.length));
          }

          // Fade out pixels
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              if (grid[i][j] > 0 && p.random(1) < 0.08) {
                grid[i][j] = 0;
              }
            }
          }

          // Draw pixels
          const cellWidth = p.width / gridSize;
          const cellHeight = p.height / gridSize;
          for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
              if (grid[i][j] > 0) {
                p.noStroke();
                const color = p.color(colors[grid[i][j]]);
                color.setAlpha(opacity);
                p.fill(color);

                p.rect(
                  i * cellWidth + pixelMargin,
                  j * cellHeight + pixelMargin,
                  cellWidth - pixelMargin * 2,
                  cellHeight - pixelMargin * 2,
                  pixelRadius
                );
              }
            }
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
      };

      p5Instance = new p5(sketch);
    };

    initP5();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [colors, gridSize, frameRate, pixelMargin, pixelRadius, opacity]);

  return <div ref={containerRef} className={className} />;
};

export default dynamic(() => Promise.resolve(PixelArtBackground), {
  ssr: false,
});
