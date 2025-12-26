from PIL import Image, ImageDraw, ImageFont

# Settings
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-light.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-card.jpg'

try:
    logo = Image.open(source_path)
    
    # Create canvas with subtle gradient
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Subtle gradient background
    for y in range(target_size[1]):
        ratio = y / target_size[1]
        r = int(252 + (255 - 252) * ratio)
        g = int(248 + (255 - 248) * ratio)
        b = int(240 + (255 - 240) * ratio)
        draw.line([(0, y), (target_size[0], y)], fill=(r, g, b))
    
    # Logo on the left side - make it large
    logo_size = 500  # Large square logo
    resized_logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Position logo on left with padding
    logo_x = 80
    logo_y = (target_size[1] - logo_size) // 2
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    else:
        canvas.paste(resized_logo, (logo_x, logo_y))
    
    # Add text on the right side
    text_x = logo_x + logo_size + 60
    text_y_start = 180
    
    # Try to load a nice font, fallback to default
    try:
        title_font = ImageFont.truetype("arial.ttf", 72)
        subtitle_font = ImageFont.truetype("arial.ttf", 28)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Draw title
    title_text = "WISH GROUP"
    draw.text((text_x, text_y_start), title_text, fill=(26, 43, 76), font=title_font)
    
    # Draw subtitle
    subtitle_text = "One-Stop Financial Solution"
    draw.text((text_x, text_y_start + 100), subtitle_text, fill=(95, 150, 18), font=subtitle_font)
    
    # Draw tagline
    tagline = "Your trusted partner in banking,\nfinancial, legal and investment planning"
    draw.text((text_x, text_y_start + 160), tagline, fill=(100, 100, 100), font=subtitle_font)
    
    # Save
    canvas.save(output_path, quality=95)
    print(f"Successfully created landscape preview card: {output_path}")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
