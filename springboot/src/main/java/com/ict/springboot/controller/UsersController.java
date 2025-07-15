package com.ict.springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.service.UsersService;

import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UsersController {
    private final UsersService usersService;

    // 전체조회 (데이터 여러개)
    @GetMapping("")
    public List<UsersDto> getAllUser(@RequestParam Map<String, String> params) {
        if (params != null) {   // ? 붙은 파라미터로 검색 기능을 전체 조회에서 구현한다 (안해도 무방)
            return usersService.searchByParams(params);
        }
        return usersService.getAll();
    }

    // 상세조회 (데이터 하나만)
    @GetMapping("/{account}")
    public UsersDto getUserByID(@PathVariable String account) {
        return usersService.getByAccount(account);
    }

    // 등록
    @PostMapping("")
    public UsersDto createUser(@RequestBody UsersDto dto) {
        return usersService.create(dto);
    }

    // 수정
    @PutMapping("/{account}")
    public UsersDto updateUser(@PathVariable String account, @RequestBody UsersDto dto) {
        return usersService.update(account, dto);
    }

    // 삭제
    @DeleteMapping("/{account}")
    public UsersDto deleteUser(@PathVariable String account) throws Exception {
        return usersService.delete(account);
    }
    
}
