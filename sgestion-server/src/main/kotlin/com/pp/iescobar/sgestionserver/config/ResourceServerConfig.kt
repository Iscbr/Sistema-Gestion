package com.pp.iescobar.sgestionserver.config

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter

@Configuration
@EnableResourceServer
class ResourceServerConfig : ResourceServerConfigurerAdapter() {

    override fun configure(http: HttpSecurity?) {
        http?.authorizeRequests()
                // Security for controller Item
                ?.antMatchers(HttpMethod.GET, "/Item/GetAll")?.hasAnyRole("ADMIN", "SELLER")
                ?.antMatchers(HttpMethod.GET, "/Item/Get/{id}")?.hasAnyRole("ADMIN", "SELLER")
                ?.antMatchers("/Item/**")?.hasRole("ADMIN")
                // Security for controller SaleOrder
                ?.antMatchers(HttpMethod.GET, "/SaleOrder/GetAll")?.hasAnyRole("ADMIN", "SELLER")
                ?.antMatchers(HttpMethod.GET, "/SaleOrder/Get/{id}")?.hasAnyRole("ADMIN", "SELLER")
                ?.antMatchers("/SaleOrder/**")?.hasRole("ADMIN")
                // Any other request must be authenticated
                ?.anyRequest()?.authenticated()
    }
}
