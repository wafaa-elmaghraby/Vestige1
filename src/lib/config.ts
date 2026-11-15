// Runtime configuration
let runtimeConfig: {
  API_BASE_URL: string;
} | null = null;

let configLoading = false;

const defaultConfig = {
  API_BASE_URL: 'http://127.0.0.1:8000',
};

// Function to load runtime configuration when explicitly enabled
export async function loadRuntimeConfig(): Promise<void> {
  if (import.meta.env.VITE_RUNTIME_CONFIG_ENABLED !== 'true') {
    configLoading = false;
    return;
  }
  configLoading = true;
  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        runtimeConfig = await response.json();
      }
    }
  } catch {
    // Fall back to Vite env / defaults when no runtime config endpoint is present
  } finally {
    configLoading = false;
  }
}

export function getConfig() {
  if (configLoading) {
    return defaultConfig;
  }

  if (runtimeConfig) {
    return runtimeConfig;
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    return {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    };
  }

  return defaultConfig;
}

export function getAPIBaseURL(): string {
  const baseURL = getConfig().API_BASE_URL;
  if (baseURL === '/') {
    return '';
  }
  return baseURL;
}

export const config = {
  get API_BASE_URL() {
    return getAPIBaseURL();
  },
};
