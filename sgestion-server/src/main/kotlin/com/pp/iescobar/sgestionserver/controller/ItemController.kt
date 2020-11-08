package com.pp.iescobar.sgestionserver.controller

import com.pp.iescobar.sgestionserver.entity.Item
import com.pp.iescobar.sgestionserver.service.ItemService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.lang.RuntimeException
import java.util.*
import java.util.function.Consumer
import kotlin.collections.HashMap

@RestController
@RequestMapping("/Item")
@CrossOrigin(origins = ["*"])
class ItemController @Autowired constructor(
        val itemService: ItemService
) {
    @GetMapping("/GetAll")
    fun getAllItems() : List<Item> = itemService.getAllItems()

    @GetMapping("/Get/{id}")
    fun getItemById(@PathVariable("id") id: Long) : ResponseEntity<Any> =
            itemService.getItemById(id)?.let { return ResponseEntity.ok(it) } ?: ResponseEntity(HttpStatus.NOT_FOUND)


    @PostMapping("/save")
    fun createItem(@RequestBody item: Item) : Item = itemService.createOrUpdateItem(item)

    @PutMapping("/update/{id}")
    fun updateItem(
            @PathVariable("id") id: Long,
            @RequestBody item: Item) : ResponseEntity<Any> {
        if (item.id != id) return ResponseEntity(HttpStatus.BAD_REQUEST)
        itemService.getItemById(id)?.let {
            return ResponseEntity(itemService.createOrUpdateItem(item), HttpStatus.OK)
        } ?: return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteItem(@PathVariable("id") id: Long) : ResponseEntity<Any> =
            itemService.getItemById(id)?.let {
                itemService.deleteItem(id)
                return ResponseEntity(HttpStatus.OK)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping("/upload")
    fun uploadFile(@RequestParam("file") file: MultipartFile): ResponseEntity<Any> {
        val response = HashMap<String,Any>()
        val itemsCount: Int
        if (!file.contentType.equals("text/csv")) {
            response["message"] = "Solo se permiten archivos CSV."
            return ResponseEntity(response, HttpStatus.BAD_REQUEST)
        }
        try {
            itemsCount = itemService.processItemsInFile(file)
        } catch (ex: RuntimeException) {
            response["message"] = "Error al procesar archivo ${file.originalFilename}: ${ex.message}"
            return ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        response["message"] = "Archivo cargado exitósamente, se guardaron $itemsCount atículos."
        return ResponseEntity.ok(response)
    }
}
