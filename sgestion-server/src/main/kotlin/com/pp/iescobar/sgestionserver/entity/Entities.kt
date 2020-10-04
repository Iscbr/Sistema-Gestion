package com.pp.iescobar.sgestionserver.entity

import java.io.Serializable
import java.util.*
import javax.persistence.*

@Entity
data class SaleOrder(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
        var total: Double,
        var clientName: String,
        var clientRfc: String,
        var clientBusinessName: String,
        var employeeId: Long,
        var employeeName: String,
        var finishDate: Date,
        var status: String,
        @OneToMany(mappedBy = "sale_order", fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        var orderLines: List<SaleOrderLine>
) : Serializable

@Entity
data class SaleOrderLine(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
        var itemId: Long,
        var itemName: String,
        var itemPrice: Double,
        var quantity: Int,
        @ManyToOne
        @JoinColumn(name = "fk_sale_order", nullable = false, updatable = false)
        var saleOrder: SaleOrder
) : Serializable

@Entity
data class Item(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
        @Column(length = 1000) var name: String,
        @Column(length = 2500) var description: String,
        var price: Double
) : Audit(), Serializable

@Entity
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
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
