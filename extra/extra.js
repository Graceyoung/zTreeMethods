/**
 *  初始化zTree
 * @param f 初始化zTree后要执行的
 */
function initZtree(f){
	var setting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		}
	};
	var zNodes =[
		{ id:1, pId:0, name:"随意勾选 1", open:true},
		{ id:114, pId:1, name:"随意勾选 1-1"},
		{ id:124, pId:1, name:"随意勾选 1-2"},
		{ id:2, pId:0, name:"随意勾选 2", open:true},
		{ id:21, pId:2, name:"随意勾选 2-1"},
		{ id:22, pId:2, name:"随意勾选 2-2"},
		{ id:23, pId:2, name:"随意勾选 2-3"},
        { id:3, pId:0, name:"随意勾选 2", open:true},
	];
	$.fn.zTree.init($("#tree"), setting, zNodes);
    if (typeof f == "function") {
        f();
    }
	// ajax获取数据用下面这段
   /* $.ajax({
        url: WebContext + "/resume/getSkillLables",
        type: "post",
        dataType: "json",
        success: function (data) {
            $.fn.zTree.init($("#tree"), setting, data);
            if (typeof f == "function") {
                f();
            }

        }
    });*/
}

/**
 * 通过id选中zTree节点
 * @param checkdNodes 要选中的节点id，数组
 */
function checkNodeById(checkdNodes) {  
    var treeObj = $.fn.zTree.getZTreeObj("tree");  
    for(var i=0;i<checkdNodes.length;i++){
    	var treenode = treeObj.getNodeByParam("id", checkdNodes[i], null);  
    	treeObj.expandNode(treenode, true, true, true);
    	var childrenLen = treenode.children ? treenode.children.length : 0;
        if (treenode['pId'] == null && childrenLen > 0) {

        } else {
            treeObj.checkNode(treenode, true, true);
        }
    }

}

/**
 *  通过选中的节点返回节点id，返回数组
 * @returns {Array} 返回节点id
 */
function getIdByCheckedNode(){
	var treeObj = $.fn.zTree.getZTreeObj("tree");  
	var nodes = treeObj.getCheckedNodes(true);

	var nodesId = [];
	for(var i=0;i<nodes.length;i++){
		nodesId.push(nodes[i]["id"]);
	}
	return nodesId;
}

/**
 *  将所有的zTree节点的复选框设置为disabled的
 */
function setAllCheckboxDisabled() {
    var treeObj = $.fn.zTree.getZTreeObj("tree");
    var nodes = treeObj.getNodes().concat(treeObj.getNodesByParam("level", 1, null));
    for (var i = 0, l = nodes.length; i < l; i++) {
        treeObj.setChkDisabled(nodes[i], true);
    }
}

/**
 *  zTree，移除未被选中的父子节点（父节点下的子节点全部未被选中）
 */
function removeUncheckedParentNode() {
    var treeObj = $.fn.zTree.getZTreeObj("tree");
    var ns = treeObj.getNodes();
    var temp = new Array();
    for (var i = 0; i < ns.length; i++) {
        temp.push(ns[i]);
    }
    $.each(temp, function (index, node) {
        try {
            if (!node.checked) {
                treeObj.removeNode(node);
            }
        } catch (error) {
            return;
        }

    });
}
$(document).ready(function(){
	initZtree(function () {
        var checkdNodes = [23,3];
        checkNodeById(checkdNodes);
    });
});