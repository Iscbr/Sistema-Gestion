package com.pp.iescobar.sgestionserver.entity

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Users(
        @Id @GeneratedValue var id: Long? = null,
        @Column(length = 100) var name: String,
        @Column(length = 100) var firstName: String,
        @Column(length = 100) var secondName: String,
        @Column(length = 100) var email: String,
        @Column(length = 500) var password: String
) : Audit(), Serializable
