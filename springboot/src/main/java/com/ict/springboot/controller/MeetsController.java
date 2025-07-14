package com.ict.springboot.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ict.springboot.dto.MeetsDto;
import com.ict.springboot.service.MeetsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meets")
public class MeetsController {
    
    private final MeetsService meetsService;


    @PostMapping("")
    public MeetsDto createMeet(@RequestBody MeetsDto dto){
        return meetsService.create(dto);
    }
    
}
