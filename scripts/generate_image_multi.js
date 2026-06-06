#!/usr/bin/env node
/**
 * 多渠道生图脚本 v2.0
 * 支持: TokenHub (hy-image-v3.0) + 通义万象 (wan2.7-image-pro)
 * 自动降级: TokenHub → 通义万象
 * 用法: node generate_image_multi.js [产品名] [输出路径] [选项]
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const CONFIG = {
  outputDir: 'C:/spootfind/public/products',
  defaultSize: '1024*1024',
  timeout: 120000, // 120秒超时
  pollInterval: 5000, // 轮询间隔5秒
  maxPollTime: 120000, // 最多轮询120秒
};

// 渠道配置
const CHANNELS = {
  tokenhub: {
    name: 'TokenHub (hy-image-v3.0)',
    enabled: true,
    submitUrl: 'https://tokenhub.tencentmaas.com/v1/api/image/submit',
    queryUrl: 'https://tokenhub.tencentmaas.com/v1/api/image/query',
    apiKey: 'sk-wHT2wNf2ftLaWRtfY3H24kokO44lutVw6Oza4vXOx70dZL0q',
    model: 'hy-image-v3.0',
  },
  wanx: {
    name: '通义万象 (wan2.7-image-pro)',
    enabled: true,
    apiUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
    apiKey: 'sk-87ebecc0776b4363ba51bd79bb1764d8',
    model: 'wan2.7-image-pro',
  },
};

// ============ 工具函数 ============

/**
 * 发送 HTTPS POST 请求
 */
function httpsPost(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });
    req.on('error', (e) => reject(e));
    if (postData) req.write(postData);
    req.end();
  });
}

