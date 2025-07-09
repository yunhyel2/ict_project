package com.ict.springboot.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.service.UsersService;

import lombok.RequiredArgsConstructor;





@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/users")
public class UsersAdminController {
    private final UsersService usersService;

    @GetMapping("")
    public String listPage() {
        System.out.println("test");
        return "templates/users/list";
    }

    @GetMapping("/create")
    public String createPage() {
        return "templates/users/create";
    }

    @PostMapping("/create")
    public String signupProcess(@ModelAttribute(name = "users") UsersDto usersDto, Model model) {
        UsersDto user = usersService.create(usersDto);
        if(user != null) return "redirect:/admin/users";
        model.addAttribute("errorMessage", "이미 존재하는 아이디 입니다.");
        return "forward:templates/users/create";
    }
    
}
