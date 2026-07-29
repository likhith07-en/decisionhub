package com.decisionhub.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI decisionHubOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("DecisionHub API")
                .description("Sample API for the DecisionHub platform")
                .version("1.0.0"));
    }
}
