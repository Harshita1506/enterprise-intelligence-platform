"use client"

import { useEffect, useRef } from "react"
import { FLOW_FIELD_FRAGMENT, FLOW_FIELD_VERTEX } from "./shaders/flow-field"

type FlowFieldCanvasProps = {
  className?: string
}

/**
 * GPU-rendered procedural background (OGL + a custom GLSL flow-field
 * shader). Replaces the old SVG-path wave approach entirely.
 *
 * Mounted only where the atmosphere needs to be the visual centerpiece
 * (the hero). Interior sections use the cheaper CSS-only layers in
 * `AmbientBackground` instead, so only a single WebGL context exists
 * on the page at a time.
 */
export function FlowFieldCanvas({ className = "" }: FlowFieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === "undefined") return

    let destroyed = false
    let visible = true
    let rafId = 0
    const cleanupFns: Array<() => void> = []

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    import("ogl")
      .then(({ Renderer, Program, Mesh, Triangle }) => {
        if (destroyed) return

        const renderer = new Renderer({
          alpha: true,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 1.75),
        })
        const gl = renderer.gl
        gl.clearColor(0, 0, 0, 0)
        Object.assign(gl.canvas.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          display: "block",
        })
        container.appendChild(gl.canvas)

        const geometry = new Triangle(gl)
        const program = new Program(gl, {
          vertex: FLOW_FIELD_VERTEX,
          fragment: FLOW_FIELD_FRAGMENT,
          transparent: true,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: [1, 1] },
          },
        })
        const mesh = new Mesh(gl, { geometry, program })

        const resize = () => {
          const width = container.clientWidth || 1
          const height = container.clientHeight || 1
          renderer.setSize(width, height)
          program.uniforms.uResolution.value = [width, height]
        }
        resize()
        window.addEventListener("resize", resize)
        cleanupFns.push(() => window.removeEventListener("resize", resize))

        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting
          },
          { threshold: 0 }
        )
        io.observe(container)
        cleanupFns.push(() => io.disconnect())

        const onVisibilityChange = () => {
          visible = visible && !document.hidden
        }
        document.addEventListener("visibilitychange", onVisibilityChange)
        cleanupFns.push(() =>
          document.removeEventListener("visibilitychange", onVisibilityChange)
        )

        const start = performance.now()
        const update = (now: number) => {
          if (destroyed) return
          rafId = requestAnimationFrame(update)
          if (!visible || document.hidden) return
          program.uniforms.uTime.value = (now - start) * 0.001
          renderer.render({ scene: mesh })
        }

        if (prefersReducedMotion) {
          // Render a single settled frame instead of animating.
          program.uniforms.uTime.value = 6
          renderer.render({ scene: mesh })
        } else {
          rafId = requestAnimationFrame(update)
        }

        cleanupFns.push(() => {
          cancelAnimationFrame(rafId)
          gl.canvas.parentElement?.removeChild(gl.canvas)
          const loseContext = gl.getExtension("WEBGL_lose_context")
          loseContext?.loseContext()
        })
      })
      .catch(() => {
        // OGL/WebGL unavailable — the CSS-only layers in AmbientBackground
        // still render, so the page degrades gracefully.
      })

    return () => {
      destroyed = true
      cleanupFns.forEach((fn) => fn())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`absolute inset-0 ${className}`}
    />
  )
}