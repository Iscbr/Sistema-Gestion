package com.pp.iescobar.sgestionserver.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import java.io.Serializable
import javax.persistence.*

@Entity
class SaleOrderLine(
        @Id @GeneratedValue var id: Long? = null,
        var itemId: Long = -1,
        var itemName: String = "",
        var itemDescription: String = "",
        var itemPrice: Double = 0.0,
        var totalLine: Double = 0.0,
        var quantity: Int = 0,
        @ManyToOne
        @JoinColumn(name = "sale_order_id")
        @JsonIgnore
        var saleOrder: SaleOrder?
) : Serializable
