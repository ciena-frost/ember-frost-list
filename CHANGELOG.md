# 11.3.2 (2018-09-12)
* Make sure that we adding the padding on the right for the scroll


# 11.3.1 (2018-08-02)
* Make sure that we adding the padding on the right for the scroll


# 11.3.0 (2018-07-27)

* **Add** flag `useVerticalCollectionForPagination` that allows a consumer to use `vertical-collection` during pagination


# 11.2.0 (2018-07-26)

* Add optional `isLoading` flag to show loading indicator

# 11.1.3 (2018-07-20)

* **Fixed** Travis API key.


# 11.1.2 (2018-05-30)
* **Updated** `travis.yml` to set node version to `8.6.0`

# 11.1.1 (2018-05-29)
* Pin `ember-cli-notifications` to fix broken demo app

# 11.1.0 (2018-04-26)
- Add always expanded and single selection behaviors


# 11.0.0 (2018-04-16)

* **Upgraded** `ember-frost-core` to `^8.0.0`
* **Updated** `ember-frost-sort` to `^13.0.0`
* **Installed** `ember-cli-svgstore`
* **Updated** `frost-icon` functionality to work with new version of `ember-frost-core`

# 10.0.0 (2018-03-23)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-frost-sort` to `^12.0.0`
* **Updated** `pr-bumper` to `^3.7.0`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-frost-core` to `^7.0.0`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file
* **Updated** Travis CI scripts to allow non-exact node version
* **Removed** is-lead-selection.js helper since it is not being used

# 9.2.1 (2018-03-07)
* Update frost-list to match new UX specs (wrap paging when sort does, and ensure page buttons are one same line)



# 9.2.0 (2018-02-15)
* Added disableDeselectAll. If true, clicking outside of the checkbox in a list item will no longer deselect all of the other items.


# 9.1.0 (2018-02-09)
* Add disableDeselectAll attribute which disables deselect all click, giving ember-frost-list multi-select behavior.


# 9.0.1 (2018-01-30)
* **Added** `min-height` of `45px` to `frost-list-header`


# 9.0.0 (2018-01-25)
* **Added** ignore the linting of the `CHANGELOG.md`
* **Added** ignoring of `package-lock` until we are ready to move to node 8
* **Removed** useLintTree ember-cli-mocha configuration from `ember-cli-build.js`
* **Removed** `.remarkrc` file since it is now provided by `ember-test-utils`
* **Updated** `ember-frost-test` to `^4.0.0`
* **Updated** `ember-cli-chai` to `0.4.3`
* **Updated** `ember-cli-mocha` to `0.14.4`
* **Updated** `ember-sinon` to `^0.7.0`
* **Updated** `ember-test-utils` to `^8.1.0`
* **Updated** `sinon-chai` @ `^2.14.0`
* **Updated** `ember-cli-code-coverage` to `0.3.12`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.1`
* **Updated** `ember-cli-notifications` to `^4.2.1`
* **Updated** pin `ember-code-snippet` to `1.7.0`
* **Updated** `ember-frost-sort` to `^10.0.0`
* **Removed** unused `ember-async-image` package
* **Removed** unused `pull-report` package
* **Added** `broccoli-funnel` @ `^2.0.1`
* **Added** `broccoli-merge-trees` @ `^2.0.0`
* **Updated** `ember-cli-sass` to `7.1.1`
* **Updated** `ember-frost-core` to `^5.1.1`
* **Updated** `ember-hook` to `1.4.2`
* **Updated** `ember-prop-types` to `^6.0.1`
* **Updated** `ember-truth-helpers to `^1.3.0`
* **Updated** `ua-parser-js` to `^0.7.17`
* **Removed** static copy of `ua-parser-js.js` located in `vendor/`
* **Added** a vendor shim to enable import of `ua-parser-js` npm package
* **Updated** `index.js` file to add `ua-parser-js` to this add-on's build tree
* **Updated** usage of UAParser to use new importable module instead of global
* **Updated** move code coverage config file to tests/dummy/config/
* **Removed** unused `animation-frame` bower package
* **Updated** `Faker` and `jquery-mockjax` bower packages to be devDependencies


# 8.0.1 (2017-12-14)

* Updated margin/padding in the list-item to provide consistent spacing and follow UX specs


# 8.0.0 (2017-12-11)
* **Added** `bower` to devDependencies since it is no longer included with Ember CLI
* **Updated** to version 4 of `ember-frost-core`
* **Updated** to version 9 of `ember-frost-sort` and move from dependencies to devDependencies since only used in the dummy app
* **Updated** to version 5 of `ember-prop-types` and moved from devDependencies to dependencies
* **Removed** blueprints since they are no longer needed to install packages
* **Updated** `ember-computed-decorators` to a dependency instead of a devDependency
* **Updated** `ember-hook` to a dependency instead of a devDependency
* **Removed** unused `ember-concurrency` package since it is now included via the dependencies of `ember-frost-core`
* **Removed** unused `ember-elsewhere` package since it is now included via the dependencies of `ember-frost-core`
* **Removed** unused `ember-spread` package since it is now included via the dependencies of `ember-frost-core`
* **Updated** `ember-truth-helpers` to a dependency instead of a devDependency
* **Removed** unused `ember-get-config` package
* **Updated** `ember-data-factory-guy` to use the published version with the fix instead of a branch

# 7.0.4 (2017-11-30)
fixed _select call when there is no onSelectionChange to prevent console error.


# 7.0.3 (2017-11-22)
* **Added** isDynamicRowHeight API to support dynamic list row height.


# 7.0.2 (2017-11-22)
* Fixes #161 : Have frost-list flex-wrap sort if it overflows


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

