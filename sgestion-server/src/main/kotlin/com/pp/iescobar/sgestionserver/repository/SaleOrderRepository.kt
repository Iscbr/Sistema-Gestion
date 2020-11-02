package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.SaleOrder
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SaleOrderRepository : CrudRepository<SaleOrder, Long> {
    fun findAllByActive(active: Boolean = true): List<SaleOrder>
}
