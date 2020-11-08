package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.Role
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository: CrudRepository<Role, Long>
