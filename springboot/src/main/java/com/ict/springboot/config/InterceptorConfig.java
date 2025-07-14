package com.ict.springboot.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ict.springboot.AuthInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry
            .addInterceptor(new AuthInterceptor()) // 인터셉터 등록
            .addPathPatterns(List.of("/api/**","/admin/**")); // 경로 지정 ※루트('/')지정시 무한루프 발생(리다이렉트를 '/'로 해놓아서)
    }
}
