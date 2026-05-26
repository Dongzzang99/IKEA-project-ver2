// Swagger API 문서 기본 설정 파일
package com.portfolio.ikea.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI ikeaOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("IKEA Ordering System API")
                        .description("IKEA 주문 시스템 백엔드 API 문서")
                        .version("1.0.0"));
    }
}
