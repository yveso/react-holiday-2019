import React from "react";

function List({
  as: As = React.Fragment,
  items,
  renderItem = item => <p>{item.name}</p>,
  ...rest
}) {
  return <As {...rest}>{items.map(renderItem)}</As>;
}

export default List;
