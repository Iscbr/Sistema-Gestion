package com.pp.iescobar.sgestionserver.config

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

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
                ?.antMatchers(HttpMethod.POST, "/SaleOrder/save")?.hasAnyRole("ADMIN", "SELLER")
                ?.antMatchers("/SaleOrder/**")?.hasRole("ADMIN")
                // Security for controller Intelligence only for Admins
                ?.antMatchers("/Intelligence/**")?.hasRole("ADMIN")
                // Any other request must be authenticated
                ?.anyRequest()?.authenticated()
                // Configuration Of CORS
                ?.and()?.cors()?.configurationSource(corsConfigurationSource())
    }

    @Bean
    fun corsFilterBean(): FilterRegistrationBean<CorsFilter> {
        val corsFilterBean = FilterRegistrationBean(CorsFilter(corsConfigurationSource()))
        corsFilterBean.order = Ordered.HIGHEST_PRECEDENCE
        return corsFilterBean
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val corsConfiguration = CorsConfiguration()
        corsConfiguration.allowedOrigins = listOf("http://localhost:8100")
        corsConfiguration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")
        corsConfiguration.allowCredentials = true
        corsConfiguration.allowedHeaders = listOf("Content-Type", "Authorization")

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", corsConfiguration)

        return source
    }
}
