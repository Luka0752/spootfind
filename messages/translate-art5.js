// translate-art5.js - Translate art5_* keys to 9 languages
const fs = require('fs');

// All source text
const src = {
  art5_tag: "Prime Day 2026 Guide",
  art5_title: "Prime Day 2026: Mid-Year Sourcing Guide for Global Sellers",
  art5_subtitle: "June 23-26 Prime Day + TikTok mid-year sale June 18-July 3 — what to stock now",
  art5_metaDesc: "Prime Day 2026 sourcing guide: Smart Jump Rope, Vibration Plates, Electric Spin Scrubbers trending. China factory-direct pricing for global B2B buyers.",
  art5_hotTitle: "🔥 What's Going Viral for Prime Day 2026",
  art5_hotContent: `Amazon Prime Day 2026 is confirmed for June 23-26, covering 26 countries. This is the single largest mid-year sales event globally — and the sourcing window is closing fast.

TikTok Shop's mid-year sale (June 18 — July 3, 2026) overlaps perfectly, creating a dual-platform spike. TikTok Shop also launches in 4 European countries on June 15, adding fresh demand.

**Smart Jump Rope (t17)**
UK TikTok: 7-day sales $100K USD, ~4100 units. US market following same curve. 1688 cost: $3.50-$8.00. Retail: $15.99-$29.99. Margin: 70-80%.

**Whole Body Vibration Plate (t18)**
TikTok US: cumulative $7M USD. Single-day peak ~2000 units. 1688 cost: $80-$200. Retail: $299-$599. Heavy item — sea freight only. Margin: 60-75%.

**Electric Spin Scrubber**
TikTok Shop US Weekly GMV: $1.8M-$2.4M. Stable top-10 category. 1688 cost: $2.50-$6.00. Retail: $24.99-$39.99. Margin: 75-85%.

**Fidget Toys (t1) & Squishmallows (t4)**
TikTok legacy winners. Still top-5 in toys category. Low cost, high impulse buy. MOQ flexibility: 50-500 units.`,
  art5_profitTitle: "💰 The Margin Reality",
  art5_profitContent: `Smart Jump Rope: 1688 cost $3.50-$8.00 → US retail $15.99-$29.99. Air shipping friendly (light). Margin: 70-80%.

Whole Body Vibration Plate: 1688 cost $80-$200 → US retail $299-$599. HEAVY (20-30kg). Sea freight only. Landed cost (sea + duties) on a $200 unit ≈ $260-$290. Still 50%+ margin at $499 retail.

Electric Spin Scrubber: 1688 cost $2.50-$6.00 → US retail $24.99-$39.99. Margin: 75-85%. Battery-powered models need UN38.3 certification for air shipping.

Fidget Toys: 1688 cost $0.50-$3.00/unit → Retail $8.99-$19.99. Margin: 80-90%. Small, fast turn.

**Shipping Reality Check**
Express (7-12 days): use for jump ropes, scrubbers, toys. Sea freight (25-35 days): use for vibration plates, heavy equipment. Prime Day is June 23 — you need to ship NOW (by June 5) for express arrival before the event.`,
  art5_regionTitle: "🏠 Where These Products Come From",
  art5_regionContent: `Smart Jump Rope: China — multiple manufacturing hubs with established electronics supply chains. Zhejiang and Guangdong clusters dominate. CE (EU) and FCC (US) certifications standard.

Whole Body Vibration Plate: China — established fitness equipment manufacturing regions with deep metalworking and motor supply chains. Northern China hubs. CE (EU) certification required for fitness equipment.

Electric Spin Scrubber: China — multiple manufacturing hubs with deep expertise in plastic injection molding and electronics. Coastal production clusters offer integrated supply chains. IPX7 waterproof rating is the key spec buyers care about.

Fidget Toys: China — multiple manufacturing hubs with mature plastic injection and assembly supply chains. No certification required for basic models.`,
  art5_tipsTitle: "📼 How Spootfind Helps You Source",
  art5_tipsContent: `You focus on selling. We handle the sourcing complexity:

✅ Factory verification before you pay — we check business licenses, production capacity, export history
✅ Price negotiation — factories give us better rates than Alibaba's listed prices
✅ Sample management — we coordinate samples, QC photos, pre-shipment inspection
✅ Shipping coordination — express for light items, sea freight for heavy items, full documentation
✅ No upfront fees — you only pay after factory verification and sample approval

**The Spootfind Advantage**
We're not Alibaba. We're your sourcing partner on the ground in China. One contact, full supply chain access, no platform fees.`,
  art5_contactTitle: "Ready for Prime Day 2026?",
  art5_contactContent: "Prime Day is June 23-26. The sourcing window is closing. Contact us now for factory-direct pricing on Smart Jump Ropes, Vibration Plates, Electric Spin Scrubbers, and trending toys.",
  art5_contactBtn: "Get Factory Pricing",
  art5_contactLink: "/contact",
  art5_faq: JSON.stringify([
    { question: "When should I order for Prime Day 2026?", answer: "Now. Express shipping takes 7-12 days. Sea freight takes 25-35 days. Prime Day is June 23 — order by June 5 for express, or you'll miss it." },
    { question: "What certifications do I need?", answer: "Smart Jump Rope: CE/FCC. Vibration Plate: CE (EU) required. Electric Spin Scrubber: CE/FCC, UN38.3 for air shipping (battery). Fidget toys: none required." },
    { question: "What's the minimum order?", answer: "Smart Jump Rope: 100-500 units. Vibration Plate: 50-200 units. Electric Spin Scrubber: 200-1000 units. Fidget toys: 50-500 units. Trial orders available at higher unit cost." }
  ])
};

