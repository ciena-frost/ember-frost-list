import Ember from 'ember'
import config from '../../config/environment'
import {FrostListMixin} from 'ember-frost-list'
const {computed} = Ember

export default Ember.Controller.extend(FrostListMixin, {

  itemsInList: Ember.computed('listItems.content.[]', function () {
    return this.get('listItems.content.length')
  }),

  itemsInStore: computed('listItems.content.[]', function () {
    return this.store.peekAll('list-item').content.length
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
  componentPath: computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'infinite-scroll/user-list-item'
      }
    }
  }),

  wrappedListItems: Ember.computed('model', function () {
    return this.get('model.items')
  }),

  fetchNext () {
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

  fetchPrevious () {
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
      Ember.run.debounce(this, this.fetchPrevious, 50)
    },

    loadNext () {
      Ember.run.debounce(this, this.fetchNext, 50)
    }
  }
})
