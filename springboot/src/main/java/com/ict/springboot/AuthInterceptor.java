package com.ict.springboot;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AuthInterceptor implements HandlerInterceptor{

    @Override // preHandle : 컨트롤러 실행 전 처리
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        
        /** Postman 요청이면 통과되도록 한다. TODO:: 나중에 없앤다. */
        String userAgent = request.getHeader("User-Agent");
        if (userAgent != null && userAgent.contains("PostmanRuntime")) {
            return true;
        }

        HttpSession session= request.getSession();
        String uri=request.getRequestURI();
        
        if(uri.contains("/feeds") || uri.contains("/meets") || uri.contains("/admin")){

            Object authUser = session.getAttribute("user");
            if(authUser == null) {  // 로그인이 안된 경우
                response.sendRedirect("/");
                return false;   // 요청을 컨트롤러에게 전달하지 않음
            }
        }
        return true;  // 요청을 컨트롤러에게 전달
    }

    @Override // postHandle : 컨트롤러 실행 후, 뷰 렌더링 전 
    public void postHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    @Override // afterCompletion : 뷰 렌더링 이후 (예외포함)
    public void afterCompletion(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler, @Nullable Exception ex) throws Exception {
    }
}