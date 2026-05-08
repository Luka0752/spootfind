import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const LOCALE_COOKIE = 'NEXT_LOCALE';

// 国家代码 → 语言映射
const COUNTRY_TO_LOCALE: Record<string, string> = {
  // 中文
  CN: 'zh',
  TW: 'zh-TW',
  HK: 'zh-TW',
  MO: 'zh-TW',
  SG: 'zh',
  MY: 'zh',

  // 英语国家
  US: 'en',
  GB: 'en',
  AU: 'en',
  CA: 'en',
  NZ: 'en',
  IE: 'en',
  PH: 'en',
  IN: 'en',
  PK: 'en',
  NG: 'en',
  ZA: 'en',
  KE: 'en',
  GH: 'en',

  // 西班牙语
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  PR: 'es',

  // 法语
  FR: 'fr',
  BE: 'fr',
  LU: 'fr',
  MC: 'fr',
  MG: 'fr',
  CM: 'fr',
  CI: 'fr',
  SN: 'fr',
  ML: 'fr',
  BF: 'fr',
  NE: 'fr',
  TD: 'fr',
  CG: 'fr',
  CD: 'fr',
  GA: 'fr',
  RE: 'fr',

  // 德语
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',

  // 葡萄牙语
  PT: 'pt',
  BR: 'pt',
  AO: 'pt',
  MZ: 'pt',
  GW: 'pt',
  TL: 'pt',
  CV: 'pt',

  // 日语
  JP: 'ja',

  // 韩语
  KR: 'ko',
  KP: 'ko',

  // 阿拉伯语
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  IQ: 'ar',
  JO: 'ar',
  LB: 'ar',
  SY: 'ar',
  KW: 'ar',
  QA: 'ar',
  BH: 'ar',
  OM: 'ar',
  YE: 'ar',
  LY: 'ar',
  TN: 'ar',
  DZ: 'ar',
  MA: 'ar',
  SD: 'ar',
  MR: 'ar',
  SO: 'ar',
};

// IP 地理定位 API（免费，无需 API Key）
async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: AbortSignal.timeout(1500), // 1.5秒超时
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.countryCode || null;
  } catch {
    return null;
  }
}

// 从请求中提取客户端 IP
function getClientIP(req: NextRequest): string | null {
  // 优先检查代理头
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[0] || null;
  }

  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP;

  // Vercel 特定头
  const vercelIP = req.headers.get('x-vercel-forwarded-for');
  if (vercelIP) return vercelIP.split(',')[0].trim();

  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 静态资源跳过
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // 图片、字体等文件
  ) {
    return NextResponse.next();
  }

  // 检查是否已有语言前缀
  const localeMatch = pathname.match(/^\/(en|zh|zh-TW|es|fr|ar|pt|de|ja|ko)(\/|$)/);

  if (localeMatch) {
    // 已有语言前缀，继续正常处理
    return createMiddleware(routing)(req);
  }

  // 检查用户偏好 Cookie
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && routing.locales.includes(cookieLocale as any)) {
    // 有偏好设置，重定向到该语言
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // IP 地理定位
  const ip = getClientIP(req);
  if (ip) {
    const country = await getCountryFromIP(ip);
    if (country) {
      const detectedLocale = COUNTRY_TO_LOCALE[country];
      if (detectedLocale && routing.locales.includes(detectedLocale as any)) {
        // 重定向到检测到的语言
        const url = req.nextUrl.clone();
        url.pathname = `/${detectedLocale}${pathname}`;
        const response = NextResponse.redirect(url);
        // 设置 Cookie 记住
        response.cookies.set(LOCALE_COOKIE, detectedLocale, {
          maxAge: 60 * 60 * 24 * 365, // 1年
          path: '/',
          sameSite: 'lax',
        });
        return response;
      }
    }
  }

  // 默认英语
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/((?!_next|api|favicon|images|products).*)'],
};
