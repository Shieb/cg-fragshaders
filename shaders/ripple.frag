#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float time;
uniform sampler2D image;

out vec4 FragColor;

void main() 
{
    //scale and translate the texture coordinate such that it is in the range [-1.0, 1.0]
    //multiply by 2, then subtract 1
    vec2 newcoord = (texcoord * 2.0) - 1.0;
    
    //calculate radius = magnitude of texture coordinate
    float radius = length(newcoord);
    
    //calculate a texture coordinate offset = texture_coordinate * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0
    vec2 offset = newcoord * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0;
    
    //calculate final texture coordinate = original_texture_coordinate + texture_coordinate_offset
    vec2 ripple_coord = newcoord + offset;
    
    ripple_coord = (ripple_coord + 1.0) / 2.0;
    
    FragColor = texture(image, ripple_coord);
}
