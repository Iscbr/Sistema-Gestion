package com.pp.iescobar.sgestionserver.service

import com.pp.iescobar.sgestionserver.entity.Users
import com.pp.iescobar.sgestionserver.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService @Autowired constructor(
        private val userRepository: UserRepository
): UserDetailsService {

    @Transactional(readOnly = true)
    override fun loadUserByUsername(email: String?): UserDetails? {
        val user = email?.let { loadUserByEmail(it) } ?: throw UsernameNotFoundException("User does not exist")
        val authorities = user.roles.map { SimpleGrantedAuthority("ROLE_${it.name}") }
        return User(user.email, user.password, user.active, true, true, true, authorities)
    }

    @Transactional(readOnly = true)
    fun loadUserByEmail(email: String?): Users? = email?.let { userRepository.findByEmail(it) }

}
