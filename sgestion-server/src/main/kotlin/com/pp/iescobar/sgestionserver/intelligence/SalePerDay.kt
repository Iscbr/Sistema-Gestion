package com.pp.iescobar.sgestionserver.intelligence

data class SalePerDay(
        var day: String = "",
        var numOfSales: Int = 0,
        var amount: Double = 0.0,
        var hourRanges: ArrayList<String> = ArrayList(),
        var salesPerRange: ArrayList<Int> = ArrayList()
)
