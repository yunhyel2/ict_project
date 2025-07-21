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

import com.ict.springboot.dto.FeedCommentsDto;
import com.ict.springboot.dto.FeedsDto;
import com.ict.springboot.service.FeedCommentsService;
import com.ict.springboot.service.FeedsService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feeds")
public class FeedsController {
    private final FeedsService feedsService;
    private final FeedCommentsService commentsService;

    //전체 조회
    @GetMapping("")
    public List<FeedsDto> getAllFeeds(
        @RequestParam(defaultValue = "0") int page, //  페이지
        @RequestParam(defaultValue = "0") int size, //  페이지당 받는 객체 수
        HttpSession session
    ){
        System.out.println(size);
        if (size != 0) {
            System.out.println("test");
            return feedsService.getFeedsWithPagination(page, size, session);
        }
        return feedsService.getAll(session);
    }
    
    // 반응 좋은 순 조회
    @GetMapping("/top")
    public List<FeedsDto> getFeedsForMain(@PathVariable int limit, HttpSession session){
        return feedsService.getHotFeedsRecent(limit, session);
    }

    //상세 조회
    @GetMapping("/{id}")
    public FeedsDto getById(@PathVariable Long id, HttpSession session){
        FeedsDto feed = feedsService.getById(id, session);
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

    // 댓글 조회
    @GetMapping("/{feedId}/comments")
    public List<FeedCommentsDto> getComments(@PathVariable Long feedId) {
        return commentsService.getCommentsByFeedId(feedId);
    }

    // 댓글 생성
    @PostMapping("/{feedId}/comments")
    public FeedCommentsDto createComment(@PathVariable Long feedId, @RequestBody FeedCommentsDto dto) {
        dto.setFeedId(feedId);
        return commentsService.createComment(dto);
    }

    // 댓글 삭제
    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Long commentId, @RequestParam Long userId) {
        commentsService.deleteComment(commentId, userId);
    }
}
