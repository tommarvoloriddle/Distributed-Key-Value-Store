# Distributed Key-Value Store
This repository contains the codebase for a Distributed Key-Value Store application, split into backend and frontend components.

![Scalability](https://img.shields.io/badge/Scalability-✔-brightgreen)
![Consistency](https://img.shields.io/badge/Consistency-✔-brightgreen)
![Extensibility](https://img.shields.io/badge/Extensibility-✔-brightgreen)
![Resilience](https://img.shields.io/badge/Resilience-✔-brightgreen)

This repository contains a distributed key-value store implementation with features such as LRU eviction policy, rehashing using Consistent Hashing, and dynamic addition/removal of caches.

## Demo

![Demo](https://github.com/tommarvoloriddle/Distributed-Key-Value-Store/blob/main/frontend/web/demo.gif)

## Features

### Scalability
- **Dynamic Cache Addition/Removal**: Easily scale your distributed key-value store by adding or removing caches on-demand. Each cache runs on a separate port, allowing for horizontal scaling.

### Consistency
- **LRU Eviction Policy**: Ensures consistency in cache usage by implementing the Least Recently Used (LRU) eviction policy. This policy ensures that the most recently accessed keys are retained in the cache, while older or less frequently accessed keys are evicted when the cache reaches its capacity.

- **Rehashing with Consistent Hashing**: Maintains consistency in data distribution across caches during dynamic scaling. Consistent Hashing ensures that keys are evenly distributed among caches, minimizing the impact of cache additions or removals on existing data distribution.

### Extensibility
- **Modular Architecture**: The key-value store is built with a modular architecture, allowing for easy extension and customization. New features or enhancements can be integrated seamlessly without disrupting the existing functionality.

- **API Support**: Provides a robust API for interacting with the key-value store, making it easy to integrate into existing systems or build upon for specific use cases.

### Resilience
- **Fault Tolerance**: Implements fault-tolerant mechanisms to handle cache failures or network partitions gracefully. The system ensures data availability and consistency even in the presence of cache or network failures.

- **Monitoring and Logging**: Includes comprehensive monitoring and logging capabilities to track system performance, identify bottlenecks, and troubleshoot issues effectively.



### Todo
- [ ] Quorum Consensus for Read/Write operations.
- [ ] Enhance fault tolerance mechanisms for improved resilience.
- [ ] Implement data replication for enhanced data durability.
- [ ] Integrate with a distributed tracing system for performance analysis.

## Getting Started

Follow these steps to set up and run the distributed key-value store:

1. **Clone the Repository**: `git clone <repository_url>`
2. **Set Up Caches**: Run multiple cache instances on ports 5001-5005.
3. **Start Master Service**: Run the master service on port 5000.
4. **Access the Key-Value Store**: Interact with the key-value store using the provided API endpoints.

Refer to the detailed documentation for more information on configuration options, API usage, and advanced features.

### Running Backend

#### Master Service:

cd backend/DISTRIBUTED\ KEY\ VALUE\ STORE/BACKEND/KeyValueDBService
python master_service.py

#### Slave Services:

cd backend/DISTRIBUTED\ KEY\ VALUE\ STORE/BACKEND/KeyValueDBService
python slave_service.py -1
python slave_service.py -2
python slave_service.py -3
python slave_service.py -4
python slave_service.py -5

### Running React App

#### Install Dependencies:

cd frontend/web
npm install

#### Start React App:

npm start



## Backend

The backend of the application is responsible for handling key-value storage and distribution.


### KeyValueDBService

- `db.py`: Contains the database logic.
- `master.py`: Master node logic.
- `master_service.py`: Master service logic.
- `slave_service.py`: Slave service logic.

## Frontend

The frontend of the application consists of web interfaces.


### Components

- `App.css`, `App.js`, `App.test.js`: Main application components.
- `slave`: Components related to slave functionality.
    - `slave.css`, `slave.jsx`: Styling and logic for slave components.
- `slaveCard`: Components for displaying slave cards.
    - `slaveCard.css`, `slaveCard.jsx`: Styling and logic for slave card components.

### Containers

- `slaveContainer.jsx`: Container component for managing slave-related functionality.

### Other Files

- `data.js`: Contains data used by the frontend.
- `index.css`, `index.js`: Entry point files for the frontend application.

