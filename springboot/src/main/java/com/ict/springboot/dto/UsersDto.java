package com.ict.springboot.dto;

import java.time.LocalDateTime;

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
    private String accountId;
    private String password;
    private String userName;
    private String profileImage;
    private LocalDateTime createdAt;
    private int locationId;

    public UsersEntity toEntity(){
        return UsersEntity.builder()
                        .id(id)
                        .accountId(accountId)
                        .password(password)
                        .userName(userName)
                        .profileImage(profileImage)
                        .createdAt(createdAt)
                        .locationId(locationId).build();
    }

    public static UsersDto toDto(UsersEntity uEntity){
        if(uEntity==null) return null;
        return UsersDto.builder()
                    .id(uEntity.getId())
                    .accountId(uEntity.getAccountId())
                    .password(uEntity.getPassword())
                    .userName(uEntity.getUserName())
                    .profileImage(uEntity.getProfileImage())
                    .createdAt(uEntity.getCreatedAt())
                    .locationId(uEntity.getLocationId()).build();
    }
}
