package com.pp.iescobar.sgestionserver.entity

import java.io.Serializable
import java.util.*
import javax.persistence.*

@Entity
class SaleOrder(
        @Id @GeneratedValue var id: Long? = null,
        var total: Double = 0.0,
        var clientName: String? = null,
        var clientRfc: String? = null,
        var clientBusinessName: String? = null,
        var employeeId: Long? = null,
        var employeeName: String? = null,
        var finishDate: Date? = null,
        var status: String? = null,
        @OneToMany(mappedBy = "saleOrder", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        var orderLines: List<SaleOrderLine> = emptyList()
) : Audit(), Serializable
