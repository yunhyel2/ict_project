package com.ict.springboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomResourceConfig implements WebMvcConfigurer {

	//정적 리스소 설정을 추가 할수 있다
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		/*
		 <<<1. add-mappings: false로 설정시(application.yml)  >>
		 정적 자원의 디폴트 설정(URL 패턴 및 물리적 위치 설정)이 적용이 안된다
		 이때 자바코드로 설정을 추가 할수 있다		 
		 */
		//registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");//기본 설정
		//<<<2. 정적 자원의 기본 설정에 새로운 URL패턴 및 물리적 위치 추가 >>>
		registry.addResourceHandler("/myresource/**").addResourceLocations("classpath:/mystatic");
		
	}

	
	
}
