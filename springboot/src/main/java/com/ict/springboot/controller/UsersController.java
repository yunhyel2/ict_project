package com.ict.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.service.UsersService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;







@Controller
@RequiredArgsConstructor
public class UsersController {
    private final UsersService usersService;

    
    @RequestMapping(path = "/signup",method = {RequestMethod.GET,RequestMethod.POST})
    public String signup() {
        return "templates/signup";
    }

    @PostMapping("/signupProcess")
    public String signupProcess(@ModelAttribute(name = "users") UsersDto usersDto,Model model) {
        boolean isSignUp = usersService.signUp(usersDto);
        if(isSignUp) return "redirect:/admin";
        
        //model.addAttribute("errorMessage", "이미 존재하는 아이디 입니다.");
        return "forward:/signup";
    }
    
    @GetMapping("/api/login")
    @ResponseBody
    public UsersDto login(UsersDto dto) {
        System.out.println("요청은 들어 오는지");
        UsersDto usersDto  = usersService.loginTry(dto);
        System.out.println(usersDto);
        return usersDto;
    }


    /* TODO:: 아래와 합쳐서 하나의 프로세스로 구축한다. */
    @GetMapping("/api/register")
    @ResponseBody
    public boolean registerGet(@RequestParam String accountId) {
        System.out.println("요청은 들어 오는지");
        boolean isDuplicated = usersService.registerTry(accountId);

        return isDuplicated;
    }

    @PostMapping("/api/register")
    @ResponseBody
    public UsersDto registerPost(@RequestBody UsersDto dto) {
        System.out.println("요청은 들어 오는지2");
        UsersDto usersDto = usersService.register(dto);

        return usersDto;
    }
    
    
}
