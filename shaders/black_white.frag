#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

//Black and White
//Luminance is calculated as L = 0.299 * Red + 0.587 * Green + 0.114 * Blue
//Black and white images are created by assigning the luminance value to all 3 color components
void main() 
{
    FragColor = texture(image, texcoord);
    float luminance = 0.299 * FragColor.x + 0.587 * FragColor.y + 0.114 * FragColor.z;
    FragColor = vec4(luminance, luminance, luminance, 1.0);
}
