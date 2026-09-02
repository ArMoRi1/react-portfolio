import React, { useEffect, useRef } from 'react';
import './CanvasDotsBg.css';

interface DotItem {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    colour: string;
}

interface DotsState {
    nb: number;
    distance: number;
    d_radius: number;
    array: DotItem[];
}

const CanvasDotsBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const dotsRef = useRef<DotsState>({ nb: 0, distance: 0, d_radius: 0, array: [] });
    const mousePositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        const colorDot = [
            'rgb(81, 162, 233)',
            'rgb(81, 162, 233)',
            'rgb(81, 162, 233)',
            'rgb(255, 77, 90)',
        ];
        const color = 'rgb(81, 162, 233)';

        class Dot implements DotItem {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            colour: string;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = -0.5 + Math.random();
                this.vy = -0.5 + Math.random();
                this.radius = Math.random() * 1.5;
                this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
            }

            create() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.colour;
                ctx.fill();
            }

            animate() {
                for (let i = 1; i < dotsRef.current.nb; i++) {
                    const dot = dotsRef.current.array[i];
                    if (!dot) continue;

                    if (dot.y < 0 || dot.y > canvas.height) {
                        dot.vy = -dot.vy;
                    } else if (dot.x < 0 || dot.x > canvas.width) {
                        dot.vx = -dot.vx;
                    }
                    dot.x += dot.vx;
                    dot.y += dot.vy;
                }
            }

            line() {
                const dots = dotsRef.current;
                for (let i = 0; i < dots.nb; i++) {
                    for (let j = 0; j < dots.nb; j++) {
                        const i_dot = dots.array[i];
                        const j_dot = dots.array[j];
                        if (!i_dot || !j_dot) continue;

                        if (
                            i_dot.x - j_dot.x < dots.distance &&
                            i_dot.y - j_dot.y < dots.distance &&
                            i_dot.x - j_dot.x > -dots.distance &&
                            i_dot.y - j_dot.y > -dots.distance
                        ) {
                            if (
                                i_dot.x - mousePositionRef.current.x < dots.d_radius &&
                                i_dot.y - mousePositionRef.current.y < dots.d_radius &&
                                i_dot.x - mousePositionRef.current.x > -dots.d_radius &&
                                i_dot.y - mousePositionRef.current.y > -dots.d_radius
                            ) {
                                ctx.beginPath();
                                ctx.moveTo(i_dot.x, i_dot.y);
                                ctx.lineTo(j_dot.x, j_dot.y);

                                const dotDistance = Math.sqrt(
                                    Math.pow(i_dot.x - mousePositionRef.current.x, 2) +
                                    Math.pow(i_dot.y - mousePositionRef.current.y, 2)
                                );
                                let distanceRatio = dotDistance / dots.d_radius - 0.3;
                                if (distanceRatio < 0) distanceRatio = 0;

                                ctx.strokeStyle = `rgba(81, 162, 233, ${1 - distanceRatio})`;
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    }
                }
            }
        }

        const setupCanvas = () => {
            canvas.width = document.body.scrollWidth || window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.display = 'block';
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = color;

            mousePositionRef.current = {
                x: (30 * canvas.width) / 100,
                y: (30 * canvas.height) / 100,
            };

            const windowSize = window.innerWidth;

            if (windowSize > 1600) {
                dotsRef.current = { nb: 800, distance: 60, d_radius: 300, array: [] };
            } else if (windowSize > 1300) {
                dotsRef.current = { nb: 700, distance: 55, d_radius: 250, array: [] };
            } else if (windowSize > 1100) {
                dotsRef.current = { nb: 600, distance: 50, d_radius: 200, array: [] };
            } else if (windowSize > 800) {
                dotsRef.current = { nb: 500, distance: 45, d_radius: 180, array: [] };
            } else if (windowSize > 600) {
                dotsRef.current = { nb: 400, distance: 40, d_radius: 160, array: [] };
            } else {
                dotsRef.current = { nb: 150, distance: 35, d_radius: 140, array: [] };
            }
        };

        function createDots() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (dotsRef.current.array.length === 0) {
                for (let i = 0; i < dotsRef.current.nb; i++) {
                    dotsRef.current.array.push(new Dot());
                }
                if (dotsRef.current.array[0]) {
                    dotsRef.current.array[0].radius = 1.5;
                    dotsRef.current.array[0].colour = 'rgb(81, 162, 233)';
                }
            }

            for (const dot of dotsRef.current.array) {
                if (dot) (dot as Dot).create();
            }

            if (dotsRef.current.array[0]) {
                (dotsRef.current.array[0] as Dot).animate();
                (dotsRef.current.array[0] as Dot).line();
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mousePositionRef.current.x = e.pageX || e.clientX;
            mousePositionRef.current.y = e.pageY || e.clientY;
            try {
                if (dotsRef.current.array[0]) {
                    dotsRef.current.array[0].x = e.pageX || e.clientX;
                    dotsRef.current.array[0].y = e.pageY || e.clientY;
                }
            } catch {
                // silent
            }
        };

        const handleResize = () => {
            if (animationRef.current) clearInterval(animationRef.current);
            dotsRef.current.array = [];
            setupCanvas();
            animationRef.current = setInterval(createDots, 1000 / 30);
        };

        setupCanvas();
        animationRef.current = setInterval(createDots, 1000 / 30);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            if (animationRef.current) clearInterval(animationRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="canvas-dots-bg" />;
};

export default CanvasDotsBg;
