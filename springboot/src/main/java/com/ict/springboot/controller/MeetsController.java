package com.ict.springboot.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    //<<게시글 생성>>
    @PostMapping("")
    public MeetsDto createMeet(@RequestBody MeetsDto dto){
        return meetsService.create(dto);
    }
    //<전체 게시글 조회(게시글 목록)>
    @GetMapping("")
    public List<MeetsDto> getMeetAll(){
        List<MeetsDto> meetsDtos = meetsService.meetAll();
        return meetsDtos; 
    }
    //<<상세 게시글 조회>>
    @GetMapping("/{id}")
    public MeetsDto getMeet(@PathVariable long id){
        return meetsService.getMeet(id);
    }

    //<<게시글 삭제>>
    @DeleteMapping("/{id}")
    public void deleteMeet(@PathVariable long id){
        meetsService.deleteMeet(id);
    }

    @PutMapping("/{id}")
    public MeetsDto updateMeet(@PathVariable String id,@RequestBody MeetsDto dto){
        return meetsService.updateMeet(dto);
    }

}
