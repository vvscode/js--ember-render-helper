import Ember from 'ember';
const {
    __loader: {
        require
    }
} = Ember;
const _registerKeyword = require('ember-htmlbars/keywords').registerKeyword;

export
function registerKeyword(name, keyword) {
    _registerKeyword(name, keyword);
}
