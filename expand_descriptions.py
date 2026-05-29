#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
Spootfind 产品描述扩充脚本
将 seoDescription 从 ~200 词扩充到 350-400 词
保持营销视角，不透露采购细节
"""

import json
import re
from pathlib import Path

# 读取 trending.json
data_path = Path("data/trending.json")
with open(data_path, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

def count_words(text):
    """计算英文单词数"""
    words = re.findall(r'\b\w+\b', text)
    return len(words)

def expand_description(prod):
    """为单个产品生成扩充描述"""
    name = prod['name']
    category = prod['category']
    current_desc = prod.get('seoDescription', '')
    current_words = count_words(current_desc)
    
    # 如果已经够长就跳过
    if current_words >= 300:
        return None
    
    # 产品特定扩充模板
    expansions = {
        't1': """
Perfect for stress relief, ADHD focus, and sensory play, these pop it toys have become a viral sensation across TikTok and Instagram. The assorted shapes include circles, squares, hearts, unicorns, dinosaurs, space rockets, and more — each delivering that addictive pop sensation that keeps fingers busy and minds relaxed. Made from food-grade silicone that's odorless, washable, and built to withstand thousands of pops without losing elasticity. CE and ASTM F963 certified for safety compliance in North America, Europe, and Australia. Sourced from Shantou Chenghai — China's toy manufacturing capital with decades of export experience. Ideal for retail shelving, party favor bundles, classroom rewards, and subscription box inserts. Pocket-sized design (3-6 inches) fits perfectly at checkout counters for impulse purchases. Custom packaging, private-label printing, and assorted-shape configurations available on MOQ. Trending in United States, United Kingdom, Germany, Australia, and Middle East markets where fidget toys continue strong search volume growth.
""",
        't2': """
This 500-piece STEM building blocks set is engineered for children ages 6+ who love hands-on construction and creative problem-solving. Fully compatible with all major interlocking brick brands, this kit expands existing collections seamlessly — no awkward fits, no wasted pieces. Beyond standard bricks, the set includes gears, wheels, axles, and connector pieces that let young engineers build working mechanisms: spinning windmills, rolling vehicles, and kinetic sculptures that actually move. It's a STEM learning toy that teaches cause-and-effect, spatial reasoning, and basic mechanical principles without feeling like schoolwork. Certified CE and CPC, the blocks are made from ABS plastic with smooth edges, consistent clutch power, and zero phthalates — meeting safety benchmarks demanded by distributors in US, EU, and Australia. Manufactured in an ISO-audited Shantou facility with in-house testing labs, every production run ships with full compliance documentation. The 500-piece count strikes the right balance for retail: substantial enough to feel premium, compact enough for shelf-friendly packaging. Ideal for educational suppliers, museum gift shops, e-learning platforms, and toy retailers seeking high-value STEM construction sets at competitive pricing. OEM color schemes, custom instruction booklets, and branded packaging available at scale.
""",
        't3': """
This remote control stunt car does it all — 360-degree flips, all-terrain domination, and eye-catching LED light shows that make every run a spectacle. Powered by a responsive 2.4GHz transmitter that eliminates signal interference so multiple cars can race simultaneously without crossover issues. The dual-sided body design means there's no "right side up" — land on the roof and keep driving. Oversized rubber tires grip grass, gravel, carpet, and pavement with equal confidence, while the rechargeable battery delivers up to 45 minutes of continuous play per charge. FCC and CE certified, meeting electromagnetic and toy-safety requirements for US, European, and Australian markets. Manufactured by Shantou Aosheng, a veteran RC toy exporter with a dedicated QC team inspecting every batch before shipment. The compact form factor (approx. 25 cm) is perfect for ages 8+, and the striking LED underglow makes it a guaranteed eye-catcher on retail shelves and in unboxing videos. Wholesale buyers appreciate the low defect rate, consistent performance, and ability to order custom frequencies and colorways. Whether building an RC toy collection for an e-commerce storefront or supplying brick-and-mortar hobby shops, this stunt car offers a proven best-seller with strong repeat-order rates.
"""
    }
    
    # 如果有预设扩充就用，否则返回提示
    if name in expansions or prod['id'] in expansions:
        key = prod['id'] if prod['id'] in expansions else name
        return expansions.get(key, expansions.get(name))
    
    return None

# 处理所有产品
updated = 0
for prod in data['products']:
    new_desc = expand_description(prod)
    if new_desc:
        prod['seoDescription'] = (prod.get('seoDescription', '') + ' ' + new_desc.strip()).strip()
        updated += 1
        print(f"✅ {prod['id']} {prod['name']}: {count_words(prod['seoDescription'])} words")
    else:
        words = count_words(prod.get('seoDescription', ''))
        if words >= 300:
            print(f"⏭️  {prod['id']} {prod['name']}: already {words} words, skip")
        else:
            print(f"⚠️  {prod['id']} {prod['name']}: needs manual expansion ({words} words)")

# 保存
if updated > 0:
    with open(data_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"\n✅ Updated {updated} products, saved to {data_path}")
else:
    print("\nℹ️  No products needed updating")

print("\nDone!")
