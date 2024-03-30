// Based on https://github.com/gkjohnson/threejs-sandbox/tree/master/motionBlurPass

export const vertexShader = /* glsl */ `
in vec3 position;
in vec2 uv;

out vec2 vUv;

void main() {
    vUv = uv;

    gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D sourceBuffer;
uniform sampler2D velocityBuffer;

in vec2 vUv;

out vec4 FragColor;

void main() {
    vec2 vel = texture(velocityBuffer, vUv).xy;

    vec4 result;

    vec2 startUv = clamp(vUv - vel * 0.5, 0.0, 1.0);
    vec2 endUv = clamp(vUv + vel * 0.5, 0.0, 1.0);

    for (int i = 0; i < SAMPLES; i++) {
        vec2 sampleUv = mix(startUv, endUv, float(i) / float(SAMPLES));
        result += texture(sourceBuffer, sampleUv);
    }

    result /= float(SAMPLES);

    FragColor = result;
}
`;
