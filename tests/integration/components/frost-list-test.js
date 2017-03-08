import {expect} from 'chai'
const {A} = Ember
import Ember from 'ember'
import {make, manualSetup} from 'ember-data-factory-guy'
import {$hook, hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list',
  {
    setup: function () {
      manualSetup(this.container)
    }
  }
)
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
  })

  describe.skip('renders frost-list-item', function () {
    beforeEach(function () {
      let list = A()
      list.addObject(make('list-item'))

      this.set('items', list)

      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          items=items
        }}
      `)
    })

    it('sets "frost-list" class', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list')
        ).to.have.length(1)
      })
    })

    it('has one vertical item created', function () {
      return wait().then(() => {
        expect(
          this.$('.vertical-item')
        ).to.have.length(1)
      })
    })

    it('creates one list item', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list-item')
        ).to.have.length(1)
      })
    })
  })

  describe.skip('renders frost-list-item from "config" property', function () {
    beforeEach(function () {
      let list = A()
      list.addObject(make('list-item'))

      const testConfig = {
        items: list,
        component: 'frost-list-item',
        expansion: {
          onCollapseAll: 'collapseItems',
          onExpandAll: 'expandItems'
        },
        selection: {
          onSelect: 'selectItem'
        },
        sorting: {
          activeSorting: [],
          properties: [],
          onSort: 'sortItems'
        },
        infiniteScroll: {
          loadNext: 'loadNext',
          loadPrevious: 'loadPrevious'
        }
      }

      this.set('testConfig', testConfig)

      this.render(hbs`
        {{frost-list
          config=testConfig
        }}
      `)
    })

    it('sets "frost-list" class', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list')
        ).to.have.length(1)
      })
    })

    it('creates one vertical item', function () {
      return wait().then(() => {
        expect(
          this.$('.vertical-item')
        ).to.have.length(1)
      })
    })

    it('creates one list item', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list-item')
        ).to.have.length(1)
      })
    })
  })

  describe('Loading State', function () {
    beforeEach(function () {
      this.set('items', [Ember.Object.create(), Ember.Object.create()])
      return wait()
    })

    describe('is loading', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-list
            hook='my-list'
            isLoading=true
            item=(component 'frost-list-item')
            items=items
          }}
        `)
        return wait()
      })

      it('should display `frost-loading` component', function () {
        expect($hook('my-list-contentContainer-loading').length).to.eql(1)
      })
    })

    describe('is not loading', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-list
            hook='my-list'
            item=(component 'frost-list-item')
            items=items
          }}
        `)
        return wait()
      })

      it('should not display `frost-loading` component', function () {
        expect($hook('my-list-contentContainer-loading').length).to.eql(0)
      })
    })
  })

  describe('Supports pre selection with default itemKey', function () {
    beforeEach(function () {
      const one = Ember.Object.create({isNotCompared: '0'})
      const two = Ember.Object.create({isNotCompared: '1'})
      const testItems = [one, two]
      const testSelectedItems = [one]
      this.set('items', testItems)
      this.set('selectedItems', testSelectedItems)
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
        }}
      `)
      return wait()
    })

    it('item 0 is selected', function () {
      expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
    })

    it('item 1 is not selected', function () {
      expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
    })

    it('selectedItems length to be 1', function () {
      expect(this.get('selectedItems').length).to.eql(1)
    })
  })

  describe('Supports pre selection with custom itemKey', function () {
    beforeEach(function () {
      const testItems = [
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'})
      ]
      const testSelectedItems = [
        Ember.Object.create({id: '0'})
      ]

      this.set('items', testItems)
      this.set('selectedItems', testSelectedItems)

      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          itemKey='id'
        }}
      `)
      return wait()
    })

    it('item 0 is selected', function () {
      expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
    })
    it('item 1 is not selected', function () {
      expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
    })

    it('selectedItems length to be 1', function () {
      expect(this.get('selectedItems').length).to.eql(1)
    })
  })

  describe('When using custom itemKey', function () {
    describe('When Infinite', function () {
      beforeEach(function () {
        const testItems = A([
          Ember.Object.create({id: '0'}),
          Ember.Object.create({id: '1'})
        ])

        this.set('items', testItems)
        const testSelectedItems = A([])
        this.set('selectedItems', testSelectedItems)
        this.set('onSelectionChange', (selectedItems) => {
          this.get('selectedItems').setObjects(selectedItems)
        })
        this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
          itemKey='id'
        }}
      `)
        return wait()
      })

      describe('Supports basic click', function () {
        describe('Selecting item 0', function () {
          beforeEach(function () {
            $(hook('my-list-item', {index: 0})).click()
            return wait()
          })

          it('item 0 is selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
          })

          it('item 1 is not selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
          })

          it('selectedItems length to be 1', function () {
            expect(this.get('selectedItems').length).to.eql(1)
          })

          describe('Selecting previous selected item', function () {
            beforeEach(function () {
              $(hook('my-list-item', {index: 0})).click()
              return wait()
            })

            it('item 0 is not selected', function () {
              expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
            })

            it('item 1 is not selected', function () {
              expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
            })

            it('selectedItems length to be 0', function () {
              expect(this.get('selectedItems').length).to.eql(0)
            })
          })
        })

        describe('All items selected, then select item 0', function () {
          beforeEach(function () {
            $(hook('my-list-selection', {index: 0})).click()
            $(hook('my-list-selection', {index: 1})).click()
            $(hook('my-list-item', {index: 0})).click()
            return wait()
          })

          it('item 0 is selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
          })

          it('item 1 is not selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
          })

          it('selectedItems length to be 1', function () {
            expect(this.get('selectedItems').length).to.eql(1)
          })
        })
      })

      describe('Supports specific click', function () {
        describe('Selecting item 0', function () {
          beforeEach(function () {
            $hook('my-list-selection', {index: 0}).click()
            return wait()
          })

          it('item 0 is selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
          })
          it('item 1 is not selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
          })

          it('selectedItems length to be 1', function () {
            expect(this.get('selectedItems').length).to.eql(1)
          })

          describe('Unselecting item 1', function () {
            beforeEach(function () {
              $hook('my-list-selection', {index: 0}).click()
              return wait()
            })

            it('item 0 is not selected', function () {
              expect($($hook('my-list-item-container', {index: 0})).hasClass('is-selected')).to.eql(false)
            })

            it('item 1 is not selected', function () {
              expect($($hook('my-list-item-container', {index: 1})).hasClass('is-selected')).to.eql(false)
            })

            it('selectedItems length to be 0', function () {
              expect(this.get('selectedItems').length).to.eql(0)
            })
          })
        })

        describe('Selecting every item', function () {
          beforeEach(function () {
            $hook('my-list-selection', {index: 0}).click()
            $hook('my-list-selection', {index: 1}).click()
            return wait()
          })

          it('item 0 is selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
          })

          it('item 1 is selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
          })

          it('selectedItems length to be 2', function () {
            expect(this.get('selectedItems').length).to.eql(2)
          })

          describe('Unselect each item', function () {
            beforeEach(function () {
              $hook('my-list-selection', {index: 0}).click()
              $hook('my-list-selection', {index: 1}).click()
              return wait()
            })

            it('item 0 is not selected', function () {
              expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
            })

            it('item 1 is not selected', function () {
              expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
            })

            it('selectedItems length to be 0', function () {
              expect(this.get('selectedItems').length).to.eql(0)
            })
          })
        })
      })

      describe('Supports ranged base clicks', function () {
        beforeEach(function () {
          const testItems = A([
            Ember.Object.create({id: '0'}),
            Ember.Object.create({id: '1'}),
            Ember.Object.create({id: '2'}),
            Ember.Object.create({id: '3'}),
            Ember.Object.create({id: '4'}),
            Ember.Object.create({id: '5'}),
            Ember.Object.create({id: '6'})
          ])
          this.set('items', testItems)
          return wait()
        })

        describe('When using shift click from item1-5', function () {
          beforeEach(function () {
            const clickEvent = $.Event('click')
            clickEvent.shiftKey = true
            const clickEvent2 = $.Event('click')
            clickEvent2.shiftKey = true
            $(hook('my-list-item', {index: 1})).trigger(clickEvent)
            $(hook('my-list-item', {index: 5})).trigger(clickEvent2)
            return wait()
          })

          it('item 0 is not selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
          })

          it('item 1 is selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
          })

          it('item 2 is selected', function () {
            expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
          })

          it('item 3 is selected', function () {
            expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(true)
          })

          it('item 4 is selected', function () {
            expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(true)
          })

          it('item 5 is selected', function () {
            expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(true)
          })

          it('item 6 is not selected', function () {
            expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
          })

          it('selectedItems length to be 5', function () {
            expect(this.get('selectedItems').length).to.eql(5)
          })
        })

        describe('When using shift click on item 1', function () {
          beforeEach(function () {
            const clickEvent = $.Event('click')
            clickEvent.shiftKey = true
            $(hook('my-list-item', {index: 1})).trigger(clickEvent)
            return wait()
          })

          it('item 0 is not selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
          })

          it('item 1 is selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
          })

          it('item 2 is not selected', function () {
            expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(false)
          })

          it('item 3 is not selected', function () {
            expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(false)
          })

          it('item 4 is not selected', function () {
            expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(false)
          })

          it('item 5 is not selected', function () {
            expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(false)
          })

          it('item 6 is not selected', function () {
            expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
          })

          it('selectedItems length to be 1', function () {
            expect(this.get('selectedItems').length).to.eql(1)
          })

          describe('When using shift click on item 3', function () {
            beforeEach(function () {
              const clickEvent = $.Event('click')
              clickEvent.shiftKey = true
              $(hook('my-list-item', {index: 3})).trigger(clickEvent)
              return wait()
            })

            it('item 0 is not selected', function () {
              expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
            })

            it('item 1 is selected', function () {
              expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
            })

            it('item 2 is selected', function () {
              expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
            })

            it('item 3 is selected', function () {
              expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(true)
            })

            it('item 4 is not selected', function () {
              expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(false)
            })

            it('item 5 is not selected', function () {
              expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(false)
            })

            it('item 6 is not selected', function () {
              expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
            })

            it('selectedItems length to be 3', function () {
              expect(this.get('selectedItems').length).to.eql(3)
            })

            describe('When using shift click on item 5', function () {
              beforeEach(function () {
                const clickEvent = $.Event('click')
                clickEvent.shiftKey = true
                $(hook('my-list-item', {index: 5})).trigger(clickEvent)
                return wait()
              })

              it('item 0 is not selected', function () {
                expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
              })

              it('item 1 is selected', function () {
                expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
              })

              it('item 2 is selected', function () {
                expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
              })

              it('item 3 is selected', function () {
                expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(true)
              })

              it('item 4 is selected', function () {
                expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(true)
              })

              it('item 5 is selected', function () {
                expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(true)
              })

              it('item 6 is not selected', function () {
                expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
              })

              it('selectedItems length to be 5', function () {
                expect(this.get('selectedItems').length).to.eql(5)
              })

              describe('When using shift click on item 1', function () {
                beforeEach(function () {
                  const clickEvent = $.Event('click')
                  clickEvent.shiftKey = true
                  $(hook('my-list-item', {index: 1})).trigger(clickEvent)
                  return wait()
                })

                it('item 0 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
                })

                it('item 1 is selected', function () {
                  expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
                })

                it('item 2 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(false)
                })

                it('item 3 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(false)
                })

                it('item 4 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(false)
                })

                it('item 5 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(false)
                })

                it('item 6 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
                })

                it('selectedItems length to be 1', function () {
                  expect(this.get('selectedItems').length).to.eql(1)
                })
              })

              describe('When using shift click on item 0', function () {
                beforeEach(function () {
                  const clickEvent = $.Event('click')
                  clickEvent.shiftKey = true
                  $(hook('my-list-item', {index: 0})).trigger(clickEvent)
                  return wait()
                })

                it('item 0 is selected', function () {
                  expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
                })

                it('item 1 is selected', function () {
                  expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
                })

                it('item 2 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(false)
                })

                it('item 3 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(false)
                })

                it('item 4 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(false)
                })

                it('item 5 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(false)
                })

                it('item 6 is not selected', function () {
                  expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
                })

                it('selectedItems length to be 2', function () {
                  expect(this.get('selectedItems').length).to.eql(2)
                })
              })
            })
          })
        })
      })
    })

    describe('When Paged', function () {
      beforeEach(function () {
        // Note: DON'T change the seeding, the object creation/destruction is intentional
        // to prove that comparison of selected items only via key works!
        const testItems = A([
          Ember.Object.create({id: '0'}),
          Ember.Object.create({id: '1'}),
          Ember.Object.create({id: '2'})
        ])
        this.set('actions', {
          onChange: function (page) {
            this.set('page', page)
            if (page === 0) {
              this.set('items', A([
                Ember.Object.create({id: '0'}),
                Ember.Object.create({id: '1'}),
                Ember.Object.create({id: '2'})
              ])
              )
            } else if (page === 1) {
              this.set('items', A([
                Ember.Object.create({id: '3'}),
                Ember.Object.create({id: '4'}),
                Ember.Object.create({id: '5'})
              ])
              )
            }
          }
        })
        this.set('items', testItems)
        const testSelectedItems = A([])
        this.set('selectedItems', testSelectedItems)
        this.set('onSelectionChange', (selectedItems) => {
          this.get('selectedItems').setObjects(selectedItems)
        })
        this.set('page', 0)
        this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
          itemKey='id'
          pagination=(component 'frost-list-pagination'
            itemsPerPage=3
            onChange=(action 'onChange')
            page=page
            total=6
          )
        }}
      `)
        return wait()
      })

      it('display proper pagination 1 to 3 of 6', function () {
        expect($('.frost-list-pagination-text').text().trim()).to.eql('1 to 3 of 6')
      })

      describe('When shift selecting item1-3', function () {
        beforeEach(function () {
          const clickEvent = $.Event('click')
          clickEvent.shiftKey = true
          const clickEvent2 = $.Event('click')
          clickEvent2.shiftKey = true
          $(hook('my-list-item', {index: 0})).trigger(clickEvent)
          $(hook('my-list-item', {index: 2})).trigger(clickEvent2)
          return wait()
        })

        it('item 0 is selected', function () {
          expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
        })

        it('item 1 is selected', function () {
          expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
        })

        it('item 2 is selected', function () {
          expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
        })

        it('selectedItems length to be 3', function () {
          expect(this.get('selectedItems').length).to.eql(3)
        })

        describe('When clicking next page', function () {
          beforeEach(function () {
            $(hook('my-list-pagination-next-page')).click()
            return wait()
          })

          it('item 0 is not selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
          })

          it('item 1 is not selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
          })

          it('item 2 is not selected', function () {
            expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(false)
          })

          it('selectedItems length to be 3', function () {
            expect(this.get('selectedItems').length).to.eql(3)
          })

          it('display proper pagination 4 to 6 of 6', function () {
            expect($('.frost-list-pagination-text').text().trim()).to.eql('4 to 6 of 6')
          })

          describe('When shift click item4-6', function () {
            beforeEach(function () {
              const clickEvent = $.Event('click')
              clickEvent.shiftKey = true
              const clickEvent2 = $.Event('click')
              clickEvent2.shiftKey = true
              $(hook('my-list-item', {index: 0})).trigger(clickEvent)
              $(hook('my-list-item', {index: 2})).trigger(clickEvent2)
              return wait()
            })
            it('item 0 is selected', function () {
              expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
            })

            it('item 1 is selected', function () {
              expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
            })

            it('item 2 is selected', function () {
              expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
            })

            it('selectedItems length to be 6', function () {
              expect(this.get('selectedItems').length).to.eql(6)
            })
          })
        })
      })

      describe('When using specific select on item 2', function () {
        beforeEach(function () {
          $hook('my-list-selection', {index: 1}).click()
          return wait()
        })

        it('item 0 is not selected', function () {
          expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
        })

        it('item 1 is selected', function () {
          expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
        })

        it('item 2 is not selected', function () {
          expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(false)
        })

        it('selectedItems length to be 1', function () {
          expect(this.get('selectedItems').length).to.eql(1)
        })

        describe('When switching to page 2 and shift click item4-6', function () {
          beforeEach(function () {
            $(hook('my-list-pagination-next-page')).click()
            return wait().then(() => {
              const clickEvent = $.Event('click')
              clickEvent.shiftKey = true
              const clickEvent2 = $.Event('click')
              clickEvent2.shiftKey = true
              $(hook('my-list-item', {index: 0})).trigger(clickEvent)
              $(hook('my-list-item', {index: 2})).trigger(clickEvent2)
              return wait()
            })
          })

          it('item 0 is selected', function () {
            expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
          })

          it('item 1 is selected', function () {
            expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
          })

          it('item 2 is selected', function () {
            expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
          })

          it('selectedItems length to be 4', function () {
            expect(this.get('selectedItems').length).to.eql(4)
          })

          describe('When switching to page 1 and shift click item1-3', function () {
            beforeEach(function () {
              $(hook('my-list-pagination-previous-page')).click()
              return wait().then(() => {
                const clickEvent = $.Event('click')
                clickEvent.shiftKey = true
                const clickEvent2 = $.Event('click')
                clickEvent2.shiftKey = true
                $(hook('my-list-item', {index: 0})).trigger(clickEvent)
                $(hook('my-list-item', {index: 2})).trigger(clickEvent2)
                return wait()
              })
            })

            it('item 0 is selected', function () {
              expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
            })

            it('item 1 is selected', function () {
              expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
            })

            it('item 2 is selected', function () {
              expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
            })

            it('selectedItems length to be 6', function () {
              expect(this.get('selectedItems').length).to.eql(6)
            })
          })
        })
      })
    })
  })

  describe('When using default itemKey', function () {
    beforeEach(function () {
      const testItems = A([
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'}),
        Ember.Object.create({id: '2'}),
        Ember.Object.create({id: '3'}),
        Ember.Object.create({id: '4'}),
        Ember.Object.create({id: '5'}),
        Ember.Object.create({id: '6'})
      ])
      this.set('items', testItems)
      const testSelectedItems = A([])
      this.set('selectedItems', testSelectedItems)
      this.set('onSelectionChange', (selectedItems) => {
        this.get('selectedItems').setObjects(selectedItems)
      })
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
        }}
      `)
      return wait()
    })

    describe('Supports ranged based clicks', function () {
      describe('When using shift click from item1-5', function () {
        beforeEach(function () {
          const clickEvent = $.Event('click')
          clickEvent.shiftKey = true
          const clickEvent2 = $.Event('click')
          clickEvent2.shiftKey = true
          $(hook('my-list-item', {index: 1})).trigger(clickEvent)
          $(hook('my-list-item', {index: 5})).trigger(clickEvent2)
          return wait()
        })

        it('item 0 is not selected', function () {
          expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
        })

        it('item 1 is selected', function () {
          expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
        })

        it('item 2 is selected', function () {
          expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
        })

        it('item 3 is selected', function () {
          expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(true)
        })

        it('item 4 is selected', function () {
          expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(true)
        })

        it('item 5 is selected', function () {
          expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(true)
        })

        it('item 6 is not selected', function () {
          expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
        })

        it('selectedItems length to be 5', function () {
          expect(this.get('selectedItems').length).to.eql(5)
        })
      })
    })
  })

  describe('Supports item expansion', function () {
    beforeEach(function () {
      const testItems = A([
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'})
      ])
      this.set('items', testItems)
      this.set('selectedItems', A([]))
      this.set('expandedItems', A([]))
      this.set('onSelectionChange', (selectedItems) => {
        this.get('selectedItems').setObjects(selectedItems)
      })
      this.set('onExpansionChange', (expandedItems) => {
        this.get('expandedItems').setObjects(expandedItems)
      })
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          itemExpansion=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
          onExpansionChange=onExpansionChange
          expandedItems=expandedItems
        }}
      `)
      return wait()
    })

    describe('clicking item 0 expansion button', function () {
      beforeEach(function () {
        $hook('my-list-expansion', {index: 0}).click()
        return wait()
      })

      it('item 0 is expanded', function () {
        expect($hook('my-list-item-expansion', {index: 0})).to.have.length(1)
      })

      describe('clicking item 0 expansion button', function () {
        beforeEach(function () {
          $hook('my-list-expansion', {index: 0}).click()
          return wait()
        })
        it('item 0 is not expanded', function () {
          expect($hook('my-list-item-expansion', {index: 0})).to.have.length(0)
        })
      })
    })
  })
})
