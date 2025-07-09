package com.ict.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;




/** 	[!] 사이트 기본 페이지에서는 React dist를 실행하도록 한다.	 */
@Controller
@RequiredArgsConstructor
public class IndexController {

	@RequestMapping(value = {
		"/{path:^(?!api|assets|admin).*}",
    	"/{path:^(?!api|assets|admin).*}/**"
	})
	public String index(Model model) {
		return "static/index";
	}

	@GetMapping("/admin")
	public String admin(Model model) {
		return "templates/admin";
	}

}
