package com.ict.springboot.dto;

import java.time.LocalDateTime;

import com.ict.springboot.entity.CommentsEntity;
import com.ict.springboot.entity.FeedsEntity;
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
public class CommentsDto {

    private long id;
    private String content;
    private LocalDateTime createdAt;
    private UsersDto user;
    private long feedId;

    public CommentsEntity toEntity(){
        UsersEntity usersEntity = user == null ? null : user.toEntity();
        FeedsEntity feedsEntity = FeedsEntity.builder().id(feedId).build();
        return CommentsEntity.builder()
                        .id(id)
                        .content(content)
                        .createdAt(createdAt)
                        .user(usersEntity)
                        .feed(feedsEntity)
                        .build();
    }
    
    public static CommentsDto toDto(CommentsEntity cEntity){
        if(cEntity==null) return null;
        return CommentsDto.builder()
                .id(cEntity.getId())
                .content(cEntity.getContent())
                .createdAt(cEntity.getCreatedAt())
                .user(UsersDto.toDto(cEntity.getUser()))
                .feedId(cEntity.getFeed().getId())
                .build();
    } 
} 