# SFCC Rhino ECMAScript compatibility tables
[bm_rhino_compat](https://github.com/Thealoner/bm_rhino_compat) is an SFCC BM cartridge built on top of
[node-compat-tables](https://williamkapke.github.io/node-compat-table/) and
[Kangax's hard work](https://github.com/kangax/compat-table). The majority of the credit needs to be given to the contributors
of those projects.

Unlike those projects bm_rhino_compat can be used solely to test the ECMAScript compatibility of the Rhino engine used in SFCC.

## Installation instructions

1. Upload bm_rhino_compat cartridge to SFCC
2. Add it to the BM cartridge path
3. Grant permissions for the BM module in Organization context
4. Open the BM module at Administration > Site Development > Rhino Compat

Try switching the code version compatibility to see the difference.

## Mozilla's Rhino Compatibility table

Also, Mozilla's [Compatibility table](https://mozilla.github.io/rhino/compat/engines.html) shows which advanced JavaScript features from ES6, and ES2016+ are implemented in Rhino. You can use it for comparison.

## License
[MIT Copyright (c) Eduard Nikolaiev](https://github.com/Thealoner/bm_rhino_compat/blob/main/LICENSE)
