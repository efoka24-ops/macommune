// HTTP-based API client — data is persisted in JSON files via the Express server

async function apiCall(method, url, body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  
  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

function createEntityApi(entityName) {
  const base = `/api/${entityName}`;
  return {
    async list(sortField) {
      const url = sortField ? `${base}?sort=${encodeURIComponent(sortField)}` : base;
      return apiCall('GET', url);
    },
    async create(newItem) {
      return apiCall('POST', base, newItem);
    },
    async update(id, updates) {
      return apiCall('PUT', `${base}/${id}`, updates);
    },
    async delete(id) {
      return apiCall('DELETE', `${base}/${id}`);
    },
  };
}

export const base44 = {
  entities: {
    NewsArticle: createEntityApi('NewsArticle'),
    Supporter: createEntityApi('Supporter'),
    Testimonial: createEntityApi('Testimonial'),
    Badge: createEntityApi('Badge'),
    Evenement: createEntityApi('Evenement'),
    Donation: createEntityApi('Donation'),
  },
  pages: {
    async get(pageKey) {
      return apiCall('GET', `/api/pages/${pageKey}`);
    },
    async update(pageKey, data) {
      return apiCall('PUT', `/api/pages/${pageKey}`, data);
    }
  }
};
