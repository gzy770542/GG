from PIL import Image, ImageDraw

# Settings
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-light.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-card.jpg'

try:
    logo = Image.open(source_path)
    
    # Create canvas with gradient background (light beige/cream to white)
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Create subtle gradient from cream to white
    for y in range(target_size[1]):
        # Gradient from RGB(250, 245, 235) to RGB(255, 255, 255)
        ratio = y / target_size[1]
        r = int(250 + (255 - 250) * ratio)
        g = int(245 + (255 - 245) * ratio)
        b = int(235 + (255 - 235) * ratio)
        draw.line([(0, y), (target_size[0], y)], fill=(r, g, b))
    
    # Make logo fill almost the full height
    padding = 15
    logo_height = target_size[1] - (padding * 2)  # 600px
    aspect_ratio = logo.width / logo.height
    logo_width = int(logo_height * aspect_ratio)
    
    resized_logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
    
    # Center the logo
    x_pos = (target_size[0] - logo_width) // 2
    y_pos = padding
    
    # Paste logo with alpha channel
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (x_pos, y_pos), resized_logo)
    else:
        canvas.paste(resized_logo, (x_pos, y_pos))
    
    # Save
    canvas.save(output_path, quality=95)
    print(f"Successfully created {output_path}")
    print(f"Logo size: {logo_width}x{logo_height}")

except Exception as e:
    print(f"Error: {e}")
