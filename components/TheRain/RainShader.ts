export const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  attribute float aSpeed;
  attribute float aOffset;
  
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    
    // Rain falling logic
    float fallOffset = uTime * uSpeed * aSpeed;
    pos.y = mod(pos.y - fallOffset + 10.0, 20.0) - 10.0;
    
    // Slight wind/drift
    pos.x += sin(uTime * 0.5 + aOffset) * 0.1;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    // gl_PointSize = 4.0 * (10.0 / -mvPosition.z);
    gl_PointSize = 10.0; // Force visible size
    gl_Position = projectionMatrix * mvPosition;
    
    vAlpha = 1.0;
  }
`

export const fragmentShader = `
  uniform float uDensity;
  uniform float uOpacity;
  
  varying float vAlpha;

  void main() {
    // Circle shape
    vec2 coord = gl_PointCoord - vec2(0.5);
    if(length(coord) > 0.5) discard;
    
    gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity);
  }
`
