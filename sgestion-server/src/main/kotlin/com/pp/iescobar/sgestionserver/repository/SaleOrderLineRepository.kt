package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.SaleOrder
import com.pp.iescobar.sgestionserver.entity.SaleOrderLine
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SaleOrderLineRepository : CrudRepository<SaleOrderLine, Long> {
    fun findAllBySaleOrder(saleOrder: SaleOrder): List<SaleOrderLine>
}
