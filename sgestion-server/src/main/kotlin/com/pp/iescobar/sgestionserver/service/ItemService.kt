package com.pp.iescobar.sgestionserver.service

import com.pp.iescobar.sgestionserver.entity.Item
import com.pp.iescobar.sgestionserver.repository.ItemRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*
import javax.transaction.Transactional

@Service
class ItemService @Autowired constructor(
        val itemRepository: ItemRepository
) {

    @Transactional
    fun getAllItems() : List<Item> = itemRepository.findAllByActive()

    @Transactional
    fun getItemById(id: Long) : Item? = itemRepository.findByIdOrNull(id)

    @Transactional
    fun createOrUpdateItem(item: Item) : Item = itemRepository.save(item)

    @Transactional
    fun deleteItem(item: Item) {
        item.active = false
        item.disabledDate = Date()
        item.disabledBy = "Test"
        createOrUpdateItem(item)
    }
}
