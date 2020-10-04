package com.pp.iescobar.sgestionserver.repository

import com.pp.iescobar.sgestionserver.entity.Item
import com.pp.iescobar.sgestionserver.entity.SaleOrder
import com.pp.iescobar.sgestionserver.entity.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SaleOrderRepository : CrudRepository<SaleOrder, Long>

@Repository
interface ItemRepository : CrudRepository<Item, Long>

@Repository
interface UserRepository : CrudRepository<User, Long>
