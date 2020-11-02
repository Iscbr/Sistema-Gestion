package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.Item
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository : CrudRepository<Item, Long> {
    fun findAllByActive(active: Boolean = true): List<Item>
}
