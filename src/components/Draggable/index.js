import Draggable from './src/Draggable';

/* istanbul ignore next */
Draggable.install = function(Vue) {
    Vue.component(Draggable.name, Draggable);
};

export default Draggable;
