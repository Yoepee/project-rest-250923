package com.back.global.initData;

import com.back.standard.util.Ut;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.Transactional;

@Profile("dev")
@RequiredArgsConstructor
@Configuration
public class DevInitData {
    @Autowired
    @Lazy
    private DevInitData self;

    @Profile("dev")
    @Bean
    ApplicationRunner devInitDataApplicationRunner() {
        return arg -> {
            Ut.cmd.runAsync(
                    "npx{{DOT_CMD}}",
                    "--yes",
                    "--package", "typescript",
                    "--package", "openapi-typescript",
                    "openapi-typescript", "http://localhost:8080/v3/api-docs/apiV1",
                    "-o", "../frontend/src/lib/backend/apiV1/schema.d.ts"
            );
        };
    }

    //    @Profile("dev")
    @Transactional
    public void work3() {
        System.out.println("work3가 실행되었습니다.");
    }
}
