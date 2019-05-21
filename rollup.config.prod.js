import json from 'rollup-plugin-json';
import progress from 'rollup-plugin-progress'
//转es5
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace'
import license from 'rollup-plugin-license'

import { version } from './package.json';

export default {
    input: 'src/index.js',
    output: {
        file: 'bin/index.js',
        format: 'umd'
    },
    moduleName: 'calendar',
    plugins: [
        resolve(),
        license({
            banner: `calendar ${version}\n created at ${new Date()}`
        }),
        json(),
        progress({
            clearLine: false
        }),
        replace({
            VERSION: version
        }),
        commonjs({
            include: 'node_modules/lrz/**'
        }),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ]
};