package com.pp.iescobar.sgestionserver.intelligence

data class SalePerMonth(
        var month: String = "",
        var numOfSales: Int = 0,
        var amount: Double = 0.0,
        var days: List<SalePerDay> = ArrayList()
)
