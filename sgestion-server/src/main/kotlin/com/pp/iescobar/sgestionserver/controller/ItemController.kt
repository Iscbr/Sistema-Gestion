package com.pp.iescobar.sgestionserver.controller

import com.pp.iescobar.sgestionserver.entity.Item
import com.pp.iescobar.sgestionserver.service.ItemService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.lang.RuntimeException

@RestController
@RequestMapping("/Item")
@CrossOrigin(origins = ["*"])
class ItemController @Autowired constructor(
        val itemService: ItemService
) {
    @GetMapping("/GetAll")
    fun getAllItems() : List<Item> = itemService.getAllItems()

    @GetMapping("/Get/{id}")
    fun getItemById(@PathVariable("id") id: Long) : ResponseEntity<Any> {
        val item = itemService.getItemById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(item)
    }

    @PostMapping("/save")
    fun createItem(@RequestBody item: Item) : Item = itemService.createOrUpdateItem(item)

    @PutMapping("/update/{id}")
    fun updateItem(
            @PathVariable("id") id: Long,
            @RequestBody item: Item) : ResponseEntity<Any> {
        if (item.id != id) return ResponseEntity(HttpStatus.BAD_REQUEST)
        itemService.getItemById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        itemService.createOrUpdateItem(item)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteItem(@PathVariable("id") id: Long) : ResponseEntity<Any> {
        val item = itemService.getItemById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        itemService.deleteItem(item)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }

    @PostMapping("/upload")
    fun uploadFile(@RequestParam("file") file: MultipartFile): ResponseEntity<Any> {
        if (!file.contentType.equals("text/csv"))
            return ResponseEntity.badRequest().body("Solo se permiten archivos CSV.")
        val itemsCount: Int
        try {
            itemsCount = itemService.processItemsInFile(file)
        } catch (ex: RuntimeException) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar archivo ${file.originalFilename}: ${ex.message}")
        }
        return ResponseEntity.ok("Archivo cargado exitósamente, se guardaron $itemsCount atículos.")
    }
}
