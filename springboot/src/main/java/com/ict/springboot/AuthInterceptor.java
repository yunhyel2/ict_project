package com.ict.springboot;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AuthInterceptor implements HandlerInterceptor{

    @Override // preHandle : 컨트롤러 실행 전 처리
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        HttpSession session= request.getSession();
        String uri=request.getRequestURI();

        if(uri.contains("/feeds") || uri.contains("/meets") || uri.contains("/admin")){
                Object object = session.getAttribute("user");
            if( object == null ) {// 로그인이 안된 경우
                response.sendRedirect("/");
                return false; // 요청을 컨트롤러에게 전달하지 않음
            }
        }
        return true;  // 요청을 컨트롤러에게 전달
    }

    @Override // postHandle : 컨트롤러 실행 후, 뷰 렌더링 전 
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
    }

    @Override // afterCompletion : 뷰 렌더링 이후 (예외포함)
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }
}