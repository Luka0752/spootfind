# Spootfind 更新日志

## 2026-05-11
### 数据刷新尝试（自动心跳）
- trending.json 最后更新时间仍为 2026-05-08（未刷新）
- 原因：Amazon/AliExpress/TikTok/Etsy 均无法直接抓取
  - Amazon: 仅返回通用导航，无产品数据
  - AliExpress: 重定向至登录墙
  - TikTok: IP 被封禁
  - Etsy: 仅返回通用页面
- 需人工介入或使用 xbrowser 技能手动刷新
- 网站部署仍阻塞，等待 Vercel token 更新

### 待用户操作
- 登录 Vercel → Settings → Tokens 重新生成 token
- 将新 token 告知贰号完成部署

---

## 2026-05-04
- **trending.json**：已更新至14款精选产品（5月版）
  - Hot: Bamboo Toothbrush Set, Beeswax Food Wraps, Electric Spin Scrubber, Solar Garden Lights, Silicone Food Bags, Insulated Water Bottle
  - Rising: Compostable Phone Case, Bamboo Cutlery, LED Camping Lantern, Solar Charger, Yoga Mat, Pour-Over Coffee Maker
  - Stable: Reusable Produce Bags, Organic Cotton Tote, Stainless Steel Straws
- **trending.json**：最后更新：2026-05-04 14:20

---

## 2026-05-04 (Build Fix)
### 问题发现
- Vercel 构建失败：`Couldn't find next-intl config file`
- 原因：Next.js 16.2.4 + next-intl 4.x 需要 `createNextIntlPlugin` 在 `next.config.ts` 中注册 i18n 路径

### 修复
- `next.config.ts` 添加：
  ```ts
  import createNextIntlPlugin from 'next-intl/plugin';
  const withNextIntl = createNextIntlPlugin('./i18n.ts');
  export default withNextIntl(nextConfig);
  ```

### 部署
- **Production**: https://spootfind.com ✅
- **Build**: ✅ Success（74 pages，19s build time）
- **Warning（仍存在）**: about 页面大量 `MISSING_MESSAGE` 警告（约180条，10种语言×18个key）
  - 原因：messages/*.json 中 `about` namespace 不完整
  - 影响：页面可正常渲染（fallback 空字符串），但不完整
  - 建议：后续补全 messages 文件

---

## 2026-05-02 (Initial)
- 首次趋势品更新，15款产品上线 spootfind.com
