# create a db for key value
 
class KeyValueDB:

    def __init__(self):
        self.db = {}    

    def set_key(self, key, value):
        self.db[key] = value
    
    def get_key(self, key):
        if key not in self.db:
            return None
        return self.db.get(key)


class LRUCache:
    def __init__(self):
        self.cache = KeyValueDB()
        self.capacity = 10
        self.LRU = []

    def set(self, key, value):
        if len(self.LRU) == self.capacity:
            del_key = self.LRU.pop(0)
            self.cache.db.pop(del_key)
        self.LRU.append(key)
        self.cache.set_key(key, value)

    def get(self, key):
        if key in self.LRU:
            self.LRU.remove(key)
            self.LRU.append(key)
        else:
            return None
        return self.cache.get_key(key)
    
    def get_cache(self):
        return self.cache.db

# class Node:
#     def __init__(self, key, val):
#         self.key, self.val = key, val
#         self.prev = self.next = None


# class LRUCache:
#     def __init__(self, capacity: int):
#         self.cap = capacity
#         self.cache = {}  # map key to node

#         self.left, self.right = Node(0, 0), Node(0, 0)
#         self.left.next, self.right.prev = self.right, self.left

#     # remove node from list
#     def remove(self, node):
#         prev, nxt = node.prev, node.next
#         prev.next, nxt.prev = nxt, prev

#     # insert node at right
#     def insert(self, node):
#         prev, nxt = self.right.prev, self.right
#         prev.next = nxt.prev = node
#         node.next, node.prev = nxt, prev

#     def get(self, key: int) -> int:
#         if key in self.cache:
#             self.remove(self.cache[key])
#             self.insert(self.cache[key])
#             return self.cache[key].val
#         return -1

#     def put(self, key: int, value: int) -> None:
#         if key in self.cache:
#             self.remove(self.cache[key])
#         self.cache[key] = Node(key, value)
#         self.insert(self.cache[key])

#         if len(self.cache) > self.cap:
#             # remove from the list and delete the LRU from hashmap
#             lru = self.left.next
#             self.remove(lru)
#             del self.cache[lru.key]

