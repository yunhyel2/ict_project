package com.ict.springboot.dto;

import java.time.LocalDateTime;


import com.ict.springboot.entity.PlacesEntity;
import com.ict.springboot.entity.PlacesEntity.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacesDto {
    private long id;
    private UsersDto user;
    private LocationsDto location;
    private String name;
    private String address; //행정동 주소 (프론트에서 받음)
    private String placeAddress; //상세 주소(장소의 진짜 주소)
    private String image;
    private Category category;
    private LocalDateTime createdAt;

    //DTO를 Entity로 변환하는 메서드
    public PlacesEntity toEntity() {
        return PlacesEntity.builder()
            .id(id)
            .user(user.toEntity())
            .location(location.toEntity())
            .name(name)
            .address(address)
            .image(image)
            .category(category)
            .createdAt(createdAt)
            .build();
    }

    //Entity를 DTO로 변환하는 메서드
    public static PlacesDto toDto(PlacesEntity placesEntity) {
        if(placesEntity==null) return null;
        return PlacesDto.builder()
        .id(placesEntity.getId())
        .user(UsersDto.toDto(placesEntity.getUser()))
        .location(LocationsDto.toDto(placesEntity.getLocation()))
        .name(placesEntity.getName())
        .address(placesEntity.getAddress())
        .image(placesEntity.getImage())
        .category(placesEntity.getCategory())
        .createdAt(placesEntity.getCreatedAt())
        .build();
    }
}