// Translations for all 9 languages
const translations = {
  // ─── 简体中文 ───
  zh: {
    art5_tag: "Prime Day 2026 指南",
    art5_title: "2026 Prime Day：全球卖家年中采购指南",
    art5_subtitle: "6月23-26日 Prime Day + TikTok 年中促销 6月18日至7月3日 — 现在备货正当时",
    art5_metaDesc: "2026 Prime Day采购指南：Smart Jump Rope、振动板、电动旋转刷热销中。中国工厂直采价为全球B2B买家提供有竞争力的定价。",
    art5_hotTitle: "🔥 Prime Day 2026 爆款有哪些",
    art5_hotContent: `亚马逊 Prime Day 2026 已确认，时间为6月23-26日，覆盖26个国家。这是全球最大的年中促销活动——而采购窗口正在关闭。

TikTok Shop 年中大促（2026年6月18日至7月3日）与 Prime Day 完全重叠，形成双平台爆发。TikTok Shop 也将于6月15日新增4个欧洲国家站点，带来新的需求增长。

**Smart Jump Rope (t17)**
英国 TikTok：7天销售额 100,000 美元，约 4100 件。美国市场正在复制同样曲线。1688成本：$3.50-$8.00。零售价：$15.99-$29.99。利润率：70-80%。

**Whole Body Vibration Plate (t18)**
TikTok 美国：累计销售额 $7,000,000 美元。单日峰值约 2000 件。1688成本：$80-$200。零售价：$299-$599。重型产品——仅海运。利润率：60-75%。

**Electric Spin Scrubber**
TikTok Shop 美国周 GMV：$1.8M-$2.4M。稳定品类前十。1688成本：$2.50-$6.00。零售价：$24.99-$39.99。利润率：75-85%。

**Fidget Toys (t1) 和 Squishmallows (t4)**
TikTok 常青爆款。仍居玩具类目前5名。成本低，冲动消费率高。最小起订量灵活：50-500件。`,
    art5_profitTitle: "💰 利润真相",
    art5_profitContent: `Smart Jump Rope：1688成本 $3.50-$8.00 → 美国零售 $15.99-$29.99。可空运（重量轻）。利润率：70-80%。

Whole Body Vibration Plate：1688成本 $80-$200 → 美国零售 $299-$599。重型产品（20-30kg）。仅海运。含运费及关税的到岸成本（以 $200 成本计）≈ $260-$290。在 $499 零售价下仍有 50% 以上利润。

Electric Spin Scrubber：1688成本 $2.50-$6.00 → 美国零售 $24.99-$39.99。利润率：75-85%。电池款需要 UN38.3 认证方可空运。

Fidget Toys：1688成本 $0.50-$3.00/件 → 零售 $8.99-$19.99。利润率：80-90%。体积小，周转快。

**物流注意事项**
快递（7-12天）：适用于跳绳、刷子、玩具。重货（25-35天）：适用于振动板、大型设备。Prime Day 是6月23日——如需快递在活动前到货，现在就要发货（6月5日前）。`,
    art5_regionTitle: "🏠 这些产品来自哪里",
    art5_regionContent: `Smart Jump Rope：中国——多个制造业中心，拥有成熟的电子供应链。浙江和广东产业集群占主导地位。CE（欧盟）和 FCC（美国）认证为标准配置。

Whole Body Vibration Plate：中国——成熟的健身设备制造区域，拥有深厚的金属加工和电机供应链。中国北部产业集群。需要 CE（欧盟）健身设备认证。

Electric Spin Scrubber：中国——多个制造业中心，在塑料注塑和电子产品方面拥有深厚专业能力。沿海产业集群提供一体化供应链。IPX7 防水等级是买家关注的核心指标。

Fidget Toys：中国——多个制造业中心，拥有成熟的塑料注塑和组装供应链。基础款无需认证。`,
    art5_tipsTitle: "📼 Spootfind 如何帮您采购",
    art5_tipsContent: `您专注销售，我们处理采购的复杂性：

✅ 付款前工厂验证——我们核查营业执照、生产能力、出口历史
✅ 价格谈判——工厂给我们的价格比阿里巴巴标价更优
✅ 样品管理——我们协调样品、质检照片、出货前检验
✅ 物流协调——轻货快递，重货海运，全程文件支持
✅ 无预付费用——工厂验证和样品确认后才付款

**Spootfind 的优势**
我们不是阿里巴巴。我们是驻中国的采购合作伙伴。一个联系人，全面供应链接入，无平台费。`,
    art5_contactTitle: "准备好迎接 Prime Day 2026 了吗？",
    art5_contactContent: "Prime Day 是6月23-26日。采购窗口正在关闭。立即联系我们，获取 Smart Jump Rope、振动板、电动旋转刷及热门玩具的工厂直采报价。",
    art5_contactBtn: "获取工厂报价",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Prime Day 2026 应该什么时候下单？", answer: "现在。快递需要7-12天。海运需要25-35天。Prime Day 是6月23日——快递下单请在6月5日前，否则将错过活动。" },
      { question: "我需要哪些认证？", answer: "Smart Jump Rope：CE/FCC。振动板：需要 CE（欧盟）。电动旋转刷：CE/FCC，空运需 UN38.3（电池款）。玩具：无要求。" },
      { question: "最小起订量是多少？", answer: "Smart Jump Rope：100-500件。振动板：50-200件。电动旋转刷：200-1000件。玩具：50-500件。试单可按更高单价执行。" }
    ])
  },

  // ─── 繁体中文 ───
  "zh-TW": {
    art5_tag: "Prime Day 2026 指南",
    art5_title: "2026 Prime Day：全球賣家年中採購指南",
    art5_subtitle: "6月23-26日 Prime Day + TikTok 年中促銷 6月18日至7月3日 — 現在備貨正當時",
    art5_metaDesc: "2026 Prime Day採購指南：Smart Jump Rope、震動板、電動旋轉刷熱銷中。中國工廠直採價為全球B2B買家提供有競爭力的定價。",
    art5_hotTitle: "🔥 Prime Day 2026 爆款有哪些",
    art5_hotContent: `亞馬遜 Prime Day 2026 已確認，時間為6月23-26日，覆蓋26個國家。這是全球最大的年中促銷活動——而採購窗口正在關閉。

TikTok Shop 年中大促（2026年6月18日至7月3日）與 Prime Day 完全重疊，形成雙平台爆發。TikTok Shop 也將於6月15日新增4個歐洲國家站點，帶來新的需求增長。

**Smart Jump Rope (t17)**
英國 TikTok：7天銷售額 $100,000 美元，約 4100 件。美國市場正在複製同樣曲線。1688成本：$3.50-$8.00。零售價：$15.99-$29.99。利潤率：70-80%。

**Whole Body Vibration Plate (t18)**
TikTok 美國：累計銷售額 $7,000,000 美元。單日峰值約 2000 件。1688成本：$80-$200。零售價：$299-$599。重貨產品——僅海運。利潤率：60-75%。

**Electric Spin Scrubber**
TikTok Shop 美國週 GMV：$1.8M-$2.4M。穩定品類前十。1688成本：$2.50-$6.00。零售價：$24.99-$39.99。利潤率：75-85%。

**Fidget Toys (t1) 和 Squishmallows (t4)**
TikTok 常青爆款。仍居玩具類目前5名。成本低，衝動消費率高。最少訂購量靈活：50-500件。`,
    art5_profitTitle: "💰 利潤真相",
    art5_profitContent: `Smart Jump Rope：1688成本 $3.50-$8.00 → 美國零售 $15.99-$29.99。可空運（重量輕）。利潤率：70-80%。

Whole Body Vibration Plate：1688成本 $80-$200 → 美國零售 $299-$599。重貨（20-30kg）。僅海運。含運費及關稅的到岸成本（以 $200 成本計）≈ $260-$290。在 $499 零售價下仍有 50% 以上利潤。

Electric Spin Scrubber：1688成本 $2.50-$6.00 → 美國零售 $24.99-$39.99。利潤率：75-85%。電池款需要 UN38.3 認證方可空運。

Fidget Toys：1688成本 $0.50-$3.00/件 → 零售 $8.99-$19.99。利潤率：80-90%。體積小，週轉快。

**物流注意事項**
快遞（7-12天）：適用於跳繩、刷子、玩具。重貨（25-35天）：適用於震動板、大型設備。Prime Day 是6月23日——如需快遞在活動前到貨，現在就要發貨（6月5日前）。`,
    art5_regionTitle: "🏠 這些產品來自哪裡",
    art5_regionContent: `Smart Jump Rope：中國——多個製造業中心，擁有成熟的電子供應鏈。浙江和廣東產業集群佔主導地位。CE（歐盟）和 FCC（美國）認證為標準配置。

Whole Body Vibration Plate：中國——成熟的健身設備製造區域，擁有深厚的金屬加工和馬達供應鏈。中國北部產業集群。需要 CE（歐盟）健身設備認證。

Electric Spin Scrubber：中國——多個製造業中心，在塑料射出成型和電子產品方面擁有深厚專業能力。沿海產業集群提供一體化供應鏈。IPX7 防水等級是買家關注的核心指標。

Fidget Toys：中國——多個製造業中心，擁有成熟的塑料射出成型和組裝供應鏈。基礎款無需認證。`,
    art5_tipsTitle: "📼 Spootfind 如何幫您採購",
    art5_tipsContent: `您專注銷售，我們處理採購的複雜性：

✅ 付款前工廠驗證——我們核查營業執照生產能力、出口歷史
✅ 價格談判——工廠給我們的價格比阿里巴巴標價更優
✅ 樣品管理——我們協調樣品、質檢照片、出貨前檢驗
✅ 物流協調——輕貨快遞，重貨海運，全程文件支援
✅ 無預付費用——工廠驗證和樣品確認後才付款

**Spootfind 的優勢**
我們不是阿里巴巴。我們是駐中國的採購合作夥伴。一個聯繫人，全面供應鏈接入，無平台費。`,
    art5_contactTitle: "準備好迎接 Prime Day 2026 了嗎？",
    art5_contactContent: "Prime Day 是6月23-26日。採購窗口正在關閉。立即聯繫我們，獲取 Smart Jump Rope、震動板、電動旋轉刷及熱門玩具的工廠直採報價。",
    art5_contactBtn: "獲取工廠報價",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Prime Day 2026 應該什麼時候下單？", answer: "現在。快遞需要7-12天。海運需要25-35天。Prime Day 是6月23日——快遞下單請在6月5日前，否則將錯過活動。" },
      { question: "我需要哪些認證？", answer: "Smart Jump Rope：CE/FCC。震動板：需要 CE（歐盟）。電動旋轉刷：CE/FCC，空運需 UN38.3（電池款）。玩具：無要求。" },
      { question: "最少訂購量是多少？", answer: "Smart Jump Rope：100-500件。震動板：50-200件。電動旋轉刷：200-1000件。玩具：50-500件。試單可按更高單價執行。" }
    ])
  },

  // ─── 西班牙语 ───
  es: {
    art5_tag: "Guía Prime Day 2026",
    art5_title: "Prime Day 2026: Guía de Abastecimiento de Mediados de Año para Vendedores Globales",
    art5_subtitle: "Prime Day 23-26 de junio + Venta de mitad de año de TikTok 18 de junio - 3 de julio — qué almacenar ahora",
    art5_metaDesc: "Guía de abastecimiento Prime Day 2026: Smart Jump Rope, Vibration Plates y Electric Spin Scrubbers en tendencia. Precios directos de fábrica en China para compradores B2B globales.",
    art5_hotTitle: "🔥 Qué está Viralizando para Prime Day 2026",
    art5_hotContent: `Amazon Prime Day 2026 confirmado para el 23-26 de junio, cubriendo 26 países. Este es el evento de ventas de mitad de año más grande del mundo — y la ventana de abastecimiento se cierra pronto.

La venta de mitad de año de TikTok Shop (18 de junio — 3 de julio de 2026) se superpone perfectamente, creando un pico en doble plataforma. TikTok Shop también lanza en 4 países europeos el 15 de junio, añadiendo nueva demanda.

**Smart Jump Rope (t17)**
TikTok UK: ventas en 7 días $100K USD, ~4100 unidades. El mercado estadounidense sigue la misma curva. Costo en 1688: $3.50-$8.00. Venta minorista: $15.99-$29.99. Margen: 70-80%.

**Whole Body Vibration Plate (t18)**
TikTok US: acumulado $7M USD. Pico de un solo día ~2000 unidades. Costo en 1688: $80-$200. Venta minorista: $299-$599. Producto pesado — solo flete marítimo. Margen: 60-75%.

**Electric Spin Scrubber**
GMV semanal TikTok Shop US: $1.8M-$2.4M. Categoría estable en el top 10. Costo en 1688: $2.50-$6.00. Venta minorista: $24.99-$39.99. Margen: 75-85%.

**Fidget Toys (t1) y Squishmallows (t4)**
Ganadores clásicos de TikTok. Aún en el top 5 de la categoría de juguetes. Bajo costo, alta compra impulsiva. MOQ flexible: 50-500 unidades.`,
    art5_profitTitle: "💰 La Realidad del Margen",
    art5_profitContent: `Smart Jump Rope: costo 1688 $3.50-$8.00 → venta minorista EE.UU. $15.99-$29.99. Apto para envío aéreo (ligero). Margen: 70-80%.

Whole Body Vibration Plate: costo 1688 $80-$200 → venta minorista EE.UU. $299-$599. PESADO (20-30kg). Solo flete marítimo. Costo aterrizado (mar + aranceles) en una unidad de $200 ≈ $260-$290. Aún 50%+ de margen a $499 de venta minorista.

Electric Spin Scrubber: costo 1688 $2.50-$6.00 → venta minorista EE.UU. $24.99-$39.99. Margen: 75-85%. Modelos con batería necesitan certificación UN38.3 para envío aéreo.

Fidget Toys: costo 1688 $0.50-$3.00/unidad → Venta minorista $8.99-$19.99. Margen: 80-90%. Pequeños, rotación rápida.

**Control de Realidad de Envío**
Expreso (7-12 días): para jump ropes, scrubbers, juguetes. Flete marítimo (25-35 días): para vibration plates, equipos pesados. Prime Day es el 23 de junio — necesita enviar AHORA (antes del 5 de junio) para llegar a tiempo.`,
    art5_regionTitle: "🏠 De Dónde Vienen Estos Productos",
    art5_regionContent: `Smart Jump Rope: China — múltiples centros de manufactura con cadenas de suministro de electrónica establecidas. Los clústeres de Zhejiang y Guangdong dominan. Certificaciones CE (UE) y FCC (EE.UU.) estándar.

Whole Body Vibration Plate: China — regiones establecidas de fabricación de equipos de fitness con profundas cadenas de suministro de metalurgia y motores. Centros del norte de China. Certificación CE (UE) requerida para equipos de fitness.

Electric Spin Scrubber: China — múltiples centros de manufactura con profunda experiencia en moldeo por inyección de plástico y electrónica. Clústeres costeros ofrecen cadenas de suministro integradas. La clasificación de resistencia al agua IPX7 es la especificación clave que valoran los compradores.

Fidget Toys: China — múltiples centros de manufactura con cadenas maduras de inyección de plástico y ensamblaje. No se requiere certificación para modelos básicos.`,
    art5_tipsTitle: "📼 Cómo Spootfind le Ayuda a Abastecerse",
    art5_tipsContent: `Usted se enfoca en vender. Nosotros manejamos la complejidad del abastecimiento:

✅ Verificación de fábrica antes de pagar — verificamos licencias comerciales, capacidad de producción, historial de exportación
✅ Negociación de precios — las fábricas nos dan mejores tarifas que los precios listados en Alibaba
✅ Gestión de muestras — coordinamos muestras, fotos de control de calidad, inspección previa al envío
✅ Coordinación de envío — expreso para artículos ligeros, flete marítimo para pesados, documentación completa
✅ Sin tarifas anticipadas — usted paga solo después de la verificación de fábrica y aprobación de muestras

**La Ventaja Spootfind**
No somos Alibaba. Somos su socio de abastecimiento en China. Un contacto, acceso completo a la cadena de suministro, sin tarifas de plataforma.`,
    art5_contactTitle: "¿Listo para Prime Day 2026?",
    art5_contactContent: "Prime Day es del 23 al 26 de junio. La ventana de abastecimiento se cierra. Contáctenos ahora para precios directos de fábrica en Smart Jump Ropes, Vibration Plates, Electric Spin Scrubbers y juguetes trending.",
    art5_contactBtn: "Obtener Precios de Fábrica",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "¿Cuándo debo hacer el pedido para Prime Day 2026?", answer: "Ahora. El envío expreso tarda 7-12 días. El flete marítimo tarda 25-35 días. Prime Day es el 23 de junio — haga su pedido antes del 5 de junio para envío expreso, o lo perderá." },
      { question: "¿Qué certificaciones necesito?", answer: "Smart Jump Rope: CE/FCC. Vibration Plate: CE (UE) requerido. Electric Spin Scrubber: CE/FCC, UN38.3 para envío aéreo (batería). Fidget toys: ninguna requerida." },
      { question: "¿Cuál es el pedido mínimo?", answer: "Smart Jump Rope: 100-500 unidades. Vibration Plate: 50-200 unidades. Electric Spin Scrubber: 200-1000 unidades. Fidget toys: 50-500 unidades. Pedidos de prueba disponibles a costo unitario más alto." }
    ])
  },

  // ─── 法语 ───
  fr: {
    art5_tag: "Guide Prime Day 2026",
    art5_title: "Prime Day 2026 : Guide d'Approvisionnement Mi-Année pour les Vendeurs Mondiaux",
    art5_subtitle: "Prime Day 23-26 juin + Vente milieu d'année TikTok 18 juin - 3 juillet — quoi stocker maintenant",
    art5_metaDesc: "Guide d'approvisionnement Prime Day 2026 : Smart Jump Rope, Vibration Plates, Electric Spin Scrubbers en vogue. Prix directs d'usine en Chine pour acheteurs B2B mondiaux.",
    art5_hotTitle: "🔥 Ce qui Virealle pour Prime Day 2026",
    art5_hotContent: `Amazon Prime Day 2026 confirmé du 23 au 26 juin, couvrant 26 pays. C'est le plus grand événement de vente mi-annuel au monde — et la fenêtre d'approvisionnement se referme rapidement.

La vente mi-annuelle de TikTok Shop (18 juin — 3 juillet 2026) se superpose parfaitement, créant un pic sur deux plateformes. TikTok Shop lance également dans 4 pays européens le 15 juin, ajoutant une nouvelle demande.

**Smart Jump Rope (t17)**
TikTok UK : ventes sur 7 jours $100K USD, ~4100 unités. Le marché américain suit la même courbe. Coût 1688 : $3.50-$8.00. Prix de détail : $15.99-$29.99. Marge : 70-80%.

**Whole Body Vibration Plate (t18)**
TikTok US : cumulé $7M USD. Pic journalier ~2000 unités. Coût 1688 : $80-$200. Prix de détail : $299-$599. Article lourd — fret maritime uniquement. Marge : 60-75%.

**Electric Spin Scrubber**
GMV hebdomadaire TikTok Shop US : $1.8M-$2.4M. Catégorie stable top 10. Coût 1688 : $2.50-$6.00. Prix de détail : $24.99-$39.99. Marge : 75-85%.

**Fidget Toys (t1) et Squishmallows (t4)**
Gagnants historiques TikTok. Toujours dans le top 5 des jouets. Faible coût, fort achat impulsif. MOQ flexible : 50-500 unités.`,
    art5_profitTitle: "💰 La Réalité des Marges",
    art5_profitContent: `Smart Jump Rope : coût 1688 $3.50-$8.00 → détail US $15.99-$29.99. Adapté à l'expédition aérienne (léger). Marge : 70-80%.

Whole Body Vibration Plate : coût 1688 $80-$200 → détail US $299-$599. LOURD (20-30kg). Fret maritime uniquement. Coût débarqué (mer + droits) sur une unité à $200 ≈ $260-$290. Encore 50%+ de marge à $499 de détail.

Electric Spin Scrubber : coût 1688 $2.50-$6.00 → détail US $24.99-$39.99. Marge : 75-85%. Modèles à batterie besoin certification UN38.3 pour expédition aérienne.

Fidget Toys : coût 1688 $0.50-$3.00/unité → Détail $8.99-$19.99. Marge : 80-90%. Petits, rotation rapide.

**Vérification Réalité Expédition**
Express (7-12 jours) : pour jump ropes, scrubbers, jouets. Fret maritime (25-35 jours) : pour vibration plates, équipements lourds. Prime Day est le 23 juin — vous devez expédier MAINTENANT (avant le 5 juin) pour arriver à temps.`,
    art5_regionTitle: "🏠 D'Où Viennent Ces Produits",
    art5_regionContent: `Smart Jump Rope : Chine — plusieurs centres de fabrication avec des chaînes d'approvisionnement électroniques établies. Les grappes du Zhejiang et du Guangdong dominent. Certifications CE (UE) et FCC (US) standard.

Whole Body Vibration Plate : Chine — régions établies de fabrication d'équipements de fitness avec des chaînes profondes de travail des métaux et de moteurs. Centres de Chine du Nord. Certification CE (UE) requise pour équipements de fitness.

Electric Spin Scrubber : Chine — plusieurs centres de fabrication avec une expertise approfondie en moulage par injection de plastique et électronique. Les grappes côtières offrent des chaînes d'approvisionnement intégrées. La résistance à l'eau IPX7 est la spécification clé pour les acheteurs.

Fidget Toys : Chine — plusieurs centres de fabrication avec des chaînes matures d'injection de plastique et d'assemblage. Aucune certification requise pour les modèles de base.`,
    art5_tipsTitle: "📼 Comment Spootfind Vous Aide à Vous Approvisionner",
    art5_tipsContent: `Vous vous concentrez sur la vente. Nous gérons la complexité de l'approvisionnement :

✅ Vérification d'usine avant paiement — nous vérifions les licences commerciales, la capacité de production, l'historique d'exportation
✅ Négociation de prix — les usines nous offrent de meilleurs tarifs que les prix affichés sur Alibaba
✅ Gestion des échantillons — nous coordonnons les échantillons, les photos de contrôle qualité, l'inspection avant expédition
✅ Coordination d'expédition — express pour articles légers, fret maritime pour articles lourds, documentation complète
✅ Pas de frais initiaux — vous payez uniquement après vérification d'usine et approbation d'échantillon

**L'Avantage Spootfind**
Nous ne sommes pas Alibaba. Nous sommes votre partenaire d'approvisionnement sur le terrain en Chine. Un contact, accès complet à la chaîne d'approvisionnement, sans frais de plateforme.`,
    art5_contactTitle: "Prêt pour Prime Day 2026 ?",
    art5_contactContent: "Prime Day est du 23 au 26 juin. La fenêtre d'approvisionnement se referme. Contactez-nous maintenant pour des prix directs d'usine sur Smart Jump Ropes, Vibration Plates, Electric Spin Scrubbers et jouets tendance.",
    art5_contactBtn: "Obtenir les Prix d'Usine",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Quand dois-je commander pour Prime Day 2026 ?", answer: "Maintenant. L'expédition express prend 7-12 jours. Le fret maritime prend 25-35 jours. Prime Day est le 23 juin — commandez avant le 5 juin pour l'express, sinon vous le manquerez." },
      { question: "De quelles certifications ai-je besoin ?", answer: "Smart Jump Rope : CE/FCC. Vibration Plate : CE (UE) requis. Electric Spin Scrubber : CE/FCC, UN38.3 pour expédition aérienne (batterie). Fidget toys : aucune requise." },
      { question: "Quelle est la commande minimale ?", answer: "Smart Jump Rope : 100-500 unités. Vibration Plate : 50-200 unités. Electric Spin Scrubber : 200-1000 unités. Fidget toys : 50-500 unités. Commandes d'essai disponibles à coût unitaire plus élevé." }
    ])
  },

  // ─── 德语 ───
  de: {
    art5_tag: "Prime Day 2026 Leitfaden",
    art5_title: "Prime Day 2026: Halbjahres-Beschaffungsleitfaden für globale Verkäufer",
    art5_subtitle: "Prime Day 23.-26. Juni + TikTok Mid-Year Sale 18. Juni – 3. Juli — was jetzt bevorraten",
    art5_metaDesc: "Prime Day 2026 Beschaffungsleitfaden: Smart Jump Rope, Vibration Plates, Electric Spin Scrubber im Trend. China Werkdirektpreise für globale B2B-Käufer.",
    art5_hotTitle: "🔥 Was für Prime Day 2026 viral geht",
    art5_hotContent: `Amazon Prime Day 2026 bestätigt für 23.-26. Juni, 26 Länder abdeckend. Das ist die größte halbjährliche Verkaufsveranstaltung weltweit — und das Beschaffungsfenster schließt sich.

Der Mid-Year Sale von TikTok Shop (18. Juni – 3. Juli 2026) überlappt perfekt und erzeugt einen Dual-Plattform-Anstieg. TikTok Shop startet auch am 15. Juni in 4 europäischen Ländern und bringt neue Nachfrage.

**Smart Jump Rope (t17)**
TikTok UK: 7-Tage-Umsatz $100K USD, ~4100 Einheiten. US-Markt folgt der gleichen Kurve. 1688-Kosten: $3.50-$8.00. Einzelhandel: $15.99-$29.99. Marge: 70-80%.

**Whole Body Vibration Plate (t18)**
TikTok US: kumuliert $7M USD. Tageshoch ~2000 Einheiten. 1688-Kosten: $80-$200. Einzelhandel: $299-$599. Schweres Produkt — nur Seefracht. Marge: 60-75%.

**Electric Spin Scrubber**
TikTok Shop US wöchentlicher GMV: $1.8M-$2.4M. Stabile Top-10-Kategorie. 1688-Kosten: $2.50-$6.00. Einzelhandel: $24.99-$39.99. Marge: 75-85%.

**Fidget Toys (t1) & Squishmallows (t4)**
TikTok-Dauerbrenner. Immer noch Top-5 in der Spielzeugkategorie. Niedrige Kosten, hohe Impulskäufe. MOQ flexibel: 50-500 Einheiten.`,
    art5_profitTitle: "💰 Die Margenrealität",
    art5_profitContent: `Smart Jump Rope: 1688-Kosten $3.50-$8.00 → US-Einzelhandel $15.99-$29.99. Luftfrachtgeeignet (leicht). Marge: 70-80%.

Whole Body Vibration Plate: 1688-Kosten $80-$200 → US-Einzelhandel $299-$599. SCHWER (20-30kg). Nur Seefracht. Landekosten (See + Zoll) bei $200-Einheit ≈ $260-$290. Immer noch 50%+ Marge bei $499 Einzelhandel.

Electric Spin Scrubber: 1688-Kosten $2.50-$6.00 → US-Einzelhandel $24.99-$39.99. Marge: 75-85%. Akkumodelle brauchen UN38.3-Zertifizierung für Luftfracht.

Fidget Toys: 1688-Kosten $0.50-$3.00/Einheit → Einzelhandel $8.99-$19.99. Marge: 80-90%. Klein, schneller Umlauf.

**Versandreality-Check**
Express (7-12 Tage): für Jump Ropes, Scrubber, Spielzeug. Seefracht (25-35 Tage): für Vibration Plates, schwere Ausrüstung. Prime Day ist am 23. Juni — Sie müssen JETZT versenden (bis 5. Juni) für Express-Ankunft vor dem Event.`,
    art5_regionTitle: "🏠 Wo Diese Produkte Herkommen",
    art5_regionContent: `Smart Jump Rope: China — mehrere Fertigungszentren mit etablierten Elektronik-Lieferketten. Zhejiang- und Guangdong-Cluster dominieren. CE (EU) und FCC (US) Zertifizierungen Standard.

Whole Body Vibration Plate: China — etablierte Fitnessgeräte-Fertigungsregionen mit tiefen Metallverarbeitungs- und Motorlieferketten. Nordchina-Hubs. CE (EU) Zertifizierung für Fitnessgeräte erforderlich.

Electric Spin Scrubber: China — mehrere Fertigungszentren mit tiefer Expertise in Kunststoffspritzguss und Elektronik. Küstencluster bieten integrierte Lieferketten. IPX7-Wasserfestigkeit ist die Kernspezifikation für Käufer.

Fidget Toys: China — mehrere Fertigungszentren mit reifen Kunststoffspritzguss- und Montage-Lieferketten. Keine Zertifizierung für Basismodelle erforderlich.`,
    art5_tipsTitle: "📼 Wie Spootfind Ihnen bei der Beschaffung Hilft",
    art5_tipsContent: `Sie konzentrieren sich auf den Verkauf. Wir kümmern uns um die Beschaffungskomplexität:

✅ Werksverifizierung vor Zahlung — wir prüfen Geschäftslizenzen, Produktionskapazität, Exporthistorie
✅ Preisverhandlung — Fabriken geben uns bessere Preise als Alibabas Angebotspreise
✅ Probenmanagement — wir koordinieren Muster, QC-Fotos, Vorschiffsinspektion
✅ Versandkoordination — Express für leichte Artikel, Seefracht für schwere Artikel, vollständige Dokumentation
✅ Keine Vorausgebühren — Sie zahlen erst nach Werksverifizierung und Musterfreigabe

**Der Spootfind-Vorteil**
Wir sind nicht Alibaba. Wir sind Ihr Beschaffungspartner vor Ort in China. Ein Ansprechpartner, vollständiger Lieferkettenzugang, keine Plattformgebühren.`,
    art5_contactTitle: "Bereit für Prime Day 2026?",
    art5_contactContent: "Prime Day ist 23.-26. Juni. Das Beschaffungsfenster schließt sich. Kontaktieren Sie uns jetzt für Werkdirektpreise für Smart Jump Ropes, Vibration Plates, Electric Spin Scrubber und Trend-Spielzeug.",
    art5_contactBtn: "Werkpreise Anfordern",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Wann sollte ich für Prime Day 2026 bestellen?", answer: "Jetzt. Expressversand dauert 7-12 Tage. Seefracht dauert 25-35 Tage. Prime Day ist am 23. Juni — bestellen Sie bis zum 5. Juni für Express, sonst verpassen Sie es." },
      { question: "Welche Zertifizierungen brauche ich?", answer: "Smart Jump Rope: CE/FCC. Vibration Plate: CE (EU) erforderlich. Electric Spin Scrubber: CE/FCC, UN38.3 für Luftfracht (Akkus). Fidget toys: keine erforderlich." },
      { question: "Was ist die Mindestbestellmenge?", answer: "Smart Jump Rope: 100-500 Einheiten. Vibration Plate: 50-200 Einheiten. Electric Spin Scrubber: 200-1000 Einheiten. Fidget toys: 50-500 Einheiten. Testbestellungen zu höheren Stückkosten verfügbar." }
    ])
  },

  // ─── 日语 ───
  ja: {
    art5_tag: "Prime Day 2026 ガイド",
    art5_title: "Prime Day 2026：グローバルセラーのための通年調達ガイド",
    art5_subtitle: "6月23〜26日 Prime Day + TikTok 年中セール 6月18日〜7月3日 — 今すぐ仕入れるべき商品",
    art5_metaDesc: "Prime Day 2026 調達ガイド：Smart Jump Rope、Vibration Plates、Electric Spin Scrubberがトレンド。中国工場直接価格年全球B2Bバイヤー向け。",
    art5_hotTitle: "🔥 Prime Day 2026でバイラル中の商品",
    art5_hotContent: `Amazon Prime Day 2026が6月23〜26日に確定、26カ国をカバー。世界最大の半期セール——調達窗口は急速に閉じています。

TikTok Shopの年中セール（2026年6月18日〜7月3日）がPrime Dayと完美に重なり、2プラットフォームでの需要急増を生み出します。TikTok Shopは6月15日に4つの欧州国に新規参入し、新たな需要を加えます。

**Smart Jump Rope (t17)**
英国TikTok：7日間売上 $100K USD、約4100個。米国市場も同じ曲線を描いています。1688コスト：$3.50-$8.00。小売：$15.99-$29.99。利益率：70-80%。

**Whole Body Vibration Plate (t18)**
TikTok 米国：累計 $7M USD。単日ピーク約2000個。1688コスト：$80-$200。小売：$299-$599。重量物——船便のみ。利益率：60-75%。

**Electric Spin Scrubber**
TikTok Shop 米国 週次GMV：$1.8M-$2.4M。安定的トップ10カテゴリ。1688コスト：$2.50-$6.00。小売：$24.99-$39.99。利益率：75-85%。

**Fidget Toys (t1) & Squishmallows (t4)**
TikTokの定番ヒット品。引続きおもちゃカテゴリートップ5。低コスト、衝動買いが多い。MOQ柔軟：50〜500個。`,
    art5_profitTitle: "💰 利益のリアル",
    art5_profitContent: `Smart Jump Rope：1688コスト $3.50-$8.00 → 米国小売 $15.99-$29.99。航空便対応（軽量）。利益率：70-80%。

Whole Body Vibration Plate：1688コスト $80-$200 → 米国小売 $299-$599。重たい（20〜30kg）。船便のみ。着岸コスト（船便＋関税）$200品 ≈ $260-$290。小売$499でも50%以上利益率確保。

Electric Spin Scrubber：1688コスト $2.50-$6.00 → 米国小売 $24.99-$39.99。利益率：75-85%。バッテリー款は航空便にUN38.3認証が必要。

Fidget Toys：1688コスト $0.50-$3.00/個 → 小売 $8.99-$19.99。利益率：80-90%。小さく回転が速い。

**配送の現実**
エクスプレス（7〜12日）：ジャンピングロープ、スクラバー、おもちゃ向け。船便（25〜35日）：振動板、重機向け。Prime Dayは6月23日——エクスプレスでイベント前に届けるには「今」発送（6月5日まで）が必要です。`,
    art5_regionTitle: "🏠 これらの商品の産地",
    art5_regionContent: `Smart Jump Rope：中国——電子機器サプライチェーンが確立された複数の製造ハブ。浙江・広東のクラスターが主導。CE（EU）・FCC（米国）認証が標準。

Whole Body Vibration Plate：中国——金属加工・モーターサプライチェーンが深い健身器材製造地域。中国北部ハブ。健身器材にはCE（EU）認証が必要。

Electric Spin Scrubber：中国——塑料射出成型・電子機器に深い専門知識を持つ複数の製造ハブ。沿岸の産業クラスターが統合サプライチェーンを提供。买家が重視する最重要仕様はIPX7防水等級。

Fidget Toys：中国——成熟した塑料射出成型・アセンブリサプライチェーンを持つ複数の製造ハブ。基本モデルは認証不要。`,
    art5_tipsTitle: "📼 Spootfindが調達をどうサポートするか",
    art5_tipsContent: `売ることに集中してください。調達の複雑さは私たちが対応します：

✅ 支払い前の工場検証——营业执照、生産能力、輸出履歴を確認
✅ 価格交渉——工場はAlibabaの挂牌価格より私たちにより良いレートを提供
✅ サンプル管理——サンプル、QC写真、出荷前検査を調整
✅ 配送調整——軽量子はエクスプレス、重いは船便、 كاملة書類対応
✅ 前払い不要——工場検証とサンプル承認後にのみお支払い

**Spootfindの優位性**
私たちはAlibabaではありません。中国に展開するあなたの調達パートナー。一つの連絡先、完全サプライチェーンアクセス、プラットフォーム手数料なし。`,
    art5_contactTitle: "Prime Day 2026の準備はできましたか？",
    art5_contactContent: "Prime Dayは6月23〜26日。調達窗口は閉じています。今すぐお問い合わせいただき、Smart Jump Rope、Vibration Plates、Electric Spin Scrubber、トレンドおもちゃの工場直接価格を手に入れましょう。",
    art5_contactBtn: "工場価格を入手",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Prime Day 2026のためにいつ注文すべきですか？", answer: "今です。エクスプレスは7〜12日、船便は25〜35日。Prime Dayは6月23日——エクスプレスなら6月5日までにご注文ください。否则は間に合いません。" },
      { question: "必要な認証は何ですか？", answer: "Smart Jump Rope：CE/FCC。Vibration Plate：CE（EU）必須。Electric Spin Scrubber：CE/FCC、航空便にはUN38.3（バッテリー款）。Fidget toys：不要。" },
      { question: "最小注文数量はいくらですか？", answer: "Smart Jump Rope：100〜500個。Vibration Plate：50〜200個。Electric Spin Scrubber：200〜1000個。Fidget toys：50〜500個。試注も対応可能（単価はやや高）。" }
    ])
  },

  // ─── 韩语 ───
  ko: {
    art5_tag: "Prime Day 2026 가이드",
    art5_title: "Prime Day 2026: 글로벌 셀러를 위한 상반기 소싱 가이드",
    art5_subtitle: "6월 23-26일 Prime Day + TikTok 상반기 세일 6월 18일-7월 3일 — 지금 비축할 상품",
    art5_metaDesc: "Prime Day 2026 소싱 가이드: Smart Jump Rope, Vibration Plates, Electric Spin Scrubbers 트렌드. 글로벌 B2B 바이어를 위한 중국 공장 직결 가격.",
    art5_hotTitle: "🔥 Prime Day 2026에서 바이럴 중인 상품",
    art5_hotContent: `Amazon Prime Day 2026이 6월 23-26일 확정, 26개국 적용. 세계에서 가장 큰 상반기 쇼핑 이벤트 — 소싱 창이 빠르게 닫히고 있습니다.

TikTok Shop 상반기 세일(2026년 6월 18일-7월 3일)이 Prime Day와 완벽히 겹쳐 이중 플랫폼 성수를 맞이합니다. TikTok Shop은 6월 15일 유럽 4개국 신규 진출도 앞두고 있습니다.

**Smart Jump Rope (t17)**
영국 TikTok: 7일 매출 $100K USD, 약 4,100개. 미국 시장도 같은 곡선追踪. 1688 원가: $3.50-$8.00. 소매: $15.99-$29.99. 마진: 70-80%.

**Whole Body Vibration Plate (t18)**
미국 TikTok: 누적 $7M USD. 일일 피크 약 2,000개. 1688 원가: $80-$200. 소매: $299-$599. 무거운 상품 — 해상운송만 가능. 마진: 60-75%.

**Electric Spin Scrubber**
미국 TikTok Shop 주간 GMV: $1.8M-$2.4M. 안정적 TOP 10 카테고리. 1688 원가: $2.50-$6.00. 소매: $24.99-$39.99. 마진: 75-85%.

**Fidget Toys (t1) & Squishmallows (t4)**
TikTok 장기 히트상품. 여전히 장난감 카테고리 TOP 5. 원가 낮고 충동구매 높음. MOQ 유연: 50-500개.`,
    art5_profitTitle: "💰 마진의 현실",
    art5_profitContent: `Smart Jump Rope: 1688 원가 $3.50-$8.00 → 미국 소매 $15.99-$29.99. 항공배송 가능(가벼움). 마진: 70-80%.

Whole Body Vibration Plate: 1688 원가 $80-$200 → 미국 소매 $299-$599. 무거움(20-30kg). 해상운송만. $200 제품 도착원가(해상+관세) ≈ $260-$290. 소매 $499에서도 마진 50% 이상 유지.

Electric Spin Scrubber: 1688 원가 $2.50-$6.00 → 미국 소매 $24.99-$39.99. 마진: 75-85%. 배터리 모델은 항공배송 시 UN38.3 인증 필요.

Fidget Toys: 1688 원가 $0.50-$3.00/개 → 소매 $8.99-$19.99. 마진: 80-90%. 작고 빠른 순환.

**배송 현실체크**
익스프레스(7-12일): 줄넘기, 세척기, 장난감용. 해상(25-35일): 진동판, 중장비용. Prime Day는 6월 23일 — 제때 도착하려면 지금(6월 5일까지) 배송해야 합니다.`,
    art5_regionTitle: "🏠 이 상품들의 산지",
    art5_regionContent: `Smart Jump Rope: 중국 — 전자제품 공급망이 확립된 다수의 제조 허브. 저장·광둥 클러스터가 주도. CE(EU) 및 FCC(미국) 인증 표준.

Whole Body Vibration Plate: 중국 — 금속가공 및 모터 공급망이 깊은健身장비 제조 지역. 중국 북부 허브. CE(EU)健身장비 인증 필요.

Electric Spin Scrubber: 중국 — 플라스틱 사출成型 및 전자제품에 깊은 전문성을 가진 다수의 제조 허브. 연안 생산 클러스터가 통합 공급망 제공. 구매자가 중요하게 여기는 핵심 사양은 IPX7 방수 등급.

Fidget Toys: 중국 — 성숙한 플라스틱 사출成型 및 조립 공급망을 갖춘 다수의 제조 허브. 기본 모델은 인증 불필요.`,
    art5_tipsTitle: "📼 Spootfind가 어떻게 소싱을 돕는지",
    art5_tipsContent: `판매에 집중하세요. 소싱의 복잡성은 우리가 처리합니다:

✅ 결제 전 공장 검증 — 사업자등록증, 생산능력, 수출 이력 확인
✅ 가격 협상 — 공장은 Alibaba 게시 가격보다 더 좋은 조건을 제공
✅ 샘플 관리 — 샘플, QC 사진, 선적 전 검사 조정
✅ 배송 조정 — 가벼운 상품은 익스프레스, 무거운 상품은 해상, 전체 서류 지원
✅ 선불 수수료 없음 — 공장 검증 및 샘플 승인 후에만 결제

**Spootfind의 차별점**
우리는 Alibaba가 아닙니다. 중국 현지에 있는 당신의 소싱 파트너입니다. 하나의 연락처, 완전한 공급망 접근, 플랫폼 수수료 없음.`,
    art5_contactTitle: "Prime Day 2026 준비되셨나요?",
    art5_contactContent: "Prime Day는 6월 23-26일입니다. 소싱 창이 닫히고 있습니다. 지금 연락하여 Smart Jump Rope, Vibration Plates, Electric Spin Scrubber 및 트렌드 장난감의 공장 직결 가격을 확인하세요.",
    art5_contactBtn: "공장 가격 받기",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Prime Day 2026을 위해 언제 주문해야 하나요?", answer: "지금입니다. 익스프레스는 7-12일, 해상은 25-35일 걸립니다. Prime Day는 6월 23일 — 익스프레스라면 6월 5일까지 주문하세요. 그러지 않으면 놓칩니다." },
      { question: "필요한 인증은 무엇인가요?", answer: "Smart Jump Rope: CE/FCC. Vibration Plate: CE(EU) 필수. Electric Spin Scrubber: CE/FCC, 항공배송 시 UN38.3(배터리). Fidget toys: 불필요." },
      { question: "최소 주문 수량은 얼마인가요?", answer: "Smart Jump Rope: 100-500개. Vibration Plate: 50-200개. Electric Spin Scrubber: 200-1000개. Fidget toys: 50-500개. 시험 주문은 단가 인상으로 가능." }
    ])
  },

  // ─── 葡萄牙语 ───
  pt: {
    art5_tag: "Guia Prime Day 2026",
    art5_title: "Prime Day 2026: Guia de Suprimento de Meio de Ano para Vendedores Globais",
    art5_subtitle: "Prime Day 23-26 de junho + Liquidação de meio de ano do TikTok 18 de junho - 3 de julho — o que estocar agora",
    art5_metaDesc: "Guia de suprimento Prime Day 2026: Smart Jump Rope, Vibration Plates, Electric Spin Scrubbers em alta. Preços diretos de fábrica na China para compradores B2B globais.",
    art5_hotTitle: "🔥 O Que Está Viralizando para o Prime Day 2026",
    art5_hotContent: `Amazon Prime Day 2026 confirmado para 23-26 de junho, cobrindo 26 países. Este é o maior evento de vendas de meio de ano do mundo — e a janela de suprimento está se fechando rapidamente.

A liquidação de meio de ano do TikTok Shop (18 de junho — 3 de julho de 2026) se sobrepõe perfeitamente, criando um pico em duas plataformas. O TikTok Shop também lança em 4 países europeus em 15 de junho, adicionando nova demanda.

**Smart Jump Rope (t17)**
TikTok UK: vendas em 7 dias $100K USD, ~4100 unidades. Mercado dos EUA seguindo a mesma curva. Custo 1688: $3.50-$8.00. Varejo: $15.99-$29.99. Margem: 70-80%.

**Whole Body Vibration Plate (t18)**
TikTok US: acumulado $7M USD. Pico de um dia ~2000 unidades. Custo 1688: $80-$200. Varejo: $299-$599. Item pesado — apenas frete marítimo. Margem: 60-75%.

**Electric Spin Scrubber**
GMV semanal TikTok Shop US: $1.8M-$2.4M. Categoria estável no top 10. Custo 1688: $2.50-$6.00. Varejo: $24.99-$39.99. Margem: 75-85%.

**Fidget Toys (t1) e Squishmallows (t4)**
Vencedores históricos do TikTok. Ainda no top 5 da categoria de brinquedos. Baixo custo, alta compra por impulso. MOQ flexível: 50-500 unidades.`,
    art5_profitTitle: "💰 A Realidade das Margens",
    art5_profitContent: `Smart Jump Rope: custo 1688 $3.50-$8.00 → varejo EUA $15.99-$29.99. Adequado para envio aéreo (leve). Margem: 70-80%.

Whole Body Vibration Plate: custo 1688 $80-$200 → varejo EUA $299-$599. PESADO (20-30kg). Apenas frete marítimo. Custo desembarcado (mar + impostos) em uma unidade de $200 ≈ $260-$290. Ainda 50%+ de margem a $499 no varejo.

Electric Spin Scrubber: custo 1688 $2.50-$6.00 → varejo EUA $24.99-$39.99. Margem: 75-85%. Modelos com bateria precisam de certificação UN38.3 para envio aéreo.

Fidget Toys: custo 1688 $0.50-$3.00/unidade → Varejo $8.99-$19.99. Margem: 80-90%. Pequenos, giro rápido.

**Verificação de Realidade do Envio**
Express (7-12 dias): para jump ropes, scrubbers, brinquedos. Frete marítimo (25-35 dias): para vibration plates, equipamentos pesados. Prime Day é 23 de junho — você precisa enviar AGORA (até 5 de junho) para chegar a tempo.`,
    art5_regionTitle: "🏠 De Onde Vêm Estes Produtos",
    art5_regionContent: `Smart Jump Rope: China — múltiplos centros de manufatura com cadeias de suprimento de eletrônicos estabelecidas. Clusters de Zhejiang e Guangdong dominam. Certificações CE (UE) e FCC (EUA) padrão.

Whole Body Vibration Plate: China — regiões estabelecidas de fabricação de equipamentos de fitness com profundas cadeias de suprimento de metalurgia e motores. Centros do norte da China. Certificação CE (UE) necessária para equipamentos de fitness.

Electric Spin Scrubber: China — múltiplos centros de manufatura com profunda expertise em moldagem por injeção de plástico e eletrônicos. Clusters costeiros oferecem cadeias de suprimento integradas. A classificação de resistência à água IPX7 é a especificação chave que os compradores valorizam.

Fidget Toys: China — múltiplos centros de manufatura com cadeias maduras de injeção de plástico e montagem. Nenhuma certificação necessária para modelos básicos.`,
    art5_tipsTitle: "📼 Como o Spootfind Ajuda Você a Suprir",
    art5_tipsContent: `Você foca nas vendas. Nós cuidamos da complexidade do suprimento:

✅ Verificação de fábrica antes do pagamento — verificamos licenças comerciais, capacidade de produção, histórico de exportação
✅ Negociação de preços — fábricas nos dão melhores taxas do que os preços listados no Alibaba
✅ Gestão de amostras — coordenamos amostras, fotos de controle de qualidade, inspeção pré-embarque
✅ Coordenação de envio — expresso para itens leves, frete marítimo para itens pesados, documentação completa
✅ Sem taxas antecipadas — você paga apenas após verificação de fábrica e aprovação de amostra

**A Vantagem Spootfind**
Não somos Alibaba. Somos seu parceiro de suprimento no local na China. Um contato, acesso completo à cadeia de suprimento, sem taxas de plataforma.`,
    art5_contactTitle: "Pronto para o Prime Day 2026?",
    art5_contactContent: "Prime Day é 23-26 de junho. A janela de suprimento está se fechando. Entre em contato agora para preços diretos de fábrica em Smart Jump Ropes, Vibration Plates, Electric Spin Scrubbers e brinquedos em alta.",
    art5_contactBtn: "Obter Preços de Fábrica",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "Quando devo fazer o pedido para o Prime Day 2026?", answer: "Agora. Envio expresso leva 7-12 dias. Frete marítimo leva 25-35 dias. Prime Day é 23 de junho — peça até 5 de junho para expresso, ou perderá." },
      { question: "Quais certificações preciso?", answer: "Smart Jump Rope: CE/FCC. Vibration Plate: CE (UE) necessário. Electric Spin Scrubber: CE/FCC, UN38.3 para envio aéreo (bateria). Fidget toys: nenhuma necessária." },
      { question: "Qual é o pedido mínimo?", answer: "Smart Jump Rope: 100-500 unidades. Vibration Plate: 50-200 unidades. Electric Spin Scrubber: 200-1000 unidades. Fidget toys: 50-500 unidades. Pedidos de teste disponíveis a custo unitário mais alto." }
    ])
  },

  // ─── 阿拉伯语 ───
  ar: {
    art5_tag: "دليل Prime Day 2026",
    art5_title: "Prime Day 2026: دليل sourcings منتصف العام للبائعين العالميين",
    art5_subtitle: "Prime Day 23-26 يونيو + تخفيضات منتصف العام على TikTok 18 يونيو - 3 يوليو — ما الذي يجب تخزينه الآن",
    art5_metaDesc: "دليل sourcings Prime Day 2026: Smart Jump Rope و Vibration Plates و Electric Spin Scrubbers trending. أسعار مباشرة من المصنع في الصين لمشتري B2B العالميين.",
    art5_hotTitle: "🔥 ما الذي ينتشر ل Prime Day 2026",
    art5_hotContent: `Amazon Prime Day 2026 مؤكد من 23 إلى 26 يونيو، ويغطي 26 دولة. هذا هو أكبر حدث بيع في منتصف العام على مستوى العالم — ونافذة sourcings تغلق بسرعة.

تخفيضات منتصف العام في TikTok Shop (18 يونيو - 3 يوليو 2026) تتداخل تمامًا، مما يخلق ذروة مزدوجة المنصات. يطلق TikTok Shop أيضًا في 4 دول أوروبية في 15 يونيو، مما يضيف طلبًا جديدًا.

**Smart Jump Rope (t17)**
TikTok UK: مبيعات 7 أيام 100,000 دولار، حوالي 4100 وحدة. السوق الأمريكي يتبع نفس المنحنى. التكلفة على 1688: 3.50-8.00 دولار. التجزئة: 15.99-29.99 دولار. الهامش: 70-80%.

**Whole Body Vibration Plate (t18)**
TikTok US: تراكمي 7 ملايين دولار. ذروة اليوم الواحد حوالي 2000 وحدة. التكلفة على 1688: 80-200 دولار. التجزئة: 299-599 دولار. منتج ثقيل — الشحن البحري فقط. الهامش: 60-75%.

**Electric Spin Scrubber**
GMV الأسبوعي لـ TikTok Shop US: 1.8-2.4 مليون دولار. فئة مستقرة في أفضل 10. التكلفة على 1688: 2.50-6.00 دولار. التجزئة: 24.99-39.99 دولار. الهامش: 75-85%.

**Fidget Toys (t1) و Squishmallows (t4)**
الفائزون التاريخيون على TikTok. لا يزالون في أفضل 5 في فئة الألعاب. تكلفة منخفضة، شراء اندفاعي عالي. MOQ مرن: 50-500 وحدة.`,
    art5_profitTitle: "💰 حقيقة الهوامش",
    art5_profitContent: `Smart Jump Rope: تكلفة 1688 3.50-8.00 دولار ← تجزئة الولايات المتحدة 15.99-29.99 دولار. مناسب للشحن الجوي (خفيف). الهامش: 70-80%.

Whole Body Vibration Plate: تكلفة 1688 80-200 دولار ← تجزئة الولايات المتحدة 299-599 دولار. ثقيل (20-30 كجم). الشحن البحري فقط. التكلفة عند الوصول (بحر + رسوم جمركية) لوحدة 200 دولار ≈ 260-290 دولار. لا يزال 50%+ هامش عند تجزئة 499 دولار.

Electric Spin Scrubber: تكلفة 1688 2.50-6.00 دولار ← تجزئة الولايات المتحدة 24.99-39.99 دولار. الهامش: 75-85%. الطرازات التي تعمل بالبطاريات تحتاج شهادة UN38.3 للشحن الجوي.

Fidget Toys: تكلفة 1688 0.50-3.00 دولار/وحدة ← تجزئة 8.99-19.99 دولار. الهامش: 80-90%. صغيرة، دوران سريع.

**فحص واقعية الشحن**
-express (7-12 يومًا): للحبال والقشات والألعاب. الشحن البحري (25-35 يومًا): للوحات الاهتزاز والمعدات الثقيلة. Prime Day هو 23 يونيو — تحتاج إلى الشحن الآن (بحلول 5 يونيو) للوصول قبل الحدث.`,
    art5_regionTitle: "🏠 من أين تأتي هذه المنتجات",
    art5_regionContent: `Smart Jump Rope: الصين — مراكز تصنيع متعددة مع سلاسل إمداد إلكترونية راسخة. تهيمن مجموعات تشجيانغ وقوانغدونغ. شهادات CE (الاتحاد الأوروبي) و FCC (الولايات المتحدة) قياسية.

Whole Body Vibration Plate: الصين — مناطق تصنيع معدات اللياقة الراسخة مع سلاسل إمداد عميقة في تشغيل المعادن والمحركات. مراكز شمال الصين. شهادة CE (الاتحاد الأوروبي) مطلوبة لمعدات اللياقة.

Electric Spin Scrubber: الصين — مراكز تصنيع متعددة ذات خبرة عميقة في القولبة بالحقن البلاستيكية والإلكترونيات. توفر المجموعات الساحلية سلاسل إمداد متكاملة. تصنيف مقاومة الماء IPX7 هو المواصفة الرئيسية التي يهتم بها المشترون.

Fidget Toys: الصين — مراكز تصنيع متعددة مع سلاسل إمداد ناضجة في القولبة بالحقن والتجميع. لا توجد شهادات مطلوبة للنماذج الأساسية.`,
    art5_tipsTitle: "📼 كيف يساعد Spootfind في sourcings الخاص بك",
    art5_tipsContent: `أنت تركّز على البيع. نحن نتعامل مع تعقيدات sourcings:

✅ التحقق من المصنع قبل الدفع — نتحقق من التراخيص التجارية وقدرة الإنتاج وتاريخ التصدير
✅ التفاوض على الأسعار — المصانع تقدم لنا أسعارًا أفضل من أسعار Alibaba المعلنة
✅ إدارة العينات — ننسق العينات وصور مراقبة الجودة والتفتيش قبل الشحن
✅ تنسيق الشحن — express للعناصر الخفيفة والشحن البحري للثقيلة مع وثائق كاملة
✅ لا رسوم مقدمة — أنت تدفع فقط بعد التحقق من المصنع والموافقة على العينة

**ميزة Spootfind**
نحن لسنا Alibaba. نحن شريك sourcings الخاص بك في الموقع في الصين. جهة اتصال واحدة، وصول كامل لسلسلة التوريد، بدون رسوم منصة.`,
    art5_contactTitle: "هل أنت مستعد لـ Prime Day 2026؟",
    art5_contactContent: "Prime Day من 23 إلى 26 يونيو. نافذة sourcings تغلق. تواصل معنا الآن للحصول على أسعار مباشرة من المصنع لـ Smart Jump Ropes و Vibration Plates و Electric Spin Scrubbers والألعاب الرائجة.",
    art5_contactBtn: "احصل على أسعار المصنع",
    art5_contactLink: "/contact",
    art5_faq: JSON.stringify([
      { question: "متى يجب أن أطلب لـ Prime Day 2026؟", answer: "الآن. يستغرق الشحن السريع 7-12 يومًا. يستغرق الشحن البحري 25-35 يومًا. Prime Day هو 23 يونيو — اطلب بحلول 5 يونيو للشحن السريع، وإلا ستفوتك الفرصة." },
      { question: "ما هي الشهادات التي أحتاجها؟", answer: "Smart Jump Rope: CE/FCC. Vibration Plate: CE (الاتحاد الأوروبي) مطلوب. Electric Spin Scrubber: CE/FCC، UN38.3 للشحن الجوي (بطارية). Fidget toys: لا شيء مطلوب." },
      { question: "ما هو الحد الأدنى للطلب؟", answer: "Smart Jump Rope: 100-500 وحدة. Vibration Plate: 50-200 وحدة. Electric Spin Scrubber: 200-1000 وحدة. Fidget toys: 50-500 وحدة. الطلبات التجريبية متاحة بتكلفة وحدة أعلى." }
    ])
  }
};

// Language file mapping
const langFiles = {
  zh: 'C:/spootfind/messages/zh.json',
  'zh-TW': 'C:/spootfind/messages/zh-TW.json',
  es: 'C:/spootfind/messages/es.json',
  fr: 'C:/spootfind/messages/fr.json',
  de: 'C:/spootfind/messages/de.json',
  ja: 'C:/spootfind/messages/ja.json',
  ko: 'C:/spootfind/messages/ko.json',
  pt: 'C:/spootfind/messages/pt.json',
  ar: 'C:/spootfind/messages/ar.json'
};

// Art5 keys to translate
const art5Keys = Object.keys(src);

// Process each language
for (const [lang, filePath] of Object.entries(langFiles)) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Ensure insights namespace exists
  if (!data.insights) data.insights = {};
  
  // Apply translations
  for (const key of art5Keys) {
    if (translations[lang] && translations[lang][key] !== undefined) {
      data.insights[key] = translations[lang][key];
    }
  }
  
  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Wrote ${lang} (${art5Keys.length} keys)`);
}

console.log('\nAll 9 language files updated.');
