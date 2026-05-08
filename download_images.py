# Download product images from Unsplash for Spootfind trending products
import urllib.request
import os
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

OUT = r"C:\EcoCycle\spootfind\public\products"
os.makedirs(OUT, exist_ok=True)

# Unsplash photo IDs - hand-picked high-quality product shots
images = {
    "dog-bag.jpg":       "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&q=80",
    "bamboo-cutlery.jpg":"https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&fit=crop&q=80",
    "beeswax-wraps.jpg": "https://images.unsplash.com/photo-1608181831718-2501a03c0631?w=600&h=400&fit=crop&q=80",
    "produce-bags.jpg":  "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop&q=80",
    "compost-bags.jpg":  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop&q=80",
    "silicone-lids.jpg": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80",
    "steel-straws.jpg":  "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&h=400&fit=crop&q=80",
    "paper-bags.jpg":    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&q=80",
    "solar-lights.jpg":  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80",
    "solar-charger.jpg": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop&q=80",
    "phone-case.jpg":    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=400&fit=crop&q=80",
    "tote-bag.jpg":      "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=600&h=400&fit=crop&q=80",
}

results = {}
for name, url in images.items():
    path = os.path.join(OUT, name)
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        })
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            with open(path, "wb") as f:
                f.write(data)
            results[name] = f"OK ({len(data)} bytes)"
    except Exception as e:
        results[name] = f"FAIL: {e}"

print(json.dumps(results, indent=2))
