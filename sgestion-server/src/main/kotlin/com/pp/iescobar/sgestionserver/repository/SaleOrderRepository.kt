package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.SaleOrder
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface SaleOrderRepository : CrudRepository<SaleOrder, Long> {
    fun findAllByActive(active: Boolean = true): List<SaleOrder>
    fun findAllByCreatedDateBetween(startDate: LocalDateTime, endDate: LocalDateTime): List<SaleOrder>
}
