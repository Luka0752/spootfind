from PIL import Image, ImageDraw, ImageFont
import os

OUT = r'C:\spootfind\public\products'

# Try to load a font, fall back to default
try:
    font = ImageFont.truetype("arial.ttf", 32)
    font_small = ImageFont.truetype("arial.ttf", 20)
except:
    font = ImageFont.load_default()
    font_small = font

# ===== t17: Smart Jump Rope =====
img = Image.new('RGB', (800, 800), color='#f5f5f5')
d = ImageDraw.Draw(img)

# Draw jump rope handle (left)
d.rectangle([200, 300, 260, 500], fill='#2c3e50', outline='#1a252f', width=3)
d.rectangle([200, 280, 260, 320], fill='#e74c3c', outline='#c0392b', width=2)
# Handle grip lines
for y in range(330, 480, 30):
    d.line([210, y, 250, y], fill='#1a252f', width=2)

# Draw jump rope handle (right)
d.rectangle([540, 300, 600, 500], fill='#2c3e50', outline='#1a252f', width=3)
d.rectangle([540, 280, 600, 320], fill='#e74c3c', outline='#c0392b', width=2)
for y in range(330, 480, 30):
    d.line([550, y, 590, y], fill='#1a252f', width=2)

# Draw rope (curved line approximation)
import math
for i, t in enumerate(range(0, 100, 2)):
    x = 260 + t * 2.8
    y = 350 + abs(math.sin(t / 16.0)) * 180
    d.point([int(x), int(y)], fill='#34495e')

# LED indicator on handle
d.ellipse([215, 285, 245, 315], fill='#2ecc71')

# Label
d.rectangle([200, 60, 600, 130], fill='#2c3e50')
d.text((300, 75), "SMART JUMP ROPE", fill='white', font=font, anchor='mm')

# Sublabel
d.text((400, 150), "Bluetooth | App Sync | LCD Display", fill='#7f8c8d', font=font_small, anchor='mm')

# Features box
d.rectangle([150, 620, 650, 750], fill='white', outline='#bdc3c7', width=2)
d.text((400, 645), "Key Features:", fill='#2c3e50', font=font_small, anchor='mm')
d.text((400, 680), "• Counts jumps automatically", fill='#34495e', font=font_small, anchor='mm')
d.text((400, 710), "• Syncs to smartphone app", fill='#34495e', font=font_small, anchor='mm')
d.text((400, 740), "• 7-10 day battery life", fill='#34495e', font=font_small, anchor='mm')

img.save(os.path.join(OUT, 't17-jumprope.jpg'), 'JPEG', quality=92)
print('t17-jumprope.jpg saved')

# ===== t18: Whole Body Vibration Plate =====
img2 = Image.new('RGB', (800, 800), color='#f5f5f5')
d2 = ImageDraw.Draw(img2)

# Base/platform
d2.rectangle([100, 450, 700, 550], fill='#34495e', outline='#2c3e50', width=4)
# Platform top surface
d2.rectangle([100, 450, 700, 510], fill='#5d6d7b', outline='#2c3e50', width=3)
# Non-slip texture lines
for x in range(120, 680, 30):
    d2.line([x, 460, x, 500], fill='#4a5a6a', width=1)

# Base feet
d2.rectangle([120, 545, 180, 580], fill='#2c3e50')
d2.rectangle([520, 545, 580, 580], fill='#2c3e50')

# Control panel (on base)
d2.rectangle([280, 380, 520, 450], fill='#1a1a2e', outline='#e94560', width=2)
d2.text((400, 415), "LED DISPLAY", fill='#00d2ff', font=font_small, anchor='mm')

# Buttons
for i, (bx, label) in enumerate([(310, "PWR"), (380, "MODE"), (450, "SPD")]):
    d2.ellipse([bx, 350, bx+40, 390], fill='#e94560', outline='white', width=2)
    d2.text((bx+20, 405), label, fill='white', font=font_small, anchor='mm')

# Vibration indicator waves
for r in range(60, 180, 30):
    d2.arc([400-r, 250-r, 400+r, 250+r], 0, 360, fill='#00d2ff', width=2)

# Label
d2.rectangle([150, 60, 650, 130], fill='#1a1a2e')
d2.text((400, 95), "WHOLE BODY VIBRATION PLATE", fill='white', font=font, anchor='mm')

# Sublabel
d2.text((400, 155), "Home Fitness | 99 Speed Levels | Remote Control", fill='#7f8c8d', font=font_small, anchor='mm')

# Features box
d2.rectangle([150, 620, 650, 750], fill='white', outline='#bdc3c7', width=2)
d2.text((400, 645), "Key Features:", fill='#2c3e50', font=font_small, anchor='mm')
d2.text((400, 680), "• 99 vibration speed levels", fill='#34495e', font=font_small, anchor='mm')
d2.text((400, 710), "• LED display with remote", fill='#34495e', font=font_small, anchor='mm')
d2.text((400, 740), "• Max load 150kg / 330lbs", fill='#34495e', font=font_small, anchor='mm')

img2.save(os.path.join(OUT, 't18-vibration-plate.jpg'), 'JPEG', quality=92)
print('t18-vibration-plate.jpg saved')
print('Done!')
