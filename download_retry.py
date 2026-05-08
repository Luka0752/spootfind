import urllib.request, ssl, os, json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
OUT = r"C:\EcoCycle\spootfind\public\products"

retries = {
    "beeswax-wraps.jpg":  "https://images.unsplash.com/photo-1608181831832-6c5e5c3c6efb?w=600&h=400&fit=crop&q=80",
    "paper-bags.jpg":     "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9a2?w=600&h=400&fit=crop&q=80",
    "solar-lights.jpg":   "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=400&fit=crop&q=80",
}
for name, url in retries.items():
    path = os.path.join(OUT, name)
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            with open(path, "wb") as f:
                f.write(data)
            print(f"{name}: OK ({len(data)} bytes)")
    except Exception as e:
        # fallback: use picsum with seed
        try:
            fallback = f"https://picsum.photos/seed/{name.replace('.jpg','')}/600/400"
            req2 = urllib.request.Request(fallback, headers={"User-Agent":"Mozilla/5.0"})
            with urllib.request.urlopen(req2, context=ctx, timeout=15) as resp2:
                data2 = resp2.read()
                with open(path, "wb") as f2:
                    f2.write(data2)
                print(f"{name}: FALLBACK OK ({len(data2)} bytes)")
        except Exception as e2:
            print(f"{name}: ALL FAIL - {e2}")
