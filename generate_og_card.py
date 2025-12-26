from PIL import Image

# Settings
target_size = (1200, 630)
bg_color = (255, 255, 255) # White background for the new dark-text logo
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-light.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-card.jpg'

try:
    img = Image.open(source_path)
    
    # Create new background
    new_img = Image.new("RGB", target_size, bg_color)
    
    # Resize source image to fit within height (minus padding)
    # Target height is 630. Let's make the logo height 500 to leave some padding.
    aspect_ratio = img.width / img.height
    new_height = 550
    new_width = int(new_height * aspect_ratio)
    
    resized_logo = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Center position
    x_pos = (target_size[0] - new_width) // 2
    y_pos = (target_size[1] - new_height) // 2
    
    # Paste
    new_img.paste(resized_logo, (x_pos, y_pos))
    
    # Save
    new_img.save(output_path, quality=95)
    print(f"Successfully created {output_path}")

except Exception as e:
    print(f"Error: {e}")
