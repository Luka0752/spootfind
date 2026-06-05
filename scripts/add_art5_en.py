import json

# Read current en.json
with open(r'C:\spootfind\messages\en.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Art5 content for Prime Day 2026 Mid-Year Sourcing Guide
art5 = {
    "art5_tag": "Prime Day 2026 Guide",
    "art5_title": "Prime Day 2026: Mid-Year Sourcing Guide for Global Sellers",
    "art5_subtitle": "June 23-26 Prime Day + TikTok mid-year sale June 18-July 3 — what to stock now",
    "art5_metaDesc": "Prime Day 2026 sourcing guide: Smart Jump Rope, Vibration Plates, Electric Spin Scrubbers trending. China factory-direct pricing for global B2B buyers.",
    "art5_hotTitle": u"\U0001F525 What's Going Viral for Prime Day 2026",
    "art5_hotContent": "Amazon Prime Day 2026 is confirmed for June 23-26, covering 26 countries. This is the single largest mid-year sales event globally \u2014 and the sourcing window is closing fast.\n\nTikTok Shop's mid-year sale (June 18 \u2014 July 3, 2026) overlaps perfectly, creating a dual-platform spike. TikTok Shop also launches in 4 European countries on June 15, adding fresh demand.\n\n**Smart Jump Rope (t17)**\nUK TikTok: 7-day sales $100K USD, ~4100 units. US market following same curve. 1688 cost: $3.50-$8.00. Retail: $15.99-$29.99. Margin: 70-80%.\n\n**Whole Body Vibration Plate (t18)**\nTikTok US: cumulative $7M USD. Single-day peak ~2000 units. 1688 cost: $80-$200. Retail: $299-$599. Heavy item \u2014 sea freight only. Margin: 60-75%.\n\n**Electric Spin Scrubber**\nTikTok Shop US Weekly GMV: $1.8M-$2.4M. Stable top-10 category. 1688 cost: $2.50-$6.00. Retail: $24.99-$39.99. Margin: 75-85%.\n\n**Fidget Toys (t1) & Squishmallows (t4)**\nTikTok legacy winners. Still top-5 in toys category. Low cost, high impulse buy. MOQ flexibility: 50-500 units.",
    "art5_profitTitle": u"\U0001F4B0 The Margin Reality",
    "art5_profitContent": "Smart Jump Rope: 1688 cost $3.50-$8.00 \u2192 US retail $15.99-$29.99. Air shipping friendly (light). Margin: 70-80%.\n\nWhole Body Vibration Plate: 1688 cost $80-$200 \u2192 US retail $299-$599. HEAVY (20-30kg). Sea freight only. Landed cost (sea + duties) on a $200 unit \u2248 $260-$290. Still 50%+ margin at $499 retail.\n\nElectric Spin Scrubber: 1688 cost $2.50-$6.00 \u2192 US retail $24.99-$39.99. Margin: 75-85%. Battery-powered models need UN38.3 certification for air shipping.\n\nFidget Toys: 1688 cost $0.50-$3.00/unit \u2192 Retail $8.99-$19.99. Margin: 80-90%. Small, fast turn.\n\n**Shipping Reality Check**\nExpress (7-12 days): use for jump ropes, scrubbers, toys. Sea freight (25-35 days): use for vibration plates, heavy equipment. Prime Day is June 23 \u2014 you need to ship NOW (by June 5) for express arrival before the event.",
    "art5_regionTitle": u"\U0001F3E0 Where These Products Come From",
    "art5_regionContent": "Smart Jump Rope: China \u2014 multiple manufacturing hubs with established electronics supply chains. Zhejiang and Guangdong clusters dominate. CE (EU) and FCC (US) certifications standard.\n\nWhole Body Vibration Plate: China \u2014 established fitness equipment manufacturing regions with deep metalworking and motor supply chains. Northern China hubs. CE (EU) certification required for fitness equipment. US: basic CPC if marketed for home fitness.\n\nElectric Spin Scrubber: China \u2014 multiple manufacturing hubs with deep expertise in plastic injection molding and electronics. Coastal production clusters offer integrated supply chains. IPX7 waterproof rating is the key spec buyers care about.\n\nFidget Toys: China \u2014 multiple manufacturing hubs with mature plastic injection and assembly supply chains. No certification required for basic models.",
    "art5_tipsTitle": u"\U0001F4DC How Spootfind Helps You Source",
    "art5_tipsContent": "You focus on selling. We handle the sourcing complexity:\n\n\u2705 Factory verification before you pay \u2014 we check business licenses, production capacity, export history\n\u2705 Price negotiation \u2014 factories give us better rates than Alibaba's listed prices\n\u2705 Sample management \u2014 we coordinate samples, QC photos, pre-shipment inspection\n\u2705 Shipping coordination \u2014 express for light items, sea freight for heavy items, full documentation\n\u2705 No upfront fees \u2014 you only pay after factory verification and sample approval\n\n**The Spootfind Advantage**\nWe're not Alibaba. We're your sourcing partner on the ground in China. One contact, full supply chain access, no platform fees.",
    "art5_contactTitle": "Ready for Prime Day 2026?",
    "art5_contactContent": "Prime Day is June 23-26. The sourcing window is closing. Contact us now for factory-direct pricing on Smart Jump Ropes, Vibration Plates, Electric Spin Scrubbers, and trending toys.",
    "art5_contactBtn": "Get Factory Pricing",
    "art5_contactLink": "/contact",
    "art5_faq": "{\"question\":\"When should I order for Prime Day 2026?\",\"answer\":\"Now. Express shipping takes 7-12 days. Sea freight takes 25-35 days. Prime Day is June 23 \u2014 order by June 5 for express, or you'll miss it.\"},{\"question\":\"What certifications do I need?\",\"answer\":\"Smart Jump Rope: CE/FCC. Vibration Plate: CE (EU) required. Electric Spin Scrubber: CE/FCC, UN38.3 for air shipping (battery). Fidget toys: none required.\"},{\"question\":\"What's the minimum order?\",\"answer\":\"Smart Jump Rope: 100-500 units. Vibration Plate: 50-200 units. Electric Spin Scrubber: 200-1000 units. Fidget toys: 50-500 units. Trial orders available at higher unit cost.\"}",
}

# Add to insights namespace
if 'insights' not in d:
    d['insights'] = {}
d['insights'].update(art5)

# Write back
with open(r'C:\spootfind\messages\en.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

print('Art5 added to en.json successfully')
print('Keys added:', list(art5.keys()))
