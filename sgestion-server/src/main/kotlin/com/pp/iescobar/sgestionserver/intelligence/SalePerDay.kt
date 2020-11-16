package com.pp.iescobar.sgestionserver.intelligence

data class SalePerDay(
        var date: String = "",
        var numOfSales: Int = 0,
        var amount: Double = 0.0,
        var hours: ArrayList<String> = ArrayList()
)
