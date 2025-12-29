from PIL import Image, ImageDraw, ImageFont

# ULTRA-OPTIMIZED banner for WhatsApp Large Preview
target_size = (1200, 628)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/preview-v10.png'

try:
    logo = Image.open(source_path)
    
    # Create background with a bold branding color (dark blue/navy)
    # This makes the entire image a "graphic" rather than a "logo on white"
    navy_blue = (26, 43, 76) 
    canvas = Image.new("RGB", target_size, navy_blue)
    draw = ImageDraw.Draw(canvas)
    
    # Add some branding stripes or shapes to make it a "design"
    gold_color = (255, 215, 0)
    # Top and bottom stripes
    draw.rectangle([0, 0, 1200, 20], fill=gold_color)
    draw.rectangle([0, 608, 1200, 628], fill=gold_color)
    
    # Add a large transparent logo in the background for texture
    bg_logo_size = 800
    bg_logo = logo.resize((bg_logo_size, bg_logo_size), Image.Resampling.LANCZOS)
    if bg_logo.mode != 'RGBA':
        bg_logo = bg_logo.convert('RGBA')
    
    # Create a faded version for background
    faded_bg_logo = Image.new('RGBA', bg_logo.size, (0,0,0,0))
    for x in range(bg_logo.width):
        for y in range(bg_logo.height):
            r, g, b, a = bg_logo.getpixel((x, y))
            faded_bg_logo.putpixel((x, y), (r, g, b, int(a * 0.1))) # 10% opacity
            
    canvas.paste(faded_bg_logo, (600, -100), faded_bg_logo)
    
    # Main logo in center (slightly smaller to leave room for the "full image" look)
    main_logo_height = 400
    aspect_ratio = logo.width / logo.height
    main_logo_width = int(main_logo_height * aspect_ratio)
    resized_logo = logo.resize((main_logo_width, main_logo_height), Image.Resampling.LANCZOS)
    
    if resized_logo.mode != 'RGBA':
        resized_logo = resized_logo.convert('RGBA')
    
    # Position main logo
    logo_x = (target_size[0] - main_logo_width) // 2
    logo_y = (target_size[1] - main_logo_height) // 2 - 20
    
    canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    
    # Add explicit branding text on the image
    try:
        font_main = ImageFont.truetype("arial.ttf", 60)
    except:
        font_main = ImageFont.load_default()
        
    branding_text = "WISH GROUP RESOURCES"
    bbox = draw.textbbox((0, 0), branding_text, font=font_main)
    text_width = bbox[2] - bbox[0]
    draw.text(((1200 - text_width)//2, 500), branding_text, fill=gold_color, font=font_main)
    
    # Save as PNG
    canvas.save(output_path, "PNG", optimize=True)
    
    print(f"Created ULTRA banner: {output_path}")

except Exception as e:
    print(f"Error: {e}")
