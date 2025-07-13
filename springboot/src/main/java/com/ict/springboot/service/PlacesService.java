package com.ict.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.LocationsDto;
import com.ict.springboot.dto.PlacesDto;
import com.ict.springboot.entity.PlacesEntity;
import com.ict.springboot.repository.PlacesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlacesService {

    private final PlacesRepository placesRepository;
    private final LocationsService locationsService;

    //전체 조회
    public List<PlacesDto> getAll() {
        List<PlacesEntity> placesEntities = placesRepository.findAll();
        return placesEntities.stream().map(entity -> PlacesDto.toDto(entity)).collect(Collectors.toList());
    }

    //상세 조회
    public PlacesDto getById(Long id) {
        Optional<PlacesEntity> placesEntity = placesRepository.findById(id);
        return PlacesDto.toDto(placesEntity.orElseGet(() -> null));
    }

    //등록
    public PlacesDto create(PlacesDto dto) {
        boolean isDuplicated = placesRepository.existsById(dto.getId());
        if(isDuplicated) return null;
        LocationsDto location = locationsService.findOrCreate(dto.getAddress());
        dto.setLocation(location);
        PlacesEntity placesEntity = placesRepository.save(dto.toEntity());
        return PlacesDto.toDto(placesEntity);
    }

    //삭제
    public PlacesDto delete(PlacesDto dto) throws Exception {
        if (placesRepository.existsById(dto.getId())) {
            try{
                placesRepository.deleteById(dto.getId());
            }
            catch (Exception e) {
                throw new Exception("데이터 삭제에 문제가 생겼습니다.");
            }
        }
        return dto;
    }
    
    //중복 조회
    public boolean checkExists(String name) {
        return placesRepository.existsByName(name);
    }
}
