package com.pp.iescobar.sgestionserver.service

import com.pp.iescobar.sgestionserver.entity.SaleOrder
import com.pp.iescobar.sgestionserver.repository.SaleOrderLineRepository
import com.pp.iescobar.sgestionserver.repository.SaleOrderRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class SaleOrderService @Autowired constructor(
        val saleOrderRepository: SaleOrderRepository,
        val saleOrderLineRepository: SaleOrderLineRepository
) {
    @Transactional
    fun getAllSaleOrders() : List<SaleOrder> = saleOrderRepository.findAllByActive()

    @Transactional
    fun getSaleOrderById(id: Long) : SaleOrder? = saleOrderRepository.findByIdOrNull(id)

    @Transactional
    fun createOrUpdateSaleOrder(saleOrder: SaleOrder) : SaleOrder {
        val saleOrderSaved = saleOrderRepository.save(saleOrder)
        var orderLines = saleOrder.orderLines
        orderLines.forEach {
            it.saleOrder = saleOrderSaved
            saleOrderLineRepository.save(it)
        }
        orderLines = saleOrderLineRepository.findAllBySaleOrder(saleOrderSaved)
        saleOrderSaved.orderLines = orderLines
        return saleOrderSaved
    }

    @Transactional
    fun deleteSaleOrder(saleOrder: SaleOrder) {
        saleOrder.active = false
        saleOrder.disabledDate = Date()
        saleOrder.disabledBy = "Test"
        createOrUpdateSaleOrder(saleOrder)
    }
}
