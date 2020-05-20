#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;


void main() 
{
    //Fish Eye
    //This optical effect can be accomplished with a barrel distortion
    //In order to accomplish a barrel distortion, implement the following equations:
    //scale and translate the texture coordinate such that it is in the range [-1.0, 1.0]
    //multiply by 2, then subtract 1
    vec2 newcoord = (texcoord * 2) - 1;
    
    //calculate 𝜽 = arctan(texture_coordinate_y, texture_coordinate_x)
    float theta = atan(newcoord.y, newcoord.x);
    
    //calculate radius = magnitude of texture coordinate, raised to the power of 1.5
    float radius = pow(length(newcoord), 1.5);
    
    //calculate final texture coordinate = (radius * cos(𝜽),  radius * sin(𝜽))
    vec2 fish_eye_coord = vec2(radius * cos(theta), radius * sin(theta));
    
    fish_eye_coord = (fish_eye_coord + 1.0) / 2;
    
    FragColor = texture(image, fish_eye_coord);
}
