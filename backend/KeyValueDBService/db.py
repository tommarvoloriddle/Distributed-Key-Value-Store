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


