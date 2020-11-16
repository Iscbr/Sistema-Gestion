package com.pp.iescobar.sgestionserver.controller

import com.pp.iescobar.sgestionserver.intelligence.SalePerDay
import com.pp.iescobar.sgestionserver.intelligence.SalePerMonth
import com.pp.iescobar.sgestionserver.service.IntelligenceService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/Intelligence")
class IntelligenceController @Autowired constructor(
        val intelligenceService: IntelligenceService
) {

    @GetMapping("/Sales/Day/{date}")
    fun getSalesPerDay(
            @PathVariable("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: LocalDate
    ): SalePerDay = intelligenceService.getSalesPerDay(date)

    @GetMapping("/Sales/Month/{date}")
    fun getSalesPerMonth(
            @PathVariable("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: LocalDate
    ): SalePerMonth = intelligenceService.getSalesPerMonth(date)
}
