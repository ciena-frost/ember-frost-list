# 7.0.1 (2017-11-21)
* Fixed console errors when no `onSelectionChange` is given to the frost list.

# 7.0.0 (2017-11-14)
* Use latest major for `ember-frost-core`


# 6.1.4 (2017-11-14)
* Remove unused `ember-simple-uuid` dependency

# 6.1.3 (2017-11-13)
* Closes #157 


# 6.1.2 (2017-10-23)
* **Fixed** issue that `size` attribute didn't propagate down to `frost-checkbox`


# 6.1.1 (2017-10-21)
- Fixed issue when running against 2.8.3, List can't get the valid component name to render.


# 6.1.0 (2017-10-20)
* **Removed** default value for `defaultHeight` property.
* **Updated** `smoke-and-mirror` to consume `listRowHeight` instead of `defaultHeight`.
* **Updated** `frost-checkbox` in `frost-list-item-section`, now it reacts to `size`.
* **Updated** `frost-list-item-container-base` to generate its height based on `listRowHeight`.
 * **Added** new interface `size` that defaults to `medium`.
 * **Added** new computed property `listRowHeight` calculates based on `defaultHeight` and `size`.





# 6.0.0 (2017-10-20)

* Added a new frost-list-item-content component
* Added support for rendering different list-item and list-item-expansion components based on a set of types via new `itemTypes` property
* Added support for rendering different controls based on list-item type
* Added support for consumer-defined list-item type via new `itemTypeKey` property
* Added a warning if consumer defines `itemTypeKey` property but not `itemKey` property
* Changed hook from `-item` to `-itemContent-item` for list-item component
* Changed hook from `-expansion` to `-itemContent-expansion` for frost-list-item-expansion component
* Changed hook from `-selection` to `-itemContent-selection` for frost-list-item-selection component
* Changed hook from `-item-container` to `-itemContent-item-container` for frost-list-item-container DOM element
* Changed hook from `-item` to `-itemExpansion` for list-item-expansion component

# 5.8.2 (2017-08-11)
* **Updated** ember-cli 2.12.3 inter-dependencies

# 5.8.1 (2017-08-01)
- **Modified** specific multi-select to also work with non-mac systems.
	modified:   addon/components/frost-list-item.js


# 5.8.0 (2017-07-11)
* Upgrade `ember-cli` to `12.2.3` (also catching missed items from prior upgrades)

# 5.7.0 (2017-06-26)
* Closes #141

# 5.6.1 (2017-06-05)
* **Updated** to use ember-source npm package
* **Updated** some devDependencies to align with Ember 2.11
* **Updated** ember-try config for move to ember-source


# 5.6.0 (2017-06-02)
- Exposed `itemKey` as a configurable property.  List records with a matching `itemKey` will update instead of fully re-rendering when the record changes.


# 5.5.10 (2017-05-29)
* **Fixed** Expand All handling of model items
* Removed unnecessary ember-hash-helper-polyfill


# 5.5.9 (2017-05-12)
* **Fixed** `font-weight` for `list-item-element-label`

# 5.5.8 (2017-05-10)
* **Updated** secure auth token


# 5.5.7 (2017-04-27)
- Changed link appearance to align with UX spec


# 5.5.6 (2017-04-26)
* **Split** states and record for a list item
* **Fixed** #129 
* **Changed** version of `smoke-and-mirrors`
* **Added** blueprint check

# 5.5.5 (2017-04-06)

* **Fixed** memory leak by removing the original event handler for `keyup/down` events.


# 5.5.4 (2017-03-23)
* **Fixed** `ember` and `ember-cli` dependencies

# 5.5.3
* **Updated** travis scripts to get publishing of demo to gh-pages working

# 5.5.2
* Fixed range select issues with selectedItems increasing with duplicates
* Simplified itemComparator to just itemKey: string


# 5.5.1
- Pull in temporary fork of s&m (pre 1.0.0)
- Remove whitespace in content-container className

# 5.5.0
* Removed basicClickDisabled as it was never an agreed upon UX change.
* Fixed non default itemComparator failing on shift based clicks.


# 5.4.1
- Added `{{yield to='inverse'}}` when no content is present to improve usability
- Changed outline to border to avoid computations


# 5.4.0
* Added .pr-bumper.json file to correct build problems during merging.
* Publish PR #102, #104, #105, #106, and #107, which included:
* Added a default comparator which can be overridden with a custom comparator.
* Added tests for three scenarios of clicking
* Modified frost-list template to have a hook at the top of the container for easier testing of items below it.
* Updated to use latest pr-bumper which supports being able to set a PR to none when publishing a new version is not desired.
* **Added** optional `basicClickDisabled` attribute. While basic click is nice, it is not always desirable. If you have a list of 100+ selected items, a mis-click might reset your selections.
* **Fixed** issue with Ember 2.11 and run loop
* **Added** a default comparator which can be overridden with a custom comparator
* **Added** tests for three scenarios of clicking
* **Added** an ember hook selector to frost-list-item-container


