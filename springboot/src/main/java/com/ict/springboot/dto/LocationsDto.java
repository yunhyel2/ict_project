package com.ict.springboot.dto;

import com.ict.springboot.entity.LocationsEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationsDto {
    private long id;
    private String location;

    public LocationsEntity toEntity() {
        return LocationsEntity.builder()
                .id(id)
                .location(location)
                .build();
    }

    public static LocationsDto toDto(LocationsEntity entity) {
        if(entity == null) return null;
        return LocationsDto.builder()
                .id(entity.getId())
                .location(entity.getLocation())
                .build();
    }

}
