import urllib.request, ssl, os, json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
OUT = r"C:\EcoCycle\spootfind\public\products"

images = {
    # Additional products - diverse global trending items
    "led-strip.jpg":       "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80",
    "skincare-set.jpg":    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80",
    "yoga-mat.jpg":        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=400&fit=crop&q=80",
    "desk-organizer.jpg":  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop&q=80",
    "portable-fan.jpg":    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&q=80",
    "coffee-maker.jpg":    "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&h=400&fit=crop&q=80",
    "toys.jpg":            "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop&q=80",
    "camping-light.jpg":   "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop&q=80",
    "jewelry-organizer.jpg":"https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=400&fit=crop&q=80",
    "car-phone-mount.jpg": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&q=80",
    "blender-bottle.jpg":  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80",
    "led-lamp.jpg":        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop&q=80",
    "cat-toy.jpg":         "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&h=400&fit=crop&q=80",
    "water-bottle.jpg":    "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=400&fit=crop&q=80",
    "party-decor.jpg":     "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop&q=80",
    "hair-dryer.jpg":      "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600&h=400&fit=crop&q=80",
    "mini-projector.jpg": "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop&q=80",
    "eyewear.jpg":         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop&q=80",
}

results = {}
for name, url in images.items():
    path = os.path.join(OUT, name)
    if os.path.exists(path):
        results[name] = "EXISTS"
        continue
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            with open(path, "wb") as f:
                f.write(data)
            results[name] = f"OK ({len(data)} bytes)"
    except Exception as e:
        # fallback to picsum
        try:
            fallback = f"https://picsum.photos/seed/{name.replace('.jpg','')}/600/400"
            req2 = urllib.request.Request(fallback, headers={"User-Agent":"Mozilla/5.0"})
            with urllib.request.urlopen(req2, context=ctx, timeout=15) as resp2:
                data2 = resp2.read()
                with open(path, "wb") as f2:
                    f2.write(data2)
                results[name] = f"FALLBACK OK ({len(data2)} bytes)"
        except Exception as e2:
            results[name] = f"ALL FAIL: {e2}"

print(json.dumps(results, indent=2))
total = sum(1 for v in results.values() if "OK" in v or "EXISTS" in v)
print(f"\nTotal good: {total}/{len(results)}")
