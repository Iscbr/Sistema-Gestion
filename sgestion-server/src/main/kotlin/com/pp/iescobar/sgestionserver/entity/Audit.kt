package com.pp.iescobar.sgestionserver.entity

import java.util.*
import javax.persistence.*

@MappedSuperclass
open class Audit(
        var active: Boolean = true,
        @Column(length = 100) var createdBy: String = "System",
        var createdDate: Date = Date(),
        @Column(length = 100) var updatedBy: String = "System",
        var updatedDate: Date = Date(),
        @Column(length = 100) var disabledBy: String? = null,
        var disabledDate: Date? = null
)
