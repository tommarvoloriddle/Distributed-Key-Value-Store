import sys
from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin
from db import LRUCache  # Assuming LRUCache is defined in lru_cache module


class SlaveService:
    def __init__(self, slave_idx):
        self.slave_idx = slave_idx
        self.cache = LRUCache()
        self.app = Flask(__name__)
        self.register_routes()
        self.run_app()

    def register_routes(self):
        @self.app.route('/getKey', methods=['GET'])
        @cross_origin()
        def slave_get_key():
            key = request.args.get('key')
            value = self.cache.get(key)
            if not value:
                return jsonify({'key': key, 'value': None})
            else:
                return jsonify({'key': key, 'value': value})

        @self.app.route('/setKey', methods=['GET'])
        @cross_origin()
        def slave_set_key():  
            key = request.args.get('key')
            value = request.args.get('value')
            self.cache.set(key, value)
            return jsonify({'key': key, 'value': value})
        
        @self.app.route('/getData', methods=['GET'])
        @cross_origin()
        def get_data():  
            return jsonify({'data' : self.cache.cache.db, 'slave_id' : self.slave_idx, 'message': 'Data from slave'})


        @self.app.route('/pop', methods=['GET'])
        @cross_origin()
        def pop_data():  
            key = request.args.get('key')
            value = self.cache.cache.db.pop(key)
            return jsonify({'value' : value})
    def run_app(self):
        cors = CORS(self.app)
        self.app.run(host='localhost', port=5000 + self.slave_idx)

def CreateSlaveService(slave_idx):
    return SlaveService(slave_idx)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python filename.py <slave_idx>")
        sys.exit(1)
    slave_idx = int(sys.argv[1])
    CreateSlaveService(slave_idx)
