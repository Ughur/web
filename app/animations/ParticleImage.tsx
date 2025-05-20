'use client';
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type p5Type from 'p5';

interface Particle {
  pos: p5Type.Vector;
  originalPos: p5Type.Vector;
  target: p5Type.Vector;
  vel: p5Type.Vector;
  acc: p5Type.Vector;
  radius: number;
  color: string;
  originalColor: string;
  hoverColor: string;
  maxforce: number;
  maxspeed: number;
  comfortZone: number;
  active: boolean;
  opacity: number;
  delay: number;
}

interface ParticleImageProps {
  className?: string;
  imagePath: string;
  particleColor?: string;
  hoverColor?: string;
  detailLevel?: number;
  targetHeight?: number;
  minRadius?: number;
  maxRadius?: number;
  interactionRadius?: number;
  position?: {
    x?: 'left' | 'center' | 'right';
    offsetX?: number;
    y?: 'top' | 'center' | 'bottom';
    offsetY?: number;
  };
  brightnessThreshold?: number;
}

const ParticleImage = ({
  className = '',
  imagePath,
  particleColor = '#1abc9c',
  hoverColor = '#0099cc',
  detailLevel = 8,
  targetHeight,
  minRadius = 0.5,
  maxRadius = 4,
  interactionRadius = 30,
  position = {
    x: 'right',
    offsetX: -100,
    y: 'center',
    offsetY: 0,
  },
  brightnessThreshold = 0.3,
}: ParticleImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: p5Type;
    let isComponentMounted = true;

    const initP5 = async () => {
      const p5 = (await import('p5')).default;

      if (!isComponentMounted) return;

      const sketch = (p: p5Type) => {
        const particles: Particle[] = [];
        let mousePos: p5Type.Vector;
        let sourceImg: p5Type.Image;
        let isImageLoaded = false;
        let lastMouseMove = 0;
        let startTime = 0;
        const mouseUpdateThreshold = 32;
        const fadeInDuration = 1000;
        const maxDelay = 2000;

        p.preload = () => {
          sourceImg = p.loadImage(imagePath);
        };

        const getPositionX = (scaledWidth: number): number => {
          switch (position.x) {
            case 'left':
              return position.offsetX || 0;
            case 'center':
              return p.width / 2 - scaledWidth / 2 + (position.offsetX || 0);
            case 'right':
            default:
              return p.width - scaledWidth + (position.offsetX || 0);
          }
        };

        const getPositionY = (scaledHeight: number): number => {
          switch (position.y) {
            case 'top':
              return position.offsetY || 0;
            case 'bottom':
              return p.height - scaledHeight + (position.offsetY || 0);
            case 'center':
            default:
              return p.height / 2 - scaledHeight / 2 + (position.offsetY || 0);
          }
        };

        const initializeParticles = () => {
          if (!sourceImg || !sourceImg.width || !sourceImg.height) {
            console.error(
              'ParticleImage: Source image not loaded or has invalid dimensions.',
              sourceImg?.width,
              sourceImg?.height
            );
            particles.length = 0;
            isImageLoaded = false;
            return;
          }
          sourceImg.loadPixels();
          startTime = p.millis();

          let scale;
          let finalCanvasHeight;
          const currentCanvasWidth = p.width; // Already set by setup or windowResized

          if (typeof targetHeight === 'number' && targetHeight > 0) {
            if (sourceImg.height > 0) {
              scale = targetHeight / sourceImg.height;
              finalCanvasHeight = targetHeight;
              const imageScaledWidth = sourceImg.width * scale;
              if (imageScaledWidth > currentCanvasWidth) {
                // If image scaled by height is too wide
                scale = currentCanvasWidth / sourceImg.width; // Rescale to fit width
                finalCanvasHeight = sourceImg.height * scale;
              }
            } else {
              scale = 0; // Invalid source image height
              finalCanvasHeight = p.height; // Fallback to current canvas height
              console.warn(
                'ParticleImage: Cannot use targetHeight due to source image height being zero.'
              );
            }
            if (isFinite(finalCanvasHeight) && finalCanvasHeight > 0) {
              p.resizeCanvas(currentCanvasWidth, finalCanvasHeight);
            } else {
              finalCanvasHeight = p.height; // Fallback
            }
          } else {
            // targetHeight is NOT provided, scale to fit container width
            if (
              currentCanvasWidth > 0 &&
              sourceImg.width > 0 &&
              sourceImg.height > 0
            ) {
              scale = currentCanvasWidth / sourceImg.width;
              finalCanvasHeight = sourceImg.height * scale;
              if (isFinite(finalCanvasHeight) && finalCanvasHeight > 0) {
                p.resizeCanvas(currentCanvasWidth, finalCanvasHeight);
              } else {
                finalCanvasHeight = p.height; // Fallback to current canvas height
                console.warn(
                  'ParticleImage: Calculated finalCanvasHeight is invalid.',
                  finalCanvasHeight
                );
              }
            } else {
              scale = 0;
              finalCanvasHeight = p.height; // Fallback
              console.warn(
                'ParticleImage: Cannot auto-scale image for width due to invalid canvas or image dimensions.'
              );
            }
          }

          if (!isFinite(scale) || scale <= 0) {
            console.warn(
              'ParticleImage: Invalid scale calculated',
              scale,
              '. Aborting particle initialization.'
            );
            particles.length = 0;
            isImageLoaded = false;
            return;
          }

          const scaledWidth = sourceImg.width * scale;
          const scaledHeight = sourceImg.height * scale; // This is the image's visual scaled height

          const circleRadius = Math.min(scaledWidth, scaledHeight) / 2;
          const startX = getPositionX(scaledWidth);
          const startY = getPositionY(scaledHeight);
          const centerX = startX + scaledWidth / 2;
          const centerY = startY + scaledHeight / 2;

          particles.length = 0;

          let totalBrightness = 0;
          let pixelCount = 0;
          for (let y = 0; y < sourceImg.height; y += detailLevel) {
            for (let x = 0; x < sourceImg.width; x += detailLevel) {
              const i = (y * sourceImg.width + x) * 4;
              const brightness =
                (sourceImg.pixels[i] +
                  sourceImg.pixels[i + 1] +
                  sourceImg.pixels[i + 2]) /
                3;
              totalBrightness += brightness;
              pixelCount++;
            }
          }
          const avgBrightness = totalBrightness / pixelCount;
          const threshold = avgBrightness * brightnessThreshold;

          for (let y = 0; y < sourceImg.height; y += detailLevel) {
            for (let x = 0; x < sourceImg.width; x += detailLevel) {
              const i = (y * sourceImg.width + x) * 4;
              const brightness =
                (sourceImg.pixels[i] +
                  sourceImg.pixels[i + 1] +
                  sourceImg.pixels[i + 2]) /
                3;

              const scaledX = x * scale;
              const scaledY = y * scale;

              const distanceFromCenter = p.dist(
                scaledX + startX,
                scaledY + startY,
                centerX,
                centerY
              );

              const isInDarkArea = brightness < avgBrightness * 0.5;
              const adjustedBrightness = isInDarkArea
                ? p.map(brightness, 0, avgBrightness * 0.5, 255, avgBrightness)
                : brightness;

              if (
                distanceFromCenter <= circleRadius &&
                brightness > threshold
              ) {
                const radius = isInDarkArea
                  ? p.map(
                      adjustedBrightness,
                      avgBrightness,
                      255,
                      maxRadius * 0.7,
                      maxRadius
                    )
                  : p.map(brightness, threshold, 255, minRadius, maxRadius);

                const pos = p.createVector(scaledX + startX, scaledY + startY);

                const normalizedDistance = distanceFromCenter / circleRadius;
                const delay = p.map(normalizedDistance, 0, 1, 0, maxDelay);

                particles.push({
                  pos: pos.copy(),
                  originalPos: pos.copy(),
                  target: pos.copy(),
                  vel: p.createVector(0, 0),
                  acc: p.createVector(0, 0),
                  radius,
                  color: particleColor,
                  originalColor: particleColor,
                  hoverColor,
                  maxforce: 0.2,
                  maxspeed: 8,
                  comfortZone: interactionRadius,
                  active: false,
                  opacity: 0,
                  delay: delay,
                });
              }
            }
          }
          isImageLoaded = true;
        };

        p.setup = () => {
          const initialWidth =
            containerRef.current?.clientWidth || window.innerWidth - 20;
          // Initial height can be container's height; initializeParticles will adjust if no targetHeight
          const initialHeight =
            containerRef.current?.clientHeight || window.innerHeight - 25;

          const canvas = p.createCanvas(initialWidth, initialHeight);
          canvas.parent(containerRef.current!);
          p.background(26, 26, 26);
          mousePos = p.createVector(p.width / 2, p.height / 2);
          p.frameRate(60);
          initializeParticles();
        };

        const updateParticle = (particle: Particle) => {
          const distanceFromMouse = p.dist(
            particle.pos.x,
            particle.pos.y,
            mousePos.x,
            mousePos.y
          );

          if (distanceFromMouse < particle.comfortZone) {
            particle.active = true;
            particle.color = particle.hoverColor;
            particle.target = mousePos;
          } else if (particle.active) {
            particle.target = particle.originalPos;
            particle.color = particle.originalColor;

            const distanceFromOriginal = p.dist(
              particle.pos.x,
              particle.pos.y,
              particle.originalPos.x,
              particle.originalPos.y
            );
            if (distanceFromOriginal < 0.5) {
              particle.active = false;
              particle.pos = particle.originalPos.copy();
            }
          }

          if (particle.active) {
            const desired = p5.Vector.sub(particle.target, particle.pos);
            const d = desired.mag();

            if (d < 100) {
              const m = p.map(d, 0, 100, 0, particle.maxspeed);
              desired.setMag(m);
            } else {
              desired.setMag(particle.maxspeed);
            }

            const steer = p5.Vector.sub(desired, particle.vel);
            steer.limit(particle.maxforce);

            particle.acc.add(steer);

            particle.vel.add(particle.acc);
            particle.vel.mult(0.95);
            particle.vel.limit(particle.maxspeed);

            particle.pos.add(particle.vel);

            particle.acc.mult(0);
          }

          const currentTime = p.millis();
          if (currentTime > startTime + particle.delay) {
            const timeSinceStart = currentTime - (startTime + particle.delay);
            particle.opacity = p.min(
              1,
              p.pow(timeSinceStart / fadeInDuration, 2)
            );
          }
        };

        p.draw = () => {
          p.clear();

          const currentTime = p.millis();
          if (currentTime - lastMouseMove > mouseUpdateThreshold) {
            const targetX = p.mouseX;
            const targetY = p.mouseY;
            mousePos.x = p.lerp(mousePos.x, targetX, 0.2);
            mousePos.y = p.lerp(mousePos.y, targetY, 0.2);
            lastMouseMove = currentTime;
          }

          if (isImageLoaded) {
            for (const particle of particles) {
              updateParticle(particle);
              p.noStroke();
              const c = p.color(particle.color);
              c.setAlpha(255 * particle.opacity);
              p.fill(c);
              p.circle(particle.pos.x, particle.pos.y, particle.radius * 2);
            }
          }
        };

        p.windowResized = () => {
          const newWidth =
            containerRef.current?.clientWidth || window.innerWidth - 20;
          // Temporary height, initializeParticles will set the final one based on logic
          const tempHeight =
            containerRef.current?.clientHeight || window.innerHeight - 25;

          p.resizeCanvas(newWidth, tempHeight);

          if (isImageLoaded) {
            initializeParticles(); // This will re-calculate scale and call p.resizeCanvas again
          }
        };
      };

      p5Instance = new p5(sketch);
    };

    initP5();

    return () => {
      isComponentMounted = false;
      if (p5Instance) {
        p5Instance.remove();
        containerRef.current?.childNodes.forEach((node) => node.remove());
      }
    };
  }, [
    imagePath,
    particleColor,
    hoverColor,
    detailLevel,
    targetHeight,
    minRadius,
    maxRadius,
    interactionRadius,
    position,
    brightnessThreshold,
  ]);

  return <div ref={containerRef} className={className} />;
};

export default dynamic(() => Promise.resolve(ParticleImage), {
  ssr: false,
});
