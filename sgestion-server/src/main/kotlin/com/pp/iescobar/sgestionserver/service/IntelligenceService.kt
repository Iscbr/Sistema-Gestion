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
        val startDate = LocalDateTime.of(date.year, date.month, date.dayOfMonth, 0, 0, 0)
        val endDate = LocalDateTime.of(date.year, date.month, date.dayOfMonth, 23, 59, 59)
        val salePerDay = SalePerDay()
        saleOrderRepository.findAllByCreatedDateBetween(startDate, endDate).forEach {
            salePerDay.hours.add("${it.createdDate.hour}:${it.createdDate.minute}")
            salePerDay.numOfSales += 1
            salePerDay.amount += it.total
        }
        salePerDay.day = date.toString()
        salePerDay.hours.sort()
        return salePerDay
    }

    fun getSalesPerMonth(yearMonth: String): SalePerMonth {
        val date = LocalDate.of(yearMonth.split("-")[0].toInt(), yearMonth.split("-")[1].toInt(), 1)
        val salePerMonth = SalePerMonth()
        val startDate = LocalDateTime.of(date.year, date.month, 1, 0, 0, 0)
        val endDate = date.withDayOfMonth(date.month.length(date.isLeapYear)).atTime(23, 59, 59)

        val days = HashMap<Int, SalePerDay>()
        saleOrderRepository.findAllByCreatedDateBetween(startDate, endDate).forEach {
            if (days.containsKey(it.createdDate.dayOfMonth)) {
                days.getValue(it.createdDate.dayOfMonth).hours.add("${it.createdDate.hour}:${it.createdDate.minute}")
                days.getValue(it.createdDate.dayOfMonth).hours.sort()
                days.getValue(it.createdDate.dayOfMonth).numOfSales += 1
                days.getValue(it.createdDate.dayOfMonth).amount += it.total
            } else {
                days[it.createdDate.dayOfMonth] = SalePerDay(
                        it.createdDate.toLocalDate().toString(),
                        1,
                        it.total,
                        arrayListOf("${it.createdDate.hour}:${it.createdDate.minute}")
                )
            }
        }
        salePerMonth.month = date.toString().substringBeforeLast("-")
        salePerMonth.numOfSales = days.values.sumBy { it.numOfSales }
        salePerMonth.amount = days.values.sumByDouble { it.amount }
        salePerMonth.days = days.toSortedMap().values.toList()
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
