import json, sys, urllib.request, re
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request('https://spootfind.com/zh/insights/tiktok-shop-june-2026-trending-products', headers={'User-Agent':'Mozilla/5.0','Cache-Control':'no-cache'})
resp = urllib.request.urlopen(req, timeout=15)
html = resp.read().decode('utf-8', errors='ignore')

cities = ['Shantou', 'Chonghai', 'Yangjiang', 'Jining', 'Yiwu', 'Hangzhou', 'Quanzhou', 'Weifang', '汕头', '澄海', '阳江', '济宁', '义乌', '泉州']
for city in cities:
    if city in html:
        idx = html.index(city)
        print(f'FOUND "{city}" at pos {idx}')
        start = max(0, idx-150)
        end = min(len(html), idx+250)
        snippet = html[start:end]
        snippet = re.sub(r'<[^>]+>', ' ', snippet)
        snippet = re.sub(r'\s+', ' ', snippet).strip()
        print(f'Context: ...{snippet}...')
        print('---')
else:
    print('No city names found in live HTML')
    
# Also check: is the art4_regionContent field actually being used?
# Let's see what the page renders for the region section
if 'art4_regionContent' in html or 'regionContent' in html:
    print('\nregionContent reference found in HTML')
# Check if old city data exists anywhere
if 'Chonghai' in html or 'chonghai' in html:
    print('\n!!! Chonghai still in live HTML !!!')
