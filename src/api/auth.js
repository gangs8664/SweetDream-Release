import axios from 'axios';

// localhost 대신 백엔드 서버의 실제 IP 주소를 사용해야 함
const BASE_URL = '/api';  // 프록시 경로 사용
// 예: const BASE_URL = 'http://192.168.0.100:8081';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false,
  timeout: 10000,
  // 추가 설정
  maxRedirects: 0,
  validateStatus: function (status) {
    return true; // 모든 상태 코드 허용
  },
  // 디버깅을 위한 설정
  onUploadProgress: (progressEvent) => {
    console.log('Upload Progress:', progressEvent);
  },
  onDownloadProgress: (progressEvent) => {
    console.log('Download Progress:', progressEvent);
  }
});

// 더 자세한 에러 로깅
axiosInstance.interceptors.request.use(request => {
  console.log('🔍 Starting Request:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data,
    baseURL: request.baseURL,
    timeout: request.timeout
  });
  return request;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log('🔍 Detailed Error:', {
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers,
        timeout: error.config?.timeout
      },
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: async (userData) => {
    try {
      console.log('📤 Sending signup request:', userData);
      
      const signupPromise = Promise.race([
        fetch(`${BASE_URL}/accounts/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(userData)
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('요청 시간이 초과되었습니다 (3초)')), 3000)
        )
      ]);

      const response = await signupPromise;

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      console.log('📥 Signup success:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Signup failed:', error);
      throw error;
    }
  },

  signin: async (username, password) => {  // login -> signin으로 변경
    try {
      const response = await axiosInstance.post('/accounts/signin', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed.');
    }
  },

  findId: async (email) => {
    try {
      const response = await axiosInstance.post('/accounts/find-id', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to find ID.');
    }
  },

  resetPassword: async (email) => {
    try {
      const response = await axiosInstance.post('/accounts/reset-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password.');
    }
  }
};
