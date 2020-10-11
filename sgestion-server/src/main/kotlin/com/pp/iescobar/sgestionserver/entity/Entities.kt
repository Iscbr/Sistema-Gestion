package com.pp.iescobar.sgestionserver.entity

import com.fasterxml.jackson.annotation.JsonIgnore
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

@Entity
class SaleOrderLine(
        @Id @GeneratedValue var id: Long? = null,
        var itemId: Long = -1,
        var itemName: String = "",
        var itemPrice: Double = 0.0,
        var totalLine: Double = 0.0,
        var quantity: Int = 0,
        @ManyToOne
        @JoinColumn(name = "sale_order_id")
        @JsonIgnore
        var saleOrder: SaleOrder?
) : Serializable

@Entity
class Item(
        @Id @GeneratedValue var id: Long? = null,
        @Column(length = 1000) var name: String,
        @Column(length = 2500) var description: String,
        var price: Double
) : Audit(), Serializable

@Entity
class Users(
        @Id @GeneratedValue var id: Long? = null,
        @Column(length = 100) var name: String,
        @Column(length = 100) var firstName: String,
        @Column(length = 100) var secondName: String,
        @Column(length = 100) var email: String,
        @Column(length = 500) var password: String
) : Audit(), Serializable

@MappedSuperclass
open class Audit(
        var active: Boolean = true,
        @Column(length = 100) var createdBy: String? = null,
        var createdDate: Date = Date(),
        @Column(length = 100) var updatedBy: String? = null,
        var updatedDate: Date = Date(),
        @Column(length = 100) var disabledBy: String? = null,
        var disabledDate: Date? = null
)