/**
 * 下载文件
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (e) => {
      fs.unlink(outputPath, () => {});
      reject(e);
    });
  });
}

/**
 * 等待（毫秒）
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============ TokenHub 渠道 ============

async function generateTokenHub(prompt, outputPath) {
  console.log(`  [TokenHub] 提交任务...`);
  
  // 1. 提交任务
  const submitData = JSON.stringify({
    model: CHANNELS.tokenhub.model,
    prompt: prompt,
    image_size: '1024x1024',
  });

  const submitOptions = {
    hostname: 'tokenhub.tencentmaas.com',
    path: '/v1/api/image/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNELS.tokenhub.apiKey}`,
      'Content-Length': Buffer.byteLength(submitData),
    },
    timeout: CONFIG.timeout,
  };

  const submitResult = await httpsPost(submitOptions, submitData);
  if (submitResult.statusCode !== 200) {
    throw new Error(`TokenHub submit failed: ${submitResult.statusCode} ${submitResult.body}`);
  }

  const submitJson = JSON.parse(submitResult.body);
  // TokenHub 返回格式: { id: "...", status: "queued", ... }
  const taskId = submitJson.task_id || submitJson.id;
  if (!taskId) {
    throw new Error(`TokenHub submit error: ${submitResult.body}`);
  }

  console.log(`  [TokenHub] 任务已提交, task_id: ${taskId}`);

  // 2. 轮询结果
  const startTime = Date.now();
  while (Date.now() - startTime < CONFIG.maxPollTime) {
    await sleep(CONFIG.pollInterval);

    const queryData = JSON.stringify({ model: CHANNELS.tokenhub.model, id: taskId });
    const queryOptions = {
      hostname: 'tokenhub.tencentmaas.com',
      path: '/v1/api/image/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNELS.tokenhub.apiKey}`,
        'Content-Length': Buffer.byteLength(queryData),
      },
    };

    const queryResult = await httpsPost(queryOptions, queryData);
    if (queryResult.statusCode !== 200) {
      console.log(`  [TokenHub] 轮询失败: ${queryResult.statusCode}`);
      continue;
    }

    const queryJson = JSON.parse(queryResult.body);
    
    const status = queryJson.status || 'unknown';
    console.log(`  [TokenHub] ${Math.floor((Date.now() - startTime) / 1000)}s status=${status}`);
    
    if (status === 'completed' || status === 'succeeded') {
      // 提取图片 URL
      let imageUrl = null;
      if (queryJson.data && Array.isArray(queryJson.data) && queryJson.data.length > 0) {
        imageUrl = queryJson.data[0].url;
      } else if (queryJson.data && typeof queryJson.data === 'object') {
        imageUrl = queryJson.data.url;
      }
      if (!imageUrl) {
        imageUrl = queryJson.url || queryJson.image_url;
      }
      
      if (!imageUrl) {
        throw new Error(`TokenHub: no image URL in response: ${queryResult.body.substring(0, 200)}`);
      }
      
      console.log(`  [TokenHub] 生成完成! 下载中...`);
      await downloadFile(imageUrl, outputPath);
      return { success: true, channel: 'TokenHub', path: outputPath };
    } else if (status === 'failed' || status === 'error') {
      throw new Error(`TokenHub task failed: ${queryResult.body}`);
    }
  }

  throw new Error('TokenHub timeout');
}

// ============ 通义万象渠道 ============

async function generateWanx(prompt, outputPath) {
  console.log(`  [通义万象] 提交任务...`);

  const postData = JSON.stringify({
    model: CHANNELS.wanx.model,
    input: {
      messages: [
        {
          role: 'user',
          content: [{ text: prompt }],
        },
      ],
    },
    parameters: {
      size: CONFIG.defaultSize,
      n: 1,
    },
  });

  const options = {
    hostname: 'dashscope.aliyuncs.com',
    path: '/api/v1/services/aigc/multimodal-generation/generation',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNELS.wanx.apiKey}`,
      'Content-Length': Buffer.byteLength(postData),
    },
    timeout: CONFIG.timeout,
  };

  const result = await httpsPost(options, postData);
  if (result.statusCode !== 200) {
    throw new Error(`通义万象 failed: ${result.statusCode} ${result.body}`);
  }

  const json = JSON.parse(result.body);
  if (!json.output || !json.output.choices || !json.output.choices[0]) {
    throw new Error(`通义万象 error: ${result.body}`);
  }

  const imageUrl = json.output.choices[0].message.content[0].image;
  console.log(`  [通义万象] 生成完成! 下载中...`);
  
  await downloadFile(imageUrl, outputPath);
  return { success: true, channel: '通义万象', path: outputPath };
}

// ============ 主生成函数 ============

async function generateImage(prompt, outputPath, options = {}) {
  const channels = [];

  // 按顺序添加启用的渠道
  if (CHANNELS.tokenhub.enabled) channels.push({ name: 'TokenHub', fn: generateTokenHub });
  if (CHANNELS.wanx.enabled) channels.push({ name: '通义万象', fn: generateWanx });

  if (channels.length === 0) {
    throw new Error('没有可用的生图渠道!');
  }

  let lastError = null;

  for (const channel of channels) {
    try {
      console.log(`\n[${channel.name}] 开始生成...`);
      const result = await channel.fn(prompt, outputPath);
      console.log(`✅ [${channel.name}] 成功! 文件: ${outputPath}`);
      return result;
    } catch (error) {
      console.error(`❌ [${channel.name}] 失败: ${error.message}`);
      lastError = error;
      
      // 如果还有备用渠道，继续尝试
      if (channel !== channels[channels.length - 1]) {
        console.log(`   切换到备用渠道...`);
      }
    }
  }

  throw lastError || new Error('所有渠道均失败');
}

// ============ 批量生成 ============

async function batchGenerate(products) {
  const results = {
    success: [],
    failed: [],
  };

  console.log(`\n开始批量生成 ${products.length} 张图片...\n`);
  console.log('='.repeat(60));

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] ${product.name}`);
    console.log(`  Prompt: ${product.prompt}`);
    console.log(`  输出: ${product.outputPath}`);

    try {
      const result = await generateImage(product.prompt, product.outputPath);
      results.success.push({
        product: product.name,
        channel: result.channel,
        path: result.path,
      });
      console.log(`  ✅ 完成!`);
    } catch (error) {
      console.error(`  ❌ 失败: ${error.message}`);
      results.failed.push({
        product: product.name,
        error: error.message,
      });
    }

    // 避免频率限制
    if (i < products.length - 1) {
      console.log(`  等待 3 秒...`);
      await sleep(3000);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n生成完成!`);
  console.log(`  成功: ${results.success.length}`);
  console.log(`  失败: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log(`\n失败列表:`);
    results.failed.forEach((item, idx) => {
      console.log(`  ${idx + 1}. ${item.product}: ${item.error}`);
    });
  }

  return results;
}

// ============ CLI 入口 ============

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
多渠道生图脚本 v2.0

用法:
  node generate_image_multi.js [产品名] [输出路径] [选项]
  node generate_image_multi.js --batch [JSON文件]

示例:
  # 单张生成
  node generate_image_multi.js "跳绳" "C:/spootfind/public/products/t17-jump-rope.png"

  # 批量生成 (从 products.json)
  node generate_image_multi.js --batch products.json

选项:
  --prompt "自定义prompt"   自定义提示词
  --size 1024*1024         图片尺寸 (默认 1024*1024)
  --channel tokenhub|wanx   指定渠道 (默认自动降级)
    `);
    process.exit(0);
  }

  if (args[0] === '--batch') {
    // 批量模式
    const batchFile = args[1];
    if (!fs.existsSync(batchFile)) {
      console.error(`文件不存在: ${batchFile}`);
      process.exit(1);
    }

    const products = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
    await batchGenerate(products);
  } else {
    // 单张模式
    const productName = args[0];
    const outputPath = args[1] || path.join(CONFIG.outputDir, `${productName.replace(/\s+/g, '-')}.png`);
    const prompt = args[2] || `Professional product photo of ${productName}, white background, studio lighting, high quality, 4K`;

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      const result = await generateImage(prompt, outputPath);
      console.log(`\n✅ 生成成功!`);
      console.log(`  渠道: ${result.channel}`);
      console.log(`  文件: ${result.path}`);
    } catch (error) {
      console.error(`\n❌ 生成失败: ${error.message}`);
      process.exit(1);
    }
  }
}

// 运行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateImage, batchGenerate };