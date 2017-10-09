import _ from 'lodash';
import $ from 'jquery';
import { cube } from './common';


console.log(process.env.NODE_ENV);
console.log(cube(3));
console.log(_.join(['Another', 'module', 'loaded!'], ' '));
