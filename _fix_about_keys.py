#!/usr/bin/env python3
"""Fix missing about page translation keys in all locale files."""

import json
import os

LANG_DIR = r"C:\EcoCycle\spootfind\messages"

# Keys to add to the 'about' section (statsNumber + FAQ + story expansion)
ABOUT_MISSING_KEYS = {
    "statsNumber": {
        "products": "500+",
        "suppliers": "200+",
        "countries": "50+",
        "orders": "10,000+"
    },
    "ourStory": "Our Expanded Story",
    "storyExpanded": "Founded in 2025, Spootfind started as a small team of former import-export professionals who saw countless small businesses struggle with the complexity of global sourcing. We built the platform we wished existed—one that brings transparency, speed, and reliability to cross-border trade. Today, we help thousands of entrepreneurs worldwide access quality products at competitive prices.",
    "faq": "Frequently Asked Questions",
    "faqQ1": "How does Spootfind source products?",
    "faqA1": "We partner with verified manufacturers and trading companies primarily in China, South Korea, and Japan. Every supplier in our network is vetted for quality, production capacity, and export compliance.",
    "faqQ2": "What are the minimum order quantities?",
    "faqA2": "Minimum order quantities vary by product, typically starting at 20-50 units. We work with both small-batch buyers and bulk orders. Our platform shows exact MOQ for each product upfront.",
    "faqQ3": "How long does international shipping take?",
    "faqA3": "Shipping times depend on the destination country and shipping method. Air freight typically takes 7-14 days; sea freight takes 25-40 days. We partner with major logistics providers to offer competitive rates.",
    "faqQ4": "Is there a guarantee on product quality?",
    "faqA4": "We offer a quality verification service where our team inspects products before shipment for orders above $500. We also provide dispute resolution support if quality issues arise.",
    "contactForFaq": "Still have questions? Get in touch below.",
    "startSourcing": "Start Sourcing Now"
}

