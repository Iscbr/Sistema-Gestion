package com.pp.iescobar.sgestionserver.service

import com.pp.iescobar.sgestionserver.entity.Item
import com.pp.iescobar.sgestionserver.repository.ItemRepository
import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.BufferedReader
import java.io.InputStreamReader
import java.lang.Exception
import java.lang.RuntimeException
import java.time.LocalDateTime
import javax.transaction.Transactional
import kotlin.collections.ArrayList

@Service
class ItemService @Autowired constructor(
        val itemRepository: ItemRepository
) {
    @Transactional
    fun getAllItems() : List<Item> = itemRepository.findByActiveTrueOrderByNameAsc()

    @Transactional
    fun getItemById(id: Long) : Item? = itemRepository.findByIdOrNull(id)

    @Transactional
    fun createOrUpdateItem(item: Item) : Item {
        if (!item.active) {
            item.disabledDate = LocalDateTime.now()
            item.disabledBy = "Test"
        }
        return itemRepository.save(item)
    }

    @Transactional
    fun deleteItem(id: Long) = itemRepository.deleteById(id)

    @Transactional
    fun processItemsInFile(file: MultipartFile): Int {
        try {
            val fileReader = BufferedReader(InputStreamReader(file.inputStream, "UTF-8"))
            val csvParser = CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())
            val itemsList = ArrayList<Item>()
            var item: Item
            csvParser.records.forEach {
                item = Item(
                        name = it.get("nombre"),
                        description = it.get("descripcion"),
                        price = it.get("precio").toDoubleOrNull() ?: 0.0,
                        stock = it.get("stock").toIntOrNull() ?: 0
                )
                itemsList.add(item)
            }

            return itemRepository.saveAll(itemsList).count()
        } catch (ex: Exception) {
            throw RuntimeException("No fue posible procesar los artículos en el archivo: ${ex.message}")
        }
    }
}
