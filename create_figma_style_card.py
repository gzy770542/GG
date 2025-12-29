from PIL import Image

# Use the SAME format as Figma: 1200x630 landscape
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-cardv2.jpg'

try:
    logo = Image.open(source_path)
    print(f"Original logo size: {logo.size}")
    
    # Create white canvas (landscape like Figma)
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    
    # Calculate dimensions to fit the ENTIRE logo within the canvas
    aspect_ratio = logo.width / logo.height
    
    # Add padding
    padding = 40
    available_width = target_size[0] - (padding * 2)
    available_height = target_size[1] - (padding * 2)
    
    # Scale to fit within available space
    if available_width / aspect_ratio <= available_height:
        new_width = available_width
        new_height = int(new_width / aspect_ratio)
    else:
        new_height = available_height
        new_width = int(new_height * aspect_ratio)
    
    # Resize logo
    resized_logo = logo.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Center the logo on canvas
    x_pos = (target_size[0] - new_width) // 2
    y_pos = (target_size[1] - new_height) // 2
    
    # Paste logo (handle transparency)
    if logo.mode == 'RGBA':
        canvas.paste(resized_logo, (x_pos, y_pos), resized_logo)
    else:
        canvas.paste(resized_logo, (x_pos, y_pos))
    
    # Save with optimization
    canvas.save(output_path, 'JPEG', quality=90, optimize=True)
    
    # Check file size
    import os
    file_size = os.path.getsize(output_path)
    
    print(f"Successfully created preview card: {output_path}")
    print(f"Card size: {target_size} (1.91:1 ratio - same as Figma)")
    print(f"Logo size on card: {new_width}x{new_height}")
    print(f"File size: {file_size} bytes ({file_size/1024:.1f} KB)")
    print(f"Under 300KB: {file_size < 300*1024}")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
