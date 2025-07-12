package com.ict.springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ict.springboot.dto.FeedsDto;
import com.ict.springboot.service.FeedsService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
public class FeedsController {
    private final FeedsService feedsService;

    //전체 조회
    @GetMapping("")
    public List<FeedsDto> getAllUser(@RequestParam Map<String,String> params){
    return feedsService.getAll();
    }
    //상세 조회
    @GetMapping("/{id}")
    public FeedsDto getById(@PathVariable Long id){
        return feedsService.getById(id);
    }
    //등록
    @PostMapping("")
    public FeedsDto createFeed(@RequestBody FeedsDto dto){
        return feedsService.create(dto);
    }
    //삭제
    @DeleteMapping("")
    public FeedsDto deleteFeed(@RequestBody FeedsDto dto) throws Exception{
        return feedsService.delete(dto);
    }


}
