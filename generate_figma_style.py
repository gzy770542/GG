from PIL import Image, ImageDraw

# FIGMA COMMUNITY STYLE: 16:9 Aspect Ratio (1200x675)
target_size = (1200, 675)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/final-large-preview.jpg'

try:
    logo = Image.open(source_path)
    
    # Create background with a gradient + some "Figma-style" Blobs
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Base background (Light Professional Gray)
    draw.rectangle([0, 0, 1200, 675], fill=(240, 244, 248))
    
    # Add "Figma Blobs" (Colorful professional shapes to signal "Graphic")
    draw.ellipse([800, -100, 1400, 400], fill=(255, 215, 0, 150)) # Gold blob
    draw.ellipse([-300, 300, 400, 900], fill=(26, 43, 76, 180))   # Navy blob
    
    # Logo size - Large
    logo_height = 500
    aspect_ratio = logo.width / logo.height
    new_width = int(logo_height * aspect_ratio)
    
    resized_logo = logo.resize((new_width, logo_height), Image.Resampling.LANCZOS)
    
    # Center Logo
    canvas.paste(resized_logo, ((1200 - new_width)//2, (675 - logo_height)//2), resized_logo if logo.mode == 'RGBA' else None)
    
    # Final Border
    border_color = (26, 43, 76)
    draw.rectangle([0, 0, 1200, 5], fill=border_color) # Top line
    
    # Save as high quality JPEG
    canvas.save(output_path, "JPEG", quality=98, optimize=True)
    
    print(f"Created FIGMA-STYLE banner: {output_path}")

except Exception as e:
    print(f"Error: {e}")
