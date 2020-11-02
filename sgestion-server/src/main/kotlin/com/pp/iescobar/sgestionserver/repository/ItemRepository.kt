package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.Item
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository : CrudRepository<Item, Long> {
    fun findByActiveTrueOrderByNameAsc(): List<Item>
}
