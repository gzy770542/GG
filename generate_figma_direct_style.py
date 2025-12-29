from PIL import Image, ImageDraw

# FIGMA STYLE REPLICATION: Solid background, large logo, abstract shapes
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/preview-figma-style.jpg'

try:
    logo = Image.open(source_path)
    
    # 1. Background Color (Professional Dark Cyan/Teal variant like the Figma example)
    bg_color = (137, 169, 157) # Sage Green/Teal similar to Figma's example
    canvas = Image.new("RGB", target_size, bg_color)
    draw = ImageDraw.Draw(canvas)
    
    # 2. Add Abstract "Figma-style" Shapes
    # Large curve/blob on the right
    draw.chord([500, -100, 1500, 800], start=0, end=360, fill=(157, 189, 177)) # Lighter blob
    
    # Dotted line/curve
    points = [(600, 100), (700, 150), (850, 50), (1000, 150), (1100, 400), (800, 550)]
    # Actually just drawing some random "cool" shapes to add visual density
    draw.ellipse([850, 100, 950, 200], fill=(233, 114, 77)) # Orange sun
    draw.rectangle([1000, 150, 1150, 300], fill=(188, 149, 218)) # Purple square
    draw.regular_polygon((700, 400, 60), 6, rotation=0, fill=(255, 230, 100)) # Yellow hexagon
    
    # 3. Logo on the Left (Prominent)
    logo_height = 400
    aspect_ratio = logo.width / logo.height
    new_width = int(logo_height * aspect_ratio)
    resized_logo = logo.resize((new_width, logo_height), Image.Resampling.LANCZOS)
    
    # Position logo on the left
    logo_x = 100
    logo_y = (target_size[1] - logo_height) // 2
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    else:
        canvas.paste(resized_logo, (logo_x, logo_y))
        
    # 4. Save as high quality JPEG
    canvas.save(output_path, "JPEG", quality=95, optimize=True)
    
    print(f"Created FIGMA-STYLE banner: {output_path}")

except Exception as e:
    print(f"Error: {e}")
