import json, sys

path = r"C:\EcoCycle\spootfind\messages\en.json"
with open(path, "r", encoding="utf-8") as f:
    d = json.load(f)

about = d.get("about", {})
print("Existing about keys:", list(about.keys()))

needed = [
    "howItWorks", "step1Title", "step1Desc", "step2Title", "step2Desc",
    "step3Title", "step3Desc", "statsNumber.products", "statsNumber.suppliers",
    "statsNumber.countries", "statsNumber.orders", "stats.products",
    "stats.suppliers", "stats.countries", "stats.orders",
    "ourStory", "storyExpanded", "faq", "faqQ1", "faqA1", "faqQ2", "faqA2",
    "faqQ3", "faqA3", "faqQ4", "faqA4", "contactForFaq", "startSourcing"
]

missing = [k for k in needed if k not in about]
print("Missing keys:", missing)
