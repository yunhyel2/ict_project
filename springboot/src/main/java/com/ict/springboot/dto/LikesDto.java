package com.ict.springboot.dto;

import java.time.LocalDateTime;

import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.entity.LikesEntity;
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
public class LikesDto {

    private long id;
    private LocalDateTime createdAt;
    private UsersDto user;
    private long feedId;

    public LikesEntity toEntity(){
        UsersEntity usersEntity = user == null ? null : user.toEntity();
        FeedsEntity feedsEntity = FeedsEntity.builder().id(feedId).build();
        return LikesEntity.builder()
                        .id(id)
                        .createdAt(createdAt)
                        .user(usersEntity)
                        .feed(feedsEntity)
                        .build();
    }
    
    public static LikesDto toDto(LikesEntity lEntity){
        if(lEntity==null) return null;
        return LikesDto.builder()
                .id(lEntity.getId())
                .createdAt(lEntity.getCreatedAt())
                .user(UsersDto.toDto(lEntity.getUser()))
                .feedId(lEntity.getFeed().getId())
                .build();
    } 
} 