package com.ict.springboot.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.service.AuthService;

import lombok.RequiredArgsConstructor;





// Controller랑 RestController의 차이점 : ResponseBody를 따로 적을 필요없이 무조건 데이터만 반환한다.
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/")
public class AuthController {
    private final AuthService authService;

    /** TODO:: 개발필요 */
    @PostMapping("login")
    public UsersDto login(UsersDto dto) {
        // UsersDto usersDto  = authService.login(dto);
        return null;
    }

    /** TODO:: 개발필요 */
    @PostMapping("logout")
    public UsersDto logout(UsersDto dto) {
        // UsersDto usersDto  = authService.logout(dto);
        return null;
    }
    
}