# Locale-specific about translations (to patch)
TRANSLATIONS = {
    "zh": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "ourStory": "我们的故事（详细版）",
        "storyExpanded": "Spootfind成立于2025年，创始团队由多位曾从事进出口贸易的专业人士组成。我们发现无数中小企业在全球采购中举步维艰，于是打造了这个平台——透明、快速、可靠的跨境贸易工具。如今，我们已帮助全球数千名创业者以有竞争力的价格获取优质产品。",
        "faq": "常见问题",
        "faqQ1": "Spootfind如何进行产品采购？",
        "faqA1": "我们与中国、韩国、日本的优质制造商和贸易商合作。每个供应商都经过质量、生产能力和出口合规性审查。",
        "faqQ2": "最小起订量是多少？",
        "faqQ2": "最小起订量因产品而异，通常从20-50件起。我们同时服务小批量买家和批量订单。",
        "faqQ3": "国际运输需要多长时间？",
        "faqA3": "运输时间取决于目的地和运输方式。空运通常需要7-14天，海运需要25-40天。",
        "faqQ4": "产品质量有保障吗？",
        "faqA4": "我们为500美元以上的订单提供质量验货服务，出货前由专业团队进行产品检验。",
        "contactForFaq": "还有问题？通过下方联系方式联系我们。",
        "startSourcing": "立即开始采购"
    },
    "zh-TW": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "ourStory": "我們的故事（詳細版）",
        "storyExpanded": "Spootfind成立於2025年，創始團隊由多位曾從事進出口貿易的專業人士組成。我們發現無數中小企業在全球採購中舉步維艱，於是打造了這個平台——透明、快速、可靠的跨境貿易工具。如今，我們已幫助全球數千名創業者以有競爭力的價格獲取優質產品。",
        "howItWorks": "如何運作",
        "step1Title": "發現產品",
        "step1Desc": "瀏覽來自全球熱門電商平台的趨勢產品，找到您的下一款暢銷品。",
        "step2Title": "查看採購詳情",
        "step2Desc": "獲取1688供應商資訊、成本分析、運費估算和利潤測算。",
        "step3Title": "開始採購",
        "step3Desc": "聯絡供應商並下單，我們提供全程支持直到貨物送達。",
        "faq": "常見問題",
        "faqQ1": "Spootfind如何進行產品採購？",
        "faqA1": "我們與中國、韓國、日本的優質製造商和貿易商合作。每個供應商都經過質量、生產能力和出口合規性審查。",
        "faqQ2": "最小訂購量是多少？",
        "faqA2": "最小訂購量因產品而異，通常從20-50件起。我們同時服務小批量買家和批量訂單。",
        "faqQ3": "國際運輸需要多長時間？",
        "faqA3": "運輸時間取決於目的地和運輸方式。空運通常需要7-14天，海運需要25-40天。",
        "faqQ4": "產品質量有保障嗎？",
        "faqA4": "我們為500美元以上的訂單提供質量驗貨服務，出貨前由專業團隊進行產品檢驗。",
        "contactForFaq": "還有問題？通過下方聯絡方式聯繫我們。",
        "startSourcing": "立即開始採購"
    },
    "es": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "Cómo Funciona",
        "step1Title": "Explora Productos de Tendencia",
        "step1Desc": "Navega por nuestra selección curada de productos más vendidos de Amazon, TikTok Shop, Etsy y más.",
        "step2Title": "Calcula tu Ganancia",
        "step2Desc": "Usa nuestra calculadora integrada para ver costos exactos, envío y márgenes de ganancia antes de comprar.",
        "step3Title": "Conecta y Abastece",
        "step3Desc": "Contacta proveedores verificados directamente y realiza tu pedido con confianza.",
        "faq": "Preguntas Frecuentes",
        "faqQ1": "¿Cómo obtiene Spootfind los productos?",
        "faqA1": "Nos asociamos con fabricantes verificados principalmente en China, Corea del Sur y Japón. Cada proveedor en nuestra red es auditado por calidad y capacidad de producción.",
        "faqQ2": "¿Cuáles son las cantidades mínimas de pedido?",
        "faqA2": "Las cantidades mínimas varían por producto, típicamente desde 20-50 unidades. Trabajamos tanto con compradores de pequeña escala como con pedidos al por mayor.",
        "faqQ3": "¿Cuánto tarda el envío internacional?",
        "faqA3": "El envío aéreo tarda típicamente 7-14 días; el envío marítimo tarda 25-40 días. Nos asociamos con las principales empresas de logística.",
        "faqQ4": "¿Hay garantía de calidad?",
        "faqA4": "Ofrecemos servicio de verificación de calidad para pedidos superiores a $500. También proporcionamos resolución de disputas si surgen problemas de calidad.",
        "contactForFaq": "¿Aún tienes preguntas? Contáctanos abajo.",
        "startSourcing": "Empieza a Abastecer Ahora"
    },
    "fr": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "Comment Ça Marche",
        "step1Title": "Parcourez les Produits Tendance",
        "step1Desc": "Explorez notre sélection des produits les plus vendus sur Amazon, TikTok Shop, Etsy et plus.",
        "step2Title": "Calculez votre Profit",
        "step2Desc": "Utilisez notre calculatrice intégrée pour voir les coûts exacts, l'expédition et les marges avant d'acheter.",
        "step3Title": "Connectez-vous et Approvisionnez",
        "step3Desc": "Contactez directement des fournisseurs vérifiés et passez vos commandes en toute confiance.",
        "faq": "Questions Fréquentes",
        "faqQ1": "Comment Spootfind obtient-il les produits?",
        "faqA1": "Nous travaillons avec des fabricants vérifiés principalement en Chine, en Corée du Sud et au Japon. Chaque fournisseur est audité pour la qualité et la capacité de production.",
        "faqQ2": "Quelles sont les quantités minimum de commande?",
        "faqA2": "Les quantités minimum varient selon le produit, généralement à partir de 20-50 unités. Nous travaillons avec les petits acheteurs et les commandes en gros.",
        "faqQ3": "Combien de temps prend l'expédition internationale?",
        "faqA3": "L'expédition aérienne prend généralement 7-14 jours; l'expédition maritime prend 25-40 jours. Nous travaillons avec les principaux transporteurs.",
        "faqQ4": "Y a-t-il une garantie de qualité?",
        "faqA4": "Nous offrons un service de vérification de qualité pour les commandes de plus de 500$. Nous offrons également un soutien à la résolution des litiges.",
        "contactForFaq": "Encore des questions? Contactez-nous ci-dessous.",
        "startSourcing": "Commencez à Vous Approvisionner"
    },
    "de": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "So Funktioniert Es",
        "step1Title": "Entdecke Trendprodukte",
        "step1Desc": "Durchstöbere unsere kuratierte Auswahl der meistverkauften Produkte von Amazon, TikTok Shop, Etsy und mehr.",
        "step2Title": "Berechne deinen Gewinn",
        "step2Desc": "Nutze unseren integrierten Rechner, um exakte Kosten, Versand und Gewinnmargen vor dem Kauf zu sehen.",
        "step3Title": "Verbinden & Beschaffen",
        "step3Desc": "Kontaktiere verifizierte Lieferanten direkt und gib deine Bestellung mit Vertrauen auf.",
        "faq": "Häufig Gestellte Fragen",
        "faqQ1": "Wie beschafft Spootfind Produkte?",
        "faqA1": "Wir arbeiten mit verifizierten Herstellern hauptsächlich in China, Südkorea und Japan zusammen. Jeder Lieferant in unserem Netzwerk wird auf Qualität und Produktionskapazität geprüft.",
        "faqQ2": "Was sind die Mindestbestellmengen?",
        "faqA2": "Mindestbestellmengen variieren je nach Produkt, typischerweise ab 20-50 Einheiten. Wir arbeiten sowohl mit Kleineinkäufern als auch mit Großbestellungen.",
        "faqQ3": "Wie lange dauert der internationale Versand?",
        "faqA3": "Luftfracht dauert typischerweise 7-14 Tage; Seefracht dauert 25-40 Tage. Wir arbeiten mit den wichtigsten Logistikpartnern zusammen.",
        "faqQ4": "Gibt es eine Qualitätsgarantie?",
        "faqA4": "Wir bieten einen Qualitätsprüfservice für Bestellungen über 500$. Wir bieten auch Unterstützung bei der Streitbeilegung.",
        "contactForFaq": "Noch Fragen? Kontaktiere uns unten.",
        "startSourcing": "Jetzt Mit der Beschaffung Beginnen"
    },
    "pt": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "Como Funciona",
        "step1Title": "Explore Produtos em Alta",
        "step1Desc": "Navegue pela nossa seleção curada dos produtos mais vendidos da Amazon, TikTok Shop, Etsy e mais.",
        "step2Title": "Calcule seu Lucro",
        "step2Desc": "Use nossa calculadora integrada para ver custos exatos, envio e margens de lucro antes de comprar.",
        "step3Title": "Conecte e Abasteça",
        "step3Desc": "Entre em contato com fornecedores verificados diretamente e faça seu pedido com confiança.",
        "faq": "Perguntas Frequentes",
        "faqQ1": "Como o Spootfind obtém os produtos?",
        "faqA1": "Trabalhamos com fabricantes verificados principalmente na China, Coreia do Sul e Japão. Cada fornecedor em nossa rede é auditedo por qualidade e capacidade de produção.",
        "faqQ2": "Quais são as quantidades mínimas de pedido?",
        "faqA2": "Quantidades mínimas variam por produto, tipicamente a partir de 20-50 unidades. Trabalhamos tanto com pequenos compradores quanto com pedidos em grande escala.",
        "faqQ3": "Quanto tempo leva o envio internacional?",
        "faqA3": "Envio aéreo tipicamente leva 7-14 dias; envio marítimo leva 25-40 dias. Trabalhamos com grandes empresas de logística.",
        "faqQ4": "Existe garantia de qualidade?",
        "faqA4": "Oferecemos serviço de verificação de qualidade para pedidos acima de $500. Também fornecemos suporte à resolução de disputas.",
        "contactForFaq": "Ainda tem perguntas? Entre em contato abaixo.",
        "startSourcing": "Comece a Abastecer Agora"
    },
    "ja": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "仕組み",
        "step1Title": "トレンド商品を探索",
        "step1Desc": "Amazon、TikTok Shop、Etsyなどで売れている商品をチェック。",
        "step2Title": "利益計算",
        "step2Desc": "内置の計算ツールで、成本、送料、利益率をリアルタイム確認。",
        "step3Title": "サプライヤーにつなく",
        "step3Desc": "検証済みサプライヤーと直接連絡し、信心を持って注文。",
        "faq": "よくある質問",
        "faqQ1": "Spootfindはどのように製品を取得しますか？",
        "faqA1": "主に中国、韓国、日本の検証済みメーカーをパートナーとしています。すべてのサプライヤーは品質と生産能力を監査されています。",
        "faqQ2": "最小注文数量はいくらですか？",
        "faqA2": "最小注文数量は製品によって異なりますが、通常20〜50個からです。小口与大口の両方に対応しています。",
        "faqQ3": "国際輸送には多长时间かかりますか？",
        "faqA3": "航空便は通常7〜14日、船便は25〜40日かかります。主要物流会社と連携しています。",
        "faqQ4": "品質保証はありますか？",
        "faqA4": "$500以上の注文には品質検査サービスを提供しています。品質問題が発生した場合は紛争解決支援も提供します。",
        "contactForFaq": "まだ質問がありますか？下記よりお問い合わせください。",
        "startSourcing": "今すぐ仕入れを開始"
    },
    "ko": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "작동 방식",
        "step1Title": "트렌딩 제품 탐색",
        "step1Desc": "Amazon, TikTok Shop, Etsy 등에서 가장 잘 팔리는 제품을 확인하세요.",
        "step2Title": "수익 계산",
        "step2Desc": "내장 계산기로 구매 전 원가, 배송비, 마진율을 실시간으로 확인하세요.",
        "step3Title": "공급업체 연결 및 조달",
        "step3Desc": "검증된 공급업체와 직접 연락하여 자신 있게 주문하세요.",
        "faq": "자주 묻는 질문",
        "faqQ1": "Spootfind는 어떻게 제품을 확보하나요?",
        "faqA1": "주로 중국, 한국, 일본의 검증된 제조업체와 협력합니다. 네트워크 내 모든 공급업체는 품질과 생산 역량에 대해 감사받습니다.",
        "faqQ2": "최소 주문 수량은 얼마인가요?",
        "faqA2": "최소 주문 수량은 제품에 따라 다르지만 일반적으로 20~50개부터입니다. 소량 구매자와 대량 주문 모두に対応합니다.",
        "faqQ3": "국제 배송은 얼마나 걸리나요?",
        "faqA3": "항공 화물은 일반적으로 7~14일, 해상 화물은 25~40일이 소요됩니다. 주요 물류 회사와 협력합니다.",
        "faqQ4": "품질 보증이 있나요?",
        "faqA4": "$500 이상의 주문에 대해 품질 검사 서비스를 제공합니다. 품질 문제가 발생하면 분쟁 해결 지원도 제공합니다.",
        "contactForFaq": "아직 질문이 있으신가요? 아래로 문의주세요.",
        "startSourcing": "지금 바로 조달 시작하기"
    },
    "ar": {
        "statsNumber": {"products": "500+", "suppliers": "200+", "countries": "50+", "orders": "10,000+"},
        "howItWorks": "كيف يعمل",
        "step1Title": "تصفح المنتجات الرائجة",
        "step1Desc": "استكشف مجموعتنا المختارة من أكثر المنتجات مبيعاً على Amazon و TikTok Shop و Etsy والمزيد.",
        "step2Title": "احسب أرباحك",
        "step2Desc": "استخدم حاسبةbuilt-in لرؤية التكاليف الدقيقة والشحن والهوامش قبل الشراء.",
        "step3Title": "تواصل وابدأ التوريد",
        "step3Desc": "تواصل مباشرة مع الموردين الموثقين وقدم طلبك بثقة.",
        "faq": "الأسئلة الشائعة",
        "faqQ1": "كيف يحصل Spootfind على المنتجات؟",
        "faqA1": "نتعامل مع مصنعين موثقين في الصين وكوريا الجنوبية واليابان. يتم تدقيق كل مورد في شبكتنا للجودة والقدرة الإنتاجية.",
        "faqQ2": "ما هي الحد الأدنى للطلبات؟",
        "faqA2": "تتراوح الكميات الدنيا حسب المنتج، وعادة تبدأ من 20-50 وحدة. نعمل مع المشترين الصغار وطلبات الجملة.",
        "faqQ3": "كم يستغرق الشحن الدولي؟",
        "faqA3": "يستغرق الشحن الجوي عادة 7-14 يوماً والشحن البحري 25-40 يوماً. نتعامل مع شركات اللوجستيات الكبرى.",
        "faqQ4": "هل هناك ضمان للجودة؟",
        "faqA4": "نقدم خدمة التحقق من الجودة للطلبات فوق 500$. كما نقدم الدعم في حل النزاعات عند ظهور مشاكل.",
        "contactForFaq": "لا يزال لديك أسئلة؟ تواصل معنا أدناه.",
        "startSourcing": "ابدأ التوريد الآن"
    }
}

