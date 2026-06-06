#!/usr/bin/env node
/**
 * 为 Insights 文章生成配图
 * 用法: node generate_article_images.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'articles');

// 文章配图 prompt 配置
const ARTICLES = [
  {
    id: 'art1',
    prompt: 'professional blog header image vibrant colors fidget toys trending TikTok 2026 North America market social media style',
    output: path.join(OUTPUT_DIR, 'art1-na-tiktok-fidget.png'),
  },
  {
    id: 'art2',
    prompt: 'professional blog header image construction equipment excavator China manufacturing industrial yellow black machinery',
    output: path.join(OUTPUT_DIR, 'art2-china-construction.png'),
  },
  {
    id: 'art3',
    prompt: 'professional blog header image Southeast Asia ecommerce online shopping sourcing guide tropical market diverse products',
    output: path.join(OUTPUT_DIR, 'art3-sea-ecommerce.png'),
  },
  {
    id: 'art4',
    prompt: 'professional blog header image TikTok Shop trending products June 2026 viral items social commerce colorful',
    output: path.join(OUTPUT_DIR, 'art4-tiktok-shop-june.png'),
  },
];

async function run() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const article of ARTICLES) {
    const scriptPath = path.join(__dirname, 'generate_image_tokenhub.js');
    const cmd = `node "${scriptPath}" "${article.prompt}" "${article.output}"`;
    console.log(`\n[${article.id}] Generating: ${article.prompt}`);
    console.log(`  output: ${article.output}`);

    try {
      // 使用 exec 同步执行，等待完成
      const output = execSync(cmd, { encoding: 'utf8', timeout: 180000 });
      console.log(output);
    } catch (e) {
      console.error(`[${article.id}] Error: ${e.message}`);
      console.error(`  stdout: ${e.stdout}`);
      console.error(`  stderr: ${e.stderr}`);
    }
  }

  console.log('\n✅ All article images generated!');
}

run();
