package com.pp.iescobar.sgestionserver.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter

@Configuration
@EnableAuthorizationServer
class AuthorizationServerConfig @Autowired constructor(
        val bCryptPasswordEncoder: BCryptPasswordEncoder,
        val authenticationManager: AuthenticationManager,
        val tokenInterceptor: TokenInterceptor
) : AuthorizationServerConfigurerAdapter() {

    override fun configure(security: AuthorizationServerSecurityConfigurer?) {
        // /oauth/token/
        security?.tokenKeyAccess("permitAll()")
                ?.checkTokenAccess("isAuthenticated()")
    }

    override fun configure(clients: ClientDetailsServiceConfigurer?) {
        clients?.inMemory()
                ?.withClient("sgestion-app")
                ?.secret(bCryptPasswordEncoder.encode("Password"))
                ?.scopes("read", "write")
                ?.authorizedGrantTypes("password", "refresh_token")
                ?.accessTokenValiditySeconds(3600)
                ?.refreshTokenValiditySeconds(3600)
    }

    override fun configure(endpoints: AuthorizationServerEndpointsConfigurer?) {
        val tokenEnhancerChain = TokenEnhancerChain()
        tokenEnhancerChain.setTokenEnhancers(listOf(tokenInterceptor, accessTokenConverter()))

        endpoints?.authenticationManager(authenticationManager)
                ?.accessTokenConverter(accessTokenConverter())
                ?.tokenEnhancer(tokenEnhancerChain)
    }

    @Bean
    fun accessTokenConverter(): JwtAccessTokenConverter {
        val jwtAccessTokenConverter = JwtAccessTokenConverter()
        jwtAccessTokenConverter.setSigningKey(RsaKeys.rsaPrivateKey)
        jwtAccessTokenConverter.setVerifierKey(RsaKeys.rsaPublicKey)
        return jwtAccessTokenConverter
    }

}
