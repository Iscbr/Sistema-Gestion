package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.Users
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<Users, Long>
