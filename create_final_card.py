from PIL import Image

# Settings
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-card.jpg'

try:
    logo = Image.open(source_path)
    print(f"Original logo size: {logo.size}")
    
    # Create a landscape version by stretching the logo to fill width
    # We'll make the logo fill the full width while maintaining aspect ratio for height
    
    # Calculate dimensions to fill the width
    target_width = target_size[0]
    aspect_ratio = logo.width / logo.height
    
    # Scale logo to fill the full width
    new_width = target_width
    new_height = int(new_width / aspect_ratio)
    
    # If height is less than target, we need to crop/adjust
    if new_height < target_size[1]:
        # Scale by height instead to ensure we fill the card
        new_height = target_size[1]
        new_width = int(new_height * aspect_ratio)
    
    # Resize the logo
    resized_logo = logo.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Create the final canvas
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    
    # Center crop if needed
    x_offset = (new_width - target_size[0]) // 2
    y_offset = (new_height - target_size[1]) // 2
    
    if x_offset > 0 or y_offset > 0:
        # Crop to fit
        crop_box = (x_offset, y_offset, x_offset + target_size[0], y_offset + target_size[1])
        final_image = resized_logo.crop(crop_box)
    else:
        # Paste centered
        x_pos = (target_size[0] - new_width) // 2
        y_pos = (target_size[1] - new_height) // 2
        if logo.mode == 'RGBA':
            canvas.paste(resized_logo, (x_pos, y_pos), resized_logo)
        else:
            canvas.paste(resized_logo, (x_pos, y_pos))
        final_image = canvas
    
    # Convert to RGB if needed and save
    if final_image.mode == 'RGBA':
        rgb_image = Image.new('RGB', final_image.size, (255, 255, 255))
        rgb_image.paste(final_image, mask=final_image.split()[3])
        final_image = rgb_image
    
    final_image.save(output_path, 'JPEG', quality=95)
    print(f"Successfully created landscape preview: {output_path}")
    print(f"Final size: {final_image.size}")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
