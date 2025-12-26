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
    
    # Calculate aspect ratio first
    aspect_ratio = img.width / img.height
    
    # Fill the entire card width with the logo (minimal padding)
    # This forces the "large image" preview style instead of thumbnail+text
    padding = 40  # Small padding on edges
    new_width = target_size[0] - (padding * 2)  # 1120px width
    new_height = int(new_width / aspect_ratio)
    
    # If height exceeds card, scale by height instead
    if new_height > target_size[1] - (padding * 2):
        new_height = target_size[1] - (padding * 2)
        new_width = int(new_height * aspect_ratio)
    
    resized_logo = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Center position
    x_pos = (target_size[0] - new_width) // 2
    y_pos = (target_size[1] - new_height) // 2
    
    # Paste
    new_img.paste(resized_logo, (x_pos, y_pos), resized_logo if img.mode == 'RGBA' else None)
    
    # Save
    new_img.save(output_path, quality=95)
    print(f"Successfully created {output_path}")

except Exception as e:
    print(f"Error: {e}")
