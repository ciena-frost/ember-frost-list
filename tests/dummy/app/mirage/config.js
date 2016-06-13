import config from '../config/environment'

export default function () {
  if (config && config.mirageNamespace) {
    this.namespace = config.mirageNamespace
  }

  this.get('/list-items', function (db) {
    return {
      data: db.listItems.map((attrs) => {
        return {
          type: 'list-items',
          id: attrs.id,
          attributes: attrs
        }
      })
    }
  })

  this.get('/list-items', function (db, {queryParams: qp}) {
    if (qp.pageSize) {
      return {
        data: db.listItems.slice(qp.start, +qp.start + +qp.pageSize).map((attrs) => {
          return {
            type: 'list-items',
            id: attrs.id,
            attributes: attrs
          }
        })
      }
    } else {
      return {
        data: db.listItems.map((attrs) => {
          return {
            type: 'list-items',
            id: attrs.id,
            attributes: attrs
          }
        })
      }
    }
  })

  this.del('/list-items/:id', function (db, request) {
    let ret = db['listItems'].find(request.params.id)
    db['listItems'].remove(request.params.id)
    return {
      data: {
        type: 'list-items',
        id: ret.id,
        attributes: ret
      }
    }
  })

  this.get('/list-items/:id', function (db, request) {
    let ret = db['listItems'].find(request.params.id)
    return {
      data: {
        type: 'list-items',
        id: ret.id,
        attributes: ret
      }
    }
  })

  this.patch('/list-items/:id', function (db, request) {
    let attrs = JSON.parse(request.requestBody)
    let item = db['listItems'].update(request.params.id, attrs)
    return {
      data: {
        type: 'list-items',
        id: item.id,
        attributes: item
      }
    }
  })

  this.passthrough()
}
