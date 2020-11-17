package com.pp.iescobar.sgestionserver.service

import com.pp.iescobar.sgestionserver.intelligence.SalePerDay
import com.pp.iescobar.sgestionserver.intelligence.SalePerMonth
import com.pp.iescobar.sgestionserver.intelligence.SalePerYear
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
        val salePerDay = SalePerDay()
        var startDate: LocalDateTime
        var endDate: LocalDateTime
        var salesPerRange: Int
        for (i in 0..20 step 4) {
            println(i)
            startDate = LocalDateTime.of(date.year, date.month, date.dayOfMonth, i, 0, 0)
            endDate = LocalDateTime.of(date.year, date.month, date.dayOfMonth, i + 3, 59, 59)
            salesPerRange = 0
            saleOrderRepository.findAllByCreatedDateBetween(startDate, endDate).forEach {
                salesPerRange += 1
                salePerDay.amount += it.total
            }
            salePerDay.hourRanges.add("${startDate.hour}:00 - ${endDate.hour}:59")
            salePerDay.salesPerRange.add(salesPerRange)
        }
        salePerDay.day = date.toString()
        salePerDay.numOfSales = salePerDay.salesPerRange.sum()
        return salePerDay
    }

    fun getSalesPerMonth(yearMonth: String): SalePerMonth {
        val salePerMonth = SalePerMonth()
        val date = LocalDate.of(yearMonth.split("-")[0].toInt(), yearMonth.split("-")[1].toInt(), 1)

        for (i in 1..date.month.length(date.isLeapYear)) {
            salePerMonth.days.add(getSalesPerDay(date.withDayOfMonth(i)))
        }

        salePerMonth.month = date.toString().substringBeforeLast("-")
        salePerMonth.numOfSales = salePerMonth.days.sumBy { it.numOfSales }
        salePerMonth.amount = salePerMonth.days.sumByDouble { it.amount }
        return salePerMonth
    }

    fun getSalesPerYear(year: Int): SalePerYear {
        val salePerYear = SalePerYear()
        var month: String
        for (i in 1..12) {
            month = if (i <= 9) "0$i" else i.toString()
            salePerYear.months.add(getSalesPerMonth("${year}-$month"))
        }
        salePerYear.year = year.toString()
        salePerYear.numOfSales = salePerYear.months.sumBy { it.numOfSales }
        salePerYear.amount = salePerYear.months.sumByDouble { it.amount }
        return salePerYear
    }

}
