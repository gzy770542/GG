from PIL import Image, ImageDraw, ImageFont
import os

# HOLY GRAIL PREVIEW: High contrast, vibrant, signals "Main Graphic" to AI
target_size = (1200, 630)
source_path = r'c:\Users\ASUS\Desktop\holysheet\holysheet\public_html\images\wish-logo-source.png'
output_path = r'c:\Users\ASUS\Desktop\holysheet\holysheet\public_html\images\vibrant-preview.jpg'

try:
    if not os.path.exists(source_path):
        # Fallback if source is missing
        logo = Image.new("RGBA", (500, 500), (255, 255, 255, 0))
    else:
        logo = Image.open(source_path)
    
    # Create background with a vibrant modern gradient (Rich Blue to Deep Navy)
    canvas = Image.new("RGB", target_size, (26, 43, 76))
    draw = ImageDraw.Draw(canvas)
    
    # Add a vibrant gradient effect
    for x in range(target_size[0]):
        r = int(26 + (x / 1200) * 20)
        g = int(43 + (x / 1200) * 40)
        b = int(76 + (x / 1200) * 60)
        draw.line([(x, 0), (x, 630)], fill=(r, g, b))
    
    # Add design elements to make it look like a "Card"
    # Border
    gold_color = (255, 215, 0)
    draw.rectangle([0, 0, 1200, 15], fill=gold_color)
    draw.rectangle([0, 615, 1200, 630], fill=gold_color)
    
    # Resize logo - Make it fill the height prominently
    logo_height = 450
    aspect_ratio = logo.width / logo.height
    new_width = int(logo_height * aspect_ratio)
    resized_logo = logo.resize((new_width, logo_height), Image.Resampling.LANCZOS)
    
    # Center logo
    logo_x = (target_size[0] - new_width) // 2
    logo_y = (target_size[1] - logo_height) // 2
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    else:
        canvas.paste(resized_logo, (logo_x, logo_y))
    
    # Save as high-quality JPEG
    canvas.save(output_path, "JPEG", quality=95, optimize=True)
    
    print(f"Created VIBRANT banner: {output_path}")

except Exception as e:
    print(f"Error: {e}")
