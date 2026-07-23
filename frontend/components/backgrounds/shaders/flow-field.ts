/**
 * Procedural "flow field" shader.
 *
 * Renders slow, organic streaks of light by domain-warping a simplex
 * noise field and thresholding it into thin bands — evoking data flow /
 * neural pathways rather than smoke, water, or particles.
 *
 * Kept intentionally cheap (2D simplex, 3-octave fbm, single warp pass)
 * so it holds 60fps on integrated GPUs.
 */

export const FLOW_FIELD_VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

export const FLOW_FIELD_FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // --- Ashima 2D simplex noise ------------------------------------------
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  // -----------------------------------------------------------------------

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 3; i++) {
      sum += amp * snoise(p * freq);
      freq *= 2.02;
      amp *= 0.55;
    }
    return sum;
  }

  // Cheap pseudo-curl: two decorrelated fbm samples used as a flow vector.
  vec2 flowVec(vec2 p, float t) {
    float n1 = fbm(p + vec2(0.0, t));
    float n2 = fbm(p + vec2(5.2, -t));
    return vec2(n1, n2);
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.035;

    vec2 warp = flowVec(p * 1.1, t);
    vec2 pw = p + warp * 0.58;

    float field = fbm(pw * 1.9 + flowVec(pw * 0.6, t * 0.7) * 0.5);

    // 1. PRIMARY FILAMENTS: Thicker ribbons, sparser, brighter
    float bandsPrimary = abs(sin(field * 3.5 + t * 1.2));
    float primary = pow(1.0 - bandsPrimary, 4.5); 

    // 2. SECONDARY FILAMENTS: Thinner contour lines, denser, much fainter
    float bandsSecondary = abs(sin(field * 12.0 + t * 1.8));
    float secondary = pow(1.0 - bandsSecondary, 8.0) * 0.35;

    // 3. STRUCTURAL MASK: Groups filaments into clusters with dark voids between them
    float structure = smoothstep(-0.2, 0.7, fbm(pw * 1.5 - t * 0.5));

    // Combine layers and apply structure
    float streak = (primary + secondary) * structure;

    float radial = 1.0 - smoothstep(0.12, 0.92, length(p * vec2(1.0, 1.35)));

    // Overall alpha bumped up slightly to compensate for the dark voids
    float alpha = streak * radial * 0.85;

    vec3 cyan = vec3(0.024, 0.714, 0.831);
    vec3 blue = vec3(0.231, 0.510, 0.965);
    vec3 color = mix(cyan, blue, smoothstep(-0.4, 0.6, field));

    gl_FragColor = vec4(color, alpha);
  }
`