# 5.3.1
* **Updated** integration/unit tests to remove the deprecated use of `describeComponent()`


# 5.3.0

* **Added** `ember-disable-prototype-extensions` to ensure addon works with prototype extensions disabled.
* **Removed** `lodash` and `redux` as they aren't actually used by this addon.
* **Updated** CI to test against both Firefox and Chrome.
* **Upgraded** build to Ember 2.11.


# 5.2.2

* **Fixed** code to play nice with POJO's.


# 5.2.1
* Missed `ember-math-helpers` in the blueprint previously, which is a required dependency


# 5.2.0
* Added a "last" class to the last frost-list-item-container for situational targeting
* Added CSS for list item progress elements
* Added CSS for various corner cases


# 5.1.3
* Removed the icon sizing from the progress CSS to allow multiple sizes


# 5.1.2
* Removed the list item `block-start` styles since these are already covered in a basic `block`


# 5.1.1
* Fixed the list-item element icon to target frost-icon instead of frost-svg


# 5.1.0
* Added null checks if selectedItems and expandedItems are not provided (optional)
* Updated the CSS for list items to conform to UX specs


# 5.0.0
* onExpansionChange -> expandedItems -> list


# 4.0.0

- Coming soon, refer to the demo in the meantime


# 3.2.5
- **Added** test suite for frost-list
- **Updated** repo to follow new convention guidelines
- **Updated** usage to Ember.typeOf()
- **Removed** unused method from frost-list-core.js


# 3.2.4
- **Updated** repo to use ember-cli-code-coverage instead of ember-cli-blanket


# 3.2.3
- **fixed** bug when data is not coming from the model hook as **listItems** evaluated to null.

# 3.2.2
- **Fixed** issue when get(this, listConfig.items) return nested path.


# 3.2.1
- **Updated** list layout strategy to use flexbox.


# 3.2.0
* Add icons



# 3.1.1
** Updated * pass in infinite property for data-driven pattern



# 3.1.0
* Added a `infinite=false` option along with `pagination` controls


# 3.0.0

* Upgraded ember to 2.8
* Removed sortedItems property from sort Mixin.
* Removed filteredItems property from core Mixin.
* Removed defaultHeight property in frost-list-core component.
* Redesigned sort Mixin.
* Updated dummy app based on addon changes.
* Updated dependencies.




# 2.0.5

* **Updated** the language in some paragraphs in the README to enhance readability.

<!-- Reviewable:start -->
---
This change is [<img src="https://reviewable.io/review_button.svg" height="34" align="absmiddle" alt="Reviewable"/>](https://reviewable.io/reviews/ciena-frost/ember-frost-list/66)
<!-- Reviewable:end -->


# 2.0.4

* **Added** rootURL to router.js


# 2.0.3

* **Updated** baseURL to rootURL to try to fix the path issue with the demo app on gh pages


# 2.0.2

* **Updated** factory-guy to run off my fork and branch to isolate changes to allow use in production environment.


# 2.0.1

* **Added** factory-guy mocking layer with factories
* **Updated** tests to use factory-guy instead of mirage
* **Removed** mirage mocking layer

<!-- Reviewable:start -->
---
This change is [<img src="https://reviewable.io/review_button.svg" height="34" align="absmiddle" alt="Reviewable"/>](https://reviewable.io/reviews/ciena-frost/ember-frost-list/59)
<!-- Reviewable:end -->


# 2.0.0

* Updated to ember-frost-sort 3.0, technically not directly breaking, but an upstream major

# 1.0.0

* **Removed** internal record state management. 
* **Removed** small/medium/large detail level support. 
* **Removed** support for list block format rendering.
* **Updated**  user interface to support new component driven API and data driven API.
* **Updated** css to serve new template layout. 
* **Updated** to `smoke-and-mirror: 0.5.4`. 
* **Added**  a bunch of Mixins to support common list operation.
* **Added**  list expand/collapse control component.
* **Added**  live demo with source code generating.
* **Added**  hook for testing.
* **Added**  README
* **Fixed**  content shifting when item gets selected. 

# 0.7.8
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.7.7
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.7.6
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.7.5

Updated the demo-lists route to include a sample showing initial selection

# 0.7.4
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.7.3
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.7.2

Locked the ember-cli version to ~2.5.0 to avoid build errors with 2.6

# 0.7.1

* **Fixed** deprecation warning from Ember 2.6.0 to stop using `didInitAttrs` hook and instead use `init`.

# 0.7.0
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

