// Check if flow is valid before saving
// if there are more than 1 nodes, only one node can have no incoming edge
export function isFlowValid(nodes, edges) {
  if (nodes.length <= 1) return true; // single node is always valid

  // Collect all node IDs that have incoming edges
  const nodesWithIncoming = new Set(edges.map((e) => e.target));

  // Find nodes with no incoming edges
  const nodesWithEmptyTarget = nodes.filter((n) => !nodesWithIncoming.has(n.id));

  // Valid only if at most 1 node has no incoming edge
  return nodesWithEmptyTarget.length <= 1;
}
