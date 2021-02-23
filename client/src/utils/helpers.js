export function iDBPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('tater-tot', 1)

        let db, tx, store

        request.onupgradeneeded = function(e) {
            const db = request.result

            db.createObjectStore('employee', { keyPath: '_id' })
            db.createObjectStore('employees', { keyPath: '_id' })
            db.createObjectStore('requestOffs', { keyPath: '_id' })
        }

        request.onerror = function(e) {
            console.log('There was an error!')
        }

        request.onsuccess = function(e) {
            db = request.result
            tx = db.transaction(storeName, 'readwrite')
            store = tx.objectStore(storeName)

            db.onerror = function(err) {
                console.log('error', err)
            }

            switch (method) {
                case 'put':
                    store.put(object)
                    resolve(object)
                    break
                case 'get':
                    const all = store.getAll()
                    all.onsuccess = function() {
                        resolve(all.result)
                    }
                    break
                case 'delete':
                    store.delete(object._id)
                    break
                default:
                    console.log('No valid method!')
                    break
            }

            tx.oncomplete = function() {
                db.close()
            }
        }
    })
}