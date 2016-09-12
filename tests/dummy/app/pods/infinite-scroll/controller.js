import Ember from 'ember'
import config from '../../config/environment'
import _ from 'lodash'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'

const {computed} = Ember

export default Ember.Controller.extend(FrostListMixin, {

  itemsInList: Ember.computed('listItems.content.[]', function () {
    return this.get('listItems.content.length')
  }),

  itemsInStore: computed('listItems.content.[]', function () {
    return this.store.peekAll('list-item').content.length
  }),

  isButtonActive: computed('selectedItems.[]', function () {
    let selectedItem = this.get('selectedItems')
    if (!selectedItem.length) {
      return {
        updateButton: true,
        deleteButton: true
      }
    } else {
      return {
        updateButton: false,
        deleteButton: false
      }
    }
  }),

  listConfig: {
    items: 'model',
    component: Ember.computed({
      get () {
        if (config.isFrostGuideDirectory) {
          return 'user-list-item'
        } else {
          return 'examples/user-list-item'
        }
      }
    }),
    sorting: {
      active: [{value: 'label', direction: ':desc'}],

      properties: [
        {
          value: 'label',
          label: 'Label'
        },
        {
          value: 'id',
          label: 'Id'
        }
      ]
    }
  },

  alwaysUseDefaultHeight: true,
  selectedItems: Ember.A(),
  componentPath: computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'infinite-scroll/user-list-item'
      }
    }
  }),

  listItems: Ember.computed('model', function () {
    return this.get('model.items')
  }),

  _loadNext () {
    let lastOffset = this.get('model.lastOffset')
    this.store.query('list-item', {
      pageSize: 100,
      start: lastOffset
    }).then(() => {
      // for demo only
      this.set('currentPageSize', 100)
      this.set('currentOffset', lastOffset)
      //
      this.set('model.lastOffset', lastOffset + 100)
    })
  },

  _loadPrevious () {
    let firstOffset = this.get('model.firstOffset')
    if (firstOffset <= 0) {
      return
    }
    this.store.query('list-item', {
      pageSize: 100,
      start: firstOffset - 100
    }).then((newItems) => {
      let oldContent = this.model.items.content
      let newContent = newItems.content
      let retContent = newContent.concat(oldContent.slice(0, oldContent.length - newContent.length))
      this.get('listItems').set('content', retContent)

      // for demo only
      this.set('currentPageSize', 100)
      this.set('currentOffset', firstOffset - 100)
      //

      this.set('model.firstOffset', firstOffset - 100)
    })
  },

  actions: {

    loadPrevious () {
      Ember.run.debounce(this, this._loadPrevious, 50)
    },

    loadNext () {
      Ember.run.debounce(this, this._loadNext, 50)
    },

    updateHandler () {
      let selectedItems = this.get('selectedItems')
      _.each(selectedItems, (item) => {
        item.set('label', 'updated label')
        item.save()
          .then(
            (/* success */) => {
            },
            (/* fail */) => {
            }
          )
      })
    },

    deleteHandler () {
      let selectedItems = this.get('selectedItems')
      _.each(selectedItems, (item) => {
        item.destroyRecord().then(
          (/* success */) => {
          },
          (/* fail */) => {
          }
        )
      })
    },

    fetchNext () {
      let lastOffset = this.get('model.lastOffset')
      this.set('currentPageSize', 100)
      this.set('currentOffset', lastOffset)
      this.store.query('list-item', {
        pageSize: 100,
        start: lastOffset
      }).then(() => {
        this.set('model.lastOffset', lastOffset + 100)
      })
    }
  }
})
