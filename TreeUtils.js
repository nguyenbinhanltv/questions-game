const TreeUtils = function() {};

TreeUtils.prototype.addToTree = function(tree, index, data) {
    let current = tree;
    while(current.index !== undefined) {
        if(index < current.index) {
            current = current.left;
        } else if(index > current.index) {
            current = current.right;
        }
    }

    current.index = index;
    current.data = data;
    current.left = {};
    current.right = {};
}

TreeUtils.prototype.lookingForNode = function(tree, index) {
    let current = tree;
    while(current.index !== undefined && index !== current.index) {
        if(index < current.index) {
            current = current.L;
        } else if(index > current.index) {
            current = current.R;
        }
    }
    return current;
}

TreeUtils.prototype.lookingForParentNode = function(tree, index) {
    let current = tree;
    while (current.index !== undefined) {
        if (current.L.index === index) {
            return [current, 0];
        } else if (current.R.index === index) {
            return [current, 1];
        } else if (index < current.index) {
            current = current.L;
        } else if (index > current.index) {
            current = current.R;
        } else {
            return {};
        }
    }
}

TreeUtils.prototype.deleteFromTree = function(tree, index) {
    let deletion = this.lookingForNode(tree, index);

    //No child
    if (deletion.L.index === undefined && deletion.R.index === undefined) {
        let [parent, pos] = this.lookingForParentNode(tree, index);
        if (pos === 0) {
            parent.L = {};
        } else if (pos === 1) {
            parent.R = {};
        }
    }

    //Has a child
    else if (deletion.L.index === undefined || deletion.R.index === undefined) {
        let [parent, pos] = this.lookingForParentNode(tree, index);
        if (deletion.L.index !== undefined) {
        if (pos === 0) {
            parent.L = deletion.L;
        } else {
            parent.R = deletion.L;
        }
        } else if (deletion.R.index !== undefined) {
            if (pos === 0) {
                parent.L = deletion.R;
            } else {
                parent.R = deletion.R;
            }
        }
    }

    //Have two child
    else if (deletion.L.index !== undefined && deletion.R.index !== undefined) {
        let dummy = deletion.L;
        let parent = deletion;
        while (dummy.R.index !== undefined) {
            parent = dummy;
            dummy = dummy.R;
        }
        deletion.index = dummy.index;
        deletion.data = dummy.data;
        parent.R = {};
    }
}

export {
    TreeUtils
};