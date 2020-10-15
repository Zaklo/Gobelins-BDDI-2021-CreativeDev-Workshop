precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 rez;
uniform vec2 videoRez;

uniform sampler2D texture;
uniform sampler2D texture1;

uniform float progress;

varying vec2 vUv;

void main() {

    // Video 1
    vec2 s = rez;
    vec2 i1 = videoRez;
    float rs1 = s.x / s.y;
    float ri1 = i1.x / i1.y;
    vec2 new1 = rs1 < ri1 ? vec2(i1.x * s.y / i1.y, s.y) : vec2(s.x, i1.y * s.x / i1.x);
    vec2 offset1 = (rs1 < ri1 ? vec2((new1.x - s.x) / 2.0, 0.0) : vec2(0.0, (new1.y - s.y) / 2.0)) / new1;
    vec2 uvV1 = vUv * s / new1 + offset1;

    float pct = 0.0;
    vec2 uv = vUv - .5;
    uv.x *= rez.x/rez.y;
    vec2 cursor = vec2(0., 0.) / 2.;
    cursor.x *= rez.x/rez.y;

    // The DISTANCE from the pixel to the mouse
    pct = distance( uv, cursor);
    // Convert to linear
    float dist = dot(pct,pct);
    float zoom = progress;
    float disc = smoothstep( zoom - 0.05, zoom, dist);

    uv = uvV1;
    uv += max(disc, 0.) * .1;

    vec3 color = texture2D(texture, uv).xyz;
    vec3 color1 = texture2D(texture1, uv).xyz;

    vec3 finalColor = mix(color1,color, disc);
    // color = vec3(disc);


    gl_FragColor = vec4( finalColor, 1.0 );

}
