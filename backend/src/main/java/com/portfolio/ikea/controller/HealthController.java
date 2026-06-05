// 서버 상태 확인 API 컨트롤러 파일
package com.portfolio.ikea.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// 배포 후 서버가 정상적으로 살아있는지 확인하는 요청 처리
@RequestMapping("/api/health")
public class HealthController {

    // 서버 실행 상태를 빠르게 확인
    @Operation(summary = "서버 상태 확인", description = "배포 후 백엔드 서버가 정상적으로 응답하는지 확인하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "서버 상태 확인 성공")
    })
    @GetMapping
    public Map<String, Object> health() {
        return Map.of(
                "status", "ok",
                "service", "ikea-ordering-backend",
                "checkedAt", LocalDateTime.now()
        );
    }
}
