#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
给8个语言文件添加缺失的3个 FAQ key
先用英文占位，后续可替换为专业翻译
"""

import json
from pathlib import Path

# 从 en.json 读取完整的 FAQ 内容
with open('messages/en.json', 'r', encoding='utf-8-sig') as f:
    en_data = json.load(f)

faq_keys = ['art1_faq', 'art2_faq', 'art3_faq']
faq_content = {k: en_data['insights'][k] for k in faq_keys}

# 8个需要同步的语言
lang_files = ['ar', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'zh-TW']

updated = 0
for lang in lang_files:
    fname = Path(f'messages/{lang}.json')
    if not fname.exists():
        print(f'⚠️  {lang}.json 不存在，跳过')
        continue
    
    with open(fname, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    if 'insights' not in data:
        data['insights'] = {}
    
    added = 0
    for key in faq_keys:
        if key not in data['insights']:
            data['insights'][key] = faq_content[key]
            added += 1
    
    if added > 0:
        with open(fname, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f'✅ {lang}.json: 添加了 {added} 个 FAQ key')
        updated += 1
    else:
        print(f'ℹ️  {lang}.json: 已有 FAQ key，跳过')

print(f'\n✅ 完成！更新了 {updated} 个语言文件')
print('⚠️  注意：FAQ内容目前是英文，建议后续找专业翻译')
