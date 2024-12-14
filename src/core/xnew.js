import { isObject, isString, isFunction, error } from './util';
import { XNode } from './xnode';

export function xnew(...args)
{
    // parent xnode
    let parent = undefined;
    if (args[0] instanceof XNode) {
        parent = args.shift();
    } else if (args[0] === null) {
        parent = args.shift();
    } else if (args[0] === undefined) {
        parent = args.shift();
        parent = XNode.current
    } else {
        parent = XNode.current
    }

    // input element
    let element = undefined;
    if (args[0] instanceof Element || args[0] instanceof Window || args[0] instanceof Document) {
        // an existing html element
        element = args.shift();
    } else if (isString(args[0]) === true) {
        // a string for an existing html element
        element = document.querySelector(args.shift());
    } else if (isObject(args[0]) === true) {
        // an attributes for a new html element
        element = args.shift();
    } else if (args[0] === null || args[0] === undefined) {
        element = args.shift();
        element = null;
    } else {
        element = undefined;
    }

    if (args.length > 0) {
        const component = args[0];

        if (isObject(element) === false && isString(component) === true) {
            error('xnew', 'The argument is invalid.', 'component');
            return;
        }
    }

    return new XNode(parent, element, ...args);
}

export function xcontext(name, value)
{
    const xnode = XNode.current;

    if (isString(name) === false) {
        error('xcontext', 'The argument is invalid.', 'name');
    } else {
        return XNode.context.call(xnode, name, value);
    }
}

export function xfind(key)
{
    if (isString(key) === false) {
        error('xfind', 'The argument is invalid.', 'key');
    } else {
        const set = new Set();
        key.trim().split(/\s+/).forEach((key) => {
            XNode.keys.get(key)?.forEach((xnode) => set.add(xnode));
        });
        return [...set];
    }
}
