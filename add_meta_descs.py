#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
为所有语言文件的 insights 命名空间添加缺失的 metaDesc key
"""

import json
from pathlib import Path

# 默认值（英文）
defaults = {
    'art1_metaDesc': 'Source TikTok trending fidget toys from China at 1/5 retail price. CE/ASTM certified. 200-600% margins. Get factory quote in 24h. Updated May 2026.',
    'art2_metaDesc': 'Mini excavators are trending globally. Source from Jining, China at 1/8 cost. RCM/CE certified. Get quote for construction equipment sourcing.',
    'art3_metaDesc': 'Southeast Asia e-commerce is booming. TikTok Shop GMV +125%. Source trending products at 1/5 cost. Get sourcing guide and factory quote.',
}

# 读取 en.json 作为参考（如果有更详细的描述就用它）
en_path = Path('messages/en.json')
with open(en_path, 'r', encoding='utf-8-sig') as f:
    en_data = json.load(f)
    en_insights = en_data.get('insights', {})
    
    # 用 en.json 中的值（如果存在）
    for key in defaults:
        if key in en_insights:
            defaults[key] = en_insights[key]

print(f"使用以下默认值：")
for k, v in defaults.items():
    print(f"  {k}: {v[:60]}...")

# 遍历所有语言文件
msgs_dir = Path('messages')
updated_count = 0

for json_file in msgs_dir.glob('*.json'):
    with open(json_file, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    insights = data.get('insights', {})
    added = []
    
    for key, default_value in defaults.items():
        if key not in insights:
            insights[key] = default_value
            added.append(key)
    
    if added:
        data['insights'] = insights
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"\n✅ {json_file.name}: 添加了 {added}")
        updated_count += 1
    else:
        print(f"\n⏭️  {json_file.name}: 已有所有 metaDesc")

print(f"\n完成！更新了 {updated_count} 个文件")
