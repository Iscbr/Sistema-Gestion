package com.pp.iescobar.sgestionserver.controller

import com.pp.iescobar.sgestionserver.entity.SaleOrder
import com.pp.iescobar.sgestionserver.service.SaleOrderService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/SaleOrder")
@CrossOrigin(origins = ["*"])
class SaleOrderController @Autowired constructor(
        val saleOrderService: SaleOrderService
) {
    @GetMapping("/GetAll")
    fun getAllSaleOrders() : List<SaleOrder> = saleOrderService.getAllSaleOrders()

    @GetMapping("/Get/{id}")
    fun getSaleOrderById(@PathVariable("id") id: Long) : ResponseEntity<Any> {
        val saleOrder = saleOrderService.getSaleOrderById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(saleOrder)
    }

    @PostMapping("/save")
    fun createSaleOrder(@RequestBody saleOrder: SaleOrder) : SaleOrder = saleOrderService.createOrUpdateSaleOrder(saleOrder)

    @PutMapping("/update/{id}")
    fun updateSaleOrder(
            @PathVariable("id") id: Long,
            @RequestBody saleOrder: SaleOrder) : ResponseEntity<Any> {
        if (saleOrder.id != id) return ResponseEntity(HttpStatus.BAD_REQUEST)
        saleOrderService.getSaleOrderById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        saleOrderService.createOrUpdateSaleOrder(saleOrder)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteSaleOrder(@PathVariable("id") id: Long) : ResponseEntity<Any> {
        val saleOrder = saleOrderService.getSaleOrderById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        saleOrderService.deleteSaleOrder(saleOrder)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}
