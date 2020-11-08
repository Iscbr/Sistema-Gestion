package com.pp.iescobar.sgestionserver

import com.pp.iescobar.sgestionserver.entity.Role
import com.pp.iescobar.sgestionserver.entity.Users
import com.pp.iescobar.sgestionserver.repository.RoleRepository
import com.pp.iescobar.sgestionserver.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class ApplicationStatup @Autowired constructor(
        val userRepository: UserRepository,
        val roleRepository: RoleRepository
): CommandLineRunner {

    override fun run(vararg args: String?) {
         val roles = if (roleRepository.findAll().toList().isEmpty()) {
            val adminRole = Role(null, "ADMIN", "Role for system admins.")
            val sellerRole = Role(null, "SELLER", "Role for sellers.")
            roleRepository.saveAll(listOf(adminRole, sellerRole)).toList()
        } else {
            roleRepository.findAll().toList()
        }

        if (userRepository.findAll().toList().isEmpty()) {
            val admin = Users(null, "SGestion Admin", "SGestion Admin", "SGestion Admin", "admin@sgestion.com", "admin", roles)
            userRepository.save(admin)
        }
    }
}
