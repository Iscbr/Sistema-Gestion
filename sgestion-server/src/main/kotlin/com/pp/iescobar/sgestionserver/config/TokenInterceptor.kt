package com.pp.iescobar.sgestionserver.config

import com.pp.iescobar.sgestionserver.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
import org.springframework.security.oauth2.common.OAuth2AccessToken
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.security.oauth2.provider.token.TokenEnhancer
import org.springframework.stereotype.Component

@Component
class TokenInterceptor @Autowired constructor(
        private val userService: UserService
): TokenEnhancer {

    override fun enhance(accessToken: OAuth2AccessToken, authentication: OAuth2Authentication): OAuth2AccessToken =
        userService.loadUserByEmail(authentication.name)?.let {
            val newValues = HashMap<String, Any>()
            newValues["name"] = it.name
            newValues["first_name"] = it.firstName
            newValues["second_name"] = it.secondName
            val cast = accessToken as DefaultOAuth2AccessToken
            cast.additionalInformation = newValues
            accessToken
        } ?: accessToken

}
