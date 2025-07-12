package com.ict.springboot.dto;

import java.time.LocalDateTime;

import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.entity.LocationsEntity;
import com.ict.springboot.entity.UsersEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedsDto {

    private long id;
    private String image;
    private String content;
   
    @Builder.Default
    private String role = "FEED";

    private LocalDateTime createdAt;
    private UsersDto user;
    private LocationsDto location;

    public FeedsEntity toEntity(){
        UsersEntity usersEntity = user == null ? null : user.toEntity();
        LocationsEntity locationsEntity = location == null ? null : location.toEntity();
        return FeedsEntity.builder()
                        .id(id)
                        .image(image)
                        .content(content)
                        .createdAt(createdAt)
                        .user(usersEntity)
                        .location(locationsEntity)
                        .build();
    }
    
    public static FeedsDto todDto(FeedsEntity fEntity){
        if(fEntity==null) return null;
        return FeedsDto.builder()
                .id(fEntity.getId())
                .image(fEntity.getImage())
                .content(fEntity.getContent())
                .createdAt(fEntity.getCreatedAt())
                .user(UsersDto.toDto(fEntity.getUser()))
                .location(LocationsDto.toDto(fEntity.getLocation()))
                .build();

    } 
}