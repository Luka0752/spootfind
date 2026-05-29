#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""检查产品描述字数"""

import json, re
from pathlib import Path

with open('data/trending.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

print("当前产品描述字数：\n")
for p in data['products']:
    desc = p.get('seoDescription', '')
    words = len(re.findall(r'\b\w+\b', desc))
    status = '✅' if words >= 350 else ('⚠️ ' if words >= 250 else '❌')
    name = p['name'][:35]
    print(f"{status} {p['id']} {name}: {words} words")

print("\n完成！")
