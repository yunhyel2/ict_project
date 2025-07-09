package com.ict.springboot.dto;

import java.time.LocalDateTime;

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
public class UsersDto {
    private long id;
    private String userId;
    private String password;
    private String name;
    private String address;
    private String gender;

    @Builder.Default
    private String role = "USER";

    private String profileImage;
    private LocalDateTime createdAt;
    private LocationsDto location;

    public UsersEntity toEntity(){
        LocationsEntity loc = location == null ? null : location.toEntity();
        return UsersEntity.builder()
                        .id(id)
                        .userId(userId)
                        .password(password)
                        .name(name)
                        .gender(gender)
                        .role(role)
                        .profileImage(profileImage)
                        .createdAt(createdAt)
                        .location(loc)
                        .build();
    }

    public static UsersDto toDto(UsersEntity uEntity){
        if(uEntity==null) return null;
        return UsersDto.builder()
                    .id(uEntity.getId())
                    .userId(uEntity.getUserId())
                    .password(uEntity.getPassword())
                    .name(uEntity.getName())
                    .gender(uEntity.getGender())
                    .role(uEntity.getRole())
                    .profileImage(uEntity.getProfileImage())
                    .createdAt(uEntity.getCreatedAt())
                    .location(LocationsDto.toDto(uEntity.getLocation()))
                    .build();
    }
}
