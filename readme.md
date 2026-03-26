# Product Inventory

A inventory search application built with React, Tailwind CSS, and Node.js.

# Search Logic
* State-Driven UI: React manages a centralized `filters` state; any input change triggers an asynchronous Axios `GET` request.
* Query Mapping: Dynamic filters are serialized into URL query strings (e.g., `?q=mouse&category=electronics`) for backend consumption.
* Sequential Filtering: The Express backend implements a "Waterfall Filter" on the source array using `.filter()`.
    Partial Name Match: Case-insensitive search using `.includes()`.
    Exact Category Match: Strict filtering via dropdown selection.
    Price Validation: Logical range checks for `minPrice` and `maxPrice`.
* Empty State: Automatically returns the full inventory list by default or a descriptive "No results found" UI when criteria aren't met.

# Scaling for Large Datasets
As the dataset grows to 100,000+ records, I would implement the following optimizations:

* Global State (Redux): Integrate Redux Toolkit to cache search results and persist filter history. This prevents redundant API calls and improves UX when navigating back and forth.
* Server-Side Pagination: Transition to page and limit parameters to fetch data in small batches (e.g., 20 items per request), significantly reducing network payload and memory overhead.
