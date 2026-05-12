import urllib.request, os

headers = {'User-Agent': 'Mozilla/5.0 (compatible; SpootfindBot/1.0)'}

test_urls = [
    ("bamboo-paper-towels.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Bamboo.jpg/300px-Bamboo.jpg"),
    ("silicone-bags.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Silicone_bakeware.jpg/300px-Silicone_bakeware.jpg"),
    ("collapsible-cup.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/PET_bottle.jpg/300px-PET_bottle.jpg"),
]

dest = r"C:\EcoCycle\spootfind\public\products"
os.makedirs(dest, exist_ok=True)

for fname, url in test_urls:
    fpath = os.path.join(dest, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        resp = urllib.request.urlopen(req, timeout=15)
        with open(fpath, 'wb') as f:
            f.write(resp.read())
        print(f"OK: {fname} ({os.path.getsize(fpath)} bytes)")
    except Exception as e:
        print(f"FAIL {fname}: {e}")