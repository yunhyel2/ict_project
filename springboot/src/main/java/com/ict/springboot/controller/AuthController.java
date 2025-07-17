package com.ict.springboot.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.model.KakaoLoginApi;
import com.ict.springboot.service.AuthService;
import com.ict.springboot.service.KakaoUser;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

// Controller랑 RestController의 차이점 : ResponseBody를 따로 적을 필요없이 무조건 데이터만 반환한다.
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/")
public class AuthController {
    private final AuthService authService;
    
	// <<카카오 로그인 관련 키 주입받기>>
	@Value("${kakao.rest_api_key}")
	private String restApiKey;
	@Value("${kakao.redirect_uri}")
	private String redirectUri;
	@Value("${kakao.logout_redirect_uri}")
	private String logoutRedirectUri;

	private final RestTemplate restTemplate;
	
	@PostMapping("verify-password")
	public ResponseEntity<?> verifyPassword(@RequestBody UsersDto testDto, HttpSession session) {
		UsersDto loginUser = (UsersDto)session.getAttribute("user");
		if (!testDto.getAccount().equals(loginUser.getAccount())) {
			// 비밀번호 검증 시도하는 아이디와 로그인 아이디 불일치시 무조건 에러 반환 : 보안
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "정상적인 접근이 아닙니다."));
        }
		loginUser.setPassword(testDto.getPassword());
		UsersDto loginDto = authService.isUser(loginUser);
		if (loginDto == null) {
            // 검증 실패시 401 Unauthorized 상태 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "비밀번호가 틀립니다!"));
        }
        return ResponseEntity.ok(loginDto);
	}
	
	@GetMapping("login")
	public ResponseEntity<?> loginCheck(HttpSession session) {
		UsersDto loginDto = authService.findLoginUser((UsersDto)session.getAttribute("user"));

		//로그인 상태
		if (loginDto == null) return ResponseEntity.status(401).build();

		//로그인 상태
	    return ResponseEntity.ok(loginDto);
	}
	
    @PostMapping("login")
    public ResponseEntity<?> loginProcess(@RequestBody UsersDto user, HttpSession session) {
        // 로그인에 성공하면 정보를 담아서 보낼 dto를 통해 로그인 확인
        UsersDto loginDto = authService.isUser(user);

        if (loginDto == null) {
            // 로그인이 실패하면 401 Unauthorized 상태 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "회원 정보가 없습니다!"));
        }
        session.setAttribute("user", loginDto);
        System.out.println(loginDto.getAccount());
        System.out.println(loginDto.getName());

        // 로그인이 성공하면 dto를 반환한다.
        return ResponseEntity.ok(loginDto);
    }

    @GetMapping("logout")
    public void logout(HttpSession session, HttpServletResponse response)  throws IOException  {
    	session.invalidate();
    	KakaoLoginApi.kakaoAccountLogout(response, restApiKey, logoutRedirectUri);
    }
    
    @GetMapping("kakaoLogin")
    //리다이렉트를 해주지 않으면 데이터만 보여지는 페이지가 남는다.
    //public ResponseEntity<?> KakaoLogin(@RequestParam String code, HttpSession session) {
    public void KakaoLogin(@RequestParam String code, HttpSession session , HttpServletResponse response) throws IOException {
    		
    	//액세스 토큰을 생성하고 그걸 이용해서 카카오 유저 가져오기
		String accessToken = KakaoLoginApi.getAccessToken(restTemplate, code, restApiKey, redirectUri);
		KakaoUser kakaoUser = KakaoLoginApi.getKakaoUser(restTemplate, accessToken);
		long id = kakaoUser.getId();
		String nickname = kakaoUser.getProperties().getNickname();
		
		//카카오 로그인 정보로 dto 생성
		UsersDto kakaoDto = UsersDto.builder()
				.account(String.valueOf(id))
				.password("-")
				.name(nickname)
				.profileImage(kakaoUser.getProperties().getThumbnail_image())
				.build();

		// 해당 카카오 고유 ID의 회원이 있는지 체크하고 없으면 회원 DB에 저장
		authService.saveUser(kakaoDto);

		session.setAttribute("user", kakaoDto);	// 로그인 처리

		response.sendRedirect("/");

		//데이터만 남아서 보여지는 페이지
        //return ResponseEntity.ok(Map.of("message", "로그인 성공", "user", kakaoDto));
    }
    

}

