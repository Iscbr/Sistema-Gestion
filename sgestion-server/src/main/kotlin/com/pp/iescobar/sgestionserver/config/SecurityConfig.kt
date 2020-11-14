package com.pp.iescobar.sgestionserver.config

import com.pp.iescobar.sgestionserver.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@EnableWebSecurity
class SecurityConfig @Autowired constructor(
        val userService: UserService
) : WebSecurityConfigurerAdapter() {

    @Bean
    fun getPasswordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()

    @Autowired
    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.userDetailsService(userService)?.passwordEncoder(getPasswordEncoder())
    }

    override fun configure(http: HttpSecurity?) {
        http?.requiresChannel()
                ?.anyRequest()
                ?.requiresSecure()
                ?.and()
                ?.csrf()?.disable()
                ?.sessionManagement()?.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    @Bean
    override fun authenticationManager(): AuthenticationManager {
        return super.authenticationManager()
    }
}
