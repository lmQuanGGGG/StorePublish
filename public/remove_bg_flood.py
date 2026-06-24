from PIL import Image, ImageDraw

def remove_outer_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Distinct magenta color
    magic_color = (255, 0, 255, 255)
    
    # Floodfill from all 4 corners to ensure we cover the whole outer background
    width, height = img.size
    ImageDraw.floodfill(img, xy=(0, 0), value=magic_color, thresh=30)
    ImageDraw.floodfill(img, xy=(width-1, 0), value=magic_color, thresh=30)
    ImageDraw.floodfill(img, xy=(0, height-1), value=magic_color, thresh=30)
    ImageDraw.floodfill(img, xy=(width-1, height-1), value=magic_color, thresh=30)

    datas = img.getdata()
    newData = []
    
    for item in datas:
        if item == magic_color:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_outer_bg("tai-ung-dung-mien-phi-1.png", "tai-ung-dung-mien-phi-1-transparent.png")
