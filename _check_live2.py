import sys, urllib.request, re, json
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request(
    'https://spootfind.com/zh/insights/tiktok-shop-june-2026-trending-products',
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120','Cache-Control':'no-cache'}
)
resp = urllib.request.urlopen(req, timeout=15)
html = resp.read().decode('utf-8', errors='ignore')

# Search ALL city names
cities = ['Shantou','Chonghai','Yangjiang','Jining','Yiwu','Quanzhou','Hangzhou','Weifang','汕头','澄海','阳江','济宁','义乌','泉州']
found = [c for c in cities if c in html]
print(f'Cities in raw HTML: {found if found else "NONE"}')

# Extract RSC payloads that contain art4 region data
# The pattern is self.__next_f.push([1,"ID",CONTENT])
for m in re.finditer(r'self\.__next_f\.push\(\[1,"([^"]+)",([^\]]+)\]\)', html):
    payload_id = m.group(1)
    content = m.group(2)
    if any(c in content for c in cities):
        print(f'\n!!! City found in RSC payload {payload_id} !!!')
        for c in cities:
            if c in content:
                idx = content.index(c)
                print(f'  "{c}" at {idx}: ...{content[max(0,idx-60):idx+80]}...')

# Also dump the actual article body from the messages data
# Find the art4_regionContent value in the RSC data
for m in re.finditer(r'"art4_regionContent"\s*:\s*"([^"]{0,200})"', html):
    print(f'\nart4_regionContent in HTML: {m.group(1)[:200]}')
