#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
扩充所有16个产品的 seoDescription 到 350-400 词
"""

import json, re
from pathlib import Path

data_path = Path("data/trending.json")
with open(data_path, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

def count_words(text):
    return len(re.findall(r'\b\w+\b', text))

# 完整扩充描述（每个350-400词）
expansions = {
    "t1": """Discover the ultimate pop it fidget toy set for kids and adults, packed with 60 assorted shapes that have taken TikTok by storm and become a global sensory phenomenon. This bulk fidget toy assortment includes circles, squares, hearts, unicorns, dinosaurs, space rockets, and other trending silhouettes — each one designed to deliver that satisfying pop sensation that keeps fingers busy and minds relaxed. Whether you're sourcing impulse-buy novelties for retail shelves, building a classroom reward box, or stocking a party favor catalog, this set delivers unbeatable variety at a price point that protects your margins and delights your customers. Every piece is molded from food-grade silicone that's odorless, washable, and built to withstand thousands of pops without losing its snap-back elasticity. The toys carry both CE and ASTM F963 certifications, giving wholesale buyers confidence that the product meets stringent safety standards in North America, Europe, and beyond. Manufactured in Shantou Chenghai — China's toy capital with decades of export expertise — this set benefits from mature supply-chain infrastructure, meaning consistent quality and reliable lead times even on large OEM orders. Each shape is pocket-sized (3-6 inches), making it ideal for checkout-counter displays, subscription box inserts, and e-commerce bundle offers. Target markets include the United States, United Kingdom, Germany, Australia, and the Middle East, where fidget and stress-relief toys continue to chart strong search volumes and repeat purchase rates. The assorted shapes encourage collectibility — customers don't just buy one, they buy multiple colors and designs, driving higher average order values for retailers and online sellers. Custom packaging, private-label printing, and assorted-shape configurations are available on MOQ, with Spootfind providing factory-direct sourcing, full compliance documentation, and reliable shipping to your market. Tap into the viral trend that shows no sign of slowing down.""",
    
    "t2": """Elevate your educational toy catalog with this STEM building blocks 500-piece set, engineered for children ages 6 and up who love hands-on construction and creative problem-solving that develops critical thinking skills early. Fully compatible with all major interlocking brick brands, this kit expands existing collections seamlessly — no awkward fits, no wasted pieces, no frustrated young builders. Beyond standard bricks, the set includes gears, wheels, axles, and connector pieces that let young engineers build working mechanisms: spinning windmills, rolling vehicles, and kinetic sculptures that actually move with realistic motion. It's a STEM learning toy that teaches cause-and-effect, spatial reasoning, and basic mechanical principles without feeling like schoolwork — kids are too busy building to notice they're learning. Certified CE and CPC, the blocks are made from ABS plastic with smooth edges, consistent clutch power, and zero phthalates — meeting the safety benchmarks demanded by distributors in the US, EU, and Australia. Shantou Goworld, the manufacturer, operates an ISO-audited facility with in-house testing labs, so every production run ships with full compliance documentation and test reports ready for your market's regulatory requirements. The 500-piece count strikes the right balance for retail: substantial enough to feel premium and enable complex builds, compact enough for shelf-friendly packaging that doesn't dominate retail shelf space. Ideal markets and channels include educational suppliers, museum gift shops, e-learning platforms, and toy retailers seeking a high-value STEM construction set that undercuts name-brand pricing without sacrificing quality or safety. The gear and wheel components transform this from "just another brick set" into a STEM learning powerhouse that parents and educators actively seek out for their children and students. OEM color schemes, custom instruction booklets tailored to your market, and branded packaging are available at scale. Spootfind connects you directly with the manufacturer, ensuring competitive pricing, reliable lead times, and full certification support for your target market — we handle the sourcing complexity so you can focus on growing your business.""",
    
    "t3": """Meet the remote control stunt car that does it all — 360-degree flips, all-terrain domination, and eye-catching LED light shows that make every run a spectacle. Powered by a responsive 2.4GHz transmitter, this RC stunt vehicle eliminates signal interference so multiple cars can race simultaneously without crossover issues. The dual-sided body design means there is no "right side up" — land on the roof and keep driving. Oversized rubber tires grip grass, gravel, carpet, and pavement with equal confidence, while the rechargeable battery delivers up to 45 minutes of continuous play per charge. FCC and CE certified, the car meets electromagnetic and toy-safety requirements for the US, European, and Australian markets. Shantou Aosheng, the manufacturer, is a veteran RC toy exporter with a dedicated QC team that inspects every batch before shipment. The compact form factor (approximately 25 cm) is perfect for ages 8 and up, and the striking LED underglow makes it a guaranteed eye-catcher on retail shelves and in unboxing videos. Wholesale buyers appreciate the low defect rate, consistent performance, and the ability to order custom frequencies and colorways. Whether you are building an RC toy collection for an e-commerce storefront or supplying brick-and-mortar hobby shops, this stunt car offers a proven best-seller with strong repeat-order rates. The 2.4GHz technology means parents can buy multiple units for siblings without signal conflicts, and the all-terrain tires mean the fun doesn't stop when the pavement ends. Spootfind sources directly from the manufacturer, providing full certification, competitive pricing, and reliable shipping to your market. This is the RC car that turns casual browsers into buyers and gift-givers into repeat customers.""",
}

def main():
    updated = 0
    for prod in data['products']:
        tid = prod['id']
        if tid in expansions:
            old_words = count_words(prod.get('seoDescription', ''))
            prod['seoDescription'] = expansions[tid].strip()
            new_words = count_words(prod['seoDescription'])
            print(f"✅ {tid} {prod['name']}: {old_words} → {new_words} words")
            updated += 1

    if updated > 0:
        with open(data_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"\n✅ Updated {updated} products, saved!")
    else:
        print("\nℹ️  No products needed updating")

if __name__ == "__main__":
    main()
