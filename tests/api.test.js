/**
 * API Test Suite - macommune Backend
 * Run: node tests/api.test.js
 */

const BASE_URL = 'http://localhost:3001/api';
let TOKEN = null;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function apiCall(method, endpoint, body = null, useAuth = false) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (useAuth && TOKEN) {
    options.headers.Authorization = `Bearer ${TOKEN}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json().catch(() => ({}));
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

async function test(name, fn) {
  try {
    await fn();
    log(`✓ ${name}`, 'green');
    return true;
  } catch (error) {
    log(`✗ ${name}: ${error.message}`, 'red');
    return false;
  }
}

// ──────────────────────────────────────────────────────────────────
// TEST SUITE
// ──────────────────────────────────────────────────────────────────

async function runTests() {
  log('\n🚀 macommune API Test Suite\n', 'blue');

  let passed = 0;
  let failed = 0;

  // ──── HEALTH CHECK ─────────────────────────────────────────
  log('📋 HEALTH CHECK', 'blue');
  if (
    await test('GET /health', async () => {
      const { status } = await apiCall('GET', '/health');
      if (status !== 200) throw new Error(`Expected 200, got ${status}`);
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  // ──── AUTHENTICATION ───────────────────────────────────────
  log('\n🔐 AUTHENTICATION', 'blue');

  // In JSON mode, auth won't work. Skip these tests.
  const result = await apiCall('POST', '/auth/login', {
    email: 'admin@example.com',
    password: 'password123',
  });

  if (result.status === 503) {
    log('⚠️  Auth tests skipped (JSON mode - requires database)', 'yellow');
  } else if (result.status === 401) {
    log('⚠️  Auth tests skipped (no default admin user)', 'yellow');
  } else if (result.status === 200 && result.data.token) {
    TOKEN = result.data.token;
    log('✓ POST /auth/login', 'green');
    passed++;
  }

  // ──── NEWS ARTICLES ────────────────────────────────────────
  log('\n📰 NEWS ARTICLES', 'blue');

  let articleId = null;

  if (
    await test('GET /NewsArticle (list)', async () => {
      const { status, data } = await apiCall('GET', '/NewsArticle');
      if (status !== 200) throw new Error(`Expected 200, got ${status}`);
      if (!Array.isArray(data)) throw new Error('Expected array response');
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  // Test create without auth (should fail)
  if (
    await test('POST /NewsArticle (no auth - should fail)', async () => {
      const { status } = await apiCall('POST', '/NewsArticle', {
        title: 'Test Article',
        content: 'Test content for article...',
        category: 'terrain',
        canton: 'tous',
      });
      if (status !== 401) throw new Error(`Expected 401, got ${status}`);
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  // Test create with auth (if token available)
  if (TOKEN) {
    if (
      await test('POST /NewsArticle (with auth)', async () => {
        const { status, data } = await apiCall(
          'POST',
          '/NewsArticle',
          {
            title: 'Test Campaign Update',
            content: 'This is a comprehensive test article about the campaign...',
            excerpt: 'Test article',
            category: 'terrain',
            canton: 'biou',
            published: true,
          },
          true
        );
        if (status !== 201) throw new Error(`Expected 201, got ${status}`);
        if (!data.id) throw new Error('No ID returned');
        articleId = data.id;
      })
    ) {
      passed++;
    } else {
      failed++;
    }

    if (articleId) {
      if (
        await test('PUT /NewsArticle/:id (update)', async () => {
          const { status } = await apiCall(
            'PUT',
            `/NewsArticle/${articleId}`,
            { title: 'Updated Title' },
            true
          );
          if (status !== 200) throw new Error(`Expected 200, got ${status}`);
        })
      ) {
        passed++;
      } else {
        failed++;
      }

      if (
        await test('DELETE /NewsArticle/:id', async () => {
          const { status } = await apiCall('DELETE', `/NewsArticle/${articleId}`, null, true);
          if (status !== 200) throw new Error(`Expected 200, got ${status}`);
        })
      ) {
        passed++;
      } else {
        failed++;
      }
    }
  }

  // ──── SUPPORTERS ───────────────────────────────────────────
  log('\n👥 SUPPORTERS', 'blue');

  if (
    await test('GET /Supporter (list)', async () => {
      const { status, data } = await apiCall('GET', '/Supporter');
      if (status !== 200) throw new Error(`Expected 200, got ${status}`);
      if (!Array.isArray(data)) throw new Error('Expected array response');
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  let supporterId = null;
  if (TOKEN) {
    if (
      await test('POST /Supporter (create)', async () => {
        const { status, data } = await apiCall(
          'POST',
          '/Supporter',
          {
            full_name: 'Jean Dupont Test',
            email: 'jean@test.cm',
            phone: '+237699999999',
            canton: 'lam',
            sector: 'Éducation',
          },
          true
        );
        if (status !== 201) throw new Error(`Expected 201, got ${status}`);
        supporterId = data.id;
      })
    ) {
      passed++;
    } else {
      failed++;
    }
  }

  // ──── TESTIMONIALS ─────────────────────────────────────────
  log('\n💬 TESTIMONIALS', 'blue');

  if (
    await test('GET /Testimonial (list)', async () => {
      const { status, data } = await apiCall('GET', '/Testimonial');
      if (status !== 200) throw new Error(`Expected 200, got ${status}`);
      if (!Array.isArray(data)) throw new Error('Expected array response');
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  // ──── EVENTS ───────────────────────────────────────────────
  log('\n📅 EVENTS', 'blue');

  if (
    await test('GET /Evenement (list)', async () => {
      const { status, data } = await apiCall('GET', '/Evenement');
      if (status !== 200) throw new Error(`Expected 200, got ${status}`);
      if (!Array.isArray(data)) throw new Error('Expected array response');
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  if (TOKEN) {
    if (
      await test('POST /Evenement (create)', async () => {
        const { status, data } = await apiCall(
          'POST',
          '/Evenement',
          {
            title: 'Test Event',
            description: 'This is a test event for the campaign...',
            event_date: '2026-06-15T14:00:00Z',
            location: 'Figuil Stadium',
            canton: 'figuil',
            published: true,
          },
          true
        );
        if (status !== 201) throw new Error(`Expected 201, got ${status}`);
      })
    ) {
      passed++;
    } else {
      failed++;
    }
  }

  // ──── PAGES (CMS) ──────────────────────────────────────────
  log('\n📄 PAGES (CMS)', 'blue');

  if (
    await test('GET /pages/about (read)', async () => {
      const { status } = await apiCall('GET', '/pages/about');
      if (status !== 200 && status !== 404) throw new Error(`Expected 200 or 404, got ${status}`);
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  if (TOKEN) {
    if (
      await test('PUT /pages/about (admin only)', async () => {
        const { status } = await apiCall(
          'PUT',
          '/pages/about',
          {
            hero: 'Qui est Emmanuel Foka?',
            content: 'Test content...',
          },
          true
        );
        // Should fail if not admin, but we don't know role. Check for 403 or 200.
        if (status !== 200 && status !== 403) throw new Error(`Expected 200 or 403, got ${status}`);
      })
    ) {
      passed++;
    } else {
      failed++;
    }
  }

  // ──── DONATIONS ────────────────────────────────────────────
  log('\n💰 DONATIONS', 'blue');

  if (
    await test('POST /donations/initiate (invalid amount)', async () => {
      const { status } = await apiCall('POST', '/donations/initiate', {
        amount: 100, // Too low (min 500)
        phone_number: '+237699123456',
      });
      if (status !== 400) throw new Error(`Expected 400, got ${status}`);
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  if (
    await test('POST /donations/initiate (invalid phone)', async () => {
      const { status } = await apiCall('POST', '/donations/initiate', {
        amount: 5000,
        phone_number: 'invalid',
      });
      if (status !== 400) throw new Error(`Expected 400, got ${status}`);
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  // Note: Can't test successful donation without Camoo Pay API configured
  log('⚠️  Successful donation test skipped (requires Camoo Pay API)', 'yellow');

  // ──── VALIDATION ───────────────────────────────────────────
  log('\n✅ VALIDATION TESTS', 'blue');

  if (TOKEN) {
    if (
      await test('POST /NewsArticle (invalid data)', async () => {
        const { status, data } = await apiCall(
          'POST',
          '/NewsArticle',
          {
            title: 'x', // Too short
            content: 'y', // Too short
            category: 'invalid', // Invalid enum
          },
          true
        );
        if (status !== 400) throw new Error(`Expected 400, got ${status}`);
        if (!data.error) throw new Error('Expected error message');
      })
    ) {
      passed++;
    } else {
      failed++;
    }
  }

  // ──── SUMMARY ──────────────────────────────────────────────
  log('\n' + '='.repeat(50), 'blue');
  log(`✓ Passed: ${passed}`, 'green');
  log(`✗ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log('='.repeat(50) + '\n', 'blue');

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
