package com.pp.iescobar.sgestionserver.entity

import java.io.Serializable
import javax.persistence.*

@Entity
class Role(
        @Id @GeneratedValue var id: Long? = null,
        @Column(length = 50, unique = true) var name: String,
        @Column(length = 350) var description: String
) : Audit(), Serializable
