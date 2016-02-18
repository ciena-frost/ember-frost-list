export default function () {
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

  this.get('/tables', function (db) {
    return {
      data: db.tables.map((attrs) => {
        return {
          type: 'tables',
          id: attrs.id,
          attributes: attrs
        }
      })
    }
  })

  this.get('/tables/:id', function (db, request) {
    let id = request.params.id

    return {
      data: {
        type: 'tables',
        id: id,
        attributes: db.tables.find(id)
      }
    }
  })
}
