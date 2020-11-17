package com.pp.iescobar.sgestionserver.intelligence

data class SalePerYear(
        var year: String = "",
        var numOfSales: Int = 0,
        var amount: Double = 0.0,
        var months: ArrayList<SalePerMonth> = ArrayList()
)
