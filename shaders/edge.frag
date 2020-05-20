#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;

out vec4 FragColor;

void main() 
{
    //Retrieve color values for all texels surrounding current texel (RGB only)
    //Sample 1.0 / texture_width left and right, 1.0 / texture_height down and up
    float w = 1.0/width;
    float h = 1.0/height;
    
    //Compute horizontal gradient as follows:
    //sobel_h = bottom_right + (2.0 * center_right) + top_right - bottom_left - (2.0 * center_left) - top_left
    vec2 bottom_right = vec2(w, -h);
    vec2 top_right = vec2(w, h);
    vec2 bottom_left = vec2(-w, -h);
    vec2 top_left = vec2(-w, h);
    vec2 center_right = vec2(w, 0.0);
    vec2 center_left = vec2(-w, 0.0);
    vec2 bottom_center = vec2(0.0, -h);
    vec2 top_center = vec2(0.0, h); 
    vec2 sobel_horizontal = (bottom_right + (2.0 * center_right) + top_right - bottom_left - (2.0 * center_left) - top_left); 
    
    //Compute vertical gradient as follows:
    //sobel_v = bottom_left + (2.0 * bottom_center) + bottom_right - top_left - (2.0 * top_center) - top_right

    vec2 sobel_vertical = (bottom_left + (2.0 * bottom_center) + bottom_right - top_left - (2.0 * top_center) - top_right);
    
    //The Sobel edge values can then be computed using the distance formula with the horizontal and vertical gradients
    //sobel_edge = sqrt(sobel_h^2 + sobel_v^2)
    vec2 sobel_edge = sqrt((sobel_horizontal * sobel_horizontal) + (sobel_vertical * sobel_vertical));
    
    //If the magnitude of the sobel edge vector is greater than or equal to 0.5, then make pixel black, otherwise make pixel normal color from the texture
    if (length(sobel_edge) >= 0.5)
    {
        FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    else
    {
        FragColor = texture(image, texcoord);
    }
}
