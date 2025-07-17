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

import com.ict.springboot.dto.CommentsDto;
import com.ict.springboot.dto.FeedsDto;
import com.ict.springboot.service.CommentsService;
import com.ict.springboot.service.FeedsService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
public class FeedsController {
    private final FeedsService feedsService;
    private final CommentsService commentsService;

    //전체 조회
    @GetMapping("")
    public List<FeedsDto> getAllUser(@RequestParam Map<String,String> params){
    return feedsService.getAll();
    }
    //상세 조회
    @GetMapping("/{id}")
    public FeedsDto getById(@PathVariable Long id){
        FeedsDto feed = feedsService.getById(id);
        if (feed == null) {
            throw new EntityNotFoundException("피드를 찾을 수 없습니다.");
        }
        return feed;
    }
    //등록
    @PostMapping("")
    public FeedsDto createFeed(@RequestBody FeedsDto dto){
        return feedsService.create(dto);
    }
    //삭제
    @DeleteMapping("/{id}")
    public FeedsDto deleteFeed(@PathVariable Long id) throws Exception{
        return feedsService.delete(id);
    }

    // 좋아요 토글
    @PostMapping("/{feedId}/like")
    public boolean toggleLike(@PathVariable Long feedId, @RequestParam Long userId) {
        return feedsService.toggleLike(feedId, userId);
    }

    // 좋아요 수 조회
    @GetMapping("/{feedId}/likes")
    public long getLikeCount(@PathVariable Long feedId) {
        return feedsService.getLikeCount(feedId);
    }

    // 사용자 좋아요 여부 확인
    @GetMapping("/{feedId}/like/check")
    public boolean isLikedByUser(@PathVariable Long feedId, @RequestParam Long userId) {
        return feedsService.isLikedByUser(feedId, userId);
    }

    // 댓글 조회
    @GetMapping("/{feedId}/comments")
    public List<CommentsDto> getComments(@PathVariable Long feedId) {
        return commentsService.getCommentsByFeedId(feedId);
    }

    // 댓글 생성
    @PostMapping("/{feedId}/comments")
    public CommentsDto createComment(@PathVariable Long feedId, @RequestBody CommentsDto dto) {
        dto.setFeedId(feedId);
        return commentsService.createComment(dto);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Long commentId, @RequestParam Long userId) {
        commentsService.deleteComment(commentId, userId);
    }
}
