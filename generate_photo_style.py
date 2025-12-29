from PIL import Image, ImageDraw, ImageFilter

# PHOTOGRAPHIC APPROACH: Using a "real" visual background to trick WhatsApp AI
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
# I'll use a placeholder colored background that looks like a photo/modern banner
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/preview-photo.jpg'

try:
    logo = Image.open(source_path)
    
    # Create a nice modern gradient background that looks like professional branding
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Deep professional blue to light blue gradient
    for x in range(target_size[0]):
        r = int(26 + (x / 1200) * (60 - 26))
        g = int(43 + (x / 1200) * (100 - 43))
        b = int(76 + (x / 1200) * (140 - 76))
        draw.line([(x, 0), (x, 630)], fill=(r, g, b))
    
    # Add some "lifestyle" elements (rectangles that act as design pillars)
    draw.rectangle([0, 0, 10, 630], fill=(255, 215, 0)) # Gold accent
    draw.rectangle([1190, 0, 1200, 630], fill=(255, 215, 0)) # Gold accent
    
    # Logo size - Large and prominent
    logo_height = 420
    aspect_ratio = logo.width / logo.height
    new_width = int(logo_height * aspect_ratio)
    resized_logo = logo.resize((new_width, logo_height), Image.Resampling.LANCZOS)
    
    # Paste centered
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, ((1200 - new_width)//2, (630 - logo_height)//2), resized_logo)
    else:
        canvas.paste(resized_logo, ((1200 - new_width)//2, (630 - logo_height)//2))
        
    # Final save as high quality JPG
    canvas.save(output_path, "JPEG", quality=95, optimize=True)
    
    print(f"Created PHOTO-STYLE banner: {output_path}")

except Exception as e:
    print(f"Error: {e}")
