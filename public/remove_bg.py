from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=230):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if pixel is white/close to white
        if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_white_bg("tai-ung-dung-mien-phi-1.png", "tai-ung-dung-mien-phi-1-transparent.png")
