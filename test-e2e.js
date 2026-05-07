#!/usr/bin/env node
/**
 * End-to-End API Test Suite
 * Tests all backend endpoints with real examples
 */

const BASE_URL = 'http://localhost:3001/api';
let token = null;

// ─── HELPERS ─────────────────────────────────────────────────────────

async function apiCall(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

function log(label, status, data) {
  const statusEmoji = status >= 200 && status < 300 ? '✅' : '❌';
  console.log(`\n${statusEmoji} ${label} (${status})`);
  console.log(JSON.stringify(data, null, 2));
}

// ─── TESTS ───────────────────────────────────────────────────────────

async function runTests() {
  console.log('🧪 API End-to-End Test Suite\n');
  console.log('=' .repeat(60));

  // 1️⃣ Health Check
  console.log('\n📊 1. Health Check');
  console.log('-'.repeat(60));
  let result = await apiCall('GET', '/health');
  log('GET /health', result.status, result.data);

  // 2️⃣ Login - Admin
  console.log('\n\n🔐 2. Authentication - Admin Login');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/auth/login', {
    email: 'admin@macommune.cm',
    password: 'ChangeMe123!',
  });
  log('POST /auth/login (admin)', result.status, result.data);
  if (result.status === 200) {
    token = result.data.token;
    console.log('\n✅ Token stored for authenticated requests');
  }

  // 3️⃣ Verify Token
  console.log('\n\n✔️ 3. Token Verification');
  console.log('-'.repeat(60));
  result = await apiCall('GET', '/auth/verify');
  log('GET /auth/verify', result.status, result.data);

  // 4️⃣ Get News Articles
  console.log('\n\n📰 4. News Articles - List');
  console.log('-'.repeat(60));
  result = await apiCall('GET', '/NewsArticle');
  log('GET /NewsArticle', result.status, result.data);

  // 5️⃣ Create News Article (with auth)
  console.log('\n\n📝 5. News Articles - Create');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/NewsArticle', {
    title: 'Test Article - E2E Test',
    content:
      'This is a test article created during the end-to-end test. It demonstrates the full API workflow.',
    excerpt: 'Test article summary',
    category: 'terrain',
    canton: 'figuil',
    published: true,
  });
  log('POST /NewsArticle', result.status, result.data);

  // 6️⃣ Get CMS Page
  console.log('\n\n📄 6. CMS Pages - Get');
  console.log('-'.repeat(60));
  result = await apiCall('GET', '/pages/about');
  log('GET /pages/about', result.status, result.data);

  // 7️⃣ Update CMS Page (admin only)
  console.log('\n\n✏️ 7. CMS Pages - Update');
  console.log('-'.repeat(60));
  result = await apiCall('PUT', '/pages/about', {
    hero: 'About Emmanuel Foka Campaign',
    content: 'Updated content for about page - E2E Test',
    lastUpdated: new Date().toISOString(),
  });
  log('PUT /pages/about', result.status, result.data);

  // 8️⃣ Initiate Donation
  console.log('\n\n💰 8. Donations - Initiate');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/donations/initiate', {
    amount: 5000,
    phone_number: '237699123456',
    donor_name: 'Test Donor',
    message: 'Test donation for campaign',
  });
  log('POST /donations/initiate', result.status, result.data);

  // 9️⃣ Verify Donation
  console.log('\n\n🔍 9. Donations - Verify');
  console.log('-'.repeat(60));
  result = await apiCall('GET', '/donations/verify');
  log('GET /donations/verify', result.status, result.data);

  // 🔟 Login - Editor
  console.log('\n\n🔐 10. Authentication - Editor Login');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/auth/login', {
    email: 'editor@macommune.cm',
    password: 'Editor123!',
  });
  log('POST /auth/login (editor)', result.status, result.data);
  if (result.status === 200) {
    token = result.data.token;
    console.log('\n✅ Editor token stored');
  }

  // ⓫ Create Article as Editor
  console.log('\n\n📝 11. News Articles - Create (Editor)');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/NewsArticle', {
    title: 'Editor Article - E2E Test',
    content: 'Article created by editor role during E2E test',
    excerpt: 'Editor article summary',
    category: 'reunion',
    canton: 'lam',
    published: true,
  });
  log('POST /NewsArticle (editor)', result.status, result.data);

  // ⓬ Failed Login Test
  console.log('\n\n❌ 12. Authentication - Failed Login');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/auth/login', {
    email: 'admin@macommune.cm',
    password: 'WrongPassword',
  });
  log('POST /auth/login (wrong password)', result.status, result.data);

  // ⓭ Missing Required Fields
  console.log('\n\n❌ 13. Validation - Missing Fields');
  console.log('-'.repeat(60));
  result = await apiCall('POST', '/donations/initiate', {
    amount: 5000,
    // missing phone_number
  });
  log('POST /donations/initiate (missing phone)', result.status, result.data);

  // Final Summary
  console.log('\n\n' + '='.repeat(60));
  console.log('✅ End-to-End Test Suite Complete');
  console.log('=' .repeat(60));
}

// Run tests
runTests().catch(console.error);
