import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],     // React 플러그인 적용
  base:'/',       //배포하려는 서버 상황에 맞게 절대 경로로 설정(기본값:/)
  server: {
    port: 5173,   // 개발 서버 포트 설정 (기본값: 5173)
    open: true,   // 개발 서버 실행 시 자동으로 브라우저 열기 (디폴트: false)
  },
  build: {
    outDir: 'springboot/src/main/resources/static',   // 빌드 결과물 폴더 지정
  },
});