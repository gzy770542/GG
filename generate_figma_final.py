from PIL import Image, ImageDraw, ImageFont

# FIGMA FINAL STYLE: 16:9 Aspect Ratio (1200x675)
target_size = (1200, 675)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/final-figma-card.jpg'

try:
    logo = Image.open(source_path)
    
    # 1. Background
    # Use the Wish Group Navy Blue
    bg_color = (26, 43, 76) 
    canvas = Image.new("RGB", target_size, bg_color)
    draw = ImageDraw.Draw(canvas)
    
    # 2. Add abstract design elements (Figma style)
    # Gold accent circles/blobs
    gold_color = (255, 215, 0)
    draw.ellipse([800, -100, 1400, 500], fill=(255, 225, 100, 150)) # Light gold blob
    draw.ellipse([1000, 400, 1300, 700], fill=(255, 215, 0)) # Solid gold blob
    
    # Add some background "mesh" or stripes to signal visual density
    for i in range(0, 1200, 40):
        draw.line([(i, 0), (i+100, 675)], fill=(35, 55, 90), width=1)
    
    # 3. Logo on the Left
    logo_height = 450
    aspect_ratio = logo.width / logo.height
    new_width = int(logo_height * aspect_ratio)
    resized_logo = logo.resize((new_width, logo_height), Image.Resampling.LANCZOS)
    
    logo_x = 100
    logo_y = (target_size[1] - logo_height) // 2
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    else:
        canvas.paste(resized_logo, (logo_x, logo_y))
        
    # 4. Text on the Right
    try:
        # Using a standard font that's likely available
        font_main = ImageFont.truetype("arial.ttf", 60)
        font_sub = ImageFont.truetype("arial.ttf", 30)
    except:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    draw.text((650, 260), "WISH GROUP", fill=(255, 255, 255), font=font_main)
    draw.text((650, 340), "One-Stop Financial Solution", fill=(255, 215, 0), font=font_sub)
    draw.text((650, 390), "Your Trusted Partner", fill=(200, 200, 200), font=font_sub)
    
    # 5. Save as high quality JPEG
    canvas.save(output_path, "JPEG", quality=95, optimize=True)
    
    print(f"Created FIGMA-STYLE banner: {output_path}")

except Exception as e:
    print(f"Error: {e}")
