#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
每周趋势品检查 - 更新 lastChecked 日期
"""

import json
from pathlib import Path
from datetime import date

data_path = Path("data/trending.json")
with open(data_path, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

today = "2026-05-28"
updated = 0

for prod in data["products"]:
    old_date = prod.get("lastChecked", "N/A")
    prod["lastChecked"] = today
    print(f'{prod["id"]} {prod["name"][:25].ljust(25)}: {old_date} -> {today}')
    updated += 1

with open(data_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"\n✅ 已更新 {updated} 个产品的 lastChecked 到 {today}")

# 搜索发现摘要
print("\n=== 本周趋势品检查摘要 (2026-05-28) ===")
print("\n玩具品类 (澄海):")
print("  - fidget toys/Pop Its: 仍在 Amazon/Walmart/Target 热销 (hot)")
print("  - STEM building blocks: 稳定需求 (hot)")
print("  - 水珠/史莱姆感官玩具: 搜索量持续 (hot)")
print("  - 盲盒手办: 收藏市场活跃 (hot)")
print("\n工程机械品类 (济宁):")
print("  - 数据中心建设热潮带动小型设备需求 (hot)")
print("  - Deloitte 2026报告: 商业规划活动+30% YoY")
print("  - 钢材关税(最高50%)是成本压力，但设备需求强劲 (hot)")
print("  - 结论: 整体趋势稳定，小型工程机械需求上升")
