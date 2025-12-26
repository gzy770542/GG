from PIL import Image

# Settings
target_size = (1200, 630)
source_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-logo-source.png'
output_path = 'c:/Users/ASUS/Desktop/holysheet/holysheet/public_html/images/wish-group-card.jpg'

try:
    logo = Image.open(source_path)
    print(f"Original logo size: {logo.size}")
    
    # Create white canvas
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    
    # Calculate dimensions to fit the ENTIRE logo within the canvas
    # We want to show the complete logo, so we scale to fit within bounds
    aspect_ratio = logo.width / logo.height
    
    # Add padding
    padding = 30
    available_width = target_size[0] - (padding * 2)
    available_height = target_size[1] - (padding * 2)
    
    # Scale to fit within available space (no cropping)
    if available_width / aspect_ratio <= available_height:
        # Width is the limiting factor
        new_width = available_width
        new_height = int(new_width / aspect_ratio)
    else:
        # Height is the limiting factor
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
    
    # Save
    canvas.save(output_path, 'JPEG', quality=95)
    print(f"Successfully created preview card: {output_path}")
    print(f"Logo size on card: {new_width}x{new_height}")
    print(f"Position: ({x_pos}, {y_pos})")
    print(f"Final card size: {target_size}")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
