from PIL import Image, ImageDraw

# Create a card with a subtle background to trigger WhatsApp's large preview
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-cardv2.jpg'

try:
    logo = Image.open(source_path)
    
    # Create canvas with subtle gradient (not pure white)
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Add subtle cream/beige gradient to make it look like a "full image"
    for y in range(target_size[1]):
        ratio = y / target_size[1]
        # Very subtle gradient from light cream to white
        r = int(248 + (255 - 248) * ratio)
        g = int(246 + (255 - 246) * ratio)
        b = int(240 + (255 - 240) * ratio)
        draw.line([(0, y), (target_size[0], y)], fill=(r, g, b))
    
    # Calculate logo size - make it larger to fill more space
    padding = 30
    available_width = target_size[0] - (padding * 2)
    available_height = target_size[1] - (padding * 2)
    
    aspect_ratio = logo.width / logo.height
    
    if available_width / aspect_ratio <= available_height:
        new_width = available_width
        new_height = int(new_width / aspect_ratio)
    else:
        new_height = available_height
        new_width = int(new_height * aspect_ratio)
    
    resized_logo = logo.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Center logo
    x_pos = (target_size[0] - new_width) // 2
    y_pos = (target_size[1] - new_height) // 2
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (x_pos, y_pos), resized_logo)
    else:
        canvas.paste(resized_logo, (x_pos, y_pos))
    
    # Save with optimization
    canvas.save(output_path, 'JPEG', quality=92, optimize=True)
    
    import os
    file_size = os.path.getsize(output_path)
    
    print(f"Created card with subtle background")
    print(f"Size: {target_size}")
    print(f"Logo: {new_width}x{new_height}")
    print(f"File: {file_size/1024:.1f} KB")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
