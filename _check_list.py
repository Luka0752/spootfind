import sys, urllib.request, re
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request(
    'https://spootfind.com/zh/insights',
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120','Cache-Control':'no-cache'}
)
resp = urllib.request.urlopen(req, timeout=15)
html = resp.read().decode('utf-8', errors='ignore')

cities = ['Shantou','Chonghai','Yangjiang','Jining','Yiwu','Quanzhou','Hangzhou','Weifang','汕头','澄海','阳江','济宁','义乌','泉州']
found = [c for c in cities if c in html]
print(f'Cities in /zh/insights HTML: {found if found else "NONE - CLEAN"}')

# Also check for hardcoded English text patterns
if 'Shantou Chenghai' in html:
    print('!!! "Shantou Chenghai" still present !!!')
    idx = html.index('Shantou Chenghai')
    print(html[max(0,idx-50):idx+100])
else:
    print('No "Shantou Chenghai" found - FIXED')
