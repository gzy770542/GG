from PIL import Image, ImageDraw

# FINAL ATTEMPT: 1200x628 (Exactly 1.91:1) with "Rich" background
target_size = (1200, 628) 
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/preview-large.png'

try:
    logo = Image.open(source_path)
    
    # Create background with complex pattern to avoid "Logo on White" detection
    canvas = Image.new("RGBA", target_size, (255, 255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Add some light-colored abstract shapes (like Figma) to make it look like a graphic
    # Light gold/yellow patterns
    gold_color = (255, 245, 200, 100) # Semi-transparent gold
    draw.ellipse([(-200, -200), (400, 400)], fill=gold_color)
    draw.ellipse([(900, 300), (1300, 700)], fill=gold_color)
    draw.polygon([(800, 0), (1200, 0), (1000, 200)], fill=(240, 240, 240, 150))
    
    # Resize logo - make it prominent but not touching edges
    logo_height = 500
    aspect_ratio = logo.width / logo.height
    logo_width = int(logo_height * aspect_ratio)
    
    resized_logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
    
    # Position logo
    logo_x = (target_size[0] - logo_width) // 2
    logo_y = (target_size[1] - logo_height) // 2
    
    # Paste logo
    canvas.paste(resized_logo, (logo_x, logo_y), resized_logo if logo.mode == 'RGBA' else None)
    
    # Convert to RGB for final saving (WhatsApp prefers JPG or non-alpha PNG sometimes)
    final_canvas = canvas.convert("RGB")
    final_canvas.save(output_path, "PNG", optimize=True)
    
    print(f"Successfully created: {output_path}")
    print(f"Dimensions: {target_size} (1.91:1)")

except Exception as e:
    print(f"Error: {e}")
