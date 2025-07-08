package com.ict.springboot.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.service.UsersService;

import lombok.RequiredArgsConstructor;




/** 	[!] 사이트 기본 페이지에서는 React dist를 실행하도록 한다.	 */
@Controller
@RequiredArgsConstructor
public class IndexController {
	
	private final UsersService usersService;

	@GetMapping("*")
	public String index(Model model) {
		return "static/index";
	}

	@GetMapping("/admin")
	public String admin(Model model) {

		List<UsersDto> users = usersService.usersAll();
		model.addAttribute("users", users);
		return "templates/admin";
	}

	@GetMapping("/react")
	public String react() {
		return "redirect:/";
	}
	

}
