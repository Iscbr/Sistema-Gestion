package com.pp.iescobar.sgestionserver.entity

import java.io.Serializable
import javax.persistence.*

@Entity
class Users(
        @Id @GeneratedValue var id: Long? = null,
        @Column(length = 100) var name: String,
        @Column(length = 100) var firstName: String,
        @Column(length = 100) var secondName: String,
        @Column(length = 100, unique = true) var email: String,
        @Column(length = 500) var password: String,
        @ManyToMany
        @JoinTable(
                name = "user_role",
                joinColumns = [JoinColumn(name = "user_id")],
                inverseJoinColumns = [JoinColumn(name = "role_id")]
        )
        var roles: List<Role> = emptyList()
) : Audit(), Serializable
