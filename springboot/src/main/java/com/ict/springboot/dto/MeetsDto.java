package com.ict.springboot.dto;

import java.time.LocalDateTime;

import com.ict.springboot.entity.MeetsEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetsDto {
    private long id;
    private String title;
    private String content;
    private String category;
    private int goal;
    private LocalDateTime meetDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isActive;

    private UsersDto user;
    private LocationsDto location;

    public MeetsEntity toEntity(){
        if(location == null) return null;
        return MeetsEntity.builder()
                        .id(id)
                        .title(title)
                        .content(content)
                        .category(category)
                        .goal(goal)
                        .meetDate(meetDate)
                        .createdAt(createdAt)
                        .updatedAt(updatedAt)
                        .isActive(isActive)
                        .user(user.toEntity())
                        .location(location.toEntity()).build();        
    }

    public static MeetsDto toDto(MeetsEntity mEntity){
        if(mEntity==null) return null;
        return MeetsDto.builder()
                        .id(mEntity.getId())
                        .title(mEntity.getTitle())
                        .content(mEntity.getContent())
                        .category(mEntity.getCategory())
                        .goal(mEntity.getGoal())
                        .meetDate(mEntity.getMeetDate())
                        .createdAt(mEntity.getCreatedAt())
                        .updatedAt(mEntity.getUpdatedAt())
                        .isActive(mEntity.isActive())
                        .user(UsersDto.toDto(mEntity.getUser()))
                        .location(LocationsDto.toDto(mEntity.getLocation())).build();     
    }


}