def fix_file(filepath, extra_keys):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if 'about' not in data:
        print(f"  SKIP {os.path.basename(filepath)}: no 'about' section")
        return False
    
    added = 0
    for key, value in extra_keys.items():
        if key not in data['about']:
            data['about'][key] = value
            added += 1
    
    if added > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  +{added} keys → {os.path.basename(filepath)}")
        return True
    else:
        print(f"  ok (no new keys) ← {os.path.basename(filepath)}")
        return False

def main():
    print("Fixing missing About page translation keys...")
    locale_defaults = TRANSLATIONS.get('en', ABOUT_MISSING_KEYS)
    
    # en.json - use English defaults
    en_path = os.path.join(LANG_DIR, 'en.json')
    fix_file(en_path, ABOUT_MISSING_KEYS)
    
    # zh.json - already complete, patch any missing
    fix_file(os.path.join(LANG_DIR, 'zh.json'), TRANSLATIONS['zh'])
    
    # Other locales
    for lang in ['zh-TW', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'ar']:
        path = os.path.join(LANG_DIR, f'{lang}.json')
        if os.path.exists(path):
            fix_file(path, TRANSLATIONS.get(lang, locale_defaults))
        else:
            print(f"  MISSING {lang}.json")

if __name__ == '__main__':
    main()
