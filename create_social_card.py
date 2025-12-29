from PIL import Image, ImageDraw, ImageFont

# Create a "social media style" card with text ON the image
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-cardv2.jpg'

try:
    logo = Image.open(source_path)
    
    # Create canvas with a light colored background (not white)
    bg_color = (245, 248, 250)  # Light blue-gray
    canvas = Image.new("RGB", target_size, bg_color)
    draw = ImageDraw.Draw(canvas)
    
    # Add logo in the center-top area
    logo_height = 350
    aspect_ratio = logo.width / logo.height
    logo_width = int(logo_height * aspect_ratio)
    
    resized_logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
    
    logo_x = (target_size[0] - logo_width) // 2
    logo_y = 80
    
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (logo_x, logo_y), resized_logo)
    else:
        canvas.paste(resized_logo, (logo_x, logo_y))
    
    # Add text at the bottom to make it look like a social post
    try:
        font_large = ImageFont.truetype("arial.ttf", 48)
        font_small = ImageFont.truetype("arial.ttf", 24)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Add title text
    title = "One-Stop Financial Solution"
    text_y = logo_y + logo_height + 40
    
    # Center the text
    bbox = draw.textbbox((0, 0), title, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_x = (target_size[0] - text_width) // 2
    
    draw.text((text_x, text_y), title, fill=(26, 43, 76), font=font_large)
    
    # Save
    canvas.save(output_path, 'JPEG', quality=92, optimize=True)
    
    import os
    file_size = os.path.getsize(output_path)
    
    print(f"Created social-style card")
    print(f"Size: {target_size}")
    print(f"File: {file_size/1024:.1f} KB")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
