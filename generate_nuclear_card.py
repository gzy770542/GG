from PIL import Image, ImageDraw, ImageFont

# NUCLEAR OPTION: High-contrast JPEG, edge-to-edge content, zero white space
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/preview-max.jpg'

try:
    logo = Image.open(source_path)
    
    # Use a vibrant brand-relevant color for the entire background
    # Dark Navy blue is very professional and signals "full graphic" to AI
    navy_blue = (26, 43, 76) 
    canvas = Image.new("RGB", target_size, navy_blue)
    draw = ImageDraw.Draw(canvas)
    
    # Add a bold gold border to "frame" the image as a full-bleed graphic
    gold_color = (255, 215, 0)
    border_width = 15
    draw.rectangle([0, 0, 1200, border_width], fill=gold_color)
    draw.rectangle([0, 630-border_width, 1200, 630], fill=gold_color)
    draw.rectangle([0, 0, border_width, 630], fill=gold_color)
    draw.rectangle([1200-border_width, 0, 1200, 630], fill=gold_color)
    
    # Make the logo ENORMOUS. Fill almost the entire width.
    # This is key: WhatsApp thinks small logos are thumbnails. BIG graphics are Large Cards.
    target_width = 1100 
    aspect_ratio = logo.width / logo.height
    new_width = target_width
    new_height = int(new_width / aspect_ratio)
    
    # If too tall, scale by height instead
    if new_height > 550:
        new_height = 550
        new_width = int(new_height * aspect_ratio)
    
    resized_logo = logo.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    if resized_logo.mode == 'RGBA':
        # Create a temp background for pasting RGBA
        temp = Image.new("RGBA", resized_logo.size, (0,0,0,0))
        canvas.paste(resized_logo, ((1200-new_width)//2, (630-new_height)//2), resized_logo)
    else:
        canvas.paste(resized_logo, ((1200-new_width)//2, (630-new_height)//2))
    
    # Save as high-quality JPEG
    canvas.save(output_path, "JPEG", quality=98, optimize=True)
    
    print(f"Created NUCLEAR banner: {output_path}")
    print(f"Logo Size: {new_width}x{new_height}")

except Exception as e:
    print(f"Error: {e}")
