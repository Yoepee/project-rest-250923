package com.back.global.security;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.service.MemberService;
import com.back.global.Rq.Rq;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final MemberService memberService;
    private final Rq rq;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Member actor = rq.getActor();
        String apiKey = actor.getApiKey();
        String accessToken = memberService.genAccessToken(actor);

        rq.setCookie("apiKey", apiKey);
        rq.setCookie("accessToken", accessToken);

        String redicetUrl = "/";
        String stateParam = request.getParameter("state");

        if(stateParam != null) {
            String decodedStateParam = new String(Base64.getUrlDecoder().decode(stateParam), StandardCharsets.UTF_8);

            redicetUrl = decodedStateParam.split("#", 2)[0];
        }

        rq.sendRedirect(redicetUrl);
    }
}