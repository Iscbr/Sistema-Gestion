package com.pp.iescobar.sgestionserver.entity

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Item(
        @Id @GeneratedValue var id: Long? = null,
        @Column(length = 1000) var name: String,
        @Column(length = 2500) var description: String,
        var price: Double
) : Audit(), Serializable
