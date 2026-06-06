#!/usr/bin/env node
/**
 * TokenHub 图像生成脚本（Node.js 版）
 * 使用 hy-image-v3.0 模型，国内直连无需 VPN
 *
 * 用法:
 *   node generate_image_tokenhub.js "prompt内容" [输出文件路径]
 *
 * 示例:
 *   node generate_image_tokenhub.js "professional product photo of a power trowel" t15-power-trowel.png
 *   node generate_image_tokenhub.js "smart jump rope fitness" t17-jumprope.jpg
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk-wHT2wNf2ftLaWRtfY3H24kokO44lutVw6Oza4vXOx70dZL0q';
const MODEL = 'hy-image-v3.0';
const SUBMIT_URL = 'tokenhub.tencentmaas.com';
const SUBMIT_PATH = '/v1/api/image/submit';
const QUERY_URL = 'tokenhub.tencentmaas.com';
const QUERY_PATH = '/v1/api/image/query';
const DEFAULT_OUTPUT_DIR = path.join(__dirname, '..', 'public', 'products');

function post(hostname, pathStr, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname,
      path: pathStr,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let d = '';
      res.on('data', (c) => { d += c; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch (e) {
          reject(new Error(`Parse error: ${d.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function submit(prompt) {
  const data = await post(SUBMIT_URL, SUBMIT_PATH, { model: MODEL, prompt });
  const taskId = data.id || (data.data && data.data.id) || data.request_id;
  console.log(`[submit] id=${taskId}, status=${data.status}`);
  return taskId;
}

async function query(taskId) {
  return await post(QUERY_URL, QUERY_PATH, { model: MODEL, id: taskId });
}

async function pollUntilDone(taskId, interval = 5000, maxWait = 120000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    const result = await query(taskId);
    const status = result.status || 'unknown';
    const elapsed = Math.round((Date.now() - start) / 1000);
    console.log(`  [${elapsed}s] status=${status}`);

    if (status === 'completed' || status === 'succeeded') {
      return result;
    } else if (status === 'failed' || status === 'error') {
      throw new Error(`Task failed: ${JSON.stringify(result).substring(0, 200)}`);
    }

    await new Promise((r) => setTimeout(r, interval));
  }
  throw new Error(`Timeout after ${maxWait / 1000}s`);
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stat = fs.statSync(outputPath);
        console.log(`[saved] ${outputPath} (${stat.size} bytes)`);
        resolve(stat.size);
      });
    }).on('error', (e) => {
      fs.unlinkSync(outputPath);
      reject(e);
    });
  });
}

async function generate(prompt, outputPath) {
  if (!outputPath) {
    const ts = Date.now();
    outputPath = path.join(DEFAULT_OUTPUT_DIR, `generated_${ts}.png`);
  }

  // 确保输出目录存在
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // 1. 提交任务
  const taskId = await submit(prompt);

  // 2. 轮询等待完成
  console.log('[polling] waiting for image generation...');
  const result = await pollUntilDone(taskId);

  // 3. 提取图片 URL 并下载
  let url = null;
  if (result.data && Array.isArray(result.data) && result.data.length > 0) {
    url = result.data[0].url;
  } else if (result.data && typeof result.data === 'object') {
    url = result.data.url;
  }
  if (!url) {
    url = result.url || result.image_url;
  }

  if (!url) {
    throw new Error(`No image URL in response: ${JSON.stringify(result).substring(0, 300)}`);
  }

  await downloadImage(url, outputPath);
  return outputPath;
}

async function main() {
  if (process.argv.length < 3) {
    console.log(__doc__ || 'Usage: node generate_image_tokenhub.js "prompt" [output_path]');
    process.exit(1);
  }

  const prompt = process.argv[2];
  const output = process.argv[3] || null;

  try {
    const savedPath = await generate(prompt, output);
    console.log(`\n✅ Done! Image saved to: ${savedPath}`);
    process.exit(0);
  } catch (e) {
    console.error(`\n❌ Error: ${e.message}`);
    process.exit(1);
  }
}

main();
