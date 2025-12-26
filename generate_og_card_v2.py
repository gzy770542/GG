from PIL import Image, ImageDraw, ImageFont

# Settings
target_size = (1200, 630)
bg_color = (255, 255, 255)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-light.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-card.jpg'

try:
    logo = Image.open(source_path)
    
    # Create canvas
    canvas = Image.new("RGB", target_size, bg_color)
    
    # Make logo fill the full height with minimal padding
    padding = 20
    logo_height = target_size[1] - (padding * 2)  # 590px
    aspect_ratio = logo.width / logo.height
    logo_width = int(logo_height * aspect_ratio)  # 590px (square)
    
    resized_logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
    
    # Center the logo on the canvas
    x_pos = (target_size[0] - logo_width) // 2
    y_pos = padding
    
    # Paste logo
    canvas.paste(resized_logo, (x_pos, y_pos), resized_logo if logo.mode == 'RGBA' else None)
    
    # Save
    canvas.save(output_path, quality=95)
    print(f"Successfully created {output_path}")
    print(f"Logo size: {logo_width}x{logo_height}")

except Exception as e:
    print(f"Error: {e}")
