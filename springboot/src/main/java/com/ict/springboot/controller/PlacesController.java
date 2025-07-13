package com.ict.springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ict.springboot.dto.PlacesDto;
import com.ict.springboot.service.PlacesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/places")
@RequiredArgsConstructor
public class PlacesController {
    
    private final PlacesService placesService;

    //전체 조회
    @GetMapping("")
    public List<PlacesDto> getAllPlaces(@RequestParam Map<String, String> params) {
        
        return placesService.getAll();
    }

    //상세 조회
    @GetMapping("/{id}")
    public PlacesDto getPlacesById(@PathVariable Long id) {
        return placesService.getById(id);
    }

    //등록
    @PostMapping("")
    public PlacesDto createPlaces(@RequestBody PlacesDto dto) {
        return placesService.create(dto);
    } 

    //삭제
    @DeleteMapping("")
    public PlacesDto deletePlaces(@RequestBody PlacesDto dto) throws Exception {
        return placesService.delete(dto);
    }

}
