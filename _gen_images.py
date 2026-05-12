from PIL import Image, ImageDraw, ImageFont
import os

dest = r"C:\EcoCycle\spootfind\public\products"
os.makedirs(dest, exist_ok=True)

def make_product_image(filename, bg_color, icon_color, label_en, label_cn):
    """Generate a clean placeholder product image with label."""
    W, H = 400, 300
    img = Image.new('RGB', (W, H), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Rounded rect background
    pad = 15
    draw.rounded_rectangle([pad, pad, W-pad, H-pad], radius=20, fill=(30, 35, 60))
    
    # Icon circle
    cx, cy = W//2, H//2 - 20
    r = 55
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=icon_color)
    
    # Label text
    try:
        font_large = ImageFont.truetype("arial.ttf", 20)
        font_small = ImageFont.truetype("arial.ttf", 13)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # English label (centered, below icon)
    bbox = draw.textbbox((0, 0), label_en, font=font_large)
    lw = bbox[2] - bbox[0]
    draw.text((cx - lw//2, cy + 65), label_en, fill=(200, 210, 255), font=font_large)
    
    # Chinese label
    bbox2 = draw.textbbox((0, 0), label_cn, font=font_small)
    lw2 = bbox2[2] - bbox2[0]
    draw.text((cx - lw2//2, cy + 92), label_cn, fill=(160, 170, 200), font=font_small)
    
    img.save(os.path.join(dest, filename), 'JPEG', quality=88)
    size = os.path.getsize(os.path.join(dest, filename))
    print(f"Generated: {filename} ({size} bytes)")

# Generate missing images
images = [
    # (filename, bg, icon_color, en_label, cn_label)
    ("bamboo-paper-towels.jpg",  (30, 100, 60),  (100, 180, 80),  "Bamboo Paper Towels", "竹纤维厨房纸 6件套"),
    ("collapsible-cup.jpg",      (30, 70, 120),   (80, 140, 220),  "Silicone Travel Cup", "可折叠硅胶随行杯"),
    ("silicone-bags.jpg",        (50, 60, 110),   (120, 140, 255), "Silicone Food Bags",  "硅胶食物保鲜袋"),
    ("bamboo-toothbrush.jpg",    (30, 90, 70),    (80, 170, 110),  "Bamboo Toothbrush",   "竹牙刷 4支装"),
    ("beeswax-wraps.jpg",        (110, 80, 30),   (220, 170, 80),  "Beeswax Food Wraps",  "蜂蜡保鲜膜 5片装"),
    ("water-bottle.jpg",         (40, 60, 130),   (100, 150, 255), "Water Bottle 32oz",   "保温不锈钢水杯"),
    ("produce-bags.jpg",         (50, 90, 60),    (100, 170, 110), "Produce Bags 10pk",   "可重复使用购物网袋"),
    ("tote-bag.jpg",             (80, 60, 40),    (200, 160, 80),  "Organic Cotton Tote", "有机棉帆布袋"),
    ("steel-straws.jpg",         (60, 60, 80),    (160, 170, 200), "Steel Straws 8-Pack", "不锈钢吸管套装"),
    ("solar-charger.jpg",       (40, 70, 130),   (255, 180, 50),  "Solar Charger 25K",   "便携太阳能充电宝"),
]

for args in images:
    make_product_image(*args)

print("Done!")