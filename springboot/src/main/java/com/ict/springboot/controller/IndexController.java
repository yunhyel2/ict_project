package com.ict.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/** 	[!] 사이트 기본 페이지에서는 React dist를 실행하도록 한다.	 */
@Controller
public class IndexController {
	
	@GetMapping("*")
	public String index(Model model) {
		return "static/index";
	}

	@GetMapping("/admin")
	public String admin(Model model) {
		return "templates/admin";
	}
}
