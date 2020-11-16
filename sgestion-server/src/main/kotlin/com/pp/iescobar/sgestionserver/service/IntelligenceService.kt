package com.pp.iescobar.sgestionserver.service

import com.pp.iescobar.sgestionserver.intelligence.SalePerDay
import com.pp.iescobar.sgestionserver.repository.SaleOrderRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.LocalDateTime

@Service
class IntelligenceService @Autowired constructor(
        val saleOrderRepository: SaleOrderRepository
) {
    fun getSalesPerDay(date: LocalDate): SalePerDay {
        val startDate = LocalDateTime.of(date.year, date.month, date.dayOfMonth, 0, 0, 0)
        val endDate = LocalDateTime.of(date.year, date.month, date.dayOfMonth, 23, 59, 59)
        val salePerDay = SalePerDay()
        saleOrderRepository.findAllByCreatedDateBetween(startDate, endDate).forEach {
            salePerDay.hours.add("${it.createdDate.hour}:${it.createdDate.minute}")
            salePerDay.numOfSales++
            salePerDay.amount += it.total
        }
        salePerDay.day = date.toString()
        salePerDay.hours.sort()
        return salePerDay
    }
}
