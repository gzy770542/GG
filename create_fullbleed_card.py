from PIL import Image, ImageDraw, ImageFont

# Create a FULL-BLEED card like Figma (content fills entire space)
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-cardv2.jpg'

try:
    logo = Image.open(source_path)
    
    # Use a colored background that fills the entire space
    # Light gold/cream color matching Wish Group branding
    canvas = Image.new("RGB", target_size, (250, 245, 235))
    draw = ImageDraw.Draw(canvas)
    
    # Add a subtle gradient for depth
    for y in range(target_size[1]):
        ratio = y / target_size[1]
        r = int(250 - (250 - 245) * ratio)
        g = int(245 - (245 - 240) * ratio)
        b = int(235 - (235 - 230) * ratio)
        draw.line([(0, y), (target_size[0], y)], fill=(r, g, b))
    
    # Make logo MUCH larger - fill most of the height
    logo_height = 480  # Much bigger
    aspect_ratio = logo.width / logo.height
    logo_width = int(logo_height * aspect_ratio)
    
    resized_logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
    
    # Center logo
    logo_x = (target_size[0] - logo_width) // 2
    logo_y = (target_size[1] - logo_height) // 2
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    else:
        canvas.paste(resized_logo, (logo_x, logo_y))
    
    # Save
    canvas.save(output_path, 'JPEG', quality=92, optimize=True)
    
    import os
    file_size = os.path.getsize(output_path)
    
    print(f"Created FULL-BLEED card (like Figma)")
    print(f"Size: {target_size}")
    print(f"Logo: {logo_width}x{logo_height} (76% of height)")
    print(f"File: {file_size/1024:.1f} KB")
    print(f"Background: Colored gradient (not white)")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
