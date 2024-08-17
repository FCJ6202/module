//Get the XPath of an element
function getXPath(element) {
  if (element === document.body) {
    return element.tagName;
  }

  let ix = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return (
        getXPath(element.parentNode) +
        "/" +
        element.tagName +
        "[" +
        (ix + 1) +
        "]"
      );
    }

    // nodeType 1 indicate that sibling is a element node;
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
  return null;
}

function toHeadingFormat(word) {
  if (typeof word !== "string" || word.length === 0) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function getElementClass(element) {
  return Array.from(element.classList);
}

function getElementId(element) {
  return element.id;
}

// Block all click events on the page
document.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    event.stopPropagation();

    const clickedElement = event.target;

    const classList = getElementClass(clickedElement);
    const id = getElementId(clickedElement);

    const showData = `Classes: ${classList}\nId: ${id}`;
    if (clickedElement.tagName.toLowerCase() === "img") {
      alert(`Image clicked, XPath:, ${getXPath(clickedElement)}\n${showData}`);
    } else if (clickedElement.tagName.toLowerCase() === "button") {
      alert(`Button clicked, XPath:, ${getXPath(clickedElement)}\n${showData}`);
    } else if (clickedElement.textContent.trim() !== "") {
      alert(`Text clicked, XPath:, ${getXPath(clickedElement)}\n${showData}`);
    } else {
      alert(`${toHeadingFormat(clickedElement.tagName)} clicked, XPath: ${getXPath(clickedElement)}\n${showData}`)
    }
  },
  true
);

// Highlight element on mouse hover
document.addEventListener(
  "mouseover",
  function (event) {
    const hoveredElement = event.target;

    const eleName = hoveredElement.tagName.toLowerCase();

    if (eleName === "html" || eleName === "body") {
      return;
    }

    hoveredElement.style.outline = "2px solid blue";
    hoveredElement.style.backgroundColor = "#f0f0f0";

    // Create a tooltip to show the tag name
    const tooltip = document.createElement("div");
    tooltip.textContent = toHeadingFormat(hoveredElement.tagName);
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "blue";
    tooltip.style.color = "white";
    tooltip.style.padding = "2px 5px";
    tooltip.style.fontSize = "12px";
    tooltip.style.borderRadius = "3px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.transform = "translateY(-100%)";
    tooltip.style.zIndex = "9999";

    document.body.appendChild(tooltip);

    const rect = hoveredElement.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY}px`;

    hoveredElement.addEventListener("mouseout", function () {
      hoveredElement.style.outline = "";
      hoveredElement.style.backgroundColor = "";
      if (document.body.contains(tooltip)) {
        document.body.removeChild(tooltip);
      }
    });
  },
  true
);
