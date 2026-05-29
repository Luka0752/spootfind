#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
为所有语言文件添加缺失的 metaDesc key
"""

import json
from pathlib import Path

# 定义所有语言的 metaDesc（英文版，其他语言暂时用英文）
meta_descs = {
    'art1_metaDesc': 'Source TikTok trending fidget toys from China at 1/5 retail price. CE/ASTM certified. 200-600% margins. Get factory quote in 24h. Updated May 2026.',
    'art2_metaDesc': 'Mini excavators are trending globally. Source from Jining, China at 1/8 cost. RCM/CE certified. Get quote for construction equipment sourcing.',
    'art3_metaDesc': 'Southeast Asia e-commerce is booming. TikTok Shop GMV +125%. Source trending products at 1/5 cost. Get sourcing guide and factory quote.',
}

# 遍历所有 json 文件
msgs_dir = Path('messages')
for json_file in msgs_dir.glob('*.json'):
    with open(json_file, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    insights = data.get('insights', {})
    added = []
    
    for key, default_value in meta_descs.items():
        if key not in insights:
            insights[key] = default_value
            added.append(key)
    
    if added:
        data['insights'] = insights
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"[OK] {json_file.name}: added {added}")
    else:
        print(f"[SKIP] {json_file.name}: already has all metaDesc")

print('\nDone!')
