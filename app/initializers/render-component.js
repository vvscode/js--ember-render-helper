import {
    registerKeyword
}
from './../keywords/utils';
import RenderComponentKeyword from './../keywords/render-component';

registerKeyword('render-component', RenderComponentKeyword);

export
default {
    name: 'render-component',
    initialize() {}
};
