#!/usr/bin/env py -3
# -*- coding: utf-8 -*-
"""
一次性把所有16个产品的 seoDescription 扩充到 350-400 词
策略：在现有描述基础上，追加市场/认证/货源/利润相关的实用段落
"""

import json, re
from pathlib import Path

data_path = Path("data/trending.json")
with open(data_path, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

def count_words(text):
    return len(re.findall(r'\b\w+\b', text))

# 每个产品的扩充后缀（精心写，确保总字数350-400）
suffixes = {
    "t1": " From a wholesale perspective, the numbers speak for themselves: unit cost under US$1.50 ex-factory, retail shelf price US$8.99, leaving 70-85% gross margin for distributors and retailers. The product's social media virality means organic discovery — customers often find you before you spend a cent on ads. Shantou's supply chain offers unmatched flexibility: split shipments, mixed-SKU containers, and drop-shipping support for e-commerce sellers. Spootfind handles factory communication, quality inspection, compliance paperwork, and logistics coordination — you focus on sales, we handle the rest. This is the rare product that combines low risk, high margin, viral appeal, and proven compliance for regulated markets. Don't let this trend pass you by.",
    
    "t2": " From a sourcing perspective, the margins are compelling: ex-factory cost under US$4.00 per set, retail price US$24.99, delivering 70-80% gross margin for distributors and retailers. The 500-piece count allows flexible packaging options: shrink-wrap for cost control, or full-color retail box for shelf presence. Shantou's toy cluster offers mixed-container shipping, quality inspection, and private-label support — Spootfind coordinates every step so you get consistent product without the headaches of managing overseas suppliers. This is an educational toy that parents actively want for their children, with a price point that works for volume retail and an educational narrative that justifies premium positioning in your catalog.",
    
    "t3": " From a wholesale perspective, the numbers work: ex-factory cost under US$7.00, retail price US$32.99, delivering strong margins for distributors and retailers. The 2.4GHz platform supports custom frequencies, private-label printing, and assorted colorways — all available at MOQ through Spootfind's direct factory relationship. The RC toy category consistently ranks among the top-performing segments in global toy retail, and this stunt car variant adds spectacle and shareability that standard RC cars lack. Whether you're building an e-commerce storefront, supplying brick-and-mortar retailers, or assembling a promotional gift catalog, this product delivers play value, profit potential, and genuine customer satisfaction.",
    
    "t4": " From a sourcing perspective, plush toys offer excellent margin profiles: ex-factory cost under US$3.00 per unit, retail price US$14.99, delivering 70-80% gross margin. The 12-inch size optimizes shipping density — approximately 200 units per cubic meter — keeping freight costs manageable for importers. Shantou's plush manufacturing cluster offers vertical integration: in-house knitting, stuffing, sewing, and QC under one roof, ensuring consistent quality and competitive pricing. Spootfind provides factory-direct pricing, full compliance documentation, and reliable shipping to your market — tap into the plush collectible trend with a product that customers genuinely love and repeatedly purchase.",
    
    "t5": " From a wholesale perspective, magnetic tiles deliver strong margins: ex-factory cost under US$5.00 per set, retail price US$29.99, with excellent shelf-life and low seasonal volatility. Parents and schools view them as educational investments rather than disposable toys, supporting premium pricing and repeat purchases. The translucent design photographs beautifully for e-commerce listings and social media content, driving organic discovery. Shantou's manufacturing cluster offers mixed-SKU containers, custom packaging, and private-label options — Spootfind handles factory communication and quality control so you get consistent product without the overhead of managing overseas suppliers directly.",
    
    "t6": " From a sourcing perspective, blind boxes are a margin powerhouse: ex-factory cost under US$1.50 per unit, retail price US$11.99, with the collectible mechanic driving repeat purchase rates that standard toys cannot match. The compact packaging optimizes shipping density and retail shelf efficiency. Shantou's anime merchandise cluster offers rapid prototyping, custom character development, and exclusive regional variants — Spootfind connects you directly with the studio for authentic products, competitive pricing, and reliable production schedules. This is a product category where fandom drives demand — tap into a passionate, global community with a product that sells itself through the power of the chase.",
    
    "t7": " From a wholesale perspective, sensory kits offer compelling margins: ex-factory cost under US$1.50 per kit, retail price US$9.99, with strong repeat-purchase potential as consumables (beads) need periodic replacement. The kit format supports add-on sales: refill bead packs, additional tool sets, and storage containers. Shantou's toy cluster offers mixed-container shipping and custom kit configurations — Spootfind handles factory communication and compliance documentation so you can focus on building your educational toy business with a product that genuinely helps children develop essential skills.",
    
    "t8": " From a sourcing perspective, slime kits are a proven winner: ex-factory cost under US$2.00 per kit, retail price US$13.99, with strong social media virality and repeat purchase potential as kids experiment with different colors and add-ins. The LED/glow powder component differentiates this kit from commodity slime offerings, supporting premium pricing. Shantou's toy manufacturing cluster offers mixed-SKU containers, custom color palettes, and private-label packaging — Spootfind provides factory-direct sourcing with full compliance support, helping you capitalize on the slime trend with a product that truly stands out in a crowded market.",
    
    "t9": " From a sourcing perspective, the margins are substantial: ex-factory cost under US$3,200, retail price US$3,899, with strong demand in markets where compact equipment is preferred for residential and urban construction. The 1.8-ton class is the entry point for small contractors and equipment rental fleets — a large, addressable market with recurring replacement demand. Jining's construction equipment cluster provides unmatched aftermarket support: technical documentation, spare parts lists, and worldwide shipping from stock. Spootfind provides factory-direct pricing, full certification support, and after-sales service coordination — you focus on sales, we handle the sourcing complexity.",
    
    "t10": " From a wholesale perspective, compaction equipment delivers strong returns: ex-factory cost under US$3,600, retail price US$4,299, with applications across construction, landscaping, and municipal public works. The 3-ton class is highly maneuverable and transportable without oversized-load permits, making it ideal for small contractors and rental fleets. Jining's machinery cluster offers excellent component commonality and worldwide spare parts availability. Spootfind sources directly from the manufacturer, providing full technical documentation, certification support, and after-sales service — you get a proven product with genuine market demand and excellent margin potential.",
    
    "t11": " From a sourcing perspective, concrete mixers offer excellent value: ex-factory cost under US$1,600, retail price US$1,899, with applications across residential construction, DIY projects, and equipment rental. The diesel engine provides reliable power without electrical dependencies, making it ideal for remote job sites. Jining's construction equipment cluster provides excellent spare parts availability and technical support. Spootfind connects you directly with the manufacturer, ensuring competitive pricing, full certification documentation, and reliable after-sales support for your equipment business — this is a workhorse product with genuine utility and a large addressable market.",
    
    "t12": " From a wholesale perspective, truck-mounted cranes open a specialized niche: ex-factory cost under US$7,400, retail price US$8,999, serving building material suppliers, equipment rental companies, and contractors who need lifting capability without a dedicated crane truck. The 5-ton capacity class is the proven sweet spot for delivery-truck integration. Jining's heavy equipment cluster provides rigorous factory testing and certified structural steel. Spootfind provides factory-direct pricing, full certification documentation, and after-sales support — you focus on building your lifting equipment business with a product that delivers genuine capability and strong margin potential.",
    
    "t13": " From a sourcing perspective, skid steer loaders are versatile profit centers: ex-factory cost under US$2,800, retail price US$3,299, with dozens of attachments available that transform one machine into an entire fleet. The universal quick-attach plate means your customers can use existing implements, reducing total cost of ownership. Jining's construction equipment cluster provides excellent spare parts availability and worldwide shipping. Spootfind connects you directly with the manufacturer, providing full technical documentation, certification support, and after-sales service — you get a proven multi-purpose machine with genuine market demand and excellent margin potential across multiple customer segments.",
    
    "t14": " From a wholesale perspective, diecast models deliver strong margins: ex-factory cost under US$3.50 per unit, retail price US$19.99 for a 6-pack, with collectibility driving repeat purchases and display-oriented retail presence. The 1:50 scale is the industry standard for construction diecast, ensuring compatibility with existing display cases and collector shelves. Shantou's diecast manufacturing cluster offers precision CNC machining, authentic livery printing, and custom corporate gift configurations. Spootfind provides factory-direct sourcing with full certification and reliable delivery — this is a product that builds brand loyalty and repeat customers in the passionate construction equipment community.",
    
    "t15": " From a sourcing perspective, power trowels are essential construction tools: ex-factory cost under US$480, retail price US$599, with applications across residential and light commercial concrete work. The 36-inch size is the industry standard for professional contractors. Jining's construction equipment cluster provides rigorous factory testing, replaceable blades, and worldwide spare parts availability. Spootfind sources directly from the manufacturer, providing full technical documentation, certification support, and after-sales service — you get a proven, essential tool with genuine utility and a large addressable market of professional contractors and equipment rental companies.",
    
    "t16": " From a wholesale perspective, mini dumpers solve a real problem: ex-factory cost under US$1,000, retail price US$1,299, serving landscapers, contractors, and property owners who need to move material across rough terrain where wheelbarrows and pickup trucks cannot go. The 500kg capacity class is the proven sweet spot for small-scale operators. Jining's construction equipment cluster provides robust steel frames, sealed bearings, and simple mechanical designs that keep maintenance costs low. Spootfind connects you directly with the manufacturer, ensuring competitive pricing, full certification documentation, and reliable after-sales support for your material-handling equipment business."
}

def main():
    updated = 0
    for prod in data['products']:
        tid = prod['id']
        if tid in suffixes:
            old_desc = prod.get('seoDescription', '')
            old_words = count_words(old_desc)
            
            # 拼接新描述
            new_desc = (old_desc.rstrip('.') + '.' + suffixes[tid]).strip()
            new_words = count_words(new_desc)
            
            # 确保字数在350-400之间
            if new_words < 350:
                print(f"⚠️  {tid}: {new_words} words (still short)")
            elif new_words > 420:
                # 截断到400词
                words = new_desc.split()
                new_desc = ' '.join(words[:400])
                new_words = count_words(new_desc)
                print(f"✅ {tid} {prod['name'][:25]}: {old_words} → {new_words} words (trimmed)")
            else:
                print(f"✅ {tid} {prod['name'][:25]}: {old_words} → {new_words} words")
            
            prod['seoDescription'] = new_desc
            updated += 1
        else:
            print(f"⚠️  {tid}: no suffix found")
    
    if updated > 0:
        with open(data_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"\n✅ Updated {updated} products, saved to {data_path}")
    else:
        print("\nℹ️  No products updated")

if __name__ == "__main__":
    main()
