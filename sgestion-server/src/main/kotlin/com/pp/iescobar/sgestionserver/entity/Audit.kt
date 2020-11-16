package com.pp.iescobar.sgestionserver.entity

import java.time.LocalDateTime
import javax.persistence.*

@MappedSuperclass
open class Audit(
        var active: Boolean = true,
        @Column(length = 100) var createdBy: String = "System",
        var createdDate: LocalDateTime = LocalDateTime.now(),
        @Column(length = 100) var updatedBy: String = "System",
        var updatedDate: LocalDateTime = LocalDateTime.now(),
        @Column(length = 100) var disabledBy: String? = null,
        var disabledDate: LocalDateTime? = null
)
