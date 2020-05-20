#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() 
{
    //This filter will round each color component to one of 5 levels (0.0, 0.25, 0.5, 0.75, 1.0)
    //Rounding can be done by multiplying by 4.0, then rounding, then dividing by 4.0
    
    vec4 multiply = vec4(4.0, 4.0, 4.0, 4.0);
    FragColor = texture(image, texcoord);
    
    FragColor = round(FragColor * multiply) / multiply;
}
