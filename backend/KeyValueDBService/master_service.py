from flask import Flask, request, abort, jsonify
from flask_cors import CORS, cross_origin
from master import Master
import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin()
def welcome():
    return jsonify({'message': 'Welcome to the KeyValueDB service'})

@app.route('/getkey', methods=['GET'])
@cross_origin()
def get_key():
    key = request.args.get('key')
    if not key:
        abort(400, 'Key parameter is missing')

    value = master.get(key)
    if value is None:
        abort(404, 'Key not found')
    return jsonify({'key': key, 'value': value})

@app.route('/setkey', methods=['GET'])
@cross_origin()
def set_key():
    key = request.args.get('key')
    value = request.args.get('value')
    if not key or not value:
        abort(400, 'Key or value parameter is missing')

    slaveId = master.set(key, value)
    return jsonify({'key': key, 'value': value, 'slaveId' : slaveId})

@app.route('/api/slaves', methods=['GET'])
@cross_origin()
def get_slaves():
    return jsonify({'slaves': list(master.slaves.keys()) })

@app.route('/api/slave/data', methods=['GET'])
@cross_origin()
def get_slave_data():
    slave_id = request.args.get('slaveId')
    if not slave_id:
        abort(400, 'Slave ID parameter is missing')
    print(master.getMaster(), slave_id)
    data = master.getSlaveDate(int(slave_id))
    if data is None:
        abort(404, 'Slave data not found')
    print(data)        
    return data

@app.route('/api/addSlave', methods=['GET'])
@cross_origin()
def add_Slave():
    slaves = master.add_slave()    
    return jsonify({'slaves': list(slaves.keys()) })

@app.route('/api/popSlave', methods=['GET'])
@cross_origin()
def pop_Slave():
    slave_id = request.args.get('slaveId')
    slaves = master.remove_slave(int(slave_id))    
    return jsonify({'slaves': list(slaves.keys()) })

@app.route('/api/testKeys', methods=['GET'])
@cross_origin()
def testKeys():   
    return str(master.slaveKeys)
if __name__ == '__main__':
    master = Master()
    # time.sleep(5)
    app.run(host='localhost', port=5000)
